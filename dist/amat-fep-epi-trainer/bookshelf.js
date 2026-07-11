(() => {
  const BOOKSHELF_PAGE_KEY = "projectUniverseBookshelfPages";
  const ACTIVE_BOOK_KEY = "projectUniverseActiveBook";
  const CLIENT_PASS_KEY = "ceTrainerPass";
  const REMOTE_TOKEN_KEY = "epiThinkTankRemoteToken";
  const LOCAL_TOKEN_KEY = "epiThinkTankLocalToken";
  const BOOKSHELF_SCHEMA_VERSION = "life-bookshelf-page-v3";
  const BOOKSHELF_EXPORT_VERSION = "life-bookshelf-export-v3";
  const BOOKSHELF_D1_LIMIT_GB = 10;
  const LIFE_PACKET_SCHEMA_VERSION = "my-life-intelligence-packet-v1";
  const LOCAL_VAULT_API = "http://127.0.0.1:4180";
  const EPI_VAULT_CONFIG = window.EPI_VAULT_CONFIG || {};

  const BOOK_VIEW_LABELS = {
    cognitive: "인지능력향상 프로젝트",
    dashboard: "EPI 홈",
    curriculum: "성장 커리큘럼",
    roadmap: "학습 로드맵",
    systems: "장비와 공정",
    "process-visual": "공정 시각화",
    equipment: "장비군",
    cluster: "구성 시뮬레이터",
    install: "설치 절차",
    facility: "시설 연결",
    electrical: "전기와 DVM",
    gases: "가스 안전",
    safety: "라인 준수",
    mastery: "마스터리",
    readiness: "현장 투입",
    runbook: "런북",
    thinktank: "경험 금고",
    deep: "심화 학습",
    fab101: "팹 기초",
    papers: "논문 노트",
    "english-test": "영어 CBT",
    english: "영어 용어",
    glossary: "용어집",
    diagnostics: "진단 훈련",
    quiz: "퀴즈"
  };

  const FEP_EPI_BOOK_MODULES = [
    {
      group: "처음 펼칠 장",
      items: [
        ["dashboard", "방향 잡기", "역할, 오늘의 루틴, 전체 학습 흐름"],
        ["curriculum", "성장 커리큘럼", "초보자에서 시니어 CE 사고력까지 순서형 훈련"],
        ["roadmap", "4주 로드맵", "입사 전 순서형 학습 계획"],
        ["fab101", "팹 기초", "팹 현장 용어와 장비 구조 기초"],
        ["glossary", "용어집", "FEP/EPI/CE 용어 사전"]
      ]
    },
    {
      group: "장비 마스터리",
      items: [
        ["systems", "장비와 공정", "RTP/EPI 공정과 서브시스템"],
        ["process-visual", "공정 시각화", "가스, pump, purge, exhaust, layer 성장 애니메이션"],
        ["equipment", "어플라이드 장비군", "Centura/Vantage/EPI/RTP 공개 장비군"],
        ["cluster", "구성 시뮬레이터", "LL/TM/PM/CM 연결 구조 시뮬레이션"],
        ["deep", "심화 학습", "공개 논문/웹 기반 심화 학습"]
      ]
    },
    {
      group: "설치와 현장 수행",
      items: [
        ["install", "설치 흐름", "move-in, hook-up, power-on, qualification"],
        ["facility", "시설 연결", "전기, CDA, PCW, exhaust, abatement 연결"],
        ["gases", "가스 안전", "EPI/FEP 가스 위험성, purge, qualification"],
        ["safety", "라인 준수", "평택/삼성 라인 투입 전 준수 사고방식"]
      ]
    },
    {
      group: "진단과 성장",
      items: [
        ["electrical", "전기와 DVM", "릴레이, DVM, interlock, 전기 기초"],
        ["diagnostics", "진단 훈련", "현장 트러블슈팅 판단 훈련"],
        ["mastery", "사고 루프", "시니어 CE급 사고 루프"],
        ["readiness", "현장 투입 점검", "현장 투입 가능성 자가 평가"],
        ["runbook", "선임 런북", "현장 보고, RACI, punch list, 인수인계"],
        ["thinktank", "경험 금고", "인스톨/트러블 경험 축적"]
      ]
    },
    {
      group: "면접과 영어",
      items: [
        ["english-test", "영어 CBT", "Applied 공개 형식 기반 영어 CBT 훈련"],
        ["english", "영어 용어", "생소한 영어 단어와 현장 표현"],
        ["papers", "논문 노트", "논문/공개자료 학습 노트"],
        ["quiz", "퀴즈", "면접/현장 질문 회상 훈련"]
      ]
    }
  ];

  const BOOK_BLUEPRINTS = {
    "cognitive-resilience": [
      ["오늘 훈련 로그", "주의전환, 회상, 실행기능, 생활 루틴을 1일 1세션으로 기록"],
      ["기억 변화 메모", "일상에서 느낀 기억/집중 변화와 수면, 스트레스, 약물, 청각 상태를 함께 기록"],
      ["운동 루틴", "걷기, 근력, 균형 운동 실행 여부와 무리 신호를 안전하게 추적"],
      ["사회적 연결", "대화, 만남, 전화, 공동 활동처럼 인지 자극이 있는 연결 계획"],
      ["진료 질문", "인지 저하가 걱정될 때 의료진에게 물어볼 질문과 관찰 근거"],
      ["AI 공개 요약", "원문 개인정보 없이 주간 패턴과 다음 행동만 AI에게 보여줄 수 있게 정리"]
    ],
    "family-health": [
      ["증상 타임라인", "증상, 날짜, 지속시간, 악화/완화 요인을 기록하는 내부 페이지"],
      ["건강검진 기록", "건강검진 결과 업로드 요약, 이상 수치 변화, 추적검사 일정"],
      ["병원 후보 목록", "유명 병원, 전문센터, 진료과, 예약 메모를 비교하는 목록"],
      ["진료 전 질문", "진료 전 질문, 검사 전 확인사항, 보호자 전달 메모"],
      ["복약과 생활 루틴", "복약 여부, 수면, 식사, 운동, 생활 변화 추적"],
      ["가족 공유 요약", "AI나 가족에게 보여줄 수 있는 비식별 요약 패킷"]
    ],
    "assets-finance": [
      ["자산 스냅샷", "자산군별 비중과 현금흐름을 원문 없이 요약"],
      ["리스크 장부", "집중도, 변동성, 만기, 고정비 리스크 추적"],
      ["의사결정 기록", "투자/지출 의사결정의 근거와 사후 평가"],
      ["세금과 행정 질문", "세무사/은행/보험사에 물어볼 질문 목록"]
    ],
    "investment-dyor": [
      ["고신호 브리핑", "공식 공시, 온체인 지표, 실적, ETF 흐름, 보안 이슈처럼 가격에 의미 있는 정보만 선별"],
      ["온체인 고래 감시", "거래소 유입/유출, 스테이블코인 민팅, 브릿지 이동, 대형 포지션을 고신호 룰로 판정"],
      ["크립토 프로토콜 분석", "토큰 유틸리티, 수익, TVL, 수수료, 토큰 언락, 거버넌스, 보안 리스크를 분리"],
      ["미국 주식/ETF 분석", "SEC 공시, 실적, 가이던스, 밸류에이션, 섹터 흐름, ETF 구성 변화를 점검"],
      ["한국 주식 분석", "DART 공시, 실적, 수주, 지분 변화, 자본 조달, 리스크 공시를 구조화"],
      ["투자 가설 장부", "왜 관심을 가졌는지, 무엇이 틀리면 폐기할지, 어떤 가격/사건을 기다릴지 기록"],
      ["관찰 목록", "지금 당장 매수 후보가 아니라 추적할 만한 자산과 확인해야 할 근거를 저장"]
    ],
    "business-foundry": [
      ["아이디어 씨앗", "아이디어 원석을 문제, 고객, 가설로 분리"],
      ["작은 실험", "가장 작은 검증 실험과 성공/실패 기준"],
      ["시장 관찰", "시장, 경쟁사, 고객 인터뷰 기록"],
      ["피치 초안", "설명, 가치제안, 수익모델 초안"]
    ],
    "learning-library": [
      ["오답 노트", "영어/전기/반도체 오답과 약점 패턴"],
      ["개념 카드", "개념을 내 말로 다시 설명하는 카드"],
      ["논문 요약", "논문 핵심, 장비 연결점, 현장 적용 질문"],
      ["복습 큐", "복습 주기와 회상 훈련 큐"]
    ],
    "life-os": [
      ["선택의 장부", "중요 선택의 이유, 감정, 결과 기록"],
      ["주간 회고", "이번 주 에너지, 우선순위, 다음 행동"],
      ["목표 지도", "3개월/1년 목표와 중간 지표"],
      ["습관 점검", "반복 습관, 방해 요인, 개선 실험"]
    ],
    "people-network": [
      ["후속 연락", "약속, 안부, 다시 연락할 날짜"],
      ["가족 일정", "가족 일정과 챙길 일"],
      ["도움 계획", "도움이 필요한 사람과 구체적 행동"],
      ["관계의 선", "관계에서 지켜야 할 선과 배려"]
    ],
    "admin-vault": [
      ["문서 위치 색인", "원문이 아니라 위치, 만료일, 담당기관만 기록"],
      ["갱신 체크리스트", "갱신/납부/예약 일정"],
      ["집과 생활 관리", "집, 차량, 구독, 생활 관리 기록"],
      ["문의 목록", "기관에 문의할 질문과 답변 요약"]
    ],
    "ai-briefing-desk": [
      ["반출 규칙", "AI에게 보여줄 수 있는 범위와 금지 범위"],
      ["월간 종합", "책장 전체 요약과 다음 달 제안"],
      ["책 사이 통찰", "건강/일/자산/사업 사이의 충돌과 우선순위"],
      ["프롬프트 초안", "AI 분석에 넣을 안전한 프롬프트"]
    ]
  };

  const PRIVACY_LABELS = {
    "work-learning": "직무 학습",
    "private-summary": "개인 요약",
    "sensitive-summary": "민감 요약",
    "sensitive-index": "민감 색인",
    "sensitive-index only": "민감 색인",
    "controlled-export": "AI 반출 관리"
  };

  const DYOR_SOURCE_STACK = [
    {
      market: "크립토",
      source: "CoinGecko Public API",
      url: "https://docs.coingecko.com/docs/keyless-public-api",
      use: "가격, 시가총액, 24시간 변화율, 코인 ID 확인",
      trust: "시장 데이터 컨텍스트. 투자 근거 자체가 아니라 변동성과 규모 확인용"
    },
    {
      market: "크립토",
      source: "DefiLlama",
      url: "https://api-docs.defillama.com/",
      use: "TVL, fees, revenue, stablecoin supply, bridge/DEX activity",
      trust: "프로토콜의 실제 사용량과 경제 활동을 확인하는 1차 대시보드"
    },
    {
      market: "미국 주식/ETF",
      source: "SEC EDGAR APIs",
      url: "https://www.sec.gov/search-filings/edgar-application-programming-interfaces",
      use: "10-K, 10-Q, 8-K, S-1, ETF/펀드 공시, XBRL 재무 데이터",
      trust: "미국 상장사와 ETF 리서치의 공식 공시 원천"
    },
    {
      market: "한국 주식",
      source: "OpenDART",
      url: "https://opendart.fss.or.kr/intro/main.do",
      use: "사업보고서, 주요사항보고서, 지분공시, 증권신고서, 재무정보",
      trust: "한국 상장사 리서치의 공식 공시 원천. API key 필요"
    }
  ];

  const DYOR_ASSET_LANES = [
    ["크립토", "가격보다 먼저 token unlock, revenue, TVL, stablecoin liquidity, exploit, governance, treasury를 확인"],
    ["미국 주식", "SEC 공시, 실적, 현금흐름, 가이던스, 밸류에이션, 경쟁 우위 변화 확인"],
    ["ETF", "기초지수, 보유 종목, expense ratio, tracking error, AUM/유동성, 섹터/국가 집중도 확인"],
    ["한국 주식", "DART 공시, 수주/증자/CB/BW/자사주/지분 변화, 실적 추정 변화 확인"],
    ["매크로", "금리, 달러, 유동성, 신용 스프레드, ETF 자금 흐름이 자산군 전체에 주는 압력 확인"]
  ];

  const DYOR_SIGNAL_RULES = [
    ["고신호", "공식 공시, 실적 숫자, 온체인 사용량, 프로토콜 수익, 대형 보안 사고, ETF 자금 흐름, 공급량 변화"],
    ["중신호", "창업자/재단 발표, 거버넌스 제안, 파트너십 세부 조건, 거래소 상장, 제품 출시 지표"],
    ["저신호", "가격만 오른 차트, 익명 계정 루머, 단순 인플루언서 언급, 근거 없는 목표가, 맥락 없는 뉴스"],
    ["폐기 조건", "근거가 공식 출처로 확인되지 않거나, 핵심 지표가 반대로 움직이거나, 리스크가 보상보다 커질 때"]
  ];

  const DYOR_COIN_IDS = ["bitcoin", "ethereum", "solana", "chainlink", "aave", "uniswap"];

  const ONCHAIN_INTEL_SOURCES = [
    ["Whale Alert", "실시간 대형 온체인 트랜잭션 알림", "API key 필요", "https://developer.whale-alert.io/api-account/documentation"],
    ["Etherscan", "주소별 native/ERC-20/ERC-721/ERC-1155 전송, top holders, 포트폴리오", "API key 필요", "https://docs.etherscan.io/introduction"],
    ["DefiLlama", "체인 TVL, stablecoin supply, fees/revenue, DEX volume", "무료 API 가능", "https://api-docs.defillama.com/"],
    ["Glassnode", "거래소 순유입, 축적 주소, 장기보유자, SOPR 등 고급 지표", "Professional API 필요", "https://docs.glassnode.com/basic-api/api"],
    ["CoinGlass", "Hyperliquid whale position alert, derivatives heatmap", "API key 필요", "https://docs.coinglass.com/reference/hyperliquid-whale-alert"]
  ];

  const ONCHAIN_WHALE_RULES = [
    ["거래소 유입", "고래 지갑 → 거래소 대량 입금은 잠재 매도 압력으로 분류. 단, OTC/내부 이동 가능성 확인"],
    ["거래소 유출", "거래소 → 콜드월렛/수탁 지갑 대량 출금은 축적 가능성으로 분류. 주소 라벨 확인 필수"],
    ["스테이블코인 민팅/소각", "USDT/USDC 공급 변화와 체인별 이동은 유동성 온도계로 사용"],
    ["브릿지 대량 이동", "체인 간 자금 이동은 특정 생태계 유동성 변화로 추적"],
    ["프로토콜 수익/TVL 괴리", "TVL만 증가하고 fees/revenue가 따라오지 않으면 저품질 성장 가능성"],
    ["파생 고래 포지션", "Hyperliquid 등 대형 레버리지 포지션은 단기 청산 리스크 신호로만 사용"]
  ];

  const ONCHAIN_SIGNAL_THRESHOLDS = [
    ["BTC/ETH 단일 전송", "$10M 이상이면 관찰, $50M 이상이면 고신호 후보"],
    ["알트코인 전송", "시가총액의 0.05% 이상 또는 $5M 이상이면 고래 후보"],
    ["스테이블코인 이동", "$50M 이상 거래소 유입/유출은 유동성 신호 후보"],
    ["TVL 변화", "7일 ±10% 이상 변화는 원인 확인"],
    ["수익 변화", "fees/revenue 7일 ±20% 이상 변화는 사용량 변화 후보"]
  ];

  const TOKENIZATION_MARKET_SOURCES = [
    ["RWA.xyz", "토큰화 국채, 사모신용, 상품, 펀드, 스테이블코인 등 RWA 전문 데이터", "API key 필요", "https://docs.rwa.xyz/"],
    ["DefiLlama Stablecoins", "체인별 스테이블코인 공급량과 변화율", "무료 API 가능", "https://stablecoins.llama.fi/stablecoins?includePrices=true"],
    ["CoinGecko", "RWA 테마 토큰과 토큰화 금 가격/시총 컨텍스트", "무료 public API 가능", "https://docs.coingecko.com/docs/keyless-public-api"],
    ["Ethereum", "이더리움 위 ERC-20 자산 공급량, 보유자, 전송 추적", "Etherscan API key 필요", "https://docs.etherscan.io/introduction"]
  ];

  const TOKENIZATION_CATEGORIES = [
    ["스테이블코인", "달러 예금/현금성 자산의 온체인 표현. 이더리움 공급량 변화는 RWA 유동성의 핵심 온도계"],
    ["토큰화 국채", "단기 미국채/머니마켓 수익률을 온체인으로 가져오는 영역. 금리 변화와 발행사 신뢰가 중요"],
    ["토큰화 금", "PAXG/XAUT처럼 금 가격을 추종하는 토큰. 보관, 상환, 감사 구조 확인"],
    ["사모신용/대출", "온체인 신용 상품. 수익률보다 연체, 담보, 회수 구조가 핵심"],
    ["펀드/주식형", "규제·수탁·이전 제한이 강한 영역. 실제 유동성과 2차시장 가능성 확인"]
  ];

  const TOKENIZATION_SIGNAL_RULES = [
    ["유동성 증가", "이더리움 스테이블 공급량과 RWA TVL이 함께 증가하면 온체인 자산 수요 증가 후보"],
    ["금리 민감도", "토큰화 국채는 단기금리와 운용사 신뢰가 핵심. 단순 TVL 증가만으로 판단하지 않음"],
    ["체인 이동", "Ethereum에서 Base/Solana/Arbitrum 등으로 공급량이 이동하면 사용처와 수수료 구조 확인"],
    ["상환 리스크", "토큰화 자산은 발행사, 수탁기관, 감사, 상환 조건이 핵심 리스크"],
    ["가격 괴리", "토큰 가격이 기초자산과 괴리되면 유동성 부족 또는 상환 신뢰 문제 후보"]
  ];

  const TOKENIZATION_COIN_IDS = ["ondo-finance", "centrifuge", "maple", "pax-gold", "tether-gold", "ethena", "maker"];

  const LIFE_ACTION_RECIPES = {
    "cognitive-resilience": "오늘 10분 인지 루틴을 1세션 수행하고, 약한 영역 1개를 기록하세요.",
    "career-fep-epi": "FEP/EPI 책에서 한 챕터를 열고 evidence-stop-report 문장 1개를 저장하세요.",
    "life-os": "오늘 에너지와 다음 24시간의 가장 작은 행동 1개를 기록하세요.",
    "family-health": "증상, 질문, 다음 예약/상담 행동을 원문 없이 요약하세요.",
    "assets-finance": "자산 비중보다 리스크와 다음 확인일을 먼저 기록하세요.",
    "investment-dyor": "관심 자산 하나를 fact-source-signal-risk-thesis-counter로 분리하세요.",
    "business-foundry": "아이디어 하나를 고객 문제와 1주 실험으로 바꾸세요.",
    "learning-library": "오늘 틀린 문제나 모르는 개념 1개를 내 말로 다시 설명하세요.",
    "people-network": "미뤄둔 후속 연락이나 감사 표현 1개를 정하세요.",
    "admin-vault": "만료일, 갱신일, 문의처 중 하나를 색인으로 남기세요.",
    "ai-briefing-desk": "AI에게 공개 가능한 요약과 제외할 민감정보를 분리하세요."
  };

  const FEP_EPI_MASTERY_PATH = [
    ["Fab 큰 그림", "FOUP에서 wafer가 출발해 EFEM, Load Lock, TM, PM을 거쳐 metrology/handover까지 이어지는 흐름을 먼저 그립니다.", "fab101"],
    ["장비 구조", "Centura/Vantage 계열의 platform, transfer module, process module, gas box, pump/exhaust/abatement가 왜 필요한지 연결합니다.", "cluster"],
    ["공정 변화", "EPI film growth, RTP thermal treatment, purge/pumpdown/exhaust가 wafer 위 변화와 어떻게 연결되는지 공정 극장에서 확인합니다.", "process-visual"],
    ["설치 증거", "move-in, leveling, facility hook-up, power-on, dry run, qualification에서 CE가 남겨야 할 evidence를 런북으로 관리합니다.", "install"],
    ["현장 판단", "증상에서 위험도, subsystem, 확인 evidence, stop condition, 고객 보고까지 한 번에 사고합니다.", "diagnostics"],
    ["개인 지식화", "실제 경험은 symptom-evidence-action-result-prevention-customer report 구조로 Think Tank에 축적합니다.", "thinktank"]
  ];

  const isLocalBrowserHost = ["127.0.0.1", "localhost", "::1"].includes(location.hostname);
  const isCloudflareWorkerHost = location.hostname.endsWith(".workers.dev");
  const isPersonalServerProxy = location.pathname.startsWith("/personal-server");
  const isLocalWorkerPreview = isLocalBrowserHost && Boolean(location.port) && location.port !== "4180";
  const REMOTE_VAULT_API = "https://projectuniverse.chang2058.workers.dev";
  const BOOKSHELF_API =
    EPI_VAULT_CONFIG.apiUrl ||
    (isPersonalServerProxy ? `${location.origin}/personal-server` : "") ||
    (isCloudflareWorkerHost || isLocalWorkerPreview ? location.origin : "") ||
    (location.port === "4180" ? location.origin : REMOTE_VAULT_API);

  const BOOKSHELF_BOOKS = [
    {
      id: "cognitive-resilience",
      code: "인지",
      shelf: "건강",
      title: "인지능력향상 프로젝트",
      subtitle: "웹에 들어와 짧게 수행하는 치매 위험 감소형 다영역 훈련 루틴",
      privacyLevel: "sensitive-summary",
      purpose: "치매 예방을 보장하지 않고, 2026년 현재 공개 근거에서 반복되는 운동, 인지훈련, 사회적 연결, 수면, 청각, 혈관위험 관리 루틴을 매일 실행하고 기록한다.",
      allowed: ["훈련 완료 여부", "정답률/반응 경향", "수면/운동/사회 활동 요약", "의료진에게 물어볼 질문", "비식별 주간 패턴"],
      neverStore: ["진단서 원본", "주민등록번호", "환자번호", "의료 영상 원본", "처방전 사진", "타인의 민감 정보"],
      pageTypes: ["오늘 훈련 로그", "기억 변화 메모", "운동 루틴", "사회적 연결", "진료 질문", "AI 공개 요약"],
      aiUse: ["훈련 지속성 분석", "수면/운동/사회 활동과 인지 점수의 패턴 요약", "의료진 상담 전 질문 정리", "다음 7일 루틴 제안"],
      starterQuestions: ["오늘 집중이 흐려진 순간은 언제였나?", "잠, 운동, 대화 중 무엇이 부족했나?", "의료진에게 확인할 만한 변화가 있었나?"],
      reviewCadence: "매일 10-12분, 주 1회 패턴 점검",
      linkedViews: ["cognitive", "bookshelf", "thinktank"]
    },
    {
      id: "career-fep-epi",
      code: "직무",
      shelf: "커리어",
      title: "FEP/EPI 현장 엔지니어",
      subtitle: "어플라이드 CE 직무, EPI/RTP, 설치, 진단, 영어 시험을 한 권의 전문서로 관리",
      privacyLevel: "work-learning",
      purpose: "현장 투입 전후의 학습, 설치 경험, 장비 구조, 고객 커뮤니케이션, qualification 증거를 축적한다.",
      allowed: ["공개 자료 기반 학습노트", "현장 경험의 비식별 요약", "증상-근거-조치-예방 구조", "면접/영어/직무 성장 기록"],
      neverStore: ["고객사 비공개 도면", "장비 serial 전체", "내부 절차서 원문", "계정/출입/보안 정보", "NDA 문서"],
      pageTypes: ["설치 노트", "트러블슈팅 사례", "논문 요약", "영어 훈련", "선임 질문", "하루 회고"],
      aiUse: ["내가 어떤 장비 영역이 약한지 분석", "다음 학습 순서 추천", "반복되는 트러블 패턴 요약"],
      starterQuestions: ["오늘 배운 장비 구조를 한 문장으로 말하면?", "현장에서 다시 보면 위험한 가정은 무엇인가?", "다음번에는 어떤 증거를 먼저 확보해야 하는가?"],
      reviewCadence: "매일 15분, 주 1회 큰 흐름 재정리",
      linkedViews: ["curriculum", "dashboard", "roadmap", "systems", "process-visual", "equipment", "cluster", "install", "facility", "electrical", "gases", "safety", "mastery", "readiness", "runbook", "thinktank", "deep", "fab101", "papers", "english-test", "english", "glossary", "diagnostics", "quiz"]
    },
    {
      id: "life-os",
      code: "삶",
      shelf: "인생",
      title: "인생 운영 기록",
      subtitle: "가치관, 목표, 습관, 의사결정을 관리하는 삶의 장부",
      privacyLevel: "private-summary",
      purpose: "내가 왜 그 선택을 했는지, 무엇을 반복하고 싶은지, 어떤 삶의 방향으로 움직이는지 기록한다.",
      allowed: ["가치관 요약", "목표와 우선순위", "의사결정 이유", "회고", "반복 습관 점검"],
      neverStore: ["주민등록번호", "계정 비밀번호", "개인 인증정보", "타인의 민감한 사생활 원문"],
      pageTypes: ["결정 메모", "주간 회고", "목표 지도", "습관 점검", "위험 메모", "AI 요약"],
      aiUse: ["내 선택 패턴 분석", "월간 목표 조정", "과부하 신호와 회복 루틴 제안"],
      starterQuestions: ["이 결정을 하게 된 핵심 이유는?", "3개월 뒤의 내가 확인해야 할 가정은?", "지금 줄여야 할 일은 무엇인가?"],
      reviewCadence: "주간 30분, 월간 1회 방향 점검",
      linkedViews: ["bookshelf", "thinktank"]
    },
    {
      id: "family-health",
      code: "건강",
      shelf: "돌봄",
      title: "가족 건강 수첩",
      subtitle: "진단이 아니라 진료 준비와 생활 관리 요약을 차분히 정리",
      privacyLevel: "sensitive-summary",
      purpose: "병원 상담을 더 잘 준비하고 가족 돌봄 기록을 놓치지 않기 위한 요약 책이다. 의료 판단은 반드시 의료진에게 확인한다.",
      allowed: ["증상 변화 요약", "병원 방문 전 질문", "생활 루틴", "복약 여부의 비식별 체크", "검사 결과의 큰 흐름 요약"],
      neverStore: ["진단서 원본", "처방전 사진", "주민등록번호", "보험증권/환자번호 전체", "의료 영상 원본", "정확한 주소와 연락처 묶음"],
      pageTypes: ["돌봄 요약", "진료 질문", "증상 타임라인", "생활 기록", "복약 체크", "예약 메모"],
      aiUse: ["진료 전 질문 정리", "증상 타임라인 요약", "생활 루틴 점검"],
      starterQuestions: ["언제부터 무엇이 달라졌는가?", "의사에게 꼭 물어볼 질문은?", "위험 신호가 있으면 누구에게 바로 연락해야 하는가?"],
      reviewCadence: "필요 시, 병원 방문 전후",
      linkedViews: ["bookshelf"]
    },
    {
      id: "assets-finance",
      code: "자산",
      shelf: "자산",
      title: "자산 관리실",
      subtitle: "자산 전체 그림, 현금흐름, 리스크, 공부 메모를 관리",
      privacyLevel: "sensitive-summary",
      purpose: "투자 조언을 대체하지 않고, 내가 가진 자산의 구조와 리스크를 이해하기 위한 요약 책이다.",
      allowed: ["자산군별 비율", "월별 현금흐름 요약", "투자 아이디어", "리스크 메모", "세금/계약 질문 목록"],
      neverStore: ["계좌번호 전체", "카드번호", "인증서/OTP/API key", "거래소 비밀번호", "주민등록번호", "대출계약서 원문"],
      pageTypes: ["자산 스냅샷", "현금흐름 메모", "리스크 검토", "투자 가설", "세금 질문", "결정 메모"],
      aiUse: ["집중 리스크 확인", "현금흐름 개선 아이디어", "투자 가정 검토 질문 생성"],
      starterQuestions: ["이 자산은 어떤 위험에 노출되어 있는가?", "현금흐름을 악화시키는 반복 지출은?", "투자 가정이 틀리면 무엇이 먼저 보일까?"],
      reviewCadence: "월간 1회, 큰 의사결정 전",
      linkedViews: ["bookshelf"]
    },
    {
      id: "investment-dyor",
      code: "투자",
      shelf: "자산",
      title: "투자 DYOR 인텔리전스",
      subtitle: "크립토, 미국 주식/ETF, 한국 주식의 진짜 신호만 걸러 보는 리서치 책",
      privacyLevel: "private-summary",
      purpose: "매수·매도 지시가 아니라, 투자 판단 전에 확인해야 할 공식 근거, 핵심 촉매, 리스크, 폐기 조건을 한곳에 모은다.",
      allowed: ["공식 공시와 공개 데이터 요약", "크립토 온체인/토큰 지표", "실적과 ETF 구성 변화", "투자 가설과 반증 조건", "관찰 목록과 리스크 메모"],
      neverStore: ["거래소 API key", "시드구문/개인키", "계좌번호 전체", "미공개 내부정보", "유료 리포트 원문 대량 복사", "타인 개인정보"],
      pageTypes: ["고신호 브리핑", "온체인 고래 감시", "크립토 DYOR", "미국 주식/ETF 분석", "한국 주식 분석", "투자 가설", "리스크 알림", "관찰 목록", "폐기 기록"],
      aiUse: ["잔잔한 뉴스와 진짜 신호 분리", "고래 이동의 방향성과 주소 맥락 요약", "투자 후보별 근거-리스크-반증 조건 요약", "공개 출처 기반 DYOR 체크리스트 생성", "관찰 목록 우선순위 정리"],
      starterQuestions: ["이 정보는 공식 근거인가, 해석인가, 소문인가?", "고래 이동이 거래소 유입인지, 콜드월렛 이동인지, 브릿지 이동인지 구분했는가?", "이 가설이 틀렸다고 판단할 폐기 조건은 무엇인가?"],
      reviewCadence: "주 2회 시장 점검, 큰 이슈 발생 시 즉시 업데이트",
      linkedViews: ["bookshelf", "thinktank"]
    },
    {
      id: "business-foundry",
      code: "사업",
      shelf: "창업",
      title: "사업 아이디어 공방",
      subtitle: "미래 사업, 제품, 시장, 고객 문제를 실험 가능한 형태로 보관",
      privacyLevel: "private-summary",
      purpose: "막연한 아이디어를 문제, 고객, 가설, 실험, 결과로 쪼개서 언젠가 사업으로 연결한다.",
      allowed: ["아이디어 한 줄", "고객 문제", "시장 관찰", "MVP 가설", "실험 결과", "경쟁사 공개 분석"],
      neverStore: ["타사 영업비밀", "동의 없는 고객 개인정보", "비밀계약 원문", "결제정보"],
      pageTypes: ["아이디어 씨앗", "고객 문제", "작은 실험", "시장 메모", "경쟁 지도", "피치 초안"],
      aiUse: ["아이디어 우선순위 정리", "MVP 실험 설계", "고객 인터뷰 질문 생성"],
      starterQuestions: ["누가 이 문제로 돈이나 시간을 잃고 있는가?", "가장 작은 실험은 무엇인가?", "실패하면 무엇을 배울 수 있는가?"],
      reviewCadence: "아이디어 발생 시, 월 1회 선별",
      linkedViews: ["bookshelf"]
    },
    {
      id: "learning-library",
      code: "학습",
      shelf: "성장",
      title: "학습 서재",
      subtitle: "영어, 전기, 반도체, 사업, 독서, 논문을 누적하는 학습 책장",
      privacyLevel: "private-summary",
      purpose: "공부한 내용을 시험 점수보다 오래 남는 개념, 예시, 적용 과제로 바꾼다.",
      allowed: ["강의/책 요약", "문제 오답", "개념 카드", "논문 요약", "실전 적용 과제"],
      neverStore: ["유료 교재 원문 대량 복사", "저작권 자료 전체", "시험 문제 원문 유출"],
      pageTypes: ["개념 노트", "오답 노트", "책 메모", "논문 노트", "훈련 기록", "설명 연습"],
      aiUse: ["약점 진단", "복습 스케줄 생성", "쉬운 설명으로 재구성"],
      starterQuestions: ["이 개념을 현장 예시로 바꾸면?", "내가 틀린 이유는 지식 부족인가, 문제 해석인가?", "내일 다시 떠올릴 단서는?"],
      reviewCadence: "격일 10분, 주간 누적 점검",
      linkedViews: ["english-test", "english", "papers", "glossary"]
    },
    {
      id: "people-network",
      code: "관계",
      shelf: "관계",
      title: "사람과 관계 노트",
      subtitle: "관계의 맥락, 감사, 약속, 대화 후속 조치를 관리",
      privacyLevel: "private-summary",
      purpose: "사람을 데이터화하는 것이 아니라, 내가 더 책임감 있게 기억하고 챙기기 위한 관계 메모다.",
      allowed: ["약속한 일", "고마웠던 일", "대화 후속 조치", "가족 일정 요약", "도움 요청/제공 기록"],
      neverStore: ["타인의 비밀 원문", "동의 없는 민감 건강/금융/위치 정보", "험담 기록", "연락처 목록 원문"],
      pageTypes: ["후속 연락", "가족 일정", "감사 메모", "대화 요약", "도움 계획", "관계의 선"],
      aiUse: ["약속 누락 방지", "관계 회복 질문", "가족 일정 요약"],
      starterQuestions: ["내가 지키기로 한 약속은?", "상대에게 다시 확인해야 할 것은?", "내가 과하게 떠안은 것은 없는가?"],
      reviewCadence: "주 1회, 중요한 일정 전",
      linkedViews: ["bookshelf"]
    },
    {
      id: "admin-vault",
      code: "관리",
      shelf: "관리",
      title: "생활 행정 지도",
      subtitle: "집, 계약, 보험, 구독, 서류 위치를 원문이 아닌 색인으로 관리",
      privacyLevel: "sensitive-index",
      purpose: "서류 원문을 넣지 않고 어디에 무엇이 있는지, 언제 갱신해야 하는지, 어떤 질문이 남았는지 관리한다.",
      allowed: ["문서 위치 힌트", "만료일", "문의할 기관", "해야 할 행정 작업", "체크리스트"],
      neverStore: ["계약서 원문", "보험증권 번호 전체", "등본/가족관계증명서", "신분증 사진", "인감/서명 이미지"],
      pageTypes: ["문서 색인", "갱신 체크", "구독 점검", "집 관리", "보험 질문", "행정 할 일"],
      aiUse: ["만료/갱신 일정 정리", "질문 목록 생성", "서류 준비 체크리스트"],
      starterQuestions: ["원문은 어디에 안전하게 보관되어 있는가?", "언제 갱신하거나 확인해야 하는가?", "다음 행정 행동은?"],
      reviewCadence: "월 1회, 계약/갱신 전",
      linkedViews: ["bookshelf"]
    },
    {
      id: "ai-briefing-desk",
      code: "AI",
      shelf: "통합",
      title: "AI 통합 브리핑",
      subtitle: "책장 전체를 AI에게 보여줄 때의 반출 규칙, 요약 패킷, 분석 프롬프트",
      privacyLevel: "controlled-export",
      purpose: "나중에 AI에게 데이터를 보여줄 때 무엇을 포함하고 제외할지 통제한다.",
      allowed: ["비식별 요약", "책별 목표", "최근 결정", "다음 액션", "AI 반출 허용 체크된 페이지"],
      neverStore: ["원문 민감정보 묶음", "인증정보", "타인의 동의 없는 세부 개인정보", "의료/금융 식별자"],
      pageTypes: ["AI 브리핑", "반출 규칙", "월간 종합", "위험 검토", "책 사이 통찰", "프롬프트 초안"],
      aiUse: ["책장 전체 패턴 분석", "나의 다음 30일 운영 제안", "분야별 충돌과 우선순위 정리"],
      starterQuestions: ["AI에게 보여줘도 되는 범위인가?", "이 요약만으로도 판단이 가능한가?", "삭제해야 할 식별자는 없는가?"],
      reviewCadence: "AI 분석 전 매번",
      linkedViews: ["bookshelf", "thinktank"]
    }
  ];

  let activeBookId = localStorage.getItem(ACTIVE_BOOK_KEY) || BOOKSHELF_BOOKS[0].id;
  let pages = loadPages();
  let remoteState = "로컬 우선";
  let latestAiPacketText = "";
  let cryptoSnapshot = null;
  let cryptoSnapshotState = "아직 불러오지 않음";
  let onchainIntel = null;
  let onchainIntelState = "아직 불러오지 않음";
  let onchainMonitorTimer = 0;
  let tokenizationIntel = null;
  let tokenizationIntelState = "아직 불러오지 않음";
  let tokenizationMonitorTimer = 0;

  function escapeHtml(value = "") {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function uid() {
    if (crypto?.randomUUID) return crypto.randomUUID();
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function currentBook() {
    return BOOKSHELF_BOOKS.find(book => book.id === activeBookId) || BOOKSHELF_BOOKS[0];
  }

  function stableJson(value) {
    if (Array.isArray(value)) return `[${value.map(stableJson).join(",")}]`;
    if (value && typeof value === "object") {
      return `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${stableJson(value[key])}`).join(",")}}`;
    }
    return JSON.stringify(value ?? null);
  }

  function hashText(value = "") {
    let hash = 2166136261;
    const text = String(value);
    for (let index = 0; index < text.length; index += 1) {
      hash ^= text.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0).toString(16).padStart(8, "0");
  }

  function cleanText(value = "", max = 5000) {
    return String(value || "").replace(/\s+/g, " ").trim().slice(0, max);
  }

  function cleanLongText(value = "", max = 12000) {
    return String(value || "").replace(/\r\n/g, "\n").trim().slice(0, max);
  }

  function validIso(value, fallback = new Date().toISOString()) {
    const date = new Date(value || "");
    return Number.isNaN(date.getTime()) ? fallback : date.toISOString();
  }

  function knownBook(bookId) {
    return BOOKSHELF_BOOKS.find(book => book.id === bookId) || BOOKSHELF_BOOKS[0];
  }

  function normalizeTags(tags) {
    const list = Array.isArray(tags) ? tags : String(tags || "").split(",");
    return [...new Set(list.map(tag => cleanText(tag, 24)).filter(Boolean))].slice(0, 12);
  }

  function normalizeEntities(entities) {
    const list = Array.isArray(entities) ? entities : String(entities || "").split(/[,，\n]/);
    return [...new Set(list.map(entity => cleanText(entity, 48)).filter(Boolean))].slice(0, 16);
  }

  function inferEntities(text = "") {
    const dictionary = [
      "Centura", "Vantage", "EPI", "RTP", "EFEM", "FOUP", "Load Lock", "TM", "PM", "CM",
      "Gas Box", "Pump", "Exhaust", "Abatement", "DVM", "Relay", "Interlock", "D1",
      "Ethereum", "RWA", "ETF", "SEC", "DART", "FINGER", "ACTIVE"
    ];
    const haystack = String(text || "").toLowerCase();
    return dictionary.filter(term => haystack.includes(term.toLowerCase())).slice(0, 12);
  }

  function buildRecordText(raw = {}) {
    return [
      raw.bookTitle,
      raw.title,
      raw.pageType,
      raw.chapter,
      raw.topic,
      raw.summary,
      raw.evidence,
      raw.action,
      raw.result,
      raw.nextAction,
      Array.isArray(raw.tags) ? raw.tags.join(" ") : raw.tags,
      Array.isArray(raw.entities) ? raw.entities.join(" ") : raw.entities
    ].filter(Boolean).join(" ");
  }

  function pageCoreForHash(page) {
    return {
      bookId: page.bookId,
      chapter: page.chapter,
      topic: page.topic,
      title: page.title,
      pageType: page.pageType,
      privacyLevel: page.privacyLevel,
      summary: page.summary,
      evidence: page.evidence,
      action: page.action,
      result: page.result,
      nextAction: page.nextAction,
      nextStep: page.nextStep,
      entities: page.entities,
      tags: page.tags,
      aiExportOk: page.aiExportOk,
      date: page.date,
      createdAt: page.createdAt
    };
  }

  function normalizePage(raw = {}) {
    const fallbackCreatedAt = new Date().toISOString();
    const book = knownBook(raw.bookId || activeBookId);
    const createdAt = validIso(raw.createdAt || raw.created_at, fallbackCreatedAt);
    const updatedAt = validIso(raw.updatedAt || raw.remoteSavedAt || raw.updated_at || createdAt, createdAt);
    const page = {
      ...raw,
      id: cleanText(raw.id || `bookshelf-${uid()}`, 140),
      schemaVersion: BOOKSHELF_SCHEMA_VERSION,
      type: "Personal Bookshelf Page",
      subsystem: cleanText(raw.subsystem || book.title, 120),
      severity: cleanText(raw.severity || raw.privacyLevel || "private-summary", 60),
      title: cleanText(raw.title || "제목 없는 페이지", 120),
      pageType: cleanText(raw.pageType || book.pageTypes?.[0] || "페이지", 80),
      chapter: cleanText(raw.chapter || raw.pageType || book.shelf, 80),
      topic: cleanText(raw.topic || raw.title || book.title, 120),
      privacyLevel: cleanText(raw.privacyLevel || raw.severity || "private-summary", 80),
      summary: cleanLongText(raw.summary || raw.context || "", 12000),
      evidence: cleanLongText(raw.evidence || "", 8000),
      action: cleanLongText(raw.action || "", 4000),
      result: cleanLongText(raw.result || "", 4000),
      nextAction: cleanLongText(raw.nextAction || raw.nextStudy || "", 4000),
      nextStep: cleanLongText(raw.nextStep || raw.nextAction || raw.nextStudy || "", 4000),
      tags: normalizeTags(raw.tags),
      entities: normalizeEntities(raw.entities || inferEntities(buildRecordText(raw))),
      date: cleanText(raw.date || createdAt.slice(0, 10), 20),
      aiExportOk: Boolean(raw.aiExportOk),
      bookId: book.id,
      bookTitle: book.title,
      source: cleanText(raw.source || "인생 정보실", 80),
      createdAt,
      updatedAt,
      remoteSavedAt: raw.remoteSavedAt || "",
      localSavedAt: raw.localSavedAt || fallbackCreatedAt,
      syncStatus: raw.syncStatus || "local saved"
    };
    page.integrityHash = hashText(stableJson(pageCoreForHash(page)));
    return page;
  }

  function pageSortValue(page) {
    return String(page.updatedAt || page.remoteSavedAt || page.createdAt || "");
  }

  function loadPages() {
    try {
      const loaded = JSON.parse(localStorage.getItem(BOOKSHELF_PAGE_KEY) || "[]");
      return Array.isArray(loaded) ? loaded.map(normalizePage) : [];
    } catch {
      return [];
    }
  }

  function savePages() {
    pages = pages.map(normalizePage);
    localStorage.setItem(BOOKSHELF_PAGE_KEY, JSON.stringify(pages));
  }

  function mergePages(nextPages) {
    const byId = new Map(pages.map(page => {
      const normalized = normalizePage(page);
      return [normalized.id, normalized];
    }));
    nextPages.forEach(page => {
      if (!page?.id) return;
      const incoming = normalizePage(page);
      const existing = byId.get(incoming.id);
      if (!existing || pageSortValue(incoming) >= pageSortValue(existing)) {
        byId.set(incoming.id, normalizePage({ ...existing, ...incoming }));
      }
    });
    pages = [...byId.values()].sort((a, b) => pageSortValue(b).localeCompare(pageSortValue(a)));
    savePages();
  }

  function tokenForApi(base) {
    if (base === LOCAL_VAULT_API) return sessionStorage.getItem(LOCAL_TOKEN_KEY) || "";
    return sessionStorage.getItem(REMOTE_TOKEN_KEY) || "";
  }

  async function apiFetch(path, options = {}, base = BOOKSHELF_API) {
    const token = tokenForApi(base);
    const response = await fetch(`${base}${path}`, {
      ...options,
      credentials: base === LOCAL_VAULT_API ? "omit" : "include",
      headers: {
        "Content-Type": "application/json",
        "X-ThinkTank-Password": sessionStorage.getItem(CLIENT_PASS_KEY) || "",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {})
      }
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  }

  async function copyText(text, statusSelector) {
    const status = document.querySelector(statusSelector);
    if (!text) {
      if (status) status.textContent = "복사할 내용이 아직 없습니다.";
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      if (status) status.textContent = "클립보드에 복사했습니다.";
    } catch {
      if (status) status.textContent = "브라우저 권한 때문에 자동 복사하지 못했습니다. 텍스트를 직접 선택해 복사하세요.";
    }
  }

  async function pullRemotePages() {
    try {
      const data = await apiFetch("/api/entries");
      const remotePages = (data.entries || []).filter(entry => entry.type === "Personal Bookshelf Page");
      if (remotePages.length) mergePages(remotePages);
      remoteState = "Cloudflare D1 연결됨";
      await retryUnsyncedPages({ silent: true });
    } catch {
      remoteState = "로컬 캐시 사용 중";
    }
    renderBookshelf();
  }

  function needsCloudSync(page) {
    const status = String(page.syncStatus || "");
    return !page.remoteSavedAt || status.includes("local saved") || status.includes("D1 failed") || status.includes("DB 저장 실패");
  }

  async function pushPageToVault(page, options = {}) {
    const cleanPage = normalizePage(page);
    try {
      const result = await apiFetch("/api/entries", { method: "POST", body: JSON.stringify(cleanPage) });
      const saved = normalizePage({
        ...cleanPage,
        ...(result.entry || {}),
        syncStatus: "D1 saved",
        remoteSavedAt: result.entry?.remoteSavedAt || new Date().toISOString()
      });
      Object.assign(page, saved);
      mergePages([saved]);
      remoteState = "Cloudflare D1 연결됨";
    } catch {
      page.syncStatus = "local saved";
      remoteState = "로컬 캐시 사용 중";
      mergePages([page]);
    }
    if (BOOKSHELF_API !== LOCAL_VAULT_API && tokenForApi(LOCAL_VAULT_API)) {
      try {
        await apiFetch("/api/entries", {
          method: "POST",
          body: JSON.stringify({ ...normalizePage(page), localMirror: true })
        }, LOCAL_VAULT_API);
        page.syncStatus = `${page.syncStatus} / D drive mirrored`;
      } catch {
        page.syncStatus = `${page.syncStatus} / D drive pending`;
      }
    }
    mergePages([page]);
    if (!options.silent) renderBookshelf();
  }

  async function retryUnsyncedPages(options = {}) {
    const targets = pages.filter(needsCloudSync).slice(0, 20);
    if (!targets.length) {
      if (!options.silent) {
        remoteState = "동기화 대기 없음";
        renderBookshelf();
      }
      return;
    }
    remoteState = `${targets.length}개 페이지 DB 재시도 중`;
    if (!options.silent) renderBookshelf();
    for (const page of targets) {
      await pushPageToVault(page, { silent: true });
    }
    remoteState = pages.some(needsCloudSync) ? "일부 페이지 동기화 대기" : "Cloudflare D1 연결됨";
    if (!options.silent) renderBookshelf();
  }

  function renderRail() {
    const rail = document.querySelector("#bookshelf-rail");
    if (!rail) return;
    const shelves = [...new Set(BOOKSHELF_BOOKS.map(book => book.shelf))];
    rail.innerHTML = shelves.map(shelf => {
      const books = BOOKSHELF_BOOKS.filter(book => book.shelf === shelf);
      return `
        <div class="bookshelf-group">
          <p>${escapeHtml(shelf)}</p>
          ${books.map(book => `
            <button class="book-spine ${book.id === activeBookId ? "active" : ""}" type="button" data-book-id="${escapeHtml(book.id)}">
              <span>${escapeHtml(book.code)}</span>
              <strong>${escapeHtml(book.title)}</strong>
              <small>${escapeHtml(privacyLabel(book.privacyLevel))}</small>
            </button>
          `).join("")}
        </div>
      `;
    }).join("");

    rail.querySelectorAll("[data-book-id]").forEach(button => {
      button.addEventListener("click", () => {
        activeBookId = button.dataset.bookId;
        localStorage.setItem(ACTIVE_BOOK_KEY, activeBookId);
        renderBookshelf();
      });
    });
  }

  function listItems(items) {
    return `<ul>${items.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
  }

  function privacyLabel(value = "") {
    return PRIVACY_LABELS[value] || value || "개인 요약";
  }

  function syncLabel(value = "") {
    const text = String(value || "saved");
    return text
      .replace("D1 saved", "D1 저장")
      .replace("local saved", "로컬 저장")
      .replace("D drive mirrored", "D 드라이브 백업")
      .replace("D drive pending", "D 드라이브 대기")
      .replace("saved", "저장됨");
  }

  function renderFepEpiBookInterior() {
    return `
      <section class="book-interior" aria-label="FEP/EPI Mastery book modules">
        <div class="book-interior-head">
          <div>
            <p class="eyebrow">책 안의 목차</p>
            <h3>FEP/EPI 현장 엔지니어 목차</h3>
            <p>흩어져 있던 EPI 학습 탭을 이 책 내부 목차로 모았습니다. 책장에서 이 책을 펼치고 필요한 장을 골라 들어가는 구조입니다.</p>
          </div>
          <span class="sync-pill">${FEP_EPI_BOOK_MODULES.reduce((sum, group) => sum + group.items.length, 0)}장</span>
        </div>
        ${FEP_EPI_BOOK_MODULES.map(group => `
          <div class="book-module-group">
            <strong>${escapeHtml(group.group)}</strong>
            <div class="book-module-grid">
              ${group.items.map(([view, title, desc]) => `
                <button class="book-module-card" type="button" data-open-book-view="${escapeHtml(view)}">
                  <span>${escapeHtml(BOOK_VIEW_LABELS[view] || view)}</span>
                  <strong>${escapeHtml(title)}</strong>
                  <small>${escapeHtml(desc)}</small>
                </button>
              `).join("")}
            </div>
          </div>
        `).join("")}
        <div class="fep-mastery-spine">
          <div>
            <p class="eyebrow">Senior CE 사고 순서</p>
            <h3>초보자가 막히지 않도록 큰 그림에서 현장 판단까지 한 줄로 연결</h3>
            <p>공개 자료로 확인 가능한 장비군과 공정 원리는 학습 콘텐츠로 넣고, 실제 recipe, customer site-specific acceptance limit, valve sequence, detector setpoint, interlock bypass는 현장 승인 문서 우선 경계로 분리합니다.</p>
          </div>
          <div class="fep-mastery-grid">
            ${FEP_EPI_MASTERY_PATH.map(([title, desc, view], index) => `
              <button class="fep-mastery-card" type="button" data-open-book-view="${escapeHtml(view)}">
                <span>${index + 1}</span>
                <strong>${escapeHtml(title)}</strong>
                <small>${escapeHtml(desc)}</small>
              </button>
            `).join("")}
          </div>
          <div class="fep-boundary-strip">
            <span><b>공개 학습</b>Applied 공식 장비 소개, OSHA/NIOSH/SEMI류 안전 원칙, 공개 논문/특허 수준의 원리</span>
            <span><b>현장 문서</b>고객 라인 spec, gas matrix, acceptance limit, PM 절차, interlock logic, manual 상세 절차</span>
            <span><b>CE 사고</b>증상 → 위험 → subsystem → evidence → stop condition → customer update → prevention</span>
          </div>
        </div>
      </section>
    `;
  }

  function renderBookBlueprint(book) {
    const blueprint = BOOK_BLUEPRINTS[book.id] || book.pageTypes.map(type => [type, `${type} 페이지를 이 책 안에서 계속 확장할 수 있습니다.`]);
    return `
      <section class="book-interior" aria-label="Book expansion blueprint">
        <div class="book-interior-head">
          <div>
            <p class="eyebrow">확장 설계</p>
            <h3>이 책 안에 앞으로 생길 공간</h3>
            <p>각 책은 독립 앱처럼 커질 수 있습니다. 지금은 저장 구조와 내부 페이지 설계부터 세워두고, 실제 기능은 책별로 하나씩 확장합니다.</p>
          </div>
          <span class="sync-pill">${blueprint.length}개 공간</span>
        </div>
        <div class="book-blueprint-grid">
          ${blueprint.map(([title, desc]) => `
            <article class="book-blueprint-card">
              <span>예정</span>
              <strong>${escapeHtml(title)}</strong>
              <small>${escapeHtml(desc)}</small>
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }

  function formatUsd(value) {
    const number = Number(value);
    if (!Number.isFinite(number)) return "-";
    if (number >= 1_000_000_000_000) return `$${(number / 1_000_000_000_000).toFixed(2)}T`;
    if (number >= 1_000_000_000) return `$${(number / 1_000_000_000).toFixed(2)}B`;
    if (number >= 1_000_000) return `$${(number / 1_000_000).toFixed(2)}M`;
    if (number >= 1) return `$${number.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
    return `$${number.toLocaleString("en-US", { maximumSignificantDigits: 4 })}`;
  }

  async function loadCryptoSnapshot() {
    cryptoSnapshotState = "CoinGecko에서 가격 컨텍스트 불러오는 중";
    renderBookshelf();
    try {
      const query = new URLSearchParams({
        ids: DYOR_COIN_IDS.join(","),
        vs_currencies: "usd",
        include_market_cap: "true",
        include_24hr_change: "true"
      });
      const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?${query.toString()}`, {
        headers: { accept: "application/json" }
      });
      if (!response.ok) throw new Error(`CoinGecko ${response.status}`);
      cryptoSnapshot = await response.json();
      cryptoSnapshotState = `업데이트 ${new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })}`;
    } catch {
      cryptoSnapshotState = "가격 API를 불러오지 못했습니다. 공식 링크와 저장 템플릿은 계속 사용할 수 있습니다.";
    }
    renderBookshelf();
  }

  async function loadOnchainIntel(options = {}) {
    onchainIntelState = options.monitor ? "자동 감시 업데이트 중" : "온체인 레이더 불러오는 중";
    if (!options.silent) renderBookshelf();
    try {
      const data = await apiFetch("/api/onchain-intel");
      onchainIntel = data.intel || data;
      onchainIntelState = `업데이트 ${new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })}`;
    } catch {
      onchainIntelState = "온체인 API를 불러오지 못했습니다. 로그인, D1/Worker 상태, API key 설정을 확인하세요.";
    }
    renderBookshelf();
  }

  function toggleOnchainMonitor() {
    if (onchainMonitorTimer) {
      clearInterval(onchainMonitorTimer);
      onchainMonitorTimer = 0;
      onchainIntelState = "자동 감시 중지";
      renderBookshelf();
      return;
    }
    loadOnchainIntel({ monitor: true, silent: true });
    onchainMonitorTimer = setInterval(() => loadOnchainIntel({ monitor: true, silent: true }), 5 * 60 * 1000);
    onchainIntelState = "5분 간격 자동 감시 중";
    renderBookshelf();
  }

  async function loadTokenizationIntel(options = {}) {
    tokenizationIntelState = options.monitor ? "토큰화 자동 감시 업데이트 중" : "자산 토큰화 레이더 불러오는 중";
    if (!options.silent) renderBookshelf();
    try {
      const data = await apiFetch("/api/tokenization-intel");
      tokenizationIntel = data.intel || data;
      tokenizationIntelState = `업데이트 ${new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })}`;
    } catch {
      tokenizationIntelState = "자산 토큰화 API를 불러오지 못했습니다. 로그인/Worker 상태를 확인하세요.";
    }
    renderBookshelf();
  }

  function toggleTokenizationMonitor() {
    if (tokenizationMonitorTimer) {
      clearInterval(tokenizationMonitorTimer);
      tokenizationMonitorTimer = 0;
      tokenizationIntelState = "토큰화 자동 감시 중지";
      renderBookshelf();
      return;
    }
    loadTokenizationIntel({ monitor: true, silent: true });
    tokenizationMonitorTimer = setInterval(() => loadTokenizationIntel({ monitor: true, silent: true }), 5 * 60 * 1000);
    tokenizationIntelState = "5분 간격 토큰화 자동 감시 중";
    renderBookshelf();
  }

  function renderCryptoSnapshot() {
    const rows = DYOR_COIN_IDS.map(id => {
      const item = cryptoSnapshot?.[id] || {};
      const change = Number(item.usd_24h_change || 0);
      return `
        <article>
          <span>${escapeHtml(id)}</span>
          <strong>${formatUsd(item.usd)}</strong>
          <small class="${change >= 0 ? "up" : "down"}">${Number.isFinite(change) ? `${change.toFixed(2)}% / 24h` : "변화율 대기"}</small>
          <em>mcap ${formatUsd(item.usd_market_cap)}</em>
        </article>
      `;
    }).join("");
    return `
      <section class="dyor-crypto-panel">
        <div class="panel-title-row">
          <div>
            <p class="eyebrow">크립토 가격 컨텍스트</p>
            <h3>가격은 결론이 아니라 리스크 온도계</h3>
          </div>
          <div class="thinktank-actions">
            <button class="secondary" type="button" id="dyor-refresh-crypto">가격 새로고침</button>
            <span class="sync-pill">${escapeHtml(cryptoSnapshotState)}</span>
          </div>
        </div>
        <div class="dyor-crypto-grid">${rows}</div>
      </section>
    `;
  }

  function renderOnchainIntelPanel() {
    const providers = onchainIntel?.providers || {};
    const macro = onchainIntel?.macro || {};
    const topChains = macro.topChains || [];
    const stablecoins = macro.stablecoins || {};
    const riskSignals = onchainIntel?.riskSignals || [];
    return `
      <section class="onchain-intel-panel">
        <div class="panel-title-row">
          <div>
            <p class="eyebrow">온체인 고래 레이더</p>
            <h3>고래 이동은 방향, 주소 맥락, 유동성을 같이 봐야 한다</h3>
          </div>
          <div class="thinktank-actions">
            <button class="secondary" type="button" id="onchain-refresh-intel">온체인 새로고침</button>
            <button class="secondary" type="button" id="onchain-toggle-monitor">${onchainMonitorTimer ? "자동 감시 중지" : "자동 감시 시작"}</button>
            <span class="sync-pill">${escapeHtml(onchainIntelState)}</span>
          </div>
        </div>
        <div class="onchain-provider-grid">
          ${ONCHAIN_INTEL_SOURCES.map(([name, desc, need, url]) => {
            const key = name.toLowerCase().replace(/\s+/g, "");
            const configured = providers[key]?.configured;
            return `
              <a href="${escapeHtml(url)}" target="_blank" rel="noreferrer" class="${configured ? "ready" : ""}">
                <span>${configured ? "연결 가능" : need}</span>
                <strong>${escapeHtml(name)}</strong>
                <p>${escapeHtml(desc)}</p>
              </a>
            `;
          }).join("")}
        </div>
        <div class="onchain-macro-grid">
          <article>
            <span>Stablecoins</span>
            <strong>${formatUsd(stablecoins.totalMcapUsd)}</strong>
            <small>${escapeHtml(stablecoins.note || "DefiLlama stablecoin supply 대기")}</small>
          </article>
          <article>
            <span>Chains</span>
            <strong>${topChains.length || 0}</strong>
            <small>${topChains.slice(0, 4).map(chain => `${chain.name} ${formatUsd(chain.tvl)}`).join(" · ") || "체인 TVL 대기"}</small>
          </article>
          <article>
            <span>Whale Feed</span>
            <strong>${providers.whalealert?.configured ? "ON" : "OFF"}</strong>
            <small>${providers.whalealert?.configured ? "Whale Alert API key 연결됨" : "Cloudflare 환경변수 WHALE_ALERT_API_KEY 필요"}</small>
          </article>
          <article>
            <span>Exchange Flow</span>
            <strong>${providers.glassnode?.configured ? "ON" : "준비"}</strong>
            <small>${providers.glassnode?.configured ? "Glassnode API key 연결됨" : "거래소 순유입은 Glassnode/CryptoQuant류 소스 필요"}</small>
          </article>
        </div>
        <div class="onchain-rule-grid">
          ${ONCHAIN_WHALE_RULES.map(([title, desc]) => `
            <article>
              <strong>${escapeHtml(title)}</strong>
              <p>${escapeHtml(desc)}</p>
            </article>
          `).join("")}
        </div>
        <div class="onchain-threshold-grid">
          ${ONCHAIN_SIGNAL_THRESHOLDS.map(([title, desc]) => `
            <span><b>${escapeHtml(title)}</b>${escapeHtml(desc)}</span>
          `).join("")}
        </div>
        <div class="onchain-risk-feed">
          <strong>현재 레이더 메모</strong>
          ${riskSignals.length ? riskSignals.map(signal => `<span>${escapeHtml(signal)}</span>`).join("") : `<span>아직 고신호로 분류된 온체인 이벤트가 없습니다. API key를 연결하면 고래 트랜잭션까지 확장됩니다.</span>`}
        </div>
      </section>
    `;
  }

  function formatPercent(value) {
    const number = Number(value);
    if (!Number.isFinite(number)) return "-";
    return `${number >= 0 ? "+" : ""}${number.toFixed(2)}%`;
  }

  function renderTokenizationIntelPanel() {
    const ethereum = tokenizationIntel?.ethereumStablecoins || {};
    const rwaTokens = tokenizationIntel?.rwaTokenContext || {};
    const volatility = tokenizationIntel?.rwaThemeVolatility || {};
    const providers = tokenizationIntel?.providers || {};
    const signals = tokenizationIntel?.signals || [];
    const topAssets = Array.isArray(ethereum.topAssets) ? ethereum.topAssets : [];
    const rows = TOKENIZATION_COIN_IDS.map(id => {
      const item = rwaTokens[id] || {};
      const change = Number(item.usd_24h_change);
      return `
        <article>
          <span>${escapeHtml(id)}</span>
          <strong>${formatUsd(item.usd)}</strong>
          <small class="${change >= 0 ? "up" : "down"}">${Number.isFinite(change) ? `${change.toFixed(2)}% / 24h` : "변화율 대기"}</small>
          <em>mcap ${formatUsd(item.usd_market_cap)}</em>
        </article>
      `;
    }).join("");
    const topAssetRows = topAssets.length ? topAssets.slice(0, 8).map(asset => `
      <article>
        <span>${escapeHtml(asset.symbol || asset.name)}</span>
        <strong>${formatUsd(asset.currentUsd)}</strong>
        <small>1d ${formatPercent(asset.change1dPct)} · 7d ${formatPercent(asset.change7dPct)} · 30d ${formatPercent(asset.change30dPct)}</small>
        <em>${escapeHtml(asset.name || "Ethereum asset")}</em>
      </article>
    `).join("") : `
      <article>
        <span>Ethereum asset flow</span>
        <strong>대기</strong>
        <small>새로고침하면 DefiLlama 체인별 공급량으로 채워집니다.</small>
        <em>stablecoin supply</em>
      </article>
    `;
    const maxMover = volatility.maxMover || {};
    return `
      <section class="tokenization-intel-panel">
        <div class="panel-title-row">
          <div>
            <p class="eyebrow">자산 토큰화 레이더</p>
            <h3>이더리움 위로 올라오는 자산의 공급, 변동성, 신뢰 구조</h3>
          </div>
          <div class="thinktank-actions">
            <button class="secondary" type="button" id="tokenization-refresh-intel">토큰화 레이더 새로고침</button>
            <button class="secondary" type="button" id="tokenization-toggle-monitor">${tokenizationMonitorTimer ? "토큰화 감시 중지" : "토큰화 감시 시작"}</button>
            <span class="sync-pill">${escapeHtml(tokenizationIntelState)}</span>
          </div>
        </div>
        <div class="tokenization-macro-grid">
          <article>
            <span>Ethereum Stable Assets</span>
            <strong>${formatUsd(ethereum.currentUsd)}</strong>
            <small>1d ${formatPercent(ethereum.change1dPct)} · 7d ${formatPercent(ethereum.change7dPct)} · 30d ${formatPercent(ethereum.change30dPct)}</small>
          </article>
          <article>
            <span>Tracked Assets</span>
            <strong>${ethereum.assetCount || 0}</strong>
            <small>DefiLlama 체인별 stablecoin supply 기준</small>
          </article>
          <article>
            <span>RWA.xyz</span>
            <strong>${providers.rwaxyz?.configured ? "ON" : "OFF"}</strong>
            <small>${providers.rwaxyz?.configured ? "RWA_API_KEY 연결됨" : "토큰화 국채/신용 세부 데이터는 RWA_API_KEY 필요"}</small>
          </article>
          <article>
            <span>Volatility Lens</span>
            <strong>${formatPercent(volatility.averageAbsMove24hPct)}</strong>
            <small>RWA 테마 토큰 평균 24h 절대 변동률 · 신호 ${signals.length}개</small>
          </article>
          <article>
            <span>Max Mover</span>
            <strong>${escapeHtml(maxMover.id || "-")}</strong>
            <small>${formatPercent(maxMover.change24hPct)} / 24h · ${formatUsd(maxMover.marketCapUsd)}</small>
          </article>
        </div>
        <div class="tokenization-asset-flow-grid">${topAssetRows}</div>
        <div class="tokenization-category-grid">
          ${TOKENIZATION_CATEGORIES.map(([title, desc]) => `
            <article>
              <strong>${escapeHtml(title)}</strong>
              <p>${escapeHtml(desc)}</p>
            </article>
          `).join("")}
        </div>
        <div class="tokenization-token-grid">${rows}</div>
        <div class="tokenization-rule-grid">
          ${TOKENIZATION_SIGNAL_RULES.map(([title, desc]) => `
            <span><b>${escapeHtml(title)}</b>${escapeHtml(desc)}</span>
          `).join("")}
        </div>
        <div class="tokenization-source-grid">
          ${TOKENIZATION_MARKET_SOURCES.map(([name, desc, need, url]) => `
            <a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">
              <span>${escapeHtml(need)}</span>
              <strong>${escapeHtml(name)}</strong>
              <p>${escapeHtml(desc)}</p>
            </a>
          `).join("")}
        </div>
        <div class="tokenization-signal-feed">
          <strong>현재 토큰화 시장 메모</strong>
          ${signals.length ? signals.map(signal => `<span>${escapeHtml(signal)}</span>`).join("") : `<span>아직 고신호로 분류된 토큰화 시장 변화가 없습니다. RWA.xyz API key를 연결하면 국채/신용/상품 세부 추이까지 확장됩니다.</span>`}
        </div>
      </section>
    `;
  }

  function renderInvestmentDyorInterior(book) {
    return `
      ${renderBookBlueprint(book)}
      <section class="dyor-intel-panel" aria-label="투자 DYOR 인텔리전스">
        <div class="dyor-intel-head">
          <div>
            <p class="eyebrow">DYOR Intelligence</p>
            <h3>잔잔한 이슈를 버리고 진짜 신호만 남기는 필터</h3>
            <p>이 책은 투자 조언이나 자동 매매가 아닙니다. 공식 근거, 숫자, 온체인 활동, 공시, 리스크와 반증 조건을 모아 AI가 읽기 좋은 판단 재료로 정리하는 공간입니다.</p>
          </div>
          <span class="sync-pill">공개 정보 기반</span>
        </div>
        <div class="dyor-lane-grid">
          ${DYOR_ASSET_LANES.map(([title, desc]) => `
            <article>
              <strong>${escapeHtml(title)}</strong>
              <p>${escapeHtml(desc)}</p>
            </article>
          `).join("")}
        </div>
        <div class="dyor-rule-grid">
          ${DYOR_SIGNAL_RULES.map(([title, desc]) => `
            <article class="${title === "저신호" ? "muted" : title === "폐기 조건" ? "danger" : ""}">
              <span>${escapeHtml(title)}</span>
              <p>${escapeHtml(desc)}</p>
            </article>
          `).join("")}
        </div>
        ${renderCryptoSnapshot()}
        ${renderOnchainIntelPanel()}
        ${renderTokenizationIntelPanel()}
        <div class="dyor-source-grid">
          ${DYOR_SOURCE_STACK.map(source => `
            <a href="${escapeHtml(source.url)}" target="_blank" rel="noreferrer">
              <span>${escapeHtml(source.market)}</span>
              <strong>${escapeHtml(source.source)}</strong>
              <p>${escapeHtml(source.use)}</p>
              <small>${escapeHtml(source.trust)}</small>
            </a>
          `).join("")}
        </div>
        <div class="dyor-prompt-box">
          <strong>AI에게 맡길 때의 기본 프롬프트</strong>
          <p>이 자산을 매수 추천하지 말고 DYOR 관점으로 분석해라. 공식 근거, 숫자 변화, 촉매, 리스크, 반증 조건, 추적해야 할 다음 데이터, 소문/노이즈를 분리해라. 결론은 확률적 가설로만 표현하고, 투자 결정은 사용자가 한다.</p>
        </div>
      </section>
    `;
  }

  function renderBookInterior(book) {
    if (book.id === "career-fep-epi") return renderFepEpiBookInterior();
    if (book.id === "investment-dyor") return renderInvestmentDyorInterior(book);
    return renderBookBlueprint(book);
  }

  function viewLabel(view) {
    const labels = {
      dashboard: "EPI 홈",
      curriculum: "성장 커리큘럼",
      cluster: "구성게임",
      install: "설치",
      electrical: "전기/DVM",
      "english-test": "영어시험",
      thinktank: "싱크탱크",
      english: "영어풀이",
      papers: "논문노트",
      glossary: "용어집",
      bookshelf: "책장"
    };
    return labels[view] || view;
  }

  function pagesForBook(bookId) {
    return pages.filter(page => page.bookId === bookId);
  }

  function formatDateLabel(value) {
    if (!value) return "기록 없음";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "날짜 불명";
    return date.toLocaleDateString("ko-KR", { month: "short", day: "numeric" });
  }

  function getBookStats(book) {
    const bookPages = pagesForBook(book.id);
    const aiReady = bookPages.filter(page => page.aiExportOk).length;
    const nextReady = bookPages.filter(page => page.nextAction || page.nextStep).length;
    const tagged = bookPages.filter(page => page.tags?.length).length;
    const withEntities = bookPages.filter(page => page.entities?.length).length;
    const latest = [...bookPages].sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")))[0];
    const score = Math.min(100, Math.round(
      Math.min(bookPages.length, 6) / 6 * 40 +
      (bookPages.length ? aiReady / bookPages.length : 0) * 25 +
      (bookPages.length ? nextReady / bookPages.length : 0) * 25 +
      (bookPages.length ? (tagged + withEntities) / (bookPages.length * 2) : 0) * 10
    ));
    const missingNext = bookPages.filter(page => !(page.nextAction || page.nextStep)).slice(0, 3);
    const suggestion = !bookPages.length
      ? "첫 페이지를 하나 저장해서 이 책을 활성화하세요."
      : !aiReady
        ? "AI에게 보여줘도 되는 비식별 요약 1개를 체크하세요."
        : missingNext.length
          ? "다음 행동이 비어 있는 페이지를 닫아주세요."
          : score < 80
            ? "태그와 근거를 보강해서 검색 가능한 지식으로 만드세요."
            : "이번 주에는 새 사례보다 기존 페이지를 재검토해 패턴을 뽑으세요.";
    return {
      pages: bookPages,
      aiReady,
      nextReady,
      tagged,
      withEntities,
      latest,
      score,
      missingNext,
      suggestion
    };
  }

  function libraryStats() {
    const exportReady = pages.filter(page => page.aiExportOk).length;
    const booksWithPages = new Set(pages.map(page => page.bookId).filter(Boolean)).size;
    const pagesWithNextAction = pages.filter(page => page.nextAction || page.nextStep).length;
    const overallScore = pages.length ? Math.round((exportReady / pages.length * 45) + (pagesWithNextAction / pages.length * 45) + (booksWithPages / BOOKSHELF_BOOKS.length * 10)) : 0;
    return {
      books: BOOKSHELF_BOOKS.length,
      pages: pages.length,
      exportReady,
      booksWithPages,
      overallScore
    };
  }

  function percent(part, total) {
    return total ? Math.round(part / total * 100) : 0;
  }

  function safeJsonParse(key, fallback) {
    try {
      const parsed = JSON.parse(localStorage.getItem(key) || "");
      return parsed ?? fallback;
    } catch {
      return fallback;
    }
  }

  function localEnglishInsight() {
    const records = safeJsonParse("amkEnglishSessionRecords", []);
    const micro = safeJsonParse("amkEnglishMicroAttempts", []);
    const allResults = [
      ...records.flatMap(record => record.results || []),
      ...micro.map(item => ({
        type: item.type,
        prompt: item.prompt,
        correct: item.correct,
        skillTag: item.skillTag
      }))
    ];
    const bySkill = {};
    allResults.forEach(result => {
      const skill = result.skillTag || result.type || "general English";
      if (!bySkill[skill]) bySkill[skill] = { skill, total: 0, wrong: 0 };
      bySkill[skill].total += 1;
      if (!result.correct) bySkill[skill].wrong += 1;
    });
    const weaknesses = Object.values(bySkill)
      .map(item => ({
        ...item,
        accuracy: item.total ? Math.round((item.total - item.wrong) / item.total * 100) : 0
      }))
      .sort((a, b) => b.wrong - a.wrong || a.accuracy - b.accuracy);
    const total = allResults.length;
    const correct = allResults.filter(item => item.correct).length;
    return {
      records: records.length,
      microAttempts: micro.length,
      totalQuestions: total,
      accuracy: total ? Math.round(correct / total * 100) : 0,
      weaknesses: weaknesses.slice(0, 5)
    };
  }

  function localCognitiveInsight() {
    const state = safeJsonParse("projectUniverseCognitiveResilienceV1", {});
    const sessions = Array.isArray(state.sessions) ? state.sessions : [];
    const latest = sessions[0];
    const weakMap = {};
    sessions.forEach(session => (session.weakSpots || []).forEach(spot => {
      weakMap[spot] = (weakMap[spot] || 0) + 1;
    }));
    return {
      today: state.today || "",
      streak: state.streak || 0,
      sessions: sessions.length,
      latestScore: latest?.totalScore || 0,
      weakSpots: Object.entries(weakMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([spot, count]) => ({ spot, count }))
    };
  }

  function localCareerInsight() {
    const trainer = safeJsonParse("ceTrainerState", {});
    const missions = Object.values(trainer.missions || {}).filter(Boolean).length;
    const quizzes = Array.isArray(trainer.quizAttempts) ? trainer.quizAttempts : [];
    const quizAccuracy = quizzes.length ? Math.round(quizzes.filter(Boolean).length / quizzes.length * 100) : 0;
    const recentViews = Array.isArray(trainer.recentViews) ? trainer.recentViews.slice(0, 5) : [];
    return {
      missions,
      quizAttempts: quizzes.length,
      quizAccuracy,
      recentViews,
      lastView: trainer.lastView || ""
    };
  }

  function todayActionForBook(book, stats = getBookStats(book)) {
    if (stats.missingNext.length) return `열린 루프 닫기: ${stats.missingNext[0].title}`;
    if (!stats.pages.length) return LIFE_ACTION_RECIPES[book.id] || "첫 기록 1개를 저장하세요.";
    if (!stats.withEntities) return "관련 사람, 장비, 자산, 개념을 entities로 붙여 검색성을 올리세요.";
    if (!stats.aiReady) return "AI에게 보여도 되는 비식별 요약 1개를 체크하세요.";
    return LIFE_ACTION_RECIPES[book.id] || stats.suggestion;
  }

  function buildKnowledgeGraph() {
    const nodes = new Map();
    const edges = [];
    const addNode = (id, type, label, meta = {}) => {
      if (!id) return;
      nodes.set(id, { id, type, label, ...meta });
    };
    const addEdge = (from, to, label) => {
      if (from && to) edges.push({ from, to, label });
    };
    BOOKSHELF_BOOKS.forEach(book => {
      addNode(`book:${book.id}`, "book", book.title, {
        shelf: book.shelf,
        privacyLevel: book.privacyLevel,
        todayAction: todayActionForBook(book)
      });
      (book.linkedViews || []).slice(0, 8).forEach(view => {
        addNode(`view:${view}`, "chapter", BOOK_VIEW_LABELS[view] || view, { bookId: book.id });
        addEdge(`book:${book.id}`, `view:${view}`, "contains");
      });
    });
    pages.forEach(page => {
      const pageId = `page:${page.id}`;
      addNode(pageId, "record", page.title, {
        bookId: page.bookId,
        chapter: page.chapter,
        topic: page.topic,
        date: page.date,
        privacyLevel: page.privacyLevel,
        aiExportOk: page.aiExportOk
      });
      addEdge(`book:${page.bookId}`, pageId, "has-record");
      if (page.chapter) {
        const chapterId = `chapter:${page.bookId}:${page.chapter}`;
        addNode(chapterId, "chapter", page.chapter, { bookId: page.bookId });
        addEdge(pageId, chapterId, "belongs-to");
      }
      (page.tags || []).forEach(tag => {
        const tagId = `tag:${tag.toLowerCase()}`;
        addNode(tagId, "tag", tag);
        addEdge(pageId, tagId, "tagged");
      });
      (page.entities || []).forEach(entity => {
        const entityId = `entity:${entity.toLowerCase()}`;
        addNode(entityId, "entity", entity);
        addEdge(pageId, entityId, "mentions");
      });
      if (page.nextAction || page.nextStep) {
        const actionId = `action:${page.id}`;
        addNode(actionId, "next-action", (page.nextAction || page.nextStep).slice(0, 100), { due: page.date });
        addEdge(pageId, actionId, "next");
      }
    });
    const tagNodes = [...nodes.values()].filter(node => node.type === "tag").length;
    const entityNodes = [...nodes.values()].filter(node => node.type === "entity").length;
    return {
      schema: "life-knowledge-graph-v1",
      generatedAt: new Date().toISOString(),
      counts: {
        nodes: nodes.size,
        edges: edges.length,
        books: BOOKSHELF_BOOKS.length,
        records: pages.length,
        tags: tagNodes,
        entities: entityNodes
      },
      nodes: [...nodes.values()].slice(0, 300),
      edges: edges.slice(0, 600)
    };
  }

  function buildTodayAgenda() {
    const english = localEnglishInsight();
    const cognitive = localCognitiveInsight();
    const career = localCareerInsight();
    const weakBook = BOOKSHELF_BOOKS
      .map(book => ({ book, stats: getBookStats(book) }))
      .sort((a, b) => a.stats.score - b.stats.score)[0];
    return [
      { lane: "인지", action: cognitive.sessions ? "오늘 인지 루틴을 이어서 streak를 유지하세요." : "인지훈련 첫 세션을 시작하세요.", evidence: `${cognitive.sessions} sessions · streak ${cognitive.streak}` },
      { lane: "직무", action: career.quizAccuracy < 70 ? "FEP/EPI 판단형 퀴즈와 runbook evidence를 복습하세요." : "install 또는 process visual 장을 하나 열어 현장 보고 문장을 만드세요.", evidence: `quiz ${career.quizAccuracy}% · missions ${career.missions}` },
      { lane: "영어", action: english.weaknesses[0] ? `${english.weaknesses[0].skill} 유형을 10분 보강하세요.` : "영어 CBT 1세트를 시작해 약점 태그를 만드세요.", evidence: `${english.totalQuestions} questions · ${english.accuracy}%` },
      { lane: "책장", action: weakBook ? todayActionForBook(weakBook.book, weakBook.stats) : "첫 기록을 저장하세요.", evidence: weakBook ? `${weakBook.book.title} 정리도 ${weakBook.stats.score}` : "기록 대기" }
    ];
  }

  function buildBookshelfAudit() {
    const total = pages.length;
    const cloudSaved = pages.filter(page => page.remoteSavedAt).length;
    const localOnly = pages.filter(needsCloudSync).length;
    const withNext = pages.filter(page => page.nextAction || page.nextStep).length;
    const withTags = pages.filter(page => page.tags?.length).length;
    const withEntities = pages.filter(page => page.entities?.length).length;
    const withEvidence = pages.filter(page => page.evidence).length;
    const withActionResult = pages.filter(page => page.action || page.result).length;
    const exportReady = pages.filter(page => page.aiExportOk).length;
    const validSchema = pages.filter(page =>
      page.id &&
      page.bookId &&
      page.createdAt &&
      page.schemaVersion &&
      page.integrityHash === hashText(stableJson(pageCoreForHash(normalizePage(page))))
    ).length;
    const booksWithPages = new Set(pages.map(page => page.bookId)).size;
    const latest = pages[0]?.createdAt || "";
    const daysSinceLatest = latest ? Math.floor((Date.now() - new Date(latest).getTime()) / 86400000) : null;
    const dimensions = [
      ["무결성", percent(validSchema, total), `${validSchema}/${total || 0} 페이지가 표준 스키마와 해시를 통과`],
      ["DB 동기화", percent(cloudSaved, total), `${cloudSaved}/${total || 0} 페이지가 Cloudflare D1 저장 확인`],
      ["행동성", percent(withNext, total), `${withNext}/${total || 0} 페이지에 다음 행동 포함`],
      ["검색성", percent(withTags, total), `${withTags}/${total || 0} 페이지에 태그 포함`],
      ["연결성", percent(withEntities, total), `${withEntities}/${total || 0} 페이지에 entities 포함`],
      ["근거성", percent(withEvidence, total), `${withEvidence}/${total || 0} 페이지에 근거/출처 포함`],
      ["결과성", percent(withActionResult, total), `${withActionResult}/${total || 0} 페이지에 action/result 포함`],
      ["책장 확장", percent(booksWithPages, BOOKSHELF_BOOKS.length), `${booksWithPages}/${BOOKSHELF_BOOKS.length} 권이 실제 기록 보유`]
    ];
    const score = total ? Math.round(dimensions.reduce((sum, [, value]) => sum + value, 0) / dimensions.length) : 0;
    return {
      total,
      cloudSaved,
      localOnly,
      withNext,
      withTags,
      withEntities,
      withEvidence,
      withActionResult,
      exportReady,
      booksWithPages,
      latest,
      daysSinceLatest,
      score,
      dimensions,
      invariants: [
        ["모든 기록은 책 ID, 생성일, 스키마 버전, 무결성 해시를 가진다", validSchema === total, `${validSchema}/${total || 0}`],
        ["DB 동기화 대기 항목을 눈에 보이게 남긴다", localOnly === 0, localOnly ? `${localOnly}개 재시도 필요` : "대기 없음"],
        ["AI 반출은 체크한 비식별 요약만 포함한다", true, `${exportReady}개만 AI 패킷 후보`],
        ["각 책은 원문 저장소가 아니라 판단 재료 저장소다", true, "요약·근거·다음 행동 중심"],
        ["장기 파일은 D1이 아니라 R2/D드라이브 백업으로 분리한다", true, `D1은 DB당 ${BOOKSHELF_D1_LIMIT_GB}GB 운영 한도 기준`]
      ]
    };
  }

  function daysSince(value) {
    if (!value) return null;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return null;
    return Math.max(0, Math.floor((Date.now() - date.getTime()) / 86400000));
  }

  function freshnessText(value) {
    const days = daysSince(value);
    if (days === null) return "기록 없음";
    if (days === 0) return "오늘";
    if (days === 1) return "어제";
    return `${days}일 전`;
  }

  function buildIntelBriefing(book, stats) {
    const audit = buildBookshelfAudit();
    const latest = [...pages].sort((a, b) => pageSortValue(b).localeCompare(pageSortValue(a)))[0];
    const noEvidence = pages.filter(page => !page.evidence).slice(0, 3);
    const noNext = pages.filter(page => !page.nextAction).slice(0, 3);
    const weakBooks = BOOKSHELF_BOOKS
      .map(item => ({ book: item, stats: getBookStats(item) }))
      .filter(item => item.stats.pages.length)
      .sort((a, b) => a.stats.score - b.stats.score)
      .slice(0, 3);
    const emptyBooks = BOOKSHELF_BOOKS.filter(item => !pagesForBook(item.id).length).slice(0, 3);
    const status = [
      {
        state: audit.localOnly ? "warn" : "ok",
        label: "DB SYNC",
        value: audit.localOnly ? `${audit.localOnly} 대기` : "CLEAR",
        detail: audit.localOnly ? "Cloudflare D1 재시도가 필요합니다." : remoteState
      },
      {
        state: audit.score >= 80 ? "ok" : audit.score >= 55 ? "warn" : "hot",
        label: "DATA QUALITY",
        value: `${audit.score}`,
        detail: audit.score >= 80 ? "AI에게 넘길 구조가 안정적입니다." : "근거, 태그, 다음 행동을 더 채우면 강해집니다."
      },
      {
        state: stats.score >= 80 ? "ok" : stats.pages.length ? "warn" : "hot",
        label: "ACTIVE BOOK",
        value: `${stats.score}`,
        detail: `${book.title} · ${stats.pages.length}쪽 · ${stats.suggestion}`
      },
      {
        state: audit.exportReady ? "ok" : "warn",
        label: "AI EXPORT",
        value: `${audit.exportReady}`,
        detail: audit.exportReady ? "비식별 요약 패킷 후보가 있습니다." : "AI 공개 가능한 요약을 최소 1개 체크하세요."
      }
    ];
    const missions = [
      audit.localOnly
        ? ["D1 동기화", `${audit.localOnly}개 로컬 저장 페이지를 Cloudflare D1에 재시도`, "retry-sync"]
        : ["상태 유지", "새 기록을 저장한 뒤 근거와 다음 행동을 바로 채우기", "focus-capture"],
      noNext.length
        ? ["열린 루프 닫기", `${noNext[0].title} 페이지에 다음 행동 추가`, "focus-capture"]
        : ["새 관찰 기록", `${book.title}에 오늘의 관찰/결정 1개 저장`, "focus-capture"],
      noEvidence.length
        ? ["근거 보강", `${noEvidence[0].title} 페이지에 출처·측정값·사실을 분리`, "focus-capture"]
        : ["AI 패킷 점검", "AI에게 보여줄 수 있는 요약 패킷을 복사해 검토", "copy-ai"]
    ];
    const queues = [
      ...noNext.map(page => [`NEXT`, page.title, "다음 행동 없음"]),
      ...noEvidence.map(page => [`EVID`, page.title, "근거/출처 없음"]),
      ...weakBooks.map(item => [`BOOK`, item.book.title, `정리도 ${item.stats.score}`]),
      ...emptyBooks.map(item => [`EMPTY`, item.title, "첫 페이지 필요"])
    ].slice(0, 6);
    return { audit, latest, status, missions, queues };
  }

  function renderIntelBriefingPanel(book, stats) {
    const briefing = buildIntelBriefing(book, stats);
    return `
      <section class="intel-briefing-panel" aria-label="정보실 브리핑">
        <div class="intel-briefing-head">
          <div>
            <p class="eyebrow">INTELLIGENCE BRIEFING</p>
            <h2>지금 처리해야 할 신호만 위로 올림</h2>
            <p>저장 상태, 데이터 품질, 활성 책, AI 반출 가능성을 한 화면에서 보고 바로 행동합니다.</p>
          </div>
          <div class="intel-live-tile">
            <span>LAST EVENT</span>
            <strong>${escapeHtml(freshnessText(briefing.latest?.createdAt || briefing.latest?.updatedAt))}</strong>
            <small>${escapeHtml(briefing.latest?.title || "기록 대기")}</small>
          </div>
        </div>
        <div class="intel-status-grid">
          ${briefing.status.map(item => `
            <article class="intel-status-card ${escapeHtml(item.state)}">
              <span>${escapeHtml(item.label)}</span>
              <strong>${escapeHtml(item.value)}</strong>
              <small>${escapeHtml(item.detail)}</small>
            </article>
          `).join("")}
        </div>
        <div class="intel-mission-grid">
          ${briefing.missions.map(([title, detail, action]) => `
            <button class="intel-mission-card" type="button" data-command-action="${escapeHtml(action)}">
              <span>${escapeHtml(title)}</span>
              <strong>${escapeHtml(detail)}</strong>
            </button>
          `).join("")}
        </div>
        <div class="intel-queue">
          <div>
            <strong>분석 대기열</strong>
            <p>방치하면 검색성과 AI 분석 품질을 떨어뜨리는 항목입니다.</p>
          </div>
          ${briefing.queues.length ? briefing.queues.map(([tag, title, detail]) => `
            <span><b>${escapeHtml(tag)}</b>${escapeHtml(title)}<small>${escapeHtml(detail)}</small></span>
          `).join("") : `<span><b>CLEAR</b>즉시 조치할 대기열 없음<small>새 기록을 추가하면 다시 점검합니다.</small></span>`}
        </div>
        <div class="intel-action-row">
          <button class="primary" type="button" data-command-action="focus-capture">새 기록 입력</button>
          <button class="secondary" type="button" data-command-action="retry-sync">DB 재시도</button>
          <button class="secondary" type="button" data-command-action="copy-ai">AI 패킷 복사</button>
          <button class="secondary" type="button" data-open-book-view="${escapeHtml(book.linkedViews[0] || "thinktank")}">활성 책 열기</button>
        </div>
      </section>
    `;
  }

  function buildBookshelfExport() {
    const audit = buildBookshelfAudit();
    return {
      schema: BOOKSHELF_EXPORT_VERSION,
      generatedAt: new Date().toISOString(),
      title: "인생 정보실 백업",
      rules: {
        primaryStore: "Cloudflare D1",
        localCache: "browser localStorage",
        filePolicy: "큰 원문 파일은 D1에 넣지 않고 R2 또는 D드라이브 백업으로 분리",
        aiPolicy: "aiExportOk=true인 비식별 요약만 AI 분석 패킷 후보로 사용"
      },
      audit,
      knowledgeGraph: buildKnowledgeGraph(),
      todayAgenda: buildTodayAgenda(),
      localSignals: {
        english: localEnglishInsight(),
        cognitive: localCognitiveInsight(),
        career: localCareerInsight()
      },
      books: BOOKSHELF_BOOKS.map(book => ({
        id: book.id,
        title: book.title,
        shelf: book.shelf,
        privacyLevel: book.privacyLevel,
        purpose: book.purpose,
        pageCount: pagesForBook(book.id).length
      })),
      pages: pages.map(normalizePage)
    };
  }

  function buildMyLifeIntelligencePacket(remoteContext = null) {
    const bookshelfExport = buildBookshelfExport();
    return {
      schema: LIFE_PACKET_SCHEMA_VERSION,
      generatedAt: new Date().toISOString(),
      title: "My Life Intelligence Packet",
      operatingRule: [
        "Use this as structured personal context, not raw private documents.",
        "Separate fact, assumption, risk, action, result, and missing data.",
        "Do not ask for passwords, seed phrases, raw medical documents, customer confidential manuals, or account identifiers.",
        "Return high-signal patterns and the smallest useful next action."
      ],
      storageBoundary: {
        primary: "Cloudflare D1 / ce_data for structured JSON entries",
        localCache: "browser localStorage for offline fallback",
        optionalMirror: "D:\\FEP_EPI_ThinkTank_Vault only when the personal local vault server is running",
        d1Limit: `Cloudflare public docs list ${BOOKSHELF_D1_LIMIT_GB}GB per D1 database; large files should move to R2 or local encrypted storage.`
      },
      safetyBoundary: {
        career: "No recipe, valve sequence, detector setpoint, interlock bypass, customer site-specific procedure, or internal manual content.",
        health: "Not diagnosis or treatment; use summaries for medical consultation preparation.",
        investment: "Research notes only; no buy/sell instruction or financial advice."
      },
      todayAgenda: buildTodayAgenda(),
      knowledgeGraph: bookshelfExport.knowledgeGraph,
      bookshelf: {
        audit: bookshelfExport.audit,
        books: bookshelfExport.books,
        exportApprovedPages: bookshelfExport.pages.filter(page => page.aiExportOk)
      },
      localSignals: bookshelfExport.localSignals,
      remoteContext: remoteContext || null
    };
  }

  function renderKnowledgeGraphPanel() {
    const graph = buildKnowledgeGraph();
    const agenda = buildTodayAgenda();
    const english = localEnglishInsight();
    const cognitive = localCognitiveInsight();
    const career = localCareerInsight();
    const entityPreview = graph.nodes.filter(node => node.type === "entity").slice(0, 10);
    return `
      <section class="knowledge-graph-panel" aria-label="개인 지식 그래프">
        <div class="knowledge-graph-head">
          <div>
            <p class="eyebrow">Personal Knowledge Graph</p>
            <h2>모든 책의 기록을 하나의 AI 분석 구조로 연결</h2>
            <p>각 기록은 책, 챕터, 주제, 태그, entities, 근거, 실행, 결과, 다음 행동으로 정규화됩니다. 나중에 AI에게 넘길 때 이 그래프가 “나의 패턴”을 읽는 색인이 됩니다.</p>
          </div>
          <div class="knowledge-score-ring">
            <span>GRAPH</span>
            <strong>${graph.counts.nodes}</strong>
            <small>${graph.counts.edges} links</small>
          </div>
        </div>
        <div class="knowledge-agenda-grid">
          ${agenda.map(item => `
            <article>
              <span>${escapeHtml(item.lane)}</span>
              <strong>${escapeHtml(item.action)}</strong>
              <small>${escapeHtml(item.evidence)}</small>
            </article>
          `).join("")}
        </div>
        <div class="knowledge-signal-grid">
          <article>
            <span>영어 약점</span>
            <strong>${escapeHtml(english.weaknesses[0]?.skill || "데이터 대기")}</strong>
            <small>${english.totalQuestions}문항 · ${english.accuracy}%</small>
          </article>
          <article>
            <span>인지 루틴</span>
            <strong>${cognitive.streak}일</strong>
            <small>${cognitive.sessions}세션 · 최근 ${cognitive.latestScore}점</small>
          </article>
          <article>
            <span>CE 학습</span>
            <strong>${career.quizAccuracy}%</strong>
            <small>${career.quizAttempts}회 퀴즈 · 미션 ${career.missions}</small>
          </article>
          <article>
            <span>Entities</span>
            <strong>${graph.counts.entities}</strong>
            <small>${entityPreview.map(node => node.label).join(", ") || "기록에 관련 대상을 붙이면 채워집니다."}</small>
          </article>
        </div>
        <div class="knowledge-graph-strip" aria-label="지식 그래프 미리보기">
          ${graph.nodes.slice(0, 18).map(node => `
            <span class="node-${escapeHtml(node.type)}"><b>${escapeHtml(node.type)}</b>${escapeHtml(node.label)}</span>
          `).join("")}
        </div>
        <div class="knowledge-actions">
          <button class="primary" type="button" data-command-action="copy-life-packet">My Life Packet 복사</button>
          <button class="secondary" type="button" data-command-action="focus-capture">구조화 기록 추가</button>
          <button class="secondary" type="button" data-command-action="open-ai-desk">AI 브리핑 책 열기</button>
          <span class="copy-status" id="life-packet-copy-status"></span>
        </div>
      </section>
    `;
  }

  function downloadBookshelfExport() {
    const packet = buildBookshelfExport();
    const blob = new Blob([JSON.stringify(packet, null, 2)], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `life-bookshelf-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  function renderLifetimeOpsPanel() {
    const audit = buildBookshelfAudit();
    const freshness = audit.daysSinceLatest === null ? "기록 없음" : audit.daysSinceLatest === 0 ? "오늘" : `${audit.daysSinceLatest}일 전`;
    return `
      <section class="lifetime-ops-panel" aria-label="평생 운영 패널">
        <div class="lifetime-ops-head">
          <div>
            <p class="eyebrow">평생 운영 패널</p>
            <h2>저장, 동기화, AI 반출을 한 번에 점검</h2>
            <p>수집 → 정규화 → 근거 분리 → 다음 행동 → AI 요약 → 백업의 루프가 유지되는지 확인합니다. 이 패널은 책장이 커질수록 스스로 약한 부분을 드러내는 계기판입니다.</p>
          </div>
          <div class="lifetime-score">
            <span>운영 점수</span>
            <strong>${audit.score}</strong>
            <small>최근 기록: ${escapeHtml(freshness)}</small>
          </div>
        </div>
        <div class="lifetime-actions">
          <button class="primary" type="button" id="bookshelf-retry-sync">DB 동기화 재시도</button>
          <button class="secondary" type="button" id="bookshelf-download-export">책장 JSON 백업</button>
          <button class="secondary" type="button" id="bookshelf-copy-export">AI/백업 패킷 복사</button>
          <span class="copy-status" id="bookshelf-export-copy-status"></span>
        </div>
        <div class="lifetime-metric-grid">
          ${audit.dimensions.map(([label, value, detail]) => `
            <article>
              <span>${escapeHtml(label)}</span>
              <strong>${value}%</strong>
              <i><em style="width:${value}%"></em></i>
              <small>${escapeHtml(detail)}</small>
            </article>
          `).join("")}
        </div>
        <div class="lifetime-invariants">
          <div>
            <strong>수학적 운영 규칙</strong>
            <p>완벽을 주장하지 않고, 검증 가능한 불변조건을 계속 만족시키는 방식으로 안정성을 올립니다.</p>
          </div>
          ${audit.invariants.map(([label, ok, detail]) => `
            <span class="${ok ? "ok" : "warn"}"><b>${ok ? "OK" : "점검"}</b>${escapeHtml(label)}<small>${escapeHtml(detail)}</small></span>
          `).join("")}
        </div>
      </section>
    `;
  }

  function renderLibraryOverview(activeBook) {
    const stats = libraryStats();
    const activeStats = getBookStats(activeBook);
    return `
      <section class="library-command">
        <div class="library-command-copy">
          <p class="eyebrow">인생 정보실</p>
          <h2>필요한 삶의 영역을 책처럼 꺼내 쓰는 공간</h2>
          <p>필요한 책을 먼저 고르고, 기록은 요약-근거-다음 행동-AI 공개 범위로 쌓습니다. 나중에 AI에게 보여줄 때도 원문이 아니라 구조화된 판단 재료만 넘기도록 설계했습니다.</p>
        </div>
        <div class="library-command-grid" aria-label="책장 현황">
          <span><strong>${stats.books}</strong> 권의 책</span>
          <span><strong>${stats.pages}</strong> 저장 페이지</span>
          <span><strong>${stats.exportReady}</strong> AI 공개 가능</span>
          <span><strong>${stats.overallScore}</strong> 정리도</span>
        </div>
      </section>
      ${renderIntelBriefingPanel(activeBook, activeStats)}
      ${renderKnowledgeGraphPanel()}
      ${renderLifetimeOpsPanel()}
      <section class="library-overview" aria-label="전체 책장">
        <div class="panel-title-row">
          <div>
            <p class="eyebrow">책 선택</p>
            <h2>오늘 다룰 책 선택</h2>
          </div>
          <span class="sync-pill">${escapeHtml(activeBook.shelf)} 책칸</span>
        </div>
        <div class="library-book-grid">
          ${BOOKSHELF_BOOKS.map(book => {
            const bookStats = getBookStats(book);
            const count = bookStats.pages.length;
            return `
              <button class="library-book-card ${book.id === activeBook.id ? "active" : ""}" type="button" data-book-card="${escapeHtml(book.id)}">
                <span class="book-card-code">${escapeHtml(book.code)}</span>
                <strong>${escapeHtml(book.title)}</strong>
                <small>${escapeHtml(book.subtitle)}</small>
                <i>${escapeHtml(book.shelf)} · ${escapeHtml(privacyLabel(book.privacyLevel))}</i>
                <em>${count}쪽 · 최근 ${escapeHtml(freshnessText(bookStats.latest?.createdAt || bookStats.latest?.updatedAt))}</em>
                <b>${escapeHtml(todayActionForBook(book, bookStats))}</b>
              </button>
            `;
          }).join("")}
        </div>
      </section>
    `;
  }

  function renderBookDetail() {
    const book = currentBook();
    const stats = getBookStats(book);
    const detail = document.querySelector("#bookshelf-detail");
    if (!detail) return;
    detail.innerHTML = `
      ${renderLibraryOverview(book)}
      <article class="book-detail">
        <div class="book-detail-head">
          <span class="book-code">${escapeHtml(book.code)}</span>
          <div>
            <p class="eyebrow">${escapeHtml(book.shelf)} / ${escapeHtml(privacyLabel(book.privacyLevel))}</p>
            <h2>${escapeHtml(book.title)}</h2>
            <p>${escapeHtml(book.subtitle)}</p>
          </div>
        </div>
        <div class="book-flow-map" aria-label="기록 흐름">
          <span><b>1</b> 책 선택</span>
          <span><b>2</b> 요약 기록</span>
          <span><b>3</b> 근거 분리</span>
          <span><b>4</b> 다음 행동</span>
          <span><b>5</b> AI 공개 판단</span>
        </div>
        <div class="book-open-actions">
          <button class="primary" type="button" data-open-book-view="${escapeHtml(book.linkedViews[0] || "thinktank")}">이 책 열기</button>
          ${book.linkedViews.slice(1, 5).map(view => `<button class="secondary" type="button" data-open-book-view="${escapeHtml(view)}">${escapeHtml(viewLabel(view))}</button>`).join("")}
        </div>
        <section class="book-health-panel" aria-label="책 데이터 건강도">
          <div class="book-health-score">
            <span>정리도</span>
            <strong>${stats.score}</strong>
            <i><em style="width:${stats.score}%"></em></i>
          </div>
          <div class="book-health-grid">
            <span><strong>${stats.pages.length}</strong>쪽</span>
            <span><strong>${stats.aiReady}</strong> AI 공개</span>
            <span><strong>${stats.nextReady}</strong> 다음 행동</span>
            <span><strong>${formatDateLabel(stats.latest?.createdAt)}</strong> 최근 기록</span>
          </div>
          <p>${escapeHtml(stats.suggestion)}</p>
        </section>
        ${renderBookInterior(book)}
        <p class="book-purpose">${escapeHtml(book.purpose)}</p>
        <div class="book-meta-grid">
          <section>
            <h3>저장해도 좋은 것</h3>
            ${listItems(book.allowed)}
          </section>
          <section class="do-not-store">
            <h3>이 책장에 넣지 말 것</h3>
            ${listItems(book.neverStore)}
          </section>
          <section>
            <h3>페이지 템플릿</h3>
            ${listItems(book.pageTypes)}
          </section>
          <section>
            <h3>AI에게 맡길 수 있는 일</h3>
            ${listItems(book.aiUse)}
          </section>
        </div>
        <div class="starter-strip">
          ${book.starterQuestions.map(question => `<button type="button" data-starter-question="${escapeHtml(question)}">${escapeHtml(question)}</button>`).join("")}
        </div>
        ${stats.missingNext.length ? `
          <div class="book-review-queue">
            <strong>닫아야 할 열린 루프</strong>
            ${stats.missingNext.map(page => `<span>${escapeHtml(page.title || "제목 없는 페이지")} · 다음 행동 없음</span>`).join("")}
          </div>
        ` : ""}
      </article>
    `;
    detail.querySelectorAll("[data-book-card]").forEach(button => {
      button.addEventListener("click", () => {
        activeBookId = button.dataset.bookCard;
        localStorage.setItem(ACTIVE_BOOK_KEY, activeBookId);
        renderBookshelf();
      });
    });
    detail.querySelectorAll("[data-open-book-view]").forEach(button => {
      button.addEventListener("click", () => {
        const view = button.dataset.openBookView;
        if (window.showView) window.showView(view);
        else document.querySelector(`[data-view="${view}"]`)?.click();
      });
    });
    detail.querySelectorAll("[data-starter-question]").forEach(button => {
      button.addEventListener("click", () => {
        document.querySelector("#bookshelf-title")?.focus();
        const title = document.querySelector("#bookshelf-title");
        const summary = document.querySelector("#bookshelf-summary");
        if (title && !title.value) title.value = "질문에서 시작한 페이지";
        if (summary && !summary.value) summary.value = button.dataset.starterQuestion;
      });
    });
    detail.querySelectorAll("[data-command-action]").forEach(button => {
      button.addEventListener("click", () => {
        const action = button.dataset.commandAction;
        if (action === "focus-capture") {
          document.querySelector("#bookshelf-title")?.scrollIntoView({ behavior: "smooth", block: "center" });
          document.querySelector("#bookshelf-title")?.focus();
        }
        if (action === "retry-sync") retryUnsyncedPages();
        if (action === "copy-ai") {
          copyText(JSON.stringify(buildBookshelfExport(), null, 2), "#bookshelf-export-copy-status");
        }
        if (action === "copy-life-packet") {
          copyText(JSON.stringify(buildMyLifeIntelligencePacket(), null, 2), "#life-packet-copy-status");
        }
        if (action === "open-ai-desk") {
          activeBookId = "ai-briefing-desk";
          localStorage.setItem(ACTIVE_BOOK_KEY, activeBookId);
          renderBookshelf();
        }
      });
    });
    detail.querySelector("#bookshelf-retry-sync")?.addEventListener("click", () => retryUnsyncedPages());
    detail.querySelector("#bookshelf-download-export")?.addEventListener("click", downloadBookshelfExport);
    detail.querySelector("#bookshelf-copy-export")?.addEventListener("click", () => {
      copyText(JSON.stringify(buildBookshelfExport(), null, 2), "#bookshelf-export-copy-status");
    });
    detail.querySelector("#dyor-refresh-crypto")?.addEventListener("click", loadCryptoSnapshot);
    detail.querySelector("#onchain-refresh-intel")?.addEventListener("click", () => loadOnchainIntel());
    detail.querySelector("#onchain-toggle-monitor")?.addEventListener("click", toggleOnchainMonitor);
    detail.querySelector("#tokenization-refresh-intel")?.addEventListener("click", loadTokenizationIntel);
    detail.querySelector("#tokenization-toggle-monitor")?.addEventListener("click", toggleTokenizationMonitor);
  }

  function renderCapture() {
    const book = currentBook();
    const capture = document.querySelector("#bookshelf-capture");
    if (!capture) return;
    const bookPages = pages.filter(page => page.bookId === book.id).slice(0, 8);
    const briefing = buildBriefing(book);

    capture.innerHTML = `
      <section class="bookshelf-workspace">
        <article class="capture-panel">
          <div class="panel-title-row">
            <div>
              <p class="eyebrow">새 페이지</p>
              <h2>새 페이지 저장</h2>
            </div>
            <span class="sync-pill">${escapeHtml(remoteState)}</span>
          </div>
          <form class="bookshelf-form" id="bookshelf-form">
            <div class="bookshelf-capture-grid">
              <label>
                제목
                <input id="bookshelf-title" maxlength="90" required placeholder="예: 6월 설치 준비 회고, 가족 병원 질문 목록" />
              </label>
              <label>
                페이지 종류
                <select id="bookshelf-page-type">
                  ${book.pageTypes.map(type => `<option>${escapeHtml(type)}</option>`).join("")}
                </select>
              </label>
              <label>
                챕터/영역
                <input id="bookshelf-chapter" maxlength="80" placeholder="예: Install, Gas safety, 가족 건강" />
              </label>
              <label>
                주제
                <input id="bookshelf-topic" maxlength="120" placeholder="예: pumpdown 지연, 영어 if/unless, 혈압 추적" />
              </label>
              <label>
                민감도
                <select id="bookshelf-privacy">
                  <option value="private-summary">개인 요약</option>
                  <option value="sensitive-summary">민감 요약</option>
                  <option value="sensitive-index">민감 색인만</option>
                  <option value="work-learning">직무 학습</option>
                  <option value="controlled-export">AI 반출 관리</option>
                </select>
              </label>
              <label>
                태그
                <input id="bookshelf-tags" placeholder="예: 설치, 영어, 건강" />
              </label>
              <label>
                Entities
                <input id="bookshelf-entities" placeholder="예: Centura, Load Lock, Ethereum, 병원명" />
              </label>
            </div>
            <label>
              요약
              <textarea id="bookshelf-summary" required placeholder="원문 전체가 아니라 핵심 상황, 배경, 판단 근거만 적습니다."></textarea>
            </label>
            <label>
              근거/출처
              <textarea id="bookshelf-evidence" placeholder="내가 직접 본 사실, 공개 링크, 측정값, 대화 요약, 판단을 뒷받침하는 근거를 분리해 적습니다."></textarea>
            </label>
            <div class="bookshelf-capture-grid">
              <label>
                실행/조치
                <textarea id="bookshelf-action" placeholder="내가 한 행동, 하기로 한 행동, 확인 요청, 학습 조치"></textarea>
              </label>
              <label>
                결과/배운 점
                <textarea id="bookshelf-result" placeholder="결과, 바뀐 판단, 재발 방지, 배운 점"></textarea>
              </label>
            </div>
            <label>
              다음 행동
              <textarea id="bookshelf-next-action" placeholder="다음 확인, 질문, 실험, 병원/전문가 상담, 재검토 날짜 등을 적습니다."></textarea>
            </label>
            <label class="bookshelf-checkline">
              <input id="bookshelf-ai-export" type="checkbox" />
              AI 분석 패킷에 포함해도 되는 비식별 요약이다
            </label>
            <div class="thinktank-actions">
              <button class="primary" type="submit">책장에 저장</button>
              <button class="secondary" id="bookshelf-refresh" type="button">DB에서 다시 불러오기</button>
            </div>
          </form>
        </article>

        <article class="capture-panel">
          <div class="panel-title-row">
            <div>
              <p class="eyebrow">최근 페이지</p>
              <h2>최근 저장된 페이지</h2>
            </div>
            <span class="sync-pill">${bookPages.length}쪽</span>
          </div>
          <div class="bookshelf-page-list">
            ${bookPages.length ? bookPages.map(renderPageCard).join("") : `<p class="empty-note">아직 이 책에 저장된 페이지가 없습니다. 첫 페이지는 작게 시작하면 됩니다.</p>`}
          </div>
        </article>

        <article class="capture-panel ai-briefing-panel">
          <div class="panel-title-row">
            <div>
              <p class="eyebrow">AI 요약 패킷</p>
              <h2>나중에 AI에게 보여줄 요약 형태</h2>
            </div>
            <button class="secondary" id="bookshelf-copy-briefing" type="button">요약 복사</button>
          </div>
          <textarea readonly class="ai-briefing-text">${escapeHtml(briefing)}</textarea>
          <p class="copy-status" id="bookshelf-briefing-copy-status"></p>
        </article>

        <article class="capture-panel ai-briefing-panel">
          <div class="panel-title-row">
            <div>
              <p class="eyebrow">책장 전체 맥락</p>
              <h2>책장 전체 데이터 통합 패킷</h2>
            </div>
            <div class="thinktank-actions">
              <button class="secondary" id="bookshelf-ai-context-refresh" type="button">AI 패킷 새로고침</button>
              <button class="secondary" id="bookshelf-ai-context-copy" type="button">AI 패킷 복사</button>
            </div>
          </div>
          <p>Cloudflare D1에 쌓인 책장 페이지, 싱크탱크 기록, 영어 오답 기록을 AI가 읽기 쉬운 구조로 요약합니다. 민감 원문이 아니라 요약과 메타데이터 중심으로 사용합니다.</p>
          <div class="ai-context-preview" id="bookshelf-ai-context-preview">아직 불러오지 않았습니다.</div>
          <p class="copy-status" id="bookshelf-ai-context-copy-status"></p>
        </article>
      </section>
    `;

    document.querySelector("#bookshelf-form")?.addEventListener("submit", saveBookPage);
    document.querySelector("#bookshelf-refresh")?.addEventListener("click", pullRemotePages);
    document.querySelector("#bookshelf-ai-context-refresh")?.addEventListener("click", renderAiContextPreview);
    document.querySelector("#bookshelf-copy-briefing")?.addEventListener("click", () => copyText(briefing, "#bookshelf-briefing-copy-status"));
    document.querySelector("#bookshelf-ai-context-copy")?.addEventListener("click", () => copyText(latestAiPacketText, "#bookshelf-ai-context-copy-status"));
  }

  async function renderAiContextPreview() {
    const target = document.querySelector("#bookshelf-ai-context-preview");
    if (!target) return;
    target.textContent = "D1에서 AI 통합 패킷을 불러오는 중...";
    try {
      const data = await apiFetch("/api/ai-context");
      const context = data.context || {};
      const packet = buildMyLifeIntelligencePacket(context);
      latestAiPacketText = JSON.stringify(packet, null, 2);
      const counts = Object.entries(context.countsByType || {});
      const books = context.bookshelf || [];
      const english = context.english || {};
      const agenda = packet.todayAgenda || [];
      const topWeakness = english.weaknesses?.[0];
      const recent = (context.recentItems || []).slice(0, 5);
      target.innerHTML = `
        <div class="ai-context-readout">
          <article>
            <span>기록</span>
            <strong>${counts.reduce((sum, [, count]) => sum + Number(count || 0), 0)}</strong>
            <small>${counts.map(([type, count]) => `${escapeHtml(type)} ${count}`).join(" · ") || "아직 D1 기록 없음"}</small>
          </article>
          <article>
            <span>책</span>
            <strong>${books.length}</strong>
            <small>${books.slice(0, 3).map(book => `${escapeHtml(book.bookTitle || book.bookId)} ${book.pages || 0}쪽`).join(" · ") || "책장 페이지 대기"}</small>
          </article>
          <article>
            <span>영어</span>
            <strong>${english.accuracy ?? 0}%</strong>
            <small>${topWeakness ? `${escapeHtml(topWeakness.skill)} 우선 보강` : "영어 오답 데이터 대기"}</small>
          </article>
          <article>
            <span>Graph</span>
            <strong>${packet.knowledgeGraph?.counts?.nodes || 0}</strong>
            <small>${packet.knowledgeGraph?.counts?.edges || 0} links · ${packet.knowledgeGraph?.counts?.entities || 0} entities</small>
          </article>
        </div>
        <div class="ai-context-recent">
          <strong>오늘 추천 action</strong>
          ${agenda.map(item => `<span>${escapeHtml(item.lane)} · ${escapeHtml(item.action)}</span>`).join("")}
        </div>
        <div class="ai-context-recent">
          <strong>최근 AI 재료</strong>
          ${recent.length ? recent.map(item => `
            <span>${escapeHtml(item.type || "기록")} · ${escapeHtml(item.title || item.subsystem || "제목 없음")}</span>
          `).join("") : `<span>아직 최근 항목이 없습니다.</span>`}
        </div>
        <details class="ai-context-json">
          <summary>구조화 JSON 보기</summary>
          <pre>${escapeHtml(latestAiPacketText)}</pre>
        </details>
      `;
    } catch {
      latestAiPacketText = "";
      target.textContent = "AI 통합 패킷을 불러오지 못했습니다. 로그인 상태와 D1 연결을 확인하세요.";
    }
  }

  function renderPageCard(page) {
    return `
      <article class="bookshelf-page-card">
        <header>
          <div>
            <h3>${escapeHtml(page.title || "제목 없는 페이지")}</h3>
            <small>${escapeHtml(page.pageType || "페이지")} / ${escapeHtml(page.chapter || "챕터 미지정")} / ${escapeHtml(privacyLabel(page.privacyLevel || "private-summary"))}</small>
          </div>
          <span>${escapeHtml(syncLabel(page.syncStatus))}</span>
        </header>
        <div class="page-kg-line">
          <span>Topic: ${escapeHtml(page.topic || page.title || "")}</span>
          <span>Date: ${escapeHtml(page.date || "")}</span>
        </div>
        <p>${escapeHtml(page.summary || "")}</p>
        ${page.evidence ? `<small class="page-evidence">근거: ${escapeHtml(page.evidence)}</small>` : ""}
        ${page.action ? `<small class="page-evidence">실행: ${escapeHtml(page.action)}</small>` : ""}
        ${page.result ? `<small class="page-evidence">결과: ${escapeHtml(page.result)}</small>` : ""}
        ${page.nextAction || page.nextStep ? `<strong>다음: ${escapeHtml(page.nextAction || page.nextStep)}</strong>` : ""}
        <div class="entry-tags">${(page.tags || []).map(tag => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
        ${page.entities?.length ? `<div class="entry-tags entity-tags">${page.entities.map(entity => `<span>${escapeHtml(entity)}</span>`).join("")}</div>` : ""}
      </article>
    `;
  }

  function buildBriefing(book) {
    const exportPages = pages
      .filter(page => page.bookId === book.id && page.aiExportOk)
      .slice(0, 10)
      .map((page, index) => `${index + 1}. ${page.title} | ${page.chapter}/${page.topic} | ${page.pageType} | ${page.summary}${page.evidence ? ` | 근거: ${page.evidence}` : ""}${page.action ? ` | 실행: ${page.action}` : ""}${page.result ? ` | 결과: ${page.result}` : ""}${page.nextAction || page.nextStep ? ` | 다음: ${page.nextAction || page.nextStep}` : ""}${page.entities?.length ? ` | entities: ${page.entities.join(", ")}` : ""}`);

    return [
      `책: ${book.title}`,
      `목적: ${book.purpose}`,
      `개인정보 규칙: 원시 식별자, 비밀번호, 계좌번호, 의료 원문, 제3자 기밀정보를 추론하거나 요구하지 말 것.`,
      `AI에게 맡길 수 있는 일: ${book.aiUse.join("; ")}`,
      `점검 주기: ${book.reviewCadence}`,
      "",
      "AI 공개 허용 페이지:",
      exportPages.length ? exportPages.join("\n") : "아직 AI 공개 허용 페이지가 없습니다.",
      "",
      "AI에게 요청할 것: 반복 패턴, 위험, blind spot, 다음 7일 행동, 아직 부족한 데이터."
    ].join("\n");
  }

  async function saveBookPage(event) {
    event.preventDefault();
    const book = currentBook();
    const tags = document.querySelector("#bookshelf-tags").value
      .split(",")
      .map(tag => tag.trim())
      .filter(Boolean)
      .slice(0, 12);
    const entities = document.querySelector("#bookshelf-entities").value
      .split(/[,，\n]/)
      .map(entity => entity.trim())
      .filter(Boolean)
      .slice(0, 16);

    const page = {
      id: `bookshelf-${uid()}`,
      type: "Personal Bookshelf Page",
      subsystem: book.title,
      severity: document.querySelector("#bookshelf-privacy").value,
      title: document.querySelector("#bookshelf-title").value.trim(),
      pageType: document.querySelector("#bookshelf-page-type").value,
      chapter: document.querySelector("#bookshelf-chapter").value.trim() || document.querySelector("#bookshelf-page-type").value,
      topic: document.querySelector("#bookshelf-topic").value.trim() || document.querySelector("#bookshelf-title").value.trim(),
      privacyLevel: document.querySelector("#bookshelf-privacy").value,
      summary: document.querySelector("#bookshelf-summary").value.trim(),
      evidence: document.querySelector("#bookshelf-evidence").value.trim(),
      action: document.querySelector("#bookshelf-action").value.trim(),
      result: document.querySelector("#bookshelf-result").value.trim(),
      nextAction: document.querySelector("#bookshelf-next-action").value.trim(),
      nextStep: document.querySelector("#bookshelf-next-action").value.trim(),
      tags,
      entities,
      aiExportOk: document.querySelector("#bookshelf-ai-export").checked,
      bookId: book.id,
      bookTitle: book.title,
      source: "인생 정보실",
      createdAt: new Date().toISOString(),
      syncStatus: "local saved"
    };

    mergePages([page]);
    event.target.reset();
    renderBookshelf();
    await pushPageToVault(page);
  }

  function renderBookshelf() {
    if (!document.querySelector("#bookshelf")) return;
    renderRail();
    renderBookDetail();
    renderCapture();
  }

  window.ProjectUniverseBookshelf = {
    books: BOOKSHELF_BOOKS,
    getPages: () => [...pages],
    render: renderBookshelf,
    pullRemote: pullRemotePages,
    retrySync: retryUnsyncedPages,
    buildLifePacket: buildMyLifeIntelligencePacket
  };

  document.addEventListener("DOMContentLoaded", () => {
    renderBookshelf();
    if (document.body.classList.contains("auth-unlocked")) pullRemotePages();
  });
})();
