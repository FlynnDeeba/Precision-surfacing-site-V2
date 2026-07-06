# Lead form → email setup (Netlify + Resend)

The quote form posts to a Netlify Function (`netlify/functions/submit-lead.js`) which:
1. **Emails you** the lead at `info@psurfacing.co.uk`
2. **Auto-replies the customer** confirming you've received it

The code is all in place. You just need to deploy and add three things. Do these once:

## 1. Put the site on GitHub → Netlify
- Create a new GitHub repo and push this folder to it.
- In Netlify: **Add new site → Import from GitHub → pick the repo.**
- Build settings are read automatically from `netlify.toml` (build `npm run build`, publish `_site`, functions `netlify/functions`). Deploy.

## 2. Resend (sends the emails)
- `psurfacing.co.uk` is already verified in the existing Resend account, so no new DNS is needed.
- Reuse the existing **API key**, or create a new one (Resend → API Keys).

## 3. Add environment variables in Netlify
Netlify → **Site settings → Environment variables** → add:

| Key | Value |
|-----|-------|
| `RESEND_API_KEY` | *(the key from your Resend account — required)* |
| `LEAD_TO` | `info@psurfacing.co.uk` |
| `MAIL_FROM` | `Precision Surfacing <info@psurfacing.co.uk>` |
| `REPLY_TO` | `info@psurfacing.co.uk` |
| `PHONE` | `07836 441717` |

Then **redeploy** (Netlify → Deploys → Trigger deploy) so the function picks up the variables.

## Notes
- **`MAIL_FROM` sends from `info@psurfacing.co.uk`**, which is verified in Resend — good to go.
- The lead notification is sent *from* and *to* `info@psurfacing.co.uk`, with **reply-to set to the customer**, so you can reply straight back to them. The customer's auto-reply is sent from `info@psurfacing.co.uk` too.
- Test by submitting the live form. You should get the lead at `info@psurfacing.co.uk`; the address you entered gets the auto-reply.
- Locally the form can't reach the function, so it shows the "please call/email" fallback — that's expected until it's deployed.
- Free tiers: Netlify Functions and Resend both have generous free allowances for this volume.
