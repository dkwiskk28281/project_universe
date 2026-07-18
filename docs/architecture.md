# EPI Materials Mastery Architecture

## Decision

Use a single Next.js App Router application first. This keeps the MVP fast to run while preserving module boundaries for later extraction.

Chosen stack:

- Frontend: Next.js, React, TypeScript strict, Tailwind CSS.
- Backend boundary: Next.js route handlers and server actions later.
- Database: PostgreSQL with Prisma ORM and `pgvector`-ready schema.
- AI: provider interface with a mock provider first, then OpenAI structured outputs.
- Testing: Vitest for deterministic engines, Playwright for end-to-end learning flow.
- Dev services: Docker Compose for Postgres, Redis, and MinIO.

## Major Modules

- `lib/curriculum`: knowledge graph and lesson blueprints.
- `lib/diagnostics`: adaptive diagnostic question selection and result estimation.
- `lib/mastery`: mastery state calculation.
- `lib/review`: spaced review scheduling.
- `lib/exercises`: deterministic exercise grading.
- `lib/ai`: schema-validated tutor request and response objects.
- `components`: UI shells and learning interactions.
- `prisma`: long-term schema and seed data.

## Data Flow

1. Learner starts diagnostic.
2. Diagnostic answer is evaluated.
3. Missing prerequisites are resolved against the knowledge graph.
4. Lesson and practice target the weakest relevant node.
5. Exercise attempt updates mastery.
6. Review scheduler creates a future review item.
7. AI packet summarizes learning state for future tutoring and analytics.

## Persistence Strategy

The MVP UI uses localStorage so it can run without infrastructure. The Prisma schema defines the durable version:

- User profile and goals.
- Knowledge nodes and prerequisite edges.
- Diagnostic sessions and answers.
- Mastery states.
- Review items.
- Notes, projects, documents, scenarios, AI messages, audit logs, and model usage.

## AI Safety Boundary

AI responses must be structured and validated. The tutor can explain educational examples, but cannot present specific recipes, site acceptance limits, bypass instructions, detector setpoints, or proprietary manual content.
