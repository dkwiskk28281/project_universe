(() => {
  const ROOT_ID = "field-log-root";
  const FIELD_LOG_KEY = "projectUniverseFieldDailyLogsV1";
  const FIELD_PENDING_KEY = "projectUniverseFieldDailyPendingV1";
  const BOOKSHELF_PAGE_KEY = "projectUniverseBookshelfPages";
  const SOURCE_DEVICE_KEY = "projectUniverseSourceDevice";
  const CLIENT_PASS_KEY = "ceTrainerPass";
  const REMOTE_TOKEN_KEY = "epiThinkTankRemoteToken";
  const LOCAL_TOKEN_KEY = "epiThinkTankLocalToken";
  const SCHEMA_VERSION = "field-daily-log-v1";
  const BOOK_ID = "field-daily-log";
  const BOOK_TITLE = "현장 데일리 로그";
  const REMOTE_VAULT_API = "https://projectuniverse.chang2058.workers.dev";
  const LOCAL_VAULT_API = "http://127.0.0.1:4180";
  const EPI_VAULT_CONFIG = window.EPI_VAULT_CONFIG || {};
  const isLocalBrowserHost = ["127.0.0.1", "localhost", "::1"].includes(location.hostname);
  const isPersonalServerProxy = location.pathname.startsWith("/personal-server");
  const isCloudflareWorkerHost = location.hostname.endsWith(".workers.dev");
  const isLocalWorkerPreview = isLocalBrowserHost && Boolean(location.port) && location.port !== "4180";
  const API_BASE = EPI_VAULT_CONFIG.apiUrl ||
    (isPersonalServerProxy ? `${location.origin}/personal-server` : "") ||
    (isCloudflareWorkerHost || isLocalWorkerPreview ? location.origin : "") ||
    (location.port === "4180" ? location.origin : REMOTE_VAULT_API);

  let draftAnalysis = null;
  let draftForm = null;
  let saveStatus = "로컬 준비";
  let latestCodexPacket = "";

  const phaseOptions = [
    "site readiness",
    "move-in / rigging",
    "set in place / leveling",
    "facility hook-up",
    "power-on",
    "pumpdown",
    "gas readiness",
    "dry run",
    "baseline wafer",
    "qualification",
    "handover",
    "PM / recovery",
    "troubleshooting",
    "customer communication",
    "learning note"
  ];

  const toolOptions = [
    "Centura EPI",
    "Vantage RTP",
    "EPI platform",
    "RTP platform",
    "EFEM / FI",
    "Load Lock",
    "Transfer Module",
    "Process Module",
    "Gas Box / MFC",
    "Pump / Exhaust / Abatement",
    "Facility / Hook-up",
    "Electrical / DVM",
    "Metrology / Data",
    "기타 / 모름"
  ];

  const sensitivePatterns = [
    ["recipe", "recipe"],
    ["valve sequence", "valve sequence"],
    ["detector setpoint", "detector setpoint"],
    ["interlock bypass", "interlock bypass"],
    ["site-specific acceptance", "site-specific acceptance limit"],
    ["password", "password"],
    ["seed phrase", "seed phrase"],
    ["serial", "serial 전체"],
    ["계정", "계정/보안 정보"],
    ["비밀번호", "비밀번호"],
    ["레시피", "recipe"],
    ["밸브 시퀀스", "valve sequence"],
    ["바이패스", "interlock bypass"],
    ["셋포인트", "setpoint"],
    ["고객자료", "고객 비공개자료"],
    ["매뉴얼 원문", "manual 원문"]
  ];

  const entityDictionary = [
    "Centura", "Vantage", "EPI", "RTP", "EFEM", "FI", "FOUP", "Load Port", "Load Lock", "LL",
    "Transfer Module", "TM", "Process Module", "PM", "Clean Module", "CM", "Gas Box", "MFC",
    "Pump", "Exhaust", "Abatement", "PCW", "CDA", "DVM", "DMM", "Relay", "PLC", "Interlock",
    "wafer", "baseline", "qualification", "hook-up", "pumpdown", "purge", "dry run", "handover"
  ];

  const subsystemRules = [
    ["gas", ["gas", "mfc", "purge", "h2", "si", "ge", "ph3", "b2h6", "ash3", "가스", "퍼지"]],
    ["vacuum", ["pump", "pumpdown", "pressure", "leak", "foreline", "진공", "압력", "펌프", "리크"]],
    ["wafer-handling", ["efem", "foup", "load lock", "robot", "tm", "wafer", "slot", "mapping", "웨이퍼", "로봇"]],
    ["thermal", ["temperature", "ramp", "soak", "lamp", "pyrometer", "온도", "히터", "램프"]],
    ["electrical-controls", ["dvm", "dmm", "relay", "plc", "interlock", "sensor", "24v", "전기", "릴레이", "센서"]],
    ["facility", ["hook-up", "pcw", "cda", "exhaust", "abatement", "power", "facility", "유틸", "시설", "배기"]],
    ["metrology", ["metrology", "thickness", "rs", "particle", "defect", "map", "uniformity", "계측", "파티클", "결함"]],
    ["communication", ["customer", "handover", "owner", "report", "고객", "보고", "오너", "인수인계"]]
  ];

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

  function sourceDeviceId() {
    try {
      const existing = localStorage.getItem(SOURCE_DEVICE_KEY);
      if (existing) return existing;
      const next = `device-${uid().slice(0, 18)}`;
      localStorage.setItem(SOURCE_DEVICE_KEY, next);
      return next;
    } catch {
      return "device-session-only";
    }
  }

  function localDateString(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function safeJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      const parsed = JSON.parse(raw);
      return parsed ?? fallback;
    } catch {
      return fallback;
    }
  }

  function saveJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function cleanText(value = "", max = 9000) {
    return String(value || "").replace(/\r\n/g, "\n").trim().slice(0, max);
  }

  function compactText(value = "", max = 320) {
    return String(value || "").replace(/\s+/g, " ").trim().slice(0, max);
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
    return `fnv1a-${(hash >>> 0).toString(16).padStart(8, "0")}`;
  }

  function loadLogs() {
    const logs = safeJson(FIELD_LOG_KEY, []);
    return Array.isArray(logs) ? logs : [];
  }

  function saveLogs(logs) {
    const byId = new Map(loadLogs().map(log => [log.id, log]));
    logs.forEach(log => byId.set(log.id, log));
    saveJson(FIELD_LOG_KEY, [...byId.values()].sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt))));
  }

  function loadPending() {
    const rows = safeJson(FIELD_PENDING_KEY, []);
    return Array.isArray(rows) ? rows : [];
  }

  function queuePending(log) {
    const byId = new Map(loadPending().map(item => [item.id, item]));
    byId.set(log.id, { ...log, syncStatus: "pending D1 sync" });
    saveJson(FIELD_PENDING_KEY, [...byId.values()]);
  }

  function removePending(id) {
    saveJson(FIELD_PENDING_KEY, loadPending().filter(item => item.id !== id));
  }

  function sessionPassword() {
    return sessionStorage.getItem(CLIENT_PASS_KEY) || "";
  }

  function tokenForApi(base = API_BASE) {
    return sessionStorage.getItem(base === LOCAL_VAULT_API ? LOCAL_TOKEN_KEY : REMOTE_TOKEN_KEY) || "";
  }

  async function apiFetch(path, options = {}, base = API_BASE) {
    const controller = new AbortController();
    const { timeoutMs, ...fetchOptions } = options;
    const timeout = setTimeout(() => controller.abort(), timeoutMs || 2500);
    const token = tokenForApi(base);
    try {
      const response = await fetch(`${base}${path}`, {
        ...fetchOptions,
        signal: controller.signal,
        credentials: base === LOCAL_VAULT_API ? "omit" : "include",
        headers: {
          "Content-Type": "application/json",
          "X-ThinkTank-Password": sessionPassword(),
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...(options.headers || {})
        }
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    } finally {
      clearTimeout(timeout);
    }
  }

  function splitSentences(text = "") {
    return String(text || "")
      .split(/(?<=[.!?。！？])\s+|\n+/)
      .map(item => item.trim())
      .filter(Boolean)
      .slice(0, 80);
  }

  function pickSentences(sentences, words, limit = 4) {
    const lowerWords = words.map(word => word.toLowerCase());
    return sentences
      .filter(sentence => {
        const lower = sentence.toLowerCase();
        return lowerWords.some(word => lower.includes(word));
      })
      .slice(0, limit);
  }

  function inferEntities(text, selectedTool) {
    const haystack = `${selectedTool} ${text}`.toLowerCase();
    const entities = entityDictionary.filter(term => haystack.includes(term.toLowerCase()));
    const moduleMatches = text.match(/\b(PM|CM|LL|TM|EFEM|FI)\s*-?\s*\d*\b/gi) || [];
    return [...new Set([...entities, ...moduleMatches.map(item => item.trim())])].slice(0, 18);
  }

  function inferSubsystems(text, tool) {
    const haystack = `${tool} ${text}`.toLowerCase();
    return subsystemRules
      .filter(([, words]) => words.some(word => haystack.includes(word)))
      .map(([subsystem]) => subsystem)
      .slice(0, 6);
  }

  function detectSensitive(text) {
    const lower = String(text || "").toLowerCase();
    return sensitivePatterns
      .filter(([needle]) => lower.includes(String(needle).toLowerCase()))
      .map(([, label]) => label);
  }

  function inferRiskLevel(text, sensitiveHits) {
    const lower = String(text || "").toLowerCase();
    if (sensitiveHits.length) return "security-boundary-review";
    if (/(toxic|pyrophoric|flammable|leak|gas alarm|interlock|wafer break|arc|전기|가스 누출|인터락|웨이퍼 깨짐|화재|독성)/i.test(lower)) return "high";
    if (/(alarm|fail|delay|abnormal|drift|particle|pressure|temperature|error|hold|지연|불량|알람|이상|파티클)/i.test(lower)) return "medium";
    return "low";
  }

  function inferTags(text, phase, tool, riskLevel) {
    const lower = `${phase} ${tool} ${text}`.toLowerCase();
    const tags = [
      "field-daily",
      phase,
      riskLevel !== "low" ? `risk-${riskLevel}` : "",
      lower.includes("install") || lower.includes("설치") ? "install" : "",
      lower.includes("qualification") || lower.includes("baseline") || lower.includes("퀄") ? "qualification" : "",
      lower.includes("customer") || lower.includes("고객") || lower.includes("report") ? "customer-report" : "",
      lower.includes("dvm") || lower.includes("전기") ? "dvm" : "",
      lower.includes("gas") || lower.includes("가스") ? "gas-safety" : "",
      lower.includes("pump") || lower.includes("진공") ? "vacuum" : ""
    ].filter(Boolean);
    return [...new Set(tags)].slice(0, 14);
  }

  function summarizeText(sentences, fallback) {
    const first = sentences.slice(0, 2).join(" ");
    return compactText(first || fallback, 700);
  }

  function analyzeNarrative(form = {}) {
    const narrative = cleanText(form.narrative, 12000);
    const sentences = splitSentences(narrative);
    const sensitiveHits = detectSensitive(narrative);
    const riskLevel = inferRiskLevel(narrative, sensitiveHits);
    const entities = inferEntities(narrative, form.tool);
    const subsystems = inferSubsystems(narrative, form.tool);
    const issue = pickSentences(sentences, ["이슈", "문제", "alarm", "error", "fail", "delay", "지연", "불량", "abnormal", "leak", "particle", "pressure", "temperature"], 5);
    const evidence = pickSentences(sentences, ["확인", "측정", "log", "trace", "trend", "data", "사진", "witness", "압력", "온도", "mfc", "metrology", "계측"], 5);
    const actions = pickSentences(sentences, ["조치", "진행", "요청", "교체", "확인", "보고", "hold", "reset", "align", "hook", "level", "dry run"], 5);
    const results = pickSentences(sentences, ["결과", "완료", "해결", "pass", "fail", "개선", "재발", "pending", "hold", "release"], 4);
    const nextSteps = pickSentences(sentences, ["내일", "다음", "추가", "확인 필요", "follow", "pending", "owner", "eta", "재확인"], 4);
    const tags = inferTags(narrative, form.phase, form.tool, riskLevel);
    const title = compactText(form.title || `${form.date} ${form.tool} ${form.phase}`, 120);
    const summary = summarizeText(sentences, `${form.tool} ${form.phase} 현장 기록`);
    const evidenceText = evidence.length ? evidence.join("\n") : "확인 evidence를 추가로 분리해야 합니다.";
    const actionText = actions.length ? actions.join("\n") : "수행한 action이나 owner 요청을 추가로 분리해야 합니다.";
    const resultText = results.length ? results.join("\n") : "결과/배운 점을 추가로 기록해야 합니다.";
    const nextStepText = nextSteps.length ? nextSteps.join("\n") : "다음 확인 evidence, owner, review date를 지정하세요.";
    const stopCondition = riskLevel === "high"
      ? "가스/전기/인터락/wafer break/배기 관련 불확실성이 있으면 진행보다 hold와 escalation 우선."
      : riskLevel === "security-boundary-review"
        ? "민감 정보 표현이 감지되었습니다. 저장 전에 recipe, setpoint, serial, 고객자료 원문을 제거하세요."
        : "확인 evidence 없이 원인을 단정하거나 고객에게 overpromise하지 않습니다.";
    const customerReport = [
      `확인된 사실: ${issue[0] || summary}`,
      `현재 evidence: ${evidence[0] || "log/trace/witness/metrology 등 추가 확인 필요"}`,
      `진행/조치: ${actions[0] || "owner와 다음 확인 항목 분리 필요"}`,
      `다음 행동: ${nextSteps[0] || "다음 확인 owner와 review time 지정 필요"}`,
      `주의: 비공개 recipe, setpoint, bypass 정보는 공유/저장하지 않음.`
    ].join("\n");
    const learningGaps = [
      subsystems.includes("vacuum") ? "pumpdown curve와 pressure regime 설명 연습" : "",
      subsystems.includes("gas") ? "toxic/pyrophoric/corrosive gas safety boundary 복습" : "",
      subsystems.includes("electrical-controls") ? "DVM expected value와 relay/PLC I/O 기본 복습" : "",
      subsystems.includes("wafer-handling") ? "FOUP-EFEM-LL-TM-PM wafer path 3D mental model 복습" : "",
      subsystems.includes("metrology") ? "wafer map, uniformity, defect density, baseline wafer 해석 복습" : "",
      !subsystems.length ? "장비 구조와 subsystem 분류를 다시 지정" : ""
    ].filter(Boolean);

    return {
      title,
      date: form.date,
      shift: form.shift,
      tool: form.tool,
      phase: form.phase,
      location: form.location,
      summary,
      issue: issue.join("\n") || summary,
      evidence: evidenceText,
      action: actionText,
      result: resultText,
      nextStep: nextStepText,
      stopCondition,
      customerReport,
      riskLevel,
      sensitiveHits,
      tags,
      entities,
      subsystems,
      learningGaps,
      rawNarrative: narrative,
      confidence: sentences.length >= 3 ? "medium" : "low"
    };
  }

  function buildBookshelfPage(analysis, options = {}) {
    const now = new Date().toISOString();
    const id = options.id || `field-log-${analysis.date}-${hashText(`${analysis.title}:${analysis.rawNarrative}`).slice(-10)}`;
    const payload = {
      id,
      schemaVersion: SCHEMA_VERSION,
      type: "Personal Bookshelf Page",
      recordKind: "field-daily-narrative",
      subsystem: analysis.subsystems[0] || analysis.tool || "field-log",
      severity: analysis.riskLevel,
      title: analysis.title,
      pageType: "오늘 현장 서술",
      chapter: analysis.phase,
      topic: `${analysis.tool} / ${analysis.subsystems.join(", ") || "general field"}`,
      privacyLevel: "work-learning",
      exportPolicy: "ai-summary-ok-after-redaction",
      summary: analysis.summary,
      evidence: analysis.evidence,
      action: analysis.action,
      result: `${analysis.result}\n\nStop condition:\n${analysis.stopCondition}\n\nCustomer report draft:\n${analysis.customerReport}`,
      nextAction: analysis.nextStep,
      nextStep: analysis.nextStep,
      tags: analysis.tags,
      entities: analysis.entities,
      weakSpots: analysis.learningGaps,
      bookId: BOOK_ID,
      bookTitle: BOOK_TITLE,
      source: "현장 데일리 로그",
      sourceDevice: sourceDeviceId(),
      aiExportOk: Boolean(options.aiExportOk),
      date: analysis.date,
      createdAt: options.createdAt || now,
      updatedAt: now,
      syncStatus: "local saved",
      privacyBoundary: "recipe, valve sequence, detector setpoint, interlock bypass, customer confidential, site-specific acceptance limit 저장 금지",
      fieldLog: analysis
    };
    payload.integrityHash = hashText(stableJson({
      title: payload.title,
      date: payload.date,
      summary: payload.summary,
      evidence: payload.evidence,
      action: payload.action,
      result: payload.result,
      nextStep: payload.nextStep,
      tags: payload.tags,
      entities: payload.entities
    }));
    return payload;
  }

  function mergeBookshelfPage(page) {
    const current = safeJson(BOOKSHELF_PAGE_KEY, []);
    const byId = new Map(Array.isArray(current) ? current.map(item => [item.id, item]) : []);
    byId.set(page.id, page);
    saveJson(BOOKSHELF_PAGE_KEY, [...byId.values()].sort((a, b) => String(b.updatedAt || b.createdAt).localeCompare(String(a.updatedAt || a.createdAt))));
    window.ProjectUniverseBookshelf?.render?.();
  }

  async function pushLog(log) {
    try {
      const result = await apiFetch("/api/entries", { method: "POST", body: JSON.stringify(log), timeoutMs: 5000 });
      const saved = {
        ...log,
        ...(result.entry || {}),
        syncStatus: "D1 saved",
        remoteSavedAt: result.entry?.remoteSavedAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      saveLogs([saved]);
      mergeBookshelfPage(saved);
      removePending(saved.id);
      saveStatus = "Cloudflare D1 저장 완료";
      return saved;
    } catch {
      queuePending(log);
      saveStatus = "로컬 저장 / D1 재시도 대기";
      return log;
    }
  }

  async function retryPending() {
    const pending = loadPending();
    if (!pending.length) return 0;
    let saved = 0;
    for (const log of pending.slice(0, 20)) {
      const result = await pushLog(log);
      if (result.remoteSavedAt) saved += 1;
    }
    render();
    return saved;
  }

  function buildCodexPacket(analysis, recentLogs = loadLogs()) {
    const safeRecent = recentLogs.slice(0, 8).map(log => ({
      date: log.date,
      title: log.title,
      phase: log.fieldLog?.phase || log.chapter,
      tool: log.fieldLog?.tool,
      riskLevel: log.fieldLog?.riskLevel || log.severity,
      subsystems: log.fieldLog?.subsystems || [],
      summary: log.summary,
      evidence: log.evidence,
      action: log.action,
      result: log.result,
      nextStep: log.nextStep,
      weakSpots: log.weakSpots || log.fieldLog?.learningGaps || []
    }));
    return [
      "다음 현장 데일리 로그를 분석해서 CE 성장용 Think Tank로 정리해줘.",
      "",
      "역할:",
      "- FEP/EPI/RTP Senior CE coach",
      "- 데이터 아키텍트",
      "- 현장 트러블슈팅 리뷰어",
      "- 학습 루틴 설계자",
      "",
      "분석 목표:",
      "1. 오늘 기록에서 확인된 사실과 추정을 분리",
      "2. subsystem, risk, evidence, stop condition, next owner를 정리",
      "3. 내가 반복해서 약한 개념과 다음 7일 학습 루틴 제안",
      "4. 고객 보고 문장을 과장 없이 다듬기",
      "5. 이 웹에 추가하면 좋을 기능/체크리스트/시뮬레이션 제안",
      "",
      "금지:",
      "- recipe, valve sequence, detector setpoint, interlock bypass, customer site-specific acceptance limit 생성 금지",
      "- 고객 비공개자료나 계정/보안정보 요구 금지",
      "",
      "오늘 기록 JSON:",
      JSON.stringify(analysis, null, 2),
      "",
      "최근 누적 기록 요약 JSON:",
      JSON.stringify(safeRecent, null, 2),
      "",
      "출력 형식:",
      "- 오늘 요약",
      "- 사실 / 추정 / 모르는 것",
      "- 위험도와 stop condition",
      "- subsystem별 evidence checklist",
      "- 고객 보고 문장",
      "- 다음 7일 학습 루틴",
      "- 웹 개선 제안"
    ].join("\n");
  }

  function stats() {
    const logs = loadLogs();
    const today = localDateString();
    const todayLogs = logs.filter(log => String(log.date || "").slice(0, 10) === today);
    const highRisk = logs.filter(log => ["high", "security-boundary-review"].includes(log.fieldLog?.riskLevel || log.severity)).length;
    const openNext = logs.filter(log => !compactText(log.nextStep || log.nextAction)).length;
    const synced = logs.filter(log => log.remoteSavedAt || log.syncStatus === "D1 saved").length;
    const subsystemCounts = {};
    logs.forEach(log => (log.fieldLog?.subsystems || []).forEach(subsystem => {
      subsystemCounts[subsystem] = (subsystemCounts[subsystem] || 0) + 1;
    }));
    const topSubsystems = Object.entries(subsystemCounts).sort((a, b) => b[1] - a[1]).slice(0, 6);
    return { logs, todayLogs, highRisk, openNext, synced, topSubsystems, pending: loadPending().length };
  }

  function renderAnalysis(analysis) {
    if (!analysis) {
      return `
        <article class="field-analysis-empty">
          <strong>아직 분석 전</strong>
          <p>오늘 기록을 입력하고 “자동 구조화”를 누르면 symptom, evidence, action, result, nextStep, Codex packet이 생성됩니다.</p>
        </article>
      `;
    }
    latestCodexPacket = buildCodexPacket(analysis);
    return `
      <div class="field-analysis-grid">
        <article class="field-analysis-card ${analysis.riskLevel}">
          <span>Risk</span>
          <strong>${escapeHtml(analysis.riskLevel)}</strong>
          <p>${escapeHtml(analysis.stopCondition)}</p>
        </article>
        <article class="field-analysis-card">
          <span>Subsystem</span>
          <strong>${escapeHtml(analysis.subsystems.join(", ") || "분류 필요")}</strong>
          <p>${escapeHtml(analysis.entities.join(", ") || "entity 부족")}</p>
        </article>
        <article class="field-analysis-card">
          <span>Learning Gap</span>
          <strong>${analysis.learningGaps.length}개</strong>
          <p>${escapeHtml(analysis.learningGaps.join(" / ") || "추가 결손 없음")}</p>
        </article>
      </div>
      ${analysis.sensitiveHits.length ? `
        <article class="field-boundary-alert">
          <strong>민감 정보 경계 검토 필요</strong>
          <p>${escapeHtml(analysis.sensitiveHits.join(", "))} 표현이 감지되었습니다. 저장 전에 값, 절차, 고객자료 원문을 제거하세요.</p>
        </article>
      ` : ""}
      <div class="field-structured-output">
        <section><h3>요약</h3><p>${escapeHtml(analysis.summary)}</p></section>
        <section><h3>이슈</h3><p>${escapeHtml(analysis.issue)}</p></section>
        <section><h3>Evidence</h3><p>${escapeHtml(analysis.evidence)}</p></section>
        <section><h3>Action</h3><p>${escapeHtml(analysis.action)}</p></section>
        <section><h3>Result</h3><p>${escapeHtml(analysis.result)}</p></section>
        <section><h3>Next Step</h3><p>${escapeHtml(analysis.nextStep)}</p></section>
      </div>
      <article class="field-customer-report">
        <h3>고객 보고 초안</h3>
        <pre>${escapeHtml(analysis.customerReport)}</pre>
      </article>
      <article class="field-codex-packet">
        <div class="panel-title-row">
          <div>
            <p class="eyebrow">Codex Handoff</p>
            <h3>Codex에게 바로 넘길 작업 프롬프트</h3>
          </div>
          <button class="secondary" type="button" id="field-copy-codex">복사</button>
        </div>
        <textarea readonly>${escapeHtml(latestCodexPacket)}</textarea>
        <p class="copy-status" id="field-copy-status"></p>
      </article>
    `;
  }

  function renderRecentLogs(logs) {
    return logs.slice(0, 8).map(log => `
      <article class="field-log-row">
        <header>
          <div>
            <strong>${escapeHtml(log.title)}</strong>
            <small>${escapeHtml(log.date)} · ${escapeHtml(log.fieldLog?.tool || log.topic || "")} · ${escapeHtml(log.fieldLog?.phase || log.chapter || "")}</small>
          </div>
          <span class="${log.remoteSavedAt ? "synced" : "pending"}">${escapeHtml(log.remoteSavedAt ? "D1" : "local")}</span>
        </header>
        <p>${escapeHtml(log.summary || "")}</p>
        <div class="entry-tags">${(log.tags || []).slice(0, 8).map(tag => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
        ${log.nextStep ? `<b>Next: ${escapeHtml(log.nextStep)}</b>` : `<b class="risk-text">Next step 미지정</b>`}
      </article>
    `).join("") || `<p class="empty-note">아직 현장 데일리 로그가 없습니다.</p>`;
  }

  function readForm() {
    return {
      date: document.querySelector("#field-log-date")?.value || localDateString(),
      shift: document.querySelector("#field-log-shift")?.value || "",
      tool: document.querySelector("#field-log-tool")?.value || "",
      phase: document.querySelector("#field-log-phase")?.value || "",
      location: document.querySelector("#field-log-location")?.value || "",
      title: document.querySelector("#field-log-title")?.value || "",
      narrative: document.querySelector("#field-log-narrative")?.value || "",
      aiExportOk: document.querySelector("#field-log-ai-export")?.checked || false
    };
  }

  function fillDefaultDate() {
    const date = document.querySelector("#field-log-date");
    if (date && !date.value) date.value = localDateString();
  }

  async function copyText(text, statusSelector) {
    const status = document.querySelector(statusSelector);
    try {
      await navigator.clipboard.writeText(text);
      if (status) status.textContent = "복사 완료";
    } catch {
      if (status) status.textContent = "브라우저 권한 때문에 자동 복사 실패. 텍스트를 직접 선택하세요.";
    }
  }

  async function analyzeFromForm() {
    const form = readForm();
    draftForm = form;
    if (!cleanText(form.narrative, 12000)) {
      saveStatus = "서술형 기록을 먼저 입력하세요.";
      render();
      return;
    }
    draftAnalysis = analyzeNarrative(form);
    saveStatus = "자동 구조화 완료";
    render();
  }

  async function saveFromForm(event) {
    event?.preventDefault();
    const form = readForm();
    draftForm = form;
    if (!cleanText(form.narrative, 12000)) {
      saveStatus = "저장 실패: 서술형 기록이 비어 있습니다.";
      render();
      return;
    }
    const analysis = draftAnalysis && draftAnalysis.rawNarrative === cleanText(form.narrative, 12000)
      ? draftAnalysis
      : analyzeNarrative(form);
    const page = buildBookshelfPage(analysis, { aiExportOk: form.aiExportOk });
    saveLogs([page]);
    mergeBookshelfPage(page);
    saveStatus = "로컬 저장 완료 / D1 저장 시도 중";
    render();
    await pushLog(page);
    draftAnalysis = analysis;
    draftForm = { ...form, title: "", narrative: "" };
    render();
  }

  function exportLogs() {
    const payload = {
      schemaVersion: "field-daily-log-export-v1",
      exportedAt: new Date().toISOString(),
      logs: loadLogs(),
      pending: loadPending()
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `field-daily-log-${localDateString()}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function render() {
    const root = document.querySelector(`#${ROOT_ID}`);
    if (!root) return;
    const s = stats();
    const form = draftForm || {
      date: localDateString(),
      shift: "",
      tool: toolOptions[0],
      phase: phaseOptions[0],
      location: "",
      title: "",
      narrative: "",
      aiExportOk: true
    };
    root.innerHTML = `
      <section class="field-log-console">
        <article class="field-log-brief">
          <div>
            <p class="eyebrow">Field Memory Engine</p>
            <h2>서술형 현장 기록을 구조화된 CE 빅데이터로 전환</h2>
            <p>완벽한 문장보다 매일 남기는 것이 중요합니다. 단, 민감정보는 기록 전에 제거해야 합니다.</p>
          </div>
          <div class="field-log-metrics">
            <span><b>${s.todayLogs.length}</b>오늘</span>
            <span><b>${s.logs.length}</b>누적</span>
            <span><b>${s.synced}</b>D1</span>
            <span><b>${s.pending}</b>대기</span>
          </div>
        </article>

        <div class="field-log-layout">
          <article class="field-log-panel">
            <div class="panel-title-row">
              <div>
                <p class="eyebrow">Daily Capture</p>
                <h2>오늘 현장 서술</h2>
              </div>
              <span class="sync-pill">${escapeHtml(saveStatus)}</span>
            </div>
            <form id="field-log-form" class="field-log-form">
              <div class="field-log-grid">
                <label>날짜<input id="field-log-date" type="date" required value="${escapeHtml(form.date || localDateString())}" /></label>
                <label>Shift / 시간대<input id="field-log-shift" value="${escapeHtml(form.shift || "")}" placeholder="예: Day, Night, 09:00-18:00" /></label>
                <label>장비/영역<select id="field-log-tool">${toolOptions.map(item => `<option ${item === form.tool ? "selected" : ""}>${escapeHtml(item)}</option>`).join("")}</select></label>
                <label>단계<select id="field-log-phase">${phaseOptions.map(item => `<option ${item === form.phase ? "selected" : ""}>${escapeHtml(item)}</option>`).join("")}</select></label>
                <label>라인/위치 요약<input id="field-log-location" value="${escapeHtml(form.location || "")}" placeholder="예: Pyeongtaek / area 요약. 세부 보안정보 제외" /></label>
                <label>제목<input id="field-log-title" maxlength="120" value="${escapeHtml(form.title || "")}" placeholder="예: LL pumpdown 지연 확인, gas readiness hold" /></label>
              </div>
              <label>
                오늘 기록
                <textarea id="field-log-narrative" required placeholder="예: 오늘 Centura EPI install 단계에서 load lock pumpdown 시간이 예상보다 길었다. pressure trend와 pump ready signal을 확인했고, facility exhaust ready owner와 상태를 대조했다. 고객에게는 확인된 사실과 다음 evidence를 분리해 공유했다. 내일은 pumpdown curve와 leak check boundary를 선임에게 질문한다.">${escapeHtml(form.narrative || "")}</textarea>
              </label>
              <div class="field-log-boundary">
                <span><b>저장 가능</b>비식별 현장 요약, module 수준 설명, 증상, evidence, action, result, next step</span>
                <span><b>저장 금지</b>recipe, valve sequence, detector setpoint, interlock bypass, customer confidential, serial 전체, 계정/보안정보</span>
              </div>
              <label class="bookshelf-checkline">
                <input id="field-log-ai-export" type="checkbox" ${form.aiExportOk !== false ? "checked" : ""} />
                Codex/AI handoff에 포함 가능한 비식별 요약이다
              </label>
              <div class="thinktank-actions">
                <button class="secondary" type="button" id="field-log-analyze">자동 구조화</button>
                <button class="primary" type="submit">저장 + D1 동기화</button>
                <button class="secondary" type="button" id="field-log-retry">대기 재시도</button>
                <button class="secondary" type="button" id="field-log-export">JSON 백업</button>
              </div>
            </form>
          </article>

          <article class="field-log-panel">
            <div class="panel-title-row">
              <div>
                <p class="eyebrow">Structured Output</p>
                <h2>자동 정리 결과</h2>
              </div>
              <span class="sync-pill">${escapeHtml(draftAnalysis?.confidence || "대기")}</span>
            </div>
            <div id="field-log-analysis">${renderAnalysis(draftAnalysis)}</div>
          </article>
        </div>

        <section class="field-log-bottom-grid">
          <article class="field-log-panel">
            <div class="panel-title-row">
              <div>
                <p class="eyebrow">Pattern</p>
                <h2>누적 패턴</h2>
              </div>
              <span class="sync-pill">${s.highRisk} high-risk</span>
            </div>
            <div class="field-pattern-grid">
              ${s.topSubsystems.map(([subsystem, count]) => `<span><b>${escapeHtml(subsystem)}</b>${count}회</span>`).join("") || "<span><b>대기</b>기록이 쌓이면 subsystem 패턴이 표시됩니다.</span>"}
            </div>
            <p>${s.openNext ? `${s.openNext}개 기록에 next step이 비어 있습니다.` : "열린 next step이 없습니다."}</p>
          </article>
          <article class="field-log-panel">
            <div class="panel-title-row">
              <div>
                <p class="eyebrow">Recent Logs</p>
                <h2>최근 현장 기록</h2>
              </div>
              <button class="secondary" type="button" id="field-log-open-book">책장에서 보기</button>
            </div>
            <div class="field-recent-list">${renderRecentLogs(s.logs)}</div>
          </article>
        </section>
      </section>
    `;

    fillDefaultDate();
    document.querySelector("#field-log-form")?.addEventListener("submit", saveFromForm);
    document.querySelector("#field-log-analyze")?.addEventListener("click", analyzeFromForm);
    document.querySelector("#field-log-retry")?.addEventListener("click", retryPending);
    document.querySelector("#field-log-export")?.addEventListener("click", exportLogs);
    document.querySelector("#field-copy-codex")?.addEventListener("click", () => copyText(latestCodexPacket, "#field-copy-status"));
    document.querySelector("#field-log-open-book")?.addEventListener("click", () => {
      try {
        localStorage.setItem("projectUniverseActiveBook", BOOK_ID);
      } catch {
        // best-effort
      }
      if (window.showView) window.showView("bookshelf");
    });
  }

  window.ProjectUniverseFieldLog = {
    render,
    getLogs: () => loadLogs(),
    retryPending,
    buildCodexPacket: () => latestCodexPacket
  };

  document.addEventListener("DOMContentLoaded", () => {
    render();
    retryPending().catch(() => {});
  });
  document.addEventListener("project-universe-unlocked", () => {
    retryPending().catch(() => {});
  });
})();
