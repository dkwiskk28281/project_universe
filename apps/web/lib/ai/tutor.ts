import { z } from "zod";
import type { TutorResponse } from "@/lib/types";

export const tutorRequestSchema = z.object({
  nodeId: z.string().min(1),
  userMessage: z.string().min(1).max(2000),
  learnerLevel: z.string().default("math-anxious-field-engineer"),
  mode: z.enum(["beginner", "visual", "socratic", "coach", "professor", "field-engineer", "english", "interviewer", "research", "pse"]).default("beginner")
});

export const tutorResponseSchema = z.object({
  intent: z.enum(["explain", "hint", "quiz", "review", "plan"]),
  learnerLevel: z.string(),
  prerequisiteGaps: z.array(z.string()),
  explanation: z.object({
    shortSummary: z.string(),
    steps: z.array(z.object({ title: z.string(), content: z.string() })),
    analogy: z.string().optional(),
    engineeringExample: z.string().optional(),
    epiExample: z.string().optional()
  }),
  checkForUnderstanding: z.object({
    question: z.string(),
    expectedConcept: z.string()
  }),
  nextAction: z.object({
    type: z.enum(["practice", "review", "lesson", "simulation"]),
    targetId: z.string()
  })
});

export type TutorRequest = z.infer<typeof tutorRequestSchema>;

export function mockTutorResponse(request: TutorRequest): TutorResponse {
  const base: TutorResponse = {
    intent: "explain",
    learnerLevel: request.learnerLevel,
    prerequisiteGaps: request.nodeId === "epi-gas-ratio" ? ["단위 환산", "비율 약분"] : [],
    explanation: {
      shortSummary: "비율은 두 값을 같은 단위로 맞춘 뒤 비교하는 기술입니다.",
      steps: [
        { title: "1. 단위를 맞춘다", content: "slm과 sccm이 섞여 있으면 먼저 둘 다 sccm으로 바꿉니다." },
        { title: "2. 나란히 비교한다", content: "20 slm은 20,000 sccm이고 precursor는 200 sccm입니다." },
        { title: "3. 약분한다", content: "20,000:200은 100:1입니다." },
        { title: "4. 안전 경계를 말한다", content: "이 숫자는 교육용 가상값이며 실제 recipe나 setpoint가 아닙니다." }
      ],
      analogy: "큰 물줄기 위에 작은 잉크 한 방울을 섞는다고 생각하면 carrier와 precursor 비율이 직관적으로 보입니다.",
      engineeringExample: "단위가 다르면 압력, 유량, 두께 계산이 모두 잘못될 수 있습니다.",
      epiExample: "EPI에서는 gas ratio를 이해하되 실제 recipe 조건은 공식 문서와 승인 절차로만 다룹니다."
    },
    checkForUnderstanding: {
      question: "1 slm = 1000 sccm일 때 5 slm과 50 sccm의 비율은 무엇인가요?",
      expectedConcept: "5 slm = 5000 sccm, 5000:50 = 100:1"
    },
    nextAction: {
      type: "simulation",
      targetId: "lab-ratio-gas-flow"
    }
  };
  if (request.mode === "socratic") {
    return {
      ...base,
      explanation: {
        ...base.explanation,
        shortSummary: "바로 답을 보지 말고 먼저 '두 값의 단위가 같은가?'를 물어봅시다.",
        steps: [
          { title: "질문 1", content: "H2와 precursor는 같은 단위로 적혀 있나요?" },
          { title: "질문 2", content: "다른 단위라면 무엇을 기준 단위로 고를까요?" },
          { title: "질문 3", content: "둘 다 sccm으로 바꾼 뒤 큰 값과 작은 값의 비율은?" }
        ]
      }
    };
  }
  return base;
}
