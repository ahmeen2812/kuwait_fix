import { siteConfig } from "@/config/site";

export default function JsonLdSchema() {
  const siteUrl = siteConfig.url;

  // 1. Google Sitelinks Navigation Schema (Forces the 3 rows under your search result)
  const sitelinksSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Homexa Kuwait Services",
    "itemListElement": siteConfig.sitelinks.map((link, index) => ({
      "@type": "SiteNavigationElement",
      "position": index + 1,
      "name": `${link.titleAr} | ${link.titleEn}`,
      "description": link.descAr,
      "url": `${siteUrl}${link.href}`,
    })),
  };

  // 2. Local Business Knowledge Graph Schema
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${siteUrl}/#organization`,
    "name": "Homexa",
    "alternateName": ["هوميكسا", "Homexa Kuwait", "Homexa Maintenance"],
    "legalName": siteConfig.legalName,
    "url": siteUrl,
    "logo": `${siteUrl}/images/logo.png`,
    "telephone": siteConfig.phoneRaw,
    "email": siteConfig.email,
    "priceRange": "KWD",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "KW",
      "addressLocality": "Kuwait City",
      "addressRegion": "Kuwait",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 29.3759,
      "longitude": 47.9774,
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59",
      },
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Homexa Repair Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "تصليح الغسالات في الكويت",
            "url": `${siteUrl}/washing-machine-repair`,
          },
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "تصليح وصيانة المكيفات في الكويت",
            "url": `${siteUrl}/ac-repair`,
          },
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "تصليح الثلاجات والفريزر في الكويت",
            "url": `${siteUrl}/refrigerator-repair`,
          },
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sitelinksSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
    </>
  );
}