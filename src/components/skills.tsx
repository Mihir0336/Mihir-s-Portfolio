import { skills } from "@/content";
import { Reveal } from "./reveal";
import { Spotlight } from "./spotlight";
import { TechIcon } from "./tech-icon";
import { Em, Section } from "./ui";

export function Skills() {
  return (
    <Section
      id="skills"
      index="03"
      title={
        <>
          What I <Em>work with</Em>
        </>
      }
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map(({ group, items }, i) => (
          <li key={group}>
            <Reveal delay={(i % 3) * 0.05} className="h-full">
              <Spotlight className="h-full rounded-2xl border border-line bg-card/60 p-6 transition-colors hover:border-line-strong">
                <div className="flex items-baseline justify-between font-mono text-xs">
                  <h3 className="uppercase tracking-wider text-subtle">{group}</h3>
                  <span className="text-line-strong">{String(items.length).padStart(2, "0")}</span>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${group} skills`}>
                  {items.map((item) => (
                    <li
                      key={item}
                      className="group/chip inline-flex items-center gap-2 rounded-lg border border-line bg-bg/60 px-2.5 py-1.5 text-[13px] text-muted transition-colors hover:border-line-strong hover:text-fg"
                    >
                      <TechIcon
                        name={item}
                        className="size-3.5 text-subtle transition-colors group-hover/chip:text-accent"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </Spotlight>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
