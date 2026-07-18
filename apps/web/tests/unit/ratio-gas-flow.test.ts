import { describe, expect, it } from "vitest";
import { calculateGasRatio, evaluateRatioAttempt } from "@/lib/exercises/ratio-gas-flow";

describe("ratio gas flow exercise", () => {
  it("converts slm to sccm before ratio calculation", () => {
    expect(calculateGasRatio(20, 200)).toBe(100);
  });

  it("accepts an answer inside tolerance", () => {
    const result = evaluateRatioAttempt({
      h2Slm: 20,
      precursorSccm: 200,
      submittedRatio: 100.5,
      explanation: "20 slm is 20000 sccm, so the ratio is about 100 to 1."
    });

    expect(result.correct).toBe(true);
  });

  it("rejects an answer that skips unit conversion", () => {
    const result = evaluateRatioAttempt({
      h2Slm: 20,
      precursorSccm: 200,
      submittedRatio: 0.1,
      explanation: "I divided without converting units."
    });

    expect(result.correct).toBe(false);
  });
});
