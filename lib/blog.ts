import type { PortableTextBlock } from "next-sanity";

function textFromChildren(children: unknown): string {
  if (!Array.isArray(children)) return "";

  return children
    .map((child) => {
      if (
        child &&
        typeof child === "object" &&
        "text" in child &&
        typeof child.text === "string"
      ) {
        return child.text;
      }

      return "";
    })
    .join(" ");
}

export function getPortableTextPlainText(blocks?: PortableTextBlock[]): string {
  if (!Array.isArray(blocks)) return "";

  return blocks
    .map((block) => {
      if (block && typeof block === "object" && "children" in block) {
        return textFromChildren(block.children);
      }

      return "";
    })
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

export function getReadingTime(blocks?: PortableTextBlock[]): number {
  const text = getPortableTextPlainText(blocks);
  const wordCount = text ? text.split(/\s+/).length : 0;

  return Math.max(1, Math.ceil(wordCount / 220));
}

export function formatPostDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}
