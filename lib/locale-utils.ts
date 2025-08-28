/**
 * Map next-intl locale to Strapi locale format
 * @param locale - The next-intl locale (e.g., 'en', 'vi')
 * @returns The Strapi locale format (e.g., 'en', 'vi-VN')
 */
export function mapLocaleForStrapi(locale: string): string {
  const localeMap: Record<string, string> = {
    'en': 'en',
    'vi': 'vi-VN'
  }
  
  return localeMap[locale] || 'en'
}
