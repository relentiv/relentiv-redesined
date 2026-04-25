"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface GridItem {
  id: number;
  type: "screenshot" | "logo";
  name: string;
  imageUrl?: string;
  svg?: string;
}

// Dummy data setup utilizing embedded cleaner SVGs, custom styles, and image support.
const GRID_ITEMS: GridItem[] = [
  { 
    id: 1, type: "screenshot", name: "framer", 
    imageUrl: "https://cdn.dribbble.com/userupload/16412218/file/original-f75962ab9287b87237d2f27ced3ecb26.png?resize=1600x1200"
  },
  { id: 2, type: "screenshot", name: "Agency Dashboard",
    imageUrl:"https://www.drupal.org/files/issues/2024-08-13/redis-logo-red-black-background.png"
   },
  { 
    id: 3, type: "logo", name: "webflow", 
    imageUrl: `https://static.vecteezy.com/system/resources/previews/067/565/505/non_2x/webflow-logo-rounded-free-png.png` 
  },
   { 
    id: 4, type: "logo", name: "behance", 
    imageUrl:"https://img.freepik.com/premium-vector/behance-logo-icon-social-media_534308-21950.jpg?semt=ais_hybrid&w=740&q=80" 
  },
  { id: 5, type: "screenshot", name: "google cloud",
    imageUrl:"https://cdn.postindustria.com/wp-content/uploads/2021/08/GCP-cloud@2x.jpg"
   },
  { 
    id: 6, type: "logo", name: "mongodb", 
    imageUrl: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkIyzuKbWXglpMjXFmRqCSJOaRfyswluGasA&s` 
  },
  { id: 7, type: "screenshot", name: "cloudflare",
    imageUrl:"https://cdn.iconscout.com/icon/free/png-256/free-cloudflare-logo-icon-svg-download-png-2285038.png?f=webp"
   },
  { 
    id: 8, type: "logo", name: "aws", 
    imageUrl: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZRDV3W380XLfp40NgvJtLxUqqT27kTXkfCA&s` 
  },
  { id: 9, type: "screenshot", name: "Mobile Wireframes",
    imageUrl:"https://cdn.dribbble.com/userupload/43626927/file/original-041aee49c4e9471da3d0987f70853baa.jpg?format=webp&resize=400x300&vertical=center"
   },
  { 
    id: 10, type: "logo", name: "github", 
    imageUrl: `https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_960_720.png` 
  },
  { 
    id: 11, type: "logo", name: "Docker", 
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk40aiXWhVKCQZuuMNa_mJA_5OXlXiHpd34Q&s" 
  },
  { id: 12, type: "screenshot", name: "K8",
    imageUrl:"https://external-preview.redd.it/i-stopped-using-kubernetes-our-devops-team-is-happier-than-v0-FhvI9YZssYrQNGXhbkpPvXPETru23vYVTgmNqBSXxBE.jpg?width=1080&crop=smart&auto=webp&s=09d0843f7940ffb1884f986b07399b3a39709f9d"
   },
];

export function ImageGrid() {
  // -1 means no active random focus
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) {
      const timeoutId = setTimeout(() => {
        setActiveIndex(-1);
      }, 0);
      return () => clearTimeout(timeoutId);
    }

    // Pick a random index every 3 seconds to highlight, when idle.
    const interval = setInterval(() => {
      setActiveIndex(Math.floor(Math.random() * GRID_ITEMS.length));
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div 
      className="relative w-full h-full lg:max-w-[500px] xl:max-w-[600px] ml-auto hidden lg:flex items-center justify-center p-4 xl:p-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 
        Radial gradient mask. Black means 100% visible, transparent means 0% visible.
        This dissolves the edges into the dark background naturally.
      */}
      <div 
        className="grid grid-cols-4 grid-rows-3 w-full aspect-[4/3] relative"
        style={{
          maskImage: "radial-gradient(ellipse at center, black 95%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 65%, transparent 100%)",
        }}
      >
        {GRID_ITEMS.map((item, index) => {
          const isRandomlyFocused = activeIndex === index;
          // Subtly visible by default. Random focus bumps it up. 

          return (
            <div
              key={item.id}
              className={cn(
                "group relative flex items-center justify-center p-3 xl:p-5 overflow-hidden transition-all duration-700 ease-out",
                // Inner lines only logic!
                // Cells not in the first column get a left border
                index % 4 !== 0 && "border-l border-white/15",
                // Cells not in the first row get a top border
                index >= 4 && "border-t border-white/15"
              )}
            >
              {/* Image/Logo Content Wrapper */}
              <div
                className={cn(
                  "w-full h-full flex flex-col items-center justify-center rounded-lg transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  // Opacity logic:
                  // 1. Hover overrides and gives 100%
                  // 2. Randomly focused gets 80% opacity
                  // 3. Inactive gets 40% opacity (no longer nearly invisible)
                  isRandomlyFocused && !isHovered 
                    ? "opacity-80 scale-105 filter-none" 
                    : "opacity-45 grayscale-[0.6] blur-[0.5px] group-hover:opacity-100 group-hover:grayscale-0 group-hover:blur-0 group-hover:scale-110",
                  // Give screenshots a subtle background and border to look like UI cards
                  item.type === "screenshot" && !item.imageUrl && "bg-white/10 border border-white/20 shadow-lg"
                )}
              >
                {item.imageUrl ? (
                  <div className="relative h-full w-full">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      sizes="150px"
                      className="rounded-md object-cover pointer-events-none"
                    />
                  </div>
                ) : item.type === "logo" && item.svg ? (
                  // Logo Render
                  <div 
                    className="w-10 h-10 xl:w-12 xl:h-12 drop-shadow-xl flex items-center justify-center"
                    dangerouslySetInnerHTML={{ __html: item.svg }}
                  />
                ) : (
                  // Screenshot Dummy Render
                  <div className="w-full h-full p-2 flex flex-col items-center justify-center gap-2">
                    <div className="w-8 h-[3px] bg-white/40 rounded-full" />
                    <div className="text-[10px] xl:text-xs text-white break-words text-center font-medium leading-tight px-1">
                      {item.name}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
