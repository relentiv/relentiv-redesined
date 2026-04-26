import type { Post } from "@/sanity/types";
import { getPortableTextPlainText } from "@/lib/blog";
import { absoluteUrl, siteConfig } from "@/lib/seo";

type BreadcrumbItem = {
  name: string;
  path: string;
};

type Question = {
  question: string;
  answer: string;
};

type ServiceDefinition = {
  name: string;
  description: string;
  path?: string;
};

const context = "https://schema.org";

export const services: ServiceDefinition[] = [
  {
    name: "Web Application Development",
    description:
      "Design and engineering for SaaS products, enterprise portals, internal tools, and high-performance web systems.",
    path: "/services#web-applications",
  },
  {
    name: "Mobile App Development",
    description:
      "Cross-platform and native-feeling mobile apps for iOS and Android with product design, backend sync, and release support.",
    path: "/services#mobile-apps",
  },
  {
    name: "AI Product Engineering",
    description:
      "LLM integrations, workflow automation, custom ML pipelines, retrieval systems, and AI-native product features.",
    path: "/services#ai-product-engineering",
  },
  {
    name: "Game Engineering",
    description:
      "Real-time graphics, simulations, Unity experiences, WebGL interfaces, and interactive product engineering.",
    path: "/services#game-engineering",
  },
  {
    name: "UI/UX Design",
    description:
      "Product strategy, UX systems, interface design, prototypes, and design systems for polished digital products.",
    path: "/services#ui-ux-design",
  },
];

export const homeFaqs: Question[] = [
  {
    question: "What does Relentiv build?",
    answer:
      "Relentiv builds web applications, mobile apps, AI-integrated products, game engineering systems, and UI/UX design systems for startups and enterprise teams.",
  },
  {
    question: "Where is Relentiv based?",
    answer:
      "Relentiv is based in Bengaluru, India and works with clients across India, the United States, the UAE, and other global markets.",
  },
  {
    question: "Can Relentiv handle design and engineering together?",
    answer:
      "Yes. Relentiv works end to end across strategy, UX/UI design, software engineering, launch, and iteration.",
  },
];

export const servicesFaqs: Question[] = [
  {
    question: "Which services can be combined in one engagement?",
    answer:
      "Most Relentiv engagements combine strategy, UI/UX, frontend, backend, AI integration, and launch support depending on the product scope.",
  },
  {
    question: "Does Relentiv work on existing products?",
    answer:
      "Yes. Relentiv can audit, redesign, modernize, and extend existing web, mobile, AI, and interactive products.",
  },
  {
    question: "How do new projects start?",
    answer:
      "Projects start with a discovery call, followed by scope definition, technical planning, proposal, and a delivery roadmap.",
  },
];

export const aboutFaqs: Question[] = [
  {
    question: "Who is the founder of Relentiv?",
    answer:
      "Anishka Barman is the founder of Relentiv, a Bengaluru-based product engineering studio.",
  },
  {
    question: "Where is Relentiv based?",
    answer:
      "Relentiv is based in Bengaluru, Karnataka, India.",
  },
];

export function organizationSchema() {
  return {
    "@context": context,
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: absoluteUrl(siteConfig.logo),
    email: siteConfig.email,
    sameAs: siteConfig.socialLinks,
    founder: {
      "@type": "Person",
      "@id": absoluteUrl("/about#anishka-barman"),
      name: "Anishka Barman",
    },
    address: {
      "@type": "PostalAddress",
      ...siteConfig.address,
    },
  };
}

export function websiteSchema() {
  return {
    "@context": context,
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: siteConfig.name,
    url: siteConfig.url,
    publisher: {
      "@id": absoluteUrl("/#organization"),
    },
    inLanguage: "en-IN",
  };
}

export function localBusinessSchema() {
  return {
    "@context": context,
    "@type": "ProfessionalService",
    "@id": absoluteUrl("/#local-business"),
    name: siteConfig.name,
    url: siteConfig.url,
    image: absoluteUrl(siteConfig.logo),
    email: siteConfig.email,
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      ...siteConfig.address,
    },
    areaServed: [
      { "@type": "City", name: "Bengaluru" },
      { "@type": "Country", name: "India" },
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "United Arab Emirates" },
    ],
    sameAs: siteConfig.socialLinks,
  };
}

export function aboutPageSchema() {
  return {
    "@context": context,
    "@type": "AboutPage",
    "@id": absoluteUrl("/about#about-page"),
    url: absoluteUrl("/about"),
    name: "Founder of Relentiv: Anishka Barman",
    headline: "Founder of Relentiv: Anishka Barman",
    description:
      "Anishka Barman is the founder of Relentiv, a Bengaluru-based product engineering studio building web, mobile, AI, game engineering, and UI/UX systems.",
    isPartOf: {
      "@id": absoluteUrl("/#website"),
    },
    publisher: {
      "@id": absoluteUrl("/#organization"),
    },
    about: [
      { "@id": absoluteUrl("/#organization") },
      { "@id": absoluteUrl("/about#anishka-barman") },
    ],
    mainEntity: {
      "@id": absoluteUrl("/about#anishka-barman"),
    },
    inLanguage: "en-IN",
  };
}

export function personSchema() {
  return {
    "@context": context,
    "@type": "Person",
    "@id": absoluteUrl("/about#anishka-barman"),
    name: "Anishka Barman",
    jobTitle: "Founder of Relentiv",
    description:
      "Anishka Barman is the founder of Relentiv, a Bengaluru-based product engineering studio.",
    image:
      "https://media.licdn.com/dms/image/v2/D5603AQFa0_aLA-We6w/profile-displayphoto-scale_200_200/B56Z2NM_nvIYAY-/0/1776190489486?e=1778716800&v=beta&t=mHPjyW3NZLj_CN3tK3L4Qlx50BJf0SzSDBOMqRElDlk",
    worksFor: {
      "@id": absoluteUrl("/#organization"),
    },
    affiliation: {
      "@id": absoluteUrl("/#organization"),
    },
    url: absoluteUrl("/about"),
    sameAs: ["https://www.linkedin.com/in/anishka-barman-6787103b9/"],
    knowsAbout: [
      "Growth",
      "Partnerships",
      "Product strategy",
      "Digital product studios",
      "Business operations",
    ],
    homeLocation: {
      "@type": "Place",
      name: "Bengaluru, Karnataka, India",
    },
  };
}

export function serviceSchema(service: ServiceDefinition) {
  return {
    "@context": context,
    "@type": "Service",
    "@id": absoluteUrl(service.path ?? "/services"),
    name: service.name,
    description: service.description,
    provider: {
      "@id": absoluteUrl("/#organization"),
    },
    areaServed: "Worldwide",
    serviceType: service.name,
    url: absoluteUrl(service.path ?? "/services"),
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": context,
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(items: Question[]) {
  return {
    "@context": context,
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function blogPostingSchema(post: Post, slug: string, imageUrl?: string) {
  const plainText = getPortableTextPlainText(post.body);
  const description = post.seo?.metaDescription || post.excerpt || plainText.slice(0, 160);
  const authorName = post.author?.name || siteConfig.name;

  return {
    "@context": context,
    "@type": "BlogPosting",
    "@id": absoluteUrl(`/blog/${slug}#blog-posting`),
    headline: post.title,
    description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post._updatedAt || post.publishedAt,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@id": absoluteUrl("/#organization"),
    },
    mainEntityOfPage: absoluteUrl(`/blog/${slug}`),
    image: imageUrl ? [imageUrl] : undefined,
    articleSection: post.categories?.map((category) => category.title),
    keywords: post.seo?.keywords?.join(", "),
  };
}
