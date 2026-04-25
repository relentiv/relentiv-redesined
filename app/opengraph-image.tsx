import { createOgImage, ogSize } from "@/lib/og";

export const alt = "Relentiv";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return createOgImage({
    title: "Engineering the Future of Tech",
    subtitle: "Web, mobile, AI, game engineering, and UI/UX systems from Bengaluru.",
  });
}

