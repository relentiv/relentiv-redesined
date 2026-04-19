"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { getCalApi } from "@calcom/embed-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

async function openCalPopup() {
  const cal = await getCalApi();
  cal("modal", {
    calLink: "relentiv/30min",
  });
}

type NavTheme = "dark" | "light";

function getPerceivedBrightness(r: number, g: number, b: number): number {
  // Human-eye weighted luminance formula (not just average RGB)
  return (r * 299 + g * 587 + b * 114) / 1000;
}

function parseRGB(color: string): [number, number, number] | null {
  const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match) return null;
  return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
}

function getThemeFromElement(element: Element | null): NavTheme {
  if (!element) return "dark";

  // Walk up the DOM tree to find a meaningful background color
  let el: Element | null = element;
  while (el && el !== document.documentElement) {
    const bg = window.getComputedStyle(el).backgroundColor;
    if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
      const rgb = parseRGB(bg);
      if (rgb) {
        const brightness = getPerceivedBrightness(...rgb);
        return brightness > 128 ? "light" : "dark";
      }
    }
    el = el.parentElement;
  }

  // Fallback: sample multiple points across the navbar height
  // to catch WebGL canvases and gradient backgrounds
  const samplePoints = [
    { x: window.innerWidth * 0.2, y: 30 },
    { x: window.innerWidth * 0.5, y: 30 },
    { x: window.innerWidth * 0.8, y: 30 },
  ];

  let totalBrightness = 0;
  let validSamples = 0;

  for (const point of samplePoints) {
    const sampled = document.elementFromPoint(point.x, point.y);
    if (!sampled) continue;

    let sampledEl: Element | null = sampled;
    while (sampledEl && sampledEl !== document.documentElement) {
      const bg = window.getComputedStyle(sampledEl).backgroundColor;
      if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
        const rgb = parseRGB(bg);
        if (rgb) {
          totalBrightness += getPerceivedBrightness(...rgb);
          validSamples++;
          break;
        }
      }
      sampledEl = sampledEl?.parentElement ?? null;
    }
  }

  if (validSamples > 0) {
    return totalBrightness / validSamples > 128 ? "light" : "dark";
  }

  return "dark"; // Safe default for your mostly-dark site
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<NavTheme>("dark");
  const rafRef = useRef<number | null>(null);
  const navRef = useRef<HTMLElement>(null);

  const detectTheme = useCallback(() => {
    // Sample the center-bottom edge of the navbar
    const navHeight = navRef.current?.offsetHeight ?? 60;
    const centerX = window.innerWidth / 2;
    const sampleY = navHeight + 2; // Just below the navbar

    const elementBelow = document.elementFromPoint(centerX, sampleY);
    const detected = getThemeFromElement(elementBelow);
    setTheme(detected);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);

      // Throttle theme detection with rAF
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(detectTheme);
    };

    // Run once on mount
    detectTheme();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [detectTheme]);

  // Also re-detect on resize
  useEffect(() => {
    const handleResize = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(detectTheme);
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [detectTheme]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const router = useRouter();
  const pathname = usePathname();

  /** Smoothly scrolls to a section by id. Returns true if found. */
  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return true;
    }
    return false;
  }, []);

  /**
   * Handle nav link clicks:
   * - If href is a hash (#section) and we're already on "/", scroll in-page.
   * - Otherwise, go to home with ?scrollTo=<section> so the home page handles scrolling.
   * - For regular non-hash links (like "/about") just navigate normally.
   */
  const handleNavClick = useCallback(
    (e: React.MouseEvent, href: string) => {
      if (!href.startsWith("#")) return; // let <Link> handle normal routes
      e.preventDefault();
      const sectionId = href.slice(1); // strip the "#"
      if (pathname === "/") {
        scrollToSection(sectionId);
      } else {
        // Navigate to home and signal which section to scroll to
        router.push(`/?scrollTo=${sectionId}`);
      }
    },
    [pathname, router, scrollToSection]
  );

  const navLinks = [
    { name: "Work",     href: "/work" },
    { name: "Services", href: "#services" },
    { name: "Studio",   href: "#studio" },
    { name: "About",    href: "/about" },
  ];

  const isDark = theme === "dark";

  // Derived color tokens based on detected theme
  const textColor = isDark ? "text-white" : "text-black";
  const textMuted = isDark ? "text-white/70" : "text-black/60";
  const pillBg = isDark ? "bg-white/5" : "bg-black/5";
  const pillBorder = isDark ? "border-white/10" : "border-black/10";
  const pillHover = isDark ? "hover:text-white hover:bg-white/10" : "hover:text-black hover:bg-black/10";
  const ctaBorder = isDark ? "border-white/40 text-white hover:bg-white hover:text-black hover:border-white" : "border-black/40 text-black hover:bg-black hover:text-white hover:border-black";
  const glassBg = scrolled
    ? isDark
      ? "bg-black/10 backdrop-blur-xl border-b border-white/10 shadow-lg"
      : "bg-white/10 backdrop-blur-xl border-b border-black/10 shadow-lg"
    : "bg-transparent";

  return (
    <>
      <header
        
        ref={navRef}
        className={cn(
          "flex items-center justify-center fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          glassBg,
          scrolled ? "py-3 md:py-4" : "py-5 md:py-8"
        )}
      >
        <nav className="max-w-[1600px] w-full flex items-center justify-between px-6 md:px-12">
          {/* Logo — smooth color transition */}
          <Link
            href="/"
            className="relative z-50 flex items-center gap-2.5 group"
          >
            <span
              className={cn(
                "text-3xl md:text-4xl font-extrabold tracking-widest transition-colors duration-300",
                textColor
              )}
              style={{ fontFamily: "var(--font-doto)" }}
            >
              Relentiv.
            </span>
          </Link>

          {/* Desktop Nav */}
          <div
            className={cn(
              "hidden md:flex items-center gap-1 backdrop-blur-md px-2 py-1.5 rounded-full border shadow-sm transition-all duration-300",
              pillBg,
              pillBorder
            )}
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={cn(
                  "px-5 py-2 text-sm font-medium transition-colors duration-300 rounded-full",
                  textMuted,
                  pillHover
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <button
              onClick={openCalPopup}
              className={cn(
                "px-6 py-2 rounded-full border-2 border-dotted font-mono tracking-[0.2em] text-xs uppercase transition-all duration-300 ease-in-out whitespace-nowrap",
                ctaBorder
              )}
            >
              Start Project
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "relative z-50 md:hidden p-2 -mr-2 transition-all duration-300 active:scale-90",
              textColor
            )}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl md:hidden overflow-hidden flex flex-col pt-24 px-6 pb-10"
          >
            <div className="flex flex-col gap-2 mt-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: i * 0.1 + 0.1,
                    duration: 0.4,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={(e) => {
                      setIsOpen(false);
                      handleNavClick(e, link.href);
                    }}
                    className="text-4xl font-medium tracking-tight text-white flex items-center justify-between py-4 border-b border-white/10 group"
                  >
                    <span>{link.name}</span>
                    <span className="text-white/20 group-hover:text-white transition-colors transform translate-x-0 group-hover:translate-x-2">
                      →
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.5,
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-auto"
            >
              <div className="mb-8 flex gap-4 text-sm font-medium text-white/50">
                <Link href="https://x.com/relentiv_global" className="hover:text-white transition-colors">
                  X/Twitter
                </Link>
                <Link href="https://www.instagram.com/relentivlabs/" className="hover:text-white transition-colors">
                  Instagram
                </Link>
                <Link href="https://www.linkedin.com/company/relentiv/" className="hover:text-white transition-colors">
                  LinkedIn
                </Link>
              </div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  openCalPopup();
                }}
                className="w-full py-4 text-center block rounded-full border-2 border-dotted border-white/40 text-white font-mono tracking-[0.2em] text-sm uppercase hover:bg-white hover:text-black hover:border-solid hover:border-white transition-all duration-300 ease-in-out"
              >
                Start Project
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}