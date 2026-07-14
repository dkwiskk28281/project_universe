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
  { id: "ll-a", role: "LL-A", family: "loadlock", x: 28, y: 84 },
  { id: "ll-b", role: "LL-B", family: "loadlock", x: 56, y: 84 },
  { id: "facet-1", role: "Facet 1", family: "module", x: 39, y: 38 },
  { id: "facet-2", role: "Facet 2", family: "module", x: 73, y: 55 },
  { id: "facet-3", role: "Facet 3", family: "module", x: 39, y: 76 },
  { id: "facet-4", role: "Facet 4", family: "module", x: 7, y: 55 }
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

const moduleVisuals = {
  epi: {
    short: "EPI",
    caption: "heated epi reactor",
    services: ["H2", "Si", "Dop"],
    hardware: "Quartz dome / susceptor",
    ports: ["gas", "vac", "exh"],
    className: "process"
  },
  selective: {
    short: "SEL",
    caption: "selective epi reactor",
    services: ["H2", "Cl", "Si"],
    hardware: "Selective epi chamber",
    ports: ["gas", "temp", "exh"],
    className: "selective"
  },
  rtp: {
    short: "RTP",
    caption: "lamp anneal module",
    services: ["N2", "O2", "Lamp"],
    hardware: "Lamp bank / pyrometry",
    ports: ["lamp", "temp", "N2"],
    className: "thermal"
  },
  clean: {
    short: "CLN",
    caption: "pre-clean module",
    services: ["RF", "Gas", "Vac"],
    hardware: "Surface prep chamber",
    ports: ["rf", "gas", "vac"],
    className: "clean"
  },
  cool: {
    short: "COOL",
    caption: "cooldown station",
    services: ["N2", "PCW", "Temp"],
    hardware: "Wafer cooldown shelf",
    ports: ["flow", "temp", "N2"],
    className: "cool"
  },
  loadlock: {
    short: "LL",
    caption: "pressure bridge",
    services: ["Pump", "Vent", "Door"],
    hardware: "Atmosphere to vacuum lock",
    ports: ["door", "pump", "vent"],
    className: "loadlock"
  }
};

const clusterAnatomyParts = [
  {
    id: "efem",
    label: "EFEM / FI",
    role: "FOUP를 열고 wafer를 대기압 상태에서 load lock으로 넘기는 앞단 handling 구역입니다.",
    why: "Fab carrier와 vacuum cluster 사이를 연결합니다. mapping, align, pick/place가 흔들리면 공정 chamber fault처럼 보일 수 있습니다.",
    symptoms: ["wafer not present", "slot map mismatch", "align fail", "FOUP door/load port alarm"],
    ce: "FOUP seating, slot map, EFEM robot, aligner, LL handoff를 같은 wafer ID로 연결해 봅니다."
  },
  {
    id: "foup",
    label: "FOUP / Load Port",
    role: "wafer가 담겨 장비에 들어오는 carrier와 docking station입니다.",
    why: "Fab 물류와 장비가 만나는 첫 지점입니다. slot, orientation, seating이 틀리면 이후 path 전체가 흔들립니다.",
    symptoms: ["carrier ID mismatch", "door open fail", "slot mapping inconsistency", "wafer skew"],
    ce: "같은 FOUP/다른 slot, 다른 FOUP/같은 slot split으로 carrier 문제와 tool 문제를 분리합니다."
  },
  {
    id: "loadlock",
    label: "Load Lock",
    role: "대기압 EFEM과 vacuum TM 사이 압력 경계를 만드는 중간 방입니다.",
    why: "main vacuum을 매번 깨지 않고 wafer를 넣고 빼기 위해 필요합니다. pump/vent curve가 install qualification의 핵심 evidence입니다.",
    symptoms: ["pumpdown timeout", "vent timeout", "pressure mismatch", "door/slit valve sensor mismatch"],
    ce: "LL-A/B curve, gauge, roughing/vent path, door seal, slit valve state를 같은 cycle에서 비교합니다."
  },
  {
    id: "tm",
    label: "Transfer Module",
    role: "vacuum 안 중앙 robot이 PM/CM/LL 사이로 wafer를 이동시키는 공간입니다.",
    why: "cluster tool의 교차로입니다. 여기 geometry가 틀리면 여러 chamber에서 비슷한 handling 문제가 반복됩니다.",
    symptoms: ["robot teach drift", "scrape mark", "handoff fail", "wafer lost during transfer"],
    ce: "leveling, blade height, lift pin, slit valve center, handoff timing을 wafer 없이 먼저 확인합니다."
  },
  {
    id: "pm",
    label: "PM / Process Module",
    role: "EPI growth 또는 RTP anneal처럼 wafer에 실제 공정 행위가 일어나는 chamber입니다.",
    why: "gas, thermal, pressure, wafer support가 wafer result로 바로 이어지는 곳입니다.",
    symptoms: ["thickness/Rs drift", "temperature trace abnormal", "particle/defect jump", "gas flow mismatch"],
    ce: "PM은 Preventive Maintenance가 아니라 Process Module일 수 있습니다. 문맥별 의미를 분리하세요."
  },
  {
    id: "cm",
    label: "CM / Clean or Cool Module",
    role: "pre-clean, surface prep, cooldown처럼 process 전후 상태를 만드는 support chamber입니다.",
    why: "EPI는 표면 준비가 중요하고 RTP는 열 이후 cooldown/handling risk가 중요합니다.",
    symptoms: ["first wafer defect", "queue time sensitivity", "cooldown delay", "surface contamination"],
    ce: "CM은 회사/문서마다 Clean Module, Cooldown Module, Chamber Module 등으로 달라질 수 있어 official drawing 확인이 필요합니다."
  },
  {
    id: "gasbox",
    label: "Gas Box",
    role: "MFC, valve, pressure control을 통해 gas를 chamber로 공급하는 장비 내부/측면 subsystem입니다.",
    why: "EPI/RTP chemistry는 gas delivery stability와 purge readiness에 민감합니다.",
    symptoms: ["MFC actual mismatch", "supply pressure alarm", "purge incomplete", "gas ready fail"],
    ce: "gas supply, MFC trend, valve state, purge, SDS/EHS owner를 분리해 확인합니다."
  },
  {
    id: "pump",
    label: "Pump / Foreline",
    role: "chamber와 load lock의 gas를 빼고 vacuum 또는 reduced pressure를 만드는 subsystem입니다.",
    why: "pumpdown curve와 base pressure는 leak, seal, valve, exhaust issue를 빠르게 보여주는 fingerprint입니다.",
    symptoms: ["long pumpdown", "base pressure drift", "foreline pressure high", "abatement trip"],
    ce: "door seal, valve state, gauge, pump health, foreline restriction을 PM 전후 변화와 함께 봅니다."
  },
  {
    id: "abatement",
    label: "Exhaust / Abatement",
    role: "byproduct와 위험 gas를 tool 밖으로 빼고 처리하는 safety-critical path입니다.",
    why: "process가 아무리 정상이어도 exhaust/abatement가 불확실하면 first gas와 wafer qualification을 진행할 수 없습니다.",
    symptoms: ["exhaust not ready", "abatement fault", "gas detector alarm", "pressure disturbance"],
    ce: "tool ready signal과 local actual state를 customer facility/EHS owner witness로 대조합니다."
  }
];

let clusterState = {};
let selectedClusterPlatform = "centuraPrime";
let activeClusterAnatomy = "efem";
let clusterFlowOn = false;
let clusterFlowStep = 0;
let clusterFlowTimer = null;

const clusterFlowSteps = [
  {
    title: "FOUP",
    subtitle: "웨이퍼 보관통",
    text: "FOUP(Front Opening Unified Pod)은 웨이퍼가 담겨 장비 앞 load port에 도킹되는 보관통입니다. 이 영역은 사람이 숨 쉬는 대기압 쪽입니다.",
    install: "Install 관점: FOUP/load port 위치, 도킹 높이, 문 열림 방향, EFEM 접근 공간을 먼저 이해합니다."
  },
  {
    title: "FI / EFEM",
    subtitle: "장비 앞쪽 대기압 이송부",
    text: "FI(Factory Interface)는 장비 전면 인터페이스이고, EFEM(Equipment Front End Module)은 FOUP에서 wafer를 꺼내 Load Lock으로 넘기는 대기압 robot 구역입니다.",
    install: "Install 관점: EFEM은 아직 진공이 아닙니다. FOUP door, aligner, atmospheric robot, load lock 문 인터락이 서로 맞아야 합니다."
  },
  {
    title: "LL pumpdown",
    subtitle: "대기압에서 진공으로 바꾸는 중간방",
    text: "LL(Load Lock)은 대기압 EFEM과 진공 TM 사이의 작은 문입니다. wafer를 넣고 문을 닫은 뒤 pumpdown으로 압력을 낮춰 진공 쪽으로 넘길 준비를 합니다.",
    install: "Install 관점: pump/vent 라인, door seal, pressure gauge, leak check, pumpdown time이 qualification 포인트가 됩니다."
  },
  {
    title: "TM robot",
    subtitle: "진공 안 중앙 이송 로봇",
    text: "TM(Transfer Module)은 진공 상태의 중앙 통로이자 robot 방입니다. robot blade가 Load Lock에서 wafer를 받아 PM/CM으로 이동시킵니다.",
    install: "Install 관점: robot teaching, blade height, slot center, chamber door interlock이 틀어지면 모든 wafer transfer가 흔들립니다."
  },
  {
    title: "PM / CM",
    subtitle: "공정 챔버 또는 보조 챔버",
    text: "PM(Process Module)은 실제 공정이 일어나는 방입니다. EPI PM은 epitaxy 성장, RTP PM은 열처리입니다. CM은 여기서 clean/cool/support chamber를 이해하기 위한 교육용 표현입니다.",
    install: "Install 관점: PM 수가 늘면 gas, exhaust, PCW, power, abatement, service clearance, chamber matching 확인도 같이 늘어납니다."
  },
  {
    title: "Return via TM",
    subtitle: "공정 후 다시 중앙 로봇으로 복귀",
    text: "공정 또는 보조 처리가 끝난 wafer는 다시 TM robot을 통해 Load Lock 쪽으로 돌아갑니다. 이동 경로는 들어갈 때와 반대 방향으로 이해하면 됩니다.",
    install: "Install 관점: return path에서는 wafer handoff, cooldown 여부, wafer map/slot tracking, particle risk를 같이 봅니다."
  },
  {
    title: "LL vent",
    subtitle: "진공에서 대기압으로 되돌림",
    text: "Load Lock이 vent로 다시 대기압에 가까워지면 EFEM robot이 wafer를 받아 FOUP의 원래 slot 또는 지정 slot로 돌려보냅니다.",
    install: "Install 관점: vent gas, vent speed, pressure equalization, door open 조건, FOUP slot tracking을 확인합니다."
  }
];

const clusterFlowPositions = [
  { left: 16, top: 22 },
  { left: 29, top: 23 },
  { left: 36, top: 84 },
  { left: 50, top: 63 },
  { left: 78, top: 60 },
  { left: 50, top: 63 },
  { left: 64, top: 84 }
];

const clusterMentalSteps = [
  {
    title: "1. FOUP arrives at load port",
    korean: "FOUP가 OHT/AMHS 또는 작업자에 의해 Load Port에 올라오고, carrier 존재와 docking 상태가 먼저 닫힙니다.",
    pressure: "Atmosphere",
    robot: "아직 wafer transfer 전. carrier handoff와 load port ready가 핵심입니다.",
    host: "AMHS handoff는 공개 표준상 SEMI E84 영역, carrier coordination은 E87/GEM300 관점으로 이해합니다.",
    evidence: ["carrier ID / lot ID", "load port dock/clamp/door state", "E84 handoff status", "host carrier state"],
    stop: "FOUP seating, door open, carrier ID, slot map이 불명확하면 wafer를 꺼내기 전에 멈춥니다.",
    activeMental: ["host", "amhs", "foup", "lp"],
    activeComm: ["host", "amhs", "e84", "equipment", "carrier"],
    activeEdge: ["host-amhs", "amhs-lp", "host-equipment"],
    wafer: { left: 14, top: 38 }
  },
  {
    title: "2. EFEM maps and selects wafer",
    korean: "EFEM/Load Port가 FOUP door를 열고 wafer presence, slot, cross-slot 위험을 확인한 뒤 EFEM robot/aligner가 wafer를 준비합니다.",
    pressure: "Atmosphere clean mini-environment",
    robot: "EFEM atmospheric robot이 FOUP slot에서 wafer를 pick하고 aligner 또는 LL handoff 위치로 가져갑니다.",
    host: "Host는 carrier/slot/material 상태를 장비 보고로 보고, equipment controller는 내부 EFEM/load port controller와 상태를 맞춥니다.",
    evidence: ["slot map", "wafer present sensor", "align result", "EFEM robot position", "load port door state"],
    stop: "slot map mismatch, wafer skew, door/robot interlock mismatch가 있으면 LL 투입 전 멈춥니다.",
    activeMental: ["foup", "lp", "efem", "aligner"],
    activeComm: ["equipment", "carrier", "substrate", "efem"],
    activeEdge: ["equipment-efem", "equipment-substrate"],
    wafer: { left: 29, top: 42 }
  },
  {
    title: "3. Load Lock closes and pumps down",
    korean: "EFEM이 wafer를 Load Lock에 넣고 대기쪽 문을 닫습니다. LL은 pumpdown으로 TM과 맞는 압력 영역으로 내려갑니다.",
    pressure: "Transition: atmosphere to vacuum",
    robot: "이 단계는 로봇보다 door/slit valve, pump, gauge, vent/purge state가 중요합니다.",
    host: "Equipment는 substrate location을 LL로 갱신하고, carrier/wafer tracking 상태를 host가 볼 수 있게 보고합니다.",
    evidence: ["LL door closed", "pumpdown curve", "pressure gauge trend", "roughing/pump ready", "slit valve permissive"],
    stop: "pumpdown timeout, pressure mismatch, door seal 의심, gauge credibility 의심이면 TM으로 열지 않습니다.",
    activeMental: ["ll", "pump", "gauge"],
    activeComm: ["equipment", "substrate", "ll", "facility"],
    activeEdge: ["equipment-ll", "equipment-substrate", "facility-equipment"],
    wafer: { left: 44, top: 62 }
  },
  {
    title: "4. TM robot takes wafer under vacuum",
    korean: "Transfer Module은 진공 mainframe 중앙의 robot 공간입니다. TM robot blade가 LL에서 wafer를 받아 PM/CM facet으로 이동합니다.",
    pressure: "Vacuum mainframe",
    robot: "Robot teach, blade height, lift pin, slit/gate valve alignment가 install 핵심 evidence입니다.",
    host: "Host가 직접 robot motor를 제어한다기보다 equipment controller가 job/route 상태에 따라 내부 motion controller를 조정합니다.",
    evidence: ["TM robot home/teach", "blade height", "handoff sensor", "slit/gate valve open state", "wafer location event"],
    stop: "wafer lost, scrape suspicion, valve position mismatch, robot teach drift가 있으면 wafer 있는 상태로 반복하지 않습니다.",
    activeMental: ["tm", "robot", "ll"],
    activeComm: ["equipment", "substrate", "tm", "safety"],
    activeEdge: ["equipment-tm", "equipment-substrate", "safety-equipment"],
    wafer: { left: 58, top: 52 }
  },
  {
    title: "5. PM receives wafer for EPI/RTP action",
    korean: "Process Module이 wafer를 받아 EPI film growth 또는 RTP thermal treatment 같은 실제 공정 행위를 수행합니다.",
    pressure: "Process chamber condition",
    robot: "TM robot은 wafer를 chamber support/lift pin 위치에 넘기고, PM controller는 gas/thermal/pressure envelope를 관리합니다.",
    host: "GEM300에서는 process job/control job, substrate tracking, event/report가 host view를 만듭니다. 실제 recipe와 setpoint는 비공개/승인 문서 영역입니다.",
    evidence: ["wafer-in-chamber event", "PM ready", "gas/exhaust/abatement ready", "temperature trace", "process complete event"],
    stop: "gas/exhaust/abatement ready가 불명확하거나 detector/interlock hold가 있으면 first gas/qualification을 진행하지 않습니다.",
    activeMental: ["pm", "gas", "pump", "abatement"],
    activeComm: ["host", "equipment", "process", "pm", "facility", "safety"],
    activeEdge: ["host-equipment", "equipment-pm", "facility-equipment", "safety-equipment"],
    wafer: { left: 77, top: 37 }
  },
  {
    title: "6. TM returns wafer from PM/CM",
    korean: "공정 또는 보조 처리가 끝나면 TM robot이 PM/CM에서 wafer를 다시 받아 Load Lock 쪽으로 되돌립니다.",
    pressure: "Vacuum return path",
    robot: "return path에서는 cooldown 여부, wafer support release, handoff repeatability, particle risk를 같이 봅니다.",
    host: "Equipment는 wafer location/process state 변화를 event/report로 쌓고, host는 lot/wafer/chamber history를 봅니다.",
    evidence: ["process complete", "wafer out event", "cooldown state", "robot transfer log", "substrate history"],
    stop: "process complete 불확실, wafer temperature/handling risk, chamber door/slit valve mismatch가 있으면 LL로 보내기 전에 멈춥니다.",
    activeMental: ["pm", "tm", "robot", "ll"],
    activeComm: ["equipment", "substrate", "tm", "pm"],
    activeEdge: ["equipment-tm", "equipment-pm", "equipment-substrate"],
    wafer: { left: 59, top: 52 }
  },
  {
    title: "7. LL vents and EFEM returns wafer to FOUP",
    korean: "Load Lock이 vent로 대기쪽 압력에 맞춰지고, EFEM robot이 wafer를 FOUP의 지정 slot으로 돌려보냅니다.",
    pressure: "Vacuum to atmosphere, then FOUP",
    robot: "LL vent, door open permissive, EFEM pick/place, FOUP slot return까지 하나의 닫힌 loop로 봅니다.",
    host: "E87 carrier state, E90 substrate state, E40/E94 job state가 완료/반송/hold 상태로 정리됩니다.",
    evidence: ["LL vent complete", "door open permissive", "return slot map", "carrier complete state", "job complete/abort state"],
    stop: "slot destination, carrier state, job completion, wafer presence가 안 맞으면 carrier unload를 진행하지 않습니다.",
    activeMental: ["ll", "efem", "foup", "lp"],
    activeComm: ["host", "equipment", "carrier", "substrate", "efem"],
    activeEdge: ["host-equipment", "equipment-efem", "equipment-substrate"],
    wafer: { left: 21, top: 42 }
  }
];

const clusterCommNodes = [
  ["host", "Fab Host / MES-EAP", "SECS/GEM/GEM300 관점에서 carrier, job, event, report를 보는 상위 시스템"],
  ["amhs", "AMHS / OHT", "FOUP를 load port까지 운반하고 carrier handoff를 수행하는 물류 시스템"],
  ["e84", "E84 handoff", "AMHS와 load port 사이 carrier handoff 신호 계층으로 이해"],
  ["equipment", "Equipment Controller", "host view와 내부 module controller 사이를 연결하는 장비 제어 중심"],
  ["carrier", "Carrier Mgmt E87", "FOUP/carrier가 load port와 tool 내부 buffer에 어떻게 들어오고 나가는지 관리"],
  ["substrate", "Substrate Tracking E90", "wafer가 FOUP, LL, TM, PM 중 어디에 있는지 추적"],
  ["process", "PJ/CJ E40/E94", "어떤 material을 어떤 process job/control job으로 처리할지 관리"],
  ["efem", "EFEM / Load Port Ctrl", "door, map, aligner, atmospheric robot, interlock status"],
  ["ll", "Load Lock Ctrl", "door, pumpdown, vent, pressure, slit/gate permissive"],
  ["tm", "TM Robot / Motion Ctrl", "vacuum robot, blade, teach, handoff motion"],
  ["pm", "PM Chamber Ctrl", "EPI/RTP chamber readiness, gas/thermal/process events"],
  ["facility", "Facility Signals", "gas, exhaust, abatement, vacuum, PCW 등 owner witness가 필요한 ready 상태"],
  ["safety", "Safety / Interlock", "사람/장비/가스 안전을 위한 stop 조건. 우회 대상이 아님"]
];

const clusterCommEdges = [
  ["host-amhs", "Host ↔ AMHS", "carrier dispatch / delivery intent"],
  ["amhs-lp", "AMHS ↔ Load Port", "E84-style carrier handoff signals"],
  ["host-equipment", "Host ↔ Equipment", "SECS/GEM over HSMS, GEM300 services"],
  ["equipment-efem", "Equipment ↔ EFEM", "tool-specific internal control for load port, mapper, robot"],
  ["equipment-ll", "Equipment ↔ LL", "door, pumpdown, vent, pressure state"],
  ["equipment-tm", "Equipment ↔ TM", "motion command/state through approved internal controller"],
  ["equipment-pm", "Equipment ↔ PM", "module ready, process events, chamber state"],
  ["equipment-substrate", "Equipment ↔ Tracking", "wafer location/process history"],
  ["facility-equipment", "Facility ↔ Equipment", "gas/exhaust/abatement/vacuum/PCW ready signals"],
  ["safety-equipment", "Safety ↔ Equipment", "interlock chain and stop conditions"]
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
    clusterFlowOn = !clusterFlowTimer;
    manageClusterFlowTimer(false);
    renderClusterBoard();
    renderClusterFlowPanel();
    renderClusterLegend();
    renderClusterFeedback();
  });
  document.querySelector("#cluster-reset").addEventListener("click", () => {
    clusterState = {};
    clusterFlowOn = false;
    clusterFlowStep = 0;
    manageClusterFlowTimer(false);
    renderCluster();
  });
}

function manageClusterFlowTimer(resetStep = true) {
  if (clusterFlowTimer) {
    clearInterval(clusterFlowTimer);
    clusterFlowTimer = null;
  }
  if (clusterFlowOn) {
    if (resetStep) clusterFlowStep = 0;
    clusterFlowTimer = setInterval(() => {
      clusterFlowStep = (clusterFlowStep + 1) % clusterFlowSteps.length;
      updateClusterFlowStep();
    }, 3500);
  }
}

function selectClusterFlowStep(index) {
  clusterFlowStep = Math.max(0, Math.min(index, clusterFlowSteps.length - 1));
  clusterFlowOn = true;
  if (clusterFlowTimer) {
    clearInterval(clusterFlowTimer);
    clusterFlowTimer = null;
  }
  renderClusterBoard();
  renderClusterFlowPanel();
  renderClusterLegend();
  renderClusterFeedback();
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
    return `
      <div class="module-token" draggable="true" data-type="${type}">
        ${paletteModule(type)}
        <span class="token-copy">
          <strong>${name}</strong>
          <small>${desc}</small>
        </span>
      </div>
    `;
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

function paletteModule(type) {
  if (type === "empty") {
    return `
      <span class="token-machine token-empty">
        <span class="token-blank"></span>
      </span>
    `;
  }
  const visual = moduleVisuals[type];
  return `
    <span class="token-machine token-${type}">
      <span class="token-lid"></span>
      <span class="token-window">${visual.short}</span>
      <span class="token-ports">${visual.ports.map(() => "<i></i>").join("")}</span>
    </span>
  `;
}

function drawFlowLine(board, slot) {
  const core = { x: 50, y: 63 };
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
    <div class="cleanroom-depth">
      <span></span><span></span><span></span>
    </div>
    <div class="fab-scene">
      <div class="utility-rack">
        <span>GAS</span><span>VAC</span><span>EXH</span><span>PCW</span>
      </div>
      <div class="efem-assembly">
        <div class="load-port port-a"><span class="port-door"></span><span>LP-A</span></div>
        <div class="load-port port-b"><span class="port-door"></span><span>LP-B</span></div>
        <div class="efem-body">
          <span class="status-light"></span>
          <span class="cab-label">FI / EFEM<br>atmospheric handler</span>
          <span class="efem-window"></span>
          <span class="efem-robot"></span>
        </div>
        <div class="foup foup-a"><span></span></div>
        <div class="foup foup-b"><span></span></div>
      </div>
      <div class="atmos-vacuum-bridge">
        <span>LL</span>
      </div>
      <div class="mainframe-cabinet">
        <span class="status-light"></span>
        <span class="cab-label">${platform.core}<br>vacuum mainframe</span>
      </div>
      <div class="service-spine">
        <span>gas panel</span><span>vacuum pump</span><span>abatement</span>
      </div>
    </div>
    <div class="cutaway-label">Vacuum docking deck, public-source representative layout</div>
    <div class="cutaway-deck"></div>
    <div class="cluster-core">
      <span class="core-bolt b1"></span>
      <span class="core-bolt b2"></span>
      <span class="core-bolt b3"></span>
      <span class="core-bolt b4"></span>
      <div>
        <strong>TM</strong>
        <span>${platform.core}<br>${platform.coreDesc}</span>
      </div>
    </div>
    <div class="robot-arm"></div>
    <svg class="wafer-flow-svg" viewBox="0 0 1000 1040" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <marker id="flowArrow" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,6 L8,3 z" fill="#f2b33d"></path>
        </marker>
      </defs>
      <path class="flow-route" d="M160 230 C260 250 310 560 360 875 C420 790 455 700 500 655 C595 590 680 575 780 625 C675 665 580 675 500 655 C450 715 410 800 360 875 C455 915 565 915 640 875" />
    </svg>
    <div class="wafer-step-dot" aria-hidden="true">W</div>
  `;
  clusterSlots.forEach(slot => drawFlowLine(board, slot));
  clusterSlots.forEach(slot => {
    const type = clusterState[slot.id];
    const slotEl = document.createElement("button");
    slotEl.className = `slot ${type ? "filled" : ""}`;
    if (type) slotEl.dataset.type = type;
    slotEl.dataset.family = slot.family;
    slotEl.dataset.slot = slot.id;
    slotEl.style.left = `${slot.x}%`;
    slotEl.style.top = `${slot.y}%`;
    slotEl.innerHTML = type ? moduleFace(type, slot.role) : emptyDock(slot);
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

function emptyDock(slot) {
  const helper = slot.family === "loadlock" ? "Load Lock module docking bay" : "Process / Clean / Cool chamber docking bay";
  return `
    <span class="dock-socket">
      <span class="dock-ring"></span>
      <span class="gate-valve"></span>
      <span class="guide-rails"><i></i><i></i></span>
      <span class="slot-role">${slot.role}</span>
      <span class="slot-name">${helper}</span>
      <span class="dock-hint">drag module here</span>
    </span>
  `;
}

function updateClusterFlowStep() {
  const step = clusterFlowSteps[clusterFlowStep];
  const dot = document.querySelector(".wafer-step-dot");
  const position = clusterFlowPositions[clusterFlowStep];
  if (dot && position) {
    dot.style.left = `${position.left}%`;
    dot.style.top = `${position.top}%`;
  }
  const detail = document.querySelector("#flow-step-detail");
  if (detail && step) {
    detail.innerHTML = `
      <strong>${clusterFlowStep + 1}. ${step.title}</strong>
      <span>${step.subtitle}</span>
      <p>${step.text}</p>
      <small>${step.install}</small>
    `;
  }
  document.querySelectorAll("[data-flow-step]").forEach(item => {
    item.classList.toggle("active", Number(item.dataset.flowStep) === clusterFlowStep);
    if (item.tagName === "BUTTON") {
      item.setAttribute("aria-pressed", Number(item.dataset.flowStep) === clusterFlowStep ? "true" : "false");
    }
  });
  updateClusterMentalLab();
}

function renderClusterFlowPanel() {
  const panel = document.querySelector("#cluster-flow-panel");
  if (!panel) return;
  const modeText = clusterFlowTimer ? "자동 재생 중: 3.5초마다 다음 단계" : clusterFlowOn ? "수동 단계 보기" : "버튼을 누르면 보드에 경로가 표시됩니다";
  panel.innerHTML = `
    <div class="flow-panel-head">
      <div>
        <p class="eyebrow">Wafer Path</p>
        <h2>웨이퍼가 장비 안에서 지나가는 순서</h2>
      </div>
      <span class="flow-mode">${modeText}</span>
    </div>
    <p class="flow-primer">
      초보자는 이 한 줄만 먼저 외우면 됩니다:
      <strong>FOUP 보관통 → FI/EFEM 대기압 로봇 → LL 압력 전환방 → TM 진공 로봇 → PM/CM 공정·보조 챔버 → TM → LL → FOUP</strong>.
      자동 흐름이 빠르게 느껴지면 아래 버튼을 하나씩 눌러 멈춘 상태로 보세요.
    </p>
    <div class="flow-term-grid" aria-label="핵심 약어 뜻">
      <span><strong>FI</strong> Factory Interface, 장비와 fab 물류가 만나는 전면 인터페이스</span>
      <span><strong>EFEM</strong> Equipment Front End Module, FOUP에서 wafer를 꺼내는 대기압 로봇 구역</span>
      <span><strong>LL</strong> Load Lock, 대기압과 진공을 이어 주는 압력 전환방</span>
      <span><strong>TM</strong> Transfer Module, 진공 안 중앙 로봇과 이송 통로</span>
      <span><strong>PM</strong> Process Module, 실제 EPI/RTP 공정이 일어나는 챔버</span>
      <span><strong>CM</strong> Clean/Cool/Support Module, 전처리·냉각 같은 보조 챔버를 이해하기 위한 표기</span>
    </div>
    ${renderClusterMentalLab()}
    <div class="flow-step-list">
      ${clusterFlowSteps.map((step, index) => `
        <button class="flow-step-button" type="button" data-flow-step="${index}" aria-pressed="false">
          <span>${index + 1}</span>
          <strong>${step.title}</strong>
          <small>${step.subtitle}</small>
        </button>
      `).join("")}
    </div>
    <article class="flow-step-detail" id="flow-step-detail"></article>
    <div class="cluster-coach">
      <article>
        <p class="eyebrow">Memory Loop</p>
        <h3>정답을 보기 전에 떠올리게 만드는 학습 루프</h3>
        <p>논문에서 반복 확인되는 retrieval practice는 읽기보다 “먼저 꺼내 말하기”가 장기 기억을 더 강하게 만듭니다. 이 보드는 PM/CM/LL을 맞히고 wafer path를 한 단계씩 누르며 피드백을 받도록 설계했습니다.</p>
      </article>
      <div class="memory-pill-grid">
        <span><strong>Recall</strong> FOUP, FI/EFEM, LL, TM, PM/CM 순서를 보지 않고 말하기</span>
        <span><strong>Build</strong> 고객 PM 수를 보고 LL 2개와 필요한 CM을 먼저 배치하기</span>
        <span><strong>Qualify</strong> pumpdown, robot teaching, gas/exhaust, temperature trace를 checklist로 연결하기</span>
      </div>
    </div>
    <div class="cluster-source-strip" aria-label="공개 근거">
      <a href="https://www.appliedmaterials.com/us/en/product-library/centura-prime-epi.html" target="_blank" rel="noreferrer">Centura Prime Epi: Siconi/Clarion/Ajax pre-clean</a>
      <a href="https://www.appliedmaterials.com/us/en/product-library/centura-xtera-epi.html" target="_blank" rel="noreferrer">Xtera Epi: selective epi, chemistry, temp control</a>
      <a href="https://patents.google.com/patent/EP1056123A2/en" target="_blank" rel="noreferrer">Cluster tool: load locks, transfer robot, process chambers</a>
      <a href="https://www.pfeiffervacuum.com/global/en/applications/load-lock-transfer/" target="_blank" rel="noreferrer">Load lock/transfer vacuum concept</a>
      <a href="https://pubmed.ncbi.nlm.nih.gov/16507066/" target="_blank" rel="noreferrer">Testing effect: memory tests improve retention</a>
    </div>
  `;
  panel.querySelectorAll("[data-flow-step]").forEach(button => {
    button.addEventListener("click", () => selectClusterFlowStep(Number(button.dataset.flowStep)));
  });
  updateClusterFlowStep();
}

function renderClusterMentalLab() {
  const mentalNodes = [
    ["foup", "FOUP", "25-slot carrier"],
    ["lp", "Load Port", "dock, clamp, door"],
    ["efem", "EFEM", "atmospheric robot"],
    ["aligner", "Aligner/Mapper", "slot and orientation"],
    ["ll", "Load Lock", "pump/vent bridge"],
    ["tm", "Transfer Module", "vacuum robot room"],
    ["pm", "EPI PM", "film growth chamber"],
    ["gas", "Gas Box", "MFC / purge"],
    ["pump", "Pump", "vacuum path"],
    ["abatement", "Abatement", "exhaust treatment"],
    ["robot", "Robot Blade", "handoff geometry"],
    ["gauge", "Pressure Gauge", "pumpdown evidence"]
  ];
  return `
    <section class="cluster-mental-lab" aria-label="FOUP to EPI PM 3D mental model and communication model">
      <div class="mental-lab-head">
        <div>
          <p class="eyebrow">3D Mental Model</p>
          <h3>FOUP에서 EPI PM까지, 웨이퍼/압력/로봇/통신을 한 장면으로 보기</h3>
          <p>단계 버튼을 누르면 wafer 위치, 압력 경계, 장비 내부 owner, fab host 통신 관점이 같이 바뀝니다. 실제 고객 line의 상세 message, interlock logic, recipe, valve sequence는 공식 승인 문서 영역입니다.</p>
        </div>
        <span class="mental-source-badge">Public standards view + CE install model</span>
      </div>
      <div class="mental-lab-grid">
        <div class="mental-3d-scene" id="cluster-mental-scene">
          <div class="mental-rail fab-rail"><span>FAB / AMHS SIDE</span></div>
          <div class="mental-rail vacuum-rail"><span>VACUUM MAINFRAME SIDE</span></div>
          <div class="mental-wafer" id="mental-wafer">W</div>
          <div class="mental-path path-foup-efem"></div>
          <div class="mental-path path-efem-ll"></div>
          <div class="mental-path path-ll-tm"></div>
          <div class="mental-path path-tm-pm"></div>
          <div class="mental-path path-pm-return"></div>
          ${mentalNodes.map(([id, label, sub]) => `
            <button type="button" class="mental-node mental-${id}" data-mental-node="${id}">
              <strong>${label}</strong>
              <small>${sub}</small>
            </button>
          `).join("")}
        </div>
        <article class="mental-step-card" id="mental-step-card"></article>
      </div>
      <div class="comm-lab-grid">
        <article class="comm-map-card">
          <div class="comm-map-head">
            <p class="eyebrow">Communication Stack</p>
            <h3>Host가 직접 로봇을 움직이는 게 아니라, Equipment Controller가 표준 view와 내부 controller를 연결한다</h3>
          </div>
          <div class="comm-map" id="cluster-comm-map">
            ${clusterCommNodes.map(([id, label, desc]) => `
              <div class="comm-node comm-${id}" data-comm-node="${id}">
                <strong>${label}</strong>
                <small>${desc}</small>
              </div>
            `).join("")}
          </div>
          <div class="comm-edge-list" id="cluster-comm-edges">
            ${clusterCommEdges.map(([id, label, desc]) => `
              <span data-comm-edge="${id}"><strong>${label}</strong>${desc}</span>
            `).join("")}
          </div>
        </article>
        <article class="install-thinking-card">
          <p class="eyebrow">Install CE가 머릿속에 그려야 하는 것</p>
          <ul>
            <li><strong>물리:</strong> FOUP, load port, EFEM robot, LL, TM, PM이 어떤 순서로 붙는가.</li>
            <li><strong>압력:</strong> 대기압 mini-environment와 vacuum mainframe 사이 경계가 어디인가.</li>
            <li><strong>제어:</strong> host는 carrier/job/event view를 보고, 장비 controller가 내부 module controller를 조율한다.</li>
            <li><strong>증거:</strong> slot map, pumpdown curve, robot teach, chamber ready, gas/exhaust/abatement ready를 같은 wafer ID로 묶는다.</li>
            <li><strong>중지:</strong> wafer가 움직이기 전, 압력이 열리기 전, gas가 열리기 전 각각 멈출 조건이 다르다.</li>
          </ul>
        </article>
      </div>
      <div class="comm-source-strip">
        <a href="https://store-us.semi.org/products/e03000-semi-e30-specification-for-the-generic-model-for-communications-and-control-of-manufacturing-equipment-gem" target="_blank" rel="noreferrer">SEMI E30 GEM</a>
        <a href="https://store-us.semi.org/products/e08700-semi-e87-specification-for-carrier-management-cms" target="_blank" rel="noreferrer">SEMI E87 Carrier Management</a>
        <a href="https://store-us.semi.org/products/e09000-semi-e90-specification-for-substrate-tracking" target="_blank" rel="noreferrer">SEMI E90 Substrate Tracking</a>
        <a href="https://store-us.semi.org/products/e08400-semi-e84-specification-for-enhanced-carrier-handoff-parallel-i-o-interface" target="_blank" rel="noreferrer">SEMI E84 Carrier Handoff</a>
        <a href="https://store-us.semi.org/products/e03700-semi-e37-high-speed-secs-message-services-hsms-generic-services" target="_blank" rel="noreferrer">SEMI E37 HSMS</a>
        <a href="https://store-us.semi.org/products/e04000-semi-e40-specification-for-processing-management" target="_blank" rel="noreferrer">SEMI E40 Processing</a>
        <a href="https://store-us.semi.org/products/e09400-semi-e94-specification-for-control-job-management" target="_blank" rel="noreferrer">SEMI E94 Control Job</a>
      </div>
    </section>
  `;
}

function updateClusterMentalLab() {
  const step = clusterMentalSteps[clusterFlowStep];
  if (!step) return;
  const card = document.querySelector("#mental-step-card");
  if (card) {
    card.innerHTML = `
      <span class="mental-pressure">${step.pressure}</span>
      <h3>${step.title}</h3>
      <p>${step.korean}</p>
      <div class="mental-two">
        <div><strong>Robot / module view</strong><span>${step.robot}</span></div>
        <div><strong>Host / communication view</strong><span>${step.host}</span></div>
      </div>
      <div class="mental-evidence">
        <strong>CE evidence</strong>
        <ul>${step.evidence.map(item => `<li>${item}</li>`).join("")}</ul>
      </div>
      <p class="mental-stop"><strong>Stop condition:</strong> ${step.stop}</p>
    `;
  }
  const wafer = document.querySelector("#mental-wafer");
  if (wafer) {
    wafer.style.left = `${step.wafer.left}%`;
    wafer.style.top = `${step.wafer.top}%`;
  }
  document.querySelectorAll("[data-mental-node]").forEach(node => {
    node.classList.toggle("active", step.activeMental.includes(node.dataset.mentalNode));
  });
  document.querySelectorAll("[data-comm-node]").forEach(node => {
    node.classList.toggle("active", step.activeComm.includes(node.dataset.commNode));
  });
  document.querySelectorAll("[data-comm-edge]").forEach(edge => {
    edge.classList.toggle("active", step.activeEdge.includes(edge.dataset.commEdge));
  });
}

function moduleFace(type, role) {
  const [name, desc] = moduleDefs[type];
  const visual = moduleVisuals[type];
  return `
    <span class="module-docked module-${type}">
      <span class="docking-flange">
        <i></i><i></i><i></i><i></i>
      </span>
      <span class="module-housing">
        <span class="module-lid"></span>
        <span class="slot-role">${role}</span>
        <span class="slot-name">${name}</span>
        <span class="module-chamber-window">${visual.short}</span>
        <span class="module-sub">${visual.hardware}</span>
        <span class="service-strip">${visual.services.map(service => `<i>${service}</i>`).join("")}</span>
      </span>
      <span class="module-face">
        <span class="ports">${visual.ports.map(port => `<i title="${port}"></i>`).join("")}</span>
        <span class="module-sub">${desc}</span>
      </span>
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
  if (flowButton) flowButton.textContent = clusterFlowTimer ? "웨이퍼 흐름 정지" : "웨이퍼 흐름 자동재생";
  document.querySelector("#cluster-legend").innerHTML = `
    <strong>요구조건</strong><br>
    PM(Process Module): ${target.pm}/${platform.maxPm}<br>
    Clean/CM: ${target.clean}/${platform.maxClean}<br>
    Cool/CM: ${target.cool}/${platform.maxCool}<br>
    TM(Transfer Module): 1 fixed<br>
    LL(Load Lock): 2 fixed<br>
    View: ${clusterFlowTimer ? "auto wafer flow" : clusterFlowOn ? "manual wafer step" : "static layout"}
  `;
}

function renderClusterConcepts() {
  const selectedPart = clusterAnatomyParts.find(part => part.id === activeClusterAnatomy) || clusterAnatomyParts[0];
  document.querySelector("#cluster-concepts").innerHTML = `
    <div class="cluster-anatomy-lab">
      <div class="section-heading">
        <p>Equipment Anatomy Lab</p>
        <h2>장비 구조 해부실</h2>
      </div>
      <p class="cluster-anatomy-note">아래 부품을 누르면 역할, 왜 필요한지, 문제가 생겼을 때 보이는 증상, CE 관점 확인 순서가 바로 바뀝니다.</p>
      <div class="cluster-anatomy-grid">
        ${clusterAnatomyParts.map(part => `
          <button class="anatomy-chip ${part.id === selectedPart.id ? "active" : ""}" type="button" data-anatomy="${part.id}">
            ${part.label}
          </button>
        `).join("")}
      </div>
      <article class="anatomy-detail-panel">
        <span>${selectedPart.label}</span>
        <h3>${selectedPart.role}</h3>
        <p>${selectedPart.why}</p>
        <div class="anatomy-detail-grid">
          <section>
            <strong>문제 시 보이는 증상</strong>
            <ul>${selectedPart.symptoms.map(item => `<li>${item}</li>`).join("")}</ul>
          </section>
          <section>
            <strong>CE 관점</strong>
            <p>${selectedPart.ce}</p>
          </section>
        </div>
      </article>
    </div>
    <h2>아무것도 모르는 사람용 구조 설명</h2>
    <div class="deep-item"><strong>FI/EFEM은 무엇인가?</strong><span>FI는 Factory Interface, EFEM은 Equipment Front End Module입니다. 쉽게 말하면 장비 앞쪽에서 FOUP을 열고 wafer를 꺼내 Load Lock으로 넘기는 대기압 로봇 구역입니다. 아직 진공 공정 챔버 안이 아니므로, FOUP 도킹·door open·wafer align·load lock handoff를 이해하는 입구라고 보면 됩니다.</span></div>
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
  document.querySelectorAll("[data-anatomy]").forEach(button => {
    button.addEventListener("click", () => {
      activeClusterAnatomy = button.dataset.anatomy;
      renderClusterConcepts();
    });
  });
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
  renderClusterFlowPanel();
  renderClusterLegend();
  renderClusterFeedback();
  renderClusterConcepts();
}

initClusterControls();
applyClusterPreset();
