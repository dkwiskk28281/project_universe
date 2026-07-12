(() => {
  const root = document.querySelector("#cognitive-root");
  if (!root) return;

  const STORAGE_KEY = "projectUniverseCognitiveResilienceV1";
  const colors = {
    red: { label: "빨강", swatch: "#ff6b73" },
    blue: { label: "파랑", swatch: "#52a8ff" },
    green: { label: "초록", swatch: "#42e68b" },
    yellow: { label: "노랑", swatch: "#ffd166" }
  };

  const wordBanks = [
    ["유리컵", "소나무", "기차표", "감자", "구름", "열쇠", "바늘", "우산"],
    ["호수", "달력", "연필", "토마토", "계단", "조개", "라디오", "목도리"],
    ["버스", "신문", "자전거", "사과", "시계", "창문", "편지", "국자"],
    ["바다", "장갑", "책상", "양파", "지도", "촛불", "가방", "모래"]
  ];

  const sequenceSets = [
    {
      prompt: "1-A-2-B-3-C 다음에 오는 두 묶음은?",
      answer: "4-D-5-E",
      hint: "숫자는 1씩, 알파벳은 A부터 하나씩 번갈아 증가합니다."
    },
    {
      prompt: "월-2-화-4-수-6 다음에 오는 두 묶음은?",
      answer: "목-8-금-10",
      hint: "요일은 하루씩, 숫자는 2씩 증가합니다."
    },
    {
      prompt: "3-C-6-F-9-I 다음에 오는 두 묶음은?",
      answer: "12-L-15-O",
      hint: "숫자와 알파벳 순서가 각각 3칸씩 이동합니다."
    },
    {
      prompt: "가-1-나-3-다-5 다음에 오는 두 묶음은?",
      answer: "라-7-마-9",
      hint: "한글 순서와 홀수가 번갈아 증가합니다."
    }
  ];

  const movementChecks = [
    ["walk", "제자리 걷기 90초", "숨이 조금 찰 정도로만 올립니다."],
    ["strength", "의자 스쿼트 또는 앉았다 일어서기 8회", "통증이 있으면 범위를 줄이거나 중단합니다."],
    ["balance", "벽 가까이에서 한 발 서기 좌우 20초", "넘어질 위험이 있으면 잡고 수행합니다."]
  ];

  const lifestyleChecks = [
    ["sleep", "수면 7시간 전후 또는 낮잠 과다 없음", "수면은 기억 고정과 주의력의 기반입니다."],
    ["social", "대화, 전화, 메시지, 공동 활동 1회", "사회적 고립은 주요 조절 가능 위험요인으로 다뤄집니다."],
    ["hearing", "청각 불편/이명/대화 놓침 점검", "청각 문제는 방치하지 않고 검사를 연결합니다."],
    ["vascular", "혈압, 혈당, 흡연, 음주, 체중 관리 중 1개 확인", "혈관 건강은 뇌 건강의 핵심 축입니다."],
    ["food", "채소/단백질/수분을 의식한 식사", "단일 식품보다 지속 가능한 식습관이 중요합니다."],
    ["learn", "새로운 단어, 개념, 기술 1개 회상", "새 학습과 회상은 인지 예비능을 자극합니다."]
  ];

  const categoryPrompts = [
    { id: "animals", title: "동물", examples: ["고양이", "독수리", "고래"] },
    { id: "kitchen", title: "부엌에서 쓰는 물건", examples: ["국자", "도마", "프라이팬"] },
    { id: "places", title: "도시 안 장소", examples: ["도서관", "시장", "병원"] },
    { id: "foods", title: "채소와 과일", examples: ["시금치", "사과", "당근"] },
    { id: "tools", title: "손으로 쓰는 도구", examples: ["드라이버", "망치", "줄자"] },
    { id: "verbs", title: "몸으로 하는 동작", examples: ["걷기", "돌리기", "들기"] }
  ];

  const routeSets = [
    ["현관", "우체국", "약국", "공원", "서점", "카페"],
    ["집", "버스정류장", "병원", "마트", "은행", "도서관"],
    ["주차장", "엘리베이터", "접수대", "검사실", "수납창구", "출구"],
    ["부엌", "거실", "베란다", "서재", "욕실", "침실"],
    ["로비", "보안 게이트", "탈의실", "복도", "회의실", "휴게실"]
  ];

  const planningScenarios = [
    "내일 오전에 병원 예약, 운동 20분, 장보기까지 해야 합니다. 순서를 3단계로 짜세요.",
    "오늘 피곤하지만 인지훈련, 식사 준비, 가족 연락을 모두 해야 합니다. 가장 작은 실행 순서를 짜세요.",
    "새로운 영어 단어 5개, 산책, 수면 준비를 놓치지 않으려면 저녁 루틴을 어떻게 묶을까요?",
    "검사 결과를 병원에 가져가야 합니다. 전날 준비, 당일 이동, 진료 후 기록을 3단계로 나누세요."
  ];

  const cognitiveTaskPool = ["stroop", "memory", "sequence", "category", "nback", "route", "planning"];
  const taskMeta = {
    movement: {
      label: "몸 깨우기",
      title: "운동 보호요인 3분",
      subtitle: "가벼운 유산소, 근력, 균형을 안전하게 묶습니다.",
      points: 20
    },
    stroop: {
      label: "주의 억제",
      title: "색 이름 무시 훈련",
      subtitle: "글자의 뜻이 아니라 글자 색을 고릅니다.",
      points: 20
    },
    memory: {
      label: "지연 회상",
      title: "8단어 회상",
      subtitle: "짧게 보고 숨긴 뒤, 떠오르는 단어를 적습니다.",
      points: 20
    },
    sequence: {
      label: "전환 사고",
      title: "숫자-문자 전환",
      subtitle: "규칙을 찾아 다음 묶음을 예측합니다.",
      points: 20
    },
    lifestyle: {
      label: "생활 보호막",
      title: "오늘의 보호요인 체크",
      subtitle: "치매 위험을 낮추는 생활 축을 빠르게 점검합니다.",
      points: 20
    },
    category: {
      label: "언어 유창성",
      title: "카테고리 폭발",
      subtitle: "제한 시간처럼 한 범주의 단어를 최대한 많이 꺼냅니다.",
      points: 20
    },
    nback: {
      label: "작업기억",
      title: "2-back 패턴 감지",
      subtitle: "현재 항목이 두 칸 전과 같은 위치를 찾아 작업기억을 자극합니다.",
      points: 20
    },
    route: {
      label: "공간기억",
      title: "오늘의 동선 회상",
      subtitle: "순서가 있는 장소를 보고 숨긴 뒤 경로를 다시 복원합니다.",
      points: 20
    },
    planning: {
      label: "실행기능",
      title: "생활 계획 3단계",
      subtitle: "실제 생활 과제를 순서, 장애물, 다음 행동으로 바꿉니다.",
      points: 20
    }
  };

  const evidenceLinks = [
    {
      title: "Lancet Commission 2024",
      body: "14개 조절 가능 위험요인과 생애주기 접근을 제시합니다.",
      url: "https://www.ucl.ac.uk/news/2024/jul/nearly-half-dementia-cases-could-be-prevented-or-delayed-tackling-14-risk-factors"
    },
    {
      title: "WHO Risk Reduction Guideline",
      body: "신체활동, 금연, 영양, 혈관위험 관리, 인지훈련 등을 권고 수준별로 정리합니다.",
      url: "https://www.who.int/publications/i/item/9789241550543"
    },
    {
      title: "FINGER Multidomain Trial",
      body: "식사, 운동, 인지훈련, 혈관위험 모니터링을 묶은 다영역 접근의 대표 연구입니다.",
      url: "https://pubmed.ncbi.nlm.nih.gov/25771249/"
    },
    {
      title: "U.S. POINTER / Alzheimer's Association",
      body: "복수의 건강 습관을 체계적으로 수행하는 생활중재 접근을 다룹니다.",
      url: "https://www.alz.org/us-pointer/study-results"
    },
    {
      title: "Johns Hopkins / ACTIVE 20-year follow-up",
      body: "2026년 보도된 ACTIVE 장기 추적은 처리속도 훈련과 장기 인지/일상기능 결과의 연관을 다룹니다.",
      url: "https://www.hopkinsmedicine.org/news/newsroom/news-releases/2026/02/cognitive-speed-training-linked-to-lower-dementia-incidence-up-to-20-years-later"
    }
  ];

  let state = loadState();
  ensureToday();

  function todayKey(date = new Date()) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }

  function uid() {
    return Math.random().toString(36).slice(2, 10);
  }

  function hashSeed(text) {
    return text.split("").reduce((sum, char) => ((sum << 5) - sum + char.charCodeAt(0)) | 0, 17);
  }

  function seededPick(items, salt = "") {
    const seed = Math.abs(hashSeed(`${state.today || todayKey()}-${salt}`));
    return items[seed % items.length];
  }

  function seededIndex(length, salt = "") {
    return Math.abs(hashSeed(`${state.today || todayKey()}-${salt}`)) % length;
  }

  function activeTaskOrder() {
    const start = seededIndex(cognitiveTaskPool.length, "task-rotation");
    const rotated = [...cognitiveTaskPool.slice(start), ...cognitiveTaskPool.slice(0, start)];
    return ["movement", ...rotated.slice(0, 3), "lifestyle"];
  }

  function loadState() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      return {
        today: parsed.today || todayKey(),
        startedAt: parsed.startedAt || "",
        taskIndex: Number.isFinite(Number(parsed.taskIndex)) ? Number(parsed.taskIndex) : 0,
        taskData: parsed.taskData && typeof parsed.taskData === "object" ? parsed.taskData : {},
        sessions: Array.isArray(parsed.sessions) ? parsed.sessions.slice(-60) : [],
        streak: Number(parsed.streak || 0),
        remoteStatus: parsed.remoteStatus || "아직 원격 저장 전",
        lastSavedRemoteAt: parsed.lastSavedRemoteAt || ""
      };
    } catch {
      return {
        today: todayKey(),
        startedAt: "",
        taskIndex: 0,
        taskData: {},
        sessions: [],
        streak: 0,
        remoteStatus: "아직 원격 저장 전",
        lastSavedRemoteAt: ""
      };
    }
  }

  function ensureToday() {
    const current = todayKey();
    if (state.today === current) return;
    state = {
      ...state,
      today: current,
      startedAt: "",
      taskIndex: 0,
      taskData: {},
      remoteStatus: "새 날짜 세션 대기",
      lastSavedRemoteAt: ""
    };
    persist();
  }

  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      state.remoteStatus = "브라우저 저장소 사용 불가";
    }
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[char]));
  }

  function getTaskData(key) {
    if (!state.taskData[key]) state.taskData[key] = {};
    return state.taskData[key];
  }

  function buildStroopItems() {
    const keys = Object.keys(colors);
    const seed = Math.abs(hashSeed(state.today));
    return Array.from({ length: 12 }, (_, index) => {
      const wordKey = keys[(seed + index * 3) % keys.length];
      const colorKey = keys[(seed + index * 5 + 1) % keys.length];
      return {
        id: index,
        wordKey,
        colorKey,
        word: colors[wordKey].label,
        color: colors[colorKey].swatch
      };
    });
  }

  function cleanAnswer(value) {
    return String(value || "")
      .trim()
      .toUpperCase()
      .replace(/\s+/g, "")
      .replace(/[–—]/g, "-");
  }

  function dailyWords() {
    return seededPick(wordBanks, "memory");
  }

  function dailySequence() {
    return seededPick(sequenceSets, "sequence");
  }

  function dailyCategoryPrompt() {
    return seededPick(categoryPrompts, "category");
  }

  function dailyRoute() {
    return seededPick(routeSets, "route");
  }

  function dailyNbackItems() {
    const symbols = ["●", "▲", "■", "◆", "★"];
    const seed = Math.abs(hashSeed(`${state.today}-nback`));
    const items = [];
    for (let index = 0; index < 12; index += 1) {
      if (index >= 2 && (seed + index) % 4 === 0) {
        items.push(items[index - 2]);
      } else {
        items.push(symbols[(seed + index * 3) % symbols.length]);
      }
    }
    return items;
  }

  function dailyNbackMatches() {
    const items = dailyNbackItems();
    return items
      .map((item, index) => index >= 2 && item === items[index - 2] ? index : -1)
      .filter(index => index >= 0);
  }

  function dailyPlanningScenario() {
    return seededPick(planningScenarios, "planning");
  }

  function scoreMovement() {
    const data = getTaskData("movement");
    const done = movementChecks.filter(([id]) => data[id]).length;
    return Math.round(done / movementChecks.length * taskMeta.movement.points);
  }

  function scoreStroop() {
    const data = getTaskData("stroop");
    const answers = data.answers || {};
    const items = buildStroopItems();
    const correct = items.filter(item => answers[item.id] === item.colorKey).length;
    return Math.round(correct / items.length * taskMeta.stroop.points);
  }

  function stroopStats() {
    const data = getTaskData("stroop");
    const answers = data.answers || {};
    const items = buildStroopItems();
    const answered = items.filter(item => answers[item.id]).length;
    const correct = items.filter(item => answers[item.id] === item.colorKey).length;
    return { answered, correct, total: items.length, accuracy: answered ? Math.round(correct / answered * 100) : 0 };
  }

  function scoreMemory() {
    const data = getTaskData("memory");
    const words = dailyWords();
    const recalled = data.recalledWords || [];
    return Math.round(recalled.filter(word => words.includes(word)).length / words.length * taskMeta.memory.points);
  }

  function scoreSequence() {
    const data = getTaskData("sequence");
    const sequence = dailySequence();
    return cleanAnswer(data.answer) === cleanAnswer(sequence.answer) ? taskMeta.sequence.points : 0;
  }

  function scoreLifestyle() {
    const data = getTaskData("lifestyle");
    const done = lifestyleChecks.filter(([id]) => data[id]).length;
    return Math.round(done / lifestyleChecks.length * taskMeta.lifestyle.points);
  }

  function splitWords(value) {
    return String(value || "")
      .split(/[\s,，、.]+/)
      .map(item => item.trim())
      .filter(Boolean);
  }

  function scoreCategory() {
    const data = getTaskData("category");
    const unique = [...new Set(splitWords(data.words))];
    return Math.min(taskMeta.category.points, Math.round(unique.length / 12 * taskMeta.category.points));
  }

  function scoreNback() {
    const data = getTaskData("nback");
    const selected = new Set(data.selected || []);
    const matches = new Set(dailyNbackMatches());
    const correct = [...matches].filter(index => selected.has(index)).length;
    const falsePositive = [...selected].filter(index => !matches.has(index)).length;
    const raw = Math.max(0, correct - falsePositive * 0.5);
    return Math.round(raw / Math.max(1, matches.size) * taskMeta.nback.points);
  }

  function nbackStats() {
    const data = getTaskData("nback");
    const selected = new Set(data.selected || []);
    const matches = new Set(dailyNbackMatches());
    const correct = [...matches].filter(index => selected.has(index)).length;
    const falsePositive = [...selected].filter(index => !matches.has(index)).length;
    return { correct, falsePositive, total: matches.size, selected: selected.size };
  }

  function scoreRoute() {
    const data = getTaskData("route");
    const route = dailyRoute();
    const answer = splitWords(data.answer);
    const correct = route.filter((place, index) => answer[index] === place).length;
    return Math.round(correct / route.length * taskMeta.route.points);
  }

  function scorePlanning() {
    const data = getTaskData("planning");
    const steps = [data.step1, data.step2, data.step3].filter(item => String(item || "").trim().length >= 4).length;
    const obstacle = String(data.obstacle || "").trim().length >= 4 ? 1 : 0;
    const next = String(data.next || "").trim().length >= 4 ? 1 : 0;
    return Math.round((steps + obstacle + next) / 5 * taskMeta.planning.points);
  }

  function scoreByTask() {
    const allScores = {
      movement: scoreMovement(),
      stroop: scoreStroop(),
      memory: scoreMemory(),
      sequence: scoreSequence(),
      lifestyle: scoreLifestyle(),
      category: scoreCategory(),
      nback: scoreNback(),
      route: scoreRoute(),
      planning: scorePlanning()
    };
    return Object.fromEntries(activeTaskOrder().map(key => [key, allScores[key] || 0]));
  }

  function totalScore() {
    return Object.values(scoreByTask()).reduce((sum, value) => sum + value, 0);
  }

  function completedTasks() {
    const scores = scoreByTask();
    return activeTaskOrder().filter(key => scores[key] >= Math.round(taskMeta[key].points * 0.7)).length;
  }

  function getStreak() {
    const sessionDates = new Set(state.sessions.map(session => session.sessionDate));
    if (completedTasks() >= 4) sessionDates.add(state.today);
    let cursor = new Date();
    let count = 0;
    while (count < 365) {
      const key = todayKey(cursor);
      if (!sessionDates.has(key)) break;
      count += 1;
      cursor.setDate(cursor.getDate() - 1);
    }
    return count;
  }

  function weakSpots() {
    const scores = scoreByTask();
    const spots = [];
    if (scores.movement < 14) spots.push("운동 루틴");
    if (stroopStats().answered >= 6 && stroopStats().accuracy < 75) spots.push("주의 억제");
    if (scores.memory < 12) spots.push("지연 회상");
    if (scores.sequence < 20) spots.push("규칙 전환/작업기억");
    if (scores.category < 12) spots.push("언어 유창성");
    if (scores.nback < 12) spots.push("작업기억 업데이트");
    if (scores.route < 12) spots.push("공간/순서 기억");
    if (scores.planning < 12) spots.push("실행계획");
    if (scores.lifestyle < 14) spots.push("생활 보호요인");
    return spots;
  }

  function protectors() {
    const lifestyle = getTaskData("lifestyle");
    const movement = getTaskData("movement");
    return [
      ...movementChecks.filter(([id]) => movement[id]).map(([, label]) => label),
      ...lifestyleChecks.filter(([id]) => lifestyle[id]).map(([, label]) => label)
    ];
  }

  function nextActionText() {
    const spots = weakSpots();
    if (!spots.length) return "내일도 같은 시간에 10-12분 세션을 반복하고, 주 1회 수면/운동/사회 활동 패턴을 확인합니다.";
    return `${spots[0]}을 내일의 첫 과제로 두고, 무리 없이 1개 행동만 더합니다.`;
  }

  function adaptiveDifficulty() {
    const recent = state.sessions.slice(0, 5);
    const average = recent.length
      ? Math.round(recent.reduce((sum, session) => sum + Number(session.totalScore || 0), 0) / recent.length)
      : totalScore();
    if (average >= 85 && getStreak() >= 3) return {
      label: "상향",
      title: "난이도 소폭 상승",
      detail: "최근 점수가 안정적이면 속도, 항목 수, 회상 지연을 아주 조금 늘립니다. 무리보다 지속성이 우선입니다."
    };
    if (average <= 45) return {
      label: "완화",
      title: "성공 경험 먼저",
      detail: "오늘은 과제 수를 줄이고 운동/생활 보호요인부터 통과시켜 루틴 이탈을 막습니다."
    };
    return {
      label: "유지",
      title: "다영역 균형 유지",
      detail: "기억, 주의, 언어, 실행기능, 생활 보호요인을 날짜별로 섞어 반복합니다."
    };
  }

  function renderAdaptiveRoutine() {
    const difficulty = adaptiveDifficulty();
    const spots = weakSpots();
    const focus = spots[0] || "균형 유지";
    const routine = [
      ["1", "몸 먼저", "90초 걷기나 의자 스쿼트처럼 안전한 신체 자극으로 시작"],
      ["2", "약점 1개", `${focus}을 오늘의 첫 인지 과제로 배치`],
      ["3", "언어화", "정답만 보지 말고 왜 그렇게 판단했는지 한 문장으로 말하기"],
      ["4", "생활 보호막", "수면, 사회적 연결, 청각, 혈관위험 중 실제로 한 것만 체크"],
      ["5", "저장", "점수보다 약점과 다음 행동을 D1/localStorage 기록으로 남기기"]
    ];
    return `
      <section class="cognitive-adaptive-plan">
        <div>
          <p class="eyebrow">Adaptive Daily Routine</p>
          <h2>${escapeHtml(difficulty.title)}</h2>
          <p>${escapeHtml(difficulty.detail)} 현재 처방은 ${escapeHtml(difficulty.label)} 모드입니다.</p>
        </div>
        <div class="cognitive-routine-ladder">
          ${routine.map(([step, title, body]) => `
            <article>
              <span>${escapeHtml(step)}</span>
              <strong>${escapeHtml(title)}</strong>
              <small>${escapeHtml(body)}</small>
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }

  function renderWeeklyReport() {
    const recent = state.sessions.slice(0, 7);
    const average = recent.length
      ? Math.round(recent.reduce((sum, session) => sum + Number(session.totalScore || 0), 0) / recent.length)
      : 0;
    const weakCounter = {};
    const protectorCounter = {};
    recent.forEach(session => {
      (session.weakSpots || []).forEach(spot => {
        weakCounter[spot] = (weakCounter[spot] || 0) + 1;
      });
      (session.protectors || []).forEach(item => {
        protectorCounter[item] = (protectorCounter[item] || 0) + 1;
      });
    });
    const weakRows = Object.entries(weakCounter).sort((a, b) => b[1] - a[1]).slice(0, 4);
    const protectorRows = Object.entries(protectorCounter).sort((a, b) => b[1] - a[1]).slice(0, 4);
    const next = weakRows[0]
      ? `${weakRows[0][0]}이 반복됩니다. 다음 세션은 이 영역을 첫 과제로 두고 성공 기준을 낮게 시작하세요.`
      : "큰 반복 약점이 보이지 않습니다. 난이도는 유지하고 운동·수면·사회 연결을 계속 묶으세요.";
    return `
      <section class="cognitive-weekly-report">
        <div>
          <p class="eyebrow">Weekly Brain Report</p>
          <h2>최근 7회 루틴 패턴</h2>
          <p>인지훈련은 단일 점수보다 반복 패턴이 중요합니다. 약점, 보호요인, 다음 행동을 한 번에 봅니다.</p>
        </div>
        <div class="cognitive-week-grid">
          <article><span>평균 점수</span><strong>${average}</strong><small>${recent.length} sessions</small></article>
          <article><span>streak</span><strong>${getStreak()}일</strong><small>중단보다 재개가 우선</small></article>
          <article><span>반복 약점</span><strong>${escapeHtml(weakRows[0]?.[0] || "대기")}</strong><small>${weakRows[0] ? `${weakRows[0][1]}회 관찰` : "세션 저장 후 분석"}</small></article>
        </div>
        <div class="cognitive-week-lists">
          <span><b>약점</b>${weakRows.map(([spot, count]) => `${escapeHtml(spot)} ${count}회`).join(" · ") || "아직 충분한 데이터 없음"}</span>
          <span><b>보호요인</b>${protectorRows.map(([item, count]) => `${escapeHtml(item)} ${count}회`).join(" · ") || "운동/수면/사회 연결 체크 대기"}</span>
          <span><b>다음 7일</b>${escapeHtml(next)}</span>
        </div>
      </section>
    `;
  }

  function buildSessionRecord() {
    const scores = scoreByTask();
    const stroop = stroopStats();
    const memory = getTaskData("memory");
    const sequence = dailySequence();
    return {
      id: `cognitive-${state.today}-${uid()}`,
      type: "Cognitive Resilience Practice",
      subsystem: "인지능력향상 프로젝트",
      severity: "sensitive-summary",
      title: `인지 훈련 ${state.today}`,
      sessionDate: state.today,
      startedAt: state.startedAt,
      createdAt: new Date().toISOString(),
      totalScore: totalScore(),
      completedTasks: completedTasks(),
      activeTasks: activeTaskOrder(),
      scores,
      stroop: {
        answered: stroop.answered,
        correct: stroop.correct,
        total: stroop.total,
        accuracy: stroop.accuracy
      },
      memory: {
        recalled: memory.recalledWords || [],
        totalWords: dailyWords().length
      },
      sequence: {
        prompt: sequence.prompt,
        userAnswer: getTaskData("sequence").answer || "",
        correct: scoreSequence() === taskMeta.sequence.points
      },
      category: {
        prompt: dailyCategoryPrompt().title,
        count: [...new Set(splitWords(getTaskData("category").words))].length
      },
      nback: nbackStats(),
      route: {
        route: dailyRoute(),
        answer: splitWords(getTaskData("route").answer)
      },
      planning: {
        scenario: dailyPlanningScenario(),
        completed: scorePlanning() >= 14
      },
      protectors: protectors(),
      weakSpots: weakSpots(),
      nextAction: nextActionText(),
      bookId: "cognitive-resilience",
      bookTitle: "인지능력향상 프로젝트",
      aiExportOk: false,
      note: "Not medical diagnosis or treatment. Use for habit tracking and discussion prep only."
    };
  }

  function markLocalSession(record) {
    const filtered = state.sessions.filter(session => session.sessionDate !== record.sessionDate);
    state.sessions = [record, ...filtered].slice(0, 60);
    state.streak = getStreak();
    persist();
  }

  async function saveRemoteSession() {
    const record = buildSessionRecord();
    markLocalSession(record);
    state.remoteStatus = "D1 저장 시도 중...";
    persist();
    render();
    try {
      const response = await fetch("/api/entries", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record)
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      state.remoteStatus = "Cloudflare D1에 세션 저장 완료";
      state.lastSavedRemoteAt = new Date().toISOString();
    } catch {
      state.remoteStatus = "브라우저에는 저장됨. 배포 URL에서 로그인하면 D1 저장 가능";
    }
    persist();
    render();
  }

  function renderMetric(label, value, detail) {
    return `
      <article>
        <span>${escapeHtml(label)}</span>
        <strong>${escapeHtml(value)}</strong>
        <small>${escapeHtml(detail)}</small>
      </article>
    `;
  }

  function renderOverview() {
    const order = activeTaskOrder().map(key => taskMeta[key].label).join(" · ");
    return `
      <article class="cognitive-intro-card">
        <div>
          <p class="eyebrow">Daily Brain Ops</p>
          <h2>처음 들어오면 오늘의 루틴부터 시작</h2>
          <p>오늘 조합은 ${escapeHtml(order)}입니다. 운동, 기억, 주의, 언어, 실행기능, 생활 보호요인을 날짜별로 섞어 단조로운 반복을 줄였습니다.</p>
        </div>
        <button class="primary" type="button" data-action="start-session">오늘 세션 시작</button>
      </article>
      ${renderProgramMap()}
    `;
  }

  function renderProgramMap() {
    const pillars = [
      ["운동", "가벼운 유산소, 근력, 균형을 안전하게 묶어 실행"],
      ["인지 다양성", "주의 억제, 회상, 언어 유창성, 작업기억, 경로 기억을 회전"],
      ["혈관/대사", "혈압, 혈당, 흡연, 음주, 체중 같은 조절 가능 축 확인"],
      ["감각/사회", "청각 점검과 사회적 연결을 놓치지 않게 설계"],
      ["수면/회복", "기억 고정과 집중력 회복을 위한 기본 루틴"],
      ["생활 실행", "계획을 3단계 행동으로 바꾸어 실제 일상 기능을 자극"]
    ];
    return `
      <section class="cognitive-pillar-grid" aria-label="인지 건강 다영역 축">
        ${pillars.map(([title, body], index) => `
          <article>
            <span>${index + 1}</span>
            <strong>${escapeHtml(title)}</strong>
            <p>${escapeHtml(body)}</p>
          </article>
        `).join("")}
      </section>
    `;
  }

  function renderTaskNav() {
    const scores = scoreByTask();
    const order = activeTaskOrder();
    return `
      <div class="cognitive-task-nav" role="tablist" aria-label="오늘 세션 과제">
        ${order.map((key, index) => `
          <button type="button" class="${state.taskIndex === index ? "active" : ""}" data-action="select-task" data-task-index="${index}">
            <span>${escapeHtml(taskMeta[key].label)}</span>
            <strong>${scores[key]}/${taskMeta[key].points}</strong>
          </button>
        `).join("")}
      </div>
    `;
  }

  function renderCurrentTask() {
    const order = activeTaskOrder();
    const key = order[state.taskIndex] || order[0];
    const meta = taskMeta[key];
    const taskBody = {
      movement: renderMovementTask,
      stroop: renderStroopTask,
      memory: renderMemoryTask,
      sequence: renderSequenceTask,
      lifestyle: renderLifestyleTask,
      category: renderCategoryTask,
      nback: renderNbackTask,
      route: renderRouteTask,
      planning: renderPlanningTask
    }[key]();
    return `
      <article class="cognitive-session-panel">
        <header>
          <div>
            <p class="eyebrow">${escapeHtml(meta.label)}</p>
            <h2>${escapeHtml(meta.title)}</h2>
            <p>${escapeHtml(meta.subtitle)}</p>
          </div>
          <span>${scoreByTask()[key]}/${meta.points}</span>
        </header>
        ${taskBody}
        <div class="cognitive-task-actions">
          <button class="secondary" type="button" data-action="prev-task">이전</button>
          <button class="primary" type="button" data-action="next-task">다음 과제</button>
          <button class="secondary" type="button" data-action="save-session">오늘 세션 저장</button>
        </div>
      </article>
    `;
  }

  function renderMovementTask() {
    const data = getTaskData("movement");
    return `
      <div class="cognitive-check-grid">
        ${movementChecks.map(([id, label, detail]) => `
          <label class="cognitive-check-card">
            <input type="checkbox" data-task="movement" data-check-id="${id}" ${data[id] ? "checked" : ""} />
            <span>
              <strong>${escapeHtml(label)}</strong>
              <small>${escapeHtml(detail)}</small>
            </span>
          </label>
        `).join("")}
      </div>
      <p class="cognitive-safety">통증, 어지럼, 흉통, 호흡곤란이 있으면 즉시 중단하고 안전을 먼저 확인합니다.</p>
    `;
  }

  function renderStroopTask() {
    const data = getTaskData("stroop");
    const answers = data.answers || {};
    const items = buildStroopItems();
    const stats = stroopStats();
    return `
      <div class="cognitive-task-explain">
        <strong>규칙</strong>
        <p>단어의 의미를 무시하고, 글자가 실제로 표시된 색을 고릅니다. 자동반응을 멈추는 연습입니다.</p>
        <span>${stats.correct}/${stats.answered || 0} 정답 · ${stats.accuracy}%</span>
      </div>
      <div class="cognitive-stroop-grid">
        ${items.map(item => `
          <article class="${answers[item.id] ? answers[item.id] === item.colorKey ? "correct" : "wrong" : ""}">
            <strong style="color:${item.color}">${escapeHtml(item.word)}</strong>
            <div>
              ${Object.entries(colors).map(([key, color]) => `
                <button type="button" data-action="stroop-answer" data-stroop-id="${item.id}" data-stroop-answer="${key}">
                  <i style="background:${color.swatch}"></i>${color.label}
                </button>
              `).join("")}
            </div>
          </article>
        `).join("")}
      </div>
    `;
  }

  function renderMemoryTask() {
    const data = getTaskData("memory");
    const phase = data.phase || "study";
    const words = dailyWords();
    const recalled = data.recalledWords || [];
    const correct = recalled.filter(word => words.includes(word));
    return `
      <div class="cognitive-task-explain">
        <strong>방법</strong>
        <p>단어를 소리 내지 않고 25초 정도 본 뒤 숨기고, 떠오르는 단어를 쉼표나 줄바꿈으로 적습니다.</p>
        <span>${correct.length}/${words.length} 회상</span>
      </div>
      ${phase === "study" ? `
        <div class="cognitive-word-board">
          ${words.map(word => `<span>${escapeHtml(word)}</span>`).join("")}
        </div>
        <button class="primary" type="button" data-action="memory-hide">단어 숨기고 회상하기</button>
      ` : `
        <label class="cognitive-recall-box">
          떠오르는 단어
          <textarea id="cognitive-memory-input" placeholder="예: 유리컵, 소나무, 감자...">${escapeHtml(data.rawRecall || "")}</textarea>
        </label>
        <div class="cognitive-task-actions compact">
          <button class="primary" type="button" data-action="memory-check">회상 채점</button>
          <button class="secondary" type="button" data-action="memory-reset">다시 보기</button>
        </div>
        ${phase === "checked" ? `
          <div class="cognitive-feedback ${correct.length >= 5 ? "good" : "warn"}">
            <strong>${correct.length}개 회상</strong>
            <p>맞힌 단어: ${correct.map(escapeHtml).join(", ") || "아직 없음"}</p>
          </div>
        ` : ""}
      `}
    `;
  }

  function renderSequenceTask() {
    const data = getTaskData("sequence");
    const sequence = dailySequence();
    const checked = data.checked;
    const correct = checked && cleanAnswer(data.answer) === cleanAnswer(sequence.answer);
    return `
      <div class="cognitive-sequence-card">
        <span>오늘의 규칙</span>
        <strong>${escapeHtml(sequence.prompt)}</strong>
        <label>
          내 답
          <input id="cognitive-sequence-input" value="${escapeHtml(data.answer || "")}" placeholder="예: 4-D-5-E" />
        </label>
        <div class="cognitive-task-actions compact">
          <button class="primary" type="button" data-action="sequence-check">정답 확인</button>
          <button class="secondary" type="button" data-action="sequence-hint">힌트 보기</button>
        </div>
        ${data.showHint ? `<p>${escapeHtml(sequence.hint)}</p>` : ""}
        ${checked ? `
          <div class="cognitive-feedback ${correct ? "good" : "warn"}">
            <strong>${correct ? "정답" : "다시 시도"}</strong>
            <p>정답: ${escapeHtml(sequence.answer)}</p>
          </div>
        ` : ""}
      </div>
    `;
  }

  function renderLifestyleTask() {
    const data = getTaskData("lifestyle");
    const checked = lifestyleChecks.filter(([id]) => data[id]).length;
    return `
      <div class="cognitive-task-explain">
        <strong>오늘의 보호막</strong>
        <p>치매 위험 감소는 하나의 퍼즐게임이 아니라 생활 축의 누적입니다. 오늘 실제로 한 것만 체크합니다.</p>
        <span>${checked}/${lifestyleChecks.length}개</span>
      </div>
      <div class="cognitive-check-grid lifestyle">
        ${lifestyleChecks.map(([id, label, detail]) => `
          <label class="cognitive-check-card">
            <input type="checkbox" data-task="lifestyle" data-check-id="${id}" ${data[id] ? "checked" : ""} />
            <span>
              <strong>${escapeHtml(label)}</strong>
              <small>${escapeHtml(detail)}</small>
            </span>
          </label>
        `).join("")}
      </div>
    `;
  }

  function renderCategoryTask() {
    const data = getTaskData("category");
    const prompt = dailyCategoryPrompt();
    const unique = [...new Set(splitWords(data.words))];
    return `
      <div class="cognitive-task-explain">
        <strong>${escapeHtml(prompt.title)}</strong>
        <p>90초 안에 최대한 많이 떠올린다고 생각하고 적습니다. 예시는 피하고 새로운 단어를 많이 꺼내는 것이 핵심입니다.</p>
        <span>${unique.length}/12개 · ${scoreCategory()}/20</span>
      </div>
      <div class="cognitive-memory-coach">
        <span>예시</span>
        ${prompt.examples.map(item => `<b>${escapeHtml(item)}</b>`).join("")}
      </div>
      <label class="cognitive-recall-box">
        떠오른 단어
        <textarea id="cognitive-category-input" placeholder="쉼표나 줄바꿈으로 적기">${escapeHtml(data.words || "")}</textarea>
      </label>
      <div class="cognitive-task-actions compact">
        <button class="primary" type="button" data-action="category-check">유창성 점수 반영</button>
      </div>
    `;
  }

  function renderNbackTask() {
    const data = getTaskData("nback");
    const selected = new Set(data.selected || []);
    const matches = new Set(dailyNbackMatches());
    const items = dailyNbackItems();
    const stats = nbackStats();
    return `
      <div class="cognitive-task-explain">
        <strong>2-back 규칙</strong>
        <p>현재 칸의 기호가 두 칸 전과 같으면 그 칸을 선택합니다. 예: 1번과 3번이 같으면 3번 선택.</p>
        <span>${stats.correct}/${stats.total} 감지 · 오답 ${stats.falsePositive}</span>
      </div>
      <div class="cognitive-nback-grid">
        ${items.map((item, index) => `
          <button type="button" class="${selected.has(index) ? "selected" : ""} ${data.checked ? matches.has(index) ? "correct" : selected.has(index) ? "wrong" : "" : ""}" data-action="nback-toggle" data-nback-index="${index}">
            <small>${index + 1}</small>
            <strong>${item}</strong>
          </button>
        `).join("")}
      </div>
      <div class="cognitive-task-actions compact">
        <button class="primary" type="button" data-action="nback-check">정답 확인</button>
        <button class="secondary" type="button" data-action="nback-reset">초기화</button>
      </div>
      ${data.checked ? `
        <div class="cognitive-feedback ${scoreNback() >= 14 ? "good" : "warn"}">
          <strong>${scoreNback()}/20점</strong>
          <p>정답 위치: ${[...matches].map(index => index + 1).join(", ") || "없음"}</p>
        </div>
      ` : ""}
    `;
  }

  function renderRouteTask() {
    const data = getTaskData("route");
    const phase = data.phase || "study";
    const route = dailyRoute();
    const answer = splitWords(data.answer);
    const correct = route.filter((place, index) => answer[index] === place).length;
    return `
      <div class="cognitive-task-explain">
        <strong>방법</strong>
        <p>장소 순서를 20초 정도 본 뒤 숨기고, 처음부터 끝까지 순서대로 적습니다. 일상 길 찾기와 순서 기억을 함께 건드립니다.</p>
        <span>${correct}/${route.length} 순서 일치</span>
      </div>
      ${phase === "study" ? `
        <div class="cognitive-route-strip">
          ${route.map((place, index) => `<span><b>${index + 1}</b>${escapeHtml(place)}</span>`).join("")}
        </div>
        <button class="primary" type="button" data-action="route-hide">경로 숨기고 복원하기</button>
      ` : `
        <label class="cognitive-recall-box">
          경로 순서
          <textarea id="cognitive-route-input" placeholder="예: 현관, 우체국, 약국...">${escapeHtml(data.answer || "")}</textarea>
        </label>
        <div class="cognitive-task-actions compact">
          <button class="primary" type="button" data-action="route-check">경로 채점</button>
          <button class="secondary" type="button" data-action="route-reset">다시 보기</button>
        </div>
        ${data.checked ? `
          <div class="cognitive-feedback ${scoreRoute() >= 14 ? "good" : "warn"}">
            <strong>${scoreRoute()}/20점</strong>
            <p>정답 경로: ${route.map(escapeHtml).join(" → ")}</p>
          </div>
        ` : ""}
      `}
    `;
  }

  function renderPlanningTask() {
    const data = getTaskData("planning");
    const scenario = dailyPlanningScenario();
    return `
      <div class="cognitive-task-explain">
        <strong>실행기능</strong>
        <p>실제 생활 문제를 순서화합니다. 치매 예방 앱이라면 게임 점수보다 생활을 조직하는 능력도 매일 건드려야 합니다.</p>
        <span>${scorePlanning()}/20</span>
      </div>
      <div class="cognitive-plan-card">
        <strong>${escapeHtml(scenario)}</strong>
        <label>1단계<input data-plan-field="step1" value="${escapeHtml(data.step1 || "")}" placeholder="가장 먼저 할 일" /></label>
        <label>2단계<input data-plan-field="step2" value="${escapeHtml(data.step2 || "")}" placeholder="그 다음 행동" /></label>
        <label>3단계<input data-plan-field="step3" value="${escapeHtml(data.step3 || "")}" placeholder="마무리 행동" /></label>
        <label>예상 방해요인<input data-plan-field="obstacle" value="${escapeHtml(data.obstacle || "")}" placeholder="예: 피곤함, 깜빡함, 이동 시간" /></label>
        <label>바로 할 최소 행동<input data-plan-field="next" value="${escapeHtml(data.next || "")}" placeholder="지금 2분 안에 할 수 있는 행동" /></label>
      </div>
      <div class="cognitive-task-actions compact">
        <button class="primary" type="button" data-action="planning-save">계획 점수 반영</button>
      </div>
    `;
  }

  function renderSourcePanel() {
    return `
      <section class="cognitive-source-grid" aria-label="공개 근거">
        ${evidenceLinks.map(source => `
          <a href="${source.url}" target="_blank" rel="noreferrer">
            <span>${escapeHtml(source.title)}</span>
            <p>${escapeHtml(source.body)}</p>
          </a>
        `).join("")}
      </section>
    `;
  }

  function render() {
    ensureToday();
    const score = totalScore();
    const tasksDone = completedTasks();
    const taskCount = activeTaskOrder().length;
    const streak = getStreak();
    const started = Boolean(state.startedAt);
    const recent = state.sessions.slice(0, 5);
    root.innerHTML = `
      <section class="cognitive-shell">
        <div class="cognitive-hero-panel">
          <div>
            <p class="eyebrow">2026 Evidence-Based Brain Routine</p>
            <h2>매일 10-12분, 읽는 앱이 아니라 수행하는 앱</h2>
            <p>이 화면에서 누르고, 기억하고, 고르고, 계획하는 행동 자체가 회상 연습과 주의 전환이 되도록 설계했습니다. 목표는 의학적 진단이 아니라 근거 기반 보호 루틴입니다.</p>
            <div class="cognitive-hero-actions">
              <button class="primary" type="button" data-action="start-session">${started ? "세션 계속하기" : "오늘 세션 시작"}</button>
              <button class="secondary" type="button" data-action="save-session">오늘 기록 저장</button>
            </div>
          </div>
          <div class="cognitive-score-card">
            <span>오늘 점수</span>
            <strong>${score}</strong>
            <small>${tasksDone}/${taskCount} 과제 통과 · ${streak}일 연속</small>
            <i><em style="width:${Math.min(100, score)}%"></em></i>
          </div>
        </div>

        <div class="cognitive-metric-grid">
          ${renderMetric("세션 날짜", state.today, started ? "오늘 루틴 진행 중" : "아직 시작 전")}
          ${renderMetric("완료 과제", `${tasksDone}/${taskCount}`, "70% 이상이면 통과로 계산")}
          ${renderMetric("저장 상태", state.remoteStatus, state.lastSavedRemoteAt ? `최근 ${state.lastSavedRemoteAt.slice(0, 10)}` : "D1 가능 시 자동 시도")}
          ${renderMetric("다음 행동", nextActionText(), "작고 반복 가능한 1개 행동")}
        </div>

        ${renderAdaptiveRoutine()}

        ${started ? `${renderTaskNav()}${renderCurrentTask()}` : renderOverview()}

        ${renderWeeklyReport()}

        <section class="cognitive-history-panel">
          <div>
            <p class="eyebrow">Pattern Memory</p>
            <h2>최근 세션</h2>
          </div>
          <div class="cognitive-history-list">
            ${recent.length ? recent.map(session => `
              <article>
                <span>${escapeHtml(session.sessionDate)}</span>
                <strong>${escapeHtml(session.totalScore)}점</strong>
                <small>${escapeHtml((session.weakSpots || []).join(", ") || "큰 약점 없음")}</small>
              </article>
            `).join("") : `<p class="empty-note">아직 저장된 세션이 없습니다. 오늘 세션을 저장하면 여기에 쌓입니다.</p>`}
          </div>
        </section>

        <article class="cognitive-medical-note">
          <strong>안전 기준</strong>
          <p>반복되는 길 잃음, 돈/약 복용 관리 실패, 성격 변화, 갑작스러운 기억 저하, 운동 중 흉통/어지럼 같은 신호가 있으면 앱 점수보다 의료진 상담이 우선입니다.</p>
        </article>

        ${renderSourcePanel()}
      </section>
    `;
  }

  root.addEventListener("change", event => {
    const input = event.target.closest("[data-task][data-check-id]");
    if (!input) return;
    const data = getTaskData(input.dataset.task);
    data[input.dataset.checkId] = input.checked;
    persist();
    render();
  });

  root.addEventListener("click", event => {
    const button = event.target.closest("[data-action]");
    if (!button) return;
    const action = button.dataset.action;

    if (action === "start-session") {
      state.startedAt = state.startedAt || new Date().toISOString();
      persist();
      render();
      return;
    }

    if (action === "select-task") {
      state.taskIndex = Number(button.dataset.taskIndex || 0);
      persist();
      render();
      return;
    }

    if (action === "prev-task") {
      state.taskIndex = Math.max(0, state.taskIndex - 1);
      persist();
      render();
      return;
    }

    if (action === "next-task") {
      state.taskIndex = Math.min(activeTaskOrder().length - 1, state.taskIndex + 1);
      persist();
      render();
      return;
    }

    if (action === "stroop-answer") {
      const data = getTaskData("stroop");
      data.answers = data.answers || {};
      data.answers[button.dataset.stroopId] = button.dataset.stroopAnswer;
      persist();
      render();
      return;
    }

    if (action === "memory-hide") {
      const data = getTaskData("memory");
      data.phase = "recall";
      data.hiddenAt = new Date().toISOString();
      persist();
      render();
      return;
    }

    if (action === "memory-reset") {
      state.taskData.memory = { phase: "study" };
      persist();
      render();
      return;
    }

    if (action === "memory-check") {
      const input = document.querySelector("#cognitive-memory-input");
      const raw = input?.value || "";
      const words = dailyWords();
      const guessed = raw
        .split(/[\s,，、.]+/)
        .map(item => item.trim())
        .filter(Boolean);
      const recalledWords = [...new Set(guessed.filter(item => words.includes(item)))];
      const data = getTaskData("memory");
      data.rawRecall = raw;
      data.recalledWords = recalledWords;
      data.phase = "checked";
      persist();
      render();
      return;
    }

    if (action === "sequence-hint") {
      const data = getTaskData("sequence");
      data.showHint = true;
      persist();
      render();
      return;
    }

    if (action === "sequence-check") {
      const input = document.querySelector("#cognitive-sequence-input");
      const data = getTaskData("sequence");
      data.answer = input?.value || "";
      data.checked = true;
      persist();
      render();
      return;
    }

    if (action === "category-check") {
      const input = document.querySelector("#cognitive-category-input");
      const data = getTaskData("category");
      data.words = input?.value || "";
      data.checked = true;
      persist();
      render();
      return;
    }

    if (action === "nback-toggle") {
      const data = getTaskData("nback");
      const index = Number(button.dataset.nbackIndex);
      const selected = new Set(data.selected || []);
      if (selected.has(index)) selected.delete(index);
      else selected.add(index);
      data.selected = [...selected].sort((a, b) => a - b);
      data.checked = false;
      persist();
      render();
      return;
    }

    if (action === "nback-check") {
      const data = getTaskData("nback");
      data.checked = true;
      persist();
      render();
      return;
    }

    if (action === "nback-reset") {
      state.taskData.nback = { selected: [], checked: false };
      persist();
      render();
      return;
    }

    if (action === "route-hide") {
      const data = getTaskData("route");
      data.phase = "recall";
      data.hiddenAt = new Date().toISOString();
      data.checked = false;
      persist();
      render();
      return;
    }

    if (action === "route-reset") {
      state.taskData.route = { phase: "study" };
      persist();
      render();
      return;
    }

    if (action === "route-check") {
      const input = document.querySelector("#cognitive-route-input");
      const data = getTaskData("route");
      data.answer = input?.value || "";
      data.checked = true;
      persist();
      render();
      return;
    }

    if (action === "planning-save") {
      const data = getTaskData("planning");
      root.querySelectorAll("[data-plan-field]").forEach(input => {
        data[input.dataset.planField] = input.value || "";
      });
      data.checked = true;
      persist();
      render();
      return;
    }

    if (action === "save-session") {
      state.startedAt = state.startedAt || new Date().toISOString();
      saveRemoteSession();
    }
  });

  window.CognitiveResilienceProject = {
    render,
    buildSessionRecord,
    getState: () => JSON.parse(JSON.stringify(state))
  };

  render();
})();
