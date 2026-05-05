import type { Metadata } from "next";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactActions } from "@/components/ContactActions";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { createPageMetadata, siteConfig } from "@/lib/seo";
import { localBusinessSchema } from "@/lib/schema";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contact Relentiv in Bengaluru for web application development, mobile apps, AI product engineering, game engineering, and UI/UX design.",
  path: "/contact",
  keywords: ["contact Relentiv", "Relentiv Bengaluru", "software development company Bengaluru"],
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <main className="min-h-screen bg-[#050505] px-5 py-8 text-white md:px-8 md:py-12">
        <div className="pointer-events-none fixed inset-0 z-[-1] bg-[linear-gradient(rgba(255,255,255,0.032)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.032)_1px,transparent_1px)] bg-[size:72px_72px]" />

        <div className="mx-auto max-w-6xl">
          <Breadcrumbs items={[{ name: "Contact", href: "/contact" }]} className="mb-10" />

          <header className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-[1.1fr_0.9fr] md:pb-14">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
                Contact Relentiv
              </p>
              <h1 className="text-4xl font-semibold leading-[1.02] text-white md:text-7xl">
                Build the next product with a focused engineering team.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/60 md:text-xl">
                Send a project brief, product challenge, or early idea. We
                respond with the next practical step: discovery, scope, or a
                clear recommendation.
              </p>
            </div>

            <address className="not-italic border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <div className="flex items-start gap-4">
                <Mail className="mt-1 text-white/45" size={20} aria-hidden="true" />
                <div>
                  <h2 className="text-lg font-semibold text-white">Email</h2>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="mt-2 inline-flex items-center gap-2 text-white/70 underline decoration-white/25 underline-offset-4 transition-colors hover:text-white"
                  >
                    {siteConfig.email}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                </div>
              </div>

              <div className="mt-8 flex items-start gap-4 border-t border-white/10 pt-8">
                <MapPin className="mt-1 text-white/45" size={20} aria-hidden="true" />
                <div>
                  <h2 className="text-lg font-semibold text-white">Headquarters</h2>
                  <p className="mt-2 leading-7 text-white/62">
                    Marvel Nest, Bommanahalli
                    <br />
                    Bengaluru, Karnataka
                    <br />
                    India 560068
                  </p>
                </div>
              </div>
            </address>
          </header>

          <section className="grid gap-px border border-white/10 bg-white/10 md:grid-cols-3">
            {[
              ["Web and Mobile", "SaaS, portals, dashboards, iOS, Android, and production web systems."],
              ["AI Products", "LLM workflows, retrieval systems, internal copilots, and automation."],
              ["Interactive Engineering", "Game engineering, simulations, WebGL, and rich product experiences."],
            ].map(([title, description]) => (
              <article key={title} className="bg-[#070707] p-6 md:p-8">
                <h2 className="text-xl font-semibold text-white">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-white/58">{description}</p>
              </article>
            ))}
          </section>

          <ContactActions email={siteConfig.email} />
        </div>
      </main>
      <Footer />
    </>
  );
}
