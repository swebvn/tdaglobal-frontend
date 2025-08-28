"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useTranslations } from 'next-intl'
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Mail,
  MapPin,
  ArrowRight
} from "lucide-react"

// Pre-defined particle positions to avoid hydration mismatch
const particlePositions = [
  { left: 15.5, top: 25.2, z: -50 },
  { left: 45.3, top: 75.8, z: 80 },
  { left: 77.1, top: 19.4, z: -20 },
  { left: 25.7, top: 60.9, z: 120 },
  { left: 85.2, top: 40.1, z: -80 },
  { left: 60.8, top: 85.5, z: 30 },
  { left: 35.4, top: 15.7, z: -100 },
  { left: 70.9, top: 55.3, z: 60 },
  { left: 92.1, top: 30.8, z: -40 },
  { left: 18.6, top: 70.2, z: 90 },
  { left: 55.3, top: 95.1, z: -70 },
  { left: 40.7, top: 8.9, z: 40 },
  { left: 80.4, top: 65.7, z: -90 },
  { left: 12.8, top: 45.4, z: 110 },
  { left: 67.5, top: 22.6, z: -30 }
]

export default function Footer() {
  const t = useTranslations("Footer")
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <footer className="relative bg-gradient-to-br from-blue-950 via-blue-800 to-blue-600 text-white overflow-hidden">
      {/* Enhanced 3D Blue Background */}
      <div className="absolute inset-0">
        {/* 3D Perspective Container */}
        <div 
          className="absolute inset-0"
          style={{
            perspective: "1200px",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Layer 1: Deep Blue Orbs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-blue-400/40 to-blue-600/40 rounded-full blur-2xl"
            style={{ transform: "translateZ(-100px)" }}
            animate={{ 
              scale: [1, 1.3, 1], 
              x: [0, 60, 0],
              rotateY: [0, 180, 360]
            }}
            transition={{ duration: 12, repeat: Infinity }}
          />
          
          {/* Layer 2: Medium Blue Sphere */}
          <motion.div
            className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-tr from-cyan-400/35 to-blue-500/35 rounded-full blur-xl"
            style={{ transform: "translateZ(50px)" }}
            animate={{ 
              scale: [1, 0.8, 1.1, 1], 
              y: [0, -40, 20, 0],
              rotateX: [0, 360]
            }}
            transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          />
          
          {/* Layer 3: Bright Blue Accent */}
          <motion.div
            className="absolute bottom-1/4 left-1/2 w-48 h-48 bg-gradient-to-bl from-sky-300/30 to-blue-700/30 rounded-full blur-lg"
            style={{ transform: "translateZ(100px)" }}
            animate={{ 
              scale: [1, 1.4, 0.9, 1], 
              x: [0, -50, 30, 0],
              rotateZ: [0, 180]
            }}
            transition={{ duration: 8, repeat: Infinity, delay: 4 }}
          />
          
          {/* 3D Grid Lines */}
          <div className="absolute inset-0 opacity-10">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={`grid-${i}`}
                className="absolute h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent"
                style={{
                  top: `${20 + i * 15}%`,
                  width: "100%",
                  transform: `rotateX(60deg) translateZ(${i * 30}px)`,
                }}
                animate={{
                  scaleX: [0.5, 1.5, 0.5],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>
          
          {/* Floating 3D Particles - Fixed positions */}
          <div className="absolute inset-0">
            {isMounted && particlePositions.map((particle, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-2 h-2 bg-blue-300/60 rounded-full"
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  transform: `translateZ(${particle.z}px)`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 0.8, 0],
                  y: [0, -50],
                }}
                transition={{
                  duration: (i % 3) + 3,
                  repeat: Infinity,
                  delay: (i % 5) * 0.5,
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Blue Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-900/70 to-blue-800/50" />
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-blue-950/60" />
      </div>

      <div className="relative z-10 py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Company Info */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="col-span-1"
            >
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div className="relative">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg sm:text-xl">T</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-300 to-blue-500 rounded-lg blur-lg opacity-50 -z-10" />
                </div>
                <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  TDA Global
                </span>
              </div>
              
              <p className="text-blue-100 mb-3 sm:mb-4 leading-relaxed text-xs sm:text-sm">
                {t("companyDescription")}
              </p>
              
              {/* Contact Info */}
              <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                <motion.div 
                  className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors cursor-pointer text-xs sm:text-sm"
                  whileHover={{ x: 3 }}
                >
                  <Mail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="break-all">contact@tdaglobal.co</span>
                </motion.div>
                <motion.div 
                  className="flex items-start gap-2 text-blue-200 hover:text-white transition-colors cursor-pointer text-xs sm:text-sm"
                  whileHover={{ x: 3 }}
                >
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium">{t("contact.officeAddress")}:</div>
                    <div>{t("contact.address1")}</div>
                    <div>{t("contact.address2")}</div>
                  </div>
                </motion.div>
              </div>

              {/* Social Media */}
              <div className="flex items-center gap-2 sm:gap-3">
                {[
                  { icon: Facebook, color: "from-blue-600 to-blue-700", name: "Facebook" },
                  { icon: Twitter, color: "from-sky-500 to-sky-600", name: "Twitter" },
                  { icon: Linkedin, color: "from-blue-700 to-blue-800", name: "LinkedIn" },
                  { icon: Instagram, color: "from-pink-500 to-purple-600", name: "Instagram" },
                ].map((social) => (
                  <motion.div
                    key={social.name}
                    className={`w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br ${social.color} rounded-lg flex items-center justify-center cursor-pointer shadow-lg`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    transition={{ duration: 0.3 }}
                    title={social.name}
                  >
                    <social.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="col-span-1"
            >
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-blue-200">{t("quickLinks.title")}</h3>
              <ul className="space-y-1.5 sm:space-y-2">
                {[
                  { name: t("quickLinks.aboutUs"), href: '/about' },
                  { name: t("quickLinks.ourWork"), href: '/our-work' },
                  { name: t("quickLinks.news"), href: '/news' },
                  { name: t("quickLinks.joinUs"), href: '/join-us' }
                ].map((link) => (
                  <motion.li 
                    key={link.name}
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <a 
                      href={link.href} 
                      className="text-blue-300 hover:text-white transition-colors duration-300 flex items-center gap-2 group text-xs sm:text-sm"
                    >
                      <span>{link.name}</span>
                      <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Google Map Location */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="col-span-1"
            >
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-blue-200">{t("location.title")}</h3>
              
              {/* Map Container */}
              <div className="relative rounded-lg overflow-hidden shadow-lg border border-blue-400/20 mb-3">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.2092830476918!2d105.77337137525538!3d20.98424633065397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313453c6258e889f%3A0xbe01b35b5abc2def!2zR2FsYXh5IHbhuqFuIHBow7pj!5e0!3m2!1sen!2s!4v1753766811331!5m2!1sen!2s"
                  width="100%"
                  height="160"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale-0 hover:grayscale-0 transition-all duration-500"
                  title="TDA Global Office Location - Galaxy TSQ"
                />
                {/* Blue overlay for better integration */}
                <div className="absolute inset-0 bg-blue-900/10 pointer-events-none"></div>
              </div>
              
              {/* Address Details */}
              <div className="text-xs text-blue-300 space-y-1">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3 h-3 text-blue-400 flex-shrink-0" />
                  <span className="font-medium text-blue-200">{t("location.building")}</span>
                </div>
                <div className="pl-5 text-blue-300/80">
                  <p>{t("location.address1")}</p>
                  <p>{t("location.address2")}</p>
                </div>
                <div className="pl-5 pt-1">
                  <motion.a
                    href="https://maps.google.com/?q=Galaxy+TSQ,+Ha+Dong,+Hanoi,+Vietnam"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-1 text-xs"
                    whileHover={{ x: 2 }}
                  >
                    <span>{t("location.viewOnMaps")}</span>
                    <ArrowRight className="w-2.5 h-2.5" />
                  </motion.a>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Bottom Copyright */}
          <motion.div
            className="border-t border-blue-400/20 mt-6 sm:mt-8 pt-3 sm:pt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-between text-xs">
              <p className="text-blue-200 mb-2 sm:mb-0 text-center sm:text-left">
                {t("copyright")}
              </p>
              <div className="flex items-center gap-3 sm:gap-4">
                {[t("privacyPolicy"), t("termsOfService")].map((policy) => (
                  <motion.a
                    key={policy}
                    href="#"
                    className="text-blue-300 hover:text-white transition-colors duration-300 text-xs"
                    whileHover={{ y: -1 }}
                  >
                    {policy}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
