# IEEE EMI Student Branch — website

Website of the IEEE Student Branch at Ecole Mohammadia d’Ingénieurs. *Let’s give it a shine.*

Pages: Home · About · Projects (Mission 2026–2027) · Join · Contact

## Run locally

Requires [Node.js](https://nodejs.org) 18+.

```bash
npm install
cp .env.example .env   # add your Supabase keys
npm run dev            # http://localhost:5173
```

`npm run build` outputs a static site to `dist/`.

## Deploy (Vercel)

1. Import this repo at [vercel.com/new](https://vercel.com/new) — Vite is detected automatically.
2. (Optional) override the Supabase keys under **Settings → Environment Variables**.
3. Deploy. Every push to `main` redeploys.
4. Custom domain: **Settings → Domains**, then add the DNS records Vercel shows at your registrar.

`vercel.json` rewrites all paths to `index.html` so routes like `/about` work on refresh.

## Forms (Supabase)

The Join and Contact forms write to `join_applications` and `contact_messages`.
Create them by running `supabase/migrations/20261102000000_create_form_tables.sql`
in the Supabase SQL editor (or `supabase db push`). Visitors can only insert;
read submissions in the Supabase dashboard.

The public project URL and anon key are set as defaults in `src/lib/supabase.ts`,
so no environment variables are required. Setting `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` overrides them.

## Brand

| Token | Hex | Source |
|---|---|---|
| IEEE blue | `#00679F` | IEEE logo |
| Branch teal | `#0197B2` | EMI branch lockup |
| Shine navy | `#013D5F` | “Let’s give it a shine” |
| Shine glow | `#3BB8FF` | slogan flare |

Logos are in `public/assets/`; colour tokens in `src/index.css`. Headings: Montserrat, body: Inter.

## Project structure

```
src/
  pages/          Index, About, Projects, Join, Contact, NotFound
  components/     ClubShell (header + footer), MotionReveal, ScrollToTop, ErrorBoundary, ui/button
  lib/            supabase client, utils
supabase/         config + SQL migration for the form tables
public/assets/    logos
```

## Stack

Vite · React · TypeScript · Tailwind CSS · Framer Motion · Supabase
