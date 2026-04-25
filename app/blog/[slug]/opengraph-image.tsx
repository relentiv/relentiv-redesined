import { ImageResponse } from "next/og";
import { client } from "@/sanity/client";
import { postBySlugQuery } from "@/sanity/queries";
import type { Post } from "@/sanity/types";
import { ogSize } from "@/lib/og";
import { siteConfig } from "@/lib/seo";

type ImageProps = {
  params: Promise<{ slug: string }>;
};

export const alt = "Relentiv blog post";
export const size = ogSize;
export const contentType = "image/png";
export const revalidate = 3600;

export default async function Image({ params }: ImageProps) {
  const { slug } = await params;
  const post = await client.fetch<Post | null>(postBySlugQuery, { slug });
  const title = post?.title || "Relentiv Journal";
  const subtitle = post?.excerpt || "Notes on building serious digital products.";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#050505",
          color: "white",
          padding: "72px",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 4, textTransform: "uppercase", color: "rgba(255,255,255,0.72)" }}>
          {siteConfig.name} Journal
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ maxWidth: 960, fontSize: 72, lineHeight: 1, fontWeight: 700, letterSpacing: -2 }}>
            {title}
          </div>
          <div style={{ maxWidth: 840, fontSize: 28, lineHeight: 1.32, color: "rgba(255,255,255,0.66)" }}>
            {subtitle}
          </div>
        </div>
        <div style={{ height: 1, width: "100%", background: "rgba(255,255,255,0.18)" }} />
      </div>
    ),
    ogSize
  );
}

