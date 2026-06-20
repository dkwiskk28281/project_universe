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
  { id: "ll-a", role: "LL-A", family: "loadlock", x: 34, y: 72 },
  { id: "ll-b", role: "LL-B", family: "loadlock", x: 60, y: 72 },
  { id: "facet-1", role: "Facet 1", family: "module", x: 40, y: 8 },
  { id: "facet-2", role: "Facet 2", family: "module", x: 68, y: 28 },
  { id: "facet-3", role: "Facet 3", family: "module", x: 40, y: 52 },
  { id: "facet-4", role: "Facet 4", family: "module", x: 12, y: 28 }
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
  document.querySelector("#cluster-reset").addEventListener("click", () => {
    clusterState = {};
    renderCluster();
  });
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
  board.innerHTML = `
    <div class="cluster-core">
      <div>
        <strong>TM</strong>
        <span>${platform.core}<br>${platform.coreDesc}</span>
      </div>
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
    slotEl.innerHTML = `<span class="slot-role">${slot.role}</span><span class="slot-name">${type ? moduleDefs[type][0] : "Drop module"}</span>`;
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
  document.querySelector("#cluster-legend").innerHTML = `
    <strong>요구조건</strong><br>
    PM(Process Module): ${target.pm}/${platform.maxPm}<br>
    Clean/CM: ${target.clean}/${platform.maxClean}<br>
    Cool/CM: ${target.cool}/${platform.maxCool}<br>
    TM(Transfer Module): 1 fixed<br>
    LL(Load Lock): 2 fixed
  `;
}

function renderClusterConcepts() {
  document.querySelector("#cluster-concepts").innerHTML = `
    <h2>구조 이해 핵심</h2>
    <div class="deep-item"><strong>TM</strong><span>Transfer Module. 중앙 robot/transfer chamber가 wafer를 LL과 PM/CM 사이에서 옮깁니다.</span></div>
    <div class="deep-item"><strong>LL</strong><span>Load Lock. 대기압의 FOUP/FI와 vacuum cluster 사이 boundary입니다.</span></div>
    <div class="deep-item"><strong>PM</strong><span>Process Module. EPI, selective EPI, RTP처럼 실제 공정이 일어나는 chamber입니다.</span></div>
    <div class="deep-item"><strong>CM</strong><span>여기서는 Clean/Cool/Support Chamber Module의 교육용 표기입니다. 회사/문서마다 CM 의미가 다를 수 있으니 현장 용어를 확인하세요.</span></div>
    <div class="deep-item"><strong>Facet</strong><span>중앙 TM 주변에 chamber가 붙는 면입니다. 공개 자료상 Centura 계열은 multiple process chambers/up to four process chambers 개념으로 설명됩니다.</span></div>
  `;
  document.querySelector("#cluster-learning").innerHTML = `
    <h2>현장 적응 질문</h2>
    <div class="deep-item"><span>이 tool의 exact platform은 Centura Prime, Xtera, 200mm, RP, Vantage 중 무엇인가?</span></div>
    <div class="deep-item"><span>고객이 지정한 PM 수는 process chamber 수인가, recipe route에서 쓰는 chamber 수인가?</span></div>
    <div class="deep-item"><span>pre-clean/etch/cooldown chamber가 process module로 counting되는지 site 문서에서 확인했는가?</span></div>
    <div class="deep-item"><span>LL pump/vent time, robot blade, WOB/centering, chamber matching이 qualification에 어떤 영향을 주는가?</span></div>
    <div class="deep-item"><span>모듈 추가/제거가 gas panel, abatement load, exhaust flow, utility POC, software recipe routing에 미치는 영향은 무엇인가?</span></div>
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
