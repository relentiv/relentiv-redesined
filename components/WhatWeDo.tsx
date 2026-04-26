"use client"
import GradientBlinds from "./GradientBlinds";

const services = [
  {
    num: "01",
    title: "Web Applications",
    hook: "SaaS platforms. Enterprise portals. Internal tools.",
    description:
      "We architect and build complex, high-performance web systems using modern frameworks — scalable from day one, secure by default, and engineered for the long run.",
  },
  {
    num: "02",
    title: "Mobile Apps",
    hook: "iOS & Android. Native feel, cross-platform speed.",
    description:
      "Premium mobile experiences that feel fluid and intentional. We own the full stack — from interaction design to backend sync — so nothing gets lost in translation.",
  },
  {
    num: "03",
    title: "AI & Automation",
    hook: "LLMs. Custom ML. Intelligent workflows.",
    description:
      "We integrate large language models and custom ML pipelines directly into your product. Raw data becomes decisions. Manual processes become automated systems.",
  },
  {
    num: "04",
    title: "Game Engineering",
    hook: "Real-time graphics. Physics. Interactive simulations.",
    description:
      "High-performance rendering and game logic for interactive products, training simulations, and branded experiences — built for the web and beyond.",
  },
];

export function WhatWeDo() {
  return (
    <section
      id="services"
      aria-labelledby="what-we-do-heading"
      className="w-full relative min-h-[90vh] flex flex-col items-start pt-20 md:pt-40 lg:pt-48 pb-20"
    >
      {/* WebGL Background */}
      <div className="absolute inset-0 z-0 overflow-hidden rounded-t-3xl md:rounded-t-[3rem]">
        <GradientBlinds
          gradientColors={["#7e22ce", "#3b0764", "#4c1d95", "#1e1b4b"]}
          angle={45}
          noise={0.3}
          blindCount={100}
          spotlightOpacity={1}
          mixBlendMode="normal"
        />
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_70%_50%,transparent_30%,rgba(0,0,0,0.7)_100%)] pointer-events-none" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">

        {/* Header Block */}
        <div className="mb-16 md:mb-20 max-w-2xl">
          {/* SEO-friendly section label */}
          <p className="text-xs font-semibold text-gray-300 uppercase tracking-[0.2em] mb-5 drop-shadow-sm">
            Our Services
          </p>
          <h2
            id="what-we-do-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter leading-[1.1] text-white mb-5 drop-shadow-lg"
          >
            What We Build
          </h2>
          {/* Subtitle — instantly tells visitors who you are */}
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed font-medium max-w-xl drop-shadow-md">
            We&apos;re a product engineering company. We turn ideas into software —
            web, mobile, AI, and game experiences built for real users and real
            scale.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px border border-white/10 rounded-2xl overflow-hidden">
          {services.map((service) => (
            <article
              key={service.num}
              className="group relative p-5 md:p-10 bg-black/[0.42] backdrop-blur-md hover:bg-black/[0.52] transition-colors duration-300 border border-white/[0.12]"
            >
              {/* Number + Title row */}
              <div className="flex items-start gap-4 mb-4">
                <span className="text-sm font-semibold text-gray-400 mt-1 tabular-nums select-none pt-0.5">
                  {service.num}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-snug drop-shadow-md">
                  {service.title}
                </h3>
              </div>

              {/* Hook line — scannable, keyword-rich */}
              <p className="text-sm font-semibold text-violet-300 tracking-wide mb-3 ml-0 sm:ml-8 drop-shadow-sm">
                {service.hook}
              </p>

              {/* Description */}
              <p className="text-slate-200 font-medium leading-relaxed text-sm md:text-base ml-0 sm:ml-8">
                {service.description}
              </p>
            </article>
          ))}
        </div>

        {/* Bottom strip */}
        <div className="mt-12 flex items-center gap-3">
          <span className="block h-px w-8 bg-white/20" />
          <p className="text-sm text-gray-300 font-medium">
            Every engagement is end-to-end — strategy, design, engineering, and delivery.
          </p>
        </div>
      </div>
    </section>
  );
}