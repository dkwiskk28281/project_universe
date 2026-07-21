const CE_READINESS_KEY = "ceReadinessState";

function readReadinessJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
  } catch {
    return fallback;
  }
}

function writeReadinessJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function html(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

const readinessState = readReadinessJson(CE_READINESS_KEY, {});
let activeReadinessTab = "definition";

const readinessLevels = [
  ["관찰자", "혼자 작업 금지. 선임 옆에서 site rule, 용어, evidence 기록을 익히는 단계.", 0.2],
  ["보조 가능", "승인된 낮은 위험 작업에서 visual check, 기록, parts 준비를 보조할 수 있는 단계.", 0.45],
  ["Tier 1 부분 수행", "작업허가와 선임 witness 아래 routine PM 일부와 evidence pack을 수행할 준비.", 0.7],
  ["Tier 1 독립 준비", "권한 범위 안에서 alarm categorization, PM closeout, customer update를 안정적으로 수행할 준비.", 0.9],
  ["CE II 첫날 고성능 준비", "모르는 것을 숨기지 않고, 안전/증거/보고/에스컬레이션을 선임 수준의 언어로 운영하는 단계.", 1.01]
];

const definitionCards = [
  {
    title: "Tier 1 CE는 무엇인가",
    body: "공식 교육과 고객 site rule 안에서 반복 가능한 field service 작업을 안전하게 수행하고, 이상 징후를 subsystem과 evidence로 분류해 선임/owner에게 올리는 Customer Engineer입니다.",
    check: "routine PM, visual inspection, tool startup/shutdown, system initialization, alarm categorization, basic replacement, documentation, handover."
  },
  {
    title: "Tier 1의 성공 기준",
    body: "혼자 해결한 영웅담이 아니라, wafer와 사람을 위험하게 하지 않고 작업 범위, touched item, pass evidence, open item, owner, ETA를 남기는 것입니다.",
    check: "선임이 기록만 보고도 현재 상태와 다음 행동을 이해할 수 있어야 합니다."
  },
  {
    title: "Tier 1이 아닌 것",
    body: "root cause engineering, design modification, software development, advanced RF tuning, advanced process optimization, recipe edit, valve sequence, detector setpoint, interlock bypass, site-specific acceptance limit 결정.",
    check: "이 영역은 공식 owner, senior CE, process/product support, EHS, customer approval이 필요합니다."
  },
  {
    title: "공개자료 경계",
    body: "이 웹은 Applied 공개 채용공고, Applied service/product 공개 페이지, SEMI/OSHA/NIOSH 등 공개 안전 자료와 일반 field engineering practice를 바탕으로 mental model을 만듭니다.",
    check: "실제 manual, customer spec, gas matrix, SDS binder, acceptance limit는 입사 후 승인 문서가 우선입니다."
  }
];

const readinessGates = [
  ["rg-001", "Applied CE 역할을 install, maintain, upgrade, PM/CM, basic diagnostic, customer liaison로 설명할 수 있다."],
  ["rg-002", "Tier 1 작업과 Tier 2/3 escalation 영역을 분리해 말할 수 있다."],
  ["rg-003", "stop-work authority를 schedule보다 우선한다고 설명할 수 있다."],
  ["rg-004", "permit, LOTO, stored energy, PPE, owner witness가 필요한 작업을 식별할 수 있다."],
  ["rg-005", "고객 site rule, photo/data export, escort, emergency route 확인 질문을 만들 수 있다."],
  ["rg-006", "FOUP, load port, EFEM, load lock, TM, PM/CM wafer path를 순서대로 설명할 수 있다."],
  ["rg-007", "load lock이 대기와 vacuum boundary를 분리하는 이유를 설명할 수 있다."],
  ["rg-008", "pumpdown curve abnormal을 seal, valve, pump, foreline, gauge, recent PM으로 분리한다."],
  ["rg-009", "leak checking은 공식 절차와 acceptance 기준 없이 단정하지 않는다고 말할 수 있다."],
  ["rg-010", "O-ring replacement 후 surface, seating, cleanliness, leak/pumpdown evidence를 확인해야 함을 안다."],
  ["rg-011", "torque procedure는 공식 spec, tool calibration, pattern, witness가 우선임을 안다."],
  ["rg-012", "visual inspection에서 damage, loose connector, cable strain, contamination, missing label을 찾는다."],
  ["rg-013", "tool startup failure를 power, controller, interlock, facility, module, host로 분리한다."],
  ["rg-014", "tool shutdown 전 gas, vacuum, thermal, motion, wafer state를 확인해야 함을 안다."],
  ["rg-015", "system initialization alarm 발생 시 reset 전 time, module, alarm history, recent change를 남긴다."],
  ["rg-016", "recipe verification은 name/version/permission/tool/chamber/wafer ID 확인이지 recipe edit가 아님을 안다."],
  ["rg-017", "basic process verification은 baseline wafer/metrology/traceability 확인이고 optimization이 아님을 안다."],
  ["rg-018", "MFC actual mismatch에서 supply, valve, restriction, MFC, sensor, purge/exhaust를 나눈다."],
  ["rg-019", "gas source-to-abatement chain을 cabinet, VMB/VMP, gas panel, chamber, exhaust, abatement로 그릴 수 있다."],
  ["rg-020", "toxic, pyrophoric, corrosive, flammable, inert gas 위험을 SDS 기준으로 확인해야 함을 안다."],
  ["rg-021", "gas introduction, toxic gas line release, purge condition 변경은 단독 수행 금지라고 말할 수 있다."],
  ["rg-022", "cooling/PCW/chiller issue에서 facility owner evidence가 필요함을 안다."],
  ["rg-023", "pneumatic valve fault를 command, air source, actuator, mechanical path, feedback sensor로 나눈다."],
  ["rg-024", "sensor replacement 후 signal, connector, calibration/teach, alarm clear, baseline evidence를 확인한다."],
  ["rg-025", "DVM 측정 전 expected value를 세우고 meter/lead/range를 확인한다."],
  ["rg-026", "energized work는 승인, 자격, PPE, site rule 없이 수행하지 않는다."],
  ["rg-027", "relay coil/contact, NO/NC, PLC input/output을 간단히 설명할 수 있다."],
  ["rg-028", "interlock failed 상황에서 bypass 대신 safety chain evidence를 확인한다."],
  ["rg-029", "wafer handling abnormal에서 wafer 반복 투입을 멈추고 slot map, sensor, robot, valve evidence를 본다."],
  ["rg-030", "robot basics: home, teach, end-effector, mapping, sensor timing을 현장 용어로 설명한다."],
  ["rg-031", "ESC/RF는 operational status와 alarm 이해까지만 Tier 1 범위이고 advanced tuning은 제외임을 안다."],
  ["rg-032", "temperature unstable trace에서 sensor, thermal source, cooling, chamber history, golden trace를 비교한다."],
  ["rg-033", "pressure control issue에서 gauge reliability와 valve feedback을 함께 본다."],
  ["rg-034", "turbo pump trip에서 backing/foreline/cooling/vibration/controller/recent PM evidence를 확인한다."],
  ["rg-035", "rough pump issue와 facility exhaust/abatement readiness를 혼동하지 않는다."],
  ["rg-036", "chamber conditioning/seasoning은 공식 procedure와 process owner boundary가 필요함을 안다."],
  ["rg-037", "PM 이후 first wafer 전 baseline evidence와 open risk를 정리한다."],
  ["rg-038", "alarm categorization을 safety, facility, vacuum, gas, motion, electrical, host/data, process result로 나눈다."],
  ["rg-039", "alarm reset 없이 먼저 evidence를 capture하는 습관을 갖는다."],
  ["rg-040", "customer update를 fact, impact, risk, next action, owner, ETA로 말할 수 있다."],
  ["rg-041", "service report에는 고객 비공개자료, recipe, setpoint, serial 전체를 넣지 않는다고 말할 수 있다."],
  ["rg-042", "shift handover에 completed work, open item, owner, ETA, do-not-do를 넣는다."],
  ["rg-043", "unsafe customer request를 정중히 hold하고 escalation path를 제시할 수 있다."],
  ["rg-044", "basic hardware replacement 전후 part identity, touched connector, baseline evidence를 기록한다."],
  ["rg-045", "valve replacement 후 command/feedback, motion, leak/pumpdown, alarm clear를 확인한다."],
  ["rg-046", "fastener standards는 공식 part/spec/source 우선이며 감으로 대체하지 않는다고 안다."],
  ["rg-047", "qualification handover 전 pass evidence와 open deviation을 분리한다."],
  ["rg-048", "baseline wafer 한 장만으로 production release를 단정하지 않는다."],
  ["rg-049", "고객과 선임 대화에서 모르는 것을 추정처럼 말하지 않고 확인 계획으로 말한다."],
  ["rg-050", "매일 현장 로그를 symptom/evidence/action/result/next action 구조로 남긴다."]
];

const dayOneFlow = [
  ["0. 도착 전", "job scope, site address, contact, PPE, training requirement, work window, tool/platform, expected role을 확인한다."],
  ["1. Site entry", "escort, badge, gowning, emergency route, photo/data rule, customer POC, EHS contact를 확인한다."],
  ["2. Pre-job brief", "작업 범위, permit/LOTO, owner, stop condition, communication channel, next update time을 맞춘다."],
  ["3. Tool walkdown", "floor/route/service clearance, utility panels, gas/exhaust/abatement/cooling/power/network owner boundary를 본다."],
  ["4. Before evidence", "current alarms, recent change, baseline trace, visual state, open punch item을 기록한다."],
  ["5. Work support", "공식 절차 안에서 parts, visual check, log capture, basic checks, report draft를 수행한다."],
  ["6. Closeout", "touched item, pass evidence, open item, owner, ETA, residual risk, handover note를 남긴다."]
];

const subsystemMatrix = [
  ["EFEM / FI", "FOUP ID, slot map, wafer handoff, clean atmosphere boundary", "mapping mismatch, carrier seating, sensor timing, host association"],
  ["Load Port", "FOUP docking, carrier clamp, door interface, E84/handshake concept", "carrier not seated, ID mismatch, door open/close fault"],
  ["Load Lock", "atmosphere-vacuum boundary, pump/vent, pressure gauge, slit/gate valve", "pumpdown delay, vent issue, pressure not ready"],
  ["Transfer Module", "vacuum robot, wafer routing, gate valve coordination", "mis-pick, scrape, sensor mismatch, robot not home"],
  ["Process Module", "EPI/RTP process environment, temperature, pressure, gas, wafer support", "trace drift, defect, particle, nonuniformity"],
  ["Clean/Cool Module", "pre-clean, cooldown, chamber recovery option", "residual, temperature not ready, queue/handling risk"],
  ["Gas Box / MFC", "gas delivery, flow control, purge, pressure response", "MFC mismatch, supply pressure drift, valve fault"],
  ["Vacuum Pumps", "rough/turbo/foreline pressure boundary", "trip, vibration, cooling, base pressure issue"],
  ["Exhaust / Abatement", "hazard removal, scrub/destruction readiness, facility owner boundary", "not ready, alarm, flow uncertainty"],
  ["Electrical / Controls", "24V I/O, relay, PLC/module controller, interlock chain, host events", "I/O mismatch, fuse, connector, time sync"],
  ["Cooling / PCW", "thermal stability, pump/power supply support, chiller owner", "flow/temperature alarm, thermal drift"],
  ["Host / Data", "recipe permission, wafer traceability, event order, log export rule", "recipe version mismatch, timestamp mismatch"]
];

const noSoloRules = [
  ["Gas introduction", "toxic/pyrophoric/corrosive/flammable gas enable, line release, purge condition change는 단독 수행 금지."],
  ["Interlock bypass", "interlock override/bypass는 일정 압박이 있어도 단독 판단 금지."],
  ["Energized electrical work", "live measurement/panel access는 자격, PPE, permit, site rule, senior witness 없이는 금지."],
  ["Recipe edit / process optimization", "production recipe 변경, process tuning, acceptance limit 판단은 Tier 1 범위가 아님."],
  ["Facility valve operation", "customer facility valve, regulator, exhaust damper, gas cabinet 조작은 owner 승인 없이 금지."],
  ["Chamber open after hazardous gas", "hazardous gas history가 있는 chamber open은 purge/permit/owner 승인 전 금지."],
  ["Wafer run to test risky motion", "robot/transfer/pressure boundary가 불명확하면 wafer를 넣어 재현하지 않는다."],
  ["Customer confidential data export", "log, recipe, wafer map, image, serial 전체는 보안 승인 없이 반출하지 않는다."],
  ["Manual-only procedure", "공개자료로 알 수 없는 manual step, valve sequence, detector setpoint는 추정하지 않는다."],
  ["Working alone in restricted area", "gas, high voltage, height, confined-like, subfab risky area는 단독 작업하지 않는다."]
];

const finalCompetency = [
  ["Oral board", "senior CE 앞에서 FOUP->EFEM->LL->TM->PM flow, gas source-to-abatement chain, pumpdown issue tree를 말한다."],
  ["Scenario board", "chamber won't pump, robot stops, MFC alarm, interlock failed, leak detected case를 evidence-first로 푼다."],
  ["Report board", "customer 1분 briefing, escalation note, PM closeout, shift handover를 작성한다."],
  ["Safety board", "gas, electrical, interlock, recipe, facility, data export에서 단독 금지 조건을 말한다."],
  ["Practical board", "DVM expected value, schematic signal path, basic visual inspection, touched item list를 설명한다."],
  ["Boundary board", "public learning으로 가능한 것과 official manual/site document가 필요한 것을 분리한다."]
];

function saveReadiness() {
  writeReadinessJson(CE_READINESS_KEY, readinessState);
  renderReadinessScore();
}

function renderReadinessScore() {
  const done = Object.values(readinessState).filter(Boolean).length;
  const total = readinessGates.length;
  const ratio = total ? done / total : 0;
  const level = readinessLevels.find(([, , threshold]) => ratio <= threshold) || readinessLevels[readinessLevels.length - 1];
  const doneEl = document.querySelector("#readiness-done");
  const totalEl = document.querySelector("#readiness-total");
  const levelEl = document.querySelector("#readiness-level");
  const descEl = document.querySelector("#readiness-desc");
  if (!doneEl || !totalEl || !levelEl || !descEl) return;
  doneEl.textContent = done;
  totalEl.textContent = `${total}개 gate 중`;
  levelEl.textContent = level[0];
  descEl.textContent = level[1];
}

function renderReadinessTabs() {
  const root = document.querySelector("#readiness-tabs");
  if (!root) return;
  const tabs = [
    ["definition", "정의"],
    ["gates", "Gate"],
    ["dayone", "첫날 흐름"],
    ["subsystems", "서브시스템"],
    ["nosolo", "단독 금지"],
    ["final", "최종판정"]
  ];
  root.innerHTML = tabs.map(([id, label]) =>
    `<button class="mastery-tab ${activeReadinessTab === id ? "active" : ""}" data-readiness-tab="${id}">${label}</button>`
  ).join("");
  root.querySelectorAll("[data-readiness-tab]").forEach(button => {
    button.addEventListener("click", () => {
      activeReadinessTab = button.dataset.readinessTab;
      renderReadiness();
    });
  });
}

function definitionPanel() {
  return `
    <div class="mastery-grid">
      ${definitionCards.map(card => `
        <article class="mastery-card">
          <span class="level-pill">TIER 1</span>
          <h2>${html(card.title)}</h2>
          <p>${html(card.body)}</p>
          <strong>확인 문장</strong>
          <p>${html(card.check)}</p>
        </article>
      `).join("")}
    </div>
  `;
}

function gatePanel() {
  return `<div class="mastery-grid">${readinessGates.map(([id, text]) => `
    <label class="mastery-check">
      <input type="checkbox" data-readiness-gate="${id}" ${readinessState[id] ? "checked" : ""} />
      <span>${html(text)}</span>
    </label>
  `).join("")}</div>`;
}

function dayOnePanel() {
  return `
    <div class="mastery-grid">
      ${dayOneFlow.map(([title, body]) => `
        <article class="mastery-card">
          <span class="level-pill">DAY 1</span>
          <h2>${html(title)}</h2>
          <p>${html(body)}</p>
        </article>
      `).join("")}
    </div>
  `;
}

function subsystemPanel() {
  return `
    <div class="mastery-grid">
      ${subsystemMatrix.map(([name, role, symptoms]) => `
        <article class="mastery-card">
          <span class="level-pill">SUBSYSTEM</span>
          <h2>${html(name)}</h2>
          <strong>역할</strong>
          <p>${html(role)}</p>
          <strong>Tier 1이 알아듣는 증상</strong>
          <p>${html(symptoms)}</p>
        </article>
      `).join("")}
    </div>
  `;
}

function noSoloPanel() {
  return `
    <div class="mastery-grid">
      ${noSoloRules.map(([title, body]) => `
        <article class="mastery-card">
          <span class="level-pill">STOP</span>
          <h2>${html(title)}</h2>
          <p>${html(body)}</p>
        </article>
      `).join("")}
    </div>
  `;
}

function finalPanel() {
  return `
    <div class="mastery-grid">
      ${finalCompetency.map(([title, body]) => `
        <article class="mastery-card">
          <span class="level-pill">FINAL</span>
          <h2>${html(title)}</h2>
          <p>${html(body)}</p>
        </article>
      `).join("")}
      <article class="mastery-card">
        <span class="level-pill">PASS RULE</span>
        <h2>첫날 CE II처럼 보이는 기준</h2>
        <p>모든 답을 외우는 것이 아니라, unsafe action을 멈추고, subsystem/evidence/owner/next action/customer sentence로 정리할 수 있어야 합니다.</p>
      </article>
    </div>
  `;
}

function bindReadiness() {
  document.querySelectorAll("[data-readiness-gate]").forEach(input => {
    input.addEventListener("change", () => {
      readinessState[input.dataset.readinessGate] = input.checked;
      saveReadiness();
    });
  });
}

function renderReadiness() {
  renderReadinessTabs();
  const panel = document.querySelector("#readiness-panel");
  if (!panel) return;
  const renderers = {
    definition: definitionPanel,
    gates: gatePanel,
    dayone: dayOnePanel,
    subsystems: subsystemPanel,
    nosolo: noSoloPanel,
    final: finalPanel
  };
  panel.innerHTML = (renderers[activeReadinessTab] || definitionPanel)();
  bindReadiness();
  renderReadinessScore();
}

window.ProjectUniverseTier1Readiness = {
  gates: readinessGates,
  noSoloRules,
  subsystemMatrix,
  getState: () => ({ ...readinessState })
};

renderReadiness();
