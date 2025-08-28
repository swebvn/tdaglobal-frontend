"use client"

import { Badge } from "@/components/ui/badge"
import {
  Search,
  Layers,
  Zap,
  Package,
  Lightbulb
} from "lucide-react"
import { motion } from "framer-motion"
import { useTranslations } from 'next-intl'
import Image from "next/image"
import Footer from "@/components/footer"
import { useState } from "react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const cardVariants = {
  hover: { 
    y: -8,
    transition: { duration: 0.3 }
  }
}

export default function OurWorkPage() {
  const t = useTranslations('OurWorkPage')
  const [activeCard, setActiveCard] = useState<number | null>(null)

  const handleCardClick = (cardIndex: number) => {
    setActiveCard(activeCard === cardIndex ? null : cardIndex)
  }
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div 
            variants={itemVariants}
            className="text-center space-y-6 max-w-4xl mx-auto"
          >
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{t('hero.badge')}</Badge>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('hero.title')}
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Crafting Experiences */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div 
            variants={itemVariants}
            className="text-center space-y-6 max-w-4xl mx-auto"
          >
            {/* Title */}
            <motion.h2 
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900"
            >
              {t('craftingExperiences.title')}
            </motion.h2>
            
            {/* Description */}
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-600 leading-relaxed"
            >
              {t('craftingExperiences.description')}
            </motion.p>

            {/* Key Features Grid */}
            <motion.div 
              variants={containerVariants}
              className="grid md:grid-cols-3 gap-8 pt-12"
            >
              <motion.div 
                variants={itemVariants}
                className="group text-center space-y-4"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto group-hover:bg-blue-200 transition-colors">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">{t('corePrinciples.innovation.title')}</h4>
                <p className="text-gray-600 text-sm">{t('corePrinciples.innovation.description')}</p>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="group text-center space-y-4"
              >
                <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto group-hover:bg-purple-200 transition-colors">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">{t('corePrinciples.craftsmanship.title')}</h4>
                <p className="text-gray-600 text-sm">{t('corePrinciples.craftsmanship.description')}</p>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="group text-center space-y-4"
              >
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto group-hover:bg-green-200 transition-colors">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">{t('corePrinciples.delight.title')}</h4>
                <p className="text-gray-600 text-sm">{t('corePrinciples.delight.description')}</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Our Expertise */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-20"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div 
            variants={itemVariants}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              {t('expertise.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('expertise.subtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Lighting */}
            <motion.div 
              variants={cardVariants}
              whileHover="hover"
              className="group relative rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 h-80 cursor-pointer"
              onClick={() => handleCardClick(0)}
            >
              {/* Image Background */}
              <Image
                src="/images/expertise-1.jpg"
                alt="Lighting Solutions"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              
              {/* Overlay with text on hover (Desktop) and click (Mobile) */}
              <div className={`absolute inset-0 bg-black/60 transition-opacity duration-300 flex items-center justify-center
                ${activeCard === 0 ? 'opacity-100 md:opacity-0 md:group-hover:opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                <div className="text-center text-white p-6">
                  <h3 className="text-xl sm:text-2xl font-bold mb-4">{t('expertise.lighting.title')}</h3>
                  <p className="text-sm sm:text-base leading-relaxed">{t('expertise.lighting.description')}</p>
                </div>
              </div>
            </motion.div>

            {/* Workspace Setup */}
            <motion.div 
              variants={cardVariants}
              whileHover="hover"
              className="group relative rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 h-80 cursor-pointer"
              onClick={() => handleCardClick(1)}
            >
              {/* Image Background */}
              <Image
                src="/images/expertise-2.jpg"
                alt="Workspace Setup"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              
              {/* Overlay with text on hover (Desktop) and click (Mobile) */}
              <div className={`absolute inset-0 bg-black/60 transition-opacity duration-300 flex items-center justify-center
                ${activeCard === 1 ? 'opacity-100 md:opacity-0 md:group-hover:opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                <div className="text-center text-white p-6">
                  <h3 className="text-xl sm:text-2xl font-bold mb-4">{t('expertise.workspaceSetup.title')}</h3>
                  <p className="text-sm sm:text-base leading-relaxed">{t('expertise.workspaceSetup.description')}</p>
                </div>
              </div>
            </motion.div>

            {/* Creative Accessories */}
            <motion.div 
              variants={cardVariants}
              whileHover="hover"
              className="group relative rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 h-80 cursor-pointer"
              onClick={() => handleCardClick(2)}
            >
              {/* Image Background */}
              <Image
                src="/images/expertise-3.jpg"
                alt="Creative Accessories"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              
              {/* Overlay with text on hover (Desktop) and click (Mobile) */}
              <div className={`absolute inset-0 bg-black/60 transition-opacity duration-300 flex items-center justify-center
                ${activeCard === 2 ? 'opacity-100 md:opacity-0 md:group-hover:opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                <div className="text-center text-white p-6">
                  <h3 className="text-xl sm:text-2xl font-bold mb-4">{t('expertise.creativeAccessories.title')}</h3>
                  <p className="text-sm sm:text-base leading-relaxed">{t('expertise.creativeAccessories.description')}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Design Process */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div 
            variants={itemVariants}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              {t('designProcess.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('designProcess.subtitle')}
            </p>
          </motion.div>

          {/* Process Steps */}
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-10 left-10 right-10 h-0.5 bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 hidden md:block"></div>
            
            <div className="grid md:grid-cols-5 gap-8 mb-16">
              {/* Step 1 */}
              <motion.div 
                variants={itemVariants}
                className="text-center space-y-4 relative"
              >
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto shadow-lg relative z-10 border-4 border-white">
                    <Search className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center z-20">
                    <span className="text-blue-600 font-bold text-sm">1</span>
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 text-lg">{t('designProcess.steps.discovery.title')}</h3>
                <p className="text-gray-600 text-sm">
                  {t('designProcess.steps.discovery.description')}
                </p>
              </motion.div>

              {/* Step 2 */}
              <motion.div 
                variants={itemVariants}
                className="text-center space-y-4 relative"
              >
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto shadow-lg relative z-10 border-4 border-white">
                    <Lightbulb className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center z-20">
                    <span className="text-indigo-600 font-bold text-sm">2</span>
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 text-lg">{t('designProcess.steps.concept.title')}</h3>
                <p className="text-gray-600 text-sm">
                  {t('designProcess.steps.concept.description')}
                </p>
              </motion.div>

              {/* Step 3 */}
              <motion.div 
                variants={itemVariants}
                className="text-center space-y-4 relative"
              >
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-lg relative z-10 border-4 border-white">
                    <Layers className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center z-20">
                    <span className="text-purple-600 font-bold text-sm">3</span>
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 text-lg">{t('designProcess.steps.refine.title')}</h3>
                <p className="text-gray-600 text-sm">
                  {t('designProcess.steps.refine.description')}
                </p>
              </motion.div>

              {/* Step 4 */}
              <motion.div 
                variants={itemVariants}
                className="text-center space-y-4 relative"
              >
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-lg relative z-10 border-4 border-white">
                    <Zap className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center z-20">
                    <span className="text-green-600 font-bold text-sm">4</span>
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 text-lg">{t('designProcess.steps.create.title')}</h3>
                <p className="text-gray-600 text-sm">
                  {t('designProcess.steps.create.description')}
                </p>
              </motion.div>

              {/* Step 5 */}
              <motion.div 
                variants={itemVariants}
                className="text-center space-y-4 relative"
              >
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto shadow-lg relative z-10 border-4 border-white">
                    <Package className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center z-20">
                    <span className="text-orange-600 font-bold text-sm">5</span>
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 text-lg">{t('designProcess.steps.deliver.title')}</h3>
                <p className="text-gray-600 text-sm">
                  {t('designProcess.steps.deliver.description')}
                </p>
              </motion.div>
            </div>
          </div>

          {/* Process Description */}
          <motion.div 
            variants={itemVariants}
            className="max-w-4xl mx-auto text-center"
          >
            <p className="text-lg text-gray-600 leading-relaxed">
              {t('designProcess.processDescription')}
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            variants={itemVariants}
            className="max-w-4xl mx-auto space-y-6 sm:space-y-8"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight px-4">
              {t('cta.title')}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-blue-100 leading-relaxed px-4 sm:px-8">
              {t('cta.description')}
            </p>
            {/* <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              variants={itemVariants}
            >
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
              >
                <Mail className="mr-2 h-5 w-5" />
                Contact Us
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent px-8 py-4 text-lg font-semibold"
              >
                View Portfolio
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div> */}
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
