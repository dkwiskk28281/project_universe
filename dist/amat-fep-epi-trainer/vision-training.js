(() => {
  const STORAGE_KEY = "projectUniverseVisionTrainingState";
  const SCHEMA_VERSION = "vision-function-recovery-v3";
  const SOURCE_VERSION = "vision-lab-fullscreen-evidence-20260720";

  const exerciseModes = {
    pursuit: {
      title: "대형 초록점 부드러운 추적",
      shortTitle: "추적",
      label: "Smooth pursuit",
      evidenceLevel: "안전 보조/증상 기록",
      tier: "core",
      minutes: 1,
      intensity: "low",
      subtitle: "전체 화면에 가까운 큰 초록점을 눈으로만 천천히 따라가며, 흐림·복시·회복 시간을 관찰합니다.",
      goal: "눈 움직임을 억지로 강화하기보다 피로할 때 조절이 무너지는 패턴을 알아차립니다.",
      how: ["턱과 머리를 고정합니다.", "점이 너무 빠르면 속도를 낮춥니다.", "둘로 보이면 즉시 정지하고 이완 모드로 전환합니다."],
      caution: "한쪽 눈 가림 추적은 전문가가 지시한 경우에만 사용하세요. patching은 수렴을 직접 강화하는 주 훈련으로 단정하지 않습니다.",
      evidence: "간헐외사시는 피로·주의 저하 때 드러날 수 있어, 언제 복시가 올라오는지 기록하는 것이 진료 대화에 도움이 됩니다."
    },
    saccade: {
      title: "좌우 타깃 빠른 전환",
      shortTitle: "전환",
      label: "Saccade",
      evidenceLevel: "보조 훈련",
      tier: "core",
      minutes: 1,
      intensity: "low",
      subtitle: "모니터 양끝의 큰 타깃을 번갈아 보며, 시선 전환 후 다시 하나로 잡히는 시간을 기록합니다.",
      goal: "현장/운전/모니터 작업처럼 시선을 옮긴 뒤 선명하게 다시 잡는 감각을 확인합니다.",
      how: ["왼쪽 타깃 2초, 오른쪽 타깃 2초.", "글자보다 중심점을 먼저 봅니다.", "복시가 2초 이상 지속되면 저장 후 중지합니다."],
      caution: "어지럽거나 두통이 생기면 반복 횟수를 늘리지 말고 멈추세요.",
      evidence: "시기능 훈련은 한 가지 운동보다 증상, 융합, 조절 반응을 함께 관찰하는 방식이 더 안전합니다."
    },
    "distance-reset": {
      title: "실제 원거리 60초 리셋",
      shortTitle: "원거리",
      label: "Real far reset",
      evidenceLevel: "실효성 핵심",
      tier: "core",
      minutes: 1,
      intensity: "reset",
      subtitle: "모니터 안의 먼 곳이 아니라, 화면에서 눈을 떼고 창밖이나 6m 이상 실제 물체를 봅니다.",
      goal: "모니터가 만들 수 없는 실제 원거리 이완을 세션에 강제로 넣어 과훈련과 수렴 긴장을 줄입니다.",
      how: ["전체화면 모드로 시작합니다.", "타이머가 켜지면 화면을 보지 말고 창밖/방 끝 물체를 봅니다.", "복시·두통이 줄어드는 시간을 기록합니다."],
      caution: "원거리 리셋은 화면을 보는 훈련이 아닙니다. 운전 전이나 계단 이동 중에는 하지 마세요.",
      evidence: "NHS convergence exercise guidance는 운동 후 눈 감기 또는 창밖 같은 실제 먼 곳 보기를 운동만큼 중요하게 안내합니다."
    },
    "near-far": {
      title: "근거리-실제 원거리 전환",
      shortTitle: "근원거리",
      label: "Near to real far",
      evidenceLevel: "실제 원거리 포함",
      tier: "core",
      minutes: 1,
      intensity: "medium",
      subtitle: "화면 중앙의 큰 근거리 타깃을 본 뒤, 안내가 뜨면 실제 창밖/6m 이상 물체로 시선을 옮깁니다.",
      goal: "가까운 작업 뒤 눈이 바깥으로 풀리거나 복시가 올라오는지, 실제 원거리 전환에서 회복되는지 기록합니다.",
      how: ["화면 중앙 타깃을 5초 봅니다.", "LOOK AWAY 신호가 뜨면 실제 먼 물체를 20초 봅니다.", "다시 화면으로 돌아왔을 때 하나로 잡히는지 기록합니다."],
      caution: "모니터 안의 FAR 표시는 실제 원거리 초점이 아닙니다. 이 모드는 반드시 화면 밖 실제 먼 물체를 함께 사용합니다.",
      evidence: "AAPOS는 수렴부전에서 가까운 작업 증상이 있으면 전문 평가 후 convergence exercise가 처방될 수 있다고 설명합니다."
    },
    fusion: {
      title: "두 눈 융합 홀드",
      shortTitle: "융합",
      label: "Fusion awareness",
      evidenceLevel: "개념/처방 보조",
      tier: "concept",
      minutes: 1,
      intensity: "medium",
      subtitle: "일반 모니터는 VR/프리즘처럼 양안 분리 자극을 만들 수 없으므로, 융합 개념과 중지 시점만 학습합니다.",
      goal: "fusion reserve라는 개념을 몸으로 이해하고, 억지로 버티기보다 깨지는 시점을 알아차립니다.",
      how: ["중앙의 선명한 링을 봅니다.", "둘로 갈라지면 바로 정지합니다.", "회복까지 걸린 시간을 메모합니다."],
      caution: "red/green filter, prism, anti-suppression, occlusion protocol은 처방 없이 따라 하지 않습니다.",
      evidence: "간헐외사시 비수술 치료 목표는 suppression 인식, diplopia 감지, fusion reserve 형성으로 설명되지만 연구 결과는 혼합적입니다."
    },
    "convergence-ladder": {
      title: "수렴 사다리 단계 훈련",
      shortTitle: "수렴",
      label: "Convergence ladder",
      evidenceLevel: "처방 확인 권장",
      tier: "prescribed",
      minutes: 1,
      intensity: "medium",
      subtitle: "가운데 목표가 단계적으로 가까워지는 것처럼 커졌다 작아지며, 복시 없이 따라갈 수 있는 안전 범위를 찾습니다.",
      goal: "near point of convergence처럼 '어디서 깨지는지'를 정밀히 말할 수 있게 훈련합니다.",
      how: ["가장 편한 단계에서 시작합니다.", "작게 보일 때도 하나로 유지되는지 봅니다.", "깨지는 단계 번호를 기록합니다."],
      caution: "복시가 강해지는 단계를 밀어붙이지 마세요. NPC 측정과 처방은 orthoptist/안과 평가가 우선입니다.",
      evidence: "수렴 관련 훈련은 수렴부전에서 더 많이 연구되었고, 간헐외사시에서는 subtype과 개인 반응 확인이 중요합니다."
    },
    "break-recovery": {
      title: "복시 인지-회복 리셋",
      shortTitle: "회복",
      label: "Break/recovery",
      evidenceLevel: "기록/자각 훈련",
      tier: "core",
      minutes: 1,
      intensity: "low",
      subtitle: "일부러 무리하지 않고, 둘로 보일 때 멈추고 먼 곳 보기로 회복되는 시간을 기록합니다.",
      goal: "실패가 아니라 stop condition을 빨리 알아차리는 능력을 키웁니다.",
      how: ["복시가 나타나는 순간 정지합니다.", "먼 곳 또는 눈 감기로 20초 쉽니다.", "회복 시간을 기록합니다."],
      caution: "새로 생긴 지속 복시나 신경학적 증상이 있으면 훈련 앱이 아니라 진료가 우선입니다.",
      evidence: "증상이 반복되거나 악화되면 운동을 늘리는 대신 전문 평가로 원인을 확인해야 합니다."
    },
    rest: {
      title: "이완과 원거리 리셋",
      shortTitle: "휴식",
      label: "Relaxation",
      evidenceLevel: "안전 루틴",
      tier: "core",
      minutes: 1,
      intensity: "reset",
      subtitle: "먼 곳 보기와 눈 감기로 과훈련을 피하고, 복시가 줄어드는지 조용히 기록합니다.",
      goal: "시기능 훈련의 목적은 오래 버티기가 아니라 안정 상태로 돌아오는 능력을 지키는 것입니다.",
      how: ["20초 이상 먼 곳을 봅니다.", "호흡을 천천히 합니다.", "복시/두통/어지럼이 남으면 오늘 훈련을 종료합니다."],
      caution: "불편감이 올라가면 즉시 멈추세요. 오래 버티는 것이 좋은 훈련은 아닙니다.",
      evidence: "NHS orthoptic guidance는 운동 뒤 relaxation과 과훈련 회피를 강조합니다."
    }
  };

  const stopSignals = [
    "새로 생긴 지속 복시 또는 평소와 다른 복시",
    "갑작스러운 시력저하, 시야 이상, 눈 통증",
    "심한 두통, 심한 어지럼, 메스꺼움",
    "눈꺼풀 처짐, 말이 어눌함, 한쪽 힘 빠짐 같은 신경학적 증상",
    "훈련 후 복시가 오래 지속되거나 일상 조절이 악화됨",
    "최근 수술/외상/염증 이후 담당의 승인 없이 훈련하려는 경우"
  ];

  const publicSources = [
    {
      title: "JAMA Network Open 2026 VR-based Vision Therapy RCT",
      url: "https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2846022",
      tag: "2026 RCT",
      summary: "177명의 소아 IXT RCT에서 VR 기반 훈련이 12주 거리 control score 변화에 관찰군보다 유리했고, 순응도 75% 초과군에서 효과가 더 컸습니다.",
      appUse: "일반 모니터가 VR/dichoptic 자극을 대체한다고 말하지 않고, 몰입도·큰 타깃·순응도·기록 구조만 반영했습니다."
    },
    {
      title: "AAPOS Convergence Insufficiency",
      url: "https://aapos.org/glossary/convergence-insufficiency",
      tag: "공식 환자교육",
      summary: "수렴부전 진단에는 NPC, fusional vergence amplitude, prism 측정 등이 필요하고, 증상이 있을 때 전문가가 convergence exercise를 처방할 수 있다고 설명합니다.",
      appUse: "자가진단 대신 증상·복시·회복시간 기록과 전문가 질문 packet을 만들었습니다."
    },
    {
      title: "BMC Ophthalmology 2024 IXT Non-surgical Treatment NMA",
      url: "https://link.springer.com/article/10.1186/s12886-024-03804-z",
      tag: "2024 RCT 종합",
      summary: "간헐외사시 비수술 치료의 효과는 치료법과 지표별로 혼합적이며, 개인화가 필요하다고 정리합니다.",
      appUse: "앱 문구를 '회복 보장'이 아니라 '선택된 운동·기록·중지판단 보조'로 제한했습니다."
    },
    {
      title: "Scientific Reports 2025 VR convergence game RCT",
      url: "https://www.nature.com/articles/s41598-024-78088-w",
      tag: "게임형 훈련",
      summary: "수렴부전형 간헐외사시에서 VR 게임 기반 15분/일 훈련을 연구했고, 흥미와 순응도 문제를 개선하려는 접근입니다.",
      appUse: "작고 지루한 점 대신 큰 타깃, 모드별 피드백, 세션 저장을 넣었습니다."
    },
    {
      title: "Cochrane Intermittent Exotropia Review",
      url: "https://www.cochrane.org/evidence/CD003737_what-are-benefits-and-risks-different-treatments-intermittent-exotropia-eye-co-ordination-problem",
      tag: "근거 한계",
      summary: "간헐외사시 치료 근거는 아직 제한적이고 연구가 더 필요하다고 안내합니다.",
      appUse: "운동 강도 자동 상승 대신 stop condition과 진료 우선 경계를 강화했습니다."
    },
    {
      title: "WWL NHS Home Exercises to Improve Convergence Insufficiency",
      url: "https://www.wwl.nhs.uk/media/.leaflets/5fdb426abc4b08.13496553.pdf",
      tag: "원거리 이완",
      summary: "운동 후 눈을 감거나 창밖처럼 실제 먼 곳을 보는 것이 운동 자체만큼 중요하며, 피곤하거나 아플 때 과훈련하지 말라고 안내합니다.",
      appUse: "모니터 속 가짜 먼 곳 대신 실제 원거리 리셋 모드와 LOOK AWAY 신호를 추가했습니다."
    },
    {
      title: "University Hospitals Sussex NHS Orthoptic Exercises",
      url: "https://www.uhsussex.nhs.uk/resources/how-to-do-orthoptic-exercises/",
      tag: "임상 운동 안내",
      summary: "orthoptist 지시를 따르고 운동 뒤 relaxation을 하며 과훈련을 피하라고 안내합니다.",
      appUse: "모든 세션 후 이완/회복 체크와 휴식 모드를 넣었습니다."
    }
  ];

  const glossary = [
    ["IXT", "Intermittent exotropia. 간헐적으로 한 눈이 바깥쪽으로 나가는 상태입니다."],
    ["Diplopia", "복시. 하나의 물체가 둘로 보이는 느낌입니다."],
    ["Fusion", "두 눈 입력을 뇌가 하나의 선명한 상으로 합치는 기능입니다."],
    ["NPC", "Near point of convergence. 가까운 목표를 볼 때 두 눈이 함께 버틸 수 있는 가장 가까운 지점입니다."],
    ["Fusional vergence", "두 눈이 안쪽/바깥쪽으로 함께 움직이며 하나의 상을 유지하는 여유 능력입니다."],
    ["Stereoacuity", "양안 깊이 지각. 두 눈 정보로 깊이를 얼마나 정밀하게 느끼는지 보는 지표입니다."],
    ["Suppression", "복시를 피하려고 뇌가 한쪽 눈 입력을 약하게 쓰는 현상입니다. 전문가 평가가 필요합니다."],
    ["Orthoptist", "사시, 양안시, 눈운동 기능을 평가하고 훈련을 지도하는 전문가입니다."]
  ];

  const defaultState = {
    mode: "pursuit",
    running: false,
    seconds: 60,
    remaining: 60,
    speed: 0.55,
    fatigue: 2,
    diplopia: 1,
    headache: 0,
    recoverySeconds: 20,
    control: "single",
    symptomTiming: "normal",
    approvedMonocular: false,
    note: "",
    logs: [],
    remoteStatus: "로컬 저장 대기",
    lastCompletedMode: null,
    immersive: false
  };

  function escapeHtml(value = "") {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function uid() {
    if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
    return `vision-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function loadState() {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      return {
        ...defaultState,
        ...stored,
        logs: Array.isArray(stored.logs) ? stored.logs : [],
        remaining: Number(stored.remaining || stored.seconds || defaultState.seconds)
      };
    } catch {
      return { ...defaultState };
    }
  }

  let state = loadState();
  let timerId = null;

  function persist() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function modeMeta(modeId = state.mode) {
    return exerciseModes[modeId] || exerciseModes.pursuit;
  }

  function controlLabel(value) {
    return {
      single: "대체로 하나로 보임",
      "brief-double": "잠깐 복시 후 회복",
      "frequent-double": "복시가 자주 나타남"
    }[value] || value;
  }

  function timingLabel(value) {
    return {
      normal: "평소와 비슷",
      tired: "피곤할 때 악화",
      near: "가까운 작업에서 악화",
      distance: "먼 곳/멍할 때 악화",
      morning: "아침부터 불편"
    }[value] || value;
  }

  function weeklyLoad() {
    const weekAgo = Date.now() - 7 * 86400000;
    return state.logs
      .filter(log => new Date(log.createdAt).getTime() >= weekAgo)
      .reduce((sum, log) => sum + Number(log.seconds || 0), 0);
  }

  function symptomRisk() {
    if (state.control === "frequent-double" || state.diplopia >= 4 || state.fatigue >= 5 || state.headache >= 4 || state.symptomTiming === "morning") return "high";
    if (state.control === "brief-double" || state.diplopia >= 2 || state.fatigue >= 4 || state.headache >= 2) return "watch";
    return "clear";
  }

  function guidance() {
    const risk = symptomRisk();
    if (risk === "high") {
      return {
        risk,
        label: "중지 우선",
        title: "오늘은 훈련보다 기록과 이완이 우선입니다.",
        body: "복시가 자주 나타나거나 강하면 억지로 점을 따라가지 말고, 증상·상황·회복시간을 기록해 진료 때 가져가세요.",
        action: "이완 모드로 전환",
        lockTraining: true
      };
    }
    if (risk === "watch") {
      return {
        risk,
        label: "관찰 모드",
        title: "짧게 시도하고, 흐려지면 바로 멈추세요.",
        body: "피로와 복시 느낌이 올라온 상태입니다. 30-60초만 사용하고 끝난 뒤 먼 곳 보기/눈 감기로 회복 여부를 기록하세요.",
        action: "짧은 세션",
        lockTraining: false
      };
    }
    return {
      risk,
      label: "안정",
      title: "짧고 선명한 상태에서 패턴을 기록하세요.",
      body: "오늘은 낮은 강도의 양안 추적, 시선 전환, 근원거리 리허설 중 하나를 안전하게 기록하기 좋습니다.",
      action: "훈련 시작",
      lockTraining: false
    };
  }

  function computeReadiness() {
    const risk = symptomRisk();
    const recent = state.logs.slice(0, 10);
    const averageDiplopia = recent.length
      ? recent.reduce((sum, log) => sum + Number(log.diplopia || 0), 0) / recent.length
      : state.diplopia;
    const base = risk === "clear" ? 82 : risk === "watch" ? 56 : 28;
    const penalty = Math.max(0, averageDiplopia - 1) * 5 + Math.max(0, state.headache - 1) * 4;
    return Math.max(10, Math.min(96, Math.round(base - penalty)));
  }

  function recommendation() {
    const risk = symptomRisk();
    if (risk === "high") return ["이완과 증상 기록만", "복시/두통 반복 시 전문 상담", "오늘은 수렴·융합 금지"];
    if (state.symptomTiming === "near") return ["근거리-실제 원거리 전환", "복시가 올라오면 회복 리셋", "NPC/fusional vergence 질문 준비"];
    if (state.symptomTiming === "distance") return ["전체화면 좌우 전환", "실제 원거리 60초 리셋", "운전 전 피로 상태 체크"];
    return ["전체화면 추적 60초", "좌우 전환 60초", "실제 원거리 리셋 60초"];
  }

  function modeCards() {
    return Object.entries(exerciseModes).map(([id, mode]) => `
      <button class="vision-mode-button ${state.mode === id ? "active" : ""}" type="button" data-tier="${escapeHtml(mode.tier)}" data-vision-mode="${escapeHtml(id)}">
        <span>${escapeHtml(mode.shortTitle)}</span>
        <strong>${escapeHtml(mode.title)}</strong>
        <small>${escapeHtml(mode.label)} · ${escapeHtml(mode.evidenceLevel)}</small>
        <em>${mode.tier === "core" ? "실사용 우선" : mode.tier === "prescribed" ? "처방 확인" : "개념 보조"}</em>
      </button>
    `).join("");
  }

  function modeHowTo(mode = modeMeta()) {
    return `
      <div class="vision-protocol">
        <strong>실행 순서</strong>
        <ol>${mode.how.map(step => `<li>${escapeHtml(step)}</li>`).join("")}</ol>
      </div>
    `;
  }

  function stageMarkup() {
    const mode = state.mode;
    const speed = Math.max(0.35, Math.min(1.4, Number(state.speed || 0.55)));
    const duration = (9 / speed).toFixed(2);
    if (mode === "pursuit") {
      return `
        <div class="vision-stage-reticle"></div>
        <div class="vision-gridline horizontal"></div>
        <div class="vision-gridline vertical"></div>
        ${state.approvedMonocular ? `<div class="vision-eye-cover">처방된 monocular 표시</div>` : ""}
        <div class="vision-moving-dot xl" style="--vision-duration:${duration}s" aria-hidden="true"><i></i></div>
        <span class="vision-stage-label top-left">머리 고정 · 눈만 천천히</span>
        <span class="vision-stage-label bottom-right">${state.approvedMonocular ? "한쪽 눈 가림: 처방 시만" : "양안으로 하나의 점 보기"}</span>
      `;
    }
    if (mode === "saccade") {
      return `
        <div class="vision-saccade-field" style="--vision-duration:${(6 / speed).toFixed(2)}s">
          <button type="button" class="vision-target left">A</button>
          <button type="button" class="vision-target right">B</button>
          <div class="vision-jump-cue" aria-hidden="true"></div>
          <span>왼쪽 2초 → 오른쪽 2초. 글자보다 중앙점을 먼저 잡기.</span>
        </div>
      `;
    }
    if (mode === "distance-reset") {
      return `
        <div class="vision-real-distance-field">
          <div class="vision-look-away">
            <span>LOOK AWAY</span>
            <strong>화면을 보지 마세요</strong>
            <em>창밖 · 복도 끝 · 6m 이상 실제 물체</em>
          </div>
          <div class="vision-distance-count">
            <b>${Math.max(0, state.remaining)}</b>
            <span>초 동안 실제 먼 곳 보기</span>
          </div>
          <p>모니터는 실제 먼 초점을 만들 수 없습니다. 이 모드의 핵심은 화면에서 눈을 떼는 것입니다.</p>
        </div>
      `;
    }
    if (mode === "near-far") {
      return `
        <div class="vision-near-real-far-lab" style="--vision-duration:${(10 / speed).toFixed(2)}s">
          <div class="vision-cue-card near"><b>NEAR</b><span>화면 중앙 5초</span></div>
          <div class="vision-offscreen-arrow">
            <strong>→</strong>
            <span>LOOK OUTSIDE</span>
            <em>화면 밖 실제 먼 물체 20초</em>
          </div>
          <small>FAR는 모니터 안에 없습니다. 신호가 뜨면 창밖이나 방 끝으로 시선을 옮기세요.</small>
        </div>
      `;
    }
    if (mode === "fusion") {
      return `
        <div class="vision-fusion-field upgraded" style="--vision-duration:${(8 / speed).toFixed(2)}s">
          <span class="vision-ring left">L</span>
          <span class="vision-ring center">SINGLE</span>
          <span class="vision-ring right">R</span>
          <small>중앙이 하나로 느껴질 때만 짧게 유지. 갈라지면 정지.</small>
        </div>
      `;
    }
    if (mode === "convergence-ladder") {
      return `
        <div class="vision-ladder-field" style="--vision-duration:${(8 / speed).toFixed(2)}s">
          ${[1, 2, 3, 4, 5].map(step => `<span class="vision-ladder-step step-${step}">${step}</span>`).join("")}
          <div class="vision-ladder-focus"><b>ONE</b><small>깨지는 단계 번호 기록</small></div>
        </div>
      `;
    }
    if (mode === "break-recovery") {
      return `
        <div class="vision-recovery-field">
          <div class="vision-break-orbit">
            <span>double?</span>
            <strong>STOP</strong>
            <em>recover single</em>
          </div>
          <p>복시가 나타나는 순간 훈련 성공: 멈추고 20초 이상 먼 곳 보기.</p>
        </div>
      `;
    }
    return `
      <div class="vision-rest-field upgraded">
        <strong>20초 먼 곳 보기</strong>
        <span>화면에서 눈을 떼고 먼 물체를 봅니다. 눈을 감고 호흡하며 복시가 줄어드는지 기록합니다.</span>
        <i aria-hidden="true"></i>
      </div>
    `;
  }

  function packetPreview() {
    const recent = state.logs.slice(0, 12);
    const avgFatigue = recent.length ? recent.reduce((sum, log) => sum + Number(log.fatigue || 0), 0) / recent.length : 0;
    const avgDiplopia = recent.length ? recent.reduce((sum, log) => sum + Number(log.diplopia || 0), 0) / recent.length : 0;
    const frequentDouble = recent.filter(log => log.control === "frequent-double").length;
    const highRisk = recent.filter(log => log.symptomRisk === "high").length;
    return {
      schemaVersion: "vision-function-ai-summary-v2",
      sourceVersion: SOURCE_VERSION,
      generatedAt: new Date().toISOString(),
      bookId: "vision-function-recovery",
      privacyBoundary: "비식별 요약만 AI에게 제공. 진단서, 처방전, 검사 원문, 병원/환자 식별자는 제외.",
      clinicalBoundary: "자가진단/치료 처방이 아니라 증상 패턴 기록과 진료 질문 정리용.",
      sessionCount: state.logs.length,
      recentSummary: {
        weeklyMinutes: Math.round(weeklyLoad() / 60),
        avgFatigue: Number(avgFatigue.toFixed(1)),
        avgDiplopia: Number(avgDiplopia.toFixed(1)),
        frequentDoubleSessions: frequentDouble,
        highRiskSessions: highRisk,
        commonTiming: mostCommon(recent.map(log => log.symptomTiming).filter(Boolean))
      },
      nextQuestionsForClinician: [
        "내 증상이 수렴부전형인지, 기본형/원거리 우세형인지 확인할 검사는 무엇인가?",
        "near point of convergence, fusional vergence amplitude, stereoacuity 결과를 어떻게 해석해야 하는가?",
        "내게 home exercise가 적합한지, 어떤 운동은 피해야 하는지?",
        "복시가 피로/근거리/원거리 중 어느 상황에서 올라오는지 기록이 진단에 어떤 의미가 있는가?"
      ],
      recent
    };
  }

  function mostCommon(values) {
    if (!values.length) return "not-enough-data";
    const counts = values.reduce((map, value) => ({ ...map, [value]: (map[value] || 0) + 1 }), {});
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
  }

  function trendMarkup() {
    const recent = state.logs.slice(0, 10).reverse();
    if (!recent.length) return "";
    return `
      <div class="vision-trend" aria-label="최근 기록 추세">
        ${recent.map(log => {
          const fatigue = Math.max(4, Number(log.fatigue || 0) * 18);
          const double = Math.max(4, Number(log.diplopia || 0) * 18);
          const head = Math.max(3, Number(log.headache || 0) * 14);
          return `
            <span title="${escapeHtml(modeMeta(log.mode).title)} · 피로 ${Number(log.fatigue || 0)}/5 · 복시 ${Number(log.diplopia || 0)}/5 · 두통 ${Number(log.headache || 0)}/5">
              <i class="fatigue" style="height:${fatigue}%"></i>
              <i class="double" style="height:${double}%"></i>
              <i class="headache" style="height:${head}%"></i>
            </span>
          `;
        }).join("")}
      </div>
      <small class="vision-trend-caption">최근 10회: 민트=피로, 노랑=복시, 빨강=두통/어지럼. 치료 지표가 아니라 진료 전 패턴 기록입니다.</small>
    `;
  }

  function immersiveMarkup(selected, runLabel, currentGuidance) {
    if (!state.immersive) return "";
    const isLookAway = state.mode === "distance-reset" || state.mode === "near-far" || state.mode === "rest";
    return `
      <section class="vision-immersive-overlay" aria-label="전체화면 시기능 훈련실">
        <header class="vision-immersive-head">
          <div>
            <span>${escapeHtml(selected.shortTitle)} · ${escapeHtml(selected.evidenceLevel)}</span>
            <strong>${escapeHtml(selected.title)}</strong>
          </div>
          <div class="vision-immersive-counter">
            <strong>${Math.max(0, state.remaining)}</strong>
            <span>seconds</span>
          </div>
          <div class="vision-immersive-actions">
            <button class="secondary" type="button" data-vision-stop>불편감 · 이완</button>
            <button class="primary" type="button" data-vision-run>${escapeHtml(runLabel)}</button>
            <button class="secondary" type="button" data-vision-exit-immersive>나가기</button>
          </div>
        </header>
        <div class="vision-immersive-stage vision-therapy-stage vision-stage ${escapeHtml(state.mode)} ${state.running ? "running" : ""} ${isLookAway ? "look-away-mode" : ""}">
          ${stageMarkup()}
        </div>
        <footer class="vision-immersive-foot">
          <span>${escapeHtml(currentGuidance.label)} · ${escapeHtml(selected.caution)}</span>
          <b>${isLookAway ? "원거리 모드는 화면을 보는 시간이 아니라 실제 먼 곳을 보는 시간입니다." : "머리는 고정하고, 복시가 생기면 바로 멈춥니다."}</b>
        </footer>
      </section>
    `;
  }

  function render() {
    const root = document.querySelector("#vision-training-root");
    if (!root) return;
    const selected = modeMeta();
    const load = weeklyLoad();
    const progress = Math.min(100, Math.round(load / 18));
    const currentGuidance = guidance();
    const stageLocked = currentGuidance.lockTraining && state.mode !== "rest";
    const readiness = computeReadiness();
    const runLabel = stageLocked
      ? currentGuidance.action
      : state.running
        ? `일시정지 · ${Math.max(0, state.remaining)}초`
        : state.mode === "rest"
          ? "이완 타이머 시작"
          : currentGuidance.action;
    root.innerHTML = `
      <section class="vision-recovery-shell vision-upgraded">
        ${immersiveMarkup(selected, runLabel, currentGuidance)}
        <article class="vision-recovery-hero vision-therapy-hero">
          <div>
            <p class="eyebrow">vision function recovery lab · ${escapeHtml(SOURCE_VERSION)}</p>
            <h2>간헐외사시/복시를 “무리해서 참는 화면”이 아니라, 크게 보고 안전하게 멈추고 패턴을 남기는 훈련 책으로 바꿨습니다.</h2>
            <p>근거가 강한 영역과 아직 제한적인 영역을 분리했습니다. 이 책은 진단이나 치료 처방이 아니라, 안과·사시 전문의·orthoptist와 대화하기 좋은 증상 데이터와 안전한 홈 루틴을 만드는 보조 도구입니다.</p>
          </div>
          <div class="vision-load-card">
            <span>오늘 준비도</span>
            <strong>${readiness}</strong>
            <small>7일 ${Math.round(load / 60)}분 · ${state.logs.length}개 기록 · ${escapeHtml(state.remoteStatus)}</small>
            <i><em style="width:${progress}%"></em></i>
          </div>
        </article>

        <section class="vision-guidance-row" aria-label="오늘의 안전 브리핑">
          <article class="vision-guidance-card ${escapeHtml(currentGuidance.risk)}">
            <span class="vision-risk-pill">${escapeHtml(currentGuidance.label)}</span>
            <strong>${escapeHtml(currentGuidance.title)}</strong>
            <p>${escapeHtml(currentGuidance.body)}</p>
          </article>
          <article class="vision-guidance-card">
            <span>오늘의 추천 루틴</span>
            <strong>${recommendation().map(escapeHtml).join(" · ")}</strong>
            <p>세션은 짧게 시작합니다. 앱이 “강도 상승”을 자동으로 밀어붙이지 않는 이유는 복시 악화를 빨리 멈추는 능력이 더 중요하기 때문입니다.</p>
          </article>
          <article class="vision-guidance-card">
            <span>검사에서 확인할 것</span>
            <strong>NPC · fusional vergence · stereoacuity · cover test</strong>
            <p>화면 기록은 증상 패턴입니다. 실제 유형 판단, prism, occlusion, 수술/비수술 선택은 전문 검사와 담당의 판단이 우선입니다.</p>
          </article>
        </section>

        <section class="vision-training-layout">
          <article class="vision-stage-card vision-therapy-stage-card">
            <div class="vision-stage-head">
              <div>
                <p class="eyebrow">large visual training window</p>
                <h2>${escapeHtml(selected.title)}</h2>
                <p>${escapeHtml(selected.subtitle)}</p>
              </div>
              <div class="vision-run-stack">
                <strong>${Math.max(0, state.remaining)}초</strong>
                <button class="primary" type="button" data-vision-run>${escapeHtml(runLabel)}</button>
              </div>
            </div>
            <div class="vision-therapy-stage vision-stage ${escapeHtml(state.mode)} ${state.running ? "running" : ""}" aria-label="${escapeHtml(selected.title)}">
              ${stageMarkup()}
            </div>
            <div class="vision-stage-footer">
              <span>${escapeHtml(selected.goal)}</span>
              <div class="vision-stage-actions">
                <button class="primary" type="button" data-vision-immersive>전체화면 훈련실</button>
                <button class="secondary" type="button" data-vision-stop>복시/불편감 발생 · 즉시 이완</button>
              </div>
            </div>
            <div class="vision-caution"><strong>안전 경계:</strong> ${escapeHtml(selected.caution)}</div>
            ${modeHowTo(selected)}
          </article>

          <aside class="vision-control-card vision-therapy-control">
            <p class="eyebrow">pre-check + control deck</p>
            <h2>오늘의 눈 상태 먼저 체크</h2>
            <div class="vision-mode-grid upgraded">${modeCards()}</div>
            <div class="vision-range-grid">
              <label class="vision-range">훈련 시간 <b>${state.seconds}초</b><input type="range" min="30" max="300" step="30" value="${state.seconds}" data-vision-field="seconds"></label>
              <label class="vision-range">타깃 속도 <b>${Number(state.speed).toFixed(2)}x</b><input type="range" min="0.35" max="1.25" step="0.05" value="${state.speed}" data-vision-field="speed"></label>
              <label class="vision-range">피로도 <b>${state.fatigue}/5</b><input type="range" min="1" max="5" value="${state.fatigue}" data-vision-field="fatigue"></label>
              <label class="vision-range">복시 느낌 <b>${state.diplopia}/5</b><input type="range" min="0" max="5" value="${state.diplopia}" data-vision-field="diplopia"></label>
              <label class="vision-range">두통/어지럼 <b>${state.headache}/5</b><input type="range" min="0" max="5" value="${state.headache}" data-vision-field="headache"></label>
              <label class="vision-range">회복 시간 <b>${state.recoverySeconds}초</b><input type="range" min="0" max="120" step="5" value="${state.recoverySeconds}" data-vision-field="recoverySeconds"></label>
            </div>
            <label class="vision-select">오늘의 조절 상태
              <select data-vision-control>
                <option value="single" ${state.control === "single" ? "selected" : ""}>대체로 하나로 보임</option>
                <option value="brief-double" ${state.control === "brief-double" ? "selected" : ""}>잠깐 복시 후 회복</option>
                <option value="frequent-double" ${state.control === "frequent-double" ? "selected" : ""}>복시가 자주 나타남</option>
              </select>
            </label>
            <label class="vision-select">언제 악화되나
              <select data-vision-timing>
                <option value="normal" ${state.symptomTiming === "normal" ? "selected" : ""}>평소와 비슷</option>
                <option value="tired" ${state.symptomTiming === "tired" ? "selected" : ""}>피곤할 때 악화</option>
                <option value="near" ${state.symptomTiming === "near" ? "selected" : ""}>가까운 작업에서 악화</option>
                <option value="distance" ${state.symptomTiming === "distance" ? "selected" : ""}>먼 곳/멍할 때 악화</option>
                <option value="morning" ${state.symptomTiming === "morning" ? "selected" : ""}>아침부터 불편</option>
              </select>
            </label>
            <label class="vision-check">
              <input type="checkbox" data-vision-monocular ${state.approvedMonocular ? "checked" : ""}>
              <span>전문가가 지시한 경우에만 한쪽 눈 가림 표시를 켭니다. 임의 patching은 수렴 강화 목적의 대체 훈련으로 단정하지 않습니다.</span>
            </label>
            <label class="vision-note">짧은 메모
              <textarea data-vision-note placeholder="예: 야간 피로 시 복시 2초, 가까운 모니터 작업 뒤 더 불편">${escapeHtml(state.note)}</textarea>
            </label>
            <button class="primary" type="button" data-vision-save>세션 기록 저장</button>
          </aside>
        </section>

        <section class="vision-info-grid upgraded">
          <article class="vision-danger-card">
            <p class="eyebrow">stop conditions</p>
            <h2>즉시 멈출 신호</h2>
            <ul>${stopSignals.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
          </article>
          <article>
            <p class="eyebrow">terms</p>
            <h2>용어를 바로 이해하기</h2>
            <div class="vision-term-list">${glossary.map(([term, meaning]) => `<span><b>${escapeHtml(term)}</b>${escapeHtml(meaning)}</span>`).join("")}</div>
          </article>
          <article>
            <p class="eyebrow">clinician packet</p>
            <h2>진료/AI 요약 packet</h2>
            <p>AI에게는 비식별 요약만, 진료에는 증상 패턴과 질문을 가져갑니다. 진단서·처방전·병원 식별정보는 넣지 않는 구조입니다.</p>
            <button class="secondary" type="button" data-vision-copy>AI/진료 요약 packet 복사</button>
            <small class="vision-copy-status"></small>
          </article>
        </section>

        <section class="vision-grid vision-evidence-layout">
          <article class="vision-source-card">
            <p class="eyebrow">evidence board</p>
            <h2>논문/공식자료에서 앱에 반영한 것</h2>
            <div class="vision-source-list upgraded">
              ${publicSources.map(source => `
                <a href="${escapeHtml(source.url)}" target="_blank" rel="noreferrer">
                  <span>${escapeHtml(source.tag)}</span>
                  <strong>${escapeHtml(source.title)}</strong>
                  <small>${escapeHtml(source.summary)}</small>
                  <em>앱 반영: ${escapeHtml(source.appUse)}</em>
                </a>
              `).join("")}
            </div>
          </article>
          <article class="vision-log-card">
            <p class="eyebrow">session log + trend</p>
            <h2>최근 시기능 기록</h2>
            ${trendMarkup()}
            ${state.logs.length ? `
              <div class="vision-log-list upgraded">
                ${state.logs.slice(0, 12).map(log => `
                  <article class="${log.symptomRisk === "high" ? "high" : ""}">
                    <strong>${escapeHtml(modeMeta(log.mode).title)}</strong>
                    <span>${Number(log.seconds || 0)}초 · 피로 ${Number(log.fatigue || 0)}/5 · 복시 ${Number(log.diplopia || 0)}/5 · 두통 ${Number(log.headache || 0)}/5</span>
                    <small>${escapeHtml(controlLabel(log.control))} · ${escapeHtml(timingLabel(log.symptomTiming))} · 회복 ${Number(log.recoverySeconds || 0)}초 · ${new Date(log.createdAt).toLocaleString("ko-KR")} · ${escapeHtml(log.syncStatus || "local")}</small>
                    ${log.note ? `<p>${escapeHtml(log.note)}</p>` : ""}
                  </article>
                `).join("")}
              </div>
            ` : `
              <div class="vision-empty">
                <strong>아직 기록이 없습니다.</strong>
                <span>30-60초 짧은 세션 뒤 저장하면 피로·복시 패턴을 나중에 설명하기 쉬워집니다.</span>
              </div>
            `}
          </article>
        </section>
      </section>
    `;
    bind();
    updateTimer();
  }

  function bind() {
    document.querySelector("[data-vision-run]")?.addEventListener("click", toggleRun);
    document.querySelectorAll("[data-vision-stop]").forEach(button => button.addEventListener("click", () => {
      state.running = false;
      state.mode = "rest";
      state.remoteStatus = "복시/불편감 신호로 이완 모드 전환";
      persist();
      render();
    }));
    document.querySelectorAll("[data-vision-immersive]").forEach(button => {
      button.addEventListener("click", enterImmersive);
    });
    document.querySelectorAll("[data-vision-exit-immersive]").forEach(button => {
      button.addEventListener("click", exitImmersive);
    });
    document.querySelectorAll("[data-vision-mode]").forEach(button => {
      button.addEventListener("click", () => {
        state.mode = button.dataset.visionMode || "pursuit";
        state.running = false;
        state.remaining = Number(state.seconds);
        persist();
        render();
      });
    });
    document.querySelectorAll("[data-vision-field]").forEach(input => {
      input.addEventListener("input", () => {
        const key = input.dataset.visionField;
        state[key] = Number(input.value);
        if (key === "seconds" && !state.running) state.remaining = Number(input.value);
        persist();
        render();
      });
    });
    document.querySelector("[data-vision-control]")?.addEventListener("change", event => {
      state.control = event.target.value;
      persist();
      render();
    });
    document.querySelector("[data-vision-timing]")?.addEventListener("change", event => {
      state.symptomTiming = event.target.value;
      persist();
      render();
    });
    document.querySelector("[data-vision-monocular]")?.addEventListener("change", event => {
      state.approvedMonocular = event.target.checked;
      persist();
      render();
    });
    document.querySelector("[data-vision-note]")?.addEventListener("input", event => {
      state.note = event.target.value.slice(0, 700);
      persist();
    });
    document.querySelector("[data-vision-save]")?.addEventListener("click", saveSession);
    document.querySelector("[data-vision-copy]")?.addEventListener("click", copyPacket);
  }

  async function enterImmersive() {
    state.immersive = true;
    state.remaining = Number(state.remaining || state.seconds);
    persist();
    render();
    const overlay = document.querySelector(".vision-immersive-overlay");
    try {
      if (overlay?.requestFullscreen && !document.fullscreenElement) {
        await overlay.requestFullscreen();
      }
    } catch {
      state.remoteStatus = "브라우저 전체화면 권한 없이 집중 모드로 실행 중";
      persist();
    }
  }

  async function exitImmersive() {
    state.immersive = false;
    state.running = false;
    persist();
    render();
    try {
      if (document.fullscreenElement) document.exitFullscreen();
    } catch {
      // Browser may already be out of fullscreen.
    }
  }

  function toggleRun() {
    const currentGuidance = guidance();
    if (currentGuidance.lockTraining && state.mode !== "rest") {
      state.mode = "rest";
      state.running = false;
      state.remaining = Number(state.seconds);
      state.remoteStatus = "복시/피로 신호가 높아 이완 모드로 전환";
      persist();
      render();
      return;
    }
    state.running = !state.running;
    if (state.running && (!state.remaining || state.remaining <= 0)) state.remaining = Number(state.seconds);
    persist();
    if (state.immersive) {
      updateRunDom();
      updateTimer();
    } else {
      render();
    }
  }

  function runButtonLabel() {
    if (state.running) return `일시정지 · ${Math.max(0, state.remaining)}초`;
    if (state.mode === "rest") return "이완 타이머 시작";
    if (state.mode === "distance-reset") return "원거리 리셋 시작";
    return "훈련 시작";
  }

  function updateRunDom() {
    document.querySelectorAll(".vision-stage").forEach(stage => {
      stage.classList.toggle("running", Boolean(state.running));
    });
    document.querySelectorAll(".vision-run-stack strong").forEach(counter => { counter.textContent = `${state.remaining}초`; });
    document.querySelectorAll(".vision-immersive-counter strong, .vision-distance-count b").forEach(counter => { counter.textContent = `${state.remaining}`; });
    document.querySelectorAll("[data-vision-run]").forEach(button => { button.textContent = runButtonLabel(); });
  }

  function updateTimer() {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
    if (!state.running) return;
    timerId = setInterval(() => {
      state.remaining = Math.max(0, Number(state.remaining || state.seconds) - 1);
      document.querySelectorAll(".vision-run-stack strong").forEach(counter => { counter.textContent = `${state.remaining}초`; });
      document.querySelectorAll(".vision-immersive-counter strong, .vision-distance-count b").forEach(counter => { counter.textContent = `${state.remaining}`; });
      document.querySelectorAll("[data-vision-run]").forEach(button => { button.textContent = `일시정지 · ${state.remaining}초`; });
      if (state.remaining <= 0) {
        clearInterval(timerId);
        timerId = null;
        state.running = false;
        state.lastCompletedMode = state.mode;
        state.remoteStatus = "세션 완료 · 기록 저장 권장";
        persist();
        if (state.immersive) updateRunDom();
        else render();
      }
    }, 1000);
  }

  function saveSession() {
    const session = {
      id: `vision-${uid()}`,
      schemaVersion: SCHEMA_VERSION,
      sourceVersion: SOURCE_VERSION,
      mode: state.mode,
      seconds: Number(state.seconds),
      fatigue: Number(state.fatigue),
      diplopia: Number(state.diplopia),
      headache: Number(state.headache),
      recoverySeconds: Number(state.recoverySeconds),
      speed: Number(state.speed),
      control: state.control,
      symptomTiming: state.symptomTiming,
      approvedMonocular: Boolean(state.approvedMonocular),
      note: state.note.trim(),
      createdAt: new Date().toISOString(),
      symptomRisk: symptomRisk(),
      safetyBoundary: "자가진단/치료 처방 아님. stop condition 발생 시 중지 및 전문 진료 우선.",
      syncStatus: "local saved"
    };
    state.logs = [session, ...state.logs].slice(0, 180);
    state.running = false;
    state.remaining = Number(state.seconds);
    state.note = "";
    state.remoteStatus = "로컬 저장 완료 · D1 동기화 시도 중";
    persist();
    render();
    pushRemote(session);
  }

  async function pushRemote(session) {
    try {
      const payload = {
        id: session.id,
        type: "Vision Function Practice",
        subsystem: "시기능 회복훈련",
        severity: "sensitive-summary",
        title: `시기능 ${modeMeta(session.mode).shortTitle} 기록`,
        bookId: "vision-function-recovery",
        bookTitle: "시기능 회복훈련",
        chapter: "훈련 로그",
        topic: modeMeta(session.mode).title,
        privacyLevel: "sensitive-summary",
        exportPolicy: "redacted-summary-only",
        schemaVersion: SCHEMA_VERSION,
        sourceVersion: SOURCE_VERSION,
        evidence: "사용자 자가 기록. 진단/치료 처방 아님. 공개 근거 기반 안전 경계 포함.",
        action: `${session.seconds}초 ${modeMeta(session.mode).title}`,
        result: `피로 ${session.fatigue}/5, 복시 ${session.diplopia}/5, 두통 ${session.headache}/5, 조절 ${controlLabel(session.control)}, 회복 ${session.recoverySeconds}초`,
        nextStep: session.symptomRisk === "high"
          ? "반복되면 훈련을 중단하고 안과/사시 전문가에게 상담"
          : "짧은 세션으로 패턴을 계속 기록하고, 증상 악화 시 휴식 우선",
        tags: ["vision", "intermittent-exotropia", "diplopia", "fusion-control", session.mode, session.symptomTiming],
        entities: ["intermittent exotropia", "diplopia", "fusion control", "convergence", "orthoptic exercise"],
        payload: session,
        aiExportOk: false,
        createdAt: session.createdAt
      };
      const response = await fetch("/api/v4/records", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      state.logs = state.logs.map(log => log.id === session.id ? { ...log, syncStatus: "D1 saved" } : log);
      state.remoteStatus = "D1 저장 완료";
    } catch {
      state.logs = state.logs.map(log => log.id === session.id ? { ...log, syncStatus: "local only" } : log);
      state.remoteStatus = "로컬 저장 완료 · D1은 다음 접속 때 다시 시도 필요";
    }
    persist();
    render();
  }

  async function copyPacket() {
    const status = document.querySelector(".vision-copy-status");
    const text = JSON.stringify(packetPreview(), null, 2);
    try {
      await navigator.clipboard.writeText(text);
      if (status) status.textContent = "요약 packet을 복사했습니다.";
    } catch {
      if (status) status.textContent = "클립보드 복사 실패. 브라우저 권한을 확인하세요.";
    }
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden && state.running) {
      state.running = false;
      persist();
      render();
    }
  });

  document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement && state.immersive) {
      state.immersive = false;
      state.running = false;
      persist();
      render();
    }
  });

  document.addEventListener("DOMContentLoaded", render);
  window.ProjectUniverseVisionTraining = {
    getState: () => ({ ...state, logs: [...state.logs] }),
    render,
    packetPreview,
    guidance,
    publicSources: () => [...publicSources]
  };
})();
