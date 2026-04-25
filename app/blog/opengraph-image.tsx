import { createOgImage, ogSize } from "@/lib/og";

export const alt = "Relentiv Blog";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return createOgImage({
    title: "Relentiv Journal",
    subtitle: "Notes on product engineering, AI systems, design, and serious digital products.",
  });
}

