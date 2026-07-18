import { describe, expect, it } from "vitest";
import { initialMastery } from "@/lib/mastery/mastery-engine";
import { scheduleReview } from "@/lib/review/review-scheduler";

describe("review scheduler", () => {
  it("prioritizes weak concepts sooner", () => {
    const weak = { ...initialMastery("u1", "epi-gas-ratio"), masteryScore: 35 };
    const review = scheduleReview("u1", weak);

    expect(review.intervalDays).toBe(1);
    expect(review.priority).toBe(1);
    expect(review.cardType).toBe("unit");
  });

  it("spaces stronger concepts farther apart", () => {
    const strong = { ...initialMastery("u1", "math-slope"), masteryScore: 82 };
    const review = scheduleReview("u1", strong);

    expect(review.intervalDays).toBe(7);
    expect(review.priority).toBe(2);
  });
});
