// Job-related types for Strapi integration based on actual API structure

export interface JobDetail {
  id: number;
  salary: string;
  experience: string;
  employmentType: string;
  valid_through: string;
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

export interface JobListItem {
  id: number;
  item: string;
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
  key_responsibilitie: JobListItem[];
  requirement: JobListItem[];
  benefit: JobListItem[];
  job_detail: JobDetail;
  working_information: WorkingInformation;
  contact_hr: ContactHR;
  localizations: unknown[];
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

// Helper functions
export const getEmploymentTypeLabel = (type: string): string => {
  // Extract the base employment type (remove any additional info after " / ")
  const baseType = type.split(' / ')[0].trim();
  const labels: Record<string, string> = {
    'Full-time': 'Toàn thời gian',
    'Part-time': 'Bán thời gian', 
    'Contract': 'Hợp đồng',
    'Internship': 'Thực tập',
    'Remote': 'Làm việc từ xa'
  };
  return labels[baseType] || type;
};

export const convertJobDescriptionToHtml = (blocks: JobDescriptionBlock[]): string => {
  return blocks.map(block => {
    if (block.type === 'paragraph') {
      const text = block.children.map(child => child.text).join('');
      return `<p>${text}</p>`;
    }
    return '';
  }).join('');
};
