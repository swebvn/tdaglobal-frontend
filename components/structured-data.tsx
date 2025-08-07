interface StructuredDataProps {
  locale: string;
}

export default function StructuredData({ locale }: StructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "TDA Global",
    "url": baseUrl,
    "logo": `${baseUrl}/images/tda-global-logo.png`,
    "description": locale === 'vi' 
      ? "TDA Global mang đến sự chính xác, sáng tạo và rõ ràng cho thương mại điện tử toàn cầu."
      : "TDA Global brings precision, creativity, and clarity to global eCommerce.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Số 11, Galaxy 5, Galaxy Vạn Phúc",
      "addressLocality": "Vạn Phúc, Hà Đông",
      "addressRegion": "Hà Nội",
      "addressCountry": "VN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+84-39-2881111",
      "contactType": "customer service",
      "email": "tuyendung@tdaglobal.co",
      "availableLanguage": ["Vietnamese", "English"]
    },
    "sameAs": [
      // Add social media URLs when available
    ]
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "TDA Global",
    "url": baseUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteData)
        }}
      />
    </>
  );
}
