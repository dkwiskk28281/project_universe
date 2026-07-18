import { NextResponse } from "next/server";
import { ratioDiagnosticQuestions } from "@/lib/diagnostics/diagnostic-engine";

export async function POST() {
  return NextResponse.json({
    diagnosticId: `local-diagnostic-${Date.now()}`,
    mode: "adaptive-mvp",
    firstQuestion: ratioDiagnosticQuestions[0],
    safetyBoundary: "Diagnostic values are educational and do not represent equipment recipes."
  });
}
