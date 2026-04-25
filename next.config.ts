import type { NextConfig } from "next";

const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "9wzqrt32";
const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: `/images/${sanityProjectId}/${sanityDataset}/**`,
      },
    ],
  },
};

export default nextConfig;
