// Job-related types for Strapi integration

export interface JobResponsibility {
  id: number;
  item: string;
}

export interface JobRequirement {
  id: number;
  item: string;
  title?: string;
  description?: string;
  isRequired?: boolean;
}

export interface JobBenefit {
  id: number;
  item: string;
  title?: string;
  description?: string;
}

export interface JobDetail {
  id: number;
  salary: string;
  experience: string;
  employmentType: string;
  valid_through: string;
  department?: string;
}

export interface WorkingInformation {
  id: number;
  workingHours: string;
  officeLocation: string;
}

export interface ContactHR {
  id: number;
  contactEmail: string;
  contactPhone: string;
  contactName: string;
}

export interface JobDescriptionBlock {
  type: string;
  children: Array<{
    type: string;
    text: string;
  }>;
}

export interface StrapiJobItem {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  job_description: JobDescriptionBlock[];
  applyLink: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  
  // Job specific fields from Strapi
  key_responsibilitie: JobResponsibility[];
  requirement: JobRequirement[];
  benefit: JobBenefit[];
  job_detail: JobDetail;
  working_information: WorkingInformation;
  contact_hr: ContactHR;
  localizations: unknown[];

  // Additional fields used in UI
  description?: string;
  position?: string;
  department?: string;
  location?: {
    name: string;
  };
  employmentType?: string;
  experienceLevel?: string;
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency?: string;
  shortDescription?: string;
  isFeatured?: boolean;
  isUrgent?: boolean;
  isRemote?: boolean;
  category?: {
    name: string;
  };
  content?: string;
  requirements?: JobRequirement[];
  benefits?: JobBenefit[];
  applicationDeadline?: string;
}

export interface StrapiJobResponse {
  data: StrapiJobItem[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiJobDetailResponse {
  data: StrapiJobItem;
  meta: Record<string, unknown>;
}

// Helper functions
export const getEmploymentTypeLabel = (type: string): string => {
  // Extract the base employment type (remove any additional info after " / ")
  const baseType = type.split(' / ')[0].trim();
  const labels = {
    'Full-time': 'Toàn thời gian',
    'Part-time': 'Bán thời gian', 
    'Contract': 'Hợp đồng',
    'Internship': 'Thực tập',
    'Remote': 'Làm việc từ xa'
  };
  return labels[baseType as keyof typeof labels] || type;
};

export const extractTextFromJobDescription = (blocks: JobDescriptionBlock[]): string => {
  return blocks
    .map(block => 
      block.children
        .map(child => child.text)
        .join('')
    )
    .join(' ');
};

export const renderJobDescriptionAsHTML = (blocks: JobDescriptionBlock[]): string => {
  return blocks
    .map(block => {
      const text = block.children.map(child => child.text).join('');
      if (block.type === 'paragraph') {
        return `<p>${text}</p>`;
      }
      return text;
    })
    .join('');
};
