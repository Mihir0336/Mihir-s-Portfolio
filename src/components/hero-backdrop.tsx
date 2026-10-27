"use client";

import { useEffect, useRef } from "react";

// The faint grid behind the hero, plus a second accent-coloured grid that only shows in a
// circle around the pointer (.hero-backdrop::after in globals.css). Mouse/trackpad only.
export function HeroBackdrop() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let frame = 0;
    let x = 0;
    let y = 0;

    const paint = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--hx", `${x - r.left}px`);
      el.style.setProperty("--hy", `${y - r.top}px`);
    };
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="hero-backdrop pointer-events-none absolute inset-x-0 top-0 -z-10 h-[48rem]"
    />
  );
}
