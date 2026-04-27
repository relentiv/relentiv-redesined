"use client";

import { GridBackground } from "@/components/GridBackground";
import GridMotion from "@/components/GridMotion";
import { BENTO_ITEMS } from "@/components/WorksBentoGrid";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { PROJECTS } from "@/lib/projects";

function WorkListItem({
  slug,
  title,
  description,
  tags,
  year,
}: {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  year: string;
}) {
  return (
    <Link href={`/work/${slug}`} className="block">
      <div className="group cursor-pointer flex flex-col md:flex-row md:items-center justify-between border-t border-white/10 py-8 md:py-12 transition-all hover:border-white/30">
        <div className="flex flex-col gap-2 md:w-5/12">
          <h3 className="text-2xl md:text-3xl font-semibold text-white tracking-tight group-hover:text-blue-400 transition-colors duration-500">
            {title}
          </h3>
          <p className="text-white/50 mt-1 text-lg leading-relaxed font-light">
            {description}
          </p>
        </div>
        <div className="flex flex-col items-start md:items-end gap-3 mt-6 md:mt-0 md:w-5/12">
          <div className="flex flex-wrap gap-2 justify-start md:justify-end">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-1.5 rounded-full border border-white/10 text-white/70 text-xs tracking-wider font-medium bg-white/[0.02] transition-colors duration-500 hover:bg-white/10"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="text-white/30 text-sm font-mono tracking-widest uppercase mt-2">
            {year}
          </span>
        </div>
      </div>
    </Link>
  );
}

export function WorkPageClient() {
  return (
    <div className="flex flex-col items-center justify-start w-full relative z-0 min-h-screen bg-black">
      <div className="fixed inset-0 bg-[#060606] z-[-1]">
        <GridBackground />
      </div>

      <main className="w-full flex flex-col pt-12">
        <section className="w-full max-w-7xl mx-auto px-6 lg:px-8 flex flex-col text-left lg:text-center items-start lg:items-center mt-20 mb-16">
          <h1 className="text-5xl md:text-[5.5rem] md:leading-[1.1] font-bold tracking-tighter text-white mb-6 drop-shadow-lg">
            Selected Works
          </h1>
          <p className="text-white/60 max-w-2xl text-lg md:text-2xl leading-relaxed font-light">
            A curated showcase of our finest projects. Pure visual excellence,
            engineered to perfection.
          </p>
        </section>

        <section className="w-full relative z-10">
          <GridMotion
            gradientColor="#060606"
            items={BENTO_ITEMS}
          />
        </section>

        <section className="w-full max-w-5xl mx-auto px-6 lg:px-8 flex flex-col mt-40 pb-32">
          <div className="flex items-end justify-between pb-8 mb-4">
            <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-white/90">
              Case Studies
            </h2>
          </div>

          <div className="flex flex-col">
            {PROJECTS.map((project) => (
              <WorkListItem
                key={project.slug}
                slug={project.slug}
                title={project.title}
                description={project.description}
                tags={project.tags}
                year={project.year}
              />
            ))}
          </div>
        </section>
      </main>

      <div className="w-full mt-auto">
        <Footer />
      </div>
    </div>
  );
}

