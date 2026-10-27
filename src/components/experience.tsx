import { experience } from "@/content";
import { NuiFlow } from "./nui-flow";
import { Reveal } from "./reveal";
import { Spotlight } from "./spotlight";
import { Em, Section, Tags } from "./ui";

// "Legacy Network" -> "LN"
const monogram = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export function Experience() {
  return (
    <Section
      id="experience"
      index="01"
      title={
        <>
          Where I&apos;ve <Em>worked</Em>
        </>
      }
    >
      <ol className="relative space-y-6 border-l border-line pl-7 sm:pl-9">
        {experience.map((job, i) => (
          <li key={job.company} className="relative">
            {/* Dot lines up with the date line on phones and the monogram tile from sm up. */}
            <span
              aria-hidden="true"
              className={`absolute top-[28px] -left-[33px] flex size-[9px] sm:top-[45px] sm:-left-[41px]`}
            >
              {job.current && (
                <span className="absolute inline-flex size-full rounded-full bg-accent opacity-60 motion-safe:animate-ping" />
              )}
              <span
                className={`relative size-[9px] rounded-full ring-4 ring-bg ${
                  job.current ? "bg-accent" : "bg-line-strong"
                }`}
              />
            </span>
            <Reveal delay={i * 0.06}>
              <Spotlight className="rounded-2xl border border-line bg-card/60 p-6 transition-colors hover:border-line-strong sm:p-7">
                <div className="flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="hidden size-11 shrink-0 items-center justify-center rounded-xl sm:flex border border-line-strong bg-bg font-mono text-[13px] font-medium text-accent"
                  >
                    {monogram(job.company)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-xs text-subtle">
                      <time>{job.start}</time> —{" "}
                      {job.current ? (
                        <span className="text-accent">{job.end}</span>
                      ) : (
                        <time>{job.end}</time>
                      )}
                      <span className="mx-2 text-line-strong">/</span>
                      {job.location}
                    </p>
                    <h3 className="mt-1.5 text-lg font-medium tracking-tight text-fg">
                      {job.role}
                      <span className="text-subtle"> · </span>
                      {job.company}
                    </h3>
                    <p className="mt-0.5 text-sm text-subtle">{job.companyNote}</p>
                  </div>
                  <span className="hidden shrink-0 rounded-md border border-line px-2 py-0.5 font-mono text-[11px] text-muted sm:inline">
                    {job.region}
                  </span>
                </div>
                <ul className="mt-5 space-y-2 text-[15px] leading-relaxed text-muted sm:pl-15">
                  {job.points.map((p) => (
                    <li key={p} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-[11px] h-px w-3 shrink-0 bg-line-strong"
                      />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <Tags items={job.tags} className="mt-5 sm:pl-15" />
              </Spotlight>
            </Reveal>
          </li>
        ))}
      </ol>

      <Reveal className="mt-16 sm:mt-20">
        <NuiFlow />
      </Reveal>
    </Section>
  );
}
