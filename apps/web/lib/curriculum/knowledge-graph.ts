import type { KnowledgeNode } from "@/lib/types";

export const knowledgeNodes: KnowledgeNode[] = [
  node("math-positive-negative", "positive-negative", "양수와 음수", "Positive and negative numbers", "math", 0, [], ["온도 보정값과 pressure delta처럼 방향이 있는 수를 읽는다."], ["math", "survival"]),
  node("math-fractions", "fractions", "분수", "Fractions", "math", 0, ["math-positive-negative"], ["부분과 전체를 분수로 표현한다."], ["math", "ratio"]),
  node("math-decimals-percent", "decimals-percent", "소수와 백분율", "Decimals and percentages", "math", 0, ["math-fractions"], ["percent를 decimal과 fraction으로 바꾼다."], ["math", "percent"]),
  node("math-ratio", "ratio", "비율", "Ratio", "math", 1, ["math-fractions", "math-decimals-percent"], ["두 양을 같은 단위로 맞춘 뒤 비율을 구한다."], ["math", "gas-flow", "epi"]),
  node("eng-unit-conversion", "unit-conversion", "단위 환산", "Unit conversion", "math", 1, ["math-ratio"], ["slm, sccm, Torr, Pa, nm, um를 안전하게 환산한다."], ["unit", "engineering"]),
  node("chem-concentration", "concentration", "농도", "Concentration", "chemistry", 2, ["math-ratio", "eng-unit-conversion"], ["농도와 유량비를 구분한다."], ["chemistry", "gas"]),
  node("epi-gas-ratio", "epi-gas-ratio", "EPI 가스 유량 비율", "EPI gas flow ratio", "epi", 2, ["math-ratio", "eng-unit-conversion", "chem-concentration"], ["교육용 가상 유량으로 gas ratio를 계산하고 recipe가 아님을 설명한다."], ["epi", "gas-flow"]),
  node("math-linear-equation", "linear-equation", "일차방정식", "Linear equation", "math", 1, ["math-ratio"], ["모르는 공정 값을 x로 두고 계산한다."], ["math", "algebra"]),
  node("math-coordinate-graph", "coordinate-graph", "좌표와 그래프", "Coordinates and graphs", "math", 1, ["math-linear-equation"], ["축, 단위, baseline, change point를 읽는다."], ["graph", "trend"]),
  node("math-slope", "slope", "기울기", "Slope", "math", 2, ["math-coordinate-graph"], ["성장률, 온도 ramp, drift rate를 변화율로 해석한다."], ["graph", "growth-rate"]),
  node("math-function", "function", "함수", "Function", "math", 2, ["math-slope"], ["입력과 출력 관계를 공정 parameter/result로 연결한다."], ["function"]),
  node("math-exponential", "exponential", "지수함수", "Exponential function", "math", 3, ["math-function"], ["빠르게 변하는 반응 관계를 지수로 해석한다."], ["arrhenius"]),
  node("math-log", "logarithm", "로그", "Logarithm", "math", 3, ["math-exponential"], ["넓은 데이터 범위를 log scale로 읽는다."], ["arrhenius", "plot"]),
  node("math-derivative", "derivative", "미분", "Derivative", "math", 4, ["math-function", "math-slope"], ["조건 변화에 대한 결과 민감도를 설명한다."], ["calculus"]),
  node("math-integral", "integral", "적분", "Integral", "math", 4, ["math-derivative"], ["시간에 따른 누적 증착량과 thermal budget을 이해한다."], ["calculus", "thermal-budget"]),
  node("stats-mean-std", "mean-standard-deviation", "평균과 표준편차", "Mean and standard deviation", "statistics", 2, ["math-ratio"], ["wafer thickness average와 uniformity를 계산한다."], ["statistics", "uniformity"]),
  node("stats-normal-spc", "normal-spc", "정규분포와 SPC", "Normal distribution and SPC", "statistics", 3, ["stats-mean-std"], ["공정 분포와 control chart를 읽는다."], ["spc"]),
  node("stats-cpk", "cp-cpk", "Cp/Cpk", "Cp and Cpk", "statistics", 4, ["stats-normal-spc"], ["spec과 공정 중심/분산을 연결한다."], ["spc", "capability"]),
  node("python-csv", "python-csv", "Python CSV 분석", "Python CSV analysis", "python", 3, ["stats-mean-std"], ["CSV를 읽고 평균/표준편차를 계산하는 코드를 이해한다."], ["python", "pandas"]),
  node("chem-atomic-bonding", "atomic-bonding", "원자와 결합", "Atomic bonding", "chemistry", 2, ["math-ratio"], ["Si 공유결합과 결정성의 출발점을 설명한다."], ["chemistry", "silicon"]),
  node("materials-crystal", "crystal-structure", "결정구조", "Crystal structure", "materials", 3, ["chem-atomic-bonding"], ["lattice, basis, unit cell을 설명한다."], ["crystal"]),
  node("materials-defect", "crystal-defects", "결정 결함", "Crystal defects", "materials", 3, ["materials-crystal"], ["point defect, dislocation, stacking fault를 구분한다."], ["defect", "epi"]),
  node("materials-diffusion", "diffusion", "확산", "Diffusion", "materials", 4, ["math-exponential", "materials-defect"], ["농도 구배와 온도에 따른 원자 이동을 설명한다."], ["diffusion", "dopant"]),
  node("semi-pn-mos", "pn-mos", "PN 접합과 MOS", "PN junction and MOS", "semiconductor", 5, ["materials-crystal", "chem-atomic-bonding"], ["carrier, doping, electric field를 소자 관점으로 설명한다."], ["device"]),
  node("epi-transport-kinetics", "epi-transport-kinetics", "EPI 수송과 반응속도", "EPI transport and kinetics", "epi", 6, ["epi-gas-ratio", "math-log", "materials-diffusion"], ["growth-rate regime을 mass transport와 surface reaction으로 나눈다."], ["epi", "kinetics"]),
  node("research-paper-reading", "paper-reading", "논문 읽기", "Research paper reading", "research", 6, ["math-log", "materials-crystal"], ["abstract, figure, method, limitation을 분해한다."], ["research", "english"])
];

export function getNode(nodeId: string): KnowledgeNode {
  const found = knowledgeNodes.find((item) => item.id === nodeId);
  if (!found) throw new Error(`Unknown knowledge node: ${nodeId}`);
  return found;
}

export function prerequisiteClosure(nodeId: string): KnowledgeNode[] {
  const visited = new Set<string>();
  const ordered: KnowledgeNode[] = [];
  const visit = (id: string) => {
    if (visited.has(id)) return;
    visited.add(id);
    const current = getNode(id);
    current.prerequisites.forEach(visit);
    if (id !== nodeId) ordered.push(current);
  };
  visit(nodeId);
  return ordered;
}

export function unresolvedPrerequisites(nodeId: string, masteryByNode: Record<string, number>): KnowledgeNode[] {
  return prerequisiteClosure(nodeId).filter((nodeItem) => (masteryByNode[nodeItem.id] ?? 0) < nodeItem.masteryThreshold);
}

function node(
  id: string,
  slug: string,
  titleKo: string,
  titleEn: string,
  domain: KnowledgeNode["domain"],
  level: number,
  prerequisites: string[],
  learningObjectives: string[],
  tags: string[]
): KnowledgeNode {
  return {
    id,
    slug,
    titleKo,
    titleEn,
    domain,
    level,
    prerequisites,
    learningObjectives,
    estimatedMinutes: Math.max(15, 12 + level * 6),
    masteryThreshold: level <= 1 ? 70 : 75,
    theoryWeight: level <= 1 ? 0.25 : 0.35,
    practiceWeight: level <= 1 ? 0.45 : 0.35,
    applicationWeight: level <= 1 ? 0.3 : 0.3,
    tags
  };
}
