"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { getCalApi } from "@calcom/embed-react";

function useCalEmbed() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi();
      cal("ui", {
        theme: "dark",
        styles: { branding: { brandColor: "#ffffff" } },
        hideEventTypeDetails: false,
      });
    })();
  }, []);
}

async function openCalPopup() {
  const cal = await getCalApi();
  cal("modal", {
    calLink: "relentiv/30min",
  });
}

// Ultra-minimal agency crosshair accent
const Crosshair = ({ className }: { className?: string }) => (
  <div className={cn("absolute w-6 h-6 pointer-events-none flex items-center justify-center opacity-15", className)}>
    <div className="absolute w-full h-[1px] bg-white" />
    <div className="absolute h-full w-[1px] bg-white" />
  </div>
);

const capabilities = [
  "Strategy",
  "UX/UI",
  "Engineering",
  "Launch",
];

const disciplines = ["Web Apps", "Mobile", "AI Systems", "Game Engineering"];

export function Hero() {
  useCalEmbed();

  return (
    <section className="relative flex min-h-[calc(100svh-6rem)] w-full items-start overflow-hidden pb-10 pt-6 md:min-h-[calc(100svh-7rem)] md:pb-14 md:pt-10 lg:pt-12">
      <div className="relative mx-auto flex w-full max-w-[1600px] flex-col px-7 md:px-12">
        {/* Subtle structural wireframes */}
        <Crosshair className="-top-12 -left-12 hidden lg:flex" />
        <Crosshair className="right-6 top-20 hidden lg:flex" />
        <div className="hidden lg:block absolute -top-16 -left-[24px] w-[1px] h-[120%] bg-gradient-to-b from-transparent via-white/10 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-5xl">
          <p className="mb-4 text-[10px] font-semibold uppercase text-white/55 md:mb-5 md:text-xs">
            Product design + engineering
          </p>

          <h1 className="max-w-5xl text-[clamp(2.7rem,10vw,4.8rem)] font-semibold leading-[1.02] text-white md:text-[clamp(4.6rem,7vw,7.4rem)] md:leading-[0.96]">
            <span className="block">Engineering the</span>
            <span className="block bg-gradient-to-b from-white via-white/82 to-white/42 bg-clip-text pb-1 text-transparent">
              Future of Tech.
            </span>
          </h1>

          <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral-300 sm:text-base md:mt-6 md:max-w-xl md:text-lg">
            We build web, mobile, AI, and interactive products with the polish
            clients notice first.
          </p>

          <div className="mt-6 flex flex-row flex-wrap items-center gap-3 md:mt-8">
            <button
              onClick={openCalPopup}
              className="w-fit rounded-full border-2 border-dotted border-white/45 px-5 py-3 font-mono text-[11px] uppercase text-white/90 transition-all duration-300 ease-in-out hover:border-solid hover:border-white hover:bg-white hover:text-black md:px-7 md:py-3.5 md:text-xs"
            >
              Start a Project
            </button>

            <a
              href="/work"
              className="w-fit rounded-full border border-white/12 bg-transparent px-5 py-3 text-[11px] font-semibold uppercase text-white/68 transition-all duration-300 hover:border-white/30 hover:bg-white/[0.05] hover:text-white md:px-7 md:py-3.5 md:text-xs"
            >
              See the Work
            </a>
          </div>
        </div>

        <div className="relative z-10 mt-7 grid grid-cols-2 gap-x-4 gap-y-3 border-y border-white/10 py-3 sm:mt-8 sm:grid-cols-4 sm:gap-2 md:mt-10 md:py-4">
          {capabilities.map((capability, index) => (
            <div
              key={capability}
              className="flex items-center justify-between gap-3 border-white/10 text-[11px] text-white/70 sm:gap-4 sm:pr-4 sm:text-xs sm:border-r sm:last:border-r-0 md:text-sm"
            >
              <span className="font-mono text-[10px] tabular-nums text-white/32 sm:text-[11px]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-right font-medium">
                {capability}
              </span>
            </div>
          ))}
        </div>

        <div className="relative z-10 mt-3 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
          {disciplines.map((discipline) => (
            <span
              key={discipline}
              className="rounded-full border border-white/10 bg-black/15 px-2 py-1 text-[9px] font-medium uppercase text-white/42 sm:px-2.5 sm:text-[10px] md:px-3 md:py-1.5 md:text-[11px]"
            >
              {discipline}
            </span>
          ))}
        </div>
      </div>

      <a
        href="#services"
        aria-label="Scroll to services"
        className="absolute bottom-6 right-7 z-20 flex items-center gap-2 rounded-full border border-white/10 bg-black/10 px-3 py-2 text-[10px] font-medium uppercase text-white/48 backdrop-blur-sm transition-colors hover:border-white/20 hover:text-white/75 md:bottom-8 md:right-12"
      >
        <span>Scroll</span>
        <span className="relative h-5 w-3" aria-hidden="true">
          <span className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-white/35" />
          <span className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-white/35" />
        </span>
      </a>
    </section>
  );
}
