import type { ExerciseAttemptInput, MasteryState } from "@/lib/types";

export function classifyMastery(score: number): string {
  if (score < 20) return "미학습";
  if (score < 40) return "입문";
  if (score < 60) return "학습 중";
  if (score < 75) return "기본 이해";
  if (score < 85) return "실전 가능";
  if (score < 95) return "숙련";
  return "장기 기억 확인";
}

export function initialMastery(userId: string, nodeId: string): MasteryState {
  const now = new Date().toISOString();
  return {
    userId,
    nodeId,
    masteryScore: 0,
    confidenceScore: 0,
    retentionScore: 0,
    applicationScore: 0,
    lastPracticedAt: now,
    nextReviewAt: now,
    attempts: 0,
    correctAttempts: 0,
    hintUsageRate: 0
  };
}

export function updateMastery(previous: MasteryState, attempt: ExerciseAttemptInput): MasteryState {
  const attempts = previous.attempts + 1;
  const correctAttempts = previous.correctAttempts + (attempt.correct ? 1 : 0);
  const accuracy = correctAttempts / attempts;
  const confidenceCalibration = attempt.correct ? attempt.confidence * 20 : Math.max(0, 70 - attempt.confidence * 10);
  const hintPenalty = Math.min(35, attempt.hintsUsed * 8);
  const timePenalty = attempt.secondsSpent > 180 ? 8 : attempt.secondsSpent < 10 ? 5 : 0;
  const explanationScore = attempt.explanationQuality / 3 * 100;
  const applicationScore = attempt.applicationCorrect ? 100 : 35;
  const recentPerformance = (attempt.correct ? 100 : 20) - hintPenalty - timePenalty;
  const masteryScore = clamp(
    previous.masteryScore * 0.52 +
      recentPerformance * 0.22 +
      explanationScore * 0.12 +
      applicationScore * 0.1 +
      accuracy * 100 * 0.04
  );
  const nextReviewAt = computeNextReviewDate(masteryScore, attempt.correct, attempt.hintsUsed);
  return {
    ...previous,
    masteryScore,
    confidenceScore: clamp(previous.confidenceScore * 0.55 + confidenceCalibration * 0.45),
    retentionScore: clamp(previous.retentionScore * 0.55 + (attempt.correct ? masteryScore : 25) * 0.45),
    applicationScore: clamp(previous.applicationScore * 0.5 + applicationScore * 0.5),
    lastPracticedAt: new Date().toISOString(),
    nextReviewAt,
    attempts,
    correctAttempts,
    hintUsageRate: clamp(((previous.hintUsageRate / 100) * previous.attempts + Math.min(1, attempt.hintsUsed / 5)) / attempts * 100)
  };
}

function computeNextReviewDate(score: number, correct: boolean, hintsUsed: number): string {
  const days = !correct ? 1 : score >= 85 && hintsUsed === 0 ? 7 : score >= 70 ? 3 : 2;
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
}

function clamp(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}
