import { MetadataRoute } from "next";
import { client } from "@/sanity/client";
import { fetchOptions } from "@/constants/constants";
import { urlFor } from "@/sanity/urlFor";
import { SanityAsset } from "@sanity/image-url/lib/types/types";

const LANDING_CAROUSEL = `*[_type == "landingCarousel"]{images[]}`;

interface SitemapEntryWithImages {
  url: string;
  lastModified: Date;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
  images?: string[];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const landingCarousel = await client.fetch<{ images: SanityAsset[] }[]>(
    LANDING_CAROUSEL,
    {},
    fetchOptions
  );

  const baseUrl = "https://www.talome.com";
  const now = new Date();

  const images: string[] = [];

  // Extract images from landingCarousel
  if (landingCarousel && landingCarousel[0] && landingCarousel[0].images) {
    landingCarousel[0].images.forEach((image) => {
      if (image && image.asset) {
        const imageUrlWithParams = urlFor(image.asset).url();
        const imageUrl = imageUrlWithParams.split("?")[0];
        images.push(imageUrl);
      }
    });
  }

  // Main page entry with images
  const entries: SitemapEntryWithImages[] = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
      images: images,
    },
  ];

  return entries as MetadataRoute.Sitemap;
}
