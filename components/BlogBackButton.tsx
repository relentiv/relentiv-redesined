"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function BlogBackButton() {
  const router = useRouter();

  function goBack() {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push("/blog");
  }

  return (
    <button
      type="button"
      onClick={goBack}
      className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white/65 backdrop-blur-md transition-colors hover:border-white/25 hover:text-white"
      aria-label="Go back"
    >
      <ArrowLeft size={16} aria-hidden="true" />
      Back
    </button>
  );
}
