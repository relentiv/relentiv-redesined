import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";

type LegalPageLayoutProps = {
  title: string;
  description: string;
  lastUpdated: string;
  path: "/privacy-policy" | "/terms-of-service";
  children: ReactNode;
};

const legalLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
] as const;

export default function LegalPageLayout({
  title,
  description,
  lastUpdated,
  path,
  children,
}: LegalPageLayoutProps) {
  return (
    <main className="min-h-screen bg-[#050505] px-5 py-8 text-white md:px-8 md:py-12">
      <div className="pointer-events-none fixed inset-0 z-[-1] bg-[linear-gradient(rgba(255,255,255,0.032)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.032)_1px,transparent_1px)] bg-[size:72px_72px]" />

      <div className="mx-auto max-w-5xl">
        <Breadcrumbs
          items={[{ name: title, href: path }]}
          className="mb-8 md:mb-10"
        />

        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/62 transition-colors hover:text-white md:mb-10"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to Home
        </Link>

        <header className="border-b border-white/10 pb-8 md:pb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/48">
            Legal
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.04] text-white md:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-white/60 md:text-lg">
            Last updated: {lastUpdated}. {description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {legalLinks.map((link) => {
              const active = path === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium uppercase transition-colors ${
                    active
                      ? "border-white/30 bg-white/[0.08] text-white"
                      : "border-white/10 bg-white/[0.03] text-white/60 hover:border-white/25 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </header>

        <article className="mx-auto mt-10 max-w-[52rem] text-[1.03rem] leading-8 text-white/72 md:mt-14 [&>h2:first-child]:mt-0 [&>h2]:mt-11 [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:leading-tight [&>h2]:text-white [&>p]:mt-5 [&>ul]:mt-5 [&>ul]:list-disc [&>ul]:space-y-3 [&>ul]:pl-6 [&_a]:text-white [&_a]:underline [&_a]:decoration-white/40 [&_a]:underline-offset-4 [&_a]:transition-colors hover:[&_a]:text-white/75 [&_strong]:font-semibold [&_strong]:text-white [&_ul>li]:pl-1">
          {children}
        </article>
      </div>
    </main>
  );
}
