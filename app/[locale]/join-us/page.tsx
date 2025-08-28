"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import { Link } from "@/i18n/navigation"
import {
  ArrowRight,
  Users,
  TrendingUp,
  Award,
  Building,
  Zap,
  Target,
  Lightbulb,
  Heart,
  Clock,
  Loader2
} from "lucide-react"
import Footer from "@/components/footer"
import { StrapiJobItem } from "@/types/job-real"
import { strapiService } from "@/services/strapi"

export default function JoinUsPage() {
  const t = useTranslations('JoinUsPage')
  const tJob = useTranslations('JoinUsJobList')
  const locale = useLocale()
  const [jobs, setJobs] = useState<StrapiJobItem[]>([])
  const [loading, setLoading] = useState(true)
  
  // Helper function to get experience field (fallback to department if needed)
  const getExperienceText = (job: StrapiJobItem) => {
    if (job?.job_detail?.experience) {
      return job.job_detail.experience;
    }
    const jobDetailWithDepartment = job?.job_detail as {department?: string} | undefined;
    if (jobDetailWithDepartment?.department) {
      return jobDetailWithDepartment.department;
    }
    return tJob('notSpecified');
  };

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
    if (!validThrough) return tJob('notSpecified');
    
    // Check if it's already in dd/mm/yyyy format
    if (validateDateFormat(validThrough)) {
      return validThrough;
    }
    
    // Try to parse and convert common date formats
    const date = new Date(validThrough);
    if (isNaN(date.getTime())) {
      return tJob('invalidDateFormat');
    }
    
    // Convert to dd/mm/yyyy format
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
  };
  
  // Load jobs from Strapi API
  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true)
        const jobsResponse = await strapiService.getJobs({
          pageSize: 4, // Show up to 4 jobs on join-us page
          locale: locale
        })
        setJobs(jobsResponse.data)
      } catch (error) {
        console.error('Error loading jobs:', error)
        // Fallback to empty array if API fails
        setJobs([])
      } finally {
        setLoading(false)
      }
    }

    loadJobs()
  }, [locale])  // Function to scroll to Open Positions section
  const scrollToOpenPositions = () => {
    const openPositionsSection = document.getElementById('open-positions')
    if (openPositionsSection) {
      openPositionsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
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
        duration: 0.7
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
      {/* Hero Section */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative bg-gradient-to-r from-blue-50 to-indigo-50 py-20"
      >
        <div className="container mx-auto px-4">
          <motion.div 
            variants={itemVariants}
            className="text-center space-y-6 max-w-4xl mx-auto"
          >
            <motion.div variants={itemVariants}>
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{t('hero.badge')}</Badge>
            </motion.div>
            <motion.h1 
              variants={itemVariants}
              className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight"
            >
              {t('hero.title')}
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              {t('hero.subtitle')}
            </motion.p>
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 w-auto px-6" onClick={scrollToOpenPositions}>
                <span className="whitespace-nowrap">{t('hero.viewJobs')}</span>
                <ArrowRight className="ml-2 h-4 w-4 flex-shrink-0" />
              </Button>
              <Link href="/about">
                <Button variant="outline" size="lg" className="w-auto px-6">
                  <span className="whitespace-nowrap">{t('hero.learnMore')}</span>
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Our Culture */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="py-20 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <motion.div 
            variants={itemVariants}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('culture.title')}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('culture.subtitle')}
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {/* Collaborative */}
            <motion.div variants={cardVariants} whileHover="hover">
              <Card className="hover:shadow-lg transition-shadow h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>{t('culture.collaborative.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {t('culture.collaborative.description')}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Creative Freedom */}
            <motion.div variants={cardVariants} whileHover="hover">
              <Card className="hover:shadow-lg transition-shadow h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle>{t('culture.creativeFreedom.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {t('culture.creativeFreedom.description')}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Work-Life Balance */}
            <motion.div variants={cardVariants} whileHover="hover">
              <Card className="hover:shadow-lg transition-shadow h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Target className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle>{t('culture.workLifeBalance.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {t('culture.workLifeBalance.description')}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Continuous Learning */}
            <motion.div variants={cardVariants} whileHover="hover">
              <Card className="hover:shadow-lg transition-shadow h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-orange-600" />
                  </div>
                  <CardTitle>{t('culture.continuousLearning.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {t('culture.continuousLearning.description')}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Why Join TDA Global */}
      <motion.section 
        className="py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('whyJoin.title')}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('whyJoin.subtitle')}
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {/* Innovative Projects */}
            <motion.div className="text-center" variants={cardVariants}>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('whyJoin.innovativeProjects.title')}</h3>
              <p className="text-gray-600">{t('whyJoin.innovativeProjects.description')}</p>
            </motion.div>

            {/* Professional Growth */}
            <motion.div className="text-center" variants={cardVariants}>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('whyJoin.professionalGrowth.title')}</h3>
              <p className="text-gray-600">{t('whyJoin.professionalGrowth.description')}</p>
            </motion.div>

            {/* Collaborative Team */}
            <motion.div className="text-center" variants={cardVariants}>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('whyJoin.collaborativeTeam.title')}</h3>
              <p className="text-gray-600">{t('whyJoin.collaborativeTeam.description')}</p>
            </motion.div>

            {/* Work-Life Balance */}
            <motion.div className="text-center" variants={cardVariants}>
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('whyJoin.workLifeBalance.title')}</h3>
              <p className="text-gray-600">{t('whyJoin.workLifeBalance.description')}</p>
            </motion.div>

            {/* Recognition */}
            <motion.div className="text-center" variants={cardVariants}>
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('whyJoin.recognition.title')}</h3>
              <p className="text-gray-600">{t('whyJoin.recognition.description')}</p>
            </motion.div>

            {/* Career Advancement */}
            <motion.div className="text-center" variants={cardVariants}>
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('whyJoin.careerAdvancement.title')}</h3>
              <p className="text-gray-600">{t('whyJoin.careerAdvancement.description')}</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Open Positions */}
      <motion.section 
        id="open-positions"
        className="py-20 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-full mx-auto px-4">
            {/* Header */}
            <motion.div className="text-center mb-16" variants={itemVariants}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                {t('openPositions.title')}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                {t('openPositions.subtitle')}
              </p>
              <Link href="/positions">
                <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                  {t('openPositions.viewAll')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>

            {/* Job Cards Grid */}
            <motion.div 
              className={`grid gap-6 lg:gap-8 w-full ${
                jobs.length === 1 ? 'grid-cols-1 max-w-md mx-auto' :
                jobs.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto' :
                jobs.length === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto' :
                jobs.length >= 4 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' :
                'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              }`}
              variants={containerVariants}
            >
              {/* Dynamic Job Cards from Strapi API */}
              {loading ? (
                // Loading state
                <div className="col-span-full flex justify-center items-center py-20">
                  <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
                    <p className="text-gray-600">{tJob('loadingJobs')}</p>
                  </div>
                </div>
              ) : jobs.length === 0 ? (
                // No jobs state
                <div className="col-span-full text-center py-20">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{tJob('noJobsTitle')}</h3>
                  <p className="text-gray-600">{tJob('noJobsMessage')}</p>
                </div>
              ) : (
                // Dynamic job cards from API
                jobs.map((job) => (
                  <motion.div key={job.id} variants={cardVariants} whileHover="hover">
                    <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-1 flex flex-col h-full">
                      <CardContent className="p-8 flex flex-col flex-1">
                        <div className="mb-6 flex-1">
                          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Building className="h-6 w-6 text-blue-600" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                            {job?.title || tJob('noTitleAvailable')}
                          </h3>
                          <div className="space-y-2 text-sm text-gray-600 mb-4">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-gray-400" />
                              <span>{formatValidThrough(job?.job_detail?.valid_through)}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-gray-400" />
                              <span>{job?.job_detail?.employmentType || tJob('notSpecified')}</span>
                            </div>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-2 text-gray-400" />
                              <span>{getExperienceText(job)}</span>
                            </div>
                          </div>
                          {job?.job_detail?.salary && (
                            <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                              {job.job_detail.salary}
                            </Badge>
                          )}
                        </div>
                        <Link href={`/join-us/${job?.slug || '#'}`}>
                          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium mt-auto">
                            {t('openPositions.apply')}
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </motion.div>

            {/* Bottom CTA */}
            <motion.div className="mt-16 text-center" variants={itemVariants}>
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-blue-50 text-blue-700 font-medium">
                <Zap className="h-5 w-5 mr-2" />
                {t('openPositions.moreSoon')}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
