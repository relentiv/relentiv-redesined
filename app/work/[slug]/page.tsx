"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PROJECTS } from "@/lib/projects";
import { GridBackground } from "@/components/GridBackground";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ProjectPage() {
  const params = useParams();
  const router = useRouter();
  const [activePreview, setActivePreview] = useState({ slug: "", index: 0 });
  const slug = params.slug as string;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
        <Link href="/work" className="text-blue-400 hover:underline">Back to Work</Link>
      </div>
    );
  }

  const demoScreens =
    project.demoScreens ??
    (project.demoUrl ? [{ label: "Live UI", url: project.demoUrl }] : []);
  const activePreviewIndex = activePreview.slug === slug ? activePreview.index : 0;
  const selectedPreview =
    demoScreens.length > 0
      ? demoScreens[Math.min(activePreviewIndex, demoScreens.length - 1)]
      : null;
  const isMobilePreviewProject = project.slug === "event-meetup-app";

  return (
    <div className="flex flex-col items-center justify-start w-full relative z-0 min-h-screen bg-black text-white overflow-x-hidden">
      <div className="fixed inset-0 bg-[#060606] z-[-1]">
        <GridBackground />
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 pt-8 z-20">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-white/50 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span className="text-sm font-medium tracking-tight">Back to Projects</span>
        </button>
      </div>

      <main className="w-full">
        {/* Project Hero */}
        <section className="w-full pt-16 pb-20 px-6 lg:px-8 max-w-7xl mx-auto flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-sm font-mono tracking-[0.3em] text-white/30 uppercase mb-6 block lg:text-center">Case Study • {project.year}</span>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent italic lg:text-center">
              {project.title}
            </h1>
            <div className="flex flex-wrap gap-3 mb-12 lg:justify-center">
              {project.tags.map((tag) => (
                <span key={tag} className="px-6 py-2 rounded-full border border-white/10 text-white/70 text-sm tracking-wide bg-white/[0.02]">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className={
              isMobilePreviewProject
                ? "mx-auto flex w-full justify-center"
                : "w-full aspect-[16/9] relative rounded-3xl overflow-hidden border border-white/10"
            }
          >
            {isMobilePreviewProject && selectedPreview ? (
              <div className="relative w-full max-w-[430px] rounded-[2.75rem] border border-white/15 bg-[#111] p-2.5 shadow-[0_28px_90px_rgba(0,0,0,0.55)]">
                <div className="pointer-events-none absolute left-1/2 top-4 z-20 h-1.5 w-20 -translate-x-1/2 rounded-full bg-black/70" />
                <div className="pointer-events-none absolute right-[5.5rem] top-3.5 z-20 size-2 rounded-full bg-white/20" />
                <div className="relative aspect-[390/844] overflow-hidden rounded-[2.25rem] bg-white">
                  <iframe
                    src={selectedPreview.url}
                    className="absolute inset-0 h-full w-full border-0"
                    title={`${project.title} - ${selectedPreview.label}`}
                  />
                </div>
              </div>
            ) : selectedPreview ? (
              <iframe 
                src={selectedPreview.url} 
                className="absolute inset-0 w-full h-full border-0"
                title={`${project.title} - ${selectedPreview.label}`}
              />
            ) : (
              <Image 
                src={project.imageUrl} 
                alt={project.title}
                fill
                unoptimized
                className="object-cover"
              />
            )}
          </motion.div>

          {demoScreens.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="mt-6 flex flex-wrap justify-center gap-3"
            >
              {demoScreens.map((screen, index) => {
                const isActive = index === activePreviewIndex;

                return (
                  <button
                    key={screen.url}
                    type="button"
                    onClick={() => setActivePreview({ slug, index })}
                    className={`rounded-full border px-5 py-2 text-sm font-semibold transition-colors ${
                      isActive
                        ? "border-white bg-white text-black"
                        : "border-white/10 bg-white/[0.03] text-white/65 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    {screen.label}
                  </button>
                );
              })}
            </motion.div>
          )}

          {selectedPreview && !isMobilePreviewProject && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex justify-center"
            >
              <a 
                href={selectedPreview.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-white/90 transition-all hover:scale-105"
              >
                View Full Live UI
                <ExternalLink className="w-5 h-5" />
              </a>
            </motion.div>
          )}
        </section>

        {/* Project Content */}
        <section className="w-full py-20 px-6 lg:px-8 max-w-4xl mx-auto flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-8 tracking-tight">Overview</h2>
            <p className="text-white/60 text-xl md:text-2xl leading-relaxed font-light mb-16">
              {project.fullDescription}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/10 pt-16">
              <div>
                <h3 className="text-white/40 text-sm font-mono tracking-widest uppercase mb-4">Challenge</h3>
                <p className="text-white/80 text-lg leading-relaxed">
                  Breaking down complex data into digestible visual components while maintaining performance and aesthetic integrity at scale.
                </p>
              </div>
              <div>
                <h3 className="text-white/40 text-sm font-mono tracking-widest uppercase mb-4">Solution</h3>
                <p className="text-white/80 text-lg leading-relaxed">
                  A multi-layered design approach coupled with advanced WebGL rendering architectures to ensure fluid interactions and zero latency.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* More Projects */}
        <section className="w-full py-32 px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
          <h2 className="text-2xl md:text-3xl font-medium mb-12 tracking-tight">More Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.filter(p => p.slug !== slug).slice(0, 3).map((p) => (
              <Link key={p.slug} href={`/work/${p.slug}`} className="group flex flex-col gap-4">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02]">
                  <Image src={p.imageUrl} alt={p.title} fill unoptimized className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-xl font-semibold group-hover:text-blue-400 transition-colors">{p.title}</h3>
                  <p className="text-white/40 text-sm">{p.year}</p>
                </div>
              </Link>
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
