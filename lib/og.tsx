import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/seo";

export const ogSize = {
  width: 1200,
  height: 630,
};

type OgImageInput = {
  title: string;
  subtitle?: string;
};

export function createOgImage({ title, subtitle = siteConfig.description }: OgImageInput) {
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 28,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.72)",
          }}
        >
          <span>{siteConfig.name}</span>
          <span>Product Engineering</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
          <div
            style={{
              maxWidth: 900,
              fontSize: 78,
              lineHeight: 0.98,
              fontWeight: 700,
              letterSpacing: -2,
            }}
          >
            {title}
          </div>
          <div
            style={{
              maxWidth: 820,
              fontSize: 30,
              lineHeight: 1.3,
              color: "rgba(255,255,255,0.68)",
            }}
          >
            {subtitle}
          </div>
        </div>
        <div
          style={{
            height: 1,
            width: "100%",
            background: "rgba(255,255,255,0.18)",
          }}
        />
      </div>
    ),
    ogSize
  );
}

