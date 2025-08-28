"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  X,
  ChevronDown,
  Hash,
  TrendingUp,
} from "lucide-react";

interface NewsFiltersProps {
  searchTerm: string;
  selectedCategory: string | null;
  categories: Array<{ id: string; name: string; count?: number }>;
  onSearchChange: (term: string) => void;
  onCategoryChange: (category: string | null) => void;
  onReset: () => void;
  className?: string;
  translations?: {
    searchPlaceholder: string;
    filtersLabel: string;
    clearFilters: string;
    categoriesLabel: string;
    allCategories: string;
  };
}

export default function NewsFilters({
  searchTerm,
  selectedCategory,
  categories,
  onSearchChange,
  onCategoryChange,
  onReset,
  className = "",
  translations,
}: NewsFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  // Default translations
  const t = {
    searchPlaceholder: translations?.searchPlaceholder || "Tìm kiếm tin tức...",
    filtersLabel: translations?.filtersLabel || "Bộ lọc",
    clearFilters: translations?.clearFilters || "Xóa bộ lọc",
    categoriesLabel: translations?.categoriesLabel || "Danh mục",
    allCategories: translations?.allCategories || "Tất cả",
  };

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(localSearchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearchTerm, onSearchChange]);

  // Sync with external search term changes
  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  const hasActiveFilters = searchTerm || selectedCategory;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search Bar */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder={t.searchPlaceholder}
            value={localSearchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
            className="pl-10 pr-12 py-3 text-sm border-gray-200 focus:border-blue-400 focus:ring-blue-400 rounded-xl bg-white shadow-sm"
          />
          {localSearchTerm && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLocalSearchTerm("")}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-100 rounded-full"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
      </motion.div>

      {/* Filter Toggle Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex items-center justify-between"
      >
        <Button
          variant="outline"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 border-gray-200 hover:bg-gray-50 rounded-xl px-4 py-2"
        >
          <Filter className="h-4 w-4" />
          <span>{t.filtersLabel}</span>
          {hasActiveFilters && (
            <Badge className="bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full">
              {(searchTerm ? 1 : 0) + (selectedCategory ? 1 : 0)}
            </Badge>
          )}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </Button>

        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              className="text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg px-3 py-1.5"
            >
              <X className="h-3 w-3 mr-1" />
              {t.clearFilters}
            </Button>
          </motion.div>
        )}
      </motion.div>

      {/* Filter Options */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden bg-white rounded-xl border border-gray-200 shadow-sm"
          >
            <div className="p-4 space-y-4">
              {/* Category Filter */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Hash className="h-4 w-4 text-gray-600" />
                  <span className="font-medium text-gray-900">{t.categoriesLabel}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {/* All Categories */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onCategoryChange(null)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                      !selectedCategory
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      <span>{t.allCategories}</span>
                    </div>
                  </motion.button>

                  {/* Category Options */}
                  {categories.map((category) => (
                    <motion.button
                      key={category.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onCategoryChange(category.id)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                        selectedCategory === category.id
                          ? "bg-blue-600 text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <div className="flex items-center gap-1">
                        <span>{category.name}</span>
                        {category.count !== undefined && (
                          <Badge
                            variant="secondary"
                            className={`text-xs px-1.5 py-0.5 rounded-full ${
                              selectedCategory === category.id
                                ? "bg-white/20 text-white"
                                : "bg-white text-gray-600"
                            }`}
                          >
                            {category.count}
                          </Badge>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Quick Filters */}
              {/* <div>
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-4 w-4 text-gray-600" />
                  <span className="font-medium text-gray-900">Lọc nhanh</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setLocalSearchTerm("hướng dẫn")}
                    className="px-3 py-1.5 rounded-full text-sm bg-green-100 text-green-700 hover:bg-green-200 transition-colors duration-200"
                  >
                    🔥 Hướng dẫn
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setLocalSearchTerm("tips")}
                    className="px-3 py-1.5 rounded-full text-sm bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition-colors duration-200"
                  >
                    💡 Tips
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setLocalSearchTerm("amazon")}
                    className="px-3 py-1.5 rounded-full text-sm bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors duration-200"
                  >
                    🛒 Amazon
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setLocalSearchTerm("POD")}
                    className="px-3 py-1.5 rounded-full text-sm bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors duration-200"
                  >
                    🎨 POD
                  </motion.button>
                </div>
              </div> */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-wrap items-center gap-2"
        >
          <span className="text-sm text-gray-600">Đang lọc:</span>

          {searchTerm && (
            <Badge
              variant="outline"
              className="bg-blue-50 text-blue-700 border-blue-200 px-2 py-1 rounded-md"
            >
              <Search className="h-3 w-3 mr-1" />
              &ldquo;{searchTerm}&rdquo;
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLocalSearchTerm("")}
                className="ml-1 h-3 w-3 p-0 hover:bg-blue-200 rounded-full"
              >
                <X className="h-2 w-2" />
              </Button>
            </Badge>
          )}

          {selectedCategory && (
            <Badge
              variant="outline"
              className="bg-green-50 text-green-700 border-green-200 px-2 py-1 rounded-md"
            >
              <Hash className="h-3 w-3 mr-1" />
              {categories.find((cat) => cat.id === selectedCategory)?.name ||
                selectedCategory}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onCategoryChange(null)}
                className="ml-1 h-3 w-3 p-0 hover:bg-green-200 rounded-full"
              >
                <X className="h-2 w-2" />
              </Button>
            </Badge>
          )}
        </motion.div>
      )}
    </div>
  );
}
