"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Bookmark,
  User,
  // ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslations } from 'next-intl';
import { StrapiNewsItem, getStrapiImageUrl, getCategoryName } from "@/types/strapi";

interface NewsDetailProps {
  onBack: () => void;
  article: StrapiNewsItem;
}

export default function NewsDetail({ onBack, article }: NewsDetailProps) {
  const [isMounted, setIsMounted] = useState(false);
  const t = useTranslations('NewsPage');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    });
  };

  // Calculate estimated read time
  const estimateReadTime = (content: string) => {
    const plainText = content.replace(/<[^>]*>/g, '');
    const wordsPerMinute = 200;
    const wordCount = plainText.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readTime} min read`;
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gradient-to-b from-slate-50 to-white"
    >
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('backToNews')}
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-gray-800"
              >
                <Share2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-gray-800"
              >
                <Bookmark className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 mb-4">
              {getCategoryName(article.category)}
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                <span>TDA Global</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{formatDate(article.publishedAt)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>{estimateReadTime(article.content)}</span>
              </div>
            </div>
          </motion.div>

          {/* Featured Image */}
          {article.thumbnail && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-64 sm:h-80 md:h-96 mb-8 rounded-xl overflow-hidden"
            >
              <Image
                src={getStrapiImageUrl(article.thumbnail, 'large')}
                alt={article.title}
                fill
                className="object-cover"
                unoptimized={process.env.NODE_ENV === 'development'}
                onError={() => {
                  console.error('Failed to load image:', getStrapiImageUrl(article.thumbnail, 'large'));
                  console.error('Thumbnail data:', article.thumbnail);
                }}
                onLoad={() => {
                  console.log('Image loaded successfully:', getStrapiImageUrl(article.thumbnail, 'large'));
                }}
              />
            </motion.div>
          )}

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <div className="text-lg text-gray-700 leading-relaxed space-y-6 prose-custom">
              {isMounted && (
                <div
                  dangerouslySetInnerHTML={{ __html: article.content }}
                  className="prose prose-lg max-w-none"
                  style={{
                    fontSize: "1.125rem",
                    lineHeight: "1.75",
                  }}
                />
              )}
            </div>
          </motion.div>

          {/* Engagement Actions */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="border-t border-gray-200 pt-6 mb-8"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Like (24)
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Comment (8)
                </Button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-gray-800"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </motion.div> */}

          {/* Related Articles - Temporarily Disabled */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="border-t border-gray-200 pt-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Related Articles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group border-0 shadow-md">
                <div className="relative h-32 overflow-hidden">
                  <Image
                    src="/images/company-story.jpg"
                    alt="Related article"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>22 July 2025</span>
                  </div>
                  <h4
                    className="text-sm font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical" as const,
                      overflow: "hidden",
                    }}
                  >
                    Amazon FBA vs POD: Which Strategy Works Best in 2025?
                  </h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:text-blue-700 p-0 text-xs"
                  >
                    {t('readMore')}
                    <ChevronRight className="ml-1 h-3 w-3" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group border-0 shadow-md">
                <div className="relative h-32 overflow-hidden">
                  <Image
                    src="/images/company-story.jpg"
                    alt="Related article"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>20 July 2025</span>
                  </div>
                  <h4
                    className="text-sm font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical" as const,
                      overflow: "hidden",
                    }}
                  >
                    Top 10 POD Niches That Generated $1M+ in 2024
                  </h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:text-blue-700 p-0 text-xs"
                  >
                    {t('readMore')}
                    <ChevronRight className="ml-1 h-3 w-3" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </motion.div> */}
        </div>
      </div>
    </motion.div>
  );
}
