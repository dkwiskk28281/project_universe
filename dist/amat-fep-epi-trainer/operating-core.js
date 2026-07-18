(() => {
  const ROOT_ID = "operating-core-root";
  const DONE_KEY = "projectUniverseOperatingCoreDoneV1";
  const EXPORT_VERSION = "project-universe-operating-core-v6";
  const SENSITIVE_BLOCKLIST = [
    "password",
    "seed phrase",
    "account number",
    "resident id",
    "customer confidential",
    "manual",
    "recipe",
    "valve sequence",
    "detector setpoint",
    "interlock bypass",
    "site-specific acceptance limit"
  ];

  const state = {
    remote: {
      loading: false,
      ops: null,
      briefing: null,
      packet: null,
      error: ""
    },
    buildInfo: null,
    lastRenderAt: null
  };

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
      if (!raw) return fallback;
      return JSON.parse(raw);
    } catch {
      return fallback;
    }
  }

  function saveJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function byteSize(value) {
    try {
      return new Blob([typeof value === "string" ? value : JSON.stringify(value)]).size;
    } catch {
      return 0;
    }
  }

  function localStorageStats() {
    const rows = [];
    let totalBytes = 0;
    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index);
      const value = localStorage.getItem(key) || "";
      const bytes = byteSize(value);
      totalBytes += bytes;
      rows.push({ key, bytes });
    }
    rows.sort((a, b) => b.bytes - a.bytes);
    return {
      totalKeys: rows.length,
      totalBytes,
      totalMb: Number((totalBytes / 1024 / 1024).toFixed(2)),
      top: rows.slice(0, 8)
    };
  }

  function collectLocalSignals() {
    const trainer = safeJson("ceTrainerState", {});
    const pages = safeJson("projectUniverseBookshelfPages", []);
    const thinkTank = safeJson("epiThinkTankEntries", []);
    const thinkTankPending = safeJson("epiThinkTankPendingEntries", []);
    const englishMicro = safeJson("amkEnglishMicroAttempts", []);
    const englishRecords = safeJson("amkEnglishSessionRecords", []);
    const englishQueue = safeJson("amkEnglishSpacedReviewQueue", []);
    const cognitive = safeJson("projectUniverseCognitiveResilienceV1", {});
    const vision = safeJson("projectUniverseVisionTrainingState", {});
    const lifeTasks = safeJson("projectUniverseLifeOsTaskLogV2", {});
    const bookshelfRestore = safeJson("projectUniverseBookshelfRestoreEvents", []);
    const storage = localStorageStats();

    const now = Date.now();
    const dueEnglish = englishQueue.filter(item => new Date(item.dueAt || 0).getTime() <= now);
    const wrongEnglish = englishMicro.filter(item => item.correct === false);
    const englishBySkill = {};
    wrongEnglish.forEach(item => {
      const skill = item.skillTag || item.type || "general English";
      englishBySkill[skill] = englishBySkill[skill] || { skill, wrong: 0, examples: [] };
      englishBySkill[skill].wrong += 1;
      if (item.prompt && englishBySkill[skill].examples.length < 2) englishBySkill[skill].examples.push(item.prompt);
    });
    const englishWeak = Object.values(englishBySkill).sort((a, b) => b.wrong - a.wrong);

    const ceWeak = Object.entries({
      ...(trainer.fepBigBangWeaknesses || {}),
      ...(trainer.epiMentalWeakness || {}),
      ...(trainer.ceCampaignWeakness || {})
    })
      .map(([skill, count]) => ({ skill, count: Number(count || 0) }))
      .filter(item => item.count > 0)
      .sort((a, b) => b.count - a.count);

    const cognitiveLogs = Array.isArray(cognitive.logs) ? cognitive.logs : Array.isArray(cognitive.sessions) ? cognitive.sessions : [];
    const visionLogs = Array.isArray(vision.logs) ? vision.logs : [];
    const latestVision = visionLogs[0] || null;
    const frequentDouble = visionLogs.filter(log => log.control === "frequent-double" || Number(log.diplopia || 0) >= 4).length;

    const missingNextStep = pages.filter(page => {
      const text = `${page.nextStep || ""} ${page.nextAction || ""}`.trim();
      return !text && !["cognitive-resilience", "vision-function-recovery"].includes(page.bookId);
    }).length;

    const pendingSync = [
      { lane: "Think Tank", count: thinkTankPending.length },
      { lane: "English", count: safeJson("amkEnglishPendingRecords", []).length },
      { lane: "Bookshelf restore", count: bookshelfRestore.length }
    ];

    return {
      generatedAt: new Date().toISOString(),
      build: state.buildInfo,
      trainer,
      pages,
      thinkTank,
      english: {
        records: englishRecords.length,
        microAttempts: englishMicro.length,
        wrong: wrongEnglish.length,
        due: dueEnglish.length,
        accuracy: englishMicro.length ? Math.round((englishMicro.length - wrongEnglish.length) / englishMicro.length * 100) : null,
        weaknesses: englishWeak.slice(0, 6)
      },
      ce: {
        weaknesses: ceWeak.slice(0, 8),
        curriculumDone: Object.keys(trainer.curriculumDone || {}).length,
        caseAnswers: Object.keys(trainer.ceCampaignAnswers || {}).length + Object.keys(trainer.epiMentalAnswers || {}).length
      },
      cognitive: {
        sessions: cognitiveLogs.length,
        latest: cognitiveLogs[0] || null
      },
      vision: {
        sessions: visionLogs.length,
        latest: latestVision,
        frequentDouble
      },
      thinkTankSummary: {
        entries: thinkTank.length,
        pending: thinkTankPending.length,
        missingNextStep
      },
      storage,
      pendingSync
    };
  }

  function doneState() {
    return safeJson(DONE_KEY, {});
  }

  function todayKey() {
    return new Date().toISOString().slice(0, 10);
  }

  function taskId(task) {
    return `${todayKey()}:${task.lane}:${task.title}`;
  }

  function priorityTasks(signals) {
    const tasks = [];
    const englishWeak = signals.english.weaknesses[0];
    const ceWeak = signals.ce.weaknesses[0];
    const dueEnglish = signals.english.due;
    const doubleRisk = signals.vision.frequentDouble > 0 && signals.vision.latest;
    const deployDirty = signals.build?.gitDirty;
    const remoteError = state.remote.error;
    const pending = signals.pendingSync.reduce((sum, item) => sum + item.count, 0);

    tasks.push({
      lane: "Core",
      title: "15분 운영 브리핑",
      minutes: 15,
      score: 92,
      view: "operating-core",
      why: "오늘의 학습, 저장, 약점, 배포 상태를 먼저 정렬합니다.",
      evidence: `${signals.pages.length} pages · ${signals.thinkTankSummary.entries} records · ${signals.storage.totalMb}MB local cache`
    });

    if (ceWeak) {
      tasks.push({
        lane: "CE",
        title: `${ceWeak.skill} 약점 케이스 2개`,
        minutes: 20,
        score: 88 + Math.min(10, ceWeak.count),
        view: "diagnostics",
        why: "반복 약점은 현장 사고 패턴이 굳기 전에 바로 복습해야 합니다.",
        evidence: `${ceWeak.count} repeated CE weakness signals`
      });
    } else {
      tasks.push({
        lane: "CE",
        title: "CE campaign 새 케이스 1개",
        minutes: 18,
        score: 78,
        view: "diagnostics",
        why: "약점 데이터가 없으면 새 케이스를 풀어 진단 데이터를 만듭니다.",
        evidence: `${signals.ce.caseAnswers} case answers`
      });
    }

    if (dueEnglish || englishWeak) {
      tasks.push({
        lane: "English",
        title: dueEnglish ? `영어 복습 큐 ${dueEnglish}개` : `${englishWeak.skill} 변형 문제`,
        minutes: 12,
        score: dueEnglish ? 91 : 83,
        view: "english-test",
        why: "오답 직후 복습과 변형 문제는 패턴 암기를 줄이고 실제 CBT 대응력을 올립니다.",
        evidence: `${signals.english.microAttempts} attempts · ${signals.english.accuracy ?? "n/a"}% · weak ${englishWeak?.skill || "none"}`
      });
    } else {
      tasks.push({
        lane: "English",
        title: "영어 CBT 10문항",
        minutes: 15,
        score: 72,
        view: "english-test",
        why: "영어 약점 큐를 만들려면 일단 새 시도를 저장해야 합니다.",
        evidence: `${signals.english.microAttempts} micro attempts`
      });
    }

    if (doubleRisk) {
      tasks.push({
        lane: "Vision",
        title: "시기능 이완/기록 우선",
        minutes: 5,
        score: 86,
        view: "vision-training",
        why: "복시가 잦거나 강한 날은 훈련보다 중지 조건과 진료 질문 정리가 우선입니다.",
        evidence: `${signals.vision.frequentDouble} high diplopia signals`
      });
    } else {
      tasks.push({
        lane: "Vision",
        title: "시기능 60초 안전 기록",
        minutes: 3,
        score: signals.vision.sessions ? 62 : 76,
        view: "vision-training",
        why: "짧은 패턴 기록은 진료 때 증상을 설명하는 증거가 됩니다.",
        evidence: `${signals.vision.sessions} sessions`
      });
    }

    if (signals.thinkTankSummary.missingNextStep) {
      tasks.push({
        lane: "Think Tank",
        title: "nextStep 없는 기록 정리",
        minutes: 12,
        score: 84,
        view: "bookshelf",
        why: "AI가 다음 행동을 제안하려면 기록마다 nextStep이 있어야 합니다.",
        evidence: `${signals.thinkTankSummary.missingNextStep} records missing nextStep`
      });
    }

    if (pending || remoteError || deployDirty) {
      tasks.push({
        lane: "Ops",
        title: "저장/배포 건강도 점검",
        minutes: 8,
        score: 82,
        view: "operating-core",
        why: "자동배포, D1 저장, local fallback이 깨지면 Think Tank OS가 장기 기억이 되지 못합니다.",
        evidence: `pending ${pending} · remote ${remoteError || "ok"} · build ${signals.build?.gitShortSha || "unknown"}${deployDirty ? "+dirty" : ""}`
      });
    }

    return tasks.sort((a, b) => b.score - a.score).slice(0, 7);
  }

  function readinessScore(signals, tasks) {
    const storageScore = signals.pendingSync.reduce((score, item) => score - Math.min(15, item.count * 3), 92);
    const learningScore = Math.min(94, 50 + signals.ce.curriculumDone * 2 + signals.ce.caseAnswers * 2 + signals.english.microAttempts);
    const routineScore = Math.min(96, 55 + Object.keys(doneState()).filter(key => key.startsWith(todayKey())).length * 10);
    const safetyScore = signals.vision.frequentDouble ? 74 : 88;
    return {
      total: Math.max(20, Math.round((storageScore * 0.25) + (learningScore * 0.3) + (routineScore * 0.25) + (safetyScore * 0.2))),
      storage: Math.max(0, Math.round(storageScore)),
      learning: Math.round(learningScore),
      routine: Math.round(routineScore),
      safety: safetyScore,
      topTask: tasks[0]?.title || "운영 브리핑"
    };
  }

  function buildPacket(signals, tasks, score) {
    return {
      schemaVersion: EXPORT_VERSION,
      generatedAt: new Date().toISOString(),
      privacyMode: "redacted-summary-only",
      purpose: "Daily operating briefing for personal AI Think Tank OS",
      build: {
        gitSha: signals.build?.gitSha || null,
        gitShortSha: signals.build?.gitShortSha || null,
        source: signals.build?.source || null,
        gitDirty: Boolean(signals.build?.gitDirty)
      },
      readiness: score,
      todayTasks: tasks.map(task => ({
        lane: task.lane,
        title: task.title,
        minutes: task.minutes,
        why: task.why,
        evidence: task.evidence
      })),
      weaknesses: {
        ce: signals.ce.weaknesses,
        english: signals.english.weaknesses,
        vision: {
          sessions: signals.vision.sessions,
          highDiplopiaSignals: signals.vision.frequentDouble
        }
      },
      dataHealth: {
        pages: signals.pages.length,
        thinkTankEntries: signals.thinkTankSummary.entries,
        pendingSync: signals.pendingSync,
        localStorageMb: signals.storage.totalMb,
        remoteStatus: state.remote.error ? "remote-unavailable" : state.remote.ops ? "remote-connected" : "local-only"
      },
      neverInclude: SENSITIVE_BLOCKLIST,
      nextSevenDays: tasks.slice(0, 5).map((task, index) => ({
        day: index + 1,
        focus: task.title,
        reason: task.why
      }))
    };
  }

  async function loadBuildInfo() {
    try {
      const response = await fetch(`/build-info.json?core=${Date.now()}`, { cache: "no-store" });
      if (response.ok) state.buildInfo = await response.json();
    } catch {
      state.buildInfo = null;
    }
  }

  async function loadRemote() {
    state.remote.loading = true;
    state.remote.error = "";
    render();
    try {
      const [opsResponse, briefingResponse, packetResponse] = await Promise.all([
        fetch("/api/v4/ops-status", { cache: "no-store" }),
        fetch("/api/v4/coach-briefing", { cache: "no-store" }),
        fetch("/api/v4/ai-packet?type=redacted-life-intelligence", { cache: "no-store" })
      ]);
      if (!opsResponse.ok) throw new Error(`ops ${opsResponse.status}`);
      if (!briefingResponse.ok) throw new Error(`briefing ${briefingResponse.status}`);
      if (!packetResponse.ok) throw new Error(`packet ${packetResponse.status}`);
      state.remote.ops = (await opsResponse.json()).status || null;
      state.remote.briefing = (await briefingResponse.json()).briefing || null;
      state.remote.packet = (await packetResponse.json()).packet || null;
    } catch (error) {
      state.remote.error = error.message || "remote unavailable";
      state.remote.ops = null;
      state.remote.briefing = null;
      state.remote.packet = null;
    } finally {
      state.remote.loading = false;
      render();
    }
  }

  async function copyText(text, statusSelector) {
    const status = document.querySelector(statusSelector);
    try {
      await navigator.clipboard.writeText(text);
      if (status) status.textContent = "복사 완료";
    } catch {
      if (status) status.textContent = "복사 실패. 브라우저 권한을 확인하세요.";
    }
  }

  function downloadJson(filename, data) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 500);
  }

  function renderTask(task, done) {
    return `
      <article class="ops-task ${done ? "done" : ""}">
        <div>
          <span>${escapeHtml(task.lane)} · ${task.minutes}분</span>
          <strong>${escapeHtml(task.title)}</strong>
          <p>${escapeHtml(task.why)}</p>
          <small>${escapeHtml(task.evidence)}</small>
        </div>
        <div class="ops-task-actions">
          <button class="secondary" type="button" data-core-view="${escapeHtml(task.view)}">열기</button>
          <button class="primary" type="button" data-core-done="${escapeHtml(taskId(task))}">${done ? "완료됨" : "완료"}</button>
        </div>
      </article>
    `;
  }

  function renderWeakness(signals) {
    const ce = signals.ce.weaknesses.slice(0, 4);
    const english = signals.english.weaknesses.slice(0, 4);
    const empty = `<span class="ops-chip calm">데이터 대기</span>`;
    return `
      <section class="ops-card">
        <p class="eyebrow">weakness graph</p>
        <h2>반복 약점 큐</h2>
        <div class="ops-chip-grid">
          <article>
            <strong>CE 사고</strong>
            <div>${ce.length ? ce.map(item => `<span class="ops-chip">${escapeHtml(item.skill)} ${item.count}</span>`).join("") : empty}</div>
          </article>
          <article>
            <strong>영어</strong>
            <div>${english.length ? english.map(item => `<span class="ops-chip">${escapeHtml(item.skill)} ${item.wrong}</span>`).join("") : empty}</div>
          </article>
          <article>
            <strong>시기능</strong>
            <div>
              <span class="ops-chip ${signals.vision.frequentDouble ? "risk" : "calm"}">${signals.vision.frequentDouble ? `고복시 신호 ${signals.vision.frequentDouble}` : "위험 신호 낮음"}</span>
              <span class="ops-chip">${signals.vision.sessions} sessions</span>
            </div>
          </article>
        </div>
      </section>
    `;
  }

  function renderDataHealth(signals) {
    const pending = signals.pendingSync;
    const remoteState = state.remote.loading ? "확인 중" : state.remote.error ? "local-only" : state.remote.ops ? "D1 connected" : "대기";
    return `
      <section class="ops-card">
        <p class="eyebrow">data health</p>
        <h2>장기 기억 상태</h2>
        <div class="ops-metric-grid">
          <article><span>Pages</span><strong>${signals.pages.length}</strong><small>책장 구조 기록</small></article>
          <article><span>Think Tank</span><strong>${signals.thinkTankSummary.entries}</strong><small>${signals.thinkTankSummary.missingNextStep} missing nextStep</small></article>
          <article><span>Local cache</span><strong>${signals.storage.totalMb}MB</strong><small>${signals.storage.totalKeys} keys</small></article>
          <article><span>Remote</span><strong>${escapeHtml(remoteState)}</strong><small>${escapeHtml(state.remote.error || "D1/Worker API status")}</small></article>
        </div>
        <div class="ops-flow">
          ${pending.map(item => `<span><b>${escapeHtml(item.lane)}</b>${item.count} pending</span>`).join("")}
        </div>
      </section>
    `;
  }

  function renderDeployment(signals) {
    const build = signals.build || {};
    return `
      <section class="ops-card">
        <p class="eyebrow">deployment gate</p>
        <h2>공개 URL 검증</h2>
        <div class="ops-deploy-row">
          <article>
            <span>Current build</span>
            <strong>${escapeHtml(build.gitShortSha || "unknown")}${build.gitDirty ? "+dirty" : ""}</strong>
            <small>${escapeHtml(build.source || "unknown")} · ${escapeHtml(build.buildTime || "build-info 대기")}</small>
          </article>
          <article>
            <span>Autodeploy</span>
            <strong>GitHub Actions</strong>
            <small>CLOUDFLARE_ACCOUNT_ID + CLOUDFLARE_API_TOKEN 필요</small>
          </article>
        </div>
        <p class="ops-note">자동배포는 /build-info.json의 gitSha와 GITHUB_SHA를 비교합니다. 공개 URL이 이전 커밋을 서빙하면 성공으로 처리하지 않습니다.</p>
      </section>
    `;
  }

  function renderPacketPanel(packet) {
    return `
      <section class="ops-card ops-packet-card">
        <p class="eyebrow">AI packet center</p>
        <h2>오늘 AI에게 보여줄 요약</h2>
        <p>민감 원문, 건강/자산 원본, 고객자료, recipe, setpoint, bypass 정보는 제외하고 행동 가능한 요약만 만듭니다.</p>
        <pre>${escapeHtml(JSON.stringify(packet, null, 2).slice(0, 2400))}</pre>
        <div class="ops-actions">
          <button class="primary" type="button" data-core-copy-packet>packet 복사</button>
          <button class="secondary" type="button" data-core-download-packet>JSON 다운로드</button>
          <small class="ops-copy-status"></small>
        </div>
      </section>
    `;
  }

  function render() {
    const root = document.querySelector(`#${ROOT_ID}`);
    if (!root) return;
    const signals = collectLocalSignals();
    const tasks = priorityTasks(signals);
    const score = readinessScore(signals, tasks);
    const done = doneState();
    const packet = buildPacket(signals, tasks, score);
    state.lastRenderAt = new Date().toISOString();

    root.innerHTML = `
      <section class="ops-core-shell">
        <article class="ops-hero">
          <div>
            <p class="eyebrow">Project Universe OS v6</p>
            <h2>오늘의 행동을 자동으로 정렬하는 운영 코어</h2>
            <p>책장, FEP/EPI, 영어, 인지훈련, 시기능, Think Tank, 배포 상태를 한 화면에서 읽고 오늘 할 일을 산출합니다.</p>
          </div>
          <div class="ops-score-card">
            <span>Operating score</span>
            <strong>${score.total}</strong>
            <small>top action · ${escapeHtml(score.topTask)}</small>
            <i><em style="width:${score.total}%"></em></i>
          </div>
        </article>

        <section class="ops-score-grid">
          <article><span>Storage</span><strong>${score.storage}</strong><small>pending sync와 local cache</small></article>
          <article><span>Learning</span><strong>${score.learning}</strong><small>CE/영어/커리큘럼 신호</small></article>
          <article><span>Routine</span><strong>${score.routine}</strong><small>오늘 완료 루틴</small></article>
          <article><span>Safety</span><strong>${score.safety}</strong><small>시기능/위험 경계</small></article>
        </section>

        <section class="ops-main-grid">
          <article class="ops-card ops-today-card">
            <div class="ops-card-head">
              <div>
                <p class="eyebrow">today engine</p>
                <h2>오늘의 자동 우선순위</h2>
              </div>
              <button class="secondary" type="button" data-core-refresh>새로고침</button>
            </div>
            <div class="ops-task-list">
              ${tasks.map(task => renderTask(task, Boolean(done[taskId(task)]))).join("")}
            </div>
          </article>
          <aside class="ops-side-stack">
            ${renderDataHealth(signals)}
            ${renderDeployment(signals)}
          </aside>
        </section>

        <section class="ops-main-grid compact">
          ${renderWeakness(signals)}
          ${renderPacketPanel(packet)}
        </section>
      </section>
    `;

    bind(packet);
  }

  function bind(packet) {
    document.querySelectorAll("[data-core-view]").forEach(button => {
      button.addEventListener("click", () => {
        if (window.showView) window.showView(button.dataset.coreView);
      });
    });
    document.querySelectorAll("[data-core-done]").forEach(button => {
      button.addEventListener("click", () => {
        const next = doneState();
        next[button.dataset.coreDone] = new Date().toISOString();
        saveJson(DONE_KEY, next);
        render();
      });
    });
    document.querySelector("[data-core-refresh]")?.addEventListener("click", async () => {
      await loadBuildInfo();
      await loadRemote();
    });
    document.querySelector("[data-core-copy-packet]")?.addEventListener("click", () => {
      copyText(JSON.stringify(packet, null, 2), ".ops-copy-status");
    });
    document.querySelector("[data-core-download-packet]")?.addEventListener("click", () => {
      downloadJson(`project-universe-operating-packet-${todayKey()}.json`, packet);
    });
  }

  async function init() {
    await loadBuildInfo();
    render();
    if (document.body.classList.contains("auth-unlocked")) loadRemote();
    document.addEventListener("project-universe-unlocked", loadRemote);
  }

  document.addEventListener("DOMContentLoaded", init);
  window.ProjectUniverseOperatingCore = {
    render,
    collectLocalSignals,
    priorityTasks,
    buildPacket: () => {
      const signals = collectLocalSignals();
      const tasks = priorityTasks(signals);
      return buildPacket(signals, tasks, readinessScore(signals, tasks));
    },
    refreshRemote: loadRemote
  };
})();
