# Production launch configuration

The production domain and delivery credentials must be configured in the hosting provider's environment settings before deployment. Copy `.env.example` to `.env.local` for local development; never commit `.env.local` or put server credentials in variables prefixed with `NEXT_PUBLIC_`.

## Required deployment settings

- `NEXT_PUBLIC_SITE_URL`: the actual canonical HTTPS origin, with no path, query, or fragment. Production builds now fail with an actionable error if it is missing, malformed, non-HTTPS, or still a reserved example domain. Canonical metadata, structured data, and the sitemap use this value.
- `RESEND_API_KEY`: the server-only Resend API key.
- `CONTACT_FROM_EMAIL`: a sender address verified with Resend.
- `CONTACT_TO_EMAIL`: the approved inquiry inbox.

Set `NEXT_PUBLIC_CONTACT_EMAIL` and the `NEXT_PUBLIC_*_URL` social profile variables only to approved public contact details. Do not enter private or unverified profiles.

## Contact form delivery and abuse controls

The inquiry form sends a plain-text email through Resend's email API. It does not report success until Resend accepts the message. With delivery credentials absent, the API responds with `503` and the form displays an unavailable message.

The handler validates fields on the server, limits JSON payload size, and uses a honeypot. Its per-email rate limit and submission deduplication are currently held in process memory. They are suitable only as best-effort safeguards for a single process; they do not provide global or IP-based limits and can be bypassed across instances or restarts. Before a multi-instance production launch, select and configure a shared store that supports atomic rate limiting and idempotency, or implement equivalent controls in the selected host's edge/platform services. The host is not selected, so no vendor-specific store has been wired in.

After configuration, submit a real test inquiry from the deployed site and confirm receipt before publishing the form. Do not use real customer information for this verification.

## Remaining approved content and compliance work

- Add the approved privacy policy and determine the applicable consent requirements from the business's operating jurisdictions. The current analytics prompt governs optional GA4 only; it is not a substitute for a privacy policy or jurisdiction-specific legal review.
- If analytics is wanted, set `NEXT_PUBLIC_GA_MEASUREMENT_ID` to the approved GA4 measurement ID. Then use GA4 DebugView or Tag Assistant on the deployed environment to verify events and consent behavior.
- Replace the founder placeholders in `src/lib/founders.ts` with approved names, roles, biographies, expertise, portrait paths, and public profile links. Add only approved portraits under `public/`.
- `src/lib/projects.ts` contains labeled concept-only image studies and has no verified client case studies or results. Keep them labeled as concepts, or replace/remove them after supplying approved project context and confirmed image usage rights. Do not add unverified outcomes.
- Confirm image usage rights and check supplied photos for visible third-party marks. Review all service descriptions and public claims against the agency's approved offerings.
