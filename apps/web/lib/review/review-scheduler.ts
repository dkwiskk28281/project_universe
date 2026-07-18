import type { MasteryState, ReviewItem } from "@/lib/types";
import { getNode } from "@/lib/curriculum/knowledge-graph";

export function scheduleReview(userId: string, mastery: MasteryState): ReviewItem {
  const node = getNode(mastery.nodeId);
  const weak = mastery.masteryScore < 60;
  const intervalDays = weak ? 1 : mastery.masteryScore < 80 ? 3 : 7;
  const dueAt = new Date(Date.now() + intervalDays * 24 * 60 * 60 * 1000).toISOString();
  return {
    id: `review-${mastery.nodeId}-${Date.now()}`,
    userId,
    nodeId: mastery.nodeId,
    prompt: buildPrompt(node.titleKo, node.tags),
    cardType: node.tags.includes("gas-flow") ? "unit" : node.tags.includes("graph") ? "graph" : "explain",
    dueAt,
    intervalDays,
    priority: weak ? 1 : 2
  };
}

function buildPrompt(title: string, tags: string[]): string {
  if (tags.includes("gas-flow")) return `${title}: H2 20 slm과 precursor 200 sccm을 같은 단위로 바꿔 비율을 설명하세요. 교육용 가상값임을 함께 말하세요.`;
  if (tags.includes("graph")) return `${title}: 그래프를 볼 때 축, 단위, baseline, slope 순서로 설명하세요.`;
  return `${title}: 개념을 한 문장으로 설명하고 EPI 현장 예시 하나를 붙이세요.`;
}
