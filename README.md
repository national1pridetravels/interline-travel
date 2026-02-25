# National Pride Travels (Next.js)

Production website for Kashmir travel packages with:
- Public website pages (`/`, `/destinations`, `/packages`, `/about`, `/contact`, `/blog`)
- Admin panel (`/admin`) for managing site config, destinations, and packages
- Lead forms (`/api/contact`, `/api/planner`, `/api/booking`, `/api/newsletter`)
- WhatsApp chatbot API (`/api/chatbot`) powered by live destination/package data

## Tech Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Prisma + SQLite

## Local Development
1. Install dependencies:
```bash
npm install
```
2. Configure environment:
```bash
cp .env .env.local
```
3. Generate Prisma client:
```bash
npm run prisma:generate
```
4. Run development server:
```bash
npm run dev
```

## Environment Variables
- `DATABASE_URL` (Prisma SQLite/Postgres connection)
- `ADMIN_EMAIL` (optional, default fallback exists)
- `ADMIN_PASSWORD` (optional, default fallback exists)
- `NEXT_PUBLIC_SITE_URL` (for canonical/SEO URLs)
- `RESEND_API_KEY` (required for lead email delivery)
- `RESEND_FROM_EMAIL` (sender email/domain for Resend)
- `CONTACT_RECEIVER_EMAILS` (comma-separated lead inbox recipients)
- `WHATSAPP_VERIFY_TOKEN` (optional, webhook verification)
- `WHATSAPP_ACCESS_TOKEN` (optional, webhook send)
- `WHATSAPP_PHONE_NUMBER_ID` (optional, webhook send)

## Build and Run
```bash
npm run build
npm run start
```

## Deploy
Deploy on Vercel as a standard Next.js project.

Notes:
- Forms submit without email if `RESEND_API_KEY` is missing.
- Admin auth/session is handled by the `/api/admin/auth/*` routes.
