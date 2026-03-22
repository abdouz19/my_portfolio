import type { MetadataRoute } from "next";
import { siteMetadata } from "@/lib/constants/site-metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteMetadata.canonicalUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
