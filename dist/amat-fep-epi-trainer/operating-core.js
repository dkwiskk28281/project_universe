(() => {
  const ROOT_ID = "operating-core-root";
  const DONE_KEY = "projectUniverseOperatingCoreDoneV1";
  const ROUTINE_KEY = "projectUniverseDailyRoutineLogV1";
  const INTEGRITY_LEDGER_KEY = "projectUniverseIntegrityLedgerV1";
  const EXPORT_VERSION = "project-universe-operating-core-v6";
  const REQUIRED_RECORD_FIELDS = ["schemaVersion", "privacyLevel", "syncStatus", "sourceDevice", "createdAt", "updatedAt", "exportPolicy"];
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

  function hashString(value) {
    let hash = 2166136261;
    const text = String(value);
    for (let index = 0; index < text.length; index += 1) {
      hash ^= text.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return `fnv1a-${(hash >>> 0).toString(16).padStart(8, "0")}`;
  }

  function routineLog() {
    return safeJson(ROUTINE_KEY, {});
  }

  function routineDoneState() {
    return routineLog()[todayKey()] || {};
  }

  function segmentId(segment) {
    return `${todayKey()}:${segment.id}`;
  }

  function fieldDebtForRecord(record = {}) {
    return REQUIRED_RECORD_FIELDS.filter(field => !record[field]);
  }

  function dataIntegrity(signals) {
    const pages = Array.isArray(signals.pages) ? signals.pages : [];
    const thinkTank = Array.isArray(signals.thinkTank) ? signals.thinkTank : [];
    const recordSets = [
      ...pages.map(record => ({ type: "bookshelf", record })),
      ...thinkTank.map(record => ({ type: "thinkTank", record }))
    ];
    const missingFieldRows = recordSets
      .map(item => ({ ...item, missing: fieldDebtForRecord(item.record) }))
      .filter(item => item.missing.length);
    const duplicateIds = [...recordSets.reduce((map, item) => {
      const id = item.record?.id || item.record?.title || "unknown";
      map.set(id, (map.get(id) || 0) + 1);
      return map;
    }, new Map()).entries()].filter(([, count]) => count > 1);
    const pending = signals.pendingSync.reduce((sum, item) => sum + item.count, 0);
    const evidenceMissing = pages.filter(page => !(page.evidence || page.sourceUrl || page.sourceTitle)).length;
    const fileIndexes = pages.reduce((sum, page) => sum + (Array.isArray(page.fileIndex) ? page.fileIndex.length : 0), 0);
    const nextStepMissing = signals.thinkTankSummary.missingNextStep;
    const lastCheckpoint = safeJson(INTEGRITY_LEDGER_KEY, []).slice(-1)[0] || null;
    const score = Math.max(10, Math.round(
      96
      - Math.min(28, missingFieldRows.length * 2)
      - Math.min(22, pending * 4)
      - Math.min(18, evidenceMissing * 2)
      - Math.min(14, duplicateIds.length * 5)
    ));
    return {
      score,
      schemaDebt: missingFieldRows.length,
      duplicateIds: duplicateIds.length,
      pendingSync: pending,
      evidenceMissing,
      fileIndexes,
      nextStepMissing,
      lastCheckpoint,
      status: score >= 85 ? "stable" : score >= 65 ? "needs-review" : "repair-first",
      checklist: [
        missingFieldRows.length ? `${missingFieldRows.length}개 기록에 schema metadata 보강 필요` : "schema metadata debt 없음",
        pending ? `${pending}개 sync pending 기록 확인 필요` : "sync pending 없음",
        evidenceMissing ? `${evidenceMissing}개 기록에 evidence/source 보강 권장` : "근거 없는 책장 기록 없음",
        duplicateIds.length ? `${duplicateIds.length}개 중복 id 후보` : "중복 id 후보 없음",
        fileIndexes ? `${fileIndexes}개 file index: 원문은 R2/D-drive, D1은 summary/hash만` : "File Vault index 없음: 원문 파일은 D1에 넣지 않기",
        lastCheckpoint ? `마지막 checkpoint ${new Date(lastCheckpoint.createdAt).toLocaleString()}` : "아직 integrity checkpoint 없음"
      ]
    };
  }

  function makeDailyRoutine(signals, tasks, integrity) {
    const englishWeak = signals.english.weaknesses[0]?.skill || "technical English";
    const ceWeak = signals.ce.weaknesses[0]?.skill || "evidence-first 판단";
    const msReady = signals.pages.some(page => page.bookId === "materials-ms-academy") || Object.keys(signals.trainer.curriculumDone || {}).length;
    return [
      {
        id: "warmup",
        minutes: 3,
        lane: "정렬",
        view: "operating-core",
        title: "오늘의 운영 브리핑 읽기",
        reason: "기록, 약점, 저장 상태를 먼저 보고 공부 순서를 고정합니다.",
        evidence: `${tasks.length} actions · integrity ${integrity.score}`
      },
      {
        id: "ce-case",
        minutes: 8,
        lane: "CE",
        view: "diagnostics",
        title: `${ceWeak} 케이스 판단 1개`,
        reason: "증상에서 바로 행동하지 않고 risk, subsystem, evidence, stop condition을 고르는 훈련입니다.",
        evidence: `${signals.ce.caseAnswers} case answers · ${signals.ce.weaknesses.length} weak tags`
      },
      {
        id: "epi-visual",
        minutes: 7,
        lane: "EPI",
        view: signals.ce.weaknesses.length ? "process-visual" : "systems",
        title: "wafer path와 공정 상태를 눈으로 복기",
        reason: "FOUP, EFEM, Load Lock, TM, PM, gas, pump, exhaust가 하나의 머릿속 모델로 연결돼야 합니다.",
        evidence: "module map · pressure/gas/robot state"
      },
      {
        id: "english",
        minutes: 5,
        lane: "영어",
        view: "english-test",
        title: `${englishWeak} 즉시채점 복습`,
        reason: "한 문제를 풀고 해설과 변형문제를 바로 봐야 실제 CBT와 고객 보고 영어가 쌓입니다.",
        evidence: `${signals.english.due} due · accuracy ${signals.english.accuracy ?? "n/a"}%`
      },
      {
        id: "fellow-route",
        minutes: 5,
        lane: "Fellow",
        view: msReady ? "materials-ms" : "fellow",
        title: msReady ? "Materials MS 선수개념 1개" : "Fellow 로드맵 gap 확인",
        reason: "수학, 물리, 화학, 재료공학, 결정성장, 박막, 통계, DOE를 장기 커리큘럼으로 이어갑니다.",
        evidence: `${signals.ce.curriculumDone} curriculum marks · ${signals.pages.length} records`
      },
      {
        id: "record",
        minutes: 2,
        lane: "기록",
        view: "bookshelf",
        title: integrity.nextStepMissing ? "nextStep 없는 기록 1개 닫기" : "AI packet checkpoint 생성",
        reason: "공부가 기억으로 남으려면 action/result/nextStep 또는 checkpoint가 필요합니다.",
        evidence: `${integrity.nextStepMissing} missing nextStep · ${integrity.pendingSync} sync pending`
      }
    ];
  }

  function routineProgress(routine) {
    const done = routineDoneState();
    const total = routine.reduce((sum, segment) => sum + segment.minutes, 0);
    const completed = routine.filter(segment => done[segmentId(segment)]).reduce((sum, segment) => sum + segment.minutes, 0);
    return {
      total,
      completed,
      percent: total ? Math.round(completed / total * 100) : 0
    };
  }

  function aiAnalysis(signals, tasks, integrity) {
    const weak = [
      ...signals.ce.weaknesses.slice(0, 3).map(item => `CE:${item.skill}`),
      ...signals.english.weaknesses.slice(0, 3).map(item => `EN:${item.skill}`)
    ];
    const patterns = [
      integrity.nextStepMissing ? "open-loop 기록이 남아 있어 다음 행동이 흐려질 수 있음" : "기록의 다음 행동 연결이 안정적",
      integrity.evidenceMissing ? "근거 없는 기록이 있어 AI 분석 신뢰도가 낮아질 수 있음" : "evidence 기반 기록 비율 양호",
      signals.english.due ? "영어 복습 대기열이 오늘 루틴 우선순위에 들어감" : "영어 복습 대기열은 낮음",
      signals.ce.weaknesses.length ? "CE 판단 약점은 케이스 게임으로 재훈련 필요" : "CE 약점 데이터가 부족하므로 새 케이스가 필요"
    ];
    return {
      weak,
      patterns,
      nextActions: tasks.slice(0, 4).map(task => task.title),
      exportBoundary: [
        "AI에게는 redacted packet 먼저 제공",
        "건강/자산/가족 기록은 privacyLevel 확인 후 별도 packet",
        "recipe, setpoint, bypass, 고객자료, manual 원문은 제외"
      ]
    };
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

  function readinessScore(signals, tasks, integrity = null) {
    const storageScore = signals.pendingSync.reduce((score, item) => score - Math.min(15, item.count * 3), 92);
    const learningScore = Math.min(94, 50 + signals.ce.curriculumDone * 2 + signals.ce.caseAnswers * 2 + signals.english.microAttempts);
    const routineScore = Math.min(96, 55 + Object.keys(doneState()).filter(key => key.startsWith(todayKey())).length * 10);
    const safetyScore = signals.vision.frequentDouble ? 74 : 88;
    const integrityScore = integrity?.score ?? storageScore;
    return {
      total: Math.max(20, Math.round((integrityScore * 0.24) + (learningScore * 0.28) + (routineScore * 0.24) + (safetyScore * 0.14) + (storageScore * 0.1))),
      storage: Math.max(0, Math.round(storageScore)),
      integrity: integrityScore,
      learning: Math.round(learningScore),
      routine: Math.round(routineScore),
      safety: safetyScore,
      topTask: tasks[0]?.title || "운영 브리핑"
    };
  }

  function buildPacket(signals, tasks, score, routine = [], integrity = null, analysis = null) {
    const packet = {
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
      dailyRoutine30m: routine.map(segment => ({
        lane: segment.lane,
        title: segment.title,
        minutes: segment.minutes,
        why: segment.reason,
        evidence: segment.evidence,
        linkedView: segment.view
      })),
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
        integrity,
        remoteStatus: state.remote.error ? "remote-unavailable" : state.remote.ops ? "remote-connected" : "local-only"
      },
      aiAnalysis: analysis,
      neverInclude: SENSITIVE_BLOCKLIST,
      nextSevenDays: tasks.slice(0, 5).map((task, index) => ({
        day: index + 1,
        focus: task.title,
        reason: task.why
      }))
    };
    packet.integrityHash = hashString(JSON.stringify({
      schemaVersion: packet.schemaVersion,
      generatedAt: packet.generatedAt,
      readiness: packet.readiness,
      dailyRoutine30m: packet.dailyRoutine30m,
      dataHealth: packet.dataHealth,
      weaknesses: packet.weaknesses,
      aiAnalysis: packet.aiAnalysis
    }));
    return packet;
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

  function renderDailyRoutine(routine) {
    const done = routineDoneState();
    const progress = routineProgress(routine);
    return `
      <section class="ops-card ops-routine-card">
        <div class="ops-card-head">
          <div>
            <p class="eyebrow">30-minute operating routine</p>
            <h2>오늘 30분 루틴</h2>
          </div>
          <div class="ops-mini-ring" aria-label="오늘 루틴 진행률">
            <strong>${progress.percent}%</strong>
            <span>${progress.completed}/${progress.total}분</span>
          </div>
        </div>
        <div class="ops-routine-timeline">
          ${routine.map(segment => {
            const isDone = Boolean(done[segmentId(segment)]);
            return `
              <article class="${isDone ? "done" : ""}">
                <time>${segment.minutes}분</time>
                <div>
                  <span>${escapeHtml(segment.lane)}</span>
                  <strong>${escapeHtml(segment.title)}</strong>
                  <p>${escapeHtml(segment.reason)}</p>
                  <small>${escapeHtml(segment.evidence)}</small>
                </div>
                <div class="ops-routine-actions">
                  <button class="secondary" type="button" data-core-view="${escapeHtml(segment.view)}">열기</button>
                  <button class="primary" type="button" data-routine-done="${escapeHtml(segmentId(segment))}">${isDone ? "완료됨" : "완료"}</button>
                </div>
              </article>
            `;
          }).join("")}
        </div>
      </section>
    `;
  }

  function renderIntegrityPanel(integrity) {
    return `
      <section class="ops-card ops-integrity-card">
        <div class="ops-card-head">
          <div>
            <p class="eyebrow">data integrity OS</p>
            <h2>데이터 무결성 운영판</h2>
          </div>
          <span class="ops-integrity-state ${escapeHtml(integrity.status)}">${escapeHtml(integrity.status)}</span>
        </div>
        <div class="ops-integrity-score">
          <strong>${integrity.score}</strong>
          <span>schema · sync · evidence · conflict</span>
        </div>
        <div class="ops-integrity-list">
          ${integrity.checklist.map(item => `<span>${escapeHtml(item)}</span>`).join("")}
        </div>
        <div class="ops-actions">
          <button class="primary" type="button" data-integrity-checkpoint>checkpoint 저장</button>
          <button class="secondary" type="button" data-core-view="bookshelf">기록 정리</button>
          <small class="ops-integrity-status">${integrity.lastCheckpoint ? "마지막 checkpoint가 있습니다." : "첫 checkpoint를 만들면 AI packet 신뢰도를 추적할 수 있습니다."}</small>
        </div>
      </section>
    `;
  }

  function renderAiAnalysisPanel(analysis) {
    return `
      <section class="ops-card ops-analysis-card">
        <p class="eyebrow">AI think tank center</p>
        <h2>AI가 읽기 좋은 오늘의 해석</h2>
        <div class="ops-analysis-grid">
          <article>
            <strong>반복 약점</strong>
            <div>${analysis.weak.length ? analysis.weak.map(item => `<span class="ops-chip">${escapeHtml(item)}</span>`).join("") : `<span class="ops-chip calm">데이터 대기</span>`}</div>
          </article>
          <article>
            <strong>패턴</strong>
            ${analysis.patterns.map(item => `<p>${escapeHtml(item)}</p>`).join("")}
          </article>
          <article>
            <strong>다음 행동</strong>
            ${analysis.nextActions.map(item => `<p>${escapeHtml(item)}</p>`).join("")}
          </article>
          <article>
            <strong>AI export 경계</strong>
            ${analysis.exportBoundary.map(item => `<p>${escapeHtml(item)}</p>`).join("")}
          </article>
        </div>
      </section>
    `;
  }

  function renderFellowBridge(signals, integrity) {
    const mathGap = signals.pages.some(page => /math|수학|log|calculus|통계|DOE/i.test(`${page.topic || ""} ${page.title || ""}`)) ? "진행 중" : "진단 필요";
    const epiEvidence = signals.ce.weaknesses.length ? `${signals.ce.weaknesses[0].skill} 약점부터` : "새 CE case 필요";
    return `
      <section class="ops-card ops-fellow-bridge">
        <p class="eyebrow">Fellow route bridge</p>
        <h2>FEP/EPI에서 Fellow까지 이어지는 다음 산</h2>
        <div class="ops-bridge-grid">
          <article>
            <span>Materials MS Academy</span>
            <strong>${escapeHtml(mathGap)}</strong>
            <small>수학 → 물리 → 화학 → 재료공학 → 박막/EPI로 이어지는 선수지식 엔진</small>
            <button class="secondary" type="button" data-core-view="materials-ms">열기</button>
          </article>
          <article>
            <span>CE Campaign Game</span>
            <strong>${escapeHtml(epiEvidence)}</strong>
            <small>증상, evidence, owner, stop condition, customer report를 게임처럼 반복</small>
            <button class="secondary" type="button" data-core-view="diagnostics">시작</button>
          </article>
          <article>
            <span>Data Quality</span>
            <strong>${integrity.score}</strong>
            <small>Fellow급 사고는 기억이 아니라 추적 가능한 evidence portfolio에서 나옵니다.</small>
            <button class="secondary" type="button" data-core-view="bookshelf">정리</button>
          </article>
        </div>
      </section>
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
    const previewPacket = {
      integrityHash: packet.integrityHash,
      schemaVersion: packet.schemaVersion,
      generatedAt: packet.generatedAt,
      privacyMode: packet.privacyMode,
      readiness: packet.readiness,
      dailyRoutine30m: packet.dailyRoutine30m,
      dataHealth: packet.dataHealth,
      aiAnalysis: packet.aiAnalysis,
      weaknesses: packet.weaknesses,
      neverInclude: packet.neverInclude
    };
    return `
      <section class="ops-card ops-packet-card">
        <p class="eyebrow">AI packet center</p>
        <h2>오늘 AI에게 보여줄 요약</h2>
        <p>민감 원문, 건강/자산 원본, 고객자료, recipe, setpoint, bypass 정보는 제외하고 행동 가능한 요약만 만듭니다.</p>
        <pre>${escapeHtml(JSON.stringify(previewPacket, null, 2).slice(0, 3200))}</pre>
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
    const integrity = dataIntegrity(signals);
    const routine = makeDailyRoutine(signals, tasks, integrity);
    const analysis = aiAnalysis(signals, tasks, integrity);
    const score = readinessScore(signals, tasks, integrity);
    const done = doneState();
    const packet = buildPacket(signals, tasks, score, routine, integrity, analysis);
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
          <article><span>Integrity</span><strong>${score.integrity}</strong><small>schema/sync/conflict</small></article>
          <article><span>Learning</span><strong>${score.learning}</strong><small>CE/영어/커리큘럼 신호</small></article>
          <article><span>Routine</span><strong>${score.routine}</strong><small>오늘 완료 루틴</small></article>
          <article><span>Safety</span><strong>${score.safety}</strong><small>시기능/위험 경계</small></article>
        </section>

        ${renderDailyRoutine(routine)}

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
          ${renderIntegrityPanel(integrity)}
          ${renderAiAnalysisPanel(analysis)}
        </section>

        ${renderFellowBridge(signals, integrity)}

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
    document.querySelectorAll("[data-routine-done]").forEach(button => {
      button.addEventListener("click", () => {
        const log = routineLog();
        log[todayKey()] = log[todayKey()] || {};
        log[todayKey()][button.dataset.routineDone] = new Date().toISOString();
        saveJson(ROUTINE_KEY, log);
        render();
      });
    });
    document.querySelector("[data-integrity-checkpoint]")?.addEventListener("click", () => {
      const signals = collectLocalSignals();
      const integrity = dataIntegrity(signals);
      const ledger = safeJson(INTEGRITY_LEDGER_KEY, []);
      const checkpoint = {
        schemaVersion: "project-universe-integrity-checkpoint-v1",
        createdAt: new Date().toISOString(),
        score: integrity.score,
        status: integrity.status,
        schemaDebt: integrity.schemaDebt,
        pendingSync: integrity.pendingSync,
        evidenceMissing: integrity.evidenceMissing,
        nextStepMissing: integrity.nextStepMissing,
        hash: hashString(JSON.stringify({
          pages: signals.pages.map(page => [page.id, page.updatedAt, page.title, page.nextStep, page.evidence]),
          thinkTank: signals.thinkTank.map(entry => [entry.id, entry.updatedAt, entry.symptom, entry.nextStep, entry.evidence]),
          storageMb: signals.storage.totalMb
        }))
      };
      saveJson(INTEGRITY_LEDGER_KEY, [...ledger.slice(-29), checkpoint]);
      const status = document.querySelector(".ops-integrity-status");
      if (status) status.textContent = `checkpoint 저장 완료 · ${checkpoint.hash}`;
      render();
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
      const integrity = dataIntegrity(signals);
      const routine = makeDailyRoutine(signals, tasks, integrity);
      const analysis = aiAnalysis(signals, tasks, integrity);
      return buildPacket(signals, tasks, readinessScore(signals, tasks, integrity), routine, integrity, analysis);
    },
    refreshRemote: loadRemote
  };
})();
