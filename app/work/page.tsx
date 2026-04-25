import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { WorkPageClient } from "@/components/WorkPageClient";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Work",
  description:
    "Explore selected Relentiv work across web applications, mobile products, AI systems, UI frameworks, and interactive engineering.",
  path: "/work",
  keywords: ["Relentiv work", "product engineering case studies", "web app portfolio"],
});

export default function WorkPage() {
  return (
    <>
      <div className="relative z-20 mx-auto w-full max-w-7xl px-6 pt-8 lg:px-8">
        <Breadcrumbs items={[{ name: "Work", href: "/work" }]} />
      </div>
      <WorkPageClient />
    </>
  );
}

