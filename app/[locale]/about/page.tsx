"use client";

import { motion } from "framer-motion";
import { Parallax } from "react-scroll-parallax";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  Target,
  Eye,
  Users,
  Shield,
  Lightbulb,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Footer from "@/components/footer";

export default function AboutPage() {
  const t = useTranslations("AboutPage");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
      },
    },
  };

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20 overflow-hidden"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <Parallax speed={-15}>
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          </Parallax>
          <Parallax speed={10}>
            <div className="absolute top-40 right-20 w-96 h-96 bg-indigo-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </Parallax>
          <Parallax speed={-8}>
            <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
          </Parallax>
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center space-y-6 max-w-4xl mx-auto"
          >
            <motion.div variants={itemVariants}>
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                {t("badge")}
              </Badge>
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight"
            >
              {/* <span className="text-blue-600">About Us</span> */}
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 max-w-3xl mx-auto"
            >
              {t("subtitle")}
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Company Information Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="py-16 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <motion.div
            variants={itemVariants}
            className="max-w-4xl mx-auto text-center space-y-8"
          >
            <motion.h2
              variants={fadeInVariants}
              className="text-3xl lg:text-4xl font-bold text-gray-900"
            >
              {t("companyInfo.name")}
            </motion.h2>
            <motion.p
              variants={fadeInVariants}
              className="text-lg text-gray-600 leading-relaxed"
            >
              {t("companyInfo.description")}
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Company Story */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="py-20"
      >
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <motion.h2
                  variants={fadeInVariants}
                  className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6"
                >
                  {t("journey.title")}
                </motion.h2>
                <motion.div className="space-y-6">
                  <motion.p
                    variants={fadeInVariants}
                    className="text-gray-600 text-lg leading-relaxed"
                  >
                    {t("journey.description1")}
                  </motion.p>
                  <motion.p
                    variants={fadeInVariants}
                    className="text-gray-600 text-lg leading-relaxed"
                  >
                    {t("journey.description2")}
                  </motion.p>
                  <motion.p
                    variants={fadeInVariants}
                    className="text-gray-600 text-lg leading-relaxed"
                  >
                    {t("journey.description3")}
                  </motion.p>
                  <motion.div
                    variants={fadeInVariants}
                    className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500"
                  >
                    <p className="text-blue-800 text-xl font-semibold text-center">
                      {t("journey.motto")}
                    </p>
                  </motion.div>
                </motion.div>
              </div>

              <motion.div
                variants={containerVariants}
                className="grid grid-cols-2 gap-6"
              >
                <motion.div
                  variants={cardVariants}
                  whileHover="hover"
                  className="text-center p-6 bg-blue-50 rounded-xl cursor-pointer"
                >
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    500+
                  </div>
                  <div className="text-gray-600">Managed Shops</div>
                </motion.div>
                <motion.div
                  variants={cardVariants}
                  whileHover="hover"
                  className="text-center p-6 bg-indigo-50 rounded-xl cursor-pointer"
                >
                  <div className="text-3xl font-bold text-indigo-600 mb-2">
                    10K+
                  </div>
                  <div className="text-gray-600">POD Products</div>
                </motion.div>
                <motion.div
                  variants={cardVariants}
                  whileHover="hover"
                  className="text-center p-6 bg-purple-50 rounded-xl cursor-pointer"
                >
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    15+
                  </div>
                  <div className="text-gray-600">International Markets</div>
                </motion.div>
                <motion.div
                  variants={cardVariants}
                  whileHover="hover"
                  className="text-center p-6 bg-green-50 rounded-xl cursor-pointer"
                >
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    99%
                  </div>
                  <div className="text-gray-600">Success Rate</div>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants} className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/images/company-story.jpg"
                  alt="Company Story"
                  width={600}
                  height={600}
                  className="rounded-2xl shadow-2xl"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-6 rounded-xl shadow-lg"
              >
                <div className="text-2xl font-bold">2021</div>
                <div className="text-blue-100">
                  {t("timeline.milestones.2021.title")}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Mission, Vision, Values */}
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
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              {t("corePrinciples.title")}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t("corePrinciples.subtitle")}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Mission */}
            <motion.div variants={cardVariants} whileHover="hover">
              <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white h-full flex flex-col">
                <CardHeader className="text-center pb-4">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <Target className="h-10 w-10 text-blue-600" />
                  </motion.div>
                  <CardTitle className="text-2xl text-blue-600">
                    {t("missionVision.mission.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4 flex flex-col flex-grow">
                  <div className="flex-grow space-y-4">
                    <p className="text-gray-600 leading-relaxed">
                      {t("missionVision.mission.description1")}
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      {t("missionVision.mission.description2")}
                    </p>
                  </div>
                  <div className="pt-4 mt-auto">
                    <Badge className="bg-blue-100 text-blue-800">
                      {t("corePrinciples.principles.innovation.title")}
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-800 ml-2">
                      {t("corePrinciples.principles.craftsmanship.title")}
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-800 ml-2">
                      {t("corePrinciples.principles.delight.title")}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Vision */}
            <motion.div variants={cardVariants} whileHover="hover">
              <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white h-full flex flex-col">
                <CardHeader className="text-center pb-4">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <Eye className="h-10 w-10 text-indigo-600" />
                  </motion.div>
                  <CardTitle className="text-2xl text-indigo-600">
                    {t("missionVision.vision.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4 flex flex-col flex-grow">
                  <div className="flex-grow space-y-4">
                    <p className="text-gray-600 leading-relaxed">
                      {t("missionVision.vision.description1")}
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      {t("missionVision.vision.description2")}
                    </p>
                  </div>
                  <div className="pt-4 mt-auto">
                    <Badge className="bg-indigo-100 text-indigo-800">
                      {t("corePrinciples.principles.innovation.title")}
                    </Badge>
                    <Badge className="bg-indigo-100 text-indigo-800 ml-2">
                      {t("corePrinciples.principles.craftsmanship.title")}
                    </Badge>
                    <Badge className="bg-indigo-100 text-indigo-800 ml-2">
                      {t("corePrinciples.principles.delight.title")}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Core Values Details */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="py-20"
      >
        <div className="container mx-auto px-4">
          <motion.div
            variants={itemVariants}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              {t("coreValues.title")}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t("coreValues.subtitle")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Quality */}
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="text-center space-y-4 group cursor-pointer"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-blue-200 transition-colors"
              >
                <Shield className="h-8 w-8 text-blue-600" />
              </motion.div>
              <h3 className="font-semibold text-gray-900 text-lg">
                {t("coreValues.values.quality.title")}
              </h3>
              <p className="text-gray-600 text-sm">
                {t("coreValues.values.quality.description")}
              </p>
            </motion.div>

            {/* Confidentiality */}
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="text-center space-y-4 group cursor-pointer"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-green-200 transition-colors"
              >
                <Users className="h-8 w-8 text-green-600" />
              </motion.div>
              <h3 className="font-semibold text-gray-900 text-lg">
                {t("coreValues.values.confidentiality.title")}
              </h3>
              <p className="text-gray-600 text-sm">
                {t("coreValues.values.confidentiality.description")}
              </p>
            </motion.div>

            {/* Refinement */}
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="text-center space-y-4 group cursor-pointer"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-purple-200 transition-colors"
              >
                <Zap className="h-8 w-8 text-purple-600" />
              </motion.div>
              <h3 className="font-semibold text-gray-900 text-lg">
                {t("coreValues.values.refinement.title")}
              </h3>
              <p className="text-gray-600 text-sm">
                {t("coreValues.values.refinement.description")}
              </p>
            </motion.div>

            {/* Creativity */}
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="text-center space-y-4 group cursor-pointer"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-orange-200 transition-colors"
              >
                <Lightbulb className="h-8 w-8 text-orange-600" />
              </motion.div>
              <h3 className="font-semibold text-gray-900 text-lg">
                {t("coreValues.values.creativity.title")}
              </h3>
              <p className="text-gray-600 text-sm">
                {t("coreValues.values.creativity.description")}
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Company Timeline */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="py-20"
      >
        <div className="container mx-auto px-4">
          <motion.div
            variants={itemVariants}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              {t("timeline.title")}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t("timeline.subtitle")}
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-blue-200"
              ></motion.div>

              {/* Timeline items */}
              <div className="space-y-12">
                {/* 2021 */}
                <motion.div
                  variants={cardVariants}
                  whileHover="hover"
                  className="relative flex items-center"
                >
                  <div className="flex-1 text-right pr-8">
                    <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-600">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        2021 - {t("timeline.milestones.2021.title")}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {t("timeline.milestones.2021.description")}
                      </p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                  <div className="flex-1 pl-8"></div>
                </motion.div>

                {/* 2022 */}
                <motion.div
                  variants={cardVariants}
                  whileHover="hover"
                  className="relative flex items-center"
                >
                  <div className="flex-1 pr-8"></div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-indigo-600 rounded-full border-4 border-white shadow-lg"></div>
                  <div className="flex-1 text-left pl-8">
                    <div className="bg-white p-6 rounded-lg shadow-lg border-r-4 border-indigo-600">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        2022 - {t("timeline.milestones.2022.title")}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {t("timeline.milestones.2022.description")}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* 2023 */}
                <motion.div
                  variants={cardVariants}
                  whileHover="hover"
                  className="relative flex items-center"
                >
                  <div className="flex-1 text-right pr-8">
                    <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-purple-600">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        2023 - {t("timeline.milestones.2023.title")}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {t("timeline.milestones.2023.description")}
                      </p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-purple-600 rounded-full border-4 border-white shadow-lg"></div>
                  <div className="flex-1 pl-8"></div>
                </motion.div>

                {/* 2024 */}
                <motion.div
                  variants={cardVariants}
                  whileHover="hover"
                  className="relative flex items-center"
                >
                  <div className="flex-1 pr-8"></div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-green-600 rounded-full border-4 border-white shadow-lg"></div>
                  <div className="flex-1 text-left pl-8">
                    <div className="bg-white p-6 rounded-lg shadow-lg border-r-4 border-green-600">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        2024 - {t("timeline.milestones.2024.title")}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {t("timeline.milestones.2024.description")}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* 2025 */}
                <motion.div
                  variants={cardVariants}
                  whileHover="hover"
                  className="relative flex items-center"
                >
                  <div className="flex-1 text-right pr-8">
                    <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-orange-600">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        2025 - {t("timeline.milestones.2025.title")}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {t("timeline.milestones.2025.description")}
                      </p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-orange-600 rounded-full border-4 border-white shadow-lg"></div>
                  <div className="flex-1 pl-8"></div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Contact CTA */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div
            variants={itemVariants}
            className="max-w-3xl mx-auto space-y-6"
          >
            <motion.h2
              variants={fadeInVariants}
              className="text-3xl lg:text-4xl font-bold text-white"
            >
              {t("contactCta.title")}
            </motion.h2>
            <motion.p
              variants={fadeInVariants}
              className="text-blue-100 text-lg"
            >
              {t("contactCta.description")}
            </motion.p>
            <motion.div
              variants={containerVariants}
              className="flex justify-center"
            >
              <motion.div variants={itemVariants}>
                <Link href="/join-us">
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100"
                  >
                    {t("contactCta.joinTeam")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
