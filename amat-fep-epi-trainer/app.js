const roleFit = [
  "설치: hook-up, leveling, facilities, acceptance 흐름 이해",
  "RTP: 짧은 시간 고온 열처리, ramp, soak, spike, temperature uniformity",
  "Epitaxy: 결정성 박막 성장, in-situ doping, selective growth, defect control",
  "서브시스템: vacuum, gas, thermal, electrical, mechanical, safety interlock",
  "진단: 로그·트렌드·계측값으로 사실과 가설 분리",
  "고객 대응: downtime, next action, risk, ETA를 명확히 공유"
];

const learningCockpit = [
  {
    step: "01",
    mode: "Prime",
    title: "큰 그림 먼저",
    text: "FEP/EPI가 단일 장비명이 아니라 EPI/RTP 설치 업무 영역이라는 점을 잡고 시작합니다.",
    view: "equipment",
    action: "장비군 보기",
    principle: "worked example"
  },
  {
    step: "02",
    mode: "Build",
    title: "손으로 구조 만들기",
    text: "Centura/Vantage 개념과 LL, TM, PM/CM wafer path를 드래그로 구성합니다.",
    view: "cluster",
    action: "구성게임 열기",
    principle: "active retrieval"
  },
  {
    step: "03",
    mode: "Decide",
    title: "멈출 조건 판단",
    text: "pass evidence와 stop condition을 보며 install 현장 판단력을 훈련합니다.",
    view: "install",
    action: "설치 미션",
    principle: "transfer practice"
  },
  {
    step: "04",
    mode: "Recall",
    title: "안 보고 꺼내기",
    text: "퀴즈, readiness gate, mastery mission으로 기억을 다시 끌어냅니다.",
    view: "readiness",
    action: "현장투입 체크",
    principle: "spacing"
  }
];

const learningScienceCards = [
  ["Retrieval Practice", "다시 읽기보다 먼저 떠올리면 장기 기억이 강해집니다.", "정답 보기 전 PM/CM/LL 배치, Stop/Go 판단, 퀴즈를 먼저 누르게 설계했습니다."],
  ["Spacing", "짧은 학습을 시간 간격을 두고 반복하면 몰아치기보다 오래 남습니다.", "18분 루프를 오늘, 내일, 3일 뒤 다시 돌리도록 작은 카드 단위로 쪼갰습니다."],
  ["Interleaving", "비슷한 문제를 섞어 풀면 처음엔 어렵지만 전이와 장기 기억이 좋아집니다.", "장비 구조, facility, gas, safety, qualification을 한 루프 안에서 섞었습니다."],
  ["Worked Examples", "초보자는 완전한 예시를 먼저 보면 cognitive load가 줄어듭니다.", "install mission board가 선임의 사고 순서와 pass evidence를 먼저 보여줍니다."]
];

const curriculumAuditFindings = [
  ["학습 순서", "기존에는 장비, 공정, 설치, 진단 페이지가 풍부하지만 초보자가 어떤 순서로 열어야 하는지 약했습니다.", "새 커리큘럼 장을 첫 학습 진입점으로 두고 14개 핵심 챕터와 Think Tank 루프를 순서형으로 연결했습니다."],
  ["용어 장벽", "EFEM, load lock, abatement, seasoning, baseline wafer처럼 영어/현장 용어가 초보자를 막을 수 있습니다.", "각 챕터에 terms chip과 tooltip 대상 용어를 노출하고 glossary/시뮬레이터로 연결했습니다."],
  ["현장 사고 흐름", "설명은 많아도 '증상 -> evidence -> stop -> report'를 매 챕터에 반복하는 구조가 부족했습니다.", "모든 챕터를 같은 사고 프레임으로 통일했습니다."],
  ["시각화 연결", "process visual, cluster sim, runbook, DVM 훈련이 따로 있어 학습 흐름이 끊길 수 있었습니다.", "각 챕터의 practice 버튼이 관련 실습실로 이동하게 만들었습니다."],
  ["Think Tank 재사용", "경험 저장은 가능했지만 senior CE용 symptom/evidence/action/result/prevention/report 구조가 더 명확해야 했습니다.", "커리큘럼과 Think Tank 양식을 같은 evidence packet 언어로 맞춥니다."],
  ["안전 경계", "공개자료와 비공개 manual 수준 정보의 경계가 모든 학습 단계에 반복 노출될 필요가 있었습니다.", "각 챕터에 public boundary와 stop condition을 고정 항목으로 넣었습니다."]
];

const curriculumChapters = [
  {
    id: "fab-intro",
    level: "초보자",
    title: "Fab 입문",
    subtitle: "wafer가 제품이 되는 공장 흐름부터 잡기",
    minute: "Fab은 wafer가 FOUP에 담겨 장비 사이를 이동하며 수백 개 공정을 통과하는 생산 시스템입니다. CE는 장비만 보는 사람이 아니라 안전, 오염, uptime, 고객 communication을 함께 보는 사람입니다.",
    beginner: "처음에는 fab을 거대한 수술실처럼 생각하면 쉽습니다. 깨끗해야 하고, 순서가 중요하고, 잘못 만지면 다음 공정 전체가 영향을 받습니다.",
    location: "Cleanroom, sub-fab, FOUP, load port, host, customer control room.",
    wafer: "wafer는 FOUP에서 장비로 들어가고, 공정 후 metrology 결과로 pass/fail 또는 trend 변화를 확인합니다.",
    evidence: ["lot/wafer/chamber ID", "작업 전후 사진", "alarm/event log", "고객 hold/release 상태", "cleanroom protocol 준수 기록"],
    stop: "PPE, gowning, permit, escort, gas alarm, wafer break, unknown chemical exposure가 불명확하면 작업을 멈추고 site rule을 확인합니다.",
    report: "현재 확인된 범위는 tool 단독 문제가 아니라 fab flow와 lot 영향까지 연결될 수 있습니다. lot, wafer ID, 영향 범위, 다음 확인 owner를 분리해 보고드리겠습니다.",
    practiceView: "fab101",
    practice: "Fab 기초 카드 열기",
    terms: ["Fab", "FOUP", "Lot", "Cleanroom", "Sub-fab", "Host"],
    source: "Applied CE 채용공고, OSHA semiconductor hazard pages, SEMI safety standards list",
    quiz: { q: "Fab 입문 단계에서 CE가 가장 먼저 분리해야 하는 것은?", options: ["장비 이름과 색상", "확인된 사실, 고객 영향, 안전 조건", "선임 CE의 추정만 기록"], correct: 1, explain: "CE는 장비 증상만 보지 않고 safety, lot impact, customer owner를 함께 분리해야 합니다." }
  },
  {
    id: "applied-platforms",
    level: "초보자",
    title: "Applied 장비군과 platform",
    subtitle: "FEP/EPI/RTP가 단일 장비명이 아니라 업무 영역임을 이해",
    minute: "Applied의 EPI는 Centura 계열, RTP는 Vantage 계열처럼 platform 위에 chamber option이 붙는 구조로 이해하는 것이 안전합니다.",
    beginner: "자동차 플랫폼 위에 엔진과 옵션이 달라지는 것처럼, 같은 platform이라도 chamber와 gas panel, pre-clean option에 따라 현장 일이 달라집니다.",
    location: "Centura Prime/Xtera/Epi 200mm, Centura RP Epi, Vantage Radiance Plus/Vulcan/RadOx/Astra.",
    wafer: "EPI는 wafer 표면에 결정성 막을 성장시키고, RTP는 짧은 시간 열을 가해 dopant activation, oxidation, anneal 같은 변화를 만듭니다.",
    evidence: ["model/platform name", "chamber configuration", "wafer size", "process module count", "pre-clean/thermal/gas option"],
    stop: "공개 제품명만 보고 실제 고객 tool configuration을 단정하지 않습니다. 실제 option과 acceptance는 현장 문서와 선임 CE witness로 확인합니다.",
    report: "이 tool은 platform명과 chamber option을 분리해서 확인하겠습니다. 공개 제품군 설명은 큰 그림이고, 실제 site configuration은 customer/OEM 문서 기준으로 대조하겠습니다.",
    practiceView: "equipment",
    practice: "장비군 보기",
    terms: ["Platform", "Centura Platform", "Vantage Platform", "Process Module", "Option"],
    source: "Applied Centura Prime Epi, Xtera Epi, Centura Epi 200mm, Vantage RTP official pages",
    quiz: { q: "FEP/EPI/RTP 직무에서 장비명을 볼 때 가장 안전한 사고는?", options: ["FEP/EPI가 정확한 단일 장비명이라고 외운다", "platform, chamber, process, option으로 분리한다", "모든 Centura는 같은 gas를 쓴다고 본다"], correct: 1, explain: "장비명보다 platform/chamber/process/option을 분리해야 설치와 qualification 질문이 정확해집니다." }
  },
  {
    id: "centura-vantage",
    level: "초보자",
    title: "Centura/Vantage 구조",
    subtitle: "cluster tool과 factory interface의 큰 그림",
    minute: "Centura는 load lock, transfer chamber, process chamber가 붙는 cluster 구조로 이해하고, Vantage RTP는 factory interface와 thermal process chamber 구성으로 이해합니다.",
    beginner: "wafer가 대기압에서 바로 진공 공정으로 들어갈 수 없기 때문에 load lock이 중간 문 역할을 합니다. 중앙 transfer robot은 wafer를 각 chamber로 옮깁니다.",
    location: "EFEM/FI, load lock, transfer module, process module, cooldown/clean/pre-clean chamber.",
    wafer: "wafer는 FOUP -> EFEM -> load lock -> transfer module -> process chamber -> load lock -> FOUP 순서로 이동합니다.",
    evidence: ["layout drawing", "module map", "slot map", "robot teach record", "load lock pump/vent trace"],
    stop: "wafer scrape, slot mismatch, pressure mismatch, door/slit valve sensor mismatch가 있으면 dry run을 반복하기 전에 원인을 좁힙니다.",
    report: "현재 wafer path를 module 단위로 분리해 확인하고 있습니다. load lock pressure, robot handoff, chamber door/slit valve 상태를 evidence로 묶어 공유하겠습니다.",
    practiceView: "cluster",
    practice: "구성 시뮬레이션",
    terms: ["Cluster Tool", "EFEM", "Load Lock", "Transfer Module", "Process Module", "Slit Valve"],
    source: "Applied Centura platform blog, public cluster tool patents, Vantage architecture public release",
    quiz: { q: "Load lock이 필요한 가장 쉬운 이유는?", options: ["wafer 색상을 바꾸기 위해", "대기압 FOUP과 진공 transfer module 사이 압력 경계를 만들기 위해", "고객 보고서를 저장하기 위해"], correct: 1, explain: "Load lock은 대기압과 진공 영역 사이의 안전한 전환 공간입니다." }
  },
  {
    id: "wafer-path",
    level: "초보자",
    title: "EFEM/FI, Load Lock, TM, PM/CM, wafer path",
    subtitle: "모듈 이름과 실제 wafer 이동을 연결",
    minute: "장비 구조 용어는 위치와 기능으로 외워야 합니다. FI/EFEM은 앞쪽 대기압 이송부, load lock은 압력 경계, TM은 중앙 진공 이송부, PM은 실제 공정 chamber입니다.",
    beginner: "wafer가 어느 방을 지나갔는지 기록하면 defect나 transfer error의 원인 후보가 줄어듭니다.",
    location: "front end, load lock pair, central transfer chamber, chamber facets, process/cool/clean modules.",
    wafer: "path가 바뀌면 공정 결과와 particle source도 달라질 수 있어 baseline split이 중요합니다.",
    evidence: ["route history", "wafer map", "slot mapping", "handoff position", "robot I/O log"],
    stop: "같은 step에서 반복 scrape, wafer not present, double wafer, pressure not equalized가 보이면 진행을 멈춥니다.",
    report: "문제를 chamber fault로 단정하지 않고 wafer path split으로 분리하겠습니다. FI, load lock, TM, PM handoff evidence를 같은 wafer ID로 정리하겠습니다.",
    practiceView: "cluster",
    practice: "wafer path 게임",
    terms: ["FI", "EFEM", "LL", "TM", "PM", "CM", "Handoff", "Mapping"],
    source: "Public cluster tool architecture references and Applied platform materials",
    quiz: { q: "Defect가 특정 path에서만 증가할 때 좋은 첫 접근은?", options: ["모든 chamber를 동시에 열어본다", "path split으로 FI/LL/TM/PM 경로를 나눠 본다", "incoming wafer 문제로 확정한다"], correct: 1, explain: "path split은 원인 후보를 줄이는 안전한 evidence-first 방법입니다." }
  },
  {
    id: "epi-physics",
    level: "현장 투입",
    title: "EPI 공정 원리",
    subtitle: "gas가 wafer 표면에서 결정성 layer가 되는 흐름",
    minute: "Epitaxy는 substrate 결정 구조를 따라 Si, SiGe 같은 막이 성장하는 공정입니다. 표면 준비, precursor 공급, 온도, 압력, byproduct removal이 함께 맞아야 합니다.",
    beginner: "벽돌을 쌓듯 막이 올라가는 것이 아니라, wafer 표면의 결정 방향을 따라 원자가 정렬되어 자라는 그림입니다.",
    location: "EPI process chamber, gas box/panel, susceptor, exhaust, pre-clean chamber.",
    wafer: "native oxide 제거 후 silicon/germanium/dopant precursor가 표면 반응을 거쳐 layer thickness, Rs, defect 결과로 나타납니다.",
    evidence: ["temperature trace", "pressure trend", "MFC actual", "thickness/Rs/defect metrology", "pre-clean path and queue time"],
    stop: "toxic/pyrophoric/corrosive gas, exhaust abnormal, particle burst, wafer slip/break가 의심되면 recipe 반복보다 hold가 우선입니다.",
    report: "EPI 결과는 surface preparation, gas delivery, thermal/vacuum trend, metrology를 같은 wafer ID로 묶어 보겠습니다. recipe 조건은 process owner 승인 없이 변경하지 않겠습니다.",
    practiceView: "process-visual",
    practice: "EPI layer animation",
    terms: ["Epitaxy", "Precursor", "Dopant", "Native Oxide", "Susceptor", "Rs"],
    source: "Applied Epitaxy/Centura pages, Stanford AMAT Centura Epi public tool page, public epitaxy papers",
    quiz: { q: "EPI defect를 볼 때 wafer result와 같이 묶어야 하는 tool evidence는?", options: ["temperature/pressure/MFC/pre-clean path", "장비 외관 색상", "근무 교대 시간만"], correct: 0, explain: "EPI는 surface, gas, thermal, vacuum, metrology가 연결된 공정입니다." }
  },
  {
    id: "rtp-physics",
    level: "현장 투입",
    title: "RTP 공정 원리",
    subtitle: "짧은 시간 열이 wafer 물성을 바꾸는 방식",
    minute: "RTP는 wafer를 빠르게 가열/냉각해 anneal, dopant activation, oxidation, interface engineering 같은 변화를 만드는 공정입니다.",
    beginner: "오븐처럼 오래 굽는 것이 아니라, wafer에 필요한 만큼만 매우 정밀하게 열 예산을 주는 공정으로 생각하면 됩니다.",
    location: "RTP chamber, lamp zone, pyrometer/emissometer, wafer rotation, cooling, ambient gas control.",
    wafer: "thermal budget이 dopant activation, film densification, oxide/nitride formation, stress/slip risk에 영향을 줍니다.",
    evidence: ["temperature trace overlay", "lamp command", "pyrometer signal", "wafer rotation status", "metrology result"],
    stop: "temperature runaway, cooling abnormal, wafer slip/break, oxygen/hydrogen hazard, electrical hazard는 즉시 hold와 escalation 대상입니다.",
    report: "RTP trace 이상은 정상 trace와 overlay해 lamp command, measured temperature, ambient, wafer type, metrology를 분리해 확인하겠습니다.",
    practiceView: "process-visual",
    practice: "RTP ambient animation",
    terms: ["RTP", "Ramp", "Soak", "Spike", "Pyrometer", "Thermal Budget"],
    source: "Applied Vantage Radiance Plus, Vulcan, RadOx official/public pages",
    quiz: { q: "RTP trace overshoot에서 가장 위험한 대응은?", options: ["정상 trace와 overlay", "lamp command와 measured temperature 비교", "recipe target을 임의 변경해 alarm만 제거"], correct: 2, explain: "임의 recipe/control 변경은 root cause를 가리고 wafer risk를 키울 수 있습니다." }
  },
  {
    id: "gas-vacuum",
    level: "현장 투입",
    title: "Gas delivery / purge / pumpdown / exhaust / abatement",
    subtitle: "gas가 들어오고 나가고 안전하게 처리되는 전체 흐름",
    minute: "process gas는 supply에서 MFC/valve를 거쳐 chamber로 들어가고, 반응 후 byproduct는 pump/exhaust/abatement로 이동합니다. purge와 pumpdown은 안전과 repeatability의 기본입니다.",
    beginner: "가스는 넣는 것보다 안전하게 빼고 치환하고 처리하는 것이 더 중요할 때가 많습니다.",
    location: "gas cabinet, VMB/VMP, gas box, MFC, chamber, foreline, dry pump, scrubber/abatement.",
    wafer: "gas flow와 pressure가 불안정하면 thickness, composition, defect, selectivity, repeatability가 흔들립니다.",
    evidence: ["MFC setpoint vs actual", "supply pressure", "valve state", "pumpdown curve", "exhaust/abatement ready"],
    stop: "toxic/flammable/pyrophoric/corrosive gas, detector alarm, exhaust not ready, unknown purge completion은 진행 금지입니다.",
    report: "Gas 관련 이슈는 supply, gas box, chamber, exhaust/abatement를 분리해 확인하겠습니다. 안전 interlock이나 detector 조건은 우회하지 않습니다.",
    practiceView: "gases",
    practice: "가스 안전 매트릭스",
    terms: ["MFC", "Purge", "Pumpdown", "Exhaust", "Abatement", "Toxic", "Pyrophoric"],
    source: "OSHA semiconductor toxic exhaust gases, NIOSH pocket guides, SEMI S6/S18 public descriptions",
    quiz: { q: "First gas 전 ready가 불안정할 때 우선순위는?", options: ["ready가 순간적으로 들어오면 진행", "facility actual state와 tool ready input을 owner witness로 대조", "interlock 임시 우회"], correct: 1, explain: "gas safety에서는 실제 exhaust/abatement 상태와 승인된 owner witness가 우선입니다." }
  },
  {
    id: "facility-hookup",
    level: "현장 투입",
    title: "Facility hook-up",
    subtitle: "tool과 fab utility가 만나는 POC 이해",
    minute: "hook-up은 power, gas, CDA, PCW, exhaust, network, drain 같은 facility를 tool의 POC와 연결하는 단계입니다.",
    beginner: "장비가 아무리 좋아도 전기, 냉각, 배기, 가스가 맞지 않으면 안전하게 켤 수 없습니다.",
    location: "POC, hook-up drawing, P&ID, gas line, exhaust duct, PCW/CDA, power cabinet, network.",
    wafer: "facility instability는 pumpdown, temperature control, gas flow, robot timing, wafer defect로 간접적으로 보일 수 있습니다.",
    evidence: ["POC label", "drawing revision", "as-built/redline", "owner sign-off", "ready signal correlation"],
    stop: "drawing mismatch, unapproved line release, exhaust not ready, wrong gas label, energized panel uncertainty는 hold합니다.",
    report: "Facility hook-up은 drawing revision, POC label, actual state, owner sign-off를 대조해 진행하겠습니다. 불일치 항목은 punch list로 분리하겠습니다.",
    practiceView: "facility",
    practice: "facility 연결 지도",
    terms: ["POC", "Hook-up", "P&ID", "As-built", "Redline", "Line Release"],
    source: "SEMI safety standards, OSHA/NIOSH hazardous energy, public semiconductor facility safety practices",
    quiz: { q: "hook-up에서 drawing과 실제 line label이 다르면?", options: ["일정상 연결 후 나중에 수정", "hold하고 owner/witness와 drawing revision을 확인", "사진 없이 기억으로 보고"], correct: 1, explain: "facility mismatch는 안전과 품질 모두에 영향을 주므로 증거와 owner 확인이 필요합니다." }
  },
  {
    id: "electrical-dvm",
    level: "현장 투입",
    title: "Electrical / DVM 현장 기초",
    subtitle: "찍어보는 DVM이 아니라 가설 검증 도구로 쓰기",
    minute: "DVM/DMM은 voltage, resistance, continuity를 안전하게 확인해 sensor, relay, interlock, power supply 문제를 좁히는 evidence 도구입니다.",
    beginner: "측정 전에 반드시 expected value를 말해야 합니다. 값을 모르면 찍어도 해석할 수 없습니다.",
    location: "24V control circuit, relay coil/contact, PLC I/O, sensor, SMPS, interlock chain.",
    wafer: "전기/controls 이상은 valve delay, sensor mismatch, robot error, pump/thermal enable fail로 이어져 wafer handling과 process stability에 영향을 줍니다.",
    evidence: ["expected value", "meter mode", "lead location", "measured value", "energy state/LOTO boundary"],
    stop: "live panel, CAT rating 불일치, stored energy, arc flash risk, 승인 없는 energized work는 즉시 stop합니다.",
    report: "전기 확인은 expected value와 실제 측정값을 분리해 보고하겠습니다. 안전 경계가 불명확한 energized measurement는 진행하지 않겠습니다.",
    practiceView: "electrical",
    practice: "DVM 현장 기초",
    terms: ["DVM", "DMM", "Voltage", "Continuity", "Relay", "Coil", "Contact", "LOTO"],
    source: "NIOSH/OSHA hazardous energy control, public electrical measurement safety materials",
    quiz: { q: "DVM 측정 전 가장 먼저 말해야 할 것은?", options: ["측정 후 느낌", "expected value와 안전 경계", "고객에게 바로 root cause"], correct: 1, explain: "expected value, meter mode, lead 위치, energy state가 없으면 측정값은 evidence가 되기 어렵습니다." }
  },
  {
    id: "install-sequence",
    level: "현장 투입",
    title: "Install sequence",
    subtitle: "move-in부터 first baseline까지",
    minute: "install은 site readiness, rigging/move-in, set in place, hook-up, power-on, subsystem checks, dry run, first gas, baseline wafer, handover로 이어집니다.",
    beginner: "설치는 '장비를 놓는 일'이 아니라 risk를 하나씩 제거하며 증거를 쌓는 일입니다.",
    location: "cleanroom route, tool footprint, service clearance, utility POC, tool controller, chamber modules.",
    wafer: "install 후 첫 wafer는 장비가 정상 baseline으로 돌아왔는지 증명하는 test vehicle입니다.",
    evidence: ["damage report", "leveling", "utility sign-off", "interlock check", "dry run log", "first baseline wafer"],
    stop: "rigging route, floor load, tool damage, utility mismatch, interlock/facility not ready가 불명확하면 일정보다 hold가 우선입니다.",
    report: "Install은 완료 선언보다 pass evidence가 중요합니다. 각 단계별 risk retired evidence와 open item owner를 정리해 공유하겠습니다.",
    practiceView: "install",
    practice: "설치 미션",
    terms: ["Rigging", "Move-in", "Set in Place", "Commissioning", "Dry Run", "SAT"],
    source: "Applied CE role description, SEMI S19/S24 safety axes, public install/commissioning principles",
    quiz: { q: "install handover 전에 가장 중요한 것은?", options: ["사진 없이 구두 완료", "pass evidence와 open item owner", "일단 생산 lot 투입"], correct: 1, explain: "handover는 risk가 제거됐다는 증거와 남은 open item의 owner를 설명하는 단계입니다." }
  },
  {
    id: "qualification",
    level: "현장 투입",
    title: "Qualification / metrology / baseline wafer",
    subtitle: "pass를 수치와 trend로 증명",
    minute: "qualification은 tool이 site 조건에서 요구 성능을 만족하는지 baseline wafer, metrology, trend, alarm review로 증명하는 단계입니다.",
    beginner: "pass는 '문제가 없어 보인다'가 아니라, 기준이 있고 측정값이 있고 고객이 이해할 수 있는 evidence가 있다는 뜻입니다.",
    location: "baseline recipe, test wafer, metrology tool, FDC/trend viewer, customer acceptance packet.",
    wafer: "baseline wafer는 thickness, Rs, defect, particle, slip, uniformity 같은 결과로 tool health를 보여줍니다.",
    evidence: ["baseline wafer ID", "metrology map", "golden trace", "chamber matching", "alarm history", "owner sign-off"],
    stop: "spec out, repeated drift, chamber mismatch, metrology inconsistency, unresolved safety/facility open item이면 release를 분리합니다.",
    report: "Qualification 결과는 wafer metrology와 tool trace를 같은 시간축으로 묶어 설명하겠습니다. pass/fail뿐 아니라 남은 risk와 monitoring plan을 공유하겠습니다.",
    practiceView: "readiness",
    practice: "현장투입 체크",
    terms: ["Qualification", "Baseline Wafer", "Metrology", "Golden Trace", "Chamber Matching", "Release"],
    source: "Applied product pages on uniformity/repeatability, general SAT/OQ/PQ public principles",
    quiz: { q: "baseline wafer 결과만 있고 tool trace가 없으면 어떤 문제가 생기나?", options: ["원인 후보를 연결하기 어렵다", "항상 충분하다", "metrology가 불필요해진다"], correct: 0, explain: "wafer result와 tool trace가 함께 있어야 root cause와 handover 설명이 강해집니다." }
  },
  {
    id: "maintenance",
    level: "시니어 사고",
    title: "Maintenance / PM recovery / seasoning",
    subtitle: "PM 후 첫 wafer가 왜 중요할까",
    minute: "PM 후에는 chamber 상태, seal, connector, cleaning, seasoning, memory effect가 바뀔 수 있습니다. recovery는 작업 전 baseline으로 돌아왔는지 증명하는 과정입니다.",
    beginner: "정비가 끝났다는 말과 공정이 원래처럼 나온다는 말은 다릅니다. 첫 wafer와 trend가 그 차이를 보여줍니다.",
    location: "opened chamber, replaced part, seal/O-ring, gas line, wafer support, seasoning dummy/test wafer.",
    wafer: "PM 후 첫 wafer는 defect, thickness, Rs, particle, haze, slip 변화로 chamber recovery 상태를 보여줍니다.",
    evidence: ["PM change list", "before/after photo", "seasoning record", "baseline split", "metrology trend", "particle map"],
    stop: "particle burst, gas/exhaust abnormal, leak suspicion, repeated baseline fail, unknown replaced part condition은 customer wafer 전 hold합니다.",
    report: "PM recovery는 변경점과 baseline trend를 연결해 확인하겠습니다. seasoning 전후 결과와 defect map correlation을 evidence packet으로 만들겠습니다.",
    practiceView: "process-visual",
    practice: "PM recovery flow",
    terms: ["PM", "Seasoning", "Memory Effect", "Dummy Wafer", "Particle", "O-ring"],
    source: "Applied EPI pre-clean/integrated platform context, public maintenance/evidence principles",
    quiz: { q: "PM 직후 문제에서 가장 먼저 보는 축은?", options: ["PM 변경점과 baseline 차이", "무작위 부품 교체", "recipe 임의 변경"], correct: 0, explain: "PM 이후에는 변경점 기반 사고가 가장 강합니다." }
  },
  {
    id: "failure-mode",
    level: "시니어 사고",
    title: "Failure mode troubleshooting",
    subtitle: "증상에서 evidence까지 사고하기",
    minute: "troubleshooting은 빠른 추정이 아니라 scope, safety, change point, log, trend, wafer evidence를 순서대로 좁히는 작업입니다.",
    beginner: "좋은 CE는 답을 빨리 말하는 사람이 아니라, 틀릴 수 있는 추정을 안전하게 제거하는 사람입니다.",
    location: "alarm history, trend viewer, I/O log, metrology, wafer path, facility owner interface.",
    wafer: "tool fault는 wafer map, path split, chamber matching, baseline drift로 나타날 수 있습니다.",
    evidence: ["symptom scope", "candidate causes", "evidence ladder", "stop condition", "customer report", "next action owner"],
    stop: "안전 interlock, gas, exhaust, live power, wafer break, unknown customer impact가 포함되면 escalation과 hold를 먼저 판단합니다.",
    report: "현재 확인된 사실과 추정 원인을 분리해 보고드립니다. 다음 확인은 evidence 우선순위에 따라 진행하고, 안전 관련 조건은 우회하지 않겠습니다.",
    practiceView: "diagnostics",
    practice: "시니어 케이스 보드",
    terms: ["Evidence Ladder", "Stop Condition", "Root Cause", "Escalation", "FDC", "Wafer Map"],
    source: "Applied CE role troubleshooting language, OSHA/NIOSH safety controls, public equipment diagnostic principles",
    quiz: { q: "troubleshooting에서 고객에게 가장 신뢰를 주는 말은?", options: ["아마 이겁니다", "확인된 사실, 영향 범위, 다음 evidence와 ETA를 분리해 말한다", "우회해서 진행하겠습니다"], correct: 1, explain: "고객 communication은 사실/추정/action/ETA를 분리할 때 신뢰가 생깁니다." }
  },
  {
    id: "handover",
    level: "시니어 사고",
    title: "Customer communication / handover",
    subtitle: "고객이 믿을 수 있게 설명하기",
    minute: "handover는 checklist를 넘기는 일이 아니라 tool risk가 어떤 evidence로 제거되었는지 고객이 이해하도록 설명하는 과정입니다.",
    beginner: "고객은 '했다'보다 '무엇으로 확인했는가'를 원합니다.",
    location: "handover meeting, SAT packet, open item list, customer owner sign-off, shift handover note.",
    wafer: "wafer 결과는 handover의 핵심 증거지만, facility/safety/automation open item과 함께 설명해야 합니다.",
    evidence: ["risk retired list", "pass data", "open item owner", "monitoring plan", "rollback/escalation path"],
    stop: "unresolved safety/facility/process risk가 있는데 release 압박이 있으면 sign-off 범위를 명확히 분리하고 escalation합니다.",
    report: "현재 handover packet은 safety, facility, automation, process, metrology 순서로 정리했습니다. 각 항목의 pass 근거와 남은 open item, owner, next action을 설명드리겠습니다.",
    practiceView: "runbook",
    practice: "handover runbook",
    terms: ["Handover", "Open Item", "Owner", "RACI", "Punch List", "Sign-off"],
    source: "SEMI multi-employer work area/training safety axes, public project handover principles",
    quiz: { q: "handover에서 open item은 어떻게 말해야 하나?", options: ["숨긴다", "impact, owner, next action, due date로 분리한다", "모두 CE 책임으로만 둔다"], correct: 1, explain: "open item은 owner와 impact를 분리해야 재작업과 오해를 줄입니다." }
  },
  {
    id: "thinktank-loop",
    level: "시니어 사고",
    title: "Think Tank 경험 축적",
    subtitle: "현장 경험을 AI가 읽을 수 있는 packet으로 저장",
    minute: "경험은 그냥 일기가 아니라 symptom, evidence, suspected cause, action, result, prevention, customer report 구조로 쌓아야 나중에 AI와 본인이 재사용할 수 있습니다.",
    beginner: "기억은 흐려지지만 구조화된 기록은 남습니다. 매 현장 경험을 한 장의 evidence packet으로 바꾸세요.",
    location: "Think Tank 기록장, D1 DB, local D drive mirror, AI summary packet.",
    wafer: "wafer issue 경험은 wafer ID, path, metrology, tool trace와 함께 저장할수록 다음 troubleshooting이 빨라집니다.",
    evidence: ["symptom", "evidence", "suspected cause", "action", "result", "prevention", "customer report"],
    stop: "민감한 고객 정보, recipe, password, site-specific setpoint, bypass 방법은 기록하지 않거나 비공개 승인 문서에만 둡니다.",
    report: "이번 경험은 symptom/evidence/action/result/prevention/customer report 구조로 저장해 재발 시 바로 AI summary packet으로 꺼낼 수 있게 하겠습니다.",
    practiceView: "thinktank",
    practice: "경험 기록하기",
    terms: ["Evidence Pack", "AI Packet", "Prevention", "Customer Report", "D1"],
    source: "Existing D1-backed Think Tank structure and public-safe documentation boundary",
    quiz: { q: "Think Tank에 넣지 말아야 하는 것은?", options: ["증상과 evidence", "재발 방지 아이디어", "고객 recipe, setpoint, bypass 방법"], correct: 2, explain: "개인 학습 기록도 공개/보안 경계를 지켜야 장기적으로 안전합니다." }
  }
];

const curriculumPublicSourceLinks = [
  { label: "Applied Centura Prime Epi", url: "https://www.appliedmaterials.com/us/en/product-library/centura-prime-epi.html" },
  { label: "Applied Centura Xtera Epi", url: "https://www.appliedmaterials.com/us/en/product-library/centura-xtera-epi.html" },
  { label: "Applied Epitaxy", url: "https://www.appliedmaterials.com/us/en/semiconductor/products/processes/epitaxy.html" },
  { label: "Applied Vantage Vulcan RTP", url: "https://www.appliedmaterials.com/us/en/product-library/vantage-vulcan-rtp.html" },
  { label: "Applied Vantage Radiance Plus RTP", url: "https://www.appliedmaterials.com/us/en/product-library/vantage-radiance-plus-rtp.html" },
  { label: "Applied RTP", url: "https://www.appliedmaterials.com/us/en/semiconductor/products/processes/rapid-thermal-processing-treatments.html" },
  { label: "OSHA Semiconductor Fabrication Hazards", url: "https://www.osha.gov/semiconductors/silicon/device-fabrication" },
  { label: "NIOSH Hazardous Energy Control", url: "https://www.cdc.gov/niosh/manufacturing/hazardous-energy-control/index.html" },
  { label: "SEMI Safety Standards", url: "https://www.semi.org/en/products-services/standards/safety" },
  { label: "Public Cluster Tool Patent", url: "https://patents.google.com/patent/US20070196011A1/en" }
];

const fepBigBangPillars = [
  {
    id: "structure",
    label: "구조",
    title: "장비를 방 단위로 본다",
    text: "FOUP, EFEM/FI, Load Lock, TM, PM/CM, gas box, pump, exhaust, abatement를 하나의 압력/오염/안전 경계로 연결합니다.",
    action: "구성게임",
    view: "cluster",
    evidence: "module map, wafer path, door/slit valve, pumpdown curve"
  },
  {
    id: "process",
    label: "공정",
    title: "wafer 위 변화를 말한다",
    text: "EPI는 결정성 막 성장, RTP는 열 이력으로 물성 변화입니다. gas/pump/purge/exhaust를 wafer effect와 같은 시간축에 둡니다.",
    action: "공정 시각화",
    view: "process-visual",
    evidence: "temperature trace, MFC actual, pressure, metrology map"
  },
  {
    id: "install",
    label: "설치",
    title: "pass evidence로 handover한다",
    text: "move-in부터 qualification까지는 일정표가 아니라 risk를 제거하는 gate입니다. 각 gate마다 owner, evidence, stop condition이 있어야 합니다.",
    action: "설치 런북",
    view: "runbook",
    evidence: "owner sign-off, utility label, interlock check, baseline wafer"
  },
  {
    id: "judgement",
    label: "판단",
    title: "증상에서 보고 문장까지",
    text: "증상 -> 위험도 -> subsystem -> evidence -> 멈출 조건 -> 고객 보고 -> 재발 방지 순서로 같은 프레임을 반복합니다.",
    action: "진단 훈련",
    view: "diagnostics",
    evidence: "alarm, trend, witness, wafer map, action/result/prevention"
  }
];

const fepProcessTwinSteps = [
  {
    id: "epi-interface",
    mode: "EPI",
    title: "계면 준비: native oxide와 contamination을 줄이는 단계",
    publicTag: "공개자료로 확인됨",
    source: "Applied Centura Prime Epi는 vacuum break 없는 integrated pre-clean이 계면 오염과 queue time을 줄이는 방향이라고 설명합니다.",
    area: "Pre-clean / vacuum transfer",
    wafer: "wafer 표면은 막을 쌓기 전 성장 가능한 깨끗한 결정 표면으로 준비됩니다.",
    gasState: "H2 또는 option별 pre-clean chemistry, purge, pumpdown, exhaust readiness를 개념적으로 봅니다.",
    ceEvidence: ["pre-clean path", "queue time", "pumpdown curve", "detector/exhaust ready", "baseline wafer split"],
    stop: "pre-clean chamber alarm, exhaust abnormal, unknown gas release, wafer break/particle burst가 있으면 hold.",
    report: "Pre-clean 포함 path에서 interface risk를 분리해 확인하겠습니다. queue time, vacuum transfer, baseline wafer split을 evidence로 묶겠습니다.",
    layers: [
      ["Si substrate", "결정 기판", "#667685"],
      ["native oxide", "제거/관리 대상", "#cbdde6"],
      ["clean interface", "성장 준비 표면", "#70f0c0"]
    ]
  },
  {
    id: "epi-growth",
    mode: "EPI",
    title: "성장: precursor가 표면에서 결정성 layer가 되는 단계",
    publicTag: "공개자료 기반 합리적 추론",
    source: "OSHA는 CVD/EPI에서 silicon source gas와 dopant gas가 wafer 표면 반응으로 layer를 형성한다고 설명합니다.",
    area: "EPI Process Module / gas delivery",
    wafer: "Si 또는 SiGe 계열 layer가 substrate 결정 구조를 따라 성장하고, dopant가 전기 특성에 영향을 줄 수 있습니다.",
    gasState: "SiH4/DCS/TCS, GeH4, PH3/B2H6/AsH3 후보는 공개 문헌상 gas family입니다. 실제 사용 여부는 tool option과 승인 문서 기준입니다.",
    ceEvidence: ["MFC setpoint vs actual", "pressure response", "temperature trace", "thickness/Rs/defect map", "chamber history"],
    stop: "toxic hydride, pyrophoric precursor, corrosive gas, abatement abnormal, unexplained drift는 임의 반복 전 hold.",
    report: "EPI drift는 gas delivery, thermal stability, chamber condition, metrology를 같은 wafer ID로 대조해 보고하겠습니다.",
    layers: [
      ["Si substrate", "기판", "#667685"],
      ["Si seed", "첫 결정성 성장층", "#5ee7ff"],
      ["SiGe / doped epi", "strain 또는 전기특성 layer", "#b98cff"],
      ["cap / contact layer", "저항 최적화 후보층", "#00ff95"]
    ]
  },
  {
    id: "rtp-thermal",
    mode: "RTP",
    title: "열 이력: ramp, soak, spike로 물성을 바꾸는 단계",
    publicTag: "공개자료로 확인됨",
    source: "Applied RTP 페이지는 soak, spike, millisecond anneal과 thermal budget reduction을 공개적으로 설명합니다.",
    area: "RTP chamber / lamp zone / pyrometry",
    wafer: "두꺼운 막을 쌓기보다 기존 film/dopant/interface의 전기적·물리적 성질이 온도-시간 이력으로 바뀝니다.",
    gasState: "N2/Ar purge, O2/O3/N2O/NH3/H2 같은 ambient 후보는 option별로 달라집니다. 실제 recipe ambient는 공식 문서 기준입니다.",
    ceEvidence: ["temperature trace overlay", "lamp command", "pyrometer signal", "wafer rotation", "metrology trend"],
    stop: "temperature runaway, wafer slip/break, oxidizer/fuel gas boundary 불명확, unauthorized energized work는 즉시 stop.",
    report: "RTP 이상은 정상 trace와 overlay해 command, measured temperature, ambient readiness, metrology 결과를 분리해 설명하겠습니다.",
    layers: [
      ["Si substrate", "기판", "#667685"],
      ["implanted/existing film", "열처리 대상", "#ffcf7a"],
      ["activated / modified layer", "물성 변화 결과", "#00ff95"],
      ["thin oxide/interface", "option별 계면막", "#d8f6ff"]
    ]
  },
  {
    id: "exit-metrology",
    mode: "Qualification",
    title: "증명: purge, unload, baseline wafer, metrology로 pass를 설명",
    publicTag: "공식 교육/현장 승인 문서 필요",
    source: "공개자료는 qualification의 일반 사고 프레임까지만 설명할 수 있고, site acceptance limit은 고객/공식 문서 영역입니다.",
    area: "Unload / metrology / customer handover",
    wafer: "결과는 thickness, Rs, defect, particle, slip, thermal trace, chamber matching으로 나타납니다.",
    gasState: "purge complete, residual exhaust, abatement trend, post-run alarm history를 묶어 봅니다.",
    ceEvidence: ["baseline wafer ID", "metrology map", "golden trace", "alarm history", "open punch owner"],
    stop: "spec out 반복, acceptance 기준 불명확, safety/facility open item unresolved이면 release를 단정하지 않습니다.",
    report: "Pass/fail은 승인 기준과 evidence packet으로 분리해 보고하겠습니다. 공개 학습 웹에는 site-specific limit을 넣지 않겠습니다.",
    layers: [
      ["Si substrate", "기판", "#667685"],
      ["processed layer", "공정 결과층", "#00ff95"],
      ["metrology map", "두께/Rs/defect evidence", "#5ee7ff"],
      ["handover packet", "보고/재발방지", "#f09a57"]
    ]
  }
];

const fepInstallGates = [
  {
    id: "day0-readiness",
    title: "Day 0: site readiness",
    owner: "Customer tool owner / facility / EHS / senior CE",
    evidence: ["approved install window", "drawing revision", "route/floor/service clearance", "utility POC list"],
    stop: "route, floor load, EHS permit, line identity가 불명확하면 move-in 금지.",
    report: "Day 0 readiness는 route, utility, EHS, owner sign-off 기준으로 open item을 분리해 공유하겠습니다."
  },
  {
    id: "move-in",
    title: "Move-in / rigging / set in place",
    owner: "Rigging owner / CE / customer escort",
    evidence: ["crate/shock/tilt photo", "move path witness", "tool damage check", "leveling/position evidence"],
    stop: "damage, collision risk, route deviation, clean protocol 불일치가 있으면 hold.",
    report: "Move-in evidence와 damage/punch list를 먼저 고정한 뒤 다음 boundary로 넘기겠습니다."
  },
  {
    id: "facility-hookup",
    title: "Facility hook-up",
    owner: "Facility owner / gas owner / electrical owner",
    evidence: ["POC label", "as-built/redline", "power/ground", "CDA/N2/PCW/exhaust/abatement ready"],
    stop: "line label, flow direction, exhaust/abatement actual state, LOTO boundary가 불명확하면 energization 금지.",
    report: "Hook-up은 POC identity, owner witness, readiness evidence 순서로 진행하며 mismatch는 punch list로 격리하겠습니다."
  },
  {
    id: "power-on",
    title: "Power-on / interlock check",
    owner: "CE / controls owner / senior witness",
    evidence: ["EMO/E-stop", "door/interlock matrix", "PLC I/O state", "authorized electrical scope"],
    stop: "승인 없는 energized work, interlock bypass, stored energy 불명확, CAT rating 불일치.",
    report: "전원 투입 전 안전 chain과 승인 범위를 먼저 확인하겠습니다. interlock은 우회하지 않고 원인을 좁히겠습니다."
  },
  {
    id: "vacuum-gas",
    title: "Pumpdown / first gas readiness",
    owner: "CE / gas owner / EHS / abatement owner",
    evidence: ["pumpdown curve", "leak check record", "MFC response", "detector/exhaust/abatement ready"],
    stop: "toxic/flammable/corrosive gas identity, purge, detector, abatement가 불명확하면 first gas 금지.",
    report: "First gas는 process result보다 safety envelope가 우선입니다. gas/EHS/abatement evidence가 완성될 때까지 hold하겠습니다."
  },
  {
    id: "dry-run",
    title: "Dry run / wafer path",
    owner: "CE / automation owner / customer tool owner",
    evidence: ["slot map", "robot teach", "LL pump/vent", "transfer retry 0", "alarm history"],
    stop: "wafer scrape, double wafer, mapping mismatch, pressure mismatch, repeated retry.",
    report: "Dry run은 생산성이 아니라 wafer path와 boundary evidence를 확인하는 단계로 진행하겠습니다."
  },
  {
    id: "baseline",
    title: "Baseline wafer / metrology",
    owner: "Process owner / metrology / CE",
    evidence: ["baseline wafer ID", "golden trace", "metrology map", "chamber matching", "alarm-free run"],
    stop: "metrology inconsistency, chamber drift, unresolved safety/facility punch, acceptance 기준 불명확.",
    report: "Baseline 결과는 tool trace와 metrology를 같은 wafer ID로 묶어 pass 근거와 남은 risk를 분리해 설명하겠습니다."
  },
  {
    id: "handover",
    title: "Customer handover",
    owner: "Customer owner / CE / senior CE",
    evidence: ["closed checklist", "open punch owner", "next monitoring plan", "customer report packet"],
    stop: "root cause/pass/fail을 evidence 없이 단정하거나 site-specific 기준을 구두로 대체하지 않습니다.",
    report: "Handover는 완료 선언이 아니라 risk retired evidence, open item, owner, next update가 포함된 packet으로 진행하겠습니다."
  }
];

const fepGasHazardMatrix = [
  { group: "silicon", name: "SiH4 / DCS / TCS / SiCl4", role: "Si source 후보", hazards: ["pyrophoric/flammable", "corrosive byproduct", "moisture reactive"], evidence: "gas matrix, SDS, MFC trend, purge, exhaust/abatement", boundary: "실제 사용 gas와 농도/flow/sequence는 tool option과 승인 문서 기준" },
  { group: "dopant", name: "PH3 / AsH3 / B2H6", role: "dopant 후보", hazards: ["highly toxic", "flammable", "hydride risk"], evidence: "gas cabinet, detector health, purge release, abatement ready, EHS witness", boundary: "detector setpoint, valve sequence, purge cycle은 공개 웹에 넣지 않음" },
  { group: "carrier", name: "H2 / N2 / Ar / He", role: "carrier/purge/support", hazards: ["flammable(H2)", "asphyxiation", "pressure energy"], evidence: "line label, regulator, purge complete, ventilation/exhaust, pressure trend", boundary: "불활성 gas도 산소결핍/압력 에너지 위험이 있음" },
  { group: "reactive", name: "HCl / NH3 / O2 / O3 / N2O / NO", role: "etch/selectivity/oxidation/nitridation 후보", hazards: ["toxic/corrosive", "oxidizer", "respiratory irritant"], evidence: "material compatibility, scrubber ready, detector/analyzer, gas segregation", boundary: "RTP/EPI option별 실제 ambient는 공식 문서와 process owner 기준" },
  { group: "exhaust", name: "Pump / foreline / exhaust / abatement", role: "byproduct removal and treatment", hazards: ["corrosion", "condensation", "flammable/toxic byproduct", "pressure drop"], evidence: "ready signal plus actual state, owner witness, alarm trend, maintenance lock boundary", boundary: "ready input만 믿지 말고 실제 facility state와 대조" }
];

const fepFailureCases = [
  {
    id: "epi-defect-after-preclean",
    subsystem: "EPI interface",
    title: "Pre-clean 이후 첫 EPI baseline defect 증가",
    symptom: "Pumpdown과 transfer는 pass인데 pre-clean 포함 path의 baseline wafer defect map이 edge-heavy로 증가한다.",
    risk: "계면 오염, particle burst, chamber open 이후 상태 미확인. 생산 wafer 투입 전 scope 분리가 필요.",
    evidence: ["pre-clean only / EPI only / combined path split", "defect map vs PM work area", "queue time", "backside/contact inspection"],
    wrongAction: "같은 recipe를 많이 돌려 평균이 좋아지는지 본다.",
    stop: "particle burst, wafer break, toxic/corrosive gas abnormal, exhaust abnormal이면 hold.",
    report: "Defect 증가는 pre-clean 포함 path에서 집중됩니다. path split baseline과 PM 변경점, wafer map correlation을 확인하겠습니다.",
    prevention: "PM 후 baseline split template, chamber open history, pre-clean transfer delay 기록을 Think Tank packet으로 저장.",
    choices: [
      { label: "pre-clean only/EPI only/combined path로 baseline split을 설계한다.", correct: true, why: "경로를 쪼개야 interface, transfer, chamber 원인 후보가 줄어듭니다." },
      { label: "incoming wafer 문제로 단정하고 tool 확인을 멈춘다.", correct: false, why: "path-dependent defect이면 tool path evidence를 먼저 봐야 합니다." },
      { label: "고객 lot으로 결과를 빨리 확인한다.", correct: false, why: "baseline evidence와 safety envelope가 먼저입니다." }
    ]
  },
  {
    id: "mfc-actual-mismatch",
    subsystem: "Gas delivery",
    title: "EPI gas MFC actual이 setpoint를 따라가지 못함",
    symptom: "특정 line에서만 flow actual이 늦고 최근 cylinder/line work 이력이 있다.",
    risk: "toxic/flammable/corrosive gas일 수 있어 임의 조작 금지. gas owner와 EHS boundary가 필요.",
    evidence: ["gas identity and SDS", "supply pressure", "regulator/MFC trend", "purge/release record", "abatement ready"],
    wrongAction: "setpoint를 크게 올려 반응을 본다.",
    stop: "gas identity, purge, detector, exhaust/abatement가 불명확하면 line state 조작 금지.",
    report: "MFC mismatch는 gas supply, regulator, valve, purge, MFC health를 owner witness 안에서 분리하겠습니다.",
    prevention: "cylinder change 후 trend capture와 gas owner sign-off를 qualification packet에 포함.",
    choices: [
      { label: "gas owner/EHS witness로 supply-pressure-MFC trend를 확인한다.", correct: true, why: "gas 안전 경계와 계측 evidence를 함께 지킵니다." },
      { label: "MFC setpoint를 키워 line이 뚫리는지 본다.", correct: false, why: "위험 gas에서 임의 조작은 금지입니다." },
      { label: "software alarm만 지우고 dry run으로 넘어간다.", correct: false, why: "root cause와 safety readiness를 가립니다." }
    ]
  },
  {
    id: "rtp-overshoot",
    subsystem: "RTP thermal",
    title: "RTP trace overshoot와 wafer-to-wafer 편차 증가",
    symptom: "Lamp command가 평소보다 높고 measured temperature가 target 위로 흔들린다.",
    risk: "thermal budget 초과, wafer slip/break, dopant/profile shift 가능성.",
    evidence: ["golden trace overlay", "lamp zone command", "pyrometer/window", "wafer rotation", "cooling/exhaust trend"],
    wrongAction: "recipe target을 낮춰 alarm만 제거한다.",
    stop: "temperature runaway, wafer damage, unauthorized control change는 hold 및 escalation.",
    report: "RTP overshoot는 command와 measured temperature overlay, pyrometry, rotation, cooling evidence로 분리하겠습니다.",
    prevention: "정상 trace library와 chamber별 thermal health summary를 유지.",
    choices: [
      { label: "정상 trace와 command/measured temperature를 overlay한다.", correct: true, why: "RTP는 trace 자체가 핵심 evidence입니다." },
      { label: "target만 임의 조정해 pass처럼 보이게 한다.", correct: false, why: "recipe/control 임의 변경은 비공개 승인 영역이며 위험합니다." },
      { label: "공정팀 문제로 넘기고 tool trace는 보지 않는다.", correct: false, why: "tool thermal evidence를 먼저 분리해야 합니다." }
    ]
  },
  {
    id: "abatement-ready-fail",
    subsystem: "Exhaust / abatement",
    title: "First gas 전 abatement ready가 간헐 fail",
    symptom: "tool input은 간헐적으로 ready를 잃고 facility contractor 작업 직후다.",
    risk: "toxic/flammable/corrosive byproduct 처리 경계 불명확. first gas 금지.",
    evidence: ["actual exhaust flow", "abatement local status", "ready contact mapping", "alarm history", "owner witness"],
    wrongAction: "interlock을 임시 우회하고 gas readiness를 진행한다.",
    stop: "ready input과 actual facility state가 대조되지 않으면 first gas hold.",
    report: "Abatement ready가 불안정하므로 gas introduction은 hold하고 facility actual state와 tool input을 owner witness로 대조하겠습니다.",
    prevention: "facility work 이후 ready-signal regression check를 install gate에 추가.",
    choices: [
      { label: "facility owner와 actual state/readiness signal을 대조한다.", correct: true, why: "ready input만이 아니라 실제 처리 상태가 중요합니다." },
      { label: "ready가 들어온 순간만 골라 gas를 연다.", correct: false, why: "간헐 fail은 safety envelope가 안정되지 않았다는 신호입니다." },
      { label: "interlock을 우회해 원인을 좁힌다.", correct: false, why: "interlock bypass는 금지 경계입니다." }
    ]
  },
  {
    id: "loadlock-pressure-mismatch",
    subsystem: "Wafer path / vacuum",
    title: "Load Lock pressure mismatch와 transfer retry",
    symptom: "LL vent/pump 후 slit valve 조건이 늦고 같은 boundary에서 transfer retry가 반복된다.",
    risk: "wafer scrape, pressure equalization 실패, robot/door/sensor mismatch.",
    evidence: ["LL pump/vent curve", "door/slit valve I/O", "robot handoff log", "pressure equalization", "slot map"],
    wrongAction: "robot speed를 올려 cycle time을 맞춘다.",
    stop: "pressure not equalized, wafer present mismatch, repeated retry, scrape mark가 있으면 dry run hold.",
    report: "LL boundary에서 pressure/I/O/robot evidence를 같은 wafer path로 묶어 mismatch 원인을 좁히겠습니다.",
    prevention: "wafer path dry-run checklist에 LL pressure curve와 I/O timing overlay 추가.",
    choices: [
      { label: "LL pressure curve와 slit/door I/O, robot handoff를 같은 시간축으로 본다.", correct: true, why: "boundary 문제가 transfer 문제처럼 보일 수 있습니다." },
      { label: "retry가 간헐이면 production wafer로 평균을 본다.", correct: false, why: "wafer damage risk가 있어 hold가 먼저입니다." },
      { label: "sensor 하나만 교체하고 path split은 하지 않는다.", correct: false, why: "물리 동작과 I/O timing을 함께 봐야 합니다." }
    ]
  },
  {
    id: "baseline-metrology-conflict",
    subsystem: "Qualification",
    title: "Baseline wafer는 pass처럼 보이지만 metrology repeatability가 흔들림",
    symptom: "tool trace는 안정이나 metrology map repeat가 불안정해 pass 설명이 어려운 상태.",
    risk: "tool 문제와 measurement 문제를 분리하지 못하면 잘못된 release 또는 과잉 조치 가능.",
    evidence: ["same wafer repeat", "metrology recipe", "reference tool comparison", "wafer ID trace", "chamber matching"],
    wrongAction: "한 번 좋은 결과만 골라 pass로 보고한다.",
    stop: "acceptance 기준과 measurement repeatability가 불명확하면 customer release 단정 금지.",
    report: "Baseline pass 여부는 metrology repeatability와 tool trace를 분리해 확인한 뒤 공식 기준으로 설명하겠습니다.",
    prevention: "qualification packet에 metrology condition lock과 repeat check를 포함.",
    choices: [
      { label: "metrology 조건을 고정하고 repeatability와 tool trace를 분리한다.", correct: true, why: "pass evidence는 측정 자체의 신뢰도도 포함합니다." },
      { label: "좋은 map 하나만 골라 handover한다.", correct: false, why: "선택적 보고는 장기 신뢰를 무너뜨립니다." },
      { label: "tool trace가 좋으니 metrology는 무시한다.", correct: false, why: "고객 acceptance는 wafer 결과 evidence와 연결됩니다." }
    ]
  }
];

const roadmap = [
  {
    week: "1주차",
    title: "반도체 공정 큰 그림과 CE 역할",
    why: "장비 하나만 보지 않고 fab, 고객, safety, uptime 안에서 본다.",
    missions: [
      ["job-1", "RTP와 Epitaxy가 FEOL에서 왜 중요한지 10줄 요약", "공정 목적과 장비 목적을 분리해서 설명"],
      ["job-2", "PM, CM, installation, upgrade 차이 정리", "각 작업의 성공 기준을 함께 적기"],
      ["job-3", "고객 보고 템플릿 만들기", "현상, 영향, 확인값, 다음 액션, 요청사항"]
    ]
  },
  {
    week: "2주차",
    title: "Vacuum/Gas/Thermal 기본기",
    why: "EPI/RTP 장비 진단은 압력, 유량, 온도, purge, leak 의심을 자주 만난다.",
    missions: [
      ["sub-1", "roughing, throttle, leak, purge 개념 암기", "압력 단위와 정상/비정상 패턴도 같이 보기"],
      ["sub-2", "MFC, valve, regulator, exhaust 역할 정리", "가스는 안전 절차와 항상 연결"],
      ["sub-3", "lamp heating, pyrometer, thermocouple 비교", "측정값이 틀릴 때 가능한 원인까지"]
    ]
  },
  {
    week: "3주차",
    title: "전장/기계/도면 읽기",
    why: "CE는 원인 파악 전에 회로도와 기구 구조를 안전하게 따라가야 한다.",
    missions: [
      ["elec-1", "DMM으로 전압, 저항, 연속성 측정 절차 복습", "LOTO와 energized work 위험도 구분"],
      ["elec-2", "schematic에서 sensor, relay, interlock chain 찾기", "입출력과 power path 표시"],
      ["mech-1", "wafer handling, robot, slit valve, lift pin 동작 순서 그리기", "mechanical bind와 sensor mismatch 연결"]
    ]
  },
  {
    week: "4주차",
    title: "현장형 troubleshooting",
    why: "합격 이후 빠르게 성장하려면 질문의 품질이 좋아야 한다.",
    missions: [
      ["field-1", "알람 1개를 보고 확인 순서 5단계 작성", "안전, 로그, 재현성, 계측, escalation"],
      ["field-2", "PM 후 첫 wafer 문제 발생 시 점검표 작성", "작업 전후 변화점을 우선 확인"],
      ["field-3", "고객 앞 브리핑 1분 스크립트 연습", "아는 것과 모르는 것을 분리"]
    ]
  }
];

const systems = [
  {
    id: "rtp",
    name: "RTP / Thermal Processing",
    one: "Wafer를 짧은 시간 동안 목표 온도까지 빠르게 가열해 dopant activation, film property change, contamination reduction 등에 사용되는 열처리 영역입니다.",
    blocks: [
      ["CE가 보는 포인트", ["lamp 또는 thermal source 상태", "temperature sensor/pyrometry 신뢰도", "recipe step, ramp rate, soak time", "cooling, purge, chamber cleanliness"]],
      ["자주 묻는 질문", ["왜 uniformity가 중요한가?", "온도 측정값이 틀리면 어떤 현상이 생기는가?", "interlock이 걸렸을 때 bypass보다 먼저 할 일은 무엇인가?"]],
      ["설치 체크", ["facilities 전원/냉각/배기 조건 확인", "chamber integrity와 safety chain 확인", "baseline recipe와 acceptance data 비교"]]
    ]
  },
  {
    id: "epi",
    name: "Epitaxy / EPI",
    one: "기판 위에 결정 구조가 이어지는 박막을 성장시키는 공정입니다. advanced logic/memory에서 source-drain, channel, contact, selective growth 같은 응용으로 연결됩니다.",
    blocks: [
      ["CE가 보는 포인트", ["precursor/reactant gas delivery", "chamber pressure와 temperature stability", "pre-clean과 queue time 영향", "particle, defect, thickness/resistivity uniformity"]],
      ["자주 묻는 질문", ["Epitaxy와 일반 CVD의 차이는?", "selective epi에서 표면 상태가 왜 중요한가?", "defect가 늘면 장비 쪽에서 무엇을 먼저 확인할까?"]],
      ["설치 체크", ["gas cabinet과 abatement 연계", "vacuum leak/purge 검증", "wafer transfer와 chamber matching 확인"]]
    ]
  },
  {
    id: "vacuum",
    name: "Vacuum & Gas",
    one: "압력과 유량은 공정 재현성과 안전을 동시에 좌우합니다. CE는 정상 trend를 알아야 이상을 빠르게 감지합니다.",
    blocks: [
      ["핵심 부품", ["pump, throttle valve, pressure gauge", "MFC, pneumatic valve, regulator", "purge line, exhaust, abatement interface"]],
      ["진단 단서", ["pumpdown time 증가", "base pressure 불안정", "MFC setpoint와 actual mismatch", "valve actuation delay"]],
      ["안전 기준", ["가스 종류별 PPE/SDS 확인", "purge 완료 전 개방 금지", "고객 site rule과 LOTO 절차 우선"]]
    ]
  },
  {
    id: "field",
    name: "Installation Flow",
    one: "현장 설치는 장비 반입부터 facilities hook-up, calibration, acceptance, customer handover까지 이어지는 협업 작업입니다.",
    blocks: [
      ["큰 흐름", ["site readiness 확인", "tool move-in and placement", "facilities hook-up", "power-on and subsystem checks", "process baseline and acceptance"]],
      ["CE 커뮤니케이션", ["일정 영향과 위험을 조기에 공유", "고객 요청사항과 내부 escalation 분리", "작업 완료 기준을 문서로 남김"]],
      ["몸으로 준비할 것", ["cleanroom PPE 착용 적응", "장시간 서서 작업하는 체력", "hand/power tool 안전 사용", "색상 구분과 도면 판독"]]
    ]
  }
];

const equipmentFamilies = [
  {
    name: "Centura Prime Epi",
    family: "Epitaxy · 300mm advanced logic/memory",
    what: "Applied 공식 페이지 기준으로 source-drain, channel, contact, FinFET/GAA logic, memory, power, analog, MEMS 응용을 다루는 Centura platform 기반 EPI 장비입니다.",
    publicFacts: [
      "single-chamber configuration으로 footprint를 줄이고 availability/productivity를 개선한다고 설명됨",
      "Siconi, Clarion, Ajax 같은 pre-clean 기술을 vacuum break 없이 통합 가능",
      "queue time과 interfacial contamination 감소가 공개적으로 강조됨"
    ],
    study: [
      "EPI chamber: temperature, pressure, precursor/dopant gas, thickness/resistivity/defect",
      "pre-clean integration: native oxide removal, interface contamination, vacuum transfer",
      "install: gas panel, vacuum, abatement, pre-clean chamber matching, qualification baseline"
    ]
  },
  {
    name: "Centura Xtera Epi",
    family: "Selective Epi · GAA / 2nm-class public launch",
    what: "Applied 공식 launch 자료 기준으로 GAA source-drain trench filling, selective epitaxy, integrated pre-clean/etch, low-volume chamber architecture를 내세우는 최신 EPI platform입니다.",
    publicFacts: [
      "void-free GAA source-drain structure와 40% 이상 cell-to-cell uniformity 개선이 공개 자료에 언급됨",
      "conventional epi 대비 50% lower gas usage가 공개 자료에 언급됨",
      "real-time wafer temperature monitoring/control과 optimized chemistry delivery가 공개 제품 페이지에 언급됨"
    ],
    study: [
      "selective deposition + etch balance를 개념적으로 이해",
      "chemistry delivery, chamber volume, temperature monitoring이 uniformity에 미치는 영향",
      "gas usage, abatement load, precursor replenishment를 install/qualification 관점으로 연결"
    ]
  },
  {
    name: "Centura Epi 200mm",
    family: "Epitaxy · Power / MEMS / RF / Photonics / legacy nodes",
    what: "Applied 공식 페이지 기준으로 production-proven single-wafer multi-chamber epitaxial silicon deposition product입니다.",
    publicFacts: [
      "thicker epitaxial layers up to 150 µm 요구와 power/MEMS 수요가 언급됨",
      "temperature/pressure range, flexible gas panel, silicon-germanium, germanium, polycrystalline deposition이 언급됨",
      "최대 3개 process chamber 구성과 Siconi pre-clean chamber 구성이 공개적으로 언급됨"
    ],
    study: [
      "200mm 장비는 legacy라고 쉬운 게 아니라 thick film, slip, defect, Rs uniformity가 중요",
      "multi-chamber matching, chamber clean, gas panel configuration 이해",
      "고객 fab의 오래된 facility와 modern safety/interface 사이 차이를 주의"
    ]
  },
  {
    name: "Centura RP Epi",
    family: "Epitaxy · installed base / predecessor",
    what: "Applied 공식 자료에서 Centura Prime Epi의 predecessor 또는 installed base로 언급되는 EPI 장비군입니다.",
    publicFacts: [
      "Prime Epi 설명에서 Centura RP Epi 경험을 기반으로 했다고 언급됨",
      "Siconi pre-clean upgrade package 관련 공개 발표에서 installed base upgrade가 언급됨",
      "현장 CE는 신형뿐 아니라 installed base, upgrade, retrofit을 만날 수 있음"
    ],
    study: [
      "upgrade/retrofit 시 기존 baseline과 변경점 비교",
      "pre-clean 추가가 vacuum path, recipe, qualification, PM 항목에 미치는 영향",
      "legacy chamber와 신규 chamber의 공통/차이점을 질문으로 정리"
    ]
  },
  {
    name: "Vantage Radiance Plus RTP",
    family: "RTP · Atmospheric / reduced pressure soak & spike anneal",
    what: "Applied 공식 한국/미국 페이지 기준으로 high-volume atmospheric RTP와 soak/spike annealing을 위한 Vantage platform 기반 RTP 장비입니다.",
    publicFacts: [
      "multi-zone honeycomb lamp source array와 temperature control system 언급",
      "pyrometry/emissometry 기반 high-frequency closed-loop temperature control 언급",
      "wide temperature capability, <1.5s dwell spike anneal, <1ppm O2 ambient control, high-speed wafer rotation이 한국 공식 페이지에 언급됨"
    ],
    study: [
      "lamp zone, pyrometer/emissometer, wafer rotation, O2 ambient control을 하나의 thermal uniformity system으로 학습",
      "install: single-unit shipment, 빠른 start-up 장점과 utility/interface 확인",
      "qualification: temperature trace, ramp/dwell/cool, wafer-to-wafer repeatability"
    ]
  },
  {
    name: "Vantage Vulcan RTP",
    family: "RTP · Low-temperature / interface engineering",
    what: "Applied 공식 페이지 기준으로 lamp-based RTP 중 near-room-temperature closed-loop capability와 transmission-based multi-point temperature measurement를 강조하는 platform입니다.",
    publicFacts: [
      "low-temperature processing과 wafer-to-wafer repeatability가 공개적으로 강조됨",
      "fast spike quench와 junction/high-k metal gate module scaling이 언급됨",
      "과거 발표 자료는 backside heating, >200°C/s ramp, within-die <3°C control 목표를 언급함"
    ],
    study: [
      "low-temperature closed-loop가 왜 어려운지: sensor signal, emissivity, interface quality",
      "backside heating 개념과 patterned wafer hot spot 문제",
      "qualification: low-temp trace 안정성, repeatability, interface-sensitive process risk"
    ]
  },
  {
    name: "Vantage RadOx RTP",
    family: "RTP · Radical oxidation",
    what: "Applied 공식 페이지 기준으로 RTP technology와 radical oxidation chemistry를 결합해 gate oxide, poly reoxidation, flash oxides 같은 oxidation step을 지원하는 계열입니다.",
    publicFacts: [
      "critical oxidation steps in memory, logic, foundry 응용이 공개 페이지에 언급됨",
      "RTP 장비라도 anneal만이 아니라 oxidation chemistry 옵션으로 갈라질 수 있음을 보여줌",
      "Vantage platform의 chamber hybrid 구성과도 연결될 수 있음"
    ],
    study: [
      "RTP와 process chemistry가 결합될 때 gas/exhaust/abatement 확인이 더 중요",
      "oxidation ambient control, radical source, chamber clean 개념 학습",
      "qualification: oxide-related metrology와 process repeatability를 공정팀과 연결"
    ]
  },
  {
    name: "Vantage Astra / Astra DSA",
    family: "Millisecond anneal / dynamic surface anneal",
    what: "Applied 공식 발표와 제품 페이지 기준으로 laser-based 또는 dynamic surface anneal 계열로 언급되는 Vantage platform 장비군입니다.",
    publicFacts: [
      "2009년 공개 발표에서 NiSi contact annealing, 45nm beyond, drive current/gate leakage 개선 맥락으로 Vantage Astra millisecond anneal이 언급됨",
      "Vantage Astra DSA 제품 페이지는 Vantage platform이 Astra chambers 또는 Radiance Plus/RadOx와 hybrid 구성 가능하다고 설명함",
      "RTP/anneal portfolio가 lamp, laser, heater 기반으로 갈라진다는 공식 RTP 소개와 연결됨"
    ],
    study: [
      "millisecond anneal은 thermal budget과 surface/interface engineering 중심으로 이해",
      "hybrid chamber 구성은 install scope, chamber qualification, recipe routing을 복잡하게 만듦",
      "CE는 chamber type별 energy source, safety, calibration, metrology 기준을 분리해 학습"
    ]
  }
];

const optionSplits = [
  ["Platform", "Centura 또는 Vantage 같은 base platform 위에 chamber 조합이 달라질 수 있습니다."],
  ["Wafer size", "200mm/300mm, legacy/power/MEMS/advanced logic에 따라 facility와 qualification 관점이 달라집니다."],
  ["Chamber count", "single chamber, multi-chamber, hybrid chamber 구성은 throughput, matching, PM scope를 바꿉니다."],
  ["Process chamber type", "EPI deposition, pre-clean, etch, RTP anneal, radical oxidation, millisecond anneal 등 chamber 목적이 다릅니다."],
  ["Gas panel", "silicon precursor, dopant, H2, HCl, purge gas, oxidation chemistry 등 고객 공정 옵션에 따라 갈라집니다."],
  ["Pressure/ambient", "atmospheric, reduced pressure, vacuum transfer, low O2 ambient control 등 process envelope이 다릅니다."],
  ["Thermal source", "lamp, laser, heater, honeycomb lamp, backside heating, wafer rotation 같은 hardware가 진단 포인트를 바꿉니다."],
  ["Integrated clean", "Siconi, Clarion, Ajax 같은 pre-clean 통합 여부가 queue time, interface contamination, chamber matching에 영향을 줍니다."],
  ["Controls/data", "temperature trace, MFC trend, host communication, FDC, recipe permission, sensor calibration option이 다릅니다."],
  ["Customer/site spec", "같은 모델명도 삼성 평택 site rule, customer spec, utility POC, abatement configuration에 따라 install 방식이 달라집니다."]
];

const equipmentStudyPath = [
  ["1단계: 이름 분해", "모델명만 외우지 말고 platform, chamber, process, application, option을 분리합니다."],
  ["2단계: 공정 목적", "이 장비가 source-drain, contact, anneal, oxidation, pre-clean 중 무엇을 해결하는지 말합니다."],
  ["3단계: 핵심 서브시스템", "gas/vacuum/thermal/automation/controls/facility 중 어느 subsystem이 품질에 직접 연결되는지 표시합니다."],
  ["4단계: install 영향", "어떤 utility가 필요한지, gas/exhaust/abatement/cooling/power/network 중 risk가 큰 항목을 찾습니다."],
  ["5단계: qualification data", "temperature trace, pumpdown curve, MFC response, defect/thickness/Rs, wafer transfer reliability 중 어떤 data로 성공을 확인하는지 정합니다."],
  ["6단계: 옵션 질문", "입사 후 선임에게 '이 tool은 어떤 chamber option인가, gas panel은 어떤 구성인가, customer acceptance limit는 무엇인가'를 질문합니다."]
];

const scenarios = [
  {
    title: "Pumpdown 시간이 평소보다 길다",
    status: "Vacuum anomaly",
    facts: ["PM 이후 첫 pumpdown", "base pressure 도달 시간이 2배 증가", "알람은 아직 없음"],
    good: "작업 전후 변경점, door seal, valve state, gauge trend, leak check 순서로 확인한다.",
    choices: [
      ["즉시 recipe를 돌려 wafer 결과를 본다", false],
      ["PM에서 열었던 부위와 seal 상태를 먼저 확인한다", true],
      ["압력 gauge를 무시하고 pump만 교체한다", false]
    ]
  },
  {
    title: "MFC actual 값이 setpoint를 따라가지 못한다",
    status: "Gas delivery",
    facts: ["특정 gas line에서만 발생", "pneumatic pressure는 정상 범위", "최근 cylinder 교체 이력 있음"],
    good: "gas supply, regulator, valve open state, line purge, MFC calibration/health를 안전 절차 안에서 좁힌다.",
    choices: [
      ["가스 라인은 위험하므로 site 절차와 senior 지시를 받아 확인한다", true],
      ["MFC setpoint를 크게 올려 반응을 본다", false],
      ["원인 추정만 고객에게 확정 보고한다", false]
    ]
  },
  {
    title: "Wafer transfer 중 sensor mismatch 발생",
    status: "Mechanical / I/O",
    facts: ["robot home 완료", "slit valve open sensor가 늦게 들어옴", "같은 step에서 간헐 발생"],
    good: "mechanical bind, sensor alignment, cable/connector, pneumatic response, sequence timing을 로그와 함께 본다.",
    choices: [
      ["간헐이면 무시하고 lot을 계속 진행한다", false],
      ["I/O 로그와 물리 동작을 동시에 비교한다", true],
      ["센서 하나만 교체하고 재발 여부는 보지 않는다", false]
    ]
  },
  {
    title: "RTP temperature trace가 recipe target보다 흔들린다",
    status: "Thermal control",
    facts: ["특정 chamber에서만 발생", "lamp power command가 평소보다 높음", "wafer-to-wafer 편차가 증가"],
    good: "pyrometer/window condition, lamp zone health, wafer rotation, cooling, recipe 변경 이력, chamber contamination을 trend로 비교한다.",
    choices: [
      ["온도 문제는 공정팀 문제라고 넘긴다", false],
      ["정상 chamber trace와 비교해 sensor/actuator/환경 요인을 나눈다", true],
      ["target 온도를 임의로 낮춰 alarm만 피한다", false]
    ]
  },
  {
    title: "EPI defect/particle이 PM 후 증가했다",
    status: "Process quality",
    facts: ["PM 전 baseline은 안정", "pumpdown은 정상", "특정 recipe에서 defect map이 edge-heavy"],
    good: "PM 작업 부위, chamber clean 상태, wafer handling contact, pre-clean, gas/purge, temperature uniformity, particle source를 순서대로 좁힌다.",
    choices: [
      ["PM 변경점과 defect map 패턴을 연결해 본다", true],
      ["모든 chamber를 동시에 열어 확인한다", false],
      ["defect는 항상 wafer incoming 문제라고 확정한다", false]
    ]
  },
  {
    title: "Exhaust/abatement ready signal이 들어오지 않는다",
    status: "시설 인터페이스",
    facts: ["장비 power-on 전 interlock check 단계", "facility contractor 작업 직후", "tool alarm은 exhaust not ready"],
    good: "고객 facility owner와 함께 exhaust flow, damper, abatement status, signal wiring, interlock mapping을 승인 절차 안에서 확인한다.",
    choices: [
      ["interlock을 임의로 우회한다", false],
      ["facility owner와 interface signal 및 실제 상태를 같이 확인한다", true],
      ["software alarm이므로 무시하고 진행한다", false]
    ]
  },
  {
    title: "첫 wafer dry run에서 robot repeatability가 나쁘다",
    status: "Installation motion",
    facts: ["move-in 직후", "leveling 완료 보고", "특정 slot에서만 scrape mark 의심"],
    good: "tool leveling, cassette/stage teaching, end-effector condition, sensor timing, mechanical interference, vibration source를 확인한다.",
    choices: [
      ["wafer를 더 많이 돌려 평균을 본다", false],
      ["teaching과 mechanical clearance를 정지 상태에서 먼저 확인한다", true],
      ["robot speed를 올려 cycle time을 맞춘다", false]
    ]
  }
];

const seniorScenarioFallback = {
  phase: "Field diagnostic / evidence first",
  suspects: [
    "최근 PM 또는 install 변경점",
    "센서, 게이지, 로그의 실제 trend",
    "facility ready 신호와 실제 utility 상태",
    "wafer handling, seal, connector, calibration 상태"
  ],
  evidence: [
    "알람 발생 시각, lot, wafer, chamber, recipe 범위",
    "정상 chamber 또는 이전 baseline과의 비교",
    "PM 전후 변경 이력, 작업 witness 기록, 사진",
    "고객/선임 CE에게 공유 가능한 trend capture"
  ],
  stop: "toxic gas, vacuum integrity, exhaust/abatement, electrical hazard, wafer break/particle risk가 의심되면 recipe 진행보다 hold, LOTO/site rule, 선임 CE escalation을 우선한다.",
  report: "현재 증상은 특정 조건에서 재현되며, 확인된 사실과 추정 원인을 분리해 보고드립니다. 안전 관련 interlock 또는 facility 상태는 우회하지 않고 고객 owner 및 선임 CE와 함께 확인하겠습니다.",
  next: [
    "scope를 좁힌다: chamber, recipe, wafer type, 시간대, PM 이후 여부",
    "증거를 모은다: trend, alarm, gauge, I/O, wafer map, 사진",
    "안전 경계를 확인한다: gas/exhaust/vacuum/electrical/site rule",
    "고객에게 사실, 영향, 다음 확인, 예상 시간을 짧게 공유한다"
  ],
  publicBasis: "공개자료는 EPI/RTP의 공정 목적, gas/vacuum/temperature control, SEMI/OSHA/NIOSH 안전 원칙 수준까지 설명한다. 고객 recipe, valve sequence, detector setpoint, bypass 절차는 포함하지 않는다."
};

scenarios.forEach(scenario => {
  scenario.phase = scenario.phase || seniorScenarioFallback.phase;
  scenario.suspects = scenario.suspects || seniorScenarioFallback.suspects;
  scenario.evidence = scenario.evidence || seniorScenarioFallback.evidence;
  scenario.stop = scenario.stop || seniorScenarioFallback.stop;
  scenario.report = scenario.report || seniorScenarioFallback.report;
  scenario.next = scenario.next || seniorScenarioFallback.next;
  scenario.publicBasis = scenario.publicBasis || seniorScenarioFallback.publicBasis;
});

scenarios.push(
  {
    title: "Pre-clean 이후 첫 EPI wafer에서 defect가 증가한다",
    status: "Interface / baseline wafer",
    phase: "EPI qualification after PM or install",
    facts: [
      "pumpdown과 robot transfer는 pass인데 첫 baseline wafer defect map이 edge-heavy이다.",
      "pre-clean chamber와 EPI chamber를 연속으로 사용한 wafer에서만 강하게 보인다.",
      "동일 incoming wafer를 다른 chamber path로 보낼 때 defect 수준이 달라진다."
    ],
    suspects: [
      "pre-clean 이후 queue time 또는 vacuum break 영향",
      "chamber wall, edge ring, wafer support의 particle source",
      "purge/exhaust 안정화 부족 또는 residual chemistry 영향",
      "handling contact, robot teach, backside contact mark"
    ],
    evidence: [
      "pre-clean only, EPI only, combined path baseline wafer를 분리해 wafer map을 비교한다.",
      "PM 교체 부품, wipe/clean 영역, chamber open 이력과 defect 위치를 겹쳐본다.",
      "transfer path별 scrape/contact 흔적과 backside inspection을 확인한다.",
      "Applied 공개자료의 integrated pre-clean 목적을 interface contamination과 queue time 관리로 연결해 이해한다."
    ],
    stop: "toxic/corrosive gas 사용 chamber, exhaust abnormal, wafer break, 반복 particle burst가 보이면 recipe 반복으로 평균을 내지 말고 hold한다.",
    report: "현재 defect 증가는 전체 tool 문제가 아니라 pre-clean 포함 path에서 집중됩니다. pre-clean only/EPI only/combined baseline으로 scope를 분리하고, PM 변경 부위와 wafer map correlation을 확인하겠습니다.",
    next: [
      "baseline split plan을 고객과 합의한다: chamber path, wafer count, metrology 항목",
      "PM 후 cleaning/seasoning 완료 여부를 공개 가능한 checklist 수준으로 확인한다.",
      "defect, thickness, Rs, haze/inspection data를 같은 wafer ID로 묶어 evidence pack을 만든다.",
      "원인 확정 전에는 고객 lot 진행 가능 여부를 customer owner 판단으로 분리한다."
    ],
    publicBasis: "Applied 공개자료는 integrated pre-clean과 EPI platform이 interface contamination과 process matching을 줄이는 방향으로 설계된다고 설명한다. 구체 recipe, clean sequence, acceptance limit은 site/OEM 비공개 범위다.",
    good: "좋습니다. 결함을 '공정 불량'으로 단정하지 않고 path split과 baseline wafer로 scope를 좁히는 접근이 senior CE식 사고입니다.",
    choices: [
      ["같은 recipe를 여러 번 더 돌려 평균 defect가 내려가는지 본다.", false],
      ["pre-clean only/EPI only/combined path로 split하여 wafer map과 PM 변경점을 연결한다.", true],
      ["incoming wafer 문제로 보고하고 tool 확인을 멈춘다.", false]
    ]
  },
  {
    title: "EPI thickness 또는 Rs가 chamber별로 다르게 drift한다",
    status: "Chamber matching / metrology",
    phase: "Multi-chamber qualification",
    facts: [
      "같은 product-like baseline에서 chamber A와 B의 thickness trend가 벌어진다.",
      "MFC setpoint alarm은 없지만 실제 trend와 metrology가 함께 움직인다.",
      "PM 또는 season run 이후 편차가 커졌다."
    ],
    suspects: [
      "temperature uniformity 또는 pyrometer/window 상태 차이",
      "gas delivery response, MFC health, line purge history",
      "chamber seasoning/memory effect, wall condition 차이",
      "metrology recipe, wafer type, sampling position mismatch"
    ],
    evidence: [
      "동일 wafer type, 동일 metrology recipe, 동일 sampling map으로 chamber-to-chamber 비교한다.",
      "temperature trace, pressure trend, MFC actual trend를 wafer result와 시간축으로 맞춘다.",
      "seasoning 전후 baseline wafer를 구분하고 chamber open 이력을 비교한다.",
      "Rs는 dopant 활성/농도와 연결되므로 EPI dopant gas 계열은 toxic gas safety와 함께 다룬다."
    ],
    stop: "spec 밖 trend가 반복되거나 dopant/toxic gas delivery 이상이 의심되면 customer wafer 진행을 hold하고 선임 CE와 gas owner를 포함한다.",
    report: "Chamber별 matching drift가 확인되었습니다. metrology 조건을 고정한 baseline 결과와 tool trend를 시간축으로 맞춰 temperature, gas response, seasoning 상태를 분리해 보겠습니다.",
    next: [
      "metrology repeatability를 먼저 배제한다.",
      "정상 chamber를 reference로 잡고 trace overlay를 만든다.",
      "gas cabinet/cylinder 교체 이력은 customer gas owner와 확인한다.",
      "recipe number나 hidden parameter를 임의 변경하지 않는다."
    ],
    publicBasis: "Applied 공개 EPI 자료는 single-wafer multi-chamber EPI에서 thickness/resistivity uniformity, repeatability, low defect가 중요하다고 설명한다. chamber별 acceptance 수치와 recipe tuning은 비공개 영역이다.",
    good: "정답입니다. chamber matching은 wafer result만 보지 않고 metrology 조건, thermal/gas/vacuum trend, chamber history를 같은 시간축으로 맞춰야 합니다.",
    choices: [
      ["drift한 chamber recipe 온도만 임의로 보정한다.", false],
      ["metrology 조건을 고정하고 chamber별 trace와 wafer result를 overlay한다.", true],
      ["MFC alarm이 없으므로 gas 쪽은 확인하지 않는다.", false]
    ]
  },
  {
    title: "First gas introduction 전 exhaust/abatement ready가 불안정하다",
    status: "Gas safety / facility",
    phase: "Install hook-up before process gas",
    facts: [
      "tool은 gas enable 전 ready check에서 intermittent fail을 띄운다.",
      "facility contractor 작업 직후이며 exhaust damper status 설명이 사람마다 다르다.",
      "process gas에는 pyrophoric/toxic/corrosive 계열이 포함될 수 있다."
    ],
    suspects: [
      "facility exhaust flow 또는 damper 상태 불안정",
      "abatement ready contact, wiring, mapping mismatch",
      "tool-side interlock input과 actual facility 상태 불일치",
      "site permit, gas release readiness, emergency response 준비 미확인"
    ],
    evidence: [
      "tool screen만 보지 말고 facility owner가 보는 actual exhaust/abatement 상태와 대조한다.",
      "POC label, drawing revision, signal name, contact type을 고객 owner와 witness로 확인한다.",
      "gas SDS, NIOSH/OSHA hazard class, SEMI exhaust ventilation 원칙을 beginner도 읽게 연결한다.",
      "interlock bypass, detector setpoint, actual trip value는 학습 웹에 넣지 않고 현장 승인 절차로만 다룬다."
    ],
    stop: "exhaust/abatement ready가 안정적으로 확인되지 않으면 first gas introduction을 진행하지 않는다. interlock 우회, 임의 jumper, detector setpoint 변경은 금지 영역이다.",
    report: "First gas 전 ready 신호가 간헐적으로 불안정합니다. tool alarm만이 아니라 facility actual state, POC wiring, abatement ready를 고객 facility owner와 witness로 확인한 뒤 진행하겠습니다.",
    next: [
      "customer facility owner, gas owner, senior CE를 같은 확인 테이블에 올린다.",
      "ready 신호와 실제 exhaust/abatement 상태의 time correlation을 기록한다.",
      "gas introduction 전 emergency response, PPE, permit, area control을 site rule로 확인한다.",
      "승인 없는 bypass 정보는 만들지도 공유하지도 않는다."
    ],
    publicBasis: "OSHA/NIOSH 공공자료는 semiconductor fab의 toxic/corrosive/pyrophoric gas와 exhaust control의 위험성을 설명한다. 실제 detector 설정값, gas release sequence는 공개 학습 범위가 아니다.",
    good: "맞습니다. gas 전 단계에서는 일정 압박보다 exhaust/abatement와 interlock integrity가 우선입니다.",
    choices: [
      ["ready가 가끔 들어오므로 들어오는 순간 gas를 열어본다.", false],
      ["facility actual state와 tool ready input을 customer owner witness로 대조한다.", true],
      ["interlock 입력을 임시로 우회해 process를 먼저 끝낸다.", false]
    ]
  },
  {
    title: "RTP wafer temperature trace가 overshoot/undershoot를 보인다",
    status: "RTP thermal control",
    phase: "RTP qualification and recovery",
    facts: [
      "wafer-to-wafer repeatability가 나빠지고 특정 zone command가 평소보다 커졌다.",
      "lamp/pyrometer/window 관련 PM 이후 처음 보는 형태다.",
      "metrology 결과는 anneal 또는 oxidation target에서 벗어난다."
    ],
    suspects: [
      "pyrometer view path, quartz/window contamination, calibration 상태",
      "lamp zone health, power supply, cooling water stability",
      "wafer rotation/slip, backside emissivity/wafer type mismatch",
      "chamber ambient, pressure, O2/N2/H2O chemistry stability"
    ],
    evidence: [
      "정상 run trace와 suspect run trace를 같은 scale로 overlay한다.",
      "lamp command, measured temperature, pressure/ambient trend를 같이 본다.",
      "blank/baseline wafer와 metrology 결과를 연결해 공정 영향 여부를 분리한다.",
      "Applied RTP 공개자료의 multi-point temperature measurement와 closed-loop control 개념을 beginner 설명으로 붙인다."
    ],
    stop: "temperature runaway, wafer slip/break, cooling abnormal, electrical hazard, oxygen/hydrogen 관련 위험이 의심되면 즉시 hold하고 site/OEM escalation으로 전환한다.",
    report: "RTP trace 이상은 특정 chamber/zone에서 재현되며, lamp command와 measured temperature 간 차이가 커졌습니다. optical path, lamp/cooling health, wafer type, ambient trend를 순서대로 확인하겠습니다.",
    next: [
      "정상 chamber 또는 PM 전 trace와 overlay한다.",
      "wafer type과 metrology recipe가 동일한지 확인한다.",
      "lamp/pyrometer 관련 PM 변경 이력과 window condition을 확인한다.",
      "recipe target을 임의로 바꾸지 않고 root cause evidence를 먼저 만든다."
    ],
    publicBasis: "Applied RTP 공개자료는 빠른 열처리에서 temperature measurement, closed-loop control, uniformity/repeatability가 핵심임을 설명한다. zone별 control parameter와 recipe tuning은 비공개다.",
    good: "정확합니다. RTP는 wafer result와 thermal trace를 분리해서 보지 말고 한 화면에 묶어야 원인 후보가 줄어듭니다.",
    choices: [
      ["목표 온도를 낮춰 overshoot만 없애본다.", false],
      ["정상 trace와 overlay하고 optical path, lamp/cooling, wafer/ambient 조건을 분리한다.", true],
      ["metrology가 나쁘면 RTP가 아니라 metrology 문제로만 본다.", false]
    ]
  },
  {
    title: "Selective EPI에서 원치 않는 영역에 deposition이 보인다",
    status: "Selective growth / surface condition",
    phase: "Advanced EPI process understanding",
    facts: [
      "pattern wafer의 특정 oxide/nitride 영역에 unwanted deposition이 보인다.",
      "HCl 계열 chemistry와 silicon precursor balance가 공정 개념상 중요하다.",
      "pre-clean, native oxide, surface termination에 민감한 현상이다."
    ],
    suspects: [
      "surface preparation 또는 pre-clean 불충분",
      "selectivity chemistry balance 변화",
      "temperature/pressure/gas flow uniformity 변화",
      "pattern loading, incoming wafer surface 상태"
    ],
    evidence: [
      "blank wafer와 pattern wafer 결과를 분리해 tool issue와 pattern/loading issue를 구분한다.",
      "pre-clean path, queue time, chamber history, baseline wafer 결과를 함께 본다.",
      "SEM/defect/metrology 이미지와 tool trend를 같은 wafer ID로 묶는다.",
      "HCl은 corrosive/toxic hazard로 취급되며 안전자료와 facility exhaust 원칙을 같이 학습한다."
    ],
    stop: "corrosive gas handling 이상, exhaust abnormal, unexpected deposition이 chamber contamination으로 이어질 위험이 있으면 hold하고 engineering/customer owner와 판단한다.",
    report: "Selective EPI에서 unwanted deposition이 관찰되어 blank/pattern wafer와 pre-clean path를 분리해 보겠습니다. 표면 준비, selectivity chemistry, chamber history, incoming condition을 evidence로 좁히겠습니다.",
    next: [
      "blank baseline이 정상인지 먼저 확인한다.",
      "pattern wafer loading과 pre-clean/queue time 영향을 분리한다.",
      "공정 recipe 조정은 process owner 권한으로 분리하고 CE는 evidence package를 만든다.",
      "HCl 등 corrosive gas 위험은 SDS/EHS/site rule을 먼저 적용한다."
    ],
    publicBasis: "공개 논문과 대학/장비 소개자료는 selective epitaxy가 surface preparation, precursor/etchant chemistry, temperature/pressure에 민감함을 설명한다. 고객 pattern recipe와 sequence는 비공개다.",
    good: "좋습니다. selective defect는 단순 tool fault가 아니라 surface, chemistry, pattern, chamber history를 분리해야 합니다.",
    choices: [
      ["pattern wafer 결과만 보고 chamber를 바로 fault 처리한다.", false],
      ["blank/pattern split과 pre-clean/queue/chamber history를 같이 본다.", true],
      ["HCl이 들어가도 defect 이슈이므로 safety owner는 부르지 않는다.", false]
    ]
  },
  {
    title: "Install handover 직전 customer가 '왜 pass인지'를 묻는다",
    status: "Handover / customer communication",
    phase: "Acceptance evidence package",
    facts: [
      "기계적으로는 install check가 끝났지만 customer는 wafer result와 risk 설명을 원한다.",
      "CE가 각 test의 의미를 설명하지 못하면 고객 신뢰가 약해진다.",
      "공개 가능한 자료와 site-specific acceptance limit을 분리해야 한다."
    ],
    suspects: [
      "acceptance criterion과 evidence가 연결되지 않음",
      "safety, facility, automation, process data가 따로 흩어져 있음",
      "baseline wafer/metrology 결과의 의미 설명 부족",
      "remaining open item과 owner가 불명확함"
    ],
    evidence: [
      "utility ready, leak/pumpdown, robot dry run, gas ready, baseline wafer, metrology, alarm review를 한 packet으로 묶는다.",
      "각 항목마다 '무엇을 증명하는 test인지'를 한 문장으로 붙인다.",
      "open item은 impact, owner, next action, due date로 분리한다.",
      "recipe, password, internal manual, 고객 spec 값은 화면 학습자료가 아니라 현장 승인 문서로만 다룬다."
    ],
    stop: "unresolved safety/facility/process risk가 있는데 일정상 handover만 하자는 압박이 있으면 sign-off 범위를 명확히 분리하고 escalation한다.",
    report: "Handover evidence를 safety, facility, automation, process, metrology 순서로 정리했습니다. 각 항목은 pass 근거와 남은 open item, owner, next action으로 분리해 설명드리겠습니다.",
    next: [
      "handover packet 목차를 먼저 보여주고 고객 질문을 받는다.",
      "pass/fail이 아니라 risk retired 여부로 설명한다.",
      "불확실한 내용은 추정으로 말하지 않고 확인 action과 owner를 남긴다.",
      "고객 보고 문장은 짧고 factual하게 유지한다."
    ],
    publicBasis: "공개자료로는 install/qualification의 일반 evidence logic을 학습할 수 있다. 실제 customer acceptance limit, signed checklist, recipe 조건은 비공개이며 현장 문서 우선이다.",
    good: "정답입니다. handover는 서류가 아니라 risk가 하나씩 제거되었다는 설명 능력입니다.",
    choices: [
      ["checklist에 pass가 있으니 세부 설명 없이 서명만 요청한다.", false],
      ["각 test가 제거한 risk와 남은 open item을 packet으로 설명한다.", true],
      ["비공개 acceptance 값과 recipe 조건을 교육 웹에 모두 넣는다.", false]
    ]
  }
);

scenarios.push(
  {
    title: "Load lock pump/vent가 반복적으로 timeout 난다",
    status: "Load lock / vacuum boundary",
    phase: "Wafer path bring-up",
    facts: [
      "EFEM에서는 FOUP mapping이 정상인데 LL pump 또는 vent step에서 timeout이 반복된다.",
      "PM chamber pumpdown은 정상이고 특정 load lock에서만 편차가 크다.",
      "최근 door seal inspection 또는 N2 vent line 작업 이력이 있다."
    ],
    suspects: [
      "LL door seal, O-ring, hinge/latch seating 불량",
      "roughing valve, vent valve, pressure gauge response 이상",
      "N2/CDA vent pressure 또는 restrictor 문제",
      "slit valve state와 pressure equalization sequence 불일치"
    ],
    evidence: [
      "LL-A/LL-B pumpdown and vent curve를 같은 scale로 비교한다.",
      "door closed sensor, slit valve state, pressure gauge trace를 시간축으로 맞춘다.",
      "최근 작업 부위와 seal/contact witness mark를 사진으로 남긴다.",
      "wafer 없이 dry cycle로 재현성을 확인하되, 승인 없는 sequence 변경은 하지 않는다."
    ],
    stop: "pressure mismatch, door/slit valve sensor mismatch, wafer trapped state가 의심되면 wafer 이동을 멈추고 선임 CE와 customer owner를 호출한다.",
    report: "Load lock 전환 시간이 한쪽에서 반복적으로 지연됩니다. LL-A/B curve, door/slit valve state, vent/roughing path, 최근 seal 작업 이력을 묶어 확인하겠습니다.",
    next: [
      "wafer 없는 dry pump/vent 반복으로 범위를 좁힌다.",
      "gauge reading과 실제 valve state를 알람/로그와 대조한다.",
      "facility N2/CDA ready와 vent line owner를 확인한다.",
      "고객 wafer 투입 전 pressure boundary integrity를 닫는다."
    ],
    publicBasis: "공개 cluster/load-lock 자료는 load lock이 atmosphere와 vacuum transfer module 사이의 pressure boundary임을 설명한다. 실제 pump/vent valve sequence와 setpoint는 OEM/site 문서 범위다.",
    good: "맞습니다. Load lock 문제는 pump만 보지 말고 pressure boundary, valve state, gauge response, wafer handoff를 같이 봐야 합니다.",
    choices: [
      ["timeout을 줄이기 위해 pump/vent 시간을 임의로 늘리거나 줄인다.", false],
      ["LL-A/B curve와 door/slit valve/gauge trace를 비교해 pressure boundary를 확인한다.", true],
      ["FOUP mapping이 정상이라면 load lock은 원인이 아니라고 본다.", false]
    ]
  },
  {
    title: "FOUP mapping은 정상인데 wafer not present alarm이 난다",
    status: "EFEM / mapping / handoff",
    phase: "Factory interface diagnostic",
    facts: [
      "load port는 carrier를 정상 인식하지만 특정 slot에서 wafer present가 흔들린다.",
      "LL handoff 직전 또는 직후에만 alarm이 난다.",
      "최근 FOUP, aligner, robot teach 관련 작업이 있었다."
    ],
    suspects: [
      "FOUP seating, slot map, wafer bow/placement 문제",
      "EFEM robot end-effector vacuum/edge grip 상태",
      "aligner 센서 또는 handoff 위치 teach drift",
      "LL shelf/lift pin과 atmospheric robot handoff mismatch"
    ],
    evidence: [
      "slot map, robot pick/place log, aligner result, handoff point를 같은 wafer ID로 묶는다.",
      "wafer 없이 sensor toggle과 robot path를 확인하고, dummy wafer로 승인된 dry run만 수행한다.",
      "FOUP seating repeatability와 load port latch 상태를 사진/체크로 남긴다.",
      "same slot, different FOUP와 same FOUP, different slot split으로 범위를 좁힌다."
    ],
    stop: "double wafer, wafer skew, scrape mark, wafer edge contact가 보이면 반복 cycle보다 즉시 hold가 우선이다.",
    report: "Wafer presence alarm은 FOUP mapping만으로 결론낼 수 없습니다. slot map, EFEM pick/place, aligner, LL handoff를 같은 wafer ID 기준으로 분리해 확인하겠습니다.",
    next: [
      "FOUP/slot split을 설계한다.",
      "sensor state와 robot command timing을 비교한다.",
      "teach나 offset은 승인된 절차와 선임 입회로만 다룬다.",
      "scrape/particle risk가 있으면 customer wafer 사용을 멈춘다."
    ],
    publicBasis: "공개 EFEM/load-lock 설명은 FOUP와 parent tool 사이 atmospheric wafer handling과 vacuum boundary handoff를 설명한다. 실제 teach 좌표와 calibration 절차는 비공개다.",
    good: "좋습니다. mapping 정상은 시작점일 뿐이고 handoff evidence까지 이어야 wafer path 사고가 닫힙니다.",
    choices: [
      ["FOUP을 바꿔보고 되면 바로 production을 진행한다.", false],
      ["slot/FOUP split과 EFEM-aligner-LL handoff evidence를 같은 wafer ID로 묶는다.", true],
      ["wafer present sensor를 임시로 무시하고 cycle count를 채운다.", false]
    ]
  },
  {
    title: "PCW flow alarm 뒤 RTP trace가 동시에 흔들린다",
    status: "Cooling / thermal stability",
    phase: "Facility-linked thermal diagnostic",
    facts: [
      "RTP chamber에서 PCW/chiller 관련 alarm이 간헐적으로 발생한다.",
      "temperature trace와 lamp command가 같은 시간대에 흔들린다.",
      "facility PCW supply 압력 또는 온도 trend가 교대조마다 다르게 보고된다."
    ],
    suspects: [
      "PCW flow, temperature, pressure instability",
      "filter/strainer restriction 또는 valve partially closed",
      "lamp power/cooling interlock margin 부족",
      "facility signal은 ready지만 실제 thermal load 대응 부족"
    ],
    evidence: [
      "tool alarm timestamp와 PCW supply/return trend를 overlay한다.",
      "정상 chamber와 suspect chamber의 cooling demand를 비교한다.",
      "facility owner가 보는 chiller/PCW trend와 tool trace를 같은 시간축으로 맞춘다.",
      "cooling abnormal이 있으면 thermal process 결과를 metrology와 연결한다."
    ],
    stop: "cooling flow loss, high temperature, lamp/power risk, wafer slip/break 가능성이 있으면 RTP run을 중지한다.",
    report: "RTP trace 변동과 PCW alarm이 같은 시간대에 겹칩니다. tool trace와 facility PCW trend를 overlay해 thermal control issue인지 facility margin issue인지 분리하겠습니다.",
    next: [
      "facility PCW owner를 포함해 실제 supply/return trend를 받는다.",
      "strainer/filter/valve 상태는 승인된 owner와 확인한다.",
      "baseline wafer 결과와 trace 흔들림을 같은 lot/time으로 묶는다.",
      "cooling risk가 닫히기 전에는 wafer qualification을 밀어붙이지 않는다."
    ],
    publicBasis: "Applied RTP 공개자료는 thermal uniformity와 closed-loop temperature control을 강조한다. 냉각 조건의 site-specific limit과 piping detail은 현장 문서 범위다.",
    good: "맞습니다. RTP에서 냉각은 facility 문제처럼 보여도 공정 trace와 wafer 결과에 바로 연결됩니다.",
    choices: [
      ["PCW는 facility 문제이므로 CE가 볼 필요가 없다고 판단한다.", false],
      ["RTP trace, lamp command, PCW supply/return trend를 같은 시간축으로 묶는다.", true],
      ["alarm을 reset하고 trace가 지나가면 pass로 처리한다.", false]
    ]
  },
  {
    title: "CDA/N2 pressure dip 이후 pneumatic valve response가 늦다",
    status: "Pneumatic / facility",
    phase: "Install dry-run and valve motion",
    facts: [
      "slit valve 또는 gas valve actuation이 특정 시간대에 느려진다.",
      "sensor mismatch alarm은 짧게 발생했다 사라진다.",
      "CDA/N2 facility 압력이 교대 시간 또는 다른 장비 load와 함께 흔들린다."
    ],
    suspects: [
      "CDA/N2 supply pressure sag 또는 regulator 설정 문제",
      "pneumatic solenoid coil/valve spool sluggish",
      "actuator mechanical bind 또는 speed controller change",
      "sensor response와 실제 motion 간 timing margin 부족"
    ],
    evidence: [
      "actuator command, coil voltage, sensor feedback, CDA/N2 pressure를 같은 cycle에서 비교한다.",
      "전기 command가 정상인지, pneumatic energy가 충분한지 분리한다.",
      "최근 regulator, fitting, tube, cylinder 작업 이력을 확인한다.",
      "반복 sensor mismatch가 wafer motion과 겹치면 dry run을 멈춘다."
    ],
    stop: "slit valve motion uncertainty, wafer near valve, pressure energy hazard, pinch point가 있으면 수동 개입 없이 hold한다.",
    report: "Valve response delay는 command와 pneumatic energy를 분리해 보겠습니다. coil voltage, sensor feedback, CDA/N2 pressure trend를 같은 cycle에서 비교하겠습니다.",
    next: [
      "DVM으로 command presence를 확인하기 전 회로 권한과 안전 상태를 확인한다.",
      "facility pressure trend와 tool cycle timestamp를 맞춘다.",
      "mechanical bind는 승인된 절차와 LOTO 조건에서 확인한다.",
      "sensor mismatch가 재현되면 wafer path qualification을 hold한다."
    ],
    publicBasis: "공개 직무/안전자료는 CE가 pneumatic, hydraulic, electrical, gas system을 다룬다고 설명한다. actuator speed setting과 valve sequence는 공개 범위가 아니다.",
    good: "정답입니다. 공압 문제는 전기 command, 공압 source, mechanical motion, feedback sensor를 분리해야 합니다.",
    choices: [
      ["센서가 결국 들어오므로 timing alarm은 무시한다.", false],
      ["command, feedback, CDA/N2 pressure, 실제 motion을 한 cycle 안에서 분리한다.", true],
      ["valve가 느리면 speed controller를 임의로 돌려본다.", false]
    ]
  },
  {
    title: "Gas detector local alarm 후 tool screen은 normal로 보인다",
    status: "Toxic gas / EHS boundary",
    phase: "Gas safety event response",
    facts: [
      "gas cabinet 또는 local detector에서 alarm 이력이 보인다.",
      "tool HMI는 현재 normal이고 고객 일정은 first wafer를 요구한다.",
      "사용 gas에는 hydride, chlorosilane, HCl 계열이 포함될 수 있다."
    ],
    suspects: [
      "local detector event와 tool ready signal 간 정보 불일치",
      "gas cabinet, VMB/VMP, exhaust/abatement state 미확인",
      "recent cylinder change, purge, line release issue",
      "false alarm 가능성도 있지만 EHS owner 판단 전에는 확정 불가"
    ],
    evidence: [
      "local detector alarm history, gas cabinet status, abatement/exhaust ready를 owner witness로 확인한다.",
      "SDS와 site emergency response 절차를 우선 적용한다.",
      "tool HMI normal은 sufficient evidence가 아니며 facility/EHS record를 같이 본다.",
      "detector setpoint, bypass, calibration internal detail은 웹 교육자료에 넣지 않는다."
    ],
    stop: "gas alarm, unknown odor, exhaust not ready, area control uncertainty가 있으면 즉시 stop-work와 EHS escalation을 적용한다.",
    report: "Tool 화면은 normal이지만 local gas detector event가 있어 EHS/facility owner와 alarm history, gas cabinet, exhaust/abatement readiness를 확인한 뒤 진행하겠습니다.",
    next: [
      "area safety와 PPE/evacuation/site rule을 먼저 따른다.",
      "EHS owner, gas owner, senior CE를 동시에 align한다.",
      "확인 전에는 first gas/first wafer를 진행하지 않는다.",
      "고객에게 일정 영향보다 안전 경계와 확인 owner를 먼저 공유한다."
    ],
    publicBasis: "OSHA/NIOSH 자료는 arsine, phosphine, diborane, silane, HCl 등 semiconductor gas 위험을 설명한다. 현장 detector 설정값과 대응 sequence는 site/EHS 절차 우선이다.",
    good: "맞습니다. gas event는 tool 화면 normal만으로 종료하지 않고 EHS boundary를 먼저 닫아야 합니다.",
    choices: [
      ["tool screen이 normal이면 event는 무시하고 wafer를 진행한다.", false],
      ["local detector, gas cabinet, exhaust/abatement, EHS owner 확인을 먼저 닫는다.", true],
      ["detector setpoint를 낮추거나 bypass해 false alarm인지 본다.", false]
    ]
  },
  {
    title: "Host/recipe download mismatch 후 chamber route가 예상과 다르다",
    status: "Host / data / route control",
    phase: "Automation and recipe readiness",
    facts: [
      "tool은 recipe download를 받았지만 chamber routing이 expected route와 다르다.",
      "manual screen과 host message의 recipe 이름 또는 revision이 다르게 보인다.",
      "wafer path는 정상 동작하지만 qualification result 해석이 어려워진다."
    ],
    suspects: [
      "recipe revision, host permission, route table mismatch",
      "tool configuration/chamber enable state와 host dispatch 불일치",
      "lot/wafer/slot ID mapping issue",
      "software revision 또는 customer automation rule 차이"
    ],
    evidence: [
      "host message, recipe ID/revision, chamber route history, wafer ID를 한 packet으로 묶는다.",
      "manual 변경이나 임의 recipe edit 없이 customer automation owner와 대조한다.",
      "same lot의 정상 wafer와 suspect wafer route를 비교한다.",
      "qualification wafer 결과를 route 차이와 연결해 해석한다."
    ],
    stop: "recipe/route identity가 불명확하면 customer wafer 진행을 멈춘다. 승인 없는 recipe edit, permission 우회, host spoof는 금지다.",
    report: "Recipe/route mismatch 가능성이 있어 host message, recipe revision, route history, wafer ID를 묶어 customer automation owner와 확인하겠습니다.",
    next: [
      "tool local recipe와 host recipe ID/revision을 비교한다.",
      "chamber enable/disable 상태와 dispatch rule을 확인한다.",
      "route mismatch가 wafer result에 미친 영향을 customer/process owner와 분리한다.",
      "데이터 보안/권한 policy를 지킨다."
    ],
    publicBasis: "Applied CE 직무 공개자료는 digital analytics와 customer communication을 요구한다. 실제 host command, recipe permission, customer automation policy는 비공개다.",
    good: "정답입니다. route/recipe identity는 wafer result의 해석 기준이므로 customer owner와 evidence로 닫아야 합니다.",
    choices: [
      ["wafer path가 돌았으니 recipe mismatch는 무시한다.", false],
      ["host message, recipe revision, route history, wafer ID를 묶어 owner와 확인한다.", true],
      ["local recipe를 임의 수정해 host와 맞춘다.", false]
    ]
  },
  {
    title: "24V control rail이 부하 켜질 때만 sag한다",
    status: "DVM / control power",
    phase: "Electrical field diagnostic",
    facts: [
      "무부하 측정에서는 24V가 정상인데 solenoid bank가 켜질 때 relay chatter가 난다.",
      "특정 connector 근처를 만지면 alarm 재현성이 달라진다.",
      "최근 cable routing 또는 terminal 작업이 있었다."
    ],
    suspects: [
      "SMPS 용량/health 문제 또는 overload",
      "loose terminal, high resistance contact, voltage drop",
      "coil short, downstream load 문제",
      "0V/common reference 또는 ground bonding issue"
    ],
    evidence: [
      "부하 on 상태에서 supply output, fuse line/load side, terminal, load coil voltage를 비교한다.",
      "closed contact 양단 voltage drop을 측정해 high resistance point를 찾는다.",
      "DVM mode, reference point, expected value, actual value를 기록한다.",
      "live panel 접근은 권한, PPE, 선임 입회, site rule 충족 시에만 한다."
    ],
    stop: "energized work 권한이 없거나 arc/short/stored energy 위험이 있으면 측정하지 않고 LOTO/승인 절차로 전환한다.",
    report: "24V rail은 무부하 정상이나 부하 on에서 sag가 보입니다. supply, fuse, terminal, load coil 구간별 voltage drop을 expected/actual로 기록해 high resistance 또는 overload를 분리하겠습니다.",
    next: [
      "측정 전 schematic 기준 expected value를 먼저 말한다.",
      "meter jack/range/CAT rating과 prove를 완료한다.",
      "부하 on/off 양쪽에서 값을 비교한다.",
      "임의 jumper나 강제 energize는 하지 않는다."
    ],
    publicBasis: "NIOSH/OSHA hazardous energy 자료는 electrical/stored energy control을 강조한다. 실제 panel 접근과 test point는 OEM/site 승인 절차가 필요하다.",
    good: "맞습니다. 전기 진단은 값을 재는 행위보다 expected value와 안전 권한을 세우는 사고가 먼저입니다.",
    choices: [
      ["무부하 24V가 정상이니 전기 문제는 배제한다.", false],
      ["부하 on 상태에서 구간별 voltage drop을 expected/actual로 기록한다.", true],
      ["relay가 떨리면 더 큰 fuse로 교체해본다.", false]
    ]
  },
  {
    title: "Baseline wafer particle burst가 PM recovery 첫 run에서만 나온다",
    status: "PM recovery / seasoning",
    phase: "Maintenance recovery and qualification",
    facts: [
      "PM 직후 첫 baseline wafer에서 particle이 높고 이후 조금 낮아진다.",
      "pumpdown과 transfer alarm은 없지만 wafer map signature가 chamber 내부 source처럼 보인다.",
      "고객은 생산 wafer를 빠르게 넣고 싶어 한다."
    ],
    suspects: [
      "PM disturbance, chamber open 후 residual particle",
      "seasoning 또는 burn-in 부족",
      "wafer support, edge ring, gas inlet, exhaust path disturbance",
      "metrology repeatability 또는 incoming wafer effect"
    ],
    evidence: [
      "PM 작업 부위와 particle map 위치/형태를 비교한다.",
      "first wafer, second wafer, post-seasoning baseline을 분리해 trend를 본다.",
      "chamber clean/seasoning completion evidence와 lot release criteria를 customer owner와 대조한다.",
      "particle이 낮아지는 추세라도 stop condition을 customer/process owner와 명확히 한다."
    ],
    stop: "particle burst가 spec을 넘거나 wafer scratch/break, gas/exhaust/vacuum abnormal이 동반되면 production release를 hold한다.",
    report: "PM recovery 첫 wafer에서 particle burst가 관찰됩니다. PM 작업 부위, wafer map, seasoning 전후 baseline trend를 묶어 production release 가능 여부를 customer owner와 판단하겠습니다.",
    next: [
      "baseline sequence를 고객과 합의한다.",
      "particle map과 chamber geometry를 연결해 suspect source를 좁힌다.",
      "production wafer 투입 전 pass evidence와 남은 risk를 문장으로 정리한다.",
      "PM 직후 정상화 경향을 근거 없이 보장하지 않는다."
    ],
    publicBasis: "공개 EPI 자료는 low defect와 chamber uniformity가 핵심 품질 지표임을 보여준다. 실제 seasoning recipe와 acceptance limit은 현장/OEM 문서만 따른다.",
    good: "정답입니다. PM recovery는 첫 wafer만 보지 말고 trend, source geometry, release risk를 같이 판단해야 합니다.",
    choices: [
      ["두 번째부터 낮아질 것 같으니 생산 wafer를 바로 넣는다.", false],
      ["PM 작업 부위, wafer map, seasoning 전후 baseline trend를 묶어 release risk를 판단한다.", true],
      ["particle은 metrology noise라고 보고 무시한다.", false]
    ]
  },
  {
    title: "Abatement trip이 qualification 중간에 발생한다",
    status: "Abatement / byproduct control",
    phase: "Process gas qualification",
    facts: [
      "qualification wafer 진행 중 abatement fault 또는 exhaust related alarm이 발생했다.",
      "tool chamber pressure도 짧게 흔들렸다.",
      "사용 chemistry는 byproduct exhaust와 scrubber readiness가 중요하다."
    ],
    suspects: [
      "abatement system fault, exhaust flow instability",
      "foreline/pump/exhaust restriction",
      "gas flow transient와 abatement capacity mismatch",
      "facility signal mapping 또는 maintenance 상태"
    ],
    evidence: [
      "tool alarm time, chamber pressure, MFC actual, pump/foreline, abatement local log를 같은 시간축으로 맞춘다.",
      "facility/abatement owner와 local panel state, maintenance history를 확인한다.",
      "wafer result 영향 여부를 metrology와 연결한다.",
      "abatement bypass, trip setpoint, internal logic은 공개 웹에 넣지 않는다."
    ],
    stop: "abatement fault가 있으면 toxic/corrosive/flammable gas process를 계속하지 않는다. exhaust unsafe 가능성이 있으면 EHS escalation이 우선이다.",
    report: "Qualification 중 abatement trip과 chamber pressure disturbance가 같은 시간대에 발생했습니다. tool trend와 abatement local log를 owner witness로 확인하고 wafer 영향 여부를 분리하겠습니다.",
    next: [
      "process를 hold하고 area/site safety condition을 확인한다.",
      "abatement owner, facility owner, senior CE를 연결한다.",
      "tool trace와 local abatement log를 timestamp로 정렬한다.",
      "wafer/metrology result를 affected/unaffected로 구분한다."
    ],
    publicBasis: "SEMI S6와 OSHA/NIOSH류 안전자료는 exhaust/abatement control의 중요성을 설명한다. 실제 abatement setpoint, bypass, trip logic은 비공개/위험 정보다.",
    good: "맞습니다. abatement trip은 생산성 문제가 아니라 safety envelope 문제로 먼저 분류해야 합니다.",
    choices: [
      ["fault가 reset되면 같은 wafer lot을 계속 진행한다.", false],
      ["process를 hold하고 tool trace와 abatement local log를 owner witness로 대조한다.", true],
      ["abatement trip signal을 무시하도록 임시 처리한다.", false]
    ]
  },
  {
    title: "RTP wafer rotation abnormal이 trace non-uniformity와 겹친다",
    status: "RTP rotation / uniformity",
    phase: "Thermal uniformity diagnostic",
    facts: [
      "RTP trace는 평균 temperature는 맞지만 within-wafer uniformity가 나빠졌다.",
      "wafer rotation feedback이 간헐적으로 흔들린다.",
      "최근 chamber clean 또는 rotation assembly 관련 점검이 있었다."
    ],
    suspects: [
      "rotation drive, bearing/levitation, motor feedback issue",
      "wafer centering 또는 support/contact issue",
      "sensor/pyrometer sampling과 rotation synchronization 문제",
      "cooling 또는 chamber window condition 변화"
    ],
    evidence: [
      "rotation feedback, temperature zone trace, wafer map radial signature를 비교한다.",
      "wafer centering/alignment와 support contact를 승인된 dry run으로 확인한다.",
      "정상 chamber 또는 PM 전 baseline과 uniformity map을 overlay한다.",
      "mechanical access는 LOTO/stored energy/site procedure를 따른다."
    ],
    stop: "wafer slip, rotation unstable, mechanical contact, high-temperature hazard가 의심되면 run을 중지한다.",
    report: "RTP 평균 온도는 맞지만 rotation feedback과 uniformity map이 함께 흔들립니다. rotation, wafer centering, zone trace, chamber window/cooling을 분리해 확인하겠습니다.",
    next: [
      "zone trace와 wafer map을 같은 orientation으로 비교한다.",
      "rotation feedback과 alarm timestamp를 확인한다.",
      "mechanical inspection은 승인된 안전 상태에서만 한다.",
      "temperature target 보정으로 uniformity 문제를 덮지 않는다."
    ],
    publicBasis: "Applied Radiance Plus 공개자료는 wafer rotation과 multi-point temperature control을 강조한다. 실제 rotation calibration과 chamber service 절차는 비공개다.",
    good: "좋습니다. 평균값이 정상이어도 wafer uniformity와 rotation evidence를 같이 봐야 합니다.",
    choices: [
      ["평균 온도가 맞으므로 pass로 본다.", false],
      ["rotation feedback, zone trace, wafer map radial signature를 함께 비교한다.", true],
      ["uniformity는 metrology 문제라고 단정한다.", false]
    ]
  }
);

const questions = [
  {
    q: "RTP의 가장 가까운 설명은?",
    a: ["Wafer를 짧은 시간 목표 온도로 가열해 물성을 바꾸는 열처리", "박막을 물리적으로 스퍼터링하는 공정", "웨이퍼를 화학 용액으로 세정하는 공정"],
    c: 0,
    e: "RTP는 anneal 계열로 dopant activation이나 film property 변화처럼 시간-온도 예산이 중요한 공정에 사용됩니다."
  },
  {
    q: "Epitaxy에서 표면 pre-clean과 queue time이 중요한 이유는?",
    a: ["표면 오염과 native oxide가 결정 성장 품질에 영향을 주기 때문", "장비 외관 청소 시간을 줄이기 위해서", "전원 소비량만 낮추기 위해서"],
    c: 0,
    e: "EPI는 결정성 성장 품질이 핵심이라 계면 오염, 표면 상태, 공정 전 대기 시간이 결과에 큰 영향을 줄 수 있습니다."
  },
  {
    q: "CE가 고객에게 장애 상황을 공유할 때 가장 좋은 방식은?",
    a: ["확인된 사실, 영향, 다음 확인 액션, 예상 시간을 분리한다", "추정 원인을 확정처럼 말한다", "내부 알람 코드를 그대로 나열한다"],
    c: 0,
    e: "현장 커뮤니케이션은 신뢰가 중요합니다. 사실과 가설을 분리하고 다음 액션을 명확히 말하는 습관이 좋습니다."
  },
  {
    q: "PM 직후 문제가 생겼을 때 우선순위가 높은 접근은?",
    a: ["작업 전후 변경점과 손댄 부위를 먼저 검토한다", "관련 없는 부품부터 모두 교체한다", "recipe만 바꿔서 통과시키려 한다"],
    c: 0,
    e: "PM 직후에는 변경점 기반 점검이 강력합니다. seal, connector, valve state, calibration 상태를 우선 확인합니다."
  },
  {
    q: "Tool hook-up 단계에서 CE가 가장 경계해야 할 태도는?",
    a: ["승인 전 임의 연결/우회로 일정을 맞추려는 태도", "POC label과 drawing revision을 확인하는 태도", "고객 facility owner와 witness test를 진행하는 태도"],
    c: 0,
    e: "설치 일정이 급해도 임의 연결이나 interlock 우회는 금물입니다. site rule, OEM manual, 고객 승인 절차가 우선입니다."
  },
  {
    q: "SEMI S2/S8/S6를 CE 관점으로 연결하면?",
    a: ["장비 EHS, 인체공학, exhaust ventilation 관점의 안전 축", "wafer recipe 이름 규칙", "반도체 회계 처리 기준"],
    c: 0,
    e: "SEMI S2는 장비 EHS, S8은 ergonomics, S6는 exhaust ventilation 관련 공개 표준 축으로 이해하면 좋습니다."
  },
  {
    q: "RTP에서 closed-loop temperature control이 중요한 이유는?",
    a: ["wafer 온도 편차를 줄여 repeatability와 uniformity를 확보하기 위해", "cleanroom 조도를 높이기 위해", "robot teaching 시간을 줄이기 위해"],
    c: 0,
    e: "Applied 공개 RTP 페이지들은 multi-point temperature measurement와 closed-loop control을 repeatability/uniformity의 핵심으로 설명합니다."
  },
  {
    q: "EPI 장비에서 vacuum platform 위 pre-clean 통합의 공개적으로 설명된 장점은?",
    a: ["queue time과 계면 오염을 줄여 성장 품질에 도움을 줄 수 있다", "전원 공사를 없앤다", "cleanroom PPE가 필요 없어진다"],
    c: 0,
    e: "Applied의 Centura Prime Epi 공개 설명은 pre-clean 통합이 vacuum break를 줄이고 interfacial contamination을 낮추는 방향이라고 소개합니다."
  }
];

questions.push(
  {
    q: "First gas introduction 전 exhaust/abatement ready가 간헐적으로 fail한다. CE의 우선 행동은?",
    a: ["ready가 들어오는 순간을 기다려 gas를 열어본다", "facility actual state와 tool input을 고객 owner witness로 대조하고 hold한다", "software alarm 이름만 기록하고 다음 단계로 진행한다"],
    c: 1,
    e: "gas safety에서는 signal 하나보다 실제 exhaust/abatement 상태, owner witness, site rule이 우선입니다. interlock 우회나 임의 진행은 금지 영역입니다."
  },
  {
    q: "EPI chamber matching drift를 설명할 때 가장 좋은 evidence package는?",
    a: ["wafer result 캡처만 모은 파일", "metrology 조건, wafer ID, chamber path, temperature/pressure/MFC trend를 시간축으로 묶은 자료", "선임 CE가 그럴 것 같다고 말한 추정"],
    c: 1,
    e: "matching 문제는 결과와 원인 후보를 같은 시간축에 올려야 합니다. metrology 조건이 다르면 tool drift처럼 보일 수 있으므로 먼저 고정해야 합니다."
  },
  {
    q: "Selective EPI에서 unwanted deposition이 보일 때 초보자가 가장 자주 놓치는 관점은?",
    a: ["surface preparation, pre-clean, pattern loading을 tool fault와 분리하는 것", "장비 이름을 외우는 것", "문제 wafer를 많이 돌려 평균을 내는 것"],
    c: 0,
    e: "selective growth는 표면 상태와 chemistry balance에 민감합니다. blank/pattern split, pre-clean path, queue time, chamber history를 분리해야 합니다."
  },
  {
    q: "RTP trace overshoot가 보일 때 가장 위험한 대응은?",
    a: ["정상 trace와 overlay한다", "lamp command와 measured temperature를 같이 본다", "recipe target이나 control parameter를 임의 변경해 alarm만 없앤다"],
    c: 2,
    e: "RTP는 thermal budget이 공정 결과에 직접 연결됩니다. 임의 조정은 root cause를 가리고 wafer risk를 키울 수 있습니다."
  },
  {
    q: "handover에서 고객에게 '왜 pass인지' 설명하는 좋은 방식은?",
    a: ["checklist pass만 보여준다", "각 test가 제거한 risk, 남은 open item, owner, next action을 설명한다", "비공개 recipe와 acceptance limit을 교육 웹에 모두 공개한다"],
    c: 1,
    e: "handover는 단순 서명이 아니라 risk retirement 설명입니다. 공개 학습 범위와 site-specific 문서를 분리해야 합니다."
  },
  {
    q: "공개 학습 웹에 넣지 말아야 하는 정보는?",
    a: ["EPI가 silicon precursor와 dopant chemistry를 쓴다는 개념", "OSHA/NIOSH 수준의 gas hazard 설명", "고객 recipe, valve sequence, detector setpoint, interlock bypass 절차"],
    c: 2,
    e: "공개자료 기반 학습은 원리와 사고 프레임까지가 적절합니다. 실제 sequence, setpoint, bypass, 고객 spec은 안전과 보안을 위해 제외해야 합니다."
  }
);

const flashcards = [
  ["PM / CM", "Preventive Maintenance는 예방 정비, Corrective Maintenance는 장애/이상 발생 후 복구 정비입니다."],
  ["Interlock", "안전 조건이 맞지 않을 때 장비 동작을 제한하는 보호 체인입니다."],
  ["MFC", "Mass Flow Controller. 공정 가스 유량을 setpoint에 맞춰 제어합니다."],
  ["Pumpdown", "Chamber나 line을 목표 압력까지 낮추는 과정입니다."],
  ["Acceptance", "설치 후 고객/내부 기준에 맞게 장비 성능과 안전 상태를 확인하는 단계입니다."],
  ["POC", "Point of Connection. 장비 utility와 fab facility가 만나는 연결 지점입니다."],
  ["PLS", "Process Lateral Systems. base build와 tool install 사이에서 utility를 장비 근처까지 끌고 오는 시설 단계로 설명됩니다."],
  ["SEMI S2", "Semiconductor manufacturing equipment의 EHS guideline 축입니다."],
  ["SEMI S6", "Semiconductor manufacturing equipment exhaust ventilation 관련 guideline 축입니다."],
  ["SEMI S8", "장비 ergonomics 평가와 관련된 guideline 축입니다."],
  ["Abatement", "공정 부산물이나 유해 배출을 처리하는 facility/support system입니다."],
  ["Pyrometer", "비접촉 방식으로 wafer/chamber 온도 관련 신호를 읽는 온도 측정 장치입니다."],
  ["Spike Anneal", "짧은 thermal budget으로 높은 온도 피크를 사용하는 RTP anneal 방식입니다."],
  ["Selective Epi", "원하는 영역에 선택적으로 epitaxial film을 성장시키는 응용입니다."]
];

const installPhases = [
  {
    phase: "0",
    title: "Pre-install / Site Readiness",
    points: [
      "고객 POC와 OEM install manual의 utility 요구사항을 대조한다.",
      "floor load, footprint, service clearance, seismic/anchoring 요구를 확인한다.",
      "power, CDA, N2, process vacuum, house exhaust, PCW/chiller, DI water, network, abatement readiness를 분리해 추적한다.",
      "long lead item, missing kit, gas cabinet, foreline, pump, chiller, scrubber interface 같은 blocker를 punch list로 관리한다."
    ],
    questions: [
      "어떤 utility가 customer scope이고 어떤 것이 OEM scope인가?",
      "turn-on 전에 고객 EHS sign-off가 필요한 항목은 무엇인가?",
      "temporary power나 temporary exhaust 사용이 허용되는가?"
    ]
  },
  {
    phase: "1",
    title: "Move-in / Placement",
    points: [
      "crate inspection, shock/tilt indicator, damage photo log를 남긴다.",
      "cleanroom 반입 동선, rigging, ceiling height, door opening, floor protection을 확인한다.",
      "tool leveling, module alignment, service access, emergency off 접근성을 확인한다.",
      "고객 fab traffic rule, escort rule, clean protocol을 우선한다."
    ],
    questions: [
      "반입 전 pre-clean 또는 wipe-down 기준은?",
      "rigging 업체와 OEM CE의 책임 경계는?",
      "move-in 중 deviation 발생 시 stop authority는 누구에게 있는가?"
    ]
  },
  {
    phase: "2",
    title: "Hook-up / Facilities Tie-in",
    points: [
      "각 POC label과 drawing revision을 맞춘 뒤 연결한다.",
      "전원은 voltage/phase/grounding/LOTO, gas는 purge/leak check, exhaust는 flow/path, PCW는 supply/return을 확인한다.",
      "vacuum foreline, pump exhaust, abatement interface는 역류/condensation/pressure drop 리스크를 본다.",
      "연결 후 as-built mark-up과 leak/pressure/electrical test 기록을 남긴다."
    ],
    questions: [
      "라인별 pressure/flow acceptance limit는 어떤 문서 기준인가?",
      "gas line 변경 후 required purge cycle과 release authority는?",
      "interlock verification은 OEM, customer, contractor 중 누가 witness하는가?"
    ]
  },
  {
    phase: "3",
    title: "Power-on / Subsystem Bring-up",
    points: [
      "E-stop, EMO, doors, gas box, exhaust, cooling, vacuum interlock을 먼저 검증한다.",
      "controller boot, I/O status, sensor scaling, PLC/host communication을 확인한다.",
      "pumpdown, leak check, MFC response, valve actuation, robot home, wafer path dry run을 순차적으로 본다.",
      "첫 energization은 senior CE와 고객 승인 절차 안에서 진행한다."
    ],
    questions: [
      "어떤 interlock은 hardwired이고 어떤 것은 software 상태인가?",
      "subsystem test 실패 시 escalation 기준은?",
      "first wafer 전에 반드시 완료해야 하는 calibration은?"
    ]
  },
  {
    phase: "4",
    title: "Qualification / Handover",
    points: [
      "baseline data, particle/defect, temperature uniformity, thickness/resistivity, transfer reliability 같은 acceptance 항목을 문서화한다.",
      "PM schedule, spare parts, known issue, open punch item을 고객과 공유한다.",
      "고객 보고는 fact, impact, action, owner, ETA로 정리한다.",
      "handover 후 early-life failure를 대비해 trend를 촘촘히 본다."
    ],
    questions: [
      "acceptance fail 시 rework와 retest 범위는?",
      "customer sign-off에 필요한 deliverable 목록은?",
      "open issue가 production release를 막는지 아닌지 판단권자는?"
    ]
  }
];

const facilitySystems = [
  {
    title: "Electrical / Grounding",
    concept: "장비 전원, UPS/controls, grounding, bonding, LOTO는 power-on의 출발점입니다.",
    watch: ["voltage/phase/frequency", "ground continuity", "panel labeling", "arc flash/PPE boundary", "EMO/E-stop chain"],
    ask: ["전원 투입 승인자", "energized work 허용 범위", "LOTO 적용 지점"]
  },
  {
    title: "Process Gas / N2 / CDA",
    concept: "EPI/RTP 주변에는 purge, pneumatic actuation, process chemistry가 연결됩니다.",
    watch: ["MFC supply pressure", "regulator setting", "valve state", "purge completion", "gas cabinet/abatement interlock"],
    ask: ["SDS와 gas hazard class", "line release 절차", "leak test witness 기준"]
  },
  {
    title: "Vacuum / Pump / Foreline",
    concept: "process chamber와 transfer 환경의 압력 안정성은 공정 재현성에 직결됩니다.",
    watch: ["pumpdown curve", "base pressure", "foreline routing", "pump exhaust", "backstreaming/condensation risk"],
    ask: ["pump ownership", "exhaust tie-in point", "leak rate acceptance 기준"]
  },
  {
    title: "Exhaust / Abatement",
    concept: "유해/부식/가연성 부산물을 안전하게 배출하고 처리하는 시스템입니다.",
    watch: ["exhaust flow", "scrubber ready", "pressure drop", "duct material compatibility", "alarm interface"],
    ask: ["SEMI S6 관련 site 기준", "abatement trip 시 tool response", "maintenance lockout boundary"]
  },
  {
    title: "Cooling / PCW / Chiller",
    concept: "lamp, chamber, power electronics, pump 주변 열부하를 안정적으로 제거합니다.",
    watch: ["supply/return orientation", "flow switch", "temperature stability", "leak sensor", "condensation"],
    ask: ["water quality", "min/max flow", "chiller alarm escalation"]
  },
  {
    title: "Host / Data / Digital Analytics",
    concept: "CE는 tool log, trend, sensor data, recipe event를 근거로 troubleshooting합니다.",
    watch: ["host communication", "time sync", "alarm history", "trace data", "recipe change control"],
    ask: ["데이터 접근 권한", "고객 보안 정책", "로그 반출 승인 절차"]
  }
];

const gasProfiles = [
  {
    name: "Silane (SiH4)",
    use: "Silicon source gas. 공개 자료에서 CVD/EPI silicon film deposition에 쓰이는 silicon precursor로 자주 언급됩니다.",
    hazards: ["Pyrophoric", "Flammable", "Reactive"],
    ce: [
      "공기 누출 시 자연발화 위험을 가정하고 gas detection, exhaust, abatement, purge/interlock 상태를 최우선으로 확인합니다.",
      "SEMI S18은 flammable silicon compounds의 storage, handling, use from supply to abatement 관점의 guideline으로 언급됩니다.",
      "작업자는 냄새나 육안이 아니라 detector, pressure, purge status, facility ready signal 같은 계측값에 의존해야 합니다."
    ]
  },
  {
    name: "Dichlorosilane / DCS (SiH2Cl2)",
    use: "Silicon source gas. 공개 EPI 자료에서 DCS가 silicon source gas로 쓰이고 hydrogen carrier, HCl selectivity와 함께 언급됩니다.",
    hazards: ["Flammable", "Corrosive byproducts", "Reactive"],
    ce: [
      "chlorosilane 계열은 수분/공기 노출, 부식성 부산물, exhaust/abatement 적합성을 함께 봅니다.",
      "gas line release, purge complete, leak check witness, scrubber ready 없이는 qualification을 진행하지 않는 사고가 필요합니다.",
      "MFC actual mismatch나 pressure instability가 있으면 supply, regulator, restriction, valve, purge history를 분리합니다."
    ]
  },
  {
    name: "Trichlorosilane / TCS (SiHCl3)",
    use: "Silicon precursor. 공개 silicon precursor 자료에서 silane, DCS, TCS, silicon tetrachloride가 공통 precursor로 언급됩니다.",
    hazards: ["Flammable", "Corrosive", "Moisture reactive"],
    ce: [
      "수분과 반응하는 chlorosilane 계열은 line integrity, dry purge, compatible exhaust/abatement가 중요합니다.",
      "install 시 실제 물성/취급 기준은 SDS와 site gas specification으로 확인해야 합니다.",
      "qualification에서는 공정 결과보다 먼저 facility ready, leak integrity, alarm response가 성립해야 합니다."
    ]
  },
  {
    name: "Silicon Tetrachloride / STC (SiCl4)",
    use: "Chlorosilane/silicon precursor family. 공개 화학 안전 자료에서는 물과 반응해 HCl을 만들고, 전자재료/실리콘 화학 원료로 언급됩니다.",
    hazards: ["Corrosive", "Moisture reactive", "Toxic/irritant byproducts"],
    ce: [
      "수분 노출 시 부식성 byproduct와 fume risk를 전제로 dry purge, leak integrity, exhaust path를 봅니다.",
      "line material, regulator/MFC compatibility, scrubber chemistry, downstream corrosion risk를 SDS/site spec과 대조합니다.",
      "실제 EPI option에서 사용되는지, 어떤 농도/공급 방식인지는 고객 gas matrix와 장비 BOM 없이는 단정하지 않습니다."
    ]
  },
  {
    name: "Germane (GeH4)",
    use: "SiGe/Ge epitaxy 또는 germanium-containing film precursor 후보입니다. 공개 안전 자료는 germane을 전자재료 용도와 연결하고 독성/가연성을 설명합니다.",
    hazards: ["Highly toxic", "Flammable", "Reactive hydride"],
    ce: [
      "PH3/AsH3/B2H6처럼 toxic hydride mindset으로 detector, cabinet exhaust, purge, abatement, emergency response를 확인합니다.",
      "SiGe/Ge option이 있으면 gas panel, residual memory, MFC range, chamber seasoning, metrology 기준이 달라질 수 있습니다.",
      "실제 사용 여부와 농도는 고객 recipe, 장비 option, site SDS 없이는 단정하지 않습니다."
    ]
  },
  {
    name: "Hydrogen (H2)",
    use: "Carrier/reducing/purge gas. EPI 문헌에서 hydrogen carrier gas가 흔히 언급됩니다.",
    hazards: ["Flammable", "Explosion risk", "Asphyxiation risk"],
    ce: [
      "누출 시 넓은 flammable range와 ignition risk를 고려합니다.",
      "purge, ventilation, detector, exhaust path, gas cabinet 상태를 확인합니다.",
      "RTP/EPI 주변 thermal source와 함께 존재할 수 있어 hot surface/ignition control 사고가 필요합니다."
    ]
  },
  {
    name: "Hydrogen Chloride / HCl",
    use: "EPI selectivity/etch/pre-clean 관련 문헌에서 polysilicon formation 억제나 etch chemistry로 언급됩니다.",
    hazards: ["Toxic", "Corrosive", "Irritant"],
    ce: [
      "OSHA semiconductor 자료는 hydrogen chloride 같은 corrosive exhaust gas가 눈, 피부, 점막, 호흡기에 자극/손상을 줄 수 있다고 설명합니다.",
      "duct/scrubber compatibility, leak alarm, local exhaust, PPE/site permit를 확인합니다.",
      "부식성 gas는 leak뿐 아니라 downstream corrosion과 sensor/valve reliability에도 영향을 줍니다."
    ]
  },
  {
    name: "Oxygen / Ozone / N2O",
    use: "RTP oxidation, RadOx, ambient control, oxynitride chemistry 등 chamber option에 따라 산화/질화 chemistry로 연결될 수 있습니다.",
    hazards: ["Oxidizer", "Reactive", "Respiratory irritant for ozone"],
    ce: [
      "fuel gas와 oxidizer를 같은 사고로 보지 않고 segregation, purge, exhaust, interlock, analyzer/ambient control을 분리해 확인합니다.",
      "O2 ppm/ambient control은 RTP repeatability와 safety 모두에 연결됩니다.",
      "ozone/radical oxidation option은 leak response, destructor/scrubber, seal/material compatibility를 site spec으로 확인합니다."
    ]
  },
  {
    name: "Ammonia (NH3)",
    use: "nitridation 또는 thermal/process chemistry option에서 nitrogen-containing process gas로 연결될 수 있습니다.",
    hazards: ["Toxic", "Corrosive/Irritant", "Pressure energy"],
    ce: [
      "NH3는 냄새에 의존하지 않고 detector, ventilation, scrubber compatibility, PPE/permit boundary를 확인합니다.",
      "RTP/thermal chemistry option에서는 gas line release와 chamber exhaust compatibility가 qualification 전제입니다.",
      "actual line use는 장비 option과 customer recipe에 따라 달라지므로 official gas matrix로만 확정합니다."
    ]
  },
  {
    name: "Phosphine (PH3)",
    use: "n-type dopant gas. 공개 자료에서 semiconductor dopant gas로 phosphine이 반복적으로 언급됩니다.",
    hazards: ["Highly toxic", "Flammable", "Pyrophoric/Reactive concern"],
    ce: [
      "아주 낮은 농도에서도 위험하다는 전제로 gas cabinet, detector, exhaust, abatement, emergency response를 확인합니다.",
      "공개 안전 자료들은 phosphine을 독성·가연성 gas로 설명하며, OSHA PEL 0.3 ppm 같은 낮은 기준이 언급됩니다.",
      "qualification에서 dopant gas response를 보기 전에 gas safety release와 site EHS 승인 상태가 선행되어야 합니다."
    ]
  },
  {
    name: "Arsine (AsH3)",
    use: "n-type dopant gas. 공개 산업위생/반도체 자료에서 arsine, phosphine, diborane이 주요 dopant gas로 언급됩니다.",
    hazards: ["Highly toxic", "Flammable", "Acute health risk"],
    ce: [
      "냄새나 감각에 의존하지 않습니다. detector, cabinet exhaust, purge status, alarm response가 핵심입니다.",
      "residual dopant와 chamber memory effect가 공정 profile에도 영향을 줄 수 있다는 공개 연구 맥락을 이해합니다.",
      "gas 작업은 반드시 senior/site EHS 승인과 정해진 permit 체계 안에서만 접근합니다."
    ]
  },
  {
    name: "Diborane (B2H6)",
    use: "p-type boron dopant gas. EPI/CVD doping 공개 자료에서 diborane이 dopant source로 언급됩니다.",
    hazards: ["Highly toxic", "Flammable", "Pyrophoric/Reactive concern"],
    ce: [
      "고독성 metal hydride 계열로 취급하며, line purge와 gas detector 신뢰도가 매우 중요합니다.",
      "MFC나 valve issue가 발생해도 임의 조작 대신 gas owner, site EHS, senior CE escalation이 우선입니다.",
      "qualification data에서 dopant response 이상은 delivery stability, residual gas, recipe timing, chamber condition과 연결해 봅니다."
    ]
  },
  {
    name: "Nitrogen (N2)",
    use: "Purge/inerting/support gas. Fab 전반에서 흔한 utility입니다.",
    hazards: ["Asphyxiation", "Pressure energy"],
    ce: [
      "독성 gas가 아니어도 산소 결핍 위험이 있습니다.",
      "purge 완료 여부, pressure regulator, line label, vent path를 확인합니다.",
      "N2는 안전을 만드는 gas이기도 하지만 잘못 쓰면 산소 결핍이나 pressure hazard가 됩니다."
    ]
  },
  {
    name: "Argon / Helium",
    use: "Carrier, purge, backside cooling, dilution 등 다양한 support 용도 가능성이 있습니다.",
    hazards: ["Asphyxiation", "Pressure energy"],
    ce: [
      "불활성 gas도 밀폐 공간에서는 산소 결핍 위험을 만듭니다.",
      "line label, regulator, flow indication, vent/exhaust path를 확인합니다.",
      "gas 종류가 안전하다는 뜻과 작업이 안전하다는 뜻은 다릅니다."
    ]
  }
];

const gasInstallChecks = [
  "Gas matrix를 먼저 만든다: gas name, hazard class, cabinet/source, POC, detector, exhaust, abatement, interlock, owner.",
  "SDS와 site gas specification을 읽고, 독성/가연성/부식성/산소결핍/압력 에너지 위험을 분리한다.",
  "toxic hydride, chlorosilane, fuel gas, oxidizer, inert gas를 한 묶음으로 보지 말고 incompatible gas segregation을 확인한다.",
  "hook-up 전에는 drawing revision, P&ID, line label, flow direction, compatible materials, regulator/MFC range를 확인한다.",
  "gas line release는 customer facility owner, site EHS, OEM senior CE의 승인 체계 안에서 진행한다.",
  "source-to-abatement walkdown을 한다: cylinder/cabinet -> VMB/VMP -> tool gas panel -> chamber/foreline/exhaust -> abatement -> monitor.",
  "leak check와 purge 완료 증거는 말이 아니라 기록으로 남긴다.",
  "abatement ready, exhaust flow, gas detector health, emergency shutoff, interlock response를 gas introduction 전에 확인한다.",
  "실제 valve sequence, purge cycle, detector setpoint, pressure/flow limit는 앱이 아니라 현장 공식 문서만 따른다."
];

const gasQualificationChecks = [
  "첫 gas qualification은 process result보다 safety envelope가 먼저다: detector normal, exhaust/abatement ready, no leak, interlock verified.",
  "MFC setpoint와 actual, supply pressure, valve response, purge step timing, chamber pressure response를 trend로 확인한다.",
  "dopant gas는 residual/memory effect와 chamber seasoning 가능성을 이해하고, 공정 엔지니어/선임 CE와 기준 data를 비교한다.",
  "HCl/chlorosilane 계열은 corrosion, exhaust compatibility, downstream abatement condition을 함께 본다.",
  "silane/hydrogen 계열은 ignition source, ventilation, emergency shutdown path, gas detection alarm response를 반드시 고려한다.",
  "process gas 문제가 아닌 support utility(CDA/N2/PCW/exhaust/abatement) 문제가 gas symptom처럼 보일 수 있음을 분리한다.",
  "first gas introduction 이후 alarm history, detector health, exhaust/abatement trend, tool event log를 같은 시간축으로 맞춘다.",
  "qualification 실패 시 임의 recipe 보정이 아니라 변경점, gas delivery, vacuum, temperature, sensor, metrology를 분리해 보고한다.",
  "고객 보고는 gas name을 숨기지 말고 hazard, 현재 안전 상태, 확인된 계측값, 다음 승인 필요 항목을 분명히 말한다."
];

const processVisualFlows = [
  {
    id: "epi-sige",
    kicker: "EPI / CVD Growth",
    title: "EPI: Si / SiGe 결정성 막이 한 층씩 자라는 흐름",
    summary: "대표 공개자료 기반으로 H2 carrier, silicon precursor, Ge precursor, dopant gas, HCl selectivity가 어떤 역할을 하는지 보여줍니다. 실제 recipe가 아니라 장비 안에서 무슨 일이 일어나는지 이해하는 mental model입니다.",
    publicBasis: "Applied Centura Prime/Xtera/Epi 200mm, Stanford Centura Epi public tool page, 공개 CVD/Epitaxy 원리 자료",
    sources: [
      ["Centura Prime Epi", "https://www.appliedmaterials.com/us/en/product-library/centura-prime-epi.html"],
      ["Centura Epi 200mm", "https://www.appliedmaterials.com/us/en/product-library/centura-epi-200mm.html"],
      ["Stanford AMAT Centura Epi", "https://snfguide.stanford.edu/guide/equipment/amat-centurion-epitaxial-system-epi2"],
      ["Epitaxy mechanism", "https://en.wikipedia.org/wiki/Epitaxy"]
    ],
    gasMatrix: [
      ["H2", "carrier/reducing ambient", "precursor를 실어 보내고 표면 반응 분위기를 만듭니다. 가연성이라 ignition/exhaust/ventilation이 핵심입니다."],
      ["DCS / SiH4 / TCS", "Si source", "Si 원자를 wafer 표면에 공급해 crystal layer의 재료가 됩니다. 실제 사용 gas는 장비 option과 고객 recipe로 확인합니다."],
      ["GeH4", "Ge source", "SiGe 또는 Ge layer option에서 Ge를 공급하는 후보입니다. toxic/flammable hydride로 다룹니다."],
      ["PH3 / AsH3 / B2H6", "dopant source", "n-type/p-type 전기 특성을 만들기 위한 dopant 후보입니다. 독성 gas 관리가 먼저입니다."],
      ["HCl", "selectivity / etch balance", "원치 않는 위치의 증착을 억제하거나 표면/부산물 균형에 관여하는 공개 EPI 문헌상의 핵심 gas입니다."],
      ["N2 / Ar", "purge / inert support", "공정 전후 line과 chamber를 안정화하는 support gas입니다. 산소결핍 위험을 함께 봅니다."]
    ],
    steps: [
      {
        title: "1. Wafer Load / Pumpdown",
        subtitle: "FOUP에서 EFEM, Load Lock을 지나 vacuum boundary로 들어갑니다.",
        area: "loadlock",
        action: "대기압 쪽 wafer가 load lock에서 pumpdown되고 transfer module로 넘어갈 준비를 합니다.",
        gas: "N2 purge/vent support, vacuum pump",
        pressure: "대기압 -> 저압/vacuum 전환",
        pump: "ON: LL pumpdown curve 확인",
        purge: "N2 purge/vent path ready",
        exhaust: "Pump exhaust / abatement standby",
        temp: "process 전 상온 또는 안정화",
        waferEffect: "막은 아직 쌓이지 않고, 오염 없이 chamber로 들어갈 준비를 합니다.",
        ceWatch: "door seal, pumpdown time, pressure gauge, slit valve open 조건, wafer mapping을 봅니다.",
        gasTags: ["N2", "Vacuum"],
        layers: [
          ["Si wafer", "결정성 기판", "#748091", 46],
          ["Native oxide / contamination", "공정 전 제거 대상", "#c6d7df", 8]
        ]
      },
      {
        title: "2. Pre-clean / Surface Reset",
        subtitle: "EPI 전 계면을 깨끗하게 만들어 crystal growth가 시작될 표면을 준비합니다.",
        area: "preclean",
        action: "공개 Applied 자료는 integrated pre-clean이 vacuum break와 interface contamination을 줄이는 방향을 강조합니다.",
        gas: "H2 bake 또는 option별 radical/pre-clean chemistry",
        pressure: "저압 또는 chamber별 안정 압력",
        pump: "ON: byproduct와 residual을 계속 제거",
        purge: "전후 N2/H2 purge로 residual 관리",
        exhaust: "Corrosive/reactive byproduct는 exhaust/abatement로 이동",
        temp: "surface cleaning에 맞춘 thermal condition",
        waferEffect: "native oxide와 carbon/oxygen contamination을 줄여 epi-substrate interface를 준비합니다.",
        ceWatch: "pre-clean chamber health, queue time, vacuum transfer, detector/exhaust ready를 봅니다.",
        gasTags: ["H2", "Pre-clean", "Purge"],
        layers: [
          ["Si wafer", "결정성 기판", "#748091", 46],
          ["Clean Si surface", "성장 준비 표면", "#9ff6d0", 8]
        ]
      },
      {
        title: "3. Heat / Stabilize",
        subtitle: "Susceptor와 wafer가 성장 가능한 thermal 상태로 안정화됩니다.",
        area: "pm",
        action: "lamp/heater와 temperature control이 wafer 표면 반응 속도와 uniformity를 좌우합니다.",
        gas: "H2 carrier 또는 inert stabilization",
        pressure: "공정 압력 안정화",
        pump: "ON: pressure controller와 pump balance",
        purge: "line purge 완료 상태 유지",
        exhaust: "carrier gas와 잔류 gas가 exhaust로 배출",
        temp: "ramp/settle 후 안정화",
        waferEffect: "아직 주요 막 성장 전입니다. 표면이 반응 준비 상태로 갑니다.",
        ceWatch: "temperature trace, pyrometry/window, rotation, pressure stability, MFC zero/response를 봅니다.",
        gasTags: ["H2", "Heat", "Stabilize"],
        layers: [
          ["Si wafer", "결정성 기판", "#748091", 46],
          ["Clean Si surface", "활성 표면", "#9ff6d0", 8]
        ]
      },
      {
        title: "4. Si Seed / Buffer Growth",
        subtitle: "Si precursor가 표면에서 반응하며 결정 방향을 따라 얇은 Si layer가 자랍니다.",
        area: "pm",
        action: "volatile precursor가 wafer 표면에서 분해/반응하고, byproduct는 gas flow와 pump/exhaust로 빠집니다.",
        gas: "DCS / SiH4 / TCS + H2 carrier",
        pressure: "reaction + exhaust balance",
        pump: "ON: byproduct removal",
        purge: "전환 구간 purge/flow stabilization",
        exhaust: "HCl/H2/byproduct가 exhaust/abatement로 이동 가능",
        temp: "growth temperature window",
        waferEffect: "Si atom이 결정 격자를 따라 붙으며 seed/buffer layer가 쌓입니다.",
        ceWatch: "MFC setpoint vs actual, pressure response, growth rate trend, thickness uniformity를 봅니다.",
        gasTags: ["DCS", "SiH4", "H2"],
        layers: [
          ["Si wafer", "결정성 기판", "#748091", 46],
          ["Si seed layer", "결정 방향을 이어받은 첫 성장층", "#5ee7ff", 14]
        ]
      },
      {
        title: "5. SiGe / Dopant Incorporation",
        subtitle: "Ge precursor나 dopant gas가 함께 들어오면 material과 전기 특성이 바뀝니다.",
        area: "pm",
        action: "Si와 Ge, dopant가 표면 반응에 참여해 strain/electrical property를 가진 layer를 만듭니다.",
        gas: "GeH4 + Si precursor + PH3/AsH3/B2H6 후보",
        pressure: "composition과 uniformity에 민감",
        pump: "ON: residual/memory 관리",
        purge: "dopant line purge와 residual 관리 중요",
        exhaust: "toxic hydride/byproduct는 detector/abatement 전제",
        temp: "composition과 defect에 영향",
        waferEffect: "SiGe 또는 doped Si/SiGe layer가 wafer 위에 추가됩니다.",
        ceWatch: "dopant response, residual memory, chamber seasoning, metrology와 gas trace correlation을 봅니다.",
        gasTags: ["GeH4", "PH3", "B2H6"],
        layers: [
          ["Si wafer", "결정성 기판", "#748091", 46],
          ["Si seed layer", "완충 성장층", "#5ee7ff", 12],
          ["SiGe / doped layer", "strain 또는 전기특성 layer", "#b98cff", 16]
        ]
      },
      {
        title: "6. HCl Selectivity / Shape Control",
        subtitle: "선택 성장에서는 증착과 etch balance가 pattern 위 결과를 좌우합니다.",
        area: "pm",
        action: "HCl은 공개 EPI 문헌에서 selectivity와 etch balance에 자주 등장합니다. 원치 않는 영역의 증착 억제와 표면 균형을 이해합니다.",
        gas: "HCl + carrier + precursor balance",
        pressure: "etch/deposition competition",
        pump: "ON: corrosive byproduct removal",
        purge: "HCl 전후 purge와 material compatibility 중요",
        exhaust: "corrosive exhaust / scrubber ready",
        temp: "selectivity와 defect에 영향",
        waferEffect: "원하는 trench/region 위 layer는 자라고, 원치 않는 표면 증착은 억제되는 개념입니다.",
        ceWatch: "HCl line integrity, exhaust/scrubber, defect map, pattern loading, chamber wall condition을 봅니다.",
        gasTags: ["HCl", "H2", "Selectivity"],
        layers: [
          ["Si wafer", "기판", "#748091", 46],
          ["Si seed layer", "완충층", "#5ee7ff", 12],
          ["Selective SiGe shape", "선택 성장 형상", "#b98cff", 18],
          ["Doped cap", "접촉/저항 최적화 후보층", "#00ff95", 9]
        ]
      },
      {
        title: "7. Purge / Cool / Transfer Out",
        subtitle: "공정 gas를 밀어내고 byproduct를 exhaust로 보내며 wafer를 다음 module로 넘깁니다.",
        area: "transfer",
        action: "process 종료 후 purge, cool, pressure match, transfer sequence로 다음 chamber 또는 unload로 이동합니다.",
        gas: "N2 / H2 / Ar purge, residual byproduct",
        pressure: "pressure match 후 transfer",
        pump: "ON then controlled state",
        purge: "ON: residual gas removal",
        exhaust: "abatement/exhaust trend 확인",
        temp: "cooldown / thermal stability",
        waferEffect: "성장된 layer stack을 보존한 채 transfer합니다.",
        ceWatch: "purge complete, cooldown, slit valve, transfer count, particle/scratch check, post-process trace를 저장합니다.",
        gasTags: ["N2", "Purge", "Exhaust"],
        layers: [
          ["Si wafer", "기판", "#748091", 46],
          ["Si seed layer", "완충층", "#5ee7ff", 12],
          ["Selective SiGe shape", "성장층", "#b98cff", 18],
          ["Doped cap", "전기특성 후보층", "#00ff95", 9]
        ]
      }
    ]
  },
  {
    id: "selective-sd",
    kicker: "Selective EPI / GAA Source-Drain",
    title: "선택 EPI: 깊은 trench 안에 source/drain 구조를 채우는 그림",
    summary: "Applied Xtera 공개 자료가 강조하는 selective epitaxy, integrated pre-clean/etch, low-volume chamber, chemistry delivery를 초보자가 볼 수 있게 단순화한 흐름입니다.",
    publicBasis: "Applied Centura Xtera Epi 공개 페이지와 GAA source/drain selective epitaxy 공개 설명",
    sources: [
      ["Centura Xtera Epi", "https://www.appliedmaterials.com/us/en/product-library/centura-xtera-epi.html"],
      ["Applied Xtera launch", "https://ir.appliedmaterials.com/news-releases/news-release-details/applied-materials-unveils-next-gen-chipmaking-products"],
      ["Selective Epitaxy of Group IV Materials", "https://www.intechopen.com/chapters/60757"]
    ],
    gasMatrix: [
      ["Pre-clean chemistry", "interface reset", "native oxide와 contamination을 줄여 빈틈 없는 성장의 시작 조건을 만듭니다."],
      ["Si/Ge precursor", "trench fill material", "source/drain trench에 원하는 material을 성장시키는 공급원입니다."],
      ["Dopant gas", "resistance / device property", "P/B/As 계열 dopant가 electrical property를 바꿀 수 있습니다."],
      ["HCl / etch chemistry", "selective shape control", "원치 않는 표면 증착을 억제하고 trench 안 성장 균형을 맞추는 개념입니다."],
      ["H2 / N2", "carrier/purge", "reaction ambient와 purge 안정화를 담당합니다."]
    ],
    steps: [
      {
        title: "1. Patterned Wafer Arrives",
        subtitle: "이미 pattern과 trench가 있는 wafer가 들어옵니다.",
        area: "loadlock",
        action: "blanket film이 아니라 특정 구조 위에 선택적으로 layer를 키우는 준비 단계입니다.",
        gas: "N2 / vacuum support",
        pressure: "load lock pumpdown",
        pump: "ON",
        purge: "N2 ready",
        exhaust: "standby",
        temp: "stable",
        waferEffect: "trench와 mask/spacer 표면이 있는 patterned wafer 상태입니다.",
        ceWatch: "wafer route, carrier ID, pattern lot, chamber recipe permission을 확인합니다.",
        gasTags: ["Pattern", "N2"],
        layers: [
          ["Si substrate", "기판", "#748091", 42],
          ["Spacer / mask", "원치 않는 성장 억제 영역", "#d8e3e8", 12],
          ["Open trench", "성장될 빈 공간", "#101c1a", 18]
        ]
      },
      {
        title: "2. Integrated Pre-clean",
        subtitle: "trench 바닥 interface를 깨끗하게 만들어 defect와 void 위험을 줄입니다.",
        area: "preclean",
        action: "vacuum break 없이 pre-clean과 EPI를 연결하면 queue time과 계면 오염을 줄이는 방향입니다.",
        gas: "H2 / radical pre-clean option",
        pressure: "pre-clean chamber condition",
        pump: "ON",
        purge: "전후 purge",
        exhaust: "byproduct removal",
        temp: "low thermal budget 중심",
        waferEffect: "trench bottom이 growth-ready surface로 바뀝니다.",
        ceWatch: "pre-clean chamber pass evidence와 transfer delay를 봅니다.",
        gasTags: ["Pre-clean", "H2"],
        layers: [
          ["Si substrate", "기판", "#748091", 42],
          ["Spacer / mask", "비성장 영역", "#d8e3e8", 12],
          ["Clean trench bottom", "성장 시작점", "#9ff6d0", 8]
        ]
      },
      {
        title: "3. Chemistry Delivery",
        subtitle: "작은 process volume과 gas delivery가 trench 안 공급 균일도에 영향을 줍니다.",
        area: "pm",
        action: "precursor replenishment가 잘 되어야 깊은 구조 안쪽까지 균일한 growth front가 갑니다.",
        gas: "Si precursor / GeH4 / H2",
        pressure: "delivery uniformity sensitive",
        pump: "ON",
        purge: "line stabilization",
        exhaust: "continuous",
        temp: "surface reaction window",
        waferEffect: "trench 바닥에서 layer가 자라기 시작합니다.",
        ceWatch: "MFC response, pressure transient, chamber volume, temperature trace를 같이 봅니다.",
        gasTags: ["DCS", "GeH4", "H2"],
        layers: [
          ["Si substrate", "기판", "#748091", 42],
          ["Spacer / mask", "비성장 영역", "#d8e3e8", 12],
          ["Seed in trench", "trench 바닥 성장 시작", "#5ee7ff", 12]
        ]
      },
      {
        title: "4. Bottom-up Fill",
        subtitle: "trench 안을 아래에서 위로 채우는 이미지로 이해합니다.",
        area: "pm",
        action: "deposition rate, gas replenishment, etch balance가 맞아야 void 없이 차오르는 방향으로 갑니다.",
        gas: "Si/Ge precursor + carrier",
        pressure: "growth balance",
        pump: "ON",
        purge: "transition managed",
        exhaust: "byproduct removal",
        temp: "uniformity critical",
        waferEffect: "trench 안 layer가 더 두꺼워지고 source/drain 형상에 가까워집니다.",
        ceWatch: "film profile, void risk, pattern loading effect, chamber matching 질문을 준비합니다.",
        gasTags: ["Growth", "SiGe"],
        layers: [
          ["Si substrate", "기판", "#748091", 42],
          ["Spacer / mask", "비성장 영역", "#d8e3e8", 12],
          ["SiGe fill", "trench fill layer", "#b98cff", 26]
        ]
      },
      {
        title: "5. In-situ Doping / Cap",
        subtitle: "dopant가 들어가면 단순 막이 아니라 전기 특성을 가진 구조가 됩니다.",
        area: "pm",
        action: "dopant gas timing과 residual 관리가 layer electrical property와 repeatability에 연결됩니다.",
        gas: "PH3 / AsH3 / B2H6 후보",
        pressure: "dopant response sensitive",
        pump: "ON",
        purge: "toxic hydride purge discipline",
        exhaust: "detector + abatement critical",
        temp: "incorporation에 영향",
        waferEffect: "source/drain resistance와 device 성능에 연결되는 doped layer가 추가됩니다.",
        ceWatch: "gas safety release, dopant MFC, residual memory, metrology trend를 봅니다.",
        gasTags: ["PH3", "B2H6", "Dopant"],
        layers: [
          ["Si substrate", "기판", "#748091", 42],
          ["Spacer / mask", "비성장 영역", "#d8e3e8", 12],
          ["SiGe fill", "주 성장층", "#b98cff", 24],
          ["Doped cap", "저항/접촉 최적화 후보", "#00ff95", 10]
        ]
      },
      {
        title: "6. Etch / Selectivity Trim",
        subtitle: "HCl 같은 chemistry가 원치 않는 위치의 막을 억제하는 개념을 봅니다.",
        area: "pm",
        action: "선택 성장은 deposition만 보는 것이 아니라 etch balance와 mask/spacer 위 nucleation 억제를 함께 봅니다.",
        gas: "HCl / carrier",
        pressure: "etch-deposition balance",
        pump: "ON",
        purge: "HCl boundary strict",
        exhaust: "corrosive exhaust / scrubber",
        temp: "shape and defect sensitive",
        waferEffect: "trench 밖 unwanted deposition을 억제하고 필요한 형상을 남기는 개념입니다.",
        ceWatch: "HCl leak risk, exhaust compatibility, selectivity defect, particle source를 봅니다.",
        gasTags: ["HCl", "Selectivity"],
        layers: [
          ["Si substrate", "기판", "#748091", 42],
          ["Spacer / mask", "비성장 영역", "#d8e3e8", 12],
          ["Selective fill", "선택적으로 남은 성장층", "#b98cff", 24],
          ["Doped cap", "마감층", "#00ff95", 10]
        ]
      },
      {
        title: "7. Stabilize / Exit",
        subtitle: "purge와 cooldown 후 다음 공정이나 metrology로 넘어갑니다.",
        area: "transfer",
        action: "완성된 structure는 particle, scratch, defect, thickness/resistivity metrology로 확인됩니다.",
        gas: "N2 / H2 / Ar purge",
        pressure: "transfer match",
        pump: "controlled",
        purge: "ON",
        exhaust: "residual removal",
        temp: "cooldown",
        waferEffect: "void-free 여부, cell-to-cell uniformity, defect가 핵심 결과로 이어집니다.",
        ceWatch: "post-run log, MFC/pressure/temperature trace, metrology handoff, open punch를 저장합니다.",
        gasTags: ["Purge", "Metrology"],
        layers: [
          ["Si substrate", "기판", "#748091", 42],
          ["Spacer / mask", "비성장 영역", "#d8e3e8", 12],
          ["Selective fill", "source/drain 후보 구조", "#b98cff", 24],
          ["Doped cap", "마감층", "#00ff95", 10]
        ]
      }
    ]
  },
  {
    id: "rtp-ambient",
    kicker: "RTP / Thermal Ambient",
    title: "RTP: 막을 쌓기보다 빠르게 가열해 물성을 바꾸는 흐름",
    summary: "RTP는 EPI처럼 항상 두꺼운 layer를 쌓는 장비가 아닙니다. 빠른 ramp/soak/spike와 gas ambient를 통해 dopant activation, oxidation, nitridation, interface engineering을 수행할 수 있습니다.",
    publicBasis: "Applied RTP/Radiance/Vulcan/RadOx 공개자료와 일반 RTP 공개 설명",
    sources: [
      ["Applied Thermal Processing", "https://www.appliedmaterials.com/us/en/semiconductor/products/processes/rapid-thermal-processing-treatments.html"],
      ["Vantage Radiance Plus RTP", "https://www.appliedmaterials.com/us/en/product-library/vantage-radiance-plus-rtp.html"],
      ["Vantage RadOx RTP", "https://www.appliedmaterials.com/us/en/product-library/vantage-radox-rtp.html"],
      ["Rapid thermal processing", "https://en.wikipedia.org/wiki/Rapid_thermal_processing"]
    ],
    gasMatrix: [
      ["N2 / Ar", "inert ambient / purge", "산화나 오염을 억제하며 thermal step을 안정화합니다."],
      ["O2 / O3 / radical oxygen", "oxidation", "얇은 oxide 또는 interface engineering에 연결될 수 있습니다."],
      ["NH3 / NO / N2O", "nitridation/oxynitride 후보", "질소를 interface에 넣는 thermal chemistry 후보로 공개 자료에 등장합니다."],
      ["H2", "reducing/passivation 후보", "특정 thermal step에서 표면/결함 passivation 맥락으로 언급됩니다. 가연성 관리가 핵심입니다."],
      ["Exhaust", "ambient switching", "빠른 gas 전환과 부산물 제거가 repeatability와 safety에 중요합니다."]
    ],
    steps: [
      {
        title: "1. Load / Purge",
        subtitle: "single wafer가 RTP chamber에 들어가고 ambient가 정리됩니다.",
        area: "pm",
        action: "막을 쌓기보다 열처리 조건을 만들기 위한 purge와 안정화가 먼저입니다.",
        gas: "N2 / Ar purge",
        pressure: "atmospheric 또는 reduced pressure option",
        pump: "option별 exhaust/pump ready",
        purge: "ON",
        exhaust: "ambient exhaust ready",
        temp: "room -> preheat",
        waferEffect: "기존 film stack이 thermal step을 받을 준비를 합니다.",
        ceWatch: "chamber clean, wafer seating, rotation, purge flow, exhaust ready를 봅니다.",
        gasTags: ["N2", "Ar", "Purge"],
        layers: [
          ["Si wafer", "기판", "#748091", 42],
          ["Existing device film", "이미 형성된 막", "#5ee7ff", 14]
        ]
      },
      {
        title: "2. Rapid Ramp",
        subtitle: "lamp가 wafer를 빠르게 올리고 temperature trace가 핵심 증거가 됩니다.",
        area: "pm",
        action: "짧은 시간 고온으로 이동하면서 thermal budget을 제한합니다.",
        gas: "N2 / Ar / recipe ambient",
        pressure: "stable ambient",
        pump: "exhaust balanced",
        purge: "ambient maintained",
        exhaust: "thermal byproduct removal",
        temp: "rapid ramp",
        waferEffect: "implant damage 회복, dopant activation 준비, film densification 준비 상태가 됩니다.",
        ceWatch: "lamp zone, pyrometer, emissivity, rotation, ramp rate trace를 봅니다.",
        gasTags: ["Lamp", "Ramp"],
        layers: [
          ["Si wafer", "기판", "#748091", 42],
          ["Implanted / existing layer", "열처리 대상", "#ffcf7a", 16]
        ]
      },
      {
        title: "3. Spike / Soak Anneal",
        subtitle: "짧은 고온 유지 또는 피크로 전기적/물리적 특성을 바꿉니다.",
        area: "pm",
        action: "dopant activation, interface change, densification 같은 목적을 위해 temperature-time profile이 제어됩니다.",
        gas: "N2 / Ar / H2 후보 ambient",
        pressure: "repeatability critical",
        pump: "exhaust controlled",
        purge: "ambient purity maintained",
        exhaust: "continuous",
        temp: "spike or soak",
        waferEffect: "새 layer가 두껍게 쌓이기보다 기존 layer의 electrical/physical property가 바뀝니다.",
        ceWatch: "temperature overshoot, uniformity, wafer slip/break risk, recipe change control을 봅니다.",
        gasTags: ["Spike", "Soak", "Anneal"],
        layers: [
          ["Si wafer", "기판", "#748091", 42],
          ["Activated layer", "전기특성 변화", "#00ff95", 16]
        ]
      },
      {
        title: "4. Oxidation Option",
        subtitle: "O2/O3/radical oxygen 계열이 들어오면 얇은 oxide가 자랄 수 있습니다.",
        area: "pm",
        action: "RTP/RadOx 계열은 low thermal budget으로 oxide/interface를 만드는 응용이 공개 자료에 언급됩니다.",
        gas: "O2 / O3 / radical oxygen candidate",
        pressure: "ambient control",
        pump: "exhaust ready",
        purge: "oxidizer boundary strict",
        exhaust: "oxidizer exhaust path",
        temp: "oxidation window",
        waferEffect: "wafer 표면에 얇은 oxide layer가 추가되는 개념입니다.",
        ceWatch: "oxidizer segregation, analyzer, exhaust, chamber material, oxide thickness metrology를 봅니다.",
        gasTags: ["O2", "O3", "RadOx"],
        layers: [
          ["Si wafer", "기판", "#748091", 42],
          ["Activated layer", "열처리층", "#00ff95", 14],
          ["Thin oxide", "산화막", "#d8f6ff", 9]
        ]
      },
      {
        title: "5. Nitridation / Interface Option",
        subtitle: "NH3/NO/N2O 같은 nitrogen chemistry는 interface 성질을 바꿀 수 있습니다.",
        area: "pm",
        action: "공정 option에 따라 oxide/interface에 nitrogen을 넣는 thermal chemistry가 쓰일 수 있습니다.",
        gas: "NH3 / NO / N2O candidate",
        pressure: "ambient switching",
        pump: "exhaust/abatement ready",
        purge: "toxic/corrosive boundary 확인",
        exhaust: "reactive gas exhaust",
        temp: "interface engineering window",
        waferEffect: "oxide/interface가 nitrogen-containing layer 성격을 갖는 개념입니다.",
        ceWatch: "NH3 safety, exhaust compatibility, ambient switch timing, metrology correlation을 봅니다.",
        gasTags: ["NH3", "NO", "N2O"],
        layers: [
          ["Si wafer", "기판", "#748091", 42],
          ["Activated layer", "열처리층", "#00ff95", 14],
          ["Oxynitride interface", "계면 조정층", "#9f8cff", 10]
        ]
      },
      {
        title: "6. Controlled Cooldown",
        subtitle: "급격한 열충격과 slip을 피하면서 wafer를 내립니다.",
        area: "pm",
        action: "cooldown은 공정 결과와 wafer damage risk 모두에 영향을 줍니다.",
        gas: "N2 / Ar purge",
        pressure: "stable exhaust",
        pump: "controlled",
        purge: "ON",
        exhaust: "heat/byproduct removal",
        temp: "ramp down",
        waferEffect: "열처리된 layer stack이 안정화됩니다.",
        ceWatch: "cooling rate, rotation stop, lift pin, wafer seating, breakage/scratch risk를 봅니다.",
        gasTags: ["Cooldown", "N2"],
        layers: [
          ["Si wafer", "기판", "#748091", 42],
          ["Modified layer", "변화된 물성", "#00ff95", 14],
          ["Interface film", "산화/질화 후보층", "#d8f6ff", 10]
        ]
      },
      {
        title: "7. Exhaust / Unload",
        subtitle: "ambient를 제거하고 wafer를 unload 또는 다음 공정으로 넘깁니다.",
        area: "transfer",
        action: "post-run trace와 metrology가 RTP 성공 여부를 판단하는 evidence가 됩니다.",
        gas: "N2 purge / residual exhaust",
        pressure: "safe transfer state",
        pump: "standby/ready",
        purge: "complete",
        exhaust: "trend checked",
        temp: "safe unload",
        waferEffect: "막 성장보다 thermal history가 결과입니다. trace가 핵심 산출물입니다.",
        ceWatch: "temperature trace, alarm history, exhaust trend, wafer handling count, metrology request를 저장합니다.",
        gasTags: ["Unload", "Trace"],
        layers: [
          ["Si wafer", "기판", "#748091", 42],
          ["Modified layer", "열처리 결과층", "#00ff95", 14],
          ["Interface film", "얇은 계면막", "#d8f6ff", 10]
        ]
      }
    ]
  },
  {
    id: "epi-recovery",
    kicker: "Install / PM Recovery",
    title: "설치·PM 후 EPI 챔버를 다시 기준 상태로 만드는 흐름",
    summary: "장비를 설치하거나 chamber PM을 한 뒤 바로 product wafer를 넣지 않습니다. vacuum integrity, gas release, purge, bake/conditioning, seasoning, baseline wafer, metrology sign-off로 정상 상태를 증명하는 흐름을 봅니다.",
    publicBasis: "Applied EPI 공개 장비 설명, OSHA/NIOSH gas safety, 일반 SAT/qualification 및 반도체 장비 PM 공개 원칙",
    sources: [
      ["Centura Epi 200mm", "https://www.appliedmaterials.com/us/en/product-library/centura-epi-200mm.html"],
      ["OSHA Semiconductor Device Fabrication", "https://www.osha.gov/semiconductors/silicon/device-fabrication"],
      ["NIOSH Hazardous Energy Control", "https://www.cdc.gov/niosh/manufacturing/hazardous-energy-control/index.html"],
      ["Site Acceptance Test overview", "https://operations1.com/en/glossary/site-acceptance-test"]
    ],
    gasMatrix: [
      ["N2 / Ar", "purge / inerting", "chamber와 line의 residual을 밀어내고 safe state를 만들 때 쓰는 대표 support gas입니다."],
      ["H2", "bake / reducing ambient", "EPI 문맥에서 carrier 또는 anneal/bake ambient로 등장합니다. 가연성 관리와 exhaust ready가 먼저입니다."],
      ["Si precursor", "seasoning / test deposition", "dummy/test wafer에서 chamber 상태와 growth response를 보는 용도입니다. 실제 gas는 gas matrix로 확정합니다."],
      ["Dopant gas", "response verification", "dopant option이 있으면 MFC response와 residual/memory 관리가 중요합니다. 독성 gas release가 선행됩니다."],
      ["HCl", "clean/selectivity boundary", "corrosive exhaust와 scrubber 상태를 확인해야 하는 gas family입니다."],
      ["Metrology", "release evidence", "gas가 아니라 thickness, resistivity, defect, particle data가 production release를 설득합니다."]
    ],
    steps: [
      {
        title: "1. Chamber Closed / LOTO Release Review",
        subtitle: "PM이나 install 작업 후 chamber를 닫고 에너지/작업 경계를 정리합니다.",
        area: "pm",
        action: "작업 중 열었던 cover, door, gas box, chamber hardware, connector, sensor, water line, exhaust line 상태를 walkdown합니다.",
        gas: "No process gas, N2 standby",
        pressure: "대기압 또는 safe idle",
        pump: "OFF or standby until release",
        purge: "standby",
        exhaust: "exhaust path verified before gas work",
        temp: "safe touch / cooldown",
        waferEffect: "product wafer는 아직 사용하지 않습니다. 장비 상태를 다시 닫는 단계입니다.",
        ceWatch: "LOTO 해제 조건, tool clean-up, missing tool/part, connector seating, O-ring, door seal, water leak evidence를 봅니다.",
        gasTags: ["LOTO", "N2"],
        layers: [
          ["Dummy wafer only", "product 투입 전 준비", "#748091", 42],
          ["No qualified film yet", "아직 release 전", "#ffcf7a", 12]
        ]
      },
      {
        title: "2. Leak Check / Pumpdown Baseline",
        subtitle: "vacuum integrity가 회복됐는지 pumpdown curve와 base pressure로 확인합니다.",
        area: "pm",
        action: "chamber, foreline, valve, pump path를 통해 압력이 정상적으로 내려가는지 확인합니다.",
        gas: "Vacuum pump, N2 vent/purge support",
        pressure: "pumpdown -> base pressure trend",
        pump: "ON: curve와 안정 압력 확인",
        purge: "N2 vent/purge path ready",
        exhaust: "pump exhaust path ready",
        temp: "stable",
        waferEffect: "막 형성 전입니다. vacuum boundary가 product wafer를 받을 수 있는지 확인합니다.",
        ceWatch: "pumpdown time, leak suspicion, door seal/O-ring, throttle/gate/slit valve state, gauge credibility를 봅니다.",
        gasTags: ["Vacuum", "N2"],
        layers: [
          ["Dummy wafer", "시험용 wafer", "#748091", 42],
          ["Vacuum integrity check", "누설 확인", "#5ee7ff", 10]
        ]
      },
      {
        title: "3. Gas Line Release / First Safe Purge",
        subtitle: "process gas보다 먼저 purge와 detector/exhaust/abatement readiness를 닫습니다.",
        area: "exhaust",
        action: "gas cabinet, VMB/VMP, gas panel, detector, exhaust, abatement, EHS release를 하나의 chain으로 봅니다.",
        gas: "N2 / Ar purge first, process gas still gated",
        pressure: "line pressure under approved boundary",
        pump: "ready",
        purge: "ON: purge completion evidence",
        exhaust: "abatement and detector normal",
        temp: "stable",
        waferEffect: "wafer 결과가 아니라 gas safety envelope를 먼저 만듭니다.",
        ceWatch: "line label, P&ID, SDS, detector normal, scrubber ready, gas owner sign-off, first gas introduction owner를 봅니다.",
        gasTags: ["Purge", "Detector", "Abatement"],
        layers: [
          ["Dummy wafer", "시험용 wafer", "#748091", 42],
          ["Safe gas envelope", "gas release 조건", "#9ff6d0", 12]
        ]
      },
      {
        title: "4. Bake / Chamber Conditioning",
        subtitle: "잔류 수분과 contamination을 줄이고 chamber thermal 상태를 안정화합니다.",
        area: "pm",
        action: "공개 EPI 문맥에서 H2 anneal/bake 또는 chamber conditioning은 surface와 chamber state 안정화 사고로 연결됩니다.",
        gas: "H2 or inert conditioning ambient candidate",
        pressure: "controlled process pressure",
        pump: "ON",
        purge: "pre/post purge strict",
        exhaust: "flammable gas exhaust readiness",
        temp: "bake / conditioning thermal state",
        waferEffect: "dummy wafer 또는 chamber surface가 안정화되고 product 전 오염 리스크를 낮춥니다.",
        ceWatch: "H2 safety, temperature trace, pressure stability, exhaust/abatement trend, particle trend를 봅니다.",
        gasTags: ["H2", "Bake", "Purge"],
        layers: [
          ["Dummy wafer", "시험용 wafer", "#748091", 42],
          ["Conditioned surface", "잔류 오염 감소", "#5ee7ff", 14]
        ]
      },
      {
        title: "5. Seasoning / Dummy Deposition",
        subtitle: "chamber wall과 process response를 안정화하는 시험 공정을 수행합니다.",
        area: "pm",
        action: "Si/SiGe/dopant option에 맞는 dummy/test 공정으로 growth response와 residual/memory effect를 봅니다.",
        gas: "Si precursor / H2 / option gas under approved recipe",
        pressure: "process response baseline",
        pump: "ON",
        purge: "transition purge",
        exhaust: "byproduct removal",
        temp: "growth window",
        waferEffect: "dummy wafer 위에 시험 layer가 쌓이고 chamber 상태가 반복성 쪽으로 이동합니다.",
        ceWatch: "MFC response, pressure transient, temperature trace, particle jump, chamber matching, dummy wafer count를 봅니다.",
        gasTags: ["DCS", "H2", "Seasoning"],
        layers: [
          ["Dummy wafer", "시험용 wafer", "#748091", 42],
          ["Seasoning film", "챔버 상태 확인용 성장층", "#b98cff", 18]
        ]
      },
      {
        title: "6. Baseline Wafer / Metrology Correlation",
        subtitle: "기준 wafer 결과와 장비 trace를 같은 시간축으로 묶습니다.",
        area: "pm",
        action: "thickness, resistivity, defect, particle 같은 결과를 gas/pressure/temperature trace와 연결합니다.",
        gas: "Approved process gas set",
        pressure: "baseline target trend",
        pump: "ON",
        purge: "recipe transition verified",
        exhaust: "normal trend",
        temp: "repeatable trace",
        waferEffect: "test wafer 위 결과가 정상 baseline과 비교됩니다.",
        ceWatch: "film thickness uniformity, Rs/resistivity, defect map, particle count, temperature trace, MFC actual을 한 packet으로 묶습니다.",
        gasTags: ["Metrology", "Baseline"],
        layers: [
          ["Test wafer", "기준 wafer", "#748091", 42],
          ["Baseline EPI film", "비교 가능한 기준막", "#00ff95", 18],
          ["Metrology data", "두께/저항/결함 data", "#d8f6ff", 8]
        ]
      },
      {
        title: "7. Handover / Early-Life Monitoring",
        subtitle: "release 후에도 초반 drift와 반복 alarm을 감시합니다.",
        area: "transfer",
        action: "생산 투입은 끝이 아니라 early-life monitoring 시작입니다. open item, retest scope, owner를 분명히 남깁니다.",
        gas: "Normal production-ready state",
        pressure: "monitored trend",
        pump: "ready/normal",
        purge: "verified",
        exhaust: "normal + alarm path known",
        temp: "baseline trace stored",
        waferEffect: "product wafer 투입 전후 기준 data와 drift 감시가 이어집니다.",
        ceWatch: "handover note, alarm history, first lot watch, customer update cadence, rollback condition을 정리합니다.",
        gasTags: ["Handover", "Trend"],
        layers: [
          ["Production wafer", "생산 투입 후보", "#748091", 42],
          ["Qualified film", "release 기준 만족층", "#00ff95", 18],
          ["Monitoring envelope", "초반 감시 범위", "#5ee7ff", 8]
        ]
      }
    ]
  }
];

const epiEvidenceLadder = [
  {
    title: "Interface Cleanliness",
    process: "native oxide, carbon/oxygen contamination, queue time은 EPI interface defect로 이어질 수 있습니다.",
    evidence: "pre-clean status, vacuum transfer, queue time, residual O2/H2O 추정, defect/metrology 결과",
    ce: "pre-clean chamber와 main EPI chamber를 따로 보지 말고 하나의 interface chain으로 보고합니다."
  },
  {
    title: "Gas Delivery",
    process: "precursor와 dopant가 표면까지 안정적으로 도달해야 growth rate, composition, resistivity가 반복됩니다.",
    evidence: "MFC setpoint/actual, supply pressure, valve state, purge completion, gas cabinet ready, pressure transient",
    ce: "공정 결과 이상을 바로 recipe 문제로 넘기지 말고 delivery evidence부터 묶습니다."
  },
  {
    title: "Thermal Uniformity",
    process: "EPI/RTP 모두 wafer 온도장과 ramp/soak/spike profile이 uniformity와 defect에 영향을 줍니다.",
    evidence: "temperature trace, pyrometer/window condition, lamp/heater zone, rotation, cooling stability",
    ce: "한 장의 wafer map을 temperature trace와 같은 시간축으로 붙여 생각합니다."
  },
  {
    title: "Vacuum / Pressure Boundary",
    process: "pumpdown, base pressure, pressure control은 residual gas와 reaction stability의 바닥입니다.",
    evidence: "pumpdown curve, base pressure, throttle/gate/slit valve state, foreline, pump/exhaust readiness",
    ce: "base pressure 한 값보다 curve shape와 최근 PM 변경점을 같이 봅니다."
  },
  {
    title: "Selectivity / HCl Balance",
    process: "selective EPI에서는 원하는 위치는 자라고 원치 않는 표면은 억제되는 균형이 중요합니다.",
    evidence: "HCl line integrity, MFC response, corrosive exhaust/scrubber, defect map, unwanted deposition observation",
    ce: "HCl은 공정 변수이면서 corrosive safety 변수입니다. 결과와 EHS를 함께 보고합니다."
  },
  {
    title: "Dopant Memory",
    process: "PH3, AsH3, B2H6 같은 dopant는 전기 특성과 residual/memory effect로 이어질 수 있습니다.",
    evidence: "dopant MFC response, purge history, chamber seasoning, resistivity/Rs, previous recipe history",
    ce: "독성 gas release가 선행되고, 결과 이상은 residual과 chamber condition까지 함께 의심합니다."
  },
  {
    title: "Wafer Handling",
    process: "좋은 공정도 wafer scratch, transfer miss, particle contact가 있으면 실패합니다.",
    evidence: "mapping, aligner, robot handoff, slit valve timing, transfer count, scratch/particle check",
    ce: "공정 data와 handling data를 분리하지 말고 wafer path 단위로 묶습니다."
  },
  {
    title: "Exhaust / Abatement",
    process: "byproduct, toxic hydride, corrosive gas, flammable gas는 exhaust와 abatement가 process readiness 조건입니다.",
    evidence: "exhaust flow, scrubber ready, detector normal, pressure drop, abatement alarm history, EHS sign-off",
    ce: "first gas introduction 전에는 process보다 gas safety envelope가 먼저입니다."
  }
];

const epiRiskTranslator = [
  ["Pre-clean 약함", "interface contamination", "초기 defect, non-uniform nucleation, metrology drift", "pre-clean 상태와 queue time을 어떻게 증명했는가?"],
  ["Precursor replenishment 불안정", "growth rate/composition drift", "thickness non-uniformity, chamber-to-chamber mismatch", "MFC actual과 chamber pressure transient가 정상 baseline과 같은가?"],
  ["HCl balance 과/부족", "selectivity collapse 또는 etch 과다", "unwanted deposition, pattern defect, low growth response", "HCl delivery와 corrosive exhaust readiness가 같이 확인됐는가?"],
  ["Temperature field 흔들림", "reaction rate와 dopant incorporation 변화", "wafer map radial/edge signature, repeatability loss", "temperature trace, pyrometer, rotation, cooling을 같이 봤는가?"],
  ["Purge incomplete", "residual gas / memory effect", "first wafer drift, dopant carryover, alarm after transition", "purge completion evidence와 gas switch timing이 남아 있는가?"],
  ["Vacuum leak / pressure instability", "oxygen/moisture ingress 또는 pressure control 불안정", "pumpdown delay, base pressure drift, defect/particle rise", "PM 이후 O-ring, door seal, valve state를 다시 확인했는가?"],
  ["Dopant response abnormal", "electrical property shift", "resistivity/Rs outlier, chamber memory suspicion", "toxic gas release와 dopant MFC trend, previous recipe history를 묶었는가?"],
  ["Exhaust/abatement margin 부족", "safety interlock 또는 byproduct removal 약화", "gas alarm, process hold, corrosion/odor concern", "abatement ready와 detector path가 first gas 전에 닫혔는가?"]
];

const electricalHero = [
  ["1", "전기 안전", "LOTO, stored energy, arc flash, CAT rating, PPE, 권한 경계를 먼저 확인합니다."],
  ["2", "도면 읽기", "power path, 0V/common, fuse, relay coil, contact, sensor input, actuator output을 색으로 나눕니다."],
  ["3", "DVM 측정", "전압은 병렬, 저항/연속성은 무전원, 전류는 특별히 위험하다는 원칙을 몸에 넣습니다."],
  ["4", "증거 보고", "측정 위치, mode, expected value, actual value, 다음 확인을 한 줄로 남깁니다."]
];

const electricalPath = [
  {
    step: "E1",
    title: "전기 언어 익히기",
    goal: "Voltage, current, resistance, power, ground, open/short를 장비 증상과 연결합니다.",
    drills: ["Ohm's law로 24V 부하 전류 추정", "series/parallel에서 전압이 어디에 걸리는지 그리기", "open circuit과 short circuit 증상을 말로 구분"]
  },
  {
    step: "E2",
    title: "DVM/DMM 안전 루틴",
    goal: "측정값보다 먼저 meter 상태와 회로 에너지 상태를 확인합니다.",
    drills: ["lead 손상, fuse, jack 위치 확인", "known source로 meter prove", "power off 뒤 resistance/continuity 측정", "live 측정은 자격/승인/PPE 조건에서만"]
  },
  {
    step: "E3",
    title: "24V control circuit",
    goal: "장비에서 자주 만나는 sensor, relay, solenoid, interlock chain을 24VDC 기준으로 읽습니다.",
    drills: ["+24V to 0V 기준 잡기", "closed contact 양단 전압강하 보기", "fuse line/load side 비교", "PNP/NPN sensor output toggle 이해"]
  },
  {
    step: "E4",
    title: "Relay / contactor / SSR",
    goal: "코일은 전자석, 접점은 별도 스위치라는 구조를 확실히 분리합니다.",
    drills: ["A1-A2 coil voltage", "COM-NO/NC continuity", "energized/de-energized 상태 비교", "chatter, welded contact, open coil 증상 구분"]
  },
  {
    step: "E5",
    title: "장비 증상으로 역추적",
    goal: "알람에서 부품명으로 뛰지 않고 command, output, wiring, load, feedback 순서로 좁힙니다.",
    drills: ["solenoid command 있는데 valve 미동작", "interlock chain 중간에서 24V 사라짐", "sensor LED는 켜지지만 PLC input off", "SMPS 24V sag"]
  },
  {
    step: "E6",
    title: "보고 가능한 계측",
    goal: "선임/고객에게 신뢰받는 문장으로 측정 증거를 전달합니다.",
    drills: ["TP명, 기준점, DVM mode, expected, actual 기록", "변경 전후 값 비교", "측정 불가 이유와 필요한 승인 명시"]
  }
];

const meterCases = [
  {
    id: "prove",
    title: "측정 전: meter prove",
    symptom: "전장 박스에서 값을 재기 전, 측정기 자체를 신뢰할 수 있는지 확인해야 합니다.",
    mode: "V AC 또는 V DC, 회로에 맞는 range / CAT rating 확인",
    leads: "black은 COM, red는 V/Ω jack. 절대 current jack에 꽂힌 상태로 voltage source에 대지 않습니다.",
    expect: "known live source에서 정상값, known zero에서 0V에 가까운 값. 측정 후 다시 known source로 재확인하면 더 안전합니다.",
    means: "값이 이상하면 회로가 아니라 meter, lead, fuse, jack 위치, range 설정부터 의심합니다.",
    trap: "HOLD 값, wrong mode, current jack, 손상된 lead, 낮은 CAT rating은 현장 사고의 시작점입니다."
  },
  {
    id: "24v",
    title: "24VDC control power 확인",
    symptom: "여러 sensor/relay/valve가 동시에 이상하거나 I/O가 불안정합니다.",
    mode: "V DC",
    leads: "black을 0V/common 기준점에 고정하고 red로 +24V supply, fuse line side, fuse load side, terminal block을 따라갑니다.",
    expect: "정상 supply는 보통 장비 spec 근처의 안정된 DC 전압입니다. 부하가 켜질 때 크게 sag하면 power supply, short, 과부하, loose connection을 봅니다.",
    means: "line side는 24V인데 load side가 0V면 fuse/open path 가능성. 둘 다 낮으면 upstream supply/EMO/interlock/power enable을 봅니다.",
    trap: "0V 기준점을 잘못 잡으면 정상 회로도 고장처럼 보입니다. schematic의 0V/common/earth 구분을 먼저 확인합니다."
  },
  {
    id: "fuse",
    title: "Fuse / breaker open 찾기",
    symptom: "특정 subsystem만 전원이 없고 upstream power는 살아 있습니다.",
    mode: "V DC 또는 V AC. 무전원 확인 후 resistance/continuity.",
    leads: "live 확인 시 black은 기준점, red를 fuse 양쪽에 각각 댑니다. 무전원/LOTO 후에는 fuse를 분리하거나 회로 영향을 고려해 continuity를 봅니다.",
    expect: "정상 fuse는 양쪽 모두 source 전압이 보입니다. line side만 전압이 있고 load side가 0V면 fuse open 가능성이 큽니다.",
    means: "fuse가 끊어진 것은 결과일 수 있습니다. downstream short, 잘못된 부하, wiring pinch를 확인하지 않고 교체만 반복하지 않습니다.",
    trap: "회로 안에서 저항을 재면 parallel path 때문에 오판할 수 있습니다. 필요하면 한쪽을 분리하고 공식 절차를 따릅니다."
  },
  {
    id: "relay",
    title: "Relay coil과 contact 분리 진단",
    symptom: "출력 명령은 있는 것 같은데 solenoid, pump, lamp enable, ready signal이 바뀌지 않습니다.",
    mode: "coil은 V DC/AC 또는 Ω, contact는 continuity/Ω 또는 voltage drop",
    leads: "명령 상태에서 A1-A2 coil 전압을 확인합니다. 무전원 상태에서는 coil resistance를 spec과 비교합니다. COM-NO/NC 접점은 상태별 continuity를 봅니다.",
    expect: "coil 정격 전압이 걸리면 접점 상태가 바뀌어야 합니다. coil 전압 정상인데 접점이 안 바뀌면 relay 자체, socket, mechanical sticking 가능성.",
    means: "coil이 정상이어도 접점이 나쁠 수 있고, 접점이 정상이어도 coil command가 없을 수 있습니다. 두 회로를 따로 봅니다.",
    trap: "flyback diode나 suppression circuit이 있으면 polarity와 residual voltage가 진단에 영향을 줄 수 있습니다."
  },
  {
    id: "interlock",
    title: "Interlock chain에서 끊긴 지점 찾기",
    symptom: "door, exhaust, cooling, gas box, EMO 중 하나가 not ready로 장비가 진행하지 않습니다.",
    mode: "V DC, 필요 시 schematic 기반 continuity는 무전원에서만",
    leads: "0V 기준으로 chain 시작점부터 각 contact 후단을 순서대로 찍습니다. closed contact 양단 전압강하는 거의 0V에 가까워야 합니다.",
    expect: "어느 contact 전까지 24V가 있고 후단에서 사라지면 그 contact 조건, wiring, connector, input 모듈을 확인합니다.",
    means: "interlock은 bypass 대상이 아니라 보호 기능입니다. 원인 조건이 실제 unsafe인지, sensor/wiring issue인지 분리합니다.",
    trap: "software 화면의 ready만 믿지 말고 실제 local panel, facility ready, hardwired input 상태를 같이 봅니다."
  },
  {
    id: "sensor",
    title: "3-wire sensor / proximity / switch",
    symptom: "슬릿밸브 open sensor, door switch, wafer presence, actuator position feedback이 바뀌지 않습니다.",
    mode: "V DC",
    leads: "일반적인 24V sensor는 brown +24V, blue 0V, black output인 경우가 많지만 반드시 schematic을 우선합니다. output을 0V 기준으로 확인합니다.",
    expect: "대상 상태가 바뀔 때 output이 low/high로 전환되어야 합니다. PNP/NPN, NO/NC logic은 장비 문서로 확인합니다.",
    means: "sensor 전원 없음, target 위치 불량, cable 단선, input module 문제, logic inversion을 분리합니다.",
    trap: "sensor LED가 켜져도 PLC input까지 신호가 도달하지 않을 수 있습니다. sensor output과 controller input을 둘 다 확인합니다."
  },
  {
    id: "solenoid",
    title: "Solenoid valve / pneumatic actuator",
    symptom: "command는 나갔는데 valve가 움직이지 않거나 cylinder가 늦게 움직입니다.",
    mode: "V DC/AC, Ω는 무전원에서",
    leads: "coil terminal 양단 전압을 명령 시점에 봅니다. 무전원/승인 후 coil resistance와 connector seating을 확인합니다.",
    expect: "정격 전압이 coil에 걸리고 CDA/N2 pressure가 정상이어야 움직입니다. 전압 정상인데 미동작이면 coil, valve spool, air pressure, mechanical bind를 봅니다.",
    means: "전기 명령과 공압 에너지를 분리해야 합니다. output이 정상이라고 actuator가 정상이라는 뜻은 아닙니다.",
    trap: "coil을 오래 강제 energize하거나 임의 jumper를 쓰는 것은 장비 손상과 안전 사고로 이어질 수 있습니다."
  },
  {
    id: "drop",
    title: "Voltage drop으로 loose contact 찾기",
    symptom: "무부하에서는 정상인데 부하가 켜질 때만 alarm, reset, relay chatter가 발생합니다.",
    mode: "V DC 또는 V AC",
    leads: "부하가 실제 동작 중일 때 suspect contact, connector, cable section 양단에 probe를 댑니다.",
    expect: "닫힌 접점/짧은 배선 구간의 전압강하는 작아야 합니다. 예상보다 큰 drop은 resistance 증가, loose terminal, contact wear 가능성.",
    means: "open-circuit 전압만 보면 놓치는 결함을 load-on 상태에서 잡을 수 있습니다.",
    trap: "측정 자세가 위험하면 하지 않습니다. live panel 접근은 권한, PPE, 선임 입회, site 절차가 먼저입니다."
  }
];

const electricalTheory = [
  ["Voltage / 전압", "전류를 밀어주는 전기적 압력처럼 이해합니다. DVM 전압 측정은 회로에 병렬로 대며, 기준점 선택이 결과를 좌우합니다."],
  ["Current / 전류", "실제로 흐르는 전하의 양입니다. DVM으로 직접 current를 재려면 회로를 끊고 직렬 삽입해야 하므로 현장에서는 clamp meter나 controller data를 우선 고려합니다."],
  ["Resistance / 저항", "전류 흐름을 방해하는 정도입니다. 저항/연속성/diode 측정은 전원을 끄고 stored energy를 방전한 뒤 수행합니다."],
  ["Ohm's Law", "V = I x R. 24V coil에 흐를 예상 전류, voltage drop, short 가능성을 수치로 생각하게 해줍니다."],
  ["Series / Parallel", "직렬 chain에서는 한 지점 open이 전체를 멈추고, 병렬 path는 회로 안 저항 측정을 속일 수 있습니다."],
  ["Open / Short / Ground Fault", "open은 길이 끊긴 상태, short는 원치 않는 낮은 저항 경로, ground fault는 전원이 chassis/earth 쪽으로 새는 상태입니다."],
  ["Sourcing / Sinking", "PNP는 보통 +전압을 내보내고 NPN은 0V 쪽으로 끌어내리는 방식입니다. sensor output과 PLC input type이 맞아야 합니다."],
  ["Noise / Shield / Ground", "RTP lamp, motor, inverter, relay coil은 noise source가 될 수 있습니다. shield 접지, cable routing, loose ground가 intermittent fault를 만들 수 있습니다."]
];

const relayConcepts = [
  ["Relay", "코일에 전류가 흐르면 자력이 생기고, 그 힘으로 별도 접점을 열거나 닫는 전기적 스위치입니다."],
  ["Coil A1/A2", "relay를 움직이는 전자석 부분입니다. 정격 전압, polarity, coil resistance, suppression diode를 확인합니다."],
  ["COM / NO / NC", "COM은 공통, NO는 평상시 열림, NC는 평상시 닫힘입니다. energize되면 NO는 닫히고 NC는 열리는 방향입니다."],
  ["Contact Rating", "접점이 견딜 수 있는 전압/전류/부하 종류입니다. motor, lamp, solenoid는 inrush 때문에 단순 정격보다 stress가 큽니다."],
  ["Chatter", "coil 전압 부족이나 inrush, loose terminal, control instability로 relay가 빠르게 붙었다 떨어지는 현상입니다."],
  ["SSR", "Solid State Relay. 기계 접점 대신 반도체로 switching합니다. 빠르고 수명이 길지만 leakage, heat, failure mode가 다릅니다."]
];

const electricalTroubleshooting = [
  ["No power", "main disconnect, EMO, breaker, fuse, SMPS input/output, 24V distribution, terminal block 순서로 전원이 어디서 사라지는지 봅니다."],
  ["Output command exists, load off", "controller output LED/data, relay coil, contact, fuse, connector, load coil, return path, pneumatic/mechanical energy를 분리합니다."],
  ["Input not changing", "field sensor power, sensor output, cable, junction, input module terminal, software mapping, NO/NC logic을 비교합니다."],
  ["Intermittent fault", "최근 PM/설치 변경점, loose terminal, cable strain, vibration, temperature, humidity, contact wear, min/max capture를 봅니다."],
  ["Repeated fuse blow", "fuse 교체 반복 금지. downstream short, wrong load, wire pinch, coil short, moisture, wrong fuse rating을 찾습니다."],
  ["Relay chatter", "coil voltage sag, inrush, bad supply, loose terminal, overloaded output, suppression device, contactor auxiliary feedback을 확인합니다."],
  ["Ground/noise issue", "shield termination, chassis bond, cable routing, motor/lamp switching noise, analog signal reference를 의심합니다."]
];

const dvmExpectedValueDrills = [
  {
    title: "24V sensor input이 OFF로 보일 때",
    symptom: "screen에서는 sensor off, sensor LED는 on처럼 보임",
    expected: "sensor supply는 +24V와 0V 사이에서 안정적이어야 하고, output은 target 상태에 따라 high/low가 명확히 바뀌어야 한다.",
    evidence: "sensor supply, sensor output, PLC input terminal을 같은 기준점에서 비교한다.",
    safety: "live I/O 측정은 승인된 low-voltage panel 접근과 meter prove 후에만 수행한다.",
    report: "Sensor LED와 controller input이 다르게 보여 supply/output/input terminal을 분리 측정하겠습니다."
  },
  {
    title: "Relay chatter가 부하 on 때만 발생",
    symptom: "idle은 정상, solenoid bank on 순간 relay가 떨림",
    expected: "coil 양단은 정격 근처로 유지되어야 하며 closed contact 양단 voltage drop은 작아야 한다.",
    evidence: "SMPS output, fuse load side, relay coil, suspect contact 양단 voltage drop을 부하 on 상태에서 비교한다.",
    safety: "energized cabinet 측정 권한, PPE, CAT rating, lead 위치가 불확실하면 측정하지 않는다.",
    report: "무부하 정상값만으로는 부족해 load-on voltage drop으로 high resistance 또는 overload를 분리하겠습니다."
  },
  {
    title: "Fuse가 반복해서 open",
    symptom: "교체하면 잠시 살아나지만 같은 subsystem fuse가 다시 끊김",
    expected: "정상 부하는 fuse rating 안의 전류를 사용해야 하며 downstream short나 coil fault가 없어야 한다.",
    evidence: "fuse line/load side 전압, 무전원 상태 downstream resistance, cable pinch, load coil resistance를 확인한다.",
    safety: "더 큰 fuse로 바꾸거나 반복 교체하는 행동은 금지. LOTO와 stored energy discharge가 먼저다.",
    report: "Fuse open은 결과일 수 있으므로 downstream short, load coil, cable pinch를 확인한 뒤 교체 여부를 판단하겠습니다."
  },
  {
    title: "Interlock ready가 간헐적으로 떨어짐",
    symptom: "door/exhaust/cooling ready가 순간적으로 drop",
    expected: "closed interlock chain의 각 접점 후단은 expected ready voltage를 유지하고, 접점 양단 drop은 매우 작아야 한다.",
    evidence: "chain 시작점부터 각 contact 후단 voltage, local ready status, tool input state를 timestamp로 맞춘다.",
    safety: "interlock은 보호 기능이므로 bypass나 jumper는 학습/현장 모두 금지 영역이다.",
    report: "Interlock drop은 실제 unsafe condition인지 signal path 문제인지 chain segment별 expected/actual로 분리하겠습니다."
  },
  {
    title: "Solenoid command는 있는데 valve가 안 움직임",
    symptom: "controller output on, actuator motion 없음",
    expected: "coil 양단 전압이 정격에 가깝고 CDA/N2 pressure가 충분하면 actuator가 움직여야 한다.",
    evidence: "controller output, relay/contact, coil voltage, return path, pneumatic pressure, actuator feedback을 분리한다.",
    safety: "강제 energize, 임의 jumper, pinch point 접근은 승인 없는 행동으로 금지한다.",
    report: "전기 command와 pneumatic energy를 분리해 coil voltage, air pressure, feedback timing을 확인하겠습니다."
  },
  {
    title: "Analog signal이 noise처럼 흔들림",
    symptom: "pressure/temperature/flow feedback이 실제보다 빠르게 요동",
    expected: "sensor supply와 signal reference는 안정적이고 shield/ground path는 장비 문서와 맞아야 한다.",
    evidence: "sensor supply, signal, reference, nearby switching load, cable route, shield termination을 비교한다.",
    safety: "ground/shield를 임의로 변경하면 더 큰 noise나 안전 문제가 생길 수 있어 승인 절차가 필요하다.",
    report: "Analog noise는 sensor fault로 단정하지 않고 supply/reference/cable routing/switching load를 함께 확인하겠습니다."
  }
];

const electricalSafetyRules = [
  "전기 작업은 de-energize가 기본입니다. live 측정이 필요하더라도 자격, 승인, PPE, 선임 입회, site rule을 먼저 확인합니다.",
  "LOTO는 전기만이 아니라 pneumatic, hydraulic, vacuum, thermal, mechanical, chemical stored energy까지 포함해 생각합니다.",
  "DVM은 회로 category와 voltage rating에 맞는 CAT rating, lead rating, fuse protection이 필요합니다.",
  "저항/연속성/diode/capacitance 측정은 전원 차단과 capacitor 방전 후 수행합니다.",
  "current jack에 lead가 꽂힌 상태로 전압 source에 대면 short/arc 사고가 날 수 있습니다.",
  "interlock, EMO, gas/exhaust ready signal은 bypass 대상이 아닙니다. 원인과 승인 절차가 먼저입니다.",
  "측정할 수 없을 만큼 위험하거나 권한 밖이면 좋은 CE는 멈추고 escalation합니다."
];

const compliance = [
  "삼성 평택 Fab의 구체적 현장 규칙은 공개 자료만으로 완전 확인할 수 없으므로, 입사 후 고객 site orientation과 Applied EHS 교육을 최우선으로 따른다.",
  "대형 semiconductor fab은 cleanroom 완공, base build, process lateral systems, tool install이 연결되는 프로젝트 구조로 이해한다.",
  "PPE, cleanroom gowning, escort, photography, data handling, tool access, chemical/gas work permit, LOTO, working at height는 site-specific rule을 따른다.",
  "SEMI S2/S8/S6/S14/S19/S22/S24 등은 장비 안전, 인체공학, 배기, 화재위험, 설치/정비 인력 교육, 전장 설계, multi-employer work area 관점에서 CE가 알아야 할 공개 표준 축이다.",
  "고객 라인에서는 속도보다 stop-work authority, 증거 기반 보고, 승인 없는 변경 금지, bypass 금지가 우선이다."
];

const seniorPlaybook = [
  "알람을 보면 부품부터 떠올리지 말고 energy, material, motion, information flow로 나눈다.",
  "PM/installation 이후 문제는 변경점, 손댄 부위, connector, seal, valve state, calibration file부터 확인한다.",
  "진단 문장은 '관찰값 -> 가능한 원인 -> 다음 확인 -> 리스크' 순서로 말한다.",
  "고객 앞에서는 모르는 것을 숨기지 말고 확인 계획과 escalation owner를 명확히 한다.",
  "시니어가 되는 지름길은 정상 baseline을 많이 보는 것이다. pumpdown curve, MFC response, temperature trace, robot cycle time의 정상 패턴을 저장해둔다.",
  "장비 내부 지식은 public 자료로 끝나지 않는다. 입사 후에는 install manual, FSE training, FMEA, EHS report, customer spec, site punch list를 연결해서 공부한다."
];

const sources = [
  ["Applied Materials RTP 소개", "https://www.appliedmaterials.com/us/en/semiconductor/products/processes/rapid-thermal-processing-treatments.html"],
  ["Applied Materials Epitaxy 소개", "https://www.appliedmaterials.com/il/en/semiconductor/semiconductor-technologies/epitaxy.html"],
  ["Centura Prime Epi 공개 제품 페이지", "https://www.appliedmaterials.com/us/en/product-library/centura-prime-epi.html"],
  ["Vantage Vulcan RTP 공개 제품 페이지", "https://www.appliedmaterials.com/us/en/product-library/vantage-vulcan-rtp.html"],
  ["Vantage Radiance Plus RTP 공개 제품 페이지", "https://www.appliedmaterials.com/us/en/product-library/vantage-radiance-plus-rtp.html"],
  ["Applied Technical Glossary", "https://www.appliedmaterials.com/us/en/glossary.html"],
  ["SEMI Safety Standards 목록", "https://www.semi.org/en/products-services/standards/safety"],
  ["SEMI EHS Guidelines 개요", "https://www.semi.org/en/node/114001"],
  ["OSHA Semiconductor Standards 목록", "https://www.osha.gov/semiconductors/standards"],
  ["Samsung Pyeongtaek Fab 규모 소개", "https://semiconductor.samsung.com/support/tools-resources/fabrication-process/a-lego-model-of-the-worlds-largest-semiconductor-production-line-fab-on-the-block/"],
  ["Samsung Semiconductor EHS 공개 설명", "https://news.samsung.com/global/employee-health-and-safety-at-semiconductor-facilities"]
];

sources.push(
  ["OSHA Semiconductor Device Fabrication - Toxic Exhaust Gases", "https://www.osha.gov/semiconductors/silicon/device-fabrication"],
  ["SEMI S18 Flammable Silicon Compounds Guideline", "https://store-us.semi.org/products/s01800-semi-s18-environmental-health-and-safety-guideline-for-flammable-silicon-compounds"],
  ["Silicon precursor gases overview", "https://www.siadmi.com/web/siad-poland/silicon-precursor-gases"],
  ["EPA HERO toxic gas controls reference", "https://hero.epa.gov/reference/5380137/"],
  ["Silane/Disilane Safety abstract", "https://sesha.org/abstract/silane-disilane-safety/"]
);

sources.push(
  ["Applied Centura Xtera Epi", "https://www.appliedmaterials.com/us/en/product-library/centura-xtera-epi.html"],
  ["Applied Centura Prime Epi", "https://www.appliedmaterials.com/us/en/product-library/centura-prime-epi.html"],
  ["Applied Centura Epi 200mm", "https://www.appliedmaterials.com/us/en/product-library/centura-epi-200mm.html"],
  ["Stanford AMAT Centura Epi public tool page", "https://snfguide.stanford.edu/guide/equipment/amat-centurion-epitaxial-system-epi2"],
  ["Applied Vantage Radiance Plus RTP", "https://www.appliedmaterials.com/us/en/product-library/vantage-radiance-plus-rtp.html"],
  ["Applied Vantage Vulcan RTP", "https://www.appliedmaterials.com/us/en/product-library/vantage-vulcan-rtp.html"],
  ["Applied Vantage Astra DSA", "https://www.appliedmaterials.com/us/en/product-library/vantage-astra-dsa.html"],
  ["Applied Vantage RadOx RTP", "https://www.appliedmaterials.com/cn/zh_cn/semiconductor/products/modify/rapid-thermal-processing-treatments/vantage-radox-rtp.html"]
);

sources.push(
  ["SIA Semiconductor Glossary", "https://www.semiconductors.org/wp-content/uploads/2023/05/SIA-PFAS-Consortium-Glossary.pdf"],
  ["Lam Research Technical Glossary", "https://www.lamresearch.com/technical-glossary/"],
  ["Hitachi High-Tech Semiconductor Glossary", "https://www.hitachi-hightech.com/global/en/knowledge/semiconductor/room/words.html"],
  ["TI Manufacturing Terminology", "https://www.ti.com/about-ti/company/ti-at-a-glance/manufacturing/manufacturing-terminology.html"],
  ["RTP emissivity pattern paper", "https://web.njit.edu/~sirenko/PapersNJIT/Ravi_JEM_2006.pdf"],
  ["Chris Mack RTP Lecture", "https://www.lithoguru.com/scientist/CHE323/Lecture19.pdf"],
  ["Model-based RTP Control Paper", "https://scsolutions.com/wp-content/uploads/RTP.pdf"],
  ["Selective Epitaxy of Group IV Materials", "https://www.intechopen.com/chapters/60757"],
  ["ASM Epitaxy Technology Overview", "https://www.asm.com/our-technology-products/epitaxy"],
  ["FM Semiconductor Fabrication Facilities Data Sheet", "https://www.fm.com/FMAApi/data/ApprovalStandardsDownload?itemId=%7B417F20B6-EFCA-463A-935C-3C52DEBEA28B%7D"]
);

sources.push(
  ["Applied Blog: Centura Platform overview", "https://www.appliedmaterials.com/us/en/blog/blog-posts/a-new-equipment-platform-for-a-new-era-of-chipmaking.html"],
  ["Applied Centura Etch architecture note", "https://www.appliedmaterials.com/us/en/product-library/centura-etch.html"],
  ["Generic cluster tool components", "https://www.globalspec.com/learnmore/manufacturing_process_equipment/vacuum_equipment/thin_film_equipment/semiconductor_process_systems_cluster_tools"],
  ["Centura cluster tool patent schematic context", "https://patents.google.com/patent/EP1056123A2/en"],
  ["ResearchGate Centura cluster tool figure context", "https://www.researchgate.net/figure/llustration-of-the-Applied-Materials-Centura-cluster-tool-and-the-OLT-integrated-film_fig1_253747030"],
  ["Used Centura Epi 300 public configuration example", "https://www.macquarie.com/au/en/about/company/commodities-and-global-markets/specialised-and-asset-finance/electronics/inventory/semiconductor-fabrication/epitaxial-silicon--epi-/227832.html"],
  ["Hybrid cluster tool architecture", "https://www.semiconductoronline.com/doc/hybrid-cluster-tool-architectures-for-300mm-a-0001"]
);

sources.push(
  ["Pfeiffer Vacuum Load Lock and Transfer", "https://www.pfeiffervacuum.com/global/en/applications/load-lock-transfer/"],
  ["Roediger & Karpicke 2006 Testing Effect", "https://pubmed.ncbi.nlm.nih.gov/16507066/"],
  ["Retrieval practice and long-term retention", "https://pubmed.ncbi.nlm.nih.gov/20951630/"],
  ["The Gamification of Learning: a Meta-analysis", "https://link.springer.com/article/10.1007/s10648-019-09498-w"],
  ["Test-enhanced learning review", "https://pmc.ncbi.nlm.nih.gov/articles/PMC4477741/"]
);

sources.push(
  ["SEMI Safety Standards list", "https://www.semi.org/en/products-services/standards/safety"],
  ["SEMI EHS Guidelines overview", "https://www.semi.org/en/node/114001"],
  ["SEMI S24 Multi-Employer Work Areas", "https://store-us.semi.org/products/s02400-semi-s24-safety-guideline-for-multi-employer-work-areas"],
  ["Semiconductor base build / PLS / tool install", "https://jedunn.com/blog/closing-the-loop-integrating-design-construction-in-semiconductor-manufacturing/"],
  ["Semiconductor fab tool installation patent", "https://patents.google.com/patent/US7039999B2/en"],
  ["Site Acceptance Test overview", "https://operations1.com/en/glossary/site-acceptance-test"]
);

sources.push(
  ["Spacing review: Using Spacing to Enhance Diverse Forms of Learning", "https://files.eric.ed.gov/fulltext/ED536925.pdf"],
  ["Interleaved practice and transfer", "https://pmc.ncbi.nlm.nih.gov/articles/PMC8476370/"],
  ["Worked examples and cognitive load", "https://pmc.ncbi.nlm.nih.gov/articles/PMC8379662/"],
  ["Retrieval practice enhances new learning", "https://pmc.ncbi.nlm.nih.gov/articles/PMC3983480/"],
  ["Cognitive science and retrieval practice", "https://pubmed.ncbi.nlm.nih.gov/30125899/"]
);

sources.push(
  ["Fluke ABCs of DMMs", "https://media.fluke.com/ade6b718-4577-4b57-903b-b10600664c67_original%20file.pdf"],
  ["Fluke ABCs of multimeter safety", "https://media.fluke.com/51012112-8f43-4aa7-a30a-b2e3016e8f2f_original%20file.pdf"],
  ["Fluke 87V MAX User Manual measurement cautions", "https://media.fluke.com/d6882a66-83b2-4309-9ea7-b10800c2b791_original%20file.pdf"],
  ["OSHA Control of Hazardous Energy", "https://www.osha.gov/control-hazardous-energy"],
  ["NIOSH Hazardous Energy Control", "https://www.cdc.gov/niosh/manufacturing/hazardous-energy-control/index.html"],
  ["NFPA 70E safe electrical work practices overview", "https://www.nfpa.org/product/70e-safe-electrical-work-practices-training-series/ols70esewp"],
  ["Omron General-purpose Relay Technical Guide", "https://edata.omron.com.au/eData/Relays/GeneralRelay_TG.pdf"]
);

sources.push(
  ["NOAA CAMEO Germane", "https://cameochemicals.noaa.gov/chemical/809"],
  ["NOAA CAMEO Silicon Tetrachloride", "https://cameochemicals.noaa.gov/chemical/4437"],
  ["NOAA CAMEO Ozone", "https://cameochemicals.noaa.gov/chemical/5102"],
  ["NIOSH Pocket Guide Ammonia", "https://www.cdc.gov/niosh/npg/npgd0028.html"],
  ["SIA Environment, Health & Safety Practices Fact Sheet", "https://www.semiconductors.org/wp-content/uploads/2024/12/SIA_Environment-Health-Safety-Practices_Fact-Sheet-12-9-24.pdf"],
  ["Applied Materials Field Service Engineer role reference", "https://jobs.appliedmaterials.com/job/austin/field-service-engineer/95/93828167312"]
);

sources.push(
  ["NIOSH IDLH Chemical Values", "https://www.cdc.gov/niosh/idlh/intridl4.html"],
  ["Public load-lock / atmospheric front-end patent", "https://patents.google.com/patent/WO1999035673A1/en"],
  ["Public pre-clean and chamber evacuation patent", "https://patents.google.com/patent/US7651948B2/en"]
);

sources.push(
  ["Applied Materials Next-Gen Xtera launch", "https://ir.appliedmaterials.com/news-releases/news-release-details/applied-materials-unveils-next-gen-chipmaking-products"],
  ["Applied Vantage RadOx RTP", "https://www.appliedmaterials.com/us/en/product-library/vantage-radox-rtp.html"],
  ["Applied Vantage platform shipment / install-time context", "https://ir.appliedmaterials.com/news-releases/news-release-details/applied-materials-ships-250th-vantage-system-most-productive-rtp"],
  ["Fortrend Vacuum Transfer Module basics", "https://www.fortrend.com/technical-blog/what-are-the-basic-components-of-a-vacuum-transfer-module-vtm-.html"],
  ["Hine Automation EFEM systems", "https://hineautomation.com/products/efem-systems/"],
  ["Kurt J. Lesker load lock FAQ", "https://www.lesker.com/newweb/faqs/question.cfm?id=28"],
  ["NIOSH Pocket Guide Hydrogen Chloride", "https://www.cdc.gov/niosh/npg/npgd0332.html"],
  ["NIOSH Pocket Guide Phosphine", "https://www.cdc.gov/niosh/npg/npgd0505.html"],
  ["NIOSH Pocket Guide Diborane", "https://www.cdc.gov/niosh/npg/npgd0183.html"],
  ["NOAA CAMEO Silane", "https://cameochemicals.noaa.gov/chemical/4434"],
  ["NOAA CAMEO Dichlorosilane", "https://cameochemicals.noaa.gov/chemical/3167"],
  ["NOAA CAMEO Arsine", "https://cameochemicals.noaa.gov/chemical/178"],
  ["NOAA CAMEO Phosphine", "https://cameochemicals.noaa.gov/chemical/1322"],
  ["Selective SiGe epitaxy patent context", "https://patents.google.com/patent/US11018003B2/en"],
  ["RTP wafer temperature uniformity patent context", "https://patents.google.com/patent/US20080025368A1/en"],
  ["Group IV selective epitaxy overview", "https://www.intechopen.com/chapters/60757"],
  ["RTP temperature uniformity design paper", "https://www.mdpi.com/2079-9292/7/10/213"]
);

const sourceQualityMap = [
  ["A급: 공식 제품/채용/EHS", "Applied 공식 제품 페이지, Applied IR/news, Applied 채용공고, Samsung 공식 페이지, OSHA/NIOSH/SEMI/SIA처럼 원 출처가 명확한 자료입니다. 웹에는 이 내용을 가장 굵은 사실로 넣습니다."],
  ["B급: 표준/특허/논문", "SEMI 표준 목록, Google Patents, peer-reviewed/open lecture 자료는 구조와 원리를 이해하는 데 강합니다. 단, 실제 고객 tool configuration으로 단정하지 않습니다."],
  ["C급: 산업 공급사/교육 자료", "EFEM, load-lock, gas detection, vacuum supplier 자료는 개념 설명에 유용하지만 특정 Applied/Samsung 절차로 쓰지 않습니다."],
  ["D급: 중고장비/블로그/커뮤니티", "사진, chamber 수, 옵션 감각을 얻는 보조자료입니다. 정답으로 쓰지 않고 '가능한 configuration 예시'로만 취급합니다."],
  ["금지: 비공개 절차 대체", "구글에 있다고 해도 valve sequence, detector setpoint, interlock bypass, purge recipe, 고객 acceptance limit는 현장 공식 문서와 승인 없이는 절대 실행 지식으로 쓰지 않습니다."]
];

const publicEvidenceDossier = [
  ["직무 정체성", "Applied CE/FSE 공개 채용공고는 install, maintain, upgrade, digital analytics troubleshooting, electrical/vacuum/mechanical/plasma/hydraulic/gas systems PM/CM을 언급합니다. 즉 FEP/EPI는 단일 장비명이 아니라 front-end 장비군 담당 업무로 보는 것이 안전합니다."],
  ["Centura Prime Epi", "Applied 공식 페이지는 Centura RP Epi 경험을 기반으로 Prime Epi가 구성성과 process capability를 개선했고, source-drain/channel/contact, FinFET/GAA, memory/power/analog/MEMS 응용과 Centura platform integrated pre-clean을 설명합니다."],
  ["Centura Xtera Epi", "Applied 공식 제품/IR 자료는 Xtera를 GAA source-drain 고종횡비 구조의 selective epitaxy 문제를 겨냥한 장비로 설명하고, low-volume chamber, integrated pre-clean/etch, 50% lower gas usage, 40%+ cell-to-cell uniformity improvement를 공개합니다."],
  ["Centura Epi 200mm", "Applied 공식 페이지는 200mm Centura Epi를 single-wafer multi-chamber silicon epitaxy 제품으로 설명하고, thick epi, Rs, defect density, thickness uniformity, particle performance, flexible gas panel, SiGe/Ge capability, Siconi pre-clean 옵션을 언급합니다."],
  ["Vantage Radiance Plus RTP", "Applied 공식 자료는 high-volume atmospheric RTP, single-unit shipment, honeycomb lamp source, seven-point temperature measurement, 100 Hz closed-loop control, 240 rpm wafer rotation을 공개합니다."],
  ["Vantage Vulcan RTP", "Applied 공식 페이지는 pattern loading effect 대응, bottom-side lamp heating, 150-1300C process range, sub-second/low-temperature/metal anneal, transmission-based multi-point temperature measurement를 설명합니다."],
  ["Vantage RadOx RTP", "Applied 공식 페이지는 radical oxidation chemistry, low thermal budget, gate oxide/STI liner/sacrificial oxide/flash tunnel oxide/ONO stack, in-process monitoring을 공개합니다."],
  ["Cluster 구조", "Applied Centura platform 공개 글과 patent 자료는 Centura를 high-vacuum capability와 advanced robotics를 갖춘 multi-chamber platform으로 설명합니다. public cluster tool 자료는 load lock, central transfer chamber, process chamber, robot handoff를 공통 구성으로 설명합니다."],
  ["EFEM / Load Lock", "EFEM 공급사 자료는 EFEM이 FOUP 같은 ultra-clean carrier와 parent tool 사이 wafer를 운반한다고 설명합니다. Load lock 자료는 process chamber vacuum을 깨지 않고 대기-진공 사이 transfer를 가능하게 해 contamination과 cycle time을 줄인다고 설명합니다."],
  ["EPI gas chemistry", "OSHA와 silicon precursor 자료는 CVD/EPI 맥락에서 silane, silicon tetrachloride, ammonia, nitrous oxide, arsine, phosphine, diborane 등을 언급합니다. Selective SiGe 공개 특허/논문은 silane/DCS/germane precursor와 HCl etchant/selectivity 맥락을 보여줍니다."],
  ["RTP 진단 원리", "RTP 공개 논문/특허는 wafer emissivity/pattern loading, pyrometry, lamp power feedback, wafer rotation, multi-point temperature measurement가 uniformity와 repeatability에 연결됨을 보여줍니다."],
  ["EHS 큰 축", "SEMI는 S2, S6, S8, S18, S19, S22, S24 등 equipment safety, exhaust ventilation, ergonomics, flammable silicon compounds, training, electrical design, multi-employer work area를 공개 목록으로 제시합니다."],
  ["LOTO / Stored Energy", "NIOSH/OSHA는 servicing/maintenance 중 unexpected energization, start-up, stored energy release를 막기 위해 hazardous energy control/LOTO 체계가 필요하다고 설명합니다. 전기뿐 아니라 pneumatic, hydraulic, chemical, thermal, mechanical energy 사고로 확장해 봐야 합니다."],
  ["삼성 평택 공개 범위", "Samsung 공개 자료는 평택 campus/fab 규모, cleanroom, EHS 조직과 화학물질 관리 의지를 설명하지만, 실제 라인별 POC, escort, permit, photo, emergency route, gas response rule은 공개자료로 확인할 수 없습니다."]
];

const fieldTranslationRules = [
  ["공식 제품 문구 -> CE 질문", "예: 'integrated pre-clean'은 '어떤 chamber가 vacuum break 없이 연결되는가, pre-clean 후 queue time과 interface contamination을 어떻게 확인하는가'라는 질문으로 바꿉니다."],
  ["숫자 스펙 -> 증거 요구", "예: 100 Hz closed-loop, 240 rpm rotation, 7-point measurement는 외우는 숫자가 아니라 temperature trace, rotation status, sensor health, chamber matching evidence로 바꿉니다."],
  ["gas 이름 -> hazard family", "gas name을 외우기보다 toxic hydride, chlorosilane, fuel gas, oxidizer, inert/asphyxiant, corrosive exhaust로 분류합니다."],
  ["cluster 그림 -> pressure boundary", "LL/TM/PM/CM 배치는 그림 암기가 아니라 대기압 EFEM, pump/vent되는 LL, high-vacuum TM, process chamber 사이 boundary와 gate valve 조건을 말할 수 있어야 합니다."],
  ["논문 변수 -> troubleshooting 변수", "emissivity, pattern loading, HCl selectivity, Ge incorporation 같은 논문 용어는 현장에서는 sensor, temperature uniformity, gas delivery, defect map, metrology 질문으로 번역합니다."],
  ["standards 이름 -> stop condition", "SEMI/OSHA/NIOSH 이름을 외우는 데서 끝내지 말고 '어떤 작업을 멈춰야 하는가, 누가 승인해야 하는가, 어떤 evidence가 있어야 하는가'로 바꿉니다."]
];

const publicBoundaryRules = [
  ["공개자료로 확정 가능", "장비 family 이름, 공개 제품 포트폴리오, 공정 목적, 일반 cluster 구조, 일반 gas hazard, 일반 EHS/LOTO 원칙, 논문 수준 공정 변수"],
  ["공개자료로 추정만 가능", "chamber count, process module combination, pre-clean/etch option, gas panel option, customer node/application, site-specific qualification flow"],
  ["공개자료로 확정 금지", "정확한 valve sequence, purge cycle, interlock logic, detector setpoint, gas concentration/pressure, customer recipe, acceptance limit, pass/fail value"],
  ["현장에서만 확인", "Applied install manual, customer site spec, SDS binder, gas matrix, P&ID/as-built, permit, senior witness, EHS approval, process owner sign-off"],
  ["AI/웹 학습의 올바른 사용", "작업 지시서가 아니라 질문 생성기, checklist 초안, 위험 분류 훈련, 보고 문장 연습, 공식 문서 확인 전 gap finder로 사용합니다."]
];

const publicFacts = [
  ["RTP 공정 목적", "Applied 공개 자료는 RTP/anneal을 wafer를 짧은 시간 특정 온도로 가열해 conductivity, permittivity, densification, contamination reduction 등 물성 변화를 만드는 영역으로 설명합니다."],
  ["RTP 방식", "공개 자료에서 soak, spike, millisecond anneal과 thermal-radical oxidation이 응용별로 언급됩니다. CE는 방식 이름보다 시간-온도 budget, repeatability, uniformity가 왜 중요한지 이해해야 합니다."],
  ["Vantage Radiance Plus", "공개 제품 설명에는 honeycomb lamp source, seven-point temperature measurement, 100 Hz closed-loop control, 240 rpm wafer rotation이 언급됩니다. 설치/진단 관점에서는 lamp zone, sensor 신뢰도, rotation, cooling, trace data가 연결됩니다."],
  ["Vantage Vulcan", "공개 설명은 lamp-based RTP, transmission-based multi-point temperature measurement, low-temperature closed-loop capability, wafer-to-wafer repeatability를 강조합니다."],
  ["Vantage RadOx", "공개 설명은 radical oxidation chemistry와 low thermal budget, gate oxide/STI liner/sacrificial oxide/flash tunnel oxide/ONO stack 응용을 강조합니다."],
  ["Epitaxy 공정 목적", "Epitaxy는 결정성 foundation layer를 만들거나 engineered electrical properties를 가진 crystalline film을 증착하고 underlayer mechanical/electrical attribute를 바꾸는 공정으로 소개됩니다."],
  ["Centura Prime Epi", "공개 제품 설명은 source-drain, channel, contact, FinFET, GAA, memory/power/analog/MEMS 응용과 integrated pre-clean을 언급합니다."],
  ["Centura Xtera Epi", "공개 발표/제품 설명은 GAA source-drain 구조, selective epitaxy, low-volume chamber architecture, integrated pre-clean/etch, gas usage reduction 같은 방향을 설명합니다."],
  ["Centura Epi 200mm", "공개 제품 설명은 single-wafer multi-chamber EPI, thick epi, SiGe/Ge, flexible gas panel, Siconi pre-clean, ATM/RP epi chamber 방향을 언급합니다."],
  ["Load Lock / EFEM", "public vacuum/automation 자료는 load lock을 대기와 vacuum mainframe 사이 gateway로 설명하고, EFEM은 FOUP와 parent tool 사이 wafer handling module로 설명합니다."],
  ["SEMI/OSHA/NIOSH", "공개 안전 자료들은 EHS guideline, exhaust ventilation, electrical design, installation/maintenance personnel training, multi-employer work area, hazardous energy control을 CE가 반드시 언어로 이해해야 하는 축으로 보여줍니다."],
  ["Customer Engineer 역할", "Applied 채용공고는 고객 onsite에서 install, maintain, upgrade를 수행하고 digital analytics로 troubleshooting하며 electrical, vacuum, mechanical, plasma, hydraulic, gas system을 다룬다고 설명합니다."]
];

const diagnosticMatrix = [
  ["Temperature uniformity", "RTP", "lamp zone, pyrometry/emissometry, wafer rotation, chamber window condition, cooling stability, recipe change history"],
  ["Pumpdown/base pressure", "Vacuum", "door seal, O-ring, valve state, pump health, foreline restriction, gauge calibration, recent PM work"],
  ["MFC setpoint mismatch", "Gas", "supply pressure, regulator, pneumatic valve, filter/restriction, MFC zero/span, gas cabinet ready, purge status"],
  ["Particle/defect jump", "EPI", "PM disturbance, chamber clean, wafer handling contact, pre-clean effectiveness, gas purity, exhaust/backstreaming, recipe drift"],
  ["Robot transfer alarm", "Mechanical", "teach position, leveling, end-effector, sensor timing, slit valve motion, cassette seating, vibration"],
  ["Interlock not ready", "Safety/facility", "exhaust/abatement status, cooling flow, door/cover, gas box, EMO loop, facility signal wiring, customer permit state"],
  ["Host/data issue", "Controls", "network, time sync, recipe permission, alarm history, data access policy, software revision, customer security approval"],
  ["Load lock 반복 vent/pump issue", "Vacuum/automation", "LL door seal, roughing path, vent N2 path, pressure gauge, slit valve state, EFEM handoff timing, wafer mapping state"],
  ["Pre-clean 이후 EPI defect", "Interface/process", "vacuum break history, pre-clean chamber health, queue time, surface oxide removal, transfer contamination, chamber seasoning, metrology correlation"],
  ["RadOx/oxidation repeatability issue", "RTP/chemistry", "oxygen/ozone/N2O/NH3 option, radical source/destructor, temperature trace, in-process monitor, exhaust/abatement readiness, seal/material compatibility"],
  ["Subfab fault가 tool fault처럼 보임", "Facility/subfab", "abatement ready, pump health, foreline pressure, exhaust flow, PCW/chiller trend, signal mapping, owner handoff"]
];

const installDeliverables = [
  ["Site readiness checklist", "utility availability, facility owner, drawing revision, POC label, floor/load/clearance, cleanroom route, EHS permits"],
  ["Move-in record", "crate condition, shock/tilt, photo log, missing parts, rigging handoff, contamination control"],
  ["Hook-up record", "power verification, gas/purge/leak evidence, exhaust/abatement ready, cooling flow, vacuum integrity, as-built changes"],
  ["Bring-up checklist", "EMO/E-stop, interlocks, controller boot, I/O map, sensor scaling, pumpdown, valve/MFC response, robot dry run"],
  ["Qualification package", "baseline trend, wafer handling reliability, process/metrology acceptance, open punch list, customer sign-off"],
  ["Shift handover", "current status, blockers, risk, next action, owner, ETA, parts/tools needed, customer communication history"]
];

const installGapRadar = [
  ["Site Boundary", "고객 facility scope와 OEM tool scope를 헷갈리면 일정과 안전이 동시에 무너집니다.", "POC label, drawing revision, owner, witness, permit를 한 장으로 묶어 확인합니다."],
  ["Evidence Habit", "초보자는 '확인했다'고 말하지만 선임은 trace, 사진, sign-off, trend, log를 남깁니다.", "각 phase마다 통과 증거와 중단 조건을 먼저 적습니다."],
  ["Safety Envelope", "gas, exhaust, abatement, interlock, energized power는 일정 때문에 밀어붙일 수 없는 영역입니다.", "SEMI S2/S6/S19/S24 관점으로 stop authority와 multi-employer work area를 학습합니다."],
  ["Process Link", "설치 문제는 결국 particle, pumpdown, temperature, film uniformity, transfer reliability로 돌아옵니다.", "facility 값과 chamber baseline을 qualification 결과에 연결합니다."]
];

const installMissionStages = [
  {
    badge: "M1",
    title: "Site Readiness Walkdown",
    goal: "장비가 들어오기 전에 floor, route, POC, utility, owner, permit, blocker를 닫습니다.",
    evidence: ["tool matrix와 POC 목록", "drawing revision", "site readiness punch list", "owner / ETA"],
    stop: "POC label이 drawing과 다르거나 exhaust/abatement/gas release owner가 불명확하면 move-in 이후로 넘기지 않습니다.",
    senior: "이 utility는 누가 열고, 누가 witness하며, 실패하면 누가 복구하는가?"
  },
  {
    badge: "M2",
    title: "Move-in / Set / Level",
    goal: "crate damage, rigging route, footprint, service clearance, leveling, seismic/anchor 조건을 현장에서 맞춥니다.",
    evidence: ["shock/tilt 기록", "damage photo log", "leveling record", "service clearance check"],
    stop: "damage, missing kit, clearance 간섭, access obstruction이 있으면 설치 속도보다 deviation 기록이 먼저입니다.",
    senior: "이 위치에서 PM door, pump cart, gas box, EMO 접근이 실제 작업 자세로 가능한가?"
  },
  {
    badge: "M3",
    title: "Module Docking / Vacuum Boundary",
    goal: "LL, TM, PM/CM이 gate valve와 robot reach 안에서 wafer path를 안정적으로 만들도록 맞춥니다.",
    evidence: ["module seating check", "gate valve alignment", "robot blade teach plan", "vacuum seal inspection"],
    stop: "docking face, slit valve, blade height, LL handoff 기준이 맞지 않으면 dry run 전 수정합니다.",
    senior: "wafer가 지나가는 모든 boundary에서 pressure, door, sensor, robot handoff가 어떤 순서로 맞물리는가?"
  },
  {
    badge: "M4",
    title: "시설 Hook-up",
    goal: "power, gas, exhaust, abatement, PCW/chiller, vacuum, CDA/N2, network를 scope별로 연결하고 증거화합니다.",
    evidence: ["power/ground check", "purge/leak record", "exhaust/abatement ready", "cooling flow", "as-built markup"],
    stop: "gas line release, interlock bypass, facility valve operation은 승인과 입회 없이 진행하지 않습니다.",
    senior: "실제 flow/pressure/ready signal이 화면 값과 물리 상태 모두에서 맞는가?"
  },
  {
    badge: "M5",
    title: "Safety / Controls Bring-up",
    goal: "EMO/E-stop, covers, gas box, exhaust, cooling, vacuum, PLC I/O, host/data 상태를 먼저 안정화합니다.",
    evidence: ["interlock matrix", "I/O status", "alarm history", "sensor scaling", "pumpdown trend"],
    stop: "safety interlock이 불명확하거나 alarm을 설명하지 못하면 recipe나 wafer 단계로 넘어가지 않습니다.",
    senior: "이 alarm은 원인인가 결과인가, hardwired chain인가 software state인가?"
  },
  {
    badge: "M6",
    title: "Wafer Path / Qualification",
    goal: "robot dry run, LL pump/vent, PM transfer, temperature/gas/vacuum baseline, process acceptance를 연결합니다.",
    evidence: ["wafer transfer count", "pumpdown curve", "MFC response", "temperature trace", "metrology baseline"],
    stop: "particle jump, transfer scratch, temperature drift, leak suspicion은 production release 전에 닫습니다.",
    senior: "acceptance fail이면 rework 범위와 retest 범위를 어디까지 잡을 것인가?"
  }
];

const installInteractiveChecklist = [
  {
    id: "move-in",
    title: "Move-in / Rigging",
    owner: "CE + rigging vendor + customer EHS",
    evidence: ["route clear photo", "shock/tilt indicator", "crate damage check", "cleanroom entry permit"],
    stop: "crate damage, route obstruction, floor/load uncertainty, unapproved rigging point가 있으면 hold",
    report: "Move-in risk는 route, crate condition, EHS permit 기준으로 확인 중이며 blocker는 punch item으로 분리하겠습니다."
  },
  {
    id: "set-place",
    title: "Set in Place / Footprint",
    owner: "CE + customer facility + layout owner",
    evidence: ["tool footprint match", "service clearance", "gas box/pump access", "EMO/access path"],
    stop: "service door, pump cart, emergency access, gas box 접근이 막히면 위치 확정 금지",
    report: "Tool 위치는 footprint뿐 아니라 service access와 emergency access 기준으로 검증하겠습니다."
  },
  {
    id: "leveling",
    title: "Leveling / Module Docking",
    owner: "CE + senior CE",
    evidence: ["level record", "module mating face", "gate/slit valve alignment", "robot reach envelope"],
    stop: "blade height, docking face, lift pin, slit valve clearance가 불확실하면 dry run 전 hold",
    report: "Module docking은 wafer가 지나갈 geometry risk를 제거하는 단계로 보고, dry run 전 alignment evidence를 닫겠습니다."
  },
  {
    id: "facility-hookup",
    title: "Facility Hook-up",
    owner: "CE + electrical/gas/exhaust/PCW facility owners",
    evidence: ["POC label", "drawing revision", "power/ground check", "PCW/CDA/N2/exhaust ready", "as-built markup"],
    stop: "drawing mismatch, unknown line, unapproved gas release, exhaust/abatement uncertainty는 즉시 hold",
    report: "Hook-up은 POC, drawing revision, actual state, owner witness를 대조해 진행하겠습니다."
  },
  {
    id: "power-on",
    title: "Power-on / Controller Boot",
    owner: "CE + electrical owner + controls owner",
    evidence: ["main power check", "24V rail stable", "controller boot", "alarm baseline", "host/network state"],
    stop: "energized panel 권한/LOTO/PPE 불명확, unexplained alarm, smoke/odor/heat는 power hold",
    report: "Power-on은 전원 안정, controller boot, alarm baseline을 기준으로 다음 단계 가능성을 판단하겠습니다."
  },
  {
    id: "interlock",
    title: "Interlock / Safety Chain",
    owner: "CE + EHS + facility owner",
    evidence: ["EMO/E-stop", "covers/doors", "exhaust/abatement ready", "gas box ready", "cooling/vacuum ready"],
    stop: "interlock bypass, 임의 jumper, detector setpoint 변경 요청은 금지 영역",
    report: "Safety chain은 우회하지 않고 hardwired state와 actual facility state를 owner witness로 확인하겠습니다."
  },
  {
    id: "dry-run",
    title: "Dry Run / Wafer Path",
    owner: "CE + senior CE + customer automation owner",
    evidence: ["FOUP map", "EFEM handoff", "LL pump/vent curve", "TM robot cycle", "PM/CM handoff count"],
    stop: "scrape, wafer not present, double wafer, pressure mismatch, repeated sensor mismatch가 있으면 hold",
    report: "Dry run은 FOUP에서 PM까지 wafer path의 mechanical, pressure, sensor evidence를 닫는 단계입니다."
  },
  {
    id: "first-gas",
    title: "First Gas Readiness",
    owner: "CE + gas owner + abatement owner + EHS",
    evidence: ["SDS reviewed", "gas cabinet ready", "purge/leak evidence", "exhaust/abatement ready", "area response plan"],
    stop: "gas alarm, exhaust not ready, unverified line release, unknown purge completion은 진행 금지",
    report: "First gas는 process 전 안전 envelope를 닫는 gate로 보고, gas/exhaust/abatement owner witness 후 진행하겠습니다."
  },
  {
    id: "baseline",
    title: "Baseline Wafer",
    owner: "CE + process owner + metrology owner",
    evidence: ["wafer ID", "route history", "temperature/pressure/MFC trace", "defect/thickness/Rs", "metrology recipe"],
    stop: "particle burst, wafer damage, trace abnormal, metrology outlier가 설명되지 않으면 production release 금지",
    report: "Baseline wafer 결과는 tool trace와 metrology를 같은 wafer ID로 묶어 qualification 의미를 설명하겠습니다."
  },
  {
    id: "qualification",
    title: "Qualification / Acceptance",
    owner: "CE + customer owner + senior CE",
    evidence: ["acceptance test list", "pass/fail record", "open punch", "risk retired list", "retest scope"],
    stop: "acceptance criterion, test owner, wafer impact, open risk가 불명확하면 sign-off scope 분리",
    report: "Qualification은 pass 문서가 아니라 위험이 어떤 evidence로 제거됐는지 설명하는 단계로 정리하겠습니다."
  },
  {
    id: "handover",
    title: "Handover / Shift Memory",
    owner: "CE + customer + next shift",
    evidence: ["summary packet", "remaining risk", "owner/ETA", "customer report", "data location"],
    stop: "미해결 safety/facility/process risk를 숨기거나 구두로만 넘기면 handover 금지",
    report: "Handover는 current status, open item, owner, ETA, next action을 한 packet으로 남기겠습니다."
  }
];

const installDecisionDrills = [
  {
    title: "Exhaust ready signal은 OK, 실제 abatement local panel은 fault",
    wrong: "host ready만 보고 gas introduction을 진행한다.",
    right: "facility owner와 실제 exhaust/abatement 상태, signal mapping, interlock chain을 witness로 확인하고 release 전까지 hold한다."
  },
  {
    title: "PM docking 후 robot blade teach가 1 mm 정도 빗나가 보임",
    wrong: "작게 보이므로 first wafer로 확인한다.",
    right: "dry run, blade height, slit valve center, lift pin/handoff 기준을 wafer 없이 먼저 확인하고 deviation을 기록한다."
  },
  {
    title: "고객 일정 압박으로 leak check 기록 없이 다음 단계 요청",
    wrong: "선임에게 나중에 물어보기로 하고 power-on한다.",
    right: "필수 acceptance evidence가 없음을 명확히 말하고, owner/ETA/punch item으로 올린다."
  },
  {
    title: "RTP temperature trace가 chamber A/B에서 다르게 흔들림",
    wrong: "recipe 문제라고 가정하고 바로 recipe를 바꾼다.",
    right: "lamp zone, sensor/window, wafer rotation, cooling, chamber condition, calibration history를 분리해 baseline 비교한다."
  }
];

const installSeniorMap = [
  ["Mechanical Geometry", "leveling, module docking, gate valve, slit valve, blade height, lift pin, service clearance"],
  ["Facility Plane", "POC, gas cabinet, purge, exhaust, abatement, PCW/chiller, CDA/N2, process vacuum, power/ground"],
  ["Safety / Controls", "EMO, E-stop, covers, gas box, interlock matrix, PLC I/O, sensor scaling, host/data, alarm mapping"],
  ["Process Quality", "pumpdown, leak integrity, MFC response, temperature trace, particle/defect, thickness/resistivity, chamber matching"],
  ["Customer Interface", "scope boundary, permit, witness, sign-off, shift handover, open punch, ETA, escalation owner"]
];

const installSourceLinks = [
  ["SEMI safety standards list", "https://www.semi.org/en/products-services/standards/safety"],
  ["SEMI EHS guidelines overview", "https://www.semi.org/en/node/114001"],
  ["SEMI S24 multi-employer work areas", "https://store-us.semi.org/products/s02400-semi-s24-safety-guideline-for-multi-employer-work-areas"],
  ["Base build / PLS / tool install", "https://jedunn.com/blog/closing-the-loop-integrating-design-construction-in-semiconductor-manufacturing/"],
  ["Semiconductor fab tool install patent", "https://patents.google.com/patent/US7039999B2/en"],
  ["SAT concept", "https://operations1.com/en/glossary/site-acceptance-test"]
];

const studyDrills = [
  ["5 Why 훈련", "알람 하나를 고르고 symptom, subsystem, changed condition, measurement, next test로 5단계 원인 좁히기를 쓴다."],
  ["정상 trace 암기", "pumpdown curve, MFC response, lamp power/temperature trace, robot cycle timing의 정상 패턴을 직접 그려본다."],
  ["고객 보고 60초", "현재 사실, 생산 영향, 안전 영향, 진행 중 확인, 다음 업데이트 시간을 60초 안에 말한다."],
  ["도면 읽기", "schematic에서 power path, sensor input, actuator output, interlock chain을 색깔별로 표시한다."],
  ["설치 질문 카드", "각 utility별로 '누가 승인하는가, 기준 문서는 무엇인가, 실패 시 stop 조건은 무엇인가'를 묻는 연습을 한다."],
  ["공정 연결", "RTP는 thermal budget과 dopant/film property, EPI는 interface/defect/uniformity와 연결해서 설명한다."]
];

const fabBasics = [
  {
    title: "Fab이란?",
    items: [
      "Fab은 wafer 위에 수백 개 이상의 공정 step을 반복해 반도체 소자를 만드는 생산 라인입니다.",
      "CE는 제품 설계자가 아니라 장비가 안정적으로 공정을 수행하도록 install, maintain, troubleshoot하는 사람입니다.",
      "Fab에서는 uptime, safety, contamination control, change control이 매우 중요합니다."
    ]
  },
  {
    title: "Cleanroom이 왜 필요한가?",
    items: [
      "미세 particle, 습도, 온도, 정전기, molecular contamination이 wafer 결함으로 이어질 수 있습니다.",
      "그래서 gowning, 물건 반입 규칙, 이동 동선, wipe-down, 사진/종이 반입 제한 같은 규칙이 생깁니다.",
      "CE는 빠르게 고치는 사람인 동시에 오염을 만들지 않는 사람이어야 합니다."
    ]
  },
  {
    title: "Sub-fab과 facility",
    items: [
      "Sub-fab은 pump, abatement, chemical/gas distribution, support equipment가 놓이는 하부/지원 공간입니다.",
      "Cleanroom 안 장비만 보지 말고 pump exhaust, cooling, gas cabinet, scrubber, facility interface까지 한 시스템으로 봐야 합니다.",
      "장비 알람이 facility 문제에서 시작되는 경우도 많습니다."
    ]
  },
  {
    title: "Fab 생산 흐름",
    items: [
      "Wafer는 FOUP에 담겨 장비 사이를 이동하고, 각 장비는 recipe에 따라 공정을 수행합니다.",
      "Lot, wafer, slot, recipe, route, metrology 결과가 함께 관리됩니다.",
      "CE 작업은 lot hold, release, qualification, rework와 연결될 수 있어 고객 커뮤니케이션이 중요합니다."
    ]
  },
  {
    title: "CE가 보는 장비 계층",
    items: [
      "Process chamber: 실제 반응/열처리 공간",
      "Transfer/automation: wafer 이동, robot, valve, sensor",
      "Facilities: gas, vacuum, exhaust, cooling, power",
      "Controls/data: PLC, I/O, recipe, alarm, trace, host"
    ]
  },
  {
    title: "현장 초심자 금지 습관",
    items: [
      "모르는 valve를 임의로 열거나 닫지 않기",
      "interlock이나 alarm을 원인 확인 없이 우회하지 않기",
      "추정 원인을 확정처럼 고객에게 말하지 않기",
      "site rule보다 개인 경험을 앞세우지 않기"
    ]
  }
];

const paperNotes = [
  {
    title: "Applied 공식 장비 페이지를 읽는 법",
    source: "Applied Centura Prime/Xtera/Epi 200mm, Vantage Radiance/Vulcan/RadOx official pages",
    notes: [
      "제품 페이지의 'platform', 'chamber', 'integrated pre-clean', 'low-volume chamber', 'multi-point temperature measurement'는 마케팅 문장이 아니라 install CE가 owner, utility, qualification evidence로 번역해야 할 단서입니다.",
      "Prime Epi는 integrated pre-clean과 interface contamination/queue time 맥락이 핵심입니다. Xtera는 GAA source-drain selective epitaxy, low-volume chamber, deposition-etch, gas usage/uniformity 맥락이 핵심입니다.",
      "Vantage RTP 계열은 lamp/laser/heater-based anneal family 안에서 Radiance Plus, Vulcan, RadOx, Astra로 option이 갈라질 수 있으므로 'RTP 장비 하나'로 뭉뚱그리면 안 됩니다.",
      "훈련: 장비 페이지 하나를 읽고 public fact, CE 질문, 확인해야 할 official 문서, qualification evidence를 4칸 표로 정리합니다."
    ]
  },
  {
    title: "Cluster Tool / EFEM / Load Lock 구조",
    source: "Applied Centura platform blog, public cluster patents, EFEM/load-lock supplier materials",
    notes: [
      "공개 cluster tool 자료는 FOUP/EFEM에서 시작한 wafer가 load lock을 통해 vacuum transfer module로 들어가고, transfer robot이 process chambers로 분배하는 구조를 반복적으로 설명합니다.",
      "Load lock은 main process vacuum을 매번 깨지 않기 위한 대기-진공 경계입니다. 그래서 pump/vent, door/slit valve, pressure gauge, wafer handoff timing이 install과 troubleshooting의 핵심이 됩니다.",
      "EFEM은 FOUP와 parent tool 사이 atmospheric wafer handling입니다. mapping, aligner, robot end-effector, FOUP seating 문제가 vacuum/process alarm처럼 보일 수 있습니다.",
      "훈련: wafer path를 압력 상태별로 색칠합니다. Atmosphere: FOUP/EFEM, transition: LL pump/vent, vacuum: TM/PM, return: LL vent/EFEM/FOUP."
    ]
  },
  {
    title: "EPI gas chemistry 공개 근거",
    source: "OSHA semiconductor fabrication, silicon precursor gas references, selective SiGe epitaxy patents/papers, NOAA/NIOSH chemical references",
    notes: [
      "공개자료는 silicon source로 silane/DCS/TCS/STC, Ge source로 germane, selectivity/etch/pre-clean 맥락으로 HCl, dopant로 PH3/AsH3/B2H6 계열을 반복적으로 보여줍니다.",
      "하지만 'public source에서 언급됨'은 '내 현장 tool에 연결되어 있음'과 다릅니다. 실제 gas 사용 여부는 장비 option, customer recipe, gas matrix, SDS, P&ID로만 확정합니다.",
      "chlorosilane은 moisture reactive/corrosive byproduct, toxic hydride는 detector/exhaust/abatement/emergency response, oxidizer는 fuel gas separation, inert는 asphyxiation/pressure energy로 나눕니다.",
      "훈련: gas 이름을 보면 먼저 용도보다 hazard family, incompatible gas, detector/exhaust/abatement owner, first gas introduction stop condition을 말합니다."
    ]
  },
  {
    title: "SEMI / OSHA / NIOSH / SIA EHS 자료",
    source: "SEMI safety standards, OSHA semiconductor pages, NIOSH hazardous energy, SIA EHS practices fact sheet",
    notes: [
      "SEMI S2/S6/S22/S24는 장비 안전, exhaust ventilation, electrical design, multi-employer work area를 이해하는 공개 표준 축입니다. CE는 표준 번호를 외우는 것보다 어떤 stop condition으로 이어지는지 알아야 합니다.",
      "NIOSH/OSHA hazardous energy 자료는 electrical뿐 아니라 mechanical, hydraulic, pneumatic, chemical, thermal stored energy까지 사고 범위를 확장하게 해줍니다.",
      "SIA EHS fact sheet는 현대 반도체 장비가 SEMI S2/S6 같은 guideline을 고려해 설계된다는 산업 관점을 제공합니다. 단, 이 자료도 site-specific permit나 detector setpoint를 대신하지 않습니다.",
      "훈련: 오늘 할 작업 하나를 골라 EHS hazard, required owner, required evidence, stop condition, rollback condition으로 쪼갭니다."
    ]
  },
  {
    title: "Retrieval practice / Testing effect",
    source: "Roediger & Karpicke 2006; retrieval-practice reviews",
    notes: [
      "장비 구조는 읽기만 하면 금방 익숙해 보이지만 현장에서는 바로 꺼내 말하고 연결해야 합니다. 공개 논문들은 기억 시험 자체가 장기 보존을 강화하는 testing effect를 반복적으로 보고합니다.",
      "이 앱의 cluster builder는 PM/CM/LL 수를 먼저 예측하고, 정답 예시를 본 뒤, wafer path를 단계별로 다시 누르게 해서 retrieval practice를 만들도록 구성했습니다.",
      "학습 루틴: 정답 보기 전 FOUP-FI/EFEM-LL-TM-PM/CM-TM-LL-FOUP을 말하고, 틀린 단계만 다시 배치한 뒤 10분 뒤 한 번 더 재생합니다."
    ]
  },
  {
    title: "Spacing / Interleaving / Cognitive Load",
    source: "Spacing review, interleaving studies, worked-example research",
    notes: [
      "Spacing 연구는 같은 내용을 짧은 간격을 두고 여러 번 꺼내 볼 때 장기 기억이 좋아진다고 설명합니다. 그래서 첫 화면을 긴 목차가 아니라 18분 루프로 만들었습니다.",
      "Interleaving 연구는 비슷한 유형을 섞어 연습할 때 전이와 장기 기억에 유리할 수 있음을 보여줍니다. 그래서 장비 구조, facility, gas, safety, qualification을 분리하지 않고 같은 루프에서 오가게 했습니다.",
      "Worked example과 cognitive load 연구는 초보자에게 완성된 예시와 사고 순서를 먼저 보여주는 것이 부담을 줄인다고 봅니다. 그래서 install mission board는 바로 문제를 던지기 전에 pass evidence와 senior question을 먼저 보여줍니다."
    ]
  },
  {
    title: "DVM / Electrical Safety Public References",
    source: "Fluke, OSHA, NIOSH, NFPA, Omron public materials",
    notes: [
      "Fluke의 DMM 자료는 voltage/current/resistance 측정 원리, current jack misuse, continuity/resistance는 de-energized 상태에서 수행해야 한다는 안전 포인트를 강조합니다.",
      "OSHA와 NIOSH의 hazardous energy 자료는 servicing/maintenance 중 unexpected energization과 stored energy를 막기 위해 LOTO 체계가 필요하다고 설명합니다.",
      "Omron relay 기술 자료는 coil 전압 저하, inrush, chattering, contact 부하 같은 릴레이 현장 이슈를 이해하는 데 도움이 됩니다.",
      "학습 포인트: DVM은 부품 찾는 도구가 아니라 안전하게 가설을 검증하는 증거 수집 도구입니다."
    ]
  },
  {
    title: "Gamification and feedback",
    source: "The Gamification of Learning meta-analysis",
    notes: [
      "학습 게임화 연구는 게임 요소가 인지, 동기, 행동 학습 결과에 작지만 유의한 긍정 효과를 줄 수 있다고 종합합니다.",
      "따라서 이 페이지는 단순 다이어그램이 아니라 drag/drop, 즉시 피드백, 단계 선택, 공개 근거 링크, install 관점 checklist를 같은 화면에 묶었습니다.",
      "현장형 CE 학습에서는 점수보다 빠른 피드백이 중요합니다. 배치가 틀리면 LL boundary, PM type, Clean/Cool CM 수를 바로 수정하게 만드는 구조가 핵심입니다."
    ]
  },
  {
    title: "RTP 온도 제어",
    source: "Advances in RTP Temperature Measurement and Control",
    notes: [
      "공개 초록은 commercial RTP system의 concentric multi-zone lamp heating source, multi-point temperature measurement, real-time wafer temperature control을 언급합니다.",
      "CE 학습 포인트: 온도 문제를 lamp, sensor, control loop, wafer 상태, chamber window, cooling으로 나누어 봅니다.",
      "설치 포인트: baseline temperature trace를 확보하고 chamber 간 trace 차이를 비교할 수 있어야 합니다."
    ]
  },
  {
    title: "Pyrometry와 emissivity",
    source: "RTP temperature measurement patents / public papers",
    notes: [
      "RTP 온도 측정은 wafer 표면 emissivity, 간섭, window condition 같은 요인에 영향을 받을 수 있습니다.",
      "CE 학습 포인트: 표시 온도가 흔들린다고 곧바로 heater 불량으로 단정하지 않고 측정 신뢰도도 봅니다.",
      "진단 질문: sensor가 틀렸는가, 실제 온도가 틀렸는가, 제어 loop가 불안정한가를 분리합니다."
    ]
  },
  {
    title: "CVD/Epitaxy 기본",
    source: "CVD/Epitaxy textbook and open lecture notes",
    notes: [
      "CVD는 gas phase source material을 substrate 근처로 공급하고 열/플라즈마/방사 에너지로 반응시켜 film을 형성하는 큰 범주입니다.",
      "Epitaxy는 substrate 결정 구조를 따라 crystalline layer를 성장시키는 특별한 증착입니다.",
      "CE 학습 포인트: gas purity, surface preparation, temperature, pressure, mass transport, reaction kinetics를 한 시스템으로 이해합니다."
    ]
  },
  {
    title: "Homoepitaxy / Heteroepitaxy",
    source: "Overview of Chemical Vapour Deposition",
    notes: [
      "같은 재료 위에 성장하면 homoepitaxy, 다른 재료지만 결정 구조가 유사한 경우 heteroepitaxy로 설명됩니다.",
      "CE 학습 포인트: 공정 엔지니어 수준의 모델링보다 표면 상태와 균일한 장비 조건이 왜 중요한지 이해하는 것이 먼저입니다.",
      "진단 포인트: defect, thickness, resistivity 문제를 gas/thermal/vacuum/handling 변화와 연결합니다."
    ]
  },
  {
    title: "Cleanroom과 contamination",
    source: "Semiconductor cleanroom public explainers",
    notes: [
      "Cleanroom은 particle뿐 아니라 온도, 습도, 정전기, molecular contamination까지 관리합니다.",
      "CE 학습 포인트: 정비 도구, glove, wipe, loose part, cable tie, opened chamber가 모두 contamination source가 될 수 있습니다.",
      "설치 포인트: 반입 전 cleaning, crate damage 확인, open chamber time 최소화, 작업 후 housekeeping이 중요합니다."
    ]
  },
  {
    title: "Point-of-use abatement",
    source: "Semiconductor abatement public case studies",
    notes: [
      "CVD나 dry etch처럼 reactive gas가 쓰이는 공정에서는 source 가까이에서 waste gas를 처리하는 point-of-use treatment가 흔히 언급됩니다.",
      "CE 학습 포인트: abatement ready가 없으면 tool ready가 아닙니다.",
      "설치 포인트: exhaust/abatement interface, alarm signal, maintenance boundary를 고객 facility owner와 확인합니다."
    ]
  },
  {
    title: "PM과 uptime",
    source: "Semiconductor equipment maintenance public resources",
    notes: [
      "PM은 장비 수명과 공정 안정성, downtime 감소를 위해 계획적으로 수행하는 정비입니다.",
      "CE 학습 포인트: PM은 체크리스트 완료가 아니라 baseline 회복과 early failure 예방까지 포함합니다.",
      "현장 포인트: PM 직후 장애는 작업 변경점과 손댄 부위부터 확인합니다."
    ]
  },
  {
    title: "Tool install 프로젝트 구조",
    source: "Semiconductor construction/tool hook-up public resources",
    notes: [
      "공개 자료들은 base build, process lateral systems, tool install, hook-up drawing, P&ID, utility cut-in point 같은 개념을 설명합니다.",
      "CE 학습 포인트: 장비 문제와 facility 문제의 경계를 이해하되, 서로에게 넘기기보다 증거로 연결합니다.",
      "설치 포인트: drawing revision, POC label, as-built, punch list, owner/ETA 관리가 핵심입니다."
    ]
  }
];

const glossaryTerms = [
  ["RTP", "공정", "Rapid Thermal Processing. 웨이퍼를 짧은 시간 빠르게 가열해 전기적/물리적 특성을 바꾸는 열처리 공정입니다.", "CE는 온도 trace, lamp 상태, sensor 신뢰도, cooling, recipe 변경 이력을 같이 봅니다."],
  ["Anneal", "공정", "열을 가해 재료 특성이나 결정 결함, dopant 활성 상태를 바꾸는 공정입니다.", "RTP의 대표 목적 중 하나이며 thermal budget 관리가 중요합니다."],
  ["Soak Anneal", "공정", "목표 온도에서 일정 시간 머무르는 열처리 방식입니다.", "온도 안정성과 시간 제어가 결과 균일도에 영향을 줍니다."],
  ["Spike Anneal", "공정", "짧게 높은 온도 피크를 주는 열처리 방식입니다.", "dopant activation과 diffusion 억제 사이 균형을 이해해야 합니다."],
  ["Millisecond Anneal", "공정", "아주 짧은 시간 동안 표면을 가열하는 고속 열처리 계열입니다.", "advanced node에서 thermal budget을 줄이는 맥락으로 이해하면 좋습니다."],
  ["Thermal Budget", "공정", "웨이퍼가 받은 열 이력의 총량입니다. 온도와 시간이 함께 결정합니다.", "열이 과하면 diffusion이나 device 특성 변화가 생길 수 있습니다."],
  ["Epitaxy / EPI", "공정", "기판 결정 구조를 따라 단결정 박막을 성장시키는 공정입니다.", "표면 상태, 오염, 온도, 압력, gas delivery가 결과에 민감합니다."],
  ["Selective Epi", "공정", "원하는 영역에 선택적으로 epitaxial layer를 성장시키는 응용입니다.", "표면 준비와 pattern/geometry, defect 관리가 중요합니다."],
  ["In-situ Doping", "공정", "막을 성장시키는 중에 dopant를 함께 넣는 방식입니다.", "gas delivery와 공정 안정성이 전기적 특성으로 이어집니다."],
  ["Source / Drain", "소자", "트랜지스터에서 전류가 들어오고 나가는 영역입니다.", "EPI는 advanced transistor source/drain 구조 형성과 연결됩니다."],
  ["Channel", "소자", "트랜지스터에서 전류 흐름이 제어되는 통로입니다.", "channel strain이나 재료 특성은 성능과 연결됩니다."],
  ["FinFET", "소자", "fin 형태 channel을 사용하는 3D transistor 구조입니다.", "EPI 응용이 source/drain, channel, contact 성능과 연결됩니다."],
  ["GAA", "소자", "Gate-All-Around. gate가 channel을 사방에서 둘러싸는 advanced transistor 구조입니다.", "공개 자료에서 Xtera Epi와 GAA source-drain 응용이 언급됩니다."],
  ["Uniformity", "공정품질", "웨이퍼 내 또는 wafer-to-wafer 결과가 얼마나 균일한지 나타냅니다.", "온도, 두께, 저항, defect 모두 uniformity 관점으로 봅니다."],
  ["Defect", "공정품질", "막, 표면, 패턴, 입자 등 제품 품질을 저해하는 결함입니다.", "CE는 defect map과 장비 변경점/서브시스템 상태를 연결해 봅니다."],
  ["Particle", "공정품질", "웨이퍼나 chamber에 붙는 미세 입자입니다.", "PM 후 증가하면 cleaning, handling, seal, purge, exhaust를 의심합니다."],
  ["Thickness", "공정품질", "증착된 막의 두께입니다.", "EPI에서는 두께 균일도와 repeatability가 중요합니다."],
  ["Resistivity", "공정품질", "전류 흐름을 방해하는 정도입니다.", "dopant, 막 품질, 열처리 조건과 연결될 수 있습니다."],
  ["Chamber", "장비", "공정이 실제로 일어나는 밀폐 공간입니다.", "압력, 온도, 오염, leak, gas flow가 집중되는 핵심 영역입니다."],
  ["Transfer Chamber", "장비", "웨이퍼를 여러 chamber 사이에서 옮기는 진공/제어 공간입니다.", "robot, slit valve, pressure matching, particle 관리가 중요합니다."],
  ["Factory Interface / FI", "장비", "FOUP과 장비 본체 사이에서 wafer를 주고받는 전면 인터페이스입니다.", "load port, mapping, robot, host 연동 문제가 자주 연결됩니다."],
  ["FOUP", "장비", "Front Opening Unified Pod. 웨이퍼를 담아 운반하는 표준 용기입니다.", "slot mapping, seating, contamination control이 중요합니다."],
  ["Load Port", "장비", "FOUP을 장비에 장착하는 위치입니다.", "door open, mapping, alignment, sensor 상태를 확인합니다."],
  ["Robot", "장비", "웨이퍼를 이동시키는 자동 이송 장치입니다.", "teaching, end-effector, repeatability, sensor timing이 핵심입니다."],
  ["End-effector", "장비", "robot 끝에서 wafer를 실제로 잡거나 받치는 부분입니다.", "스크래치, mis-pick, drop risk와 연결됩니다."],
  ["Slit Valve", "장비", "chamber 사이를 열고 닫는 진공용 valve입니다.", "open/close sensor mismatch, pneumatic delay, particle source가 될 수 있습니다."],
  ["Lift Pin", "장비", "웨이퍼를 chuck/stage에서 들어 올리는 핀입니다.", "transfer timing과 wafer seating에 영향을 줍니다."],
  ["Chuck / Susceptor", "장비", "웨이퍼를 지지하거나 가열/회전 환경에 놓는 부품입니다.", "온도 균일도, particle, wafer contact와 관련됩니다."],
  ["Lamp Source", "RTP", "RTP에서 웨이퍼를 빠르게 가열하는 lamp heating source입니다.", "lamp zone, aging, command 대비 응답을 확인합니다."],
  ["Honeycomb Lamp", "RTP", "Applied RTP 공개 자료에서 언급되는 lamp source 구조 표현입니다.", "multi-zone heating과 uniformity 맥락으로 이해합니다."],
  ["Pyrometer", "RTP", "비접촉 온도 측정 장치입니다.", "window 오염, emissivity, calibration 문제가 temperature trace에 영향을 줄 수 있습니다."],
  ["Emissometry", "RTP", "표면 방사율 관련 측정/보정 개념입니다.", "웨이퍼 표면 상태가 온도 측정에 미치는 영향을 이해하는 데 필요합니다."],
  ["Closed-loop Control", "제어", "측정값을 보고 actuator를 계속 조정하는 제어 방식입니다.", "RTP 온도 제어, pressure control, flow control에서 중요합니다."],
  ["Recipe", "제어", "장비가 수행할 공정 step과 setpoint의 모음입니다.", "변경 관리와 version 확인이 troubleshooting의 시작입니다."],
  ["Setpoint", "제어", "장비가 맞추려는 목표값입니다.", "actual 값과 비교해 control 문제를 판단합니다."],
  ["Actual", "제어", "센서나 controller가 읽은 실제값입니다.", "setpoint를 따라가지 못하면 supply, actuator, sensor, control loop를 봅니다."],
  ["I/O", "제어", "Input/Output. sensor 입력과 actuator 출력 신호입니다.", "schematic과 로그를 연결하는 기본 언어입니다."],
  ["PLC", "제어", "Programmable Logic Controller. 설비/장비 제어에 쓰이는 산업용 controller입니다.", "interlock, sequence, I/O 상태 확인과 연결됩니다."],
  ["Interlock", "안전", "조건이 안전하지 않을 때 장비 동작을 막는 보호 체인입니다.", "임의 우회 금지. 원인 확인과 승인 절차가 먼저입니다."],
  ["EMO / E-stop", "안전", "Emergency Machine Off 또는 emergency stop 계열 안전 정지입니다.", "설치 bring-up 전 반드시 기능과 접근성을 확인합니다."],
  ["LOTO", "안전", "Lockout/Tagout. 에너지원을 잠그고 표시해 예기치 않은 동작을 막는 절차입니다.", "전기, pneumatic, mechanical, thermal energy 모두 고려합니다."],
  ["PPE", "안전", "Personal Protective Equipment. 보호복, 보안경, 장갑, respirator 등입니다.", "cleanroom과 gas/chemical 작업에서 site rule을 따릅니다."],
  ["SDS", "안전", "Safety Data Sheet. 화학물질/가스의 위험성과 대응 방법 문서입니다.", "gas line 작업 전 hazard 이해의 출발점입니다."],
  ["SEMI S2", "표준", "반도체 제조 장비의 EHS guideline 축입니다.", "장비 설치/운영 안전 요구를 이해하는 공개 표준 언어입니다."],
  ["SEMI S6", "표준", "반도체 장비 exhaust ventilation 관련 EHS guideline입니다.", "배기와 abatement interface 이해에 중요합니다."],
  ["SEMI S8", "표준", "장비 ergonomics 관련 safety guideline입니다.", "정비 접근성, 자세, 작업자 부담을 보는 관점입니다."],
  ["SEMI S14", "표준", "장비 fire risk assessment 관련 safety guideline입니다.", "가연성 gas/thermal/electrical risk와 연결됩니다."],
  ["SEMI S19", "표준", "설치/정비/service 인력 교육 관련 safety guideline입니다.", "설치 CE가 어떤 교육과 자격을 갖춰야 하는지 보는 축입니다."],
  ["SEMI S22", "표준", "반도체 장비 electrical design safety guideline입니다.", "전장 안전, grounding, protection 관점과 연결됩니다."],
  ["SEMI S24", "표준", "여러 회사 인력이 함께 일하는 work area safety guideline입니다.", "고객, OEM, contractor가 같이 일하는 install 현장에 중요합니다."],
  ["Vacuum", "Facility", "대기압보다 낮은 압력 상태입니다.", "EPI/transfer 안정성과 contamination control에 중요합니다."],
  ["Pumpdown", "Vacuum", "chamber 압력을 목표 vacuum까지 낮추는 과정입니다.", "시간이 길어지면 leak, pump, valve, seal을 봅니다."],
  ["Base Pressure", "Vacuum", "충분히 배기한 뒤 도달하는 최저 압력 수준입니다.", "chamber integrity와 contamination 상태의 단서입니다."],
  ["Leak Check", "Vacuum", "배관이나 chamber에서 새는 지점을 찾는 검사입니다.", "gas/vacuum 작업 후 release 전 핵심 확인입니다."],
  ["Foreline", "Vacuum", "chamber와 pump/exhaust 사이의 배기 라인입니다.", "restriction, condensation, routing 문제가 pumpdown에 영향을 줍니다."],
  ["Throttle Valve", "Vacuum", "chamber pressure를 조절하기 위해 배기량을 제어하는 valve입니다.", "pressure control 안정성과 연결됩니다."],
  ["Pressure Gauge", "Vacuum", "압력을 측정하는 센서입니다.", "gauge range, calibration, contamination 영향을 고려합니다."],
  ["MFC", "Gas", "Mass Flow Controller. gas 유량을 제어하는 장치입니다.", "setpoint와 actual mismatch는 supply, valve, restriction, calibration을 봅니다."],
  ["Regulator", "Gas", "gas 압력을 원하는 수준으로 낮추고 안정화하는 장치입니다.", "MFC 안정 동작의 전단 조건입니다."],
  ["Pneumatic Valve", "Gas", "공압으로 열고 닫는 valve입니다.", "CDA/N2 pressure, solenoid, sensor 상태와 연결됩니다."],
  ["Purge", "Gas", "라인이나 chamber를 안전한 gas로 치환하는 과정입니다.", "유해/가연성 gas 작업에서 매우 중요합니다."],
  ["N2", "Gas", "질소. purge, inerting, pneumatic/support 용도로 자주 쓰입니다.", "산소 결핍 위험과 purity 요구를 함께 이해해야 합니다."],
  ["CDA", "Facility", "Clean Dry Air. 깨끗하고 건조한 압축공기입니다.", "pneumatic valve나 actuator 동작에 쓰입니다."],
  ["Process Gas", "Gas", "공정 반응에 직접 참여하는 gas입니다.", "종류별 hazard, purity, leak/purge 절차가 중요합니다."],
  ["Gas Cabinet", "Gas", "gas cylinder와 valve/manifold를 안전하게 보관·제어하는 cabinet입니다.", "toxic/flammable gas interlock과 exhaust가 연결됩니다."],
  ["Abatement", "Facility", "배출 gas나 부산물을 처리하는 설비입니다.", "abatement ready 신호가 없으면 장비가 안전하게 동작하면 안 됩니다."],
  ["Exhaust", "Facility", "장비에서 나오는 gas/열/부산물을 배출하는 시스템입니다.", "flow, pressure drop, duct compatibility, scrubber 상태를 봅니다."],
  ["PCW", "Facility", "Process Cooling Water. 장비 열을 제거하는 냉각수 계통입니다.", "supply/return, flow, 온도, 누수, condensation을 확인합니다."],
  ["Chiller", "Facility", "냉각수를 일정 온도로 공급하는 장치입니다.", "thermal stability와 장비 alarm에 직접 영향을 줍니다."],
  ["DI Water", "Facility", "Deionized Water. 이온이 제거된 물입니다.", "장비에 따라 cleaning/cooling/support utility로 쓰일 수 있습니다."],
  ["POC", "Install", "Point of Connection. fab facility와 장비 utility가 만나는 연결 지점입니다.", "label과 drawing revision 확인이 hook-up의 기본입니다."],
  ["Hook-up", "Install", "장비 utility를 fab facility에 연결하는 작업입니다.", "전기, gas, vacuum, exhaust, cooling, network를 scope별로 관리합니다."],
  ["Site Readiness", "Install", "장비 반입/설치가 가능한 현장 준비 상태입니다.", "utility, 공간, 안전 승인, 반입 동선, contractor 준비를 확인합니다."],
  ["Move-in", "Install", "장비를 fab 안으로 반입하고 위치시키는 단계입니다.", "rigging, contamination control, damage log, leveling이 중요합니다."],
  ["Leveling", "Install", "장비를 수평과 기준 위치에 맞추는 작업입니다.", "robot transfer, wafer seating, vibration 문제와 연결될 수 있습니다."],
  ["Qualification", "Install", "설치 후 장비가 요구 성능을 만족하는지 검증하는 단계입니다.", "process/metrology acceptance와 고객 sign-off로 이어집니다."],
  ["Acceptance", "Install", "고객/내부 기준으로 설치 완료를 승인받는 절차입니다.", "open punch item과 release 조건을 명확히 해야 합니다."],
  ["Punch List", "Install", "남은 이슈, 미완료 항목, 후속 조치 목록입니다.", "owner, due date, production 영향 여부를 함께 관리합니다."],
  ["As-built", "Install", "실제로 설치된 상태를 반영한 도면/기록입니다.", "현장 변경이 있었다면 문서화가 중요합니다."],
  ["Baseline", "진단", "정상 상태의 기준 데이터입니다.", "시니어 CE는 정상 trace를 많이 알고 있어 이상을 빨리 봅니다."],
  ["Trend", "진단", "시간에 따른 값 변화입니다.", "한 순간 값보다 pumpdown, 온도, flow 변화 패턴이 더 유용할 때가 많습니다."],
  ["Alarm", "진단", "장비가 이상 조건을 감지해 표시하는 경고입니다.", "알람명보다 발생 조건, 전후 로그, 재현성을 봐야 합니다."],
  ["Log", "진단", "장비 이벤트와 상태 기록입니다.", "사실 기반 troubleshooting의 핵심 증거입니다."],
  ["Root Cause", "진단", "문제의 근본 원인입니다.", "증상 제거와 원인 제거를 구분해야 재발을 막습니다."],
  ["Escalation", "업무", "상위 엔지니어, 전문가, 고객 담당자에게 이슈를 올리는 절차입니다.", "안전, downtime, 반복 장애, 권한 밖 작업일 때 빠르게 해야 합니다."],
  ["PM", "업무", "Preventive Maintenance. 예방 정비입니다.", "정해진 주기와 절차로 고장을 줄이는 작업입니다."],
  ["CM", "업무", "Corrective Maintenance. 장애 발생 후 복구 정비입니다.", "증상 복구뿐 아니라 재발 방지와 보고가 중요합니다."],
  ["Downtime", "업무", "장비가 생산에 쓰이지 못하는 시간입니다.", "고객 영향과 우선순위 판단의 핵심 지표입니다."],
  ["ETA", "업무", "Estimated Time of Arrival 또는 완료 예상 시간입니다.", "고객 커뮤니케이션에서 다음 업데이트 시간과 함께 중요합니다."],
  ["Shift Handover", "업무", "교대 근무자에게 상태와 다음 액션을 넘기는 과정입니다.", "사실, 리스크, open item, owner를 빠짐없이 남겨야 합니다."]
];

glossaryTerms.push(
  ["Fab", "팹 기초", "Fabrication facility. 웨이퍼에 반도체 회로를 만드는 생산 공장입니다.", "CE는 fab 전체 생산 흐름 안에서 장비 uptime과 안전을 책임지는 역할입니다."],
  ["Wafer", "팹 기초", "반도체 소자를 만들기 위한 얇은 원판 기판입니다.", "모든 handling, contamination, thermal stress 리스크의 대상입니다."],
  ["Lot", "팹 기초", "여러 wafer를 묶어 관리하는 생산 단위입니다.", "장비 장애가 lot hold나 생산 영향으로 이어질 수 있습니다."],
  ["Slot", "팹 기초", "FOUP 안에서 wafer가 들어가는 위치 번호입니다.", "mapping 오류나 특정 slot scrape 문제를 추적할 때 중요합니다."],
  ["Route", "팹 기초", "wafer가 거치는 공정 순서입니다.", "CE는 해당 장비가 전체 route에서 어떤 역할인지 이해해야 고객 영향을 설명할 수 있습니다."],
  ["Metrology", "팹 기초", "두께, CD, overlay, defect, 저항 등 결과를 측정하는 영역입니다.", "qualification과 troubleshooting에서 장비 조치 결과를 확인하는 근거입니다."],
  ["Yield", "팹 기초", "최종적으로 정상 동작하는 chip 비율입니다.", "장비 안정성, contamination, uniformity가 yield와 연결됩니다."],
  ["Uptime", "업무", "장비가 생산 가능한 상태로 유지되는 시간 비율입니다.", "CE 성과와 고객 만족의 핵심 지표입니다."],
  ["Availability", "업무", "장비가 요구 시점에 사용 가능한 정도입니다.", "PM, CM, parts, qualification 시간이 영향을 줍니다."],
  ["MTBF", "업무", "Mean Time Between Failures. 고장 사이 평균 시간입니다.", "반복 고장 개선과 reliability 판단에 쓰입니다."],
  ["MTTR", "업무", "Mean Time To Repair. 수리 평균 시간입니다.", "진단 속도, parts 준비, escalation 품질과 연결됩니다."],
  ["FDC", "진단", "Fault Detection and Classification. 장비 data로 이상을 감지/분류하는 접근입니다.", "digital analytics 기반 troubleshooting과 연결됩니다."],
  ["SPC", "진단", "Statistical Process Control. 통계적으로 공정 변동을 관리하는 방법입니다.", "trend가 control limit를 벗어나는지 보는 사고가 중요합니다."],
  ["Golden Tool", "진단", "동일군 장비 중 기준으로 삼을 만큼 안정적인 장비입니다.", "문제 tool과 정상 tool trace를 비교할 때 유용합니다."],
  ["Chamber Matching", "공정품질", "같은 장비 또는 같은 platform의 chamber들이 유사한 결과를 내도록 맞추는 것입니다.", "installation/qualification에서 chamber 간 편차를 봅니다."],
  ["Process Window", "공정", "공정 결과가 허용 범위 안에 들어오는 조건 범위입니다.", "CE는 장비 안정성이 process window 안에 머무르게 돕습니다."],
  ["Mass Transport", "공정", "반응 물질이 gas 흐름이나 확산으로 표면까지 이동하는 현상입니다.", "EPI/CVD에서 pressure, flow, geometry가 막 성장에 영향을 주는 이유입니다."],
  ["Reaction Kinetics", "공정", "표면 반응이 얼마나 빠르게 진행되는지에 관한 개념입니다.", "온도와 precursor 조건이 성장률과 품질에 영향을 줍니다."],
  ["Precursor", "공정", "CVD/EPI에서 film 재료를 제공하는 원료 gas 또는 화합물입니다.", "purity, delivery stability, line condition이 중요합니다."],
  ["Dopant", "공정", "반도체 전기적 특성을 조절하기 위해 넣는 불순물 원소입니다.", "RTP activation과 EPI in-situ doping을 이해할 때 핵심입니다."],
  ["Dopant Activation", "공정", "dopant가 전기적으로 활성화되어 소자 특성에 기여하게 되는 상태입니다.", "RTP anneal 목적 중 하나로 자주 연결됩니다."],
  ["Diffusion", "공정", "원자나 dopant가 열에 의해 퍼지는 현상입니다.", "thermal budget이 과하면 원하지 않는 확산이 생길 수 있습니다."],
  ["Emissivity", "RTP", "물체가 열복사를 내는 정도입니다.", "RTP pyrometry 온도 측정의 정확도에 영향을 줄 수 있습니다."],
  ["Ramp Rate", "RTP", "온도가 시간당 얼마나 빠르게 올라가거나 내려가는지입니다.", "RTP recipe와 thermal stress, activation에 중요합니다."],
  ["Temperature Trace", "RTP", "시간에 따른 온도 기록입니다.", "설치 baseline과 troubleshooting의 핵심 data입니다."],
  ["Multi-zone Heating", "RTP", "여러 heating zone을 따로 제어해 온도 분포를 맞추는 방식입니다.", "uniformity 문제를 볼 때 zone별 command/response를 확인합니다."],
  ["Wafer Rotation", "RTP", "공정 중 wafer를 회전시켜 균일도를 개선하는 동작입니다.", "rotation issue는 온도/막 균일도와 연결될 수 있습니다."],
  ["Bell Jar", "장비", "일부 thermal/process chamber에서 사용되는 종 모양 chamber 구조를 가리키는 용어입니다.", "논문/장비 설명을 읽을 때 chamber geometry 맥락으로 이해합니다."],
  ["Sub-fab", "Facility", "cleanroom 아래나 인접 지원 공간으로 pump, abatement, gas/chemical support 장비가 위치합니다.", "cleanroom 장비 알람도 sub-fab support issue에서 시작될 수 있습니다."],
  ["Point-of-use Abatement", "Facility", "배출 source 가까이에서 waste gas를 처리하는 abatement 방식입니다.", "tool과 abatement ready/interlock 연계를 이해해야 합니다."],
  ["Scrubber", "Facility", "배출 gas를 세정/처리하는 설비입니다.", "exhaust ready, pressure drop, maintenance alarm이 장비 상태와 연결됩니다."],
  ["UPW", "Facility", "Ultra Pure Water. 반도체 공정에 쓰이는 초순수입니다.", "오염 제어와 세정/utility 품질 이해에 필요합니다."],
  ["AMC", "팹 기초", "Airborne Molecular Contamination. 공기 중 분자 오염입니다.", "particle뿐 아니라 분자 오염도 cleanroom 품질에 영향을 줍니다."],
  ["ESD", "안전", "Electrostatic Discharge. 정전기 방전입니다.", "전자부품 손상과 contamination control 관점에서 중요합니다."],
  ["Gowning", "팹 기초", "cleanroom 보호복을 절차대로 착용하는 과정입니다.", "사람이 가장 큰 contamination source 중 하나라서 중요합니다."],
  ["Tool Down", "업무", "장비가 생산 불가능한 상태입니다.", "고객 보고에서 영향, 원인 가설, 다음 액션, ETA를 명확히 해야 합니다."],
  ["Lot Hold", "업무", "문제가 의심되어 lot 진행을 멈추는 조치입니다.", "장비 이상과 제품 영향 판단이 연결됩니다."],
  ["Release", "업무", "장비나 lot을 다시 사용 가능 상태로 승인하는 것입니다.", "qualification data와 고객 승인 기준이 필요합니다."],
  ["Redline", "Install", "도면 위에 현장 변경 사항을 표시하는 것입니다.", "as-built 문서화와 future maintenance에 중요합니다."],
  ["P&ID", "Install", "Piping and Instrumentation Diagram. 배관과 계측/제어 구성을 나타내는 도면입니다.", "gas, vacuum, exhaust, cooling hook-up 이해에 필요합니다."],
  ["Cut-in Point", "Install", "기존 facility에 새 utility 연결을 넣는 지점입니다.", "작업 승인, shutdown 영향, facility owner 조율이 필요합니다."],
  ["Witness Test", "Install", "고객이나 관련 담당자가 입회해 시험을 확인하는 절차입니다.", "leak, interlock, acceptance test에서 중요합니다."],
  ["SAT", "Install", "Site Acceptance Test. 현장 설치 후 고객 site에서 수행하는 인수 시험입니다.", "장비가 실제 site 조건에서 요구 기준을 만족하는지 확인합니다."],
  ["FAT", "Install", "Factory Acceptance Test. 출하 전 공장 단계의 인수 시험입니다.", "site install 문제와 출하 전 상태를 구분하는 기준이 될 수 있습니다."],
  ["OQ", "Install", "Operational Qualification. 장비가 의도한 기능을 수행하는지 검증하는 단계입니다.", "subsystem bring-up과 acceptance 사이에서 중요합니다."],
  ["PQ", "Install", "Process Qualification 또는 Performance Qualification. 공정/성능 기준을 만족하는지 검증합니다.", "metrology data와 고객 sign-off로 연결됩니다."],
  ["Tool Owner", "업무", "고객 측에서 특정 장비/공정 책임을 가진 담당자입니다.", "의사결정과 communication path를 명확히 해야 합니다."],
  ["Facility Owner", "업무", "전기, gas, exhaust, cooling 등 site utility 책임자입니다.", "hook-up과 facility alarm 해결의 핵심 상대입니다."],
  ["Permit to Work", "안전", "특정 위험 작업을 수행하기 위한 현장 작업 허가입니다.", "전기, gas, hot work, 고소작업 등은 site rule에 따릅니다."],
  ["JSA / JHA", "안전", "Job Safety Analysis 또는 Job Hazard Analysis. 작업 위험을 사전에 분석하는 절차입니다.", "설치/정비 전 에너지, 화학, 동작, 자세 위험을 확인합니다."],
  ["Stop-work Authority", "안전", "안전하지 않다고 판단되면 작업을 멈출 권한입니다.", "초보 CE도 안전 우려가 있으면 멈추고 확인해야 합니다."],
  ["Change Control", "업무", "recipe, hardware, software, facility 변경을 승인·기록하는 관리입니다.", "승인 없는 변경은 재현성과 안전을 망칠 수 있습니다."]
);

glossaryTerms.push(
  ["Silane / SiH4", "Gas", "silicon deposition에 쓰일 수 있는 silicon precursor gas입니다. 공개 안전 자료에서 pyrophoric/flammable 위험이 강조됩니다.", "gas cabinet, detector, exhaust, abatement, purge/interlock 확인이 install/qualification의 선행 조건입니다."],
  ["Dichlorosilane / DCS", "Gas", "SiH2Cl2. silicon EPI/CVD source gas로 공개 문헌에서 언급됩니다.", "chlorosilane 계열 위험, purge, leak integrity, scrubber readiness를 확인합니다."],
  ["Trichlorosilane / TCS", "Gas", "SiHCl3. silicon precursor 계열로 공개 자료에 언급됩니다.", "수분 반응과 부식성 부산물 가능성을 고려해 line integrity와 exhaust compatibility를 봅니다."],
  ["Hydrogen / H2", "Gas", "EPI carrier/reducing gas로 자주 언급되는 가연성 gas입니다.", "thermal source 주변 ignition risk와 ventilation/detector 상태를 확인합니다."],
  ["Hydrogen Chloride / HCl", "Gas", "EPI selectivity/etch/pre-clean 맥락에서 언급되는 부식성·독성 gas입니다.", "OSHA 자료처럼 눈, 피부, 점막, 호흡기 위험을 이해하고 exhaust/scrubber/PPE를 확인합니다."],
  ["Phosphine / PH3", "Gas", "n-type dopant gas로 쓰일 수 있는 고독성·가연성 gas입니다.", "낮은 노출 기준과 acute hazard를 이해하고 detector/abatement/permit 없이는 접근하지 않습니다."],
  ["Arsine / AsH3", "Gas", "n-type dopant gas로 공개 산업위생 자료에서 주요 dopant gas로 언급됩니다.", "고독성 gas로 감각이 아니라 detector와 승인 절차에 의존합니다."],
  ["Diborane / B2H6", "Gas", "boron p-type dopant source로 쓰일 수 있는 고독성·가연성 gas입니다.", "MFC/valve issue도 임의 조작하지 않고 gas owner와 senior escalation이 우선입니다."],
  ["Gas Cabinet", "Gas", "hazardous gas cylinder와 valve/manifold를 배기·검지·interlock과 함께 관리하는 cabinet입니다.", "cabinet exhaust, detector, purge panel, shutoff 상태가 gas qualification의 전제입니다."],
  ["Gas Detector", "Gas", "특정 gas 누출이나 산소 농도 등을 감지하는 안전 장치입니다.", "calibration/health/status를 확인하고 alarm을 절대 무시하지 않습니다."],
  ["Toxic Gas", "Gas", "흡입 등 노출 시 급성/만성 건강 피해를 줄 수 있는 gas입니다.", "고독성 gas 작업은 SDS, detector, exhaust, permit, emergency response가 한 세트입니다."],
  ["Pyrophoric Gas", "Gas", "공기와 접촉하면 자연발화할 수 있는 gas입니다.", "silane 계열처럼 누출 즉시 화재/폭발 risk를 고려합니다."],
  ["Corrosive Gas", "Gas", "조직이나 장비 재료를 부식시키는 gas입니다.", "HCl/chlorosilane 계열은 사람과 설비 양쪽에 위험합니다."],
  ["Gas Line Release", "Install", "gas line을 실제 사용 가능 상태로 승인하는 절차입니다.", "leak check, purge, detector, exhaust, owner sign-off가 확인되어야 합니다."],
  ["Purge Complete", "Gas", "line/chamber가 정해진 기준에 따라 안전 gas로 치환 완료된 상태입니다.", "완료 기준은 현장 공식 문서의 cycle/count/time/measurement를 따릅니다."],
  ["POU Abatement", "Facility", "Point-of-use abatement. 배출 source 가까이에서 유해/반응성 gas를 처리하는 설비입니다.", "gas introduction 전에 ready signal과 alarm response를 확인합니다."]
);

glossaryTerms.push(
  ["FEP", "장비군", "채용 맥락에서는 Front End Products 계열 업무 영역으로 이해하는 것이 안전합니다.", "단일 장비명이 아니라 EPI/RTP 같은 front-end process tool install/service 범위로 봅니다."],
  ["EPI Team", "장비군", "Epitaxy 관련 Applied 장비를 설치·정비·upgrade하는 업무 영역입니다.", "실제 tool은 Centura Prime/Xtera/200mm/RP Epi 등 platform과 option으로 갈라집니다."],
  ["RTP Team", "장비군", "Rapid Thermal Processing/Treatments 관련 장비 업무 영역입니다.", "실제 tool은 Vantage Radiance Plus, Vulcan, RadOx, Astra 등으로 갈라집니다."],
  ["Centura Platform", "장비군", "Applied의 여러 process chamber를 통합할 수 있는 platform 계열명입니다.", "EPI, pre-clean, etch 통합과 chamber matching 관점으로 학습합니다."],
  ["Vantage Platform", "장비군", "Applied RTP/anneal 계열에서 공개적으로 언급되는 platform입니다.", "Radiance Plus, Vulcan, RadOx, Astra처럼 chamber/process option으로 갈라질 수 있습니다."],
  ["Chamber Option", "Install", "같은 platform에 어떤 process chamber가 붙는지에 따른 구성 차이입니다.", "install scope, utility, qualification, PM procedure가 달라집니다."],
  ["Hybrid Configuration", "Install", "서로 다른 chamber type을 한 platform에 조합하는 구성입니다.", "recipe routing, chamber matching, PM planning, qualification data가 복잡해집니다."],
  ["Retrofit / Upgrade", "업무", "기존 installed base 장비에 새 hardware/software/process capability를 추가하는 작업입니다.", "변경점 관리, baseline 비교, customer sign-off가 중요합니다."]
);

glossaryTerms.push(
  ["Cluster Tool", "장비구조", "중앙 transfer module과 여러 process/load/cool/clean chamber가 붙은 다중 chamber 장비 구조입니다.", "Centura 같은 platform을 이해할 때 가장 중요한 큰 그림입니다."],
  ["Transfer Module / TM", "장비구조", "wafer를 load lock과 process chamber 사이에서 옮기는 중앙 진공 이송 공간입니다.", "robot, blade, sensor, pressure boundary, contamination을 함께 봅니다."],
  ["Process Module / PM", "장비구조", "EPI, RTP, etch, clean 등 실제 공정이 일어나는 chamber module입니다.", "Preventive Maintenance의 PM과 혼동하지 않도록 문맥을 확인해야 합니다."],
  ["Load Lock / LL", "장비구조", "대기압 영역과 진공 cluster 사이에서 wafer를 넣고 빼는 chamber입니다.", "pump/vent time, door seal, pressure matching, contamination control이 중요합니다."],
  ["Factory Interface / FI", "장비구조", "FOUP/loadport와 장비 내부 이송계를 연결하는 전면 interface입니다.", "loadport, mapping, FOUP seating, host/automation이 연결됩니다."],
  ["EFEM", "장비구조", "Equipment Front End Module. 대기압 쪽 wafer handling interface입니다.", "vacuum cluster 앞에서 FOUP와 load lock 사이 wafer 흐름을 담당합니다."],
  ["Facet", "장비구조", "transfer module 주변에 chamber가 붙는 면 또는 위치입니다.", "PM 수, clean/cool module 옵션, service clearance 이해에 필요합니다."],
  ["Chamber Matching", "장비구조", "여러 chamber가 비슷한 결과를 내도록 맞추는 것입니다.", "multi-chamber EPI/RTP qualification에서 매우 중요합니다."],
  ["Robot Blade", "장비구조", "robot이 wafer를 실제로 들고 옮기는 얇은 팔/받침입니다.", "wafer-on-blade detection, centering, scrape risk와 연결됩니다."],
  ["WOB", "장비구조", "Wafer-on-Blade. wafer가 robot blade 위에 있는지 감지하는 개념입니다.", "transfer alarm과 wafer drop/scrape 방지에 중요합니다."],
  ["Pump/Vent Time", "장비구조", "load lock이나 chamber를 진공으로 빼고 다시 대기압으로 돌리는 시간입니다.", "throughput과 scheduling, pressure matching에 영향을 줍니다."],
  ["Recipe Routing", "장비구조", "wafer가 어떤 chamber 순서로 이동해 공정을 받는지 정한 경로입니다.", "chamber count가 같아도 route가 다르면 throughput과 qualification이 달라집니다."]
);

glossaryTerms.push(
  ["DVM / DMM", "전기/DVM", "Digital Voltmeter 또는 Digital Multimeter. 전압, 저항, 연속성 등을 확인하는 계측기입니다.", "측정 전 lead 위치, mode, CAT rating, 회로 에너지 상태를 확인합니다."],
  ["CAT Rating", "전기/DVM", "측정기가 견딜 수 있는 transient/measurement category 등급입니다.", "panel, facility, tool 내부 측정 위치에 맞는 meter와 probe를 사용해야 합니다."],
  ["Voltage", "전기/DVM", "전류를 흐르게 하는 전위차입니다.", "DVM 전압 측정은 회로에 병렬로 대며 기준점 선택이 중요합니다."],
  ["Current", "전기/DVM", "회로에 실제로 흐르는 전하의 양입니다.", "직접 current 측정은 회로를 끊고 meter를 직렬로 넣어야 하므로 특히 위험합니다."],
  ["Resistance", "전기/DVM", "전류 흐름을 방해하는 정도입니다.", "저항 측정은 전원 차단과 stored energy 방전 후 수행합니다."],
  ["Continuity", "전기/DVM", "전기적으로 길이 이어져 있는지 확인하는 기능입니다.", "무전원 상태에서 wiring, fuse, contact, switch 상태 확인에 씁니다."],
  ["Ohm's Law", "전기/DVM", "V = I x R 관계입니다.", "coil 전류 예상, voltage drop, short/open 판단의 수학적 기본기입니다."],
  ["Open Circuit", "전기/DVM", "회로가 끊겨 전류가 흐르지 않는 상태입니다.", "fuse open, connector 빠짐, 접점 불량, wire break가 대표적입니다."],
  ["Short Circuit", "전기/DVM", "원치 않는 낮은 저항 경로가 생겨 과전류가 흐를 수 있는 상태입니다.", "반복 fuse blow나 power supply sag의 원인이 될 수 있습니다."],
  ["Ground Fault", "전기/DVM", "전원이 chassis/earth 쪽으로 의도치 않게 연결되는 고장입니다.", "안전과 장비 손상 위험이 커서 공식 절차와 escalation이 필요합니다."],
  ["Relay", "전기/DVM", "코일로 접점을 움직여 다른 회로를 여닫는 전기적 스위치입니다.", "coil과 contact를 분리해서 측정해야 오판을 줄입니다."],
  ["Relay Coil", "전기/DVM", "전류가 흐르면 자력이 생겨 relay 접점을 움직이는 부분입니다.", "A1-A2 전압, coil resistance, polarity, suppression을 확인합니다."],
  ["NO / NC Contact", "전기/DVM", "Normally Open / Normally Closed 접점입니다.", "de-energized와 energized 상태에서 continuity가 반대로 바뀌는지 봅니다."],
  ["Voltage Drop", "전기/DVM", "부하가 동작 중 배선이나 접점에 걸리는 전압 손실입니다.", "loose terminal, worn contact, 과부하를 잡는 현장 진단법입니다."],
  ["PNP / NPN Sensor", "전기/DVM", "산업용 sensor output 방식입니다. PNP는 보통 +를 내보내고 NPN은 0V 쪽으로 끌어내립니다.", "PLC input type과 맞지 않으면 sensor는 살아도 input이 안 바뀔 수 있습니다."],
  ["SMPS", "전기/DVM", "Switch Mode Power Supply. AC를 DC 제어 전원으로 바꾸는 전원 공급 장치입니다.", "24V sag, ripple, 과부하, input power, output distribution을 봅니다."],
  ["Flyback Diode", "전기/DVM", "coil이 꺼질 때 생기는 역전압을 흡수하는 보호 부품입니다.", "polarity와 residual voltage가 relay/solenoid 진단에 영향을 줍니다."],
  ["Arc Flash", "전기안전", "전기 arc로 인한 열, 빛, 압력 폭발 위험입니다.", "전장 panel live 작업은 자격, PPE, 작업허가, 거리, 절차가 필요합니다."],
  ["Stored Energy", "전기안전", "전원을 끊어도 capacitor, 압축공기, 열, 진공, 중력 등에 남아 있는 에너지입니다.", "LOTO 후에도 방전/bleed-down/zero-energy 확인이 필요합니다."]
);

questions.push(
  {
    q: "24VDC interlock chain에서 어느 contact 전까지는 24V가 있고 후단에서 0V가 된다. 가장 좋은 다음 판단은?",
    a: ["그 contact 조건, wiring, connector, input을 확인한다.", "interlock을 우회하고 recipe를 진행한다.", "무조건 PLC를 교체한다.", "gas qualification을 먼저 진행한다."],
    c: 0,
    e: "interlock은 보호 체인입니다. 끊긴 지점을 찾았으면 왜 열렸는지 조건/배선/접점/입력 상태를 확인해야 합니다."
  },
  {
    q: "DVM red lead가 current jack에 꽂힌 상태에서 voltage source를 재면 왜 위험한가?",
    a: ["전압이 더 정확히 보인다.", "meter 내부 저임피던스 경로가 short처럼 되어 arc/퓨즈 사고가 날 수 있다.", "저항값만 표시된다.", "CAT rating이 자동으로 올라간다."],
    c: 1,
    e: "current 측정 입력은 낮은 임피던스 경로입니다. voltage source에 병렬로 대면 short 사고가 될 수 있습니다."
  },
  {
    q: "relay 진단에서 coil과 contact를 분리해서 봐야 하는 이유는?",
    a: ["coil 전압이 정상이어도 접점이 붙지 않을 수 있고, 접점이 정상이어도 coil command가 없을 수 있기 때문이다.", "relay는 항상 software 문제이기 때문이다.", "접점은 전압 측정이 불가능하기 때문이다.", "coil resistance는 live 상태에서만 잴 수 있기 때문이다."],
    c: 0,
    e: "relay는 전자석 coil 회로와 부하 contact 회로가 분리된 구조입니다. 두 회로를 따로 검증해야 합니다."
  }
);

flashcards.push(
  ["DVM safe loop", "권한/LOTO -> lead/jack/mode/CAT 확인 -> known source prove -> expected value 세우기 -> 측정 -> 기록."],
  ["Closed contact voltage drop", "닫힌 접점 양단 전압은 작아야 합니다. 크면 접점 저항, loose terminal, 과부하를 의심합니다."],
  ["Relay coil vs contact", "coil은 relay를 움직이는 전자석, contact는 별도 회로를 여닫는 스위치입니다."],
  ["Current jack trap", "current jack에 꽂힌 lead로 voltage source를 재면 short/arc 위험이 있습니다."]
);

const commandCenterActions = [
  {
    view: "runbook",
    label: "설치 런북",
    title: "Pass evidence 먼저 모으기",
    text: "현장에서는 '했다'보다 사진, trace, sign-off, log, punch item이 더 강합니다. 오늘은 각 단계의 통과 증거와 hold 조건을 먼저 외웁니다.",
    chips: ["readiness", "hook-up", "qualification"]
  },
  {
    view: "cluster",
    label: "구성게임",
    title: "FI/EFEM - LL - TM - PM 흐름 잡기",
    text: "wafer가 대기압에서 진공 cluster로 들어가고 다시 나오는 길을 손으로 배치하며 익힙니다. Load lock이 왜 필요한지 몸으로 기억하는 구간입니다.",
    chips: ["wafer path", "module docking", "robot"]
  },
  {
    view: "process-visual",
    label: "공정 시각화",
    title: "Gas가 layer로 바뀌는 장면 보기",
    text: "EPI/RTP 단계별로 gas, pump, purge, exhaust, wafer layer 상태가 어떻게 바뀌는지 애니메이션으로 확인합니다.",
    chips: ["EPI gas", "layer stack", "purge/exhaust"]
  },
  {
    view: "electrical",
    label: "전기/DVM",
    title: "측정 전에 expected value 말하기",
    text: "DVM은 찍어보는 도구가 아니라 가설 검증 도구입니다. 모드, lead 위치, 에너지 상태, 예상값을 말한 뒤 측정합니다.",
    chips: ["LOTO", "relay", "voltage drop"]
  },
  {
    view: "thinktank",
    label: "싱크탱크",
    title: "경험을 재사용 가능한 지식으로 저장",
    text: "문제 경험을 symptom, evidence, root cause, corrective action, prevention으로 쪼개 저장하면 다음 현장에서 훨씬 빨라집니다.",
    chips: ["D1 DB", "D drive mirror", "field memory"]
  },
  {
    view: "english-test",
    label: "영어시험",
    title: "AMK CBT 형식으로 매일 한 세트",
    text: "공식 FAQ와 후기에서 확인되는 문법·독해·듣기·짧은 말하기 조합을 무한 세트로 반복합니다.",
    chips: ["grammar", "reading", "listening", "speaking"]
  }
];

const fieldRunbookStages = [
  {
    id: "readiness",
    badge: "01",
    title: "Site Readiness",
    plain: "장비가 들어오기 전에 현장이 정말 준비됐는지 확인하는 단계입니다.",
    owner: "CE + Senior CE + 고객 tool/facility owner",
    objective: "POC, 도면 revision, utility availability, route, floor/loading, permit, 작업 owner를 한 장으로 정렬합니다.",
    mustSee: [
      "최신 tool matrix, hook-up drawing, POC label, redline/as-built 관리 방법",
      "power, ground, CDA/N2, process gas, exhaust, abatement, PCW/chiller, network 준비 상태",
      "move-in route, cleanroom 반입 규칙, service clearance, EMO 접근성"
    ],
    holdIf: [
      "도면 revision과 현장 label이 다르다",
      "gas/exhaust/abatement release owner가 불명확하다",
      "permit, LOTO, multi-employer work area 경계가 정리되지 않았다"
    ],
    seniorQuestions: [
      "이 POC는 누가 열고, 누가 witness하고, 실패하면 누가 복구하는가?",
      "이 항목이 늦어지면 installation critical path에 어떤 영향을 주는가?"
    ],
    customerLine: "현재 site readiness에서 열린 항목은 owner와 ETA까지 묶어 punch list로 관리하고 있습니다."
  },
  {
    id: "movein",
    badge: "02",
    title: "Move-in / Set",
    plain: "장비를 fab 안으로 들여와 정확한 위치에 놓고 수평, 접근성, 손상 여부를 확인하는 단계입니다.",
    owner: "CE + rigging team + 고객 cleanroom/안전 담당",
    objective: "crate 상태, shock/tilt, 반입 동선, footprint, leveling, anchor/seismic, service clearance를 증거화합니다.",
    mustSee: [
      "crate damage, missing kit, shock/tilt indicator 사진",
      "floor mark, tool footprint, maintenance door/pump cart/gas box 접근성",
      "leveling record, anchor/seismic 조건, cleanroom housekeeping"
    ],
    holdIf: [
      "damage 또는 missing kit이 확인됐는데 deviation 기록이 없다",
      "service door, pump cart, gas box, EMO 접근이 막힌다",
      "leveling 기준을 만족하지 못한다"
    ],
    seniorQuestions: [
      "이 위치에서 PM 작업자가 실제 자세로 안전하게 접근할 수 있는가?",
      "move-in 중 contamination source를 남기지 않았는가?"
    ],
    customerLine: "장비 반입과 위치 세팅은 완료/미완료 항목을 사진과 punch list로 분리해 공유하겠습니다."
  },
  {
    id: "modules",
    badge: "03",
    title: "Module Docking",
    plain: "Load lock, transfer chamber, process/clean/cool module이 wafer path 안에서 맞물리게 붙는 단계입니다.",
    owner: "CE + Senior CE + module specialist",
    objective: "FI/EFEM, LL, TM, PM/CM 사이의 물리 boundary와 robot handoff가 안전하게 맞는지 확인합니다.",
    mustSee: [
      "FI/EFEM: FOUP와 대기압 wafer handling을 담당하는 전면 interface",
      "LL: 대기압과 진공 사이를 연결하는 완충 chamber",
      "TM: 중앙 진공 robot 공간, PM/CM으로 wafer를 보내는 hub",
      "PM/CM: 실제 공정 또는 clean/cool/support가 일어나는 module"
    ],
    holdIf: [
      "gate/slit valve alignment가 맞지 않는다",
      "robot blade height, WOB, handoff 위치가 불확실하다",
      "vacuum seal이나 docking face에 손상/오염 의심이 있다"
    ],
    seniorQuestions: [
      "wafer가 지나는 모든 boundary에서 pressure, door, sensor, robot sequence가 어떤 순서로 맞물리는가?",
      "PM 수가 늘어나면 qualification 범위와 chamber matching이 어떻게 늘어나는가?"
    ],
    customerLine: "module docking은 dry run 전에 mechanical alignment와 vacuum boundary evidence를 먼저 닫겠습니다."
  },
  {
    id: "hookup",
    badge: "04",
    title: "시설 Hook-up",
    plain: "fab utility와 장비를 연결하는 단계입니다. 전기, gas, 배기, 냉각, 네트워크가 모두 scope별로 갈라집니다.",
    owner: "CE + 고객 facility owner + contractor + EHS",
    objective: "각 utility를 공식 승인, 입회, 측정값, as-built 기록으로 연결합니다.",
    mustSee: [
      "power/ground verification, panel label, LOTO boundary",
      "gas cabinet, purge, leak integrity, detector, exhaust/abatement ready",
      "PCW/chiller supply/return, CDA/N2 pressure, network/host approval"
    ],
    holdIf: [
      "gas line release, abatement ready, exhaust flow 증거가 없다",
      "interlock 또는 facility ready signal이 실제 물리 상태와 다르다",
      "승인 없는 valve 조작이나 bypass 요구가 있다"
    ],
    seniorQuestions: [
      "화면의 ready와 local panel의 ready가 같은 의미인가?",
      "setpoint/actual/physical local gauge 중 무엇을 신뢰할 수 있는가?"
    ],
    customerLine: "hook-up은 utility별 owner, witness result, open risk를 분리해 다음 업데이트에 공유하겠습니다."
  },
  {
    id: "bringup",
    badge: "05",
    title: "Power-on / Bring-up",
    plain: "전원을 넣고 controller, interlock, pump, valve, robot, sensor가 정상 sequence로 움직이는지 보는 단계입니다.",
    owner: "CE + Senior CE + controls/facility owner",
    objective: "recipe나 wafer보다 먼저 safety chain, I/O, alarm meaning, subsystem baseline을 안정화합니다.",
    mustSee: [
      "EMO/E-stop, cover, gas box, exhaust, cooling, vacuum interlock matrix",
      "PLC/I/O status, sensor scaling, alarm history, controller boot, host/data link",
      "pumpdown trend, valve/MFC response, robot dry run, LL pump/vent"
    ],
    holdIf: [
      "safety interlock 원인을 설명하지 못한다",
      "alarm을 지운 뒤에도 발생 조건을 재현/설명하지 못한다",
      "pumpdown, pressure, valve, robot signal baseline이 불안정하다"
    ],
    seniorQuestions: [
      "이 alarm은 원인인가 결과인가?",
      "hardwired chain인가, software state인가, facility ready인가?"
    ],
    customerLine: "bring-up 단계는 안전 chain과 subsystem baseline을 먼저 닫은 뒤 wafer 단계로 넘어가겠습니다."
  },
  {
    id: "qual",
    badge: "06",
    title: "Qualification / Handover",
    plain: "장비가 실제 site 조건에서 요구 성능을 만족하는지 확인하고 고객에게 넘기는 단계입니다.",
    owner: "CE + process owner + customer tool owner + Senior CE",
    objective: "wafer path reliability, process baseline, metrology result, open punch, handover 문서를 연결합니다.",
    mustSee: [
      "wafer transfer count, scratch/particle check, chamber matching plan",
      "temperature trace, MFC response, pumpdown curve, film thickness/resistivity/defect trend",
      "SAT/OQ/PQ 또는 고객 acceptance criteria, open punch owner/ETA"
    ],
    holdIf: [
      "particle jump, transfer scratch, leak suspicion, temperature drift가 설명되지 않는다",
      "acceptance fail 항목의 rework/retest 범위가 정의되지 않았다",
      "handover 문서와 실제 상태가 다르다"
    ],
    seniorQuestions: [
      "이 데이터는 production release를 설득할 만큼 반복성과 traceability가 있는가?",
      "다음 shift가 이 기록만 보고 안전하게 이어받을 수 있는가?"
    ],
    customerLine: "qualification 결과는 pass/fail보다 evidence, deviation, retest scope, release 조건을 중심으로 공유하겠습니다."
  }
];

const runbookGates = [
  ["gate-drawing", "최신 drawing revision과 현장 POC label을 대조했다", "도면과 라벨이 다르면 hook-up 기준이 흔들립니다."],
  ["gate-owner", "utility별 facility owner와 witness 담당자를 적었다", "문제 발생 시 '누구에게 물어볼지'가 먼저 정리되어야 합니다."],
  ["gate-permit", "permit, LOTO, work boundary, PPE rule을 확인했다", "권한 없는 작업은 속도가 아니라 사고 위험입니다."],
  ["gate-gas", "gas cabinet, detector, purge, exhaust, abatement release 증거를 확인했다", "toxic/flammable/corrosive gas는 감각이 아니라 계측과 승인으로 다룹니다."],
  ["gate-interlock", "EMO/E-stop/interlock matrix와 ready signal 의미를 설명할 수 있다", "interlock은 우회 대상이 아니라 원인 추적의 출발점입니다."],
  ["gate-waferpath", "FI/EFEM, LL, TM, PM/CM wafer path를 순서대로 설명할 수 있다", "장비 구조를 모르면 transfer alarm과 qualification scope를 설명하기 어렵습니다."],
  ["gate-baseline", "pumpdown, MFC response, temperature trace, wafer transfer baseline을 저장했다", "정상 trace가 있어야 이상 trace를 빠르게 봅니다."],
  ["gate-handover", "고객 보고와 shift handover 문장을 준비했다", "사실, 리스크, 다음 액션, ETA가 없으면 보고가 흔들립니다."]
];

const briefingTemplates = [
  {
    title: "30초 고객 업데이트",
    body: "현재 상태: {phase}. 확인된 사실: {evidence}. 리스크: {risk}. 다음 액션: {next_action}. 다음 업데이트: {time}. 필요한 승인/지원: {owner_request}."
  },
  {
    title: "Hold / Stop-work 알림",
    body: "중단 사유: {unsafe_or_unverified_condition}. 근거: {measurement_or_log}. 영향 범위: {scope}. 요청 owner: {owner}. 재개 조건: {release_condition}."
  },
  {
    title: "Shift handover",
    body: "완료: {done}. 미완료: {open_items}. 건드리지 말 것: {do_not_touch}. 의심 원인: {suspect}. 다음 테스트: {next_test}. 고객 커뮤니케이션: {last_update}."
  }
];

const raciItems = [
  ["Site readiness", "CE", "Senior CE", "Customer tool/facility owner", "EHS / contractor"],
  ["Gas line release", "Facility owner", "EHS + Senior CE", "CE", "Process owner"],
  ["Module docking", "CE", "Senior CE", "Customer tool owner", "Rigging / module specialist"],
  ["Interlock verification", "CE + controls owner", "Senior CE", "EHS", "Customer facility owner"],
  ["Process qualification", "Process owner", "Customer tool owner", "CE + Senior CE", "Metrology / yield team"],
  ["Production release", "Customer owner", "Customer management", "CE", "Process / EHS / facility"]
];

const storageTopology = [
  ["Cloudflare D1 / ce_data", "어디서 접속해도 저장되는 기본 DB입니다.", "싱크탱크 entries, app state, 장기 학습 기록"],
  ["Local D drive mirror", "이 PC에서 vault server가 켜져 있을 때 D:\\FEP_EPI_ThinkTank_Vault로 복제됩니다.", "로컬 백업, export, 개인 자료 축적"],
  ["Browser localStorage", "화면 반응성을 위한 임시 캐시입니다.", "체크박스, 선택 상태, 짧은 학습 진행률"]
];

const epiInstallCampaign = [
  {
    id: "day0-carrier-context",
    day: "Install Day 0",
    phase: "Move-in / host context",
    title: "FOUP 도킹 전 lot/context를 먼저 묶기",
    subtitle: "wafer가 움직이기 전에 host, carrier, slot map, load port state가 같은 이야기를 하는지 확인합니다.",
    prompt: "FOUP이 load port에 도착했지만 carrier ID와 slot map 확인이 늦습니다. CE가 먼저 세워야 할 판단은?",
    twin: { step: 0, route: "epi-a", mode: "comm", layers: { packets: true, particles: false, pressure: true, cutaway: false } },
    process: { flow: "epi-sige", step: 0 },
    status: [
      ["Host/MES", "carrier context pending"],
      ["Load Port", "carrier present / clamp check"],
      ["EFEM", "waiting for verified map"],
      ["LL", "closed / no wafer"],
      ["TM", "idle"],
      ["PM", "not selected"],
      ["Risk", "traceability mismatch"]
    ],
    cards: [
      ["symptom", "carrier-id-delay", "Carrier ID 지연", "lot, carrier, slot map association이 늦거나 불명확합니다.", true],
      ["risk", "wrong-wafer", "Wrong wafer risk", "잘못된 wafer/context로 진행하면 downstream traceability가 깨집니다.", true],
      ["subsystem", "load-port-host", "Load Port + Host", "첫 원인 후보는 host/tool/load port handshake입니다.", true],
      ["evidence", "slot-map", "Slot map evidence", "carrier ID, slot map, timestamp, host event를 같은 시간축으로 묶습니다.", true],
      ["owner", "customer-host", "Customer host owner", "MES/host permission은 고객 owner와 같이 확인합니다.", true],
      ["stop", "no-context-no-move", "No context, no move", "carrier/slot association이 불명확하면 wafer move를 시작하지 않습니다.", true],
      ["report", "context-report", "보고 문장", "현재 wafer 이동 전 context 확인 단계이며, lot/carrier/slot map evidence를 맞춘 뒤 진행하겠습니다.", true],
      ["evidence", "recipe-edit", "Recipe edit", "recipe나 setpoint를 임의 변경해 해결하려고 합니다.", false]
    ],
    choices: [
      ["carrier present만 확인되면 EFEM pick을 먼저 진행한다.", false, "wafer 이동은 traceability가 맞은 뒤 진행해야 합니다.", "traceability"],
      ["host, carrier ID, slot map, load port event timestamp를 같은 evidence packet으로 묶고 owner 확인 후 진행한다.", true, "wafer가 움직이기 전 context가 맞아야 이후 모든 evidence가 의미를 갖습니다."],
      ["PM ready 상태부터 확인한다.", false, "이 단계의 병목은 PM이 아니라 front-end context와 host/load-port handshake입니다.", "subsystem-priority"]
    ],
    report: "현재는 wafer 이동 전 carrier context 확인 단계입니다. host event, carrier ID, slot map, load port state를 같은 timestamp로 맞춘 뒤 진행하겠습니다.",
    stop: "carrier/slot association, host permission, load port state가 맞지 않으면 wafer move 금지",
    next: "3D twin에서 communication packet layer를 켜고 Host -> Tool -> Load Port 흐름을 설명합니다."
  },
  {
    id: "day0-efem-pick",
    day: "Install Day 0",
    phase: "EFEM / FI handoff",
    title: "EFEM이 FOUP에서 wafer를 집기 전 mapping을 믿어도 되는가",
    subtitle: "EFEM은 대기압 handling 영역입니다. wafer present, aligner, door state, robot event order가 핵심 evidence입니다.",
    prompt: "EFEM pick 직전 wafer present는 보이지만 aligner result가 늦게 들어옵니다. 어떻게 판단할까?",
    twin: { step: 1, route: "epi-a", mode: "material", layers: { packets: true, particles: false, pressure: true, cutaway: false } },
    process: { flow: "epi-sige", step: 1 },
    status: [
      ["FOUP", "door open permission"],
      ["EFEM", "wafer present / aligner pending"],
      ["LL", "ATM side closed"],
      ["TM", "isolated"],
      ["Communication", "tool controller event order"],
      ["Risk", "slot mismatch / alignment fail"]
    ],
    cards: [
      ["symptom", "aligner-pending", "Aligner pending", "alignment result가 event chain에 늦게 들어옵니다.", true],
      ["risk", "handoff-error", "Handoff error", "wafer orientation/slot mismatch는 LL 이후 더 큰 문제로 번집니다.", true],
      ["subsystem", "efem-aligner", "EFEM + aligner", "대기압 robot, aligner, load port door state를 먼저 봅니다.", true],
      ["evidence", "robot-order", "Robot event order", "pick, align, place event 순서와 wafer present transition을 봅니다.", true],
      ["stop", "alignment-fail", "Alignment fail hold", "alignment fail, unexpected wafer present, door mismatch면 멈춥니다.", true],
      ["owner", "senior-ce", "Senior CE witness", "robot teach나 handoff 반복은 선임 witness와 진행합니다.", true],
      ["report", "efem-report", "보고 문장", "EFEM/aligner event 순서를 확인 중이며 LL 투입 전 wafer identity와 orientation을 고정하겠습니다.", true],
      ["risk", "ignore-aligner", "Ignore aligner", "aligner 결과 없이 LL로 넣고 나중에 확인합니다.", false]
    ],
    choices: [
      ["aligner 결과가 늦어도 wafer present만 있으면 LL로 보낸다.", false, "LL 이후에는 vacuum boundary가 생겨 복구 비용과 위험이 커집니다.", "EFEM/aligner"],
      ["EFEM event order, aligner result, wafer present transition을 확인하고 LL handoff 전 멈춤 기준을 세운다.", true, "대기압 영역에서 잡을 수 있는 문제는 vacuum boundary 전에 잡는 것이 맞습니다."],
      ["PM process readiness를 먼저 확인한다.", false, "아직 wafer는 EFEM/LL 전단에 있으므로 PM readiness가 1차 evidence가 아닙니다.", "subsystem-priority"]
    ],
    report: "EFEM pick 단계에서 wafer present, aligner result, robot event order를 확인하고 있습니다. LL handoff 전 identity/orientation evidence를 맞추겠습니다.",
    stop: "unexpected wafer present, alignment fail, door state mismatch",
    next: "3D twin에서 material path를 켜고 EFEM -> LL 전단을 천천히 추적합니다."
  },
  {
    id: "day1-loadlock-pumpdown",
    day: "Install Day 1",
    phase: "Load Lock pumpdown",
    title: "Load Lock이 대기압에서 transfer vacuum으로 내려가는가",
    subtitle: "LL은 FOUP/EFEM 대기압 영역과 TM vacuum 영역 사이의 압력 경계입니다.",
    prompt: "Load Lock pumpdown이 baseline보다 느리고 plateau가 생겼습니다. CE가 먼저 해야 할 일은?",
    twin: { step: 3, route: "epi-a", mode: "vacuum", layers: { packets: true, particles: true, pressure: true, cutaway: true } },
    process: { flow: "epi-sige", step: 2 },
    status: [
      ["LL", "pumpdown plateau"],
      ["Door", "both sides closed expected"],
      ["Pump", "running / response slow"],
      ["Gauge", "agreement required"],
      ["TM", "waiting for pressure ready"],
      ["Risk", "leak / door feedback / gauge mismatch"]
    ],
    cards: [
      ["symptom", "pressure-plateau", "Pressure plateau", "압력 곡선이 baseline 방향으로 충분히 내려가지 않습니다.", true],
      ["risk", "vacuum-boundary", "Vacuum boundary risk", "pressure equalization 없이 TM slit을 열면 안전/wafer risk가 큽니다.", true],
      ["subsystem", "ll-pump-gauge", "LL / pump / gauge", "LL seal, door feedback, pump state, gauge agreement를 분리합니다.", true],
      ["evidence", "pumpdown-curve", "Pumpdown curve", "baseline과 elapsed time, gauge agreement, pump state를 비교합니다.", true],
      ["owner", "facility-vacuum", "Facility / vacuum owner", "roughing/exhaust 관련 owner와 실제 상태를 대조합니다.", true],
      ["stop", "no-pressure-ready", "No pressure ready, no TM", "pressure ready가 방어되지 않으면 TM pickup을 허가하지 않습니다.", true],
      ["report", "ll-report", "보고 문장", "LL pumpdown curve가 baseline과 달라 door feedback, gauge, pump state를 분리 확인하겠습니다.", true],
      ["action", "open-slit", "Slit open retry", "압력이 애매한 상태에서 slit을 열어 확인합니다.", false]
    ],
    choices: [
      ["시간이 지나면 내려갈 수 있으니 TM pickup을 먼저 시도한다.", false, "pressure ready가 gate입니다. vacuum boundary를 추정으로 넘기면 안 됩니다.", "vacuum-boundary"],
      ["pumpdown curve, door feedback, pump state, gauge agreement를 baseline과 비교하고 pressure ready 전 TM move를 hold한다.", true, "증상 -> risk -> subsystem -> evidence -> stop condition 순서가 맞습니다."],
      ["process PM의 gas readiness를 먼저 확인한다.", false, "현재 증상은 LL pumpdown이며 gas readiness보다 vacuum boundary evidence가 우선입니다.", "subsystem-priority"]
    ],
    report: "LL pumpdown이 baseline과 달라 hold 상태로 보고합니다. door feedback, pump state, gauge agreement, elapsed time을 같은 trend로 묶어 확인하겠습니다.",
    stop: "pressure plateau, gauge disagreement, door feedback conflict, unresolved exhaust/pump alarm",
    next: "3D twin cutaway와 LL pressure layer를 켜고 압력 경계가 왜 필요한지 설명합니다."
  },
  {
    id: "day1-tm-pm-handoff",
    day: "Install Day 1",
    phase: "TM -> PM handoff",
    title: "TM robot이 올바른 PM에 wafer를 넘기는가",
    subtitle: "transfer chamber는 vacuum 안의 중앙 교차로입니다. PM ready, slit state, robot position, wafer present transition이 한 묶음입니다.",
    prompt: "TM pickup은 되었지만 PM load 직전 PM ready가 불안정합니다. 어떤 evidence를 우선할까?",
    twin: { step: 5, route: "epi-b", mode: "material", layers: { packets: true, particles: false, pressure: true, cutaway: true } },
    process: { flow: "epi-sige", step: 3 },
    status: [
      ["TM", "robot carrying wafer"],
      ["PM", "ready flicker"],
      ["Slit", "closed until ready"],
      ["Wafer", "identity must remain tied"],
      ["Scheduler", "module permission check"],
      ["Risk", "wrong module / wafer present abnormal"]
    ],
    cards: [
      ["symptom", "pm-ready-flicker", "PM ready flicker", "PM ready 신호가 안정적으로 유지되지 않습니다.", true],
      ["risk", "wrong-module", "Wrong module risk", "잘못된 PM 또는 불안정한 chamber에 wafer를 넣을 수 있습니다.", true],
      ["subsystem", "tm-pm-scheduler", "TM / PM / scheduler", "TM robot, PM ready, slit state, scheduler permission을 같이 봅니다.", true],
      ["evidence", "wafer-present-transition", "Wafer present transition", "TM hand, PM wafer present, slit close event timestamp를 묶습니다.", true],
      ["owner", "tool-owner", "Tool owner", "module map과 scheduler state는 tool owner/senior CE와 대조합니다.", true],
      ["stop", "pm-not-stable", "PM not stable hold", "PM ready가 안정적이지 않으면 load를 hold합니다.", true],
      ["report", "handoff-report", "보고 문장", "TM/PM handoff 전 PM ready와 wafer present transition이 안정적인지 확인하겠습니다.", true],
      ["action", "force-load", "Force load", "ready flicker를 무시하고 PM load를 반복합니다.", false]
    ],
    choices: [
      ["PM ready가 한 번이라도 들어왔으면 load를 진행한다.", false, "불안정한 ready는 wafer risk를 만들 수 있습니다.", "TM/PM handoff"],
      ["PM ready 유지, slit state, robot position, wafer present transition을 같은 timestamp로 확인하고 unstable이면 hold한다.", true, "handoff는 단일 신호가 아니라 상태 전이 묶음으로 봐야 합니다."],
      ["LL pumpdown curve만 다시 본다.", false, "LL은 이미 통과한 경계이고, 현재 병목은 TM/PM handoff입니다.", "subsystem-priority"]
    ],
    report: "TM -> PM handoff 전 PM ready 안정성, slit state, robot position, wafer present transition을 확인 중입니다. unstable ready면 load를 hold하겠습니다.",
    stop: "PM ready unstable, wrong module selected, wafer present abnormal, slit state conflict",
    next: "3D twin route를 PM-B로 바꾸고 TM 중심의 material path를 설명합니다."
  },
  {
    id: "day1-gas-readiness",
    day: "Install Day 1",
    phase: "First gas readiness",
    title: "Gas / purge / exhaust / abatement가 동시에 ready인가",
    subtitle: "EPI는 gas가 들어오는 순간부터 supply, chamber, pump, exhaust, abatement가 한 시스템이 됩니다.",
    prompt: "Tool ready는 보이지만 abatement local ready 확인이 늦습니다. CE의 안전한 판단은?",
    twin: { step: 6, route: "epi-a", mode: "gas", layers: { packets: true, particles: true, pressure: true, cutaway: true } },
    process: { flow: "epi-sige", step: 4 },
    status: [
      ["Gas box", "MFC actual needs witness"],
      ["PM", "isolated process state"],
      ["Pump", "foreline path ready"],
      ["Exhaust", "flow path required"],
      ["Abatement", "local ready pending"],
      ["Risk", "toxic/flammable/reactive gas family"]
    ],
    cards: [
      ["symptom", "abatement-pending", "Abatement pending", "tool ready와 local abatement ready가 아직 완전히 맞지 않습니다.", true],
      ["risk", "gas-hazard", "Gas hazard", "toxic/flammable/corrosive/reactive family는 exhaust/abatement witness가 핵심입니다.", true],
      ["subsystem", "gas-exhaust-abatement", "Gas + exhaust + abatement", "supply만 보지 말고 downstream 처리 경로까지 봅니다.", true],
      ["evidence", "mfc-exhaust-ready", "MFC / exhaust evidence", "MFC actual, supply pressure, exhaust ready, abatement ready, alarm history를 묶습니다.", true],
      ["owner", "ehs-gas-owner", "EHS / gas owner", "first gas readiness는 owner witness와 승인 문서가 우선입니다.", true],
      ["stop", "no-abatement-no-gas", "No abatement, no gas", "abatement/exhaust readiness가 방어되지 않으면 first gas를 진행하지 않습니다.", true],
      ["report", "gas-report", "보고 문장", "Tool ready와 local abatement ready를 대조 중이며, owner witness 후 first gas readiness를 판단하겠습니다.", true],
      ["action", "bypass-ready", "Bypass ready", "ready 신호를 우회하거나 detector/setpoint를 바꿔 진행합니다.", false]
    ],
    choices: [
      ["tool ready가 true면 first gas를 진행한다.", false, "gas readiness는 tool input뿐 아니라 local actual state와 owner witness가 필요합니다.", "gas-safety"],
      ["MFC actual, supply pressure, exhaust/abatement local ready, alarm history를 확인하고 owner witness 전 hold한다.", true, "first gas는 안전 경계가 가장 강한 단계입니다."],
      ["recipe step을 낮춰서 시험해 본다.", false, "recipe 조정은 process owner 승인 영역이며 install CE가 임의로 해결할 문제가 아닙니다.", "unsafe-action"]
    ],
    report: "First gas readiness는 tool ready와 local exhaust/abatement 상태를 분리해 확인 중입니다. EHS/gas owner witness와 alarm history 확인 후 진행 판단하겠습니다.",
    stop: "detector alarm, exhaust/abatement not ready, unknown purge completion, unapproved gas state",
    next: "3D twin에서 gas/facility overlay를 켜고 gas in -> PM -> pump -> abatement 흐름을 말합니다."
  },
  {
    id: "day2-baseline-wafer",
    day: "Install Day 2",
    phase: "Baseline wafer",
    title: "첫 baseline wafer 결과를 tool evidence와 묶기",
    subtitle: "qualification은 pass/fail만 보는 게 아니라 chamber state, trace, metrology가 같은 wafer ID로 묶이는지 확인하는 과정입니다.",
    prompt: "Baseline wafer thickness trend가 예상보다 낮습니다. CE가 process engineer처럼 분리할 축은?",
    twin: { step: 6, route: "epi-a", mode: "gas", layers: { packets: true, particles: true, pressure: true, cutaway: true } },
    process: { flow: "epi-sige", step: 5 },
    status: [
      ["Wafer", "baseline run complete"],
      ["Trace", "temperature / pressure / MFC"],
      ["Metrology", "thickness / Rs / defect"],
      ["PM", "seasoning / recovery context"],
      ["Risk", "premature recipe blame"],
      ["Report", "evidence packet required"]
    ],
    cards: [
      ["symptom", "thickness-low", "Thickness low trend", "baseline wafer 결과가 예상 trend보다 낮습니다.", true],
      ["risk", "wrong-root-cause", "Wrong root cause", "recipe 탓으로 단정하면 gas/thermal/vacuum evidence를 놓칩니다.", true],
      ["subsystem", "process-stack", "Process stack", "surface prep, gas delivery, temperature, pressure, metrology association을 분리합니다.", true],
      ["evidence", "trace-metrology", "Trace + metrology", "temperature, pressure, MFC actual, wafer ID, metrology result를 같은 packet으로 묶습니다.", true],
      ["owner", "process-owner", "Process owner", "acceptance와 process 판단은 process/customer owner 문서가 우선입니다.", true],
      ["stop", "no-association", "No association, no conclusion", "trace/metrology/wafer ID 연결이 깨지면 결론을 내리지 않습니다.", true],
      ["report", "baseline-report", "보고 문장", "baseline 결과를 tool trace와 metrology association으로 분리해 보고하겠습니다.", true],
      ["action", "recipe-tweak", "Recipe tweak", "두께가 낮으니 recipe 값을 바로 올립니다.", false]
    ],
    choices: [
      ["두께가 낮으니 recipe를 바로 보정한다.", false, "recipe 변경은 승인 영역입니다. 먼저 evidence packet으로 원인 후보를 좁혀야 합니다.", "process-discipline"],
      ["surface prep, gas delivery, thermal/vacuum trend, wafer ID/metrology association을 분리해 process owner와 리뷰한다.", true, "CE는 결과와 장비 evidence를 묶어 process 판단이 가능하게 만들어야 합니다."],
      ["PM chamber를 무조건 문제로 단정한다.", false, "PM 문제일 수도 있지만 path, incoming, trace association을 먼저 분리해야 합니다.", "premature-conclusion"]
    ],
    report: "Baseline wafer 결과를 wafer ID 기준으로 tool trace, gas/thermal/vacuum trend, metrology와 묶어 리뷰하겠습니다. recipe/acceptance 판단은 승인 문서와 process owner 기준으로 진행하겠습니다.",
    stop: "wafer ID mismatch, trace missing, abnormal particle burst, unsafe gas/exhaust state",
    next: "공정 극장에서 film growth layer와 trace/metrology association을 연결합니다."
  },
  {
    id: "day2-qualification-handover",
    day: "Install Day 2",
    phase: "Qualification / handover",
    title: "고객에게 handover 가능한 evidence packet 만들기",
    subtitle: "좋은 handover는 pass 문장 하나가 아니라 open risk, owner, next action, excluded boundary가 명확한 packet입니다.",
    prompt: "Dry run과 baseline은 통과했지만 한 번의 recoverable alarm이 있었습니다. 고객 보고 문장은 어떻게 잡을까?",
    twin: { step: 8, route: "epi-a", mode: "comm", layers: { packets: true, particles: true, pressure: true, cutaway: false } },
    process: { flow: "epi-sige", step: 6 },
    status: [
      ["Run", "dry run / baseline complete"],
      ["Alarm", "recoverable / documented"],
      ["Evidence", "trace, metrology, event log"],
      ["Owner", "customer / senior CE"],
      ["Risk", "overpromising"],
      ["Handover", "facts + next action"]
    ],
    cards: [
      ["symptom", "recoverable-alarm", "Recoverable alarm", "한 번의 alarm이 있었고 복구 기록이 남았습니다.", true],
      ["risk", "overpromise", "Overpromise risk", "완전 무결하다고 말하면 남은 risk와 owner가 사라집니다.", true],
      ["subsystem", "handover-packet", "Handover packet", "event log, trace, metrology, action/result/prevention을 묶습니다.", true],
      ["evidence", "alarm-history", "Alarm history", "alarm timestamp, action, result, recurrence 여부를 기록합니다.", true],
      ["owner", "customer-owner", "Customer owner", "고객 owner와 open item/review date를 합의합니다.", true],
      ["stop", "open-risk", "Open risk not closed", "unresolved safety/process risk가 있으면 handover 완료라고 말하지 않습니다.", true],
      ["report", "handover-report", "보고 문장", "확인된 사실, recoverable alarm, 재발 여부, open item, 다음 owner를 나눠 보고합니다.", true],
      ["action", "hide-alarm", "Hide alarm", "통과했으니 recoverable alarm은 보고하지 않습니다.", false]
    ],
    choices: [
      ["통과했으니 alarm은 언급하지 않고 완료 보고만 한다.", false, "고객 신뢰는 문제를 숨기지 않고 사실/위험/다음 행동을 분리할 때 생깁니다.", "handover"],
      ["완료 evidence, recoverable alarm 기록, 재발 여부, open item, next owner를 분리해 handover한다.", true, "senior CE식 보고는 overpromise 없이 사실과 next action을 명확히 합니다."],
      ["모든 open item을 process engineer에게 넘기고 CE 보고에서는 제외한다.", false, "handover에서는 owner 이관도 evidence로 남겨야 합니다.", "ownership"]
    ],
    report: "Dry run과 baseline evidence는 확보됐고, recoverable alarm은 timestamp/action/result/recurrence 여부로 분리 기록했습니다. open item과 owner를 합의한 뒤 handover 상태를 업데이트하겠습니다.",
    stop: "unresolved safety risk, missing trace/metrology association, unclear owner, unapproved acceptance conclusion",
    next: "Think Tank에 handover packet을 남기고 AI packet에 포함 가능한 요약으로 저장합니다."
  }
];

const state = JSON.parse(localStorage.getItem("ceTrainerState") || "{}");
let activeSystem = systems[0].id;
let activeScenario = 0;
let qIndex = 0;
let activeMeterCase = "prove";
let activeGlossaryCategory = "전체";
let activeRunbookStage = fieldRunbookStages[0].id;
let activeProcessFlow = processVisualFlows[0].id;
let activeProcessStep = 0;
let activeMentalFrame = state.activeMentalFrame || "carrier-context";
let activeIncidentCase = state.activeIncidentCase || "ll-slow-pumpdown";
let activePeTwinStep = 0;
let activePeFailureIndex = 0;
const peKnobs = { temp: 58, pressure: 46, precursor: 54, selectivity: 48, purge: 72, exhaust: 80 };
let activeTraceScenario = state.activeTraceScenario || "epi-uniformity";
let activeTraceView = state.activeTraceView || "trace";
let activeTraceCaseIndex = state.activeTraceCaseIndex || 0;
const traceEvidenceSelection = new Set(state.traceEvidenceSelection || []);
let traceImportStatus = state.traceImportStatus || "";
let traceRemoteSaveStatus = "";
const rtpTraceKnobs = {
  ramp: state.rtpTraceKnobs?.ramp ?? 56,
  pyrometry: state.rtpTraceKnobs?.pyrometry ?? 72,
  cooling: state.rtpTraceKnobs?.cooling ?? 74,
  ambient: state.rtpTraceKnobs?.ambient ?? 66
};
let activeCurriculumChapter = state.activeCurriculumChapter || curriculumChapters[0].id;
let activeFepProcessTwin = state.activeFepProcessTwin || fepProcessTwinSteps[0].id;
let activeFepInstallGate = state.activeFepInstallGate || fepInstallGates[0].id;
let activeFepGasGroup = state.activeFepGasGroup || "all";
let activeFepCase = state.activeFepCase || fepFailureCases[0].id;
let activeEpiMission = state.activeEpiMission || epiInstallCampaign[0].id;
const uxPaletteState = { query: "", results: [] };

const VIEW_LABELS = {
  bookshelf: "책장",
  cognitive: "인지능력",
  dashboard: "EPI 홈",
  curriculum: "커리큘럼",
  roadmap: "로드맵",
  systems: "장비/공정",
  "process-visual": "공정 시각화",
  equipment: "장비군",
  cluster: "구성게임",
  install: "설치",
  facility: "시설 연결",
  electrical: "전기/DVM",
  gases: "가스안전",
  safety: "라인준수",
  mastery: "마스터리",
  readiness: "현장투입",
  runbook: "런북",
  thinktank: "싱크탱크",
  deep: "심화",
  fab101: "팹 기초",
  papers: "논문노트",
  "english-test": "영어시험",
  english: "영어풀이",
  glossary: "용어집",
  diagnostics: "진단훈련",
  quiz: "퀴즈"
};

const BOOK_VIEW_IDS = Object.keys(VIEW_LABELS).filter(id => !["bookshelf", "cognitive"].includes(id));

const BOOK_VIEW_SEQUENCE = [
  "dashboard",
  "curriculum",
  "roadmap",
  "fab101",
  "glossary",
  "systems",
  "process-visual",
  "equipment",
  "cluster",
  "install",
  "facility",
  "gases",
  "safety",
  "electrical",
  "diagnostics",
  "mastery",
  "readiness",
  "runbook",
  "thinktank",
  "deep",
  "papers",
  "english-test",
  "english",
  "quiz"
];

const VIEW_CHAPTERS = {
  cognitive: "인지 건강",
  dashboard: "방향 잡기",
  curriculum: "성장 커리큘럼",
  roadmap: "처음 펼칠 장",
  fab101: "처음 펼칠 장",
  glossary: "처음 펼칠 장",
  systems: "장비 마스터리",
  "process-visual": "장비 마스터리",
  equipment: "장비 마스터리",
  cluster: "장비 마스터리",
  deep: "장비 마스터리",
  install: "설치와 현장 수행",
  facility: "설치와 현장 수행",
  gases: "설치와 현장 수행",
  safety: "설치와 현장 수행",
  electrical: "진단과 성장",
  diagnostics: "진단과 성장",
  mastery: "진단과 성장",
  readiness: "진단과 성장",
  runbook: "진단과 성장",
  thinktank: "진단과 성장",
  papers: "면접과 영어",
  "english-test": "면접과 영어",
  english: "면접과 영어",
  quiz: "면접과 영어"
};

const uxHotViews = [
  ["cognitive", "인지"],
  ["runbook", "런북"],
  ["process-visual", "공정"],
  ["cluster", "구성"],
  ["electrical", "DVM"],
  ["english-test", "영어"]
];
const operatingRouteSteps = [
  {
    id: "structure",
    order: "01",
    title: "구조 먼저",
    view: "cluster",
    focus: "FOUP -> EFEM -> Load Lock -> TM -> PM",
    why: "웨이퍼가 대기압에서 진공 클러스터로 들어가는 큰 그림을 먼저 잡습니다.",
    action: "3D 구조 보기"
  },
  {
    id: "process",
    order: "02",
    title: "공정 변화",
    view: "process-visual",
    focus: "Gas / Pump / Purge / Exhaust / Film",
    why: "장비가 웨이퍼 위에서 실제로 무엇을 바꾸는지 단계별로 연결합니다.",
    action: "공정 극장 열기"
  },
  {
    id: "install",
    order: "03",
    title: "설치 순서",
    view: "runbook",
    focus: "Move-in -> Hook-up -> Dry run -> Qual",
    why: "현장에서는 설명보다 evidence, owner, hold condition이 먼저입니다.",
    action: "런북 체크"
  },
  {
    id: "diagnose",
    order: "04",
    title: "판단 훈련",
    view: "diagnostics",
    focus: "Symptom -> Risk -> Evidence -> Report",
    why: "문제가 생겼을 때 바로 조치하지 말고 위험도와 확인 증거부터 세웁니다.",
    action: "케이스 풀기"
  },
  {
    id: "memory",
    order: "05",
    title: "경험 저장",
    view: "thinktank",
    focus: "Symptom / Evidence / Action / Prevention",
    why: "현장 경험은 구조화해서 저장할 때 다음 실력으로 변합니다.",
    action: "Think Tank 기록"
  }
];

const PUBLIC_VIEW_IDS = ["cognitive"];

function save() {
  persistState();
  renderMetrics();
  renderCommandCenter();
  renderRunbook();
  renderLearningHud();
  renderEpiMissionEngine();
  renderEpiMentalModelBuilder();
  renderCeIncidentKernel();
}

function persistState() {
  localStorage.setItem("ceTrainerState", JSON.stringify(state));
}

function getNavLabel(id) {
  const button = document.querySelector(`.nav-btn[data-view="${id}"]`);
  return VIEW_LABELS[id] || button?.textContent?.trim() || id;
}

function isPublicView(id) {
  return PUBLIC_VIEW_IDS.includes(id);
}

function isPrivateUnlocked() {
  return document.body.classList.contains("auth-unlocked");
}

function requestPrivateAccess(targetView = "bookshelf") {
  if (window.ProjectUniverseAuth?.requestAccess) {
    window.ProjectUniverseAuth.requestAccess(targetView);
    return;
  }
  document.body.dataset.pendingPrivateView = targetView;
  document.querySelector("#entry-choice-gate")?.classList.add("hidden");
  document.querySelector("#password-gate")?.classList.remove("hidden");
  document.querySelector("#password-input")?.focus();
}

function updateViewMemory(id) {
  state.lastView = id;
  state.viewVisits = state.viewVisits || {};
  state.viewVisits[id] = (state.viewVisits[id] || 0) + 1;
  state.recentViews = [id, ...(state.recentViews || []).filter(item => item !== id)].slice(0, 5);
  persistState();
}

function getNextBookView(id) {
  const index = BOOK_VIEW_SEQUENCE.indexOf(id);
  if (index < 0) return BOOK_VIEW_SEQUENCE[0];
  return BOOK_VIEW_SEQUENCE[(index + 1) % BOOK_VIEW_SEQUENCE.length];
}

function renderBookContextBar(id) {
  const bar = document.querySelector("#book-context-bar");
  if (!bar) return;
  if (!BOOK_VIEW_IDS.includes(id)) {
    bar.classList.add("hidden");
    bar.innerHTML = "";
    return;
  }
  const nextView = getNextBookView(id);
  const chapter = VIEW_CHAPTERS[id] || "책 안의 장";
  const visits = state.viewVisits?.[id] || 0;
  bar.classList.remove("hidden");
  bar.innerHTML = `
    <div class="book-context-copy">
      <span class="book-context-kicker">FEP/EPI 현장 엔지니어</span>
      <strong>${chapter} / ${getNavLabel(id)}</strong>
      <small>이 화면은 책장 속 FEP/EPI 책의 한 장입니다. 방문 ${visits}회</small>
    </div>
    <label class="book-context-select-label">
      <span>장 이동</span>
      <select class="book-context-select" data-context-select aria-label="FEP/EPI 책 장 선택">
        ${BOOK_VIEW_SEQUENCE.map(view => `<option value="${view}" ${view === id ? "selected" : ""}>${getNavLabel(view)}</option>`).join("")}
      </select>
    </label>
    <div class="book-context-actions">
      <button class="secondary" type="button" data-context-view="bookshelf">책장으로</button>
      <button class="secondary" type="button" data-context-search>검색</button>
      <button class="primary" type="button" data-context-view="${nextView}">다음 장: ${getNavLabel(nextView)}</button>
    </div>
  `;
  bar.querySelectorAll("[data-context-view]").forEach(button => {
    button.addEventListener("click", () => showView(button.dataset.contextView));
  });
  bar.querySelector("[data-context-select]")?.addEventListener("change", event => showView(event.target.value));
  bar.querySelector("[data-context-search]")?.addEventListener("click", () => openCommandPalette());
}

function showView(id, options = {}) {
  if (!document.getElementById(id)) return;
  if (!isPublicView(id) && !isPrivateUnlocked()) {
    requestPrivateAccess(id);
    return;
  }
  document.body.dataset.currentView = id;
  document.querySelectorAll(".view").forEach(view => view.classList.toggle("active", view.id === id));
  document.querySelectorAll(".nav-btn").forEach(btn => btn.classList.toggle("active", btn.dataset.view === id));
  document.querySelector("#open-active-book")?.classList.toggle("active", BOOK_VIEW_IDS.includes(id));
  if (!options.skipMemory) updateViewMemory(id);
  closeCommandPalette();
  renderBookContextBar(id);
  renderLearningHud();
  document.title = `${getNavLabel(id)} | 인생 정보실`;
  window.scrollTo({ top: 0, behavior: options.instant ? "auto" : "smooth" });
}

window.showView = showView;

function getRoadmapMissions() {
  return roadmap.flatMap(week => week.missions.map(([id, label, hint]) => ({
    id,
    label,
    hint,
    week: week.week
  })));
}

function getRunbookGateProgress() {
  const checked = runbookGates.filter(([id]) => state.runbookGates?.[id]).length;
  return {
    checked,
    total: runbookGates.length,
    percent: Math.round(checked / runbookGates.length * 100)
  };
}

function getRoadmapProgress() {
  const missions = getRoadmapMissions();
  const done = missions.filter(item => state.missions?.[item.id]).length;
  return {
    done,
    total: missions.length,
    percent: missions.length ? Math.round(done / missions.length * 100) : 0
  };
}

function getQuizProgress() {
  const attempts = state.quizAttempts || [];
  return {
    total: attempts.length,
    percent: attempts.length ? Math.round(attempts.filter(Boolean).length / attempts.length * 100) : 0
  };
}

function getCurriculumProgress() {
  const completed = curriculumChapters.filter(chapter => state.curriculumDone?.[chapter.id]).length;
  const answered = curriculumChapters.filter(chapter => state.curriculumQuiz?.[chapter.id]).length;
  const correct = curriculumChapters.filter(chapter => state.curriculumQuiz?.[chapter.id] === "correct").length;
  const weak = curriculumChapters.filter(chapter =>
    !state.curriculumDone?.[chapter.id] || state.curriculumQuiz?.[chapter.id] === "wrong"
  );
  const readinessScore = Math.round(((completed / curriculumChapters.length) * 0.55 + (correct / curriculumChapters.length) * 0.45) * 100);
  const seniorScore = Math.round((
    (["failure-mode", "handover", "thinktank-loop", "maintenance"].filter(id => state.curriculumDone?.[id]).length / 4) * 0.55 +
    (["failure-mode", "handover", "thinktank-loop", "maintenance"].filter(id => state.curriculumQuiz?.[id] === "correct").length / 4) * 0.45
  ) * 100);
  return {
    completed,
    answered,
    correct,
    total: curriculumChapters.length,
    percent: Math.round(completed / curriculumChapters.length * 100),
    quizPercent: answered ? Math.round(correct / answered * 100) : 0,
    readinessScore,
    seniorScore,
    weak
  };
}

function getUxSearchItems() {
  const navItems = Object.entries(VIEW_LABELS).map(([view, title]) => ({
    title,
    meta: view === "bookshelf" ? "인생 정보실" : VIEW_CHAPTERS[view] || "책 안의 장",
    body: view === "bookshelf"
      ? "책장으로 이동"
      : view === "cognitive"
        ? "인지능력향상 프로젝트의 오늘 훈련으로 이동"
        : `FEP/EPI 현장 엔지니어 책의 ${title} 장으로 이동`,
    view
  }));
  const commandItems = commandCenterActions.map(item => ({
    title: item.title,
    meta: item.label,
    body: `${item.text} ${item.chips.join(" ")}`,
    view: item.view
  }));
  const roadmapItems = getRoadmapMissions().map(item => ({
    title: item.label,
    meta: `로드맵 ${item.week}`,
    body: item.hint,
    view: "roadmap"
  }));
  const systemItems = systems.map(item => ({
    title: item.name,
    meta: "장비/공정",
    body: item.one,
    view: "systems",
    onOpen: () => {
      activeSystem = item.id;
      renderSystems();
    }
  }));
  const equipmentItems = equipmentFamilies.map(item => ({
    title: item.name,
    meta: item.family,
    body: `${item.what} ${item.study.join(" ")}`,
    view: "equipment"
  }));
  const gasItems = gasProfiles.map(item => ({
    title: item.name,
    meta: "가스안전",
    body: `${item.use} ${item.hazards.join(" ")} ${item.ce.join(" ")}`,
    view: "gases"
  }));
  const processItems = processVisualFlows.flatMap(flow => [
    {
      title: flow.title,
      meta: "공정 시각화",
      body: `${flow.summary} ${flow.gasMatrix.map(item => item.join(" ")).join(" ")}`,
      view: "process-visual",
      onOpen: () => {
        activeProcessFlow = flow.id;
        activeProcessStep = 0;
        renderProcessVisual();
      }
    },
    ...flow.steps.map((step, index) => ({
      title: step.title,
      meta: `${flow.kicker} / 단계 ${index + 1}`,
      body: `${step.subtitle} ${step.gas} ${step.pressure} ${step.pump} ${step.purge} ${step.exhaust} ${step.waferEffect}`,
      view: "process-visual",
      onOpen: () => {
        activeProcessFlow = flow.id;
        activeProcessStep = index;
        renderProcessVisual();
      }
    }))
  ]);
  const runbookItems = fieldRunbookStages.map(item => ({
    title: item.title,
    meta: "현장 런북",
    body: `${item.plain} ${item.objective} ${item.holdIf.join(" ")}`,
    view: "runbook",
    onOpen: () => {
      activeRunbookStage = item.id;
      renderRunbook();
    }
  }));
  const fepBigBangItems = [
    ...fepProcessTwinSteps.map(item => ({
      title: item.title,
      meta: `FEP/EPI Big Bang / ${item.mode}`,
      body: `${item.area} ${item.wafer} ${item.gasState} ${item.ceEvidence.join(" ")} ${item.stop}`,
      view: "curriculum",
      onOpen: () => {
        activeFepProcessTwin = item.id;
        state.activeFepProcessTwin = item.id;
        persistState();
        renderCurriculum();
      }
    })),
    ...fepInstallGates.map(item => ({
      title: item.title,
      meta: "FEP/EPI Install Gate",
      body: `${item.owner} ${item.evidence.join(" ")} ${item.stop} ${item.report}`,
      view: "curriculum",
      onOpen: () => {
        activeFepInstallGate = item.id;
        state.activeFepInstallGate = item.id;
        persistState();
        renderCurriculum();
      }
    })),
    ...fepFailureCases.map(item => ({
      title: item.title,
      meta: `FEP/EPI Case / ${item.subsystem}`,
      body: `${item.symptom} ${item.risk} ${item.evidence.join(" ")} ${item.stop} ${item.report}`,
      view: "curriculum",
      onOpen: () => {
        activeFepCase = item.id;
        state.activeFepCase = item.id;
        persistState();
        renderCurriculum();
      }
    })),
    ...fepGasHazardMatrix.map(item => ({
      title: item.name,
      meta: `FEP/EPI Gas / ${item.group}`,
      body: `${item.role} ${item.hazards.join(" ")} ${item.evidence} ${item.boundary}`,
      view: "curriculum",
      onOpen: () => {
        activeFepGasGroup = item.group;
        state.activeFepGasGroup = item.group;
        persistState();
        renderCurriculum();
      }
    }))
  ];
  const curriculumItems = curriculumChapters.map(item => ({
    title: item.title,
    meta: `커리큘럼 / ${item.level}`,
    body: `${item.subtitle} ${item.minute} ${item.evidence.join(" ")} ${item.terms.join(" ")}`,
    view: "curriculum",
    onOpen: () => {
      activeCurriculumChapter = item.id;
      state.activeCurriculumChapter = item.id;
      persistState();
      renderCurriculum();
    }
  }));
  return [...navItems, ...commandItems, ...fepBigBangItems, ...curriculumItems, ...roadmapItems, ...systemItems, ...processItems, ...equipmentItems, ...gasItems, ...runbookItems];
}

function scoreUxSearchItem(item, query) {
  const q = query.trim().toLowerCase();
  if (!q) return 1;
  const title = item.title.toLowerCase();
  const meta = item.meta.toLowerCase();
  const body = item.body.toLowerCase();
  let score = 0;
  if (title === q) score += 20;
  if (title.includes(q)) score += 10;
  if (meta.includes(q)) score += 5;
  if (body.includes(q)) score += 2;
  q.split(/\s+/).filter(Boolean).forEach(token => {
    if (title.includes(token)) score += 4;
    if (meta.includes(token)) score += 2;
    if (body.includes(token)) score += 1;
  });
  return score;
}

function renderLearningHud() {
  const root = document.querySelector("#learning-hud");
  if (!root) return;
  const roadmapProgress = getRoadmapProgress();
  const gateProgress = getRunbookGateProgress();
  const quizProgress = getQuizProgress();
  const currentView = document.querySelector(".view.active")?.id || state.lastView || "bookshelf";
  const recentViews = (state.recentViews || [currentView]).filter(Boolean).slice(0, 3);
  root.innerHTML = `
    <details class="learning-hud-card">
      <summary>
        <strong>빠른 이동</strong>
        <span>Roadmap ${roadmapProgress.percent}% · Runbook ${gateProgress.percent}%</span>
      </summary>
      <div class="hud-body">
        <button class="hud-search" type="button" data-ux-search>검색</button>
        <div class="hud-progress">
          <span>Roadmap <b>${roadmapProgress.percent}%</b></span>
          <i><em style="width:${roadmapProgress.percent}%"></em></i>
          <span>Runbook <b>${gateProgress.percent}%</b></span>
          <i><em style="width:${gateProgress.percent}%"></em></i>
        </div>
        <div class="hud-jumps">
          ${uxHotViews.map(([view, label]) => `
            <button type="button" class="${view === currentView ? "active" : ""}" data-ux-view="${view}">${label}</button>
          `).join("")}
        </div>
        <div class="hud-recents">
          ${recentViews.map(view => `<button type="button" data-ux-view="${view}">${getNavLabel(view)}</button>`).join("")}
        </div>
        <button class="hud-top" type="button" data-ux-top>맨 위</button>
        <span class="hud-quiz">Quiz ${quizProgress.total ? `${quizProgress.percent}%` : "0%"}</span>
      </div>
    </details>
  `;
  root.querySelector("[data-ux-search]")?.addEventListener("click", () => openCommandPalette());
  root.querySelectorAll("[data-ux-view]").forEach(button => {
    button.addEventListener("click", () => showView(button.dataset.uxView));
  });
  root.querySelector("[data-ux-top]")?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function renderCommandPalette() {
  const results = document.querySelector("#command-palette-results");
  const input = document.querySelector("#command-palette-input");
  if (!results || !input) return;
  const query = input.value.trim();
  uxPaletteState.query = query;
  uxPaletteState.results = getUxSearchItems()
    .map(item => ({ ...item, score: scoreUxSearchItem(item, query) }))
    .filter(item => !query || item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 9);
  results.innerHTML = uxPaletteState.results.length ? uxPaletteState.results.map((item, index) => `
    <button class="palette-result" type="button" data-palette-index="${index}">
      <span>${item.meta}</span>
      <strong>${item.title}</strong>
      <small>${item.body}</small>
    </button>
  `).join("") : `
    <div class="palette-empty">
      <strong>결과 없음</strong>
      <span>다른 장비명, 공정명, 가스명, 현장 용어로 검색해보세요.</span>
    </div>
  `;
  results.querySelectorAll("[data-palette-index]").forEach(button => {
    button.addEventListener("click", () => {
      const item = uxPaletteState.results[Number(button.dataset.paletteIndex)];
      if (!item) return;
      item.onOpen?.();
      showView(item.view);
    });
  });
}

function openCommandPalette(seed = "") {
  if (!isPrivateUnlocked()) {
    requestPrivateAccess("bookshelf");
    return;
  }
  const palette = document.querySelector("#command-palette");
  const input = document.querySelector("#command-palette-input");
  if (!palette || !input) return;
  palette.classList.remove("hidden");
  input.value = seed;
  renderCommandPalette();
  input.focus();
  input.select();
}

function closeCommandPalette() {
  document.querySelector("#command-palette")?.classList.add("hidden");
}

function getOperatingRouteProgress() {
  const visits = state.viewVisits || {};
  const completed = operatingRouteSteps.filter(step => Number(visits[step.view] || 0) > 0);
  const next = operatingRouteSteps.find(step => Number(visits[step.view] || 0) === 0) || operatingRouteSteps[0];
  return {
    completed: completed.length,
    total: operatingRouteSteps.length,
    percent: Math.round(completed.length / operatingRouteSteps.length * 100),
    next
  };
}

const THEME_STORAGE_KEY = "projectUniverseTheme";

function normalizeTheme(theme) {
  return theme === "dark" ? "dark" : "light";
}

function storedThemePreference() {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "dark") return stored;
  } catch {
    // Storage can be blocked in strict browser modes; keep the UI usable.
  }
  const current = document.documentElement.dataset.theme;
  if (current === "dark" || current === "light") return current;
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function persistThemePreference(theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Theme still applies for the current session even when persistence is unavailable.
  }
}

function applyTheme(theme, options = {}) {
  const nextTheme = theme === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = nextTheme;
  document.documentElement.style.colorScheme = nextTheme;
  if (options.persist !== false) persistThemePreference(nextTheme);
  const toggle = document.querySelector("#theme-toggle");
  if (toggle) {
    toggle.textContent = nextTheme === "dark" ? "콘솔" : "야간";
    toggle.setAttribute("aria-pressed", String(nextTheme === "dark"));
    toggle.setAttribute("aria-label", nextTheme === "dark" ? "인텔리전스 콘솔 모드" : "야간 콘솔 모드");
  }
}

function toggleTheme() {
  applyTheme(normalizeTheme(document.documentElement.dataset.theme) === "dark" ? "light" : "dark");
}

function bindGlobalUx() {
  applyTheme(storedThemePreference(), { persist: false });
  document.querySelector("#theme-toggle")?.addEventListener("click", toggleTheme);
  window.addEventListener("storage", event => {
    if (event.key === THEME_STORAGE_KEY && (event.newValue === "dark" || event.newValue === "light")) {
      applyTheme(event.newValue, { persist: false });
    }
  });
  document.querySelector("#open-active-book")?.addEventListener("click", () => {
    const recentBookView = (state.recentViews || []).find(view => BOOK_VIEW_IDS.includes(view));
    if (!isPrivateUnlocked()) {
      requestPrivateAccess(recentBookView || "dashboard");
      return;
    }
    showView(recentBookView || "dashboard");
  });
  document.querySelector("#open-command-search")?.addEventListener("click", () => openCommandPalette());
  document.querySelector("#command-palette-input")?.addEventListener("input", renderCommandPalette);
  document.querySelector("#command-palette-close")?.addEventListener("click", closeCommandPalette);
  document.querySelector("#command-palette")?.addEventListener("click", event => {
    if (event.target.id === "command-palette") closeCommandPalette();
  });
  document.addEventListener("keydown", event => {
    const tag = document.activeElement?.tagName;
    const typing = ["INPUT", "TEXTAREA", "SELECT"].includes(tag);
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      openCommandPalette();
    } else if (!typing && event.key === "/") {
      event.preventDefault();
      openCommandPalette();
    } else if (event.key === "Escape") {
      closeCommandPalette();
    }
  });
}

function renderCommandCenter() {
  const root = document.querySelector("#command-center");
  if (!root) return;

  const missions = getRoadmapMissions();
  const missionDone = missions.filter(item => state.missions?.[item.id]).length;
  const nextMission = missions.find(item => !state.missions?.[item.id]) || missions[0];
  const gateProgress = getRunbookGateProgress();
  const attempts = state.quizAttempts || [];
  const quizScore = attempts.length ? Math.round(attempts.filter(Boolean).length / attempts.length * 100) : 0;
  const routeProgress = getOperatingRouteProgress();
  const epiAnswers = state.epiMissionAnswers || {};
  const nextEpiMission = epiInstallCampaign.find(item => !epiAnswers[item.id]) || getActiveEpiMission();
  const epiMissionCorrect = Object.values(epiAnswers).filter(item => item.correct).length;

  root.innerHTML = `
    <div class="command-head">
      <div>
        <p class="eyebrow">Mission Control</p>
        <h2>오늘의 운영 브리핑</h2>
        <p>정보를 많이 읽기보다 구조를 만들고, 판단 기준을 체크하고, 경험을 저장하는 흐름으로 설계했습니다.</p>
      </div>
      <button class="primary" type="button" data-command-view="runbook">현장 런북 열기</button>
    </div>
    <section class="operating-route" aria-label="CE operating route">
      <div class="route-head">
        <div class="route-title">
          <p class="eyebrow">CE Operating Route</p>
          <h3>CE 5단계 루트</h3>
          <span>구조를 먼저 그리고, 공정 변화를 보고, 설치 evidence를 확인한 뒤, 고장 판단과 경험 저장으로 닫습니다.</span>
        </div>
        <div class="route-meter">
          <strong>${routeProgress.percent}%</strong>
          <span>${routeProgress.completed}/${routeProgress.total} 단계 확인</span>
          <i><em style="width:${routeProgress.percent}%"></em></i>
        </div>
        <div class="route-actions">
          <button class="primary" type="button" data-route-start>다음 단계 시작</button>
          <button class="secondary" type="button" data-route-search>검색</button>
        </div>
      </div>
      <div class="route-lane">
        ${operatingRouteSteps.map(step => {
          const visited = Number(state.viewVisits?.[step.view] || 0) > 0;
          const isNext = step.id === routeProgress.next.id;
          return `
            <button class="route-step-card ${visited ? "done" : ""} ${isNext ? "next" : ""}" type="button" data-route-view="${step.view}">
              <span class="route-order">${step.order}</span>
              <strong>${step.title}</strong>
              <small>${step.focus}</small>
              <em>${step.why}</em>
              <b>${visited ? "확인됨" : isNext ? "지금 할 일" : step.action}</b>
            </button>
          `;
        }).join("")}
      </div>
    </section>
    <div class="command-kpis">
      <article>
        <span>로드맵</span>
        <strong>${missionDone}/${missions.length}</strong>
        <small>완료한 미션</small>
      </article>
      <article>
        <span>런북 gate</span>
        <strong>${gateProgress.percent}%</strong>
        <small>${gateProgress.checked}/${gateProgress.total}개 준비</small>
      </article>
      <article>
        <span>퀴즈 recall</span>
        <strong>${quizScore}%</strong>
        <small>최근 응답 기준</small>
      </article>
      <article>
        <span>EPI mission</span>
        <strong>${epiMissionCorrect}/${Object.keys(epiAnswers).length || 0}</strong>
        <small>v6 판단 훈련</small>
      </article>
    </div>
    <div class="command-next">
      <span class="command-badge">Next</span>
      <div>
        <strong>${nextEpiMission.day} · ${nextEpiMission.title}</strong>
        <small>${nextEpiMission.phase} · ${nextEpiMission.stop}</small>
      </div>
      <button class="primary" type="button" data-command-epi-mission="${nextEpiMission.id}">오늘의 EPI 미션</button>
      <button class="secondary" type="button" data-command-view="roadmap">로드맵도 보기</button>
    </div>
    <div class="command-actions">
      ${commandCenterActions.map(action => `
        <button class="command-card" type="button" data-command-view="${action.view}">
          <span>${action.label}</span>
          <strong>${action.title}</strong>
          <small>${action.text}</small>
          <em>${action.chips.map(chip => `<b>${chip}</b>`).join("")}</em>
        </button>
      `).join("")}
    </div>
  `;

  root.querySelectorAll("[data-command-view]").forEach(button => {
    button.addEventListener("click", () => showView(button.dataset.commandView));
  });
  root.querySelector("[data-command-epi-mission]")?.addEventListener("click", event => {
    activeEpiMission = event.currentTarget.dataset.commandEpiMission;
    state.activeEpiMission = activeEpiMission;
    persistState();
    showView("process-visual");
    window.setTimeout(() => {
      renderEpiMissionEngine();
      applyEpiMissionToTwin(getActiveEpiMission(), { scroll: false });
      document.querySelector("#epi-mission-engine")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
  });
  root.querySelector("[data-route-start]")?.addEventListener("click", () => showView(routeProgress.next.view));
  root.querySelector("[data-route-search]")?.addEventListener("click", () => openCommandPalette());
  root.querySelectorAll("[data-route-view]").forEach(button => {
    button.addEventListener("click", () => showView(button.dataset.routeView));
  });
}

function renderLearningUX() {
  const cockpit = document.querySelector("#learning-cockpit");
  if (cockpit) {
    cockpit.innerHTML = learningCockpit.map(item => `
      <button class="cockpit-card" type="button" data-cockpit-view="${item.view}">
        <span class="cockpit-step">${item.step}</span>
        <small>${item.mode} · ${item.principle}</small>
        <strong>${item.title}</strong>
        <em>${item.text}</em>
        <b>${item.action}</b>
      </button>
    `).join("");
    cockpit.querySelectorAll("[data-cockpit-view]").forEach(button => {
      button.addEventListener("click", () => showView(button.dataset.cockpitView));
    });
  }
  const science = document.querySelector("#learning-science-panel");
  if (science) {
    science.innerHTML = `
      <div class="science-head">
        <p class="eyebrow">Learning Science</p>
        <h2>논문 근거를 UI 동선으로 바꾼 설계</h2>
        <button class="science-source-link" type="button" data-science-view="papers">논문 노트 보기</button>
      </div>
      <div class="science-grid">
        ${learningScienceCards.map(([title, idea, design]) => `
          <article>
            <strong>${title}</strong>
            <span>${idea}</span>
            <small>${design}</small>
          </article>
        `).join("")}
      </div>
    `;
    science.querySelector("[data-science-view]")?.addEventListener("click", button => {
      showView(button.currentTarget.dataset.scienceView);
    });
  }
}

function getFepBigBangStats() {
  const answers = Object.values(state.fepBigBangCaseAnswers || {});
  const correct = answers.filter(item => item.correct).length;
  const weak = Object.entries(state.fepBigBangWeaknesses || {})
    .map(([subsystem, count]) => ({ subsystem, count }))
    .sort((a, b) => b.count - a.count);
  return {
    answered: answers.length,
    correct,
    casePercent: answers.length ? Math.round(correct / answers.length * 100) : 0,
    weak,
    readiness: Math.min(100, Math.round(
      (answers.length / fepFailureCases.length) * 40 +
      (correct / Math.max(1, fepFailureCases.length)) * 35 +
      (Object.values(state.curriculumDone || {}).filter(Boolean).length / curriculumChapters.length) * 25
    ))
  };
}

function getActiveFepTwin() {
  return fepProcessTwinSteps.find(item => item.id === activeFepProcessTwin) || fepProcessTwinSteps[0];
}

function getActiveFepGate() {
  return fepInstallGates.find(item => item.id === activeFepInstallGate) || fepInstallGates[0];
}

function getActiveFepCase() {
  return fepFailureCases.find(item => item.id === activeFepCase) || fepFailureCases[0];
}

function renderFepBigBangLab(progress) {
  const stats = getFepBigBangStats();
  const twin = getActiveFepTwin();
  const gate = getActiveFepGate();
  const caseItem = getActiveFepCase();
  const answer = state.fepBigBangCaseAnswers?.[caseItem.id];
  const filteredGas = activeFepGasGroup === "all"
    ? fepGasHazardMatrix
    : fepGasHazardMatrix.filter(item => item.group === activeFepGasGroup);
  const gasGroups = ["all", ...new Set(fepGasHazardMatrix.map(item => item.group))];
  const topWeak = stats.weak[0]?.subsystem || progress.weak[0]?.title || "첫 case를 풀어 약점을 만들기";

  return `
    <section class="fep-bigbang-console no-term" aria-label="FEP/EPI Big Bang Lab">
      <div class="fep-bigbang-head">
        <div>
          <p class="eyebrow">FEP/EPI Big Bang Lab</p>
          <h2>장비 구조, 공정 변화, 설치 gate, 고장 판단을 한 번에 훈련</h2>
          <p>이 화면은 FEP/EPI 책의 전술실입니다. 공개자료로 설명 가능한 원리와 현장 사고 프레임만 넣고, recipe, valve sequence, detector setpoint, interlock bypass, site-specific acceptance limit은 의도적으로 제외합니다.</p>
        </div>
        <div class="fep-bigbang-score">
          <span>CE readiness</span>
          <strong>${stats.readiness}</strong>
          <small>case ${stats.correct}/${stats.answered || 0} · weakest ${topWeak}</small>
        </div>
      </div>

      <div class="fep-pillar-grid">
        ${fepBigBangPillars.map(item => `
          <button class="fep-pillar-card" type="button" data-fep-view="${item.view}">
            <span>${item.label}</span>
            <strong>${item.title}</strong>
            <p>${item.text}</p>
            <small>${item.evidence}</small>
            <b>${item.action}</b>
          </button>
        `).join("")}
      </div>

      <div class="fep-bigbang-layout">
        <section class="fep-process-twin">
          <div class="fep-panel-head">
            <div>
              <p class="eyebrow">Process Twin</p>
              <h3>wafer 위에서 실제로 무슨 일이 일어나는지</h3>
            </div>
            <button class="secondary" type="button" data-fep-view="process-visual">전체 공정 극장</button>
          </div>
          <div class="fep-twin-tabs">
            ${fepProcessTwinSteps.map(item => `
              <button class="${item.id === twin.id ? "active" : ""}" type="button" data-fep-twin="${item.id}">
                <span>${item.mode}</span>${item.title}
              </button>
            `).join("")}
          </div>
          <div class="fep-twin-stage">
            <div class="fep-wafer-stack" aria-label="${twin.title}">
              ${twin.layers.map((layer, index) => `
                <span style="--layer-color:${layer[2]}; --layer:${index};">
                  <b>${layer[0]}</b><em>${layer[1]}</em>
                </span>
              `).join("")}
            </div>
            <div class="fep-twin-detail">
              <span class="fep-source-tag">${twin.publicTag}</span>
              <h4>${twin.title}</h4>
              <dl>
                <dt>장비 위치</dt><dd>${twin.area}</dd>
                <dt>wafer 변화</dt><dd>${twin.wafer}</dd>
                <dt>gas / pump / purge / exhaust</dt><dd>${twin.gasState}</dd>
                <dt>CE evidence</dt><dd>${twin.ceEvidence.join(" · ")}</dd>
                <dt>멈출 조건</dt><dd>${twin.stop}</dd>
              </dl>
              <p>${twin.source}</p>
              <button class="secondary" type="button" data-fep-copy="${twin.report}">보고 문장 복사</button>
            </div>
          </div>
        </section>

        <section class="fep-install-gates">
          <div class="fep-panel-head">
            <div>
              <p class="eyebrow">Install Gate</p>
              <h3>move-in부터 handover까지 evidence로 통과</h3>
            </div>
            <button class="secondary" type="button" data-fep-view="runbook">런북 열기</button>
          </div>
          <div class="fep-gate-rail">
            ${fepInstallGates.map((item, index) => `
              <button class="${item.id === gate.id ? "active" : ""}" type="button" data-fep-gate="${item.id}">
                <span>${String(index + 1).padStart(2, "0")}</span>${item.title}
              </button>
            `).join("")}
          </div>
          <article class="fep-gate-detail">
            <span class="fep-source-tag">공식 교육/현장 승인 문서 우선</span>
            <h4>${gate.title}</h4>
            <p><strong>Owner:</strong> ${gate.owner}</p>
            <ul>${gate.evidence.map(item => `<li>${item}</li>`).join("")}</ul>
            <p class="fep-stop"><strong>Stop:</strong> ${gate.stop}</p>
            <button class="secondary" type="button" data-fep-copy="${gate.report}">handover 문장 복사</button>
          </article>
        </section>
      </div>

      <div class="fep-bigbang-layout">
        <section class="fep-gas-console">
          <div class="fep-panel-head">
            <div>
              <p class="eyebrow">Gas / Vacuum / Exhaust</p>
              <h3>위험군을 먼저 보고, 실제 사용 여부는 문서로 확인</h3>
            </div>
            <button class="secondary" type="button" data-fep-view="gases">가스안전 전체</button>
          </div>
          <div class="fep-filter-row">
            ${gasGroups.map(group => `<button class="${group === activeFepGasGroup ? "active" : ""}" type="button" data-fep-gas="${group}">${group}</button>`).join("")}
          </div>
          <div class="fep-gas-grid">
            ${filteredGas.map(item => `
              <article>
                <span>${item.role}</span>
                <strong>${item.name}</strong>
                <div>${item.hazards.map(hazard => `<b>${hazard}</b>`).join("")}</div>
                <p>${item.evidence}</p>
                <small>${item.boundary}</small>
              </article>
            `).join("")}
          </div>
        </section>

        <section class="fep-case-lab">
          <div class="fep-panel-head">
            <div>
              <p class="eyebrow">Failure Case Lab</p>
              <h3>증상 -> 위험 -> evidence -> stop -> report</h3>
            </div>
            <button class="secondary" type="button" data-fep-view="diagnostics">진단 훈련 전체</button>
          </div>
          <div class="fep-case-picker">
            ${fepFailureCases.map(item => {
              const saved = state.fepBigBangCaseAnswers?.[item.id];
              return `
                <button class="${item.id === caseItem.id ? "active" : ""} ${saved?.correct ? "solved" : saved ? "review" : ""}" type="button" data-fep-case="${item.id}">
                  <span>${item.subsystem}</span>${item.title}
                </button>
              `;
            }).join("")}
          </div>
          <article class="fep-case-board">
            <span class="fep-source-tag">${caseItem.subsystem}</span>
            <h4>${caseItem.title}</h4>
            <div class="fep-case-flow">
              <span><b>증상</b>${caseItem.symptom}</span>
              <span><b>위험</b>${caseItem.risk}</span>
              <span><b>Evidence</b>${caseItem.evidence.join(" · ")}</span>
              <span><b>피할 행동</b>${caseItem.wrongAction}</span>
              <span><b>Stop</b>${caseItem.stop}</span>
              <span><b>Prevention</b>${caseItem.prevention}</span>
            </div>
            <div class="decision-grid fep-case-choices">
              ${caseItem.choices.map((choice, index) => `
                <button class="decision ${answer && index === answer.selected ? "picked" : ""} ${answer && choice.correct ? "good" : ""} ${answer && index === answer.selected && !choice.correct ? "bad" : ""}" type="button" data-fep-case-choice="${index}">
                  ${choice.label}
                </button>
              `).join("")}
            </div>
            <p class="explain">${answer ? caseItem.choices[answer.selected].why : "하나를 고르면 즉시 채점되고 약점 dashboard에 쌓입니다."}</p>
            <textarea class="fep-report-template" readonly>${caseItem.report}</textarea>
            <div class="fep-case-actions">
              <button class="primary" type="button" data-fep-copy="${caseItem.report}">보고 문장 복사</button>
              <button class="secondary" type="button" data-fep-view="thinktank">이 케이스를 Think Tank에 기록</button>
            </div>
          </article>
        </section>
      </div>
    </section>
  `;
}

function renderCurriculum() {
  const dashboard = document.querySelector("#curriculum-dashboard");
  const rail = document.querySelector("#curriculum-rail");
  const detail = document.querySelector("#curriculum-detail");
  const audit = document.querySelector("#curriculum-audit");
  if (!dashboard || !rail || !detail || !audit) return;

  const progress = getCurriculumProgress();
  const active = curriculumChapters.find(chapter => chapter.id === activeCurriculumChapter) || curriculumChapters[0];
  const activeIndex = curriculumChapters.findIndex(chapter => chapter.id === active.id);
  const today = progress.weak[0] || curriculumChapters.find(chapter => !state.curriculumDone?.[chapter.id]) || active;
  const weakList = progress.weak.slice(0, 4);
  const selectedAnswer = state.curriculumQuizAnswer?.[active.id];
  const answerState = state.curriculumQuiz?.[active.id];

  dashboard.innerHTML = `
    ${renderFepBigBangLab(progress)}
    <div class="curriculum-score-card">
      <span>전체 진행률</span>
      <strong>${progress.percent}%</strong>
      <i><em style="width:${progress.percent}%"></em></i>
      <small>${progress.completed}/${progress.total} chapters complete</small>
    </div>
    <div class="curriculum-score-card">
      <span>퀴즈 정답률</span>
      <strong>${progress.quizPercent}%</strong>
      <i><em style="width:${progress.quizPercent}%"></em></i>
      <small>${progress.correct}/${progress.answered || 0} answered</small>
    </div>
    <div class="curriculum-score-card">
      <span>현장 투입 readiness</span>
      <strong>${progress.readinessScore}</strong>
      <i><em style="width:${progress.readinessScore}%"></em></i>
      <small>체크 + 즉시 퀴즈 기반</small>
    </div>
    <div class="curriculum-score-card">
      <span>Senior CE 사고력</span>
      <strong>${progress.seniorScore}</strong>
      <i><em style="width:${progress.seniorScore}%"></em></i>
      <small>PM, failure, handover, Think Tank 축</small>
    </div>
    <article class="curriculum-today">
      <span>오늘 해야 할 학습</span>
      <strong>${today.title}</strong>
      <small>${today.subtitle}</small>
      <button class="secondary" type="button" data-curriculum-open="${today.id}">오늘 챕터 열기</button>
    </article>
    <article class="curriculum-weak">
      <span>약한 챕터</span>
      ${weakList.length ? weakList.map(chapter => `<button type="button" data-curriculum-open="${chapter.id}">${chapter.title}</button>`).join("") : "<strong>현재 약점 없음</strong>"}
    </article>
  `;

  rail.innerHTML = curriculumChapters.map((chapter, index) => {
    const done = state.curriculumDone?.[chapter.id];
    const quizState = state.curriculumQuiz?.[chapter.id];
    return `
      <button class="curriculum-chapter-tab ${chapter.id === active.id ? "active" : ""}" type="button" data-curriculum-open="${chapter.id}">
        <span>${String(index + 1).padStart(2, "0")} · ${chapter.level}</span>
        <strong>${chapter.title}</strong>
        <small>${done ? "완료" : "진행 전"}${quizState ? ` · ${quizState === "correct" ? "퀴즈 정답" : "퀴즈 재학습"}` : ""}</small>
      </button>
    `;
  }).join("");

  detail.innerHTML = `
    <header class="curriculum-detail-head">
      <div>
        <span class="scenario-status">${active.level} · Chapter ${activeIndex + 1}</span>
        <h2>${active.title}</h2>
        <p>${active.subtitle}</p>
      </div>
      <label class="curriculum-done-toggle">
        <input type="checkbox" data-curriculum-done="${active.id}" ${state.curriculumDone?.[active.id] ? "checked" : ""} />
        <span>이 챕터 완료</span>
      </label>
    </header>
    <div class="curriculum-path-strip">
      <span>개념</span>
      <span>장비 위치</span>
      <span>wafer 변화</span>
      <span>evidence</span>
      <span>stop</span>
      <span>report</span>
    </div>
    <div class="curriculum-card-grid">
      <section class="curriculum-card wide">
        <h3>1분 요약</h3>
        <p>${active.minute}</p>
      </section>
      <section class="curriculum-card">
        <h3>초보자용 쉬운 설명</h3>
        <p>${active.beginner}</p>
      </section>
      <section class="curriculum-card">
        <h3>실제 장비에서 어디인가</h3>
        <p>${active.location}</p>
      </section>
      <section class="curriculum-card wide">
        <h3>wafer에 실제로 일어나는 일</h3>
        <p>${active.wafer}</p>
      </section>
      <section class="curriculum-card">
        <h3>CE가 확인할 evidence</h3>
        <ul>${active.evidence.map(item => `<li>${item}</li>`).join("")}</ul>
      </section>
      <section class="curriculum-card stop-card">
        <h3>여기서 멈춰야 하는 조건</h3>
        <p>${active.stop}</p>
      </section>
    </div>
    <section class="case-report curriculum-report">
      <div>
        <h3>고객 보고 문장</h3>
        <p>${active.report}</p>
      </div>
      <button class="copy-report" type="button" data-curriculum-copy-report>문장 복사</button>
    </section>
    <section class="case-boundary">
      <strong>공개자료 기반 / 안전 경계</strong>
      <span>${active.source}. 공개자료는 원리와 사고 프레임 학습용입니다. recipe, valve sequence, detector setpoint, interlock bypass, 고객 site-specific 절차는 넣지 않고 현장 승인 문서를 우선합니다.</span>
      <div class="curriculum-source-links">
        ${curriculumPublicSourceLinks.map(source => `<a href="${source.url}" target="_blank" rel="noreferrer">${source.label}</a>`).join("")}
      </div>
    </section>
    <div class="curriculum-term-row">
      ${active.terms.map(term => `<span>${term}</span>`).join("")}
    </div>
    <section class="curriculum-practice">
      <button class="primary" type="button" data-curriculum-practice="${active.practiceView}">${active.practice}</button>
      <button class="secondary" type="button" data-curriculum-practice="thinktank">이 챕터 경험 기록하기</button>
    </section>
    <section class="curriculum-quiz-card">
      <p class="eyebrow">Judgement Drill</p>
      <h3>${active.quiz.q}</h3>
      <div class="decision-grid">
        ${active.quiz.options.map((option, index) => `
          <button class="decision ${answerState && index === active.quiz.correct ? "good" : ""} ${answerState === "wrong" && index === selectedAnswer ? "bad" : ""} ${selectedAnswer === index ? "picked" : ""}" type="button" data-curriculum-answer="${index}">${option}</button>
        `).join("")}
      </div>
      <p class="explain" id="curriculum-quiz-feedback">${answerState ? active.quiz.explain : "답을 하나 고르면 바로 해설이 뜹니다."}</p>
    </section>
  `;

  audit.innerHTML = `
    <div class="section-heading">
      <p>Audit Result</p>
      <h2>이번 재구성에서 발견한 병목과 해결</h2>
    </div>
    <div class="curriculum-audit-grid">
      ${curriculumAuditFindings.map(([title, gap, fix]) => `
        <article>
          <strong>${title}</strong>
          <span>${gap}</span>
          <small>${fix}</small>
        </article>
      `).join("")}
    </div>
  `;

  dashboard.querySelectorAll("[data-fep-view]").forEach(button => {
    button.addEventListener("click", () => showView(button.dataset.fepView));
  });

  dashboard.querySelectorAll("[data-fep-twin]").forEach(button => {
    button.addEventListener("click", () => {
      activeFepProcessTwin = button.dataset.fepTwin;
      state.activeFepProcessTwin = activeFepProcessTwin;
      persistState();
      renderCurriculum();
    });
  });

  dashboard.querySelectorAll("[data-fep-gate]").forEach(button => {
    button.addEventListener("click", () => {
      activeFepInstallGate = button.dataset.fepGate;
      state.activeFepInstallGate = activeFepInstallGate;
      persistState();
      renderCurriculum();
    });
  });

  dashboard.querySelectorAll("[data-fep-gas]").forEach(button => {
    button.addEventListener("click", () => {
      activeFepGasGroup = button.dataset.fepGas;
      state.activeFepGasGroup = activeFepGasGroup;
      persistState();
      renderCurriculum();
    });
  });

  dashboard.querySelectorAll("[data-fep-case]").forEach(button => {
    button.addEventListener("click", () => {
      activeFepCase = button.dataset.fepCase;
      state.activeFepCase = activeFepCase;
      persistState();
      renderCurriculum();
    });
  });

  dashboard.querySelectorAll("[data-fep-case-choice]").forEach(button => {
    button.addEventListener("click", () => {
      const activeCase = getActiveFepCase();
      const selected = Number(button.dataset.fepCaseChoice);
      const choice = activeCase.choices[selected];
      state.fepBigBangCaseAnswers = state.fepBigBangCaseAnswers || {};
      state.fepBigBangCaseAnswers[activeCase.id] = {
        selected,
        correct: Boolean(choice?.correct),
        subsystem: activeCase.subsystem,
        answeredAt: new Date().toISOString()
      };
      if (!choice?.correct) {
        state.fepBigBangWeaknesses = state.fepBigBangWeaknesses || {};
        state.fepBigBangWeaknesses[activeCase.subsystem] = (state.fepBigBangWeaknesses[activeCase.subsystem] || 0) + 1;
      }
      save();
      renderCurriculum();
    });
  });

  dashboard.querySelectorAll("[data-fep-copy]").forEach(button => {
    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(button.dataset.fepCopy || "");
        const original = button.textContent;
        button.textContent = "복사됨";
        setTimeout(() => { button.textContent = original; }, 1200);
      } catch {
        const explain = dashboard.querySelector(".fep-case-board .explain");
        if (explain) explain.textContent = "브라우저 권한 때문에 자동 복사는 실패했습니다. 보고 문장은 화면에서 직접 선택할 수 있습니다.";
      }
    });
  });

  document.querySelectorAll("[data-curriculum-open]").forEach(button => {
    button.addEventListener("click", () => {
      activeCurriculumChapter = button.dataset.curriculumOpen;
      state.activeCurriculumChapter = activeCurriculumChapter;
      persistState();
      renderCurriculum();
    });
  });

  document.querySelector("[data-curriculum-done]")?.addEventListener("change", event => {
    state.curriculumDone = state.curriculumDone || {};
    state.curriculumDone[event.currentTarget.dataset.curriculumDone] = event.currentTarget.checked;
    save();
    renderCurriculum();
  });

  document.querySelectorAll("[data-curriculum-answer]").forEach(button => {
    button.addEventListener("click", () => {
      const selected = Number(button.dataset.curriculumAnswer);
      const correct = selected === active.quiz.correct;
      state.curriculumQuiz = state.curriculumQuiz || {};
      state.curriculumQuizAnswer = state.curriculumQuizAnswer || {};
      state.curriculumQuiz[active.id] = correct ? "correct" : "wrong";
      state.curriculumQuizAnswer[active.id] = selected;
      document.querySelectorAll("[data-curriculum-answer]").forEach((item, index) => {
        item.classList.toggle("good", index === active.quiz.correct);
        item.classList.toggle("bad", index === selected && !correct);
      });
      document.querySelector("#curriculum-quiz-feedback").textContent = active.quiz.explain;
      save();
      renderCurriculum();
    });
  });

  document.querySelectorAll("[data-curriculum-practice]").forEach(button => {
    button.addEventListener("click", () => showView(button.dataset.curriculumPractice));
  });

  document.querySelector("[data-curriculum-copy-report]")?.addEventListener("click", async event => {
    try {
      await navigator.clipboard.writeText(active.report);
      event.currentTarget.textContent = "복사됨";
      setTimeout(() => { event.currentTarget.textContent = "문장 복사"; }, 1200);
    } catch {
      document.querySelector("#curriculum-quiz-feedback").textContent = "브라우저 권한 때문에 자동 복사는 실패했지만 보고 문장을 직접 선택할 수 있습니다.";
    }
  });
}

function renderMetrics() {
  const done = Object.values(state.missions || {}).filter(Boolean).length;
  document.querySelector("#done-count").textContent = done;
  const attempts = state.quizAttempts || [];
  const score = attempts.length ? Math.round(attempts.filter(Boolean).length / attempts.length * 100) : 0;
  document.querySelector("#quiz-score").textContent = `${score}%`;
}

function renderRoleFit() {
  document.querySelector("#role-fit").innerHTML = roleFit.map(item => `<span class="pill">${item}</span>`).join("");
}

function renderRoadmap() {
  document.querySelector("#roadmap-list").innerHTML = roadmap.map(week => `
    <article class="week">
      <p class="eyebrow">${week.week}</p>
      <h2>${week.title}</h2>
      <p>${week.why}</p>
      ${week.missions.map(([id, label, hint]) => `
        <div class="mission">
          <input type="checkbox" id="${id}" ${state.missions?.[id] ? "checked" : ""} />
          <label for="${id}">${label}<small>${hint}</small></label>
        </div>
      `).join("")}
    </article>
  `).join("");

  document.querySelectorAll(".mission input").forEach(input => {
    input.addEventListener("change", () => {
      state.missions = state.missions || {};
      state.missions[input.id] = input.checked;
      save();
    });
  });
}

function renderSystems() {
  document.querySelector("#system-tabs").innerHTML = systems.map(system => `
    <button class="system-tab ${system.id === activeSystem ? "active" : ""}" data-system="${system.id}">
      <strong>${system.name}</strong>
    </button>
  `).join("");

  const current = systems.find(system => system.id === activeSystem);
  document.querySelector("#system-detail").innerHTML = `
    <p class="eyebrow">CE View</p>
    <h2>${current.name}</h2>
    <p>${current.one}</p>
    <div class="detail-grid">
      ${current.blocks.map(([title, items]) => `
        <section class="info-block">
          <h3>${title}</h3>
          <ul>${items.map(item => `<li>${item}</li>`).join("")}</ul>
        </section>
      `).join("")}
    </div>
  `;

  document.querySelectorAll(".system-tab").forEach(btn => {
    btn.addEventListener("click", () => {
      activeSystem = btn.dataset.system;
      renderSystems();
    });
  });
}

const lifeOsSystematicFailureCases = [
  ["Gas cabinet ready는 ON인데 tool first-gas gate가 열리지 않는다", "Gas delivery / EHS", "First gas readiness", ["gas cabinet ready가 들어오지만 tool 쪽 ready chain은 불안정하다.", "abatement ready와 exhaust status 확인이 아직 owner witness로 닫히지 않았다.", "최근 gas line connection 또는 purge 관련 punch item이 있었다."], ["gas cabinet permissive, VMB/VMP status, tool gas box signal mismatch", "abatement/exhaust ready signal actual state 불일치", "POC wiring label 또는 dry contact polarity 이슈", "EHS hold item 미해소"], ["gas cabinet local status, tool I/O, abatement local panel, exhaust owner sign-off를 같은 시간축으로 묶는다.", "first gas 전에는 detector setting이나 interlock을 우회하지 않는다.", "as-built drawing revision과 실제 label을 고객 owner와 대조한다."], "gas/exhaust/abatement ready가 owner witness로 닫히지 않으면 first gas는 hold한다.", "Gas ready 신호는 cabinet 단독이 아니라 gas box, exhaust, abatement, tool permissive가 같은 상태인지 owner witness로 확인한 뒤 진행하겠습니다."],
  ["PCW 온도는 정상인데 RTP zone trace가 특정 구간에서 흔들린다", "RTP thermal / facility", "Qualification thermal trace", ["facility PCW supply 온도는 정상 범위처럼 보인다.", "특정 zone의 measured temperature가 command를 늦게 따라간다.", "wafer type을 바꾸면 현상이 약해진다."], ["lamp/zone health", "pyrometry or optical path contamination", "PCW flow margin or cooling channel restriction", "wafer emissivity and centering effect"], ["golden trace와 current trace overlay", "same wafer type repeat / different wafer type split", "PCW flow/pressure trend와 chamber trace 동시 비교", "window/chamber history와 PM 변경점 확인"], "thermal runaway, cooling alarm, wafer damage risk가 보이면 qualification wafer 반복보다 hold와 escalation이 우선이다.", "RTP trace 흔들림은 평균 온도만 보지 않고 zone별 command/measured trace, PCW flow, wafer type, optical path를 분리해 확인하겠습니다."],
  ["EFEM door는 열렸지만 FOUP unclamp 이후 wafer map이 흔들린다", "EFEM / Load port", "Factory interface", ["load port clamp/unclamp은 완료로 표시된다.", "slot map이 반복할 때마다 다른 slot에서 흔들린다.", "FOUP seating mark가 일정하지 않다."], ["FOUP seating repeatability", "load port kinematic pin/contact", "mapper sensor contamination or teach drift", "carrier condition"], ["same FOUP/same port 반복", "different FOUP/same port split", "mapper sensor state와 physical seating photo", "recent load port PM history"], "wafer skew, double wafer 의심, carrier damage가 보이면 반복 mapping으로 밀어붙이지 않는다.", "wafer map 불안정은 FOUP, load port seating, mapper sensor를 split해서 확인하고 wafer handling risk가 있으면 hold하겠습니다."],
  ["Transfer robot home은 정상인데 PM handoff 직전에 alignment error가 난다", "Transfer module / robot", "Vacuum handoff", ["robot home과 vacuum 상태는 정상이다.", "특정 PM handoff 직전에서만 alignment error가 난다.", "최근 PM docking 또는 slit valve 작업이 있었다."], ["PM docking alignment", "slit valve opening clearance", "robot blade/end-effector teach drift", "wafer support/lift pin position"], ["same PM/different wafer path split", "dry run with dummy wafer under approved condition", "slit valve state, robot position log, PM docking witness mark", "contact/scrape inspection"], "wafer contact, scrape mark, slit valve mismatch가 보이면 robot speed 조정보다 hold한다.", "PM handoff error는 robot 단독이 아니라 docking, slit valve clearance, lift/support 상태를 같은 wafer path로 묶어 확인하겠습니다."],
  ["EPI thickness는 맞는데 dopant 관련 metrology가 chamber별로 벌어진다", "EPI process / metrology", "Baseline matching", ["thickness 평균은 spec 근처지만 electrical metrology가 chamber별로 다르다.", "gas delivery alarm은 없었다.", "recent seasoning wafer count가 chamber별로 다르다."], ["dopant delivery response", "temperature calibration/matching", "seasoning history difference", "metrology tool or wafer lot split"], ["same incoming wafer lot chamber split", "tool trace and metrology same wafer ID correlation", "seasoning/baseline history", "metrology repeatability check"], "고객 acceptance limit이나 recipe 조건은 임의 판단하지 않고 process owner 승인 없이 변경하지 않는다.", "두께만 pass로 보지 않고 dopant 관련 metrology와 chamber history를 연결해 chamber matching 관점으로 확인하겠습니다."],
  ["Exhaust flow alarm이 짧게 지나갔지만 tool alarm은 clear다", "Exhaust / abatement", "Safety and facility", ["tool main alarm은 clear로 보인다.", "local exhaust monitor에는 짧은 event가 남아 있다.", "first gas 또는 purge 단계 전후 시간대와 겹친다."], ["exhaust flow margin", "abatement transient", "facility sensor/event logging", "tool permissive masking or timing gap"], ["tool event log와 facility local log time sync", "abatement owner witness", "exhaust actual flow status", "gas phase and wafer state impact review"], "toxic/corrosive/flammable gas 관련 exhaust event는 tool clear만으로 계속 진행하지 않는다.", "Tool alarm이 clear여도 local exhaust event가 있어 facility/EHS owner와 event history를 확인한 뒤 wafer 영향과 진행 가능성을 판단하겠습니다."],
  ["24V interlock rail이 무부하 정상인데 load on 때 sag가 난다", "Electrical / DVM", "Power-on diagnostic", ["DVM으로 무부하 측정하면 24V가 나온다.", "밸브나 relay coil이 붙는 순간 전압이 크게 떨어진다.", "최근 terminal 재체결 또는 케이블 routing 변경이 있었다."], ["high resistance terminal", "overload/shorted coil", "weak power supply", "fuse holder/contact issue"], ["expected value를 먼저 세우고 load-on voltage drop을 구간별 기록", "supply, fuse, terminal, load coil segment split", "LOTO/energized work approval boundary 확인", "heat/discoloration/loose terminal visual"], "승인 없는 energized work, 임의 jumper, interlock bypass는 금지한다.", "24V는 무부하 정상값보다 load-on voltage drop이 핵심이므로 supply부터 load까지 구간별 expected/actual로 분리하겠습니다."],
  ["Pumpdown curve가 느려졌지만 base pressure는 결국 도달한다", "Vacuum / pump", "Pumpdown qualification", ["base pressure 도달은 되지만 시간이 길어졌다.", "특정 chamber 또는 load lock에서만 반복된다.", "최근 seal, foreline, pump PM 이력이 있다."], ["small leak or seal seating", "roughing path restriction", "pump performance degradation", "gauge response lag"], ["golden pumpdown curve overlay", "rate of rise or approved leak check evidence", "recent PM parts and witness marks", "gauge cross-check if approved"], "vacuum integrity가 불명확하면 process gas introduction이나 customer wafer 진행을 hold한다.", "최종 base pressure만 보지 않고 pumpdown curve shape, recent PM, seal/pump path를 비교해 vacuum margin을 확인하겠습니다."],
  ["Seasoning 후 particle trend가 내려가지만 첫 wafer가 높다", "Maintenance / recovery", "PM recovery", ["PM 직후 첫 wafer particle이 높다.", "후속 wafer에서 감소 추세가 보인다.", "release 압박이 있으나 baseline count가 충분하지 않다."], ["post-PM residue", "chamber wall/source stabilization", "handling contact after PM", "metrology sampling variation"], ["wafer count vs particle trend", "wafer map location and PM work area", "seasoning history and baseline criteria", "customer/process owner release rule"], "release criteria가 닫히지 않았거나 toxic/exhaust/vacuum risk가 남으면 생산 wafer로 넘어가지 않는다.", "감소 추세는 보이지만 release 기준과 owner sign-off가 필요하므로 PM work area, wafer map, trend를 evidence packet으로 정리하겠습니다."],
  ["Host가 recipe 다운로드 완료를 보냈지만 tool recipe revision이 다르다", "Automation / host", "Qualification handoff", ["host message에는 recipe download complete가 남아 있다.", "tool 화면의 revision 또는 parameter group 이름이 expected와 다르다.", "route 변경 직후 발생했다."], ["host route/revision mismatch", "local cached recipe", "operator selection error", "MES message timing issue"], ["wafer ID, route, host message, tool recipe name/revision capture", "automation owner witness", "local manual override 여부 확인", "previous lot/known-good route comparison"], "recipe mismatch는 process owner 승인 없이 진행하지 않는다.", "Host와 tool의 recipe revision이 다르므로 wafer ID, route, host message, tool screen evidence를 묶어 automation/process owner와 확인하겠습니다."],
  ["Gas purge 완료 후 residual odor/report가 나온다", "Gas safety / purge", "Safety response", ["tool에서는 purge 완료로 보인다.", "현장 주변에서 odor 또는 detector 관련 report가 있었다.", "gas line 또는 chamber open 준비 단계와 시간대가 겹친다."], ["purge effectiveness concern", "exhaust/abatement capture issue", "gas cabinet or line residual", "non-tool source near area"], ["EHS response procedure and area status", "detector/alarm history", "gas cabinet and exhaust owner status", "tool log only as one evidence source"], "odor/detector report는 즉시 안전 owner 호출 전에는 작업 재개 판단을 하지 않는다.", "Tool purge complete만으로 결론내리지 않고 EHS/facility owner와 detector, exhaust, gas cabinet 상태를 확인한 뒤 재개 조건을 판단하겠습니다."],
  ["Baseline wafer metrology가 pass지만 trend가 이전 install보다 불안정하다", "Qualification / metrology", "Handover readiness", ["single wafer pass 결과는 있다.", "run-to-run variation이 이전 baseline보다 커 보인다.", "customer는 release 여부를 묻고 있다."], ["insufficient sample size", "tool stabilization", "metrology repeatability", "facility drift"], ["same wafer type repeat count", "metrology repeat/correlation", "tool trace stability", "facility trend overlay"], "공식 acceptance sample과 owner sign-off 없이 single pass만으로 handover를 닫지 않는다.", "단일 pass는 확인했지만 trend 안정성과 sample count를 함께 보고 release 판단은 customer/process owner 기준으로 닫겠습니다."],
  ["Chamber clean 후 byproduct residue가 view port 주변에 반복된다", "Process chamber / exhaust", "Maintenance observation", ["clean 후에도 특정 부위 residue가 반복 관찰된다.", "pressure trace는 큰 alarm이 없다.", "exhaust/temperature 조건의 변경 이력이 있다."], ["local cold spot", "exhaust conductance issue", "chemistry byproduct condensation", "clean endpoint or seasoning mismatch"], ["before/after photo with location", "temperature/exhaust trend", "PM parts and cleaning record", "metrology or particle correlation"], "chemical exposure 가능성, exhaust issue, unknown residue는 EHS/owner 승인 없이 접촉/청소하지 않는다.", "Residue는 단순 오염으로 단정하지 않고 위치, exhaust/temperature trend, PM 이력, wafer 영향 증거를 묶어 확인하겠습니다."],
  ["Customer asks to continue despite unresolved alarm history", "Customer communication", "Escalation and report", ["현재 alarm은 clear 상태다.", "하지만 동일 alarm history가 반복적으로 남았다.", "고객은 일정 때문에 진행 가능 여부를 묻는다."], ["schedule pressure overriding risk", "unresolved intermittent fault", "missing owner sign-off", "insufficient evidence packet"], ["alarm history frequency", "impact assessment", "stop condition agreement", "owner/ETA for next check"], "safety, wafer damage, gas/vacuum/electrical risk가 닫히지 않으면 일정 이유로 진행하지 않는다.", "현재 화면은 clear지만 반복 history가 있어 위험도와 영향 범위를 분리해 보고드리고, owner sign-off 전에는 stop condition을 유지하겠습니다."]
];

lifeOsSystematicFailureCases.forEach(([title, status, phase, facts, suspects, evidence, stop, report]) => {
  if (scenarios.some(item => item.title === title)) return;
  scenarios.push({
    title,
    status,
    phase,
    facts,
    suspects,
    evidence,
    stop,
    report,
    next: [
      "scope를 chamber, wafer ID, time window, recent change로 좁힌다.",
      "confirmed fact와 assumption을 분리한다.",
      "owner witness가 필요한 evidence를 지정한다.",
      "customer report는 status, risk, next action, ETA 순서로 짧게 말한다."
    ],
    publicBasis: "공개자료 기반의 일반 CE 사고 프레임입니다. recipe, valve sequence, detector setpoint, interlock bypass, site-specific acceptance limit은 공식 교육/현장 승인 문서 범위입니다.",
    good: "맞습니다. 빠른 결론보다 safety boundary, evidence ladder, owner sign-off를 먼저 닫는 판단이 senior CE 사고입니다.",
    choices: [
      ["tool 화면이 clear이면 일정 우선으로 바로 진행한다.", false],
      ["위험도와 evidence를 분리하고 owner witness가 필요한 항목을 닫은 뒤 진행 판단한다.", true],
      ["alarm을 줄이기 위해 임의로 threshold나 sequence를 조정한다.", false]
    ]
  });
});

const lifeOsAdvancedFailureCases = [
  {
    title: "MFC response looks slow after gas line work",
    status: "Gas delivery / MFC",
    phase: "First gas readiness and baseline check",
    facts: ["최근 gas line 작업 이후 특정 gas channel response가 이전 trend보다 늦다.", "tool alarm은 clear지만 baseline trace가 golden trace와 다르다.", "customer는 first wafer 진행 가능 여부를 묻고 있다."],
    suspects: ["MFC response drift", "gas line purge/readiness concern", "pressure regulator or supply stability", "signal scaling or configuration mismatch"],
    evidence: ["approved dry-run trace vs golden trace", "gas cabinet/VMB status and owner witness", "tool I/O trend, not recipe setpoint", "recent line work and leak/purge sign-off"],
    stop: "gas readiness, purge completion, exhaust/abatement owner sign-off가 닫히지 않으면 wafer 진행을 hold한다.",
    report: "Gas channel response가 golden trace와 달라 first wafer 전 gas owner sign-off, line readiness, tool trace를 함께 확인하겠습니다. recipe나 setpoint 변경은 공식 승인 없이 진행하지 않겠습니다."
  },
  {
    title: "Abatement ready signal flickers during purge preparation",
    status: "Exhaust / abatement",
    phase: "Purge and safety permissive",
    facts: ["tool에서는 ready가 순간적으로 들어오지만 abatement local log에는 transient가 남는다.", "purge 준비 단계에서만 반복된다.", "일정 압박 때문에 tool 화면 기준으로 진행하자는 의견이 있다."],
    suspects: ["abatement transient", "exhaust flow margin", "dry contact timing mismatch", "facility event logging mismatch"],
    evidence: ["tool event log and abatement local log time sync", "facility owner witness", "actual exhaust/abatement ready status", "gas phase impact review"],
    stop: "toxic/corrosive/flammable gas와 연결된 ready 신호가 안정적으로 확인되지 않으면 purge/first gas는 hold한다.",
    report: "Tool ready 화면만으로 판단하지 않고 abatement local event와 facility owner 확인을 묶어 safety permissive를 닫은 뒤 다음 단계로 가겠습니다."
  },
  {
    title: "Load lock particle spike appears after vent",
    status: "Load lock / vacuum / particles",
    phase: "Vent, pumpdown, wafer transfer readiness",
    facts: ["load lock vent 이후 첫 dummy wafer particle이 높다.", "pumpdown은 목표에 도달하지만 curve shape가 이전보다 느리다.", "최근 door seal 또는 vent path PM 이력이 있다."],
    suspects: ["vent path contamination", "door seal seating", "pumpdown path restriction", "handling contact after maintenance"],
    evidence: ["particle map location", "golden pumpdown curve overlay", "recent PM witness mark/photo", "repeat dummy wafer trend"],
    stop: "particle source가 불명확하거나 vacuum integrity가 불확실하면 customer wafer로 넘어가지 않는다.",
    report: "Load lock particle은 단일 숫자보다 vent/pumpdown curve, wafer map, PM work area를 묶어 확인하고 release 기준은 process owner sign-off로 닫겠습니다."
  },
  {
    title: "RTP temperature trace drifts only on high-emissivity wafer",
    status: "RTP thermal / pyrometry",
    phase: "Thermal qualification",
    facts: ["standard wafer에서는 trace가 안정적이다.", "특정 wafer type에서 measured temperature가 command와 벌어진다.", "pyrometry window cleaning history가 오래됐다."],
    suspects: ["wafer emissivity effect", "pyrometry optical path contamination", "lamp/zone matching", "centering or backside condition"],
    evidence: ["same recipe family trace by wafer type without exposing recipe details", "window/chamber history", "centering evidence", "metrology correlation"],
    stop: "thermal runaway, wafer damage risk, owner-approved comparison 부재 시 qualification 반복보다 hold/escalation을 우선한다.",
    report: "RTP trace drift는 wafer type과 optical path 변수를 분리해 확인하겠습니다. 공식 승인 없는 temperature limit이나 recipe 변경은 진행하지 않겠습니다."
  },
  {
    title: "EFEM aligner repeatability changes after move-in",
    status: "EFEM / aligner / handling",
    phase: "Move-in recovery and factory interface check",
    facts: ["move-in 이후 aligner repeatability가 흔들린다.", "FOUP mapping은 정상처럼 보인다.", "특정 load port와 특정 carrier 조합에서 더 많이 보인다."],
    suspects: ["tool leveling or vibration", "aligner teach drift", "FOUP seating repeatability", "carrier condition"],
    evidence: ["same carrier/different port split", "different carrier/same port split", "leveling/vibration check record", "aligner repeatability log"],
    stop: "wafer edge contact, slip, scrape 가능성이 보이면 반복 transfer보다 hold 후 owner review가 우선이다.",
    report: "EFEM repeatability는 carrier, load port, aligner, leveling 변수를 split해 좁히고 wafer handling risk가 있으면 customer wafer 진행을 멈추겠습니다."
  },
  {
    title: "Slit valve open feedback is late before PM handoff",
    status: "Transfer module / slit valve",
    phase: "Vacuum handoff and robot path",
    facts: ["robot home은 정상이다.", "특정 PM 앞에서 slit valve open feedback이 늦게 들어온다.", "최근 PM docking 또는 valve service가 있었다."],
    suspects: ["slit valve actuator response", "PM docking alignment", "sensor/feedback timing", "vacuum differential or mechanical drag"],
    evidence: ["same PM repeatability", "valve actuation log", "PM docking witness mark", "approved dry cycle under safe condition"],
    stop: "wafer contact, valve mismatch, vacuum risk가 있으면 speed change나 bypass 대신 hold한다.",
    report: "Slit valve feedback 지연은 robot 문제가 아니라 PM interface, valve actuation, sensor timing까지 같은 path로 확인하겠습니다."
  },
  {
    title: "Two vacuum gauges disagree during pumpdown recovery",
    status: "Vacuum / gauge / pump",
    phase: "Pumpdown qualification",
    facts: ["main screen pressure와 local gauge trend가 다르다.", "base pressure는 도달하지만 rate-of-rise 판단이 애매하다.", "최근 gauge replacement 또는 cable work가 있었다."],
    suspects: ["gauge calibration or response lag", "cable/signal scaling issue", "small leak masked by final pressure", "pump path restriction"],
    evidence: ["time-aligned gauge trends", "approved leak/rate-of-rise result", "recent gauge/cable work record", "known-good chamber comparison"],
    stop: "vacuum integrity가 불명확하면 process gas introduction과 wafer qualification을 hold한다.",
    report: "최종 pressure만 보지 않고 gauge 간 trend와 recent work를 맞춰 vacuum integrity evidence를 닫겠습니다."
  },
  {
    title: "Baseline wafer passes but sample size is too thin",
    status: "Qualification / metrology",
    phase: "Baseline wafer and handover decision",
    facts: ["첫 wafer 결과는 pass다.", "run-to-run variation trend가 아직 안정됐다고 말하기 어렵다.", "handover 일정을 앞당기자는 요구가 있다."],
    suspects: ["insufficient sample size", "tool stabilization", "metrology repeatability", "facility drift"],
    evidence: ["repeat wafer trend", "metrology repeat/correlation", "tool trace stability", "owner-approved acceptance plan"],
    stop: "공식 acceptance sample/owner sign-off가 없으면 single pass만으로 handover하지 않는다.",
    report: "첫 wafer pass는 긍정적이지만 release 판단은 sample count, trend stability, metrology repeatability, owner sign-off로 닫겠습니다."
  },
  {
    title: "Customer asks for a final report while open items remain",
    status: "Customer communication / handover",
    phase: "Handover and open item control",
    facts: ["tool은 production-ready처럼 보이나 open punch item이 남았다.", "고객은 summary report를 먼저 요청한다.", "일부 evidence owner가 아직 sign-off하지 않았다."],
    suspects: ["report scope ambiguity", "missing owner sign-off", "untracked residual risk", "schedule pressure"],
    evidence: ["open item list with owner/ETA", "risk classification", "completed evidence packet", "stop condition agreement"],
    stop: "안전/wafer damage/process quality 영향 open item은 final handover에서 제외하거나 conditional로 명확히 표시한다.",
    report: "완료 evidence와 open item을 분리해 보고하고, 잔여 risk, owner, ETA, stop condition을 명확히 달아 conditional handover 여부를 확인하겠습니다."
  },
  {
    title: "DVM shows normal voltage unloaded but sensor input drops under load",
    status: "Electrical / DVM / controls",
    phase: "Power-on diagnostic",
    facts: ["unloaded 측정에서는 24V가 정상이다.", "sensor 또는 relay coil이 붙는 순간 input이 떨어진다.", "최근 terminal rework가 있었다."],
    suspects: ["high resistance connection", "weak power supply", "shorted or overloaded load", "fuse holder/contact issue"],
    evidence: ["expected value before measuring", "loaded voltage drop by segment", "visual heat/discoloration/loose terminal check", "LOTO/energized work approval boundary"],
    stop: "승인 없는 energized work, jumper, interlock bypass는 금지한다.",
    report: "무부하 전압보다 load-on voltage drop이 핵심이므로 supply, fuse, terminal, load segment를 expected/actual로 나눠 확인하겠습니다."
  }
];

lifeOsAdvancedFailureCases.forEach(item => {
  if (scenarios.some(scenario => scenario.title === item.title)) return;
  scenarios.push({
    ...item,
    next: [
      "증상 scope와 시간대를 먼저 고정한다.",
      "안전 위험과 wafer/process 영향도를 분리한다.",
      "owner witness가 필요한 evidence를 지정한다.",
      "고객 보고는 fact, risk, next action, ETA 순서로 말한다."
    ],
    publicBasis: "공개 안전자료와 field-service 사고 프레임 기반의 훈련 케이스입니다. recipe, valve sequence, detector setpoint, interlock bypass, site-specific acceptance limit은 포함하지 않습니다.",
    good: "맞습니다. senior CE는 빠른 단정보다 안전 경계, evidence ladder, owner sign-off, 고객 보고의 순서를 지킵니다.",
    choices: [
      ["화면 alarm이 clear이면 wafer를 진행하고 결과로 판단한다.", false],
      ["위험도, 후보 subsystem, 필요한 evidence, stop condition을 먼저 닫고 진행 여부를 판단한다.", true],
      ["시간을 줄이기 위해 임의로 interlock이나 threshold를 우회한다.", false]
    ]
  });
});

while (scenarios.length < 60) {
  const index = scenarios.length + 1;
  scenarios.push({
    title: `Evidence ladder drill ${index}: symptom만 있고 원인 단정 압박이 있다`,
    status: "Senior CE reasoning / generic",
    phase: "Troubleshooting discipline",
    facts: ["증상은 재현되지만 아직 subsystem이 좁혀지지 않았다.", "일정 압박 때문에 원인 단정을 요구받고 있다.", "최근 변경점과 baseline 비교가 아직 정리되지 않았다."],
    suspects: ["recent PM/install change", "facility marginal condition", "sensor/log interpretation gap", "wafer path or metrology split 필요"],
    evidence: ["timeline", "known-good comparison", "recent change list", "owner-witnessed safety boundary", "wafer/metrology correlation"],
    stop: "safety, gas, vacuum, exhaust, electrical, wafer damage risk가 불명확하면 단정이나 진행보다 hold/escalation이 먼저다.",
    report: "현재는 원인 단정 전 단계입니다. 증상, 위험도, 후보 subsystem, 필요한 evidence, stop condition을 분리해 확인하고 다음 update 시간을 공유하겠습니다.",
    next: ["symptom scope 작성", "risk level 지정", "evidence owner 배정", "customer update 문장 작성"],
    publicBasis: "공개 안전자료와 field-service 일반 원칙 기반의 사고 훈련입니다. 비공개 장비 절차와 고객 site-specific limit은 포함하지 않습니다.",
    good: "정답입니다. senior CE는 모를 때도 구조적으로 모른다고 말하고, 다음 evidence를 닫습니다.",
    choices: [
      ["추정 원인을 하나 정해 바로 part 교체로 간다.", false],
      ["symptom -> risk -> subsystem -> evidence -> stop -> report 순서로 좁힌다.", true],
      ["일정 때문에 stop condition 언급을 생략한다.", false]
    ]
  });
}

function renderScenarios() {
  document.querySelector("#scenario-list").innerHTML = scenarios.map((scenario, index) => `
    <button class="scenario-tab ${index === activeScenario ? "active" : ""}" data-scenario="${index}">
      <strong>${scenario.title}</strong>
    </button>
  `).join("");

  const scenario = scenarios[activeScenario];
  document.querySelector("#scenario-panel").innerHTML = `
    <span class="scenario-status">${scenario.status}</span>
    <h2>${scenario.title}</h2>
    <h3>관찰된 사실</h3>
    <ul>${scenario.facts.map(fact => `<li>${fact}</li>`).join("")}</ul>
    <div class="decision-grid">
      ${scenario.choices.map(([text, isGood]) => `
        <button class="decision" data-good="${isGood}">${text}</button>
      `).join("")}
    </div>
    <p class="explain" id="scenario-feedback">가장 먼저 취할 행동을 선택하세요.</p>
  `;

  document.querySelectorAll(".scenario-tab").forEach(btn => {
    btn.addEventListener("click", () => {
      activeScenario = Number(btn.dataset.scenario);
      renderScenarios();
    });
  });

  document.querySelectorAll(".decision").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".decision").forEach(item => item.classList.remove("good"));
      if (btn.dataset.good === "true") {
        btn.classList.add("good");
        document.querySelector("#scenario-feedback").textContent = scenario.good;
      } else {
        document.querySelector("#scenario-feedback").textContent = "이 선택은 성급합니다. 안전, 변경점, 로그, 계측값 순서로 원인을 좁히는 편이 좋습니다.";
      }
    });
  });
}

function renderScenarios() {
  const safeList = items => (items || []).map(item => `<li>${item}</li>`).join("");
  const scenarioAnswers = state.scenarioAnswers || {};
  const scenarioWeakness = state.scenarioWeakness || {};
  const scenarioReports = state.scenarioReports || {};
  const scenarioFilter = state.scenarioFilter || "all";
  const scenarioStatuses = [...new Set(scenarios.map(item => item.status))].sort();
  const scenarioPool = scenarioFilter === "all"
    ? scenarios
    : scenarios.filter(item => item.status === scenarioFilter);
  if (!scenarioPool.some(item => scenarios.indexOf(item) === activeScenario)) {
    activeScenario = scenarios.indexOf(scenarioPool[0] || scenarios[0]);
  }
  const scenario = scenarios[activeScenario];
  const solvedCases = Object.keys(scenarioAnswers).length;
  const correctCases = Object.values(scenarioAnswers).filter(answer => answer.correct).length;
  const weaknessList = Object.entries(scenarioWeakness)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);
  const recorded = scenarioAnswers[scenario.title];

  document.querySelector("#scenario-list").innerHTML = `
    <section class="scenario-trainer-dashboard">
      <p class="eyebrow">Field Decision Trainer</p>
      <h2>현장 판단 약점 보드</h2>
      <div class="case-stats">
        <span><strong>${solvedCases}</strong><small>푼 케이스</small></span>
        <span><strong>${correctCases}</strong><small>정답</small></span>
        <span><strong>${scenarioPool.length}/${scenarios.length}</strong><small>filtered/all</small></span>
      </div>
      <div class="scenario-filter-row">
        <button class="${scenarioFilter === "all" ? "active" : ""}" type="button" data-scenario-filter="all">All</button>
        ${scenarioStatuses.map(status => `<button class="${scenarioFilter === status ? "active" : ""}" type="button" data-scenario-filter="${status}">${status}</button>`).join("")}
      </div>
      <div class="weakness-chip-row">
        ${weaknessList.length ? weaknessList.map(([tag, count]) => `<span class="weakness-chip">${tag} ${count}</span>`).join("") : `<span class="weakness-chip calm">아직 누적 약점 없음</span>`}
      </div>
    </section>
    ${scenarioPool.map((item) => {
      const index = scenarios.indexOf(item);
      const answer = scenarioAnswers[item.title];
      return `
        <button class="scenario-tab ${index === activeScenario ? "active" : ""} ${answer ? (answer.correct ? "solved-good" : "solved-bad") : ""}" data-scenario="${index}">
          <strong>${item.title}</strong>
          <span>${item.status}</span>
          ${answer ? `<em>${answer.correct ? "맞음" : "복습"}</em>` : ""}
        </button>
      `;
    }).join("")}
  `;

  document.querySelector("#scenario-panel").innerHTML = `
    <div class="case-board-head">
      <div>
        <span class="scenario-status">${scenario.status}</span>
        <h2>${scenario.title}</h2>
        <p>${scenario.phase}</p>
      </div>
      <span class="case-board-badge">Senior CE case board</span>
    </div>
    <div class="case-flow-strip" aria-label="CE 사고 순서">
      <span>증상</span>
      <span>원인 후보</span>
      <span>증거 확인</span>
      <span>중지 조건</span>
      <span>보고</span>
    </div>
    <div class="case-learning-grid">
      <section class="case-card">
        <h3>1. 관찰된 사실</h3>
        <ul>${safeList(scenario.facts)}</ul>
      </section>
      <section class="case-card">
        <h3>2. 원인 후보</h3>
        <ul>${safeList(scenario.suspects)}</ul>
      </section>
      <section class="case-card wide">
        <h3>3. 확인할 evidence</h3>
        <ul>${safeList(scenario.evidence)}</ul>
      </section>
      <section class="case-card stop-card">
        <h3>4. 멈출 조건</h3>
        <p>${scenario.stop}</p>
      </section>
      <section class="case-card">
        <h3>5. 다음 action</h3>
        <ul>${safeList(scenario.next)}</ul>
      </section>
    </div>
    <section class="case-report">
      <div>
        <h3>고객 보고 문장</h3>
        <p>${scenario.report}</p>
      </div>
      <button class="copy-report" type="button">문장 복사</button>
    </section>
    <section class="case-report-coach">
      <h3>내 보고 문장 만들기</h3>
      <p>status, confirmed fact, risk, next action, ETA를 넣어 고객에게 말할 문장을 직접 적어보세요.</p>
      <textarea id="scenario-report-input" placeholder="예: 현재 확인된 사실은 __입니다. 위험은 __이고, 다음 확인은 __입니다. __까지 업데이트하겠습니다.">${scenarioReports[scenario.title]?.text || ""}</textarea>
      <div class="case-report-actions">
        <button class="secondary" type="button" data-scenario-report-save>보고문 저장/비교</button>
        <span id="scenario-report-score">${scenarioReports[scenario.title]?.feedback || "아직 저장된 보고문 없음"}</span>
      </div>
    </section>
    <section class="case-boundary">
      <strong>공개자료 기반 / 안전 경계</strong>
      <span>${scenario.publicBasis}</span>
    </section>
    <h3 class="case-decision-title">가장 먼저 취할 행동은?</h3>
    <div class="decision-grid">
      ${scenario.choices.map(([text, isGood], index) => `
        <button class="decision ${recorded && isGood ? "good" : ""} ${recorded?.selected === text ? "picked" : ""} ${recorded?.selected === text && !isGood ? "bad" : ""}" data-good="${isGood}" data-choice-index="${index}">${text}</button>
      `).join("")}
    </div>
    <p class="explain" id="scenario-feedback">${recorded ? (recorded.correct ? scenario.good : "이 선택은 너무 빠르거나 위험합니다. 다시 symptom -> risk -> evidence -> stop condition 순서로 좁혀보세요.") : "답을 고르면 왜 맞는지 바로 설명합니다. 핵심은 빠른 결론보다 안전한 증거 수집입니다."}</p>
  `;

  document.querySelectorAll(".scenario-tab").forEach(btn => {
    btn.addEventListener("click", () => {
      activeScenario = Number(btn.dataset.scenario);
      renderScenarios();
    });
  });

  document.querySelectorAll("[data-scenario-filter]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.scenarioFilter = btn.dataset.scenarioFilter;
      activeScenario = 0;
      persistState();
      renderScenarios();
    });
  });

  document.querySelector("[data-scenario-report-save]")?.addEventListener("click", () => {
    const text = document.querySelector("#scenario-report-input")?.value.trim() || "";
    const required = ["risk", "next", "update", "확인", "위험", "다음", "업데이트"];
    const hits = required.filter(word => text.toLowerCase().includes(word.toLowerCase())).length;
    const feedback = text.length < 30
      ? "보고문이 너무 짧습니다. fact, risk, next action, ETA를 넣어보세요."
      : hits >= 3
        ? "좋습니다. fact/risk/next action 흐름이 보입니다."
        : "보강 필요: confirmed fact, risk, next action, update time 중 빠진 축을 채우세요.";
    state.scenarioReports = state.scenarioReports || {};
    state.scenarioReports[scenario.title] = {
      text,
      feedback,
      status: scenario.status,
      savedAt: new Date().toISOString()
    };
    state.scenarioWeakness = state.scenarioWeakness || {};
    if (hits < 3) state.scenarioWeakness[`${scenario.status} / report`] = (state.scenarioWeakness[`${scenario.status} / report`] || 0) + 1;
    persistState();
    const score = document.querySelector("#scenario-report-score");
    if (score) score.textContent = feedback;
  });

  document.querySelectorAll(".decision").forEach(btn => {
    btn.addEventListener("click", () => {
      const selectedText = scenario.choices[Number(btn.dataset.choiceIndex)]?.[0] || btn.textContent.trim();
      const correct = btn.dataset.good === "true";
      state.scenarioAnswers = state.scenarioAnswers || {};
      state.scenarioAnswers[scenario.title] = {
        correct,
        selected: selectedText,
        status: scenario.status,
        at: new Date().toISOString()
      };
      if (!correct) {
        state.scenarioWeakness = state.scenarioWeakness || {};
        state.scenarioWeakness[scenario.status] = (state.scenarioWeakness[scenario.status] || 0) + 1;
      }
      persistState();
      document.querySelectorAll(".decision").forEach(item => {
        const itemCorrect = item.dataset.good === "true";
        item.classList.toggle("good", itemCorrect);
        item.classList.toggle("picked", item === btn);
        item.classList.toggle("bad", item === btn && !correct);
      });
      if (correct) {
        document.querySelector("#scenario-feedback").textContent = scenario.good;
      } else {
        document.querySelector("#scenario-feedback").textContent = "이 선택은 성급합니다. senior CE는 안전 경계, 변경점, 로그, 계측값, wafer evidence 순서로 원인을 좁힙니다.";
      }
      renderLearningHud();
      renderMetrics();
      renderScenarios();
    });
  });

  const copyButton = document.querySelector(".copy-report");
  copyButton?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(scenario.report);
      copyButton.textContent = "복사됨";
      setTimeout(() => { copyButton.textContent = "문장 복사"; }, 1200);
    } catch (error) {
      document.querySelector("#scenario-feedback").textContent = "브라우저 권한 때문에 자동 복사는 실패했지만, 보고 문장을 직접 선택해 사용할 수 있습니다.";
    }
  });
}

function renderQuiz() {
  const question = questions[qIndex];
  document.querySelector("#quiz-box").innerHTML = `
    <p class="eyebrow">${qIndex + 1} / ${questions.length}</p>
    <h2 class="question-title">${question.q}</h2>
    ${question.a.map((answer, index) => `<button class="answer" data-answer="${index}">${answer}</button>`).join("")}
    <p class="explain" id="quiz-explain">답을 선택하면 해설이 나옵니다.</p>
  `;

  document.querySelectorAll(".answer").forEach(btn => {
    btn.addEventListener("click", () => {
      const selected = Number(btn.dataset.answer);
      const correct = selected === question.c;
      state.quizAttempts = state.quizAttempts || [];
      state.quizAttempts.push(correct);
      document.querySelectorAll(".answer").forEach((item, index) => {
        item.classList.toggle("correct", index === question.c);
        item.classList.toggle("wrong", index === selected && !correct);
      });
      document.querySelector("#quiz-explain").textContent = question.e;
      save();
    });
  });
}

function renderFlashcards() {
  document.querySelector("#flashcard-list").innerHTML = flashcards.map(([term, desc]) => `
    <div class="flash">
      <strong>${term}</strong>
      <span>${desc}</span>
    </div>
  `).join("");
}

function renderInstall() {
  document.querySelector("#install-gap-radar").innerHTML = `
    <div>
      <p class="eyebrow">Gap Radar</p>
      <h2>지금 웹에서 더 채워야 했던 핵심 약점</h2>
      <p>설치 엔지니어에게 가장 위험한 공백은 장비 지식이 아니라 scope, evidence, safety envelope, qualification link를 한 번에 묶지 못하는 것입니다. 아래 네 칸을 계속 자기 점검 기준으로 쓰세요.</p>
    </div>
    <div class="radar-grid">
      ${installGapRadar.map(([title, risk, fix]) => `
        <article>
          <strong>${title}</strong>
          <span>${risk}</span>
          <small>${fix}</small>
        </article>
      `).join("")}
    </div>
  `;
  const installDone = state.installChecklist || {};
  const installChecked = installInteractiveChecklist.filter(item => installDone[item.id]).length;
  document.querySelector("#install-mission-board").innerHTML = `
    <section class="install-checklist-console">
      <div class="install-checklist-head">
        <div>
          <p class="eyebrow">Interactive Install Runbook</p>
          <h2>Move-in부터 handover까지 현장 체크</h2>
          <p>각 단계는 “증거 -> owner -> stop condition -> 고객 보고” 순서로 닫습니다. 실제 수치, valve sequence, detector setting은 현장 승인 문서 우선입니다.</p>
        </div>
        <strong>${installChecked}/${installInteractiveChecklist.length}</strong>
      </div>
      <div class="gate-progress">
        <span style="width: ${(installChecked / installInteractiveChecklist.length) * 100}%"></span>
      </div>
      <div class="install-checklist-grid">
        ${installInteractiveChecklist.map(item => `
          <label class="install-check-row ${installDone[item.id] ? "checked" : ""}" for="install-${item.id}">
            <input id="install-${item.id}" type="checkbox" data-install-check="${item.id}" ${installDone[item.id] ? "checked" : ""} />
            <span>
              <strong>${item.title}</strong>
              <small>Owner: ${item.owner}</small>
              <em>Evidence: ${item.evidence.join(" / ")}</em>
              <b>Stop: ${item.stop}</b>
              <i>${item.report}</i>
            </span>
          </label>
        `).join("")}
      </div>
    </section>
    ${installMissionStages.map(stage => `
    <article class="mission-card">
      <span class="mission-badge">${stage.badge}</span>
      <h2>${stage.title}</h2>
      <p>${stage.goal}</p>
      <strong>Pass evidence</strong>
      <ul>${stage.evidence.map(item => `<li>${item}</li>`).join("")}</ul>
      <strong>Stop condition</strong>
      <p>${stage.stop}</p>
      <strong>Senior question</strong>
      <p>${stage.senior}</p>
    </article>
  `).join("")}
  `;
  document.querySelector("#install-grid").innerHTML = installPhases.map(item => `
    <article class="install-card">
      <span class="phase">Phase ${item.phase}</span>
      <h2>${item.title}</h2>
      <h3>해야 할 사고</h3>
      <ul>${item.points.map(point => `<li>${point}</li>`).join("")}</ul>
      <h3>입사 후 반드시 물어볼 질문</h3>
      <ul>${item.questions.map(question => `<li>${question}</li>`).join("")}</ul>
    </article>
  `).join("");
  document.querySelector("#install-decision-drills").innerHTML = `
    <h2>Stop / Go 판단 훈련</h2>
    <p>아래 상황은 실제 현장 감각을 키우기 위한 공개 정보 기반 훈련입니다. 정답을 열기 전에 먼저 “계속 / 중단 / escalate”를 말해보세요.</p>
    <div class="decision-drill-list">
      ${installDecisionDrills.map((drill, index) => `
        <details class="decision-drill">
          <summary><span>${index + 1}</span>${drill.title}</summary>
          <div>
            <strong>위험한 판단</strong>
            <p>${drill.wrong}</p>
            <strong>선임형 판단</strong>
            <p>${drill.right}</p>
          </div>
        </details>
      `).join("")}
    </div>
  `;
  document.querySelector("#install-senior-map").innerHTML = `
    <h2>Senior CE System Map</h2>
    <p>장비를 하나의 금속 박스로 보지 말고, 다섯 평면이 동시에 맞아야 하는 시스템으로 보세요.</p>
    ${installSeniorMap.map(([title, body]) => `<div class="deep-item"><strong>${title}</strong><span>${body}</span></div>`).join("")}
  `;
  document.querySelector("#install-source-strip").innerHTML = installSourceLinks.map(([label, url]) => `
    <a href="${url}" target="_blank" rel="noreferrer">${label}</a>
  `).join("");

  document.querySelectorAll("[data-install-check]").forEach(input => {
    input.addEventListener("change", () => {
      state.installChecklist = state.installChecklist || {};
      state.installChecklist[input.dataset.installCheck] = input.checked;
      persistState();
      renderInstall();
      renderLearningHud();
      renderMetrics();
    });
  });
}

function renderRunbook() {
  const rail = document.querySelector("#runbook-rail");
  const detail = document.querySelector("#runbook-detail");
  const gates = document.querySelector("#runbook-gates");
  const briefing = document.querySelector("#runbook-briefing");
  const raci = document.querySelector("#runbook-raci");
  const storage = document.querySelector("#runbook-storage-map");
  if (!rail || !detail || !gates || !briefing || !raci || !storage) return;

  const current = fieldRunbookStages.find(stage => stage.id === activeRunbookStage) || fieldRunbookStages[0];
  const gateProgress = getRunbookGateProgress();

  rail.innerHTML = fieldRunbookStages.map(stage => `
    <button class="runbook-step ${stage.id === current.id ? "active" : ""}" type="button" data-runbook-stage="${stage.id}">
      <span>${stage.badge}</span>
      <strong>${stage.title}</strong>
      <small>${stage.plain}</small>
    </button>
  `).join("");

  detail.innerHTML = `
    <div class="runbook-detail-head">
      <span>${current.badge}</span>
      <div>
        <p class="eyebrow">Active Phase</p>
        <h2>${current.title}</h2>
        <p>${current.plain}</p>
      </div>
    </div>
    <div class="runbook-owner">
      <strong>Owner map</strong>
      <span>${current.owner}</span>
    </div>
    <div class="runbook-objective">
      <strong>목표</strong>
      <p>${current.objective}</p>
    </div>
    <div class="runbook-detail-grid">
      <section>
        <h3>반드시 봐야 할 증거</h3>
        <ul>${current.mustSee.map(item => `<li>${item}</li>`).join("")}</ul>
      </section>
      <section class="hold-section">
        <h3>Hold / Stop 조건</h3>
        <ul>${current.holdIf.map(item => `<li>${item}</li>`).join("")}</ul>
      </section>
      <section>
        <h3>선임처럼 묻는 질문</h3>
        <ul>${current.seniorQuestions.map(item => `<li>${item}</li>`).join("")}</ul>
      </section>
      <section>
        <h3>고객에게 말하는 문장</h3>
        <p>${current.customerLine}</p>
      </section>
    </div>
  `;

  gates.innerHTML = `
    <div class="runbook-panel-head">
      <div>
        <p class="eyebrow">Pass Gate</p>
        <h2>설치 전 자기 점검</h2>
      </div>
      <strong>${gateProgress.checked}/${gateProgress.total}</strong>
    </div>
    <div class="gate-progress">
      <span style="width: ${gateProgress.percent}%"></span>
    </div>
    <div class="gate-list">
      ${runbookGates.map(([id, label, hint]) => `
        <label class="gate-row" for="runbook-${id}">
          <input id="runbook-${id}" type="checkbox" data-runbook-gate="${id}" ${state.runbookGates?.[id] ? "checked" : ""} />
          <span>
            <strong>${label}</strong>
            <small>${hint}</small>
          </span>
        </label>
      `).join("")}
    </div>
  `;

  briefing.innerHTML = `
    <div class="runbook-panel-head">
      <div>
        <p class="eyebrow">Communication</p>
        <h2>현장 보고 템플릿</h2>
      </div>
    </div>
    <div class="briefing-list">
      ${briefingTemplates.map((template, index) => `
        <article class="briefing-template">
          <strong>${template.title}</strong>
          <p>${template.body}</p>
          <button class="secondary" type="button" data-briefing-index="${index}">문장 복사</button>
        </article>
      `).join("")}
    </div>
  `;

  raci.innerHTML = `
    <div class="runbook-panel-head">
      <div>
        <p class="eyebrow">RACI</p>
        <h2>누가 결정하고 누가 입회하는가</h2>
      </div>
    </div>
    <div class="raci-table" role="table" aria-label="installation responsibility map">
      <div class="raci-row raci-head" role="row">
        <span>작업</span><span>Responsible</span><span>Accountable</span><span>Consulted</span><span>Informed</span>
      </div>
      ${raciItems.map(row => `
        <div class="raci-row" role="row">
          ${row.map(cell => `<span>${cell}</span>`).join("")}
        </div>
      `).join("")}
    </div>
  `;

  storage.innerHTML = `
    <div class="runbook-panel-head">
      <div>
        <p class="eyebrow">Storage Map</p>
        <h2>기록이 어디에 남는가</h2>
      </div>
    </div>
    <div class="storage-flow">
      ${storageTopology.map(([name, text, data], index) => `
        <article>
          <span>${index + 1}</span>
          <strong>${name}</strong>
          <p>${text}</p>
          <small>${data}</small>
        </article>
      `).join("")}
    </div>
    <p class="storage-note">외부 접속은 Cloudflare D1을 기본 저장소로 사용하고, 이 PC에서는 local vault server가 켜져 있을 때 D 드라이브 mirror가 함께 쌓입니다.</p>
  `;

  rail.querySelectorAll("[data-runbook-stage]").forEach(button => {
    button.addEventListener("click", () => {
      activeRunbookStage = button.dataset.runbookStage;
      renderRunbook();
    });
  });

  gates.querySelectorAll("[data-runbook-gate]").forEach(input => {
    input.addEventListener("change", () => {
      state.runbookGates = state.runbookGates || {};
      state.runbookGates[input.dataset.runbookGate] = input.checked;
      save();
    });
  });

  briefing.querySelectorAll("[data-briefing-index]").forEach(button => {
    button.addEventListener("click", async () => {
      const template = briefingTemplates[Number(button.dataset.briefingIndex)];
      try {
        await navigator.clipboard.writeText(template.body);
        const original = button.textContent;
        button.textContent = "복사됨";
        setTimeout(() => {
          button.textContent = original;
        }, 1200);
      } catch {
        button.textContent = "복사 실패";
      }
    });
  });
}

function renderFacility() {
  document.querySelector("#facility-map").innerHTML = facilitySystems.map(item => `
    <article class="facility-card">
      <h2>${item.title}</h2>
      <p>${item.concept}</p>
      <strong>Watch Points</strong>
      <ul>${item.watch.map(point => `<li>${point}</li>`).join("")}</ul>
      <strong>Ask On Site</strong>
      <ul>${item.ask.map(point => `<li>${point}</li>`).join("")}</ul>
    </article>
  `).join("");
}

function getActiveProcessVisual() {
  const flow = processVisualFlows.find(item => item.id === activeProcessFlow) || processVisualFlows[0];
  if (activeProcessStep >= flow.steps.length) activeProcessStep = 0;
  if (activeProcessStep < 0) activeProcessStep = flow.steps.length - 1;
  return { flow, step: flow.steps[activeProcessStep] };
}

function processGasRisk(tag) {
  const key = String(tag).toLowerCase();
  if (["ph3", "ash3", "b2h6", "geh4"].some(item => key.includes(item))) return "독성/가연성 hydride 계열. SDS, detector, exhaust, abatement, EHS owner 확인이 우선입니다.";
  if (["sih4", "dcs", "tcs", "chlorosilane"].some(item => key.includes(item))) return "가연성 또는 수분 반응성 silicon precursor 계열. 실제 gas matrix와 purge/exhaust 준비는 현장 문서로만 확정합니다.";
  if (key.includes("hcl")) return "부식성/독성 gas. 배기/스크러버 readiness와 PPE/EHS 절차를 먼저 확인합니다.";
  if (key.includes("h2")) return "가연성 gas. ignition source, purge, exhaust, leak integrity, abatement readiness를 분리해 확인합니다.";
  if (["n2", "ar"].some(item => key.includes(item))) return "불활성 gas라도 질식과 압력 energy 위험이 있습니다. confined space/ventilation/site rule을 따릅니다.";
  if (["o2", "o3", "n2o", "no", "nh3"].some(item => key.includes(item))) return "oxidizer/reactive ambient 가능성. fuel gas separation, exhaust, material compatibility는 현장 승인 문서 우선입니다.";
  if (key.includes("vacuum")) return "진공 boundary 단계. door, slit valve, pumpdown curve, pressure equalization evidence가 중요합니다.";
  if (key.includes("abatement") || key.includes("exhaust")) return "배기/처리 단계. ready signal과 local actual state를 owner witness로 대조합니다.";
  return "공개자료 기준 개념 tag입니다. 실제 사용 여부와 위험 등급은 tool option, gas matrix, SDS, site EHS 문서로 확인합니다.";
}

function getActiveEpiMission() {
  return epiInstallCampaign.find(item => item.id === activeEpiMission) || epiInstallCampaign[0];
}

function getEpiMissionStats() {
  const answers = state.epiMissionAnswers || {};
  const solved = Object.keys(answers).length;
  const correct = Object.values(answers).filter(item => item.correct).length;
  const selectedCards = state.epiMissionBoard?.[getActiveEpiMission().id] || [];
  const topWeakness = Object.entries(state.epiMissionWeakness || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);
  return {
    solved,
    correct,
    score: solved ? Math.round((correct / solved) * 100) : 0,
    selectedCards,
    topWeakness
  };
}

function groupMissionCards(cards) {
  return cards.reduce((groups, card) => {
    const [lane] = card;
    groups[lane] = groups[lane] || [];
    groups[lane].push(card);
    return groups;
  }, {});
}

function scoreMissionEvidence(mission) {
  const selected = new Set(state.epiMissionBoard?.[mission.id] || []);
  const required = mission.cards.filter(card => card[4]).map(card => card[1]);
  const wrong = mission.cards.filter(card => !card[4] && selected.has(card[1])).map(card => card[1]);
  const hits = required.filter(id => selected.has(id)).length;
  const pct = required.length ? Math.max(0, Math.round(((hits - wrong.length) / required.length) * 100)) : 0;
  return { selected, required, wrong, hits, pct };
}

function applyEpiMissionToTwin(mission, options = {}) {
  const twin = window.ProjectUniverseWebGLTwin;
  const status = document.querySelector("#epi-mission-sync-status");
  if (!twin) {
    if (status) status.textContent = "3D twin이 아직 준비되지 않았습니다. 잠시 후 다시 누르세요.";
    return false;
  }
  twin.pause?.();
  twin.setRoute?.(mission.twin.route);
  twin.setMode?.(mission.twin.mode);
  Object.entries(mission.twin.layers || {}).forEach(([layer, value]) => twin.setLayer?.(layer, value));
  twin.setStep?.(mission.twin.step);
  twin.setCamera?.("iso");
  if (mission.process) {
    activeProcessFlow = mission.process.flow;
    activeProcessStep = mission.process.step;
  }
  if (status) {
    status.textContent = `3D 동기화됨: ${mission.phase} / ${mission.title}`;
  }
  if (options.scroll !== false) {
    document.querySelector("#webgl-twin")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  return true;
}

function renderEpiMissionEngine() {
  const root = document.querySelector("#epi-mission-engine");
  if (!root) return;
  const mission = getActiveEpiMission();
  const stats = getEpiMissionStats();
  const evidence = scoreMissionEvidence(mission);
  const grouped = groupMissionCards(mission.cards);
  const answer = state.epiMissionAnswers?.[mission.id];
  const mode = state.epiMissionMode || "CE";
  const laneLabels = {
    symptom: "Symptom",
    risk: "Risk",
    subsystem: "Subsystem",
    evidence: "Evidence",
    owner: "Owner",
    stop: "Stop",
    report: "Report",
    action: "Wrong action"
  };
  root.innerHTML = `
    <div class="mission-engine-head">
      <div>
        <p class="eyebrow">Project Universe OS v6</p>
        <h2>EPI Install Mission Engine</h2>
        <p>읽는 페이지를 넘어, 3D twin을 실제 install day 흐름에 맞추고 symptom -> risk -> subsystem -> evidence -> stop -> report 순서로 판단하는 훈련 엔진입니다.</p>
      </div>
      <div class="mission-score-card">
        <span>Mission score</span>
        <strong>${stats.score}%</strong>
        <small>${stats.correct}/${stats.solved || 0} correct · evidence ${evidence.hits}/${evidence.required.length}</small>
      </div>
    </div>
    <div class="mission-mode-row" aria-label="mission training mode">
      ${["Rookie", "CE", "Senior"].map(item => `
        <button type="button" class="${mode === item ? "active" : ""}" data-epi-mission-mode="${item}">${item}</button>
      `).join("")}
      <span>${mode === "Rookie" ? "용어와 큰 그림을 더 천천히 봅니다." : mode === "Senior" ? "고객 보고와 재발 방지까지 생각합니다." : "evidence와 stop condition을 중심으로 봅니다."}</span>
    </div>
    <div class="mission-ladder" aria-label="install campaign mission list">
      ${epiInstallCampaign.map((item, index) => {
        const saved = state.epiMissionAnswers?.[item.id];
        return `
          <button type="button" class="${item.id === mission.id ? "active" : ""} ${saved?.correct ? "solved" : saved ? "review" : ""}" data-epi-mission="${item.id}">
            <span>${String(index + 1).padStart(2, "0")}</span>
            <strong>${item.day}</strong>
            <b>${item.title}</b>
            <small>${item.phase}</small>
          </button>
        `;
      }).join("")}
    </div>
    <div class="mission-main-grid">
      <section class="mission-brief">
        <div class="mission-brief-title">
          <span>${mission.day}</span>
          <h3>${mission.title}</h3>
          <p>${mission.subtitle}</p>
        </div>
        <div class="mission-status-grid">
          ${mission.status.map(([label, value]) => `
            <article>
              <span>${label}</span>
              <strong>${value}</strong>
            </article>
          `).join("")}
        </div>
        <div class="mission-sync-row">
          <button class="primary" type="button" data-epi-sync-twin>3D twin 동기화</button>
          <button class="secondary" type="button" data-epi-sync-and-flow>3D + 공정 단계 동기화</button>
          <span id="epi-mission-sync-status">미션을 누르면 3D route/mode/step이 맞춰집니다.</span>
        </div>
      </section>
      <section class="mission-question">
        <p class="eyebrow">CE Decision Loop</p>
        <h3>${mission.prompt}</h3>
        <div class="mission-choice-grid">
          ${mission.choices.map(([label, good, why], index) => `
            <button type="button" class="${answer && answer.selected === index ? "picked" : ""} ${answer && good ? "good" : ""} ${answer && answer.selected === index && !good ? "bad" : ""}" data-epi-choice="${index}">
              ${label}
            </button>
          `).join("")}
        </div>
        <p class="mission-feedback" id="epi-mission-feedback">${answer ? mission.choices[answer.selected]?.[2] : "답을 선택하면 즉시 채점되고, 오답은 약점 그래프에 쌓입니다."}</p>
        <textarea readonly class="mission-report-template">${mission.report}</textarea>
      </section>
    </div>
    <section class="evidence-board" aria-label="mission evidence board">
      <div class="evidence-board-head">
        <div>
          <p class="eyebrow">Evidence Board</p>
          <h3>필요한 카드를 골라 현장 사고 순서를 완성하세요</h3>
        </div>
        <span class="${evidence.pct >= 80 && !evidence.wrong.length ? "ready" : ""}">${evidence.pct}% evidence</span>
      </div>
      <div class="evidence-lanes">
        ${Object.entries(grouped).map(([lane, cards]) => `
          <article>
            <strong>${laneLabels[lane] || lane}</strong>
            ${cards.map(([, id, label, text, good]) => `
              <button type="button" class="${evidence.selected.has(id) ? "selected" : ""} ${!good && evidence.selected.has(id) ? "wrong" : ""}" data-epi-evidence="${id}">
                <b>${label}</b>
                <span>${text}</span>
              </button>
            `).join("")}
          </article>
        `).join("")}
      </div>
    </section>
    <div class="mission-weakness-row">
      <strong>Weakness top</strong>
      ${stats.topWeakness.length ? stats.topWeakness.map(([tag, count]) => `<span>${tag} ${count}</span>`).join("") : "<span>아직 누적 약점 없음</span>"}
      <small>안전 경계: recipe, valve sequence, detector setpoint, interlock bypass, site-specific acceptance limit은 의도적으로 제외합니다.</small>
    </div>
  `;

  root.querySelectorAll("[data-epi-mission]").forEach(button => {
    button.addEventListener("click", () => {
      activeEpiMission = button.dataset.epiMission;
      state.activeEpiMission = activeEpiMission;
      persistState();
      renderEpiMissionEngine();
      applyEpiMissionToTwin(getActiveEpiMission(), { scroll: false });
    });
  });
  root.querySelectorAll("[data-epi-mission-mode]").forEach(button => {
    button.addEventListener("click", () => {
      state.epiMissionMode = button.dataset.epiMissionMode;
      persistState();
      renderEpiMissionEngine();
    });
  });
  root.querySelector("[data-epi-sync-twin]")?.addEventListener("click", () => applyEpiMissionToTwin(mission));
  root.querySelector("[data-epi-sync-and-flow]")?.addEventListener("click", () => {
    applyEpiMissionToTwin(mission, { scroll: false });
    renderProcessVisual();
    document.querySelector("#webgl-twin")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
  root.querySelectorAll("[data-epi-evidence]").forEach(button => {
    button.addEventListener("click", () => {
      const id = button.dataset.epiEvidence;
      state.epiMissionBoard = state.epiMissionBoard || {};
      const selected = new Set(state.epiMissionBoard[mission.id] || []);
      if (selected.has(id)) selected.delete(id);
      else selected.add(id);
      state.epiMissionBoard[mission.id] = [...selected];
      persistState();
      renderEpiMissionEngine();
    });
  });
  root.querySelectorAll("[data-epi-choice]").forEach(button => {
    button.addEventListener("click", () => {
      const selected = Number(button.dataset.epiChoice);
      const choice = mission.choices[selected];
      state.epiMissionAnswers = state.epiMissionAnswers || {};
      state.epiMissionAnswers[mission.id] = {
        selected,
        correct: Boolean(choice?.[1]),
        phase: mission.phase,
        answeredAt: new Date().toISOString()
      };
      if (!choice?.[1]) {
        state.epiMissionWeakness = state.epiMissionWeakness || {};
        const tag = choice?.[3] || mission.phase;
        state.epiMissionWeakness[tag] = (state.epiMissionWeakness[tag] || 0) + 1;
      }
      persistState();
      renderEpiMissionEngine();
    });
  });
}

const epiMentalFrames = [
  {
    id: "carrier-context",
    day: "Day 0",
    title: "FOUP arrival and job context",
    focus: "Carrier가 load port에 도착하면 장비는 먼저 wafer를 움직이는 것이 아니라 lot, carrier, slot, permission context를 맞춥니다.",
    twin: { route: "epi-a", mode: "comm", step: 0, layers: { cutaway: false, pressure: true, particles: true, packets: true } },
    activeNodes: ["host", "toolpc", "foup", "lp"],
    layers: {
      physical: [
        "FOUP은 sealed carrier이고 load port는 carrier를 고정하고 door/open boundary를 만듭니다.",
        "EFEM robot은 아직 wafer를 꺼내기 전이며, slot map과 carrier present가 먼저 확정되어야 합니다."
      ],
      comm: [
        "MES/EAP/host 계층은 lot, carrier ID, wafer slot, job permission을 tool controller와 주고받습니다.",
        "Load port/E84 계열 handoff 개념은 AMHS와 tool 사이의 carrier transfer 상태를 정렬하는 mental model입니다."
      ],
      boundary: [
        "이 단계는 대기압 영역입니다. process gas가 들어가는 단계가 아닙니다.",
        "N2 purge나 mini-environment는 cleanliness/atmosphere 안정화 관점이며, 실제 site 설정은 승인 문서가 우선입니다."
      ],
      process: [
        "Wafer 표면에는 아직 변화가 없습니다. 핵심은 traceability가 끊기지 않는 것입니다.",
        "여기서 ID가 틀리면 이후 metrology, alarm trace, customer report가 모두 어긋납니다."
      ],
      evidence: [
        "carrier ID, slot map, load port clamp/door state, host job permission, event timestamp",
        "Stop: carrier/slot mismatch, unknown wafer present, host permission conflict"
      ]
    },
    report: "Carrier and slot context are being verified before any wafer movement. We are holding movement until host, load port, and slot map evidence are aligned.",
    teach: {
      question: "이 단계에서 CE가 가장 먼저 맞춰야 할 mental model은?",
      choices: [
        ["process gas readiness보다 carrier/slot/job context 정합성이 먼저다.", true, "맞습니다. wafer를 움직이기 전 traceability를 고정해야 합니다.", "traceability"],
        ["PM 온도 안정화가 우선이므로 carrier ID는 나중에 봐도 된다.", false, "위험합니다. ID/slot context가 틀리면 이후 모든 evidence가 흔들립니다.", "traceability"],
        ["FOUP이 도착하면 곧바로 Load Lock pumpdown부터 확인한다.", false, "아직 wafer가 load lock에 들어가기 전입니다. carrier handoff가 먼저입니다.", "sequence"]
      ]
    }
  },
  {
    id: "efem-slot-map",
    day: "Day 0",
    title: "EFEM pick, slot map, align",
    focus: "EFEM/FI는 대기압 front interface입니다. FOUP 속 wafer를 인식하고 aligner를 거쳐 load lock으로 넘길 준비를 합니다.",
    twin: { route: "epi-a", mode: "material", step: 1, layers: { cutaway: false, pressure: true, particles: true, packets: true } },
    activeNodes: ["lp", "efem", "aligner", "lla"],
    layers: {
      physical: [
        "EFEM robot은 FOUP에서 wafer를 pick하고 aligner에서 notch/center를 맞춥니다.",
        "Load Lock의 EFEM-side door와 TM-side slit은 서로 다른 boundary입니다. 둘을 한 문처럼 생각하면 install 판단이 흐려집니다."
      ],
      comm: [
        "Tool controller는 robot event, align result, wafer present sensor, load lock availability를 scheduler 관점으로 묶습니다.",
        "Host는 개별 motor를 직접 움직인다기보다 lot/wafer/job/event trace를 통해 장비 상태와 연결됩니다."
      ],
      boundary: [
        "EFEM은 atmospheric handling zone이고 Load Lock은 atmospheric-to-vacuum converter입니다.",
        "Door/slit state가 모호하면 반복 pick을 시도하지 말고 wafer present와 mechanical state를 분리합니다."
      ],
      process: [
        "Wafer 표면에는 아직 intentional film growth가 없습니다.",
        "하지만 scratch, edge contact, wrong slot 같은 handling defect는 이후 공정 문제처럼 보일 수 있습니다."
      ],
      evidence: [
        "aligner result, robot event order, wafer present transition, door feedback, slot map update",
        "Stop: unexpected wafer present, alignment fail, door state mismatch, suspected contact"
      ]
    },
    report: "The wafer handling path is being verified from FOUP through EFEM and aligner before load lock handoff. Current focus is robot event order and wafer-present transitions.",
    teach: {
      question: "EFEM 문제를 PM process 문제로 착각하지 않으려면 무엇을 봐야 할까?",
      choices: [
        ["wafer present transition과 aligner/robot event order를 먼저 본다.", true, "맞습니다. handling evidence가 PM 증상처럼 보이는 경우를 분리합니다.", "handling"],
        ["성장률 trend부터 본다.", false, "아직 성장 단계가 아닙니다. 위치/slot/handling evidence가 먼저입니다.", "sequence"],
        ["가스 box MFC actual을 먼저 본다.", false, "이 단계는 process gas introduction 전입니다.", "gas-boundary"]
      ]
    }
  },
  {
    id: "loadlock-pumpdown",
    day: "Day 1",
    title: "Load Lock pumpdown boundary",
    focus: "Load Lock은 대기압 EFEM과 vacuum TM 사이의 압력 번역기입니다. pumpdown curve가 wafer path의 gate가 됩니다.",
    twin: { route: "epi-a", mode: "vacuum", step: 3, layers: { cutaway: true, pressure: true, particles: true, packets: true } },
    activeNodes: ["lla", "tm", "pump", "abatement"],
    layers: {
      physical: [
        "Wafer는 Load Lock 안에서 격리되고 pumpdown을 통해 TM pressure boundary에 맞춰집니다.",
        "LL door, TM slit, pump path, pressure gauge를 하나의 chain으로 봐야 합니다."
      ],
      comm: [
        "Tool controller는 pressure ready, door closed, pump state, wafer present가 맞을 때 TM pickup을 허용합니다.",
        "Host 화면의 ready 한 단어만 보지 말고 module actual state와 event order를 같이 봅니다."
      ],
      boundary: [
        "Pumpdown은 단순히 압력이 내려가는 것이 아니라 leak/outgassing/gauge/seal 상태를 드러내는 signature입니다.",
        "Exhaust/abatement readiness는 process gas 전부터 이미 safety chain의 일부입니다."
      ],
      process: [
        "Wafer film은 아직 성장하지 않습니다. 표면을 건드리지 않고 vacuum transfer 준비를 하는 단계입니다.",
        "Pumpdown abnormal은 이후 particle, moisture, interface issue처럼 연결될 수 있습니다."
      ],
      evidence: [
        "pumpdown curve, elapsed time, pressure gauge agreement, door/slit feedback, pump/exhaust status",
        "Stop: pressure plateau, gauge disagreement, unresolved exhaust alarm, seal/door conflict"
      ]
    },
    report: "Load lock pumpdown is under verification. We are comparing pressure trend, gauge agreement, door/slit feedback, and exhaust readiness before allowing vacuum transfer.",
    teach: {
      question: "pumpdown이 느릴 때 가장 senior CE다운 첫 판단은?",
      choices: [
        ["leak/outgassing/gauge/seal/pump path를 evidence로 나눠 본다.", true, "맞습니다. 느리다는 증상을 subsystem 후보로 분해해야 합니다.", "vacuum-boundary"],
        ["압력이 결국 내려가면 바로 process gas를 열어본다.", false, "위험합니다. gas introduction은 safety/evidence gate 뒤의 단계입니다.", "gas-safety"],
        ["wafer recipe를 먼저 수정한다.", false, "비공개/위험 영역이며 원인 분리 전에 recipe 접근은 잘못된 방향입니다.", "unsafe-recipe"]
      ]
    }
  },
  {
    id: "tm-dispatch",
    day: "Day 1",
    title: "TM robot dispatch to PM",
    focus: "Transfer Module은 vacuum hub입니다. LL, PM, CM 사이에서 wafer를 움직이는 교차로이고, 각 slit/pressure/robot state가 맞아야 합니다.",
    twin: { route: "epi-a", mode: "material", step: 5, layers: { cutaway: true, pressure: true, particles: true, packets: true } },
    activeNodes: ["tm", "lla", "pm1", "pm2", "preclean"],
    layers: {
      physical: [
        "TM robot은 Load Lock에서 wafer를 받아 PM 또는 pre-clean/CM으로 넘깁니다.",
        "Centura/Vantage류 cluster mental model에서는 TM이 중앙 hub, PM/CM이 주변 process node라고 그리면 좋습니다."
      ],
      comm: [
        "Scheduler는 module ready, wafer present, slit permissive, robot position을 맞춰 dispatch합니다.",
        "PM A/B mismatch를 볼 때 shared TM/facility issue인지 module-local issue인지 분리합니다."
      ],
      boundary: [
        "TM과 PM은 transfer vacuum을 공유하거나 맞춰야 하며, slit valve는 pressure boundary와 motion boundary를 동시에 의미합니다.",
        "Slit feedback이나 wafer handoff abnormal은 반복 동작으로 해결하려 하지 않습니다."
      ],
      process: [
        "Wafer는 PM에 들어가기 전이며 film growth는 아직 시작되지 않았습니다.",
        "Queue time, vacuum continuity, pre-clean pass 여부가 interface quality와 연결됩니다."
      ],
      evidence: [
        "robot position, slit valve transition, wafer present handoff, module ready, queue time",
        "Stop: wafer lost, slit/pressure not ready, wrong module route, suspected scrape/contact"
      ]
    },
    report: "Transfer module dispatch is being checked through slit state, robot position, wafer-present handoff, and destination module readiness. We are separating shared TM path from module-local symptoms.",
    teach: {
      question: "TM에서 PM으로 wafer를 넘길 때 핵심 boundary는?",
      choices: [
        ["robot motion, slit permissive, pressure compatibility, wafer present transition이다.", true, "맞습니다. TM handoff는 motion과 vacuum evidence가 동시에 필요합니다.", "tm-handoff"],
        ["PM gas family만 알면 충분하다.", false, "아직 gas introduction 전입니다. handoff boundary가 먼저입니다.", "sequence"],
        ["host가 ready라면 module actual은 보지 않아도 된다.", false, "ready 표시와 actual state가 다를 수 있어 event/evidence 확인이 필요합니다.", "comm-actual"]
      ]
    }
  },
  {
    id: "epi-reaction",
    day: "Day 1",
    title: "EPI PM reaction and film growth",
    focus: "EPI PM 안에서는 heat, carrier gas, silicon/germanium precursor, dopant, exhaust가 surface reaction과 layer growth로 연결됩니다.",
    twin: { route: "epi-a", mode: "gas", step: 6, layers: { cutaway: true, pressure: true, particles: true, packets: true } },
    activeNodes: ["pm1", "gasbox", "pump", "abatement", "toolpc"],
    layers: {
      physical: [
        "Wafer는 susceptor/chuck 위에서 thermal state를 맞추고 gas delivery는 PM으로 들어갑니다.",
        "Gas box, MFC, PM, pump, exhaust, abatement를 한 줄의 chemical path로 그립니다."
      ],
      comm: [
        "Tool controller는 temperature trace, pressure trace, MFC actual, chamber state, abatement ready를 trace packet으로 묶습니다.",
        "고객 보고는 결과값만 말하지 말고 어떤 evidence가 같은 시간축에 있었는지 설명해야 합니다."
      ],
      boundary: [
        "H2는 flammable carrier/reducing ambient, chlorosilane/silane family는 silicon precursor, GeH4/PH3/B2H6류는 toxic/flammable hydride family로 조심합니다.",
        "실제 gas 사용, setpoint, flow, valve sequence는 tool option/site document/official training 영역입니다."
      ],
      process: [
        "Precursor가 heated wafer surface에서 반응하여 substrate crystal orientation을 따라 epitaxial layer를 성장시키는 개념입니다.",
        "Byproduct와 residual gas는 pump/exhaust/abatement로 빠져야 하며, purge는 다음 상태로 넘어가는 safety/quality bridge입니다."
      ],
      evidence: [
        "MFC setpoint vs actual, pressure response, thermal trace, exhaust/abatement ready, detector health, metrology link",
        "Stop: gas readiness uncertain, detector/exhaust/abatement alarm, thermal instability, unknown gas line status"
      ]
    },
    report: "The EPI reaction step is being treated as a linked gas, thermal, pressure, exhaust, and metrology system. We are not changing recipe parameters; we are collecting actual traces and safety readiness evidence.",
    teach: {
      question: "EPI PM에서 wafer 위에 막이 자라는 그림을 가장 안전하게 설명하면?",
      choices: [
        ["가열된 wafer 표면에서 precursor가 반응해 결정 방향을 따라 layer가 성장하고 byproduct는 exhaust로 빠진다.", true, "맞습니다. 표면 반응, crystal continuity, exhaust path를 함께 설명했습니다.", "epi-chemistry"],
        ["가스를 많이 넣으면 막이 빨리 자라므로 flow를 임의로 올린다.", false, "위험하고 비공개 recipe 영역입니다. setpoint 변경은 공식 절차 밖에서 하면 안 됩니다.", "unsafe-recipe"],
        ["막 성장은 PM 내부에서만 보므로 abatement 상태는 중요하지 않다.", false, "위험합니다. gas/byproduct path는 abatement까지 하나의 safety chain입니다.", "abatement"]
      ]
    }
  },
  {
    id: "purge-abatement",
    day: "Day 2",
    title: "Purge, exhaust, abatement proof",
    focus: "공정 후 purge/exhaust/abatement는 남은 gas와 byproduct를 안전하게 다음 상태로 넘기는 bridge입니다.",
    twin: { route: "epi-a", mode: "gas", step: 7, layers: { cutaway: true, pressure: true, particles: true, packets: true } },
    activeNodes: ["pm1", "pump", "abatement", "gasbox"],
    layers: {
      physical: [
        "PM에서 pump/foreline/exhaust/abatement로 이어지는 downstream path를 하나의 system으로 봅니다.",
        "Gas cabinet이나 gas box만 보는 것이 아니라 source-to-abatement walkdown mental model이 필요합니다."
      ],
      comm: [
        "Ready signal은 실제 local 상태와 다를 수 있습니다. owner witness와 trend evidence로 맞춥니다.",
        "Tool alarm, facility alarm, detector status, abatement ready를 같은 시간축으로 정렬합니다."
      ],
      boundary: [
        "Purge는 residual을 없애는 품질 단계이면서 다음 motion/gas state로 넘어가기 위한 안전 단계입니다.",
        "Toxic/corrosive/flammable gas family가 걸린 경우 SDS, EHS, gas owner, official procedure가 우선입니다."
      ],
      process: [
        "Wafer layer stack은 완성된 상태로 보존되어야 하며 residual/byproduct가 defect나 safety issue로 이어지지 않게 합니다.",
        "Purge/end state가 불명확하면 unload나 next wafer를 서두르지 않습니다."
      ],
      evidence: [
        "purge complete evidence, exhaust flow trend, abatement ready/actual, detector health, alarm history",
        "Stop: abatement not ready, detector unhealthy, unknown residual state, unresolved facility alarm"
      ]
    },
    report: "We are verifying purge completion and downstream exhaust/abatement readiness before declaring the module ready for the next transfer or baseline wafer.",
    teach: {
      question: "왜 purge/abatement를 공정 뒤의 부가 단계로 보면 안 될까?",
      choices: [
        ["residual/byproduct safety와 다음 wafer quality를 동시에 좌우하기 때문이다.", true, "맞습니다. 안전과 품질이 같은 path에 묶여 있습니다.", "purge-abatement"],
        ["wafer가 이미 나왔으므로 더 이상 중요하지 않다.", false, "위험합니다. residual과 downstream readiness가 다음 wafer와 안전에 영향을 줍니다.", "purge-abatement"],
        ["host 화면 ready만 보면 충분하다.", false, "actual facility/detector/abatement evidence와 함께 봐야 합니다.", "comm-actual"]
      ]
    }
  },
  {
    id: "qualification-handover",
    day: "Day 2",
    title: "Baseline wafer, metrology, handover",
    focus: "Qualification은 장비가 켜졌다는 선언이 아니라 wafer result, trace, safety readiness, open issue가 연결됐다는 handover입니다.",
    twin: { route: "epi-a", mode: "comm", step: 8, layers: { cutaway: false, pressure: true, particles: true, packets: true } },
    activeNodes: ["host", "toolpc", "pm1", "tm", "foup"],
    layers: {
      physical: [
        "Baseline wafer는 PM process, TM/LL transfer, return-to-FOUP까지 전체 chain을 검증하는 evidence carrier입니다.",
        "장비 구조는 physical path로 끝나지 않고 metrology와 customer acceptance discussion으로 이어집니다."
      ],
      comm: [
        "Wafer ID, process trace, metrology ID, alarm history, open punch가 하나의 handover packet이 됩니다.",
        "고객에게는 confirmed fact, risk, next action, owner, update time을 분리해 말합니다."
      ],
      boundary: [
        "Acceptance limit, recipe value, site-specific criteria는 공개 학습 자료가 아니라 공식 site document 영역입니다.",
        "CE는 임의로 기준을 만들지 않고 고객/OEM 승인 문서와 senior witness를 우선합니다."
      ],
      process: [
        "Thickness, uniformity, defect, Rs 같은 metrology는 gas/thermal/vacuum/handling trace와 연결해 해석합니다.",
        "한 장의 wafer 결과를 바로 원인으로 단정하지 말고 evidence chain으로 분해합니다."
      ],
      evidence: [
        "baseline wafer trace, metrology link, alarm history, facility readiness, punch list, owner/action/ETA",
        "Stop: traceability broken, acceptance basis unclear, safety readiness unresolved, customer signoff gap"
      ]
    },
    report: "Qualification status is being compiled from baseline wafer result, tool trace, alarm history, safety readiness, and open punch ownership. Acceptance basis will follow approved site and OEM documentation.",
    teach: {
      question: "handover에서 senior CE처럼 보이는 보고 방식은?",
      choices: [
        ["confirmed fact, remaining risk, evidence, owner, next action, ETA를 분리한다.", true, "맞습니다. 고객이 판단 가능한 구조로 말해야 합니다.", "handover"],
        ["결과가 대충 좋아 보이면 통과라고 말한다.", false, "위험합니다. acceptance basis와 traceability가 필요합니다.", "handover"],
        ["불확실한 acceptance limit을 공개자료로 단정한다.", false, "site-specific limit은 공식 승인 문서 영역입니다.", "site-specific"]
      ]
    }
  }
];

const epiMentalMapNodes = [
  ["host", "MES/EAP", "Host", 6, 13],
  ["toolpc", "Tool controller", "Scheduler", 22, 22],
  ["foup", "FOUP", "Carrier", 6, 58],
  ["lp", "Load Port", "Dock", 20, 57],
  ["efem", "EFEM/FI", "ATM robot", 35, 57],
  ["aligner", "Aligner", "Notch/center", 36, 79],
  ["lla", "Load Lock", "ATM-to-vac", 51, 47],
  ["tm", "TM", "Vacuum hub", 66, 52],
  ["preclean", "CM", "Pre-clean/cool", 67, 78],
  ["pm1", "EPI PM-A", "Growth", 83, 32],
  ["pm2", "EPI PM-B", "Matching", 88, 53],
  ["gasbox", "Gas box", "MFC/purge", 85, 9],
  ["pump", "Pump", "Foreline", 83, 74],
  ["abatement", "Abatement", "Exhaust", 94, 83]
];

function getActiveMentalFrame() {
  return epiMentalFrames.find(item => item.id === activeMentalFrame) || epiMentalFrames[0];
}

function getMentalStats() {
  const answers = state.epiMentalAnswers || {};
  const solved = Object.keys(answers).length;
  const correct = Object.values(answers).filter(item => item.correct).length;
  const weakness = Object.entries(state.epiMentalWeakness || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);
  return {
    solved,
    correct,
    score: solved ? Math.round((correct / solved) * 100) : 0,
    weakness
  };
}

function syncMentalFrameToTwin(frame, options = {}) {
  const twin = window.ProjectUniverseWebGLTwin;
  const status = document.querySelector("#epi-mental-sync-status");
  if (!twin) {
    if (status) status.textContent = "3D twin is still loading. Try again in a moment.";
    return false;
  }
  twin.pause?.();
  twin.setRoute?.(frame.twin.route);
  twin.setMode?.(frame.twin.mode);
  Object.entries(frame.twin.layers || {}).forEach(([layer, value]) => twin.setLayer?.(layer, value));
  twin.setStep?.(frame.twin.step);
  twin.setCamera?.("iso");
  if (status) status.textContent = `3D synced: ${frame.title}`;
  if (options.scroll !== false) {
    document.querySelector("#webgl-twin")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  return true;
}

function renderEpiMentalModelBuilder() {
  const root = document.querySelector("#epi-mental-builder");
  if (!root) return;
  const frame = getActiveMentalFrame();
  const layer = state.epiMentalLayer || "physical";
  const answer = state.epiMentalAnswers?.[frame.id];
  const stats = getMentalStats();
  const layerLabels = {
    physical: "Physical",
    comm: "Communication",
    boundary: "Vacuum/Gas",
    process: "Wafer Process",
    evidence: "CE Evidence"
  };
  const activeSet = new Set(frame.activeNodes);
  root.innerHTML = `
    <div class="mental-head">
      <div>
        <p class="eyebrow">Project Universe OS v7</p>
        <h2>EPI Mental Model Builder</h2>
        <p>FOUP, EFEM, Load Lock, TM, PM, gas box, pump, abatement, host communication을 한 단계씩 겹쳐 보며 머릿속 3D 모델을 만드는 훈련장입니다.</p>
      </div>
      <div class="mental-score">
        <span>Teach-back</span>
        <strong>${stats.score}%</strong>
        <small>${stats.correct}/${stats.solved || 0} correct</small>
      </div>
    </div>
    <div class="mental-frame-row" aria-label="EPI mental model frame selector">
      ${epiMentalFrames.map((item, index) => `
        <button type="button" class="${item.id === frame.id ? "active" : ""} ${state.epiMentalAnswers?.[item.id]?.correct ? "done" : ""}" data-mental-frame="${item.id}">
          <span>${String(index + 1).padStart(2, "0")}</span>
          <b>${item.day}</b>
          <strong>${item.title}</strong>
        </button>
      `).join("")}
    </div>
    <div class="mental-layout">
      <section class="mental-map-card">
        <div class="mental-map-head">
          <div>
            <p class="eyebrow">Equipment + Communication Map</p>
            <h3>${frame.title}</h3>
          </div>
          <button class="primary" type="button" data-mental-sync>3D twin sync</button>
        </div>
        <div class="mental-map" data-layer="${layer}">
          <svg class="mental-map-lines" viewBox="0 0 100 100" aria-hidden="true">
            <path d="M6 58 L20 57 L35 57 L51 47 L66 52 L83 32" class="${layer === "physical" || layer === "process" ? "active" : ""}" />
            <path d="M66 52 L88 53" class="${layer === "physical" ? "active" : ""}" />
            <path d="M66 52 L67 78" class="${layer === "physical" ? "active" : ""}" />
            <path d="M85 9 L83 32 L83 74 L94 83" class="${layer === "boundary" || layer === "process" ? "active gas" : ""}" />
            <path d="M6 13 L22 22 L20 57 L35 57 L51 47 L66 52 L83 32" class="${layer === "comm" ? "active comm" : ""}" />
          </svg>
          ${epiMentalMapNodes.map(([id, label, note, x, y]) => `
            <button type="button" class="mental-node ${activeSet.has(id) ? "active" : ""}" style="--x:${x}%; --y:${y}%;" data-node="${id}">
              <b>${label}</b>
              <span>${note}</span>
            </button>
          `).join("")}
        </div>
        <div class="mental-sync-status" id="epi-mental-sync-status">Select a frame or sync it to the 3D twin.</div>
      </section>
      <section class="mental-loop-card">
        <div class="mental-loop-head">
          <p class="eyebrow">${frame.day}</p>
          <h3>${frame.focus}</h3>
        </div>
        <div class="mental-layer-tabs" aria-label="mental model layer selector">
          ${Object.entries(layerLabels).map(([id, label]) => `
            <button type="button" class="${layer === id ? "active" : ""}" data-mental-layer="${id}">${label}</button>
          `).join("")}
        </div>
        <div class="mental-layer-panel">
          ${(frame.layers[layer] || []).map(item => `<p>${item}</p>`).join("")}
        </div>
        <div class="mental-report-card">
          <strong>Customer report sentence</strong>
          <p>${frame.report}</p>
        </div>
      </section>
    </div>
    <section class="mental-teachback">
      <div>
        <p class="eyebrow">Teach-back Drill</p>
        <h3>${frame.teach.question}</h3>
      </div>
      <div class="mental-choice-grid">
        ${frame.teach.choices.map(([text, correct], index) => `
          <button type="button" class="${answer && answer.selected === index ? "picked" : ""} ${answer && correct ? "good" : ""} ${answer && answer.selected === index && !correct ? "bad" : ""}" data-mental-choice="${index}">
            ${text}
          </button>
        `).join("")}
      </div>
      <p class="mental-feedback">${answer ? frame.teach.choices[answer.selected]?.[2] : "하나를 고르면 즉시 채점되고, 틀린 축은 weakness dashboard에 쌓입니다."}</p>
      <div class="mental-weakness">
        <strong>Weakness</strong>
        ${stats.weakness.length ? stats.weakness.map(([tag, count]) => `<span>${tag} ${count}</span>`).join("") : "<span>아직 누적 약점 없음</span>"}
        <small>Safety boundary: recipe, valve sequence, detector setpoint, interlock bypass, site-specific acceptance limit은 제외합니다.</small>
      </div>
    </section>
  `;

  root.querySelectorAll("[data-mental-frame]").forEach(button => {
    button.addEventListener("click", () => {
      activeMentalFrame = button.dataset.mentalFrame;
      state.activeMentalFrame = activeMentalFrame;
      persistState();
      renderEpiMentalModelBuilder();
      syncMentalFrameToTwin(getActiveMentalFrame(), { scroll: false });
    });
  });
  root.querySelectorAll("[data-mental-layer]").forEach(button => {
    button.addEventListener("click", () => {
      state.epiMentalLayer = button.dataset.mentalLayer;
      persistState();
      renderEpiMentalModelBuilder();
    });
  });
  root.querySelector("[data-mental-sync]")?.addEventListener("click", () => syncMentalFrameToTwin(frame));
  root.querySelectorAll("[data-mental-choice]").forEach(button => {
    button.addEventListener("click", () => {
      const selected = Number(button.dataset.mentalChoice);
      const choice = frame.teach.choices[selected];
      state.epiMentalAnswers = state.epiMentalAnswers || {};
      state.epiMentalAnswers[frame.id] = {
        selected,
        correct: Boolean(choice?.[1]),
        answeredAt: new Date().toISOString()
      };
      if (!choice?.[1]) {
        state.epiMentalWeakness = state.epiMentalWeakness || {};
        const tag = choice?.[3] || frame.id;
        state.epiMentalWeakness[tag] = (state.epiMentalWeakness[tag] || 0) + 1;
      }
      persistState();
      renderEpiMentalModelBuilder();
    });
  });
}

const ceIncidentCases = [
  {
    id: "ll-slow-pumpdown",
    title: "Load Lock pumpdown slow",
    subsystem: "Vacuum / Load Lock",
    severity: "Hold before transfer",
    symptom: "LL pumpdown trend가 baseline보다 느리고 TM pickup gate가 열리지 않습니다.",
    twin: { route: "epi-a", mode: "vacuum", step: 3, layers: { cutaway: true, pressure: true, particles: true, packets: true } },
    process: { flow: "epi-sige", step: 0 },
    timeline: [
      ["T0", "Wafer in LL", "EFEM side handoff complete, TM side still closed"],
      ["T1", "Pumpdown starts", "Pressure falls, then slope becomes shallow"],
      ["T2", "Scheduler waits", "TM pickup permissive does not arrive"],
      ["T3", "CE decision", "Separate leak, outgassing, gauge, pump, door seal evidence"]
    ],
    cards: [
      ["risk", "risk-vacuum", "Vacuum integrity risk", "Pressure boundary is not proven, so TM transfer is not safe yet.", true],
      ["risk", "risk-recipe", "Recipe correction", "Changing recipe is not the first action and is outside this evidence gate.", false],
      ["subsystem", "sub-ll", "Load Lock seal/door", "Door seal, slit feedback, chamber isolation are primary candidates.", true],
      ["subsystem", "sub-pm", "EPI PM chemistry", "PM chemistry cannot explain pumpdown before PM entry.", false],
      ["evidence", "ev-curve", "Pumpdown curve", "Compare pressure slope, plateau, elapsed time, and previous baseline.", true],
      ["evidence", "ev-gauge", "Gauge agreement", "Check whether gauges and controller state tell the same story.", true],
      ["evidence", "ev-exhaust", "Pump/exhaust status", "Pump path and exhaust readiness are part of the boundary.", true],
      ["evidence", "ev-thickness", "Film thickness", "There is no processed film yet, so this is not the first evidence.", false],
      ["stop", "stop-pressure", "Stop transfer", "Hold before TM pickup until pressure boundary is defensible.", true],
      ["report", "rep-clear", "Customer wording", "State confirmed symptom, risk, evidence being checked, and next update time.", true]
    ],
    decision: [
      ["Hold transfer and compare pumpdown curve, gauge agreement, door/slit feedback, and pump/exhaust status.", true, "맞습니다. pressure boundary가 증명되기 전에는 transfer를 진행하지 않습니다.", "vacuum-boundary"],
      ["Pressure가 천천히라도 내려가면 PM으로 보내서 공정 결과를 본다.", false, "위험합니다. transfer vacuum boundary가 불명확하면 wafer move 자체가 stop condition입니다.", "unsafe-go"],
      ["Recipe parameter를 낮춰서 pumpdown 영향을 줄인다.", false, "recipe는 원인 분리 전 접근할 영역이 아니며 공개 학습 범위에서도 제외됩니다.", "unsafe-recipe"]
    ],
    reportTemplate: "Confirmed symptom: LL pumpdown is slower than expected and TM pickup permissive is not reached. Immediate risk: vacuum boundary is not proven. Current checks: pressure trend, gauge agreement, door/slit feedback, and pump/exhaust status. Next update: after evidence comparison with owner witness.",
    prevention: "Keep a baseline pumpdown signature by LL, record gauge/pump/exhaust evidence together, and never treat a single ready bit as the whole boundary."
  },
  {
    id: "efem-slot-mismatch",
    title: "EFEM slot map mismatch",
    subsystem: "EFEM / Host traceability",
    severity: "Hold before wafer movement",
    symptom: "Carrier ID는 들어왔지만 slot map 또는 wafer present transition이 host expectation과 맞지 않습니다.",
    twin: { route: "epi-a", mode: "comm", step: 0, layers: { cutaway: false, pressure: true, particles: true, packets: true } },
    process: { flow: "epi-sige", step: 0 },
    timeline: [
      ["T0", "Carrier dock", "Load port sees carrier present"],
      ["T1", "Slot map read", "Tool/host context disagrees"],
      ["T2", "Move request waits", "Scheduler cannot trust wafer identity"],
      ["T3", "CE decision", "Freeze movement and protect traceability"]
    ],
    cards: [
      ["risk", "risk-trace", "Traceability break", "Wrong wafer identity can poison every later trace and metrology link.", true],
      ["risk", "risk-low", "Low risk", "It is not low risk; identity mismatch is a hold condition.", false],
      ["subsystem", "sub-loadport", "Load port / FOUP", "Carrier present, clamp, door, slot map state are primary evidence.", true],
      ["subsystem", "sub-gas", "Gas box", "Gas box is not the first subsystem before wafer move.", false],
      ["evidence", "ev-carrier", "Carrier ID and slot map", "Compare host expectation, tool readback, and event timestamp.", true],
      ["evidence", "ev-present", "Wafer present transition", "Sensor transition order can reveal mapping or handling ambiguity.", true],
      ["evidence", "ev-host", "Host job permission", "Job context must match carrier and wafer identity.", true],
      ["stop", "stop-move", "Stop movement", "Do not move an ambiguous wafer into LL or PM.", true],
      ["report", "rep-fact", "Fact-first report", "Report mismatch as a traceability hold, not as a process delay excuse.", true]
    ],
    decision: [
      ["Hold wafer movement and reconcile host expectation, carrier ID, slot map, and wafer-present transitions.", true, "맞습니다. traceability가 먼저입니다.", "traceability"],
      ["Move the wafer and fix the slot map after processing.", false, "위험합니다. 후처리로 복구하기 어렵고 고객 보고 신뢰가 깨집니다.", "traceability"],
      ["PM matching wafer로 대체한다.", false, "잘못된 우회입니다. identity problem은 대체 wafer 문제가 아닙니다.", "unsafe-workaround"]
    ],
    reportTemplate: "Confirmed symptom: carrier or slot context does not match expected job information. Immediate risk: wafer traceability is not defensible. We are holding wafer movement while checking carrier ID, slot map, wafer-present transitions, and host permission.",
    prevention: "Treat ID, slot, event timestamp, and wafer present transition as one traceability packet before the first wafer move."
  },
  {
    id: "tm-wafer-present-conflict",
    title: "TM wafer-present conflict",
    subsystem: "Transfer Module / Robot",
    severity: "Stop motion",
    symptom: "TM move 이후 source/destination wafer-present state가 예상과 다르게 남아 있습니다.",
    twin: { route: "epi-a", mode: "material", step: 5, layers: { cutaway: true, pressure: true, particles: true, packets: true } },
    process: { flow: "epi-sige", step: 2 },
    timeline: [
      ["T0", "TM pickup", "Robot extends to LL or PM"],
      ["T1", "Handoff event", "Source and destination sensors should transition"],
      ["T2", "Conflict", "Wafer-present state is inconsistent"],
      ["T3", "CE decision", "Stop motion and preserve evidence"]
    ],
    cards: [
      ["risk", "risk-breakage", "Wafer damage risk", "Repeated motion can turn ambiguity into wafer damage.", true],
      ["subsystem", "sub-robot", "Robot/slot/slit", "Robot position, slit state, and wafer present are the first split.", true],
      ["subsystem", "sub-metrology", "Metrology tool", "Metrology is downstream and cannot explain immediate handoff conflict.", false],
      ["evidence", "ev-event", "Event order", "Compare extend/retract, slit, source/destination present transitions.", true],
      ["evidence", "ev-robot", "Robot position actual", "Do not rely on command state alone.", true],
      ["evidence", "ev-door", "Slit valve permissive", "Motion boundary and vacuum boundary must both be clear.", true],
      ["stop", "stop-motion", "Stop repeated moves", "Do not jog or retry without approved recovery path.", true],
      ["report", "rep-owner", "Escalation owner", "Name the owner needed for robot/wafer recovery decision.", true]
    ],
    decision: [
      ["Stop repeated motion, preserve event order, check robot actual, slit state, and wafer-present transitions.", true, "맞습니다. motion recovery는 evidence와 승인 절차가 우선입니다.", "robot-handoff"],
      ["Repeat the same move until the sensor clears.", false, "위험합니다. wafer contact/damage 가능성이 커집니다.", "unsafe-motion"],
      ["Ignore source sensor if destination sensor is on.", false, "source/destination disagreement 자체가 핵심 증상입니다.", "sensor-conflict"]
    ],
    reportTemplate: "Confirmed symptom: TM wafer-present state is inconsistent after handoff. Immediate risk: repeated motion may damage the wafer. We are holding motion and preserving event order while checking robot actual position, slit state, and source/destination sensor transitions.",
    prevention: "Build recovery habits around event order and actual-state evidence, not repeated command attempts."
  },
  {
    id: "gas-readiness-abatement",
    title: "Gas readiness with abatement uncertainty",
    subsystem: "Gas / Exhaust / Abatement",
    severity: "Stop before first gas",
    symptom: "Tool side appears ready, but exhaust or abatement actual readiness is uncertain before first gas introduction.",
    twin: { route: "epi-a", mode: "gas", step: 6, layers: { cutaway: true, pressure: true, particles: true, packets: true } },
    process: { flow: "epi-sige", step: 3 },
    timeline: [
      ["T0", "Gas readiness review", "Tool gas panel status looks green"],
      ["T1", "Facility uncertainty", "Exhaust/abatement actual state is not witnessed"],
      ["T2", "First gas gate", "Safety chain must be proven before introduction"],
      ["T3", "CE decision", "Hold and call gas/facility/EHS owner"]
    ],
    cards: [
      ["risk", "risk-gas", "Hazardous gas path", "Gas source-to-abatement path must be defensible.", true],
      ["risk", "risk-production", "Schedule pressure", "Schedule pressure is not evidence.", false],
      ["subsystem", "sub-gasbox", "Gas box / MFC", "Gas delivery readiness is one part of the path.", true],
      ["subsystem", "sub-abatement", "Exhaust / Abatement", "Downstream actual state is a first-gas gate.", true],
      ["evidence", "ev-owner", "Owner witness", "Facility/gas/EHS owner confirmation matters.", true],
      ["evidence", "ev-detector", "Detector health", "Detector/monitor state is part of readiness.", true],
      ["evidence", "ev-sds", "SDS and gas family", "Toxic/flammable/corrosive/inert family changes controls.", true],
      ["stop", "stop-firstgas", "Stop first gas", "No first gas without safety chain evidence.", true],
      ["report", "rep-boundary", "Boundary language", "Say what is confirmed and what is not yet witnessed.", true]
    ],
    decision: [
      ["Hold first gas and verify gas family, detector health, exhaust/abatement actual, and owner witness.", true, "맞습니다. first gas는 safety chain evidence가 먼저입니다.", "gas-safety"],
      ["Tool side ready is enough, so proceed and monitor alarms.", false, "위험합니다. downstream readiness를 알람으로 시험하면 안 됩니다.", "unsafe-gas"],
      ["Detector setpoint를 임의로 낮춰 민감하게 만든다.", false, "detector setpoint는 공식 승인 영역이며 임의 조정하면 안 됩니다.", "unsafe-setpoint"]
    ],
    reportTemplate: "Confirmed symptom: tool-side gas readiness is visible, but downstream exhaust/abatement actual readiness is not yet witnessed. Immediate risk: first gas introduction is not defensible. We are holding first gas until gas family, detector health, exhaust/abatement actual, and owner witness are confirmed.",
    prevention: "Use source-to-abatement readiness checklists and keep gas/facility/EHS signoff evidence linked to first gas."
  },
  {
    id: "pm-a-b-mismatch",
    title: "PM-A / PM-B baseline mismatch",
    subsystem: "Process Module / Shared utilities",
    severity: "Hold qualification claim",
    symptom: "Baseline wafer result shows PM-A and PM-B thickness or uniformity trend mismatch.",
    twin: { route: "epi-b", mode: "gas", step: 6, layers: { cutaway: true, pressure: true, particles: true, packets: true } },
    process: { flow: "epi-sige", step: 4 },
    timeline: [
      ["T0", "Baseline wafers", "PM-A and PM-B run comparable checks"],
      ["T1", "Metrology result", "Mismatch appears"],
      ["T2", "Evidence split", "Shared facility vs module-local drift"],
      ["T3", "CE decision", "Do not claim matching until evidence separates cause"]
    ],
    cards: [
      ["risk", "risk-qual", "Qualification risk", "Mismatch can invalidate handover claim.", true],
      ["subsystem", "sub-shared", "Shared gas/pressure/thermal reference", "Shared utilities can affect both modules differently through delivery path.", true],
      ["subsystem", "sub-local", "Module-local condition", "PM wall condition, temperature trace, local pressure response are candidates.", true],
      ["evidence", "ev-metrology", "Metrology association", "Wafer ID, PM ID, trace ID, and metrology ID must match.", true],
      ["evidence", "ev-trace", "Trace comparison", "Compare MFC actual, pressure, temperature, exhaust state by PM.", true],
      ["evidence", "ev-single", "One wafer conclusion", "One wafer is a signal, not a full cause conclusion.", false],
      ["stop", "stop-handover", "Hold handover claim", "Do not call qualification complete until mismatch is bounded.", true],
      ["report", "rep-compare", "Compare language", "Report as shared-vs-local evidence split, not guesswork.", true]
    ],
    decision: [
      ["Hold qualification claim and compare PM-specific trace, shared utility evidence, and metrology linkage.", true, "맞습니다. mismatch는 shared/local split으로 봐야 합니다.", "module-matching"],
      ["좋은 PM 결과만 고객에게 보여주고 나머지는 나중에 본다.", false, "위험합니다. handover 신뢰를 깨는 방식입니다.", "handover"],
      ["Recipe를 PM별로 임의 보정한다.", false, "recipe 보정은 공식 절차와 process owner 영역입니다.", "unsafe-recipe"]
    ],
    reportTemplate: "Confirmed symptom: baseline result differs between PM-A and PM-B. Immediate risk: qualification matching is not yet defensible. We are comparing PM-specific trace, shared utility evidence, chamber condition indicators, and metrology linkage before making a handover claim.",
    prevention: "Keep module matching packets by PM: trace, metrology, chamber state, shared utility status, and open issue owner."
  },
  {
    id: "thermal-trace-unstable",
    title: "RTP / thermal trace instability",
    subsystem: "Thermal / Sensor confidence",
    severity: "Hold thermal qualification",
    symptom: "Ramp/soak/cool trace or pyrometry confidence appears unstable during thermal qualification.",
    twin: { route: "rtp", mode: "gas", step: 6, layers: { cutaway: true, pressure: true, particles: true, packets: true } },
    process: { flow: "rtp-ambient", step: 2 },
    timeline: [
      ["T0", "Thermal run", "Ramp or soak starts"],
      ["T1", "Trace anomaly", "Temperature confidence or zone behavior looks unstable"],
      ["T2", "Wafer risk", "Thermal budget and wafer damage risk rise"],
      ["T3", "CE decision", "Separate sensor confidence from actual thermal behavior"]
    ],
    cards: [
      ["risk", "risk-thermal", "Thermal budget risk", "Unstable trace can affect wafer stress, activation, or uniformity.", true],
      ["subsystem", "sub-pyro", "Pyrometry / sensor path", "Sensor confidence is not the same as actual wafer result.", true],
      ["subsystem", "sub-lamp", "Lamp zone / thermal hardware", "Zone behavior and control trace are relevant.", true],
      ["evidence", "ev-ramp", "Ramp/soak/cool trace", "Use the whole time trace, not a single value.", true],
      ["evidence", "ev-wafer", "Wafer result link", "Metrology or visual result must link to trace ID.", true],
      ["evidence", "ev-gas", "Ambient readiness", "Ambient gas and pressure state can affect thermal process context.", true],
      ["stop", "stop-thermal", "Hold qualification", "Do not qualify if thermal trace confidence is unresolved.", true],
      ["report", "rep-thermal", "Trace language", "Separate observed trace from suspected hardware cause.", true]
    ],
    decision: [
      ["Hold thermal qualification and compare ramp/soak/cool trace, sensor confidence, lamp zone behavior, and wafer result link.", true, "맞습니다. thermal issue는 time trace로 봐야 합니다.", "thermal-trace"],
      ["Peak temperature만 맞으면 나머지는 무시한다.", false, "위험합니다. ramp/soak/cool 전체 thermal budget이 중요합니다.", "thermal-trace"],
      ["Sensor를 bypass하고 wafer 결과만 본다.", false, "interlock/bypass는 위험 정보 영역이며 허용되지 않습니다.", "unsafe-bypass"]
    ],
    reportTemplate: "Confirmed symptom: thermal trace confidence is unstable during qualification. Immediate risk: thermal budget and wafer result are not yet defensible. We are comparing ramp/soak/cool trace, sensor confidence, lamp zone behavior, ambient readiness, and wafer result linkage.",
    prevention: "Review thermal qualification as a time-series packet, not a single peak value."
  },
  {
    id: "particle-after-pm",
    title: "Particle excursion after PM recovery",
    subsystem: "Maintenance / Chamber condition",
    severity: "Hold release",
    symptom: "PM recovery 또는 seasoning 이후 particle count가 baseline보다 높게 나옵니다.",
    twin: { route: "epi-a", mode: "material", step: 7, layers: { cutaway: true, pressure: true, particles: true, packets: true } },
    process: { flow: "selective-sd", step: 6 },
    timeline: [
      ["T0", "PM recovery", "Maintenance or seasoning completed"],
      ["T1", "Baseline wafer", "Particle result is high"],
      ["T2", "Source split", "Handling, chamber, purge/exhaust, metrology path must be separated"],
      ["T3", "CE decision", "Hold release until source is bounded"]
    ],
    cards: [
      ["risk", "risk-particle", "Yield / contamination risk", "Particle excursion can be release-blocking.", true],
      ["subsystem", "sub-chamber", "Chamber condition", "Recent PM/recovery/seasoning can affect particles.", true],
      ["subsystem", "sub-handling", "Handling path", "FOUP/EFEM/TM contact or return path can also contribute.", true],
      ["evidence", "ev-particlemap", "Particle map", "Map pattern can hint chamber vs handling source.", true],
      ["evidence", "ev-history", "Maintenance history", "What changed since last baseline matters.", true],
      ["evidence", "ev-purge", "Purge/exhaust state", "Residual or poor purge can show as particle/contamination issue.", true],
      ["stop", "stop-release", "Hold release", "Do not release on a failed baseline without bounded source.", true],
      ["report", "rep-prevention", "Prevention owner", "Report action owner and repeat check path.", true]
    ],
    decision: [
      ["Hold release and compare particle map, maintenance change, handling path, purge/exhaust evidence, and repeat baseline plan.", true, "맞습니다. particle은 chamber-only로 단정하지 않습니다.", "particle-source"],
      ["한 번 더 돌리면 낮아질 수 있으니 고객 wafer로 확인한다.", false, "위험합니다. failed baseline 뒤 고객 wafer 투입은 좋지 않습니다.", "unsafe-wafer"],
      ["Metrology가 틀렸다고 가정하고 무시한다.", false, "metrology도 검증해야 하지만 무시가 아니라 evidence split입니다.", "metrology"]
    ],
    reportTemplate: "Confirmed symptom: particle result is above baseline after PM recovery. Immediate risk: release quality is not defensible. We are holding release while comparing particle map, maintenance change history, handling path, purge/exhaust evidence, and repeat baseline plan.",
    prevention: "Tie every PM recovery to seasoning, baseline wafer, particle map, changed-parts history, and release owner."
  },
  {
    id: "host-tool-state-gap",
    title: "Host ready vs module actual gap",
    subsystem: "Controls / Communication",
    severity: "Hold automatic action",
    symptom: "Host or UI shows ready, but module actual state or alarm/event order does not support the ready claim.",
    twin: { route: "epi-a", mode: "comm", step: 8, layers: { cutaway: false, pressure: true, particles: true, packets: true } },
    process: { flow: "epi-sige", step: 6 },
    timeline: [
      ["T0", "Ready indication", "High-level UI looks green"],
      ["T1", "Actual mismatch", "Module event or alarm history conflicts"],
      ["T2", "Action request", "Automatic move or process start is requested"],
      ["T3", "CE decision", "Use actual-state evidence before action"]
    ],
    cards: [
      ["risk", "risk-state", "State mismatch risk", "Command state and actual state are not always identical.", true],
      ["subsystem", "sub-controller", "Tool controller / module I/O", "Actual module state is the evidence layer.", true],
      ["subsystem", "sub-ui", "UI display only", "UI is useful but not the whole evidence set.", true],
      ["evidence", "ev-alarm", "Alarm/event order", "Sequence tells whether ready is stale, derived, or current.", true],
      ["evidence", "ev-module", "Module actual", "Pressure, door, robot, gas, thermal actuals must agree.", true],
      ["evidence", "ev-permission", "Host permission", "Host permission must align with tool actual.", true],
      ["stop", "stop-auto", "Hold automatic action", "Do not let automation move faster than evidence.", true],
      ["report", "rep-state", "State wording", "Say ready indication is not yet backed by module actual evidence.", true]
    ],
    decision: [
      ["Hold automatic action and reconcile host permission, UI ready, module actual, and alarm/event order.", true, "맞습니다. senior CE는 ready bit보다 state chain을 봅니다.", "controls-state"],
      ["UI가 green이면 actual mismatch는 무시한다.", false, "위험합니다. stale/derived state일 수 있습니다.", "comm-actual"],
      ["Interlock을 우회해서 actual state를 맞춘다.", false, "interlock bypass는 절대 다루지 않는 위험 영역입니다.", "unsafe-bypass"]
    ],
    reportTemplate: "Confirmed symptom: high-level ready indication is not yet supported by module actual state or event order. Immediate risk: automated action is not defensible. We are holding action while reconciling host permission, UI indication, module actuals, and alarm/event sequence.",
    prevention: "Teach every ready signal as a state-chain question: who says ready, based on which actuals, at what timestamp?"
  }
];

function getActiveIncidentCase() {
  return ceIncidentCases.find(item => item.id === activeIncidentCase) || ceIncidentCases[0];
}

function getIncidentStats() {
  const answers = state.ceIncidentAnswers || {};
  const solved = Object.keys(answers).length;
  const correct = Object.values(answers).filter(item => item.correct).length;
  const weakness = Object.entries(state.ceIncidentWeakness || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  return {
    solved,
    correct,
    score: solved ? Math.round((correct / solved) * 100) : 0,
    weakness
  };
}

function groupIncidentCards(cards) {
  return cards.reduce((groups, card) => {
    const [lane] = card;
    groups[lane] = groups[lane] || [];
    groups[lane].push(card);
    return groups;
  }, {});
}

function scoreIncidentEvidence(item) {
  const selected = new Set(state.ceIncidentBoard?.[item.id] || []);
  const required = item.cards.filter(card => card[4]).map(card => card[1]);
  const wrong = item.cards.filter(card => !card[4] && selected.has(card[1])).map(card => card[1]);
  const hits = required.filter(id => selected.has(id)).length;
  const pct = required.length ? Math.max(0, Math.round(((hits - wrong.length) / required.length) * 100)) : 0;
  return { selected, required, wrong, hits, pct };
}

function syncIncidentToTwin(item, options = {}) {
  const twin = window.ProjectUniverseWebGLTwin;
  const status = document.querySelector("#ce-incident-sync-status");
  if (!twin) {
    if (status) status.textContent = "3D twin is still loading. Try again in a moment.";
    return false;
  }
  twin.pause?.();
  twin.setRoute?.(item.twin.route);
  twin.setMode?.(item.twin.mode);
  Object.entries(item.twin.layers || {}).forEach(([layer, value]) => twin.setLayer?.(layer, value));
  twin.setStep?.(item.twin.step);
  twin.setCamera?.("iso");
  if (item.process) {
    activeProcessFlow = item.process.flow;
    activeProcessStep = item.process.step;
  }
  if (status) status.textContent = `3D synced: ${item.title}`;
  if (options.scroll !== false) {
    document.querySelector("#webgl-twin")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  return true;
}

function renderCeIncidentKernel() {
  const root = document.querySelector("#ce-incident-kernel");
  if (!root) return;
  const item = getActiveIncidentCase();
  const stats = getIncidentStats();
  const evidence = scoreIncidentEvidence(item);
  const grouped = groupIncidentCards(item.cards);
  const answer = state.ceIncidentAnswers?.[item.id];
  const report = state.ceIncidentReports?.[item.id];
  const laneLabels = {
    risk: "Risk",
    subsystem: "Subsystem",
    evidence: "Evidence",
    stop: "Stop",
    report: "Report"
  };
  root.innerHTML = `
    <div class="incident-head">
      <div>
        <p class="eyebrow">Project Universe OS v8</p>
        <h2>CE Incident Kernel</h2>
        <p>증상 하나를 받으면 3D 상태를 맞추고, 위험도, subsystem, evidence, stop condition, 고객 보고 문장을 고르는 fault-injection 훈련장입니다.</p>
      </div>
      <div class="incident-score">
        <span>Incident score</span>
        <strong>${stats.score}%</strong>
        <small>${stats.correct}/${stats.solved || 0} correct · evidence ${evidence.hits}/${evidence.required.length}</small>
      </div>
    </div>
    <div class="incident-case-row" aria-label="incident case selector">
      ${ceIncidentCases.map((entry, index) => {
        const saved = state.ceIncidentAnswers?.[entry.id];
        return `
          <button type="button" class="${entry.id === item.id ? "active" : ""} ${saved?.correct ? "done" : saved ? "review" : ""}" data-incident-case="${entry.id}">
            <span>${String(index + 1).padStart(2, "0")}</span>
            <b>${entry.subsystem}</b>
            <strong>${entry.title}</strong>
            <small>${entry.severity}</small>
          </button>
        `;
      }).join("")}
    </div>
    <div class="incident-layout">
      <section class="incident-brief">
        <div class="incident-title">
          <span>${item.severity}</span>
          <h3>${item.title}</h3>
          <p>${item.symptom}</p>
        </div>
        <div class="incident-timeline">
          ${item.timeline.map(([time, label, text]) => `
            <article>
              <b>${time}</b>
              <strong>${label}</strong>
              <p>${text}</p>
            </article>
          `).join("")}
        </div>
        <div class="incident-sync-row">
          <button class="primary" type="button" data-incident-sync>3D fault sync</button>
          <button class="secondary" type="button" data-incident-sync-flow>3D + process sync</button>
          <span id="ce-incident-sync-status">Sync this incident to the 3D twin before deciding.</span>
        </div>
      </section>
      <section class="incident-decision">
        <p class="eyebrow">Stop / Go Decision</p>
        <h3>첫 판단은 무엇인가?</h3>
        <div class="incident-choice-grid">
          ${item.decision.map(([text, good], index) => `
            <button type="button" class="${answer && answer.selected === index ? "picked" : ""} ${answer && good ? "good" : ""} ${answer && answer.selected === index && !good ? "bad" : ""}" data-incident-choice="${index}">
              ${text}
            </button>
          `).join("")}
        </div>
        <p class="incident-feedback">${answer ? item.decision[answer.selected]?.[2] : "선택하면 즉시 채점하고 틀린 사고축을 weakness에 누적합니다."}</p>
        <div class="incident-prevention">
          <strong>Prevention habit</strong>
          <p>${item.prevention}</p>
        </div>
      </section>
    </div>
    <section class="incident-board" aria-label="incident evidence board">
      <div class="incident-board-head">
        <div>
          <p class="eyebrow">Evidence Board</p>
          <h3>사실을 골라 사고 흐름을 구성하세요</h3>
        </div>
        <span class="${evidence.pct >= 80 && !evidence.wrong.length ? "ready" : ""}">${evidence.pct}% evidence</span>
      </div>
      <div class="incident-lanes">
        ${Object.entries(grouped).map(([lane, cards]) => `
          <article>
            <strong>${laneLabels[lane] || lane}</strong>
            ${cards.map(([, id, label, text, good]) => `
              <button type="button" class="${evidence.selected.has(id) ? "selected" : ""} ${!good && evidence.selected.has(id) ? "wrong" : ""}" data-incident-evidence="${id}">
                <b>${label}</b>
                <span>${text}</span>
              </button>
            `).join("")}
          </article>
        `).join("")}
      </div>
    </section>
    <section class="incident-report-lab">
      <div>
        <p class="eyebrow">Customer Report Coach</p>
        <h3>보고 문장을 직접 작성하고 구조를 점검하세요</h3>
      </div>
      <textarea id="incident-report-input" placeholder="Confirmed symptom / immediate risk / evidence being checked / owner / next update를 포함해 작성">${report?.text || item.reportTemplate}</textarea>
      <div class="incident-report-actions">
        <button class="primary" type="button" data-incident-report-save>보고문 평가 저장</button>
        <span id="incident-report-feedback">${report?.feedback || "아직 저장된 평가 없음"}</span>
      </div>
    </section>
    <div class="incident-weakness">
      <strong>Weakness top</strong>
      ${stats.weakness.length ? stats.weakness.map(([tag, count]) => `<span>${tag} ${count}</span>`).join("") : "<span>아직 누적 약점 없음</span>"}
      <small>Safety boundary: recipe, valve sequence, detector setpoint, interlock bypass, site-specific acceptance limit, customer confidential procedure는 제외합니다.</small>
    </div>
  `;

  root.querySelectorAll("[data-incident-case]").forEach(button => {
    button.addEventListener("click", () => {
      activeIncidentCase = button.dataset.incidentCase;
      state.activeIncidentCase = activeIncidentCase;
      persistState();
      renderCeIncidentKernel();
      syncIncidentToTwin(getActiveIncidentCase(), { scroll: false });
    });
  });
  root.querySelector("[data-incident-sync]")?.addEventListener("click", () => syncIncidentToTwin(item));
  root.querySelector("[data-incident-sync-flow]")?.addEventListener("click", () => {
    syncIncidentToTwin(item, { scroll: false });
    renderProcessVisual();
    document.querySelector("#webgl-twin")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
  root.querySelectorAll("[data-incident-evidence]").forEach(button => {
    button.addEventListener("click", () => {
      const id = button.dataset.incidentEvidence;
      state.ceIncidentBoard = state.ceIncidentBoard || {};
      const selected = new Set(state.ceIncidentBoard[item.id] || []);
      if (selected.has(id)) selected.delete(id);
      else selected.add(id);
      state.ceIncidentBoard[item.id] = [...selected];
      persistState();
      renderCeIncidentKernel();
    });
  });
  root.querySelectorAll("[data-incident-choice]").forEach(button => {
    button.addEventListener("click", () => {
      const selected = Number(button.dataset.incidentChoice);
      const choice = item.decision[selected];
      state.ceIncidentAnswers = state.ceIncidentAnswers || {};
      state.ceIncidentAnswers[item.id] = {
        selected,
        correct: Boolean(choice?.[1]),
        subsystem: item.subsystem,
        answeredAt: new Date().toISOString()
      };
      if (!choice?.[1]) {
        state.ceIncidentWeakness = state.ceIncidentWeakness || {};
        const tag = choice?.[3] || item.subsystem;
        state.ceIncidentWeakness[tag] = (state.ceIncidentWeakness[tag] || 0) + 1;
      }
      persistState();
      renderCeIncidentKernel();
    });
  });
  root.querySelector("[data-incident-report-save]")?.addEventListener("click", () => {
    const text = root.querySelector("#incident-report-input")?.value.trim() || "";
    const required = ["symptom", "risk", "evidence", "owner", "next", "update", "confirmed", "stop", "hold", "확인", "위험", "증거", "다음", "보류", "중지"];
    const hits = required.filter(word => text.toLowerCase().includes(word.toLowerCase())).length;
    const feedback = text.length < 50
      ? "너무 짧습니다. confirmed symptom, risk, evidence, owner, next update를 분리해 작성하세요."
      : hits >= 5
        ? "좋습니다. fact/risk/evidence/owner/next update 구조가 보입니다."
        : "보강 필요: 확인된 사실, 즉시 위험, 확인 중인 evidence, owner, 다음 update 시간이 빠졌는지 보세요.";
    state.ceIncidentReports = state.ceIncidentReports || {};
    state.ceIncidentReports[item.id] = {
      text,
      feedback,
      savedAt: new Date().toISOString()
    };
    if (hits < 5) {
      state.ceIncidentWeakness = state.ceIncidentWeakness || {};
      state.ceIncidentWeakness["customer-report"] = (state.ceIncidentWeakness["customer-report"] || 0) + 1;
    }
    persistState();
    renderCeIncidentKernel();
  });
}

const epiMasterSteps = [
  {
    stage: "01",
    title: "FOUP 도킹과 slot map",
    active: "efem",
    wafer: [7, 42],
    moduleState: "FOUP이 load port에 앉고 EFEM이 carrier ID, slot map, door open 가능 상태를 확인합니다.",
    waferState: "웨이퍼는 아직 대기압 mini-environment 안에 있습니다. 막 성장은 시작되지 않았습니다.",
    gases: ["N2 purge", "CDA", "none"],
    toolState: ["대기압", "EFEM robot ready", "host/carrier handshake"],
    gasState: "공정가스가 아니라 FOUP/EFEM purge와 대기압 handling 안정성이 핵심입니다.",
    hazard: "N2/Ar 같은 inert gas도 산소결핍과 압력 에너지 위험이 있습니다. carrier handoff는 SEMI E84/E87/host 상태와 site rule을 우선합니다.",
    evidence: ["carrier ID와 slot map 일치", "load port clamp/door 상태", "AMHS/host handoff alarm 없음"],
    layers: [["Si wafer", "bare or patterned substrate", "#72808c", 42]],
    sourceTag: "FOUP/EFEM/SEMI E84 공개 개념"
  },
  {
    stage: "02",
    title: "EFEM pick, align, Load Lock 투입",
    active: "loadlock",
    wafer: [24, 42],
    moduleState: "EFEM robot이 wafer를 꺼내 aligner를 거쳐 load lock에 전달합니다.",
    waferState: "wafer ID와 orientation이 맞아야 이후 chamber fault를 잘못 의심하지 않습니다.",
    gases: ["N2", "clean dry air", "vacuum standby"],
    toolState: ["대기압 -> LL boundary", "door interlock", "wafer present sensor"],
    gasState: "load lock은 대기압과 vacuum mainframe 사이의 오염/압력 경계입니다.",
    hazard: "door/slit/robot 상태가 불명확하면 반복 transfer를 하지 않습니다. wafer edge contact나 scrape 의심은 즉시 hold입니다.",
    evidence: ["align repeatability", "wafer present sensor", "LL door/slit valve permissive"],
    layers: [["Si wafer", "surface before pre-clean", "#72808c", 42], ["native oxide/contamination", "remove target", "#b7c5ce", 7]],
    sourceTag: "cluster tool 공개 구조"
  },
  {
    stage: "03",
    title: "Load Lock pumpdown",
    active: "loadlock",
    wafer: [38, 48],
    moduleState: "LL이 pumpdown되어 TM과 압력 조건을 맞춥니다. pressure boundary가 맞아야 slit valve가 열립니다.",
    waferState: "웨이퍼 표면은 아직 성장 전입니다. 이 단계는 오염 없이 vacuum side로 넘기기 위한 준비입니다.",
    gases: ["N2 vent/purge", "vacuum", "exhaust"],
    toolState: ["pump ON", "pressure falling", "TM handoff ready"],
    gasState: "pump exhaust와 abatement/readiness가 경로상에서 확인되어야 합니다.",
    hazard: "pumpdown curve가 baseline과 다르거나 pressure gauge가 불일치하면 process gas introduction으로 넘어가지 않습니다.",
    evidence: ["pumpdown curve", "pressure gauge trend", "door/slit seal 상태"],
    layers: [["Si wafer", "vacuum transfer ready", "#72808c", 42], ["native oxide/contamination", "pre-clean target", "#b7c5ce", 7]],
    sourceTag: "load lock/vacuum 공개 개념"
  },
  {
    stage: "04",
    title: "TM robot -> pre-clean/PM handoff",
    active: "tm",
    wafer: [53, 42],
    moduleState: "Transfer Module robot이 load lock에서 wafer를 받아 pre-clean 또는 EPI PM으로 이동시킵니다.",
    waferState: "vacuum break 없이 pre-clean과 EPI를 연결하면 계면 오염과 queue time을 줄이는 방향입니다.",
    gases: ["vacuum", "N2/Ar support", "none"],
    toolState: ["TM vacuum stable", "robot teach", "slit valve match"],
    gasState: "이 구간은 공정가스보다 vacuum integrity, robot geometry, chamber ready가 핵심입니다.",
    hazard: "slit valve feedback 지연, robot teach 문제, vacuum mismatch는 customer wafer 투입 전 멈춰야 할 신호입니다.",
    evidence: ["robot handoff log", "slit valve feedback", "TM pressure stability"],
    layers: [["Si wafer", "vacuum handoff", "#72808c", 42], ["interface target", "must stay clean", "#9ff6d0", 7]],
    sourceTag: "Applied integrated pre-clean 공개 설명"
  },
  {
    stage: "05",
    title: "Integrated pre-clean / native oxide reset",
    active: "preclean",
    wafer: [65, 34],
    moduleState: "pre-clean module이 native oxide와 계면 오염을 줄여 epitaxial growth가 가능한 표면을 만듭니다.",
    waferState: "실리콘 결정 격자를 따라 새 층이 자라려면 표면이 깨끗하고 반응 가능한 상태여야 합니다.",
    gases: ["H2", "radical chemistry option", "purge"],
    toolState: ["pre-clean PM active", "byproduct exhaust", "vacuum transfer"],
    gasState: "Applied Prime Epi 공개자료는 Siconi/Clarion/Ajax 같은 integrated pre-clean이 interface contamination을 줄인다고 설명합니다.",
    hazard: "pre-clean chemistry와 byproduct는 option별로 다릅니다. 실제 gas matrix, purge, exhaust 조건은 공식 문서/SDS/EHS 승인 없이는 단정하지 않습니다.",
    evidence: ["pre-clean pass evidence", "queue time 관리", "exhaust/abatement ready"],
    layers: [["Si wafer", "crystal substrate", "#72808c", 42], ["clean Si surface", "growth-ready interface", "#7ff7c8", 8]],
    sourceTag: "Applied Centura Prime Epi"
  },
  {
    stage: "06",
    title: "EPI PM heat, precursor introduction",
    active: "pm",
    wafer: [78, 34],
    moduleState: "EPI PM에서 susceptor/temperature control, gas delivery, pressure control이 동시에 안정화됩니다.",
    waferState: "Si precursor가 표면에서 분해/반응하고 Si 원자가 기존 결정 방향을 따라 붙기 시작합니다.",
    gases: ["H2", "SiH4/DCS/TCS", "HCl"],
    toolState: ["heater/lamp stable", "MFC response", "pressure controlled"],
    gasState: "대표 공개자료 수준에서 Si source는 silane/chlorosilane 계열, carrier/reducing ambient는 H2, selectivity는 HCl 계열로 이해합니다.",
    hazard: "H2는 가연성, silane은 공기 중 자발 점화 가능, chlorosilane/HCl 계열은 부식성/반응성 경계가 큽니다. detector/exhaust/abatement가 ready가 아니면 멈춥니다.",
    evidence: ["MFC actual trend", "chamber pressure transient", "temperature trace"],
    layers: [["Si wafer", "crystal template", "#72808c", 42], ["Si seed layer", "epitaxial start", "#5ee7ff", 13]],
    sourceTag: "CVD/EPI 공개 논문 + NIOSH"
  },
  {
    stage: "07",
    title: "Si/SiGe growth, dopant incorporation",
    active: "pm",
    wafer: [83, 28],
    moduleState: "PM 안에서 precursor replenishment, surface reaction, byproduct removal이 균형을 이루며 막이 자랍니다.",
    waferState: "SiGe는 Ge precursor가 조성에 기여하고, PH3/AsH3/B2H6 같은 dopant 후보가 전기적 특성을 바꿀 수 있습니다.",
    gases: ["GeH4", "PH3/AsH3/B2H6", "H2/HCl"],
    toolState: ["growth front active", "exhaust flowing", "detector/abatement critical"],
    gasState: "Xtera 공개자료의 핵심은 high aspect ratio 구조에서 chemistry delivery, low-volume chamber, 온도 모니터링, void-free source/drain 성장입니다.",
    hazard: "PH3, AsH3, B2H6, GeH4는 독성/가연성 hydride family로 다룹니다. 실제 연결/qualification은 gas owner/EHS/SDS/OEM 절차 우선입니다.",
    evidence: ["dopant response trend", "gas detector normal", "metrology: thickness/Rs/composition"],
    layers: [["Si wafer", "substrate", "#72808c", 42], ["Si seed", "template", "#5ee7ff", 10], ["SiGe/doped epi", "strain/electrical layer", "#b98cff", 20], ["doped cap", "property tuning", "#00ff95", 9]],
    sourceTag: "Applied Xtera Epi + NIOSH hydrides"
  },
  {
    stage: "08",
    title: "Purge, exhaust/abatement, qualification handoff",
    active: "abatement",
    wafer: [93, 42],
    moduleState: "공정 후 purge/cool/pressure match를 거쳐 wafer가 TM/LL/EFEM 경로로 나가고, trace와 metrology가 handoff evidence가 됩니다.",
    waferState: "완성된 epitaxial layer stack은 thickness, uniformity, defect, Rs/composition 같은 metrology로 확인됩니다.",
    gases: ["N2/Ar purge", "residual hydride/HCl", "abatement"],
    toolState: ["purge complete", "cooldown", "post-run log"],
    gasState: "잔류가스와 byproduct는 exhaust/abatement 경로로 관리됩니다. qualification은 gas가 들어갔다는 사실보다 안전 envelope와 evidence가 먼저입니다.",
    hazard: "open safety item, detector abnormal, exhaust/abatement not ready, unexplained metrology drift는 handover 전 stop condition입니다.",
    evidence: ["post-run event log", "abatement/exhaust trend", "baseline wafer/metrology packet"],
    layers: [["Si wafer", "substrate", "#72808c", 42], ["Si seed", "template", "#5ee7ff", 10], ["SiGe/doped epi", "grown crystal layer", "#b98cff", 20], ["cap/finish", "handoff stack", "#00ff95", 10]],
    sourceTag: "SEMI/OSHA/NIOSH safety boundary"
  }
];

const appliedEpiPublicMap = [
  ["Centura Prime Epi", "Centura platform, integrated pre-clean, source/drain/channel/contact, in-situ doping, FinFET/GAA 응용.", "https://www.appliedmaterials.com/us/en/product-library/centura-prime-epi.html"],
  ["Centura Xtera Epi", "high aspect ratio selective epitaxy, tighter deposition cross section, chemistry delivery, real-time wafer temperature monitoring, low-volume chamber.", "https://www.appliedmaterials.com/us/en/product-library/centura-xtera-epi.html"],
  ["Xtera launch note", "GAA source/drain trench를 void-free로 채우는 목표, integrated pre-clean/etch, gas usage reduction, uniformity 개선.", "https://ir.appliedmaterials.com/news-releases/news-release-details/applied-materials-unveils-next-gen-chipmaking-products"],
  ["Public CVD/EPI papers", "DCS, silane, chlorosilane, germane, HCl, dopant gas를 material/growth/selectivity/doping mental model로 학습.", "https://digital.library.unt.edu/ark:/67531/metadc666909/m2/1/high_res_d/2056.pdf"]
];

const epiGasSafetyAtlas = [
  ["H2", "가연성 carrier/reducing ambient", "leak, ignition source, purge/exhaust readiness"],
  ["SiH4", "silane: 공기 중 자발 점화 가능 flammable gas", "gas cabinet, detector, exhaust, abatement owner 확인"],
  ["DCS/TCS/SiCl4", "silicon precursor/chlorosilane family", "SDS 기준 반응성/부식성/byproduct 경계 확인"],
  ["HCl", "부식성/자극성 gas", "scrubber/exhaust compatibility, PPE/EHS boundary"],
  ["GeH4", "germane: flammable hydride, toxic effect 고려", "detector/abatement/readiness evidence"],
  ["PH3", "phosphine: toxic + flammable hydride", "gas release 전 EHS/gas owner sign-off"],
  ["AsH3", "arsine: 매우 높은 독성/혈액·신장 위험 + flammable", "노출 의심/감지 이상은 즉시 stop/escalate"],
  ["B2H6", "diborane: flammable/toxic, moist air에서 위험", "purge discipline, detector, exhaust/abatement"],
  ["N2/Ar", "inert purge/support", "산소결핍, 압력 에너지, confined/local ventilation"]
];

const epiQualificationGuardrails = [
  "첫 gas introduction 전에는 gas matrix, SDS, line label, detector health, exhaust/abatement ready, interlock 정상, EHS/gas owner witness를 evidence로 묶습니다.",
  "qualification은 recipe를 맞히는 게임이 아니라 safety envelope 안에서 MFC actual, chamber pressure, pump/exhaust trend, temperature trace, metrology를 같은 시간축으로 연결하는 일입니다.",
  "toxic/pyrophoric/corrosive gas는 연결 순서나 valve 조작을 웹에서 학습하지 않습니다. 실제 작업은 공식 교육, 승인된 절차서, 현장 owner 지시가 우선입니다.",
  "멈출 조건: detector abnormal, exhaust/abatement not ready, unexplained pressure behavior, gas smell/irritation report, open EHS item, customer/site approval missing."
];

const epiCommunicationStack = [
  ["Fab host / MES", "lot, carrier, process-start permission, traceability context를 장비 쪽 host interface로 전달합니다.", "공장별 host rule과 승인 flow는 site-specific입니다."],
  ["AMHS + Load Port", "OHT/AGV가 FOUP을 load port에 내려놓고 carrier handoff, clamp, door 상태를 주고받습니다.", "SEMI E84/E87 같은 공개 표준 개념으로만 학습합니다."],
  ["Equipment controller", "EFEM, LL, TM, PM, gas/vacuum 상태를 scheduler가 조합해 다음 동작 가능 여부를 판단합니다.", "실제 sequence와 permissive 조건은 OEM/고객 승인 문서 우선입니다."],
  ["Module controllers", "robot servo, slit valve, pressure gauge, MFC, heater/lamp, pump, sensor actual 값을 로컬 controller가 보고합니다.", "CE는 command보다 actual trend와 alarm context를 evidence로 봅니다."],
  ["Safety / EHS layer", "gas detector, exhaust, abatement, door, LOTO, emergency stop 같은 safety state가 motion/process보다 우선합니다.", "bypass, setpoint, hidden interlock logic은 다루지 않습니다."]
];

const epiUtilityQualificationMatrix = [
  ["Toxic hydride", "PH3 / AsH3 / B2H6 / GeH4 후보", "SDS, gas matrix, detector health, exhaust/abatement ready, gas owner witness", "감지 이상, 냄새/자극 보고, owner 미확인"],
  ["Pyrophoric silicon source", "SiH4 및 일부 reactive silicon chemistry", "gas cabinet 상태, purge readiness, leak check evidence, abatement path", "purge/exhaust 불명확, pressure behavior 비정상"],
  ["Corrosive / halogen chemistry", "HCl, chlorosilane 계열 후보", "line label, scrubber compatibility, corrosion/PPE boundary, exhaust owner", "누출/부식 흔적, scrubber not-ready"],
  ["Flammable support", "H2 carrier/reducing ambient", "LEL/fire safety boundary, ventilation, ignition-source control, MFC/pressure trend", "H2 alarm, ventilation uncertainty"],
  ["Inert purge", "N2 / Ar purge/support", "O2 deficiency awareness, pressure energy, vent/purge status", "산소결핍 우려, confined/local ventilation 의심"]
];

const epiDigitalTwinNodes = [
  ["host", "Fab Host / MES", "lot, carrier, recipe permission", 8, 8, "control"],
  ["amhs", "AMHS / OHT", "FOUP delivery and pickup", 30, 8, "material"],
  ["lp", "Load Port", "dock, clamp, door, E84 PIO", 7, 36, "material"],
  ["efem", "EFEM / FI", "mini-environment robot", 27, 36, "motion"],
  ["aligner", "Aligner", "notch/orientation", 43, 54, "motion"],
  ["ll", "Load Lock", "ATM to vacuum boundary", 49, 36, "vacuum"],
  ["tm", "Transfer Module", "vacuum robot crossroad", 70, 36, "motion"],
  ["preclean", "Pre-clean / CM", "native oxide reset", 64, 16, "process"],
  ["pm", "EPI PM", "heat, gas, growth", 90, 45, "process"],
  ["cool", "Cooldown / CM", "cool and stabilize", 64, 67, "process"],
  ["gasbox", "Gas Box", "valved gas cabinet interface", 96, 10, "gas"],
  ["mfc", "MFC Panel", "relative flow actual", 96, 26, "gas"],
  ["pump", "Pump Stack", "pressure and byproduct removal", 91, 61, "vacuum"],
  ["exhaust", "Exhaust", "duct and negative pressure path", 84, 74, "facility"],
  ["abatement", "Abatement", "hazard reduction before release", 72, 84, "facility"],
  ["facility", "Facility Panel", "power, PCW, CDA, N2, exhaust", 44, 78, "facility"]
];

const epiPeTwinSteps = [
  {
    id: "slot-map",
    title: "FOUP slot map / carrier context",
    active: ["host", "amhs", "lp", "efem"],
    wafer: [9, 36],
    pressure: "Atmosphere / mini-environment",
    atmosphere: "N2 purge or clean dry air boundary",
    robot: "EFEM idle, carrier door not yet opened",
    door: "load port clamp + carrier door permission",
    gas: ["N2 purge", "CDA"],
    surface: "native oxide and pre-existing contamination still present",
    processMind: "Process Engineer는 이미 lot context, wafer history, queue time을 생각한다.",
    evidence: ["carrier ID", "slot map", "host state", "load port status"],
    stop: "carrier mismatch, unknown wafer history, load port alarm"
  },
  {
    id: "efem-pick",
    title: "EFEM pick / wafer map confidence",
    active: ["efem", "aligner", "lp"],
    wafer: [24, 39],
    pressure: "Atmosphere",
    atmosphere: "clean mini-environment",
    robot: "EFEM blade pick, wafer present confirmation",
    door: "FOUP door open under permissive",
    gas: ["N2 purge"],
    surface: "no film change yet, but particles/scratches can be introduced",
    processMind: "나중에 defect가 늘면 공정뿐 아니라 handling evidence도 같이 봐야 한다.",
    evidence: ["wafer present sensor", "robot pick log", "mapping repeatability", "particle baseline"],
    stop: "wafer slip/scrape suspicion, map mismatch, carrier door abnormal"
  },
  {
    id: "align",
    title: "Aligner orientation / edge risk",
    active: ["efem", "aligner"],
    wafer: [34, 50],
    pressure: "Atmosphere",
    atmosphere: "EFEM mini-environment",
    robot: "aligner rotates wafer to notch/orientation reference",
    door: "EFEM internal handoff",
    gas: ["N2 purge"],
    surface: "edge contact risk is more important than chemistry here",
    processMind: "orientation error는 PM 문제가 아니라 downstream placement/trace 문제로 보인다.",
    evidence: ["align result", "notch read", "edge exclusion marks", "wafer center data"],
    stop: "orientation fail, repeated centering error, edge contact mark"
  },
  {
    id: "ll-load",
    title: "Load Lock load / pressure boundary",
    active: ["efem", "ll", "facility"],
    wafer: [45, 38],
    pressure: "Atmosphere side to isolated LL",
    atmosphere: "LL isolated before pumpdown",
    robot: "EFEM places wafer into load lock",
    door: "outer door closes, inner slit remains protected",
    gas: ["N2 purge", "vent path"],
    surface: "surface waits; queue time and exposure matter",
    processMind: "LL은 단순 대기실이 아니라 contamination과 pressure shock을 막는 경계다.",
    evidence: ["LL door close", "wafer present", "seal state", "vent/purge state"],
    stop: "door feedback abnormal, seal suspicion, wafer present disagreement"
  },
  {
    id: "pumpdown",
    title: "Pumpdown / vacuum transfer readiness",
    active: ["ll", "pump", "exhaust", "facility"],
    wafer: [50, 42],
    pressure: "Falling toward transfer vacuum",
    atmosphere: "N2/air removed through pump/exhaust path",
    robot: "no robot motion until pressure permissive",
    door: "inner slit waits for pressure match",
    gas: ["N2 purge residue", "pump exhaust"],
    surface: "chemistry still idle; vacuum integrity protects interface",
    processMind: "pressure curve shape is evidence. A slow curve is a hypothesis generator.",
    evidence: ["pumpdown curve", "gauge agreement", "door seal", "exhaust ready"],
    stop: "unexpected pressure plateau, gauge disagreement, exhaust not ready"
  },
  {
    id: "tm-handoff",
    title: "TM robot handoff / vacuum geometry",
    active: ["ll", "tm", "preclean", "pm"],
    wafer: [58, 38],
    pressure: "Transfer vacuum stable",
    atmosphere: "mainframe vacuum",
    robot: "TM blade moves wafer from LL to module path",
    door: "slit valve open only when both sides agree",
    gas: ["vacuum", "inert support"],
    surface: "no vacuum break; interface contamination is held down",
    processMind: "robot teach, slit timing, chamber ready, pressure stability are one system.",
    evidence: ["robot handoff log", "slit feedback", "TM pressure", "module ready"],
    stop: "slit mismatch, robot teach suspicion, unexplained TM pressure movement"
  },
  {
    id: "preclean",
    title: "Pre-clean / native oxide reset",
    active: ["preclean", "tm", "pump", "exhaust", "abatement"],
    wafer: [71, 22],
    pressure: "Process module controlled low pressure",
    atmosphere: "clean/reactive pre-clean chemistry by option",
    robot: "wafer on susceptor/chuck, motion locked out",
    door: "module isolated during treatment",
    gas: ["H2 option", "radical/pre-clean option", "purge"],
    surface: "native oxide and interface contamination reduced",
    processMind: "pre-clean result is the first hidden cause for interface quality and nucleation.",
    evidence: ["pre-clean pass", "queue time", "byproduct exhaust", "post-clean transfer time"],
    stop: "unknown chemistry readiness, exhaust/abatement not ready, open EHS item"
  },
  {
    id: "pm-load",
    title: "EPI PM load / thermal stabilization",
    active: ["pm", "tm", "gasbox", "mfc", "pump"],
    wafer: [78, 44],
    pressure: "PM pressure control active",
    atmosphere: "H2 / carrier ambient concept",
    robot: "TM places wafer, PM closes and stabilizes",
    door: "PM isolated; transfer path protected",
    gas: ["H2 carrier", "purge"],
    surface: "clean Si surface waits for precursor arrival",
    processMind: "temperature trace and pressure transient become the baseline for every wafer result.",
    evidence: ["temperature trace", "pressure settle", "MFC zero/ready", "PM ready"],
    stop: "temperature trace abnormal, pressure control unstable, gas ready missing"
  },
  {
    id: "growth",
    title: "Growth / precursor to crystal layer",
    active: ["pm", "gasbox", "mfc", "pump", "exhaust", "abatement"],
    wafer: [80, 43],
    pressure: "Controlled process pressure",
    atmosphere: "carrier + silicon/Ge/dopant precursor family",
    robot: "no motion; process hardware holds stable environment",
    door: "PM isolated, safety layer owns permissive",
    gas: ["H2", "SiH4/DCS/TCS", "GeH4", "dopant candidates", "HCl/selective chemistry"],
    surface: "adsorption, decomposition, diffusion, lattice incorporation, byproduct desorption",
    processMind: "PE는 knob를 결과로 번역한다: growth rate, uniformity, composition, Rs, defect.",
    evidence: ["MFC actual trend", "pressure trace", "temperature trace", "exhaust/abatement normal"],
    stop: "detector alarm, MFC actual mismatch, pressure excursion, abatement not ready"
  },
  {
    id: "purge-cool",
    title: "Purge / cooldown / residual removal",
    active: ["pm", "cool", "pump", "exhaust", "abatement"],
    wafer: [70, 66],
    pressure: "Post-process purge and cooldown",
    atmosphere: "inert purge, residual gas removal",
    robot: "motion waits for safe handoff state",
    door: "module stays isolated until safe transition",
    gas: ["N2/Ar purge", "residual hydride/HCl", "abatement path"],
    surface: "grown layer stabilizes while residuals leave the chamber",
    processMind: "purge is not empty time. It protects next wafer, people, and chamber memory.",
    evidence: ["purge complete", "cooldown trace", "residual trend", "abatement ready"],
    stop: "residual/gas detector concern, purge incomplete, cooldown abnormal"
  },
  {
    id: "return-qual",
    title: "Return path / metrology qualification",
    active: ["cool", "tm", "ll", "efem", "host"],
    wafer: [23, 36],
    pressure: "Vacuum to LL vent to atmosphere",
    atmosphere: "controlled vent and EFEM return",
    robot: "TM returns wafer, EFEM restores to FOUP",
    door: "LL vent boundary and carrier close",
    gas: ["N2 vent", "inert purge"],
    surface: "epi stack is complete; wafer result now becomes evidence",
    processMind: "qualification joins wafer map, trace data, metrology, and open safety items.",
    evidence: ["metrology map", "event log", "baseline wafer packet", "handover notes"],
    stop: "unexplained metrology drift, open safety item, trace/metrology mismatch"
  }
];

const epiSurfaceChemistrySteps = [
  ["Native oxide", "공기 노출 후 자연 산화막/흡착 오염이 표면 반응을 막을 수 있습니다.", ["Si substrate", "native oxide", "adsorbed H2O/C/O"]],
  ["Pre-clean", "진공 통합 pre-clean은 vacuum break 없이 interface contamination을 낮추는 방향입니다.", ["Si substrate", "oxide removed", "reactive surface"]],
  ["H2 ambient", "H2 carrier/reducing ambient는 표면 상태와 gas transport의 배경으로 생각합니다.", ["clean Si", "H-terminated surface", "carrier flow"]],
  ["Precursor adsorption", "Si/Ge precursor가 boundary layer를 지나 표면에 도달하고 흡착합니다.", ["clean Si", "adsorbed Si species", "Ge option"]],
  ["Thermal decomposition", "열 에너지로 precursor가 분해/반응하며 성장 가능한 원자종을 제공합니다.", ["surface species", "Si adatom", "byproduct"]],
  ["Surface diffusion", "원자종이 표면에서 이동해 낮은 에너지 자리로 붙습니다.", ["terrace", "step edge", "diffusing adatom"]],
  ["Lattice matching", "새 원자는 기존 결정 격자 방향을 따라 붙어 epitaxial layer가 됩니다.", ["Si lattice", "matched Si layer", "interface quality"]],
  ["SiGe incorporation", "Ge precursor 기여는 조성/strain/성능과 연결됩니다.", ["Si template", "SiGe layer", "strain"]],
  ["Dopant incorporation", "PH3/AsH3/B2H6 후보는 Rs, 활성화, junction behavior와 연결됩니다.", ["epi layer", "dopant atoms", "electrical property"]],
  ["Byproduct exhaust", "반응 부산물은 표면에서 떨어져 pump/exhaust/abatement 경로로 나가야 합니다.", ["grown layer", "byproduct", "exhaust path"]],
  ["Metrology result", "막은 thickness, uniformity, composition, Rs, defect/particle map으로 번역됩니다.", ["epi stack", "metrology map", "trace packet"]]
];

const epiPeKnobDefs = [
  ["temp", "Temperature energy", "growth kinetics, defect/slip, dopant behavior"],
  ["pressure", "Pressure / residence", "gas residence time, depletion, radial uniformity"],
  ["precursor", "Precursor balance", "growth rate, loading effect, composition stability"],
  ["selectivity", "HCl / selectivity", "poly suppression, etch/deposition competition"],
  ["purge", "Purge quality", "interface memory, residual gas, next-wafer risk"],
  ["exhaust", "Exhaust / abatement", "safety envelope and byproduct removal"]
];

const epiPeGasCards = [
  ["H2", "carrier / reducing ambient", "flammable support gas", "ventilation, ignition-source control, line label, owner witness", "flow/pressure stability, exhaust path ready", "H2 alarm, ventilation doubt, ignition-source concern"],
  ["SiH4", "silicon source 후보", "pyrophoric / flammable gas", "gas cabinet, detector, purge, abatement, SDS", "MFC actual vs command trend, pressure response, detector normal", "detector alarm, purge/exhaust not ready, pressure behavior unexplained"],
  ["DCS/TCS/SiCl4", "chlorosilane silicon source 후보", "reactive/corrosive byproduct boundary", "SDS, material compatibility, scrubber/exhaust owner", "byproduct removal, corrosion indicators, pressure trend", "scrubber not ready, corrosion/leak sign, owner unknown"],
  ["HCl", "selective chemistry / poly suppression 후보", "corrosive nonflammable gas", "scrubber compatibility, PPE/EHS boundary, acid gas detection", "selectivity trend, exhaust/scrubber health, line label", "irritation report, scrubber issue, line mismatch"],
  ["GeH4", "SiGe Ge source 후보", "toxic + flammable hydride", "detector, abatement, gas owner, SDS", "composition trend, MFC actual, detector normal", "detector abnormal, abatement not ready, unknown leak evidence"],
  ["PH3", "n-type dopant 후보", "toxic + flammable hydride", "toxic gas release approval, detector, EHS witness", "Rs/dopant response, MFC actual, detector normal", "any gas release doubt, detector alarm, exposure concern"],
  ["AsH3", "n-type dopant 후보", "very toxic flammable hydride", "strict SDS/EHS/gas owner confirmation", "Rs/activation trend, detector normal, exhaust ready", "exposure suspicion, detector abnormal, owner missing"],
  ["B2H6", "p-type dopant 후보", "toxic + flammable, moist-air risk", "purge discipline, detector, exhaust/abatement owner", "dopant response, pressure trend, detector normal", "moisture/exhaust uncertainty, detector alarm"],
  ["N2/Ar", "purge / vent / support", "asphyxiation and pressure-energy risk", "O2 deficiency awareness, vent path, confined/local ventilation", "purge completion, pressure equalization", "O2 deficiency concern, pressure trapped, vent path unclear"]
];

const epiPeCommFlows = [
  ["Command", "Host/MES -> equipment controller", "lot start, carrier permission, recipe selection request", "SECS/GEM concept, site-specific details excluded"],
  ["Carrier handoff", "AMHS/OHT <-> load port", "PIO status for approach, docking, clamp, handoff completion", "SEMI E84 public concept only"],
  ["Status", "module controllers -> scheduler", "ready, busy, wafer present, pressure stable, temperature ready", "actual state beats assumption"],
  ["Event", "tool -> host / logs", "carrier arrived, wafer moved, PM started, PM ended, alarm cleared", "traceability and report backbone"],
  ["Alarm", "safety/interlock layer -> tool/CE", "gas detector, exhaust, door, robot, pressure, thermal abnormal", "never bypass or infer hidden logic"],
  ["Trace data", "PM/gas/vacuum/thermal -> PE packet", "MFC actual, pressure, temperature, pump/exhaust, metrology link", "process engineer evidence chain"]
];

const epiPeFailureModes = [
  ["Thickness non-uniformity center-high", "center-to-edge map shifted", "temperature/radial concentration imbalance", "susceptor/flow geometry/drift", "precursor depletion or pressure residence shift", "thickness map, trace overlay, chamber history", "ellipsometry/thickness map", "temperature + pressure + MFC actual", "trend repeats after baseline wafer", "Observed center-high thickness trend; holding release until trace/metrology correlation is reviewed."],
  ["Thickness non-uniformity edge-high", "edge profile abnormal", "edge gas concentration or thermal edge condition", "edge ring/susceptor/flow path", "exhaust symmetry or pressure conductance", "edge map, hardware change log", "thickness map", "pressure and temperature radial proxy", "edge excursion outside agreed review band", "Edge-high profile found; checking hardware boundary and gas delivery evidence before next wafer."],
  ["Growth rate low", "target thickness under trend", "temperature energy or precursor availability low", "MFC actual, gas line readiness, heater drift", "gas cabinet/pressure supply limitation", "run-to-run thickness, MFC actual", "thickness trend", "temperature/flow/pressure trace", "MFC actual mismatch or thermal instability", "Growth rate is below baseline; process and gas delivery traces are under review."],
  ["Growth rate high", "overgrowth risk", "temperature or precursor effective supply high", "controller calibration or flow drift", "pressure/residence increase", "thickness trend, trace compare", "thickness map", "MFC/pressure/temp trend", "trend persists across qualification wafer", "Growth rate is above baseline; release is held pending trace-to-metrology correlation."],
  ["Rs drift high", "sheet resistance increased", "dopant incorporation/activation low", "dopant MFC/gas delivery/thermal budget issue", "dopant cylinder/line readiness or purge effect", "Rs map, dopant trace, temperature trace", "four-point probe/Rs", "dopant actual + temperature", "toxic dopant gas evidence unclear", "Rs drift observed; dopant and thermal evidence are being checked before handover."],
  ["Rs drift low", "sheet resistance decreased", "excess dopant incorporation or memory effect", "MFC actual drift, chamber memory", "dopant residual/purge quality", "Rs trend, prior recipe family, purge history", "Rs map", "dopant MFC, purge, chamber history", "unexplained memory carryover", "Low Rs trend suggests dopant response/memory; holding release for evidence review."],
  ["SiGe composition low Ge", "Ge fraction below trend", "Ge precursor effectiveness low", "GeH4 delivery/MFC issue", "gas supply or pressure residence", "composition map, Ge MFC actual", "XRD/SIMS/ellipsometry", "Ge MFC + pressure", "toxic hydride readiness uncertain", "Ge composition is low; gas delivery and residence evidence are being reviewed."],
  ["SiGe composition high Ge", "Ge fraction high", "Ge precursor balance high or temperature interaction", "MFC drift or line memory", "purge/residual Ge effect", "composition trend, prior runs", "XRD/SIMS", "Ge MFC + purge history", "composition excursion repeats", "High Ge composition trend detected; reviewing precursor balance and chamber memory."],
  ["Defect density increase", "defect map worsened", "interface prep or growth instability", "pre-clean, handling, susceptor, chamber particle source", "residual/byproduct or gas purity concern", "defect map, pre-clean evidence, PM history", "inspection map", "pre-clean + pressure + exhaust", "customer wafer risk without baseline isolation", "Defect increase observed; isolating interface, handling, and chamber evidence before release."],
  ["Particle after PM", "particle spike after maintenance", "seasoning or recovery insufficient", "opened area, seal, robot contact, susceptor", "purge/exhaust byproduct disturbance", "particle counter, PM checklist, dummy wafer trend", "inspection/particle map", "PM recovery + purge", "particles continue after recovery wafers", "Post-PM particle spike remains; release held for recovery/seasoning evidence."],
  ["Poor interface quality", "interface contamination signature", "pre-clean/queue time issue", "vacuum break, LL/TM exposure, pre-clean module", "residual oxygen/moisture path", "queue time, pre-clean pass, O/C data if available", "SIMS/TEM/defect", "vacuum + pre-clean log", "interface evidence unexplained", "Interface quality concern; pre-clean and vacuum continuity evidence are under review."],
  ["Pre-clean weak", "growth nucleation unstable", "native oxide removal insufficient", "pre-clean chamber readiness", "chemistry/exhaust/byproduct path", "pre-clean log, queue time, interface result", "defect/interface metrology", "pre-clean trace + exhaust", "pre-clean pass evidence missing", "Pre-clean evidence is incomplete; no process release until owner review."],
  ["Pumpdown abnormal slow", "LL/PM pressure curve slow", "leak/conductance/outgassing", "seal, pump, valve feedback, gauge", "exhaust restriction or purge residual", "pumpdown curve vs baseline", "not wafer metrology first", "pressure gauges + pump state", "pressure plateau or gauge disagreement", "Pumpdown is not baseline; holding before process gas readiness."],
  ["MFC actual mismatch", "flow actual not following expected command", "gas delivery instability", "MFC, pressure supply, valve, controller", "gas cabinet or line restriction", "MFC actual trend, alarm, pressure response", "wafer result secondary", "MFC + chamber pressure", "toxic/pyrophoric gas mismatch", "MFC actual mismatch detected; gas owner and safety evidence required."],
  ["Temperature trace abnormal", "thermal trace off baseline", "heater/lamp/susceptor interaction", "sensor, lamp zone, cooling, chuck/susceptor", "flow cooling effect", "temperature trace, zone status, recent maintenance", "thickness/Rs/slip", "temperature + PCW", "thermal instability persists", "Temperature trace is abnormal; wafer result cannot be interpreted without thermal baseline."],
  ["Backside contamination", "backside marks or particles", "handling/susceptor contact issue", "robot blade, susceptor backside, chuck", "byproduct redeposition", "backside inspection, robot path, PM history", "backside inspection", "robot handoff + chamber history", "risk to next modules", "Backside contamination found; transfer path and chamber contact evidence under review."],
  ["Chamber memory effect", "result depends on prior process family", "residual dopant/Ge/chlorine memory", "seasoning/purge insufficient", "residual gas/desorption", "run order, purge history, dummy trend", "Rs/composition trend", "purge + prior lot history", "memory carries into baseline wafer", "Memory effect suspected; reviewing prior run and seasoning evidence."],
  ["Seasoning insufficient", "first wafers unstable", "surface condition not stabilized", "PM recovery sequence incomplete", "residual clean/byproduct", "dummy wafer trend, PM signoff", "thickness/Rs/particles", "recovery trend", "unstable trend after recovery", "Seasoning trend is not stable; handover held pending recovery evidence."],
  ["Abatement not ready", "safety path unavailable", "process cannot be safely qualified", "abatement interface or exhaust owner", "hazard reduction path missing", "ready signal, owner witness, alarm state", "not a wafer-only issue", "abatement + detector state", "abatement ready missing", "Abatement readiness missing; process gas introduction is stopped."],
  ["Gas detector alarm", "safety alarm", "gas release or detector fault must be treated as real", "gas cabinet/line/detector/exhaust", "toxic/flammable/corrosive concern", "alarm log, detector health, EHS response", "no metrology priority", "detector + exhaust", "any unresolved alarm", "Gas detector alarm occurred; work stopped and EHS/gas owner escalation required."],
  ["Exhaust flow low", "exhaust readiness degraded", "byproduct removal and safety compromised", "duct, damper, scrubber, facility interface", "gas residence/byproduct accumulation", "exhaust trend, owner status", "wafer trend if safe", "exhaust + pressure", "exhaust not within approved state", "Exhaust flow is not ready; holding qualification until facility owner clears."],
  ["Pressure oscillation", "pressure unstable during process", "control loop or gas/exhaust coupling", "APC/gauge/pump/MFC interaction", "gas supply pulsation", "pressure trace, MFC trend, pump status", "thickness/defect map", "pressure + flow", "oscillation repeats or safety alarm", "Pressure oscillation found; process result is not trusted until control evidence is reviewed."],
  ["Precursor depletion loading", "pattern-dependent growth variation", "local precursor consumption effect", "flow delivery and chamber volume interaction", "pressure/residence/precursor balance", "pattern split, thickness map, flow trace", "patterned wafer metrology", "MFC + pressure", "pattern loading exceeds review limit", "Loading-effect trend observed; PE review needed before process handover."],
  ["Selectivity loss", "poly on dielectric/masked area", "HCl/selective balance or surface prep issue", "chemistry delivery, chamber condition", "HCl/precursor balance, residual oxygen", "SEM/inspection, chemistry trace", "inspection/SEM", "HCl candidate + pressure", "unwanted growth on protected area", "Selectivity concern; release held while chemistry balance and surface prep are reviewed."],
  ["Void / seam in trench fill", "fill not void-free", "deposition/etch balance or replenishment issue", "flow cross-section, temperature, chamber condition", "precursor replenishment/residence", "cross-section metrology, trace", "TEM/SEM cross-section", "flow/pressure/temp", "void observed in qualification", "Void risk detected; process/window evidence requires PE review."],
  ["Edge exclusion particles", "edge particle band", "edge contact or flow redeposition", "edge ring/robot blade/susceptor", "byproduct edge transport", "edge map, robot path, hardware inspection", "particle map", "robot + exhaust", "edge band repeats", "Edge particle band observed; checking handling and edge hardware evidence."],
  ["Slip line risk", "crystal slip signature", "thermal stress too high", "temperature ramp/nonuniformity/susceptor", "gas cooling imbalance", "inspection, thermal trace", "defect/slip inspection", "temperature trace", "slip signature on baseline", "Slip risk detected; thermal evidence review before release."],
  ["Dopant activation drift", "electrical result not matching dose trend", "thermal budget or incorporation issue", "temperature control, dopant delivery", "dopant gas actual, purge memory", "Rs/SIMS, thermal trace, dopant trace", "Rs/SIMS", "temp + dopant MFC", "electrical drift unexplained", "Activation-related drift suspected; thermal and dopant evidence are under review."],
  ["Queue time sensitivity", "result changes with wait time", "surface recontamination between steps", "LL/TM/pre-clean scheduling", "vacuum exposure/residuals", "timestamp chain, queue time, interface metrology", "interface/defect", "event timestamps", "queue-time effect repeats", "Queue time sensitivity found; timestamp and interface evidence are being correlated."],
  ["LL vent particle burst", "particles after vent cycle", "vent flow disturbance", "LL filter/vent path/seal", "N2 vent quality", "LL vent trace, particle map", "particle map", "LL vent/purge", "vent-related repeat", "LL vent-related particle trend observed; vent path evidence required."],
  ["Robot handoff scratch", "linear mark or edge damage", "mechanical handling cause", "blade, teach, aligner, slit position", "not gas first", "image, robot log, wafer path", "visual/inspection", "robot events", "physical contact evidence", "Handling mark suspected; motion path review before continuing."],
  ["Gas cabinet pressure drift", "supply pressure unstable", "gas delivery root cause", "gas cabinet/regulator", "source supply not stable", "cabinet trend, MFC actual", "wafer trend if safe", "supply pressure + MFC", "toxic/flammable supply abnormal", "Gas supply drift detected; gas owner review required."],
  ["Scrubber compatibility concern", "corrosive gas path question", "abatement chemistry mismatch", "scrubber/exhaust interface", "HCl/chlorosilane byproduct concern", "scrubber status, EHS owner signoff", "not wafer-first", "abatement/exhaust", "scrubber not confirmed", "Scrubber compatibility not confirmed; process gas introduction stopped."],
  ["PCW thermal disturbance", "temperature stability poor", "cooling utility variation", "PCW flow/temp, heat exchanger", "gas cooling secondary", "PCW trend, temp trace", "thickness/Rs", "PCW + thermal", "thermal control not stable", "PCW-related thermal disturbance suspected; facility evidence needed."],
  ["CDA/N2 purge contamination", "unexpected oxide/particle behavior", "purge gas quality or moisture", "purge line/filter/dryer", "moisture/oxygen ingress", "purge status, moisture/O2 if available", "interface/defect", "purge events", "purge quality unverified", "Purge quality concern; interface evidence held for owner review."],
  ["Metrology mismatch", "tool trace good but metrology odd", "measurement recipe/tool issue possible", "metrology setup, wafer ID, map alignment", "not gas first", "repeat measurement, wafer ID", "metrology repeat", "trace-to-wafer ID", "metrology cannot be trusted", "Metrology mismatch found; repeat/ID evidence needed before process conclusion."],
  ["Baseline wafer drift", "baseline no longer matches history", "tool/process baseline shifted", "hardware drift, chamber condition", "gas/thermal/vacuum drift", "baseline packet, trend chart", "baseline metrology", "long-term trace trend", "baseline outside review band", "Baseline drift observed; tool is held for trend/root cause review."],
  ["First wafer effect", "first wafer different from later wafers", "thermal/chemical stabilization", "chamber wall state, seasoning", "residual purge/memory", "wafer order trend, dummy history", "run-order metrology", "chamber history", "first-wafer excursion repeats", "First-wafer effect observed; seasoning and chamber state evidence reviewed."],
  ["Cross-module mismatch", "PM A and PM B results differ", "module matching issue", "PM hardware/calibration/susceptor", "gas split/line difference", "PM split data, trace overlay", "split wafer metrology", "PM trace compare", "module delta persists", "Cross-module mismatch found; PM matching evidence required."],
  ["Post-clean recovery abnormal", "post-clean wafers unstable", "clean residue or chamber condition", "clean endpoint/recovery/seasoning", "residual byproduct/purge", "post-clean trend, recovery checklist", "particles/thickness/Rs", "clean + purge trace", "unstable recovery", "Post-clean recovery unstable; no handover until recovery trend closes."],
  ["Host data association error", "trace does not match wafer", "data association failure", "host/load port/wafer ID mapping", "not process physics first", "carrier/wafer ID, event timestamps", "map-to-slot check", "SECS/GEM/event log", "traceability broken", "Traceability mismatch detected; process conclusion is held until data association is corrected."]
].map((item, index) => ({
  id: `pe-case-${index + 1}`,
  title: item[0],
  wafer: item[1],
  process: item[2],
  hardware: item[3],
  gas: item[4],
  evidence: item[5],
  metrology: item[6],
  trace: item[7],
  stop: item[8],
  report: item[9]
}));

function peMetricLabel(value, inverse = false) {
  const v = inverse ? 100 - value : value;
  if (v >= 72) return "High";
  if (v >= 45) return "Medium";
  return "Low";
}

function computePeKnobResults() {
  const k = peKnobs;
  const growth = Math.round((k.temp * 0.34) + (k.precursor * 0.38) + (k.pressure * 0.16) + (k.selectivity * 0.08));
  const uniformity = Math.round(100 - Math.abs(k.pressure - 52) * 0.52 - Math.abs(k.precursor - 55) * 0.24 - Math.abs(k.temp - 58) * 0.18);
  const composition = Math.round(100 - Math.abs(k.precursor - 58) * 0.5 - Math.abs(k.temp - 55) * 0.18 - Math.abs(k.purge - 70) * 0.12);
  const defectRisk = Math.round(Math.max(8, (Math.abs(k.temp - 58) * 0.42) + (100 - k.purge) * 0.22 + (100 - k.exhaust) * 0.18 + Math.max(0, k.precursor - 72) * 0.18));
  const particleRisk = Math.round(Math.max(6, (100 - k.purge) * 0.36 + (100 - k.exhaust) * 0.24 + Math.abs(k.pressure - 50) * 0.13));
  const interfaceQuality = Math.round(Math.min(96, k.purge * 0.36 + k.exhaust * 0.18 + k.selectivity * 0.2 + (100 - Math.abs(k.temp - 56)) * 0.18));
  const safetyRisk = Math.round(Math.max(5, (100 - k.exhaust) * 0.42 + (100 - k.purge) * 0.22 + Math.max(0, k.precursor - 70) * 0.16 + Math.max(0, k.pressure - 70) * 0.12));
  return [
    ["Growth rate", growth, false, "온도와 precursor가 올라가면 성장 경향은 강해지지만 defect/safety와 분리해서 볼 수 없습니다."],
    ["Thickness uniformity", Math.max(0, Math.min(100, uniformity)), false, "압력/precursor/thermal balance가 중심-엣지 profile을 흔듭니다."],
    ["Composition stability", Math.max(0, Math.min(100, composition)), false, "SiGe/dopant 계열은 precursor balance와 thermal budget에 민감합니다."],
    ["Defect risk", Math.max(0, Math.min(100, defectRisk)), true, "온도/잔류가스/배기 준비도 흔들림은 defect hypothesis를 키웁니다."],
    ["Particle risk", Math.max(0, Math.min(100, particleRisk)), true, "purge와 exhaust가 약하면 PM recovery와 particle evidence를 더 봐야 합니다."],
    ["Interface quality", Math.max(0, Math.min(100, interfaceQuality)), false, "pre-clean, queue time, purge quality가 interface quality의 출발점입니다."],
    ["Safety risk", Math.max(0, Math.min(100, safetyRisk)), true, "exhaust/abatement와 purge confidence가 낮으면 process knob보다 stop condition이 먼저입니다."]
  ];
}

function renderEpiProcessEngineerLab() {
  const root = document.querySelector("#epi-pe-lab");
  if (!root) return;
  const step = epiPeTwinSteps[activePeTwinStep] || epiPeTwinSteps[0];
  const surface = epiSurfaceChemistrySteps[Math.min(activePeTwinStep, epiSurfaceChemistrySteps.length - 1)];
  const activeCase = epiPeFailureModes[activePeFailureIndex] || epiPeFailureModes[0];
  const knobResults = computePeKnobResults();
  root.innerHTML = `
    <div class="pe-lab-head">
      <div>
        <p class="eyebrow">Process Engineer Digital Twin</p>
        <h3>장비 구조, 표면 반응, trace evidence를 한 번에 연결</h3>
        <span>교육용 qualitative model입니다. recipe, valve sequence, detector setpoint, interlock bypass, site-specific limit는 제외합니다.</span>
      </div>
      <div class="pe-lab-actions">
        <button class="secondary" type="button" data-pe-step="prev">이전 path</button>
        <button class="primary" type="button" data-pe-step="next">다음 path</button>
      </div>
    </div>
    <section class="pe-twin-grid">
      <div class="pe-isometric" style="--pe-wafer-x:${step.wafer[0]}%; --pe-wafer-y:${step.wafer[1]}%;">
        <div class="pe-grid-floor"></div>
        <div class="pe-wafer"><span>W</span></div>
        ${epiDigitalTwinNodes.map(([id, label, note, x, y, group]) => `
          <button type="button" class="pe-node pe-${group} ${step.active.includes(id) ? "active" : ""}" data-pe-node="${id}" style="--node-x:${x}%; --node-y:${y}%">
            <strong>${label}</strong>
            <small>${note}</small>
          </button>
        `).join("")}
        <div class="pe-flow-line material"></div>
        <div class="pe-flow-line vacuum"></div>
        <div class="pe-flow-line gas"></div>
        <div class="pe-flow-line exhaust"></div>
      </div>
      <article class="pe-step-card">
        <span class="pe-step-count">${String(activePeTwinStep + 1).padStart(2, "0")} / ${epiPeTwinSteps.length}</span>
        <h3>${step.title}</h3>
        <div class="pe-state-stack">
          <span><b>Pressure</b>${step.pressure}</span>
          <span><b>Atmosphere</b>${step.atmosphere}</span>
          <span><b>Robot</b>${step.robot}</span>
          <span><b>Door/slit</b>${step.door}</span>
        </div>
        <div class="pe-gas-tags">${step.gas.map(gas => `<em>${gas}</em>`).join("")}</div>
        <p>${step.surface}</p>
        <strong>PE 사고</strong>
        <p>${step.processMind}</p>
        <strong>Evidence</strong>
        <ul>${step.evidence.map(item => `<li>${item}</li>`).join("")}</ul>
        <div class="pe-stop">Stop: ${step.stop}</div>
      </article>
    </section>
    <section class="pe-surface-knob-grid">
      <article class="pe-surface-theater">
        <div class="pe-section-title">
          <p class="eyebrow">Wafer Surface Chemistry Theater</p>
          <h3>${surface[0]}</h3>
        </div>
        <div class="pe-surface-stack">
          ${surface[2].map((layer, index) => `<span style="--surface-index:${index}"><b>${layer}</b></span>`).join("")}
        </div>
        <p>${surface[1]}</p>
        <div class="pe-chem-timeline">
          ${epiSurfaceChemistrySteps.map((item, index) => `
            <button type="button" class="${index === Math.min(activePeTwinStep, epiSurfaceChemistrySteps.length - 1) ? "active" : ""}" data-pe-surface="${index}">
              ${index + 1}. ${item[0]}
            </button>
          `).join("")}
        </div>
      </article>
      <article class="pe-knob-sim">
        <div class="pe-section-title">
          <p class="eyebrow">Process Knob -> Wafer Result</p>
          <h3>수치 recipe가 아닌 상대 경향 모델</h3>
        </div>
        <div class="pe-knob-controls">
          ${epiPeKnobDefs.map(([id, label, hint]) => `
            <label>
              <span><b>${label}</b><em>${peKnobs[id]}</em></span>
              <input type="range" min="0" max="100" value="${peKnobs[id]}" data-pe-knob="${id}" aria-label="${label}" />
              <small>${hint}</small>
            </label>
          `).join("")}
        </div>
        <div class="pe-result-bars">
          ${knobResults.map(([label, value, inverse, note]) => `
            <div class="${inverse ? "risk" : ""}">
              <span><b>${label}</b><em>${value}% / ${peMetricLabel(value, inverse)}</em></span>
              <i><u style="width:${value}%"></u></i>
              <small>${note}</small>
            </div>
          `).join("")}
        </div>
      </article>
    </section>
    <section class="pe-comm-gas-grid">
      <article class="pe-comm-map">
        <div class="pe-section-title">
          <p class="eyebrow">Communication / Trace Map</p>
          <h3>Command, status, event, alarm, trace data 흐름</h3>
        </div>
        <div class="pe-comm-lanes">
          ${epiPeCommFlows.map(([type, path, meaning, boundary]) => `
            <div>
              <b>${type}</b>
              <strong>${path}</strong>
              <span>${meaning}</span>
              <small>${boundary}</small>
            </div>
          `).join("")}
        </div>
      </article>
      <article class="pe-gas-safety">
        <div class="pe-section-title">
          <p class="eyebrow">Gas Safety Deep Cards</p>
          <h3>왜 쓰고, 무엇을 멈춰야 하는가</h3>
        </div>
        <div class="pe-gas-card-grid">
          ${epiPeGasCards.map(([gas, why, hazard, before, trend, stop]) => `
            <button type="button">
              <b>${gas}</b>
              <span>${why}</span>
              <em>${hazard}</em>
              <small><strong>Before</strong> ${before}</small>
              <small><strong>Trend</strong> ${trend}</small>
              <small><strong>Stop</strong> ${stop}</small>
            </button>
          `).join("")}
        </div>
      </article>
    </section>
    <section class="pe-evidence-board">
      <div class="pe-section-title">
        <p class="eyebrow">Evidence Thinking Board / Failure Mode Game</p>
        <h3>wafer result에서 PE hypothesis와 customer report까지</h3>
      </div>
      <div class="pe-case-picker">
        ${epiPeFailureModes.map((item, index) => `
          <button type="button" class="${index === activePeFailureIndex ? "active" : ""}" data-pe-case="${index}">
            ${String(index + 1).padStart(2, "0")} ${item.title}
          </button>
        `).join("")}
      </div>
      <div class="pe-evidence-flow">
        ${[
          ["Symptom / wafer result", activeCase.wafer],
          ["Process hypothesis", activeCase.process],
          ["Hardware hypothesis", activeCase.hardware],
          ["Gas / vacuum hypothesis", activeCase.gas],
          ["Evidence to collect", activeCase.evidence],
          ["Metrology to check", activeCase.metrology],
          ["Tool trace to compare", activeCase.trace],
          ["Stop condition", activeCase.stop],
          ["Customer/process report", activeCase.report]
        ].map(([label, value]) => `
          <article>
            <strong>${label}</strong>
            <p>${value}</p>
          </article>
        `).join("")}
      </div>
    </section>
  `;
  root.querySelectorAll("[data-pe-step]").forEach(button => {
    button.addEventListener("click", () => {
      activePeTwinStep = button.dataset.peStep === "next"
        ? (activePeTwinStep + 1) % epiPeTwinSteps.length
        : (activePeTwinStep + epiPeTwinSteps.length - 1) % epiPeTwinSteps.length;
      renderEpiProcessEngineerLab();
    });
  });
  root.querySelectorAll("[data-pe-surface]").forEach(button => {
    button.addEventListener("click", () => {
      activePeTwinStep = Math.min(Number(button.dataset.peSurface), epiPeTwinSteps.length - 1);
      renderEpiProcessEngineerLab();
    });
  });
  root.querySelectorAll("[data-pe-knob]").forEach(input => {
    input.addEventListener("input", () => {
      peKnobs[input.dataset.peKnob] = Number(input.value);
      renderEpiProcessEngineerLab();
    });
  });
  root.querySelectorAll("[data-pe-case]").forEach(button => {
    button.addEventListener("click", () => {
      activePeFailureIndex = Number(button.dataset.peCase);
      renderEpiProcessEngineerLab();
    });
  });
}

const epiTraceScenarios = [
  {
    id: "epi-uniformity",
    family: "EPI",
    title: "EPI thickness uniformity drift",
    symptom: "Thickness map shows a repeatable center-high or edge-high shape.",
    likely: "thermal balance, pressure residence, gas flow distribution, chamber matching",
    risk: "Do not release by thickness number alone. Correlate wafer map with trace trend and module history.",
    map: "center-high",
    traceBias: { temp: 7, pressure: 8, flow: -3, exhaust: -5, metric: 12 },
    evidence: ["thickness-map", "temp-trace", "pressure-trace", "mfc-actual", "module-history"],
    stop: "Trend repeats on baseline wafer or trace is not associated with the correct wafer ID.",
    report: "Thickness profile drift is repeatable; trace, module history, and metrology association are under PE review before release."
  },
  {
    id: "epi-rs-drift",
    family: "EPI",
    title: "EPI Rs / dopant response drift",
    symptom: "Sheet resistance moves while thickness looks roughly stable.",
    likely: "dopant delivery response, thermal budget, purge memory, prior chamber state",
    risk: "Treat hydride/dopant gas readiness and trace association as safety-critical evidence.",
    map: "gradient",
    traceBias: { temp: -4, pressure: 2, flow: 10, exhaust: -2, metric: -14 },
    evidence: ["rs-map", "dopant-trace", "temp-trace", "purge-history", "gas-owner"],
    stop: "Toxic dopant gas readiness is uncertain or electrical trend cannot be tied to a verified trace.",
    report: "Electrical drift is present; dopant response, thermal trace, and purge history are being correlated."
  },
  {
    id: "epi-particle-pm",
    family: "EPI",
    title: "Post-PM particle recovery",
    symptom: "Particle count spikes after opened-chamber work or recovery.",
    likely: "seasoning recovery, robot contact, seal disturbance, purge/exhaust disturbance",
    risk: "Do not compensate with process knobs. Isolate handling, recovery wafer trend, and opened-area evidence.",
    map: "spot",
    traceBias: { temp: 1, pressure: 5, flow: 0, exhaust: -12, metric: 18 },
    evidence: ["particle-map", "pm-history", "dummy-trend", "robot-events", "exhaust-ready"],
    stop: "Particle trend does not decay after approved recovery path or backside/edge damage appears.",
    report: "Post-PM particle trend remains; recovery evidence and transfer-path checks are required before handover."
  },
  {
    id: "rtp-overshoot",
    family: "RTP",
    title: "RTP thermal overshoot / slip risk",
    symptom: "Thermal trace overshoots or wafer inspection suggests stress signature.",
    likely: "lamp zone response, pyrometry confidence, cooling margin, wafer emissivity condition",
    risk: "Thermal excursions can damage wafer or invalidate electrical interpretation.",
    map: "ring",
    traceBias: { temp: 16, pressure: 0, flow: 0, exhaust: 1, metric: 9 },
    evidence: ["thermal-trace", "lamp-zone", "pyrometry", "pcw", "inspection"],
    stop: "Thermal control is unstable, pyrometry confidence is low, or stress/slip evidence appears.",
    report: "RTP thermal trace is not baseline; lamp/pyrometry/cooling evidence is under review before qualification."
  },
  {
    id: "rtp-pcw-drift",
    family: "RTP",
    title: "RTP cooling utility disturbance",
    symptom: "Repeatability worsens later in the run or cool-down shape changes.",
    likely: "PCW temperature/flow variation, heat exchanger capacity, facility stability",
    risk: "Cooling utility drift can look like process drift unless facility evidence is separated.",
    map: "edge-high",
    traceBias: { temp: 8, pressure: 0, flow: 0, exhaust: 0, metric: 11 },
    evidence: ["pcw", "thermal-trace", "run-order", "facility-owner", "baseline-trend"],
    stop: "Cooling evidence is not stable or owner clearance is missing.",
    report: "Cooling-related repeatability drift suspected; facility trace and thermal overlay are required before release."
  },
  {
    id: "rtp-pyrometry",
    family: "RTP",
    title: "RTP pyrometry / emissivity uncertainty",
    symptom: "Trace appears plausible but wafer result does not match expected thermal response.",
    likely: "pyrometry confidence, backside condition, wafer emissivity, alignment, calibration context",
    risk: "A believable trace is not enough if measurement association or sensor confidence is weak.",
    map: "checker",
    traceBias: { temp: -7, pressure: 0, flow: 0, exhaust: 0, metric: -10 },
    evidence: ["pyrometry", "wafer-id", "metrology-repeat", "backside-check", "thermal-trace"],
    stop: "Trace-to-wafer association or pyrometry confidence cannot be defended.",
    report: "Thermal result mismatch is under review; wafer ID, pyrometry confidence, and repeat metrology are being checked."
  }
];

const epiTraceEvidenceDeck = [
  ["thickness-map", "Thickness map", "Profile shape: center, edge, ring, local spot"],
  ["rs-map", "Rs map", "Electrical response: dopant/activation clue"],
  ["particle-map", "Particle map", "Handling, recovery, byproduct, or surface source"],
  ["temp-trace", "Temperature trace", "Heater/lamp/susceptor stability clue"],
  ["thermal-trace", "RTP thermal trace", "Ramp, soak, spike, cool-down behavior"],
  ["pressure-trace", "Pressure trace", "Residence, pumpdown, leak, conductance clue"],
  ["mfc-actual", "MFC actual", "Gas delivery follows expected command trend"],
  ["dopant-trace", "Dopant trace", "Toxic gas delivery response evidence"],
  ["purge-history", "Purge history", "Memory and residual removal confidence"],
  ["dummy-trend", "Dummy/baseline trend", "Recovery or first-wafer effect evidence"],
  ["robot-events", "Robot events", "Handling or handoff timing evidence"],
  ["pcw", "PCW utility", "Cooling water temperature/flow stability"],
  ["pyrometry", "Pyrometry", "Sensor confidence and emissivity context"],
  ["wafer-id", "Wafer ID association", "Correct wafer, slot, trace, and metrology link"],
  ["gas-owner", "Gas owner signoff", "Gas cabinet, detector, exhaust, abatement readiness"],
  ["facility-owner", "Facility owner status", "Exhaust, PCW, CDA/N2, power owner evidence"],
  ["module-history", "Module history", "Recent PM, matching, clean, prior process family"],
  ["pm-history", "PM history", "Opened-area work, replaced parts, clean/recovery context"],
  ["exhaust-ready", "Exhaust ready", "Duct/scrubber/abatement owner readiness signal"],
  ["lamp-zone", "Lamp zone", "RTP zone response and thermal uniformity clue"],
  ["run-order", "Run order", "First-wafer, queue-time, or later-run drift clue"],
  ["baseline-trend", "Baseline trend", "Golden wafer or historical module comparison"],
  ["backside-check", "Backside check", "Emissivity, handling, and contamination context"],
  ["inspection", "Inspection", "Defect, slip, backside, edge signature"],
  ["metrology-repeat", "Metrology repeat", "Confirm tool setup before blaming process"]
];

const rtpTraceKnobDefs = [
  ["ramp", "Ramp aggressiveness", "Higher value means more thermal stress in this education model."],
  ["pyrometry", "Pyrometry confidence", "Sensor/emissivity confidence before trusting the temperature trace."],
  ["cooling", "Cooling margin", "PCW and thermal recovery margin."],
  ["ambient", "Ambient readiness", "N2/CDA/exhaust/facility readiness context."]
];

function getTraceScenario() {
  return epiTraceScenarios.find(item => item.id === activeTraceScenario) || epiTraceScenarios[0];
}

function tracePointSeries(scenario, key, count = 34) {
  const bias = scenario.traceBias[key] || 0;
  return Array.from({ length: count }, (_, index) => {
    const t = index / (count - 1);
    const wave = Math.sin(t * Math.PI * 2.35) * 6 + Math.cos(t * Math.PI * 4.1) * 2.5;
    const phase = key === "temp" ? 62 : key === "pressure" ? 46 : key === "flow" ? 54 : key === "exhaust" ? 58 : 50;
    const rtpPulse = scenario.family === "RTP" && key === "temp" ? Math.sin(Math.min(1, t * 1.25) * Math.PI) * 24 : 0;
    const epiRamp = scenario.family === "EPI" && key === "flow" ? Math.min(1, t * 2) * 10 : 0;
    return Math.max(6, Math.min(96, phase + bias + wave + rtpPulse + epiRamp));
  });
}

function traceSvgPath(points, width, height, min = 0, max = 100) {
  return points.map((value, index) => {
    const x = 34 + (index / (points.length - 1)) * (width - 58);
    const y = 18 + (1 - (value - min) / (max - min)) * (height - 42);
    return `${index ? "L" : "M"} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ");
}

function traceWaferValue(scenario, row, col, size) {
  const center = (size - 1) / 2;
  const dx = (col - center) / center;
  const dy = (row - center) / center;
  const r = Math.sqrt(dx * dx + dy * dy);
  let value = 48;
  if (scenario.map === "center-high") value += (1 - r) * 30;
  if (scenario.map === "edge-high") value += r * 28;
  if (scenario.map === "ring") value += (1 - Math.abs(r - 0.62) * 2.2) * 24;
  if (scenario.map === "spot") value += Math.max(0, 1 - Math.sqrt((dx - 0.35) ** 2 + (dy + 0.2) ** 2) * 2.8) * 36;
  if (scenario.map === "gradient") value += (dx - dy) * 18;
  if (scenario.map === "checker") value += ((row + col) % 2 ? 10 : -8) + (Math.sin(row * 1.8) * 4);
  return Math.max(10, Math.min(96, Math.round(value)));
}

function traceEvidenceScore(scenario) {
  const required = scenario.evidence || [];
  const hits = required.filter(item => traceEvidenceSelection.has(item)).length;
  const misses = required.length - hits;
  const extras = [...traceEvidenceSelection].filter(item => !required.includes(item)).length;
  const score = Math.max(0, Math.min(100, Math.round((hits / Math.max(1, required.length)) * 92 - extras * 4)));
  return { score, hits, misses, extras, required };
}

function computeRtpThermalScores() {
  const k = rtpTraceKnobs;
  const activation = Math.round(k.ramp * 0.25 + k.pyrometry * 0.28 + k.ambient * 0.18 + k.cooling * 0.12);
  const slipRisk = Math.round(Math.max(3, k.ramp * 0.42 + (100 - k.cooling) * 0.34 + (100 - k.pyrometry) * 0.1));
  const diffusionRisk = Math.round(Math.max(4, k.ramp * 0.22 + (100 - k.cooling) * 0.22 + Math.max(0, k.ambient - 72) * 0.1));
  const repeatability = Math.round(Math.min(98, k.pyrometry * 0.34 + k.cooling * 0.28 + k.ambient * 0.22 + (100 - Math.abs(k.ramp - 54)) * 0.1));
  return { activation, slipRisk, diffusionRisk, repeatability };
}

function rtpCurvePath(width, height) {
  const k = rtpTraceKnobs;
  const overshoot = (k.ramp - 50) * 0.23 + (100 - k.pyrometry) * 0.11;
  const coolLag = (100 - k.cooling) * 0.15;
  const points = [
    [18, 88],
    [70, 78],
    [130, 34 - overshoot],
    [205, 22 - overshoot * 0.25],
    [278, 28],
    [345, 66 + coolLag],
    [width - 18, 83 + coolLag * 0.25]
  ];
  return points.map(([x, y], index) => `${index ? "L" : "M"} ${x.toFixed(1)} ${Math.max(8, Math.min(height - 8, y)).toFixed(1)}`).join(" ");
}

function traceGameCase() {
  const scenario = getTraceScenario();
  const cases = [
    {
      scenario: "epi-uniformity",
      ask: "Uniformity drift가 보이면 가장 먼저 무엇을 연결해서 보나?",
      choices: [
        ["Thickness map + temp/pressure/MFC overlay", true, "Correct. Map shape and module trace must agree before action."],
        ["Immediately tune recipe target", false, "Wrong. Recipe-like action without evidence is outside this safe training boundary."],
        ["Ignore trace if metrology exists", false, "Wrong. Metrology alone cannot explain module state."]
      ],
      weakness: "trace-to-metrology correlation"
    },
    {
      scenario: "epi-rs-drift",
      ask: "Rs drift에서 thickness가 안정적이면 어떤 evidence가 더 중요해지나?",
      choices: [
        ["Dopant trace + thermal trace + purge history", true, "Correct. Electrical result needs dopant and thermal evidence."],
        ["Only FOUP load time", false, "Queue time can matter, but this symptom needs electrical/process evidence first."],
        ["Pump model name", false, "Pump identity alone is not an evidence chain."]
      ],
      weakness: "electrical response evidence"
    },
    {
      scenario: "epi-particle-pm",
      ask: "Post-PM particle spike에서 피해야 할 행동은?",
      choices: [
        ["Use recovery trend and opened-area history", false, "This is useful evidence, not the wrong action."],
        ["Change process knobs to hide particles", true, "Correct. Do not mask recovery/handling evidence with process knobs."],
        ["Check backside/edge signature", false, "This is part of the evidence chain."]
      ],
      weakness: "post-PM recovery discipline"
    },
    {
      scenario: "rtp-overshoot",
      ask: "RTP overshoot에서 stop condition에 가장 가까운 것은?",
      choices: [
        ["Thermal instability or slip/stress evidence", true, "Correct. Thermal safety and wafer damage risk come first."],
        ["Operator preference", false, "Stop condition must be evidence and safety driven."],
        ["Wafer color looks normal", false, "Visual impression is not enough."]
      ],
      weakness: "RTP thermal risk"
    },
    {
      scenario: "rtp-pcw-drift",
      ask: "Cooling drift가 의심되면 누구의 evidence가 필요한가?",
      choices: [
        ["Facility/PCW owner status plus thermal overlay", true, "Correct. Separate facility drift from chamber/process drift."],
        ["Only gas cabinet owner", false, "Gas can matter elsewhere, but PCW drift needs cooling utility evidence."],
        ["Only metrology operator", false, "Metrology confirms result, not utility stability."]
      ],
      weakness: "facility evidence separation"
    },
    {
      scenario: "rtp-pyrometry",
      ask: "Trace는 좋아 보이는데 wafer result가 이상하면?",
      choices: [
        ["Verify wafer ID, pyrometry confidence, repeat metrology", true, "Correct. First prove the evidence chain is valid."],
        ["Assume physics is impossible", false, "Unverified data association can mislead."],
        ["Skip sensor context", false, "Pyrometry/emissivity context is central."]
      ],
      weakness: "data association discipline"
    }
  ];
  return cases.find(item => item.scenario === scenario.id) || cases[activeTraceCaseIndex % cases.length] || cases[0];
}

const traceImportSample = `time_s,temp_actual_c,pressure_torr,mfc_si_actual,mfc_dopant_actual,exhaust_flow_pct,thickness_nm,rs_ohm_sq
0,55,48,51,4.2,82,0,128
1,59,49,53,4.2,82,4,127
2,65,51,55,4.3,81,9,126
3,72,53,57,4.4,79,15,124
4,76,57,58,4.8,77,21,121
5,75,59,58,5.1,75,27,118
6,73,58,57,5.3,74,33,115
7,70,56,55,5.2,76,38,114
8,66,54,54,5.1,78,43,113
9,62,52,53,5.0,80,47,113
10,58,50,52,4.9,82,50,114`;

function traceHashText(text = "") {
  let hash = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return `fnv1a-${(hash >>> 0).toString(16).padStart(8, "0")}`;
}

function splitTraceCsvLine(line, delimiter) {
  const cells = [];
  let current = "";
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];
    if (char === '"' && quoted && next === '"') {
      current += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === delimiter && !quoted) {
      cells.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  cells.push(current.trim());
  return cells;
}

function detectTraceDelimiter(line = "") {
  const candidates = [",", "\t", ";"];
  return candidates
    .map(delimiter => ({ delimiter, count: splitTraceCsvLine(line, delimiter).length }))
    .sort((a, b) => b.count - a.count)[0]?.delimiter || ",";
}

function traceNumber(value) {
  if (value === null || value === undefined) return null;
  const cleaned = String(value).replace(/[%_\s]/g, "").replace(/,/g, "");
  if (!cleaned || cleaned === "-" || cleaned.toLowerCase() === "nan") return null;
  const next = Number(cleaned);
  return Number.isFinite(next) ? next : null;
}

function parseTraceTable(text = "") {
  const lines = text
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(Boolean)
    .slice(0, 1200);
  if (lines.length < 2) throw new Error("At least one header row and one data row are required.");
  const delimiter = detectTraceDelimiter(lines[0]);
  const headers = splitTraceCsvLine(lines[0], delimiter).map((header, index) => header || `column_${index + 1}`);
  const rows = lines.slice(1).map(line => {
    const cells = splitTraceCsvLine(line, delimiter);
    const row = {};
    headers.forEach((header, index) => {
      row[header] = cells[index] ?? "";
    });
    return row;
  });
  return { delimiter, headers, rows };
}

function inferTraceColumnKind(name = "") {
  const n = name.toLowerCase();
  if (/time|sec|min|timestamp|date/.test(n)) return "time";
  if (/temp|thermal|pyro|lamp|heater/.test(n)) return "thermal";
  if (/press|vac|torr|mbar|pump/.test(n)) return "vacuum";
  if (/mfc|flow|gas|si|ge|dop|hcl|h2|n2|ar/.test(n)) return "gas-delivery";
  if (/exhaust|scrub|abat|duct/.test(n)) return "exhaust-abatement";
  if (/thick|film|rs|sheet|metrology|particle|defect|uniform|ge_|dose/.test(n)) return "metrology";
  if (/pcw|cool|water|facility|cda|utility/.test(n)) return "facility";
  return "unknown";
}

function summarizeTraceColumn(name, rows) {
  const values = rows.map(row => traceNumber(row[name])).filter(value => value !== null);
  if (values.length < 2) return null;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const first = values[0];
  const last = values[values.length - 1];
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  const drift = last - first;
  const span = max - min;
  const deltas = values.slice(1).map((value, index) => value - values[index]);
  const volatility = deltas.reduce((sum, value) => sum + Math.abs(value), 0) / Math.max(1, deltas.length);
  const direction = Math.abs(drift) < Math.max(0.001, span * 0.12) ? "stable" : drift > 0 ? "rising" : "falling";
  const kind = inferTraceColumnKind(name);
  return {
    name,
    kind,
    sampleCount: values.length,
    min: Number(min.toFixed(3)),
    max: Number(max.toFixed(3)),
    mean: Number(mean.toFixed(3)),
    first: Number(first.toFixed(3)),
    last: Number(last.toFixed(3)),
    drift: Number(drift.toFixed(3)),
    span: Number(span.toFixed(3)),
    volatility: Number(volatility.toFixed(3)),
    direction,
    values: values.slice(0, 180).map(value => Number(value.toFixed(3)))
  };
}

function traceColumnSeverity(column) {
  if (!column) return 0;
  const relativeDrift = Math.abs(column.drift) / Math.max(1, Math.abs(column.mean), column.span);
  const relativeVolatility = column.volatility / Math.max(1, Math.abs(column.mean), column.span);
  return Math.min(100, Math.round(relativeDrift * 140 + relativeVolatility * 85 + Math.min(18, column.span)));
}

function buildTraceImportPacket(text, label = "manual trace") {
  const parsed = parseTraceTable(text);
  const columns = parsed.headers
    .map(header => summarizeTraceColumn(header, parsed.rows))
    .filter(Boolean);
  if (!columns.length) throw new Error("No numeric trace columns were found.");
  const signalColumns = columns.filter(column => column.kind !== "time");
  const ranked = [...(signalColumns.length ? signalColumns : columns)].sort((a, b) => traceColumnSeverity(b) - traceColumnSeverity(a));
  const subsystemCounts = ranked.reduce((acc, column) => {
    acc[column.kind] = (acc[column.kind] || 0) + traceColumnSeverity(column);
    return acc;
  }, {});
  const rankedSubsystems = Object.entries(subsystemCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([kind, score]) => ({ kind, score: Math.round(score) }));
  const evidence = ranked.slice(0, 5).map(column => `${column.name}: ${column.direction}, drift ${column.drift}, span ${column.span}`);
  const top = ranked[0];
  const second = ranked[1];
  const subsystem = rankedSubsystems[0]?.kind || "unknown";
  const likely = subsystem === "thermal"
    ? "thermal control, susceptor/lamp response, pyrometry confidence, cooling margin"
    : subsystem === "vacuum"
      ? "pressure control, pump conductance, leak/outgassing, APC/gauge evidence"
      : subsystem === "gas-delivery"
        ? "MFC actual response, gas cabinet supply, purge memory, line readiness"
        : subsystem === "exhaust-abatement"
          ? "exhaust conductance, scrubber/abatement readiness, byproduct removal path"
          : subsystem === "metrology"
            ? "wafer map/metrology association, baseline drift, module matching"
            : subsystem === "facility"
              ? "facility utility stability, owner status, trend correlation"
              : "data association and trace quality first";
  const stop = subsystem === "gas-delivery" || subsystem === "exhaust-abatement"
    ? "Stop if toxic/flammable/corrosive gas readiness, detector state, exhaust, or abatement owner evidence is missing."
    : subsystem === "thermal"
      ? "Stop if thermal control is unstable, wafer damage/slip is suspected, or pyrometry confidence is not defensible."
      : "Stop if trace-to-wafer/metrology association is broken or baseline wafer trend repeats without owner review.";
  const now = new Date().toISOString();
  const packet = {
    id: `trace-packet-${traceHashText(`${label}:${now}:${text.slice(0, 4000)}`).slice(-8)}-${Date.now().toString(36)}`,
    schemaVersion: "trace-intelligence-packet-v1",
    type: "FEP/EPI/RTP Trace Intelligence Packet",
    title: `Trace analyzer: ${label}`,
    subsystem: "FEP/EPI/RTP",
    severity: traceColumnSeverity(top) >= 55 ? "review-required" : "learning-review",
    privacyLevel: "work-learning",
    exportPolicy: "ai-summary-ok",
    aiExportOk: true,
    recordKind: "structured-summary",
    storageTier: "d1-summary-only",
    sourceDevice: navigator.userAgent ? traceHashText(navigator.userAgent).slice(0, 18) : "browser-session",
    createdAt: now,
    updatedAt: now,
    label,
    rawDataStored: false,
    rawHash: traceHashText(text),
    delimiter: parsed.delimiter === "\t" ? "tab" : parsed.delimiter,
    rowCount: parsed.rows.length,
    columnCount: parsed.headers.length,
    numericColumnCount: columns.length,
    tags: ["FEP/EPI/RTP", "trace", "metrology", subsystem],
    entities: ["EPI", "RTP", "trace", "wafer", "metrology", subsystem],
    topic: "trace-to-metrology evidence",
    chapter: "Process Visual / Trace Analyzer",
    summary: `Uploaded trace summary only. Dominant signal: ${top.name} (${top.kind}) ${top.direction}; drift ${top.drift}, span ${top.span}. ${second ? `Secondary: ${second.name} (${second.kind}) ${second.direction}.` : ""}`,
    evidence: evidence.join("\n"),
    action: `Correlate ${top.name} with wafer ID, event timestamps, baseline wafer, module history, and owner evidence before any process conclusion.`,
    result: "Training packet generated from browser-side parsing. Raw CSV was not saved.",
    nextAction: `Review likely subsystem: ${likely}. Build a customer report with symptom, evidence, owner, stop condition, and prevention.`,
    stopCondition: stop,
    customerReport: `Trace review shows ${top.name} is the strongest changing signal. We are correlating it with wafer/metrology association, module history, and ${subsystem} owner evidence before release.`,
    likelySubsystems: rankedSubsystems.slice(0, 5),
    columns: columns.map(({ values, ...column }) => column),
    series: ranked.slice(0, 5).map(column => ({ name: column.name, kind: column.kind, values: column.values }))
  };
  return packet;
}

function traceImportPath(values = [], width = 430, height = 136) {
  if (!values.length) return "";
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = Math.max(1e-9, max - min);
  return values.map((value, index) => {
    const x = 26 + (index / Math.max(1, values.length - 1)) * (width - 46);
    const y = 14 + (1 - (value - min) / span) * (height - 34);
    return `${index ? "L" : "M"} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ");
}

function renderTraceImportPacket(packet) {
  if (!packet) {
    return `
      <div class="trace-import-empty">
        <strong>No trace packet yet</strong>
        <span>CSV/TSV를 업로드하거나 sample을 불러오면 browser 안에서만 raw를 읽고, D1에는 요약 패킷만 저장할 수 있습니다.</span>
      </div>
    `;
  }
  const series = packet.series || [];
  return `
    <div class="trace-import-summary">
      <article><span>Rows</span><strong>${packet.rowCount}</strong><small>${packet.numericColumnCount} numeric columns</small></article>
      <article><span>Dominant</span><strong>${packet.series?.[0]?.name || "n/a"}</strong><small>${packet.likelySubsystems?.[0]?.kind || "unknown"}</small></article>
      <article><span>Raw storage</span><strong>${packet.rawDataStored ? "stored" : "not stored"}</strong><small>${packet.rawHash}</small></article>
    </div>
    <svg class="trace-import-chart" viewBox="0 0 430 150" role="img" aria-label="Imported trace normalized chart">
      <title>Imported trace normalized chart</title>
      <desc>Top changing numeric columns normalized to show direction and relative instability.</desc>
      <g class="trace-grid">
        ${[0, 1, 2].map(i => `<line x1="24" y1="${26 + i * 42}" x2="410" y2="${26 + i * 42}"></line>`).join("")}
      </g>
      ${series.map((item, index) => `<path class="trace-import-line trace-import-${index}" d="${traceImportPath(item.values, 430, 150)}"></path>`).join("")}
      <text x="26" y="142">normalized imported trace, no recipe/setpoint</text>
    </svg>
    <div class="trace-import-series">
      ${series.map((item, index) => `<span class="trace-import-${index}"><i></i>${item.name}<em>${item.kind}</em></span>`).join("")}
    </div>
    <div class="trace-import-columns">
      ${packet.columns.slice(0, 8).map(column => `
        <article>
          <b>${column.name}</b>
          <span>${column.kind} / ${column.direction}</span>
          <small>first ${column.first}, last ${column.last}, drift ${column.drift}, volatility ${column.volatility}</small>
        </article>
      `).join("")}
    </div>
    <div class="trace-report-card">
      <strong>Generated CE packet</strong>
      <p>${packet.customerReport}</p>
      <small>Stop: ${packet.stopCondition}</small>
    </div>
  `;
}

async function saveTracePacketToD1(packet) {
  const response = await fetch("/api/v4/records", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-ThinkTank-Password": sessionStorage.getItem("ceTrainerPass") || ""
    },
    body: JSON.stringify(packet)
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.ok) throw new Error(data.error || `save failed ${response.status}`);
  return data;
}

function renderEpiTraceLab() {
  const root = document.querySelector("#epi-trace-lab");
  if (!root) return;
  const scenario = getTraceScenario();
  const score = traceEvidenceScore(scenario);
  const selectedDeck = epiTraceEvidenceDeck.filter(item => traceEvidenceSelection.has(item[0]));
  const mapSize = 9;
  const svgWidth = 430;
  const svgHeight = 172;
  const lines = [
    ["Temperature", "temp", "trace-temp"],
    ["Pressure", "pressure", "trace-pressure"],
    ["MFC actual", "flow", "trace-flow"],
    ["Exhaust", "exhaust", "trace-exhaust"],
    ["Metrology", "metric", "trace-metric"]
  ].map(([label, key, className]) => ({ label, key, className, points: tracePointSeries(scenario, key) }));
  const rtpScores = computeRtpThermalScores();
  const game = traceGameCase();
  const attempts = state.traceCaseAttempts || {};
  const weakness = state.traceWeakness || {};
  const importPacket = state.traceImportPacket || null;
  root.innerHTML = `
    <div class="trace-lab-head">
      <div>
        <p class="eyebrow">Trace / Metrology Intelligence Lab</p>
        <h3>Wafer map, tool trace, RTP thermal curve를 한 화면에서 연결</h3>
        <span>합성 교육 모델입니다. 실제 recipe, valve sequence, detector setpoint, interlock bypass, site-specific acceptance limit은 의도적으로 제외합니다.</span>
      </div>
      <div class="trace-scenario-strip">
        ${epiTraceScenarios.map(item => `
          <button type="button" class="${item.id === scenario.id ? "active" : ""}" data-trace-scenario="${item.id}">
            <b>${item.family}</b><span>${item.title}</span>
          </button>
        `).join("")}
      </div>
    </div>
    <div class="trace-view-tabs" role="tablist" aria-label="Trace lab view">
      ${[["trace", "Trace overlay"], ["map", "Wafer map"], ["evidence", "Evidence packet"], ["rtp", "RTP thermal twin"], ["game", "Case game"], ["import", "Trace CSV analyzer"]].map(([id, label]) => `
        <button type="button" class="${activeTraceView === id ? "active" : ""}" data-trace-view="${id}" aria-selected="${activeTraceView === id}">${label}</button>
      `).join("")}
    </div>
    <section class="trace-main-grid" data-view="${activeTraceView}">
      <article class="trace-plot-panel">
        <div class="trace-panel-title">
          <p class="eyebrow">${scenario.family} scenario</p>
          <h3>${scenario.title}</h3>
          <span>${scenario.symptom}</span>
        </div>
        <svg class="trace-overlay-chart" viewBox="0 0 ${svgWidth} ${svgHeight}" role="img" aria-label="Synthetic trace overlay for ${scenario.title}">
          <title>${scenario.title} synthetic trace overlay</title>
          <desc>Relative educational trace lines for temperature, pressure, MFC actual, exhaust, and metrology. No real recipe or setpoint is shown.</desc>
          <g class="trace-grid">
            ${[0, 1, 2, 3].map(i => `<line x1="30" y1="${24 + i * 36}" x2="${svgWidth - 18}" y2="${24 + i * 36}"></line>`).join("")}
            ${[0, 1, 2, 3, 4].map(i => `<line x1="${34 + i * 82}" y1="12" x2="${34 + i * 82}" y2="${svgHeight - 22}"></line>`).join("")}
          </g>
          ${lines.map(item => `<path class="${item.className}" d="${traceSvgPath(item.points, svgWidth, svgHeight)}"></path>`).join("")}
          <text x="34" y="164">carrier/wafer event chain -> process interval -> metrology association</text>
        </svg>
        <div class="trace-legend">
          ${lines.map(item => `<span class="${item.className}"><i></i>${item.label}</span>`).join("")}
        </div>
      </article>
      <article class="trace-wafer-panel">
        <div class="trace-panel-title">
          <p class="eyebrow">Wafer map mental model</p>
          <h3>결과 shape를 subsystem 질문으로 번역</h3>
          <span>색은 상대값입니다. 실제 spec/acceptance limit이 아닙니다.</span>
        </div>
        <div class="trace-wafer-map" aria-label="relative wafer map">
          ${Array.from({ length: mapSize * mapSize }, (_, index) => {
            const row = Math.floor(index / mapSize);
            const col = index % mapSize;
            const value = traceWaferValue(scenario, row, col, mapSize);
            const dx = col - (mapSize - 1) / 2;
            const dy = row - (mapSize - 1) / 2;
            const hidden = Math.sqrt(dx * dx + dy * dy) > 4.25;
            const hue = Math.round(155 + value * 0.65);
            const light = Math.round(18 + value * 0.34);
            return `<span class="${hidden ? "empty" : ""}" style="--trace-map:${value}; --trace-hue:${hue}; --trace-light:${light}%;" aria-label="map cell ${row + 1}-${col + 1} ${value}">${hidden ? "" : value}</span>`;
          }).join("")}
        </div>
        <div class="trace-hypothesis">
          <b>Likely subsystem questions</b>
          <p>${scenario.likely}</p>
          <b>Stop condition</b>
          <p>${scenario.stop}</p>
        </div>
      </article>
      <article class="trace-evidence-panel">
        <div class="trace-panel-title">
          <p class="eyebrow">Evidence board</p>
          <h3>선택한 증거가 hypothesis를 지지하는가</h3>
          <span>필수 evidence ${score.hits}/${score.required.length}, extra ${score.extras}, score ${score.score}</span>
        </div>
        <div class="trace-evidence-deck">
          ${epiTraceEvidenceDeck.map(([id, label, hint]) => `
            <button type="button" class="${traceEvidenceSelection.has(id) ? "active" : ""} ${scenario.evidence.includes(id) ? "needed" : ""}" data-trace-evidence="${id}">
              <b>${label}</b><span>${hint}</span>
            </button>
          `).join("")}
        </div>
        <div class="trace-report-card">
          <strong>Customer report draft</strong>
          <p>${scenario.report}</p>
          <small>${selectedDeck.length ? `Selected: ${selectedDeck.map(item => item[1]).join(", ")}` : "증거 카드를 선택하면 보고 패킷에 들어갑니다."}</small>
        </div>
      </article>
      <article class="rtp-twin-panel">
        <div class="trace-panel-title">
          <p class="eyebrow">RTP Thermal Twin</p>
          <h3>Ramp, soak, cool을 wafer risk로 번역</h3>
          <span>상대 교육 모델입니다. 실제 온도/시간 setpoint를 의미하지 않습니다.</span>
        </div>
        <svg class="rtp-curve" viewBox="0 0 430 122" role="img" aria-label="RTP educational thermal curve">
          <title>RTP relative thermal curve</title>
          <desc>Relative ramp, soak, and cool-down curve influenced by training knobs.</desc>
          <path class="rtp-zone" d="M18 92 H412"></path>
          <path class="rtp-thermal" d="${rtpCurvePath(430, 122)}"></path>
          <text x="24" y="112">ramp</text><text x="162" y="112">soak/spike</text><text x="320" y="112">cool</text>
        </svg>
        <div class="rtp-knob-grid">
          ${rtpTraceKnobDefs.map(([id, label, hint]) => `
            <label>
              <span><b>${label}</b><em>${rtpTraceKnobs[id]}</em></span>
              <input type="range" min="0" max="100" value="${rtpTraceKnobs[id]}" data-rtp-trace-knob="${id}" aria-label="${label}" />
              <small>${hint}</small>
            </label>
          `).join("")}
        </div>
        <div class="rtp-score-grid">
          ${[
            ["Activation confidence", rtpScores.activation, false],
            ["Slip/stress risk", rtpScores.slipRisk, true],
            ["Diffusion risk", rtpScores.diffusionRisk, true],
            ["Repeatability", rtpScores.repeatability, false]
          ].map(([label, value, risk]) => `
            <span class="${risk ? "risk" : ""}"><b>${label}</b><i><u style="width:${value}%"></u></i><em>${value}</em></span>
          `).join("")}
        </div>
      </article>
      <article class="trace-game-panel">
        <div class="trace-panel-title">
          <p class="eyebrow">CE / PE case game</p>
          <h3>${game.ask}</h3>
          <span>현재 시나리오의 즉시 판단 훈련입니다. 오답은 weakness에 저장됩니다.</span>
        </div>
        <div class="trace-game-choices">
          ${game.choices.map(([label, good], index) => `
            <button type="button" class="${attempts[`${scenario.id}:${index}`] || ""}" data-trace-choice="${index}" data-good="${good}">
              ${label}
            </button>
          `).join("")}
        </div>
        <div class="trace-game-feedback" id="trace-game-feedback">
          ${Object.keys(weakness).length ? `Weakness top: ${Object.entries(weakness).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([k, v]) => `${k} ${v}`).join(" / ")}` : "아직 저장된 오답이 없습니다."}
        </div>
      </article>
      <article class="trace-import-panel">
        <div class="trace-panel-title">
          <p class="eyebrow">Trace CSV Analyzer</p>
          <h3>내 trace를 evidence packet으로 바꾸기</h3>
          <span>CSV/TSV 원문은 브라우저에서만 읽고 저장하지 않습니다. D1에는 column profile, hash, evidence, report summary만 저장합니다.</span>
        </div>
        <div class="trace-import-controls">
          <label>
            <span>CSV/TSV file</span>
            <input id="trace-file-input" type="file" accept=".csv,.tsv,.txt,text/csv,text/tab-separated-values" />
          </label>
          <label>
            <span>Paste trace text</span>
            <textarea id="trace-paste-input" placeholder="time,temp_actual,pressure,mfc_actual,exhaust,thickness..."></textarea>
          </label>
          <div class="trace-import-actions">
            <button type="button" class="secondary" data-trace-load-sample>sample 불러오기</button>
            <button type="button" class="primary" data-trace-analyze-paste>붙여넣은 trace 분석</button>
            <button type="button" class="secondary" data-trace-copy-packet ${importPacket ? "" : "disabled"}">패킷 복사</button>
            <button type="button" class="primary" data-trace-save-packet ${importPacket ? "" : "disabled"}">D1에 요약 저장</button>
          </div>
          <small class="trace-import-status" id="trace-import-status">${traceImportStatus || traceRemoteSaveStatus || "raw file is not stored; summary packet only."}</small>
        </div>
        <div class="trace-import-result">
          ${renderTraceImportPacket(importPacket)}
        </div>
      </article>
    </section>
    <div class="trace-boundary-note">
      <strong>Safety boundary</strong>
      <span>이 lab은 공개자료 기반 mental model과 synthetic data입니다. 실제 gas hook-up, qualification, detector setpoint, recipe, valve sequence, interlock logic, site-specific criteria는 공식 교육과 승인 문서가 우선입니다.</span>
    </div>
  `;

  root.querySelectorAll("[data-trace-scenario]").forEach(button => {
    button.addEventListener("click", () => {
      activeTraceScenario = button.dataset.traceScenario;
      state.activeTraceScenario = activeTraceScenario;
      traceEvidenceSelection.clear();
      state.traceEvidenceSelection = [];
      persistState();
      renderEpiTraceLab();
    });
  });
  root.querySelectorAll("[data-trace-view]").forEach(button => {
    button.addEventListener("click", () => {
      activeTraceView = button.dataset.traceView;
      state.activeTraceView = activeTraceView;
      persistState();
      renderEpiTraceLab();
    });
  });
  root.querySelectorAll("[data-trace-evidence]").forEach(button => {
    button.addEventListener("click", () => {
      const id = button.dataset.traceEvidence;
      if (traceEvidenceSelection.has(id)) traceEvidenceSelection.delete(id);
      else traceEvidenceSelection.add(id);
      state.traceEvidenceSelection = [...traceEvidenceSelection];
      persistState();
      renderEpiTraceLab();
    });
  });
  root.querySelectorAll("[data-rtp-trace-knob]").forEach(input => {
    input.addEventListener("input", () => {
      rtpTraceKnobs[input.dataset.rtpTraceKnob] = Number(input.value);
      state.rtpTraceKnobs = { ...rtpTraceKnobs };
      persistState();
      renderEpiTraceLab();
    });
  });
  root.querySelectorAll("[data-trace-choice]").forEach(button => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.traceChoice);
      const good = button.dataset.good === "true";
      state.traceCaseAttempts = state.traceCaseAttempts || {};
      state.traceCaseAttempts[`${scenario.id}:${index}`] = good ? "good" : "bad";
      if (!good) {
        state.traceWeakness = state.traceWeakness || {};
        state.traceWeakness[game.weakness] = (state.traceWeakness[game.weakness] || 0) + 1;
      }
      persistState();
      const feedback = root.querySelector("#trace-game-feedback");
      if (feedback) {
        const detail = game.choices[index]?.[2] || "";
        feedback.textContent = `${good ? "Correct" : "Review"}: ${detail}`;
      }
      root.querySelectorAll("[data-trace-choice]").forEach(choice => {
        const isGood = choice.dataset.good === "true";
        choice.classList.toggle("good", isGood);
        choice.classList.toggle("bad", !isGood && choice === button);
      });
    });
  });
  function setTraceImportStatus(message) {
    traceImportStatus = message;
    state.traceImportStatus = message;
    persistState();
    const status = root.querySelector("#trace-import-status");
    if (status) status.textContent = message;
  }
  function analyzeTraceText(text, label) {
    try {
      const packet = buildTraceImportPacket(text, label);
      state.traceImportPacket = packet;
      state.traceImportPackets = [packet, ...(state.traceImportPackets || []).filter(item => item.id !== packet.id)].slice(0, 12);
      traceRemoteSaveStatus = "";
      setTraceImportStatus(`분석 완료: ${packet.rowCount} rows, ${packet.numericColumnCount} numeric columns, dominant ${packet.series?.[0]?.name || "n/a"}`);
      persistState();
      renderEpiTraceLab();
    } catch (error) {
      setTraceImportStatus(`분석 실패: ${error.message || error}`);
    }
  }
  root.querySelector("#trace-file-input")?.addEventListener("change", event => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 1_200_000) {
      setTraceImportStatus("파일이 너무 큽니다. 교육용 analyzer는 1.2MB 이하 trace summary만 처리합니다.");
      return;
    }
    const reader = new FileReader();
    reader.addEventListener("load", () => analyzeTraceText(String(reader.result || ""), file.name || "uploaded trace"));
    reader.addEventListener("error", () => setTraceImportStatus("파일을 읽지 못했습니다."));
    reader.readAsText(file);
  });
  root.querySelector("[data-trace-load-sample]")?.addEventListener("click", () => {
    const input = root.querySelector("#trace-paste-input");
    if (input) input.value = traceImportSample;
    analyzeTraceText(traceImportSample, "built-in EPI/RTP sample trace");
  });
  root.querySelector("[data-trace-analyze-paste]")?.addEventListener("click", () => {
    const text = root.querySelector("#trace-paste-input")?.value || "";
    analyzeTraceText(text, "pasted trace");
  });
  root.querySelector("[data-trace-copy-packet]")?.addEventListener("click", async () => {
    if (!state.traceImportPacket) return;
    try {
      await navigator.clipboard.writeText(JSON.stringify(state.traceImportPacket, null, 2));
      setTraceImportStatus("AI/CE packet JSON을 클립보드에 복사했습니다.");
    } catch {
      setTraceImportStatus("클립보드 복사 권한이 없어 실패했습니다.");
    }
  });
  root.querySelector("[data-trace-save-packet]")?.addEventListener("click", async () => {
    if (!state.traceImportPacket) return;
    setTraceImportStatus("D1에 trace summary packet 저장 중...");
    try {
      const data = await saveTracePacketToD1(state.traceImportPacket);
      traceRemoteSaveStatus = `D1 저장 완료: ${data.entry?.id || state.traceImportPacket.id}`;
      traceImportStatus = traceRemoteSaveStatus;
      state.traceImportStatus = traceRemoteSaveStatus;
      state.traceImportPacket = { ...state.traceImportPacket, syncStatus: "D1 saved", remoteSavedAt: new Date().toISOString() };
      persistState();
      renderEpiTraceLab();
    } catch (error) {
      traceRemoteSaveStatus = `D1 저장 실패: ${error.message || error}. 로컬 요약은 유지됩니다.`;
      setTraceImportStatus(traceRemoteSaveStatus);
    }
  });
}

function renderEpiMasterTheater(flow, currentStep) {
  const root = document.querySelector("#epi-master-theater");
  if (!root) return;
  const stepIndex = Math.min(activeProcessStep, epiMasterSteps.length - 1);
  const master = epiMasterSteps[stepIndex] || epiMasterSteps[0];
  const nodes = [
    ["efem", "EFEM/FI", "FOUP, load port, aligner"],
    ["loadlock", "Load Lock", "대기압과 vacuum 경계"],
    ["tm", "Transfer Module", "vacuum robot 교차로"],
    ["preclean", "Pre-clean", "native oxide/interface reset"],
    ["pm", "EPI PM", "heat + gas + crystal growth"],
    ["abatement", "Exhaust/Abatement", "residual/byproduct 처리"]
  ];
  root.innerHTML = `
    <div class="epi-theater-head">
      <div>
        <p class="eyebrow">EPI Master 3D Theater</p>
        <h3>FOUP에서 epitaxial layer까지 한 장면으로 보기</h3>
        <span>현재 선택 단계: ${master.stage} ${master.title}. 공개자료 기반 mental model이며 recipe, valve sequence, detector setpoint, site-specific limit는 제외합니다.</span>
      </div>
      <div class="epi-stage-badge">
        <strong>${master.stage}</strong>
        <span>${master.sourceTag}</span>
      </div>
    </div>
    <div class="epi-theater-grid">
      <div class="epi-3d-rig" data-active="${master.active}" style="--wafer-x:${master.wafer[0]}%; --wafer-y:${master.wafer[1]}%;">
        <div class="epi-floor-grid"></div>
        <div class="epi-wafer-orb"><span>W</span></div>
        ${nodes.map(([id, label, note]) => `
          <button class="epi-rig-node epi-${id} ${master.active === id ? "active" : ""}" type="button" aria-label="${label}">
            <strong>${label}</strong>
            <small>${note}</small>
          </button>
        `).join("")}
        <div class="epi-rig-line line-a"></div>
        <div class="epi-rig-line line-b"></div>
        <div class="epi-rig-line line-c"></div>
        <div class="epi-rig-line line-d"></div>
        <div class="epi-gas-vector ${["pm", "preclean"].includes(master.active) ? "active" : ""}">
          ${master.gases.map(gas => `<i>${gas}</i>`).join("")}
        </div>
      </div>
      <article class="epi-step-readout">
        <span class="epi-step-index">${master.stage}</span>
        <h3>${master.title}</h3>
        <p>${master.moduleState}</p>
        <div class="epi-state-pills">
          ${master.toolState.map(item => `<span>${item}</span>`).join("")}
        </div>
        <div class="epi-mini-stack">
          ${master.layers.map(([name, note, color, height]) => `
            <div style="--epi-layer-color:${color}; --epi-layer-height:${height}px">
              <strong>${name}</strong><small>${note}</small>
            </div>
          `).join("")}
        </div>
        <p class="epi-wafer-state">${master.waferState}</p>
      </article>
    </div>
    <div class="epi-safety-grid">
      <article>
        <strong>Gas 상태</strong>
        <p>${master.gasState}</p>
      </article>
      <article class="epi-stop-card">
        <strong>조심해야 할 조건</strong>
        <p>${master.hazard}</p>
      </article>
      <article>
        <strong>CE evidence</strong>
        <ul>${master.evidence.map(item => `<li>${item}</li>`).join("")}</ul>
      </article>
    </div>
    <div class="epi-comms-board">
      <div class="epi-comms-title">
        <strong>Fab host부터 PM까지 통신 mental model</strong>
        <span>설치 CE는 command 하나가 아니라 host, carrier, scheduler, module actual, safety state가 서로 맞는지 본다.</span>
      </div>
      <div class="epi-comms-lanes">
        ${epiCommunicationStack.map(([layer, role, boundary], index) => `
          <article class="${index === 2 ? "core" : ""}">
            <b>${layer}</b>
            <p>${role}</p>
            <small>${boundary}</small>
          </article>
        `).join("")}
      </div>
    </div>
    <div class="epi-utility-matrix">
      <div class="epi-comms-title">
        <strong>Gas / utility qualification 사고표</strong>
        <span>웹은 연결 순서가 아니라, 연결 전 확인해야 할 owner와 evidence를 훈련한다.</span>
      </div>
      ${epiUtilityQualificationMatrix.map(([family, examples, evidence, stop]) => `
        <article>
          <b>${family}</b>
          <span>${examples}</span>
          <p><strong>Evidence</strong> ${evidence}</p>
          <p><strong>Stop</strong> ${stop}</p>
        </article>
      `).join("")}
    </div>
    <div class="epi-public-grid">
      ${appliedEpiPublicMap.map(([title, text, url]) => `
        <a href="${url}" target="_blank" rel="noreferrer">
          <strong>${title}</strong>
          <span>${text}</span>
        </a>
      `).join("")}
    </div>
    <div class="epi-gas-atlas">
      ${epiGasSafetyAtlas.map(([gas, role, watch]) => `
        <span>
          <b>${gas}</b>
          <em>${role}</em>
          <small>${watch}</small>
        </span>
      `).join("")}
    </div>
    <div class="epi-qualification-guardrail">
      <strong>Qualification / hook-up 학습 경계</strong>
      <ul>${epiQualificationGuardrails.map(item => `<li>${item}</li>`).join("")}</ul>
    </div>
  `;
}

function renderProcessVisual() {
  const flowTabs = document.querySelector("#process-flow-tabs");
  const stepList = document.querySelector("#process-step-list");
  const chamber = document.querySelector("#process-chamber-visual");
  const stateGrid = document.querySelector("#process-state-grid");
  const waferView = document.querySelector("#wafer-layer-view");
  const detail = document.querySelector("#process-step-detail");
  const gasMatrix = document.querySelector("#process-gas-matrix");
  const sourceStrip = document.querySelector("#process-source-strip");
  if (!flowTabs || !stepList || !chamber || !stateGrid || !waferView || !detail || !gasMatrix || !sourceStrip) return;

  const { flow, step } = getActiveProcessVisual();
  document.querySelector("#process-flow-kicker").textContent = flow.kicker;
  document.querySelector("#process-flow-title").textContent = flow.title;
  document.querySelector("#process-flow-summary").textContent = flow.summary;
  renderEpiMasterTheater(flow, step);
  renderEpiProcessEngineerLab();
  renderEpiTraceLab();
  renderEpiMissionEngine();
  renderEpiMentalModelBuilder();
  renderCeIncidentKernel();

  flowTabs.innerHTML = `
    <p class="eyebrow">Process Book Page</p>
    <h2>흐름 선택</h2>
    ${processVisualFlows.map(item => `
      <button class="process-flow-tab ${item.id === flow.id ? "active" : ""}" type="button" data-process-flow="${item.id}">
        <strong>${item.title}</strong>
        <span>${item.kicker}</span>
      </button>
    `).join("")}
    <div class="process-basis">
      <strong>공개 근거</strong>
      <p>${flow.publicBasis}</p>
    </div>
  `;

  stepList.innerHTML = flow.steps.map((item, index) => `
    <button class="process-step-chip ${index === activeProcessStep ? "active" : ""}" type="button" data-process-step="${index}">
      <span>${String(index + 1).padStart(2, "0")}</span>
      <strong>${item.title.replace(/^\d+\.\s*/, "")}</strong>
    </button>
  `).join("");

  const modules = [
    ["loadlock", "LL", "Load Lock"],
    ["transfer", "TM", "Transfer"],
    ["preclean", "PC", "Pre-clean"],
    ["pm", "PM", "Process Chamber"],
    ["exhaust", "EXH", "Exhaust / Abatement"]
  ];
  chamber.innerHTML = `
    <div class="process-tool-map" data-area="${step.area}">
      ${modules.map(([area, short, label]) => `
        <div class="process-module ${step.area === area ? "active" : ""}" data-module="${area}">
          <b>${short}</b>
          <span>${label}</span>
        </div>
      `).join("")}
    </div>
    <div class="process-chamber-cutaway">
      <div class="gas-inlet ${step.gasTags.length ? "active" : ""}">
        <span>GAS IN</span>
        <div class="gas-pulse-cloud">
          ${step.gasTags.map((tag, index) => `<i style="--i:${index}">${tag}</i>`).join("")}
        </div>
      </div>
      <div class="mini-wafer">
        <span></span>
        <b>${step.area === "pm" ? "wafer on susceptor" : "wafer transfer state"}</b>
      </div>
      <div class="pump-duct ${step.pump.toLowerCase().includes("on") ? "active" : ""}">
        <span>PUMP</span>
      </div>
      <div class="exhaust-duct ${step.exhaust.toLowerCase().includes("exhaust") || step.exhaust.toLowerCase().includes("abatement") ? "active" : ""}">
        <span>EXHAUST</span>
      </div>
    </div>
  `;

  const stateCards = [
    ["Gas", step.gas],
    ["Pressure", step.pressure],
    ["Pump", step.pump],
    ["Purge", step.purge],
    ["Exhaust", step.exhaust],
    ["Thermal", step.temp]
  ];
  stateGrid.innerHTML = stateCards.map(([label, value]) => `
    <article>
      <span>${label}</span>
      <strong>${value}</strong>
    </article>
  `).join("");

  waferView.innerHTML = `
    <div class="wafer-cross-section">
      <div class="wafer-surface-scan"></div>
      <div class="wafer-layer-stack">
        ${step.layers.map(([name, note, color, height], index) => `
          <div class="wafer-layer ${index === step.layers.length - 1 ? "top-layer" : ""}" style="--layer-color:${color}; --layer-height:${height}px;">
            <strong>${name}</strong>
            <span>${note}</span>
          </div>
        `).join("")}
      </div>
      <div class="wafer-substrate-label">300 mm wafer cross-section concept</div>
    </div>
  `;

  detail.innerHTML = `
    <p class="eyebrow">${step.title}</p>
    <h2>${step.subtitle}</h2>
    <div class="process-safety-ribbon">
      <strong>Gas / state risk</strong>
      <div>
        ${step.gasTags.map(tag => `<span title="${processGasRisk(tag)}"><b>${tag}</b><small>${processGasRisk(tag)}</small></span>`).join("")}
      </div>
      <p>공개자료로 확인 가능한 위험 family만 표시합니다. 실제 gas 연결, recipe, valve sequence, detector setpoint는 공식 교육/현장 승인 문서가 우선입니다.</p>
    </div>
    <div class="detail-grid">
      <section class="info-block">
        <h3>장비가 하는 행위</h3>
        <p>${step.action}</p>
      </section>
      <section class="info-block">
        <h3>웨이퍼 위 변화</h3>
        <p>${step.waferEffect}</p>
      </section>
      <section class="info-block danger-block">
        <h3>CE가 봐야 할 증거</h3>
        <p>${step.ceWatch}</p>
      </section>
    </div>
  `;

  gasMatrix.innerHTML = `
    <div class="section-heading">
      <p>Gas role map</p>
      <h2>이 흐름에서 gas가 맡는 역할</h2>
    </div>
    <div class="process-gas-grid">
      ${flow.gasMatrix.map(([name, role, text]) => `
        <article>
          <span>${role}</span>
          <strong>${name}</strong>
          <p>${text}</p>
        </article>
      `).join("")}
    </div>
  `;

  sourceStrip.innerHTML = `
    <strong>공개 근거 링크</strong>
    ${flow.sources.map(([label, url]) => `<a href="${url}" target="_blank" rel="noreferrer">${label}</a>`).join("")}
  `;

  const evidenceLadder = document.querySelector("#process-evidence-ladder");
  const riskTranslator = document.querySelector("#process-risk-translator");
  if (evidenceLadder) {
    evidenceLadder.innerHTML = `
      <div class="section-heading">
        <p>Process to Evidence</p>
        <h2>공정 현상을 CE 증거로 번역하기</h2>
      </div>
      <div class="process-evidence-stack">
        ${epiEvidenceLadder.map(item => `
          <article>
            <strong>${item.title}</strong>
            <p>${item.process}</p>
            <small>${item.evidence}</small>
            <b>${item.ce}</b>
          </article>
        `).join("")}
      </div>
    `;
  }
  if (riskTranslator) {
    riskTranslator.innerHTML = `
      <div class="section-heading">
        <p>Senior Question Map</p>
        <h2>이상 징후를 질문으로 바꾸기</h2>
      </div>
      <div class="process-risk-table">
        <div class="process-risk-row head">
          <span>변수</span><span>공정 의미</span><span>현장 증상</span><span>선임 질문</span>
        </div>
        ${epiRiskTranslator.map(row => `
          <div class="process-risk-row">
            ${row.map((cell, index) => `<span data-label="${["변수", "공정 의미", "현장 증상", "선임 질문"][index]}">${cell}</span>`).join("")}
          </div>
        `).join("")}
      </div>
    `;
  }

  flowTabs.querySelectorAll("[data-process-flow]").forEach(button => {
    button.addEventListener("click", () => {
      activeProcessFlow = button.dataset.processFlow;
      activeProcessStep = 0;
      renderProcessVisual();
    });
  });
  stepList.querySelectorAll("[data-process-step]").forEach(button => {
    button.addEventListener("click", () => {
      activeProcessStep = Number(button.dataset.processStep);
      renderProcessVisual();
    });
  });
}

function renderElectrical() {
  document.querySelector("#electrical-hero").innerHTML = `
    <div>
      <p class="eyebrow">Safe Diagnostic Loop</p>
      <h2>전기 문제는 값을 재기 전에 에너지와 권한부터 확인합니다</h2>
      <p>DVM/DMM은 현장에서 가장 자주 쓰는 증거 수집 도구입니다. 하지만 좋은 CE는 먼저 도면, LOTO, CAT rating, lead 위치, 기준점, expected value를 확인한 뒤 측정합니다.</p>
    </div>
    <div class="electrical-hero-steps">
      ${electricalHero.map(([step, title, text]) => `
        <article>
          <span>${step}</span>
          <strong>${title}</strong>
          <small>${text}</small>
        </article>
      `).join("")}
    </div>
  `;

  document.querySelector("#electrical-path").innerHTML = electricalPath.map(item => `
    <article class="electrical-card">
      <span class="phase">${item.step}</span>
      <h2>${item.title}</h2>
      <p>${item.goal}</p>
      <strong>훈련</strong>
      <ul>${item.drills.map(drill => `<li>${drill}</li>`).join("")}</ul>
    </article>
  `).join("");

  document.querySelector("#meter-selector").innerHTML = `
    <p class="eyebrow">DVM Field Cases</p>
    <h2>측정 상황 선택</h2>
    ${meterCases.map(item => `
      <button class="meter-tab ${item.id === activeMeterCase ? "active" : ""}" data-meter-case="${item.id}">
        <strong>${item.title}</strong>
        <span>${item.symptom}</span>
      </button>
    `).join("")}
  `;

  const selected = meterCases.find(item => item.id === activeMeterCase) || meterCases[0];
  document.querySelector("#meter-panel").innerHTML = `
    <span class="scenario-status">DVM / DMM</span>
    <h2>${selected.title}</h2>
    <p>${selected.symptom}</p>
    <div class="meter-readout">
      <span>MODE</span>
      <strong>${selected.mode}</strong>
    </div>
    <div class="detail-grid">
      <section class="info-block">
        <h3>Probe / Lead 위치</h3>
        <p>${selected.leads}</p>
      </section>
      <section class="info-block">
        <h3>예상 정상값</h3>
        <p>${selected.expect}</p>
      </section>
      <section class="info-block">
        <h3>판단</h3>
        <p>${selected.means}</p>
      </section>
      <section class="info-block danger-block">
        <h3>실수하면 위험한 점</h3>
        <p>${selected.trap}</p>
      </section>
    </div>
  `;

  document.querySelector("#electrical-theory").innerHTML = `
    <h2>전기 이론을 현장 언어로</h2>
    ${electricalTheory.map(([title, body]) => `<div class="deep-item"><strong>${title}</strong><span>${body}</span></div>`).join("")}
  `;
  document.querySelector("#relay-lab").innerHTML = `
    <h2>Relay를 해부해서 보기</h2>
    ${relayConcepts.map(([title, body]) => `<div class="deep-item"><strong>${title}</strong><span>${body}</span></div>`).join("")}
  `;
  document.querySelector("#electrical-troubleshooting").innerHTML = `
    <h2>현장 고장 추적 루틴</h2>
    ${electricalTroubleshooting.map(([title, body]) => `<div class="deep-item"><strong>${title}</strong><span>${body}</span></div>`).join("")}
    <div class="dvm-builder">
      <div class="section-heading">
        <p>Expected Value Builder</p>
        <h2>DVM을 대기 전에 먼저 말해야 할 것</h2>
      </div>
      <p class="builder-note">좋은 측정은 “어디를 찍었나”보다 “정상이라면 어떤 값이어야 하는가”에서 시작합니다. 아래 카드를 읽고 expected, evidence, safety를 먼저 말한 뒤 측정한다고 상상하세요.</p>
      <div class="dvm-builder-grid">
        ${dvmExpectedValueDrills.map(item => `
          <article class="dvm-builder-card">
            <span>${item.title}</span>
            <h3>${item.symptom}</h3>
            <dl>
              <dt>Expected</dt><dd>${item.expected}</dd>
              <dt>Evidence</dt><dd>${item.evidence}</dd>
              <dt>Stop / Safety</dt><dd>${item.safety}</dd>
              <dt>Report</dt><dd>${item.report}</dd>
            </dl>
          </article>
        `).join("")}
      </div>
    </div>
  `;
  document.querySelector("#electrical-safety").innerHTML = `
    <h2>전기 작업 Stop 조건</h2>
    ${electricalSafetyRules.map(item => `<div class="deep-item"><span>${item}</span></div>`).join("")}
  `;

  document.querySelectorAll("[data-meter-case]").forEach(button => {
    button.addEventListener("click", () => {
      activeMeterCase = button.dataset.meterCase;
      renderElectrical();
    });
  });
}

function renderGasSafety() {
  document.querySelector("#gas-grid").innerHTML = gasProfiles.map(gas => `
    <article class="gas-card">
      <h2>${gas.name}</h2>
      <p>${gas.use}</p>
      <div class="hazards">${gas.hazards.map(hazard => `<span class="hazard">${hazard}</span>`).join("")}</div>
      <strong>Install / Qualification CE 관점</strong>
      <ul>${gas.ce.map(item => `<li>${item}</li>`).join("")}</ul>
    </article>
  `).join("");
  document.querySelector("#gas-install-checks").innerHTML = `
    <h2>Gas Install 체크 사고</h2>
    ${gasInstallChecks.map(item => `<div class="deep-item"><span>${item}</span></div>`).join("")}
  `;
  document.querySelector("#gas-qualification-checks").innerHTML = `
    <h2>Gas Qualification 체크 사고</h2>
    ${gasQualificationChecks.map(item => `<div class="deep-item"><span>${item}</span></div>`).join("")}
  `;
}

function renderEquipmentFamilies() {
  document.querySelector("#equipment-grid").innerHTML = equipmentFamilies.map(tool => `
    <article class="equipment-card">
      <h2>${tool.name}</h2>
      <span class="family">${tool.family}</span>
      <p>${tool.what}</p>
      <strong>공개 확인 포인트</strong>
      <ul>${tool.publicFacts.map(item => `<li>${item}</li>`).join("")}</ul>
      <strong>CE 학습 포인트</strong>
      <ul>${tool.study.map(item => `<li>${item}</li>`).join("")}</ul>
    </article>
  `).join("");
  document.querySelector("#option-split").innerHTML = `
    <h2>왜 옵션별로 많이 갈라지나</h2>
    ${optionSplits.map(([title, body]) => `<div class="deep-item"><strong>${title}</strong><span>${body}</span></div>`).join("")}
  `;
  document.querySelector("#equipment-study-path").innerHTML = `
    <h2>장비별 학습 순서</h2>
    ${equipmentStudyPath.map(([title, body]) => `<div class="deep-item"><strong>${title}</strong><span>${body}</span></div>`).join("")}
  `;
}

function renderCompliance() {
  document.querySelector("#compliance-list").innerHTML = `
    <h2>라인 준수 원칙</h2>
    <ul>${compliance.map(item => `<li>${item}</li>`).join("")}</ul>
  `;
  document.querySelector("#senior-playbook").innerHTML = `
    <h2>시니어 CE 사고법</h2>
    <ul>${seniorPlaybook.map(item => `<li>${item}</li>`).join("")}</ul>
  `;
}

function renderSources() {
  document.querySelector("#source-list").innerHTML = `
    <ul>${sources.map(([label, url]) => `<li><a href="${url}" target="_blank" rel="noreferrer">${label}</a></li>`).join("")}</ul>
  `;
}

function renderDeepDive() {
  document.querySelector("#source-quality-map").innerHTML = `
    <h2>공개자료 출처 등급</h2>
    ${sourceQualityMap.map(([title, body]) => `<div class="deep-item"><strong>${title}</strong><span>${body}</span></div>`).join("")}
  `;
  document.querySelector("#public-evidence-dossier").innerHTML = `
    <h2>구글링 공개 근거 Dossier</h2>
    ${publicEvidenceDossier.map(([title, body]) => `<div class="deep-item"><strong>${title}</strong><span>${body}</span></div>`).join("")}
  `;
  document.querySelector("#field-translation-rules").innerHTML = `
    <h2>자료를 현장 질문으로 바꾸는 법</h2>
    ${fieldTranslationRules.map(([title, body]) => `<div class="deep-item"><strong>${title}</strong><span>${body}</span></div>`).join("")}
  `;
  document.querySelector("#public-boundary-rules").innerHTML = `
    <h2>공개자료 경계선</h2>
    ${publicBoundaryRules.map(([title, body]) => `<div class="deep-item"><strong>${title}</strong><span>${body}</span></div>`).join("")}
  `;
  document.querySelector("#public-facts").innerHTML = `
    <h2>장비/공정 공개 팩트</h2>
    ${publicFacts.map(([title, body]) => `<div class="deep-item"><strong>${title}</strong><span>${body}</span></div>`).join("")}
  `;
  document.querySelector("#diagnostic-matrix").innerHTML = `
    <h2>증상별 진단 매트릭스</h2>
    ${diagnosticMatrix.map(([symptom, area, checks]) => `<div class="deep-item"><strong>${symptom} · ${area}</strong><span>${checks}</span></div>`).join("")}
  `;
  document.querySelector("#install-deliverables").innerHTML = `
    <h2>Install Deliverables</h2>
    ${installDeliverables.map(([title, body]) => `<div class="deep-item"><strong>${title}</strong><span>${body}</span></div>`).join("")}
  `;
  document.querySelector("#study-drills").innerHTML = `
    <h2>시니어급 반복 훈련</h2>
    ${studyDrills.map(([title, body]) => `<div class="deep-item"><strong>${title}</strong><span>${body}</span></div>`).join("")}
  `;
}

function renderGlossary() {
  const categories = ["전체", ...new Set(glossaryTerms.map(term => term[1]))];
  document.querySelector("#glossary-filters").innerHTML = categories.map(category => `
    <button class="filter-btn ${category === activeGlossaryCategory ? "active" : ""}" data-category="${category}">${category}</button>
  `).join("");

  const query = (document.querySelector("#glossary-search")?.value || "").trim().toLowerCase();
  const filtered = glossaryTerms.filter(([term, category, desc, why]) => {
    const matchCategory = activeGlossaryCategory === "전체" || category === activeGlossaryCategory;
    const haystack = `${term} ${category} ${desc} ${why}`.toLowerCase();
    return matchCategory && (!query || haystack.includes(query));
  });

  document.querySelector("#glossary-grid").innerHTML = filtered.map(([term, category, desc, why]) => `
    <article class="term-card">
      <h2>${term}</h2>
      <span class="tag">${category}</span>
      <p>${desc}</p>
      <strong>CE 관점</strong>
      <p>${why}</p>
    </article>
  `).join("") || `<article class="term-card"><h2>검색 결과 없음</h2><p>다른 용어로 검색해보세요.</p></article>`;

  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      activeGlossaryCategory = btn.dataset.category;
      renderGlossary();
    });
  });
}

function renderFab101() {
  document.querySelector("#fab101-grid").innerHTML = fabBasics.map(section => `
    <article class="deep-panel">
      <h2>${section.title}</h2>
      ${section.items.map(item => `<div class="deep-item"><span>${item}</span></div>`).join("")}
    </article>
  `).join("");
}

function renderPaperNotes() {
  document.querySelector("#paper-notes").innerHTML = paperNotes.map(note => `
    <article class="deep-panel">
      <h2>${note.title}</h2>
      <p class="eyebrow">${note.source}</p>
      ${note.notes.map(item => `<div class="deep-item"><span>${item}</span></div>`).join("")}
    </article>
  `).join("");
}

document.querySelectorAll("[data-view]").forEach(btn => btn.addEventListener("click", () => showView(btn.dataset.view)));
document.querySelectorAll("[data-view-jump]").forEach(btn => btn.addEventListener("click", () => showView(btn.dataset.viewJump)));
document.querySelector("#prev-question").addEventListener("click", () => {
  qIndex = (qIndex + questions.length - 1) % questions.length;
  renderQuiz();
});
document.querySelector("#next-question").addEventListener("click", () => {
  qIndex = (qIndex + 1) % questions.length;
  renderQuiz();
});
document.querySelector("#process-prev-step")?.addEventListener("click", () => {
  const { flow } = getActiveProcessVisual();
  activeProcessStep = (activeProcessStep + flow.steps.length - 1) % flow.steps.length;
  renderProcessVisual();
});
document.querySelector("#process-next-step")?.addEventListener("click", () => {
  const { flow } = getActiveProcessVisual();
  activeProcessStep = (activeProcessStep + 1) % flow.steps.length;
  renderProcessVisual();
});

renderRoleFit();
renderLearningUX();
renderCommandCenter();
renderCurriculum();
renderRoadmap();
renderSystems();
renderProcessVisual();
renderEquipmentFamilies();
renderScenarios();
renderQuiz();
renderFlashcards();
renderInstall();
renderRunbook();
renderFacility();
renderElectrical();
renderGasSafety();
renderCompliance();
renderSources();
renderDeepDive();
renderGlossary();
renderFab101();
renderPaperNotes();
renderMetrics();
bindGlobalUx();
showView("cognitive", { instant: true, skipMemory: true });
renderLearningHud();

document.querySelector("#glossary-search").addEventListener("input", renderGlossary);
