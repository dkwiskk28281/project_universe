const clusterPlatforms = {
  centuraPrime: {
    label: "Centura Prime Epi 개념 구성",
    maxPm: 4,
    maxClean: 2,
    maxCool: 1,
    defaultRequest: { pm: 2, clean: 1, cool: 1 },
    core: "Centura TM",
    coreDesc: "central robotic transfer chamber",
    fact: "Applied 공개 자료는 Centura 계열을 high-vacuum, advanced robotics, large facet platform으로 설명하고, Centura/AP architecture는 up to four process chambers가 가능하다고 설명합니다.",
    answer: ["loadlock", "loadlock", "clean", "epi", "epi", "cool"],
    allowedPm: ["epi"],
    lesson: "Prime Epi는 EPI PM과 pre-clean 통합 여부가 핵심입니다. LL이 vacuum boundary를 만들고 TM robot이 PM/clean/cool module 사이 wafer를 이동시키는 개념으로 학습하세요."
  },
  centuraXtera: {
    label: "Centura Xtera Epi 개념 구성",
    maxPm: 4,
    maxClean: 2,
    maxCool: 1,
    defaultRequest: { pm: 2, clean: 1, cool: 1 },
    core: "Centura TM",
    coreDesc: "selective epi cluster",
    fact: "Xtera는 공개 자료에서 selective epitaxy, integrated pre-clean/etch, real-time wafer temperature monitoring/control, lower gas usage가 강조됩니다.",
    answer: ["loadlock", "loadlock", "clean", "selective", "selective", "cool"],
    allowedPm: ["selective"],
    lesson: "Xtera는 일반 EPI PM 수만 맞추는 것이 아니라 selective EPI와 clean/etch support의 연결을 이해해야 합니다."
  },
  centura200: {
    label: "Centura Epi 200mm 개념 구성",
    maxPm: 3,
    maxClean: 1,
    maxCool: 1,
    defaultRequest: { pm: 3, clean: 1, cool: 0 },
    core: "Centura TM",
    coreDesc: "200mm multi-chamber",
    fact: "Applied Centura Epi 200mm 공개 페이지는 single-wafer multi-chamber epitaxial silicon deposition, up to three process chambers, Siconi pre-clean chamber 구성을 언급합니다.",
    answer: ["loadlock", "loadlock", "clean", "epi", "epi", "epi"],
    allowedPm: ["epi"],
    lesson: "200mm Epi는 legacy처럼 보여도 thick film, chamber matching, flexible gas panel, slip/defect/Rs uniformity를 같이 봅니다."
  },
  genericCentura: {
    label: "Generic Centura Cluster Tool",
    maxPm: 4,
    maxClean: 2,
    maxCool: 2,
    defaultRequest: { pm: 4, clean: 0, cool: 0 },
    core: "Centura TM",
    coreDesc: "single buffer chamber + robot",
    fact: "공개 patent/cluster tool 자료는 Centura를 central robot/transfer chamber가 load lock과 multiple process chambers 사이 wafer를 이동시키는 multi-chamber tool로 설명합니다.",
    answer: ["loadlock", "loadlock", "epi", "epi", "epi", "epi"],
    allowedPm: ["epi", "selective", "rtp"],
    lesson: "Generic mode는 PM 개수와 LL/TM/flow 개념을 익히는 sandbox입니다. 실제 chamber 종류는 고객 config에 따릅니다."
  },
  vantageRtp: {
    label: "Vantage RTP 개념 구성",
    maxPm: 4,
    maxClean: 0,
    maxCool: 2,
    defaultRequest: { pm: 2, clean: 0, cool: 1 },
    core: "Vantage Handler",
    coreDesc: "thermal process platform",
    fact: "Applied Vantage RTP 제품군은 Radiance Plus, Vulcan, RadOx, Astra 같은 thermal treatment/oxidation/anneal chamber option으로 갈라집니다.",
    answer: ["loadlock", "loadlock", "rtp", "rtp", "cool", "empty"],
    allowedPm: ["rtp"],
    lesson: "Vantage는 Centura EPI와 같은 의미의 EPI cluster가 아니라 RTP/thermal treatment 계열입니다. PM은 RTP chamber로 해석하세요."
  }
};

const clusterSlots = [
  { id: "ll-a", role: "LL-A", family: "loadlock", x: 29, y: 82 },
  { id: "ll-b", role: "LL-B", family: "loadlock", x: 55, y: 82 },
  { id: "facet-1", role: "Facet 1", family: "module", x: 40, y: 41 },
  { id: "facet-2", role: "Facet 2", family: "module", x: 72, y: 56 },
  { id: "facet-3", role: "Facet 3", family: "module", x: 40, y: 68 },
  { id: "facet-4", role: "Facet 4", family: "module", x: 8, y: 56 }
];

const moduleDefs = {
  epi: ["EPI PM", "Epitaxy Process Module"],
  selective: ["SEL EPI PM", "Selective Epi Module"],
  rtp: ["RTP PM", "Thermal Process Module"],
  clean: ["CLEAN CM", "Pre-clean / Etch / Clean Module"],
  cool: ["COOL CM", "Cooldown / Support Module"],
  loadlock: ["LOAD LOCK", "Atmosphere ↔ Vacuum Boundary"],
  empty: ["EMPTY", "Unused / blocked facet"]
};

let clusterState = {};
let selectedClusterPlatform = "centuraPrime";
let clusterFlowOn = false;
let clusterFlowStep = 0;
let clusterFlowTimer = null;

const clusterFlowSteps = [
  ["FOUP", "웨이퍼 보관통에서 시작합니다. 아직 대기압 영역입니다."],
  ["FI/EFEM", "전면 이송부가 FOUP에서 wafer를 꺼내 load lock 쪽으로 넘깁니다."],
  ["LL pumpdown", "Load Lock이 대기압 wafer를 진공 cluster로 넘기기 위해 압력을 낮춥니다."],
  ["TM robot", "Transfer Module 안의 robot이 vacuum 상태에서 wafer를 잡아 이동합니다."],
  ["PM/CM", "Process Module이나 Clean/Cool Module에서 공정 또는 보조 처리가 일어납니다."],
  ["Return", "처리 후 TM robot이 wafer를 다시 Load Lock 쪽으로 돌려보냅니다."],
  ["LL vent", "Load Lock이 다시 대기압으로 돌아와 wafer를 EFEM/FOUP으로 보냅니다."]
];

const clusterFlowPositions = [
  { left: 16, top: 31 },
  { left: 26, top: 38 },
  { left: 36, top: 78 },
  { left: 50, top: 58 },
  { left: 76, top: 64 },
  { left: 50, top: 72 },
  { left: 62, top: 85 }
];

function clusterTarget() {
  const platform = clusterPlatforms[selectedClusterPlatform];
  const pm = Number(document.querySelector("#cluster-pm-count").value);
  const clean = Number(document.querySelector("#cluster-clean-count").value);
  const cool = Number(document.querySelector("#cluster-cool-count").value);
  return {
    pm: Math.min(pm, platform.maxPm),
    clean: Math.min(clean, platform.maxClean),
    cool: Math.min(cool, platform.maxCool),
    ll: 2
  };
}

function initClusterControls() {
  const select = document.querySelector("#cluster-platform");
  select.innerHTML = Object.entries(clusterPlatforms).map(([id, item]) => `<option value="${id}">${item.label}</option>`).join("");
  select.value = selectedClusterPlatform;
  select.addEventListener("change", () => {
    selectedClusterPlatform = select.value;
    applyClusterPreset();
  });
  document.querySelector("#cluster-build-target").addEventListener("click", () => {
    clampClusterRequest();
    renderCluster();
  });
  document.querySelector("#cluster-show-answer").addEventListener("click", showClusterAnswer);
  document.querySelector("#cluster-flow").addEventListener("click", () => {
    clusterFlowOn = !clusterFlowOn;
    manageClusterFlowTimer();
    renderClusterBoard();
    renderClusterLegend();
    renderClusterFeedback();
  });
  document.querySelector("#cluster-reset").addEventListener("click", () => {
    clusterState = {};
    clusterFlowOn = false;
    manageClusterFlowTimer();
    renderCluster();
  });
}

function manageClusterFlowTimer() {
  if (clusterFlowTimer) {
    clearInterval(clusterFlowTimer);
    clusterFlowTimer = null;
  }
  if (clusterFlowOn) {
    clusterFlowStep = 0;
    clusterFlowTimer = setInterval(() => {
      clusterFlowStep = (clusterFlowStep + 1) % clusterFlowSteps.length;
      updateClusterFlowStep();
    }, 1500);
  }
}

function applyClusterPreset() {
  const preset = clusterPlatforms[selectedClusterPlatform].defaultRequest;
  document.querySelector("#cluster-pm-count").value = preset.pm;
  document.querySelector("#cluster-clean-count").value = preset.clean;
  document.querySelector("#cluster-cool-count").value = preset.cool;
  clusterState = {};
  renderCluster();
}

function clampClusterRequest() {
  const platform = clusterPlatforms[selectedClusterPlatform];
  const fields = [
    ["#cluster-pm-count", platform.maxPm],
    ["#cluster-clean-count", platform.maxClean],
    ["#cluster-cool-count", platform.maxCool]
  ];
  fields.forEach(([selector, max]) => {
    const input = document.querySelector(selector);
    input.value = Math.max(Number(input.min), Math.min(Number(input.value), max));
  });
}

function renderClusterPalette() {
  const palette = document.querySelector("#cluster-palette");
  const platform = clusterPlatforms[selectedClusterPlatform];
  const tokens = ["epi", "selective", "rtp", "clean", "cool", "loadlock", "empty"].filter(type => {
    if (["epi", "selective", "rtp"].includes(type)) return platform.allowedPm.includes(type);
    if (type === "clean") return platform.maxClean > 0;
    if (type === "cool") return platform.maxCool > 0;
    return true;
  });
  palette.innerHTML = tokens.map(type => {
    const [name, desc] = moduleDefs[type];
    return `<div class="module-token" draggable="true" data-type="${type}">${name}<small>${desc}</small></div>`;
  }).join("");
  palette.querySelectorAll(".module-token").forEach(token => {
    token.addEventListener("dragstart", event => {
      event.dataTransfer.setData("text/plain", token.dataset.type);
    });
    token.addEventListener("click", () => {
      document.querySelectorAll(".module-token").forEach(item => item.classList.remove("selected"));
      token.classList.add("selected");
    });
  });
}

function drawFlowLine(board, slot) {
  const core = { x: 50, y: 50 };
  const slotCenter = { x: slot.x + 9, y: slot.y + 6 };
  const dx = slotCenter.x - core.x;
  const dy = slotCenter.y - core.y;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx) * 180 / Math.PI;
  const line = document.createElement("div");
  line.className = "flow-line";
  line.style.left = `${core.x}%`;
  line.style.top = `${core.y}%`;
  line.style.width = `${length}%`;
  line.style.transform = `rotate(${angle}deg)`;
  board.appendChild(line);
}

function renderClusterBoard() {
  const platform = clusterPlatforms[selectedClusterPlatform];
  const board = document.querySelector("#cluster-board");
  board.classList.toggle("flowing", clusterFlowOn);
  board.innerHTML = `
    <div class="fab-scene">
      <div class="utility-rack">
        <span>GAS</span><span>VAC</span><span>EXH</span><span>PCW</span>
      </div>
      <div class="tool-cabinet efem-cabinet"><span class="status-light"></span><span class="cab-label">FI / EFEM<br>Load ports</span></div>
      <div class="tool-cabinet mainframe-cabinet"><span class="status-light"></span><span class="cab-label">${platform.core}<br>mainframe</span></div>
      <div class="tool-cabinet pm-bank-cabinet"><span class="status-light"></span><span class="cab-label">Process / Clean<br>chamber bank</span></div>
      <div class="foup foup-a"></div>
      <div class="foup foup-b"></div>
    </div>
    <div class="cutaway-label">Vacuum-side cutaway, representative layout</div>
    <div class="cutaway-deck"></div>
    <div class="cluster-core">
      <div>
        <strong>TM</strong>
        <span>${platform.core}<br>${platform.coreDesc}</span>
      </div>
    </div>
    <div class="robot-arm"></div>
    <svg class="wafer-flow-svg" viewBox="0 0 1000 760" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <marker id="flowArrow" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,6 L8,3 z" fill="#f2b33d"></path>
        </marker>
      </defs>
      <path class="flow-route" d="M150 205 C255 235 300 565 405 625 C470 665 480 500 500 440 C535 335 640 340 770 455 C680 545 585 560 500 545 C430 535 395 605 352 665 C450 710 600 705 675 660" />
    </svg>
    <div class="wafer-step-dot" aria-hidden="true">W</div>
    <div class="flow-caption">
      <strong>Wafer path</strong>
      <ol class="flow-steps">
        ${clusterFlowSteps.map(([title], index) => `<li data-flow-step="${index}">${index + 1}. ${title}</li>`).join("")}
      </ol>
      <p id="flow-step-detail"></p>
    </div>
  `;
  clusterSlots.forEach(slot => drawFlowLine(board, slot));
  clusterSlots.forEach(slot => {
    const type = clusterState[slot.id];
    const slotEl = document.createElement("button");
    slotEl.className = `slot ${type ? "filled" : ""}`;
    if (type) slotEl.dataset.type = type;
    slotEl.dataset.slot = slot.id;
    slotEl.style.left = `${slot.x}%`;
    slotEl.style.top = `${slot.y}%`;
    slotEl.innerHTML = type ? moduleFace(type, slot.role) : `<span class="slot-role">${slot.role}</span><span class="slot-name">Drop module</span>`;
    slotEl.addEventListener("dragover", event => {
      event.preventDefault();
      slotEl.classList.add("drop-hover");
    });
    slotEl.addEventListener("dragleave", () => slotEl.classList.remove("drop-hover"));
    slotEl.addEventListener("drop", event => {
      event.preventDefault();
      slotEl.classList.remove("drop-hover");
      placeClusterModule(slot.id, event.dataTransfer.getData("text/plain"));
    });
    slotEl.addEventListener("click", () => {
      const selected = document.querySelector(".module-token.selected");
      if (selected) placeClusterModule(slot.id, selected.dataset.type);
    });
    board.appendChild(slotEl);
  });
  updateClusterFlowStep();
}

function updateClusterFlowStep() {
  const detail = document.querySelector("#flow-step-detail");
  if (!detail) return;
  const [title, text] = clusterFlowSteps[clusterFlowStep];
  const dot = document.querySelector(".wafer-step-dot");
  const position = clusterFlowPositions[clusterFlowStep];
  if (dot && position) {
    dot.style.left = `${position.left}%`;
    dot.style.top = `${position.top}%`;
  }
  detail.innerHTML = `<strong>${title}</strong>: ${text}`;
  document.querySelectorAll("[data-flow-step]").forEach(item => {
    item.classList.toggle("active", Number(item.dataset.flowStep) === clusterFlowStep);
  });
}

function moduleFace(type, role) {
  const [name, desc] = moduleDefs[type];
  const portLabels = type === "loadlock" ? ["door", "pump", "vent"] : type === "cool" ? ["flow", "temp", "N2"] : ["gas", "vac", "exh"];
  return `
    <span class="slot-role">${role}</span>
    <span class="slot-name">${name}</span>
    <span class="module-face">
      <span class="ports">${portLabels.map(() => "<i></i>").join("")}</span>
      <span class="module-sub">${desc}</span>
    </span>
  `;
}

function placeClusterModule(slotId, type) {
  if (!type) return;
  if (type === "empty") delete clusterState[slotId];
  else clusterState[slotId] = type;
  renderCluster();
}

function countClusterTypes() {
  const values = Object.values(clusterState);
  const processTypes = clusterPlatforms[selectedClusterPlatform].allowedPm;
  return {
    pm: values.filter(type => processTypes.includes(type)).length,
    clean: values.filter(type => type === "clean").length,
    cool: values.filter(type => type === "cool").length,
    ll: values.filter(type => type === "loadlock").length
  };
}

function validateCluster() {
  const target = clusterTarget();
  const count = countClusterTypes();
  const platform = clusterPlatforms[selectedClusterPlatform];
  const messages = [];
  let ok = true;
  if (count.ll !== target.ll) {
    ok = false;
    messages.push(`Load Lock은 ${target.ll}개가 필요합니다. 현재 ${count.ll}개입니다.`);
  }
  if (count.pm !== target.pm) {
    ok = false;
    messages.push(`Process Module은 ${target.pm}개가 필요합니다. 현재 ${count.pm}개입니다.`);
  }
  if (count.clean !== target.clean) {
    ok = false;
    messages.push(`Pre-clean/Clean Module은 ${target.clean}개가 필요합니다. 현재 ${count.clean}개입니다.`);
  }
  if (count.cool !== target.cool) {
    ok = false;
    messages.push(`Cooldown/Support Module은 ${target.cool}개가 필요합니다. 현재 ${count.cool}개입니다.`);
  }
  const loadlockSlots = ["ll-a", "ll-b"];
  loadlockSlots.forEach(slot => {
    if (clusterState[slot] && clusterState[slot] !== "loadlock") {
      ok = false;
      messages.push(`${slot.toUpperCase()} 위치에는 Load Lock을 놓아야 합니다.`);
    }
  });
  Object.entries(clusterState).forEach(([slot, type]) => {
    if (type === "loadlock" && !loadlockSlots.includes(slot)) {
      ok = false;
      messages.push("Load Lock은 FI/atmosphere와 TM 사이 boundary slot에 놓는 개념입니다.");
    }
    if (["epi", "selective", "rtp"].includes(type) && !platform.allowedPm.includes(type)) {
      ok = false;
      messages.push(`${moduleDefs[type][0]}는 ${platform.label} 요구와 맞지 않습니다.`);
    }
  });
  return { ok, messages, count, target };
}

function renderClusterFeedback() {
  const platform = clusterPlatforms[selectedClusterPlatform];
  const result = validateCluster();
  const feedback = document.querySelector("#cluster-feedback");
  feedback.innerHTML = `
    <strong>${result.ok ? "구성 OK" : "아직 조정 필요"}</strong>
    <p>${platform.fact}</p>
    <p>${platform.lesson}</p>
    <p>현재: PM ${result.count.pm}, Clean/CM ${result.count.clean}, Cool/CM ${result.count.cool}, LL ${result.count.ll}</p>
    <p>목표: PM ${result.target.pm}, Clean/CM ${result.target.clean}, Cool/CM ${result.target.cool}, LL ${result.target.ll}</p>
    ${result.messages.length ? `<ul>${result.messages.map(message => `<li>${message}</li>`).join("")}</ul>` : "<p>고객 지정 모듈 수와 기본 cluster boundary 조건을 만족합니다. 실제 현장에서는 chamber option, gas panel, robot/blade, safety interlock, qualification limit를 공식 문서로 확인합니다.</p>"}
  `;
  document.querySelectorAll(".slot").forEach(slot => {
    slot.classList.toggle("good", result.ok);
    slot.classList.toggle("bad", !result.ok && !!clusterState[slot.dataset.slot]);
  });
}

function renderClusterLegend() {
  const target = clusterTarget();
  const platform = clusterPlatforms[selectedClusterPlatform];
  const flowButton = document.querySelector("#cluster-flow");
  if (flowButton) flowButton.textContent = clusterFlowOn ? "웨이퍼 흐름 정지" : "웨이퍼 흐름 보기";
  document.querySelector("#cluster-legend").innerHTML = `
    <strong>요구조건</strong><br>
    PM(Process Module): ${target.pm}/${platform.maxPm}<br>
    Clean/CM: ${target.clean}/${platform.maxClean}<br>
    Cool/CM: ${target.cool}/${platform.maxCool}<br>
    TM(Transfer Module): 1 fixed<br>
    LL(Load Lock): 2 fixed<br>
    View: ${clusterFlowOn ? "wafer flow animation on" : "static layout"}
  `;
}

function renderClusterConcepts() {
  document.querySelector("#cluster-concepts").innerHTML = `
    <h2>아무것도 모르는 사람용 구조 설명</h2>
    <div class="deep-item"><strong>왜 Load Lock이 필요한가?</strong><span>Fab 앞쪽 FOUP/EFEM은 대기압이고, EPI/RTP 같은 process chamber는 진공 또는 제어된 분위기가 필요합니다. Load Lock은 웨이퍼를 바로 공정 챔버에 넣지 않고, 작은 중간방에서 압력을 맞춰 오염과 공정 불안정을 줄이는 문입니다.</span></div>
    <div class="deep-item"><strong>TM은 무엇인가?</strong><span>Transfer Module은 진공 안의 중앙 복도이자 robot 방입니다. 사람 대신 robot blade가 wafer를 LL에서 꺼내 PM/CM으로 옮깁니다. 이곳이 흔들리면 모든 chamber 이동이 흔들립니다.</span></div>
    <div class="deep-item"><strong>PM은 무엇인가?</strong><span>여기서 PM은 Preventive Maintenance가 아니라 Process Module입니다. EPI PM이면 epitaxy 성장, RTP PM이면 열처리처럼 실제 공정이 일어나는 방입니다.</span></div>
    <div class="deep-item"><strong>CM은 무엇인가?</strong><span>이 게임에서 CM은 Clean/Cool/Support Module을 뜻하는 교육용 표기입니다. 예를 들어 EPI 전에 표면을 준비하는 pre-clean, 공정 후 wafer를 식히는 cooldown 같은 보조 chamber입니다. 실제 회사 문서에서는 CM 의미가 다를 수 있어 반드시 확인해야 합니다.</span></div>
    <div class="deep-item"><strong>왜 여러 PM이 붙는가?</strong><span>고객이 PM 2개, 3개, 4개를 요구하는 이유는 throughput, chamber matching, 공정 routing, redundancy 때문입니다. chamber가 많을수록 생산성은 좋아질 수 있지만 gas, exhaust, PM 일정, qualification이 복잡해집니다.</span></div>
    <div class="deep-item"><strong>왜 모듈이 TM 둘레에 붙는가?</strong><span>중앙 TM robot이 모든 chamber에 닿아야 하기 때문입니다. 그래서 chamber는 TM의 facet, 즉 둘레 면에 붙습니다. 이 배치 감각이 install, service clearance, robot teaching, pumpdown, chamber matching 이해의 시작입니다.</span></div>
  `;
  document.querySelector("#cluster-learning").innerHTML = `
    <h2>구성할 때 생각 순서</h2>
    <div class="deep-item"><strong>1. 고객이 말한 PM 수 확인</strong><span>PM이 process chamber 수인지, clean/cool chamber까지 포함한 module 수인지 문서로 확인합니다.</span></div>
    <div class="deep-item"><strong>2. wafer route 그리기</strong><span>FOUP → FI/EFEM → LL → TM → PM/CM → TM → LL → FOUP 순서를 그립니다.</span></div>
    <div class="deep-item"><strong>3. 필요한 보조 module 확인</strong><span>EPI라면 pre-clean이 필요한지, RTP라면 cooldown/support가 필요한지 확인합니다.</span></div>
    <div class="deep-item"><strong>4. facility 영향 보기</strong><span>PM이 늘면 gas panel, exhaust, abatement, PCW, power, service clearance, PM schedule이 같이 늘어납니다.</span></div>
    <div class="deep-item"><strong>5. qualification 기준 묻기</strong><span>chamber matching, pump/vent time, robot transfer reliability, temperature/thickness/defect 기준을 고객과 선임에게 확인합니다.</span></div>
    <div class="deep-item"><strong>6. 실제 정답은 site config</strong><span>이 게임은 공개 자료 기반 대표 구조입니다. 실제 정답은 Applied configuration drawing, customer spec, install manual에 있습니다.</span></div>
  `;
}

function showClusterAnswer() {
  const platform = clusterPlatforms[selectedClusterPlatform];
  clusterState = {};
  clusterSlots.forEach((slot, index) => {
    const type = platform.answer[index];
    if (type && type !== "empty") clusterState[slot.id] = type;
  });
  renderCluster();
}

function renderCluster() {
  clampClusterRequest();
  renderClusterPalette();
  renderClusterBoard();
  renderClusterLegend();
  renderClusterFeedback();
  renderClusterConcepts();
}

initClusterControls();
applyClusterPreset();
