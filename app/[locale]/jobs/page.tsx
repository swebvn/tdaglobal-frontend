"use client";

import { useState } from "react";
import JobDetail from "@/components/job-detail";
import { StrapiJobItem } from "@/types/job";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  Building2,
  Star,
  AlertCircle,
  Globe
} from "lucide-react";

// Mock data for demonstration
const mockJob: StrapiJobItem = {
  id: 1,
  documentId: "job-001",
  title: "Senior Frontend Developer",
  slug: "senior-frontend-developer",
  job_description: [
    {
      type: "paragraph",
      children: [
        {
          type: "text",
          text: "Chúng tôi đang tìm kiếm một Senior Frontend Developer tài năng để tham gia vào đội ngũ phát triển sản phẩm của chúng tôi."
        }
      ]
    }
  ],
  applyLink: "/apply/senior-frontend-developer",
  createdAt: "2024-12-01T00:00:00.000Z",
  updatedAt: "2024-12-01T00:00:00.000Z",
  publishedAt: "2024-12-01T00:00:00.000Z",
  locale: "vi",
  
  key_responsibilitie: [
    { id: 1, item: "Phát triển và duy trì các ứng dụng web hiện đại sử dụng React, Next.js" },
    { id: 2, item: "Làm việc chặt chẽ với đội ngũ UX/UI để chuyển đổi designs thành code chất lượng cao" },
    { id: 3, item: "Tối ưu hóa performance và trải nghiệm người dùng" }
  ],
  requirement: [
    { id: 1, item: "3+ năm kinh nghiệm với React và Next.js", title: "Kinh nghiệm React/Next.js", isRequired: true },
    { id: 2, item: "Thành thạo TypeScript và các best practices", title: "TypeScript", isRequired: true },
    { id: 3, item: "Kinh nghiệm với CSS/SCSS, Tailwind CSS", title: "Responsive Design", isRequired: true }
  ],
  benefit: [
    { id: 1, item: "Lương cạnh tranh + thưởng performance", title: "Lương thưởng hấp dẫn" },
    { id: 2, item: "Bảo hiểm y tế cao cấp cho bản thân và gia đình", title: "Bảo hiểm toàn diện" },
    { id: 3, item: "Làm việc từ xa hoặc tại văn phòng, flexible time", title: "Flexible working" }
  ],
  job_detail: {
    id: 1,
    salary: "25-40 triệu VND",
    experience: "3+ năm",
    employmentType: "Full-time",
    valid_through: "2025-09-01T23:59:59.000Z",
    department: "Engineering"
  },
  working_information: {
    id: 1,
    workingHours: "8:30-17:30 Thứ 2 - Thứ 6",
    officeLocation: "Quận 1, TP.HCM"
  },
  contact_hr: {
    id: 1,
    contactEmail: "hr@company.com",
    contactPhone: "+84 123 456 789",
    contactName: "Ms. Nguyen"
  },
  localizations: [],
  
  // Additional UI properties
  description: "Chúng tôi đang tìm kiếm một Senior Frontend Developer tài năng để tham gia vào đội ngũ phát triển sản phẩm của chúng tôi.",
  position: "Senior Frontend Developer",
  department: "Engineering",
  employmentType: "Full-time",
  experienceLevel: "senior",
  salaryMin: 25000000,
  salaryMax: 40000000,
  salaryCurrency: "VND",
  isRemote: true,
  isUrgent: true,
  isFeatured: true,
  shortDescription: "Tham gia đội ngũ phát triển frontend với React/Next.js trong môi trường startup năng động",
  location: { name: "Hồ Chí Minh" },
  category: { name: "Công nghệ thông tin" },
  applicationDeadline: "2025-09-01T23:59:59.000Z"
};

const mockJobs: StrapiJobItem[] = [
  mockJob,
  {
    ...mockJob,
    id: 2,
    documentId: "job-002",
    title: "Backend Developer - Node.js",
    position: "Backend Developer",
    experienceLevel: "mid",
    isUrgent: false,
    isFeatured: false,
    salaryMin: 18000000,
    salaryMax: 30000000,
  },
  {
    ...mockJob,
    id: 3,
    documentId: "job-003", 
    title: "UI/UX Designer",
    position: "UI/UX Designer",
    department: "Design",
    experienceLevel: "mid",
    isUrgent: false,
    isFeatured: true,
    salaryMin: 15000000,
    salaryMax: 25000000,
  }
];

export default function JobsPage() {
  const [selectedJob, setSelectedJob] = useState<StrapiJobItem | null>(null);

  if (selectedJob) {
    return <JobDetail job={selectedJob} onBack={() => setSelectedJob(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Cơ hội nghề nghiệp
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Khám phá các vị trí việc làm hấp dẫn và phát triển sự nghiệp cùng chúng tôi
          </p>
        </div>

        {/* Job List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockJobs.map((job) => (
            <Card 
              key={job.id}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-0 shadow-lg bg-white cursor-pointer"
              onClick={() => setSelectedJob(job)}
            >
              <CardHeader className="pb-3">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {job.isFeatured && (
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                      <Star className="w-3 h-3 mr-1" />
                      Nổi bật
                    </Badge>
                  )}
                  {job.isUrgent && (
                    <Badge variant="destructive">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Tuyển gấp
                    </Badge>
                  )}
                  {job.isRemote && (
                    <Badge className="bg-green-100 text-green-700">
                      <Globe className="w-3 h-3 mr-1" />
                      Remote
                    </Badge>
                  )}
                </div>
                
                <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                  {job.title}
                </CardTitle>
                
                <div className="flex items-center text-sm text-gray-600 mt-2">
                  <Building2 className="w-4 h-4 mr-1" />
                  <span className="mr-3">{job.department}</span>
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{job.location?.name}</span>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {job.shortDescription}
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-1" />
                      <span className="capitalize">{job.employmentType?.replace('-', ' ')}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-1" />
                      <span className="capitalize">{job.experienceLevel}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-green-600 font-semibold">
                    <DollarSign className="w-4 h-4 mr-1" />
                    <span>
                      {job.salaryMin && job.salaryMax 
                        ? `${(job.salaryMin/1000000).toFixed(0)}-${(job.salaryMax/1000000).toFixed(0)}M VND`
                        : 'Thỏa thuận'
                      }
                    </span>
                  </div>
                </div>

                <Button 
                  className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedJob(job);
                  }}
                >
                  Xem chi tiết
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
