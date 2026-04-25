"use client";

import { useEffect, useState } from "react";
import { BookOpen, Columns3, Minus, Plus, Type } from "lucide-react";
import { cn } from "@/lib/utils";

const fontScales = ["0.98rem", "1.08rem", "1.18rem"];
const measures = ["42rem", "50rem", "58rem"];

interface ReadingModeToggleProps {
  className?: string;
}

export function ReadingModeToggle({ className }: ReadingModeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [fontIndex, setFontIndex] = useState(1);
  const [measureIndex, setMeasureIndex] = useState(1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const savedEnabled = localStorage.getItem("reading-mode") === "true";
      const savedFont = Number(localStorage.getItem("reading-font-index"));
      const savedMeasure = Number(localStorage.getItem("reading-measure-index"));

      setEnabled(savedEnabled);
      if (Number.isInteger(savedFont) && savedFont >= 0 && savedFont < fontScales.length) {
        setFontIndex(savedFont);
      }
      if (Number.isInteger(savedMeasure) && savedMeasure >= 0 && savedMeasure < measures.length) {
        setMeasureIndex(savedMeasure);
      }
      setMounted(true);
    });

    return () => {
      cancelAnimationFrame(frame);
      document.body.classList.remove("reading-mode");
      document.body.style.removeProperty("--reader-font-size");
      document.body.style.removeProperty("--reader-measure");
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;

    document.body.classList.toggle("reading-mode", enabled);
    document.body.style.setProperty("--reader-font-size", fontScales[fontIndex]);
    document.body.style.setProperty("--reader-measure", measures[measureIndex]);
    localStorage.setItem("reading-mode", String(enabled));
    localStorage.setItem("reading-font-index", String(fontIndex));
    localStorage.setItem("reading-measure-index", String(measureIndex));
  }, [enabled, fontIndex, measureIndex, mounted]);

  useEffect(() => {
    let frame = 0;

    function updateProgress() {
      const article = document.querySelector<HTMLElement>("[data-reader-article]");
      if (!article) return;

      const rect = article.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const read = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      setProgress(Math.round((read / Math.max(total, 1)) * 100));
    }

    function onScroll() {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateProgress);
    }

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 border border-white/10 bg-black/45 p-1.5 text-white backdrop-blur-xl",
        className
      )}
    >
      <div className="flex min-w-20 items-center gap-2 px-2 text-xs text-white/50">
        <BookOpen size={15} aria-hidden="true" />
        <span>{progress}%</span>
      </div>

      <button
        type="button"
        onClick={() => setEnabled((value) => !value)}
        className={cn(
          "inline-flex items-center gap-2 px-3 py-2 text-sm transition-colors",
          enabled
            ? "bg-white text-black"
            : "bg-white/[0.04] text-white/68 hover:bg-white/[0.08] hover:text-white"
        )}
        aria-pressed={enabled}
      >
        <BookOpen size={16} aria-hidden="true" />
        Reader
      </button>

      <div className="flex items-center bg-white/[0.04]" aria-label="Text size">
        <button
          type="button"
          onClick={() => setFontIndex((value) => Math.max(value - 1, 0))}
          className="p-2 text-white/60 transition-colors hover:text-white disabled:opacity-35"
          disabled={fontIndex === 0}
          aria-label="Decrease text size"
        >
          <Minus size={15} aria-hidden="true" />
        </button>
        <Type size={15} aria-hidden="true" className="text-white/45" />
        <button
          type="button"
          onClick={() => setFontIndex((value) => Math.min(value + 1, fontScales.length - 1))}
          className="p-2 text-white/60 transition-colors hover:text-white disabled:opacity-35"
          disabled={fontIndex === fontScales.length - 1}
          aria-label="Increase text size"
        >
          <Plus size={15} aria-hidden="true" />
        </button>
      </div>

      <button
        type="button"
        onClick={() => setMeasureIndex((value) => (value + 1) % measures.length)}
        className="inline-flex items-center gap-2 bg-white/[0.04] px-3 py-2 text-sm text-white/68 transition-colors hover:bg-white/[0.08] hover:text-white"
        aria-label="Change reading width"
      >
        <Columns3 size={16} aria-hidden="true" />
        Width
      </button>
    </div>
  );
}
