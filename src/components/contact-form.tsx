"use client";

import { useState } from "react";
import { profile } from "@/content";

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "sent" }
  | { state: "error"; message: string };

const field =
  "block w-full rounded-lg border border-line bg-card px-3.5 py-2.5 text-[15px] text-fg placeholder:text-subtle/70 transition-colors hover:border-line-strong focus:border-accent focus:outline-none";

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      form.reset();
      setStatus({ state: "sent" });
    } catch (err) {
      setStatus({
        state: "error",
        message: err instanceof Error ? err.message : "Something went wrong.",
      });
    }
  }

  if (status.state === "sent") {
    return (
      <div className="flex h-full min-h-72 flex-col items-start justify-center rounded-2xl border border-line bg-card p-7">
        <p className="font-mono text-xs text-accent">Message sent</p>
        <p className="mt-3 text-lg font-medium tracking-tight text-fg">
          Thanks, I&apos;ll get back to you soon.
        </p>
        <button
          type="button"
          onClick={() => setStatus({ state: "idle" })}
          className="mt-6 font-mono text-xs text-muted underline-offset-4 hover:text-fg hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  const sending = status.state === "sending";

  return (
    <form
      onSubmit={onSubmit}
      className="relative space-y-4 rounded-2xl border border-line bg-card/40 p-6 sm:p-7"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm text-muted">Name</span>
          <input
            name="name"
            required
            maxLength={100}
            autoComplete="name"
            className={field}
            placeholder="Jane Doe"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm text-muted">Email</span>
          <input
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            className={field}
            placeholder="jane@company.com"
          />
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-sm text-muted">Message</span>
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={5}
          className={`${field} resize-y`}
          placeholder="We're hiring a full stack developer and would like to talk."
        />
      </label>
      {/* Honeypot: hidden from people, filled in by bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] size-0 overflow-hidden">
        <label>
          Company website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-col-reverse items-start gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <p role="status" aria-live="polite" className="text-sm text-muted">
          {status.state === "error" && (
            <>
              {status.message} You can also email{" "}
              <a
                href={`mailto:${profile.email}`}
                className="text-accent underline underline-offset-4"
              >
                {profile.email}
              </a>
              .
            </>
          )}
        </p>
        <button
          type="submit"
          disabled={sending}
          className="inline-flex h-10 shrink-0 items-center justify-center rounded-lg bg-btn px-5 text-sm font-medium text-btn-fg transition-colors hover:bg-btn-hover disabled:cursor-wait disabled:opacity-70"
        >
          {sending ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
