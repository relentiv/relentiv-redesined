import type { Metadata } from "next";
import { Geist, Geist_Mono, Doto } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import Aurora from "@/components/Aurora";

type BackgroundMode = "im" | "rb" | "gr";

// im = static image, rb = React Bits Aurora, gr = CSS agency gradient.
const BACKGROUND_MODE: BackgroundMode = "im";
const STATIC_BACKGROUND_IMAGE_URL =
  // "https://cdn.pixabay.com/photo/2020/11/04/17/11/architecture-5713016_1280.jpg";
  "https://cdn.pixabay.com/photo/2025/06/05/09/22/people-9642583_1280.jpg"
  // "https://cdn.pixabay.com/photo/2023/01/02/13/03/architect-7692052_1280.jpg"
  // "https://cdn.pixabay.com/photo/2020/03/09/13/55/engineer-4915807_1280.jpg"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const doto = Doto({
  variable: "--font-doto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Relentiv | Engineering the Future of Tech",
  description: "A Bengaluru-based technology studio specializing in web, mobile, game engineering, and AI-integrated systems for enterprise clients.",
  icons: {
    icon: "/logo.png",
  },
};

function SiteBackground() {
  if (BACKGROUND_MODE === "im") {
    return (
      <div
        aria-hidden="true"
        className="static-image-background"
        style={{
          backgroundImage: `url("${STATIC_BACKGROUND_IMAGE_URL}")`,
        }}
      />
    );
  }

  if (BACKGROUND_MODE === "rb") {
    return (
      <Aurora
        colorStops={["#3A29FF", "#FF94B4", "#3A29FF"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />
    );
  }

  return <div aria-hidden="true" className="agency-gradient-background" />;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${doto.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col pt-24 md:pt-28 relative bg-black">
        <div className="fixed inset-0 z-0">
          <SiteBackground />
        </div>
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
