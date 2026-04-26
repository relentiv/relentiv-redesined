import type { Metadata } from "next";
import { AboutPageClient } from "@/components/AboutPageClient";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { createPageMetadata } from "@/lib/seo";
import { aboutFaqs, aboutPageSchema, faqSchema, personSchema } from "@/lib/schema";

export const metadata: Metadata = createPageMetadata({
  title: "Founder of Relentiv: Anishka Barman",
  description:
    "Anishka Barman is the founder of Relentiv, a Bengaluru-based product engineering studio building web, mobile, AI, game engineering, and UI/UX systems.",
  path: "/about",
  keywords: [
    "founder of Relentiv",
    "Relentiv founder",
    "who is the founder of Relentiv",
    "Anishka Barman",
    "Anishka Barman Relentiv",
    "Bengaluru product engineering studio",
  ],
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutPageSchema()} />
      <JsonLd data={personSchema()} />
      <JsonLd data={faqSchema(aboutFaqs)} />
      <div className="relative z-20 mx-auto w-full max-w-[1400px] px-6 pt-8 md:px-12">
        <Breadcrumbs items={[{ name: "About", href: "/about" }]} />
      </div>
      <AboutPageClient />
    </>
  );
}
