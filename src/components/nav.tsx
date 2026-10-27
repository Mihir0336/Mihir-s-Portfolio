"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, useSyncExternalStore } from "react";
import { nav, profile } from "@/content";
import { Close, Command, Menu } from "./icons";
import { ThemeToggle } from "./theme-toggle";

// The palette is only downloaded the first time someone opens it.
const CommandMenu = dynamic(() => import("./command-menu"), { ssr: false });

const noop = () => () => {};
const isMac = () => /Mac|iPhone|iPad/.test(navigator.platform);

export function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [palette, setPalette] = useState({ loaded: false, open: false });
  const mac = useSyncExternalStore(noop, isMac, () => false);

  // Highlight the last section whose top has passed 40% of the viewport. Computed from
  // positions on every scroll frame, so jumping straight to the top clears it too.
  useEffect(() => {
    const sections = nav
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    let frame = 0;

    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.4;
      let current: string | null = null;
      for (const el of sections) if (el.getBoundingClientRect().top <= line) current = el.id;
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom && sections.length) current = sections[sections.length - 1].id;
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Cmd/Ctrl + K toggles the command menu from anywhere. Its code is fetched once the page is
  // idle, so the first open doesn't drop keystrokes typed while it loads.
  useEffect(() => {
    const prefetch = () => void import("./command-menu");
    if ("requestIdleCallback" in window) requestIdleCallback(prefetch);
    else setTimeout(prefetch, 2000);

    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalette((p) => ({ loaded: true, open: !p.open }));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/80 backdrop-blur-md supports-[backdrop-filter]:bg-bg/65">
      <nav
        aria-label="Main"
        className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5 sm:px-8"
      >
        <a
          href="#top"
          className="group inline-flex items-center gap-2 font-mono text-sm font-medium tracking-tight text-fg"
          onClick={() => setOpen(false)}
        >
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full bg-accent transition-transform group-hover:scale-150"
          />
          {profile.name.toLowerCase().replace(" ", ".")}
        </a>

        <div className="flex items-center gap-1">
          <ul className="hidden items-center gap-0.5 md:flex">
            {nav.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active === id ? "true" : undefined}
                  className="relative rounded-md px-2.5 py-1.5 text-sm text-subtle transition-colors hover:text-fg aria-[current]:text-fg"
                >
                  {label}
                  {active === id && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-2.5 -bottom-[13px] h-px bg-accent"
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => setPalette({ loaded: true, open: true })}
            aria-keyshortcuts={mac ? "Meta+K" : "Control+K"}
            className="ml-1 hidden h-8 items-center gap-1 rounded-md border border-line px-2 font-mono text-[11px] text-subtle transition-colors hover:border-line-strong hover:text-fg sm:inline-flex"
          >
            {mac ? <Command className="size-3" /> : "Ctrl"} K
            <span className="sr-only"> command menu</span>
          </button>
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-lg text-muted hover:bg-card-hover hover:text-fg md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </nav>
      <div
        aria-hidden="true"
        className="scroll-progress absolute inset-x-0 -bottom-px h-px bg-accent"
      />

      {open && (
        <ul
          id="mobile-menu"
          className="absolute inset-x-0 top-full border-b border-line bg-bg px-5 pb-3 pt-1 shadow-2xl shadow-black/20 md:hidden"
        >
          {nav.map(({ id, label }) => (
            <li key={id} className="border-b border-line last:border-0">
              <a
                href={`#${id}`}
                onClick={() => setOpen(false)}
                aria-current={active === id ? "true" : undefined}
                className="flex h-11 items-center justify-between text-[15px] text-muted hover:text-fg aria-[current]:text-fg"
              >
                {label}
                {active === id && (
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
                )}
              </a>
            </li>
          ))}
        </ul>
      )}

      {palette.loaded && (
        <CommandMenu
          open={palette.open}
          onClose={() => setPalette((p) => ({ ...p, open: false }))}
        />
      )}
    </header>
  );
}
