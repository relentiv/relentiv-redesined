"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const BENTO_ITEMS = [
  { id: 1, type: "square", imageUrl: "https://cdn.dribbble.com/userupload/47442143/file/3052fd6607f1805a67087036acd2ec18.png?resize=1024x768&vertical=center" },
  { id: 2, type: "large", imageUrl: "https://cdn.dribbble.com/userupload/47442801/file/1a4fe2e2b8d2c27c4869f0c8ce98a934.webp?resize=1024x770&vertical=center" },
  { id: 3, type: "tall", imageUrl: "https://i.postimg.cc/hPQVPWvv/3.png" },
  { id: 4, type: "square", imageUrl: "https://i.postimg.cc/8zyp24N1/Final-CTA-Section.png" },
  { id: 5, type: "wide", imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80" },
  { id: 6, type: "square", imageUrl: "https://images.unsplash.com/photo-1607434472257-d9f8e57a8986?auto=format&fit=crop&w=800&q=80" },
  { id: 7, type: "tall", imageUrl: "https://cdn.dribbble.com/userupload/16568427/file/original-f2ed5b1564421f2930ee4877c298d3f6.jpg?resize=1024x768&vertical=center" },
  { id: 8, type: "large", imageUrl: "https://cdn.dribbble.com/userupload/7567174/file/original-2af753d2c554ef60cf1047eed8ca1c0c.png?resize=1024x768&vertical=center" },
  { id: 9, type: "square", imageUrl: "https://cdn.dribbble.com/userupload/17222412/file/original-8b8daa820866cb392ed6df7fffaa557f.png?resize=1024x768&vertical=center" },
  { id: 10, type: "wide", imageUrl: "https://cdn.dribbble.com/userupload/17236060/file/original-5d0a83110e3f699f3e51d3ca06f3dbda.png?resize=1024x768&vertical=center" },
  { id: 11, type: "square", imageUrl: "https://cdn.dribbble.com/userupload/2590782/file/original-c1b31ee9106b698c873ab2c858834e11.png?resize=1024x769&vertical=center" },
  { id: 12, type: "tall", imageUrl: "https://cdn.dribbble.com/userupload/16094230/file/original-f3f87f35841c4f80fd3f2946b43a01d6.jpg?resize=1024x768&vertical=center" },
  { id: 13, type: "square", imageUrl: "https://cdn.dribbble.com/userupload/16600204/file/original-e851cdc107c9bd7d0335b452942f16d5.png?resize=1024x768&vertical=center" },
  { id: 14, type: "wide", imageUrl: "https://cdn.dribbble.com/userupload/36942394/file/original-8d149543fd37264940ab3826fd3fbcdd.png?resize=1600x1200&vertical=center" },
  { id: 15, type: "square", imageUrl: "https://cdn.dribbble.com/userupload/16806710/file/original-77db822c281405f0ad0f5d495a099162.png?resize=1024x768&vertical=center" },
  { id: 16, type: "square", imageUrl: "https://cdn.dribbble.com/userupload/12436166/file/original-12e6b68c30c05f2fa3478b648e182b78.png?resize=1024x768&vertical=center" },
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
            <motion.div 
              key={item.id} 
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: (index % 6) * 0.1 }}
              className={cn(
                 "relative rounded-2xl md:rounded-3xl overflow-hidden bg-white/[0.02] border border-white/5 group cursor-pointer",
                 spanClasses
              )}
            >
               {/* eslint-disable-next-line @next/next/no-img-element */}
               <img 
                 src={item.imageUrl} 
                 alt={`Work excerpt ${item.id}`}
                 loading="lazy"
                 className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
               />
               <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
