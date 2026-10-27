import { profile } from "@/content";
import { ContactForm } from "./contact-form";
import { CopyEmail } from "./copy-email";
import { GitHub, LinkedIn, MapPin, Phone } from "./icons";
import { Reveal } from "./reveal";
import { ExternalLink, Section } from "./ui";

export function Contact() {
  return (
    <Section id="contact" index="05" title="Let's talk">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-14">
        <Reveal>
          <p className="max-w-md text-base leading-relaxed text-muted sm:text-lg">
            I&apos;m looking for a full-time full stack role. Email is the fastest way to reach
            me, or use the form.
          </p>

          <div className="mt-8 flex items-center gap-2">
            <a
              href={`mailto:${profile.email}`}
              className="min-w-0 truncate text-lg font-medium tracking-tight text-fg underline decoration-line-strong underline-offset-[6px] transition-colors hover:decoration-accent sm:text-xl"
            >
              {profile.email}
            </a>
            <CopyEmail email={profile.email} />
          </div>

          <ul className="mt-8 space-y-3 text-sm text-muted">
            <li>
              <a href={profile.phoneHref} className="inline-flex items-center gap-3 hover:text-fg">
                <Phone className="text-subtle" /> {profile.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="text-subtle" /> {profile.location}
            </li>
            <li>
              <ExternalLink href={profile.github} className="inline-flex items-center gap-3 hover:text-fg">
                <GitHub className="text-subtle" /> github.com/Mihir0336
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href={profile.linkedin} className="inline-flex items-center gap-3 hover:text-fg">
                <LinkedIn className="text-subtle" /> linkedin.com/in/mihirpatel0336
              </ExternalLink>
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
