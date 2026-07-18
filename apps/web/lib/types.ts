export type KnowledgeDomain =
  | "math"
  | "physics"
  | "chemistry"
  | "materials"
  | "semiconductor"
  | "epi"
  | "statistics"
  | "python"
  | "english"
  | "research";

export type KnowledgeNode = {
  id: string;
  slug: string;
  titleKo: string;
  titleEn: string;
  domain: KnowledgeDomain;
  level: number;
  prerequisites: string[];
  learningObjectives: string[];
  estimatedMinutes: number;
  masteryThreshold: number;
  theoryWeight: number;
  practiceWeight: number;
  applicationWeight: number;
  tags: string[];
};

export type MasteryState = {
  userId: string;
  nodeId: string;
  masteryScore: number;
  confidenceScore: number;
  retentionScore: number;
  applicationScore: number;
  lastPracticedAt: string;
  nextReviewAt: string;
  attempts: number;
  correctAttempts: number;
  hintUsageRate: number;
};

export type DiagnosticAnswer = {
  questionId: string;
  nodeId: string;
  correct: boolean;
  confidence: 1 | 2 | 3 | 4 | 5;
  secondsSpent: number;
  hintsUsed: number;
  explanationQuality: 0 | 1 | 2 | 3;
  answeredAt: string;
};

export type ExerciseAttemptInput = {
  nodeId: string;
  correct: boolean;
  confidence: 1 | 2 | 3 | 4 | 5;
  secondsSpent: number;
  hintsUsed: number;
  explanationQuality: 0 | 1 | 2 | 3;
  applicationCorrect: boolean;
};

export type ReviewItem = {
  id: string;
  userId: string;
  nodeId: string;
  prompt: string;
  cardType: "short-answer" | "fill-blank" | "order" | "graph" | "match" | "formula" | "unit" | "explain" | "case";
  dueAt: string;
  intervalDays: number;
  priority: number;
};

export type TutorResponse = {
  intent: "explain" | "hint" | "quiz" | "review" | "plan";
  learnerLevel: string;
  prerequisiteGaps: string[];
  explanation: {
    shortSummary: string;
    steps: {
      title: string;
      content: string;
    }[];
    analogy?: string;
    engineeringExample?: string;
    epiExample?: string;
  };
  checkForUnderstanding: {
    question: string;
    expectedConcept: string;
  };
  nextAction: {
    type: "practice" | "review" | "lesson" | "simulation";
    targetId: string;
  };
};
