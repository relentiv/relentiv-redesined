"use client"
import { Footer } from '../../components/Footer';
import PixelBlast from '../../components/PixelBlast';
import { motion, Variants } from 'framer-motion';

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Relentiv",
    "image": "https://relentiv.com/logo.png",
    "email": "contact@relentiv.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Marvel Nest",
      "addressLocality": "Bommanahalli, Bengaluru",
      "addressRegion": "Karnataka",
      "postalCode": "560068",
      "addressCountry": "IN"
    },
    "description": "Premium Bengaluru-based technology studio specializing in web, mobile, game engineering, and AI-integrated systems."
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <div className="flex flex-col text-[#f5f5f5] font-sans selection:bg-white/20">
      {/* SEO Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="flex-1 relative flex flex-col w-full min-h-screen">
        {/* Abstract Interactive Background */}
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
          {/* Dark overlays to maintain text readability */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.5)_0%,rgba(0,0,0,1)_100%)] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80 pointer-events-none" />
        </div>

        {/* Content Wrapper */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 py-32 flex flex-col gap-40 pointer-events-none">
          
          {/* HERO SECTION */}
          <motion.section 
            initial="hidden" animate="visible" variants={staggerContainer}
            className="flex flex-col gap-8 pt-16 md:pt-32 max-w-4xl pointer-events-auto"
          >
            <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl lg:text-[8rem] font-extrabold tracking-tighter leading-[0.9] drop-shadow-2xl" style={{ fontFamily: "var(--font-doto)" }}>
              Relentless <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B497CF] to-[#f5f5f5]">Engineering.</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-[#f5f5f5]/80 text-xl md:text-3xl max-w-2xl font-medium leading-relaxed drop-shadow-md">
              We are a Bengaluru-based digital product studio blurring the line between technology and art. Uncompromising quality is our baseline.
            </motion.p>
          </motion.section>

          {/* VALUES BENTO GRID */}
          <motion.section 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="flex flex-col gap-10 pointer-events-auto"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold tracking-tight">Our Philosophy</motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Precision", text: "Every pixel, every line of code is intentional. We build systems that are robust, scalable, and mathematically beautiful." },
                { title: "Agility", text: "Moving fast without breaking things. Our iterative process ensures rapid delivery while maintaining enterprise-grade stability." },
                { title: "Aesthetics", text: "Performance is a feature, but beauty is a requirement. We craft experiences that feel organic, premium, and captivating." }
              ].map((val, i) => (
                <motion.article key={i} variants={fadeInUp} className="p-10 rounded-[2rem] bg-white/[0.02] backdrop-blur-xl border border-white/10 hover:bg-white/[0.04] transition-colors duration-500 hover:border-white/20">
                  <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "var(--font-doto)" }}>{val.title}</h3>
                  <p className="text-[#f5f5f5]/70 text-lg leading-relaxed">{val.text}</p>
                </motion.article>
              ))}
            </div>
          </motion.section>

          {/* TEAM PLACEHOLDER UI */}
          <motion.section 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="flex flex-col gap-10 pointer-events-auto"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold tracking-tight">Leadership</motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <motion.div key={i} variants={fadeInUp} className="aspect-[3/4] rounded-3xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/5 flex flex-col items-center justify-center relative overflow-hidden group hover:border-white/10 transition-colors duration-500">
                  <div className="absolute inset-0 bg-white/[0.01] group-hover:bg-white/[0.03] transition-colors duration-500" />
                  <div className="w-12 h-[2px] rounded-full bg-white/20 group-hover:w-16 group-hover:bg-[#B497CF] transition-all duration-500" />
                  <div className="w-8 h-[2px] mt-2 rounded-full bg-white/10 group-hover:w-10 group-hover:bg-[#B497CF]/50 transition-all duration-500 delay-75" />
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* CONTACT INFO */}
          <motion.address 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
            className="not-italic grid grid-cols-1 md:grid-cols-2 gap-12 p-12 md:p-16 rounded-[2rem] bg-white/[0.02] backdrop-blur-xl border border-white/10 w-full mt-12 pointer-events-auto relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#B497CF]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 group-hover:opacity-70 opacity-30 transition-opacity duration-700 pointer-events-none" />
            
            <div className="flex flex-col gap-6 relative z-10">
              <h3 className="text-3xl font-bold tracking-tight">Contact Us</h3>
              <a href="mailto:contact@relentiv.com" className="text-[#f5f5f5]/90 text-2xl md:text-3xl hover:text-white transition-colors underline decoration-white/20 hover:decoration-white/60 underline-offset-8" style={{ fontFamily: "var(--font-doto)" }}>
                contact@relentiv.com
              </a>
            </div>
            <div className="flex flex-col gap-6 relative z-10 md:pl-12 md:border-l border-white/10">
              <h3 className="text-3xl font-bold tracking-tight">Headquarters</h3>
              <p className="text-[#f5f5f5]/70 text-lg md:text-xl leading-relaxed">
                Marvel Nest, Bommanahalli<br />
                Bengaluru, Karnataka<br />
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
