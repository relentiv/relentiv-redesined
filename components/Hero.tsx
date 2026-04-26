"use client";

import type { FormEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getCalApi } from "@calcom/embed-react";
import { ArrowUpRight, BookOpen, Loader2, Search, X } from "lucide-react";

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

type BlogResult = {
  id: string;
  title: string;
  href: string;
  excerpt: string;
  date: string;
  readingTime: number;
  categories: string[];
  imageUrl: string | null;
  imageAlt: string;
};

function BlogSearchModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [results, setResults] = useState<BlogResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const requestIdRef = useRef(0);

  const runSearch = useCallback(async (value: string) => {
    const searchValue = value.trim();
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `/api/blog-search${searchValue ? `?q=${encodeURIComponent(searchValue)}` : ""}`
      );
      const data = await response.json();

      if (requestId !== requestIdRef.current) return;

      if (!response.ok) {
        throw new Error(data?.error || "Search failed");
      }

      setResults(Array.isArray(data.posts) ? data.posts : []);
      setSubmittedQuery(searchValue);
    } catch {
      if (requestId !== requestIdRef.current) return;
      setResults([]);
      setError("Search is temporarily unavailable. You can still open the full journal.");
    } finally {
      if (requestId === requestIdRef.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      inputRef.current?.focus();
      runSearch("");
    }, 80);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, open, runSearch]);

  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      runSearch(query);
    }, 260);

    return () => clearTimeout(timer);
  }, [open, query, runSearch]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    runSearch(query);
  }

  if (!open) return null;

  const hasQuery = submittedQuery.length > 0;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-black/78 px-4 py-8 text-white backdrop-blur-2xl md:px-8 md:py-12"
      role="dialog"
      aria-modal="true"
      aria-labelledby="blog-search-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-5xl overflow-hidden border border-white/12 bg-[#050505]/92 shadow-2xl shadow-black/60">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:64px_64px] opacity-70" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_18%_0%,rgba(180,151,207,0.16),transparent_42%),linear-gradient(to_bottom,rgba(255,255,255,0.06),transparent_28%)]" />

        <div className="relative z-10 border-b border-white/10 p-5 md:p-7">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-white/38">
                Relentiv Journal
              </p>
              <h2 id="blog-search-title" className="text-2xl font-semibold tracking-tight md:text-4xl">
                Search the field notes.
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close blog search"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/12 text-white/58 transition-colors hover:border-white/28 hover:bg-white/[0.06] hover:text-white"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 flex overflow-hidden border border-white/12 bg-white/[0.04]">
            <label htmlFor="hero-blog-search" className="sr-only">
              Search blog posts
            </label>
            <div className="flex min-w-0 flex-1 items-center gap-3 px-4">
              <Search size={18} className="shrink-0 text-white/38" aria-hidden="true" />
              <input
                ref={inputRef}
                id="hero-blog-search"
                value={query}
                onChange={(event) => setQuery(event.target.value.slice(0, 80))}
                placeholder="Search articles, AI, mobile, systems..."
                className="h-12 min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/32"
              />
            </div>
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="hidden border-l border-white/10 px-3 text-white/45 transition-colors hover:bg-white/[0.06] hover:text-white sm:block"
              >
                <X size={16} aria-hidden="true" />
              </button>
            )}
            <button
              type="submit"
              className="inline-flex h-12 items-center gap-2 border-l border-white/10 bg-white px-4 text-sm font-medium text-black transition-colors hover:bg-white/90 sm:px-5"
            >
              Search
              {loading ? <Loader2 size={16} className="animate-spin" aria-hidden="true" /> : <ArrowUpRight size={16} aria-hidden="true" />}
            </button>
          </form>
        </div>

        <div className="relative z-10 min-h-[24rem] p-5 md:p-7">
          {error ? (
            <div className="flex min-h-[18rem] flex-col items-start justify-center border border-white/10 bg-white/[0.03] p-6">
              <p className="text-lg font-medium text-white">{error}</p>
              <Link href="/blog" className="mt-5 inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white">
                Open journal
                <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </div>
          ) : loading && results.length === 0 ? (
            <div className="flex min-h-[18rem] items-center justify-center text-white/45">
              <Loader2 size={22} className="animate-spin" aria-hidden="true" />
              <span className="ml-3 text-sm">Searching journal</span>
            </div>
          ) : results.length === 0 ? (
            <div className="flex min-h-[18rem] flex-col items-start justify-center border border-white/10 bg-white/[0.03] p-6">
              <p className="text-lg font-medium text-white">No matching notes found.</p>
              <p className="mt-2 max-w-xl text-sm leading-6 text-white/52">
                Try a broader term like product, AI, mobile, design, or systems.
              </p>
              <Link href="/blog" className="mt-5 inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white">
                Browse all posts
                <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-xs text-white/42">
                <span>
                  {hasQuery ? `${results.length} result${results.length === 1 ? "" : "s"} for "${submittedQuery}"` : "Latest journal posts"}
                </span>
                <Link href="/blog" className="inline-flex items-center gap-2 transition-colors hover:text-white">
                  Full journal
                  <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {results.map((post) => (
                  <Link
                    key={post.id}
                    href={post.href}
                    className="group grid min-h-[12rem] grid-cols-[6.5rem_1fr] overflow-hidden border border-white/10 bg-white/[0.035] transition-colors hover:border-white/24 hover:bg-white/[0.06] sm:grid-cols-[9rem_1fr]"
                  >
                    <div className="relative bg-white/[0.04]">
                      {post.imageUrl ? (
                        <Image
                          src={post.imageUrl}
                          alt={post.imageAlt}
                          fill
                          sizes="180px"
                          unoptimized
                          className="object-cover opacity-72 transition duration-500 group-hover:scale-105 group-hover:opacity-90"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-white/22">
                          <BookOpen size={28} aria-hidden="true" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#050505]/22" />
                    </div>

                    <article className="flex min-w-0 flex-col p-4">
                      <div className="mb-3 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-white/36">
                        <span>{post.date || "Journal"}</span>
                        <span className="h-1 w-1 rounded-full bg-white/24" />
                        <span>{post.readingTime} min</span>
                      </div>
                      <h3 className="line-clamp-2 text-base font-semibold leading-tight text-white transition-colors group-hover:text-white/82 md:text-lg">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/48">
                          {post.excerpt}
                        </p>
                      )}
                      <div className="mt-auto flex flex-wrap gap-2 pt-4">
                        {post.categories.length > 0 ? (
                          post.categories.slice(0, 2).map((category) => (
                            <span key={category} className="border border-white/10 px-2 py-1 text-[10px] text-white/40">
                              {category}
                            </span>
                          ))
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-xs text-white/50">
                            Read note
                            <ArrowUpRight size={13} aria-hidden="true" />
                          </span>
                        )}
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  useCalEmbed();
  const [blogSearchOpen, setBlogSearchOpen] = useState(false);

  return (
    <>
     <section className="relative flex w-full items-start overflow-hidden pb-24 pt-6 md:min-h-[calc(100svh-7rem)] md:pb-14 md:pt-10 lg:pt-12 before:absolute before:inset-0 before:z-0 before:bg-gradient-to-r before:from-black/65 before:via-black/35 before:to-transparent before:pointer-events-none">
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
                Book a Call
              </button>

              <a
                href="/work"
                className="w-fit rounded-full border border-white/12 bg-transparent px-5 py-3 text-[11px] font-semibold uppercase text-white/68 transition-all duration-300 hover:border-white/30 hover:bg-white/[0.05] hover:text-white md:px-7 md:py-3.5 md:text-xs"
              >
                See the Work
              </a>
            </div>

            
          </div>

          <div className="relative z-10 mt-7 grid grid-cols-2 gap-x-4 gap-y-3 border-y border-white/15 bg-black/25 backdrop-blur-sm py-3 sm:mt-8 sm:grid-cols-4 sm:gap-2 md:mt-10 md:py-4">
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
                className="rounded-full border border-white/15 bg-black/38 px-2 py-1 text-[9px] font-medium uppercase text-white/55 sm:px-2.5 sm:text-[10px] md:px-3 md:py-1.5 md:text-[11px]"
              >
                {discipline}
              </span>
            ))}
          </div>

            <div className="w-full flex items-center justify-center">
          <div className="mt-7 w-full max-w-xl border border-white/15 bg-black/45 p-2 backdrop-blur-md md:mt-9">
              <button
                type="button"
                onClick={() => setBlogSearchOpen(true)}
               className="group flex h-14 w-full items-center justify-between gap-4 bg-white/[0.06] px-4 text-left transition-colors hover:bg-white/[0.10]"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <Search size={18} className="shrink-0 text-white/42 transition-colors group-hover:text-white/70" aria-hidden="true" />
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium text-white/74">
                      Search the Relentiv Journal
                    </span>
                    <span className="block truncate text-xs text-white/36">
                      AI, mobile, systems, design, delivery
                    </span>
                  </span>
                </span>
                <span className="hidden shrink-0 items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/38 transition-colors group-hover:text-white/68 sm:inline-flex">
                  Open
                  <ArrowUpRight size={14} aria-hidden="true" />
                </span>
              </button>
            </div>
            </div>
        </div>

        

        <a
          href="#services"
          aria-label="Scroll to services"
          className="absolute bottom-6 right-7 z-20 hidden items-center gap-2 rounded-full border border-white/10 bg-black/10 px-3 py-2 text-[10px] font-medium uppercase text-white/48 backdrop-blur-sm transition-colors hover:border-white/20 hover:text-white/75 md:bottom-8 md:right-12 md:flex"
        >
          <span>Scroll</span>
          <span className="relative h-5 w-3" aria-hidden="true">
            <span className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-white/35" />
            <span className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-white/35" />
          </span>
        </a>
      </section>
      <BlogSearchModal open={blogSearchOpen} onClose={() => setBlogSearchOpen(false)} />
    </>
  );
}
