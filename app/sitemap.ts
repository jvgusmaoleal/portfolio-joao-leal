import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, lastModified: new Date(), priority: 1 },
    { url: `${site.url}/crm`, lastModified: new Date(), priority: 0.9 },
    { url: `${site.url}/socio`, lastModified: new Date(), priority: 0.9 },
  ];
}
