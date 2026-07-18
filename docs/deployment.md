# Deployment

## Local Development

1. Start infrastructure:

```bash
docker compose up -d postgres redis minio
```

2. Install dependencies:

```bash
cd apps/web
npm install
```

3. Create `.env` from `.env.example`.

4. Generate Prisma client:

```bash
npm run prisma:generate
```

5. Start app:

```bash
npm run dev
```

## Current MVP Limitation

The app UI currently uses localStorage for the vertical slice. The Prisma schema is ready for durable persistence, but UI write paths are not yet wired to authenticated database sessions.

## Future Production Target

Deploy the Next.js app to Vercel or AWS with managed PostgreSQL, object storage, environment variable validation, Sentry, and GitHub Actions preview deployments.
