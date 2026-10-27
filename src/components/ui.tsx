import { Reveal } from "./reveal";

export function Section({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: string;
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-20 py-20 sm:py-28">
      <Reveal>
        <p className="font-mono text-xs tracking-wide text-subtle">
          <span className="text-accent">{index}</span> / {id}
        </p>
        <h2
          id={`${id}-title`}
          className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.035em] text-fg sm:text-[2.6rem]"
        >
          {title}
        </h2>
      </Reveal>
      <div className="mt-10 sm:mt-12">{children}</div>
    </section>
  );
}

// Serif italic accent word inside a heading.
export function Em({ children }: { children: React.ReactNode }) {
  return (
    <em className="pr-[0.05em] font-serif text-[1.12em] font-normal italic leading-none tracking-normal">
      {children}
    </em>
  );
}

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <li className="rounded-md border border-line px-2 py-0.5 font-mono text-[11px] leading-5 text-muted">
      {children}
    </li>
  );
}

export function Tags({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`} aria-label="Technologies">
      {items.map((t) => (
        <Tag key={t}>{t}</Tag>
      ))}
    </ul>
  );
}

const base =
  "inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium transition-colors duration-150";

export const buttonStyles = {
  primary: `${base} bg-btn text-btn-fg hover:bg-btn-hover`,
  secondary: `${base} border border-line-strong text-fg hover:border-subtle hover:bg-card-hover`,
};

export function ExternalLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}
