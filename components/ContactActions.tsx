"use client";

import { getCalApi } from "@calcom/embed-react";
import { ArrowUpRight } from "lucide-react";

async function openCalPopup() {
  const cal = await getCalApi();
  cal("modal", {
    calLink: "relentiv/30min",
  });
}

type ContactActionsProps = {
  email: string;
};

export function ContactActions({ email }: ContactActionsProps) {
  return (
    <div className="mt-10 flex flex-wrap gap-3">
      <button
        onClick={openCalPopup}
        className="inline-flex items-center justify-center rounded-full border-2 border-dotted border-white/40 px-5 py-3 font-mono text-sm uppercase tracking-[0.2em] text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
      >
        Start a Project / Book a Call
      </button>
      <a
        href={`mailto:${email}?subject=Project%20Inquiry%20for%20Relentiv`}
        className="inline-flex items-center gap-2 rounded-full border border-white/12 px-5 py-3 text-sm font-medium text-white/72 transition-colors hover:border-white/30 hover:text-white"
      >
        Email Us
        <ArrowUpRight size={16} aria-hidden="true" />
      </a>
    </div>
  );
}
