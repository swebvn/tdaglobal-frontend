"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Calendar,
  ChevronDown,
  Loader2,
  AlertCircle,
  Sparkles,
  Eye,
} from "lucide-react";
import Image from "next/image";
import { useNews } from "@/hooks/useNews";
import {
  StrapiNewsItem,
  getStrapiImageUrl,
  extractHtmlExcerpt,
  getCategoryName,
} from "@/types/strapi";

interface NewsListProps {
  locale?: string;
  category?: string;
  onArticleSelect?: (article: StrapiNewsItem) => void;
  className?: string;
}

export default function NewsList({
  locale = "en",
  category,
  onArticleSelect,
  className = "",
}: NewsListProps) {
  const [showAll, setShowAll] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  // Navigation handler - ưu tiên callback trước, sau đó mới là navigation
  const handleArticleClick = (article: StrapiNewsItem) => {
    if (onArticleSelect) {
      onArticleSelect(article);
    }
  };

  // Tách riêng các tham số để tránh tạo object mới mỗi lần render
  const newsParams = useMemo(
    () => ({
      page: 1,
      pageSize: showAll ? 20 : 3, // Hiển thị 3 tin đầu tiên, hoặc 20 nếu đã nhấn load more
      locale,
      category,
    }),
    [showAll, locale, category]
  );

  const { news, loading, error, pagination, refetch } = useNews(newsParams);

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Handle load more with animation
  const handleLoadMore = async () => {
    setLoadingMore(true);
    await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate loading
    setShowAll(true);
    setLoadingMore(false);
  };

  // Check if there are more articles to load
  const hasMoreArticles = pagination && pagination.total > 3;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <motion.div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Tin tức mới nhất
            </h2>
            <p className="text-sm text-gray-600">
              Cập nhật những thông tin quan trọng nhất
            </p>
          </div>
        </div>

        {pagination && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Eye className="w-4 h-4" />
            <span>
              Hiển thị {news.length} / {pagination.total} bài viết
            </span>
          </div>
        )}
      </motion.div>

      {/* Loading State */}
      {loading && news.length === 0 && (
        <motion.div
          className="flex justify-center items-center py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
              <Sparkles className="w-6 h-6 text-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
            <p className="text-gray-600 font-medium">Đang tải tin tức...</p>
          </div>
        </motion.div>
      )}

      {/* Error State */}
      {error && (
        <motion.div
          className="flex justify-center items-center py-20"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center max-w-md mx-auto">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Không thể tải tin tức
            </h3>
            <p className="text-red-600 mb-4 text-sm">{error}</p>
            <Button
              onClick={refetch}
              variant="outline"
              className="hover:bg-red-50"
            >
              Thử lại
            </Button>
          </div>
        </motion.div>
      )}

      {/* Empty State */}
      {!loading && !error && news.length === 0 && (
        <motion.div
          className="text-center py-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Chưa có tin tức nào
          </h3>
          <p className="text-gray-600 mb-4">
            Hiện tại chưa có bài viết nào. Vui lòng quay lại sau.
          </p>
          <Button onClick={refetch} variant="outline">
            Tải lại
          </Button>
        </motion.div>
      )}

      {/* News Grid */}
      {news.length > 0 && (
        <AnimatePresence mode="wait">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {news.map((article, index) => (
              <motion.div
                key={article.documentId}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white h-full flex flex-col cursor-pointer relative">
                  {/* Featured Badge for first 3 articles */}
                  {index < 3 && !showAll && (
                    <div className="absolute top-3 left-3 z-10">
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold text-xs px-2 py-1 border-0 shadow-lg">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Nổi bật
                      </Badge>
                    </div>
                  )}

                  <div
                    className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200"
                    onClick={() => handleArticleClick(article)}
                  >
                    <Image
                      src={getStrapiImageUrl(article.thumbnail, "medium")}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      unoptimized={process.env.NODE_ENV === "development"}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <CardContent className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span className="mr-3">
                        {formatDate(article.publishedAt)}
                      </span>
                      {article.category && (
                        <>
                          <div className="w-1 h-1 bg-gray-300 rounded-full mx-2"></div>
                          <Badge
                            variant="secondary"
                            className="text-xs bg-blue-50 text-blue-700 hover:bg-blue-100"
                          >
                            {getCategoryName(article.category)}
                          </Badge>
                        </>
                      )}
                    </div>

                    <h3
                      className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 cursor-pointer"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical" as const,
                        overflow: "hidden",
                      }}
                      onClick={() => handleArticleClick(article)}
                    >
                      {article.title}
                    </h3>

                    <div
                      className="text-gray-600 mb-6 flex-1 prose prose-sm max-w-none"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical" as const,
                        overflow: "hidden",
                      }}
                      dangerouslySetInnerHTML={{
                        __html: extractHtmlExcerpt(article.content, 120),
                      }}
                    />

                    <div className="flex justify-end mt-auto">
                      <Button
                        variant="ghost"
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-0 group-hover:translate-x-1 transition-all duration-300"
                        onClick={() => handleArticleClick(article)}
                      >
                        Đọc thêm
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      {/* Load More Button - Chỉ hiển thị khi chưa showAll và có > 3 articles */}
      {!showAll && hasMoreArticles && news.length > 0 && (
        <motion.div
          className="text-center pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            size="lg"
          >
            {loadingMore ? (
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                <span>Đang tải...</span>
              </motion.div>
            ) : (
              <motion.div
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Xem thêm tin tức</span>
                <motion.div
                  animate={{ y: [0, -2, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ChevronDown className="ml-3 h-5 w-5" />
                </motion.div>
              </motion.div>
            )}
          </Button>

          {/* Decorative elements */}
          <div className="flex justify-center mt-4 space-x-1">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Show less button when showing all */}
      {showAll && (
        <motion.div
          className="text-center pt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Button
            onClick={() => setShowAll(false)}
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-full"
          >
            Thu gọn
            <motion.div
              animate={{ y: [0, 2, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ChevronDown className="ml-2 h-4 w-4 rotate-180" />
            </motion.div>
          </Button>
        </motion.div>
      )}
    </div>
  );
}
