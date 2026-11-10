# Vercel deployment and production handover

This project uses the Next.js App Router. Vercel detects Next.js automatically, so no `vercel.json` or custom image host configuration is required. The site uses local assets in `public/` with `next/image`; no remote image hostnames are configured.

## Current readiness

- The latest local lint, TypeScript, and production build checks passed. The build was supplied a temporary `https://localhost` origin to exercise the production build; it is not the site's production domain.
- `NEXT_PUBLIC_SITE_URL` must be set for every Vercel build environment. Production build fails when this is missing or invalid. Set it to the actual canonical HTTPS origin with no path, query, or fragment.
- Contact delivery is not launch ready until Resend and approved sender/recipient addresses are configured. Without them valid submissions return `503`.
- The contact handler's rate-limit and duplicate-submission state is process-local. Before relying on the form at launch, provide a shared atomic store or equivalent platform controls that protect submissions across instances and restarts.
- Public contact information, founders, privacy policy, verified portfolio content, and photo usage rights still need approved information. See `CONTACT-FORM-SETUP.md`.
- No Vercel project is linked in this workspace. The Vercel CLI, Git CLI, deployment URL, and Vercel account integration are unavailable here; no deployment or live-site check has been made.

## Import and deploy

1. Push the project to a Git provider supported by Vercel. Do not commit `.env.local` or any credential file. `.gitignore` excludes `.env*` except `.env.example`.
2. In Vercel, create a project and import the repository. Keep the detected Next.js framework, root directory, and npm install defaults so the committed `package-lock.json` is used. In Project Settings, select Node.js `22.x` for reproducible builds. Next.js 16 requires Node.js 20.9 or newer; Vercel's default can change over time.
3. Add environment variables under **Project Settings → Environment Variables** before starting the first build. Choose the correct Production, Preview, or Development scope for each value (see below). Vercel applies changed values only to new deployments, so redeploy after changing them.
4. Deploy a Preview first and check it with Vercel Deployment Protection enabled. Because `NEXT_PUBLIC_SITE_URL` sets canonical metadata, use the planned production origin for previews too; keep previews access-protected so the staging content is not treated as a public launch.
5. Configure the production domain in **Project Settings → Domains**. Use the exact DNS records Vercel provides for that domain; do not copy guessed records. Wait for Vercel to confirm the domain and provision HTTPS.
6. Assign the Production environment variables, then deploy the production branch or promote the approved deployment. Confirm the production domain points to the intended deployment.

Vercel's Git integration creates Preview deployments for non-production branches and Production deployments for the configured production branch. If using CLI instead, install and authenticate the Vercel CLI, run `vercel link` from the project directory, deploy a Preview with `vercel`, and deploy Production only with `vercel --prod` after setting the project environment variables.

## Environment variables

Set values in Vercel's environment settings, not in source files. Secret values belong in Vercel's encrypted environment variable UI or CLI prompt and must never use the `NEXT_PUBLIC_` prefix.

| Variable | Required | Recommended Vercel scope | Purpose |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes | Production and Preview | Canonical HTTPS origin. Required during the production-mode build; use the planned production domain. |
| `RESEND_API_KEY` | Yes for live contact delivery | Production only | Secret Resend API credential. |
| `CONTACT_FROM_EMAIL` | Yes for live contact delivery | Production only | Sender address verified by Resend. |
| `CONTACT_TO_EMAIL` | Yes for live contact delivery | Production only | Approved inquiry destination. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Optional, but recommended | Production and Preview | Approved email shown on the contact page. |
| `NEXT_PUBLIC_INSTAGRAM_URL` | Optional | Production and Preview | Approved public Instagram profile. |
| `NEXT_PUBLIC_TIKTOK_URL` | Optional | Production and Preview | Approved public TikTok profile. |
| `NEXT_PUBLIC_YOUTUBE_URL` | Optional | Production and Preview | Approved public YouTube profile. |
| `NEXT_PUBLIC_LINKEDIN_URL` | Optional | Production and Preview | Approved public LinkedIn profile. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional | Production; Preview only if desired | GA4 measurement ID. Analytics loads only after a visitor grants analytics consent. |

Use empty/unset optional variables when those features are not approved. Do not use guessed contact details, profiles, or tracking IDs. Keep Resend credentials out of Preview unless preview form emails have an explicitly approved test destination.

## Build and integration checks

Set Vercel's Build Command to the following so each deployment runs lint, typecheck, and the production build. Next.js 16's `next build` does not run ESLint by itself.

```text
npm run lint && npm run typecheck && npm run build
```

Run these locally before promoting a release:

```powershell
npm ci
npm run lint
npm run typecheck
$env:NEXT_PUBLIC_SITE_URL = 'https://<actual-production-domain>'
npm run build
```

Replace the example domain with the real origin. The site uses Vercel/Next.js image optimization for local raster assets and does not need `images.remotePatterns`. SEO routes are generated at `/sitemap.xml` and `/robots.txt`; the sitemap is populated from `NEXT_PUBLIC_SITE_URL`, while robots disallows `/api/` and `/design-system`.

Before launch, configure Resend's verified sender and approved recipient, then send a controlled test inquiry and confirm receipt. Complete the shared rate-limit/idempotency decision before accepting public traffic. If GA4 is enabled, verify consent and events in GA4 DebugView or Google Tag Assistant. The current implementation has not been verified with provider-side analytics tools.

## Domain and HTTPS

Add the apex and/or `www` hostnames that the business owns in Vercel's Domains settings. Follow Vercel's displayed DNS instructions at the DNS provider, then select a single canonical host and set `NEXT_PUBLIC_SITE_URL` to that origin. If both hostnames are used, configure the non-canonical hostname to redirect to the canonical one. Confirm Vercel reports valid DNS and active TLS before sharing the site. The actual domain and DNS provider have not yet been supplied, so no records or redirect have been configured here.

## Production smoke verification

After deployment, check the canonical HTTPS URL and these routes:

- `/`, `/services`, `/services/strategy-growth`, `/services/digital-systems`, `/services/creative-brand`
- `/hospitality`, `/work`, `/about`, `/contact`
- `/work/restaurant-dining-image-study` and `/work/hospitality-spaces-image-study`
- `/sitemap.xml`, `/robots.txt`, and an intentionally unknown path (should return a 404 page)

Confirm navigation and CTAs work, supplied images load, canonical and Open Graph metadata use the production host, sitemap entries use the production host, and robots rules are as intended. Submit a test form only after delivery credentials are set, then verify the email arrives and the UI reports success only for a confirmed delivery. Inspect browser console and Vercel function/runtime logs. When GA4 is configured, verify events only after consent is granted. None of these live checks can be marked complete until a deployment URL is available.

## Rollback

For a production incident, open **Vercel → Project → Deployments**, select the last known-good Production deployment, and use **Instant Rollback** (or the deployment menu's rollback action). The Vercel CLI also supports `vercel rollback <deployment-id-or-url>` for an authenticated, linked project. Confirm the production domain is assigned to the intended deployment and repeat the smoke checks after rollback.

Rollback restores a prior deployment; it does not update environment variables. If the incident involves a bad or exposed secret, rotate that credential in its provider and Vercel, then make a fresh deployment. If a rollback uses stale configuration, redeploy the known-good commit with the corrected environment settings.

## Vercel references

- [Deploying Next.js on Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs)
- [Next.js 16 Node.js requirement](https://nextjs.org/docs/app/guides/upgrading/version-16)
- [Vercel Node.js versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions)
- [Vercel environments](https://vercel.com/docs/deployments/environments)
- [Managing environment variables](https://vercel.com/docs/environment-variables/managing-environment-variables)
- [Setting up a custom domain](https://vercel.com/docs/domains/set-up-custom-domain)
- [Instant rollback](https://vercel.com/docs/instant-rollback)
- [Vercel CLI rollback](https://vercel.com/docs/cli/rollback)
