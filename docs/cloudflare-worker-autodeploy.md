# Cloudflare Worker Autodeploy

Project Universe production URL:

```text
https://projectuniverse.chang2058.workers.dev
```

This repository deploys the static app plus `_worker.js` to Cloudflare Workers through:

```text
.github/workflows/cloudflare-worker-deploy.yml
```

## Required GitHub Secrets

Add these repository secrets in GitHub:

```text
CLOUDFLARE_ACCOUNT_ID
CLOUDFLARE_API_TOKEN
```

Cloudflare's Workers GitHub Actions documentation says CI environments are non-interactive, so Wrangler needs both an account ID and API token. The API token must not be committed to the repository.

## API Token Permission

Use Cloudflare Dashboard -> Account API Tokens -> Create Token.

Recommended token policy:

```text
Permission template: Edit Cloudflare Workers
Account scope: only the account that owns projectuniverse
Zone scope: only required zones, or none if the workers.dev route is enough
```

Do not use a read-only token. Wrangler must be able to edit/deploy the Worker.

## What The Workflow Does

On every push to `main` that touches the Worker/static app deployment surface, or on manual `workflow_dispatch`, it runs:

```text
npm ci --progress=false
npm run build
npx wrangler deploy --dry-run
npx wrangler deploy
curl smoke check for /vision-training.js
```

The smoke check confirms that the public Worker serves the expected post-build asset:

```text
https://projectuniverse.chang2058.workers.dev/vision-training.js
```

## Failure Meanings

`Missing CLOUDFLARE_API_TOKEN`

GitHub secret is absent. Create the Cloudflare token and add it as a repository secret.

`Missing CLOUDFLARE_ACCOUNT_ID`

GitHub secret is absent. Copy the account ID from the Cloudflare dashboard and add it as a repository secret.

`Authentication error [code: 10000]`

The token exists but is wrong, expired, scoped to the wrong account, or lacks edit permission.

`wrangler deploy --dry-run` fails

The local build output, `wrangler.jsonc`, Worker entrypoint, assets directory, or bindings are invalid.

`Smoke check failed`

The deploy command returned successfully, but the public URL did not serve the expected new asset. Check Worker route, deployment status, cache, and project name.

## D1 Binding

The production Worker config binds D1 as:

```json
{
  "binding": "ce_data",
  "database_name": "ce_data"
}
```

The Worker code also accepts `DB`, `ce_data`, or `CE_DATA`, but `wrangler.jsonc` currently standardizes on `ce_data`.

## Security Boundary

Never put these in Git:

```text
Cloudflare API token
passwords
session secrets
seed phrases
account numbers
resident IDs
customer confidential data
equipment manuals
recipes
valve sequences
detector setpoints
interlock bypass steps
site-specific acceptance limits
```

If a token is pasted into a terminal, chat, or repository by mistake, revoke and rotate it immediately.
