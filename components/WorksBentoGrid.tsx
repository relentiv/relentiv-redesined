"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const BENTO_ITEMS = [
  { id: 1, type: "square", slug: "project-alpha", imageUrl: "https://cdn.dribbble.com/userupload/47442143/file/3052fd6607f1805a67087036acd2ec18.png?resize=1024x768&vertical=center" },
  { id: 2, type: "large", slug: "quantum-ui", imageUrl: "https://cdn.dribbble.com/userupload/47442801/file/1a4fe2e2b8d2c27c4869f0c8ce98a934.webp?resize=1024x770&vertical=center" },
  { id: 3, type: "tall", slug: "unison", imageUrl: "/assets/demo/unison.png" },
  { id: 4, type: "square", slug: "tarn-knowledge", imageUrl: "/assets/demo/tarn-knowledge.png" },
  { id: 5, type: "wide", slug: "project-alpha", imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80" },
  { id: 6, type: "square", slug: "quantum-ui", imageUrl: "https://images.unsplash.com/photo-1607434472257-d9f8e57a8986?auto=format&fit=crop&w=800&q=80" },
  { id: 7, type: "tall", slug: "unison", imageUrl: "/assets/demo/unison.png" },
  { id: 8, type: "large", slug: "tarn-knowledge", imageUrl: "/assets/demo/tarn-knowledge.png" },
  { id: 9, type: "square", slug: "project-alpha", imageUrl: "https://cdn.dribbble.com/userupload/17222412/file/original-8b8daa820866cb392ed6df7fffaa557f.png?resize=1024x768&vertical=center" },
  { id: 10, type: "wide", slug: "quantum-ui", imageUrl: "https://cdn.dribbble.com/userupload/17236060/file/original-5d0a83110e3f699f3e51d3ca06f3dbda.png?resize=1024x768&vertical=center" },
  { id: 11, type: "square", slug: "unison", imageUrl: "/assets/demo/unison.png" },
  { id: 12, type: "tall", slug: "tarn-knowledge", imageUrl: "/assets/demo/tarn-knowledge.png" },
  { id: 13, type: "square", slug: "project-alpha", imageUrl: "https://cdn.dribbble.com/userupload/16600204/file/original-e851cdc107c9bd7d0335b452942f16d5.png?resize=1024x768&vertical=center" },
  { id: 14, type: "wide", slug: "quantum-ui", imageUrl: "https://cdn.dribbble.com/userupload/36942394/file/original-8d149543fd37264940ab3826fd3fbcdd.png?resize=1600x1200&vertical=center" },
  { id: 15, type: "square", slug: "unison", imageUrl: "/assets/demo/unison.png" },
  { id: 16, type: "square", slug: "tarn-knowledge", imageUrl: "/assets/demo/tarn-knowledge.png" },
];

export function WorksBentoGrid() {
  return (
    <div className="w-full">
      {/* Edge-to-edge grid with small gaps. Dense packing allows images to fill holes perfectly. */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 auto-rows-[160px] md:auto-rows-[240px] gap-2 md:gap-4 lg:gap-6 grid-flow-dense px-2 sm:px-4 md:px-6 w-full">
        {BENTO_ITEMS.map((item, index) => {
          let spanClasses = "col-span-1 row-span-1";
          if (item.type === "large") spanClasses = "sm:col-span-2 sm:row-span-2 col-span-2 row-span-2";
          else if (item.type === "tall") spanClasses = "col-span-1 md:row-span-2 row-span-2";
          else if (item.type === "wide") spanClasses = "sm:col-span-2 col-span-2 row-span-1";

          return (
            <Link key={item.id} href={`/work/${item.slug}`} className={spanClasses}>
              <motion.div 
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: (index % 6) * 0.1 }}
                className={cn(
                   "relative w-full h-full rounded-2xl md:rounded-3xl overflow-hidden bg-white/[0.02] border border-white/5 group cursor-pointer"
                )}
              >
                 <Image
                   src={item.imageUrl}
                   alt={`Work excerpt ${item.id}`}
                   fill
                   sizes="(min-width: 1280px) 16vw, (min-width: 768px) 25vw, 50vw"
                   className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                 />
                 <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
              </motion.div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
