import { experience, profile, site } from "@/content";
import { ArrowDown, GitHub, LinkedIn, Mail } from "./icons";
import { buttonStyles, ExternalLink } from "./ui";

const rise = (i: number) => ({ animationDelay: `${i * 70}ms` });

export function Hero() {
  const current = experience.filter((e) => e.current).map((e) => e.company);

  return (
    <section id="top" aria-label="Introduction" className="pb-16 pt-20 sm:pb-24 sm:pt-32">
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
        className="mt-6 animate-slide text-5xl font-semibold tracking-[-0.04em] text-fg sm:text-7xl"
        style={rise(1)}
      >
        {profile.name}
      </h1>
      <p
        className="mt-3 animate-slide text-xl tracking-tight text-subtle sm:text-2xl"
        style={rise(2)}
      >
        {profile.role}
      </p>
      <p
        className="mt-6 max-w-xl animate-slide text-base leading-relaxed text-muted sm:text-lg"
        style={rise(3)}
      >
        {profile.pitch}
      </p>

      <div className="mt-9 flex animate-rise flex-wrap gap-2.5" style={rise(4)}>
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

      <dl
        className="mt-16 grid animate-rise grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:mt-20 sm:grid-cols-3"
        style={rise(5)}
      >
        {[
          ["Experience", "1+ year, paid & remote"],
          ["Currently at", current.join(" · ")],
          ["Based in", `${profile.locationShort} · IST`],
        ].map(([k, v]) => (
          <div key={k} className="bg-bg px-5 py-4">
            <dt className="font-mono text-[11px] uppercase tracking-wider text-subtle">{k}</dt>
            <dd className="mt-1.5 text-sm text-fg">{v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
