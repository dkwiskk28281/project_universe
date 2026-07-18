# Security and Privacy

## MVP Status

The current `apps/web` app is a local MVP foundation. It does not yet implement production authentication, secure sessions, OAuth, passkeys, or database-backed authorization.

## Required Production Controls

- Auth.js or equivalent secure authentication.
- Secure cookies.
- CSRF protection where applicable.
- Rate limiting on AI and upload routes.
- Zod validation for every server input.
- Server-only API keys.
- File type and size checks.
- Prompt injection isolation for uploaded documents.
- Audit logs.
- Data export and deletion controls.

## Sensitive Data Rules

Do not store:

- Passwords in plain text.
- Seed phrases.
- Account numbers.
- National ID numbers.
- Customer confidential information.
- Proprietary manuals.
- Equipment recipes.
- Valve sequences.
- Detector setpoints.
- Interlock bypass instructions.
- Site-specific limits.

## Data Boundary

PostgreSQL stores structured data. S3-compatible storage or MinIO stores original files. The database stores file index metadata, not large raw files.
