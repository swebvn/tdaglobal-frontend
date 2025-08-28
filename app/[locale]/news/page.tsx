"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useTranslations } from 'next-intl'
import {
  ArrowRight,
  Calendar,
  ChevronRight,
  Loader2,
  AlertCircle,
  Search,
} from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import Footer from "@/components/footer"
import NewsDetail from "@/components/news-detail"
import NewsFilters from "@/components/news-filters"
import { useState, useMemo, useEffect } from "react"
import { useNews } from "@/hooks/useNews"
import { useCategories } from "@/hooks/useCategories"
import { StrapiNewsItem, getStrapiImageUrl, extractHtmlExcerpt, getCategoryName } from "@/types/strapi"
import { useParams } from "next/navigation"

export default function NewsPage() {
  const t = useTranslations('NewsPage')
  const [selectedArticle, setSelectedArticle] = useState<StrapiNewsItem | null>(null)
  const [page, setPage] = useState(1)
  const [initialLoad, setInitialLoad] = useState(true)
  const [loadMoreLoading, setLoadMoreLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const params = useParams()
  const locale = params.locale as string || 'en'

  // Navigation handler - chỉ sử dụng modal
  const handleArticleClick = (article: StrapiNewsItem) => {
    setSelectedArticle(article)
  }

  // Handle back from article detail
  const handleBackFromArticle = () => {
    setSelectedArticle(null)
  }
  
  // Fetch categories
  const { categories } = useCategories()
  
  // Tách riêng các tham số để tránh tạo object mới mỗi lần render
  const newsParams = useMemo(() => ({
    page,
    pageSize: 9, // Sử dụng pageSize cố định
    locale,
    category: selectedCategory,
    search: searchTerm
  }), [page, locale, selectedCategory, searchTerm])
  
  const { news, loading, error, pagination, refetch } = useNews(newsParams)

  // Reset to page 1 and initial load when filters change
  useEffect(() => {
    setPage(1)
    setInitialLoad(true)
  }, [searchTerm, selectedCategory])

  // Reset loading state when news data changes
  useEffect(() => {
    if (loadMoreLoading && !loading) {
      const timer = setTimeout(() => {
        setLoadMoreLoading(false)
      }, 500) // Small delay to ensure smooth transition
      
      return () => clearTimeout(timer)
    }
  }, [news.length, loading, loadMoreLoading])

  // Filter handlers
  const handleSearchChange = (term: string) => {
    setSearchTerm(term)
  }

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category)
  }

  const handleResetFilters = () => {
    setSearchTerm('')
    setSelectedCategory(null)
  }

  // Chỉ hiển thị 3 tin đầu tiên nếu đang ở page 1 và chưa load more
  const displayedNews = initialLoad && page === 1 ? news.slice(0, 3) : news

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    })
  }

  // Load more news
  const handleLoadMore = async () => {
    setLoadMoreLoading(true)
    
    try {
      if (initialLoad) {
        // Simulate loading for better UX when showing more from current page
        await new Promise(resolve => setTimeout(resolve, 600)) // Reduced from 800ms
        setInitialLoad(false)
      } else if (pagination && page < pagination.pageCount) {
        // Load next page - loading will be handled by useNews hook
        setPage(prev => prev + 1)
        // Wait a bit for the API call to complete
        await new Promise(resolve => setTimeout(resolve, 200)) // Reduced from 300ms
      }
    } catch (error) {
      console.error('Error loading more news:', error)
    } finally {
      setLoadMoreLoading(false)
    }
  }

  // Kiểm tra xem có thể load more không
  const canLoadMore = (initialLoad && news.length > 3) || (pagination && page < pagination.pageCount)

  // Show article detail if selected
  if (selectedArticle) {
    return <NewsDetail article={selectedArticle} onBack={handleBackFromArticle} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <motion.section 
        className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 sm:py-16 md:py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 sm:space-y-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 px-3 sm:px-4 py-1.5 sm:py-2 text-sm">{t('hero.badge')}</Badge>
            </motion.div>
            <motion.h1 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight whitespace-nowrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t('hero.title').split('TDA Global').map((part, index, array) => (
                index === array.length - 1 ? part : 
                <span key={index}>
                  {part}
                  <span className="text-blue-600">TDA Global</span>
                </span>
              ))}
            </motion.h1>
            <motion.p 
              className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {t('hero.description')}
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Latest News Grid */}
      <motion.section 
        className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-8"
          >
            <NewsFilters
              searchTerm={searchTerm}
              selectedCategory={selectedCategory}
              categories={categories}
              onSearchChange={handleSearchChange}
              onCategoryChange={handleCategoryChange}
              onReset={handleResetFilters}
              translations={{
                searchPlaceholder: t('searchPlaceholder'),
                filtersLabel: t('filtersLabel'),
                clearFilters: t('clearFilters'),
                categoriesLabel: t('categoriesLabel'),
                allCategories: t('allCategories'),
              }}
            />
          </motion.div>
          <motion.div 
            className="mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1 h-6 sm:h-8 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full"></div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{t('latestNews.title')}</h2>
                </div>
                <p className="text-sm sm:text-base text-gray-600">{t('latestNews.subtitle')}</p>
              </div>
              {pagination && (
                <div className="hidden lg:flex items-center gap-2 text-sm text-gray-600">
                  <span>{t('showingArticles', { count: displayedNews.length, total: pagination.total })}</span>
                  {(searchTerm || selectedCategory) && (
                    <Badge variant="outline" className="ml-2 text-xs">
                      {searchTerm && selectedCategory 
                        ? t('searchFilter')
                        : searchTerm 
                          ? t('searchResults')
                          : t('filtered')
                      }
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </motion.div>

          {/* Loading State */}
          {loading && news.length === 0 && (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
                <p className="text-gray-600">Loading news articles...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="flex justify-center items-center py-20">
              <div className="text-center max-w-md mx-auto">
                <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-600" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {error.includes('connect') ? 'Connection Error' : 'Error Loading News'}
                </h3>
                <p className="text-red-600 mb-4 text-sm">{error}</p>
                {error.includes('Strapi server') && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                    <p className="text-yellow-800 text-sm">
                      <strong>Development Note:</strong> Make sure your Strapi server is running on port 1337
                    </p>
                    <code className="block mt-2 text-xs bg-gray-100 p-2 rounded">
                      npm run develop
                    </code>
                  </div>
                )}
                <Button onClick={refetch} variant="outline">
                  Try Again
                </Button>
              </div>
            </div>
          )}

          {/* News Grid */}
          {!loading && !error && news.length === 0 && (
            <div className="text-center py-20">
              <div className="text-center max-w-md mx-auto">
                <div className="h-12 w-12 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  {(searchTerm || selectedCategory) ? (
                    <Search className="h-6 w-6 text-gray-400" />
                  ) : (
                    <Calendar className="h-6 w-6 text-gray-400" />
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {(searchTerm || selectedCategory) ? t('noResultsTitle') : t('noArticlesTitle')}
                </h3>
                <p className="text-gray-600 mb-4">
                  {(searchTerm || selectedCategory) 
                    ? t('noResultsMessage')
                    : t('noArticlesMessage')
                  }
                </p>
                {(searchTerm || selectedCategory) ? (
                  <Button onClick={handleResetFilters} variant="outline">
                    {t('clearFilters')}
                  </Button>
                ) : (
                  <Button onClick={refetch} variant="outline">
                    {t('refresh')}
                  </Button>
                )}
              </div>
            </div>
          )}

          {displayedNews.length > 0 && (
            <>
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
                layout
                transition={{ duration: 0.3 }}
              >
                {displayedNews.map((article, index) => (
                  <motion.div
                    key={article.documentId}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: Math.min(index * 0.1, 0.6), // Cap delay at 0.6s
                      type: "spring",
                      stiffness: 100,
                      damping: 15
                    }}
                    layout
                  >
                    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-0 shadow-lg bg-white h-full flex flex-col cursor-pointer"
                          onClick={() => handleArticleClick(article)}>
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={getStrapiImageUrl(article.thumbnail, 'medium')}
                          alt={article.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          unoptimized={process.env.NODE_ENV === 'development'}
                        />
                      </div>
                      <CardContent className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center text-sm text-gray-500 mb-3">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span className="mr-3">{formatDate(article.publishedAt)}</span>
                          {article.category && (
                            <>
                              <div className="w-1 h-1 bg-gray-300 rounded-full mx-2"></div>
                              <Badge variant="secondary" className="text-xs">
                                {getCategoryName(article.category)}
                              </Badge>
                            </>
                          )}
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300"
                            style={{
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical' as const,
                              overflow: 'hidden'
                            }}>
                          {article.title}
                        </h3>
                        <div className="text-gray-600 mb-6 flex-1 prose prose-sm max-w-none"
                           style={{
                             display: '-webkit-box',
                             WebkitLineClamp: 3,
                             WebkitBoxOrient: 'vertical' as const,
                             overflow: 'hidden'
                           }}
                           dangerouslySetInnerHTML={{ __html: extractHtmlExcerpt(article.content, 120) }}
                        />
                        <div className="flex justify-end mt-auto">
                          <Button variant="ghost" className="text-blue-600 hover:text-blue-700 p-0 group-hover:translate-x-1 transition-transform duration-300">
                            {t('readMore')}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>

              {/* Load More Button - Chỉ hiển thị nếu có thể load more */}
              {canLoadMore && (
                <motion.div 
                  className="text-center mt-8 sm:mt-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                >
                  <Button 
                    onClick={handleLoadMore}
                    disabled={loadMoreLoading || loading}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                    size="lg"
                  >
                    <motion.div
                      className="flex items-center"
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.1 }}
                    >
                      {loadMoreLoading || loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {initialLoad ? t('loading') : 'Loading...'}
                        </>
                      ) : (
                        <>
                          <span>{initialLoad ? t('seeMoreNews') : 'Load More News'}</span>
                          <motion.div
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                          >
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </motion.div>
                        </>
                      )}
                    </motion.div>
                  </Button>
                </motion.div>
              )}
            </>
          )}
        </div>
      </motion.section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
