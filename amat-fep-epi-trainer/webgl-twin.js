import * as THREE from "./assets/vendor/three.module.min.js";

const COLORS = {
  bg: 0x061114,
  floor: 0x183034,
  material: 0x27f5a9,
  vacuum: 0x8f7bff,
  gas: 0xff78a8,
  comm: 0x5ee7ff,
  facility: 0xffd38a,
  process: 0xffd38a,
  active: 0x25d366,
  warning: 0xffd38a,
  wafer: 0xbffff3
};

const COMPONENTS = [
  {
    id: "host",
    label: "Fab Host / MES",
    group: "comm",
    pos: [-5.25, 2.38, -2.2],
    size: [1.28, 0.42, 0.72],
    role: "Fab 생산 서버입니다. lot, carrier, wafer slot, recipe ID, event trace를 장비와 연결합니다.",
    issue: "wafer ID, slot, event 연결이 깨지면 trace와 metrology 결과가 서로 맞지 않아 고객 보고가 위험해집니다."
  },
  {
    id: "toolpc",
    label: "Tool Controller",
    group: "comm",
    pos: [-3.58, 1.8, -1.94],
    size: [1.16, 0.38, 0.64],
    role: "장비 내부 scheduler와 module state를 모으는 controller입니다. host 명령과 실제 module 상태 사이의 번역기입니다.",
    issue: "command와 actual state가 다르면 host 화면보다 module evidence, event order, alarm trace를 먼저 확인합니다."
  },
  {
    id: "foup",
    label: "FOUP",
    group: "material",
    pos: [-5.2, 0.72, 0],
    size: [0.82, 1.24, 0.9],
    role: "wafer가 담겨 오는 sealed carrier입니다. load port에 도킹되면 slot map과 carrier ID 연결이 시작됩니다.",
    issue: "slot map mismatch, carrier ID mismatch, wafer present 오류는 전체 traceability를 흔듭니다."
  },
  {
    id: "lp",
    label: "Load Port",
    group: "material",
    pos: [-4.2, 0.52, 0],
    size: [0.52, 0.9, 1.05],
    role: "FOUP를 고정하고 장비가 wafer를 꺼낼 수 있도록 door/open handoff boundary를 만듭니다.",
    issue: "clamp, door, E84 handoff, carrier-present 신호가 맞지 않으면 자동 반송과 장비 start가 멈춥니다."
  },
  {
    id: "efem",
    label: "EFEM / FI",
    group: "material",
    pos: [-3.05, 0.5, 0],
    size: [1.08, 0.76, 1.74],
    role: "대기압 영역의 front interface입니다. FOUP wafer를 꺼내 aligner와 load lock으로 넘기는 atmospheric robot zone입니다.",
    issue: "robot teach, aligner, wafer present, door state를 함께 봐야 handling 문제를 분리할 수 있습니다."
  },
  {
    id: "aligner",
    label: "Aligner",
    group: "material",
    pos: [-3.05, 0.45, 1.36],
    size: [0.62, 0.28, 0.62],
    role: "wafer notch와 center를 맞추는 위치입니다. 이후 robot handoff가 정확해지도록 wafer 자세를 정렬합니다.",
    issue: "alignment fail은 transfer, slit valve, PM handoff 문제처럼 보일 수 있어 event order가 중요합니다."
  },
  {
    id: "lla",
    label: "Load Lock A",
    group: "vacuum",
    pos: [-1.66, 0.52, -0.55],
    size: [0.72, 0.7, 0.78],
    role: "대기압 EFEM과 진공 TM 사이의 압력 경계입니다. wafer가 들어오면 격리 후 pumpdown으로 transfer vacuum에 맞춥니다.",
    issue: "pumpdown slow, vent particle, slit door mismatch는 install/qualification에서 반드시 분리해야 합니다."
  },
  {
    id: "llb",
    label: "Load Lock B",
    group: "vacuum",
    pos: [-1.66, 0.52, 0.55],
    size: [0.72, 0.7, 0.78],
    role: "throughput과 isolation을 위해 병렬로 쓰는 두 번째 load lock 개념입니다.",
    issue: "LL A/B 차이가 나면 seal, gauge, pump, valve feedback을 같은 조건으로 비교합니다."
  },
  {
    id: "tm",
    label: "Transfer Module",
    group: "vacuum",
    pos: [0, 0.48, 0],
    radius: 0.88,
    role: "진공 robot hub입니다. load lock, process module, clean/cool module 사이에서 wafer를 옮깁니다.",
    issue: "robot handoff, slit valve, wafer present, chamber pressure ready가 동시에 맞아야 안전한 move가 가능합니다."
  },
  {
    id: "preclean",
    label: "Pre-clean / CM",
    group: "process",
    pos: [0.24, 0.52, 1.78],
    size: [0.92, 0.74, 0.82],
    role: "native oxide/interface reset 또는 cooldown/clean module을 대표합니다. 실제 option에 따라 역할은 달라질 수 있습니다.",
    issue: "interface defect는 pre-clean pass, queue time, vacuum continuity, metrology association과 연결해서 봅니다."
  },
  {
    id: "pm1",
    label: "EPI PM-A",
    group: "process",
    pos: [1.72, 0.58, -1.55],
    size: [1.18, 0.86, 0.98],
    role: "single-wafer epitaxy process module입니다. heat, gas delivery, surface reaction, exhaust를 분리해서 이해해야 합니다.",
    issue: "uniformity, growth rate, Rs, particle 문제는 gas, thermal, vacuum, metrology evidence로 나눠 판단합니다."
  },
  {
    id: "pm2",
    label: "EPI PM-B",
    group: "process",
    pos: [2.18, 0.58, 0],
    size: [1.18, 0.86, 0.98],
    role: "module matching을 비교하기 좋은 두 번째 EPI PM입니다. 같은 platform에서 PM별 drift를 비교할 수 있습니다.",
    issue: "PM A/B mismatch는 shared facility 문제인지 module-local drift인지 먼저 나눕니다."
  },
  {
    id: "pm3",
    label: "RTP PM",
    group: "process",
    pos: [1.72, 0.58, 1.55],
    size: [1.18, 0.86, 0.98],
    role: "rapid thermal process chamber입니다. ramp, soak, cool, pyrometry confidence를 시간축으로 봅니다.",
    issue: "thermal overshoot, slip/stress, pyrometry uncertainty는 trace와 wafer result를 연결해 분리합니다."
  },
  {
    id: "gasbox",
    label: "Gas Box",
    group: "gas",
    pos: [3.68, 0.72, -1.35],
    size: [0.8, 1.05, 1.1],
    role: "MFC, purge readiness, gas delivery를 묶어 생각하는 영역입니다. 실제 gas set은 tool option과 site 문서가 우선입니다.",
    issue: "toxic, flammable, corrosive gas는 owner signoff, detector, exhaust, abatement evidence가 process보다 먼저입니다."
  },
  {
    id: "pump",
    label: "Pump Stack",
    group: "facility",
    pos: [3.66, 0.48, 0.18],
    size: [0.85, 0.7, 0.86],
    role: "pumpdown과 process pressure control을 facility와 장비 경계에서 떠받치는 영역입니다.",
    issue: "slow pumpdown은 leak, outgassing, valve feedback, gauge disagreement로 나누어 확인합니다."
  },
  {
    id: "abatement",
    label: "Exhaust / Abatement",
    group: "facility",
    pos: [4.7, 0.7, 1.35],
    size: [0.86, 1.08, 1.05],
    role: "byproduct와 hazardous gas가 안전하게 처리되는 경로를 대표합니다. process gas introduction 전 ready evidence가 필요합니다.",
    issue: "exhaust/abatement가 ready가 아니면 process gas보다 stop condition 판단이 먼저입니다."
  }
];

const ROUTES = {
  "epi-a": { label: "EPI PM-A", pm: "pm1" },
  "epi-b": { label: "EPI PM-B", pm: "pm2" },
  rtp: { label: "RTP PM", pm: "pm3" }
};

const STEPS = [
  {
    id: "carrier-arrive",
    title: "1. FOUP 도킹과 job context",
    point: "foup",
    active: ["host", "toolpc", "foup", "lp"],
    mode: "comm",
    pressure: "ATM",
    gas: "none",
    door: "FOUP / load port handshake",
    robot: "idle",
    comm: "Host가 lot/carrier/job context를 보내고 load port가 carrier present와 slot map을 확인합니다.",
    evidence: "carrier ID, slot map, E84/load port state, event timestamp",
    stop: "carrier/slot association이 맞지 않거나 handoff state가 불명확하면 멈춥니다."
  },
  {
    id: "efem-pick",
    title: "2. EFEM robot pickup",
    point: "efem",
    active: ["foup", "lp", "efem", "aligner"],
    mode: "material",
    pressure: "ATM",
    gas: "N2 mini-environment concept",
    door: "FOUP door open / LL slit closed",
    robot: "atmospheric robot moving",
    comm: "Tool controller가 wafer present, aligner result, robot event order를 추적합니다.",
    evidence: "wafer present, aligner result, robot event order",
    stop: "unexpected wafer present, alignment fail, door state mismatch가 있으면 멈춥니다."
  },
  {
    id: "ll-load",
    title: "3. Load Lock handoff",
    point: "lla",
    active: ["efem", "lla", "llb", "tm"],
    mode: "vacuum",
    pressure: "ATM -> pumpdown",
    gas: "N2 purge / vent concept",
    door: "EFEM side opens, TM side closed",
    robot: "EFEM handoff complete",
    comm: "LL이 wafer present, door state, pressure state를 보고합니다.",
    evidence: "LL pressure curve, door feedback, wafer present, pump state",
    stop: "door feedback conflict 또는 pumpdown이 baseline 방향으로 내려가지 않으면 멈춥니다."
  },
  {
    id: "pumpdown",
    title: "4. Pumpdown / isolation",
    point: "lla",
    active: ["lla", "tm", "pump", "abatement"],
    mode: "vacuum",
    pressure: "transfer vacuum으로 전환",
    gas: "purge residual removal",
    door: "pressure transition 동안 양쪽 door closed",
    robot: "TM waiting",
    comm: "pressure ready가 TM pickup gate가 됩니다.",
    evidence: "pressure trace, pump state, gauge agreement, elapsed time",
    stop: "pressure plateau, gauge disagreement, unresolved exhaust alarm이면 멈춥니다."
  },
  {
    id: "tm-pick",
    title: "5. TM vacuum robot pickup",
    point: "tm",
    active: ["lla", "tm"],
    mode: "material",
    pressure: "Transfer vacuum",
    gas: "none",
    door: "pressure ready 후 TM side slit open",
    robot: "vacuum robot extends/retracts",
    comm: "scheduler가 LL과 TM state가 맞을 때 move를 허가합니다.",
    evidence: "slit state, robot position, wafer present transition",
    stop: "unexpected motion, wafer lost, slit/pressure not ready면 멈춥니다."
  },
  {
    id: "pm-load",
    title: "6. PM load",
    point: "route-pm",
    active: ["tm", "route-pm"],
    mode: "material",
    pressure: "PM ready / transfer vacuum",
    gas: "process gas not introduced yet",
    door: "transfer 동안 PM slit open",
    robot: "wafer placed on susceptor/chuck",
    comm: "PM ready, wafer present, slit close event가 기록됩니다.",
    evidence: "PM wafer present, slit close, susceptor/chuck ready, timestamp",
    stop: "PM not ready, wafer present abnormal, wrong module selected면 멈춥니다."
  },
  {
    id: "process",
    title: "7. Process interval",
    point: "route-pm",
    active: ["route-pm", "gasbox", "pump", "abatement", "toolpc"],
    mode: "gas",
    pressure: "controlled process state",
    gas: "H2/N2/Ar + precursor family concept, option-specific",
    door: "PM isolated",
    robot: "idle outside PM",
    comm: "temperature, pressure, MFC actual, exhaust, abatement trace가 wafer ID와 묶입니다.",
    evidence: "temperature trace, pressure trace, MFC actual, exhaust/abatement ready, metrology association",
    stop: "gas readiness, detector, exhaust, abatement, thermal stability를 방어할 수 없으면 멈춥니다."
  },
  {
    id: "unload",
    title: "8. Unload / cooldown handoff",
    point: "tm",
    active: ["route-pm", "tm", "preclean"],
    mode: "material",
    pressure: "PM -> transfer vacuum",
    gas: "purge/byproduct removal concept",
    door: "safe ready state 후 PM slit open",
    robot: "TM retrieves wafer",
    comm: "PM complete event가 trace와 wafer ID를 연결합니다.",
    evidence: "process complete, purge/exhaust state, wafer present transition",
    stop: "byproduct path, PM state, wafer ID association이 불명확하면 멈춥니다."
  },
  {
    id: "return",
    title: "9. Return to FOUP",
    point: "foup",
    active: ["tm", "lla", "efem", "lp", "foup", "host"],
    mode: "comm",
    pressure: "vacuum -> vent -> ATM",
    gas: "N2 vent concept",
    door: "LL cycles back to EFEM side",
    robot: "TM then EFEM return sequence",
    comm: "Host가 wafer complete event를 받고 trace/metrology packet이 연결 상태로 남습니다.",
    evidence: "return event chain, slot map, wafer ID, trace ID, metrology ID",
    stop: "traceability가 깨지거나 returned slot이 expected state와 맞지 않으면 멈춥니다."
  }
];

const CONNECTIONS = [
  ["foup", "lp", "material"],
  ["lp", "efem", "material"],
  ["efem", "aligner", "material"],
  ["efem", "lla", "material"],
  ["efem", "llb", "material"],
  ["lla", "tm", "vacuum"],
  ["llb", "tm", "vacuum"],
  ["tm", "pm1", "material"],
  ["tm", "pm2", "material"],
  ["tm", "pm3", "material"],
  ["tm", "preclean", "material"],
  ["gasbox", "pm1", "gas"],
  ["gasbox", "pm2", "gas"],
  ["gasbox", "pm3", "gas"],
  ["pm1", "pump", "vacuum"],
  ["pm2", "pump", "vacuum"],
  ["pm3", "pump", "vacuum"],
  ["pump", "abatement", "facility"],
  ["host", "toolpc", "comm"],
  ["toolpc", "lp", "comm"],
  ["toolpc", "efem", "comm"],
  ["toolpc", "lla", "comm"],
  ["toolpc", "llb", "comm"],
  ["toolpc", "tm", "comm"],
  ["toolpc", "pm1", "comm"],
  ["toolpc", "pm2", "comm"],
  ["toolpc", "pm3", "comm"]
];

const root = document.getElementById("webgl-twin");
const wrap = document.getElementById("webgl-canvas-wrap");
const labels = document.getElementById("webgl-label-layer");
const readout = document.getElementById("webgl-readout");
const selectedPanel = document.getElementById("webgl-selected");

let renderer;
let scene;
let camera;
let raycaster;
let pointer;
let wafer;
let robotArm;
let processGlow;
let selectedId = "tm";
let activeStep = 0;
let activeRoute = "epi-a";
let activeMode = "material";
let playing = false;
let speed = 0.7;
let lastTick = 0;
let stageProgress = 0;
let initialized = false;

const meshes = new Map();
const labelNodes = new Map();
const lines = [];
const tempVec = new THREE.Vector3();

function routePmId() {
  return ROUTES[activeRoute]?.pm || "pm1";
}

function resolveId(id) {
  return id === "route-pm" ? routePmId() : id;
}

function component(id) {
  return COMPONENTS.find(item => item.id === resolveId(id));
}

function positionOf(id) {
  const item = component(id);
  return item ? new THREE.Vector3(...item.pos) : new THREE.Vector3();
}

function colorFor(group) {
  return COLORS[group] || COLORS.material;
}

function makeMaterial(group, opacity = 0.62) {
  return new THREE.MeshStandardMaterial({
    color: colorFor(group),
    roughness: 0.42,
    metalness: 0.16,
    transparent: true,
    opacity
  });
}

function makeBox(item) {
  const group = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(...item.size), makeMaterial(item.group));
  body.castShadow = true;
  body.receiveShadow = true;
  body.userData.componentId = item.id;
  group.add(body);

  const cap = new THREE.Mesh(
    new THREE.BoxGeometry(item.size[0] * 0.86, 0.035, item.size[2] * 0.86),
    new THREE.MeshBasicMaterial({ color: colorFor(item.group), transparent: true, opacity: 0.32 })
  );
  cap.position.y = item.size[1] * 0.52;
  group.add(cap);

  group.position.set(...item.pos);
  group.userData.componentId = item.id;
  scene.add(group);
  meshes.set(item.id, body);

  if (item.id === "foup") addFoupSlots(group);
  if (item.id === "gasbox") addGasCylinders(group);
  if (item.id === "pump") addPumpStack(group);
  return group;
}

function makeCylinder(item) {
  const mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(item.radius, item.radius, 0.38, 56),
    makeMaterial(item.group, 0.5)
  );
  mesh.position.set(...item.pos);
  mesh.position.y += 0.06;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.userData.componentId = item.id;
  scene.add(mesh);
  meshes.set(item.id, mesh);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(item.radius * 0.96, 0.018, 8, 72),
    new THREE.MeshBasicMaterial({ color: COLORS.vacuum, transparent: true, opacity: 0.55 })
  );
  ring.position.copy(mesh.position);
  ring.position.y += 0.23;
  ring.rotation.x = Math.PI / 2;
  scene.add(ring);
  return mesh;
}

function addFoupSlots(group) {
  const slotMaterial = new THREE.MeshBasicMaterial({ color: COLORS.wafer, transparent: true, opacity: 0.55 });
  for (let i = 0; i < 6; i += 1) {
    const slot = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.012, 0.72), slotMaterial);
    slot.position.set(0, -0.35 + i * 0.12, 0);
    group.add(slot);
  }
}

function addGasCylinders(group) {
  const material = new THREE.MeshStandardMaterial({ color: COLORS.gas, transparent: true, opacity: 0.55, roughness: 0.5 });
  [-0.22, 0, 0.22].forEach((x, index) => {
    const cylinder = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.92, 20), material);
    cylinder.position.set(x, 0.02, -0.43 + index * 0.12);
    cylinder.rotation.x = Math.PI / 2;
    group.add(cylinder);
  });
}

function addPumpStack(group) {
  const material = new THREE.MeshBasicMaterial({ color: COLORS.facility, transparent: true, opacity: 0.35 });
  for (let i = 0; i < 3; i += 1) {
    const rotor = new THREE.Mesh(new THREE.TorusGeometry(0.13 + i * 0.03, 0.012, 8, 36), material);
    rotor.position.set(0.02, -0.18 + i * 0.16, 0.16);
    rotor.rotation.x = Math.PI / 2;
    group.add(rotor);
  }
}

function makeLabel(item) {
  const node = document.createElement("button");
  node.type = "button";
  node.className = "webgl-label";
  node.innerHTML = `<b>${item.label}</b><span>${item.group}</span>`;
  node.addEventListener("click", () => {
    selectedId = item.id;
    updateReadouts();
  });
  labels.appendChild(node);
  labelNodes.set(item.id, node);
}

function makeLine(a, b, type) {
  const pa = positionOf(a);
  const pb = positionOf(b);
  pa.y += type === "comm" ? 0.62 : 0.16;
  pb.y += type === "comm" ? 0.62 : 0.16;
  const geometry = new THREE.BufferGeometry().setFromPoints([pa, pb]);
  const line = new THREE.Line(geometry, new THREE.LineBasicMaterial({
    color: colorFor(type),
    transparent: true,
    opacity: 0.22
  }));
  line.userData = { type, a, b };
  scene.add(line);
  lines.push(line);
}

function createScene() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(COLORS.bg);
  camera = new THREE.PerspectiveCamera(43, 1, 0.1, 100);
  camera.position.set(0.2, 5.6, 6.5);
  camera.lookAt(0, 0.35, 0);

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false,
    preserveDrawingBuffer: true,
    powerPreference: "high-performance"
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = true;
  wrap.prepend(renderer.domElement);

  const ambient = new THREE.AmbientLight(0x9cfde4, 0.54);
  scene.add(ambient);
  const key = new THREE.DirectionalLight(0xffffff, 1.1);
  key.position.set(-2.5, 7, 4.5);
  key.castShadow = true;
  scene.add(key);
  const rim = new THREE.PointLight(0x5ee7ff, 1.1, 9);
  rim.position.set(2.5, 2.4, -2.8);
  scene.add(rim);

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(12.5, 7.2),
    new THREE.MeshStandardMaterial({ color: COLORS.floor, roughness: 0.9, metalness: 0.05 })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  const grid = new THREE.GridHelper(12, 24, 0x25d366, 0x214a4c);
  grid.material.transparent = true;
  grid.material.opacity = 0.3;
  scene.add(grid);

  COMPONENTS.forEach(item => {
    if (item.radius) makeCylinder(item);
    else makeBox(item);
    makeLabel(item);
  });
  CONNECTIONS.forEach(([a, b, type]) => makeLine(a, b, type));

  wafer = new THREE.Mesh(
    new THREE.CylinderGeometry(0.22, 0.22, 0.028, 56),
    new THREE.MeshStandardMaterial({
      color: COLORS.wafer,
      emissive: 0x1fd7bd,
      emissiveIntensity: 0.35,
      roughness: 0.2,
      metalness: 0.45
    })
  );
  wafer.position.copy(positionOf(STEPS[0].point));
  wafer.position.y = 1.18;
  wafer.castShadow = true;
  scene.add(wafer);

  robotArm = new THREE.Mesh(
    new THREE.BoxGeometry(1.25, 0.055, 0.09),
    new THREE.MeshBasicMaterial({ color: COLORS.comm, transparent: true, opacity: 0.72 })
  );
  robotArm.position.set(0, 0.86, 0);
  scene.add(robotArm);

  processGlow = new THREE.Mesh(
    new THREE.SphereGeometry(0.34, 28, 16),
    new THREE.MeshBasicMaterial({ color: COLORS.gas, transparent: true, opacity: 0.0 })
  );
  scene.add(processGlow);

  raycaster = new THREE.Raycaster();
  pointer = new THREE.Vector2();
  renderer.domElement.addEventListener("pointerdown", onPointerDown);
  initialized = true;
}

function setStaticCopy() {
  root.classList.add("no-term");
  const title = root.querySelector(".webgl-twin-head h2");
  const summary = root.querySelector(".webgl-twin-head p:not(.eyebrow)");
  const prev = root.querySelector('[data-webgl-step="prev"]');
  const next = root.querySelector('[data-webgl-step="next"]');
  const speedInput = root.querySelector("[data-webgl-speed]");
  const processPrev = document.getElementById("process-prev-step");
  const processNext = document.getElementById("process-next-step");
  if (title) title.textContent = "FOUP -> EFEM -> Load Lock -> TM -> PM 흐름을 3D로 보기";
  if (summary) {
    summary.textContent = "wafer 이동, 압력 경계, gas/facility, 장비 통신을 한 장면에서 겹쳐 보는 공개자료 기반 mental model입니다. 실제 recipe, valve sequence, detector setpoint, interlock bypass, site-specific acceptance limit은 의도적으로 제외합니다.";
  }
  if (prev) prev.textContent = "이전";
  if (next) next.textContent = "다음";
  if (speedInput) speedInput.value = "70";
  if (processPrev) processPrev.textContent = "이전";
  if (processNext) processNext.textContent = "다음 단계";
  cleanupTermMarkup();
  window.setTimeout(cleanupTermMarkup, 180);
  window.setTimeout(cleanupTermMarkup, 520);
}

function cleanupTermMarkup() {
  root.querySelectorAll(".term-explain").forEach(span => {
    span.replaceWith(document.createTextNode(span.textContent || ""));
  });
  root.normalize();
}

function activeStepData() {
  const base = STEPS[activeStep] || STEPS[0];
  return {
    ...base,
    active: base.active.map(resolveId),
    point: resolveId(base.point)
  };
}

function nextStepData() {
  const next = STEPS[(activeStep + 1) % STEPS.length] || STEPS[0];
  return { ...next, point: resolveId(next.point) };
}

function updateRouteButtons() {
  root.querySelectorAll("[data-webgl-route]").forEach(button => {
    button.classList.toggle("active", button.dataset.webglRoute === activeRoute);
  });
  root.querySelectorAll("[data-webgl-mode]").forEach(button => {
    button.classList.toggle("active", button.dataset.webglMode === activeMode);
  });
  const play = root.querySelector("[data-webgl-play]");
  if (play) play.textContent = playing ? "일시정지" : "재생";
  const speedValue = root.querySelector("#webgl-speed-value");
  if (speedValue) speedValue.textContent = `${speed.toFixed(1)}x`;
}

function updateHighlights() {
  const step = activeStepData();
  const activeSet = new Set(step.active);
  meshes.forEach((mesh, id) => {
    const item = component(id);
    const isActive = activeSet.has(id);
    const isSelected = selectedId === id;
    mesh.material.color.setHex(isSelected ? COLORS.facility : isActive ? COLORS.active : colorFor(item.group));
    mesh.material.opacity = isSelected ? 0.86 : isActive ? 0.78 : 0.38;
    mesh.scale.setScalar(isSelected ? 1.08 : isActive ? 1.04 : 1);
  });
  lines.forEach(line => {
    const typeMatch = line.userData.type === activeMode ||
      (activeMode === "gas" && line.userData.type === "facility");
    const activeLine = activeSet.has(resolveId(line.userData.a)) || activeSet.has(resolveId(line.userData.b));
    line.material.opacity = typeMatch ? (activeLine ? 0.95 : 0.42) : 0.12;
    line.material.color.setHex(colorFor(line.userData.type));
  });
  labelNodes.forEach((node, id) => {
    node.classList.toggle("active", activeSet.has(id));
    node.classList.toggle("selected", selectedId === id);
  });
}

function updateWafer(delta) {
  const current = positionOf(activeStepData().point);
  const next = positionOf(nextStepData().point);
  if (playing) {
    stageProgress += delta * 0.00012 * speed;
    if (stageProgress >= 1) {
      stageProgress = 0;
      activeStep = (activeStep + 1) % STEPS.length;
      updateReadouts();
    }
  }

  const eased = stageProgress < 0.5
    ? 2 * stageProgress * stageProgress
    : 1 - Math.pow(-2 * stageProgress + 2, 2) / 2;
  wafer.position.lerpVectors(current, next, playing ? eased : 0);
  wafer.position.y = 1.14 + Math.sin(performance.now() * 0.006) * 0.025;
  wafer.rotation.y += delta * 0.0016;

  const tm = positionOf("tm");
  const target = wafer.position.clone();
  const mid = tm.clone().lerp(target, 0.5);
  robotArm.position.set(mid.x, 0.88, mid.z);
  const dx = target.x - tm.x;
  const dz = target.z - tm.z;
  robotArm.scale.x = Math.max(0.25, Math.sqrt(dx * dx + dz * dz));
  robotArm.rotation.y = -Math.atan2(dz, dx);

  const pm = positionOf(routePmId());
  processGlow.position.set(pm.x, 0.98, pm.z);
  processGlow.material.opacity = activeStepData().id === "process"
    ? 0.12 + Math.sin(performance.now() * 0.006) * 0.04
    : 0;
}

function updateLabels() {
  if (!renderer || !camera) return;
  const rect = renderer.domElement.getBoundingClientRect();
  const step = activeStepData();
  const activeSet = new Set(step.active);
  const compact = rect.width < 560;
  const coreSet = compact
    ? new Set([step.point, selectedId, routePmId(), ...step.active])
    : new Set(["foup", "efem", "lla", "tm", routePmId(), selectedId, ...step.active]);

  COMPONENTS.forEach(item => {
    const node = labelNodes.get(item.id);
    const mesh = meshes.get(item.id);
    if (!node || !mesh) return;
    const relevant = activeSet.has(item.id) || coreSet.has(item.id);
    tempVec.setFromMatrixPosition(mesh.matrixWorld);
    tempVec.y += item.group === "comm" ? 0.48 : 0.64;
    tempVec.project(camera);
    const x = (tempVec.x * 0.5 + 0.5) * rect.width;
    const y = (-tempVec.y * 0.5 + 0.5) * rect.height;
    const visible = tempVec.z < 1 && x > -80 && x < rect.width + 80 && y > -40 && y < rect.height + 40;
    if (!visible || (compact && !relevant)) {
      node.style.display = "none";
      return;
    }
    node.style.display = "grid";
    const w = node.offsetWidth || 110;
    const h = node.offsetHeight || 42;
    const clampedX = Math.min(Math.max(4, x), Math.max(4, rect.width - w - 4));
    const clampedY = Math.min(Math.max(4, y), Math.max(4, rect.height - h - 4));
    node.style.transform = `translate(${Math.round(clampedX)}px, ${Math.round(clampedY)}px)`;
  });
}

function updateReadouts() {
  const step = activeStepData();
  const selected = component(selectedId) || component("tm");
  updateRouteButtons();
  updateHighlights();
  if (readout) {
    readout.innerHTML = `
      <p class="eyebrow">현재 단계</p>
      <h3>${step.title}</h3>
      <div class="webgl-state-grid">
        <span><b>Pressure</b>${step.pressure}</span>
        <span><b>Gas</b>${step.gas}</span>
        <span><b>Door</b>${step.door}</span>
        <span><b>Robot</b>${step.robot}</span>
      </div>
      <strong>통신 흐름</strong>
      <p>${step.comm}</p>
      <strong>CE가 확인할 evidence</strong>
      <p>${step.evidence}</p>
      <div class="webgl-stop">멈출 조건: ${step.stop}</div>
    `;
  }
  if (selectedPanel) {
    selectedPanel.innerHTML = `
      <p class="eyebrow">선택한 모듈</p>
      <h3>${selected.label}</h3>
      <p>${selected.role}</p>
      <strong>현장 사고 포인트</strong>
      <p>${selected.issue}</p>
    `;
  }
  cleanupTermMarkup();
}

function onPointerDown(event) {
  if (!renderer || !camera || !raycaster) return;
  const rect = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects([...meshes.values()], false);
  if (hits.length) {
    selectedId = hits[0].object.userData.componentId;
    updateReadouts();
  }
}

function resize() {
  if (!renderer || !camera || !wrap) return;
  const width = Math.max(320, Math.floor(wrap.clientWidth || 0));
  const height = Math.max(360, Math.floor(wrap.clientHeight || 0));
  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

function animate(tick = 0) {
  if (!initialized) return;
  const delta = Math.min(48, tick - (lastTick || tick));
  lastTick = tick;
  updateWafer(delta);
  const orbit = Math.sin(tick * 0.00012) * 0.22;
  camera.position.x = 0.25 + orbit;
  camera.lookAt(0.15, 0.48, 0);
  renderer.render(scene, camera);
  updateLabels();
  requestAnimationFrame(animate);
}

function setupEvents() {
  root.querySelectorAll("[data-webgl-step]").forEach(button => {
    button.addEventListener("click", () => {
      activeStep = button.dataset.webglStep === "next"
        ? (activeStep + 1) % STEPS.length
        : (activeStep + STEPS.length - 1) % STEPS.length;
      stageProgress = 0;
      updateReadouts();
    });
  });
  root.querySelector("[data-webgl-play]")?.addEventListener("click", () => {
    playing = !playing;
    updateRouteButtons();
  });
  root.querySelectorAll("[data-webgl-route]").forEach(button => {
    button.addEventListener("click", () => {
      activeRoute = button.dataset.webglRoute;
      stageProgress = 0;
      selectedId = routePmId();
      updateReadouts();
    });
  });
  root.querySelectorAll("[data-webgl-mode]").forEach(button => {
    button.addEventListener("click", () => {
      activeMode = button.dataset.webglMode;
      updateReadouts();
    });
  });
  root.querySelector("[data-webgl-speed]")?.addEventListener("input", event => {
    speed = Number(event.target.value || 100) / 100;
    updateRouteButtons();
  });
  window.addEventListener("resize", resize);
  new ResizeObserver(() => resize()).observe(wrap);
}

function pixelProbe() {
  if (!renderer) return { ok: false, litPixels: 0, width: 0, height: 0 };
  const gl = renderer.getContext();
  const width = Math.min(96, gl.drawingBufferWidth);
  const height = Math.min(96, gl.drawingBufferHeight);
  const pixels = new Uint8Array(width * height * 4);
  gl.readPixels(
    Math.max(0, Math.floor((gl.drawingBufferWidth - width) / 2)),
    Math.max(0, Math.floor((gl.drawingBufferHeight - height) / 2)),
    width,
    height,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    pixels
  );
  let litPixels = 0;
  for (let i = 0; i < pixels.length; i += 4) {
    if (pixels[i] + pixels[i + 1] + pixels[i + 2] > 18) litPixels += 1;
  }
  return { ok: litPixels > 120, litPixels, width, height };
}

function getState() {
  const canvas = renderer?.domElement;
  return {
    initialized,
    activeStep,
    activeStepId: activeStepData().id,
    activeRoute,
    activeMode,
    selectedId,
    playing,
    speed,
    stageProgress: Number(stageProgress.toFixed(3)),
    waferPosition: wafer ? wafer.position.toArray().map(value => Number(value.toFixed(3))) : [],
    canvas: canvas ? { width: canvas.clientWidth, height: canvas.clientHeight } : null,
    visibleLabels: [...labelNodes.values()].filter(node => node.style.display !== "none").length,
    totalLabels: labelNodes.size,
    readoutText: readout?.textContent?.replace(/\s+/g, " ").trim() || ""
  };
}

function init() {
  if (!root || !wrap || !labels || initialized) return;
  setStaticCopy();
  createScene();
  setupEvents();
  resize();
  updateReadouts();
  requestAnimationFrame(animate);
  window.ProjectUniverseWebGLTwin = {
    pixelProbe,
    getState,
    setStep: index => {
      activeStep = Math.max(0, Math.min(STEPS.length - 1, Number(index) || 0));
      stageProgress = 0;
      updateReadouts();
    },
    setRoute: route => {
      if (ROUTES[route]) activeRoute = route;
      selectedId = routePmId();
      updateReadouts();
    },
    setMode: mode => {
      if (["material", "vacuum", "gas", "comm"].includes(mode)) activeMode = mode;
      updateReadouts();
    },
    play: () => {
      playing = true;
      updateRouteButtons();
    },
    pause: () => {
      playing = false;
      updateRouteButtons();
    }
  };
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
