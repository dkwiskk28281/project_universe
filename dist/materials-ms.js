(() => {
  const STATE_KEY = "materialsMsAcademyStateV1";
  const STATE_SCHEMA_VERSION = "materials-ms-state-v2";
  const SOURCE_VERSION = "materials-ms-academy-v3-engine";
  const PACKET_VERSION = "materials-ms-academy-packet-v2-engine";

  const competencyTracks = [
    {
      id: "math-foundation",
      label: "수학 생존력",
      domains: ["math", "engineering"],
      target: "비율, 함수, 로그, 미적분, 통계가 공정 데이터로 이어지는지",
      fellowEvidence: "Arrhenius plot, growth rate trend, Cpk를 내 말로 설명"
    },
    {
      id: "physics-chemistry",
      label: "물리/화학 기반",
      domains: ["physics", "chemistry"],
      target: "열, 전기, 결합, 기체, 반응 방향을 장비 상태와 연결하는지",
      fellowEvidence: "thermal budget, gas partial pressure, reaction window 설명"
    },
    {
      id: "materials-core",
      label: "재료공학 코어",
      domains: ["materials"],
      target: "결정구조, 결함, 확산, 상평형, kinetics를 EPI 품질로 번역하는지",
      fellowEvidence: "defect mechanism과 process window를 evidence chain으로 정리"
    },
    {
      id: "semiconductor-process",
      label: "반도체 공정 통합",
      domains: ["semiconductor", "epi"],
      target: "EPI가 앞뒤 공정, 소자, yield와 주고받는 영향을 설명하는지",
      fellowEvidence: "wafer map, chamber split, metrology, customer symptom을 분리"
    },
    {
      id: "data-research",
      label: "데이터/연구 읽기",
      domains: ["programming", "english", "materials"],
      target: "논문 figure, SPC, DOE, Python 분석, 기술영어를 하나로 쓰는지",
      fellowEvidence: "논문 1편을 claim/evidence/limitation과 실험계획으로 변환"
    }
  ];

  const domainLabels = {
    math: "수학",
    physics: "물리",
    chemistry: "화학",
    engineering: "공학기초",
    english: "기술영어",
    programming: "Python/통계",
    materials: "재료공학",
    semiconductor: "반도체",
    epi: "EPI"
  };

  const sources = [
    {
      label: "MIT OCW 3.012 Fundamentals of Materials Science",
      url: "https://ocw.mit.edu/courses/3-012-fundamentals-of-materials-science-fall-2005/",
      use: "thermodynamics, bonding, structure, equilibrium, diffraction, properties를 석사 준비의 핵심 축으로 삼음"
    },
    {
      label: "MIT OCW 3.091SC Introduction to Solid State Chemistry",
      url: "https://ocw.mit.edu/courses/3-091sc-introduction-to-solid-state-chemistry-fall-2010/",
      use: "전자구조, 화학결합, 원자 배열, 결정, 반도체 적용을 기초 화학 루트로 삼음"
    },
    {
      label: "MIT OCW 3.020 Thermodynamics of Materials",
      url: "https://ocw.mit.edu/courses/3-020-thermodynamics-of-materials-spring-2021/",
      use: "상평형, 상변태, 화학반응, 통계열역학 입문을 고급 열역학 루트로 삼음"
    },
    {
      label: "MIT OCW 3.205 Thermodynamics and Kinetics of Materials",
      url: "https://ocw.mit.edu/courses/3-205-thermodynamics-and-kinetics-of-materials-fall-2006/",
      use: "diffusion, phase transformation, microstructure evolution을 kinetics 루트로 삼음"
    },
    {
      label: "Stanford MSE MS General Requirements",
      url: "https://mse.stanford.edu/academics-admissions/general-requirements",
      use: "MS는 core/lab/elective 구조와 program proposal/final completion milestone을 가진다는 기준"
    },
    {
      label: "MIT DMSE Graduate Admission Requirements",
      url: "https://catalog.mit.edu/schools/engineering/materials-science-engineering/",
      use: "thermodynamics, kinetics, structure of materials 배경지식이 부족하면 보강해야 한다는 기준"
    },
    {
      label: "NPTEL Introduction to Materials Science and Engineering",
      url: "https://nptel.ac.in/courses/113102080",
      use: "crystal structure, defects, diffusion, phase diagrams 같은 표준 재료공학 기초 항목 확인"
    },
    {
      label: "Applied Materials Epitaxy",
      url: "https://www.appliedmaterials.com/us/en/semiconductor/products/processes/epitaxy.html",
      use: "EPI를 결정성 foundation과 electrical property engineering 관점으로 연결"
    }
  ];

  const questions = [
    ["m-arith", "math", "arithmetic", 1, "12.5%는 소수로 얼마인가?", ["0.0125", "0.125", "1.25", "12.5"], 1, "percent는 100으로 나누는 표현입니다. 12.5% = 12.5/100 = 0.125입니다."],
    ["m-frac", "math", "fractions", 1, "1/2 + 1/3의 값은?", ["2/5", "3/5", "5/6", "1/6"], 2, "분모를 6으로 맞추면 3/6 + 2/6 = 5/6입니다."],
    ["m-ratio", "math", "ratios", 1, "SiGe에서 Ge 25%라는 말과 가장 가까운 비율은?", ["Ge:Si = 1:3", "Ge:Si = 3:1", "Ge:Si = 1:4", "Ge:Si = 4:1"], 0, "전체 4개 중 Ge가 1개라면 Ge 25%, Si 75%이므로 Ge:Si = 1:3입니다."],
    ["m-eq", "math", "equations", 1, "2x + 3 = 11이면 x는?", ["3", "4", "7", "8"], 1, "양변에서 3을 빼면 2x = 8, x = 4입니다."],
    ["m-graph", "math", "graphs", 2, "그래프에서 기울기 slope가 의미하는 것은?", ["x축 이름", "y가 x에 대해 얼마나 빨리 변하는지", "그래프의 색", "시작점만"], 1, "공정 그래프에서 slope는 시간에 따른 온도 변화율, 유량 변화율처럼 변화 속도를 뜻합니다."],
    ["m-func", "math", "functions", 2, "f(x)=3x+2에서 x=4이면 f(x)는?", ["6", "12", "14", "18"], 2, "3*4+2=14입니다. 함수는 입력을 넣으면 출력이 나오는 규칙입니다."],
    ["m-exp", "math", "exponentials", 2, "10^3은 얼마인가?", ["30", "100", "1000", "10000"], 2, "10을 세 번 곱하면 1000입니다. 과학표기법과 압력/농도 단위에서 자주 씁니다."],
    ["m-log", "math", "logarithms", 2, "log10(1000)은?", ["1", "2", "3", "10"], 2, "10을 몇 번 곱해야 1000이 되는가를 묻습니다. 10^3=1000이므로 3입니다."],
    ["m-trig", "math", "trigonometry", 2, "직각삼각형에서 sin(theta)는?", ["인접변/빗변", "맞은편변/빗변", "빗변/맞은편변", "둘레/넓이"], 1, "sin은 각도와 맞은편 높이의 관계입니다. 결정면 각도와 벡터 성분에서 필요합니다."],
    ["m-vector", "math", "vectors", 3, "벡터가 스칼라와 다른 점은?", ["단위가 없다", "크기만 있다", "크기와 방향이 있다", "항상 0이다"], 2, "결정방향, 전기장, 힘, flux는 방향이 중요하므로 벡터 관점이 필요합니다."],
    ["m-derivative", "math", "differentiation", 3, "미분 derivative의 직관은?", ["누적량", "순간 변화율", "전체 평균", "단위 변환"], 1, "온도 ramp rate, 성장률 변화처럼 순간적으로 얼마나 변하는지 보는 도구입니다."],
    ["m-integral", "math", "integration", 3, "적분 integral의 직관은?", ["순간 기울기", "누적 효과", "각도", "오차만"], 1, "thermal budget처럼 시간 동안 쌓인 영향을 보는 데 필요합니다."],
    ["p-mech", "physics", "mechanics", 4, "힘 F=ma에서 m이 커지면 같은 가속도를 만들기 위해 필요한 힘은?", ["작아진다", "커진다", "0이 된다", "무관하다"], 1, "질량이 크면 같은 가속도에 더 큰 힘이 필요합니다."],
    ["p-energy", "physics", "energy", 4, "에너지 보존 관점에서 열처리 장비를 볼 때 중요한 질문은?", ["색이 예쁜가", "에너지가 어디서 들어와 어디로 빠지는가", "버튼 수", "장비 이름"], 1, "RTP는 에너지 입력, 흡수, 방출, 냉각 균형으로 이해해야 합니다."],
    ["p-heat", "physics", "heat", 4, "열전달 방식이 아닌 것은?", ["전도", "대류", "복사", "암기"], 3, "전도, 대류, 복사는 대표 열전달 방식입니다."],
    ["p-elec", "physics", "electricity", 4, "Ohm 법칙은?", ["V=IR", "P=MV", "F=ma", "E=mc"], 0, "전압, 전류, 저항의 기본 관계입니다. DVM 사고의 출발점입니다."],
    ["p-em", "physics", "electromagnetics", 4, "전기장/자기장 학습이 반도체에 필요한 이유는?", ["MOSFET, 플라즈마, 센서, 전자 이동을 이해하기 위해", "가운 색을 고르기 위해", "압축공기 이름을 외우기 위해", "문법 시험만 위해"], 0, "반도체 소자와 장비의 많은 현상은 전기장, 전자, 플라즈마와 연결됩니다."],
    ["c-atom", "chemistry", "atoms", 5, "원자번호 atomic number는 무엇을 뜻하는가?", ["중성자 수", "양성자 수", "전자껍질 수만", "질량 g"], 1, "원자번호는 양성자 수입니다. 원소의 정체성을 정합니다."],
    ["c-bond", "chemistry", "bonding", 5, "공유결합 covalent bond의 핵심은?", ["전자를 공유한다", "전자만 버린다", "항상 금속만 만든다", "질량이 사라진다"], 0, "Si 결정은 공유결합 네트워크로 이해하는 것이 중요합니다."],
    ["c-periodic", "chemistry", "periodic table", 5, "Si와 Ge가 같은 14족이라는 말의 의미는?", ["원자가전자 수와 결합 성향이 비슷하다", "색이 같다", "항상 액체다", "독성이 같다"], 0, "같은 족은 최외각 전자 구조가 비슷해 결합과 재료 특성이 연결됩니다."],
    ["c-gas", "chemistry", "gases", 5, "이상기체에서 압력과 몰수는 대체로 어떤 관계인가?", ["몰수가 증가하면 압력도 증가", "몰수가 증가하면 압력 0", "무관", "항상 폭발"], 0, "온도와 부피가 같다면 더 많은 분자가 더 큰 압력을 만듭니다."],
    ["c-thermo", "chemistry", "thermodynamics", 5, "열역학에서 평형 equilibrium이란?", ["아무 변화도 불가능한 상태만", "구동력이 균형을 이룬 상태", "항상 가장 빠른 상태", "장비가 꺼진 상태"], 1, "상평형과 반응 방향을 이해하는 핵심입니다."],
    ["e-unit", "engineering", "units", 0, "1 nm는 몇 m인가?", ["10^-3 m", "10^-6 m", "10^-9 m", "10^9 m"], 2, "nano는 10^-9입니다. 박막 두께와 결정 격자에서 기본입니다."],
    ["e-dim", "engineering", "dimensional analysis", 0, "계산 결과의 단위를 확인하는 이유는?", ["답 모양을 예쁘게 하려고", "물리적으로 말이 되는지 검증하려고", "문제를 길게 쓰려고", "단위는 중요하지 않아서"], 1, "단위 검사는 엔지니어링 계산의 안전벨트입니다."],
    ["e-sci", "engineering", "scientific notation", 0, "3.2 x 10^-6 m는 몇 micrometer인가?", ["0.0032 um", "3.2 um", "32 um", "3200 um"], 1, "1 um = 10^-6 m이므로 3.2 x 10^-6 m = 3.2 um입니다."],
    ["e-plot", "engineering", "graphs", 0, "공정 trend 그래프를 볼 때 첫 질문은?", ["색이 예쁜가", "축, 단위, 기준선, 변화 시점이 무엇인가", "제목만 본다", "가장 큰 숫자만 본다"], 1, "trend 해석은 축과 단위, baseline, change point에서 시작합니다."],
    ["en-read", "english", "reading", 12, "The film thickness increased after annealing. 가장 가까운 뜻은?", ["열처리 후 막 두께가 증가했다", "막이 사라졌다", "챔버가 열렸다", "압력이 낮아졌다"], 0, "technical reading은 문장의 주어, 변화, 조건을 잡는 훈련입니다."],
    ["en-vocab", "english", "technical vocabulary", 12, "defect density의 뜻은?", ["결함 밀도", "전압 강하", "기체 유량", "영어 점수"], 0, "논문과 공정 보고에서 defect density는 핵심 품질 지표입니다."],
    ["en-write", "english", "writing", 12, "고객에게 '추정입니다'를 안전하게 표현하는 문장은?", ["This is confirmed.", "Our current hypothesis is...", "Ignore the alarm.", "No evidence is needed."], 1, "확정과 가설을 구분하는 영어가 글로벌 엔지니어링의 기본입니다."],
    ["en-listen", "english", "listening", 12, "'Please verify the baseline trace'에서 verify의 의미는?", ["추측하다", "확인하다", "삭제하다", "무시하다"], 1, "listening 진단은 실제 오디오 대신 핵심 동사 이해로 시작합니다."],
    ["py-python", "programming", "Python", 3, "Python에서 리스트 평균을 구할 때 필요한 생각은?", ["sum과 length", "색상", "파일 이름만", "항상 AI"], 0, "데이터 분석은 합계, 개수, 평균, 분산 같은 기본 연산부터 시작합니다."],
    ["py-sheet", "programming", "spreadsheets", 3, "스프레드시트에서 필터의 목적은?", ["행을 무작위로 없애기", "조건에 맞는 데이터만 보기", "글자 색 바꾸기만", "파일 잠금"], 1, "trace, wafer ID, chamber ID를 조건별로 보는 기본 도구입니다."],
    ["py-stat", "programming", "statistics", 3, "표준편차 standard deviation은 무엇을 보여주는가?", ["평균만", "데이터가 얼마나 퍼져 있는지", "파일 크기", "단위 이름"], 1, "uniformity와 process variation을 이해하는 데 필요합니다."],
    ["py-corr", "programming", "statistics", 3, "correlation이 곧 causation이 아닌 이유는?", ["상관은 같이 움직임일 뿐 원인 증거가 부족할 수 있어서", "항상 원인이라서", "그래프가 없어서만", "영어라서"], 0, "공정 문제에서 상관과 원인을 구분해야 잘못된 조치를 피합니다."],
    ["mat-crystal", "materials", "crystal structures", 6, "결정 crystal은 무엇인가?", ["원자가 규칙적으로 반복 배열된 구조", "항상 액체", "단위가 없는 숫자", "압력계"], 0, "EPI는 기존 결정 위에 결정 방향을 이어 성장시키는 공정입니다."],
    ["mat-defect", "materials", "crystal defects", 6, "dislocation은 무엇과 가장 가까운가?", ["결정 내부 선형 결함", "압축공기", "파일 형식", "영어 시험"], 0, "결함공학은 EPI 품질과 소자 성능에 직접 연결됩니다."],
    ["mat-diffusion", "materials", "diffusion", 6, "diffusion은?", ["원자/분자가 농도 구배 등으로 이동하는 현상", "전압만", "문서 저장", "가운 착용"], 0, "dopant 이동, 계면 변화, 열처리 효과를 이해하는 기반입니다."],
    ["mat-phase", "materials", "phase diagrams", 6, "상평형도 phase diagram은 무엇을 보여주는가?", ["온도/조성에 따른 안정한 상", "로봇 경로만", "영어 단어장", "계좌 잔액"], 0, "재료 조성과 온도 조건에서 어떤 상이 안정한지 보는 지도입니다."],
    ["semi-pn", "semiconductor", "PN junction", 7, "PN 접합에서 depletion region은?", ["전하 운반자가 줄어든 영역", "가스 배관", "가운 보관함", "로봇 팔"], 0, "반도체 소자 이해의 핵심입니다."],
    ["semi-mos", "semiconductor", "MOSFET", 7, "MOSFET에서 gate의 역할은?", ["채널 전도 상태를 전기장으로 조절", "웨이퍼 운반", "가스 연소", "물 냉각"], 0, "EPI와 열공정은 MOSFET 성능에 연결되는 재료 조건을 만듭니다."],
    ["semi-yield", "semiconductor", "yield", 10, "yield가 낮아졌을 때 공정 엔지니어의 첫 태도는?", ["증상, 범위, 시간, lot/chamber split을 evidence로 분리", "바로 레시피 변경", "모두 장비 탓", "무시"], 0, "공정 문제는 증거 구조화가 우선입니다."],
    ["epi-mass", "epi", "mass transport", 11, "EPI에서 mass transport limit이란?", ["반응물 공급/이동이 성장률을 제한하는 상태", "영어 제한", "전기 차단기", "문서 검토"], 0, "성장률은 표면 반응과 수송 중 어느 쪽이 병목인지로 이해해야 합니다."],
    ["epi-selective", "epi", "selective epitaxy", 11, "selective epitaxy의 핵심은?", ["표면 종류에 따라 성장/비성장을 구분", "모든 표면에 무조건 성장", "온도를 측정하지 않음", "통신만"], 0, "Si와 dielectric 표면 반응성 차이를 이용하는 공정입니다."],
    ["epi-spc", "epi", "SPC", 11, "SPC control chart의 목적은?", ["공정 변동을 시간에 따라 감시", "장비 색상 선택", "가운 사이즈 선택", "압축파일 생성"], 0, "EPI PSE/SME는 data로 drift와 matching을 설명해야 합니다."]
  ].map(([id, domain, topic, stage, prompt, options, correct, explain]) => ({ id, domain, topic, stage, prompt, options, correct, explain }));

  const stages = [
    {
      id: "s0-habits",
      no: 0,
      title: "학습 습관과 공학 단위",
      subtitle: "학원을 못 가도 매일 굴러가는 구조 만들기",
      domains: ["engineering"],
      gate: "단위, 과학표기법, trend 읽기를 실수 없이 설명",
      why: "석사 준비는 머리가 좋은 사람보다 매일 틀린 것을 남기는 사람이 이깁니다.",
      lessons: [
        lesson("s0-units", "단위와 차원분석", "nm, um, Torr, Pa, sccm, K를 숫자 감각으로 연결한다.", "unit-scale", "engineering", "단위가 틀리면 공정 해석 전체가 무너집니다."),
        lesson("s0-trend", "그래프와 기준선", "축, 단위, baseline, change point를 읽는다.", "graph", "engineering", "FDC trend와 metrology map을 읽는 첫 단계입니다.")
      ]
    },
    {
      id: "s1-middle-math",
      no: 1,
      title: "중학교 수학 복구",
      subtitle: "분수, 비율, 방정식부터 다시 세우기",
      domains: ["math", "engineering"],
      gate: "비율과 1차 방정식을 공정 계산 예제로 풀기",
      why: "SiGe 조성, gas ratio, yield percent는 모두 비율 감각에서 시작합니다.",
      lessons: [
        lesson("s1-fractions", "분수와 비율", "전체, 부분, 비율을 wafer composition과 연결한다.", "ratio", "math", "조성, 희석, 결함률 계산의 바닥입니다."),
        lesson("s1-equations", "1차 방정식", "모르는 값을 x로 놓고 실제 공정 계산을 풀어본다.", "balance", "math", "원인 하나를 분리하는 사고와 닮아 있습니다.")
      ]
    },
    {
      id: "s2-high-math",
      no: 2,
      title: "고등수학 핵심",
      subtitle: "함수, 그래프, 지수, 로그, 삼각함수, 벡터",
      domains: ["math"],
      gate: "Arrhenius식, pH/log, 결정방향 그림을 겁내지 않기",
      why: "대학원 강의는 그래프와 함수 언어로 말합니다.",
      lessons: [
        lesson("s2-functions", "함수와 그래프", "입력과 출력, slope, curvature를 공정 trend로 본다.", "graph", "math", "growth rate curve와 RTP trace 해석의 언어입니다."),
        lesson("s2-logs-vectors", "로그, 삼각함수, 벡터", "스케일, 각도, 방향을 결정면과 공정 데이터에 연결한다.", "vector", "math", "결정방향, reciprocal space, 로그 스케일 논문 그래프를 위한 준비입니다.")
      ]
    },
    {
      id: "s3-engineering-math",
      no: 3,
      title: "공학수학 입문",
      subtitle: "미분, 적분, 선형대수, 확률통계, Python",
      domains: ["math", "programming"],
      gate: "변화율, 누적효과, 평균/분산, 회귀를 공정 예제로 설명",
      why: "PSE와 SME는 감이 아니라 model과 data로 말합니다.",
      lessons: [
        lesson("s3-calculus", "미분과 적분 직관", "rate와 accumulated effect를 RTP thermal budget으로 이해한다.", "thermal-budget", "math", "온도-시간 곡선과 diffusion 문제의 기본입니다."),
        lesson("s3-stats-python", "통계와 Python 분석", "평균, 표준편차, control chart, 간단한 Python 사고를 배운다.", "spc", "programming", "chamber matching과 drift 분석의 언어입니다.")
      ]
    },
    {
      id: "s4-physics",
      no: 4,
      title: "물리 기초",
      subtitle: "역학, 에너지, 열, 전기, 전자기",
      domains: ["physics", "engineering"],
      gate: "에너지 흐름과 전기 기본 회로를 장비 증상과 연결",
      why: "장비는 힘, 열, 전기, 진공, 제어가 합쳐진 시스템입니다.",
      lessons: [
        lesson("s4-heat", "열과 에너지", "전도, 대류, 복사, 열용량을 RTP와 chamber heating으로 본다.", "thermal-budget", "physics", "RTP와 EPI 모두 온도장이 품질을 좌우합니다."),
        lesson("s4-electric", "전기와 전자기", "V=IR, power, sensor, field를 DVM과 소자 이해에 연결한다.", "circuit", "physics", "현장 DVM과 MOSFET 물리를 이어주는 다리입니다.")
      ]
    },
    {
      id: "s5-chemistry",
      no: 5,
      title: "화학 기초",
      subtitle: "원자, 결합, 주기율, 기체, 반응, 열역학",
      domains: ["chemistry"],
      gate: "Si, Ge, H2, chlorosilane, dopant gas를 원자/결합 언어로 설명",
      why: "EPI는 장비 동작이면서 동시에 표면 화학입니다.",
      lessons: [
        lesson("s5-bonding", "원자와 결합", "전자구조와 공유결합을 Si crystal로 이해한다.", "crystal", "chemistry", "결정성 막 성장의 가장 작은 단위입니다."),
        lesson("s5-reactions", "기체와 반응 열역학", "partial pressure, equilibrium, reaction direction을 gas chemistry로 본다.", "gas", "chemistry", "gas delivery가 왜 film으로 바뀌는지 이해합니다.")
      ]
    },
    {
      id: "s6-materials",
      no: 6,
      title: "재료공학 코어",
      subtitle: "결정구조, 결함, 확산, 상평형, 열역학, kinetics",
      domains: ["materials", "chemistry", "physics"],
      gate: "structure-property-processing-performance 관계 설명",
      why: "석사 재료공학의 중심 문장은 구조가 성질을 만들고 공정이 구조를 만든다는 것입니다.",
      lessons: [
        lesson("s6-crystal-defects", "결정구조와 결함", "lattice, unit cell, point defect, dislocation을 그림으로 이해한다.", "crystal", "materials", "EPI defect와 yield를 말하는 언어입니다."),
        lesson("s6-diffusion-phase", "확산과 상평형", "농도 구배, 온도, phase diagram을 process window로 연결한다.", "diffusion", "materials", "열처리와 조성 제어의 기반입니다.")
      ]
    },
    {
      id: "s7-semiconductor",
      no: 7,
      title: "반도체 기본",
      subtitle: "PN, MOSFET, CMOS, wafer 제조와 yield",
      domains: ["semiconductor", "physics", "materials"],
      gate: "EPI/anneal/metrology가 소자 성능과 yield에 왜 연결되는지 설명",
      why: "장비 전문가는 wafer 위에서 최종적으로 무엇이 달라지는지 말할 수 있어야 합니다.",
      lessons: [
        lesson("s7-device", "PN junction과 MOSFET", "전기장, carrier, depletion, channel을 시각적으로 잡는다.", "device", "semiconductor", "공정 변화가 전기 특성으로 이어지는 길입니다."),
        lesson("s7-flow-yield", "CMOS 공정과 yield", "공정 흐름, defect density, process control을 연결한다.", "yield", "semiconductor", "PSE는 tool issue와 yield signal을 분리해야 합니다.")
      ]
    },
    {
      id: "s8-thin-film",
      no: 8,
      title: "박막과 표면",
      subtitle: "CVD, PVD, ALD, vacuum, surface chemistry",
      domains: ["materials", "chemistry", "semiconductor"],
      gate: "박막 공정 간 차이와 surface-limited growth 설명",
      why: "EPI를 제대로 이해하려면 다른 thin film 방식과 차이를 알아야 합니다.",
      lessons: [
        lesson("s8-film-methods", "CVD, PVD, ALD 비교", "source, transport, surface reaction, self-limiting을 비교한다.", "film-stack", "materials", "공정 선택의 이유를 설명하는 기반입니다."),
        lesson("s8-surface-vacuum", "표면과 진공", "adsorption, desorption, mean free path, contamination을 연결한다.", "vacuum", "materials", "pre-clean과 pumpdown을 공정 결과로 연결합니다.")
      ]
    },
    {
      id: "s9-crystal-growth",
      no: 9,
      title: "Crystal Growth",
      subtitle: "nucleation, growth, interface, strain, defects",
      domains: ["materials", "math", "chemistry"],
      gate: "growth rate, nucleation barrier, strain relaxation을 개념적으로 설명",
      why: "EPI는 thin film이면서 crystal growth입니다.",
      lessons: [
        lesson("s9-growth", "핵생성과 성장", "surface diffusion, nucleation, interface energy를 원자 이동으로 본다.", "crystal", "materials", "막이 왜 균일하지 않을 수 있는지 설명합니다."),
        lesson("s9-strain", "strain과 dislocation", "lattice mismatch와 critical thickness를 직관으로 잡는다.", "strain", "materials", "SiGe EPI와 defect risk의 핵심입니다.")
      ]
    },
    {
      id: "s10-process",
      no: 10,
      title: "Semiconductor Process",
      subtitle: "oxidation, diffusion, implantation, anneal, litho, etch, CMP, metrology",
      domains: ["semiconductor", "materials", "engineering"],
      gate: "공정 흐름 속에서 EPI가 앞뒤 공정과 주고받는 영향 설명",
      why: "EPI 문제는 EPI chamber 안에서만 생기지 않습니다.",
      lessons: [
        lesson("s10-flow", "전공정 전체 흐름", "공정 step 간 input/output과 defect handoff를 본다.", "process-chain", "semiconductor", "front-end process integration 시야입니다."),
        lesson("s10-metrology", "계측과 process control", "XRD, SEM, TEM, AFM, ellipsometry, SIMS, SPC를 목적별로 나눈다.", "metrology", "semiconductor", "qualification과 RCA의 증거 언어입니다.")
      ]
    },
    {
      id: "s11-epi",
      no: 11,
      title: "EPI Specialization",
      subtitle: "Si EPI, SEG, SiGe, Si:P, gas chemistry, transport, DOE, troubleshooting",
      domains: ["epi", "materials", "semiconductor", "programming"],
      gate: "증상에서 gas, thermal, vacuum, surface, metrology evidence를 구조화",
      why: "최종 목표인 PSE, SME, Principal, Fellow의 핵심 전문 영역입니다.",
      lessons: [
        lesson("s11-chemistry", "EPI gas chemistry와 mass transport", "precursor, carrier, dopant, HCl/selectivity, byproduct를 film으로 연결한다.", "epi-flow", "epi", "recipe 수치가 아니라 mechanism으로 사고합니다."),
        lesson("s11-troubleshooting", "EPI DOE/SPC/troubleshooting", "symptom, risk, subsystem, evidence, stop, report, prevention을 data로 묶는다.", "spc", "epi", "Applied-style 현장 판단을 PSE 수준으로 끌어올립니다.")
      ]
    },
    {
      id: "s12-research",
      no: 12,
      title: "Research Reading",
      subtitle: "논문, 특허, 매뉴얼, 발표 영어",
      domains: ["english", "materials", "programming"],
      gate: "논문 1편을 claim, method, evidence, limitation으로 요약",
      why: "Global SME는 공개 논문과 현장 데이터를 같은 언어로 번역할 수 있어야 합니다.",
      lessons: [
        lesson("s12-paper", "논문 읽기 구조", "abstract, figure, method, result, limitation을 읽는 순서를 익힌다.", "paper", "english", "graduate lecture와 literature review의 입구입니다."),
        lesson("s12-writing", "기술 영어와 scientific writing", "customer email, report, conference abstract 문장을 분리한다.", "writing", "english", "글로벌 협업과 escalation의 언어입니다.")
      ]
    },
    {
      id: "s13-ms-prep",
      no: 13,
      title: "Master's Preparation",
      subtitle: "연구방법론, 실험설계, 통계, 윤리, 석사 강의 대응",
      domains: ["materials", "english", "programming", "epi"],
      gate: "석사 입학 전 proposal-style learning packet 작성",
      why: "석사 과정은 문제를 스스로 정의하고 증거로 주장하는 훈련입니다.",
      lessons: [
        lesson("s13-method", "연구방법론과 실험설계", "hypothesis, DOE, control, reproducibility, ethics를 익힌다.", "doe", "materials", "Fellow급 문제정의 능력으로 이어집니다."),
        lesson("s13-seminar", "석사 세미나 준비", "paper presentation, Q&A, literature map, citation note를 만든다.", "paper", "english", "대학원 강의와 연구실 미팅을 버티는 운영 방식입니다.")
      ]
    }
  ];

  function lesson(id, title, summary, visual, domain, bridge) {
    return { id, title, summary, visual, domain, bridge };
  }

  function loadState() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STATE_KEY) || "{}");
      return {
        schemaVersion: STATE_SCHEMA_VERSION,
        answers: parsed.answers || {},
        lessonMastery: parsed.lessonMastery || {},
        activeStage: parsed.activeStage || "",
        activeLesson: parsed.activeLesson || "",
        activeQuestion: parsed.activeQuestion || "",
        teacherMode: parsed.teacherMode || "tutor",
        labValue: Number.isFinite(Number(parsed.labValue)) ? Number(parsed.labValue) : 55,
        attempts: Array.isArray(parsed.attempts) ? parsed.attempts : [],
        reviews: Array.isArray(parsed.reviews) ? parsed.reviews : [],
        sessionLog: Array.isArray(parsed.sessionLog) ? parsed.sessionLog : [],
        masteryCheckpoints: Array.isArray(parsed.masteryCheckpoints) ? parsed.masteryCheckpoints : [],
        journal: Array.isArray(parsed.journal) ? parsed.journal : [],
        createdAt: parsed.createdAt || new Date().toISOString(),
        updatedAt: parsed.updatedAt || new Date().toISOString()
      };
    } catch {
      return {
        schemaVersion: STATE_SCHEMA_VERSION,
        answers: {},
        lessonMastery: {},
        activeStage: "",
        activeLesson: "",
        activeQuestion: "",
        teacherMode: "tutor",
        labValue: 55,
        attempts: [],
        reviews: [],
        sessionLog: [],
        masteryCheckpoints: [],
        journal: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    }
  }

  let state = loadState();

  function persist() {
    state.updatedAt = new Date().toISOString();
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
  }

  function html(value) {
    return String(value ?? "").replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[ch]));
  }

  function clamp(value) {
    return Math.max(0, Math.min(100, Math.round(value || 0)));
  }

  function answerFor(id) {
    return state.answers[id];
  }

  function isCorrect(q) {
    return answerFor(q.id)?.choice === q.correct;
  }

  function conceptId(domain, topic) {
    return `${domain}:${topic}`.toLowerCase().replace(/\s+/g, "-");
  }

  function conceptFromQuestion(q) {
    return {
      id: conceptId(q.domain, q.topic),
      domain: q.domain,
      topic: q.topic,
      stage: q.stage,
      title: `${domainLabels[q.domain] || q.domain} · ${q.topic}`,
      prerequisites: prerequisiteConcepts(q),
      objectives: [
        "개념을 쉬운 말로 설명",
        "그래프/단위/공식으로 표현",
        "EPI 또는 반도체 현장 예시로 번역"
      ]
    };
  }

  function prerequisiteConcepts(q) {
    const byStage = {
      0: ["engineering:units", "engineering:scientific notation"],
      1: ["math:arithmetic", "math:fractions", "math:ratios"],
      2: ["math:equations", "math:graphs", "math:functions"],
      3: ["math:functions", "math:logarithms", "engineering:graphs"],
      4: ["engineering:units", "math:functions"],
      5: ["chemistry:atoms", "chemistry:bonding"],
      6: ["chemistry:bonding", "materials:crystal structures"],
      7: ["physics:electricity", "materials:crystal structures"],
      8: ["chemistry:gases", "materials:crystal defects"],
      9: ["materials:crystal structures", "materials:crystal defects"],
      10: ["semiconductor:yield", "engineering:graphs"],
      11: ["epi:mass transport", "programming:statistics"],
      12: ["english:reading", "english:technical vocabulary"],
      13: ["programming:statistics", "epi:SPC"]
    };
    return (byStage[q.stage] || []).filter(item => item !== conceptId(q.domain, q.topic));
  }

  function conceptNodes() {
    const map = new Map();
    questions.forEach(q => {
      const node = conceptFromQuestion(q);
      if (!map.has(node.id)) map.set(node.id, node);
    });
    return [...map.values()].sort((a, b) => a.stage - b.stage || a.domain.localeCompare(b.domain) || a.topic.localeCompare(b.topic));
  }

  function answersForConcept(node) {
    return questions.filter(q => conceptId(q.domain, q.topic) === node.id);
  }

  function attemptsForConcept(node) {
    return (state.attempts || []).filter(item => item.conceptId === node.id);
  }

  function dueReviews() {
    const now = Date.now();
    return (state.reviews || [])
      .filter(item => new Date(item.dueAt || 0).getTime() <= now)
      .sort((a, b) => new Date(a.dueAt || 0) - new Date(b.dueAt || 0));
  }

  function lessonBoostForConcept(node) {
    const completed = Object.values(state.lessonMastery || {}).filter(item => item.domain === node.domain);
    return Math.min(100, completed.length * 24);
  }

  function conceptMastery(node) {
    const related = answersForConcept(node);
    const answered = related.filter(q => answerFor(q.id));
    const correct = answered.filter(isCorrect).length;
    const attempts = attemptsForConcept(node);
    const misses = attempts.filter(item => !item.correct).length;
    const latest = attempts[0]?.answeredAt || "";
    const due = (state.reviews || []).filter(item => conceptId(item.domain || "", item.topic || item.skill || "") === node.id || item.topic === node.topic);
    const dueNow = due.filter(item => new Date(item.dueAt || 0).getTime() <= Date.now()).length;
    const diagnosticScore = related.length ? correct / related.length * 100 : 0;
    const attemptQuality = attempts.length ? Math.max(0, 100 - misses / attempts.length * 75) : 35;
    const lessonBoost = lessonBoostForConcept(node);
    const retention = dueNow ? Math.max(20, 82 - dueNow * 18) : latest ? 88 : 45;
    const score = clamp(diagnosticScore * 0.46 + attemptQuality * 0.2 + lessonBoost * 0.18 + retention * 0.16 - Math.min(18, dueNow * 5));
    return {
      ...node,
      score,
      answered: answered.length,
      total: related.length,
      correct,
      attempts: attempts.length,
      misses,
      dueNow,
      status: score >= 85 ? "숙련" : score >= 70 ? "실전 가능" : score >= 45 ? "학습 중" : answered.length ? "기초 보강" : "미진단",
      latest
    };
  }

  function masteryMap() {
    return conceptNodes().map(conceptMastery);
  }

  function weakestConcepts(limit = 8) {
    return masteryMap()
      .sort((a, b) => a.score - b.score || b.dueNow - a.dueNow || b.misses - a.misses)
      .slice(0, limit);
  }

  function reviewLoadForConcept(node) {
    return (state.reviews || []).filter(item => {
      const id = conceptId(item.domain || "", item.topic || item.skill || "");
      return id === node.id || item.topic === node.topic;
    }).length;
  }

  function diagnosticQueue(limit = 10) {
    const answeredIds = new Set(Object.keys(state.answers || {}));
    const nodes = masteryMap();
    const dueIds = new Set(dueReviews().map(item => conceptId(item.domain || "", item.topic || item.skill || "")));
    const queue = nodes.map(node => {
      const related = answersForConcept(node);
      const unanswered = related.find(q => !answerFor(q.id));
      const wrong = related.find(q => answerFor(q.id) && !isCorrect(q));
      const question = unanswered || wrong || related[0];
      const prereqGap = node.prerequisites
        .map(id => nodes.find(item => item.id === id))
        .filter(item => item && item.score < 70);
      const priority =
        (100 - node.score)
        + node.dueNow * 22
        + node.misses * 16
        + (dueIds.has(node.id) ? 24 : 0)
        + prereqGap.length * 10
        + (!answeredIds.has(question?.id || "") ? 12 : 0)
        + Math.max(0, 13 - node.stage);
      const reason = [
        node.score < 45 ? "foundation gap" : node.score < 70 ? "practice gap" : "retention check",
        node.dueNow ? `${node.dueNow} due review` : "",
        node.misses ? `${node.misses} misses` : "",
        prereqGap.length ? `${prereqGap.length} prerequisite gaps` : "",
        unanswered ? "unanswered diagnostic" : wrong ? "wrong answer retry" : "mastery confirmation"
      ].filter(Boolean).join(" · ");
      return {
        ...node,
        priority: Math.round(priority),
        reason,
        questionId: question?.id || "",
        questionPrompt: question?.prompt || "",
        prereqGap: prereqGap.map(item => ({ id: item.id, topic: item.topic, score: item.score })),
        reviewLoad: reviewLoadForConcept(node)
      };
    });
    return queue.sort((a, b) => b.priority - a.priority || a.stage - b.stage).slice(0, limit);
  }

  function prerequisiteChain(node = weakestConcepts(1)[0]) {
    if (!node) return [];
    const nodes = masteryMap();
    const visited = new Set();
    const rows = [];
    function walk(currentId, depth) {
      if (!currentId || visited.has(currentId) || depth > 4) return;
      visited.add(currentId);
      const item = nodes.find(entry => entry.id === currentId);
      if (!item) return;
      rows.push({
        id: item.id,
        depth,
        title: item.title,
        topic: item.topic,
        domain: item.domain,
        score: item.score,
        status: item.status,
        blocker: item.score < 70
      });
      item.prerequisites.forEach(id => walk(id, depth + 1));
    }
    walk(node.id, 0);
    return rows.sort((a, b) => b.depth - a.depth || a.score - b.score).slice(0, 10);
  }

  function adaptiveEngineSummary() {
    const queue = diagnosticQueue(8);
    const target = queue[0] || weakestConcepts(1)[0];
    const stage = currentStage();
    const lessonItem = activeLesson();
    const unlock = unlockReport();
    const blocked = unlock.find(item => !item.unlocked);
    const due = dueReviews();
    const session = adaptiveSession();
    return {
      schemaVersion: "materials-ms-adaptive-engine-v1",
      generatedAt: new Date().toISOString(),
      targetConcept: target ? {
        id: target.id,
        title: target.title,
        score: target.score,
        priority: target.priority || 0,
        reason: target.reason || "lowest mastery",
        questionId: target.questionId || "",
        questionPrompt: target.questionPrompt || ""
      } : null,
      currentStage: {
        id: stage.id,
        no: stage.no,
        title: stage.title,
        score: stageScore(stage),
        gate: stage.gate
      },
      activeLesson: lessonItem,
      dueReviews: due.slice(0, 8),
      queue,
      prerequisiteChain: prerequisiteChain(target),
      blockedStage: blocked || null,
      session,
      nextDecision: target?.score < 50
        ? "선수개념으로 후퇴해서 기초를 닫기"
        : due.length
          ? "복습 큐를 먼저 비우고 새 수업으로 이동"
          : "현재 stage lesson을 완료하고 설명 evidence 저장"
    };
  }

  function adaptiveSession() {
    const due = dueReviews();
    const queue = diagnosticQueue(1);
    const gap = queue[0] || weakestConcepts(1)[0];
    const stage = currentStage();
    const lessonItem = activeLesson();
    return [
      {
        id: "review",
        minutes: 4,
        title: due[0] ? `복습: ${due[0].topic || due[0].skill}` : "복습 큐 점검",
        action: due[0] ? due[0].prompt : "아직 due review가 없으면 최근 오답을 1개 설명",
        evidence: `${due.length} due reviews`
      },
      {
        id: "diagnostic-gap",
        minutes: 6,
        title: `약점 진단: ${gap?.title || "units"}`,
        action: "같은 개념 문제를 풀고 왜 틀렸는지 한 문장으로 기록",
        evidence: `${gap?.score ?? 0}% mastery · priority ${gap?.priority ?? 0} · ${gap?.reason || `${gap?.misses ?? 0} misses`}`
      },
      {
        id: "lesson",
        minutes: 9,
        title: `수업: ${lessonItem.title}`,
        action: stage.gate,
        evidence: lessonItem.bridge
      },
      {
        id: "visual",
        minutes: 6,
        title: "시각화/그래프 직관",
        action: "슬라이더를 움직이며 개념을 그래프, wafer, chamber state로 번역",
        evidence: lessonItem.visual
      },
      {
        id: "explain",
        minutes: 3,
        title: "내 말 설명",
        action: "초보자에게 설명하듯 5문장으로 말하기",
        evidence: "explain-to-learn"
      },
      {
        id: "record",
        minutes: 2,
        title: "Think Tank 기록",
        action: "오늘 배운 개념, evidence, next review를 책장에 남기기",
        evidence: "AI packet quality"
      }
    ];
  }

  function unlockReport() {
    return stages.map((stage, index) => {
      const previous = index > 0 ? stages[index - 1] : null;
      const unlocked = isStageUnlocked(index);
      return {
        id: stage.id,
        no: stage.no,
        title: stage.title,
        score: stageScore(stage),
        unlocked,
        blocker: unlocked ? "" : `이전 단계 ${previous?.title || ""} score ${previous ? stageScore(previous) : 0}% / 필요 72%`,
        nextEvidence: stage.gate
      };
    });
  }

  function domainScore(domain) {
    const related = questions.filter(q => q.domain === domain);
    const answered = related.filter(q => answerFor(q.id));
    if (!related.length) return 0;
    if (!answered.length) return 0;
    return clamp(answered.filter(isCorrect).length / related.length * 100);
  }

  function topicScore(topic) {
    const related = questions.filter(q => q.topic === topic);
    const answered = related.filter(q => answerFor(q.id));
    if (!related.length || !answered.length) return 0;
    return clamp(answered.filter(isCorrect).length / related.length * 100);
  }

  function diagnosticProgress() {
    const answered = questions.filter(q => answerFor(q.id)).length;
    return { answered, total: questions.length, percent: clamp(answered / questions.length * 100) };
  }

  function lessonDone(lessonId) {
    return Boolean(state.lessonMastery[lessonId]?.doneAt);
  }

  function stageScore(stage) {
    const domainPart = stage.domains.length
      ? stage.domains.reduce((sum, domain) => sum + domainScore(domain), 0) / stage.domains.length
      : 0;
    const lessons = stage.lessons || [];
    const lessonPart = lessons.length ? lessons.filter(item => lessonDone(item.id)).length / lessons.length * 100 : 0;
    const diagnostic = diagnosticProgress().percent;
    if (stage.no === 0) return clamp(domainPart * 0.35 + lessonPart * 0.35 + diagnostic * 0.3);
    return clamp(domainPart * 0.62 + lessonPart * 0.38);
  }

  function isStageUnlocked(index) {
    if (index === 0) return true;
    const previous = stages[index - 1];
    return stageScore(previous) >= 72;
  }

  function currentStage() {
    const firstBlocked = stages.find((stage, index) => isStageUnlocked(index) && stageScore(stage) < 82);
    return firstBlocked || stages[stages.length - 1];
  }

  function activeStage() {
    return stages.find(stage => stage.id === state.activeStage) || currentStage();
  }

  function activeLesson() {
    const stage = activeStage();
    return stage.lessons.find(item => item.id === state.activeLesson)
      || stage.lessons.find(item => !lessonDone(item.id))
      || stage.lessons[0];
  }

  function nextQuestion() {
    if (state.activeQuestion) {
      const active = questions.find(q => q.id === state.activeQuestion);
      if (active) return active;
    }
    const target = diagnosticQueue(1)[0];
    const queued = questions.find(q => q.id === target?.questionId);
    return queued
      || questions.find(q => !answerFor(q.id))
      || questions.find(q => answerFor(q.id) && !isCorrect(q))
      || questions[0];
  }

  function readiness() {
    const math = domainScore("math");
    const physics = domainScore("physics");
    const chemistry = domainScore("chemistry");
    const engineering = domainScore("engineering");
    const english = domainScore("english");
    const programming = domainScore("programming");
    const materials = domainScore("materials");
    const semiconductor = domainScore("semiconductor");
    const epi = domainScore("epi");
    const lessonAverage = clamp(stages.reduce((sum, stage) => sum + stageScore(stage), 0) / stages.length);
    return {
      overall: clamp((math + physics + chemistry + engineering + english + programming + materials + semiconductor + epi + lessonAverage) / 10),
      math,
      physics,
      chemistry,
      engineering,
      english,
      programming,
      materials,
      semiconductor,
      epi,
      masters: clamp((math * 0.18 + physics * 0.13 + chemistry * 0.13 + materials * 0.26 + english * 0.12 + programming * 0.08 + lessonAverage * 0.1)),
      productSupport: clamp((epi * 0.28 + semiconductor * 0.18 + materials * 0.16 + engineering * 0.12 + english * 0.13 + programming * 0.13)),
      global: clamp((english * 0.32 + materials * 0.18 + epi * 0.18 + programming * 0.12 + lessonAverage * 0.2)),
      fellow: clamp((epi * 0.22 + materials * 0.2 + english * 0.16 + programming * 0.12 + lessonAverage * 0.3))
    };
  }

  function competencyMatrix() {
    const r = readiness();
    return competencyTracks.map(track => {
      const domainScoreAverage = track.domains.length
        ? track.domains.reduce((sum, domain) => sum + (r[domain] ?? domainScore(domain)), 0) / track.domains.length
        : 0;
      const relatedStages = stages.filter(stage => stage.domains.some(domain => track.domains.includes(domain)));
      const stageAverage = relatedStages.length
        ? relatedStages.reduce((sum, stage) => sum + stageScore(stage), 0) / relatedStages.length
        : 0;
      const weak = weakestConcepts(20).find(item => track.domains.includes(item.domain));
      const completedLessons = Object.values(state.lessonMastery || {}).filter(item => track.domains.includes(item.domain)).length;
      const score = clamp(domainScoreAverage * 0.48 + stageAverage * 0.32 + Math.min(100, completedLessons * 18) * 0.2);
      return {
        ...track,
        score,
        status: score >= 85 ? "evidence-ready" : score >= 70 ? "field-usable" : score >= 50 ? "learning" : "foundation-gap",
        weakestConcept: weak ? { id: weak.id, title: weak.title, score: weak.score, status: weak.status } : null,
        evidence: `${track.domains.map(domain => `${domainLabels[domain] || domain} ${r[domain] ?? domainScore(domain)}%`).join(" · ")} · ${completedLessons} lessons`,
        nextAction: weak ? `${weak.topic} 개념을 EPI/wafer evidence로 설명` : `${track.label} evidence note 1개 저장`
      };
    }).sort((a, b) => a.score - b.score);
  }

  function graduateGateReport() {
    const r = readiness();
    const matrix = competencyMatrix();
    const blockers = [
      r.math < 65 ? { area: "수학", reason: "로그, 함수, 미적분, 통계가 재료공학 논문 그래프의 언어입니다.", action: "Stage 1~3 약점 큐를 먼저 닫기" } : null,
      r.physics < 60 ? { area: "물리", reason: "열, 전기, 에너지 모델 없이는 장비 현상과 wafer 변화를 연결하기 어렵습니다.", action: "열/전기 수업과 DVM/thermal budget 예시 복습" } : null,
      r.chemistry < 60 ? { area: "화학", reason: "EPI는 기체와 표면 반응이 결정성 막으로 바뀌는 공정입니다.", action: "원자/결합/기체/반응 열역학 큐 복습" } : null,
      r.materials < 65 ? { area: "재료공학", reason: "결정, 결함, 확산, 상평형이 석사 core의 중심입니다.", action: "Stage 6~9 concept chain 학습" } : null,
      r.english < 55 ? { area: "기술 영어", reason: "논문 abstract/figure와 글로벌 회의 표현을 읽어야 합니다.", action: "Research Reading + technical vocabulary daily review" } : null,
      matrix[0]?.score < 55 ? { area: matrix[0].label, reason: "가장 낮은 Fellow competency track입니다.", action: matrix[0].nextAction } : null
    ].filter(Boolean);
    return {
      readiness: r.masters,
      status: r.masters >= 80 ? "MS lecture ready with review" : r.masters >= 62 ? "bridge curriculum needed" : "foundation repair first",
      blockers: blockers.slice(0, 5),
      mustNotClaim: [
        "입학 보장",
        "학교별 최신 요건 단정",
        "비공개 장비 자료나 recipe 기반 학습"
      ],
      evidenceNeeded: [
        "수학/물리/화학 진단 80% 이상",
        "재료공학 core stage gate 설명",
        "논문 figure 1개 claim/evidence/limitation 요약",
        "EPI 공정 문제를 data/evidence로 정리한 report"
      ]
    };
  }

  function weakTopics(limit = 8) {
    const seen = [...new Set(questions.map(q => q.topic))];
    return seen
      .map(topic => ({ topic, score: topicScore(topic), misses: questions.filter(q => q.topic === topic && answerFor(q.id) && !isCorrect(q)).length }))
      .sort((a, b) => a.score - b.score || b.misses - a.misses)
      .slice(0, limit);
  }

  function buildPacket() {
    const r = readiness();
    const stage = currentStage();
    const lessonItem = activeLesson();
    const adaptive = adaptiveEngineSummary();
    const matrix = competencyMatrix();
    return {
      schemaVersion: PACKET_VERSION,
      stateSchemaVersion: state.schemaVersion || STATE_SCHEMA_VERSION,
      sourceVersion: SOURCE_VERSION,
      generatedAt: new Date().toISOString(),
      learnerProfile: {
        language: "Korean",
        background: "practical semiconductor equipment engineer, Applied Materials EPI Installation path",
        mathAssumption: "starts from absolute beginner when evidence is missing",
        target: ["MS Materials Science and Engineering", "EPI Product Support Engineer", "Global SME", "Principal Engineer", "Fellow"]
      },
      readiness: r,
      diagnosticProgress: diagnosticProgress(),
      graduateGate: graduateGateReport(),
      competencyMatrix: matrix,
      adaptiveEngine: {
        ...adaptive,
        todaySession: adaptive.session,
        masteryMap: masteryMap().slice(0, 80),
        weakestConcepts: weakestConcepts(12),
        unlockReport: unlockReport(),
        knowledgeGraph: {
          nodes: masteryMap().slice(0, 80).map(item => ({
            id: item.id,
            title: item.title,
            domain: item.domain,
            topic: item.topic,
            stage: item.stage,
            score: item.score,
            status: item.status
          })),
          edges: conceptNodes().flatMap(node => node.prerequisites.map(source => ({ source, target: node.id, relation: "prerequisite" }))).slice(0, 160)
        }
      },
      currentStage: { id: stage.id, no: stage.no, title: stage.title, score: stageScore(stage), gate: stage.gate },
      currentLesson: lessonItem,
      weakTopics: weakTopics(12),
      completedLessons: Object.entries(state.lessonMastery).map(([id, value]) => ({ id, ...value })),
      recentJournal: state.journal.slice(0, 10),
      nextSevenDays: buildSevenDayPlan(),
      sources,
      boundaries: [
        "This platform teaches public, academic, conceptual, and field-safe knowledge.",
        "It does not provide confidential equipment manuals, recipes, valve sequences, detector setpoints, interlock bypasses, or customer site-specific limits.",
        "Actual tool work remains governed by official training, site procedures, EHS approval, and senior witness."
      ]
    };
  }

  function buildSevenDayPlan() {
    const stage = currentStage();
    const lessonItem = activeLesson();
    const weak = weakTopics(4);
    return [
      `Day 1: ${stage.title}의 ${lessonItem.title} 수업을 끝내고 내 말 설명 5문장 작성`,
      `Day 2: 약점 ${weak[0]?.topic || "fractions"} 문제 10개 복습`,
      `Day 3: EPI 현장 예시로 같은 개념을 다시 설명`,
      `Day 4: 그래프/단위/공식 중 하나를 손으로 유도`,
      `Day 5: 영어 technical vocabulary 15개 추출`,
      `Day 6: 논문 figure 1개를 claim/evidence/limitation으로 분해`,
      `Day 7: AI packet을 복사해서 다음 학습 루트 재평가`
    ];
  }

  function registerBookshelfBook() {
    const shelf = window.ProjectUniverseBookshelf;
    if (!shelf?.books || shelf.books.some(book => book.id === "materials-ms-academy")) return;
    shelf.books.splice(2, 0, {
      id: "materials-ms-academy",
      code: "MS",
      shelf: "전문성",
      title: "재료공학 MS 아카데미",
      subtitle: "수학 기초부터 재료공학 석사 준비, EPI PSE/SME/Fellow 루트까지 연결하는 적응형 학습 책",
      privacyLevel: "work-learning",
      purpose: "수학 약점, 물리/화학/재료/반도체/EPI 학습 진단, 논문 읽기, 기술영어, 연구 준비 기록을 장기적으로 쌓는다.",
      allowed: ["진단 결과", "개념 오답", "내 말 설명", "공개 강의/논문 링크", "학습 로그", "AI 공개용 요약"],
      neverStore: ["유료 교재 원문 복사", "시험 기출 원문", "고객 비공개자료", "장비 manual 원문", "recipe", "site-specific limit"],
      pageTypes: ["진단 오답", "수학 개념", "물리 개념", "화학 개념", "재료공학 노트", "반도체 노트", "EPI 연구 노트", "논문 요약", "기술영어", "석사 준비"],
      aiUse: ["약점 진단", "다음 학습 단계 추천", "논문 읽기 루트 생성", "EPI 현장 예시로 개념 재설명", "석사 readiness packet 생성"],
      starterQuestions: ["내가 오늘 막힌 개념은 무엇인가?", "이 개념을 EPI 장비나 wafer 변화로 설명하면?", "다음 복습 날짜와 증거는 무엇인가?"],
      reviewCadence: "매일 25분, 주 1회 packet 재평가",
      linkedViews: ["materials-ms", "bookshelf", "papers", "english", "english-test", "fellow"]
    });
    shelf.render?.();
  }

  function render() {
    const root = document.querySelector("#materials-ms-root");
    if (!root) return;
    const r = readiness();
    const progress = diagnosticProgress();
    const stage = activeStage();
    const autoStage = currentStage();
    const lessonItem = activeLesson();
    const q = nextQuestion();
    const answered = answerFor(q.id);
    const session = adaptiveSession();
    const mastery = weakestConcepts(10);
    const adaptive = adaptiveEngineSummary();
    const matrix = competencyMatrix();
    const gate = graduateGateReport();
    const packet = buildPacket();
    root.innerHTML = `
      <section class="ms-hero">
        <div>
          <p class="eyebrow">Adaptive AI Learning OS</p>
          <h2>수포자 출발점에서 재료공학 석사, EPI Fellow 루트까지</h2>
          <p>이 화면은 사용자가 과목을 고르는 방식이 아닙니다. 진단 답변, 오답, 완료한 수업, 남은 약점을 바탕으로 오늘 배워야 할 단계를 자동으로 고릅니다.</p>
          <div class="ms-action-row">
            <button class="primary" type="button" data-ms-auto>오늘 수업 자동 시작</button>
            <button class="secondary" type="button" data-ms-next-question>다음 진단 문제</button>
            <button class="secondary" type="button" data-ms-copy-packet>AI packet 복사</button>
          </div>
          <small id="ms-copy-status"></small>
        </div>
        <article>
          <span>Current auto stage</span>
          <strong>Stage ${autoStage.no}</strong>
          <b>${html(autoStage.title)}</b>
          <small>${stageScore(autoStage)}% · gate: ${html(autoStage.gate)}</small>
        </article>
      </section>

      <section class="ms-readiness-grid" aria-label="MS readiness dashboard">
        ${readinessCards(r).map(card => `
          <article>
            <span>${html(card.label)}</span>
            <strong>${card.value}%</strong>
            <small>${html(card.hint)}</small>
          </article>
        `).join("")}
      </section>

      ${renderAdaptiveCommandCenter(adaptive, matrix, gate)}
      ${renderAdaptiveSession(session)}
      ${renderMasteryEngine(mastery)}

      <section class="ms-main-grid">
        <article class="ms-panel ms-diagnostic-panel">
          <div class="ms-panel-head">
            <div>
              <p class="eyebrow">Initial Diagnostic</p>
              <h3>전체 진단 ${progress.answered}/${progress.total}</h3>
              <p>수학, 물리, 화학, 공학단위, 영어, Python/통계, 재료, 반도체, EPI를 한 번에 진단합니다.</p>
            </div>
            <span>${progress.percent}%</span>
          </div>
          <div class="ms-question-card">
            <span>${html(domainLabels[q.domain])} / ${html(q.topic)}</span>
            <h4>${html(q.prompt)}</h4>
            <p class="ms-question-reason">${html(adaptive.targetConcept?.reason || "adaptive diagnostic queue")} · target ${html(adaptive.targetConcept?.title || "baseline")}</p>
            <div class="ms-option-grid">
              ${q.options.map((option, index) => {
                const picked = answered?.choice === index;
                const klass = answered ? (index === q.correct ? "correct" : picked ? "wrong" : "") : "";
                return `<button type="button" class="${klass}" data-ms-answer="${q.id}" data-choice="${index}">${html(option)}</button>`;
              }).join("")}
            </div>
            ${answered ? `<p class="ms-feedback ${answered.choice === q.correct ? "good" : "bad"}">${answered.choice === q.correct ? "정답" : "오답"} · ${html(q.explain)}</p>` : `<p class="ms-feedback">답을 고르면 즉시 채점되고 약점 큐에 저장됩니다.</p>`}
          </div>
          <div class="ms-weak-grid">
            ${weakTopics(6).map(item => `<span><b>${html(item.topic)}</b><small>${item.score}% · misses ${item.misses}</small></span>`).join("")}
          </div>
        </article>

        <article class="ms-panel ms-teacher-panel">
          <div class="ms-panel-head">
            <div>
              <p class="eyebrow">AI Teacher Studio</p>
              <h3>${html(lessonItem.title)}</h3>
              <p>${html(lessonItem.summary)}</p>
            </div>
            <span>${lessonDone(lessonItem.id) ? "완료" : "진행"}</span>
          </div>
          <div class="ms-teacher-mode-row">
            ${["professor", "tutor", "mentor", "interviewer", "coach"].map(mode => `<button class="secondary ${state.teacherMode === mode ? "active" : ""}" type="button" data-ms-teacher="${mode}">${teacherLabel(mode)}</button>`).join("")}
          </div>
          <div class="ms-teacher-card">
            ${renderTeacherVoice(lessonItem, stage)}
          </div>
          ${renderVisualLab(lessonItem)}
          <div class="ms-lesson-actions">
            <button class="primary" type="button" data-ms-complete-lesson="${lessonItem.id}">${lessonDone(lessonItem.id) ? "완료 갱신" : "이 수업 완료"}</button>
            <button class="secondary" type="button" data-ms-explain-again>다른 방식으로 설명</button>
          </div>
        </article>
      </section>

      <section class="ms-roadmap-panel">
        <div class="ms-panel-head">
          <div>
            <p class="eyebrow">Auto Unlock Roadmap</p>
            <h3>Stage 0에서 Stage 13까지 자동 개방</h3>
            <p>사용자는 길을 고르지 않습니다. 시스템이 현재 점수와 오답을 보고 다음 stage를 엽니다. 잠긴 stage는 미리보기만 됩니다.</p>
          </div>
          <span>${stages.filter((item, index) => isStageUnlocked(index)).length}/${stages.length}</span>
        </div>
        <div class="ms-stage-grid">
          ${stages.map((item, index) => {
            const unlocked = isStageUnlocked(index);
            const current = item.id === autoStage.id;
            return `
              <button type="button" class="ms-stage-card ${unlocked ? "unlocked" : "locked"} ${current ? "current" : ""} ${item.id === stage.id ? "active" : ""}" data-ms-stage="${item.id}" ${unlocked ? "" : "aria-disabled=\"true\""}>
                <span>Stage ${item.no}</span>
                <strong>${html(item.title)}</strong>
                <small>${stageScore(item)}% · ${html(item.subtitle)}</small>
                <i>${html(item.gate)}</i>
              </button>
            `;
          }).join("")}
        </div>
      </section>

      <section class="ms-main-grid">
        <article class="ms-panel">
          <div class="ms-panel-head">
            <div>
              <p class="eyebrow">Stage Lessons</p>
              <h3>${html(stage.title)}</h3>
              <p>${html(stage.why)}</p>
            </div>
            <span>${stageScore(stage)}%</span>
          </div>
          <div class="ms-lesson-list">
            ${stage.lessons.map(item => `
              <button type="button" class="${item.id === lessonItem.id ? "active" : ""} ${lessonDone(item.id) ? "done" : ""}" data-ms-lesson="${item.id}">
                <strong>${html(item.title)}</strong>
                <small>${html(item.summary)}</small>
                <b>${lessonDone(item.id) ? "mastery evidence saved" : html(item.bridge)}</b>
              </button>
            `).join("")}
          </div>
        </article>

        <article class="ms-panel">
          <div class="ms-panel-head">
            <div>
              <p class="eyebrow">Master's Packet</p>
              <h3>AI에게 보여줄 수 있는 학습 상태</h3>
              <p>약점, 현재 stage, 완료 수업, 다음 7일 계획, 공개자료 근거가 포함됩니다.</p>
            </div>
            <span>${r.masters}%</span>
          </div>
          <textarea class="ms-packet-output" readonly>${html(JSON.stringify(packet, null, 2))}</textarea>
        </article>
      </section>

      <section class="ms-source-panel">
        <div class="ms-panel-head">
          <div>
            <p class="eyebrow">Public Academic Sources</p>
            <h3>커리큘럼 근거</h3>
            <p>석사 준비 루트는 공개 대학 커리큘럼, OCW, 공식 MSE 요구사항, EPI 공식 자료를 기준으로 삼았습니다.</p>
          </div>
        </div>
        <div class="ms-source-grid">
          ${sources.map(source => `
            <a href="${source.url}" target="_blank" rel="noreferrer">
              <strong>${html(source.label)}</strong>
              <small>${html(source.use)}</small>
            </a>
          `).join("")}
        </div>
      </section>
    `;
    bind(root);
  }

  function readinessCards(r) {
    return [
      ["Overall mastery", r.overall, "전체 진단과 수업 완료 기반"],
      ["Math readiness", r.math, "중학수학부터 공학수학까지"],
      ["Physics readiness", r.physics, "열, 전기, 에너지"],
      ["Chemistry readiness", r.chemistry, "원자, 결합, 기체, 반응"],
      ["Materials readiness", r.materials, "결정, 결함, 확산, 상평형"],
      ["Semiconductor readiness", r.semiconductor, "소자, 공정, yield"],
      ["English readiness", r.english, "논문/고객/발표 영어"],
      ["MS readiness", r.masters, "석사 강의 진입 준비"],
      ["EPI readiness", r.epi, "EPI 전문성"],
      ["PSE readiness", r.productSupport, "Product Support Engineer"],
      ["Global readiness", r.global, "Global SME"],
      ["Fellow readiness", r.fellow, "영향력과 증거 포트폴리오"]
    ].map(([label, value, hint]) => ({ label, value, hint }));
  }

  function todaySessionDone() {
    const key = new Date().toISOString().slice(0, 10);
    const row = (state.sessionLog || []).find(item => item.date === key);
    return row?.segments || {};
  }

  function renderAdaptiveCommandCenter(adaptive, matrix, gate) {
    const target = adaptive.targetConcept;
    return `
      <section class="ms-engine-command" aria-label="adaptive curriculum command deck">
        <div class="ms-panel-head">
          <div>
            <p class="eyebrow">Adaptive Curriculum Engine</p>
            <h3>오늘 왜 이 개념을 배정했는가</h3>
            <p>진단 오답, 복습 대기, 선수개념 gap, stage gate, Fellow 역량을 합쳐 다음 수업과 문제를 자동 선택합니다.</p>
          </div>
          <span>${html(adaptive.nextDecision)}</span>
        </div>
        <div class="ms-engine-grid">
          <article class="ms-engine-target">
            <span>Target concept</span>
            <strong>${html(target?.title || "진단 데이터 대기")}</strong>
            <p>${html(target?.reason || "먼저 진단 문제를 풀어 기준 데이터를 만듭니다.")}</p>
            <small>${target ? `${target.score}% mastery · priority ${target.priority}` : "baseline"}</small>
            ${target?.questionId ? `<button class="primary" type="button" data-ms-jump-question="${html(target.questionId)}">이 개념 문제 풀기</button>` : ""}
          </article>
          <article>
            <span>Graduate gate</span>
            <strong>${gate.readiness}% · ${html(gate.status)}</strong>
            <p>${gate.blockers[0] ? `${html(gate.blockers[0].area)}: ${html(gate.blockers[0].action)}` : "큰 gate blocker는 낮습니다. evidence note를 쌓으세요."}</p>
            <small>MS 강의 진입은 입학 보장이 아니라 선수지식 readiness입니다.</small>
          </article>
          <article>
            <span>Blocked stage</span>
            <strong>${adaptive.blockedStage ? html(adaptive.blockedStage.title) : "모든 열린 stage 진행 가능"}</strong>
            <p>${adaptive.blockedStage ? html(adaptive.blockedStage.blocker) : "현재 열린 stage 안에서 mastery evidence를 쌓으면 됩니다."}</p>
            <small>${html(adaptive.currentStage.gate)}</small>
          </article>
        </div>
        <div class="ms-prereq-command">
          <article>
            <strong>선수개념 chain</strong>
            <div class="ms-prereq-chain">
              ${adaptive.prerequisiteChain.length ? adaptive.prerequisiteChain.map(item => `
                <button type="button" class="${item.blocker ? "blocker" : "ready"}" data-ms-concept-question="${html(item.id)}">
                  <span>${"↳ ".repeat(item.depth)}${html(item.topic)}</span>
                  <b>${item.score}%</b>
                  <small>${html(item.status)}</small>
                </button>
              `).join("") : `<span class="ms-empty-note">선수개념 chain 데이터 대기</span>`}
            </div>
          </article>
          <article>
            <strong>진단 queue</strong>
            <div class="ms-diagnostic-queue">
              ${adaptive.queue.slice(0, 6).map(item => `
                <button type="button" data-ms-jump-question="${html(item.questionId)}">
                  <span>${html(domainLabels[item.domain] || item.domain)} · P${item.priority}</span>
                  <b>${html(item.topic)}</b>
                  <small>${html(item.reason)}</small>
                </button>
              `).join("")}
            </div>
          </article>
        </div>
        <div class="ms-competency-matrix">
          ${matrix.map(track => `
            <article>
              <div>
                <span>${html(track.status)}</span>
                <strong>${html(track.label)}</strong>
                <b>${track.score}%</b>
              </div>
              <i><em style="width:${track.score}%"></em></i>
              <p>${html(track.target)}</p>
              <small>${html(track.nextAction)} · ${html(track.evidence)}</small>
            </article>
          `).join("")}
        </div>
        ${renderReviewQueue(adaptive.dueReviews)}
      </section>
    `;
  }

  function renderReviewQueue(reviews) {
    const rows = reviews.slice(0, 5);
    return `
      <div class="ms-review-queue">
        <div>
          <strong>Spaced review queue</strong>
          <p>복습은 “다시 봤다”가 아니라 기억 강도를 판정하고 다음 dueAt을 조절해야 합니다.</p>
        </div>
        <div class="ms-review-list">
          ${rows.length ? rows.map(item => `
            <article>
              <span>${html(item.domain || "review")} · ${html(item.topic || item.skill || "concept")}</span>
              <p>${html(item.prompt || item.explain || "이 개념을 내 말로 설명하세요.")}</p>
              <div>
                <button class="secondary" type="button" data-ms-review-grade="${html(item.id)}" data-grade="again">다시</button>
                <button class="secondary" type="button" data-ms-review-grade="${html(item.id)}" data-grade="hard">어려움</button>
                <button class="primary" type="button" data-ms-review-grade="${html(item.id)}" data-grade="good">기억남</button>
              </div>
            </article>
          `).join("") : `<article><span>review clear</span><p>지금 due review는 없습니다. 오늘 수업을 완료하면 새 복습 카드가 생깁니다.</p></article>`}
        </div>
      </div>
    `;
  }

  function renderAdaptiveSession(session) {
    const done = todaySessionDone();
    const completed = session.filter(item => done[item.id]).reduce((sum, item) => sum + item.minutes, 0);
    const total = session.reduce((sum, item) => sum + item.minutes, 0);
    return `
      <section class="ms-adaptive-session" aria-label="adaptive daily study session">
        <div class="ms-panel-head">
          <div>
            <p class="eyebrow">Adaptive 30-minute Session</p>
            <h3>오늘 자동 배정된 MS/Fellow 학습 루틴</h3>
            <p>진단 오답, due review, 수업 완료 evidence를 조합해 오늘 해야 할 학습 순서를 만듭니다.</p>
          </div>
          <span>${completed}/${total}분</span>
        </div>
        <div class="ms-session-grid">
          ${session.map(item => `
            <article class="${done[item.id] ? "done" : ""}">
              <time>${item.minutes}분</time>
              <div>
                <strong>${html(item.title)}</strong>
                <p>${html(item.action)}</p>
                <small>${html(item.evidence)}</small>
              </div>
              <button class="secondary" type="button" data-ms-session-done="${item.id}">${done[item.id] ? "완료됨" : "완료"}</button>
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }

  function renderMasteryEngine(mastery) {
    const due = dueReviews();
    return `
      <section class="ms-mastery-engine" aria-label="concept mastery engine">
        <div class="ms-panel-head">
          <div>
            <p class="eyebrow">Mastery Engine</p>
            <h3>개념 숙련도와 복습 큐</h3>
            <p>정답률만 보지 않고 시도 횟수, 오답, 복습 대기, 수업 evidence를 합쳐 다음 학습을 정합니다.</p>
          </div>
          <span>${due.length} due</span>
        </div>
        <div class="ms-mastery-grid">
          ${mastery.map(item => `
            <article>
              <div>
                <span>${html(domainLabels[item.domain] || item.domain)} / Stage ${item.stage}</span>
                <strong>${html(item.topic)}</strong>
                <small>${html(item.status)} · ${item.answered}/${item.total} answered · ${item.misses} misses</small>
              </div>
              <i><em style="width:${item.score}%"></em></i>
              <b>${item.score}%</b>
              ${item.prerequisites.length ? `<p>선수개념: ${item.prerequisites.map(html).join(", ")}</p>` : `<p>선수개념: 바로 학습 가능</p>`}
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }

  function teacherLabel(mode) {
    return {
      professor: "교수",
      tutor: "튜터",
      mentor: "멘토",
      interviewer: "면접관",
      coach: "코치"
    }[mode] || mode;
  }

  function renderTeacherVoice(lessonItem, stage) {
    const weak = weakTopics(1)[0]?.topic || "units";
    const voices = {
      professor: `<strong>핵심 원리</strong><p>${html(lessonItem.summary)} 이 개념은 ${html(stage.gate)}라는 stage gate로 검증합니다. 공식을 외우기보다 어떤 물리량이 변하고 무엇이 보존되는지 먼저 봅니다.</p>`,
      tutor: `<strong>아주 쉬운 말</strong><p>지금은 ${html(weak)}에서 빈틈이 보입니다. 어려운 기호가 나오면 먼저 단위, 비율, 그래프 모양으로 바꾸고 그 다음 공식으로 갑니다.</p>`,
      mentor: `<strong>현장 연결</strong><p>${html(lessonItem.bridge)} 이걸 이해하면 장비 증상과 wafer 결과를 따로 보지 않고 하나의 evidence chain으로 묶을 수 있습니다.</p>`,
      interviewer: `<strong>구술 질문</strong><p>${html(lessonItem.title)}을 모르는 신입 CE에게 90초로 설명해보세요. 마지막 문장은 반드시 "그래서 wafer 또는 chamber evidence는..."으로 끝내야 합니다.</p>`,
      coach: `<strong>오늘 행동</strong><p>진단 문제 5개를 풀고, 이 수업을 완료한 뒤 책장에 "내 말 설명" 한 페이지를 저장하세요. 완벽한 정리보다 작은 증거가 중요합니다.</p>`
    };
    return voices[state.teacherMode] || voices.tutor;
  }

  function renderVisualLab(lessonItem) {
    const v = clamp(state.labValue);
    if (["graph", "thermal-budget", "spc"].includes(lessonItem.visual)) {
      const points = Array.from({ length: 8 }, (_, i) => {
        const x = 18 + i * 36;
        const y = 150 - Math.sin((i + v / 18) * 0.8) * 28 - i * (v / 45);
        return `${x},${Math.max(22, Math.min(162, y))}`;
      }).join(" ");
      return `
        <div class="ms-visual-lab">
          <div class="ms-lab-head"><strong>Interactive intuition</strong><span>${v}% intensity</span></div>
          <svg viewBox="0 0 300 190" role="img" aria-label="trend graph visual intuition">
            <line x1="18" y1="166" x2="282" y2="166"></line>
            <line x1="18" y1="18" x2="18" y2="166"></line>
            <polyline points="${points}"></polyline>
            <text x="24" y="28">trend</text>
            <text x="206" y="182">time/process</text>
          </svg>
          <label>parameter <input type="range" min="5" max="95" value="${v}" data-ms-lab-range /></label>
          <p>그래프를 볼 때는 값보다 먼저 축, 단위, baseline, 변화 시점을 확인합니다.</p>
        </div>
      `;
    }
    if (["crystal", "diffusion", "strain"].includes(lessonItem.visual)) {
      const atoms = Array.from({ length: 36 }, (_, i) => {
        const defect = i === Math.round(v / 3) || i === 22;
        return `<span class="${defect ? "defect" : ""}"></span>`;
      }).join("");
      return `
        <div class="ms-visual-lab">
          <div class="ms-lab-head"><strong>Crystal intuition</strong><span>defect visibility ${v}%</span></div>
          <div class="ms-crystal-grid">${atoms}</div>
          <label>defect emphasis <input type="range" min="5" max="95" value="${v}" data-ms-lab-range /></label>
          <p>결정은 완벽한 격자만이 아니라 결함, strain, interface가 함께 성질을 만듭니다.</p>
        </div>
      `;
    }
    if (["epi-flow", "gas", "vacuum", "film-stack"].includes(lessonItem.visual)) {
      return `
        <div class="ms-visual-lab">
          <div class="ms-lab-head"><strong>Gas to film intuition</strong><span>${v}% reaction window</span></div>
          <div class="ms-epi-strip">
            <span>Gas box</span><i></i><span>PM</span><i></i><span>Surface</span><i></i><span>Exhaust</span><i></i><span>Abatement</span>
          </div>
          <div class="ms-layer-stack" style="--layer-height:${Math.round(34 + v * 0.45)}px"><b>Si substrate</b><b>EPI layer</b><b>Dopant / strain effect</b></div>
          <label>growth window <input type="range" min="5" max="95" value="${v}" data-ms-lab-range /></label>
          <p>실제 recipe 수치가 아니라 source to abatement와 wafer surface 변화를 연결하는 mental model입니다.</p>
        </div>
      `;
    }
    if (["paper", "writing", "doe"].includes(lessonItem.visual)) {
      return `
        <div class="ms-visual-lab">
          <div class="ms-lab-head"><strong>Research reading map</strong><span>claim to evidence</span></div>
          <div class="ms-paper-map">
            <span>Question</span><span>Method</span><span>Figure</span><span>Claim</span><span>Limitation</span>
          </div>
          <p>논문은 처음부터 끝까지 읽는 것이 아니라 claim, evidence, limitation을 잡는 방식으로 읽습니다.</p>
        </div>
      `;
    }
    return `
      <div class="ms-visual-lab">
        <div class="ms-lab-head"><strong>Concept bridge</strong><span>${v}%</span></div>
        <div class="ms-epi-strip"><span>Concept</span><i></i><span>Equation</span><i></i><span>Graph</span><i></i><span>Wafer</span><i></i><span>Report</span></div>
        <label>connection strength <input type="range" min="5" max="95" value="${v}" data-ms-lab-range /></label>
        <p>모든 개념은 공식, 그래프, wafer 변화, 현장 보고 문장으로 번역되어야 합니다.</p>
      </div>
    `;
  }

  function bind(root) {
    root.querySelectorAll("[data-ms-answer]").forEach(button => {
      button.addEventListener("click", () => {
        const q = questions.find(item => item.id === button.dataset.msAnswer);
        if (!q) return;
        const choice = Number(button.dataset.choice);
        const answeredAt = new Date().toISOString();
        state.answers[q.id] = { choice, correct: choice === q.correct, answeredAt, domain: q.domain, topic: q.topic };
        state.attempts = [
          {
            id: `attempt-${q.id}-${Date.now()}`,
            questionId: q.id,
            conceptId: conceptId(q.domain, q.topic),
            domain: q.domain,
            topic: q.topic,
            choice,
            correct: choice === q.correct,
            answeredAt
          },
          ...(state.attempts || [])
        ].slice(0, 600);
        state.activeQuestion = q.id;
        if (choice !== q.correct) {
          state.reviews = [
            { id: `review-${q.id}-${Date.now()}`, domain: q.domain, topic: q.topic, prompt: q.prompt, explain: q.explain, dueAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), source: "diagnostic-miss" },
            ...state.reviews
          ].slice(0, 60);
        }
        persist();
        render();
      });
    });
    root.querySelector("[data-ms-next-question]")?.addEventListener("click", () => {
      const unanswered = questions.find(q => !answerFor(q.id));
      const currentIndex = questions.findIndex(q => q.id === nextQuestion().id);
      state.activeQuestion = unanswered?.id || questions[(currentIndex + 1) % questions.length].id;
      persist();
      render();
    });
    root.querySelectorAll("[data-ms-jump-question]").forEach(button => {
      button.addEventListener("click", () => {
        if (!button.dataset.msJumpQuestion) return;
        state.activeQuestion = button.dataset.msJumpQuestion;
        persist();
        render();
        document.querySelector(".ms-diagnostic-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
    root.querySelectorAll("[data-ms-concept-question]").forEach(button => {
      button.addEventListener("click", () => {
        const node = masteryMap().find(item => item.id === button.dataset.msConceptQuestion);
        const question = node ? answersForConcept(node).find(item => !answerFor(item.id) || !isCorrect(item)) || answersForConcept(node)[0] : null;
        if (!question) return;
        state.activeQuestion = question.id;
        persist();
        render();
        document.querySelector(".ms-diagnostic-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
    root.querySelectorAll("[data-ms-review-grade]").forEach(button => {
      button.addEventListener("click", () => {
        const reviewId = button.dataset.msReviewGrade;
        const grade = button.dataset.grade;
        const review = (state.reviews || []).find(item => item.id === reviewId);
        if (!review) return;
        const minutes = grade === "good" ? 4 * 24 * 60 : grade === "hard" ? 24 * 60 : 25;
        const updated = {
          ...review,
          lastReviewedAt: new Date().toISOString(),
          lastGrade: grade,
          dueAt: new Date(Date.now() + minutes * 60 * 1000).toISOString(),
          reviewCount: Number(review.reviewCount || 0) + 1
        };
        state.reviews = [updated, ...(state.reviews || []).filter(item => item.id !== reviewId)].slice(0, 80);
        state.journal = [
          { at: new Date().toISOString(), type: "review-grade", topic: review.topic || review.skill, grade, nextDueAt: updated.dueAt },
          ...(state.journal || [])
        ].slice(0, 80);
        persist();
        render();
      });
    });
    root.querySelector("[data-ms-auto]")?.addEventListener("click", () => {
      const stage = currentStage();
      state.activeStage = stage.id;
      state.activeLesson = (stage.lessons.find(item => !lessonDone(item.id)) || stage.lessons[0]).id;
      persist();
      render();
      document.querySelector(".ms-teacher-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    root.querySelectorAll("[data-ms-session-done]").forEach(button => {
      button.addEventListener("click", () => {
        const date = new Date().toISOString().slice(0, 10);
        const existing = (state.sessionLog || []).find(item => item.date === date) || { date, segments: {}, createdAt: new Date().toISOString() };
        existing.segments[button.dataset.msSessionDone] = new Date().toISOString();
        existing.updatedAt = new Date().toISOString();
        state.sessionLog = [existing, ...(state.sessionLog || []).filter(item => item.date !== date)].slice(0, 120);
        persist();
        render();
      });
    });
    root.querySelectorAll("[data-ms-stage]").forEach(button => {
      button.addEventListener("click", () => {
        const stage = stages.find(item => item.id === button.dataset.msStage);
        const index = stages.findIndex(item => item.id === button.dataset.msStage);
        if (!stage || !isStageUnlocked(index)) return;
        state.activeStage = stage.id;
        state.activeLesson = stage.lessons[0].id;
        persist();
        render();
      });
    });
    root.querySelectorAll("[data-ms-lesson]").forEach(button => {
      button.addEventListener("click", () => {
        state.activeLesson = button.dataset.msLesson;
        persist();
        render();
      });
    });
    root.querySelectorAll("[data-ms-teacher]").forEach(button => {
      button.addEventListener("click", () => {
        state.teacherMode = button.dataset.msTeacher;
        persist();
        render();
      });
    });
    root.querySelector("[data-ms-complete-lesson]")?.addEventListener("click", event => {
      const lessonId = event.currentTarget.dataset.msCompleteLesson;
      const lessonItem = stages.flatMap(stage => stage.lessons).find(item => item.id === lessonId);
      if (!lessonItem) return;
      state.lessonMastery[lessonId] = {
        doneAt: new Date().toISOString(),
        title: lessonItem.title,
        domain: lessonItem.domain,
        evidence: "learner marked concept explanation, visual intuition, and field bridge as complete",
        nextReviewAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString()
      };
      state.reviews = [
        {
          id: `review-${lessonId}-${Date.now()}`,
          domain: lessonItem.domain,
          topic: lessonItem.title,
          prompt: `${lessonItem.title}을 EPI 장비/wafer evidence와 연결해 5문장으로 설명하세요.`,
          explain: lessonItem.bridge,
          dueAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
          source: "lesson-complete"
        },
        ...state.reviews
      ].slice(0, 80);
      state.masteryCheckpoints = [
        {
          at: new Date().toISOString(),
          lessonId,
          readiness: readiness(),
          weakestConcepts: weakestConcepts(5).map(item => ({ id: item.id, topic: item.topic, score: item.score }))
        },
        ...(state.masteryCheckpoints || [])
      ].slice(0, 60);
      state.journal = [
        { at: new Date().toISOString(), type: "lesson-complete", lessonId, title: lessonItem.title, stage: activeStage().title },
        ...state.journal
      ].slice(0, 80);
      persist();
      render();
    });
    root.querySelector("[data-ms-explain-again]")?.addEventListener("click", () => {
      const order = ["tutor", "professor", "mentor", "interviewer", "coach"];
      const next = order[(order.indexOf(state.teacherMode) + 1) % order.length] || "tutor";
      state.teacherMode = next;
      persist();
      render();
    });
    root.querySelector("[data-ms-lab-range]")?.addEventListener("input", event => {
      state.labValue = Number(event.target.value);
      persist();
      render();
    });
    root.querySelector("[data-ms-copy-packet]")?.addEventListener("click", async () => {
      const text = JSON.stringify(buildPacket(), null, 2);
      try {
        await navigator.clipboard.writeText(text);
        const target = root.querySelector("#ms-copy-status");
        if (target) target.textContent = "AI packet copied.";
      } catch {
        const target = root.querySelector("#ms-copy-status");
        if (target) target.textContent = "복사 권한이 없어 packet textarea에서 직접 선택하세요.";
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    registerBookshelfBook();
    render();
  });

  window.ProjectUniverseMaterialsMs = {
    render,
    getState: () => ({ ...state }),
    buildPacket,
    adaptiveEngineSummary,
    competencyMatrix,
    graduateGateReport,
    diagnosticQueue,
    questions,
    stages,
    sources
  };
})();
