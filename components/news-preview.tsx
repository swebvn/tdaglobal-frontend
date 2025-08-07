"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Calendar, Plus, TrendingUp, Clock } from "lucide-react";
import Image from "next/image";
import { useNews } from "@/hooks/useNews";
import {
  StrapiNewsItem,
  getStrapiImageUrl,
  extractHtmlExcerpt,
  getCategoryName,
} from "@/types/strapi";

interface NewsPreviewProps {
  locale?: string;
  onViewAll?: () => void;
  onArticleSelect?: (article: StrapiNewsItem) => void;
  showViewAllButton?: boolean;
  className?: string;
}

export default function NewsPreview({
  locale = "en",
  onViewAll,
  onArticleSelect,
  showViewAllButton = true,
  className = "",
}: NewsPreviewProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Navigation handler - ưu tiên callback trước
  const handleArticleClick = (article: StrapiNewsItem) => {
    if (onArticleSelect) {
      onArticleSelect(article);
    }
  };

  const { news, loading, error } = useNews({
    page: 1,
    pageSize: 3, // Chỉ hiển thị 3 tin đầu tiên
    locale,
  });

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 24) {
      return `${diffInHours} giờ trước`;
    } else if (diffInHours < 48) {
      return "Hôm qua";
    } else {
      return date.toLocaleDateString("vi-VN", {
        day: "numeric",
        month: "short",
      });
    }
  };

  if (loading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-40 animate-pulse"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="h-40 bg-gray-200 animate-pulse"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || news.length === 0) {
    return null; // Không hiển thị gì nếu có lỗi hoặc không có tin tức
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Tin tức nổi bật
            </h2>
            <p className="text-sm text-gray-600">3 bài viết mới nhất</p>
          </div>
        </div>

        {showViewAllButton && onViewAll && (
          <Button
            onClick={onViewAll}
            variant="outline"
            className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
          >
            Xem tất cả
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </motion.div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnimatePresence>
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
              whileHover={{ y: -8, scale: 1.02 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="group cursor-pointer"
              onClick={() => handleArticleClick(article)}
            >
              <Card className="overflow-hidden border-0 shadow-md hover:shadow-2xl transition-all duration-500 bg-white h-full flex flex-col relative">
                {/* Featured indicator */}
                <div className="absolute top-3 right-3 z-10">
                  <motion.div
                    animate={{
                      scale: hoveredIndex === index ? 1.1 : 1,
                      rotate: hoveredIndex === index ? 12 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold text-xs px-2 py-1 border-0 shadow-lg">
                      HOT
                    </Badge>
                  </motion.div>
                </div>

                <div className="relative h-40 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                  <Image
                    src={getStrapiImageUrl(article.thumbnail, "small")}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    unoptimized={process.env.NODE_ENV === "development"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <CardContent className="p-4 flex-1 flex flex-col">
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <Clock className="w-3 h-3 mr-1" />
                    <span className="mr-2">
                      {formatDate(article.publishedAt)}
                    </span>
                    {article.category && (
                      <>
                        <div className="w-0.5 h-0.5 bg-gray-300 rounded-full mx-2"></div>
                        <Badge
                          variant="secondary"
                          className="text-xs bg-blue-50 text-blue-700 px-1.5 py-0.5"
                        >
                          {getCategoryName(article.category)}
                        </Badge>
                      </>
                    )}
                  </div>

                  <h3
                    className="text-sm font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300 leading-snug"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical" as const,
                      overflow: "hidden",
                    }}
                  >
                    {article.title}
                  </h3>

                  <div
                    className="text-gray-600 text-xs mb-3 flex-1 leading-relaxed"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical" as const,
                      overflow: "hidden",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: extractHtmlExcerpt(article.content, 80),
                    }}
                  />

                  <div className="flex justify-between items-center mt-auto">
                    <div className="flex items-center text-xs text-gray-400">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>2 phút đọc</span>
                    </div>
                    <motion.div
                      animate={{
                        x: hoveredIndex === index ? 4 : 0,
                        scale: hoveredIndex === index ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight className="w-4 h-4 text-blue-600" />
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Bottom action button if there are more articles */}
      {news.length === 3 && showViewAllButton && onViewAll && (
        <motion.div
          className="text-center pt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button
            onClick={onViewAll}
            variant="ghost"
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-medium"
          >
            <Plus className="mr-2 h-4 w-4" />
            Khám phá thêm nhiều tin tức
          </Button>
        </motion.div>
      )}
    </div>
  );
}
