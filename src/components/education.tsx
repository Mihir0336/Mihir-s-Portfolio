import { education } from "@/content";
import { Reveal } from "./reveal";
import { Section } from "./ui";

export function Education() {
  return (
    <Section id="education" index="04" title="Education">
      <Reveal>
        <ul className="divide-y divide-line border-y border-line">
          {education.map((e) => (
            <li
              key={e.degree}
              className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
            >
              <div>
                <h3 className="font-medium tracking-tight text-fg">{e.degree}</h3>
                <p className="mt-1 text-sm text-muted">
                  {e.school}, {e.location}
                </p>
              </div>
              <p className="order-first font-mono text-xs text-subtle sm:order-none sm:shrink-0">
                {e.years}
              </p>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
