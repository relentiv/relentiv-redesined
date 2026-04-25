import { createOgImage, ogSize } from "@/lib/og";

export const alt = "About Relentiv";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return createOgImage({
    title: "About Relentiv",
    subtitle: "A Bengaluru product engineering studio led by founder and CEO Utkarsh.",
  });
}

