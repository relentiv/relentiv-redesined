import type { Metadata } from "next";
import { HomeClient } from "@/components/HomeClient";
import { JsonLd } from "@/components/JsonLd";
import { createPageMetadata } from "@/lib/seo";
import { faqSchema, homeFaqs, localBusinessSchema } from "@/lib/schema";

export const metadata: Metadata = createPageMetadata({
  title: "Relentiv",
  description:
    "Relentiv is a Bengaluru product engineering studio for web applications, mobile apps, AI-integrated products, game engineering, and UI/UX systems.",
  path: "/",
  keywords: [
    "Relentiv",
    "product engineering studio",
    "web application development",
    "mobile app development",
    "AI product engineering",
    "Bengaluru technology studio",
  ],
});

export default function Home() {
  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <JsonLd data={faqSchema(homeFaqs)} />
      <HomeClient />
    </>
  );
}

