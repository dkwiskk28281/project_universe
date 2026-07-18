import { describe, expect, it } from "vitest";
import { classifyMastery, initialMastery, updateMastery } from "@/lib/mastery/mastery-engine";

describe("mastery engine", () => {
  it("raises mastery when the learner answers correctly with evidence quality", () => {
    const initial = initialMastery("u1", "epi-gas-ratio");
    const updated = updateMastery(initial, {
      nodeId: "epi-gas-ratio",
      correct: true,
      confidence: 4,
      secondsSpent: 60,
      hintsUsed: 0,
      explanationQuality: 3,
      applicationCorrect: true
    });

    expect(updated.masteryScore).toBeGreaterThan(initial.masteryScore);
    expect(updated.correctAttempts).toBe(1);
    expect(updated.attempts).toBe(1);
    expect(updated.nextReviewAt).not.toBe(initial.nextReviewAt);
  });

  it("does not treat a slow hinted wrong attempt as mastery", () => {
    const initial = { ...initialMastery("u1", "math-ratio"), masteryScore: 65 };
    const updated = updateMastery(initial, {
      nodeId: "math-ratio",
      correct: false,
      confidence: 5,
      secondsSpent: 420,
      hintsUsed: 3,
      explanationQuality: 0,
      applicationCorrect: false
    });

    expect(updated.masteryScore).toBeLessThan(initial.masteryScore);
    expect(updated.correctAttempts).toBe(0);
  });

  it("classifies mastery bands", () => {
    expect(classifyMastery(0)).toBe("미학습");
    expect(classifyMastery(76)).toBe("실전 가능");
    expect(classifyMastery(96)).toBe("장기 기억 확인");
  });
});
