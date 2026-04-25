import type { MetadataRoute } from "next";
import { client } from "@/sanity/client";
import { postsQuery } from "@/sanity/queries";
import type { Post } from "@/sanity/types";
import { absoluteUrl, publicRoutes } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const posts = await client.fetch<Post[]>(postsQuery);

  const staticRoutes: MetadataRoute.Sitemap = publicRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const blogRoutes: MetadataRoute.Sitemap = posts
    .filter((post) => post.slug?.current)
    .map((post) => ({
      url: absoluteUrl(`/blog/${post.slug.current}`),
      lastModified: post.updatedAt || post._updatedAt || post.publishedAt || now,
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  return [...staticRoutes, ...blogRoutes];
}

