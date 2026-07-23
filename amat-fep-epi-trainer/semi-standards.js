(() => {
  const ROOT_ID = "semi-standards-root";
  const STATE_KEY = "projectUniverseSemiStandardsStateV1";
  const ATTEMPT_KEY = "projectUniverseSemiStandardsAttemptsV1";
  const REVIEW_KEY = "projectUniverseSemiStandardsReviewQueueV1";
  const SOURCE_DEVICE_KEY = "projectUniverseSourceDevice";
  const SCHEMA_VERSION = "semi-standards-learning-v1";

  const standards = [
    {
      id: "S2",
      title: "SEMI S2",
      subtitle: "Environmental, Health, and Safety guideline for semiconductor manufacturing equipment",
      publicSummary: "반도체 제조 장비의 EHS 성능을 보는 큰 틀입니다. 장비가 설치, 운전, 유지보수되는 환경에서 사람, 시설, 환경을 보호하는지를 묻습니다.",
      ceLens: "CE는 S2를 조항 암기가 아니라 '이 작업이 안전하게 설계/문서화/검증된 범위 안인가?'를 묻는 프레임으로 써야 합니다.",
      installEvidence: ["EHS evaluation report 존재 여부", "EMO/interlock/guarding 등 안전 기능 상태", "hazard label과 user document", "chemical/exhaust/electrical 관련 owner 확인"],
      stopCondition: "EHS boundary가 불명확하거나 승인 문서와 현장 상태가 다르면 작업을 멈추고 senior CE/EHS/customer owner 확인",
      related: ["S6", "S8", "S10", "S14", "S22", "S24", "S27"],
      source: "https://store-us.semi.org/products/s00200-semi-s2-environmental-health-and-safety-guideline-for-semiconductor-manufacturing-equipment"
    },
    {
      id: "S6",
      title: "SEMI S6",
      subtitle: "Exhaust ventilation for semiconductor manufacturing equipment",
      publicSummary: "장비 배기/환기 성능과 그 확인 방법을 보는 guideline입니다. 독성/가연성/부식성 가스가 있는 장비에서 특히 중요합니다.",
      ceLens: "gas readiness나 pump/exhaust/abatement hook-up 때 '배기가 안전하게 준비됐는가, 누가 확인했는가, 실패 시 노출/축적 위험은 없는가'를 생각하게 해줍니다.",
      installEvidence: ["exhaust/abatement owner confirmation", "facility readiness sign-off", "normal/maintenance/single-failure 관점의 배기 확인", "gas box/exhaust line visual walkdown"],
      stopCondition: "배기/abatement ready가 확인되지 않았는데 toxic/flammable gas 관련 단계로 넘어가려는 경우",
      related: ["S2", "S10", "S24"],
      source: "https://store-us.semi.org/products/s00600-semi-s6-environmental-health-and-safety-guideline-for-exhaust-ventilation-of-semiconductor-manufacturing-equipment"
    },
    {
      id: "S8",
      title: "SEMI S8",
      subtitle: "Ergonomics engineering for semiconductor manufacturing equipment",
      publicSummary: "사람의 신체 크기, 힘, 동작 범위, 피로와 실수를 고려해 장비와 작업을 설계하는 관점입니다.",
      ceLens: "install/PM 중 자세가 무너지거나 blind reach, 무리한 lifting, 불안정한 ladder 작업이 생기면 단순 불편이 아니라 error와 injury risk로 봐야 합니다.",
      installEvidence: ["access panel 작업 자세", "lift/rigging 보조 필요 여부", "작업 공간 clearance", "two-person lift/approved tool 필요 여부"],
      stopCondition: "무리한 자세, 힘, 시야 제한, 추락/끼임 가능성이 있는데 임시방편으로 작업하려는 경우",
      related: ["S2", "S10", "S19", "S21"],
      source: "https://store-us.semi.org/products/s00800-semi-s8-safety-guideline-for-ergonomics-engineering-of-semiconductor-manufacturing-equipment"
    },
    {
      id: "S10",
      title: "SEMI S10",
      subtitle: "Risk assessment and risk evaluation process",
      publicSummary: "hazard를 찾고, severity/likelihood를 추정하고, risk reduction이 충분한지 판단하는 체계입니다.",
      ceLens: "증상만 보고 조치하지 말고 hazard -> risk -> evidence -> control -> residual risk 순서로 말하게 해줍니다.",
      installEvidence: ["작업 전 hazard list", "severity/likelihood 판단 근거", "control measure", "residual risk와 owner", "change 이후 재평가 필요 여부"],
      stopCondition: "위험도는 높은데 evidence나 control owner가 없이 작업을 계속하자는 흐름",
      related: ["S2", "S14", "S21", "S24"],
      source: "https://store-us.semi.org/products/s01000-semi-s10-safety-guideline-for-risk-assessment-and-risk-evaluation-process"
    },
    {
      id: "S14",
      title: "SEMI S14",
      subtitle: "Fire risk assessment and mitigation for semiconductor manufacturing equipment",
      publicSummary: "장비 자체, 제품, 주변 장비, 시설에 영향을 줄 수 있는 fire risk를 식별하고 완화하는 관점입니다.",
      ceLens: "전원 투입, heater/lamp, gas box, cable, pump, abatement 주변을 볼 때 'fire source, fuel, detection, mitigation, residual risk'로 생각하게 해줍니다.",
      installEvidence: ["thermal source 주변 상태", "cable/connector condition", "flammable material/chemical boundary", "fire detection/suppression interface owner", "recent modification 여부"],
      stopCondition: "열원/전원/가스 주변에 이상 징후가 있는데 fire risk owner 확인 없이 진행",
      related: ["S2", "S10", "S22"],
      source: "https://store-us.semi.org/products/s01400-semi-s14-safety-guidelines-for-fire-risk-assessment-and-mitigation-for-semiconductor-manufacturing-equipment"
    },
    {
      id: "S19",
      title: "SEMI S19",
      subtitle: "Training for installation, maintenance, and service personnel",
      publicSummary: "장비 설치, 유지보수, 서비스 인력이 갖춰야 할 EHS training 목표와 기록 관리를 다루는 guideline입니다.",
      ceLens: "CE가 '나는 할 수 있다'보다 '이 작업에 필요한 교육/권한/기록이 충족됐는가'를 먼저 확인하게 해줍니다.",
      installEvidence: ["site EHS/security training status", "task-specific training", "LOTO/chemical/electrical authorization", "training record/documentation"],
      stopCondition: "교육 또는 authorization 범위 밖 작업을 독립 수행하라는 상황",
      related: ["S2", "S8", "S21", "S24"],
      source: "https://store-us.semi.org/products/s01900-semi-s19-safety-guideline-for-training-of-manufacturing-equipment-installation-maintenance-and-service-personnel"
    },
    {
      id: "S21",
      title: "SEMI S21",
      subtitle: "Worker protection",
      publicSummary: "반도체/FPD 제조 장비와 그 주변에서 작업자가 만날 수 있는 hazardous energy, physical hazard, hazardous chemical 등으로부터 보호하는 관점입니다.",
      ceLens: "작업 전 LOTO, PPE, chemical boundary, energized work authorization, emergency response를 확인하는 습관으로 연결됩니다.",
      installEvidence: ["LOTO/stored energy 확인", "PPE/respirator 필요 여부", "chemical/gas exposure boundary", "physical hazard와 guarding", "emergency route/contact"],
      stopCondition: "hazardous energy나 chemical exposure 가능성이 있는데 승인된 protection 없이 접근",
      related: ["S2", "S10", "S19", "S24"],
      source: "https://store-us.semi.org/products/s02100-semi-s21-safety-guideline-for-worker-protection"
    },
    {
      id: "S22",
      title: "SEMI S22",
      subtitle: "Electrical design safety for semiconductor manufacturing equipment",
      publicSummary: "반도체 제조 장비의 전기 설계에서 감전과 화재 위험을 줄이기 위한 design-based electrical safety guideline입니다.",
      ceLens: "DVM, power-on, electrical cabinet, sensor/PLC troubleshooting 때 '전기적으로 안전한 상태인가, authorized energized work인가, protective earth/overcurrent/insulation boundary가 맞는가'를 생각하게 합니다.",
      installEvidence: ["power hook-up 승인", "protective earth/grounding 확인", "전기 cabinet 접근 권한", "LOTO/energized work boundary", "fuse/breaker/overcurrent 관련 evidence"],
      stopCondition: "활선 작업처럼 보이는데 authorization/LOTO/electrical owner가 명확하지 않은 경우",
      related: ["S2", "S10", "S14", "F47"],
      source: "https://store-us.semi.org/products/s02200-semi-s22-safety-guideline-for-the-electrical-design-of-semiconductor-manufacturing-equipment"
    },
    {
      id: "S23",
      title: "SEMI S23",
      subtitle: "Energy, utilities, and materials conservation",
      publicSummary: "장비의 energy, utility, material 사용 효율과 측정/분석 관점을 다루는 guide입니다.",
      ceLens: "install CE에게는 utility hook-up, idle/ready state, exhaust/CDA/N2/cooling/power 사용량 질문을 구조화하는 데 도움이 됩니다.",
      installEvidence: ["power/CDA/N2/cooling/exhaust utility readiness", "idle/processing/standby mode 구분", "facility capacity와 tool demand", "energy/material data owner"],
      stopCondition: "utility capacity나 exhaust/cooling/power readiness가 불명확한데 qualification으로 넘어가려는 경우",
      related: ["S2", "S6", "F47"],
      source: "https://store-us.semi.org/products/s02300-semi-s23-guide-for-conservation-of-energy-utilities-and-materials-used-by-semiconductor-manufacturing-equipment"
    },
    {
      id: "S24",
      title: "SEMI S24",
      subtitle: "Multi-employer work areas",
      publicSummary: "fab 안에서 장비사, 시설사, 고객, contractor 등 여러 회사 인력이 같은 작업영역 또는 인접영역에서 일할 때 안전한 coordination을 만드는 guideline입니다.",
      ceLens: "install 현장의 핵심입니다. '내 작업이 다른 팀을 위험하게 만들지 않는가, 다른 팀 작업이 내 작업을 위험하게 만들지 않는가, owner/communication/stop rule이 정해졌는가'를 묻게 합니다.",
      installEvidence: ["pre-job brief", "RACI/owner 확인", "shared area boundary", "simultaneous operation conflict", "escort/permit/communication channel"],
      stopCondition: "다른 회사/팀 작업과 간섭되는데 작업 구역, 책임자, hold authority가 불명확한 경우",
      related: ["S2", "S10", "S19", "S21"],
      source: "https://store-us.semi.org/products/s02400-semi-s24-safety-guideline-for-multi-employer-work-areas"
    },
    {
      id: "S27",
      title: "SEMI S27",
      subtitle: "Contents of ESH evaluation reports",
      publicSummary: "SEMI safety guideline 평가 보고서가 일관되고 읽기 쉽게 작성되도록 돕는 guideline입니다. 현재 inactive 상태로 표시되지만 보고서 독해 관점은 여전히 학습 가치가 있습니다.",
      ceLens: "CE가 EHS evaluation report를 읽을 때 '어떤 guideline에 대한 평가인지, nonconformance/residual risk/evidence가 어디 있는지'를 빠르게 찾는 훈련에 도움됩니다.",
      installEvidence: ["report scope", "evaluated guideline list", "residual risk summary", "nonconformance/action item", "document revision"],
      stopCondition: "보고서 범위가 현재 tool option/site condition과 맞지 않는데 그대로 믿고 진행",
      related: ["S2", "S8", "S10", "S22"],
      source: "https://store-us.semi.org/products/s02700-semi-s27-safety-guideline-for-the-contents-of-environmental-safety-and-health-esh-evaluation-reports"
    },
    {
      id: "F47",
      title: "SEMI F47",
      subtitle: "Voltage sag immunity for semiconductor processing equipment",
      publicSummary: "반도체 장비가 전압 sag에 어느 정도 견뎌야 하는지, 시험/보고 관점을 다루는 specification입니다.",
      ceLens: "power quality, random trip, pump/robot/controller reset, AC relay/contactor coil 이슈를 볼 때 facility power와 tool subsystem boundary를 구분하게 해줍니다.",
      installEvidence: ["facility power quality", "voltage sag event history", "affected subsystem list", "EMO 영향 범위", "power supply/relay/robot/controller 증상"],
      stopCondition: "반복 trip/reset이 있는데 process issue처럼만 보고 power quality evidence를 보지 않는 경우",
      related: ["S2", "S22", "S23"],
      source: "https://store-us.semi.org/products/f04700-semi-f47-specification-for-semiconductor-processing-equipment-voltage-sag-immunity"
    }
  ];

  const installFlow = [
    { step: "Move-in / rigging", lens: ["S8", "S10", "S21", "S24"], question: "작업 공간, 동선, 중량물, 다른 contractor 간섭이 정리됐는가?", evidence: "permit/escort, rigging owner, exclusion zone, two-person/lift aid 필요 여부" },
    { step: "Set in place / leveling", lens: ["S8", "S10", "S24"], question: "작업 자세와 인접작업 위험이 안정적인가?", evidence: "clearance, floor condition, owner, stop authority" },
    { step: "Facility hook-up", lens: ["S2", "S6", "S21", "S22", "S23", "S24"], question: "전기, CDA/N2, PCW, exhaust, abatement owner가 각각 readiness를 확인했는가?", evidence: "facility sign-off, utility matrix, gas/exhaust/abatement confirmation" },
    { step: "Power-on", lens: ["S2", "S10", "S21", "S22", "F47"], question: "활선/저장에너지/grounding/EMO boundary가 승인 범위 안인가?", evidence: "LOTO/energized work boundary, electrical owner, EMO/interlock check evidence" },
    { step: "First gas readiness", lens: ["S2", "S6", "S10", "S21", "S24"], question: "toxic/flammable/corrosive gas와 purge/exhaust/abatement가 같은 readiness 상태인가?", evidence: "gas owner, EHS owner, exhaust/abatement ready, purge plan, approved procedure" },
    { step: "Dry run / baseline wafer", lens: ["S2", "S10", "S23", "F47"], question: "사람/시설 위험이 낮은 상태에서 tool response와 utility stability를 확인했는가?", evidence: "alarm category, trend, utility stability, baseline 기록" },
    { step: "Qualification / handover", lens: ["S2", "S19", "S24", "S27"], question: "남은 risk/action/owner/document가 고객에게 일관되게 전달됐는가?", evidence: "punch list, residual risk, owner, next action, approved report channel" }
  ];

  const quizzes = [
    {
      id: "q-s24-owner",
      prompt: "Install 현장에서 시설팀이 exhaust 작업을 하고 있고 CE는 power-on 준비 중이다. 가장 먼저 적용할 SEMI lens는?",
      options: ["S24 multi-employer coordination", "S23 energy conservation only", "F47 voltage sag only"],
      correct: 0,
      why: "같은 영역/인접 영역에서 여러 회사가 동시에 작업하므로 owner, work boundary, communication, stop authority가 먼저입니다.",
      weak: "S24 coordination"
    },
    {
      id: "q-s22-dvm",
      prompt: "DVM으로 cabinet 안에서 전압 확인을 요구받았다. CE가 먼저 말해야 할 것은?",
      options: ["측정 포인트를 빨리 찾아 바로 잰다", "LOTO/energized work authorization과 electrical owner를 확인한다", "값이 정상일 것 같으면 생략한다"],
      correct: 1,
      why: "S22/S21 관점에서는 전기 위험 boundary와 승인 범위를 먼저 확인해야 합니다. 이 웹은 측정 위치 지시나 활선작업 절차를 제공하지 않습니다.",
      weak: "S22 electrical boundary"
    },
    {
      id: "q-s6-gas",
      prompt: "gas readiness 전 exhaust/abatement ready 확인이 불명확하다. 적절한 판단은?",
      options: ["gas는 아직 안 흘렸으니 진행한다", "S6/S2 관점에서 hold하고 facility/EHS/gas owner 확인", "qualification wafer로 확인한다"],
      correct: 1,
      why: "독성/가연성/부식성 가스 가능성이 있는 장비는 purge/exhaust/abatement readiness가 핵심 evidence입니다.",
      weak: "S6 exhaust readiness"
    },
    {
      id: "q-s10-risk",
      prompt: "senior가 '위험도는 낮아 보이니 그냥 진행하자'고 말했다. 가장 좋은 CE 질문은?",
      options: ["네, 바로 진행하겠습니다", "severity와 likelihood 판단 근거, 남은 risk owner가 무엇인지 확인해도 될까요?", "고객에게 말하지 않고 넘어가겠습니다"],
      correct: 1,
      why: "S10의 실무 가치는 위험을 감으로 말하지 않고 근거와 control/residual risk로 말하게 만드는 데 있습니다.",
      weak: "S10 risk wording"
    },
    {
      id: "q-s27-report",
      prompt: "EHS report를 읽는데 tool option과 report revision이 현재 장비와 맞는지 확실하지 않다. 올바른 행동은?",
      options: ["report가 있으니 그대로 신뢰한다", "scope/revision/evaluated guideline을 확인하고 owner에게 현재 configuration과 일치하는지 묻는다", "report는 CE 업무와 무관하다"],
      correct: 1,
      why: "S27 관점은 보고서 독해 품질입니다. 보고서가 현재 tool/site 상태를 대표하는지 확인해야 합니다.",
      weak: "S27 report reading"
    },
    {
      id: "q-f47-trip",
      prompt: "first power-on 후 controller와 pump가 간헐 reset된다. process 문제로 보기 전 추가해야 할 관점은?",
      options: ["F47/power quality와 affected subsystem boundary", "S8 ergonomics만", "S23 material conservation만"],
      correct: 0,
      why: "F47은 voltage sag immunity 관점입니다. random reset/trip은 facility power quality와 subsystem affected list를 함께 봐야 합니다.",
      weak: "F47 power quality"
    }
  ];

  const publicSources = [
    ["SEMI Safety Standards", "SEMI가 공개한 Safety guideline 목록과 S2/S6/S8/S10/S19/S21/S22/S23/S24/S27 위치 확인", "https://www.semi.org/en/products-services/standards/safety"],
    ["SEMI S2 store abstract", "S2가 semiconductor manufacturing equipment의 EHS consideration을 다룬다는 공개 설명", standards.find(item => item.id === "S2").source],
    ["SEMI S22 store abstract", "S22가 electrical shock/fire risk를 줄이기 위한 electrical design safety guideline이라는 공개 설명", standards.find(item => item.id === "S22").source],
    ["SEMI S24 store abstract", "S24가 fab 내 multi-employer shared work area 안전환경 방법을 다룬다는 공개 설명", standards.find(item => item.id === "S24").source],
    ["OSHA semiconductor standards", "반도체 hazard와 관련 OSHA/SEMI 자료 목록", "https://www.osha.gov/semiconductors/standards"],
    ["TUV SUD semiconductor testing", "S2를 foundation guideline으로 소개하고 S22/S8/S6/S10 등 관련 guideline을 제시", "https://www.tuvsud.com/en-us/industries/manufacturing/machinery-and-robotics/semiconductor-testing"],
    ["SIA EHS practices fact sheet", "현대 반도체 장비가 SEMI S2/S6 같은 EHS guideline에 맞춰 설계된다는 공개 설명", "https://www.semiconductors.org/wp-content/uploads/2024/12/SIA_Environment-Health-Safety-Practices_Fact-Sheet-12-9-24.pdf"]
  ];

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function readJson(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
    } catch {
      return fallback;
    }
  }

  function writeJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function stableDeviceId() {
    let id = localStorage.getItem(SOURCE_DEVICE_KEY);
    if (!id) {
      id = `device-${Math.random().toString(36).slice(2, 10)}-${Date.now().toString(36)}`;
      localStorage.setItem(SOURCE_DEVICE_KEY, id);
    }
    return id;
  }

  function getState() {
    const fallback = {
      selectedStandard: "S24",
      completed: {},
      activeQuiz: 0,
      lastScenario: null,
      updatedAt: null
    };
    return { ...fallback, ...readJson(STATE_KEY, fallback) };
  }

  function saveState(next) {
    writeJson(STATE_KEY, { ...next, updatedAt: new Date().toISOString() });
  }

  function getAttempts() {
    return readJson(ATTEMPT_KEY, []);
  }

  function getReviewQueue() {
    return readJson(REVIEW_KEY, []);
  }

  function scheduleReview(item) {
    const queue = getReviewQueue();
    queue.push({
      id: `semi-review-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      schemaVersion: "semi-review-v1",
      source: "semi-standards",
      sourceDevice: stableDeviceId(),
      privacyLevel: "work-learning",
      exportPolicy: "ai-ok-redacted",
      syncStatus: "local saved",
      createdAt: new Date().toISOString(),
      nextReviewAt: new Date(Date.now() + (item.correct ? 3 : 1) * 86400000).toISOString(),
      standard: item.standard || null,
      weak: item.weak,
      prompt: item.prompt,
      why: item.why
    });
    writeJson(REVIEW_KEY, queue.slice(-80));
  }

  function recordAttempt(quiz, selected) {
    const correct = selected === quiz.correct;
    const attempt = {
      id: `semi-attempt-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      schemaVersion: SCHEMA_VERSION,
      source: "semi-standards",
      sourceDevice: stableDeviceId(),
      privacyLevel: "work-learning",
      exportPolicy: "ai-ok-redacted",
      syncStatus: "local saved",
      createdAt: new Date().toISOString(),
      prompt: quiz.prompt,
      selected,
      correctIndex: quiz.correct,
      correct,
      weak: quiz.weak,
      why: quiz.why
    };
    const attempts = getAttempts();
    attempts.push(attempt);
    writeJson(ATTEMPT_KEY, attempts.slice(-200));
    scheduleReview(attempt);
    return attempt;
  }

  function stats() {
    const attempts = getAttempts();
    const correct = attempts.filter(item => item.correct).length;
    const weakMap = {};
    attempts.filter(item => !item.correct).forEach(item => {
      const key = item.weak || "SEMI 판단";
      weakMap[key] = (weakMap[key] || 0) + 1;
    });
    return {
      standards: standards.length,
      attempts: attempts.length,
      accuracy: attempts.length ? Math.round(correct / attempts.length * 100) : null,
      due: getReviewQueue().filter(item => new Date(item.nextReviewAt).getTime() <= Date.now()).length,
      weak: Object.entries(weakMap).map(([label, count]) => ({ label, count })).sort((a, b) => b.count - a.count).slice(0, 5)
    };
  }

  function renderHero(currentStats) {
    return `
      <section class="semi-hero">
        <div>
          <p class="eyebrow">SEMI Safety Standards Room</p>
          <h2>SEMI 기준을 현장 CE 판단 언어로 바꾸는 학습실</h2>
          <p>S2, S6, S8, S10, S14, S19, S21, S22, S23, S24, S27, F47을 원문 복제가 아니라 공개 설명 기반의 install 판단 프레임으로 학습합니다. 실제 작업은 회사 교육, 고객 site rule, 승인 문서, senior CE 지시가 항상 우선입니다.</p>
          <div class="semi-actions">
            <button class="primary" type="button" data-semi-jump="#semi-standard-map">표준 맵 보기</button>
            <button class="secondary" type="button" data-semi-jump="#semi-quiz-lab">판단 퀴즈</button>
            <button class="secondary" type="button" data-semi-jump="#semi-install-flow">install 단계별 적용</button>
          </div>
        </div>
        <aside class="semi-score-card">
          <span>SEMI readiness</span>
          <strong>${currentStats.accuracy ?? 0}%</strong>
          <small>${currentStats.attempts} attempts · ${currentStats.due} review due · ${currentStats.standards} standards</small>
        </aside>
      </section>
      <section class="semi-boundary">
        <b>저작권/안전 경계</b>
        <span>SEMI 표준 원문, 조항 번호별 상세 요구사항, 고객 site-specific acceptance limit, 장비 manual, recipe, valve sequence, detector setpoint, interlock bypass는 포함하지 않습니다. 이 화면은 공개 abstract와 공공 안전자료를 바탕으로 CE 사고력 훈련용으로 재구성한 것입니다.</span>
      </section>
    `;
  }

  function renderStandardCard(item, selected, completed) {
    return `
      <article class="semi-standard-card ${selected ? "active" : ""}">
        <header>
          <div>
            <span>${escapeHtml(item.id)}</span>
            <h3>${escapeHtml(item.title)}</h3>
          </div>
          <label>
            <input type="checkbox" data-semi-complete="${escapeHtml(item.id)}" ${completed ? "checked" : ""} />
            학습
          </label>
        </header>
        <p class="semi-subtitle">${escapeHtml(item.subtitle)}</p>
        <p>${escapeHtml(item.publicSummary)}</p>
        <button class="secondary" type="button" data-semi-select="${escapeHtml(item.id)}">깊게 보기</button>
      </article>
    `;
  }

  function renderSelectedStandard(item) {
    return `
      <section class="semi-detail-panel">
        <div class="semi-detail-head">
          <div>
            <p class="eyebrow">selected standard lens</p>
            <h2>${escapeHtml(item.title)} · 현장 번역</h2>
            <p>${escapeHtml(item.subtitle)}</p>
          </div>
          <a href="${escapeHtml(item.source)}" target="_blank" rel="noreferrer">공개 출처</a>
        </div>
        <div class="semi-detail-grid">
          <article>
            <span>CE lens</span>
            <p>${escapeHtml(item.ceLens)}</p>
          </article>
          <article>
            <span>Stop condition</span>
            <p>${escapeHtml(item.stopCondition)}</p>
          </article>
          <article>
            <span>Related standards</span>
            <p>${item.related.map(id => `<button class="semi-mini-link" type="button" data-semi-select="${escapeHtml(id)}">${escapeHtml(id)}</button>`).join("")}</p>
          </article>
        </div>
        <div class="semi-evidence-grid">
          ${item.installEvidence.map(evidence => `
            <article>
              <span>Evidence</span>
              <strong>${escapeHtml(evidence)}</strong>
              <p>실제 값이나 절차를 외우는 것이 아니라, 승인된 문서/owner/sign-off/trend가 있는지 확인하는 질문으로 바꿉니다.</p>
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }

  function renderStandardsMap(state) {
    const selected = standards.find(item => item.id === state.selectedStandard) || standards[0];
    return `
      <section class="semi-card" id="semi-standard-map">
        <div class="semi-card-head">
          <div>
            <p class="eyebrow">standards map</p>
            <h2>CE가 알아야 할 SEMI lens</h2>
          </div>
          <span>${Object.keys(state.completed || {}).length}/${standards.length} learned</span>
        </div>
        <div class="semi-standard-grid">
          ${standards.map(item => renderStandardCard(item, item.id === selected.id, Boolean(state.completed?.[item.id]))).join("")}
        </div>
      </section>
      ${renderSelectedStandard(selected)}
    `;
  }

  function renderInstallFlow() {
    return `
      <section class="semi-card" id="semi-install-flow">
        <div class="semi-card-head">
          <div>
            <p class="eyebrow">install translation</p>
            <h2>설치 단계별 SEMI 질문법</h2>
          </div>
          <span>move-in → handover</span>
        </div>
        <div class="semi-flow-table">
          ${installFlow.map(row => `
            <article>
              <b>${escapeHtml(row.step)}</b>
              <div>${row.lens.map(id => `<button class="semi-mini-link" type="button" data-semi-select="${escapeHtml(id)}">${escapeHtml(id)}</button>`).join("")}</div>
              <p>${escapeHtml(row.question)}</p>
              <small>Evidence: ${escapeHtml(row.evidence)}</small>
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }

  function renderQuiz(state) {
    const quiz = quizzes[state.activeQuiz % quizzes.length];
    const recent = getAttempts().filter(item => item.prompt === quiz.prompt).at(-1);
    return `
      <section class="semi-card" id="semi-quiz-lab">
        <div class="semi-card-head">
          <div>
            <p class="eyebrow">judgment drill</p>
            <h2>SEMI lens 판단 퀴즈</h2>
          </div>
          <span>${state.activeQuiz + 1}/${quizzes.length}</span>
        </div>
        <article class="semi-quiz-card">
          <strong>${escapeHtml(quiz.prompt)}</strong>
          <div class="semi-quiz-options">
            ${quiz.options.map((option, index) => `
              <button type="button" data-semi-answer="${index}" class="${recent && index === recent.correctIndex ? "correct" : ""} ${recent && index === recent.selected && !recent.correct ? "wrong" : ""}">
                ${escapeHtml(option)}
              </button>
            `).join("")}
          </div>
          <div class="semi-quiz-feedback">
            ${recent ? `
              <b>${recent.correct ? "정답" : "다시 보기"}</b>
              <p>${escapeHtml(recent.why)}</p>
              <small>약점 태그: ${escapeHtml(recent.weak)}</small>
            ` : "<p>답을 고르면 즉시 채점되고 복습 큐에 저장됩니다.</p>"}
          </div>
          <div class="semi-actions">
            <button class="secondary" type="button" data-semi-next-quiz>다음 퀴즈</button>
          </div>
        </article>
      </section>
    `;
  }

  function renderWeaknessPanel(currentStats) {
    return `
      <section class="semi-card">
        <div class="semi-card-head">
          <div>
            <p class="eyebrow">weakness loop</p>
            <h2>반복 약점과 오늘 복습</h2>
          </div>
          <span>${currentStats.due} due</span>
        </div>
        <div class="semi-weak-grid">
          ${(currentStats.weak.length ? currentStats.weak : [{ label: "아직 오답 데이터 없음", count: 0 }]).map(item => `
            <article>
              <span>Weakness</span>
              <strong>${escapeHtml(item.label)}</strong>
              <p>${item.count ? `${item.count}회 반복. 오늘 install flow에서 같은 lens를 다시 선택하세요.` : "퀴즈를 풀면 S24/S22/S6/S10 같은 약점 lens가 여기에 쌓입니다."}</p>
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }

  function renderFieldPhraseBuilder() {
    return `
      <section class="semi-card">
        <div class="semi-card-head">
          <div>
            <p class="eyebrow">field wording</p>
            <h2>선임/고객에게 물어볼 SEMI형 문장</h2>
          </div>
          <button class="secondary" type="button" data-semi-copy-field>문장 복사</button>
        </div>
        <div class="semi-phrase-grid">
          <article>
            <span>S24 coordination</span>
            <p id="semi-copy-text">Before we proceed, can we confirm the work area owner, adjacent work activity, hold authority, and approved communication channel?</p>
          </article>
          <article>
            <span>S22 electrical</span>
            <p>Before any electrical verification, I need to confirm the approved energized-work boundary, LOTO status, and electrical owner.</p>
          </article>
          <article>
            <span>S6 gas/exhaust</span>
            <p>Gas readiness should remain on hold until exhaust and abatement readiness are confirmed by the responsible owners.</p>
          </article>
          <article>
            <span>S10 risk</span>
            <p>Can we separate confirmed facts, assumptions, missing evidence, risk controls, and the residual risk owner before continuing?</p>
          </article>
        </div>
        <small class="semi-copy-status"></small>
      </section>
    `;
  }

  function renderSources() {
    return `
      <section class="semi-card">
        <div class="semi-card-head">
          <div>
            <p class="eyebrow">public references</p>
            <h2>공개 근거와 한계</h2>
          </div>
          <span>no paid text copied</span>
        </div>
        <div class="semi-source-grid">
          ${publicSources.map(([title, summary, url]) => `
            <article>
              <b>${escapeHtml(title)}</b>
              <p>${escapeHtml(summary)}</p>
              <a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">source</a>
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }

  function bind(root) {
    root.querySelectorAll("[data-semi-select]").forEach(button => {
      button.addEventListener("click", () => {
        const state = getState();
        state.selectedStandard = button.dataset.semiSelect;
        saveState(state);
        render();
        document.querySelector("#semi-standard-map")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
    root.querySelectorAll("[data-semi-complete]").forEach(input => {
      input.addEventListener("change", () => {
        const state = getState();
        state.completed = state.completed || {};
        state.completed[input.dataset.semiComplete] = input.checked;
        saveState(state);
        render();
      });
    });
    root.querySelectorAll("[data-semi-answer]").forEach(button => {
      button.addEventListener("click", () => {
        const state = getState();
        const quiz = quizzes[state.activeQuiz % quizzes.length];
        recordAttempt(quiz, Number(button.dataset.semiAnswer));
        render();
      });
    });
    root.querySelector("[data-semi-next-quiz]")?.addEventListener("click", () => {
      const state = getState();
      state.activeQuiz = (state.activeQuiz + 1) % quizzes.length;
      saveState(state);
      render();
    });
    root.querySelectorAll("[data-semi-jump]").forEach(button => {
      button.addEventListener("click", () => document.querySelector(button.dataset.semiJump)?.scrollIntoView({ behavior: "smooth", block: "start" }));
    });
    root.querySelector("[data-semi-copy-field]")?.addEventListener("click", async () => {
      const text = root.querySelector("#semi-copy-text")?.textContent || "";
      try {
        await navigator.clipboard.writeText(text);
        root.querySelector(".semi-copy-status").textContent = "복사 완료";
      } catch {
        root.querySelector(".semi-copy-status").textContent = "복사 실패";
      }
    });
  }

  function render() {
    const root = document.getElementById(ROOT_ID);
    if (!root) return;
    const state = getState();
    const currentStats = stats();
    root.innerHTML = `
      <section class="semi-standards-console">
        ${renderHero(currentStats)}
        ${renderStandardsMap(state)}
        ${renderInstallFlow()}
        <section class="semi-two-col">
          ${renderQuiz(state)}
          ${renderWeaknessPanel(currentStats)}
        </section>
        ${renderFieldPhraseBuilder()}
        ${renderSources()}
      </section>
    `;
    bind(root);
  }

  window.ProjectUniverseSemiStandards = {
    render,
    getState,
    getStats: stats,
    getAttempts,
    standards
  };

  document.addEventListener("DOMContentLoaded", render);
})();
