# AI System

## MVP Provider

The MVP uses a deterministic mock tutor provider so the vertical slice is testable without API keys.

## Future Provider Boundary

The future OpenAI provider should:

- Accept only schema-validated requests.
- Return structured JSON.
- Use retrieval from reviewed curriculum content.
- Separate uploaded document text from system instructions.
- Track prompt version, model, tokens, and cost.
- Cache non-sensitive repeated educational explanations.

## Tutor Modes

- Beginner explanation.
- Visual explanation.
- Socratic mode.
- Problem-solving coach.
- Field engineer mode.
- Technical English coach.
- Graduate interview mode.
- Research advisor mode.
- Product Support simulator mode.

## Safety Layer

The tutor must refuse or redirect:

- Proprietary recipes.
- Valve sequences.
- Detector setpoints.
- Interlock bypass.
- Customer site-specific acceptance limits.
- Confidential manuals or customer data.

Educational virtual values must be labeled as virtual examples.
