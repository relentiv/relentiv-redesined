import type { Metadata } from "next";
import { AboutPageClient } from "@/components/AboutPageClient";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { createPageMetadata } from "@/lib/seo";
import { personSchema } from "@/lib/schema";

export const metadata: Metadata = createPageMetadata({
  title: "About Relentiv",
  description:
    "Learn about Relentiv, the Bengaluru product engineering studio led by founder and CEO Utkarsh, building web, mobile, AI, and game engineering systems.",
  path: "/about",
  keywords: ["Relentiv founder", "Utkarsh Relentiv", "Bengaluru product engineering studio"],
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={personSchema()} />
      <div className="relative z-20 mx-auto w-full max-w-[1400px] px-6 pt-8 md:px-12">
        <Breadcrumbs items={[{ name: "About", href: "/about" }]} />
      </div>
      <AboutPageClient />
    </>
  );
}

