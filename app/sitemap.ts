import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  
  // Static pages
  const staticPages = [
    '',
    '/about',
    '/our-work',
    '/join-us',
    '/news',
  ]
  
  // Generate URLs for both locales
  const sitemapEntries: MetadataRoute.Sitemap = []
  
  staticPages.forEach(page => {
    // English version
    sitemapEntries.push({
      url: `${baseUrl}/en${page}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: page === '' ? 1 : 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/en${page}`,
          vi: `${baseUrl}/vi${page}`,
        }
      }
    })
    
    // Vietnamese version
    sitemapEntries.push({
      url: `${baseUrl}/vi${page}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: page === '' ? 1 : 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/en${page}`,
          vi: `${baseUrl}/vi${page}`,
        }
      }
    })
  })
  
  // Job detail pages
  const jobSlugs = [
    'general-accountant',
    'ecommerce-reconciliation-officer',
    'packaging-staff',
    'customer-service-representative'
  ]
  
  jobSlugs.forEach(slug => {
    // English job pages
    sitemapEntries.push({
      url: `${baseUrl}/en/join-us/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
      alternates: {
        languages: {
          en: `${baseUrl}/en/join-us/${slug}`,
          vi: `${baseUrl}/vi/join-us/${slug}`,
        }
      }
    })
    
    // Vietnamese job pages
    sitemapEntries.push({
      url: `${baseUrl}/vi/join-us/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
      alternates: {
        languages: {
          en: `${baseUrl}/en/join-us/${slug}`,
          vi: `${baseUrl}/vi/join-us/${slug}`,
        }
      }
    })
  })
  
  return sitemapEntries
}
