import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Relentiv - Premium Technology Studio in Bengaluru',
  description: 'Relentiv is a Bengaluru-based digital product studio specializing in high-performance web, mobile, game engineering, and AI systems. Uncompromising quality is our baseline.',
  openGraph: {
    title: 'About Us | Relentiv',
    description: 'Relentiv is a Bengaluru-based digital product studio specializing in high-performance web, mobile, game engineering, and AI systems.',
    url: 'https://relentiv.com/about',
    siteName: 'Relentiv',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | Relentiv',
    description: 'Bengaluru-based digital product studio specializing in high-performance web, mobile, game engineering, and AI systems.',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
