"use client";

// A surface whose border and background light up around the pointer.
// The glow itself is pure CSS (.spotlight in globals.css); this only feeds it coordinates.
export function Spotlight({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <div onPointerMove={onPointerMove} className={`spotlight ${className}`}>
      {children}
    </div>
  );
}
