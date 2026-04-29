# Citi Maju Group — Brand Bible & Website

This repository contains two things:

1. **Brand Bible** — the single source of truth for all Citi Maju Group brand standards
2. **Website** — the CMG corporate website built with Next.js 15 + Sanity CMS

---

## Website Setup

### Tech Stack
- **Framework:** Next.js 15 (App Router, TypeScript)
- **CMS:** Sanity v3 — admin portal at `/studio`
- **Styling:** Tailwind CSS + CI design tokens
- **i18n:** next-intl (English; Bahasa Malaysia ready)
- **Email:** Nodemailer → Google Workspace SMTP

### Environment Variables
Create a `.env.local` file (never commit this):
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SMTP_USER=noreply@citimaju.com
SMTP_PASS=your_google_app_password
```

### Development
```bash
npm install
npm run dev
```

### Deploy (Hostinger)
Connect the `claude/build-cmg-website-3pS6z` branch in Hostinger's GitHub integration. Set the environment variables in Hostinger's panel before deploying.

---

## Brand Bible

Every visual, written, and physical material produced under the Citi Maju name must follow the guidelines in this repository.

| You are… | Go to… |
|---|---|
| A designer creating print or digital materials | [01-brand-foundation](./01-brand-foundation/), [06-print-and-marketing](./06-print-and-marketing/) |
| An admin drafting emails, letters, or documents | [02-voice-and-tone](./02-voice-and-tone/), [03-digital](./03-digital/), [04-documents](./04-documents/) |
| Creating a presentation or proposal | [05-presentations](./05-presentations/), [04-documents](./04-documents/) |
| A site supervisor ordering workwear or safety items | [07-workwear-and-physical](./07-workwear-and-physical/) |
| A vendor producing signage, uniforms, or vehicle livery | [06-print-and-marketing](./06-print-and-marketing/), [07-workwear-and-physical](./07-workwear-and-physical/) |
| Using Claude AI to generate branded documents | [08-claude-prompts](./08-claude-prompts/) |

## Repository Structure

```
citimajuwebsite3/
├── app/                      Next.js pages and API routes
├── components/               Reusable UI and layout components
├── sanity/                   Sanity CMS schemas and client
├── messages/                 i18n message files (en.json, ...)
├── 01-brand-foundation/      Core visual identity: logo, colours, typography
├── 02-voice-and-tone/        How we write and speak
├── 03-digital/               Email, WhatsApp, social media
├── 04-documents/             Letterheads, quotations, proposals, reports
├── 05-presentations/         Slide design and content
├── 06-print-and-marketing/   Namecards, flyers, signage, vehicle livery
├── 07-workwear-and-physical/ Uniforms, helmets, safety signage
├── 08-claude-prompts/        AI prompts for branded document creation
└── assets/                   Logo SVGs, colour swatches, font references
```

---

## About Citi Maju Group

Citi Maju Group is a Klang Valley construction and engineering group comprising two registered entities, always presented as one unified group.

**Citi Maju Engineering Sdn Bhd** handles large-scale water reticulation projects, serving major property developers, Air Selangor, and government procurement. Certified: CIDB G7, Air Selangor Approved Contractor.

**Citi Maju Construction Sdn Bhd** handles renovation works, civil and structural works, hot tapping, and metal structure fabrication.

**Tagline:** Trusted. Certified. Delivered.
**Contact:** inquiry@citimaju.com | citimaju.com

---

## Non-Negotiable Brand Rules

1. **Always "Klang Valley"** — never "KL and Selangor"
2. **Always one group** — never present as two separate companies
3. **Gold is #C8921A** — never use #E8A020 or any other amber
4. **H1 and H2 headings use Cormorant Garamond** — never Sora or Noto Sans
5. **Tagline is fixed** — "Trusted. Certified. Delivered." No variations
6. **No machinery rental** — do not list it as a service
7. **No response time promises** — do not state turnaround times for inquiries
