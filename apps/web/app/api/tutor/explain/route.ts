import { NextRequest, NextResponse } from "next/server";
import { mockTutorResponse, tutorRequestSchema, tutorResponseSchema } from "@/lib/ai/tutor";

export async function POST(request: NextRequest) {
  const body: unknown = await request.json().catch(() => null);
  const parsed = tutorRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_request", issues: parsed.error.flatten() }, { status: 400 });
  }
  const response = mockTutorResponse(parsed.data);
  const verified = tutorResponseSchema.safeParse(response);
  if (!verified.success) {
    return NextResponse.json({ error: "invalid_tutor_output" }, { status: 502 });
  }
  return NextResponse.json({
    provider: "mock",
    promptVersion: "ratio-gas-flow-tutor-v1",
    costUsd: 0,
    data: verified.data
  });
}
