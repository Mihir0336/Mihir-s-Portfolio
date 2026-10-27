import { skills } from "@/content";
import { Reveal } from "./reveal";
import { Section, Tags } from "./ui";

export function Skills() {
  return (
    <Section id="skills" index="03" title="What I work with">
      <Reveal>
        <dl className="divide-y divide-line border-y border-line">
          {skills.map(({ group, items }) => (
            <div key={group} className="grid gap-3 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
              <dt className="font-mono text-xs uppercase tracking-wider text-subtle sm:pt-1">{group}</dt>
              <dd>
                <Tags items={items} />
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  );
}
