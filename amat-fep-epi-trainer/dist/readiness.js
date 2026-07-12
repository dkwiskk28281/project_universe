const readinessState = JSON.parse(localStorage.getItem("ceReadinessState") || "{}");
let activeReadinessTab = "micro";

const readinessLevels = [
  ["관찰자", "혼자 작업 금지", 0.2],
  ["보조 가능", "선임 지시 아래 단순 확인 가능", 0.45],
  ["부분 수행", "승인된 낮은 위험 작업을 입회 아래 수행", 0.7],
  ["독립 준비", "비위험 진단과 문서화는 독립 가능", 0.9],
  ["시니어 훈련 후보", "install 흐름을 리드할 준비가 보임", 1]
];

const readinessGates = [
  ["rg-001", "나는 고객 site rule, Applied EHS, stop-work authority가 장비 일정보다 우선임을 설명할 수 있다."],
  ["rg-002", "나는 어떤 작업이 permit, LOTO, gas owner, electrical owner 승인 없이는 금지인지 구분할 수 있다."],
  ["rg-003", "나는 gas cabinet, detector, exhaust, abatement, purge status를 safety envelope로 묶어 설명할 수 있다."],
  ["rg-004", "나는 DMM으로 측정 가능한 항목과 측정하면 안 되는 energized/high-risk 항목을 구분할 수 있다."],
  ["rg-005", "나는 schematic에서 sensor input, actuator output, interlock chain, power path를 표시할 수 있다."],
  ["rg-006", "나는 site readiness review에서 floor, route, POC, utility, owner, permit, punch list를 확인할 수 있다."],
  ["rg-007", "나는 move-in 중 crate damage, shock/tilt, contamination control, rigging handoff를 기록할 수 있다."],
  ["rg-008", "나는 hook-up drawing, P&ID, as-built, redline의 의미와 책임 경계를 설명할 수 있다."],
  ["rg-009", "나는 first power-on 전 EMO, E-stop, exhaust, cooling, gas, vacuum interlock 확인이 선행됨을 설명할 수 있다."],
  ["rg-010", "나는 RTP에서 temperature trace, ramp, soak, spike, pyrometry, emissivity를 연결할 수 있다."],
  ["rg-011", "나는 EPI에서 precursor, dopant, H2, HCl, pressure, surface preparation, defect를 연결할 수 있다."],
  ["rg-012", "나는 pumpdown 지연, MFC mismatch, robot sensor mismatch, defect 증가를 각각 subsystem별로 분해할 수 있다."],
  ["rg-013", "나는 PM 직후 문제를 변경점, 손댄 부위, connector, seal, calibration, valve state부터 확인할 수 있다."],
  ["rg-014", "나는 qualification package에 들어갈 baseline trace, metrology, transfer reliability, open deviation을 설명할 수 있다."],
  ["rg-015", "나는 고객에게 사실, 영향, 리스크, 다음 액션, ETA를 1분 안에 보고할 수 있다."],
  ["rg-016", "나는 모르는 상태에서 추정 원인을 확정처럼 말하지 않고 escalation note를 작성할 수 있다."],
  ["rg-017", "나는 tool owner, facility owner, EHS, senior CE, contractor의 책임 경계를 구분할 수 있다."],
  ["rg-018", "나는 어떤 상황에서 작업을 멈추고 선임/고객 승인을 기다려야 하는지 10개 이상 말할 수 있다."]
  ,
  ["rg-019", "나는 install 단계별 pass evidence와 stop condition을 구분해 말할 수 있다."],
  ["rg-020", "나는 LL, TM, PM/CM, FI/EFEM 사이 wafer handoff와 pressure boundary를 설명할 수 있다."],
  ["rg-021", "나는 facility ready signal과 실제 physical state가 다를 때 작업을 보류하고 owner를 지정할 수 있다."],
  ["rg-022", "나는 SAT/qualification sign-off 전에 필요한 evidence pack과 open punch item을 구분할 수 있다."],
  ["rg-023", "나는 host/SECS-GEM, recipe permission, time sync, data export, change control을 임의 조작 금지 영역으로 설명할 수 있다."],
  ["rg-024", "나는 고객 로그, recipe, 사진, wafer/result data를 외부로 옮기기 전 보안 승인이 필요함을 설명할 수 있다."],
  ["rg-025", "나는 toxic hydride, chlorosilane, oxidizer, fuel, inert gas의 위험 분류를 site SDS와 official gas matrix로만 확정해야 함을 안다."],
  ["rg-026", "나는 subfab pump/abatement/chiller/gas cabinet owner와 tool CE의 책임 경계를 witness/evidence로 묶을 수 있다."],
  ["rg-027", "나는 deviation, waiver, rollback, MOC/change control이 필요한 상황을 일반 punch item과 구분할 수 있다."],
  ["rg-028", "나는 process engineer와 handoff할 metrology, recipe, chamber matching, golden trace 질문을 준비할 수 있다."]
];

const noSoloRules = [
  ["Gas introduction", "gas line release, toxic/pyrophoric/corrosive gas 도입, purge 조건 변경은 절대 단독 수행 금지"],
  ["Interlock override", "interlock bypass/override는 schedule 압박이 있어도 단독 판단 금지"],
  ["Energized electrical work", "전원이 살아 있는 panel 내부 측정/조작은 권한과 절차 없이는 금지"],
  ["Chamber open after hazardous gas", "유해 gas 사용 이력 chamber 개방은 purge/permit/owner 확인 전 금지"],
  ["Recipe change for production", "고객 production recipe 변경은 change control 없이 금지"],
  ["Alarm reset without evidence", "원인 확인 없이 반복 alarm reset 후 종료 금지"],
  ["Facility valve operation", "고객 facility valve/damper/regulator 임의 조작 금지"],
  ["Wafer run to test risky motion", "robot/transfer 의심 상태에서 wafer를 계속 투입해 확인 금지"],
  ["Data export", "고객 로그/recipe/data 외부 반출은 보안 승인 없이 금지"],
  ["Working alone in restricted area", "제한구역, 고소, 전기, gas, confined-like 환경에서 단독 작업 금지"]
];

const supervisedMatrix = [
  ["관찰 가능", "선임의 install briefing, site walkdown, PM closeout, customer report", "기록하고 질문하기"],
  ["보조 가능", "tool wipe-down, photo log, parts kit check, non-hazard label verification", "선임 지시와 고객 rule 안에서"],
  ["입회 필요", "DMM low-risk check, sensor I/O 확인, robot dry observation, pumpdown trend capture", "선임이 옆에서 판단"],
  ["승인 후 수행", "PM 항목 일부, connector reseat, non-hazard cover open, baseline data export", "작업 허가와 절차가 있을 때"],
  ["단독 금지", "gas, energized electrical, interlock, chamber hazardous open, production recipe, facility valve", "권한/입회/문서 없으면 멈춤"]
];

const mockInstallProject = [
  {
    phase: "Day -30 to -7: Site Readiness",
    tasks: ["utility matrix 작성", "POC owner 확인", "floor/route/service clearance 확인", "permit 필요 작업 목록화", "long lead blocker 추적"],
    deliverable: "Site readiness review sheet + blocker punch list"
  },
  {
    phase: "Day 0: Move-in",
    tasks: ["crate/shock/tilt 확인", "반입 동선 contamination control", "tool placement/leveling witness", "damage photo log", "missing kit 기록"],
    deliverable: "Move-in report + photo evidence"
  },
  {
    phase: "Day 1-3: Hook-up",
    tasks: ["drawing revision 확인", "power/gas/vacuum/exhaust/cooling/network owner 확인", "as-built redline", "leak/purge/witness 기록", "open item owner 지정"],
    deliverable: "Hook-up evidence binder + redline/as-built notes"
  },
  {
    phase: "Day 4-7: Bring-up",
    tasks: ["EMO/E-stop/interlock 확인", "controller boot/I/O 상태", "pumpdown baseline", "MFC response trend", "robot dry run"],
    deliverable: "Subsystem bring-up checklist + baseline trace pack"
  },
  {
    phase: "Day 8-14: Qualification",
    tasks: ["thermal/process baseline", "wafer transfer reliability", "metrology summary", "deviation log", "customer sign-off prep"],
    deliverable: "Qualification package + acceptance matrix"
  },
  {
    phase: "Day 15+: Handover",
    tasks: ["open punch item", "PM schedule", "known issue", "spares/tools", "early-life trend monitoring"],
    deliverable: "Handover note + first 30-day watch list"
  }
];

const seniorQuestionBank = [
  "이 tool의 정확한 platform/chamber option은 무엇인가?",
  "이 고객 site에서 Applied scope와 customer facility scope의 경계는 어디인가?",
  "gas line release를 누가 승인하고 어떤 evidence가 필요한가?",
  "first power-on 전에 반드시 witness가 필요한 interlock은 무엇인가?",
  "이 chamber의 golden baseline trace는 어디에 저장되어 있는가?",
  "PM 직후 first wafer 전에 senior가 꼭 보는 data는 무엇인가?",
  "pumpdown curve가 느릴 때 이 site에서 escalation 기준은 무엇인가?",
  "MFC mismatch가 나면 gas owner를 언제 불러야 하는가?",
  "abatement trip 시 tool response와 customer response는 각각 무엇인가?",
  "qualification fail 시 rework와 retest 범위는 누가 결정하는가?",
  "customer production release 전 open punch item 허용 기준은 무엇인가?",
  "로그/recipe/data를 외부로 가져갈 수 있는 승인 절차는 무엇인가?",
  "이 장비에서 가장 자주 반복되는 early-life failure는 무엇인가?",
  "선임들이 신입에게 가장 먼저 금지하는 실수는 무엇인가?",
  "삼성 평택 site에서 다른 fab과 특히 다른 rule은 무엇인가?"
];

const practicalSkillGates = [
  ["DMM", "전압/저항/연속성의 의미, 측정 전 energy state 확인, meter range와 lead 위치 확인"],
  ["Schematic", "power path, sensor, actuator, relay, interlock chain, connector pin을 따라가기"],
  ["Vacuum", "pumpdown curve, base pressure, valve state, gauge reliability, leak suspicion 이해"],
  ["Gas Safety", "SDS, gas cabinet, detector, purge, exhaust, abatement, emergency response 이해"],
  ["RTP Data", "temperature trace, lamp command, pyrometry, emissivity, wafer rotation, cooling trend 읽기"],
  ["EPI Data", "thickness, Rs/resistivity, defect map, gas flow, pressure, temperature, pre-clean 이력 연결"],
  ["Automation", "robot teach, home, end-effector, slit valve, sensor timing, cassette seating 이해"],
  ["Documentation", "fact, impact, risk, owner, ETA, evidence를 남기는 습관"],
  ["Customer Communication", "모르는 것은 모른다고 말하고 확인 계획을 제시하기"],
  ["Housekeeping", "cleanroom contamination source를 만들지 않는 도구/부품/작업 자세"]
];

const nonPublicReadinessGaps = [
  "정확한 valve sequence, purge cycle, leak-check acceptance value, detector setpoint, interlock bypass policy",
  "삼성 평택 특정 라인의 escort, photo, data export, 작업허가, tool access, emergency route, gas response rule",
  "Applied 내부 install manual, chamber option BOM, field service bulletin, FMEA, official troubleshooting tree",
  "고객 production recipe, acceptance limit, metrology spec, golden trace, chamber matching 기준",
  "POC별 owner name, live facility status, subfab abatement/pump/chiller configuration, site-specific alarm mapping"
];

const microAuditDomains = [
  {
    title: "장비 정체성 / Scope",
    pass: [
      "FEP/EPI가 단일 장비명이 아니라 Front-End Process / Epitaxy 업무 영역임을 설명한다.",
      "Centura Prime/Xtera/200mm Epi, Vantage RTP 계열처럼 platform과 chamber option을 나눠 본다.",
      "Applied scope, customer facility scope, contractor scope를 punch item마다 owner로 분리한다."
    ],
    risk: "모델명만 외우면 실제 site option, chamber count, pre-clean/etch integration, 고객 scope를 놓친다.",
    drill: "가상 장비 1대를 platform, PM/CM, LL/TM, FI/EFEM, gas option, customer facility POC로 쪼개서 그려본다."
  },
  {
    title: "Safety / Permit / LOTO",
    pass: [
      "stop-work authority, permit, LOTO, stored energy, PPE, confined-like space, working-at-height를 장비 일정보다 우선한다.",
      "전기뿐 아니라 mechanical, pneumatic, hydraulic, chemical, thermal stored energy도 hazardous energy로 본다.",
      "gas introduction, interlock override, energized electrical work는 단독 수행 금지로 말할 수 있다."
    ],
    risk: "일정 압박에서 bypass나 informal reset을 하면 가장 빠르게 사고/징계/라인 중단으로 이어진다.",
    drill: "작업 하나를 골라 필요한 permit, witness, energy isolation, re-energization 조건을 1장으로 쓴다."
  },
  {
    title: "Facility Hook-up",
    pass: [
      "POC, P&ID, hook-up drawing, as-built/redline, flow direction, line label, owner를 같이 본다.",
      "power, CDA/N2, gas, vacuum, exhaust, PCW/chiller, network, host를 각각 pass evidence로 분리한다.",
      "facility ready signal과 실제 physical state가 다르면 작업을 보류하고 owner를 지정한다."
    ],
    risk: "ready bit만 보고 실제 exhaust/abatement/PCW/pump 상태를 확인하지 않으면 qualification에서 원인 분리가 무너진다.",
    drill: "source-to-abatement 또는 PCW supply-to-return walkdown checklist를 작성한다."
  },
  {
    title: "Gas / Chemistry",
    pass: [
      "silane, DCS/TCS/STC, H2, HCl, PH3, AsH3, B2H6, GeH4, O2/O3/N2O, NH3, N2/Ar/He를 hazard family로 분류한다.",
      "toxic hydride, chlorosilane, fuel, oxidizer, inert gas는 detector/exhaust/abatement/purge 사고가 다름을 설명한다.",
      "actual gas use는 app이나 구글이 아니라 official gas matrix, SDS, 장비 option, customer recipe로만 확정한다."
    ],
    risk: "가스 이름만 외우면 독성/가연성/부식성/산소결핍/압력/호환성 중 무엇이 핵심인지 놓친다.",
    drill: "한 gas를 골라 cabinet -> VMB/VMP -> tool gas panel -> chamber/foreline -> abatement -> monitor까지 evidence를 나열한다."
  },
  {
    title: "Vacuum / Automation / Wafer Flow",
    pass: [
      "FOUP/FI/EFEM/LL/TM/PM/CM의 pressure boundary와 wafer handoff를 순서대로 설명한다.",
      "pumpdown delay를 seal, valve state, pump, foreline, gauge, recent PM, facility interface로 분리한다.",
      "robot mis-pick은 teach, end-effector, cassette seating, sensor timing, vibration, slit valve timing으로 나눠 본다."
    ],
    risk: "wafer를 계속 넣어서 확인하는 방식은 scrap과 chamber damage risk를 키운다.",
    drill: "wafer path 하나를 선택해 각 handoff에서 필요한 sensor, valve, pressure state를 적는다."
  },
  {
    title: "Electrical / Controls / DVM",
    pass: [
      "DVM 전압/저항/연속성 측정 조건과 lead 위치, CAT rating, energized work 금지 경계를 말한다.",
      "schematic에서 24V power path, 0V/common, relay coil/contact, sensor input, actuator output, interlock chain을 따라간다.",
      "host communication, time sync, alarm history, trace data, recipe event를 증거 시간축으로 맞춘다."
    ],
    risk: "전원 상태를 모르는 저항 측정, 잘못 꽂은 current jack, 권한 밖 panel 측정은 사람과 장비를 동시에 위험하게 한다.",
    drill: "가상 24V sensor fault를 open, short, blown fuse, bad common, failed sensor로 나눠 측정 계획을 쓴다."
  },
  {
    title: "Qualification / Process Handoff",
    pass: [
      "SAT/qualification을 safety release, subsystem baseline, wafer transfer reliability, process/metrology evidence로 나눈다.",
      "EPI에서는 thickness, Rs/resistivity, defect map, dopant response, chamber seasoning, pre-clean history를 연결한다.",
      "RTP에서는 ramp, soak/spike, lamp command, pyrometry, emissivity, rotation, cooling trend를 연결한다."
    ],
    risk: "process result만 보고 safety/facility baseline을 놓치면 같은 문제가 early-life failure로 돌아온다.",
    drill: "qualification fail 하나를 gas, vacuum, thermal, automation, metrology, recipe permission으로 분해한다."
  },
  {
    title: "Customer / Security / Documentation",
    pass: [
      "고객 보고를 fact, impact, risk, next action, owner, ETA, next update로 말한다.",
      "photo/log/recipe/wafer data export는 site 보안 승인 전 금지로 처리한다.",
      "deviation, waiver, rollback, MOC/change control, open punch item을 구분한다."
    ],
    risk: "기술적으로 맞아도 보안/보고/승인 체계를 깨면 현장 신뢰를 잃는다.",
    drill: "unsafe request를 받았을 때 멈추는 문장과 안전하게 확인 가능한 대안을 적는다."
  }
];

function saveReadiness() {
  localStorage.setItem("ceReadinessState", JSON.stringify(readinessState));
  renderReadinessScore();
}

function renderReadinessScore() {
  const done = Object.values(readinessState).filter(Boolean).length;
  const total = readinessGates.length;
  const ratio = total ? done / total : 0;
  const level = readinessLevels.find(([, , threshold]) => ratio <= threshold) || readinessLevels[readinessLevels.length - 1];
  document.querySelector("#readiness-done").textContent = done;
  document.querySelector("#readiness-total").textContent = `${total}개 gate 중`;
  document.querySelector("#readiness-level").textContent = level[0];
  document.querySelector("#readiness-desc").textContent = level[1];
}

function renderReadinessTabs() {
  const tabs = [
    ["micro", "미세감사"],
    ["gates", "판정Gate"],
    ["nosolo", "단독금지"],
    ["supervised", "입회범위"],
    ["mock", "모의Install"],
    ["questions", "질문은행"],
    ["skills", "실무Skill"]
  ];
  document.querySelector("#readiness-tabs").innerHTML = tabs.map(([id, label]) =>
    `<button class="mastery-tab ${activeReadinessTab === id ? "active" : ""}" data-readiness-tab="${id}">${label}</button>`
  ).join("");
  document.querySelectorAll("[data-readiness-tab]").forEach(btn => {
    btn.addEventListener("click", () => {
      activeReadinessTab = btn.dataset.readinessTab;
      renderReadiness();
    });
  });
}

function readinessGatePanel() {
  return `<div class="mastery-grid">${readinessGates.map(([id, text]) => `
    <label class="mastery-check">
      <input type="checkbox" data-readiness-gate="${id}" ${readinessState[id] ? "checked" : ""} />
      <span>${text}</span>
    </label>
  `).join("")}</div>`;
}

function microAuditPanel() {
  return `
    <div class="mastery-grid">
      <article class="mastery-card">
        <span class="level-pill">현실 판정</span>
        <h2>이 웹 하나만으로 독립 현장투입은 불가</h2>
        <p>공개자료 기반 학습은 방향과 언어를 만들 수 있지만, 실제 install 권한은 Applied 공식 교육, 고객 site orientation, 장비별 manual, permit, senior witness, 고객 sign-off가 있어야 생깁니다.</p>
        <strong>웹으로 대체 불가한 비공개/현장 항목</strong>
        <ul>${nonPublicReadinessGaps.map(item => `<li>${item}</li>`).join("")}</ul>
      </article>
      ${microAuditDomains.map(domain => `
        <article class="mastery-card">
          <span class="level-pill">AUDIT</span>
          <h2>${domain.title}</h2>
          <strong>Pass 조건</strong>
          <ul>${domain.pass.map(item => `<li>${item}</li>`).join("")}</ul>
          <strong>놓치면 위험한 점</strong>
          <p>${domain.risk}</p>
          <strong>훈련</strong>
          <p>${domain.drill}</p>
        </article>
      `).join("")}
    </div>
  `;
}

function noSoloPanel() {
  return `<div class="mastery-grid">${noSoloRules.map(([title, body]) => `
    <article class="mastery-card">
      <span class="level-pill">STOP</span>
      <h2>${title}</h2>
      <p>${body}</p>
    </article>
  `).join("")}</div>`;
}

function supervisedPanel() {
  return `<div class="mastery-grid">${supervisedMatrix.map(([level, examples, rule]) => `
    <article class="mastery-card">
      <span class="level-pill">${level}</span>
      <h2>${rule}</h2>
      <p>${examples}</p>
    </article>
  `).join("")}</div>`;
}

function mockInstallPanel() {
  return `<div class="mastery-grid">${mockInstallProject.map(item => `
    <article class="mastery-card">
      <span class="level-pill">${item.phase}</span>
      <ul>${item.tasks.map(task => `<li>${task}</li>`).join("")}</ul>
      <strong>산출물</strong>
      <p>${item.deliverable}</p>
    </article>
  `).join("")}</div>`;
}

function questionPanel() {
  return `<div class="mastery-grid">${seniorQuestionBank.map(question => `
    <article class="mastery-card">
      <h2>선임에게 물어볼 질문</h2>
      <p>${question}</p>
    </article>
  `).join("")}</div>`;
}

function skillPanel() {
  return `<div class="mastery-grid">${practicalSkillGates.map(([title, body]) => `
    <article class="mastery-card">
      <h2>${title}</h2>
      <p>${body}</p>
    </article>
  `).join("")}</div>`;
}

function renderReadiness() {
  renderReadinessTabs();
  const renderers = {
    micro: microAuditPanel,
    gates: readinessGatePanel,
    nosolo: noSoloPanel,
    supervised: supervisedPanel,
    mock: mockInstallPanel,
    questions: questionPanel,
    skills: skillPanel
  };
  document.querySelector("#readiness-panel").innerHTML = renderers[activeReadinessTab]();
  document.querySelectorAll("[data-readiness-gate]").forEach(input => {
    input.addEventListener("change", () => {
      readinessState[input.dataset.readinessGate] = input.checked;
      saveReadiness();
    });
  });
  renderReadinessScore();
}

renderReadiness();
