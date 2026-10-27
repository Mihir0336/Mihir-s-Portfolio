import { profile } from "@/content";
import { ContactForm } from "./contact-form";
import { CopyEmail } from "./copy-email";
import { ArrowUpRight, GitHub, LinkedIn, MapPin, Phone } from "./icons";
import { Reveal } from "./reveal";
import { Em, Section } from "./ui";

const links = [
  { href: profile.phoneHref, label: profile.phone, icon: <Phone />, external: false },
  {
    href: profile.github,
    label: profile.github.replace("https://", ""),
    icon: <GitHub />,
    external: true,
  },
  {
    href: profile.linkedin,
    label: profile.linkedin.replace("https://www.", ""),
    icon: <LinkedIn />,
    external: true,
  },
];

export function Contact() {
  return (
    <Section
      id="contact"
      index="05"
      title={
        <>
          Let&apos;s <Em>talk</Em>
        </>
      }
    >
      <Reveal>
        <div className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-16 -z-10 mx-auto h-56 max-w-2xl rounded-full bg-accent/10 blur-3xl"
          />
          <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            I&apos;m looking for a full-time full stack role. Email is the fastest way to reach me,
            or use the form below.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3">
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex min-w-0 items-center gap-3 text-[clamp(1.25rem,5.4vw,3.4rem)] font-semibold leading-tight tracking-[-0.04em] text-fg"
            >
              <span className="bg-[linear-gradient(var(--accent),var(--accent))] bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-500 ease-out group-hover:bg-[length:100%_2px]">
                {profile.email}
              </span>
              <ArrowUpRight className="size-[0.7em] shrink-0 text-subtle transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" />
            </a>
            <CopyEmail email={profile.email} />
          </div>
        </div>
      </Reveal>

      <div className="mt-14 grid gap-10 sm:mt-16 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] lg:gap-14">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-wider text-subtle">Elsewhere</p>
          <ul className="mt-4 divide-y divide-line border-y border-line text-sm text-muted">
            {links.map(({ href, label, icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-3 py-3.5 transition-colors hover:text-fg"
                >
                  <span className="text-subtle transition-colors group-hover:text-accent">
                    {icon}
                  </span>
                  <span className="min-w-0 truncate">{label}</span>
                  {external && (
                    <ArrowUpRight className="ml-auto size-3.5 shrink-0 text-subtle opacity-0 transition-opacity group-hover:opacity-100" />
                  )}
                </a>
              </li>
            ))}
            <li className="flex items-center gap-3 py-3.5">
              <MapPin className="text-subtle" /> {profile.location}
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.06}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
