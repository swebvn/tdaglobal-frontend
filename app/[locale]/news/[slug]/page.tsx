"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Tag, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { StrapiNewsItem, getStrapiImageUrl, getCategoryName } from "@/types/strapi"
import { strapiService } from "@/services/strapi"

export default function NewsDetailBySlugPage() {
  const [article, setArticle] = useState<StrapiNewsItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const params = useParams()
  const router = useRouter()
  const newsSlug = params.slug as string
  const locale = params.locale as string || 'en'

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Sử dụng API để lấy bài viết theo slug
        const response = await strapiService.getNewsBySlug(newsSlug, locale)
        setArticle(response)
      } catch (err) {
        console.error('Error fetching article by slug:', err)
        setError('Không thể tải bài viết')
      } finally {
        setLoading(false)
      }
    }

    if (newsSlug) {
      fetchArticle()
    }
  }, [newsSlug, locale])

  const handleBack = () => {
    router.back()
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải bài viết...</p>
        </motion.div>
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div 
          className="text-center max-w-md mx-auto px-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-xl font-semibold text-gray-900 mb-2">
            Không tìm thấy bài viết
          </h1>
          <p className="text-gray-600 mb-6">
            {error || 'Bài viết không tồn tại hoặc đã bị xóa.'}
          </p>
          <Button onClick={handleBack} className="bg-blue-600 hover:bg-blue-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.div 
        className="bg-white shadow-sm border-b"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Button 
            onClick={handleBack}
            variant="ghost" 
            className="text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>
        </div>
      </motion.div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          {/* Hero Image */}
          {article.thumbnail && (
            <div className="relative h-64 md:h-96 overflow-hidden">
              <Image
                src={getStrapiImageUrl(article.thumbnail, "large")}
                alt={article.title}
                fill
                className="object-cover"
                unoptimized={process.env.NODE_ENV === "development"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          )}

          <div className="p-6 md:p-8">
            {/* Meta Info */}
            <motion.div 
              className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{formatDate(article.publishedAt)}</span>
              </div>
              
              {article.category && (
                <div className="flex items-center">
                  <Tag className="w-4 h-4 mr-1" />
                  <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                    {getCategoryName(article.category)}
                  </Badge>
                </div>
              )}
            </motion.div>

            {/* Title */}
            <motion.h1 
              className="text-2xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {article.title}
            </motion.h1>

            {/* Content */}
            <motion.div 
              className="prose prose-lg max-w-none text-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        </motion.article>
      </div>
    </div>
  )
}