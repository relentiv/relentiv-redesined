import { NextResponse } from "next/server";
import { client } from "@/sanity/client";
import { postsQuery, postsSearchQuery } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import type { Post } from "@/sanity/types";
import { formatPostDate, getReadingTime } from "@/lib/blog";

export const revalidate = 300;

function getSearchValue(value: string | null): string {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ").slice(0, 80) : "";
}

function getSanitySearchTerm(query: string): string {
  return query
    .split(/\s+/)
    .filter(Boolean)
    .map((term) => `${term}*`)
    .join(" ");
}

function serializePost(post: Post) {
  const slug = post.slug?.current;

  return {
    id: post._id,
    title: post.title,
    slug,
    href: slug ? `/blog/${slug}` : "/blog",
    excerpt: post.excerpt || "",
    publishedAt: post.publishedAt,
    date: post.publishedAt ? formatPostDate(post.publishedAt) : "",
    readingTime: getReadingTime(post.body),
    categories: post.categories?.map((category) => category.title).filter(Boolean).slice(0, 3) ?? [],
    imageUrl: post.mainImage
      ? urlFor(post.mainImage.asset).width(640).height(420).auto("format").fit("crop").url()
      : null,
    imageAlt: post.mainImage?.alt || post.title,
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = getSearchValue(searchParams.get("q"));

  try {
    const posts: Post[] = query
      ? await client.fetch(postsSearchQuery, { search: getSanitySearchTerm(query) })
      : await client.fetch(postsQuery);

    return NextResponse.json({
      query,
      posts: posts.filter((post) => post.slug?.current).slice(0, 6).map(serializePost),
    });
  } catch (error) {
    console.error("Blog search failed", error);

    return NextResponse.json(
      {
        query,
        posts: [],
        error: "Search is temporarily unavailable.",
      },
      { status: 500 }
    );
  }
}

