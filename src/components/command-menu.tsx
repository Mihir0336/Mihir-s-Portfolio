"use client";

import { useEffect, useRef, useState } from "react";
import { nav, profile, projects, site } from "@/content";
import {
  ArrowDown,
  ArrowUpRight,
  Copy,
  GitHub,
  Hash,
  LinkedIn,
  Mail,
  Moon,
  Search,
  Sun,
} from "./icons";
import { useThemeSwitch } from "./theme-toggle";

type Item = {
  id: string;
  group: "Go to" | "Actions" | "Links";
  label: string;
  icon: React.ReactNode;
  keywords?: string;
  // Runs with the menu still open (it closes itself), instead of after it closes.
  keepOpen?: boolean;
  run: () => void;
};

function scrollToSection(id: string) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  history.replaceState(null, "", `#${id}`);
}

function open(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

// Loaded lazily by <Nav> the first time the menu is opened.
export default function CommandMenu({
  open: isOpen,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const { isDark, toggle } = useThemeSwitch();

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (isOpen && !d.open) d.showModal();
    if (!isOpen && d.open) d.close();
  }, [isOpen]);

  const items: Item[] = [
    ...nav.map(({ id, label }) => ({
      id: `go-${id}`,
      group: "Go to" as const,
      label,
      icon: <Hash />,
      run: () => scrollToSection(id),
    })),
    {
      id: "resume",
      group: "Actions",
      label: "Download resume",
      icon: <ArrowDown />,
      run: () => {
        const a = document.createElement("a");
        a.href = site.resume;
        a.download = "";
        a.click();
      },
    },
    {
      id: "copy-email",
      group: "Actions",
      label: copied ? "Copied to clipboard" : "Copy email address",
      icon: <Copy />,
      run: () => {
        navigator.clipboard.writeText(profile.email).then(() => {
          setCopied(true);
          setTimeout(onClose, 650);
        });
      },
      keepOpen: true,
    },
    {
      id: "email",
      group: "Actions",
      label: "Send an email",
      icon: <Mail />,
      run: () => window.location.assign(`mailto:${profile.email}`),
    },
    {
      id: "theme",
      group: "Actions",
      label: isDark ? "Switch to light theme" : "Switch to dark theme",
      icon: isDark ? <Sun /> : <Moon />,
      run: () => toggle(),
    },
    {
      id: "github",
      group: "Links",
      label: "GitHub",
      icon: <GitHub />,
      run: () => open(profile.github),
    },
    {
      id: "linkedin",
      group: "Links",
      label: "LinkedIn",
      icon: <LinkedIn />,
      run: () => open(profile.linkedin),
    },
    ...projects.flatMap((p) => [
      ...(p.live
        ? [
            {
              id: `live-${p.title}`,
              group: "Links" as const,
              label: `${p.title}: live demo`,
              keywords: "project demo",
              icon: <ArrowUpRight />,
              run: () => open(p.live!),
            },
          ]
        : []),
      ...(p.github
        ? [
            {
              id: `src-${p.title}`,
              group: "Links" as const,
              label: `${p.title}: source`,
              keywords: "project code repo",
              icon: <GitHub />,
              run: () => open(p.github!),
            },
          ]
        : []),
    ]),
  ];

  const q = query.trim().toLowerCase();
  const results = q
    ? items.filter((i) => `${i.group} ${i.label} ${i.keywords ?? ""}`.toLowerCase().includes(q))
    : items;
  const current = Math.min(index, Math.max(results.length - 1, 0));

  function choose(item: Item | undefined) {
    if (!item) return;
    if (item.keepOpen) return item.run();
    // Close first (through the parent's state; the effect above closes the <dialog>), then
    // run, so restoring focus after the modal closes can't cancel a smooth scroll.
    onClose();
    setTimeout(item.run, 0);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const step = e.key === "ArrowDown" ? 1 : -1;
      setIndex((current + step + results.length) % results.length);
      document
        .getElementById(`cmd-${results[(current + step + results.length) % results.length]?.id}`)
        ?.scrollIntoView({ block: "nearest" });
    } else if (e.key === "Enter") {
      e.preventDefault();
      choose(results[current]);
    }
  }

  let lastGroup = "";

  return (
    <dialog
      ref={dialog}
      aria-label="Command menu"
      onClose={() => {
        setQuery("");
        setIndex(0);
        setCopied(false);
        onClose();
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="mx-auto mt-[12vh] w-[min(34rem,calc(100vw-2rem))] animate-pop overflow-hidden rounded-2xl border border-line-strong bg-card p-0 text-fg shadow-2xl shadow-black/40 backdrop:bg-black/55 backdrop:backdrop-blur-[2px]"
    >
      <div className="flex items-center gap-3 border-b border-line px-4">
        <Search className="shrink-0 text-subtle" />
        <input
          autoFocus
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIndex(0);
          }}
          onKeyDown={onKeyDown}
          placeholder="Type a command or search…"
          role="combobox"
          aria-expanded="true"
          aria-controls="cmd-list"
          aria-activedescendant={results[current] ? `cmd-${results[current].id}` : undefined}
          className="h-13 w-full bg-transparent focus-visible:outline-none text-[15px] text-fg placeholder:text-subtle focus:outline-none"
        />
        <kbd className="shrink-0 rounded border border-line px-1.5 font-mono text-[10px] text-subtle">
          esc
        </kbd>
      </div>

      <ul
        id="cmd-list"
        role="listbox"
        aria-label="Commands"
        className="no-scrollbar max-h-[min(24rem,55vh)] overflow-y-auto p-2"
      >
        {results.length === 0 && (
          <li className="px-3 py-8 text-center text-sm text-subtle">No results.</li>
        )}
        {results.map((item, i) => {
          const header = item.group !== lastGroup;
          lastGroup = item.group;
          return (
            <li key={item.id} role="presentation">
              {header && (
                <p
                  role="presentation"
                  className="px-3 pb-1.5 pt-3 font-mono text-[10px] uppercase tracking-wider text-subtle first:pt-1"
                >
                  {item.group}
                </p>
              )}
              <div
                id={`cmd-${item.id}`}
                role="option"
                aria-selected={i === current}
                onMouseMove={() => i !== current && setIndex(i)}
                onClick={() => choose(item)}
                className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted aria-selected:bg-card-hover aria-selected:text-fg [&_svg]:shrink-0 [&_svg]:text-subtle aria-selected:[&_svg]:text-accent"
              >
                {item.icon}
                <span className="truncate">{item.label}</span>
                {i === current && (
                  <kbd aria-hidden="true" className="ml-auto font-mono text-[10px] text-subtle">
                    ↵
                  </kbd>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </dialog>
  );
}
