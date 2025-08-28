"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useTranslations, useLocale } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from "@/i18n/navigation"
import {
  Search,
  Filter,
  ArrowLeft,
  Building,
  Clock,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Users,
  Zap
} from "lucide-react"
import Footer from "@/components/footer"
import { StrapiJobItem } from "@/types/job-real"
import { strapiService } from "@/services/strapi"

export default function AllPositionsPage() {
  const t = useTranslations('AllPositionsPage')
  const locale = useLocale()
  
  const [jobs, setJobs] = useState<StrapiJobItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedExperience, setSelectedExperience] = useState<string>("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalJobs, setTotalJobs] = useState(0)
  const pageSize = 12

  // Helper function to get experience field (fallback to department if needed)
  const getExperienceText = useCallback((job: StrapiJobItem) => {
    if (job?.job_detail?.experience) {
      return job.job_detail.experience;
    }
    const jobDetailWithDepartment = job?.job_detail as {department?: string} | undefined;
    if (jobDetailWithDepartment?.department) {
      return jobDetailWithDepartment.department;
    }
    return t('notSpecified');
  }, [t]);

  // Helper function to validate and format date to dd/mm/yyyy
  const validateDateFormat = (dateString: string) => {
    // Check if date matches dd/mm/yyyy format
    const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = dateString.match(dateRegex);
    
    if (!match) {
      return false;
    }
    
    const [, day, month, year] = match;
    const dayNum = parseInt(day, 10);
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt(year, 10);
    
    // Basic validation
    if (dayNum < 1 || dayNum > 31) return false;
    if (monthNum < 1 || monthNum > 12) return false;
    if (yearNum < 1900 || yearNum > 2100) return false;
    
    // Create date object to check if it's a valid date
    const date = new Date(yearNum, monthNum - 1, dayNum);
    return date.getDate() === dayNum && 
           date.getMonth() === monthNum - 1 && 
           date.getFullYear() === yearNum;
  }

  const formatValidThrough = (validThrough: string | undefined) => {
    if (!validThrough) return t('notSpecified');
    
    // Check if it's already in dd/mm/yyyy format
    if (validateDateFormat(validThrough)) {
      return validThrough;
    }
    
    // Try to parse and convert common date formats
    const date = new Date(validThrough);
    if (isNaN(date.getTime())) {
      return 'Định dạng ngày không hợp lệ';
    }
    
    // Convert to dd/mm/yyyy format
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
  };

  // Load jobs from Strapi API
  const loadJobs = useCallback(async (page: number = 1, search: string = "", experience: string = "") => {
    try {
      setLoading(true)
      const params: Record<string, string | number> = {
        page,
        pageSize,
        locale: locale,
      }
      
      if (search.trim()) {
        params.search = search.trim()
      }
      
      if (experience) {
        params.category = experience
      }

      const jobsResponse = await strapiService.getJobs(params)
      setJobs(jobsResponse.data)
      setTotalPages(jobsResponse.meta.pagination.pageCount)
      setTotalJobs(jobsResponse.meta.pagination.total)
    } catch (error) {
      console.error('Error loading jobs:', error)
      setJobs([])
      setTotalPages(1)
      setTotalJobs(0)
    } finally {
      setLoading(false)
    }
  }, [locale])

  // Single useEffect to handle all API calls with proper debouncing
  useEffect(() => {
    const timer = setTimeout(() => {
      loadJobs(currentPage, searchTerm, selectedExperience)
    }, searchTerm || selectedExperience ? 500 : 0) // Only debounce for search/filter, not pagination

    return () => clearTimeout(timer)
  }, [currentPage, searchTerm, selectedExperience, loadJobs])

  // Handle experience filter
  const handleExperienceFilter = (experience: string) => {
    setSelectedExperience(experience === selectedExperience ? "" : experience)
    setCurrentPage(1) // Reset to first page when filtering
  }

  // Get unique experiences from current jobs
  const experiences = useMemo(() => {
    const uniqueExperiences = Array.from(new Set(
      jobs
        .map(job => getExperienceText(job))
        .filter(experience => experience && experience.trim() !== '' && experience !== t('notSpecified'))
    ))
    return uniqueExperiences.filter(Boolean) as string[]
  }, [jobs, getExperienceText, t])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.2
      }
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative bg-gradient-to-r from-blue-50 to-indigo-50 py-16"
      >
        <div className="container mx-auto px-4">
          <motion.div 
            variants={itemVariants}
            className="flex items-center mb-8"
          >
            <Link href="/join-us" className="flex items-center text-blue-600 hover:text-blue-700 transition-colors">
              <ArrowLeft className="h-5 w-5 mr-2" />
              <span className="font-medium">{t('backToJoinUs')}</span>
            </Link>
          </motion.div>
          
          <motion.div variants={itemVariants} className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {t('title')}
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              {t('subtitle')}
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                <span>{totalJobs} {t('positionsCount')}</span>
              </div>
              <div className="flex items-center">
                <Zap className="h-4 w-4 mr-1" />
                <span>{t('hiringNow')}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Search and Filter Section */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="py-8 bg-white border-b"
      >
        <div className="container mx-auto px-4">
          <motion.div 
            variants={itemVariants}
            className="max-w-4xl mx-auto"
          >
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Experience Filters */}
            {experiences.length > 0 && (
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center">
                  <Filter className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">{t('experienceLabel')}</span>
                </div>
                <Button
                  variant={selectedExperience === "" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleExperienceFilter("")}
                  className="h-8"
                >
                  {t('allFilter')}
                </Button>
                {experiences.map((experience) => (
                  <Button
                    key={experience}
                    variant={selectedExperience === experience ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleExperienceFilter(experience)}
                    className="h-8"
                  >
                    {experience}
                  </Button>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* Jobs Grid */}
      <motion.section 
        className="py-12"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Results Info */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center justify-between mb-8"
            >
              <div className="text-gray-600">
                {loading ? (
                  <span>{t('loading')}</span>
                ) : (
                  <span>
                    {t('showingResults', { count: jobs.length, total: totalJobs })}
                    {searchTerm && ` ${t('searchFor', { term: searchTerm })}`}
                    {selectedExperience && ` ${t('withExperience', { experience: selectedExperience })}`}
                  </span>
                )}
              </div>
              <div className="text-sm text-gray-500">
                {t('pageInfo', { current: currentPage, total: totalPages })}
              </div>
            </motion.div>

            {/* Job Cards */}
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-center items-center py-20"
                >
                  <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
                    <p className="text-gray-600">{t('loadingJobs')}</p>
                  </div>
                </motion.div>
              ) : jobs.length === 0 ? (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-20"
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {t('noPositionsFound')}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {searchTerm || selectedExperience
                      ? t('tryChangingFilters')
                      : t('noOpenPositions')
                    }
                  </p>
                  {(searchTerm || selectedExperience) && (
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSearchTerm("")
                        setSelectedExperience("")
                      }}
                    >
                      {t('clearFilters')}
                    </Button>
                  )}
                </motion.div>
              ) : (
                <motion.div 
                  key="jobs"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  variants={containerVariants}
                >
                  {jobs.map((job, index) => (
                      <motion.div 
                        key={job.id} 
                        variants={cardVariants} 
                        whileHover="hover"
                        custom={index}
                      >
                        <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-1 flex flex-col h-full">
                          <CardContent className="p-6 flex flex-col flex-1">
                            <div className="mb-4 flex-1">
                              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Building className="h-6 w-6 text-blue-600" />
                              </div>
                              <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                                {job.title || t('noTitleAvailable')}
                              </h3>
                              <div className="space-y-2 text-sm text-gray-600 mb-4">
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                                  <span className="truncate">{formatValidThrough(job?.job_detail?.valid_through)}</span>
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                                  <span className="truncate">{job?.job_detail?.employmentType || t('notSpecified')}</span>
                                </div>
                                <div className="flex items-center">
                                  <Building className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                                  <span className="truncate">{getExperienceText(job)}</span>
                                </div>
                              </div>
                              {job?.job_detail?.salary && (
                                <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                                  {job.job_detail.salary}
                                </Badge>
                              )}
                            </div>
                            <Link href={`/join-us/${job.slug || '#'}`} className="w-full">
                              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium mt-auto">
                                {t('viewDetails')}
                              </Button>
                            </Link>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pagination */}
            {!loading && jobs.length > 0 && totalPages > 1 && (
              <motion.div 
                variants={itemVariants}
                className="flex justify-center items-center space-x-2 mt-12"
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="h-10 w-10 p-0"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                {/* Page Numbers */}
                <div className="flex space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum
                    if (totalPages <= 5) {
                      pageNum = i + 1
                    } else if (currentPage <= 3) {
                      pageNum = i + 1
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i
                    } else {
                      pageNum = currentPage - 2 + i
                    }
                    
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                        className="h-10 w-10 p-0"
                      >
                        {pageNum}
                      </Button>
                    )
                  })}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="h-10 w-10 p-0"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
