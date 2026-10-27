"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { flushSync } from "react-dom";
import { Moon, Sun } from "./icons";

const noop = () => () => {};

// Shared by the toggle button and the command menu.
export function useThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme();
  // The theme is only known on the client; render a stable placeholder until then.
  const mounted = useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
  const isDark = !mounted || resolvedTheme === "dark";

  // Grows the new theme out of `origin` as a circle where the View Transitions API exists.
  function toggle(origin?: { x: number; y: number }) {
    const next = isDark ? "light" : "dark";
    const root = document.documentElement;
    const apply = () => {
      root.classList.toggle("dark", next === "dark");
      root.style.colorScheme = next;
      setTheme(next);
    };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduce) return apply();

    root.style.setProperty("--vt-x", `${origin?.x ?? window.innerWidth / 2}px`);
    root.style.setProperty("--vt-y", `${origin?.y ?? 0}px`);
    document.startViewTransition(() => flushSync(apply));
  }

  return { isDark, toggle };
}

export function ThemeToggle() {
  const { isDark, toggle } = useThemeSwitch();

  return (
    <button
      type="button"
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        toggle({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
      }}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="inline-flex size-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-card-hover hover:text-fg"
    >
      {isDark ? <Sun /> : <Moon />}
    </button>
  );
}
