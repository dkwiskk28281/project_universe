import { NextRequest, NextResponse } from "next/server";
import { ratioAttemptSchema, evaluateRatioAttempt } from "@/lib/exercises/ratio-gas-flow";

export async function POST(request: NextRequest) {
  const body: unknown = await request.json().catch(() => null);
  const parsed = ratioAttemptSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_request", issues: parsed.error.flatten() }, { status: 400 });
  }
  return NextResponse.json({
    exerciseId: "ratio-gas-flow-application",
    nodeId: "epi-gas-ratio",
    safetyBoundary: "Educational virtual gas values only. Not a recipe, setpoint, gas matrix, or site-specific limit.",
    result: evaluateRatioAttempt(parsed.data)
  });
}
