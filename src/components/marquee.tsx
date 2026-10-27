import { skills } from "@/content";
import { hasIcon, TechIcon } from "./tech-icon";

// Every skill that has a logo, scrolling slowly. The list is rendered twice and shifted by
// half its width, so the loop is seamless; the copy is hidden from screen readers.
const tools = skills.flatMap((s) => s.items).filter(hasIcon);

export function Marquee() {
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
      <ul
        aria-label="Tools I ship with"
        className="flex w-max animate-marquee hover:[animation-play-state:paused]"
      >
        {[...tools, ...tools].map((name, i) => (
          <li
            key={`${name}-${i}`}
            aria-hidden={i >= tools.length ? true : undefined}
            className="group flex shrink-0 items-center gap-2.5 pr-10 text-sm text-muted"
          >
            <TechIcon
              name={name}
              className="size-[18px] text-subtle transition-colors group-hover:text-accent"
            />
            {name.replace(" (CitizenFX)", "")}
          </li>
        ))}
      </ul>
    </div>
  );
}
