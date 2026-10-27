import { projects } from "@/content";
import { ArrowUpRight, GitHub } from "./icons";
import { ProjectCover } from "./project-cover";
import { Reveal } from "./reveal";
import { Spotlight } from "./spotlight";
import { Em, ExternalLink, Section, Tags } from "./ui";

// Bento layout on a 5-column grid (2 columns on tablets): wide / narrow, then narrow / wide.
const spans = ["lg:col-span-3", "lg:col-span-2", "lg:col-span-2", "lg:col-span-3"];

const linkStyle = "inline-flex items-center gap-1.5 font-mono text-xs transition-colors";

export function Projects() {
  return (
    <Section
      id="projects"
      index="02"
      title={
        <>
          Things I&apos;ve <Em>built</Em>
        </>
      }
    >
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {projects.map((p, i) => (
          <li key={p.title} className={spans[i % spans.length]}>
            <Reveal delay={(i % 2) * 0.06} className="h-full">
              <Spotlight className="group h-full rounded-2xl border border-line bg-card transition-colors duration-200 hover:border-line-strong">
                <article className="flex h-full flex-col">
                  <div className="dots relative h-40 overflow-hidden rounded-t-[15px] border-b border-line bg-bg/40 sm:h-48">
                    <ProjectCover kind={p.cover} />
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <div className="flex items-center justify-between font-mono text-xs text-subtle">
                      <span>{String(i + 1).padStart(2, "0")}</span>
                      {i === 0 && <span className="text-accent">Featured</span>}
                    </div>
                    <h3 className="mt-5 text-lg font-medium tracking-tight text-fg">{p.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.summary}</p>

                    <ul className="mt-5 space-y-1.5 text-sm text-muted">
                      {p.highlights.map((h) => (
                        <li key={h} className="flex gap-2.5">
                          <span
                            aria-hidden="true"
                            className="mt-[9px] size-1 shrink-0 rounded-full bg-accent/70"
                          />
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
                            <ExternalLink
                              href={p.github}
                              className={`${linkStyle} text-muted hover:text-fg`}
                            >
                              <GitHub className="size-3.5" /> GitHub
                              <span className="sr-only">: {p.title} source code</span>
                            </ExternalLink>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              </Spotlight>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
