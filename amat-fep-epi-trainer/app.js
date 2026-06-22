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
    status: "Facility interface",
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
  "hook-up 전에는 drawing revision, P&ID, line label, flow direction, compatible materials, regulator/MFC range를 확인한다.",
  "gas line release는 customer facility owner, site EHS, OEM senior CE의 승인 체계 안에서 진행한다.",
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
  "qualification 실패 시 임의 recipe 보정이 아니라 변경점, gas delivery, vacuum, temperature, sensor, metrology를 분리해 보고한다.",
  "고객 보고는 gas name을 숨기지 말고 hazard, 현재 안전 상태, 확인된 계측값, 다음 승인 필요 항목을 분명히 말한다."
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

const publicFacts = [
  ["RTP 공정 목적", "Applied 공개 자료는 RTP/anneal을 wafer를 짧은 시간 특정 온도로 가열해 conductivity, permittivity, densification, contamination reduction 등 물성 변화를 만드는 영역으로 설명합니다."],
  ["RTP 방식", "공개 자료에서 soak, spike, millisecond anneal과 thermal-radical oxidation이 응용별로 언급됩니다. CE는 방식 이름보다 시간-온도 budget, repeatability, uniformity가 왜 중요한지 이해해야 합니다."],
  ["Vantage Radiance Plus", "공개 제품 설명에는 honeycomb lamp source, seven-point temperature measurement, 100 Hz closed-loop control, 240 rpm wafer rotation이 언급됩니다. 설치/진단 관점에서는 lamp zone, sensor 신뢰도, rotation, cooling, trace data가 연결됩니다."],
  ["Vantage Vulcan", "공개 설명은 lamp-based RTP, transmission-based multi-point temperature measurement, low-temperature closed-loop capability, wafer-to-wafer repeatability를 강조합니다."],
  ["Epitaxy 공정 목적", "Epitaxy는 결정성 foundation layer를 만들거나 engineered electrical properties를 가진 crystalline film을 증착하고 underlayer mechanical/electrical attribute를 바꾸는 공정으로 소개됩니다."],
  ["Centura Prime Epi", "공개 제품 설명은 source-drain, channel, contact, FinFET, GAA, memory/power/analog/MEMS 응용과 integrated pre-clean을 언급합니다."],
  ["Centura Xtera Epi", "공개 발표/제품 설명은 GAA source-drain 구조, selective epitaxy, low-volume chamber architecture, integrated pre-clean/etch, gas usage reduction 같은 방향을 설명합니다."],
  ["Customer Engineer 역할", "Applied 채용공고는 고객 onsite에서 install, maintain, upgrade를 수행하고 digital analytics로 troubleshooting하며 electrical, vacuum, mechanical, plasma, hydraulic, gas system을 다룬다고 설명합니다."]
];

const diagnosticMatrix = [
  ["Temperature uniformity", "RTP", "lamp zone, pyrometry/emissometry, wafer rotation, chamber window condition, cooling stability, recipe change history"],
  ["Pumpdown/base pressure", "Vacuum", "door seal, O-ring, valve state, pump health, foreline restriction, gauge calibration, recent PM work"],
  ["MFC setpoint mismatch", "Gas", "supply pressure, regulator, pneumatic valve, filter/restriction, MFC zero/span, gas cabinet ready, purge status"],
  ["Particle/defect jump", "EPI", "PM disturbance, chamber clean, wafer handling contact, pre-clean effectiveness, gas purity, exhaust/backstreaming, recipe drift"],
  ["Robot transfer alarm", "Mechanical", "teach position, leveling, end-effector, sensor timing, slit valve motion, cassette seating, vibration"],
  ["Interlock not ready", "Safety/facility", "exhaust/abatement status, cooling flow, door/cover, gas box, EMO loop, facility signal wiring, customer permit state"],
  ["Host/data issue", "Controls", "network, time sync, recipe permission, alarm history, data access policy, software revision, customer security approval"]
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
    title: "Facility Hook-up",
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
  ["Fab", "Fab기초", "Fabrication facility. 웨이퍼에 반도체 회로를 만드는 생산 공장입니다.", "CE는 fab 전체 생산 흐름 안에서 장비 uptime과 안전을 책임지는 역할입니다."],
  ["Wafer", "Fab기초", "반도체 소자를 만들기 위한 얇은 원판 기판입니다.", "모든 handling, contamination, thermal stress 리스크의 대상입니다."],
  ["Lot", "Fab기초", "여러 wafer를 묶어 관리하는 생산 단위입니다.", "장비 장애가 lot hold나 생산 영향으로 이어질 수 있습니다."],
  ["Slot", "Fab기초", "FOUP 안에서 wafer가 들어가는 위치 번호입니다.", "mapping 오류나 특정 slot scrape 문제를 추적할 때 중요합니다."],
  ["Route", "Fab기초", "wafer가 거치는 공정 순서입니다.", "CE는 해당 장비가 전체 route에서 어떤 역할인지 이해해야 고객 영향을 설명할 수 있습니다."],
  ["Metrology", "Fab기초", "두께, CD, overlay, defect, 저항 등 결과를 측정하는 영역입니다.", "qualification과 troubleshooting에서 장비 조치 결과를 확인하는 근거입니다."],
  ["Yield", "Fab기초", "최종적으로 정상 동작하는 chip 비율입니다.", "장비 안정성, contamination, uniformity가 yield와 연결됩니다."],
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
  ["AMC", "Fab기초", "Airborne Molecular Contamination. 공기 중 분자 오염입니다.", "particle뿐 아니라 분자 오염도 cleanroom 품질에 영향을 줍니다."],
  ["ESD", "안전", "Electrostatic Discharge. 정전기 방전입니다.", "전자부품 손상과 contamination control 관점에서 중요합니다."],
  ["Gowning", "Fab기초", "cleanroom 보호복을 절차대로 착용하는 과정입니다.", "사람이 가장 큰 contamination source 중 하나라서 중요합니다."],
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
    title: "Facility Hook-up",
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

const state = JSON.parse(localStorage.getItem("ceTrainerState") || "{}");
let activeSystem = systems[0].id;
let activeScenario = 0;
let qIndex = 0;
let activeMeterCase = "prove";
let activeGlossaryCategory = "전체";
let activeRunbookStage = fieldRunbookStages[0].id;
const uxPaletteState = { query: "", results: [] };

const uxHotViews = [
  ["runbook", "런북"],
  ["cluster", "구성"],
  ["electrical", "DVM"],
  ["english-test", "영어"],
  ["thinktank", "기록"]
];

function save() {
  persistState();
  renderMetrics();
  renderCommandCenter();
  renderRunbook();
  renderLearningHud();
}

function persistState() {
  localStorage.setItem("ceTrainerState", JSON.stringify(state));
}

function getNavLabel(id) {
  const button = document.querySelector(`.nav-btn[data-view="${id}"]`);
  return button?.textContent?.trim() || id;
}

function updateViewMemory(id) {
  state.lastView = id;
  state.viewVisits = state.viewVisits || {};
  state.viewVisits[id] = (state.viewVisits[id] || 0) + 1;
  state.recentViews = [id, ...(state.recentViews || []).filter(item => item !== id)].slice(0, 5);
  persistState();
}

function showView(id, options = {}) {
  if (!document.getElementById(id)) return;
  document.querySelectorAll(".view").forEach(view => view.classList.toggle("active", view.id === id));
  document.querySelectorAll(".nav-btn").forEach(btn => btn.classList.toggle("active", btn.dataset.view === id));
  if (!options.skipMemory) updateViewMemory(id);
  closeCommandPalette();
  renderLearningHud();
  document.title = `${getNavLabel(id)} | FEP/EPI CE Trainer`;
  window.scrollTo({ top: 0, behavior: options.instant ? "auto" : "smooth" });
}

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

function getUxSearchItems() {
  const navItems = [...document.querySelectorAll(".nav-btn[data-view]")].map(button => ({
    title: button.textContent.trim(),
    meta: "화면",
    body: `${button.dataset.view} 탭으로 이동`,
    view: button.dataset.view
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
  return [...navItems, ...commandItems, ...roadmapItems, ...systemItems, ...equipmentItems, ...gasItems, ...runbookItems];
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
  const currentView = document.querySelector(".view.active")?.id || state.lastView || "dashboard";
  const recentViews = (state.recentViews || [currentView]).filter(Boolean).slice(0, 3);
  root.innerHTML = `
    <div class="learning-hud-card">
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

function bindGlobalUx() {
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

  root.innerHTML = `
    <div class="command-head">
      <div>
        <p class="eyebrow">Mission Control</p>
        <h2>오늘은 이 순서로 누르면 됩니다</h2>
        <p>정보를 많이 읽기보다 구조를 만들고, 판단 기준을 체크하고, 경험을 저장하는 흐름으로 설계했습니다.</p>
      </div>
      <button class="primary" type="button" data-command-view="runbook">현장 런북 열기</button>
    </div>
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
    </div>
    <div class="command-next">
      <span class="command-badge">Next</span>
      <div>
        <strong>${nextMission.week} · ${nextMission.label}</strong>
        <small>${nextMission.hint}</small>
      </div>
      <button class="secondary" type="button" data-command-view="roadmap">로드맵에서 체크</button>
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
  document.querySelector("#install-mission-board").innerHTML = installMissionStages.map(stage => `
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
  `).join("");
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

renderRoleFit();
renderLearningUX();
renderCommandCenter();
renderRoadmap();
renderSystems();
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
showView(document.getElementById(state.lastView) ? state.lastView : "dashboard", { instant: true, skipMemory: true });
renderLearningHud();

document.querySelector("#glossary-search").addEventListener("input", renderGlossary);
