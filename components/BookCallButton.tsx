"use client";

import { getCalApi } from "@calcom/embed-react";

type BookCallButtonProps = {
  children: React.ReactNode;
  className?: string;
};

async function openCalPopup() {
  const cal = await getCalApi();
  cal("modal", {
    calLink: "relentiv/30min",
  });
}

export function BookCallButton({ children, className }: BookCallButtonProps) {
  return (
    <button onClick={openCalPopup} className={className}>
      {children}
    </button>
  );
}
