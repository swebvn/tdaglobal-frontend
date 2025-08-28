"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  DollarSign, 
  Calendar,
  Bookmark,
  Share2,
  CheckCircle,
  Building2,
  Mail,
  Phone,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  StrapiJobItem, 
  extractTextFromJobDescription,
  renderJobDescriptionAsHTML
} from "@/types/job";

interface JobDetailProps {
  job: StrapiJobItem;
  onBack: () => void;
}

export default function JobDetail({ job, onBack }: JobDetailProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Helper function to get experience field (fallback to department if needed)
  const getExperienceText = () => {
    // Check if experience field exists
    if (job?.job_detail?.experience) {
      return job.job_detail.experience;
    }
    // Fallback to department field for backward compatibility
    const jobDetailWithDepartment = job?.job_detail as {department?: string} | undefined;
    if (jobDetailWithDepartment?.department) {
      return jobDetailWithDepartment.department;
    }
    return 'Chưa xác định';
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: job.title,
          text: extractTextFromJobDescription(job.job_description),
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleApply = () => {
    if (job.applyLink) {
      window.open(job.applyLink, '_blank');
    } else {
      alert('Link ứng tuyển sẽ được cập nhật soon');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              onClick={onBack}
              variant="ghost"
              className="hover:bg-blue-50 text-blue-600 hover:text-blue-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại danh sách việc làm
            </Button>
            
            <div className="flex items-center gap-2">
              <Button
                onClick={handleLike}
                variant="ghost"
                size="sm"
                className={`${isLiked ? 'text-red-500 hover:text-red-600' : 'text-gray-500 hover:text-red-500'}`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              </Button>
              
              <Button
                onClick={handleBookmark}
                variant="ghost"
                size="sm"
                className={`${isBookmarked ? 'text-yellow-500 hover:text-yellow-600' : 'text-gray-500 hover:text-yellow-500'}`}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
              </Button>
              
              <Button
                onClick={handleShare}
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-blue-500"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-0 shadow-xl bg-white overflow-hidden">
                <CardContent className="p-8">
                  {/* Job Title & Company */}
                  <div className="mb-6">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                      {job.title}
                    </h1>
                    
                    <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Building2 className="w-4 h-4 mr-2" />
                        <span className="font-medium">{getExperienceText()}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{job?.working_information?.officeLocation || 'Chưa xác định'}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{job?.job_detail?.employmentType || 'Chưa xác định'}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-2xl font-bold text-green-600">
                        <DollarSign className="w-6 h-6 mr-1" />
                        {job?.job_detail?.salary || 'Thỏa thuận'}
                      </div>
                      
                      <div className="text-sm text-gray-500">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        Đăng {job?.publishedAt ? new Date(job.publishedAt).toLocaleDateString('vi-VN') : 'Chưa xác định'}
                      </div>
                    </div>
                  </div>

                  {/* Job Description */}
                  <div className="prose prose-lg max-w-none">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Mô tả công việc</h3>
                    <div 
                      className="text-gray-700 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: renderJobDescriptionAsHTML(job.job_description) }}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Key Responsibilities */}
            {job.key_responsibilitie && job.key_responsibilitie.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="border-0 shadow-xl bg-white">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-900">
                      Trách nhiệm chính
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {job.key_responsibilitie.map((responsibility) => (
                        <div key={responsibility.id} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 mt-0.5 text-blue-500" />
                          <div>
                            <p className="text-gray-900">{responsibility.item}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Requirements */}
            {job.requirement && job.requirement.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="border-0 shadow-xl bg-white">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-900">
                      Yêu cầu công việc
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {job.requirement.map((req) => (
                        <div key={req.id} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 mt-0.5 text-green-500" />
                          <div>
                            <p className="text-gray-900">{req.item}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Benefits */}
            {job.benefit && job.benefit.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="border-0 shadow-xl bg-white">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-900">
                      Quyền lợi & Phúc lợi
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {job.benefit.map((benefit) => (
                        <div key={benefit.id} className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-gray-900 font-medium">{benefit.item}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="sticky top-24"
            >
              <Card className="border-0 shadow-xl bg-white">
                <CardContent className="p-6">
                  <Button 
                    onClick={handleApply}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    size="lg"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Ứng tuyển ngay
                  </Button>
                  
                  <div className="mt-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>Giờ làm việc: {job?.working_information?.workingHours || 'Chưa xác định'}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Job Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="border-0 shadow-xl bg-white">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    Thông tin việc làm
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Kinh nghiệm:</span>
                    <span className="font-medium">{getExperienceText()}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Loại hình:</span>
                    <Badge variant="outline">{job?.job_detail?.employmentType || 'Chưa xác định'}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Mức lương:</span>
                    <Badge className="bg-green-100 text-green-700">{job?.job_detail?.salary || 'Thỏa thuận'}</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="border-0 shadow-xl bg-white">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    Liên hệ
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">{job?.contact_hr?.contactName || 'Chưa có thông tin'}</p>
                    <p className="text-gray-600">{job?.contact_hr?.contactEmail || 'Chưa có email'}</p>
                    <p className="text-gray-600">{job?.contact_hr?.contactPhone || 'Chưa có số điện thoại'}</p>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => window.location.href = `mailto:${job?.contact_hr?.contactEmail || ''}`}
                    disabled={!job?.contact_hr?.contactEmail}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Gửi email
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => window.location.href = `tel:${job?.contact_hr?.contactPhone || ''}`}
                    disabled={!job?.contact_hr?.contactPhone}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Gọi điện thoại
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
