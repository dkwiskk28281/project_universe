const roleFit = [
  "설치: hook-up, leveling, facilities, acceptance 흐름 이해",
  "RTP: 짧은 시간 고온 열처리, ramp, soak, spike, temperature uniformity",
  "Epitaxy: 결정성 박막 성장, in-situ doping, selective growth, defect control",
  "서브시스템: vacuum, gas, thermal, electrical, mechanical, safety interlock",
  "진단: 로그·트렌드·계측값으로 사실과 가설 분리",
  "고객 대응: downtime, next action, risk, ETA를 명확히 공유"
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

const state = JSON.parse(localStorage.getItem("ceTrainerState") || "{}");
let activeSystem = systems[0].id;
let activeScenario = 0;
let qIndex = 0;
let activeGlossaryCategory = "전체";

function save() {
  localStorage.setItem("ceTrainerState", JSON.stringify(state));
  renderMetrics();
}

function showView(id) {
  document.querySelectorAll(".view").forEach(view => view.classList.toggle("active", view.id === id));
  document.querySelectorAll(".nav-btn").forEach(btn => btn.classList.toggle("active", btn.dataset.view === id));
  window.scrollTo({ top: 0, behavior: "smooth" });
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
renderRoadmap();
renderSystems();
renderEquipmentFamilies();
renderScenarios();
renderQuiz();
renderFlashcards();
renderInstall();
renderFacility();
renderGasSafety();
renderCompliance();
renderSources();
renderDeepDive();
renderGlossary();
renderFab101();
renderPaperNotes();
renderMetrics();

document.querySelector("#glossary-search").addEventListener("input", renderGlossary);
