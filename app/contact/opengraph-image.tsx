import { createOgImage, ogSize } from "@/lib/og";

export const alt = "Contact Relentiv";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return createOgImage({
    title: "Contact Relentiv",
    subtitle: "Start a web, mobile, AI, game engineering, or UI/UX project with Relentiv.",
  });
}

