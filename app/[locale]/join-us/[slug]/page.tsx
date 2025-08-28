"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from 'framer-motion'
import { useParams, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { ComponentType } from 'react'
import {
  ArrowLeft,
  Building,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Star,
  CheckCircle,
  Target,
  Gift,
  Heart,
  Calendar,
  Mail,
  Phone,
  AlertCircle,
  Loader2
} from "lucide-react"
import Footer from "@/components/footer"
import { StrapiJobItem, convertJobDescriptionToHtml } from "@/types/job-real"
import { strapiService } from "@/services/strapi"

export default function JobDetailPage() {
  const [job, setJob] = useState<StrapiJobItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const locale = params.locale as string || 'en'
  const t = useTranslations('JobDetail')

  // Icon mapping - keep original icons for backward compatibility
  const iconMapping: Record<string, ComponentType<{ className?: string }>> = {
    'general-accountant': Building,
    'ecommerce-reconciliation-officer': Target,
    'packaging-staff': Gift,
    'customer-service-representative': Heart,
    // Add more mappings as needed
    'default': Building
  }

  // Color mapping - keep original colors
  const colorMapping: Record<string, { color: string; gradientFrom: string; gradientTo: string }> = {
    'general-accountant': { color: 'blue', gradientFrom: 'from-blue-500', gradientTo: 'to-blue-600' },
    'ecommerce-reconciliation-officer': { color: 'purple', gradientFrom: 'from-purple-500', gradientTo: 'to-purple-600' },
    'packaging-staff': { color: 'green', gradientFrom: 'from-green-500', gradientTo: 'to-green-600' },
    'customer-service-representative': { color: 'orange', gradientFrom: 'from-orange-500', gradientTo: 'to-orange-600' },
    'default': { color: 'blue', gradientFrom: 'from-blue-500', gradientTo: 'to-blue-600' }
  }

  // Fetch job data from Strapi
  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // First try to get job by slug
        const jobData = await strapiService.getJobBySlug(slug, locale)
        setJob(jobData)
      } catch (err) {
        console.error('Error fetching job:', err)
        setError('Không thể tải thông tin việc làm')
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchJob()
    }
  }, [slug, locale])

  // Helper functions using only API data with sensible defaults
  const getJobTitle = () => job?.title || 'Chưa có tiêu đề'
  
  // Get experience field (fallback to department for backward compatibility)
  const getJobExperience = () => {
    if (job?.job_detail?.experience) {
      return job.job_detail.experience;
    }
    // Fallback to department field for backward compatibility
    const jobDetailWithDepartment = job?.job_detail as {department?: string} | undefined;
    if (jobDetailWithDepartment?.department) {
      return jobDetailWithDepartment.department;
    }
    return 'Chưa xác định';
  }
  
  // Helper function to validate and format date
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

  const getJobLocation = () => job?.working_information?.officeLocation || 'Chưa xác định'
  const getJobType = () => job?.job_detail?.employmentType || 'Chưa xác định'
  const getJobSalary = () => job?.job_detail?.salary || 'Thỏa thuận'
  const getJobValidThrough = () => {
    const validThrough = job?.job_detail?.valid_through;
    if (!validThrough) return 'Chưa xác định';
    
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
  }
  const getJobDescription = () => {
    if (job?.job_description) {
      return convertJobDescriptionToHtml(job.job_description)
    }
    return 'Chưa có mô tả công việc'
  }

  // Get icon and colors (fallback to default if not found)
  const IconComponent = iconMapping[slug] || iconMapping['default']
  const colors = colorMapping[slug] || colorMapping['default']

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-6 sm:py-8">
          <Button 
            variant="ghost" 
            onClick={() => router.push('/join-us')}
            className="mb-4 sm:mb-6 text-gray-600 hover:text-gray-900 text-sm sm:text-base"
          >
            <ArrowLeft className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            Back to All Jobs
          </Button>
          
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
              <p className="text-gray-600">{t('loading')}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-6 sm:py-8">
          <Button 
            variant="ghost" 
            onClick={() => router.push('/join-us')}
            className="mb-4 sm:mb-6 text-gray-600 hover:text-gray-900 text-sm sm:text-base"
          >
            <ArrowLeft className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            Back to All Jobs
          </Button>
          
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                {error}
              </h1>
              <Button onClick={() => router.push('/join-us')}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Quay lại danh sách việc làm
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="bg-white border-b"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-6 sm:py-8">
          <motion.div variants={itemVariants}>
            <Button 
              variant="ghost" 
              onClick={() => router.push('/join-us')}
              className="mb-4 sm:mb-6 text-gray-600 hover:text-gray-900 text-sm sm:text-base"
            >
              <ArrowLeft className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              {t('backToAllJobs')}
            </Button>
            
            {/* Mobile Layout */}
            <div className="block lg:hidden">
              <div className="text-center mb-6">
                <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${colors.gradientFrom} ${colors.gradientTo} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <IconComponent className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                </div>
                
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 px-2">
                  {getJobTitle()}
                </h1>
                
                <div className="flex flex-col gap-2 text-sm sm:text-base text-gray-600 mb-4">
                  <div className="flex items-center justify-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    {getJobLocation()}
                  </div>
                  <div className="flex items-center justify-center">
                    <Clock className="h-4 w-4 mr-2" />
                    {getJobType()}
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 mb-6">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs sm:text-sm mx-auto">
                    {getJobExperience()}
                  </Badge>
                  <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs sm:text-sm mx-auto">
                    {getJobSalary()}
                  </Badge>
                </div>
                
                <Button 
                  size="lg" 
                  className={`w-full sm:w-auto bg-gradient-to-r ${colors.gradientFrom} ${colors.gradientTo} hover:opacity-90 text-white`}
                  onClick={() => window.open(job?.applyLink || 'https://docs.google.com/forms/d/e/1FAIpQLSdEBgJlQMl9MJRmdwex0riAI12VTmRnpjLr4HuqHM7XYj54ew/viewform', '_blank')}
                >
                  {t('applyNow')}
                </Button>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:flex items-start gap-6">
              <div className={`w-16 h-16 bg-gradient-to-br ${colors.gradientFrom} ${colors.gradientTo} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                <IconComponent className="h-8 w-8 text-white" />
              </div>
              
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                  {getJobTitle()}
                </h1>
                <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    {getJobLocation()}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    {getJobType()}
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {getJobExperience()}
                  </Badge>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {getJobSalary()}
                  </Badge>
                </div>
              </div>
              
              <div className="flex-shrink-0">
                <Button 
                  size="lg" 
                  className={`bg-gradient-to-r ${colors.gradientFrom} ${colors.gradientTo} hover:opacity-90 text-white`}
                  onClick={() => window.open(job?.applyLink || 'https://docs.google.com/forms/d/e/1FAIpQLSdEBgJlQMl9MJRmdwex0riAI12VTmRnpjLr4HuqHM7XYj54ew/viewform', '_blank')}
                >
                  {t('applyNow')}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Content */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-12"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Job Description */}
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">{t('jobDescription')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div 
                      className="text-gray-700 leading-relaxed prose prose-lg max-w-none"
                      dangerouslySetInnerHTML={{ __html: getJobDescription() }}
                    />
                  </CardContent>
                </Card>
              </motion.div>

              {/* Responsibilities */}
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">{t('keyResponsibilities')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {job?.requirement?.map((responsibility, index) => (
                        <li key={responsibility.id || index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{responsibility.item}</span>
                        </li>
                      )) || (
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">Thông tin chi tiết sẽ được cung cấp trong quá trình phỏng vấn</span>
                        </li>
                      )}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Requirements */}
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">{t('requirements')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {job?.requirement?.map((requirement, index) => (
                        <li key={requirement.id || index} className="flex items-start">
                          <Star className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{requirement.item}</span>
                        </li>
                      )) || (
                        <li className="flex items-start">
                          <Star className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">Yêu cầu chi tiết sẽ được thảo luận trong quá trình phỏng vấn</span>
                        </li>
                      )}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Info */}
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle>{t('jobDetails')}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center">
                      <DollarSign className="h-5 w-5 text-green-500 mr-3" />
                      <div>
                        <div className="font-medium">{t('salary')}</div>
                        <div className="text-sm text-gray-600">{getJobSalary()}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-blue-500 mr-3" />
                      <div>
                        <div className="font-medium">{t('experience')}</div>
                        <div className="text-sm text-gray-600">{getJobExperience()}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-purple-500 mr-3" />
                      <div>
                        <div className="font-medium">{t('employmentType')}</div>
                        <div className="text-sm text-gray-600">{getJobType()}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-purple-500 mr-3" />
                      <div>
                        <div className="font-medium">{t('validThrough')}</div>
                        <div className="text-sm text-gray-600">{getJobValidThrough()}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Working Information */}
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle>{t('workingInformation')}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium">{t('workingHours')}</div>
                        <div className="text-sm text-gray-600 leading-relaxed">
                          {job?.working_information?.workingHours || 'Thông tin sẽ được thảo luận chi tiết'}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium">{t('officeLocation')}</div>
                        <div className="text-sm text-gray-600 leading-relaxed">
                          {job?.working_information?.officeLocation || 'Văn phòng tại Hồ Chí Minh'}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Benefits */}
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle>{t('benefitsPerks')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {job?.benefit?.map((benefit, index) => (
                        <li key={benefit.id || index} className="flex items-start">
                          <div className={`w-2 h-2 bg-${colors.color}-500 rounded-full mr-3 mt-2 flex-shrink-0`}></div>
                          <span className="text-sm text-gray-700">{benefit.item}</span>
                        </li>
                      )) || (
                        <li className="flex items-start">
                          <div className={`w-2 h-2 bg-${colors.color}-500 rounded-full mr-3 mt-2 flex-shrink-0`}></div>
                          <span className="text-sm text-gray-700">Phúc lợi hấp dẫn sẽ được thảo luận trong quá trình phỏng vấn</span>
                        </li>
                      )}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact */}
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle>{t('contactHR')}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-gray-500 mr-3" />
                      <span className="text-sm">
                        {job?.contact_hr?.contactEmail || 'tuyendung@tdaglobal.co'}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-500 mr-3" />
                      <span className="text-sm">
                        {job?.contact_hr?.contactPhone || '039 2881111'}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Apply Button */}
              <motion.div variants={itemVariants}>
                <Button 
                  size="lg" 
                  className={`w-full bg-gradient-to-r ${colors.gradientFrom} ${colors.gradientTo} hover:opacity-90 text-white`}
                  onClick={() => window.open(job?.applyLink || 'https://docs.google.com/forms/d/e/1FAIpQLSdEBgJlQMl9MJRmdwex0riAI12VTmRnpjLr4HuqHM7XYj54ew/viewform', '_blank')}
                >
                  {t('applyForThisPosition')}
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
