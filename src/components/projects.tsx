import { projects } from "@/content";
import { ArrowUpRight, GitHub } from "./icons";
import { Reveal } from "./reveal";
import { ExternalLink, Section, Tags } from "./ui";

// Bento layout on a 5-column grid: wide / narrow, then narrow / wide.
const spans = ["sm:col-span-3", "sm:col-span-2", "sm:col-span-2", "sm:col-span-3"];

const linkStyle =
  "inline-flex items-center gap-1.5 font-mono text-xs transition-colors";

export function Projects() {
  return (
    <Section id="projects" index="02" title="Things I've built">
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-5">
        {projects.map((p, i) => (
          <li key={p.title} className={spans[i % spans.length]}>
            <Reveal delay={(i % 2) * 0.06} className="h-full">
              <article className="group flex h-full flex-col rounded-2xl border border-line bg-card p-6 transition-[border-color,background-color,transform] duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:bg-card-hover sm:p-7">
                <div className="flex items-center justify-between font-mono text-xs text-subtle">
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {i === 0 && <span className="text-accent">Featured</span>}
                </div>
                <h3 className="mt-5 text-lg font-medium tracking-tight text-fg">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.summary}</p>

                <ul
                  className={`mt-5 grid gap-x-6 gap-y-1.5 text-sm text-muted ${
                    spans[i % spans.length] === "sm:col-span-3" ? "sm:grid-cols-2" : ""
                  }`}
                >
                  {p.highlights.map((h) => (
                    <li key={h} className="flex gap-2.5">
                      <span aria-hidden="true" className="mt-[9px] size-1 shrink-0 rounded-full bg-accent/70" />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-7">
                  <Tags items={p.tags} />
                  {(p.live || p.github) && (
                    <div className="mt-5 flex items-center gap-5 border-t border-line pt-4">
                      {p.live && (
                        <ExternalLink
                          href={p.live}
                          className={`${linkStyle} text-accent hover:underline hover:underline-offset-4`}
                        >
                          Live <ArrowUpRight className="size-3.5" />
                          <span className="sr-only">: {p.title}</span>
                        </ExternalLink>
                      )}
                      {p.github && (
                        <ExternalLink href={p.github} className={`${linkStyle} text-muted hover:text-fg`}>
                          <GitHub className="size-3.5" /> GitHub
                          <span className="sr-only">: {p.title} source code</span>
                        </ExternalLink>
                      )}
                    </div>
                  )}
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
