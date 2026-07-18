export type LessonBlock = {
  kind: "concept" | "visual" | "practice" | "epi-bridge" | "reflection";
  title: string;
  body: string;
};

export type Lesson = {
  id: string;
  courseSlug: string;
  nodeId: string;
  title: string;
  estimatedMinutes: number;
  blocks: LessonBlock[];
  masteryEvidence: string[];
};

export const ratioGasFlowLesson: Lesson = {
  id: "lesson-ratio-gas-flow",
  courseSlug: "math-for-epi",
  nodeId: "epi-gas-ratio",
  title: "비율과 가스 유량: H2와 precursor를 같은 단위로 보기",
  estimatedMinutes: 30,
  blocks: [
    {
      kind: "concept",
      title: "현상 먼저",
      body: "비율은 두 양을 비교하는 언어입니다. 장비 화면에서 H2는 slm, precursor는 sccm처럼 다른 단위로 보일 수 있으므로 먼저 같은 단위로 맞춥니다."
    },
    {
      kind: "visual",
      title: "그림으로 보기",
      body: "큰 carrier gas 흐름 위에 작은 precursor 흐름이 얹힌다고 생각합니다. 숫자는 다르지만 단위를 맞춰야 실제 크기를 비교할 수 있습니다."
    },
    {
      kind: "practice",
      title: "교육용 가상 계산",
      body: "H2 20 slm은 20,000 sccm입니다. precursor 200 sccm과 비교하면 20,000:200 = 100:1입니다."
    },
    {
      kind: "epi-bridge",
      title: "EPI 연결",
      body: "이 값은 특정 장비 recipe가 아니라 교육용 숫자입니다. 실제 업무에서는 recipe, gas matrix, setpoint, acceptance limit을 공식 문서와 승인 절차로만 다룹니다."
    },
    {
      kind: "reflection",
      title: "내 말 설명",
      body: "비율 계산을 설명할 때는 '단위 통일 -> 비교 -> 약분 -> 의미 해석' 순서로 말합니다."
    }
  ],
  masteryEvidence: [
    "slm과 sccm을 변환할 수 있다.",
    "carrier와 precursor 유량비를 계산할 수 있다.",
    "교육용 예시와 실제 recipe를 구분해 말할 수 있다."
  ]
};

export const mvpLessons: Lesson[] = [
  ratioGasFlowLesson,
  {
    id: "lesson-unit-conversion",
    courseSlug: "math-for-epi",
    nodeId: "eng-unit-conversion",
    title: "단위 환산 생존력",
    estimatedMinutes: 25,
    blocks: [
      { kind: "concept", title: "단위는 안전장치", body: "계산 숫자가 맞아 보여도 단위가 틀리면 공학적으로 틀린 답입니다." },
      { kind: "practice", title: "nm, um, m", body: "1 nm = 10^-9 m, 1 um = 10^-6 m입니다." },
      { kind: "epi-bridge", title: "박막 두께", body: "EPI layer thickness와 metrology report를 읽을 때 단위 감각이 필요합니다." }
    ],
    masteryEvidence: ["metric prefix를 설명한다.", "두께 단위를 변환한다.", "계산 결과의 단위를 검증한다."]
  },
  {
    id: "lesson-fractions-percent",
    courseSlug: "math-for-epi",
    nodeId: "math-decimals-percent",
    title: "분수, 소수, 백분율을 같은 언어로 보기",
    estimatedMinutes: 25,
    blocks: [
      { kind: "concept", title: "한 가지 양을 세 가지 표기로", body: "1/100, 0.01, 1%는 같은 뜻입니다. 표기가 달라져도 실제 양은 변하지 않습니다." },
      { kind: "visual", title: "wafer map 비유", body: "100개 die 중 1개가 fail이면 1/100, 0.01, 1%로 모두 표현할 수 있습니다." },
      { kind: "epi-bridge", title: "yield와 defect density", body: "불량률, particle rate, uniformity spec을 읽을 때 백분율 감각이 먼저 필요합니다." }
    ],
    masteryEvidence: ["분수-소수-백분율을 변환한다.", "현장 지표를 percent로 해석한다.", "작은 비율을 과장하지 않고 말한다."]
  },
  {
    id: "lesson-graph-slope",
    courseSlug: "math-for-epi",
    nodeId: "math-slope",
    title: "그래프와 기울기: drift를 눈으로 잡기",
    estimatedMinutes: 30,
    blocks: [
      { kind: "concept", title: "그래프는 시간의 기록", body: "x축은 대개 시간이나 조건, y축은 측정값입니다. 먼저 축과 단위를 읽은 뒤 변화 방향을 봅니다." },
      { kind: "practice", title: "기울기", body: "기울기는 y 변화량을 x 변화량으로 나눈 값입니다. 온도 ramp, pressure drift, growth-rate drift를 읽는 언어입니다." },
      { kind: "epi-bridge", title: "trend chart", body: "설치 후 baseline wafer 결과가 서서히 변하면 sudden issue와 slow drift를 분리해서 가설을 세웁니다." }
    ],
    masteryEvidence: ["축과 단위를 먼저 읽는다.", "기울기를 변화율로 설명한다.", "drift와 step change를 구분한다."]
  },
  {
    id: "lesson-exponential-log",
    courseSlug: "math-for-epi",
    nodeId: "math-log",
    title: "지수와 로그: Arrhenius plot의 입구",
    estimatedMinutes: 35,
    blocks: [
      { kind: "concept", title: "빠르게 변하는 관계", body: "온도에 따른 반응속도처럼 작은 조건 변화가 큰 결과 차이를 만들 때 지수 관계가 등장합니다." },
      { kind: "visual", title: "로그 스케일", body: "값의 범위가 너무 넓을 때 로그는 숫자를 접어서 한 화면에 보이게 합니다." },
      { kind: "epi-bridge", title: "growth-rate analysis", body: "Arrhenius 형태의 해석은 온도와 반응속도의 관계를 이해하는 기초입니다. 실제 recipe 값은 다루지 않습니다." }
    ],
    masteryEvidence: ["지수 증가를 말로 설명한다.", "로그 축의 의미를 설명한다.", "온도-반응속도 관계의 큰 그림을 말한다."]
  },
  {
    id: "lesson-mean-uniformity",
    courseSlug: "statistics-for-epi",
    nodeId: "stats-mean-std",
    title: "평균과 표준편차: wafer uniformity 읽기",
    estimatedMinutes: 30,
    blocks: [
      { kind: "concept", title: "평균", body: "평균은 여러 측정값의 중심입니다. 단, 중심만 보면 edge 문제가 숨을 수 있습니다." },
      { kind: "practice", title: "표준편차", body: "표준편차는 값들이 평균에서 얼마나 퍼져 있는지 보여줍니다." },
      { kind: "epi-bridge", title: "metrology report", body: "EPI thickness, dopant, Rs 결과를 볼 때 평균과 산포를 함께 봅니다." }
    ],
    masteryEvidence: ["평균과 산포를 구분한다.", "wafer 결과를 center/edge 관점으로 읽는다.", "측정 신뢰성 질문을 할 수 있다."]
  },
  {
    id: "lesson-atomic-bonding",
    courseSlug: "materials-foundation",
    nodeId: "chem-atomic-bonding",
    title: "원자와 결합: Si 결정의 출발점",
    estimatedMinutes: 35,
    blocks: [
      { kind: "concept", title: "원자는 왜 붙는가", body: "원자는 전자 배치를 안정하게 만들기 위해 결합합니다. Si는 공유결합 네트워크를 이룹니다." },
      { kind: "visual", title: "결정성", body: "같은 패턴이 3차원으로 반복되면 crystal structure가 됩니다." },
      { kind: "epi-bridge", title: "epitaxial alignment", body: "EPI는 기존 wafer 결정 방향을 따라 새 결정층이 자라는 것이 핵심입니다." }
    ],
    masteryEvidence: ["공유결합을 쉬운 말로 설명한다.", "결정성의 의미를 말한다.", "EPI가 '막을 붙이는 것' 이상임을 설명한다."]
  },
  {
    id: "lesson-crystal-defects",
    courseSlug: "materials-foundation",
    nodeId: "materials-defect",
    title: "결정 결함: particle과 defect를 구분하는 시작",
    estimatedMinutes: 35,
    blocks: [
      { kind: "concept", title: "완벽한 결정은 드물다", body: "원자 하나가 빠지거나, 줄이 어긋나거나, 면이 어긋나는 방식으로 결함이 생깁니다." },
      { kind: "practice", title: "분류", body: "point defect, dislocation, stacking fault는 크기와 원인이 다릅니다." },
      { kind: "epi-bridge", title: "troubleshooting", body: "표면 particle, haze, stacking fault는 같은 '불량'처럼 보여도 가설과 evidence가 다릅니다." }
    ],
    masteryEvidence: ["결함 유형을 구분한다.", "결함과 오염을 분리해 사고한다.", "현상-원인-evidence 구조로 말한다."]
  },
  {
    id: "lesson-epi-transport-kinetics",
    courseSlug: "epi-foundation",
    nodeId: "epi-transport-kinetics",
    title: "EPI 수송과 표면반응: growth-rate regime",
    estimatedMinutes: 40,
    blocks: [
      { kind: "concept", title: "가스가 와서 바로 막이 되는 것은 아니다", body: "분자는 챔버로 들어오고, wafer 근처로 이동하고, 표면에 흡착하고, 분해/반응한 뒤 부산물은 빠져나갑니다." },
      { kind: "visual", title: "두 병목", body: "mass transport가 느리면 공급이 병목이고, surface reaction이 느리면 표면 반응이 병목입니다." },
      { kind: "epi-bridge", title: "공정 사고", body: "temperature, pressure, flow 변화가 결과에 미치는 방향을 regime 관점으로 추론합니다. 실제 recipe sequence는 제외합니다." }
    ],
    masteryEvidence: ["mass transport와 surface reaction을 구분한다.", "growth-rate 병목을 말로 설명한다.", "위험한 비공개 조건을 요구하지 않는다."]
  },
  {
    id: "lesson-diffusion-dopant",
    courseSlug: "materials-foundation",
    nodeId: "materials-diffusion",
    title: "확산과 dopant profile: 원자가 움직이는 이유",
    estimatedMinutes: 35,
    blocks: [
      { kind: "concept", title: "농도 차이와 온도", body: "원자는 농도 차이와 열에너지에 의해 이동할 수 있습니다." },
      { kind: "visual", title: "profile", body: "시간과 온도는 dopant 분포의 폭과 깊이에 영향을 줍니다." },
      { kind: "epi-bridge", title: "thermal budget", body: "EPI와 RTP에서 열 이력은 dopant movement와 defect risk를 이해하는 열쇠입니다." }
    ],
    masteryEvidence: ["확산을 농도 구배로 설명한다.", "온도와 시간의 영향을 말한다.", "thermal budget과 연결한다."]
  },
  {
    id: "lesson-paper-reading",
    courseSlug: "research-readiness",
    nodeId: "research-paper-reading",
    title: "논문 읽기: abstract와 figure부터 해부하기",
    estimatedMinutes: 30,
    blocks: [
      { kind: "concept", title: "논문은 순서대로 읽지 않아도 된다", body: "처음에는 abstract, figure, conclusion, method limitation 순서로 큰 그림을 잡습니다." },
      { kind: "practice", title: "한 문장 요약", body: "각 figure가 무엇을 주장하는지 한 문장으로 요약합니다." },
      { kind: "epi-bridge", title: "PSE/Fellow 경로", body: "현장 문제를 논문과 특허의 언어로 연결할 수 있어야 글로벌 기술 영향력이 생깁니다." }
    ],
    masteryEvidence: ["abstract 핵심을 요약한다.", "figure caption을 해석한다.", "한계와 다음 실험을 적는다."]
  }
];
