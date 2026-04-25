import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { createPageMetadata } from "@/lib/seo";
import { faqSchema, serviceSchema, services, servicesFaqs } from "@/lib/schema";

export const metadata: Metadata = createPageMetadata({
  title: "Services",
  description:
    "Relentiv services include web application development, mobile app development, AI product engineering, game engineering, and UI/UX design.",
  path: "/services",
  keywords: [
    "web application development services",
    "mobile app development services",
    "AI product engineering",
    "game engineering",
    "UI UX design studio",
    "Bengaluru software company",
  ],
});

const serviceDetails = [
  {
    id: "web-applications",
    title: "Web Application Development",
    eyebrow: "SaaS, portals, dashboards, internal tools",
    description:
      "We build production-grade web applications with clear architecture, fast interfaces, reliable backend integrations, and maintainable delivery systems.",
    points: ["Next.js and React interfaces", "APIs, auth, data models, and admin tooling", "Performance, accessibility, and launch readiness"],
  },
  {
    id: "mobile-apps",
    title: "Mobile App Development",
    eyebrow: "iOS and Android product engineering",
    description:
      "We design and engineer mobile apps that feel deliberate, fast, and coherent across devices, while keeping backend sync and product workflows aligned.",
    points: ["React Native and native-feeling UI", "Offline-aware product flows", "Release support and iteration planning"],
  },
  {
    id: "ai-product-engineering",
    title: "AI Product Engineering",
    eyebrow: "LLMs, automation, retrieval, workflows",
    description:
      "We turn AI capabilities into usable product features: assistants, automations, document workflows, decision support, and internal copilots.",
    points: ["LLM workflow design", "Retrieval and data grounding", "Evaluation, monitoring, and guardrails"],
  },
  {
    id: "game-engineering",
    title: "Game Engineering",
    eyebrow: "Real-time graphics and interactive systems",
    description:
      "We engineer interactive experiences, WebGL interfaces, Unity systems, simulations, and high-performance real-time product surfaces.",
    points: ["Unity and WebGL development", "Simulation and interaction logic", "Performance tuning for rich experiences"],
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    eyebrow: "Strategy, systems, prototypes, interface craft",
    description:
      "We shape product flows, visual systems, prototypes, and interface details so engineering has a precise product direction before implementation.",
    points: ["Product strategy and UX mapping", "High-fidelity interface design", "Design systems and component direction"],
  },
];

export default function ServicesPage() {
  return (
    <>
      {services.map((service) => (
        <JsonLd key={service.name} data={serviceSchema(service)} />
      ))}
      <JsonLd data={faqSchema(servicesFaqs)} />

      <main className="min-h-screen bg-[#050505] px-5 py-8 text-white md:px-8 md:py-12">
        <div className="pointer-events-none fixed inset-0 z-[-1] bg-[linear-gradient(rgba(255,255,255,0.032)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.032)_1px,transparent_1px)] bg-[size:72px_72px]" />

        <div className="mx-auto max-w-7xl">
          <Breadcrumbs items={[{ name: "Services", href: "/services" }]} className="mb-10" />

          <header className="border-b border-white/10 pb-10 md:pb-14">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
              Relentiv Services
            </p>
            <h1 className="max-w-5xl text-4xl font-semibold leading-[1.02] text-white md:text-7xl">
              Product engineering services for serious digital products.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/60 md:text-xl">
              Relentiv combines strategy, UI/UX, software engineering, AI
              integration, and interactive development for teams that need a
              polished product without splitting ownership across multiple
              vendors.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition-colors hover:bg-white/90"
              >
                Start a project
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center gap-2 rounded-full border border-white/12 px-5 py-3 text-sm font-medium text-white/72 transition-colors hover:border-white/30 hover:text-white"
              >
                View work
              </Link>
            </div>
          </header>

          <section className="grid grid-cols-1 gap-px border border-white/10 bg-white/10 md:grid-cols-2">
            {serviceDetails.map((service) => (
              <article id={service.id} key={service.id} className="scroll-mt-28 bg-[#070707] p-6 md:p-9">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/38">
                  {service.eyebrow}
                </p>
                <h2 className="mt-4 text-2xl font-semibold leading-tight text-white md:text-3xl">
                  {service.title}
                </h2>
                <p className="mt-4 text-base leading-7 text-white/60">
                  {service.description}
                </p>
                <ul className="mt-6 space-y-3 text-sm text-white/58">
                  {service.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/45" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </section>
        </div>
      </main>

      <FAQSection title="Service Questions" items={servicesFaqs} />
      <Footer />
    </>
  );
}

