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

  const taskOrder = ["movement", "stroop", "memory", "sequence", "lifestyle"];
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
    }
  };

  const evidenceLinks = [
    {
      title: "Lancet Commission 2024",
      body: "14개 조절 가능 위험요인과 생애주기 접근을 제시합니다.",
      url: "https://www.thelancet.com/commissions-do/dementia-prevention-intervention-and-care"
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

  function scoreByTask() {
    return {
      movement: scoreMovement(),
      stroop: scoreStroop(),
      memory: scoreMemory(),
      sequence: scoreSequence(),
      lifestyle: scoreLifestyle()
    };
  }

  function totalScore() {
    return Object.values(scoreByTask()).reduce((sum, value) => sum + value, 0);
  }

  function completedTasks() {
    const scores = scoreByTask();
    return taskOrder.filter(key => scores[key] >= Math.round(taskMeta[key].points * 0.7)).length;
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
    if (!spots.length) return "내일도 같은 시간에 8분 세션을 반복하고, 주 1회 수면/운동/사회 활동 패턴을 확인합니다.";
    return `${spots[0]}을 내일의 첫 과제로 두고, 무리 없이 1개 행동만 더합니다.`;
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
    return `
      <article class="cognitive-intro-card">
        <div>
          <p class="eyebrow">Daily Brain Ops</p>
          <h2>처음 들어오면 이 버튼부터 누르기</h2>
          <p>오늘의 세션은 몸을 깨우고, 주의 억제, 회상, 규칙 전환, 생활 보호요인을 한 번씩 건드립니다. 단일 게임 점수보다 매일 반복되는 다영역 루프가 핵심입니다.</p>
        </div>
        <button class="primary" type="button" data-action="start-session">오늘 세션 시작</button>
      </article>
      ${renderProgramMap()}
    `;
  }

  function renderProgramMap() {
    const pillars = [
      ["운동", "가벼운 유산소, 근력, 균형을 안전하게 묶어 실행"],
      ["인지훈련", "주의 억제, 회상, 전환 사고를 짧게 반복"],
      ["혈관/대사", "혈압, 혈당, 흡연, 음주, 체중 같은 조절 가능 축 확인"],
      ["감각/사회", "청각 점검과 사회적 연결을 놓치지 않게 설계"],
      ["수면/회복", "기억 고정과 집중력 회복을 위한 기본 루틴"]
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
    return `
      <div class="cognitive-task-nav" role="tablist" aria-label="오늘 세션 과제">
        ${taskOrder.map((key, index) => `
          <button type="button" class="${state.taskIndex === index ? "active" : ""}" data-action="select-task" data-task-index="${index}">
            <span>${escapeHtml(taskMeta[key].label)}</span>
            <strong>${scores[key]}/${taskMeta[key].points}</strong>
          </button>
        `).join("")}
      </div>
    `;
  }

  function renderCurrentTask() {
    const key = taskOrder[state.taskIndex] || taskOrder[0];
    const meta = taskMeta[key];
    const taskBody = {
      movement: renderMovementTask,
      stroop: renderStroopTask,
      memory: renderMemoryTask,
      sequence: renderSequenceTask,
      lifestyle: renderLifestyleTask
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
    const streak = getStreak();
    const started = Boolean(state.startedAt);
    const recent = state.sessions.slice(0, 5);
    root.innerHTML = `
      <section class="cognitive-shell">
        <div class="cognitive-hero-panel">
          <div>
            <p class="eyebrow">2026 Evidence-Based Brain Routine</p>
            <h2>매일 8분, 읽는 앱이 아니라 수행하는 앱</h2>
            <p>이 화면에서 누르고, 기억하고, 고르고, 체크하는 행동 자체가 회상 연습과 주의 전환이 되도록 설계했습니다. 목표는 의학적 진단이 아니라 꾸준한 보호 루틴입니다.</p>
            <div class="cognitive-hero-actions">
              <button class="primary" type="button" data-action="start-session">${started ? "세션 계속하기" : "오늘 세션 시작"}</button>
              <button class="secondary" type="button" data-action="save-session">오늘 기록 저장</button>
            </div>
          </div>
          <div class="cognitive-score-card">
            <span>오늘 점수</span>
            <strong>${score}</strong>
            <small>${tasksDone}/5 과제 통과 · ${streak}일 연속</small>
            <i><em style="width:${Math.min(100, score)}%"></em></i>
          </div>
        </div>

        <div class="cognitive-metric-grid">
          ${renderMetric("세션 날짜", state.today, started ? "오늘 루틴 진행 중" : "아직 시작 전")}
          ${renderMetric("완료 과제", `${tasksDone}/5`, "70% 이상이면 통과로 계산")}
          ${renderMetric("저장 상태", state.remoteStatus, state.lastSavedRemoteAt ? `최근 ${state.lastSavedRemoteAt.slice(0, 10)}` : "D1 가능 시 자동 시도")}
          ${renderMetric("다음 행동", nextActionText(), "작고 반복 가능한 1개 행동")}
        </div>

        ${started ? `${renderTaskNav()}${renderCurrentTask()}` : renderOverview()}

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
      state.taskIndex = Math.min(taskOrder.length - 1, state.taskIndex + 1);
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
