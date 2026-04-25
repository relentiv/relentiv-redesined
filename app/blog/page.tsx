import { client } from '@/sanity/client'
import { postsQuery, postsSearchQuery } from '@/sanity/queries'
import { urlFor } from '@/sanity/image'
import { Post } from '@/sanity/types'
import { formatPostDate, getReadingTime } from '@/lib/blog'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, BookOpen, Search, X } from 'lucide-react'

interface BlogPageProps {
  searchParams: Promise<{ q?: string | string[] }>
}

function getSearchValue(value?: string | string[]): string {
  const rawValue = Array.isArray(value) ? value[0] : value
  return typeof rawValue === 'string' ? rawValue.trim().slice(0, 80) : ''
}

function getSanitySearchTerm(query: string): string {
  return query
    .split(/\s+/)
    .filter(Boolean)
    .map((term) => `${term}*`)
    .join(' ')
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const query = getSearchValue((await searchParams).q)
  const posts: Post[] = query
    ? await client.fetch(postsSearchQuery, { search: getSanitySearchTerm(query) })
    : await client.fetch(postsQuery)
  const resultLabel = query
    ? `${posts.length} ${posts.length === 1 ? 'result' : 'results'} for "${query}"`
    : `${posts.length} ${posts.length === 1 ? 'post' : 'posts'}`

  return (
    <main className="min-h-screen bg-[#050505] px-5 py-8 text-white md:px-8 md:py-12">
      <div className="pointer-events-none fixed inset-0 z-[-1] bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px]" />

      <div className="mx-auto max-w-7xl">
        <header className="mb-8 border-b border-white/10 pb-7 md:mb-10 md:pb-9">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="mb-3 font-mono text-[11px] uppercase text-white/45">
                Relentiv Journal
              </p>
              <h1 className="text-4xl font-semibold leading-[1.02] text-white md:text-6xl">
                Notes on building serious digital products.
              </h1>
            </div>

            <div className="w-full max-w-xl">
              <form action="/blog" className="flex overflow-hidden border border-white/12 bg-white/[0.04] shadow-2xl shadow-black/20">
                <label htmlFor="blog-search" className="sr-only">
                  Search posts
                </label>
                <div className="flex min-w-0 flex-1 items-center gap-3 px-4">
                  <Search size={18} className="shrink-0 text-white/38" aria-hidden="true" />
                  <input
                    id="blog-search"
                    name="q"
                    type="search"
                    defaultValue={query}
                    placeholder="Search articles, topics, authors"
                    className="h-12 min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/32"
                  />
                </div>
                {query && (
                  <Link
                    href="/blog"
                    aria-label="Clear search"
                    className="hidden items-center border-l border-white/10 px-3 text-white/45 transition-colors hover:bg-white/[0.06] hover:text-white sm:flex"
                  >
                    <X size={17} aria-hidden="true" />
                  </Link>
                )}
                <button
                  type="submit"
                  className="inline-flex h-12 items-center gap-2 border-l border-white/10 bg-white px-4 text-sm font-medium text-black transition-colors hover:bg-white/90 sm:px-5"
                >
                  Search
                  <ArrowUpRight size={16} aria-hidden="true" />
                </button>
              </form>
              <p className="mt-3 text-xs text-white/42">{resultLabel}</p>
            </div>
          </div>
        </header>

        {posts.length === 0 ? (
          <section className="border border-white/10 bg-white/[0.03] p-8 text-white/60">
            {query ? 'No posts matched your search.' : 'No posts published yet.'}
          </section>
        ) : (
          <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug.current}`}
                className="group border border-white/10 bg-[#080808] transition-colors hover:border-white/24 hover:bg-[#101010]"
              >
                <article className="flex h-full min-h-[280px] flex-col">
                  {post.mainImage && (
                    <div className="relative h-40 w-full overflow-hidden bg-white/[0.04]">
                      <Image
                        src={urlFor(post.mainImage.asset).width(760).height(480).url()}
                        alt={post.mainImage.alt || post.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        unoptimized
                        className="object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080808] to-transparent opacity-80" />
                    </div>
                  )}

                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-4 flex flex-wrap items-center gap-3 text-xs uppercase text-white/40">
                      <span className="inline-flex items-center gap-1.5">
                        <BookOpen size={14} aria-hidden="true" />
                        {getReadingTime(post.body)} min
                      </span>
                      <time dateTime={post.publishedAt}>
                        {formatPostDate(post.publishedAt)}
                      </time>
                    </div>

                    <h2 className="text-xl font-semibold leading-tight text-white transition-colors group-hover:text-white/80">
                      {post.title}
                    </h2>

                    {post.excerpt && (
                      <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/52">
                        {post.excerpt}
                      </p>
                    )}

                    <div className="mt-auto pt-6">
                      {post.categories && post.categories.length > 0 && (
                        <div className="mb-4 flex flex-wrap gap-2">
                          {post.categories.slice(0, 2).map((category) => (
                            <span
                              key={category.slug.current}
                              className="border border-white/10 px-2.5 py-1 text-xs text-white/45"
                            >
                              {category.title}
                            </span>
                          ))}
                        </div>
                      )}

                      <span className="inline-flex items-center gap-2 text-sm text-white/72">
                        Open
                        <ArrowUpRight size={16} aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </section>
        )}
      </div>
    </main>
  )
}
