export interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  year: string;
  imageUrl: string;
  fullDescription: string;
  demoUrl?: string;
}

export const PROJECTS: Project[] = [
  {
    slug: "project-alpha",
    title: "Project Alpha",
    description: "Deep dive into state-of-the-art enterprise AI solutions, modernizing standard workflows.",
    tags: ['Enterprise', 'AI/ML'],
    year: "2026",
    imageUrl: "https://cdn.dribbble.com/userupload/47442143/file/3052fd6607f1805a67087036acd2ec18.png?resize=1024x768&vertical=center",
    fullDescription: "Project Alpha represents the pinnacle of enterprise AI integration. We built a system that handles millions of transactions per second, providing real-time insights and automated decision-making for Fortune 500 companies. The architecture leverages distributed computing and advanced neural networks to deliver unprecedented performance."
  },
  {
    slug: "quantum-ui",
    title: "Quantum UI",
    description: "Minimalist interface framework designed for complex, high-frequency data systems.",
    tags: ['Web3', 'Design System'],
    year: "2025",
    imageUrl: "https://cdn.dribbble.com/userupload/47442801/file/1a4fe2e2b8d2c27c4869f0c8ce98a934.webp?resize=1024x770&vertical=center",
    fullDescription: "Quantum UI is a revolutionary design system built for the next generation of financial platforms. It focuses on clarity, speed, and responsiveness. By using a custom-built WebGL rendering engine, we achieved sub-millisecond frame times even with thousands of dynamic data points on screen simultaneously."
  },
  {
    slug: "unison",
    title: "Unison",
    description: "Next-generation yield infrastructure for institutional-grade DeFi returns.",
    tags: ['Web3', 'DeFi', 'Infrastructure'],
    year: "2024",
    imageUrl: "/assets/demo/unison.png",
    fullDescription: "Unison is an automated liquidity layer designed for institutional-grade DeFi returns. It analyzes liquidity across multiple chains using its proprietary Z-Routing engine to find the highest non-inflationary yields. With smart-collateral rebalancing every 12 seconds, it minimizes slippage and maximizes uptime for complex financial strategies.",
    demoUrl: "/projects/unison.html"
  },
  {
    slug: "tarn-knowledge",
    title: "Tarn Knowledge Service",
    description: "Curated insights and professional services for navigating modern knowledge landscapes.",
    tags: ['Knowledge Management', 'Enterprise', 'Strategy'],
    year: "2026",
    imageUrl: "/assets/demo/tarn-knowledge.png",
    fullDescription: "Tarn Knowledge Service empowers growth through intentional strategy and archival precision. It provides a seamless bridge between raw data and actionable wisdom, helping individuals and organizations navigate the complexities of digital asset management. Its specialized pathways cater to students, corporate entities, and events, ensuring tailored knowledge infrastructure for every need.",
    demoUrl: "/projects/tarn_knowledge.html"
  },
  {
    slug: "relentiv-product",
    title: "Relentiv Product Demo",
    description: "Demo description for the deployed Relentiv product.",
    tags: ['Demo', 'Product', 'Web App'],
    year: "2026",
    imageUrl: "/assets/demo/relentiv_product_demo.png",
    fullDescription: "An interactive demonstration of the Relentiv product ecosystem, showcasing state-of-the-art UI/UX patterns, high-performance data processing, and seamless user experiences. This deployed demo allows users to explore the capabilities of the core application in a live environment.",
    demoUrl: "https://relentiv-product-hri8hovzp-relentiv.vercel.app/"
  }
];
