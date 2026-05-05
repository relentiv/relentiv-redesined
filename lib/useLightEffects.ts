"use client";

import { useEffect, useState } from "react";

type NavigatorWithDeviceMemory = Navigator & {
  deviceMemory?: number;
};

function bindMediaListener(
  mediaQuery: MediaQueryList,
  listener: () => void,
) {
  if (typeof mediaQuery.addEventListener === "function") {
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }

  mediaQuery.addListener(listener);
  return () => mediaQuery.removeListener(listener);
}

export function useLightEffects() {
  const [lightEffects, setLightEffects] = useState(true);

  useEffect(() => {
    const coarsePointer = window.matchMedia("(pointer: coarse)");
    const narrowViewport = window.matchMedia("(max-width: 1024px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      const nav = navigator as NavigatorWithDeviceMemory;
      const lowMemory =
        typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4;
      const lowCpu =
        typeof navigator.hardwareConcurrency === "number" &&
        navigator.hardwareConcurrency <= 6;

      setLightEffects(
        coarsePointer.matches ||
          narrowViewport.matches ||
          reducedMotion.matches ||
          lowMemory ||
          lowCpu,
      );
    };

    update();

    const unbind = [
      bindMediaListener(coarsePointer, update),
      bindMediaListener(narrowViewport, update),
      bindMediaListener(reducedMotion, update),
    ];

    return () => {
      unbind.forEach((cleanup) => cleanup());
    };
  }, []);

  return lightEffects;
}
