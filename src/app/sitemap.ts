import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const lastModified = new Date();

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "daily",
      priority: 1.0, // Primary Homexa listing
    },
    {
      url: `${baseUrl}/washing-machine-repair`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9, // Row 1 in Google Search Sitelinks
    },
    {
      url: `${baseUrl}/ac-repair`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9, // Row 2 in Google Search Sitelinks
    },
    {
      url: `${baseUrl}/refrigerator-repair`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9, // Row 3 in Google Search Sitelinks
    },
  ];
}