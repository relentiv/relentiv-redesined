import { createOgImage, ogSize } from "@/lib/og";

export const alt = "Relentiv Services";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return createOgImage({
    title: "Product Engineering Services",
    subtitle: "Web applications, mobile apps, AI products, game engineering, and UI/UX design.",
  });
}

