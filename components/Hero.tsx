"use client";

import { useEffect } from "react";
import { ImageGrid } from "@/components/ImageGrid";
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

export function Hero() {
  useCalEmbed();

  return (
    <div className="w-full min-h-[calc(100vh-140px)] flex items-center justify-center overflow-hidden pb-12 pt-8 md:pt-12 relative">
      <div className="container px-[24px] md:px-[48px] max-w-[1600px] flex flex-col lg:flex-row items-center justify-between relative gap-12 lg:gap-8">
        
        {/* Subtle structural wireframes */}
        <Crosshair className="-top-12 -left-12 hidden lg:flex" />
        <Crosshair className="-bottom-12 -right-12 hidden lg:flex" />
        <div className="hidden lg:block absolute -top-24 -left-[24px] w-[1px] h-[150%] bg-gradient-to-b from-transparent via-white/10 to-transparent pointer-events-none" />

        {/* Left Column: Text (Takes about 55% width on desktop) */}
        <div className="w-full lg:w-[55%] flex flex-col z-10 relative">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tighter leading-[1.1] md:leading-[1.05] max-w-4xl">
            <span className="text-white">Engineering the</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
              Future of Tech.
            </span>
          </h1>

          <p className="mt-6 md:mt-8 text-lg md:text-xl text-neutral-400 max-w-2xl leading-relaxed tracking-wide">
            Relentiv is a technology studio based in Bengaluru, Karnataka. We build digital products — web applications, mobile apps, game engineering, and AI-integrated systems — for enterprise clients who need the whole thing handled, not just one layer of it.
          </p>

          <div className="mt-12 flex items-center gap-4">
            {/* Dotted border button matching the logo vibe */}
            <button
              onClick={openCalPopup}
              className="px-8 py-3 rounded-full border-2 border-dotted border-white/40 text-white/90 font-mono tracking-[0.2em] text-sm uppercase hover:bg-white hover:text-black hover:border-solid hover:border-white transition-all duration-300 ease-in-out"
            >
              Start Project
            </button>
          </div>
        </div>

        {/* Right Column: Image Grid (Displays on desktop only, takes ~45% width) */}
        <div className="hidden lg:flex w-full lg:w-[45%] h-[400px] lg:h-[500px] xl:h-[600px] relative z-0">
          <ImageGrid />
        </div>

      </div>
    </div>
  );
}