# EPI Materials Mastery Product Requirements

## Core Goal

EPI Materials Mastery is an adaptive web learning platform for a Korean semiconductor equipment engineer who wants to grow from field technician capability into Materials Science M.S. readiness, EPI Product Support, Global SME, Principal Engineer, and ultimately Fellow-level technical influence.

The first implementation must be small but real: a working vertical slice that diagnoses a math gap, teaches the missing concept, runs an interactive EPI-flavored practice, updates mastery, creates review cards, and exposes an AI-readable learning packet.

## Primary User

- Korean learner.
- Strong practical equipment background, weaker confidence in mathematics and physics theory.
- Preparing Applied Materials EPI Installation work.
- Needs to connect field vocabulary, mathematics, gas/vacuum/process intuition, technical English, and graduate-level Materials Science.

## MVP In Scope

- Next.js app under `apps/web`.
- Local-first MVP state for the first learning loop.
- Prisma/PostgreSQL schema for the long-term product model.
- Knowledge graph with at least 20 nodes.
- Ten starter lessons connected to EPI and Materials Science.
- Adaptive ratio/unit diagnostic.
- `비율과 가스 유량` lesson.
- Interactive gas-flow ratio slider.
- Exercise evaluation with immediate feedback.
- Mastery update engine.
- Spaced review item generation.
- Mock AI tutor with structured output.
- AI-readable local packet.
- Unit tests for core deterministic engines.
- Playwright smoke test for the vertical slice.

## Explicitly Out Of MVP Scope

- Production authentication.
- Real OpenAI API calls.
- Real PostgreSQL persistence in UI flows.
- Payment/subscription.
- Voice tutoring.
- Uploaded document parsing.
- Real school admission requirement scraping.
- Proprietary recipes, tool manuals, valve sequences, detector setpoints, interlock bypass, or customer site-specific limits.

## Success Criteria

- The app can run locally with one command after dependencies are installed.
- The learner can complete the ratio diagnostic, lesson, practice, and review loop.
- The UI never presents educational example gas numbers as real equipment recipe values.
- Core logic is testable outside the UI.
- Future Postgres/AI/auth work has clear boundaries instead of being mixed into components.

## Source Basis

Curriculum structure is aligned with publicly available Materials Science and semiconductor learning paths such as MIT OpenCourseWare materials courses, Stanford MSE graduate requirement pages, NPTEL introductory MSE materials, and Applied Materials public Epitaxy overview. These sources guide topic scope only; they do not provide copied lesson content.
