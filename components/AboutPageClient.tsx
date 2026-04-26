"use client";

import Image from "next/image";
import { Footer } from "@/components/Footer";
import PixelBlast from "@/components/PixelBlast";
import { motion, Variants } from "framer-motion";

const founderImageUrl =
  "https://media.licdn.com/dms/image/v2/D5603AQFa0_aLA-We6w/profile-displayphoto-scale_200_200/B56Z2NM_nvIYAY-/0/1776190489486?e=1778716800&v=beta&t=mHPjyW3NZLj_CN3tK3L4Qlx50BJf0SzSDBOMqRElDlk";

const philosophyItems = [
  {
    title: "Precision",
    text: "Every pixel, every line of code is intentional. We build systems that are robust, scalable, and mathematically beautiful.",
  },
  {
    title: "Agility",
    text: "Moving fast without breaking things. Our iterative process ensures rapid delivery while maintaining enterprise-grade stability.",
  },
  {
    title: "Aesthetics",
    text: "Performance is a feature, but beauty is a requirement. We craft experiences that feel organic, premium, and captivating.",
  },
];

const expertiseItems = [
  { name: "Web Systems", desc: "Next.js, React, WebGL" },
  { name: "Mobile Apps", desc: "React Native, Swift" },
  { name: "Game Engineering", desc: "Unity, Procedural Gen" },
  { name: "AI Integration", desc: "LLMs, Deep Learning" },
];

const founderOrbitLabels = [
  { label: "Growth", className: "left-1/2 top-6 -translate-x-1/2" },
  { label: "Strategy", className: "right-7 top-[18%]" },
  { label: "Market", className: "right-4 top-1/2 -translate-y-1/2" },
  { label: "Revenue", className: "right-[10%] bottom-10" },
  { label: "Vision", className: "right-[26%] bottom-[24%]" },
  { label: "Execution", className: "left-[31%] top-[25%]" },
  { label: "Operations", className: "left-7 top-[18%]" },
  { label: "Brand", className: "left-4 top-1/2 -translate-y-1/2" },
];

export function AboutPageClient() {
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  return (
    <div className="flex flex-col text-[#f5f5f5] font-sans selection:bg-white/20">
      <main className="flex-1 relative flex flex-col w-full min-h-screen">

        {/* Background */}
        <div className="fixed inset-0 -z-10 w-full h-full bg-black pointer-events-auto overflow-hidden">
          <div className="absolute inset-0 opacity-40">
            <PixelBlast
              className=""
              style={{}}
              variant="circle"
              pixelSize={6}
              color="#B497CF"
              patternScale={3}
              patternDensity={1.2}
              pixelSizeJitter={0.5}
              enableRipples
              rippleSpeed={0.4}
              rippleThickness={0.12}
              rippleIntensityScale={1.5}
              liquid
              liquidStrength={0.12}
              liquidRadius={1.2}
              liquidWobbleSpeed={5}
              speed={0.6}
              edgeFade={0.25}
              transparent
            />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.5)_0%,rgba(0,0,0,1)_100%)] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80 pointer-events-none" />
        </div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 py-32 flex flex-col gap-40 pointer-events-none">

          {/* Hero */}
          <motion.section
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col gap-8 pt-16 md:pt-32 max-w-4xl pointer-events-auto"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-6xl md:text-8xl lg:text-[8rem] font-extrabold tracking-tighter leading-[0.9] drop-shadow-2xl"
              style={{ fontFamily: "var(--font-doto)" }}
            >
              Relentless <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B497CF] to-[#f5f5f5]">
                Engineering.
              </span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-[#f5f5f5]/80 text-xl md:text-3xl max-w-2xl font-medium leading-relaxed drop-shadow-md"
            >
              Relentiv is led publicly by Anishka Barman, founder at Relentiv.
              We are a Bengaluru-based digital product studio blurring the line
              between technology and art. Uncompromising quality is our baseline.
            </motion.p>
          </motion.section>

          {/* Founder */}
          <motion.section
            id="founder"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="pointer-events-auto"
          >
            <div className="relative grid lg:grid-cols-2 overflow-hidden rounded-[1.5rem] border border-white/[0.08]">

              {/* Photo */}
              <motion.div
                variants={fadeInUp}
                className="relative min-h-[520px] lg:min-h-[680px] overflow-hidden bg-[#050505]"
              >
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:56px_56px] opacity-55" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(180,151,207,0.22),transparent_34%),linear-gradient(to_bottom,rgba(255,255,255,0.04),transparent_34%,rgba(0,0,0,0.72))]" />
                <div className="absolute left-1/2 top-1/2 aspect-square w-[86%] max-w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15" />
                <div className="absolute left-1/2 top-1/2 aspect-square w-[64%] max-w-[390px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20" />
                <div className="absolute left-1/2 top-1/2 aspect-square w-[46%] max-w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#B497CF]/30 shadow-[0_0_90px_rgba(180,151,207,0.22)]" />

                <div className="absolute left-1/2 top-1/2 aspect-square w-[54%] max-w-[330px] min-w-[230px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#111] p-3 shadow-[0_0_70px_rgba(180,151,207,0.22)]">
                  <div className="relative h-full w-full overflow-hidden rounded-full border border-white/15">
                    <Image
                      src={founderImageUrl}
                      alt="Anishka Barman, founder of Relentiv"
                      fill
                      unoptimized
                      sizes="(max-width: 1024px) 70vw, 330px"
                      className="object-cover object-top grayscale"
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,transparent_45%,rgba(0,0,0,0.42)_100%)]" />
                  </div>
                </div>

                {founderOrbitLabels.map((item) => (
                  <div
                    key={item.label}
                    className={`absolute hidden sm:block rounded-full border border-white/15 bg-[#151218]/85 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/58 shadow-[0_0_22px_rgba(180,151,207,0.12)] backdrop-blur-md ${item.className}`}
                  >
                    {item.label}
                  </div>
                ))}

                <div
                  className="absolute inset-0 hidden lg:block"
                  style={{
                    background:
                      "linear-gradient(to right, transparent 55%, #080808 100%)",
                  }}
                />
              </motion.div>

              {/* Text panel */}
              <motion.div
                variants={fadeInUp}
                className="relative flex flex-col justify-end gap-10 bg-[#080808] p-10 md:p-14 lg:p-16"
              >
                <div
                  className="absolute top-0 left-10 right-0 h-px lg:left-0 lg:top-0 lg:bottom-0 lg:h-auto lg:w-px"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                />

                <div className="flex flex-col gap-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/35">
                    Founder
                  </p>
                  <h2
                    id="anishka-barman"
                    className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-none"
                    style={{ fontFamily: "var(--font-doto)" }}
                  >
                    Anishka
                    <br />
                    Barman
                  </h2>
                </div>

                <p className="text-white/50 text-base md:text-lg leading-7 max-w-sm">
                  Driving growth, partnerships, and vision at Relentiv.
                  Building ideas into real products from Bengaluru.
                </p>

                <div className="max-w-sm border-l border-[#B497CF]/35 pl-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/32">
                    Who is the founder of Relentiv?
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/58">
                    Anishka Barman is the founder of Relentiv, a
                    Bengaluru-based product engineering studio.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] uppercase tracking-[0.18em] text-white/25 w-20 shrink-0">
                      Location
                    </span>
                    <span className="text-sm text-white/55">Bengaluru, India</span>
                  </div>
                  <div className="w-full h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] uppercase tracking-[0.18em] text-white/25 w-20 shrink-0">
                      Company
                    </span>
                    <span className="text-sm text-white/55">Relentiv</span>
                  </div>
                </div>

                <a
                  href="https://www.linkedin.com/in/anishka-barman-6787103b9/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-fit text-xs uppercase tracking-[0.16em] text-white/40 hover:text-white/80 transition-colors duration-300 border-b border-white/15 hover:border-white/40 pb-0.5"
                >
                  LinkedIn ↗
                </a>
              </motion.div>
            </div>
          </motion.section>

          {/* Philosophy */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="flex flex-col gap-10 pointer-events-auto"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold tracking-tight"
            >
              Our Philosophy
            </motion.h2>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 list-none p-0 m-0">
              {philosophyItems.map((val, i) => (
                <motion.li
                  key={i}
                  variants={fadeInUp}
                  className="p-10 rounded-[2rem] bg-white/[0.02] backdrop-blur-xl border border-white/10 hover:bg-white/[0.04] transition-colors duration-500 hover:border-white/20"
                >
                  <h3
                    className="text-2xl font-bold mb-4"
                    style={{ fontFamily: "var(--font-doto)" }}
                  >
                    {val.title}
                  </h3>
                  <p className="text-[#f5f5f5]/70 text-lg leading-relaxed">{val.text}</p>
                </motion.li>
              ))}
            </ul>
          </motion.section>

          {/* Technical Expertise */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="flex flex-col gap-10 pointer-events-auto"
          >
            <div className="flex flex-col gap-4">
              <motion.h2
                variants={fadeInUp}
                className="text-4xl md:text-5xl font-bold tracking-tight"
              >
                Technical Expertise
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-[#f5f5f5]/70 text-lg md:text-xl max-w-2xl"
              >
                We are structured as an elite strike team. We deploy
                cutting-edge technical stacks to build high-performance
                products tailored for scale.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {expertiseItems.map((skill, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="p-8 rounded-3xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/5 flex flex-col items-center justify-center relative overflow-hidden group hover:border-white/10 transition-colors duration-500 min-h-[200px] text-center"
                >
                  <div className="absolute inset-0 bg-white/[0.01] group-hover:bg-white/[0.03] transition-colors duration-500" />
                  <h3
                    className="text-xl font-bold text-white relative z-10 mb-2"
                    style={{ fontFamily: "var(--font-doto)" }}
                  >
                    {skill.name}
                  </h3>
                  <p className="text-[#f5f5f5]/60 text-sm relative z-10">{skill.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Contact */}
          <motion.address
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="not-italic grid grid-cols-1 md:grid-cols-2 gap-12 p-12 md:p-16 rounded-[2rem] bg-white/[0.02] backdrop-blur-xl border border-white/10 w-full mt-12 pointer-events-auto relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#B497CF]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 opacity-30 group-hover:opacity-70 transition-opacity duration-700 pointer-events-none" />

            <div className="flex flex-col gap-6 relative z-10">
              <h3 className="text-3xl font-bold tracking-tight">Contact Us</h3>
              <a
                href="mailto:contact@relentiv.com"
                className="text-[#f5f5f5]/90 text-2xl md:text-3xl hover:text-white transition-colors underline decoration-white/20 hover:decoration-white/60 underline-offset-8"
                style={{ fontFamily: "var(--font-doto)" }}
              >
                contact@relentiv.com
              </a>
            </div>

            <div className="flex flex-col gap-6 relative z-10 md:pl-12 md:border-l border-white/10">
              <h3 className="text-3xl font-bold tracking-tight">Headquarters</h3>
              <p className="text-[#f5f5f5]/70 text-lg md:text-xl leading-relaxed">
                Marvel Nest, Bommanahalli
                <br />
                Bengaluru, Karnataka
                <br />
                India 560068
              </p>
            </div>
          </motion.address>

        </div>
      </main>

      <Footer />
    </div>
  );
}
