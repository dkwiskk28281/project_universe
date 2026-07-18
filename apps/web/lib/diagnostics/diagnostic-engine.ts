import { z } from "zod";
import type { DiagnosticAnswer } from "@/lib/types";

export const diagnosticAnswerSchema = z.object({
  questionId: z.string().min(1),
  nodeId: z.string().min(1),
  correct: z.boolean(),
  confidence: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
  secondsSpent: z.number().min(0).max(3600),
  hintsUsed: z.number().int().min(0).max(5),
  explanationQuality: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)]),
  answeredAt: z.string().datetime()
});

export type DiagnosticQuestion = {
  id: string;
  nodeId: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  prerequisiteIfMissed?: string;
};

export const ratioDiagnosticQuestions: DiagnosticQuestion[] = [
  {
    id: "diag-ratio-1",
    nodeId: "math-ratio",
    difficulty: 2,
    prompt: "200 sccm은 20,000 sccm의 몇 %인가?",
    options: ["0.1%", "1%", "10%", "100%"],
    correctIndex: 1,
    explanation: "200 / 20,000 = 0.01 = 1%입니다.",
    prerequisiteIfMissed: "math-decimals-percent"
  },
  {
    id: "diag-unit-1",
    nodeId: "eng-unit-conversion",
    difficulty: 2,
    prompt: "20 slm을 sccm으로 바꾸면?",
    options: ["20 sccm", "200 sccm", "2,000 sccm", "20,000 sccm"],
    correctIndex: 3,
    explanation: "1 slm = 1000 sccm이므로 20 slm = 20,000 sccm입니다.",
    prerequisiteIfMissed: "math-ratio"
  },
  {
    id: "diag-gas-ratio-1",
    nodeId: "epi-gas-ratio",
    difficulty: 3,
    prompt: "H2 20 slm, precursor 200 sccm일 때 같은 단위 기준 H2:precursor 비율은?",
    options: ["10:1", "20:1", "100:1", "1000:1"],
    correctIndex: 2,
    explanation: "20 slm = 20,000 sccm. 20,000:200 = 100:1입니다.",
    prerequisiteIfMissed: "eng-unit-conversion"
  }
];

export function evaluateChoice(question: DiagnosticQuestion, choiceIndex: number): boolean {
  return question.correctIndex === choiceIndex;
}

export function selectNextDiagnosticQuestion(answers: DiagnosticAnswer[]): DiagnosticQuestion | null {
  const answeredIds = new Set(answers.map((answer) => answer.questionId));
  const last = answers.at(-1);
  if (last && !last.correct) {
    const missed = ratioDiagnosticQuestions.find((question) => question.id === last.questionId);
    const prerequisite = ratioDiagnosticQuestions.find((question) => question.nodeId === missed?.prerequisiteIfMissed);
    if (prerequisite && !answeredIds.has(prerequisite.id)) return prerequisite;
  }
  return ratioDiagnosticQuestions.find((question) => !answeredIds.has(question.id)) ?? null;
}

export function estimateDiagnosticLevel(answers: DiagnosticAnswer[]): "foundation" | "ready-for-ratio" | "ready-for-epi-application" {
  const correct = answers.filter((answer) => answer.correct).length;
  const confidencePenalty = answers.filter((answer) => answer.correct && answer.confidence <= 2).length;
  const adjusted = correct - confidencePenalty * 0.5;
  if (adjusted >= 2.5) return "ready-for-epi-application";
  if (adjusted >= 1.5) return "ready-for-ratio";
  return "foundation";
}
