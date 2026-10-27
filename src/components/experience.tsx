import { experience } from "@/content";
import { Reveal } from "./reveal";
import { Section, Tags } from "./ui";

export function Experience() {
  return (
    <Section id="experience" index="01" title="Where I've worked">
      <ol className="relative space-y-12 border-l border-line pl-7 sm:pl-9">
        {experience.map((job, i) => (
          <li key={job.company} className="relative">
            <span
              aria-hidden="true"
              className={`absolute top-1.5 -left-[33px] size-[9px] rounded-full ring-4 ring-bg sm:-left-[41px] ${
                job.current ? "bg-accent" : "bg-line-strong"
              }`}
            />
            <Reveal delay={i * 0.06}>
              <p className="font-mono text-xs text-subtle">
                <time>{job.start}</time> — {job.current ? <span className="text-accent">{job.end}</span> : <time>{job.end}</time>}
                <span className="mx-2 text-line-strong">/</span>
                {job.location}
              </p>
              <h3 className="mt-2 text-lg font-medium tracking-tight text-fg">
                {job.role}
                <span className="text-subtle"> · </span>
                {job.company}
              </h3>
              <p className="mt-0.5 text-sm text-subtle">{job.companyNote}</p>
              <ul className="mt-4 max-w-2xl space-y-2 text-[15px] leading-relaxed text-muted">
                {job.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[11px] h-px w-3 shrink-0 bg-line-strong" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <Tags items={job.tags} className="mt-5" />
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
