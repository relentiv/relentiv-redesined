import { createOgImage, ogSize } from "@/lib/og";

export const alt = "Founder of Relentiv: Anishka Barman";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return createOgImage({
    title: "Founder of Relentiv",
    subtitle: "Anishka Barman leads the Bengaluru product engineering studio Relentiv.",
  });
}
