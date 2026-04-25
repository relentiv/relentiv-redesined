import { client } from "@/sanity/client";
import { postBySlugQuery, postSlugsQuery } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import { Post } from "@/sanity/types";
import { formatPostDate, getReadingTime } from "@/lib/blog";
import { PortableText, type PortableTextComponents } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import { BlogBackButton } from "@/components/BlogBackButton";
import { ReadingModeToggle } from "@/components/ReadingModeToggle";

interface PageProps {
  params: Promise<{ slug: string }>;
}

type PortableImageValue = {
  asset?: unknown;
  alt?: string;
};

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="reader-paragraph text-white/68">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="reader-heading mt-14 text-3xl font-semibold leading-tight text-white md:text-4xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="reader-heading mt-10 text-2xl font-semibold leading-tight text-white">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l border-white/25 pl-5 text-lg leading-8 text-white/72">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="reader-list my-7 list-disc space-y-3 pl-6 text-white/68">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="reader-list my-7 list-decimal space-y-3 pl-6 text-white/68">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="pl-1 leading-8">{children}</li>,
    number: ({ children }) => <li className="pl-1 leading-8">{children}</li>,
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="text-white underline decoration-white/30 underline-offset-4 transition-colors hover:text-white/70"
        target={value?.blank ? "_blank" : undefined}
        rel={value?.blank ? "noreferrer" : undefined}
      >
        {children}
      </a>
    ),
    code: ({ children }) => (
      <code className="border border-white/10 bg-white/[0.06] px-1.5 py-0.5 font-mono text-[0.9em] text-white">
        {children}
      </code>
    ),
  },
  types: {
    image: ({ value }) => {
      const image = value as PortableImageValue;
      if (!image.asset) return null;

      return (
        <figure className="my-10">
          <div className="relative aspect-[16/10] overflow-hidden border border-white/10 bg-white/[0.04]">
            <Image
              src={urlFor(image).width(1400).height(875).url()}
              alt={image.alt || ""}
              fill
              sizes="(min-width: 768px) 896px, 100vw"
              unoptimized
              className="object-cover"
            />
          </div>
          {image.alt && (
            <figcaption className="mt-3 text-sm text-white/38">
              {image.alt}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export async function generateStaticParams() {
  const slugs: string[] = await client.fetch(postSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post: Post | null = await client.fetch(postBySlugQuery, { slug });

  if (!post) {
    notFound();
  }

  const readingTime = getReadingTime(post.body);

  return (
    <main className="blog-article-shell min-h-screen bg-[#050505] px-5 py-8 text-white md:px-8 md:py-12">
      <div className="pointer-events-none fixed inset-0 z-[-1] bg-[linear-gradient(rgba(255,255,255,0.032)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.032)_1px,transparent_1px)] bg-[size:72px_72px]" />

      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <BlogBackButton />
          <ReadingModeToggle className="w-full justify-between md:w-auto" />
        </div>

        <article data-reader-article className="mx-auto max-w-5xl">
          <header className="mb-10 border-b border-white/10 pb-8 md:mb-14 md:pb-12">
            <div className="mb-7 flex flex-wrap gap-2">
              {post.categories?.map((category) => (
                <span
                  key={category.slug.current}
                  className="border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/48"
                >
                  {category.title}
                </span>
              ))}
            </div>

            <h1 className="max-w-4xl text-4xl font-semibold leading-[1.04] text-white md:text-7xl">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/58 md:text-xl">
                {post.excerpt}
              </p>
            )}

            <div className="mt-8 flex flex-col gap-5 text-sm text-white/50 sm:flex-row sm:flex-wrap sm:items-center">
              {post.author && (
                <div className="flex items-center gap-3">
                  {post.author.image && (
                    <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/15">
                      <Image
                        src={urlFor(post.author.image).width(80).height(80).url()}
                        alt={post.author.name}
                        fill
                        sizes="40px"
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                  )}
                  <span className="text-white/72">{post.author.name}</span>
                </div>
              )}

              <span className="hidden h-1 w-1 rounded-full bg-white/25 sm:block" />

              <time dateTime={post.publishedAt} className="inline-flex items-center gap-2">
                <Calendar size={16} aria-hidden="true" />
                {formatPostDate(post.publishedAt)}
              </time>

              <span className="inline-flex items-center gap-2">
                <Clock size={16} aria-hidden="true" />
                {readingTime} min read
              </span>
            </div>
          </header>

          {post.mainImage && (
            <div className="relative mb-12 aspect-[16/9] w-full overflow-hidden border border-white/10 bg-white/[0.04] md:mb-16">
              <Image
                src={urlFor(post.mainImage.asset).width(1600).height(900).url()}
                alt={post.mainImage.alt || post.title}
                fill
                sizes="(min-width: 1024px) 1024px, 100vw"
                unoptimized
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          )}

          <div className="reader-content mx-auto max-w-[var(--reader-measure,50rem)] text-[var(--reader-font-size,1.08rem)]">
            <PortableText value={post.body} components={portableTextComponents} />
          </div>
        </article>

        <footer className="mx-auto mt-16 max-w-5xl border-t border-white/10 py-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-white/42">Relentiv Journal</p>
            <Link
              href="/blog"
              className="inline-flex w-fit items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
            >
              Back to all posts
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
