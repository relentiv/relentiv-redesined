"use client"
import { useEffect } from "react";
import { Hero } from "@/components/Hero";
import HowWeWork from "@/components/HowWeWork";
import { WhatWeDo } from "@/components/WhatWeDo";
import { Footer } from "@/components/Footer";

export default function Home() {
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const scrollId = searchParams.get('scrollTo');
    if (scrollId) {
      const timer = setTimeout(() => {
        const el = document.getElementById(scrollId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        const url = new URL(window.location.href);
        url.searchParams.delete('scrollTo');
        window.history.replaceState({}, '', url);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <main className="flex-1 flex flex-col">
      <Hero />
      <WhatWeDo/>
      <HowWeWork/>
      <Footer />
    </main>
  );
}
