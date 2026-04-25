import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

type BreadcrumbItem = {
  name: string;
  href: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  const allItems = [{ name: "Home", href: "/" }, ...items];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          allItems.map((item) => ({ name: item.name, path: item.href }))
        )}
      />
      <nav
        aria-label="Breadcrumb"
        className={`flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-white/42 ${className}`}
      >
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          return (
            <span key={`${item.href}-${item.name}`} className="inline-flex items-center gap-2">
              {isLast ? (
                <span aria-current="page" className="text-white/62">
                  {item.name}
                </span>
              ) : (
                <Link href={item.href} className="transition-colors hover:text-white/75">
                  {item.name}
                </Link>
              )}
              {!isLast && <ChevronRight size={13} aria-hidden="true" />}
            </span>
          );
        })}
      </nav>
    </>
  );
}

