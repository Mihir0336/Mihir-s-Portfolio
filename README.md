# Mihir Patel — Portfolio

Personal site at [mihir0336.vercel.app](https://mihir0336.vercel.app).

Built with Next.js (App Router), TypeScript, Tailwind CSS v4 and Motion. Dark-first with a light theme toggle.

## Editing content

Everything on the page (experience, projects, skills, education, contact details) lives in
[`src/content.ts`](src/content.ts). Keep it in sync with the resume at `public/Mihir_Patel_CV.pdf`.

## Development

```bash
npm install
npm run dev
```

## Contact form

The form posts to `/api/contact`, which sends email through [Resend](https://resend.com).
Set these environment variables (locally in `.env.local`, on Vercel under Settings → Environment Variables):

| Variable           | Value                                                        |
| ------------------ | ------------------------------------------------------------ |
| `RESEND_API_KEY`   | API key from resend.com/api-keys                             |
| `CONTACT_TO_EMAIL` | Where messages go (the email you signed up to Resend with)   |

Without `RESEND_API_KEY` the form shows a friendly error with the email address instead.
