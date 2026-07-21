const CE_MASTERY_KEY = "ceMasteryState";
const CE_CASE_ATTEMPTS_KEY = "ceTier1CaseAttemptsV1";
const CE_REPORT_DRAFTS_KEY = "ceTier1ReportDraftsV1";

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

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

const masteryState = readJson(CE_MASTERY_KEY, {});
const caseAttempts = readJson(CE_CASE_ATTEMPTS_KEY, {});
const reportDrafts = readJson(CE_REPORT_DRAFTS_KEY, {});
let activeMasteryTab = "scope";

const tier1Levels = [
  ["L0", "현장 언어 세팅", "Fab, CE 역할, 안전 경계, 고객 보고 문장을 말할 수 있다."],
  ["L1", "관찰 가능한 초보 CE", "선임 옆에서 PM/설치 흐름을 따라가고, 사실과 추정을 분리해 기록한다."],
  ["L2", "Tier 1 보조 수행", "승인된 범위 안에서 visual check, log capture, basic reset 판단, parts 준비를 수행한다."],
  ["L3", "Tier 1 독립 준비", "Routine PM, basic hardware replacement, alarm categorization, handover note를 증거 기반으로 수행한다."],
  ["L4", "고성능 CE II 습관", "문제를 subsystem으로 나누고, 멈출 조건과 고객 보고를 동시에 관리한다."],
  ["L5", "선임이 믿는 초급 리드", "작업 전후 evidence pack, open item, owner, ETA, escalation note를 안정적으로 닫는다."]
];

const tier1Scope = [
  {
    title: "Tier 1 CE의 정확한 범위",
    body: "공식 교육, site rule, 작업허가, 선임 승인 범위 안에서 routine PM, visual inspection, startup/shutdown, alarm categorization, basic part replacement, leak-check evidence capture, wafer-handling observation, report/handover를 수행하는 단계입니다.",
    why: "Tier 1은 '혼자 뭐든 하는 사람'이 아니라, 안전 경계 안에서 반복 작업을 안정적으로 닫고 이상 징후를 빠르게 escalate하는 사람입니다."
  },
  {
    title: "Tier 1에서 제외할 것",
    body: "root cause engineering, design modification, software change, advanced RF tuning, process optimization, recipe edit, interlock bypass, detector setpoint, valve sequence, customer acceptance limit 해석은 Tier 2/3 또는 공식 owner 영역입니다.",
    why: "첫날 생산성은 과감한 조작이 아니라, 금지 영역을 정확히 알고 증거를 모으는 데서 나옵니다."
  },
  {
    title: "CE II처럼 보이는 핵심 습관",
    body: "작업 전 safety boundary를 확인하고, 작업 중 touched item을 기록하고, 작업 후 baseline evidence를 남기며, 고객에게 fact-impact-risk-next action으로 보고합니다.",
    why: "선임은 신입이 모든 답을 아는지보다, 위험한 추정을 멈추고 필요한 증거를 요청하는지를 봅니다."
  }
];

const ceTopicCards = [
  {
    id: "safety-stop-work",
    category: "Safety",
    title: "Stop-work authority / 안전 중지권",
    explanation: "작업자가 위험하거나 승인 범위가 불명확하다고 판단하면 작업을 멈추고 owner 확인을 요구할 수 있는 권한입니다.",
    why: "가스, 전기, 진공, 고온, robot motion은 작은 확신 부족이 사람과 장비를 동시에 위험하게 만듭니다.",
    field: "gas ready signal은 녹색인데 abatement owner witness가 없으면 first gas 관련 작업을 진행하지 않고 hold합니다.",
    mistakes: ["schedule 압박 때문에 interlock/alarm을 reset만 하고 넘어감", "permit/LOTO 범위를 구두로만 확인함", "고객 요청이면 모두 가능한 것으로 착각함"],
    interview: "작업을 멈춰야 하는 상황 5가지를 말해보세요.",
    troubleshooting: "증상보다 먼저 사람, gas, energized electrical, moving robot, hot surface 위험을 확인합니다.",
    decision: "위험 가능성 있음 -> owner/permit/evidence 확인 -> 불명확하면 hold -> senior/EHS/customer owner에게 보고",
    flashcards: ["LOTO", "permit", "stored energy", "owner witness"],
    checkpoint: "모르는 상태에서 진행하지 않는 문장을 고객에게 정중하게 말할 수 있다.",
    source: "SEMI S2/S19/S22 safety axis, OSHA hazardous energy controls"
  },
  {
    id: "site-entry-cleanroom",
    category: "Fab",
    title: "Site entry / cleanroom behavior",
    explanation: "fab은 장비보다 site rule이 먼저입니다. 출입, gowning, 사진, 반입품, 이동 동선, 비상대피, 보안 규칙을 먼저 맞춥니다.",
    why: "기술적으로 맞아도 보안/청정/안전 규칙을 깨면 현장 신뢰가 무너집니다.",
    field: "장비 사진이 필요해도 고객 보안 승인 전에는 촬영하지 않고, 필요한 evidence type만 기록합니다.",
    mistakes: ["사진/로그/recipe를 개인 기기로 저장", "gowning 상태로 바닥/오염원 접촉", "escort rule 무시"],
    interview: "fab에서 기술보다 먼저 확인할 site rule은 무엇인가요?",
    troubleshooting: "data export가 필요하면 customer rule, internal policy, redaction boundary를 먼저 확인합니다.",
    decision: "site rule 확인 -> 작업 동선 확인 -> 보안/청정 risk 확인 -> 기록 방식 합의",
    flashcards: ["gowning", "escort", "photo rule", "data export"],
    checkpoint: "출입 첫 30분 동안 물어볼 질문 10개를 만들 수 있다.",
    source: "Applied Field Service public role language, public semiconductor site safety practice"
  },
  {
    id: "visual-inspection",
    category: "PM",
    title: "Visual inspection / 육안 점검",
    explanation: "분해나 조작 전에 damage, leak sign, loose connector, cable strain, contamination, missing label, abnormal sound/smell을 찾는 기본 점검입니다.",
    why: "초급 CE가 가장 안전하게 큰 문제를 잡아내는 방법은 먼저 보는 것입니다.",
    field: "PM 후 particle 증가가 있으면 새 부품, O-ring seat, shield, chamber edge, handling path 사진/메모를 touched item 기준으로 정리합니다.",
    mistakes: ["cleanroom에서 손가락으로 표면을 만져 확인", "정상 기준 사진 없이 '괜찮아 보임'이라고 기록", "작업 전 상태를 남기지 않음"],
    interview: "PM 전후 visual inspection에서 반드시 남길 evidence는 무엇인가요?",
    troubleshooting: "Before/after 상태, touched item, loose/changed/missing/contaminated item을 분리합니다.",
    decision: "보이는 이상 발견 -> 사진/메모 승인 확인 -> 작업 중지 여부 판단 -> owner에게 공유",
    flashcards: ["before/after", "touched item", "contamination", "loose connector"],
    checkpoint: "visual check를 subjective opinion이 아니라 evidence 문장으로 바꿀 수 있다.",
    source: "Field service best practice, Applied CE PM/CM role description"
  },
  {
    id: "startup-shutdown",
    category: "Operations",
    title: "Tool startup / shutdown / initialization",
    explanation: "장비를 켜고 끄는 행위가 아니라 power, controller, interlock, cooling, vacuum, gas, robot, host 상태가 안전한 순서로 ready가 되는지 확인하는 과정입니다.",
    why: "초기화 실패는 실제 hardware fault일 수도 있고 facility/host/permission 상태일 수도 있습니다.",
    field: "power-on 후 module ready가 안 뜨면 controller boot, I/O ready, EMO/E-stop, cover, cooling, vacuum, host 상태를 분리해서 봅니다.",
    mistakes: ["ready 안 뜬다고 반복 reset", "shutdown 전 hot/vacuum/gas 상태를 확인하지 않음", "alarm 발생 시간을 기록하지 않음"],
    interview: "system initialization failure를 subsystem별로 나누어 설명해보세요.",
    troubleshooting: "전원 -> controller -> interlock -> facility -> module -> host -> wafer handling 순으로 증거를 모읍니다.",
    decision: "init fail -> alarm/time capture -> recent change 확인 -> subsystem owner 지정 -> reset 전 evidence 저장",
    flashcards: ["boot", "ready bit", "EMO", "module controller"],
    checkpoint: "startup issue를 '장비 안 켜짐'이 아니라 evidence tree로 표현할 수 있다.",
    source: "Public field service workflow, electrical/vacuum/gas subsystem role descriptions"
  },
  {
    id: "vacuum-loadlock",
    category: "Vacuum",
    title: "Vacuum, load lock, leak checking",
    explanation: "load lock은 대기와 process vacuum 사이의 경계입니다. pumpdown, vent, gate/slit valve, pressure gauge, seal/O-ring, rough/turbo pump 상태를 봅니다.",
    why: "EPI/RTP cluster tool에서 wafer flow의 안정성은 pressure boundary가 흔들리지 않는 데서 시작합니다.",
    field: "chamber won't pump는 seal, door state, valve state, pump, foreline, gauge, recent PM, facility exhaust/abatement를 나눠 봅니다.",
    mistakes: ["pump 교체부터 생각", "gauge 신뢰도 확인 없이 leak 단정", "O-ring을 공식 절차/청정 기준 없이 만짐"],
    interview: "pumpdown delay에서 확인할 evidence 8가지를 말해보세요.",
    troubleshooting: "curve shape, base pressure, valve command/feedback, pump status, recent opened surface, gauge health를 모읍니다.",
    decision: "압력 이상 -> wafer 투입 hold -> pump/valve/gauge/seal evidence -> leak check는 승인 절차와 기준 우선",
    flashcards: ["pumpdown", "rough pump", "turbo pump", "foreline", "O-ring"],
    checkpoint: "load lock이 왜 필요한지 FOUP-EFEM-TM-PM 흐름과 연결해 말할 수 있다.",
    source: "Public cluster tool/vacuum concepts"
  },
  {
    id: "gas-mfc",
    category: "Gas",
    title: "Gas delivery, MFC, purge, exhaust, abatement",
    explanation: "gas는 source cabinet에서 tool gas panel, MFC/valve, chamber, exhaust, abatement까지 하나의 chain으로 봐야 합니다.",
    why: "MFC alarm 하나도 gas supply, restriction, valve, sensor, purge, exhaust, abatement safety와 연결됩니다.",
    field: "MFC actual mismatch가 나면 setpoint를 임의로 키우지 않고 supply pressure, valve state, MFC health, gas cabinet ready, purge/exhaust 상태를 봅니다.",
    mistakes: ["flow command만 보고 실제 유량 안정성 판단", "toxic/pyrophoric/corrosive gas를 같은 gas로 취급", "abatement ready 없이 gas work 진행"],
    interview: "first gas readiness에서 source-to-abatement evidence chain을 설명해보세요.",
    troubleshooting: "gas name보다 hazard family, owner, SDS, detector, purge, exhaust, abatement, trend evidence를 먼저 봅니다.",
    decision: "gas concern -> no solo -> official SDS/gas matrix -> owner witness -> source-to-abatement packet",
    flashcards: ["MFC", "purge", "abatement", "gas cabinet", "SDS"],
    checkpoint: "실제 gas species와 flow는 공식 문서로만 확정한다고 말할 수 있다.",
    source: "OSHA semiconductor hazards, NIOSH gas safety, SEMI S6/S18"
  },
  {
    id: "pneumatic-valves",
    category: "Mechanical",
    title: "Pneumatic systems and valve replacement",
    explanation: "공압은 압축공기/CDA, solenoid, actuator, valve position feedback, tubing, regulator가 함께 움직이는 시스템입니다.",
    why: "slit valve, gate valve, lift pin 같은 motion fault는 전기 command, 공압 source, mechanical friction, sensor feedback을 분리해야 합니다.",
    field: "valve not open alarm은 valve 자체보다 command, air supply, solenoid, actuator, mechanical obstruction, feedback sensor를 나눠 봅니다.",
    mistakes: ["valve 부품부터 교체", "공압 잔류 에너지 확인 없이 분리", "feedback mismatch를 mechanical로만 단정"],
    interview: "pneumatic valve fault를 5개 subsystem으로 분해해보세요.",
    troubleshooting: "command present? air present? actuator moves? feedback changes? mechanical path clear? 순서로 생각합니다.",
    decision: "motion abnormal -> wafer risk hold -> energy isolation boundary -> command/air/motion/feedback evidence",
    flashcards: ["CDA", "solenoid", "actuator", "NO/NC", "feedback"],
    checkpoint: "sensor replacement와 valve replacement의 확인 evidence 차이를 말할 수 있다.",
    source: "Public pneumatic/field service troubleshooting practice"
  },
  {
    id: "electrical-dvm-plc",
    category: "Electrical",
    title: "Electrical, DVM, PLC I/O",
    explanation: "DVM은 찍어보는 도구가 아니라 expected value를 세우고 안전 경계를 확인한 뒤 증거를 좁히는 도구입니다.",
    why: "24V control, relay, fuse, sensor, interlock chain을 이해하면 alarm을 더 빠르게 분류할 수 있습니다.",
    field: "sensor input이 안 들어오면 power, common, signal, connector, sensor health, PLC input status를 나눠 확인합니다.",
    mistakes: ["current jack에 lead를 꽂은 채 전압 측정", "energized work 승인 없이 panel 측정", "continuity를 live circuit에서 측정"],
    interview: "NO/NC, relay coil/contact, voltage drop을 현장 예로 설명해보세요.",
    troubleshooting: "측정 전 expected value -> meter prove -> safe state -> measurement -> known source 재확인 순서입니다.",
    decision: "electrical concern -> authorization 확인 -> de-energized 가능 범위 우선 -> live work는 승인/PPE/자격 필요",
    flashcards: ["DVM", "24V", "NO/NC", "relay", "PLC I/O"],
    checkpoint: "어디에 대는지가 아니라 왜 그 값을 기대하는지 설명할 수 있다.",
    source: "OSHA hazardous energy, public electrical measurement safety"
  },
  {
    id: "wafer-handling-robot",
    category: "Automation",
    title: "Wafer handling, robot, FOUP, EFEM, load port",
    explanation: "wafer는 FOUP에서 load port, EFEM, load lock, transfer module, process module로 이동합니다. 각 handoff에는 ID, map, pressure, door, robot, sensor 상태가 있습니다.",
    why: "mis-pick, slot map mismatch, wafer scratch는 단순 robot 문제가 아니라 carrier seating, mapping, teach, sensor timing, pressure boundary와 연결됩니다.",
    field: "robot stops이면 wafer 투입을 반복하지 않고 event log, slot map, carrier seating, end-effector, teach, sensor, slit valve 상태를 확인합니다.",
    mistakes: ["wafer를 계속 넣어 재현", "host/wafer ID mismatch를 무시하고 process fault로 판단", "pressure boundary와 robot state를 분리하지 못함"],
    interview: "FOUP -> EFEM -> LL -> TM -> PM wafer path를 pressure boundary와 함께 설명하세요.",
    troubleshooting: "carrier ID/map -> EFEM handoff -> LL pump/vent -> slit/gate valve -> TM robot -> PM receive 순서로 봅니다.",
    decision: "handling abnormal -> wafer risk hold -> dry/state evidence -> owner witness -> no production wafer test",
    flashcards: ["FOUP", "EFEM", "load port", "load lock", "TM robot"],
    checkpoint: "wafer path를 60초 안에 손으로 그려 설명할 수 있다.",
    source: "Public cluster tool architecture and FOUP/loadport concepts"
  },
  {
    id: "temperature-pressure-control",
    category: "Process Control",
    title: "Temperature, pressure, cooling control",
    explanation: "EPI/RTP에서 온도와 압력은 공정 결과와 장비 안정성을 동시에 결정합니다. sensor 신뢰도, actuator command, cooling, chamber condition을 함께 봅니다.",
    why: "temperature unstable은 lamp/heater 문제일 수도 있고 pyrometry/window/cooling/rotation/recipe permission/contamination 문제일 수도 있습니다.",
    field: "RTP trace overshoot는 lamp command, sensor/pyrometry, rotation, cooling, chamber history, comparison chamber를 같이 봅니다.",
    mistakes: ["setpoint 조정으로 문제 숨김", "sensor drift와 실제 thermal issue를 구분하지 않음", "PCW/chiller owner를 늦게 부름"],
    interview: "temperature trace와 pressure trace를 보고 어떤 evidence를 요청할지 말해보세요.",
    troubleshooting: "command vs actual, sensor confidence, facility support, chamber history, golden trace comparison을 묶습니다.",
    decision: "unstable trace -> process wafer hold -> trace capture -> sensor/actuator/facility/chamber comparison",
    flashcards: ["pyrometry", "thermal budget", "pressure control", "PCW", "golden trace"],
    checkpoint: "trace 한 장을 보고 hardware/process/facility 가설을 분리할 수 있다.",
    source: "Applied RTP public product language, general process control principles"
  },
  {
    id: "pm-replacement-torque",
    category: "Maintenance",
    title: "PM, basic replacement, O-ring, torque, fasteners",
    explanation: "PM은 checklist 완료가 아니라 작업 전후 상태, touched part, seal, connector, torque spec, clean handling, baseline recovery를 닫는 일입니다.",
    why: "PM 직후 failure는 손댄 부위에서 시작되는 경우가 많습니다.",
    field: "O-ring replacement는 공식 part, surface condition, seating, cleanliness, leak/pumpdown evidence, documentation을 같이 봅니다.",
    mistakes: ["공식 torque spec 없이 감으로 조임", "fastener mix-up", "used seal 재사용", "PM 후 baseline evidence 없이 handover"],
    interview: "torque procedure에서 숫자보다 먼저 확인할 것은 무엇인가요?",
    troubleshooting: "최근 작업 부위, seal/connector/fastener/valve/calibration/part lot을 먼저 봅니다.",
    decision: "PM closeout -> touched item list -> official spec check -> baseline run/evidence -> shift handover",
    flashcards: ["O-ring", "torque", "fastener", "baseline", "touched part"],
    checkpoint: "공식 torque value를 외우는 대신 spec source와 evidence를 확인해야 한다고 말할 수 있다.",
    source: "Field maintenance best practice; proprietary torque values excluded"
  },
  {
    id: "alarm-doc-escalation",
    category: "Communication",
    title: "Alarm interpretation, documentation, escalation",
    explanation: "alarm은 원인이 아니라 장비가 감지한 현상입니다. time, module, severity, repeatability, recent change, wafer risk를 같이 기록해야 합니다.",
    why: "좋은 CE는 alarm reset보다 evidence와 communication을 먼저 닫습니다.",
    field: "interlock failed alarm은 cover/EMO/exhaust/cooling/gas/vacuum/facility signal을 분리하고 bypass를 절대 하지 않습니다.",
    mistakes: ["alarm text만 보고 root cause 단정", "reset 후 재현 안 되면 완료", "고객에게 ETA를 과하게 약속"],
    interview: "고객에게 현재 상태를 1분 안에 보고해보세요.",
    troubleshooting: "alarm category: safety, facility, vacuum, gas, motion, electrical, host/data, process result로 나눕니다.",
    decision: "alarm -> safety category -> wafer/customer impact -> evidence capture -> owner/escalation -> next update time",
    flashcards: ["severity", "repeatability", "owner", "ETA", "handover"],
    checkpoint: "fact, impact, risk, next action, owner, next update를 한 문단으로 쓸 수 있다.",
    source: "Applied CE public role descriptions, service communication best practice"
  },
  {
    id: "process-verification",
    category: "Qualification",
    title: "Recipe verification and basic process verification",
    explanation: "Tier 1은 recipe를 최적화하지 않습니다. 승인된 recipe/version/permission이 맞는지, baseline wafer와 metrology evidence가 정상 흐름인지 확인합니다.",
    why: "잘못된 recipe/version/permission으로 qualification하면 hardware가 정상이어도 결과가 무너집니다.",
    field: "qualification 전에는 tool/chamber, recipe name/version, wafer ID, metrology plan, golden/baseline trace, open deviation을 분리합니다.",
    mistakes: ["recipe 내용을 임의 변경", "한 장의 wafer result로 release", "metrology timestamp/wafer ID 불일치 무시"],
    interview: "basic process verification과 process optimization의 차이를 설명하세요.",
    troubleshooting: "result abnormal -> traceability -> baseline -> metrology -> chamber comparison -> process owner escalation",
    decision: "process mismatch -> production hold -> recipe/version/permission/time sync evidence -> process owner review",
    flashcards: ["baseline wafer", "metrology", "recipe version", "traceability", "qualification"],
    checkpoint: "recipe edit 없이도 CE가 확인해야 할 evidence를 말할 수 있다.",
    source: "Public SAT/OQ/PQ concepts and Applied on-wafer performance language"
  }
];

const ceMissions = [
  ["tm-001", "Tier 1에 포함되는 작업과 Tier 2/3로 넘길 작업을 10개씩 분리한다."],
  ["tm-002", "FOUP -> load port -> EFEM -> load lock -> TM -> PM wafer path를 pressure boundary와 함께 그린다."],
  ["tm-003", "첫날 site entry 질문 15개를 작성한다."],
  ["tm-004", "Routine PM 전/중/후 evidence list를 만든다."],
  ["tm-005", "Visual inspection 문장을 subjective opinion 없이 evidence 문장으로 바꾼다."],
  ["tm-006", "Tool startup failure를 power/controller/interlock/facility/module/host로 분리한다."],
  ["tm-007", "Tool shutdown 전 확인할 gas/vacuum/thermal/motion 상태를 말한다."],
  ["tm-008", "Alarm을 safety/facility/vacuum/gas/motion/electrical/host/process로 분류한다."],
  ["tm-009", "Pumpdown delay에서 확인할 evidence 8가지를 외운다."],
  ["tm-010", "O-ring replacement 후 필요한 evidence를 공식 절차 중심으로 설명한다."],
  ["tm-011", "Torque 작업에서 값이 아니라 spec source/tool calibration/pattern/evidence가 중요함을 설명한다."],
  ["tm-012", "MFC actual mismatch의 가설을 supply/valve/restriction/MFC/sensor/purge로 나눈다."],
  ["tm-013", "Gas source-to-abatement chain을 cabinet, detector, purge, exhaust, abatement, owner witness로 그린다."],
  ["tm-014", "Toxic/pyrophoric/corrosive/flammable/inert gas 위험을 SDS 기준으로 분류한다."],
  ["tm-015", "Pneumatic valve fault를 command/air/actuator/mechanical/feedback으로 나눈다."],
  ["tm-016", "DVM 측정 전 expected value를 세우는 예시를 3개 만든다."],
  ["tm-017", "NO/NC, relay coil/contact, PLC input/output을 현장 문장으로 설명한다."],
  ["tm-018", "Interlock failed에서 bypass 대신 확인할 owner/evidence를 말한다."],
  ["tm-019", "Robot stop에서 wafer를 계속 넣지 말아야 하는 이유를 설명한다."],
  ["tm-020", "Temperature unstable trace에서 sensor/actuator/facility/chamber 가설을 분리한다."],
  ["tm-021", "Pressure control issue에서 gauge 신뢰도와 valve state를 분리해 질문한다."],
  ["tm-022", "Cooling/PCW issue에서 chiller owner에게 요청할 evidence를 작성한다."],
  ["tm-023", "ESC/RF는 operational understanding까지만 학습하고 advanced tuning은 제외한다고 말한다."],
  ["tm-024", "Basic hardware replacement 후 part number, lot, touched connector, baseline evidence를 기록한다."],
  ["tm-025", "PM 이후 particle 증가를 touched item, handling, chamber clean, gas/purge, metrology로 나눈다."],
  ["tm-026", "Basic process verification과 process optimization의 경계를 설명한다."],
  ["tm-027", "Recipe verification에서 name/version/permission/tool/chamber/wafer ID만 확인하고 edit하지 않는다고 말한다."],
  ["tm-028", "Customer 1분 briefing을 fact-impact-risk-next action-owner-ETA 구조로 쓴다."],
  ["tm-029", "Escalation note를 alarm/time/recent change/data tried/risk/decision needed 구조로 쓴다."],
  ["tm-030", "Shift handover에 open item, owner, ETA, residual risk를 넣는다."],
  ["tm-031", "Unsafe customer request를 정중히 hold하는 문장을 작성한다."],
  ["tm-032", "Leak detected 상황에서 사람/가스/압력/owner/permit 순서로 멈춘다."],
  ["tm-033", "Turbo pump trip에서 wafer risk, pump status, cooling, foreline, vibration evidence를 나눈다."],
  ["tm-034", "Chamber conditioning과 seasoning을 process owner/official procedure 영역과 연결해 설명한다."],
  ["tm-035", "Baseline wafer result를 단독 release 기준이 아니라 evidence pack 일부로 본다."],
  ["tm-036", "Service report에 쓰면 안 되는 고객 비공개/recipe/setpoint 정보를 구분한다."]
];

const pmSequence = [
  ["1. Pre-brief", "작업 범위, owner, permit, LOTO, gas/vacuum/thermal/motion boundary, required parts, expected downtime을 확인한다."],
  ["2. Before evidence", "alarm/log, baseline trace, chamber status, photo/visual note 승인 여부, current wafer/customer impact를 남긴다."],
  ["3. Safe state", "공식 절차에 따라 shutdown, purge/vent/pump state, temperature, stored energy, access permission을 확인한다."],
  ["4. Execute work", "부품/fastener/seal/connector/tubing 등 touched item을 기록한다. torque/clean handling은 공식 spec과 tool calibration을 따른다."],
  ["5. Reassembly check", "missing tool/part, connector seating, cable strain, line label, leak sign, cover/interlock state를 확인한다."],
  ["6. Bring-up evidence", "startup, interlock ready, pumpdown/pressure, cooling, motion dry check, alarm history, trace capture를 확인한다."],
  ["7. Basic verification", "승인된 recipe/version/permission, baseline wafer/metrology, wafer handling reliability, open deviation을 확인한다."],
  ["8. Handover", "completed work, touched item, evidence, open item, owner, ETA, risk, next update를 report/handover로 닫는다."]
];

const ceCases = [
  {
    id: "arrive-site",
    title: "I arrive at customer site",
    symptom: "첫날 고객 site에 도착했고 장비 반입/설치 briefing을 받아야 합니다.",
    choices: [
      ["먼저 장비 앞으로 가서 가능한 작업부터 시작한다.", false, "site rule, escort, permit, scope, owner 확인 전에 움직이면 신뢰를 잃습니다."],
      ["출입/escort, EHS orientation, 작업 scope, POC, permit, photo/data rule, emergency route를 먼저 확인한다.", true, "정답입니다. Tier 1 CE의 첫 생산성은 site rule alignment에서 시작합니다."],
      ["선임이 바쁘면 고객에게 직접 recipe와 acceptance limit을 물어본다.", false, "recipe/acceptance limit은 승인 문서와 owner 체계로 다뤄야 하며 임의 수집 대상이 아닙니다."]
    ],
    report: "I will align site rules, work scope, owner contacts, and safety boundaries before touching the tool."
  },
  {
    id: "chamber-wont-pump",
    title: "The chamber will not pump",
    symptom: "PM 후 load lock/chamber pumpdown이 느리거나 base pressure에 도달하지 않습니다.",
    choices: [
      ["rough pump를 바로 교체한다.", false, "부품 교체 전 curve, valve, seal, gauge, foreline, recent work evidence를 봐야 합니다."],
      ["wafer run으로 정상 여부를 확인한다.", false, "pressure boundary가 불확실하면 wafer risk를 만들 수 있습니다."],
      ["pumpdown curve, door/seal/O-ring, valve command/feedback, pump/foreline, gauge health, recent opened surface를 분리한다.", true, "정답입니다. pumpdown issue는 vacuum chain을 evidence로 좁혀야 합니다."]
    ],
    report: "Pumpdown is not meeting expected behavior. I am holding wafer movement and isolating seal, valve, pump, foreline, and gauge evidence."
  },
  {
    id: "robot-stops",
    title: "Robot stops during transfer",
    symptom: "EFEM 또는 TM robot이 wafer transfer 중 멈췄습니다.",
    choices: [
      ["같은 wafer로 여러 번 다시 시도한다.", false, "scrap/chamber damage risk가 커집니다."],
      ["wafer risk를 hold하고 slot map, carrier seating, end-effector, teach, sensor timing, slit/gate valve, event log를 확인한다.", true, "정답입니다. motion issue는 wafer risk와 evidence를 먼저 분리합니다."],
      ["robot fault로 단정하고 robot 교체를 요청한다.", false, "carrier/load port/sensor/timing/pressure boundary도 함께 봐야 합니다."]
    ],
    report: "Transfer is held to prevent wafer risk. I am collecting carrier, mapping, robot, sensor, valve, and event evidence."
  },
  {
    id: "mfc-alarm",
    title: "MFC alarm",
    symptom: "gas flow actual이 command를 따라가지 않거나 MFC alarm이 발생했습니다.",
    choices: [
      ["setpoint를 크게 올려 actual을 맞춘다.", false, "gas flow를 임의 변경하는 것은 process/safety boundary를 깹니다."],
      ["supply pressure, gas cabinet ready, valve state, restriction, MFC health, purge/exhaust/abatement, SDS boundary를 확인한다.", true, "정답입니다. gas는 source-to-abatement chain으로 봐야 합니다."],
      ["MFC만 교체하면 된다.", false, "supply와 restriction, valve, sensor, purge 상태를 배제해야 합니다."]
    ],
    report: "MFC actual mismatch is under review. I am not changing process conditions; I am checking supply, valve, MFC, purge, exhaust, and owner evidence."
  },
  {
    id: "turbo-trip",
    title: "Turbo pump trip",
    symptom: "pumpdown 또는 process 준비 중 turbo pump trip alarm이 발생했습니다.",
    choices: [
      ["alarm reset 후 바로 재시작한다.", false, "원인 없는 reset은 반복 trip과 damage risk를 키웁니다."],
      ["wafer/chamber risk를 hold하고 foreline, backing pump, cooling, vibration, controller alarm, recent PM을 확인한다.", true, "정답입니다. pump trip은 support system과 recent change를 함께 봅니다."],
      ["process engineer에게 recipe 문제라고 보고한다.", false, "먼저 hardware/support evidence를 닫아야 합니다."]
    ],
    report: "Turbo trip occurred. I am holding operation and checking backing/foreline, cooling, vibration, controller alarm, and recent maintenance evidence."
  },
  {
    id: "interlock-failed",
    title: "Interlock failed",
    symptom: "startup 중 interlock ready가 되지 않습니다.",
    choices: [
      ["interlock을 bypass해서 일정 지연을 막는다.", false, "절대 금지입니다. interlock bypass는 공식 권한/절차 밖이며 위험합니다."],
      ["cover, EMO/E-stop, exhaust, abatement, cooling, gas, vacuum, facility signal, I/O status를 확인하고 owner를 지정한다.", true, "정답입니다. interlock은 안전 장벽이며 bypass 대상이 아닙니다."],
      ["software glitch로 보고 reset만 반복한다.", false, "reset 전에 interlock chain evidence를 확보해야 합니다."]
    ],
    report: "Interlock is not ready. We are holding operation and checking safety chain evidence with the responsible owner."
  },
  {
    id: "temperature-unstable",
    title: "Temperature unstable",
    symptom: "RTP/EPI thermal trace가 흔들리거나 wafer result가 drift합니다.",
    choices: [
      ["temperature target을 임의 조정한다.", false, "process optimization은 Tier 1 범위가 아닙니다."],
      ["command vs actual, sensor/pyrometry, lamp/heater, cooling/PCW, chamber condition, comparison trace를 확인한다.", true, "정답입니다. sensor issue와 실제 thermal issue를 분리해야 합니다."],
      ["wafer result만 보고 chamber clean을 바로 실행한다.", false, "trace, facility, sensor, recent change를 먼저 봐야 합니다."]
    ],
    report: "Temperature behavior is unstable. I am comparing command/actual trace, sensor confidence, thermal source, cooling, chamber condition, and baseline data."
  },
  {
    id: "leak-detected",
    title: "Leak detected",
    symptom: "gas/vacuum line 또는 chamber 주변에서 leak 의심 evidence가 있습니다.",
    choices: [
      ["냄새/감각으로 위치를 찾아본다.", false, "가스 leak 의심 시 감각 확인은 위험합니다. detector/owner/procedure가 우선입니다."],
      ["작업을 멈추고 사람 안전, gas owner, detector status, purge/exhaust/abatement, permit, official leak-check procedure를 따른다.", true, "정답입니다. leak은 먼저 safety event로 봅니다."],
      ["line fitting을 조금 더 조여본다.", false, "공식 절차, energy/gas isolation, owner 승인 없이 조작하지 않습니다."]
    ],
    report: "Possible leak evidence is present. Work is held pending gas owner review, detector status, purge/exhaust readiness, and approved procedure."
  },
  {
    id: "pm-particle",
    title: "Particle increase after PM",
    symptom: "PM 이후 particle 또는 defect map이 악화되었습니다.",
    choices: [
      ["incoming wafer 문제라고 단정한다.", false, "PM 직후라면 touched item과 chamber/handling evidence를 먼저 봅니다."],
      ["PM touched items, seals, shield, chamber clean, handling path, gas/purge, baseline wafer, metrology trend를 비교한다.", true, "정답입니다. 변경점 기반 접근이 필요합니다."],
      ["다른 chamber도 모두 열어 확인한다.", false, "불필요한 chamber open은 새 risk를 만듭니다."]
    ],
    report: "Particle increase appeared after PM. I am comparing touched items, chamber surfaces, handling path, purge/gas evidence, and metrology trend before assigning cause."
  },
  {
    id: "customer-bypass",
    title: "Customer asks for a shortcut",
    symptom: "고객이 일정 때문에 interlock reset, recipe edit, gas enable, data export를 빠르게 해달라고 합니다.",
    choices: [
      ["고객 요청이므로 바로 수행한다.", false, "고객 요청도 official approval과 안전 경계를 넘어설 수 없습니다."],
      ["현재 권한으로 할 수 없는 이유, 필요한 승인, 지금 확인 가능한 안전한 대안, 다음 update 시간을 말한다.", true, "정답입니다. 정중하지만 단호한 hold communication이 Tier 1 핵심입니다."],
      ["아무 말 없이 선임에게 넘기고 빠진다.", false, "escalation은 필요하지만 현재 상태와 risk를 구조화해서 넘겨야 합니다."]
    ],
    report: "I cannot proceed without the approved safety and change-control path. I can collect safe evidence now and will escalate for the required authorization."
  }
];

const reportTemplates = [
  {
    id: "customer-brief",
    title: "Customer 1분 briefing",
    lines: ["Current confirmed fact:", "Impact to tool/wafer/schedule:", "Immediate safety status:", "Evidence captured:", "Next action and owner:", "Next update time:"]
  },
  {
    id: "escalation-note",
    title: "Senior escalation note",
    lines: ["Tool/module/time:", "Alarm or symptom:", "Recent change:", "Evidence already checked:", "Evidence missing:", "Risk if delayed:", "Decision needed:"]
  },
  {
    id: "pm-closeout",
    title: "PM closeout",
    lines: ["Work scope completed:", "Touched parts/surfaces:", "Parts replaced:", "Baseline evidence:", "Open items:", "Risk/watch item:", "Handover owner:"]
  },
  {
    id: "shift-handover",
    title: "Shift handover",
    lines: ["Status now:", "What changed:", "Open issue:", "Owner:", "ETA:", "Do not do:", "Next evidence to collect:"]
  },
  {
    id: "unsafe-request",
    title: "Unsafe request response",
    lines: ["I cannot proceed because:", "Required approval/evidence:", "Safe action I can do now:", "Escalation owner:", "Next update:"]
  }
];

function saveMastery() {
  writeJson(CE_MASTERY_KEY, masteryState);
  renderMasteryScore();
}

function renderMasteryScore() {
  const done = Object.values(masteryState).filter(Boolean).length;
  const total = ceMissions.length;
  const ratio = total ? done / total : 0;
  const index = Math.min(tier1Levels.length - 1, Math.floor(ratio * tier1Levels.length));
  const doneEl = document.querySelector("#mastery-done");
  const totalEl = document.querySelector("#mastery-total");
  const levelEl = document.querySelector("#mastery-level");
  const descEl = document.querySelector("#mastery-level-desc");
  if (!doneEl || !totalEl || !levelEl || !descEl) return;
  doneEl.textContent = done;
  totalEl.textContent = `${total}개 Tier 1 미션 중`;
  levelEl.textContent = tier1Levels[index][0];
  descEl.textContent = tier1Levels[index][1];
}

function renderMasteryTabs() {
  const root = document.querySelector("#mastery-tabs");
  if (!root) return;
  const tabs = [
    ["scope", "Tier 1 범위"],
    ["topics", "역량지도"],
    ["missions", "미션"],
    ["pm", "PM 흐름"],
    ["cases", "상황 시뮬레이터"],
    ["reports", "보고 템플릿"],
    ["flash", "플래시카드"]
  ];
  root.innerHTML = tabs.map(([id, label]) =>
    `<button class="mastery-tab ${activeMasteryTab === id ? "active" : ""}" data-mastery-tab="${id}">${label}</button>`
  ).join("");
  root.querySelectorAll("[data-mastery-tab]").forEach(button => {
    button.addEventListener("click", () => {
      activeMasteryTab = button.dataset.masteryTab;
      renderMastery();
    });
  });
}

function renderScopePanel() {
  return `
    <div class="mastery-grid">
      ${tier1Scope.map(item => `
        <article class="mastery-card">
          <span class="level-pill">BOUNDARY</span>
          <h2>${escapeHtml(item.title)}</h2>
          <p>${escapeHtml(item.body)}</p>
          <strong>왜 중요한가</strong>
          <p>${escapeHtml(item.why)}</p>
        </article>
      `).join("")}
      <article class="mastery-card">
        <span class="level-pill">PUBLIC BASIS</span>
        <h2>공개자료 기반으로만 재구성</h2>
        <p>Applied 공개 채용공고의 install, maintain, upgrade, digital analytics, basic diagnostic, PM/CM subsystem 표현과 SEMI/OSHA/NIOSH의 안전 축을 이용해 학습 흐름을 만들었습니다.</p>
        <p>실제 장비 manual, recipe, valve sequence, detector setpoint, interlock bypass, site-specific acceptance limit는 의도적으로 제외합니다.</p>
      </article>
    </div>
  `;
}

function renderTopicPanel() {
  return `
    <div class="mastery-grid">
      ${ceTopicCards.map(topic => `
        <article class="mastery-card">
          <span class="level-pill">${escapeHtml(topic.category)}</span>
          <h2>${escapeHtml(topic.title)}</h2>
          <p>${escapeHtml(topic.explanation)}</p>
          <strong>Why it matters</strong>
          <p>${escapeHtml(topic.why)}</p>
          <strong>Real field example</strong>
          <p>${escapeHtml(topic.field)}</p>
          <strong>Common mistakes</strong>
          <ul>${topic.mistakes.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
          <strong>Interview question</strong>
          <p>${escapeHtml(topic.interview)}</p>
          <strong>Troubleshooting example</strong>
          <p>${escapeHtml(topic.troubleshooting)}</p>
          <strong>Decision tree</strong>
          <p>${escapeHtml(topic.decision)}</p>
          <strong>Memory checkpoint</strong>
          <p>${escapeHtml(topic.checkpoint)}</p>
          <small>${escapeHtml(topic.source)}</small>
        </article>
      `).join("")}
    </div>
  `;
}

function renderMissionPanel() {
  return `<div class="mastery-grid">${ceMissions.map(([id, text]) => `
    <label class="mastery-check">
      <input type="checkbox" data-mastery-mission="${id}" ${masteryState[id] ? "checked" : ""} />
      <span>${escapeHtml(text)}</span>
    </label>
  `).join("")}</div>`;
}

function renderPmPanel() {
  return `
    <div class="mastery-grid">
      ${pmSequence.map(([title, body]) => `
        <article class="mastery-card">
          <span class="level-pill">PM</span>
          <h2>${escapeHtml(title)}</h2>
          <p>${escapeHtml(body)}</p>
        </article>
      `).join("")}
      <article class="mastery-card">
        <span class="level-pill">WEEKLY REVIEW</span>
        <h2>주간 복습 질문</h2>
        <ul>
          <li>이번 주 내가 놓친 evidence는 무엇인가?</li>
          <li>작업 전 safety boundary를 말로 설명했는가?</li>
          <li>PM 후 baseline evidence를 남겼는가?</li>
          <li>고객 보고에서 fact와 assumption을 분리했는가?</li>
          <li>다음 주 첫 30분 루틴에 넣을 약점은 무엇인가?</li>
        </ul>
      </article>
    </div>
  `;
}

function renderCasePanel() {
  return `
    <div class="case-grid">
      ${ceCases.map(item => `
        <article class="case-card">
          <span class="level-pill">${caseAttempts[item.id]?.good ? "PASS" : "DRILL"}</span>
          <h2>${escapeHtml(item.title)}</h2>
          <p>${escapeHtml(item.symptom)}</p>
          ${item.choices.map(([choice, good], index) => {
            const active = caseAttempts[item.id]?.choice === index;
            const resultClass = active ? (good ? "good" : "bad") : "";
            return `
            <button class="case-choice ${resultClass}" data-ce-case="${item.id}" data-ce-choice="${index}">
              ${escapeHtml(choice)}
            </button>
          `;
          }).join("")}
          <p class="case-feedback" id="case-feedback-${item.id}">${caseAttempts[item.id]?.feedback ? escapeHtml(caseAttempts[item.id].feedback) : "선택하면 즉시 CE 관점 피드백이 나옵니다."}</p>
          <strong>고객 보고 모델</strong>
          <p>${escapeHtml(item.report)}</p>
        </article>
      `).join("")}
    </div>
  `;
}

function renderReportPanel() {
  return `
    <div class="template-grid">
      ${reportTemplates.map(template => `
        <article class="template-block">
          <h2>${escapeHtml(template.title)}</h2>
          <ul>${template.lines.map(line => `<li>${escapeHtml(line)}</li>`).join("")}</ul>
          <label class="mastery-report-draft">
            내 문장 연습
            <textarea data-report-draft="${template.id}" rows="6" placeholder="오늘 상황을 이 템플릿으로 써보세요. 고객 비공개자료, recipe, setpoint, serial 전체는 넣지 마세요.">${escapeHtml(reportDrafts[template.id] || "")}</textarea>
          </label>
        </article>
      `).join("")}
    </div>
  `;
}

function renderFlashPanel() {
  const cards = ceTopicCards.flatMap(topic => topic.flashcards.map(card => [card, topic.title, topic.checkpoint]));
  return `
    <div class="mastery-grid">
      ${cards.map(([term, parent, checkpoint]) => `
        <article class="mastery-card">
          <span class="level-pill">FLASH</span>
          <h2>${escapeHtml(term)}</h2>
          <p>${escapeHtml(parent)}</p>
          <strong>Active recall</strong>
          <p>${escapeHtml(checkpoint)}</p>
        </article>
      `).join("")}
    </div>
  `;
}

function bindMasteryPanel() {
  document.querySelectorAll("[data-mastery-mission]").forEach(input => {
    input.addEventListener("change", () => {
      masteryState[input.dataset.masteryMission] = input.checked;
      saveMastery();
    });
  });

  document.querySelectorAll("[data-ce-case]").forEach(button => {
    button.addEventListener("click", () => {
      const caseId = button.dataset.ceCase;
      const choiceIndex = Number(button.dataset.ceChoice);
      const scenario = ceCases.find(item => item.id === caseId);
      if (!scenario) return;
      const [, good, feedback] = scenario.choices[choiceIndex];
      caseAttempts[caseId] = {
        choice: choiceIndex,
        good,
        feedback,
        answeredAt: new Date().toISOString()
      };
      writeJson(CE_CASE_ATTEMPTS_KEY, caseAttempts);
      renderMastery();
    });
  });

  document.querySelectorAll("[data-report-draft]").forEach(textarea => {
    textarea.addEventListener("input", () => {
      reportDrafts[textarea.dataset.reportDraft] = textarea.value;
      writeJson(CE_REPORT_DRAFTS_KEY, reportDrafts);
    });
  });
}

function renderMastery() {
  renderMasteryTabs();
  const panel = document.querySelector("#mastery-panel");
  if (!panel) return;
  const renderers = {
    scope: renderScopePanel,
    topics: renderTopicPanel,
    missions: renderMissionPanel,
    pm: renderPmPanel,
    cases: renderCasePanel,
    reports: renderReportPanel,
    flash: renderFlashPanel
  };
  panel.innerHTML = (renderers[activeMasteryTab] || renderScopePanel)();
  bindMasteryPanel();
  renderMasteryScore();
}

window.ProjectUniverseTier1Mastery = {
  topics: ceTopicCards,
  cases: ceCases,
  missions: ceMissions,
  getState: () => ({
    checked: { ...masteryState },
    attempts: { ...caseAttempts },
    reports: { ...reportDrafts }
  })
};

renderMastery();
