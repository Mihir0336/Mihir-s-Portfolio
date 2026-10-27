import { experience, profile, site } from "@/content";
import { ArrowDown, GitHub, LinkedIn, Mail } from "./icons";
import { LocalTime } from "./local-time";
import { Marquee } from "./marquee";
import { Spotlight } from "./spotlight";
import { buttonStyles, ExternalLink } from "./ui";

const rise = (i: number) => ({ animationDelay: `${i * 70}ms` });

function Pitch() {
  const [before, after] = profile.pitch.split(profile.pitchHighlight);
  return (
    <>
      {before}
      <span className="text-fg underline decoration-accent/60 decoration-2 underline-offset-[5px]">
        {profile.pitchHighlight}
      </span>
      {after}
    </>
  );
}

function StatusPanel() {
  const current = experience.filter((e) => e.current);

  const rows: [string, React.ReactNode][] = [
    [
      "Shipping for",
      <ul key="c" className="space-y-1">
        {current.map((e) => (
          <li key={e.company} className="flex items-baseline justify-between gap-3">
            {e.company}
            <span className="font-mono text-[10px] text-subtle">{e.region}</span>
          </li>
        ))}
      </ul>,
    ],
    ["Experience", "1+ year · paid · remote"],
    [
      "Local time",
      <span key="t">
        <LocalTime /> <span className="text-subtle">IST</span>
      </span>,
    ],
    ["Core stack", "Next.js · React · TypeScript · Lua"],
  ];

  return (
    <Spotlight className="rounded-2xl border border-line bg-card/80 backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-line px-4 py-3 font-mono text-[11px] text-subtle">
        <span>~/status</span>
        <span className="inline-flex items-center gap-2 text-accent">
          <span className="relative flex size-1.5" aria-hidden="true">
            <span className="absolute inline-flex size-full rounded-full bg-accent opacity-70 motion-safe:animate-ping" />
            <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
          </span>
          Available
        </span>
      </div>
      <dl className="divide-y divide-line">
        {rows.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[5.75rem_1fr] gap-3 px-4 py-3.5 text-sm">
            <dt className="pt-px font-mono text-[11px] uppercase tracking-wider text-subtle">
              {k}
            </dt>
            <dd className="text-fg">{v}</dd>
          </div>
        ))}
      </dl>
    </Spotlight>
  );
}

export function Hero() {
  return (
    <section id="top" aria-label="Introduction" className="pb-4 pt-14 sm:pb-8 sm:pt-24">
      <p
        className="flex animate-rise items-center gap-2.5 font-mono text-xs text-subtle"
        style={rise(0)}
      >
        <span className="relative flex size-2" aria-hidden="true">
          <span className="absolute inline-flex size-full rounded-full bg-accent opacity-60 motion-safe:animate-ping" />
          <span className="relative inline-flex size-2 rounded-full bg-accent" />
        </span>
        Open to full-time roles · {profile.locationShort}
      </p>

      <h1
        className="mt-5 animate-slide text-[clamp(3.4rem,12.5vw,7.75rem)] font-semibold leading-[0.88] tracking-[-0.055em] text-fg"
        style={rise(1)}
      >
        {profile.name}
        <span className="text-accent">.</span>
      </h1>

      <div className="mt-10 grid items-start gap-12 sm:mt-14 lg:grid-cols-[minmax(0,1fr)_21.75rem] lg:gap-16">
        <div>
          <p
            className="animate-slide text-2xl font-medium tracking-[-0.02em] text-fg sm:text-3xl"
            style={rise(2)}
          >
            {profile.role}
          </p>
          <p
            className="mt-4 max-w-xl animate-slide text-lg leading-relaxed text-muted sm:text-xl sm:leading-relaxed"
            style={rise(2)}
          >
            <Pitch />
          </p>

          <div className="mt-9 flex animate-rise flex-wrap gap-2.5" style={rise(3)}>
            <a href={site.resume} download className={buttonStyles.primary}>
              Download Resume <ArrowDown />
            </a>
            <ExternalLink href={profile.github} className={buttonStyles.secondary}>
              <GitHub /> GitHub
            </ExternalLink>
            <ExternalLink href={profile.linkedin} className={buttonStyles.secondary}>
              <LinkedIn /> LinkedIn
            </ExternalLink>
            <a href="#contact" className={buttonStyles.secondary}>
              <Mail /> Contact
            </a>
          </div>
        </div>

        <div className="animate-rise" style={rise(4)}>
          <StatusPanel />
        </div>
      </div>

      <div className="mt-20 animate-rise sm:mt-24" style={rise(5)}>
        <p className="mb-5 font-mono text-[11px] uppercase tracking-wider text-subtle">
          Tools I ship with
        </p>
        <Marquee />
      </div>
    </section>
  );
}
