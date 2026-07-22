(() => {
  const ROOT_ID = "fab-acclimation-root";
  const STATE_KEY = "projectUniverseFabAcclimationV1";
  const FIELD_LOG_VIEW = "field-log";
  const SAFETY_VIEW = "safety";

  const sourceLinks = [
    {
      title: "Applied Materials Field Service / Customer Engineer role",
      url: "https://jobs.appliedmaterials.com/job/santa-clara/field-service-customer-engineer-iii-c3/95/94725640016",
      point: "CE는 고객 현장 liaison으로 설치, 유지보수, upgrade, troubleshooting, 예방/교정 정비를 수행한다는 공개 역할 설명"
    },
    {
      title: "Samsung Semiconductor Global Code of Conduct",
      url: "https://semiconductor.samsung.com/sustainability/highlights/downloads/global-code-of-conduct/",
      point: "업무 수행에서 법규, 윤리, 정보보호, 책임 있는 행동 기준을 따르는 공개 행동 기준"
    },
    {
      title: "Samsung Austin Semiconductor EHS / Security programs",
      url: "https://semiconductor.samsung.com/sas/environmental-health-and-safety/",
      point: "반도체 현장에서 EHS, security, ISO 기반 관리 체계가 핵심 운영 축이라는 공개 자료"
    },
    {
      title: "Samsung Electronics Supplier Code of Conduct",
      url: "https://download.semiconductor.samsung.com/resources/others/Samsung_Electronics_Supplier_Code_of_Conduct_6.0_EN.pdf",
      point: "협력사와 현장 참여자가 privacy, information security, EHS, document control을 준수해야 한다는 공개 기준"
    },
    {
      title: "OSHA Safety in Semiconductor Manufacturing",
      url: "https://www.osha.gov/sites/default/files/publications/SEMICONDUCTORFS.pdf",
      point: "process enclosure, LOTO/EMO, gas detection, exhaust/waste treatment, gas cabinet 같은 일반 semiconductor safety layer"
    },
    {
      title: "OSHA Toxic Exhaust Gases",
      url: "https://www.osha.gov/semiconductors/solutions/toxic-gases",
      point: "startup, operation, maintenance, cleaning, emergency 등 여러 노출 시나리오를 식별하고 ventilation/PPE를 고려해야 한다는 공개 안전 기준"
    },
    {
      title: "SEMI Safety Standards overview",
      url: "https://www.semi.org/en/products-services/standards/safety",
      point: "S2, S6, S19, S22, S24 등 장비 safety, exhaust, service personnel training, electrical, multi-employer work area 관련 공개 표준 목록"
    }
  ];

  const arrivalSteps = [
    {
      id: "pre-arrival",
      title: "D-1 준비",
      place: "숙소 / 사무실",
      mentalModel: "Fab에 들어가기 전 이미 절반은 결정됩니다. 모르는 동선과 owner를 미리 적어두면 현장에서 덜 흔들립니다.",
      ask: [
        "내일 site entry 시간, meeting point, escort owner는 누구인가?",
        "필수 교육, PPE, tool access, 작업 permit 상태는 clear인가?",
        "내가 맡은 install phase와 오늘의 hold point는 어디인가?"
      ],
      observe: [
        "tool/platform, module name, install milestone, 필요한 owner 명단",
        "사진/노트/USB/노트북/네트워크 사용 가능 범위",
        "승인된 communication channel"
      ],
      doNot: [
        "고객 위치, 상세 동선, serial, schedule을 개인 메모에 원문으로 남기지 않기",
        "site rule을 senior에게 들은 풍문만으로 단정하지 않기"
      ],
      scriptKo: "내일 제가 맡는 정확한 scope와 hold point를 먼저 확인하고 들어가겠습니다. site rule상 사진이나 log export 가능 범위도 확인하겠습니다.",
      scriptEn: "Before entering the fab, I will confirm my scope, hold points, escort path, and approved documentation channel.",
      evidence: "scope, owner, training, permit, PPE, approved channel"
    },
    {
      id: "gate-badge",
      title: "Gate / badge",
      place: "보안 게이트",
      mentalModel: "여기는 기술 실력보다 규정 준수 태도를 보는 첫 관문입니다. 빠르게 통과하려는 사람보다 정확히 따르는 사람이 신뢰를 얻습니다.",
      ask: [
        "방문 목적과 host/escort가 명확한가?",
        "반입 물품과 전자기기 규정은 확인했는가?",
        "출입증, 교육 이수, 보안 서약 범위가 맞는가?"
      ],
      observe: [
        "badge color, escort required area, visitor boundary",
        "촬영, 저장매체, 네트워크 접속 제한 안내",
        "비상 연락 또는 emergency briefing 위치"
      ],
      doNot: [
        "동료가 한다고 그대로 따라가기",
        "개인 휴대폰으로 공정/장비/보안 관련 내용을 촬영하거나 전송하기",
        "badge, QR, gate process detail을 개인 기록에 남기기"
      ],
      scriptKo: "제가 접근 가능한 구역과 escort 필요 여부를 다시 확인하겠습니다.",
      scriptEn: "I will confirm the allowed access area and whether escort is required before moving.",
      evidence: "badge status, escort, allowed area, device rule"
    },
    {
      id: "gowning",
      title: "Gowning / smock",
      place: "Gowning room",
      mentalModel: "청정도는 장비 성능과 wafer defect에 직접 연결됩니다. 느려 보여도 contamination risk를 줄이는 동작이 우선입니다.",
      ask: [
        "site gowning 순서와 금지 동작은 무엇인가?",
        "장갑 교체, bootie, hood, mask, safety glasses 기준은 무엇인가?",
        "PPE가 손상되거나 오염되면 어디서 교체하는가?"
      ],
      observe: [
        "손 접촉 금지 영역, 바닥 zone, mirror check",
        "펜, 노트, tool pouch, particle source 가능 물품",
        "senior CE가 장갑/소매/hood를 어떻게 확인하는지"
      ],
      doNot: [
        "급하다고 순서 건너뛰기",
        "바닥/얼굴/휴대폰 접촉 후 그대로 장비 만지기",
        "불확실한 gowning 상태로 cleanroom 진입"
      ],
      scriptKo: "gowning 순서가 site마다 다를 수 있어서, 오늘 site 기준으로 한 번 확인하고 따라가겠습니다.",
      scriptEn: "Gowning rules can be site-specific, so I will follow today's approved sequence and ask if anything is unclear.",
      evidence: "PPE complete, no visible contamination, site gowning sequence"
    },
    {
      id: "cleanroom-entry",
      title: "Cleanroom entry",
      place: "Fab bay / subfab boundary",
      mentalModel: "Fab에서는 길을 아는 척하지 않는 게 실력입니다. 사람, lot, tool, gas, exhaust가 얽힌 공간이라 동선 실수가 리스크가 됩니다.",
      ask: [
        "내가 단독 이동 가능한 boundary는 어디까지인가?",
        "tool bay, subfab, gas cabinet, facility chase 중 어디가 escort 영역인가?",
        "alarm이나 emergency가 나면 내가 해야 할 첫 행동은 무엇인가?"
      ],
      observe: [
        "tool ID 대신 generic 위치 감각: bay, chase, subfab, service aisle",
        "고객 operator flow와 wafer/FOUP 이동 flow",
        "EHS signage, emergency stop, evacuation direction"
      ],
      doNot: [
        "허가 없이 subfab, gas cabinet, chase로 이동",
        "가동 장비 주변에서 몸/도구를 불필요하게 기대기",
        "고객 wafer, screen, label을 자세히 읽거나 기록"
      ],
      scriptKo: "제가 지금 이동 가능한 범위를 먼저 확인하겠습니다. 모르면 여기서 대기하고 owner에게 확인하겠습니다.",
      scriptEn: "I will confirm my movement boundary first. If I am not sure, I will wait here and check with the owner.",
      evidence: "movement boundary, escort rule, emergency path"
    },
    {
      id: "pre-job",
      title: "Pre-job brief",
      place: "Tool side",
      mentalModel: "작업 시작 전 3분 brief가 현장 실수를 막습니다. scope, owner, energy, gas, wafer impact, stop condition을 같은 문장으로 맞춥니다.",
      ask: [
        "오늘 scope와 out-of-scope는 무엇인가?",
        "전기, pneumatic, vacuum, gas, thermal, moving robot 중 어떤 energy가 살아 있는가?",
        "작업 중 stop condition과 escalation owner는 누구인가?"
      ],
      observe: [
        "LOTO/permit/witness 필요 여부",
        "tool state: idle, down, power off, pump state, gas ready, wafer present 여부",
        "customer schedule impact와 next update time"
      ],
      doNot: [
        "scope 밖의 문제를 즉흥적으로 같이 처리",
        "owner 없이 gas/electrical/safety boundary를 넘기",
        "확인 안 된 wafer/tool state를 추정으로 보고"
      ],
      scriptKo: "오늘 scope는 X이고, Y는 scope 밖으로 이해했습니다. stop 조건은 A, owner는 B로 맞추겠습니다.",
      scriptEn: "My understanding is that today's scope is X, and Y is out of scope. The stop condition is A and the owner is B.",
      evidence: "scope, out-of-scope, energy state, stop condition, owner"
    },
    {
      id: "tool-walkdown",
      title: "Tool walkdown",
      place: "EFEM / LL / TM / PM around tool",
      mentalModel: "walkdown은 구경이 아니라 baseline capture입니다. 손대기 전 상태를 알아야 손댄 뒤 변화가 설명됩니다.",
      ask: [
        "EFEM, load port, load lock, TM, PM, gas box, pump/exhaust/abatement 중 오늘 touch boundary는 어디인가?",
        "현재 alarm, open cover, loose cable/tube, leak sign, particle source는 없는가?",
        "tool state와 facility ready가 서로 맞는가?"
      ],
      observe: [
        "압력, pump 상태, exhaust/abatement ready, CDA/PCW/electrical indication",
        "robot home, door/slit valve status, FOUP/load port readiness",
        "최근 변경: parts, hook-up, calibration, software, facility work"
      ],
      doNot: [
        "손대기 전 사진 대신 무단 촬영하기",
        "label/serial/wafer ID를 원문 개인 기록",
        "이상 징후를 '원래 그런가 보다' 하고 넘기기"
      ],
      scriptKo: "작업 전 baseline으로 alarm, pressure, facility ready, robot/door 상태를 확인하고 기록하겠습니다.",
      scriptEn: "Before touching the tool, I will capture baseline evidence: alarms, pressure, facility readiness, and robot or door state.",
      evidence: "baseline status, touch boundary, pre-existing abnormality"
    },
    {
      id: "execution",
      title: "Install execution",
      place: "작업 지점",
      mentalModel: "CE Level 2의 실력은 빠른 손보다 traceable action입니다. 누가 승인했고, 무엇을 바꿨고, 어떤 evidence가 남았는지 이어져야 합니다.",
      ask: [
        "지금 action은 승인된 procedure/scope 안인가?",
        "작업 전후 비교 evidence는 무엇인가?",
        "부품, torque, leak check, DVM check, sensor 확인은 어떤 owner/witness가 필요한가?"
      ],
      observe: [
        "before/after 상태, alarm 변화, pressure/temperature/flow trend",
        "tool recovery steps가 safety boundary 안에서 진행되는지",
        "작업 중 새로 생긴 risk"
      ],
      doNot: [
        "recipe, setpoint, interlock, hidden sequence를 추측해 조작",
        "승인 없이 energized work 또는 gas boundary 작업",
        "기록 없이 여러 action을 한 번에 진행"
      ],
      scriptKo: "현재 조치는 승인된 scope 안에서 진행했고, 전후 evidence는 X입니다. 새 risk Y가 있어 owner 확인 후 다음 단계로 가겠습니다.",
      scriptEn: "The action was completed within the approved scope. The before-and-after evidence is X. I found risk Y, so I will confirm with the owner before proceeding.",
      evidence: "approved action, before-after evidence, new risk, witness"
    },
    {
      id: "issue-hold",
      title: "Issue / hold",
      place: "문제 발생 지점",
      mentalModel: "Fab에서 어리버리해 보이는 순간은 모를 때가 아니라, 모르는 상태에서 움직일 때입니다. hold를 잘 거는 사람이 오히려 프로처럼 보입니다.",
      ask: [
        "이건 safety, quality, schedule, security 중 무엇에 영향이 있는가?",
        "확인된 사실과 아직 가정인 것은 무엇인가?",
        "다음 action 권한은 누구에게 있는가?"
      ],
      observe: [
        "alarm category, first observed time, changed condition",
        "module/subsystem boundary: facility, vacuum, gas, motion, electrical, host/data, process",
        "customer impact: wafer, lot, schedule, qualification gate"
      ],
      doNot: [
        "원인부터 단정하기",
        "alarm reset 반복으로 evidence 없애기",
        "고객에게 과도한 약속하기"
      ],
      scriptKo: "확인된 사실은 X입니다. 원인은 아직 단정하지 않겠습니다. safety/quality 영향 때문에 A 조건이 확인될 때까지 hold하고 B owner와 확인하겠습니다.",
      scriptEn: "The confirmed fact is X. I will not conclude the root cause yet. Because of the safety or quality impact, we should hold until A is verified with owner B.",
      evidence: "fact vs assumption, risk category, owner, stop condition"
    },
    {
      id: "customer-update",
      title: "Customer update",
      place: "고객/선임 보고",
      mentalModel: "좋은 보고는 많이 아는 척이 아니라 fact, impact, risk, next action을 짧게 정렬하는 것입니다.",
      ask: [
        "고객이 지금 알아야 하는 사실은 무엇인가?",
        "아직 확인 중인 것은 무엇이며 언제 업데이트할 것인가?",
        "내가 말하면 안 되는 추정, confidential detail, 내부 discussion은 무엇인가?"
      ],
      observe: [
        "customer concern: safety, wafer, schedule, release, repeatability",
        "다음 update time과 owner",
        "기록에 남길 표현과 구두로만 정렬할 표현"
      ],
      doNot: [
        "root cause를 증거 없이 확정",
        "일정/성능을 보장",
        "고객 비공개자료나 내부 자료를 개인 채널로 공유"
      ],
      scriptKo: "현재 확인된 사항은 X이고, 영향 범위는 Y로 보고 있습니다. Z는 아직 확인 중이며, A owner와 확인 후 B시에 업데이트하겠습니다.",
      scriptEn: "What we have confirmed is X. The current impact appears to be Y. Z is still under review, and I will update you at B after checking with owner A.",
      evidence: "confirmed fact, impact, pending evidence, update time"
    },
    {
      id: "handover",
      title: "Shift handover",
      place: "작업 종료 / 퇴장 전",
      mentalModel: "handover가 좋아야 다음 shift가 같은 실수를 반복하지 않습니다. CE의 신뢰는 손기술보다 기록 품질에서 오래 남습니다.",
      ask: [
        "완료된 action, 미완료 action, owner, due time이 분리됐는가?",
        "safety/security open item은 없는가?",
        "개인 기록은 redacted summary로 충분한가?"
      ],
      observe: [
        "tool state, module state, open issue, pending evidence",
        "customer report draft, punch item, next shift owner",
        "삭제/반납해야 할 자료, badge/device/printed note closeout"
      ],
      doNot: [
        "다음 shift가 알 것이라 생각하고 생략",
        "민감한 원문을 개인 Think Tank에 넣기",
        "애매한 상태를 '완료'로 표현"
      ],
      scriptKo: "완료: X. 미완료: Y, owner는 Z, 다음 확인 시간은 A입니다. safety/security open item은 B 상태입니다.",
      scriptEn: "Completed: X. Open item: Y, owner Z, next check time A. Safety and security open item status is B.",
      evidence: "completed action, open item, owner, due time, safety/security status"
    }
  ];

  const ownerMap = [
    ["Senior CE", "작업 판단의 mentor", "내 scope가 맞는지, 어디서 멈춰야 하는지, 고객에게 어떻게 말할지 확인"],
    ["Customer Equipment Owner", "장비 상태와 release 책임자", "tool state, schedule impact, handover, punch item 정렬"],
    ["Process Owner", "wafer 결과와 process 영향 판단", "baseline wafer, metrology, qualification, process risk"],
    ["Facility Owner", "전기, PCW, CDA, exhaust, vacuum house line", "facility ready, hook-up, isolation, pressure/flow readiness"],
    ["Gas / Chemical Owner", "gas cabinet, toxic/flammable/corrosive boundary", "gas readiness, leak response, purge/exhaust/abatement 연계"],
    ["EHS / Security", "사람 안전과 정보/출입 경계", "PPE, permit, emergency, 사진/자료/반입/반출 rule"],
    ["Rigging Contractor", "move-in과 heavy equipment 이동", "crane, route, set-in-place, floor/load, exclusion zone"],
    ["Automation / Host Owner", "EFEM, AMHS, recipe dispatch, host communication", "carrier ID, load port, GEM/SECS-like host communication 개념"]
  ];

  const behaviorPairs = [
    ["어리버리해 보이는 행동", "신뢰를 주는 CE 행동"],
    ["모르면 조용히 따라만 간다.", "모르는 boundary를 정확히 묻고 대기한다."],
    ["원인을 빨리 말하려고 한다.", "확인된 사실과 가정을 분리해서 말한다."],
    ["사진을 찍으면 빨리 설명될 거라 생각한다.", "촬영/반출 승인과 공식 channel을 먼저 확인한다."],
    ["alarm reset부터 생각한다.", "alarm category, first time, changed condition, evidence 보존을 먼저 생각한다."],
    ["고객 질문에 바로 확답하려 한다.", "확인 가능한 범위, 다음 owner, 업데이트 시간을 제시한다."],
    ["선임이 바빠 보이면 혼자 판단한다.", "짧은 structured question으로 선임 시간을 아낀다."],
    ["개인 노트에 상세 정보를 모두 적는다.", "redacted summary와 학습 gap만 남긴다."]
  ];

  const scenarios = [
    {
      id: "lost-route",
      phase: "Cleanroom movement",
      prompt: "Escort와 떨어졌고 tool bay 위치가 헷갈립니다. senior CE는 바빠 보입니다.",
      options: [
        ["기억나는 방향으로 이동해서 tool을 찾는다.", false, "Fab 동선은 보안/EHS boundary입니다. 단독 이동 허용 범위가 불확실하면 멈춰야 합니다.", "security-boundary"],
        ["현재 위치에서 대기하고 escort/senior/customer owner에게 이동 가능 범위를 확인한다.", true, "정답입니다. 길을 모르는 것이 문제가 아니라, 모르는 상태에서 움직이는 것이 문제입니다.", "owner-check"],
        ["근처 operator에게 tool ID와 위치를 자세히 물어 개인 메모에 적는다.", false, "위치와 tool ID 조합은 민감할 수 있습니다. 승인된 owner와 channel을 우선합니다.", "data-minimization"]
      ]
    },
    {
      id: "photo-request",
      phase: "Security",
      prompt: "Senior가 원격 지원을 위해 alarm 화면 사진을 보내달라고 급히 말합니다. site 사진 규정은 아직 모릅니다.",
      options: [
        ["빠르게 찍어서 개인 메신저로 보낸다.", false, "개인 채널과 무단 촬영은 보안 리스크입니다. 속도보다 승인 channel이 우선입니다.", "no-silent-capture"],
        ["사진/스크린샷 가능 여부와 공식 전송 channel을 확인한 뒤 진행 여부를 정한다.", true, "정답입니다. 필요한 정보라도 capture/export boundary는 별도 확인해야 합니다.", "approved-channel"],
        ["고객명만 가리고 전체 화면을 찍는다.", false, "masking만으로 충분하지 않을 수 있습니다. site rule과 승인 channel이 먼저입니다.", "redaction"]
      ]
    },
    {
      id: "unknown-gowning",
      phase: "Gowning",
      prompt: "gowning 순서가 이전 현장과 다릅니다. 뒤에 사람들이 기다리고 있어 마음이 급합니다.",
      options: [
        ["이전 현장 방식대로 빠르게 입는다.", false, "site-specific rule은 현장마다 다를 수 있습니다. contamination risk는 defect와 직결됩니다.", "site-specific"],
        ["멈춰서 현장 기준 순서를 확인하고 mirror check를 한다.", true, "정답입니다. 느려 보여도 청정도와 안전을 지키는 행동이 신뢰를 만듭니다.", "contamination-control"],
        ["대충 입고 tool 앞에서 다시 정리한다.", false, "cleanroom 내부에서 오염을 만들 수 있습니다. gowning area에서 끝내야 합니다.", "ppe"]
      ]
    },
    {
      id: "scope-creep",
      phase: "Pre-job brief",
      prompt: "오늘 scope는 load lock 확인인데, 고객이 옆 PM issue도 같이 봐달라고 합니다.",
      options: [
        ["도움이 되도록 바로 확인한다.", false, "scope 밖 작업은 owner, permit, safety boundary가 달라질 수 있습니다.", "scope-control"],
        ["현재 scope와 다른 작업이라 senior/customer owner와 영향, 승인, hold point를 먼저 맞춘다.", true, "정답입니다. 친절함은 즉흥 작업이 아니라 boundary 정렬입니다.", "change-control"],
        ["나중에 개인적으로 조용히 봐준다고 말한다.", false, "비공식 작업은 기록과 책임 경계를 흐립니다.", "documentation"]
      ]
    },
    {
      id: "gas-ready",
      phase: "Facility / gas",
      prompt: "first gas readiness 직전, tool 화면 ready는 보이지만 exhaust/abatement owner 확인이 아직 없습니다.",
      options: [
        ["tool ready가 있으니 진행한다.", false, "gas readiness는 tool bit 하나가 아니라 facility, exhaust, abatement, EHS owner evidence가 같이 맞아야 합니다.", "gas-safety"],
        ["exhaust/abatement readiness와 owner witness가 확인될 때까지 hold한다.", true, "정답입니다. gas boundary에서는 진행보다 stop condition이 먼저입니다.", "stop-condition"],
        ["잠깐만 흘려보고 alarm이 없으면 괜찮다고 판단한다.", false, "실험적 gas introduction은 위험합니다. 승인된 절차 밖의 확인은 금지입니다.", "unsafe-trial"]
      ]
    },
    {
      id: "alarm-reset",
      phase: "Issue / hold",
      prompt: "pumpdown 중 alarm이 떴습니다. senior가 오기 전에 reset하면 빨리 진행될 것 같습니다.",
      options: [
        ["reset해서 재현되는지 본다.", false, "reset은 evidence를 지울 수 있습니다. 먼저 alarm time, condition, trend를 보존해야 합니다.", "evidence-preservation"],
        ["alarm category, 발생 시각, tool state, pressure trend를 기록하고 owner에게 보고한다.", true, "정답입니다. CE는 증거를 남기고 risk를 분류한 뒤 움직입니다.", "alarm-categorization"],
        ["root cause를 leak으로 보고 leak check 준비를 바로 한다.", false, "원인 단정은 빠르지만 위험합니다. leak, pump, valve, gauge, facility 등 후보를 evidence로 좁혀야 합니다.", "premature-conclusion"]
      ]
    },
    {
      id: "customer-eta",
      phase: "Customer communication",
      prompt: "고객이 '언제 끝나나요?'라고 묻습니다. 아직 원인과 recovery time이 확정되지 않았습니다.",
      options: [
        ["아마 30분이면 될 것 같다고 말한다.", false, "근거 없는 ETA는 trust를 잃습니다. 확정된 것과 다음 업데이트 시간을 분리하세요.", "overpromise"],
        ["확인된 사실, 현재 영향, 다음 evidence, 다음 update time을 말한다.", true, "정답입니다. 모호할수록 update cadence가 신뢰를 만듭니다.", "customer-update"],
        ["선임이 올 때까지 아무 말도 하지 않는다.", false, "침묵은 고객 불안을 키웁니다. 확정 범위만 짧게 공유할 수 있습니다.", "communication"]
      ]
    },
    {
      id: "field-note",
      phase: "Daily log",
      prompt: "퇴근 후 오늘 경험을 Think Tank에 남기려 합니다. 어떤 방식이 가장 안전하고 학습 가치가 높습니까?",
      options: [
        ["tool serial, line 위치, wafer ID, alarm screenshot을 그대로 저장한다.", false, "개인 저장소에 민감 원문을 넣으면 안 됩니다.", "sensitive-data"],
        ["비식별 subsystem, 증상, 확인 evidence, 부족 evidence, next action, 학습 gap만 구조화한다.", true, "정답입니다. redacted summary만으로도 CE 성장 데이터가 충분히 쌓입니다.", "redacted-learning"],
        ["기억이 생생할 때 모든 내용을 자세히 녹음한다.", false, "무단 녹음/반출은 보안 리스크입니다. site rule과 개인 정보 경계를 지켜야 합니다.", "media-control"]
      ]
    }
  ];

  const checklist = [
    ["entry-boundary", "출입/escort/movement boundary를 모르면 멈추고 묻는다."],
    ["gowning-check", "gowning과 PPE는 site rule 기준으로 확인한다."],
    ["owner-map", "senior CE, customer owner, facility, gas, EHS/security owner를 구분한다."],
    ["scope-hold", "scope 밖 요청은 친절하게 받되 승인 전 실행하지 않는다."],
    ["baseline", "작업 전 baseline evidence를 먼저 본다."],
    ["fact-assumption", "보고할 때 fact와 assumption을 분리한다."],
    ["stop-condition", "safety, gas, electrical, wafer risk, security ambiguity는 hold 조건이다."],
    ["no-confidential", "recipe, setpoint, valve sequence, serial, wafer ID, 보안 동선은 개인 기록에 넣지 않는다."],
    ["customer-brief", "customer update는 fact, impact, risk, next action, update time으로 말한다."],
    ["handover", "완료/open/owner/due/safety status로 handover를 닫는다."]
  ];

  const phraseDrills = [
    ["모를 때", "제가 이 boundary는 아직 확인하지 못했습니다. 확인 후 진행하겠습니다.", "I have not verified this boundary yet. I will confirm it before proceeding."],
    ["멈출 때", "이 조건은 safety/quality 영향이 있어 승인된 owner 확인 전까지 hold하겠습니다.", "This condition may affect safety or quality, so I will hold until the approved owner confirms it."],
    ["고객 업데이트", "확인된 사실은 X이고, 영향은 Y입니다. Z는 확인 중이며 B시에 다시 업데이트하겠습니다.", "The confirmed fact is X and the impact is Y. Z is under review, and I will update you again at B."],
    ["선임에게 질문", "현재 X까지 확인했고, Y evidence가 부족합니다. 다음 action을 A와 B 중 어디로 잡는 게 맞을까요?", "I confirmed X, but Y evidence is missing. Should the next action be A or B?"],
    ["scope 밖 요청", "도와드리고 싶지만 현재 승인 scope 밖이라, owner와 영향 범위를 맞춘 뒤 진행하겠습니다.", "I would like to help, but this is outside the approved scope. I will align with the owner before proceeding."]
  ];

  const bottlenecks = [
    {
      id: "movement-boundary",
      title: "동선과 escort boundary",
      symptom: "어디까지 혼자 가도 되는지 몰라서 senior 뒤만 따라다님",
      risk: "허가되지 않은 bay, subfab, gas/chase 영역 접근은 security/EHS 이슈가 될 수 있음",
      drill: "오늘 들어가기 전 meeting point, escort 필요 구역, 대기 위치를 한 문장으로 말한다.",
      script: "제가 단독 이동 가능한 boundary와 대기 위치를 먼저 확인하겠습니다.",
      signal: data => !data.checklist?.["entry-boundary"] || data.answers?.["lost-route"]?.correct === false
    },
    {
      id: "gowning-contamination",
      title: "gowning과 contamination 감각",
      symptom: "입는 순서는 따라 했지만 무엇이 오염 행동인지 확신이 없음",
      risk: "작은 접촉 습관이 particle, wafer defect, 고객 신뢰 문제로 커질 수 있음",
      drill: "장갑, 소매, hood, bootie, clean/dirty hand boundary를 mirror check로 확인한다.",
      script: "site gowning sequence를 한 번 확인하고 동일하게 따르겠습니다.",
      signal: data => !data.checklist?.["gowning-check"] || data.answers?.["unknown-gowning"]?.correct === false
    },
    {
      id: "owner-map",
      title: "owner 구분",
      symptom: "누구에게 물어야 할지 몰라서 질문이 늦어짐",
      risk: "facility/gas/EHS/customer/process owner가 다른데 한 사람 말만 듣고 진행할 수 있음",
      drill: "이 이슈의 owner가 senior CE인지, customer equipment인지, facility/gas/EHS인지 먼저 분류한다.",
      script: "이 boundary의 owner가 누구인지 확인한 뒤 다음 action을 잡겠습니다.",
      signal: data => !data.checklist?.["owner-map"]
    },
    {
      id: "scope-control",
      title: "scope creep",
      symptom: "고객이나 선임이 추가로 물어보면 도와주려다 작업 범위가 흐려짐",
      risk: "permit, safety, schedule, 책임 범위가 다른 작업으로 넘어갈 수 있음",
      drill: "scope, out-of-scope, hold point를 pre-job brief에서 말로 맞춘다.",
      script: "현재 승인 scope 밖이라 owner와 영향 범위를 맞춘 뒤 진행하겠습니다.",
      signal: data => !data.checklist?.["scope-hold"] || data.answers?.["scope-creep"]?.correct === false
    },
    {
      id: "baseline-evidence",
      title: "손대기 전 baseline",
      symptom: "문제 해결에 집중하다가 작업 전 상태를 놓침",
      risk: "작업 후 변화가 내 조치 때문인지 원래 있었던 문제인지 설명하기 어려움",
      drill: "alarm, pressure, facility ready, robot/door, visible abnormal을 작업 전 먼저 본다.",
      script: "작업 전 baseline evidence를 먼저 잡고 진행하겠습니다.",
      signal: data => !data.checklist?.["baseline"] || data.answers?.["alarm-reset"]?.correct === false
    },
    {
      id: "gas-facility-hold",
      title: "gas/facility readiness hold",
      symptom: "tool 화면 ready만 보고 진행해도 되는지 헷갈림",
      risk: "toxic/flammable/corrosive/asphyxiant gas, exhaust, abatement, detector, ventilation은 safety-critical boundary",
      drill: "tool signal, facility actual state, gas owner, exhaust/abatement readiness를 분리해서 확인한다.",
      script: "gas/facility owner evidence가 확인될 때까지 gas readiness는 hold하겠습니다.",
      signal: data => data.answers?.["gas-ready"]?.correct === false || !data.checklist?.["stop-condition"]
    },
    {
      id: "customer-update",
      title: "고객 앞에서 말 정렬",
      symptom: "고객이 ETA나 원인을 물으면 급하게 답하려고 함",
      risk: "근거 없는 원인/일정 약속은 신뢰를 잃고 escalation을 키움",
      drill: "fact, impact, pending evidence, owner, next update time 다섯 칸으로 말한다.",
      script: "확인된 사실은 X이고, Y는 확인 중입니다. B시에 다시 업데이트하겠습니다.",
      signal: data => !data.checklist?.["customer-brief"] || data.answers?.["customer-eta"]?.correct === false
    },
    {
      id: "redacted-memory",
      title: "개인 기록 redaction",
      symptom: "잘 기억하려고 민감한 원문까지 개인 기록에 남기고 싶어짐",
      risk: "recipe, serial, wafer ID, screenshot, site route, manual text는 개인 저장소에 넣으면 안 됨",
      drill: "subsystem, symptom, evidence, missing evidence, action, result, learning gap만 남긴다.",
      script: "개인 학습 기록에는 비식별 summary와 학습 gap만 남기겠습니다.",
      signal: data => !data.checklist?.["no-confidential"] || data.answers?.["field-note"]?.correct === false
    }
  ];

  const campaignDays = [
    ["day-01", "Day 1", "Gate와 escort", "host, badge, escort, allowed area, device rule을 말로 확인", "출입 boundary를 모르면 멈춘다."],
    ["day-02", "Day 2", "Gowning muscle memory", "site gowning sequence와 contamination 행동 5개를 관찰", "청정도는 wafer defect와 연결된다."],
    ["day-03", "Day 3", "Owner map", "senior CE/customer/facility/gas/EHS/process owner를 구분", "누구에게 물어야 할지 알면 어리버리하지 않다."],
    ["day-04", "Day 4", "Tool-side pre-job", "scope, out-of-scope, energy, stop condition, next update time 정렬", "작업 전 3분 brief가 실수를 줄인다."],
    ["day-05", "Day 5", "Baseline walkdown", "EFEM/LL/TM/PM/gas/pump/exhaust 상태를 손대기 전 관찰", "작업 후 설명력은 baseline에서 나온다."],
    ["day-06", "Day 6", "Facility language", "CDA, PCW, exhaust, abatement, vacuum, power owner를 분리", "tool ready와 facility actual은 별도로 확인한다."],
    ["day-07", "Day 7", "Gas readiness caution", "gas owner, exhaust, abatement, detector, purge readiness를 안전 관점으로 보기", "gas boundary는 속도보다 hold 판단이 우선이다."],
    ["day-08", "Day 8", "Alarm evidence", "alarm category, first observed time, tool state, trend를 reset 전 보존", "reset은 증거를 없앨 수 있다."],
    ["day-09", "Day 9", "Customer update", "fact, impact, pending, owner, next update time으로 짧게 보고", "확답보다 update cadence가 신뢰를 만든다."],
    ["day-10", "Day 10", "Shift handover", "completed/open/owner/due/safety status로 handover 작성", "다음 shift가 바로 이어받게 만든다."],
    ["day-11", "Day 11", "Subfab mental model", "pump, exhaust, abatement, facility cabinet은 tool과 어떻게 연결되는지 그림으로 복기", "장비 옆만 보는 CE에서 system을 보는 CE로 간다."],
    ["day-12", "Day 12", "Question compression", "선임에게 20초 질문: confirmed fact, missing evidence, candidate action", "좋은 질문은 선임 시간을 아껴준다."],
    ["day-13", "Day 13", "Redacted daily log", "오늘 경험을 민감정보 없이 field log에 구조화", "개인 big data는 비식별 summary로 충분하다."],
    ["day-14", "Day 14", "First two weeks review", "가장 자주 헷갈린 owner, evidence, stop condition 3개 정리", "반복 병목을 다음 루틴으로 보낸다."]
  ];

  const fabDecoder = [
    ["Bay", "장비가 놓인 생산 구역", "CE는 bay에서 고객 flow와 tool 접근 boundary를 본다.", "정확한 위치/라인명은 개인 기록 금지"],
    ["Subfab", "장비 아래 또는 별도 하부 시설 공간", "pump, exhaust, abatement, facility 계통을 만날 수 있다.", "허가/escort 없이 이동 금지"],
    ["Chase", "시설 배관/케이블/가스 등이 지나가는 서비스 공간", "facility owner와 함께 boundary를 확인한다.", "혼자 들어가서 확인하려 하지 않기"],
    ["Owner", "승인하거나 판단할 책임자", "gas, facility, process, EHS, customer equipment owner가 다를 수 있다.", "senior 한 명이 모든 owner를 대체한다고 단정 금지"],
    ["Hold point", "여기서 멈추고 확인해야 하는 지점", "gas, electrical, wafer risk, security ambiguity에서 특히 중요", "일정 압박으로 건너뛰지 않기"],
    ["Baseline", "작업 전 기준 상태", "alarm, pressure, door, robot, facility ready를 전후 비교 기준으로 삼는다.", "손댄 뒤에야 원래 상태를 떠올리지 않기"],
    ["Punch item", "handover에 남는 미완료/추적 항목", "owner, due time, next evidence가 있어야 닫힌다.", "그냥 '확인 필요'만 쓰면 open-loop"],
    ["Redaction", "민감정보를 제거한 기록화", "개인 Think Tank에는 subsystem과 학습 gap만 남긴다.", "serial, lot, wafer map, recipe, screenshot 저장 금지"],
    ["Witness", "확인에 함께 서명/동의하는 사람", "facility/gas/safety boundary는 owner witness가 중요할 수 있다.", "혼자 봤다고 공식 확인으로 표현 금지"],
    ["Escalation", "권한 있는 사람에게 올리는 것", "stop condition, safety, schedule impact가 있으면 빠른 escalation이 실력", "숨기거나 혼자 해결하려 하지 않기"]
  ];

  function escapeHtml(value = "") {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function safeJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  function saveState(nextState) {
    localStorage.setItem(STATE_KEY, JSON.stringify(nextState));
    window.dispatchEvent(new CustomEvent("project-universe-fab-acclimation-updated", { detail: nextState }));
  }

  function state() {
    return {
      activeStep: "pre-arrival",
      answers: {},
      checklist: {},
      campaign: {},
      prejobBrief: {},
      lastUpdatedAt: null,
      ...safeJson(STATE_KEY, {})
    };
  }

  function currentStep(data) {
    return arrivalSteps.find(step => step.id === data.activeStep) || arrivalSteps[0];
  }

  function scenarioScore(data) {
    const total = scenarios.length;
    const correct = Object.values(data.answers || {}).filter(answer => answer?.correct).length;
    const tried = Object.keys(data.answers || {}).length;
    return { total, correct, tried, percent: total ? Math.round((correct / total) * 100) : 0 };
  }

  function checklistScore(data) {
    const done = checklist.filter(([id]) => data.checklist?.[id]).length;
    return { done, total: checklist.length, percent: Math.round((done / checklist.length) * 100) };
  }

  function campaignScore(data) {
    const done = campaignDays.filter(([id]) => data.campaign?.[id]).length;
    return { done, total: campaignDays.length, percent: Math.round((done / campaignDays.length) * 100) };
  }

  function bottleneckLevel(data, item) {
    const active = item.signal(data);
    if (!active) return "stable";
    const wrongCount = Object.values(data.answers || {}).filter(answer => answer && answer.correct === false).length;
    if (wrongCount >= 3) return "critical";
    if (wrongCount >= 1) return "watch";
    return "train";
  }

  function briefValue(data, key, fallback = "") {
    return escapeHtml(data.prejobBrief?.[key] || fallback);
  }

  function buildBriefText(data) {
    const brief = data.prejobBrief || {};
    const scope = brief.scope || "오늘 승인된 scope";
    const owner = brief.owner || "확인할 owner";
    const energy = brief.energy || "전기/가스/진공/robot 등 energy state";
    const stop = brief.stop || "safety, gas, electrical, wafer, security ambiguity";
    const evidence = brief.evidence || "baseline alarm/pressure/facility/tool state";
    const update = brief.update || "다음 update time";
    return `Scope는 ${scope}입니다. Owner는 ${owner}로 확인하겠습니다. 현재 energy boundary는 ${energy}입니다. Stop condition은 ${stop}이고, 작업 전 evidence는 ${evidence}입니다. ${update}에 fact-impact-risk-next action으로 업데이트하겠습니다.`;
  }

  function renderList(items, className = "") {
    return `<ul class="${className}">${items.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
  }

  function renderArrivalStep(step) {
    return `
      <article class="fab-step-card">
        <div class="fab-card-head">
          <div>
            <p class="eyebrow">${escapeHtml(step.place)}</p>
            <h2>${escapeHtml(step.title)}</h2>
          </div>
          <span class="fab-chip">mental model</span>
        </div>
        <p class="fab-mental">${escapeHtml(step.mentalModel)}</p>
        <div class="fab-step-grid">
          <section>
            <h3>현장에서 바로 물을 것</h3>
            ${renderList(step.ask)}
          </section>
          <section>
            <h3>눈으로 볼 것</h3>
            ${renderList(step.observe)}
          </section>
          <section>
            <h3>하지 말 것</h3>
            ${renderList(step.doNot, "fab-danger-list")}
          </section>
        </div>
        <div class="fab-script-grid">
          <div>
            <span>한국어 보고 문장</span>
            <p>${escapeHtml(step.scriptKo)}</p>
          </div>
          <div>
            <span>English field phrase</span>
            <p>${escapeHtml(step.scriptEn)}</p>
          </div>
          <div>
            <span>Evidence to capture</span>
            <p>${escapeHtml(step.evidence)}</p>
          </div>
        </div>
      </article>
    `;
  }

  function renderStepRail(data) {
    return `
      <div class="fab-step-rail" aria-label="Fab arrival sequence">
        ${arrivalSteps.map((step, index) => `
          <button class="${step.id === data.activeStep ? "active" : ""}" type="button" data-fab-step="${escapeHtml(step.id)}">
            <span>${String(index + 1).padStart(2, "0")}</span>
            <strong>${escapeHtml(step.title)}</strong>
            <small>${escapeHtml(step.place)}</small>
          </button>
        `).join("")}
      </div>
    `;
  }

  function renderOwnerMap() {
    return `
      <section class="fab-panel">
        <div class="fab-card-head">
          <div>
            <p class="eyebrow">Owner map</p>
            <h2>누구에게 무엇을 물어야 하는가</h2>
          </div>
          <button class="secondary mini" type="button" data-open-view="${FIELD_LOG_VIEW}">데일리 로그로</button>
        </div>
        <div class="fab-owner-map">
          ${ownerMap.map(([role, identity, ask]) => `
            <article>
              <strong>${escapeHtml(role)}</strong>
              <span>${escapeHtml(identity)}</span>
              <p>${escapeHtml(ask)}</p>
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }

  function renderBehaviorPairs() {
    return `
      <section class="fab-panel">
        <p class="eyebrow">Confidence pattern</p>
        <h2>어리버리해 보이는 순간을 신뢰로 바꾸는 법</h2>
        <div class="fab-comparison">
          ${behaviorPairs.map((row, index) => `
            <div class="${index === 0 ? "head" : ""}">
              <span>${escapeHtml(row[0])}</span>
              <strong>${escapeHtml(row[1])}</strong>
            </div>
          `).join("")}
        </div>
      </section>
    `;
  }

  function renderScenarios(data) {
    return `
      <section class="fab-panel">
        <div class="fab-card-head">
          <div>
            <p class="eyebrow">Scenario game</p>
            <h2>Fab에서 바로 튀어나오는 상황 대응</h2>
          </div>
          <span class="fab-chip">즉시 채점</span>
        </div>
        <div class="fab-scenario-grid">
          ${scenarios.map((scenario, index) => {
            const selected = data.answers?.[scenario.id];
            return `
              <article class="fab-scenario-card ${selected ? selected.correct ? "correct" : "wrong" : ""}">
                <span>${escapeHtml(scenario.phase)}</span>
                <h3>${index + 1}. ${escapeHtml(scenario.prompt)}</h3>
                <div class="fab-answer-list">
                  ${scenario.options.map((option, optionIndex) => {
                    const isChosen = selected?.optionIndex === optionIndex;
                    return `
                      <button class="${isChosen ? "chosen" : ""}" type="button" data-fab-answer="${escapeHtml(scenario.id)}" data-option-index="${optionIndex}">
                        ${escapeHtml(option[0])}
                      </button>
                    `;
                  }).join("")}
                </div>
                ${selected ? `
                  <p class="fab-feedback">${selected.correct ? "정답" : "재훈련 필요"} · ${escapeHtml(selected.feedback)}</p>
                ` : `<p class="fab-feedback muted">선택하면 바로 채점되고 약점 태그가 저장됩니다.</p>`}
              </article>
            `;
          }).join("")}
        </div>
      </section>
    `;
  }

  function renderChecklist(data) {
    return `
      <section class="fab-panel">
        <div class="fab-card-head">
          <div>
            <p class="eyebrow">First two weeks checklist</p>
            <h2>첫 2주 동안 몸에 붙일 기준</h2>
          </div>
          <button class="secondary mini" type="button" data-open-view="${SAFETY_VIEW}">라인 준수 보기</button>
        </div>
        <div class="fab-checklist">
          ${checklist.map(([id, label]) => `
            <label class="${data.checklist?.[id] ? "done" : ""}">
              <input type="checkbox" data-fab-check="${escapeHtml(id)}" ${data.checklist?.[id] ? "checked" : ""} />
              <span>${escapeHtml(label)}</span>
            </label>
          `).join("")}
        </div>
      </section>
    `;
  }

  function renderPhraseDrills() {
    return `
      <section class="fab-panel">
        <p class="eyebrow">Do not freeze scripts</p>
        <h2>말문이 막히지 않게 외워둘 문장</h2>
        <div class="fab-phrase-grid">
          ${phraseDrills.map(([tag, ko, en]) => `
            <article>
              <b>${escapeHtml(tag)}</b>
              <p>${escapeHtml(ko)}</p>
              <small>${escapeHtml(en)}</small>
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }

  function renderBottleneckRadar(data) {
    return `
      <section class="fab-panel fab-radar-panel">
        <div class="fab-card-head">
          <div>
            <p class="eyebrow">Bottleneck radar</p>
            <h2>네가 실제로 병목이라고 느낄 가능성이 큰 지점</h2>
          </div>
          <span class="fab-chip">자동 약점 표시</span>
        </div>
        <div class="fab-radar-grid">
          ${bottlenecks.map(item => {
            const level = bottleneckLevel(data, item);
            return `
              <article class="fab-radar-card ${level}">
                <header>
                  <strong>${escapeHtml(item.title)}</strong>
                  <span>${level === "stable" ? "안정" : level === "critical" ? "최우선" : level === "watch" ? "주의" : "훈련"}</span>
                </header>
                <dl>
                  <dt>현장 증상</dt><dd>${escapeHtml(item.symptom)}</dd>
                  <dt>왜 위험한가</dt><dd>${escapeHtml(item.risk)}</dd>
                  <dt>오늘 훈련</dt><dd>${escapeHtml(item.drill)}</dd>
                </dl>
                <p>${escapeHtml(item.script)}</p>
              </article>
            `;
          }).join("")}
        </div>
      </section>
    `;
  }

  function renderCampaign(data) {
    const score = campaignScore(data);
    return `
      <section class="fab-panel">
        <div class="fab-card-head">
          <div>
            <p class="eyebrow">First 14 days campaign</p>
            <h2>첫 2주를 이미 살아본 사람처럼 만드는 캠페인</h2>
          </div>
          <span class="fab-chip">${score.done}/${score.total} · ${score.percent}%</span>
        </div>
        <div class="fab-campaign-grid">
          ${campaignDays.map(([id, day, title, mission, principle]) => `
            <label class="${data.campaign?.[id] ? "done" : ""}">
              <input type="checkbox" data-fab-day="${escapeHtml(id)}" ${data.campaign?.[id] ? "checked" : ""} />
              <span>${escapeHtml(day)}</span>
              <strong>${escapeHtml(title)}</strong>
              <p>${escapeHtml(mission)}</p>
              <small>${escapeHtml(principle)}</small>
            </label>
          `).join("")}
        </div>
      </section>
    `;
  }

  function renderPrejobBriefBuilder(data) {
    const briefText = buildBriefText(data);
    return `
      <section class="fab-panel">
        <div class="fab-card-head">
          <div>
            <p class="eyebrow">3-minute pre-job brief builder</p>
            <h2>작업 시작 전 머리가 하얘지지 않게 만드는 문장 생성기</h2>
          </div>
          <span class="fab-chip">scope · owner · stop</span>
        </div>
        <form class="fab-brief-form" id="fab-brief-form">
          <label>오늘 scope<input id="fab-brief-scope" value="${briefValue(data, "scope")}" placeholder="예: LL pumpdown readiness 확인" /></label>
          <label>owner / witness<input id="fab-brief-owner" value="${briefValue(data, "owner")}" placeholder="예: senior CE + facility owner" /></label>
          <label>energy boundary<input id="fab-brief-energy" value="${briefValue(data, "energy")}" placeholder="예: vacuum/pneumatic/electrical/gas 상태 확인" /></label>
          <label>stop condition<input id="fab-brief-stop" value="${briefValue(data, "stop")}" placeholder="예: gas/exhaust/abatement 미확인, alarm 반복, wafer risk" /></label>
          <label>baseline evidence<input id="fab-brief-evidence" value="${briefValue(data, "evidence")}" placeholder="예: alarm, pressure trend, facility ready, robot/door status" /></label>
          <label>next update<input id="fab-brief-update" value="${briefValue(data, "update")}" placeholder="예: 30분 후 fact-impact-risk-next action 보고" /></label>
          <div class="fab-brief-output">
            <span>보고 초안</span>
            <p id="fab-brief-text">${escapeHtml(briefText)}</p>
          </div>
          <div class="fab-hero-actions">
            <button class="primary" type="submit">brief 저장</button>
            <button class="secondary" type="button" id="fab-brief-copy">보고 문장 복사</button>
          </div>
        </form>
      </section>
    `;
  }

  function renderQuestionCompressor() {
    const rows = [
      ["선임에게", "현재 확인된 사실은 X입니다. Y evidence가 부족합니다. 다음 action을 A/B 중 어디로 잡을까요?"],
      ["고객 owner에게", "현재 impact는 X로 보고 있고, Y는 아직 확인 중입니다. owner 확인 후 Z시에 업데이트하겠습니다."],
      ["facility owner에게", "tool side signal은 X인데 facility actual state Y 확인이 필요합니다. approved ready 상태를 같이 확인할 수 있을까요?"],
      ["gas/EHS owner에게", "gas/exhaust/abatement boundary가 아직 clear하지 않아 hold하겠습니다. 확인해야 할 approved evidence가 무엇인지 알려주실 수 있을까요?"],
      ["handover 때", "완료 X, open Y, owner Z, due A, safety/security status B입니다."]
    ];
    return `
      <section class="fab-panel">
        <p class="eyebrow">20-second question compressor</p>
        <h2>선임 시간을 아끼는 질문 구조</h2>
        <div class="fab-question-grid">
          ${rows.map(([target, phrase]) => `
            <article>
              <strong>${escapeHtml(target)}</strong>
              <p>${escapeHtml(phrase)}</p>
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }

  function renderFabDecoder() {
    return `
      <section class="fab-panel">
        <p class="eyebrow">Fab language decoder</p>
        <h2>처음 들으면 얼어붙는 Fab 말들</h2>
        <div class="fab-decoder-grid">
          ${fabDecoder.map(([term, easy, field, trap]) => `
            <article>
              <strong>${escapeHtml(term)}</strong>
              <span>${escapeHtml(easy)}</span>
              <p>${escapeHtml(field)}</p>
              <small>${escapeHtml(trap)}</small>
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }

  function renderSourceBoundary() {
    return `
      <section class="fab-panel fab-source-panel">
        <p class="eyebrow">Public-source boundary</p>
        <h2>이 훈련장이 말하는 것과 말하지 않는 것</h2>
        <div class="fab-boundary-grid">
          <article>
            <strong>훈련하는 것</strong>
            <p>CE 역할, 고객 현장 communication, EHS/security mindset, cleanroom 행동, owner 확인, evidence-first report, generic install phase 판단.</p>
          </article>
          <article>
            <strong>일부러 제외한 것</strong>
            <p>고객 site-specific 동선/보안 세부, Applied manual 원문, recipe, valve sequence, detector setpoint, interlock bypass, acceptance limit, serial/lot/wafer 원문.</p>
          </article>
        </div>
        <div class="fab-source-list">
          ${sourceLinks.map(source => `
            <a href="${escapeHtml(source.url)}" target="_blank" rel="noopener">
              <strong>${escapeHtml(source.title)}</strong>
              <span>${escapeHtml(source.point)}</span>
            </a>
          `).join("")}
        </div>
      </section>
    `;
  }

  function render() {
    const root = document.getElementById(ROOT_ID);
    if (!root) return;
    const data = state();
    const step = currentStep(data);
    const game = scenarioScore(data);
    const ready = checklistScore(data);
    const campaign = campaignScore(data);
    root.innerHTML = `
      <section class="fab-acclimation-console">
        <article class="fab-acclimation-hero">
          <div>
            <p class="eyebrow">Fab survival to trust-building</p>
            <h2>장비는 아는데 Fab 환경이 낯선 문제를 없애는 훈련장</h2>
            <p>테크니션 경험은 큰 장점입니다. 다만 CE Install Level 2에서는 손기술보다 먼저 <strong>site boundary, owner, evidence, stop condition, customer update</strong>가 몸에 붙어야 합니다. 이 화면은 첫날부터 어리버리해 보이지 않게 만드는 행동 순서를 반복시킵니다.</p>
            <div class="fab-hero-actions">
              <button class="primary" type="button" data-fab-step="pre-job">Pre-job brief부터 보기</button>
              <button class="secondary" type="button" data-fab-step="issue-hold">문제 발생 대응</button>
              <button class="secondary" type="button" data-open-view="${FIELD_LOG_VIEW}">오늘 기록 남기기</button>
            </div>
          </div>
          <div class="fab-acclimation-score">
            <span>scenario</span>
            <strong>${game.correct}/${game.total}</strong>
            <small>${game.tried}개 풀이 · ${game.percent}%</small>
            <span>first 2 weeks</span>
            <strong>${ready.done}/${ready.total}</strong>
            <small>${ready.percent}% checklist</small>
            <span>campaign</span>
            <strong>${campaign.done}/${campaign.total}</strong>
            <small>${campaign.percent}% first 14 days</small>
          </div>
        </article>

        ${renderBottleneckRadar(data)}
        ${renderCampaign(data)}
        ${renderPrejobBriefBuilder(data)}

        <section class="fab-map-panel">
          ${renderStepRail(data)}
          ${renderArrivalStep(step)}
        </section>

        ${renderOwnerMap()}
        ${renderScenarios(data)}
        ${renderBehaviorPairs()}
        ${renderChecklist(data)}
        ${renderQuestionCompressor()}
        ${renderFabDecoder()}
        ${renderPhraseDrills()}
        ${renderSourceBoundary()}
      </section>
    `;
    bind(root);
  }

  function bind(root) {
    root.querySelectorAll("[data-fab-step]").forEach(button => {
      button.addEventListener("click", () => {
        const next = state();
        next.activeStep = button.dataset.fabStep;
        next.lastUpdatedAt = new Date().toISOString();
        saveState(next);
        render();
      });
    });

    root.querySelectorAll("[data-fab-answer]").forEach(button => {
      button.addEventListener("click", () => {
        const scenario = scenarios.find(item => item.id === button.dataset.fabAnswer);
        const optionIndex = Number(button.dataset.optionIndex);
        const option = scenario?.options?.[optionIndex];
        if (!scenario || !option) return;
        const next = state();
        next.answers = next.answers || {};
        next.answers[scenario.id] = {
          optionIndex,
          correct: Boolean(option[1]),
          feedback: option[2],
          weaknessTag: option[3],
          answeredAt: new Date().toISOString()
        };
        next.lastUpdatedAt = new Date().toISOString();
        saveState(next);
        render();
      });
    });

    root.querySelectorAll("[data-fab-check]").forEach(input => {
      input.addEventListener("change", () => {
        const next = state();
        next.checklist = next.checklist || {};
        next.checklist[input.dataset.fabCheck] = input.checked;
        next.lastUpdatedAt = new Date().toISOString();
        saveState(next);
        render();
      });
    });

    root.querySelectorAll("[data-fab-day]").forEach(input => {
      input.addEventListener("change", () => {
        const next = state();
        next.campaign = next.campaign || {};
        next.campaign[input.dataset.fabDay] = input.checked;
        next.lastUpdatedAt = new Date().toISOString();
        saveState(next);
        render();
      });
    });

    root.querySelector("#fab-brief-form")?.addEventListener("submit", event => {
      event.preventDefault();
      const next = state();
      next.prejobBrief = {
        scope: root.querySelector("#fab-brief-scope")?.value.trim() || "",
        owner: root.querySelector("#fab-brief-owner")?.value.trim() || "",
        energy: root.querySelector("#fab-brief-energy")?.value.trim() || "",
        stop: root.querySelector("#fab-brief-stop")?.value.trim() || "",
        evidence: root.querySelector("#fab-brief-evidence")?.value.trim() || "",
        update: root.querySelector("#fab-brief-update")?.value.trim() || ""
      };
      next.lastUpdatedAt = new Date().toISOString();
      saveState(next);
      render();
    });

    root.querySelector("#fab-brief-copy")?.addEventListener("click", async () => {
      const text = root.querySelector("#fab-brief-text")?.textContent || buildBriefText(state());
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        const area = document.createElement("textarea");
        area.value = text;
        document.body.appendChild(area);
        area.select();
        document.execCommand("copy");
        area.remove();
      }
    });

    root.querySelectorAll("[data-open-view]").forEach(button => {
      button.addEventListener("click", () => {
        if (typeof window.showView === "function") window.showView(button.dataset.openView);
      });
    });
  }

  window.ProjectUniverseFabAcclimation = {
    render,
    getState: state,
    getScore: () => {
      const data = state();
      return { scenario: scenarioScore(data), checklist: checklistScore(data), campaign: campaignScore(data) };
    },
    steps: arrivalSteps,
    scenarios
  };

  document.addEventListener("DOMContentLoaded", render);
  window.addEventListener("project-universe-unlocked", render);
})();
