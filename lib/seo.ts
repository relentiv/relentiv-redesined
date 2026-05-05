import type { Metadata } from "next";

export const siteConfig = {
  name: "Relentiv",
  legalName: "Relentiv",
  url: "https://www.relentiv.com",
  email: "contact@relentiv.com",
  logo: "/logo.png",
  description:
    "Relentiv is a Bengaluru-based product engineering studio building web, mobile, AI, game engineering, and UI/UX systems for ambitious teams.",
  locale: "en_IN",
  socialLinks: [
    "https://www.linkedin.com/company/relentiv/",
    "https://www.instagram.com/relentivlabs/",
    "https://x.com/relentiv_global",
  ],
  address: {
    streetAddress: "Marvel Nest",
    addressLocality: "Bommanahalli, Bengaluru",
    addressRegion: "Karnataka",
    postalCode: "560068",
    addressCountry: "IN",
  },
} as const;

export const siteUrl = new URL(siteConfig.url);

type PageMetadataInput = {
  title: string;
  description: string;
  path?: string;
  type?: "website" | "article";
  image?: string;
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  keywords?: string[];
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

export function pageTitle(title: string) {
  return title === siteConfig.name ? title : `${title} | ${siteConfig.name}`;
}

export function createPageMetadata({
  title,
  description,
  path = "/",
  type = "website",
  image,
  noIndex = false,
  publishedTime,
  modifiedTime,
  authors,
  keywords,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const resolvedTitle = pageTitle(title);
  const imageUrl = image ? absoluteUrl(image) : absoluteUrl(`${path === "/" ? "" : path}/opengraph-image`);

  return {
    title: resolvedTitle,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      title: resolvedTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: resolvedTitle,
        },
      ],
      ...(type === "article"
        ? {
            publishedTime,
            modifiedTime,
            authors,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
      images: [imageUrl],
    },
  };
}

export const publicRoutes = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/work", priority: 0.8, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.85, changeFrequency: "monthly" },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms-of-service", priority: 0.3, changeFrequency: "yearly" },
] as const;
