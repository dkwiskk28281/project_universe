import { describe, expect, it } from "vitest";
import {
  estimateDiagnosticLevel,
  evaluateChoice,
  ratioDiagnosticQuestions,
  selectNextDiagnosticQuestion
} from "@/lib/diagnostics/diagnostic-engine";
import type { DiagnosticAnswer } from "@/lib/types";

describe("diagnostic engine", () => {
  it("grades choices deterministically", () => {
    const first = ratioDiagnosticQuestions[0];

    expect(evaluateChoice(first, first.correctIndex)).toBe(true);
    expect(evaluateChoice(first, (first.correctIndex + 1) % first.options.length)).toBe(false);
  });

  it("falls back to a prerequisite after a miss", () => {
    const answers: DiagnosticAnswer[] = [
      {
        questionId: "diag-gas-ratio-1",
        nodeId: "epi-gas-ratio",
        correct: false,
        confidence: 3,
        secondsSpent: 50,
        hintsUsed: 0,
        explanationQuality: 1,
        answeredAt: new Date().toISOString()
      }
    ];

    expect(selectNextDiagnosticQuestion(answers)?.nodeId).toBe("eng-unit-conversion");
  });

  it("estimates learner level using confidence calibration", () => {
    expect(estimateDiagnosticLevel([])).toBe("foundation");
    expect(
      estimateDiagnosticLevel(
        ratioDiagnosticQuestions.map((question) => ({
          questionId: question.id,
          nodeId: question.nodeId,
          correct: true,
          confidence: 4,
          secondsSpent: 30,
          hintsUsed: 0,
          explanationQuality: 2,
          answeredAt: new Date().toISOString()
        }))
      )
    ).toBe("ready-for-epi-application");
  });
});
