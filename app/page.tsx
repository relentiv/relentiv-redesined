import { Hero } from "@/components/Hero";
import HowWeWork from "@/components/HowWeWork";
import { WhatWeDo } from "@/components/WhatWeDo";


export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      <Hero />
      <WhatWeDo/>
      <HowWeWork/>
    </main>
  );
}
