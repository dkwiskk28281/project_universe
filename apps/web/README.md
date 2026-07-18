# EPI Materials Mastery

Adaptive learning MVP for a Korean semiconductor equipment engineer moving toward Materials Science M.S. readiness and EPI Product Support/Fellow capability.

## What Works In This MVP

- Dashboard with today's learning focus.
- Adaptive ratio/unit diagnostic.
- `비율과 가스 유량` lesson.
- Interactive gas-flow ratio practice.
- Immediate answer feedback.
- Mastery update and spaced review generation.
- Knowledge graph preview.
- Mock AI tutor with structured response.
- Local AI-readable packet export preview.
- Prisma schema for the long-term platform.

## What Is Not Yet Production-Ready

- Authentication.
- Database-backed user sessions.
- Real OpenAI calls.
- File upload/RAG.
- Payment.
- Production deployment.

## Run Locally

```bash
npm install
npm run dev
```

## Validate

```bash
npm run typecheck
npm run test
npm run build
```

## Safety Boundary

All gas-flow numbers are educational virtual examples. This app must not contain proprietary recipes, valve sequences, detector setpoints, interlock bypasses, site-specific limits, or confidential customer information.
