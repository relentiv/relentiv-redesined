"use client";

import Image from "next/image";
import PixelBlast from "./PixelBlast";

const stackGroups = [
  {
    label: "Interface",
    tools: ["Next.js", "React", "TypeScript", "Tailwind", "Webflow"],
  },
  {
    label: "Mobile",
    tools: ["React Native", "Expo", "iOS", "Android"],
  },
  {
    label: "Systems",
    tools: ["Node.js", "PostgreSQL", "Firebase", "Redis", "GitHub"],
  },
  {
    label: "AI",
    tools: ["OpenAI", "LLMs", "Python", "Vector Search", "Automation"],
  },
  {
    label: "Cloud",
    tools: ["AWS", "GCP", "Cloudflare", "Docker", "Kubernetes"],
  },
  {
    label: "Interactive",
    tools: ["Three.js", "WebGL", "Unity", "OGL"],
  },
];

const featuredTools = [
  {
    name: "Design Systems",
    image: "/assets/logos/design-systems.png",
  },
  {
    name: "aws",
    image: "/assets/logos/aws.png",
  },
  {
    name: "Webflow",
    image: "/assets/logos/webflow.png",
  },
  {
    name: "figma",
    image: "/assets/logos/figma.png",
  },
  {
    name: "Google Cloud",
    image: "/assets/logos/google-cloud.png",
  },
  {
    name: "Cloudflare",
    image: "/assets/logos/cloudflare.png",
  },
  {
    name: "GitHub",
    image: "/assets/logos/github.png",
  },
  {
    name: "Kubernetes",
    image: "/assets/logos/kubernetes.png",
  },
];

function LogoSlot({ name, image }: { name: string; image?: string }) {
  const initials = name
    .split(/[\s.-]+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className="group flex h-20 items-center justify-center border-b border-r border-white/[0.07] p-4 transition-opacity duration-300"
      title={name}
    >
      {image ? (
        <Image
          src={image}
          alt={`${name} logo`}
          width={120}
          height={48}
          className="max-h-7 max-w-full object-contain opacity-75 transition duration-300 group-hover:opacity-100"
        />
      ) : (
        <span className="font-mono text-[10px] tracking-widest text-white/20 transition duration-300 group-hover:text-white/50">
          {initials}
        </span>
      )}
    </div>
  );
}

export function TechStack() {
  return (
    <section
      aria-labelledby="tech-stack-title"
      className="relative overflow-hidden border-t border-white/10 bg-black py-16 text-white md:py-28"
    >
      <div className="absolute -left-24 -top-20 z-0 h-[26rem] w-[36rem] opacity-52 md:-left-12 md:-top-16 md:h-[34rem] md:w-[48rem]">
        <PixelBlast
          className=""
          style={{}}
          variant="square"
          pixelSize={6}
          color="#B497CF"
          patternScale={2.8}
          patternDensity={1.28}
          pixelSizeJitter={0.18}
          enableRipples
          rippleSpeed={0.24}
          rippleThickness={0.06}
          rippleIntensityScale={0.45}
          liquid
          liquidStrength={0.035}
          liquidRadius={1}
          liquidWobbleSpeed={2}
          speed={0.18}
          edgeFade={0.5}
          transparent
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "96px 96px",
        }}
      />
      <div className="absolute inset-0 z-0 bg-black/72" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_22%_8%,transparent_0%,rgba(0,0,0,0.68)_34%,#000_100%)]" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-6 md:px-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
            Technology
          </p>
          <h2
            id="tech-stack-title"
            className="max-w-xl text-4xl font-medium leading-[1.02] text-white md:text-6xl"
          >
            Tools we trust when polish matters.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-white/58 md:text-lg">
            A focused stack for fast interfaces, reliable systems, and AI
            features that survive production.
          </p>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4">
            {featuredTools.map((tool) => (
              <LogoSlot key={tool.name} name={tool.name} image={tool.image} />
            ))}
          </div>
        </div>

        <div className="self-end border-y border-white/10">
          {stackGroups.map((group, index) => (
            <div
              key={group.label}
              className="grid gap-4 border-b border-white/10 py-5 last:border-b-0 md:grid-cols-[7rem_1fr] md:items-center"
            >
              <div className="flex items-center justify-between md:block">
                <span className="font-mono text-[11px] text-white/30">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-sm font-medium text-white/82 md:mt-2 md:text-base">
                  {group.label}
                </h3>
              </div>

              <ul className="flex flex-wrap gap-2">
                {group.tools.map((tool) => (
                  <li
                    key={tool}
                    className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-white/52 transition-colors duration-300 hover:border-white/22 hover:text-white/80"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
