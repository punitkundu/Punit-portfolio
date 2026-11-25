# Punit Kundu Portfolio — AGENTS.md

This file documents the portfolio project and the Supabase admin panel. All future code additions must be recorded here.

## Project structure

```
/workspaces/Punit-portfolio/
├── extracted/              # Deployed site (served on port 80)
│   ├── index.html          # Main portfolio (static + Supabase data loader)
│   ├── admin.html          # Supabase-powered admin panel (auth + CRUD)
│   ├── assets/             # Images (stadium.jpg, cutouts, project screenshots, balls)
│   ├── js/
│   │   └── supabase-config.js   # Supabase URL + anon key (edit placeholders)
│   └── supabase/
│       └── schema.sql      # SQL to run in Supabase SQL Editor
├── punit-kundu-portfolio.zip
├── README.md
└── AGENTS.md               # this file
```

## Local server

The site is served by a Python HTTP server on **port 80**:

- Portfolio: `https://<codespaces-url>/`
- Admin panel: `https://<codespaces-url>/admin.html`

Server command: `sudo python3 -m http.server 80 --directory /workspaces/Punit-portfolio/extracted`

Running process: `sudo python3 -m http.server 80 --directory /workspaces/Punit-portfolio/extracted` (PID tracked by background_process).

## Supabase setup (required for dynamic content + admin)

1. Create a Supabase project at https://supabase.com
2. Run `extracted/supabase/schema.sql` in the Supabase SQL Editor (creates `profiles`, `projects`, `skills`, `awards`, `experience` tables with RLS and seeds a default profile).
3. In `extracted/js/supabase-config.js`, replace:
   - `https://YOUR_PROJECT_REF.supabase.co` with your project URL
   - `YOUR_PUBLIC_ANON_KEY` with your public anon key
4. Add an admin user in Supabase → Authentication → Users → Add user.
5. Open `/admin.html`, sign in, and manage Profile / Projects / Skills / Awards / Experience.
6. Changes reflect on the public portfolio automatically via the data loader in `index.html`.

## Tables

| Table | Purpose |
|-------|---------|
| profiles | Singleton portfolio bio (name, role, location, company, email, etc.) |
| projects | Highlights / Projects section cards |
| skills | AI Toolkit skill cloud + category buttons |
| awards | Awards & Caps scoreboard |
| experience | Experience / Innings timeline |

RLS: public read; authenticated admin full access.

## Adding new code

- New pages: add `.html` files inside `extracted/`; link from nav/admin as needed.
- New assets: place in `extracted/assets/` and reference by relative path.
- New Supabase tables: add to `extracted/supabase/schema.sql`, run migration, update `admin.html` CRUD and `index.html` loader.
- Always append changes to this AGENTS.md file.

## Notes

- Google Fonts load from the internet (needs network once).
- Loader auto-completes after 3 seconds; SKIP button available.
- Do NOT commit secrets/API keys to git. `supabase-config.js` contains placeholders only.