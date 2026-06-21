const masteryState = JSON.parse(localStorage.getItem("ceMasteryState") || "{}");
let activeMasteryTab = "ladder";

const masteryLevels = [
  ["L0", "기초 세팅", "Fab, cleanroom, CE 역할, 위험 작업 경계를 말할 수 있다."],
  ["L1", "따라 하는 신입", "선임 지시 아래 PM/점검/로그 수집을 안전하게 수행한다."],
  ["L2", "부분 독립", "단순 알람과 설치 punch item을 증거 기반으로 좁힌다."],
  ["L3", "독립 CE", "subsystem 간 원인 분리를 하고 고객에게 사실/리스크/다음 액션을 보고한다."],
  ["L4", "시니어", "install/qualification 흐름을 설계하고 반복 장애를 구조적으로 줄인다."],
  ["L5", "site lead 후보", "장비, facility, 고객 일정, EHS, 품질 리스크를 한 장의 계획으로 묶는다."]
];

const masteryDomains = [
  {
    id: "fab-language",
    title: "Fab 언어와 라인 행동",
    target: "Fab, lot, route, hold, release, metrology, cleanroom rule을 고객 언어로 말한다.",
    drills: [
      "wafer가 FOUP에서 장비, metrology, hold/release로 이어지는 흐름을 2분 안에 설명",
      "cleanroom에서 하지 말아야 할 행동 10개를 이유와 함께 쓰기",
      "고객에게 downtime 영향 보고 문장 3개 작성"
    ],
    evidence: "Fab 용어 30개를 설명하고, 고객 보고 템플릿을 직접 작성"
  },
  {
    id: "epi-process",
    title: "EPI 공정과 장비",
    target: "surface preparation, precursor, dopant, pressure, temperature, defect/uniformity를 연결한다.",
    drills: [
      "EPI와 CVD의 차이를 결정성 성장 관점에서 설명",
      "defect map이 edge-heavy일 때 gas/thermal/handling/vacuum 가설을 분리",
      "Centura Prime/Xtera/200mm의 공개 차이를 option 관점으로 비교"
    ],
    evidence: "EPI 품질 이슈 하나를 symptom, subsystem, next data로 분해"
  },
  {
    id: "rtp-process",
    title: "RTP 열처리와 온도 제어",
    target: "thermal budget, ramp, soak, spike, pyrometry, emissivity, lamp zone, wafer rotation을 이해한다.",
    drills: [
      "temperature trace에서 sensor 문제와 실제 heating 문제를 나누는 질문 작성",
      "Radiance Plus와 Vulcan 공개 특징을 CE 진단 포인트로 변환",
      "RTP qualification에서 반드시 저장할 baseline data 목록 만들기"
    ],
    evidence: "정상/비정상 RTP trace를 가정하고 원인 후보 5개 제시"
  },
  {
    id: "vacuum-gas",
    title: "Vacuum/Gas/Abatement",
    target: "pumpdown, leak, MFC, gas cabinet, detector, exhaust, abatement ready를 하나의 safety envelope로 본다.",
    drills: [
      "MFC setpoint mismatch의 원인을 supply, valve, restriction, MFC, sensor로 분리",
      "silane, HCl, PH3, B2H6의 위험성을 독성/가연성/부식성/자연발화로 분류",
      "gas introduction 전 확인해야 할 승인/계측/기록을 checklist로 작성"
    ],
    evidence: "가스 라인 release 전 확인 질문 15개 작성"
  },
  {
    id: "install-project",
    title: "Installation Project Control",
    target: "site readiness, move-in, hook-up, bring-up, qualification, handover를 산출물 기준으로 관리한다.",
    drills: [
      "POC/drawing/as-built/punch list의 관계 설명",
      "hook-up blocker 발생 시 owner, impact, ETA, next action으로 보고",
      "first power-on 전 interlock, EMO, exhaust, cooling, gas ready 확인표 작성"
    ],
    evidence: "가상의 install punch list 10개를 priority와 owner로 정리"
  },
  {
    id: "controls-data",
    title: "Controls/Data/Troubleshooting",
    target: "alarm, log, trend, I/O, schematic, DMM 측정, host/FDC data를 증거 체인으로 묶는다.",
    drills: [
      "알람 하나를 5 Why가 아니라 data request 5개로 풀기",
      "schematic에서 sensor input, actuator output, interlock chain 표시",
      "정상 tool과 문제 tool 비교에 필요한 trace 6개 선정"
    ],
    evidence: "증상 하나를 fact, hypothesis, test, result, next action으로 기록"
  },
  {
    id: "maintenance",
    title: "PM/CM와 재발 방지",
    target: "PM은 체크리스트 완료가 아니라 baseline 회복, early failure 예방, 재발 방지까지 포함한다고 이해한다.",
    drills: [
      "PM 직후 발생 가능한 connector/seal/valve/calibration 실수 목록화",
      "CM 이후 재발 방지를 위한 data와 part history 정리",
      "PM 전후 사진/로그/trace로 evidence package 만들기"
    ],
    evidence: "PM 후 first wafer 전 확인표와 shift handover 작성"
  },
  {
    id: "customer-leadership",
    title: "고객 커뮤니케이션과 리더십",
    target: "모르는 것을 숨기지 않고, 확인된 사실과 필요한 승인을 명확히 말한다.",
    drills: [
      "1분 고객 브리핑: 현재 상태, 영향, 안전, 다음 확인, 다음 업데이트",
      "내부 escalation 메시지를 senior가 바로 판단할 수 있게 작성",
      "고객 요청이 unsafe하거나 승인 밖일 때 정중히 멈추는 문장 연습"
    ],
    evidence: "downtime 브리핑과 escalation note를 각각 작성"
  }
];

const masteryMissions = [
  ["m-001", "Fab 용어 50개를 한글로 설명하고 영어 약어를 붙인다."],
  ["m-002", "EPI 공정 변수를 gas, pressure, temperature, surface, time으로 나눈다."],
  ["m-003", "RTP temperature trace에서 가능한 원인을 sensor/actuator/environment/process로 분리한다."],
  ["m-004", "gas introduction 전 safety envelope checklist를 만든다."],
  ["m-005", "site readiness review에서 물어볼 질문 30개를 작성한다."],
  ["m-006", "move-in damage log와 사진 기록 기준을 만든다."],
  ["m-007", "hook-up drawing과 P&ID에서 POC, flow direction, owner를 표시하는 법을 설명한다."],
  ["m-008", "first power-on 전 EMO/interlock/exhaust/cooling/gas ready 확인 순서를 말한다."],
  ["m-009", "pumpdown 지연 시 확인 data 8개를 나열한다."],
  ["m-010", "MFC actual mismatch 시 임의 조작 없이 escalation하는 메시지를 쓴다."],
  ["m-011", "wafer transfer sensor mismatch를 mechanical/I/O/pneumatic/teaching으로 분리한다."],
  ["m-012", "PM 직후 defect 증가의 변경점 기반 확인 순서를 쓴다."],
  ["m-013", "qualification package에 들어갈 baseline data 목록을 작성한다."],
  ["m-014", "고객 1분 브리핑을 fact, impact, action, ETA로 작성한다."],
  ["m-015", "SEMI S2/S6/S8/S18/S22/S24가 CE에게 왜 필요한지 설명한다."],
  ["m-016", "silane, HCl, PH3, AsH3, B2H6, H2의 hazard를 구분한다."],
  ["m-017", "installed base upgrade/retrofit에서 변경점과 rollback risk를 정리한다."],
  ["m-018", "golden tool 비교에 필요한 trace와 metrology를 선택한다."],
  ["m-019", "shift handover note를 open item, risk, owner, ETA로 작성한다."],
  ["m-020", "알람 하나를 fact, hypothesis, test, result, next action 형식으로 기록한다."]
  ,
  ["m-021", "install phase별 pass evidence와 stop condition을 각각 3개 이상 말한다."],
  ["m-022", "LL-TM-PM/CM wafer path에서 pressure boundary, gate valve, robot handoff를 순서대로 설명한다."],
  ["m-023", "SAT/qualification package에 들어갈 trace, metrology, safety, open punch evidence를 분리해 작성한다."],
  ["m-024", "facility ready signal과 실제 physical state가 다를 때 hold/escalation 메시지를 작성한다."]
];

const failureAtlas = [
  ["Pumpdown 지연", "Vacuum", "door seal, O-ring, foreline, pump, valve state, gauge, recent PM", "바로 pump 교체"],
  ["MFC actual mismatch", "Gas", "supply pressure, regulator, valve, restriction, MFC health, purge, gas cabinet ready", "setpoint를 임의로 크게 변경"],
  ["Temperature trace unstable", "RTP", "pyrometer/window, lamp zone, rotation, cooling, recipe, chamber contamination", "target만 조정해 alarm 회피"],
  ["EPI defect 증가", "EPI quality", "PM 변경점, chamber clean, handling contact, pre-clean, gas purity, temperature uniformity", "incoming wafer 문제로 단정"],
  ["Interlock not ready", "Safety/facility", "exhaust, abatement, cooling, gas box, cover, EMO loop, facility signal", "interlock 우회"],
  ["Robot mis-pick/scrape", "Automation", "teach, leveling, end-effector, sensor timing, cassette seating, vibration", "wafer를 계속 투입해 평균 확인"],
  ["Host recipe permission error", "Controls/data", "user permission, recipe version, host communication, time sync, change control", "local에서 몰래 recipe 수정"],
  ["PM 후 반복 alarm", "Maintenance", "작업 전후 변경점, connector, cable strain, seal, calibration, part lot history", "증상만 reset 후 종료"]
];

const masteryTemplates = [
  ["고객 1분 브리핑", ["현재 확인된 사실:", "생산/안전 영향:", "방금 확인한 data:", "다음 확인 액션:", "필요한 승인/지원:", "다음 업데이트 시간:"]],
  ["Escalation Note", ["Tool/Chamber/Recipe:", "Alarm/time/event:", "Recent change:", "Data captured:", "Tried and result:", "Risk if delayed:", "Decision needed:"]],
  ["Install Punch Item", ["Item:", "Owner:", "Impact:", "Priority:", "Blocking production? yes/no", "Required evidence:", "ETA:", "Next witness/sign-off:"]],
  ["Qualification Evidence", ["Baseline trace:", "Wafer handling result:", "Gas/vacuum check:", "Thermal/process data:", "Metrology summary:", "Open deviations:", "Customer sign-off:"]],
  ["PM Closeout", ["Parts replaced:", "Surfaces opened:", "Seal/connector touched:", "Leak/pumpdown result:", "Calibration done:", "First run result:", "Handover risk:"]],
  ["Unsafe Request Response", ["제가 임의로 진행할 수 없는 이유:", "필요한 site/OEM 승인:", "지금 안전하게 확인 가능한 것:", "승인 후 진행 순서:"]]
];

const masteryCases = [
  {
    title: "Install 중 abatement ready가 떨어졌다",
    facts: ["gas introduction 전", "facility contractor 작업 직후", "tool은 ready 조건 미충족"],
    choices: [
      ["schedule이 급하니 interlock을 무시하고 dry run을 계속한다", false],
      ["facility owner와 ready signal, 실제 exhaust/abatement 상태, alarm mapping을 witness로 확인한다", true],
      ["software 문제로 보고하고 gas qualification을 먼저 진행한다", false]
    ],
    answer: "정답은 facility owner와 함께 실제 상태와 interface signal을 확인하는 것입니다. gas가 관련될 수 있는 장비는 safety envelope가 먼저입니다."
  },
  {
    title: "PM 다음날 EPI defect가 edge-heavy로 증가",
    facts: ["PM 전 baseline 정상", "pumpdown 정상", "edge-heavy defect map"],
    choices: [
      ["PM에서 손댄 부위, wafer handling, chamber clean, pre-clean, temperature uniformity를 순서대로 확인한다", true],
      ["incoming wafer 문제로 고객 공정팀에 넘긴다", false],
      ["모든 chamber를 열어 눈으로 먼저 확인한다", false]
    ],
    answer: "PM 직후 문제는 변경점 기반 접근이 가장 강합니다. defect map 패턴과 작업 부위를 연결해야 합니다."
  },
  {
    title: "RTP chamber 하나만 lamp power command가 상승",
    facts: ["target은 동일", "wafer-to-wafer 편차 증가", "pyrometer window PM 이력 있음"],
    choices: [
      ["lamp aging, pyrometer/window, rotation, cooling, recipe change, chamber contamination을 정상 chamber와 비교한다", true],
      ["target temperature를 내려 alarm을 없앤다", false],
      ["공정 recipe 문제라고 단정한다", false]
    ],
    answer: "정상 chamber와 비교하는 것이 핵심입니다. sensor 신뢰도와 실제 heating 성능을 분리해야 합니다."
  }
];

function saveMastery() {
  localStorage.setItem("ceMasteryState", JSON.stringify(masteryState));
  renderMasteryScore();
}

function renderMasteryScore() {
  const done = Object.values(masteryState).filter(Boolean).length;
  const total = masteryMissions.length;
  const ratio = total ? done / total : 0;
  const index = Math.min(masteryLevels.length - 1, Math.floor(ratio * masteryLevels.length));
  document.querySelector("#mastery-done").textContent = done;
  document.querySelector("#mastery-total").textContent = `${total}개 훈련 중`;
  document.querySelector("#mastery-level").textContent = masteryLevels[index][0];
  document.querySelector("#mastery-level-desc").textContent = masteryLevels[index][1];
}

function renderMasteryTabs() {
  const tabs = [
    ["ladder", "레벨"],
    ["domains", "역량맵"],
    ["missions", "훈련체크"],
    ["atlas", "고장지도"],
    ["templates", "템플릿"],
    ["cases", "케이스"]
  ];
  document.querySelector("#mastery-tabs").innerHTML = tabs.map(([id, label]) =>
    `<button class="mastery-tab ${activeMasteryTab === id ? "active" : ""}" data-mastery-tab="${id}">${label}</button>`
  ).join("");
  document.querySelectorAll("[data-mastery-tab]").forEach(btn => {
    btn.addEventListener("click", () => {
      activeMasteryTab = btn.dataset.masteryTab;
      renderMastery();
    });
  });
}

function renderLevelPanel() {
  return `<div class="mastery-grid">${masteryLevels.map(([level, title, desc]) => `
    <article class="mastery-card">
      <span class="level-pill">${level}</span>
      <h2>${title}</h2>
      <p>${desc}</p>
    </article>
  `).join("")}</div>`;
}

function renderDomainPanel() {
  return `<div class="mastery-grid">${masteryDomains.map(domain => `
    <article class="mastery-card">
      <h2>${domain.title}</h2>
      <p>${domain.target}</p>
      <strong>Drills</strong>
      <ul>${domain.drills.map(item => `<li>${item}</li>`).join("")}</ul>
      <strong>Evidence</strong>
      <p>${domain.evidence}</p>
    </article>
  `).join("")}</div>`;
}

function renderMissionPanel() {
  return `<div class="mastery-grid">${masteryMissions.map(([id, text]) => `
    <label class="mastery-check">
      <input type="checkbox" data-mastery-mission="${id}" ${masteryState[id] ? "checked" : ""} />
      <span>${text}</span>
    </label>
  `).join("")}</div>`;
}

function renderAtlasPanel() {
  return `<div class="mastery-grid">${failureAtlas.map(([symptom, area, checks, avoid]) => `
    <article class="mastery-card">
      <span class="level-pill">${area}</span>
      <h2>${symptom}</h2>
      <strong>먼저 볼 것</strong>
      <p>${checks}</p>
      <strong>금지 습관</strong>
      <p>${avoid}</p>
    </article>
  `).join("")}</div>`;
}

function renderTemplatePanel() {
  return `<div class="template-grid">${masteryTemplates.map(([title, lines]) => `
    <article class="template-block">
      <h2>${title}</h2>
      <ul>${lines.map(line => `<li>${line}</li>`).join("")}</ul>
    </article>
  `).join("")}</div>`;
}

function renderCasePanel() {
  return `<div class="case-grid">${masteryCases.map((item, index) => `
    <article class="case-card">
      <h2>${item.title}</h2>
      <strong>Facts</strong>
      <ul>${item.facts.map(fact => `<li>${fact}</li>`).join("")}</ul>
      ${item.choices.map(([choice, good]) => `
        <button class="case-choice" data-case="${index}" data-good="${good}">${choice}</button>
      `).join("")}
      <p class="case-feedback" id="case-feedback-${index}">선택지를 고르면 senior CE 관점 피드백이 나옵니다.</p>
    </article>
  `).join("")}</div>`;
}

function renderMastery() {
  renderMasteryTabs();
  const panel = document.querySelector("#mastery-panel");
  const renderers = {
    ladder: renderLevelPanel,
    domains: renderDomainPanel,
    missions: renderMissionPanel,
    atlas: renderAtlasPanel,
    templates: renderTemplatePanel,
    cases: renderCasePanel
  };
  panel.innerHTML = renderers[activeMasteryTab]();
  document.querySelectorAll("[data-mastery-mission]").forEach(input => {
    input.addEventListener("change", () => {
      masteryState[input.dataset.masteryMission] = input.checked;
      saveMastery();
    });
  });
  document.querySelectorAll(".case-choice").forEach(button => {
    button.addEventListener("click", () => {
      const caseIndex = Number(button.dataset.case);
      const card = button.closest(".case-card");
      card.querySelectorAll(".case-choice").forEach(item => item.classList.remove("good"));
      if (button.dataset.good === "true") {
        button.classList.add("good");
        document.querySelector(`#case-feedback-${caseIndex}`).textContent = masteryCases[caseIndex].answer;
      } else {
        document.querySelector(`#case-feedback-${caseIndex}`).textContent = "이 선택은 현장 리스크가 큽니다. 안전 승인, 변경점, 로그/계측값, owner 확인을 먼저 세우세요.";
      }
    });
  });
  renderMasteryScore();
}

renderMastery();
