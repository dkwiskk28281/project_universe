import { z } from "zod";

export const ratioAttemptSchema = z.object({
  h2Slm: z.number().positive().max(1000),
  precursorSccm: z.number().positive().max(100000),
  submittedRatio: z.number().positive().max(100000),
  explanation: z.string().min(5).max(1000)
});

export type RatioAttempt = z.infer<typeof ratioAttemptSchema>;

export function calculateGasRatio(h2Slm: number, precursorSccm: number): number {
  const h2Sccm = h2Slm * 1000;
  return h2Sccm / precursorSccm;
}

export function evaluateRatioAttempt(attempt: RatioAttempt): {
  correct: boolean;
  expectedRatio: number;
  feedback: string;
} {
  const expectedRatio = calculateGasRatio(attempt.h2Slm, attempt.precursorSccm);
  const tolerance = Math.max(0.02, expectedRatio * 0.02);
  const correct = Math.abs(attempt.submittedRatio - expectedRatio) <= tolerance;
  return {
    correct,
    expectedRatio,
    feedback: correct
      ? "좋습니다. 단위 통일 후 비율을 계산했습니다. 실제 장비 recipe가 아닌 교육용 가상값이라는 경계도 유지하세요."
      : `먼저 ${attempt.h2Slm} slm을 ${attempt.h2Slm * 1000} sccm으로 바꾼 뒤 ${attempt.precursorSccm} sccm과 비교하세요.`
  };
}
