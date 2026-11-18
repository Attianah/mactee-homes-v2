# Hosting Mactee Homes on Wasmer Edge with your own Postgres

The Base44 app is untouched by everything here. These files are only used by the
self-host build, so you can keep using Base44 and host a copy elsewhere at the
same time.

## What was added

| File | Purpose |
| --- | --- |
| `Staticfile` | Tells Wasmer to publish `dist/client` |
| `settings/config.toml` | Web server settings: SPA fallback, compression, caching |
| `wasmer.toml` | Wasmer package manifest (static web server + file mapping) |
| `app.yaml` | The Wasmer app: owner, name, package |
| `selfhost/db/schema.sql` | Creates the `properties` and `enquiries` tables with access rules |
| `selfhost/db/seed.sql` | Inserts your four current listings |
| `selfhost/data.js` | Replaces the Base44 data layer: reads listings, saves enquiries |
| `selfhost/make-index.mjs` | Copies the app shell to `index.html` after a build |
| `selfhost/base44-document.js`, `auth-context.jsx`, `cloudflare-workers.js` | Empty stand-ins for Base44-only modules |
| `vite.selfhost.config.js` | Static build config (no Base44, no worker) |
| `vercel.json` | Kept in case you ever deploy to Vercel instead |

## Why the database is not Wasmer's own Postgres

Wasmer Edge can attach a managed Postgres to an app, but it only hands the
credentials to **server code running on Wasmer** (`DB_HOST`, `DB_PASSWORD`, …).
A static site runs in the visitor's browser, and browsers cannot open a raw
Postgres connection, so the site needs a Postgres with an HTTP endpoint in front
of it. Supabase and Neon both do that on top of real Postgres, free to start.
The rest of this guide uses Supabase, which is what the data layer already speaks.

If you would rather keep absolutely everything on Wasmer, that is possible by
adding a small Node server app there that talks to Wasmer's managed Postgres and
serves both the site and the data. Say the word and it can be built that way
instead.

## 1. Create the database

1. Sign up at supabase.com and create a project (the free tier is enough).
2. Open **Settings → API** and copy the **Project URL** and the **anon public** key.
3. Open **SQL Editor**, paste all of `selfhost/db/schema.sql`, press **Run**.
4. Paste all of `selfhost/db/seed.sql`, press **Run**. Your four listings are now in the table.

## 2. Point the site at it

Create a file named `.env` in the project root:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

These are baked into the build, so rebuild after changing them.

## 3. Build the site

```bash
npm install
npm run build:wasmer
```

This writes the finished site to `dist/client`, including the `index.html` the
web server needs.

## 4. Install and sign in to the Wasmer CLI

```bash
curl https://get.wasmer.io -sSfL | sh
wasmer login
```

`wasmer login` opens the browser and links the CLI to your Wasmer account.

## 5. Put your username in `app.yaml`

Open `app.yaml` and replace `your-wasmer-username` with your Wasmer username
(shown at wasmer.io, top right). The name `mactee-homes` becomes the address, so
leave it unless you want a different one.

## 6. Deploy

```bash
wasmer deploy
```

The first run publishes the package, creates the app, and prints its address:

```
App URL: https://mactee-homes-<your-username>.wasmer.app
```

That link is the live site.

## 7. Optional: preview locally first

```bash
wasmer run . -- --port 9000
```

Then open `http://localhost:9000`. This serves exactly what Wasmer will serve.

## Updating the site later

Change listings in Supabase, or edit the code, then:

```bash
npm run build:wasmer
wasmer deploy
```

Every deploy bumps the version and replaces the live site within seconds.

## Managing content

- **Listings** live in the `properties` table (Supabase **Table Editor**).
  `sort_order` controls display order; `featured` and `badge` drive the card labels.
- **Enquiries** from the forms land in the `enquiries` table. The public key can
  insert but never read them, so open the Table Editor to see them.

## Two things to know

- The property photos still point at Base44's image host. They work, but for a
  fully independent site upload them to Supabase Storage and replace the URLs in
  the `images` column.
- The enquiry form is open to the public by design. If spam becomes a problem,
  add a Supabase rate limit or a captcha.

## Deploying somewhere else

The same build works anywhere that serves static files:

- **Vercel**: import the repo; `vercel.json` already sets the build command and output folder.
- **Netlify**: build command `npm run build:wasmer`, publish directory `dist/client`,
  plus a redirect rule `/*  /index.html  200`.
