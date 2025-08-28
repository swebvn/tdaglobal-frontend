"use client";

import Footer from "@/components/footer";
import {
  ArrowRight,
  Truck,
  Shield,
  Headphones,
  RotateCcw,
  Users,
  Newspaper,
  Award,
  Target,
} from "lucide-react";
import { motion } from "framer-motion";
import { Parallax } from "react-scroll-parallax";
import { useTranslations } from "next-intl";
import CountUp from "@/components/ui/count-up";
import AnimatedBackground from "@/components/ui/animated-background";
import ResponsiveHero from "@/components/responsive-hero";
import { useEffect } from "react";
import { Link } from "@/i18n/navigation";

export default function Home() {
  const t = useTranslations("HomePage");

  // Calculate proper hero height based on header size
  useEffect(() => {
    const updateHeroHeight = () => {
      const header = document.querySelector('header');
      if (header) {
        const headerHeight = header.offsetHeight;
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
          (heroSection as HTMLElement).style.minHeight = `calc(100vh - ${headerHeight}px)`;
        }
      }
    };

    // Update on load and resize
    updateHeroHeight();
    window.addEventListener('resize', updateHeroHeight);

    // Additional scroll to top for home page (in case of navigation)
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateHeroHeight);
    };
  }, []);

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ marginTop: 0, paddingTop: 0 }}
    >
      {/* Hero Section */}
      <ResponsiveHero className="relative overflow-hidden z-10 w-full">
        <motion.section
          id="hero"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full h-full flex items-center justify-center absolute inset-0"
        >
        {/* 3D Animated Background */}
        <AnimatedBackground />

        <div className="relative container-responsive mx-auto text-center text-white max-w-7xl z-20 overflow-x-hidden px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4 sm:space-y-6 md:space-y-8 h-short:space-y-2 h-vshort:space-y-1"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl nest-hub:text-3xl h-short:text-2xl h-vshort:text-xl font-bold leading-[1.1] sm:leading-tight h-short:leading-tight h-vshort:leading-snug">
              <span className="block text-white mb-2 sm:mb-4 h-short:mb-1 h-vshort:mb-0">
                {t("title")}
              </span>
              <span className="block bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-200 bg-clip-text text-transparent">
                {t("title2")}
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl nest-hub:text-sm h-short:text-sm h-vshort:text-xs text-blue-100/90 max-w-5xl mx-auto leading-relaxed font-medium px-2 sm:px-4 h-short:leading-snug h-vshort:leading-tight">
              {t("description")}
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 lg:gap-8 nest-hub:gap-2 h-short:gap-2 h-vshort:gap-1 justify-center items-center mt-6 sm:mt-8 md:mt-12 nest-hub:mt-2 h-short:mt-2 h-vshort:mt-1 mb-8 sm:mb-12 md:mb-16 lg:mb-20 nest-hub:mb-3 h-short:mb-2 h-vshort:mb-1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Link href="/about">
              <motion.button
                className="group relative px-6 sm:px-8 md:px-10 lg:px-12 xl:px-14 nest-hub:px-4 h-short:px-3 h-vshort:px-2 py-3 sm:py-4 md:py-5 lg:py-6 nest-hub:py-1 h-short:py-1 h-vshort:py-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm sm:text-base md:text-lg lg:text-xl nest-hub:text-sm h-short:text-xs h-vshort:text-xs rounded-full transition-all duration-300 hover:shadow-2xl hover:scale-105 w-full sm:w-auto max-w-xs sm:max-w-none overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center justify-center whitespace-nowrap">
                  <span className="hidden sm:inline">{t("getStarted")}</span>
                  <span className="sm:hidden text-xs">
                    {t("getStarted").split(" ").slice(0, 2).join(" ")}
                  </span>
                  <ArrowRight className="ml-2 h-3 sm:h-4 md:h-5 w-3 sm:w-4 md:w-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-indigo-800 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>
            </Link>

            <Link href="/join-us">
              <motion.button
                className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 nest-hub:px-4 h-short:px-3 h-vshort:px-2 py-3 sm:py-4 md:py-5 lg:py-6 nest-hub:py-1 h-short:py-1 h-vshort:py-0.5 border-2 border-white/30 text-white hover:bg-white/10 bg-white/5 backdrop-blur-md font-semibold text-sm sm:text-base md:text-lg lg:text-xl nest-hub:text-sm h-short:text-xs h-vshort:text-xs rounded-full transition-all duration-300 hover:border-white/50 hover:shadow-lg w-full sm:w-auto max-w-xs sm:max-w-none"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t("learnMore")}
              </motion.button>
            </Link>
          </motion.div>

          {/* Professional stats with modern design */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 nest-hub:gap-2 h-short:gap-1 h-vshort:gap-1 max-w-6xl mx-auto px-2 sm:px-4 h-short:grid-cols-2 h-vshort:grid-cols-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.div
              className="text-center group"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl nest-hub:text-lg font-bold text-white mb-1 sm:mb-2 nest-hub:mb-1 group-hover:scale-110 transition-transform duration-300">
                <CountUp
                  to={10}
                  from={0}
                  duration={2.5}
                  delay={1.2}
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl nest-hub:text-lg h-short:text-base h-vshort:text-sm font-bold text-white"
                  onStart={() => {}}
                  onEnd={() => {}}
                />
                <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl nest-hub:text-lg h-short:text-base h-vshort:text-sm font-bold text-white">
                  M+
                </span>
              </div>
              <div className="text-blue-200/80 text-xs sm:text-sm md:text-base lg:text-lg nest-hub:text-sm h-short:text-xs h-vshort:text-xs font-medium tracking-wide px-1">
                {t("stats.customers")}
              </div>
            </motion.div>
            <motion.div
              className="text-center group"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl nest-hub:text-lg font-bold text-white mb-1 sm:mb-2 nest-hub:mb-1 group-hover:scale-110 transition-transform duration-300">
                <CountUp
                  to={50}
                  from={0}
                  duration={2.5}
                  delay={1.4}
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl nest-hub:text-lg font-bold text-white"
                  onStart={() => {}}
                  onEnd={() => {}}
                />
                <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl nest-hub:text-lg font-bold text-white">
                  K+
                </span>
              </div>
              <div className="text-blue-200/80 text-xs sm:text-sm md:text-base lg:text-lg nest-hub:text-sm font-medium tracking-wide px-1">
                {t("stats.products")}
              </div>
            </motion.div>
            <motion.div
              className="text-center group"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.6 }}
            >
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl nest-hub:text-lg font-bold text-white mb-1 sm:mb-2 nest-hub:mb-1 group-hover:scale-110 transition-transform duration-300">
                <CountUp
                  to={99}
                  from={0}
                  duration={2.5}
                  delay={1.6}
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl nest-hub:text-lg font-bold text-white"
                  onStart={() => {}}
                  onEnd={() => {}}
                />
                <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl nest-hub:text-lg font-bold text-white">
                  %
                </span>
              </div>
              <div className="text-blue-200/80 text-xs sm:text-sm md:text-base lg:text-lg nest-hub:text-sm font-medium tracking-wide px-1">
                {t("stats.satisfaction")}
              </div>
            </motion.div>
            <motion.div
              className="text-center group"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.8 }}
            >
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl nest-hub:text-lg font-bold text-white mb-1 sm:mb-2 nest-hub:mb-1 group-hover:scale-110 transition-transform duration-300">
                <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl nest-hub:text-lg font-bold text-white">
                  24/7
                </span>
              </div>
              <div className="text-blue-200/80 text-xs sm:text-sm md:text-base lg:text-lg nest-hub:text-sm font-medium tracking-wide px-1">
                {t("stats.support")}
              </div>
            </motion.div>
          </motion.div>

          {/* Scroll Down Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 h-short:bottom-4 h-vshort:hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
          >
            <button
              onClick={() => {
                const element = document.getElementById("overview");
                if (element) {
                  element.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
              }}
              className="flex flex-col items-center text-white/80 hover:text-white transition-colors duration-300 group"
            >
              <span className="text-sm mb-2 animate-bounce">Scroll Down</span>
              <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce group-hover:bg-white"></div>
              </div>
            </button>
          </motion.div>
        </div>
        </motion.section>
      </ResponsiveHero>

      {/* Overview Section */}
      <motion.section
        id="overview"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className="py-16 px-4 sm:px-6 lg:px-8 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-4">
              {t("overview.title")}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4 leading-relaxed">
              {t("overview.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 px-4">
            {/* Giới thiệu */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Link href="/about" className="block h-full">
                <div className="group relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100/50 cursor-pointer transition-all duration-500 ease-in-out hover:shadow-2xl hover:-translate-y-3 hover:scale-[1.02] h-full flex flex-col">
                  <div className="absolute inset-0 bg-blue-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative flex-1 flex flex-col">
                    <div className="flex items-center mb-4">
                      <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 rounded-xl flex items-center justify-center mr-3 sm:mr-4 group-hover:scale-110 transition-transform duration-300 group-hover:bg-blue-500">
                        <Award className="h-6 w-6 sm:h-7 sm:w-7 text-blue-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="font-bold text-lg sm:text-xl text-gray-900 group-hover:text-blue-900 transition-colors leading-tight">
                        {t("overview.about.title")}
                      </h3>
                    </div>
                    <div className="flex-1 mb-4">
                      <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                        {t("overview.about.description")}
                      </p>
                    </div>
                    <div className="flex items-center text-blue-600 font-medium text-sm mt-auto">
                      <span>Learn More</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Our Work */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Link href="/our-work" className="block h-full">
                <div className="group relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100/50 cursor-pointer transition-all duration-500 ease-in-out hover:shadow-2xl hover:-translate-y-3 hover:scale-[1.02] h-full flex flex-col">
                  <div className="absolute inset-0 bg-purple-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative flex-1 flex flex-col">
                    <div className="flex items-center mb-4">
                      <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-purple-100 rounded-xl flex items-center justify-center mr-3 sm:mr-4 group-hover:scale-110 transition-transform duration-300 group-hover:bg-purple-500">
                        <Target className="h-6 w-6 sm:h-7 sm:w-7 text-purple-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="font-bold text-lg sm:text-xl text-gray-900 group-hover:text-purple-900 transition-colors leading-tight">
                        {t("overview.ourWork.title")}
                      </h3>
                    </div>
                    <div className="flex-1 mb-4">
                      <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                        {t("overview.ourWork.description")}
                      </p>
                    </div>
                    <div className="flex items-center text-purple-600 font-medium text-sm mt-auto">
                      <span>View Projects</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Join Us */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Link href="/join-us" className="block h-full">
                <div className="group relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100/50 cursor-pointer transition-all duration-500 ease-in-out hover:shadow-2xl hover:-translate-y-3 hover:scale-[1.02] h-full flex flex-col">
                  <div className="absolute inset-0 bg-green-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative flex-1 flex flex-col">
                    <div className="flex items-center mb-4">
                      <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-green-100 rounded-xl flex items-center justify-center mr-3 sm:mr-4 group-hover:scale-110 transition-transform duration-300 group-hover:bg-green-500">
                        <Users className="h-6 w-6 sm:h-7 sm:w-7 text-green-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="font-bold text-lg sm:text-xl text-gray-900 group-hover:text-green-900 transition-colors leading-tight">
                        {t("overview.joinUs.title")}
                      </h3>
                    </div>
                    <div className="flex-1 mb-4">
                      <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                        {t("overview.joinUs.description")}
                      </p>
                    </div>
                    <div className="flex items-center text-green-600 font-medium text-sm mt-auto">
                      <span>Join Our Team</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Tin tức */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Link href="/news" className="block h-full">
                <div className="group relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100/50 cursor-pointer transition-all duration-500 ease-in-out hover:shadow-2xl hover:-translate-y-3 hover:scale-[1.02] h-full flex flex-col">
                  <div className="absolute inset-0 bg-indigo-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative flex-1 flex flex-col">
                    <div className="flex items-center mb-4">
                      <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-indigo-100 rounded-xl flex items-center justify-center mr-3 sm:mr-4 group-hover:scale-110 transition-transform duration-300 group-hover:bg-indigo-500">
                        <Newspaper className="h-6 w-6 sm:h-7 sm:w-7 text-indigo-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="font-bold text-lg sm:text-xl text-gray-900 group-hover:text-indigo-900 transition-colors leading-tight">
                        {t("overview.news.title")}
                      </h3>
                    </div>
                    <div className="flex-1 mb-4">
                      <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                        {t("overview.news.description")}
                      </p>
                    </div>
                    <div className="flex items-center text-indigo-600 font-medium text-sm mt-auto">
                      <span>Read News</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Liên hệ */}
            {/* <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center justify-center"
            >
              <PinContainer
                title="/contact"
                href="/contact"
                className="w-full"
              >
                <div className="flex basis-full flex-col p-6 tracking-tight w-[24rem] h-[14rem] bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                      <Phone className="h-6 w-6 text-yellow-600" />
                    </div>
                    <h3 className="max-w-xs !pb-0 !m-0 font-bold text-xl text-gray-900">
                      {t('overview.contact.title')}
                    </h3>
                  </div>
                  <div className="text-base !m-0 !p-0 font-normal flex-1 min-h-[4rem]">
                    <span className="text-gray-700">
                      {t('overview.contact.description')}
                    </span>
                  </div>
                  <div className="flex w-full rounded-lg mt-4 bg-gray-100 h-3" />
                </div>
              </PinContainer>
            </motion.div> */}
          </div>
        </div>
      </motion.section>

      {/* Why Choose ShopVN - Premium Design */}
      <motion.section
        id="why-choose"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden scroll-mt-20"
      >
        {/* Professional Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-indigo-100/20"></div>

        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-5">
          <Parallax speed={-5}>
            <div className="absolute top-10 left-10 w-40 h-40 bg-blue-600 rounded-full blur-3xl animate-pulse"></div>
          </Parallax>
          <Parallax speed={8}>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-indigo-600 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </Parallax>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-4 sm:space-y-6 mb-16 sm:mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-4 py-2 bg-blue-100/80 backdrop-blur-sm border border-blue-200/50 rounded-full text-blue-700 text-sm font-medium shadow-sm"
            >
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
              {t("whyChoose.badge")}
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
            >
              {t("whyChoose.title")}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-gray-600 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed"
            >
              {t("whyChoose.subtitle")}
            </motion.p>
          </motion.div>

          {/* Features Grid - Premium Layout */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, staggerChildren: 0.1 }}
            viewport={{ once: true }}
          >
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="group relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100/50 cursor-pointer transition-all duration-500 ease-in-out hover:shadow-2xl hover:-translate-y-3 hover:scale-[1.02]"
            >
              <div className="absolute inset-0 bg-blue-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Truck className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-900 transition-colors">
                      {t("whyChoose.features.freeShipping.title")}
                    </h3>
                    <p className="text-gray-600 text-base leading-relaxed mb-4">
                      {t("whyChoose.features.freeShipping.description")}
                    </p>
                    <div className="flex items-center text-blue-600 font-medium text-sm">
                      <span>
                        {t("whyChoose.features.freeShipping.benefit")}
                      </span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100/50 cursor-pointer transition-all duration-500 ease-in-out hover:shadow-2xl hover:-translate-y-3 hover:scale-[1.02]"
            >
              <div className="absolute inset-0 bg-emerald-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Shield className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-900 transition-colors">
                      {t("whyChoose.features.security.title")}
                    </h3>
                    <p className="text-gray-600 text-base leading-relaxed mb-4">
                      {t("whyChoose.features.security.description")}
                    </p>
                    <div className="flex items-center text-emerald-600 font-medium text-sm">
                      <span>{t("whyChoose.features.security.benefit")}</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="group relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100/50 cursor-pointer transition-all duration-500 ease-in-out hover:shadow-2xl hover:-translate-y-3 hover:scale-[1.02]"
            >
              <div className="absolute inset-0 bg-purple-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-purple-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Headphones className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-900 transition-colors">
                      {t("whyChoose.features.support.title")}
                    </h3>
                    <p className="text-gray-600 text-base leading-relaxed mb-4">
                      {t("whyChoose.features.support.description")}
                    </p>
                    <div className="flex items-center text-purple-600 font-medium text-sm">
                      <span>{t("whyChoose.features.support.benefit")}</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Feature 4 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="group relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100/50 cursor-pointer transition-all duration-500 ease-in-out hover:shadow-2xl hover:-translate-y-3 hover:scale-[1.02]"
            >
              <div className="absolute inset-0 bg-orange-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <RotateCcw className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-900 transition-colors">
                      {t("whyChoose.features.returns.title")}
                    </h3>
                    <p className="text-gray-600 text-base leading-relaxed mb-4">
                      {t("whyChoose.features.returns.description")}
                    </p>
                    <div className="flex items-center text-orange-600 font-medium text-sm">
                      <span>{t("whyChoose.features.returns.benefit")}</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Customer Reviews Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-br from-gray-50 via-white to-blue-50/30"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-4 sm:space-y-6 mb-16 sm:mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-4 py-2 bg-green-100/80 backdrop-blur-sm border border-green-200/50 rounded-full text-green-700 text-sm font-medium shadow-sm"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              {t("reviews.badge")}
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
            >
              {t("reviews.title")}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-gray-600 max-w-4xl mx-auto text-base sm:text-lg leading-relaxed sm:whitespace-nowrap"
            >
              {t("reviews.subtitle")}
            </motion.p>
          </motion.div>

          {/* Reviews Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, staggerChildren: 0.1 }}
            viewport={{ once: true }}
          >
            {/* Review 1 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 h-full flex flex-col"
            >
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">{"★".repeat(5)}</div>
                <span className="ml-2 text-gray-600 text-sm">5.0</span>
              </div>
              <p className="text-gray-700 text-base leading-relaxed mb-6 flex-grow">
                &ldquo;{t("reviews.review1.text")}&rdquo;
              </p>
              <div className="flex items-center mt-auto">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-lg">
                    {t("reviews.review1.name").charAt(0)}
                  </span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">
                    {t("reviews.review1.name")}
                  </h4>
                  <p className="text-gray-500 text-sm">
                    {t("reviews.review1.role")}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Review 2 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 h-full flex flex-col"
            >
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">{"★".repeat(5)}</div>
                <span className="ml-2 text-gray-600 text-sm">5.0</span>
              </div>
              <p className="text-gray-700 text-base leading-relaxed mb-6 flex-grow">
                &ldquo;{t("reviews.review2.text")}&rdquo;
              </p>
              <div className="flex items-center mt-auto">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-semibold text-lg">
                    {t("reviews.review2.name").charAt(0)}
                  </span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">
                    {t("reviews.review2.name")}
                  </h4>
                  <p className="text-gray-500 text-sm">
                    {t("reviews.review2.role")}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Review 3 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 h-full flex flex-col"
            >
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">{"★".repeat(5)}</div>
                <span className="ml-2 text-gray-600 text-sm">5.0</span>
              </div>
              <p className="text-gray-700 text-base leading-relaxed mb-6 flex-grow">
                &ldquo;{t("reviews.review3.text")}&rdquo;
              </p>
              <div className="flex items-center mt-auto">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-semibold text-lg">
                    {t("reviews.review3.name").charAt(0)}
                  </span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">
                    {t("reviews.review3.name")}
                  </h4>
                  <p className="text-gray-500 text-sm">
                    {t("reviews.review3.role")}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Overall Rating */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <div className="inline-flex items-center space-x-4 bg-white rounded-full px-8 py-4 shadow-lg border border-gray-100">
              <div className="flex text-yellow-400 text-2xl">
                {"★".repeat(5)}
              </div>
              <div className="border-l border-gray-200 pl-4">
                <div className="text-2xl font-bold text-gray-900">
                  {t("reviews.overall.rating")}
                </div>
                <div className="text-gray-600 text-sm">
                  {t("reviews.overall.reviews")}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
