import { createOgImage, ogSize } from "@/lib/og";

export const alt = "Relentiv Work";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return createOgImage({
    title: "Selected Works",
    subtitle: "A curated view of Relentiv web, mobile, AI, and interactive product engineering.",
  });
}

