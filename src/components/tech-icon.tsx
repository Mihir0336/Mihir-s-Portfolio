import {
  siBootstrap,
  siCss,
  siExpress,
  siFivem,
  siFramer,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siJquery,
  siLua,
  siMongodb,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siPhp,
  siPrisma,
  siReact,
  siShadcnui,
  siSvelte,
  siTailwindcss,
  siTypescript,
  siVercel,
  type SimpleIcon,
} from "simple-icons";

// Logos for the names used in content.ts. Anything missing (SQL, REST APIs, NextAuth, ...)
// falls back to a small dot, so new skills never break the page.
const icons: Record<string, SimpleIcon> = {
  JavaScript: siJavascript,
  TypeScript: siTypescript,
  Lua: siLua,
  PHP: siPhp,
  HTML: siHtml5,
  CSS: siCss,
  React: siReact,
  "Next.js": siNextdotjs,
  "Next.js 14": siNextdotjs,
  Svelte: siSvelte,
  "Tailwind CSS": siTailwindcss,
  "shadcn/ui": siShadcnui,
  "Framer Motion": siFramer,
  "Node.js": siNodedotjs,
  Express: siExpress,
  "Prisma ORM": siPrisma,
  MySQL: siMysql,
  MongoDB: siMongodb,
  "FiveM (CitizenFX)": siFivem,
  FiveM: siFivem,
  Git: siGit,
  GitHub: siGithub,
  Vercel: siVercel,
  "jQuery/AJAX": siJquery,
  Bootstrap: siBootstrap,
};

export const hasIcon = (name: string) => name in icons;

export function TechIcon({ name, className = "size-3.5" }: { name: string; className?: string }) {
  const icon = icons[name];
  if (!icon) {
    return (
      <span aria-hidden="true" className={`inline-flex items-center justify-center ${className}`}>
        <span className="size-1.5 rounded-full bg-current opacity-60" />
      </span>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d={icon.path} />
    </svg>
  );
}
