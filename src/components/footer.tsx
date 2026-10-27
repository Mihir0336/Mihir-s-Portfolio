import { profile } from "@/content";
import { ArrowUp } from "./icons";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-5 py-8 font-mono text-xs text-subtle sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with Next.js, hosted on Vercel.
        </p>
        <p className="hidden md:block">
          Press{" "}
          <kbd className="rounded border border-line px-1.5 py-0.5 text-[10px] text-muted">
            Ctrl/⌘ K
          </kbd>{" "}
          to get around
        </p>
        <a href="#top" className="inline-flex items-center gap-1.5 hover:text-fg">
          Back to top <ArrowUp className="size-3.5" />
        </a>
      </div>
      {/* Oversized wordmark, cropped by the bottom edge of the page. */}
      <div aria-hidden="true" className="pointer-events-none select-none overflow-hidden">
        <p className="mx-auto -mb-[0.22em] max-w-5xl bg-linear-to-b from-line-strong to-transparent bg-clip-text px-5 text-[clamp(3.5rem,19vw,13rem)] font-semibold leading-none tracking-[-0.06em] text-transparent sm:px-8">
          {profile.name}
        </p>
      </div>
    </footer>
  );
}
