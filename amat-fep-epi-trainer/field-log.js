(() => {
  const ROOT_ID = "field-log-root";
  const FIELD_LOG_KEY = "projectUniverseFieldDailyLogsV1";
  const FIELD_PENDING_KEY = "projectUniverseFieldDailyPendingV1";
  const BOOKSHELF_PAGE_KEY = "projectUniverseBookshelfPages";
  const SOURCE_DEVICE_KEY = "projectUniverseSourceDevice";
  const CLIENT_PASS_KEY = "ceTrainerPass";
  const REMOTE_TOKEN_KEY = "epiThinkTankRemoteToken";
  const LOCAL_TOKEN_KEY = "epiThinkTankLocalToken";
  const SCHEMA_VERSION = "field-daily-log-v2";
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
  let duplicateNotice = null;
  let latestPackets = {};

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
    ["레시피", "recipe"],
    ["valve sequence", "valve sequence"],
    ["밸브 시퀀스", "valve sequence"],
    ["detector setpoint", "detector setpoint"],
    ["setpoint", "setpoint"],
    ["셋포인트", "setpoint"],
    ["interlock bypass", "interlock bypass"],
    ["바이패스", "interlock bypass"],
    ["site-specific acceptance", "site-specific acceptance limit"],
    ["acceptance limit", "site-specific acceptance limit"],
    ["고객자료", "customer confidential"],
    ["customer confidential", "customer confidential"],
    ["confidential", "customer confidential"],
    ["manual 원문", "manual 원문"],
    ["매뉴얼 원문", "manual 원문"],
    ["serial number", "serial number 전체"],
    ["serial no", "serial number 전체"],
    ["s/n", "serial number 전체"],
    ["시리얼", "serial number 전체"],
    ["password", "account/security info"],
    ["비밀번호", "account/security info"],
    ["계정", "account/security info"],
    ["api key", "account/security info"],
    ["token", "account/security info"],
    ["seed phrase", "account/security info"]
  ];

  const entityDictionary = [
    "Centura", "Vantage", "EPI", "RTP", "EFEM", "FI", "FOUP", "Load Port", "Load Lock", "LL",
    "Transfer Module", "TM", "Process Module", "PM", "Clean Module", "CM", "Gas Box", "MFC",
    "Pump", "Exhaust", "Abatement", "PCW", "CDA", "DVM", "DMM", "Relay", "PLC", "Interlock",
    "wafer", "baseline", "qualification", "hook-up", "pumpdown", "purge", "dry run", "handover",
    "AMHS", "MES", "host", "SECS/GEM", "robot", "slot map", "pyrometer", "lamp", "susceptor"
  ];

  const subsystemRules = [
    ["gas", ["gas", "mfc", "purge", "h2", "si", "ge", "ph3", "b2h6", "ash3", "gas readiness", "가스", "퍼지", "독성", "가연성"]],
    ["vacuum", ["pump", "pumpdown", "pressure", "leak", "foreline", "roughing", "base pressure", "진공", "압력", "펌프", "리크"]],
    ["wafer-handling", ["efem", "foup", "load port", "load lock", "robot", "tm", "wafer", "slot", "mapping", "align", "웨이퍼", "로봇", "맵핑"]],
    ["thermal", ["temperature", "ramp", "soak", "lamp", "pyrometer", "thermal", "susceptor", "온도", "히터", "램프", "파이로"]],
    ["electrical-controls", ["dvm", "dmm", "relay", "plc", "interlock", "sensor", "24v", "i/o", "voltage", "전기", "릴레이", "센서", "전압"]],
    ["facility", ["hook-up", "pcw", "cda", "exhaust", "abatement", "power", "facility", "utility", "유틸", "시설", "배기", "어베이트"]],
    ["metrology", ["metrology", "thickness", "rs", "particle", "defect", "map", "uniformity", "baseline", "계측", "파티클", "결함", "균일도"]],
    ["communication", ["customer", "handover", "owner", "report", "meeting", "escalation", "고객", "보고", "오너", "인수인계", "회의"]]
  ];

  const issueTypeRules = [
    ["install-delay", ["delay", "지연", "pending", "대기", "hold"]],
    ["alarm-error", ["alarm", "error", "fault", "interlock", "알람", "에러"]],
    ["readiness-gap", ["readiness", "not ready", "owner", "미준비", "준비"]],
    ["process-quality", ["particle", "defect", "uniformity", "thickness", "drift", "파티클", "결함", "균일도", "드리프트"]],
    ["safety-boundary", ["toxic", "pyrophoric", "leak", "gas alarm", "electrical", "energized", "독성", "가연성", "누출", "활선"]],
    ["communication-gap", ["customer", "handover", "report", "meeting", "clarify", "고객", "보고", "공유", "정리"]],
    ["knowledge-gap", ["모름", "학습", "질문", "이해", "복습", "unclear", "unknown"]]
  ];

  const moduleRules = [
    ["EFEM / FI", ["efem", "fi", "foup", "load port", "slot map", "mapping", "aligner", "amhs", "풉", "로드포트"]],
    ["Load Lock", ["load lock", "ll", "pumpdown", "vent", "door", "로드락"]],
    ["Transfer Module", ["transfer module", "tm", "robot", "blade", "vacuum robot", "트랜스퍼", "로봇"]],
    ["Process Module", ["process module", "pm", "chamber", "epi pm", "rtp chamber", "챔버"]],
    ["Clean/Cooldown Module", ["clean module", "cm", "cooldown", "seasoning", "clean"]],
    ["Gas Box / MFC", ["gas box", "mfc", "gas readiness", "purge", "가스"]],
    ["Pump / Exhaust / Abatement", ["pump", "exhaust", "abatement", "foreline", "scrubber", "펌프", "배기", "어베이트"]],
    ["Facility / Hook-up", ["pcw", "cda", "facility", "hook-up", "power", "utility", "유틸", "시설"]],
    ["Electrical / Controls", ["dvm", "dmm", "relay", "plc", "interlock", "sensor", "24v", "전기"]]
  ];

  const evidenceCatalog = {
    gas: [
      "gas readiness owner 확인",
      "MFC/flow command와 readback 추세",
      "purge/exhaust/abatement ready 상태",
      "EHS 승인 문서 기준 확인",
      "가스 leak/alarm 이력"
    ],
    vacuum: [
      "pumpdown curve",
      "base/roughing pressure trend",
      "pump ready/interlock 상태",
      "door seal/O-ring boundary 확인",
      "leak check 승인 절차 확인"
    ],
    "wafer-handling": [
      "slot map 결과",
      "FOUP/load port 상태",
      "robot transfer alarm/log",
      "LL/TM/PM door state",
      "wafer presence sensor 상태"
    ],
    thermal: [
      "temperature trace",
      "ramp/soak stability",
      "pyrometry/lamp zone 상태",
      "cooldown trend",
      "thermal calibration 이력"
    ],
    "electrical-controls": [
      "expected value 먼저 정의",
      "DVM 측정 조건/범위 확인",
      "relay coil/contact 상태",
      "PLC I/O 상태",
      "LOTO/energized work 승인 여부"
    ],
    facility: [
      "PCW/CDA/exhaust/power owner 확인",
      "facility ready checklist",
      "hook-up 완료 evidence",
      "abatement interface 상태",
      "EHS/site 승인 문서 확인"
    ],
    metrology: [
      "baseline wafer result",
      "wafer map",
      "before/after comparison",
      "chamber matching data",
      "metrology recipe/version 확인"
    ],
    communication: [
      "confirmed fact와 assumption 분리",
      "owner와 ETA 명시",
      "stop condition 공유",
      "customer report draft",
      "follow-up time 지정"
    ]
  };

  const chapterMap = [
    {
      id: "cluster-mental-model",
      title: "장비 구조 해부실",
      view: "systems",
      subsystems: ["wafer-handling"],
      keywords: ["efem", "foup", "load lock", "tm", "pm", "robot", "wafer path", "slot map", "로드락", "웨이퍼"],
      reason: "FOUP-EFEM-LL-TM-PM 경계와 wafer 이동을 다시 그려야 합니다."
    },
    {
      id: "vacuum-pumpdown",
      title: "Vacuum / Pumpdown",
      view: "process-visual",
      subsystems: ["vacuum"],
      keywords: ["pumpdown", "pressure", "leak", "vacuum", "foreline", "진공", "압력"],
      reason: "pumpdown curve, pressure regime, leak boundary를 evidence 중심으로 복습해야 합니다."
    },
    {
      id: "gas-safety-facility",
      title: "Gas Safety / Facility Hook-up",
      view: "gases",
      subsystems: ["gas", "facility"],
      keywords: ["gas", "mfc", "purge", "exhaust", "abatement", "hook-up", "toxic", "가스", "배기"],
      reason: "가스 readiness, purge, exhaust, abatement, EHS boundary를 연결해서 봐야 합니다."
    },
    {
      id: "electrical-dvm",
      title: "Electrical / DVM 현장 기초",
      view: "electrical",
      subsystems: ["electrical-controls"],
      keywords: ["dvm", "dmm", "relay", "plc", "interlock", "sensor", "24v", "전기", "릴레이"],
      reason: "측정 전에 expected value를 세우고 LOTO/승인 경계를 구분해야 합니다."
    },
    {
      id: "epi-process-theater",
      title: "EPI/RTP 공정 극장",
      view: "process-visual",
      subsystems: ["thermal", "metrology"],
      keywords: ["epi", "rtp", "growth", "ramp", "soak", "film", "uniformity", "temperature", "epi", "성장", "막"],
      reason: "wafer 위 변화, thermal trace, film growth, metrology 결과를 한 흐름으로 연결해야 합니다."
    },
    {
      id: "install-runbook",
      title: "Install CE 런북",
      view: "readiness",
      subsystems: ["facility", "communication"],
      keywords: ["move-in", "rigging", "leveling", "power-on", "dry run", "qualification", "handover", "인수인계"],
      reason: "설치 단계별 owner, evidence, stop condition, handover 문장을 정리해야 합니다."
    },
    {
      id: "ce-case-simulator",
      title: "CE 판단 시뮬레이터",
      view: "diagnostics",
      subsystems: ["gas", "vacuum", "wafer-handling", "thermal", "electrical-controls", "facility", "metrology"],
      keywords: ["symptom", "risk", "evidence", "root cause", "troubleshooting", "원인", "증상"],
      reason: "증상에서 바로 조치하지 않고 risk -> subsystem -> evidence -> stop condition 순서로 사고해야 합니다."
    }
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

  function normalizeKey(value = "") {
    return compactText(value, 180).toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-+|-+$/g, "");
  }

  function duplicateKeyFor(analysis = {}) {
    return `${analysis.date || localDateString()}::${normalizeKey(analysis.title || analysis.summary || "untitled")}`;
  }

  function loadLogs() {
    const logs = safeJson(FIELD_LOG_KEY, []);
    return Array.isArray(logs) ? logs : [];
  }

  function saveLogs(logs) {
    const byId = new Map(loadLogs().map(log => [log.id, log]));
    logs.forEach(log => byId.set(log.id, log));
    saveJson(FIELD_LOG_KEY, [...byId.values()].sort((a, b) => String(b.updatedAt || b.createdAt).localeCompare(String(a.updatedAt || a.createdAt))));
  }

  function loadPending() {
    const rows = safeJson(FIELD_PENDING_KEY, []);
    return Array.isArray(rows) ? rows : [];
  }

  function savePending(rows) {
    saveJson(FIELD_PENDING_KEY, rows);
  }

  function queuePending(log, error = "remote sync failed") {
    const byId = new Map(loadPending().map(item => [item.id, item]));
    byId.set(log.id, {
      ...log,
      syncStatus: "pending sync",
      syncError: error,
      queuedAt: new Date().toISOString()
    });
    savePending([...byId.values()]);
  }

  function removePending(id) {
    savePending(loadPending().filter(item => item.id !== id));
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
      .slice(0, 100);
  }

  function pickSentences(sentences, words, limit = 4) {
    const lowerWords = words.map(word => String(word).toLowerCase());
    return sentences
      .filter(sentence => {
        const lower = sentence.toLowerCase();
        return lowerWords.some(word => lower.includes(word));
      })
      .slice(0, limit);
  }

  function uniqueList(values, limit = 20) {
    return [...new Set(values.filter(Boolean).map(value => compactText(value, 360)))].slice(0, limit);
  }

  function escapeRegExp(value = "") {
    return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function containsTerm(haystack, term) {
    const needle = String(term || "").toLowerCase().trim();
    if (!needle) return false;
    if (/^[a-z0-9/+.-]{1,4}$/i.test(needle)) {
      return new RegExp(`(^|[^a-z0-9])${escapeRegExp(needle)}([^a-z0-9]|$)`, "i").test(haystack);
    }
    return haystack.includes(needle);
  }

  function inferEntities(text, selectedTool) {
    const haystack = `${selectedTool} ${text}`.toLowerCase();
    const entities = entityDictionary.filter(term => containsTerm(haystack, term));
    const moduleMatches = text.match(/\b(PM|CM|LL|TM|EFEM|FI)\s*-?\s*\d*\b/gi) || [];
    return uniqueList([...entities, ...moduleMatches.map(item => item.trim())], 24);
  }

  function inferSubsystems(text, tool) {
    const haystack = `${tool} ${text}`.toLowerCase();
    const matched = subsystemRules
      .filter(([, words]) => words.some(word => containsTerm(haystack, word)))
      .map(([subsystem]) => subsystem);
    return uniqueList(matched, 8);
  }

  function inferModule(text, tool) {
    const haystack = `${tool} ${text}`.toLowerCase();
    const matched = moduleRules.find(([, words]) => words.some(word => containsTerm(haystack, word)));
    if (matched) return matched[0];
    if (tool && tool !== "기타 / 모름") return tool;
    return "module 미분류";
  }

  function inferIssueTypes(text) {
    const lower = String(text || "").toLowerCase();
    return uniqueList(issueTypeRules
      .filter(([, words]) => words.some(word => lower.includes(String(word).toLowerCase())))
      .map(([issueType]) => issueType), 8);
  }

  function detectSensitive(text) {
    const lower = String(text || "").toLowerCase();
    return uniqueList(sensitivePatterns
      .filter(([needle]) => lower.includes(String(needle).toLowerCase()))
      .map(([, label]) => label), 12);
  }

  function inferRiskLevel(text, sensitiveHits) {
    const lower = String(text || "").toLowerCase();
    if (sensitiveHits.length) return "security-boundary-review";
    if (/(toxic|pyrophoric|flammable|leak|gas alarm|interlock|wafer break|arc|energized|독성|가연성|누출|인터락|웨이퍼.*깨|화재|활선)/i.test(lower)) return "high";
    if (/(alarm|fail|delay|abnormal|drift|particle|pressure|temperature|error|hold|지연|불량|알람|이상|파티클|압력|온도)/i.test(lower)) return "medium";
    return "low";
  }

  function inferTags(text, phase, tool, riskLevel, subsystems, issueTypes) {
    const lower = `${phase} ${tool} ${text}`.toLowerCase();
    return uniqueList([
      "field-daily",
      phase,
      riskLevel !== "low" ? `risk-${riskLevel}` : "",
      ...subsystems,
      ...issueTypes,
      lower.includes("install") || lower.includes("설치") ? "install" : "",
      lower.includes("qualification") || lower.includes("baseline") || lower.includes("퀄") ? "qualification" : "",
      lower.includes("customer") || lower.includes("고객") || lower.includes("report") ? "customer-report" : "",
      lower.includes("dvm") || lower.includes("전기") ? "dvm" : "",
      lower.includes("gas") || lower.includes("가스") ? "gas-safety" : "",
      lower.includes("pump") || lower.includes("진공") ? "vacuum" : ""
    ], 18);
  }

  function summarizeText(sentences, fallback) {
    return compactText(sentences.slice(0, 2).join(" ") || fallback, 720);
  }

  function inferOwner(sentences, text) {
    const ownerSentences = pickSentences(sentences, ["owner", "오너", "담당", "시설팀", "가스팀", "EHS", "customer", "고객", "senior", "선임", "vendor", "AMAT"], 3);
    if (ownerSentences.length) return ownerSentences.join("\n");
    const lower = text.toLowerCase();
    if (lower.includes("facility") || text.includes("시설")) return "Facility owner 확인 필요";
    if (lower.includes("gas") || text.includes("가스")) return "Gas/EHS owner 확인 필요";
    if (lower.includes("customer") || text.includes("고객")) return "Customer/AMAT owner 확인 필요";
    return "owner 미지정";
  }

  function missingEvidenceFor(subsystems, evidenceText, narrative) {
    const haystack = `${evidenceText}\n${narrative}`.toLowerCase();
    const expected = subsystems.flatMap(subsystem => evidenceCatalog[subsystem] || []);
    const missing = expected.filter(item => {
      const words = String(item).toLowerCase().split(/[\s/]+/).filter(word => word.length >= 3);
      return !words.some(word => haystack.includes(word));
    });
    return uniqueList(missing, 8);
  }

  function relatedChaptersFor(analysis) {
    const haystack = `${analysis.tool} ${analysis.installPhase} ${analysis.module} ${analysis.rawNarrative} ${analysis.subsystem.join(" ")}`.toLowerCase();
    const scored = chapterMap.map(chapter => {
      const subsystemScore = chapter.subsystems.filter(item => analysis.subsystem.includes(item)).length * 3;
      const keywordScore = chapter.keywords.filter(word => containsTerm(haystack, word)).length;
      const phaseScore = /install|hook-up|pumpdown|gas readiness|qualification|handover/i.test(analysis.installPhase || "") && chapter.id === "install-runbook" ? 2 : 0;
      return { ...chapter, score: subsystemScore + keywordScore + phaseScore };
    }).filter(item => item.score > 0).sort((a, b) => b.score - a.score);
    const fallback = chapterMap.find(chapter => chapter.id === "ce-case-simulator");
    return (scored.length ? scored : [fallback]).slice(0, 4).map(({ id, title, view, reason }) => ({ id, title, view, reason }));
  }

  function reportQuality(analysis) {
    const gaps = [];
    if (!analysis.confirmedFacts.length) gaps.push("confirmed fact 부족");
    if (!analysis.evidenceCollected.length) gaps.push("evidence 부족");
    if (analysis.evidenceMissing.length > 3) gaps.push("missing evidence 많음");
    if (/미지정|필요/.test(analysis.owner)) gaps.push("owner 미지정");
    if (/지정하세요|필요/.test(analysis.nextAction)) gaps.push("next action 부족");
    if (analysis.risk === "high" && !/hold|escalation|중지|보류/i.test(analysis.stopCondition)) gaps.push("high-risk stop condition 부족");
    const score = Math.max(35, 100 - gaps.length * 14);
    return {
      score,
      level: score >= 86 ? "good" : score >= 70 ? "review-needed" : "weak",
      gaps
    };
  }

  function analyzeNarrative(form = {}) {
    const narrative = cleanText(form.narrative, 12000);
    const sentences = splitSentences(narrative);
    const sensitiveHits = detectSensitive(narrative);
    const riskLevel = inferRiskLevel(narrative, sensitiveHits);
    const entities = inferEntities(narrative, form.tool);
    const subsystems = inferSubsystems(narrative, form.tool);
    const subsystem = subsystems.length ? subsystems : ["general-field"];
    const issueTypes = inferIssueTypes(narrative);
    const title = compactText(form.title || `${form.date} ${form.tool} ${form.phase}`, 120);
    const summary = summarizeText(sentences, `${form.tool} ${form.phase} 현장 기록`);
    const symptomRows = pickSentences(sentences, ["이슈", "문제", "alarm", "error", "fail", "delay", "지연", "불량", "abnormal", "leak", "particle", "pressure", "temperature", "안됨"], 5);
    const factRows = pickSentences(sentences, ["확인", "측정", "log", "trace", "trend", "data", "사진", "witness", "압력", "온도", "mfc", "metrology", "계측", "관찰"], 6);
    const assumptionRows = pickSentences(sentences, ["추정", "의심", "가능성", "maybe", "probably", "likely", "hypothesis", "seems", "같다", "원인 후보"], 5);
    const actionRows = pickSentences(sentences, ["조치", "진행", "요청", "교체", "확인", "보고", "hold", "reset", "align", "hook", "level", "dry run", "escalation"], 6);
    const resultRows = pickSentences(sentences, ["결과", "완료", "해결", "pass", "fail", "개선", "재발", "pending", "hold", "release", "확정"], 5);
    const nextRows = pickSentences(sentences, ["내일", "다음", "추가", "확인 필요", "follow", "pending", "owner", "eta", "재확인", "next"], 5);
    const module = inferModule(narrative, form.tool);
    const confirmedFacts = uniqueList(factRows.length ? factRows : sentences.slice(0, 2), 6);
    const assumptions = uniqueList(assumptionRows, 6);
    const evidenceCollected = uniqueList(factRows, 6);
    const evidenceMissing = missingEvidenceFor(subsystem, evidenceCollected.join("\n"), narrative);
    const actionTaken = uniqueList(actionRows, 6);
    const result = resultRows.length ? resultRows.join("\n") : "결과/배운 점을 추가로 기록해야 합니다.";
    const nextAction = nextRows.length ? nextRows.join("\n") : "다음 확인 evidence, owner, review date를 지정하세요.";
    const owner = inferOwner(sentences, narrative);
    const stopCondition = riskLevel === "high"
      ? "가스/전기/인터락/wafer break/배기 관련 불확실성이 있으면 진행보다 hold와 escalation 우선."
      : riskLevel === "security-boundary-review"
        ? "민감 정보 표현이 감지되었습니다. 저장 전에 recipe, setpoint, serial, 고객자료 원문을 제거하세요."
        : "확인 evidence 없이 원인을 단정하거나 고객에게 overpromise하지 않습니다.";
    const learningGaps = uniqueList([
      subsystem.includes("vacuum") ? "pumpdown curve와 pressure regime 설명 연습" : "",
      subsystem.includes("gas") ? "toxic/pyrophoric/corrosive gas safety boundary 복습" : "",
      subsystem.includes("electrical-controls") ? "DVM expected value와 relay/PLC I/O 기본 복습" : "",
      subsystem.includes("wafer-handling") ? "FOUP-EFEM-LL-TM-PM wafer path 3D mental model 복습" : "",
      subsystem.includes("thermal") ? "RTP/EPI thermal trace와 wafer damage risk 복습" : "",
      subsystem.includes("metrology") ? "wafer map, uniformity, defect density, baseline wafer 해석 복습" : "",
      subsystem.includes("facility") ? "facility hook-up owner/evidence/stop condition 복습" : "",
      subsystem.includes("communication") ? "confirmed fact와 assumption을 분리한 customer report 훈련" : "",
      subsystem.includes("general-field") ? "장비 구조와 subsystem 분류를 다시 지정" : ""
    ], 10);

    const analysis = {
      title,
      date: form.date,
      shift: form.shift,
      tool: form.tool,
      platform: form.tool,
      module,
      installPhase: form.phase,
      phase: form.phase,
      location: form.location,
      summary,
      symptom: symptomRows.join("\n") || summary,
      issue: symptomRows.join("\n") || summary,
      confirmedFacts,
      confirmedFact: confirmedFacts.join("\n") || "확인된 사실을 추가로 분리해야 합니다.",
      assumptions,
      assumption: assumptions.join("\n") || "추정은 아직 명시되지 않았습니다.",
      risk: riskLevel,
      riskLevel,
      subsystem,
      subsystems: subsystem,
      evidenceCollected,
      evidence: evidenceCollected.join("\n") || "확인 evidence를 추가로 분리해야 합니다.",
      evidenceMissing,
      actionTaken,
      action: actionTaken.join("\n") || "수행한 action이나 owner 요청을 추가로 분리해야 합니다.",
      result,
      nextAction,
      nextStep: nextAction,
      owner,
      stopCondition,
      sensitiveHits,
      entities,
      issueTypes,
      learningGaps,
      relatedChapters: [],
      rawNarrative: narrative,
      confidence: sentences.length >= 4 && evidenceCollected.length ? "medium-high" : sentences.length >= 3 ? "medium" : "low"
    };
    analysis.relatedChapters = relatedChaptersFor(analysis);
    analysis.customerReportDraft = [
      `확인된 사실: ${analysis.confirmedFact}`,
      `현재 evidence: ${analysis.evidence}`,
      `추정/미확인: ${analysis.assumption}`,
      `진행/조치: ${analysis.action}`,
      `다음 행동/owner: ${analysis.nextAction} / ${analysis.owner}`,
      `중지 조건: ${analysis.stopCondition}`,
      "주의: 비공개 recipe, setpoint, bypass, valve sequence, customer confidential 정보는 공유/저장하지 않음."
    ].join("\n");
    analysis.customerReport = analysis.customerReportDraft;
    analysis.customerReportQuality = reportQuality(analysis);
    analysis.tags = inferTags(narrative, form.phase, form.tool, riskLevel, subsystem, issueTypes);
    analysis.duplicateKey = duplicateKeyFor(analysis);
    return analysis;
  }

  function buildBookshelfPage(analysis, options = {}) {
    const now = new Date().toISOString();
    const id = options.id || `field-log-${analysis.date}-${hashText(analysis.duplicateKey).slice(-10)}`;
    const fileIndex = options.fileIndex || [];
    const payload = {
      id,
      schemaVersion: SCHEMA_VERSION,
      type: "Personal Bookshelf Page",
      recordKind: "field-daily-narrative",
      subsystem: analysis.subsystem[0] || analysis.tool || "field-log",
      severity: analysis.risk,
      title: analysis.title,
      pageType: "오늘 현장 서술",
      chapter: analysis.installPhase,
      topic: `${analysis.tool} / ${analysis.subsystem.join(", ") || "general field"}`,
      privacyLevel: "work-learning",
      exportPolicy: options.aiExportOk ? "ai-summary-ok-after-redaction" : "local-private-no-ai-export",
      summary: analysis.summary,
      evidence: analysis.evidence,
      action: analysis.action,
      result: `${analysis.result}\n\nStop condition:\n${analysis.stopCondition}\n\nCustomer report draft:\n${analysis.customerReportDraft}`,
      nextAction: analysis.nextAction,
      nextStep: analysis.nextAction,
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
      syncSource: "browser-localStorage",
      privacyBoundary: "recipe, valve sequence, detector setpoint, interlock bypass, customer confidential, site-specific acceptance limit, serial number 전체, account/security info 저장 금지",
      duplicateKey: analysis.duplicateKey,
      mergeState: options.mergedFrom ? "merged-same-date-title" : "new",
      previousRecordId: options.mergedFrom || null,
      fileIndex,
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
      entities: payload.entities,
      fieldLog: {
        module: analysis.module,
        installPhase: analysis.installPhase,
        risk: analysis.risk,
        subsystem: analysis.subsystem,
        evidenceMissing: analysis.evidenceMissing,
        learningGaps: analysis.learningGaps,
        customerReportQuality: analysis.customerReportQuality
      }
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
    } catch (error) {
      queuePending(log, error?.message || "remote sync failed");
      saveStatus = "로컬 저장 완료 / D1 pending sync";
      return log;
    }
  }

  async function retryPending() {
    const pending = loadPending();
    if (!pending.length) {
      saveStatus = "재시도 대기 없음";
      render();
      return 0;
    }
    let saved = 0;
    for (const log of pending.slice(0, 20)) {
      const result = await pushLog(log);
      if (result.remoteSavedAt) saved += 1;
    }
    saveStatus = saved ? `${saved}개 D1 재동기화 완료` : "D1 재동기화 실패 / local pending 유지";
    render();
    return saved;
  }

  function getAnalysis(log = {}) {
    const fieldLog = log.fieldLog || {};
    return {
      title: log.title || fieldLog.title || "",
      date: log.date || fieldLog.date || "",
      phase: fieldLog.installPhase || fieldLog.phase || log.chapter || "",
      tool: fieldLog.tool || log.topic || "",
      risk: fieldLog.risk || fieldLog.riskLevel || log.severity || "low",
      subsystem: fieldLog.subsystem || fieldLog.subsystems || (log.subsystem ? [log.subsystem] : []),
      issueTypes: fieldLog.issueTypes || [],
      evidenceMissing: fieldLog.evidenceMissing || [],
      learningGaps: fieldLog.learningGaps || log.weakSpots || [],
      customerReportQuality: fieldLog.customerReportQuality || null,
      nextAction: fieldLog.nextAction || fieldLog.nextStep || log.nextStep || log.nextAction || "",
      owner: fieldLog.owner || "",
      summary: log.summary || fieldLog.summary || "",
      evidence: log.evidence || fieldLog.evidence || "",
      action: log.action || fieldLog.action || "",
      result: log.result || fieldLog.result || "",
      customerReportDraft: fieldLog.customerReportDraft || fieldLog.customerReport || "",
      relatedChapters: fieldLog.relatedChapters || []
    };
  }

  function countValues(rows, mapper) {
    const counts = {};
    rows.forEach(row => {
      const values = mapper(row);
      (Array.isArray(values) ? values : [values]).filter(Boolean).forEach(value => {
        counts[value] = (counts[value] || 0) + 1;
      });
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }

  function isWeakNextStep(text = "") {
    return !compactText(text) || /지정하세요|필요|미지정|대기/.test(text);
  }

  function buildPatternIntelligence(logs = loadLogs()) {
    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - 6);
    const rows = logs.map(getAnalysis);
    const weekRows = rows.filter(row => {
      const date = new Date(row.date || 0);
      return !Number.isNaN(date.getTime()) && date >= weekStart;
    });
    const topSubsystems = countValues(rows, row => row.subsystem).slice(0, 8);
    const repeatedIssueTypes = countValues(rows, row => row.issueTypes).slice(0, 8);
    const missedEvidence = countValues(rows, row => row.evidenceMissing).slice(0, 10);
    const learningGaps = countValues(rows, row => row.learningGaps).slice(0, 10);
    const highRisk = logs.filter(log => ["high", "security-boundary-review"].includes(getAnalysis(log).risk));
    const missingNext = logs.filter(log => isWeakNextStep(getAnalysis(log).nextAction));
    const weakReports = logs.filter(log => {
      const quality = getAnalysis(log).customerReportQuality;
      const report = getAnalysis(log).customerReportDraft;
      return quality?.score < 80 || !report || report.length < 120;
    });
    const ownerMissing = logs.filter(log => /미지정|필요|^$/.test(getAnalysis(log).owner || ""));
    const chapterCounts = countValues(rows, row => row.relatedChapters.map(chapter => chapter.title)).slice(0, 6);
    const recommendations = uniqueList([
      missingNext.length ? `${missingNext.length}개 기록의 next action/owner/review time을 닫기` : "",
      highRisk.length ? `${highRisk.length}개 high-risk/security-boundary 기록을 선임/공식 문서 기준으로 재검토` : "",
      missedEvidence[0] ? `가장 자주 빠진 evidence: ${missedEvidence[0][0]}` : "",
      learningGaps[0] ? `오늘 복습 우선: ${learningGaps[0][0]}` : "",
      chapterCounts[0] ? `FEP/EPI 추천 챕터: ${chapterCounts[0][0]}` : "",
      ownerMissing.length ? `${ownerMissing.length}개 기록에서 owner가 불명확함` : ""
    ], 8);
    const weeklySummary = [
      `최근 7일 기록 ${weekRows.length}개, 전체 누적 ${logs.length}개.`,
      topSubsystems[0] ? `최다 subsystem은 ${topSubsystems[0][0]} (${topSubsystems[0][1]}회).` : "subsystem 패턴은 기록이 더 필요합니다.",
      missedEvidence[0] ? `반복 누락 evidence는 "${missedEvidence[0][0]}"입니다.` : "evidence 누락 패턴은 아직 낮습니다.",
      missingNext.length ? `open loop ${missingNext.length}개: 다음 행동을 닫아야 AI 분석 품질이 올라갑니다.` : "next action 연결은 안정적입니다."
    ].join(" ");
    return {
      generatedAt: new Date().toISOString(),
      total: logs.length,
      week: weekRows.length,
      topSubsystems,
      repeatedIssueTypes,
      missedEvidence,
      learningGaps,
      highRisk,
      missingNext,
      weakReports,
      ownerMissing,
      chapterCounts,
      recommendations,
      weeklySummary
    };
  }

  function redactedLog(log) {
    const analysis = getAnalysis(log);
    return {
      date: analysis.date,
      title: analysis.title,
      phase: analysis.phase,
      tool: analysis.tool,
      risk: analysis.risk,
      subsystem: analysis.subsystem,
      issueTypes: analysis.issueTypes,
      summary: analysis.summary,
      confirmedFact: log.fieldLog?.confirmedFact || "",
      assumption: log.fieldLog?.assumption || "",
      evidenceCollected: log.fieldLog?.evidenceCollected || [],
      evidenceMissing: analysis.evidenceMissing,
      actionTaken: log.fieldLog?.actionTaken || [],
      result: analysis.result,
      nextAction: analysis.nextAction,
      owner: analysis.owner,
      stopCondition: log.fieldLog?.stopCondition || "",
      customerReportQuality: analysis.customerReportQuality,
      learningGaps: analysis.learningGaps,
      relatedChapters: analysis.relatedChapters
    };
  }

  function buildHandoffPackets(analysis, pattern = buildPatternIntelligence()) {
    const today = analysis ? redactedLog({ fieldLog: analysis, ...buildBookshelfPage(analysis, { aiExportOk: true }) }) : null;
    const recent = loadLogs().slice(0, 12).map(redactedLog);
    const boundary = [
      "절대 포함/요구 금지: recipe, valve sequence, detector setpoint, interlock bypass, site-specific acceptance limit, customer confidential, serial number 전체, account/security info.",
      "공개 원리, 비식별 요약, 증상/evidence/action/result/next action 수준에서만 분석.",
      "현장 승인 문서와 선임/고객 EHS 기준이 항상 우선."
    ].join("\n");
    const packetJson = JSON.stringify({
      today,
      weeklyPattern: {
        weeklySummary: pattern.weeklySummary,
        topSubsystems: pattern.topSubsystems,
        repeatedIssueTypes: pattern.repeatedIssueTypes,
        missedEvidence: pattern.missedEvidence,
        learningGaps: pattern.learningGaps,
        recommendations: pattern.recommendations
      },
      recent
    }, null, 2);
    const make = (label, goal, tasks) => [
      label,
      "",
      "역할: FEP/EPI/RTP Senior CE coach + 데이터 아키텍트 + 학습 루틴 설계자.",
      "",
      "목표:",
      goal,
      "",
      "요청:",
      ...tasks.map((task, index) => `${index + 1}. ${task}`),
      "",
      "민감정보 경계:",
      boundary,
      "",
      "비식별 데이터:",
      packetJson
    ].join("\n");
    return {
      today: {
        label: "오늘 기록 분석 요청",
        text: make("오늘 기록 분석 요청", "오늘 현장 서술을 fact/assumption/evidence/risk/next action으로 리뷰한다.", [
          "확인된 사실과 추정을 분리해라.",
          "evidence missing과 stop condition을 보강해라.",
          "고객 보고 문장을 과장 없이 다듬어라.",
          "내일 바로 확인할 3개 action을 제안해라."
        ])
      },
      weekly: {
        label: "이번 주 패턴 분석 요청",
        text: make("이번 주 패턴 분석 요청", "최근 기록에서 반복 subsystem, issue type, 누락 evidence, 약한 사고 패턴을 찾는다.", [
          "반복 패턴 top 10을 뽑아라.",
          "왜 위험한지 CE 관점에서 설명해라.",
          "다음 7일 루틴을 30분 단위로 만들어라.",
          "AI에게 보여주면 안 되는 정보 경계를 다시 점검해라."
        ])
      },
      fepBook: {
        label: "FEP/EPI 책 개선 요청",
        text: make("FEP/EPI 책 개선 요청", "현장 로그의 learning gap을 FEP/EPI 책 챕터 개선 작업으로 전환한다.", [
          "누락된 챕터/시뮬레이션/퀴즈를 제안해라.",
          "초보자가 막힐 용어 tooltip을 추가할 지점을 찾아라.",
          "공개자료 기반/추론/공식교육 필요 태그를 분리해라.",
          "위험한 절차 정보는 제외해라."
        ])
      },
      ceCase: {
        label: "CE 케이스 시뮬레이터 개선 요청",
        text: make("CE 케이스 시뮬레이터 개선 요청", "누적 현장 로그를 바탕으로 비식별 가상 CE case game을 만든다.", [
          "증상 카드, risk 카드, subsystem 카드, evidence 카드, owner 카드, stop condition 카드를 설계해라.",
          "사용자가 틀릴 만한 선택지와 왜 위험한지 해설을 만들어라.",
          "고객 보고 작성 훈련을 포함해라.",
          "실제 고객/site-specific 값은 만들지 마라."
        ])
      },
      english: {
        label: "영어 보고 문장 개선 요청",
        text: make("영어 보고 문장 개선 요청", "오늘 현장 기록을 안전한 기술 영어 status update로 바꾼다.", [
          "확인된 사실, 현재 evidence, risk, next action, owner를 영어로 작성해라.",
          "overpromise를 피하는 표현으로 수정해라.",
          "고객에게 말할 수 있는 문장과 내부 escalation 문장을 분리해라.",
          "핵심 technical vocabulary 10개와 말하기 연습 질문 3개를 생성해라."
        ])
      },
      materialsMs: {
        label: "Materials MS 학습 루트 개선 요청",
        text: make("Materials MS 학습 루트 개선 요청", "현장 로그에서 드러난 이론 결손을 수학/물리/화학/재료공학 학습으로 연결한다.", [
          "learning gap을 선수개념 그래프로 분해해라.",
          "수학 약한 학습자 기준으로 7일 복습 루트를 만들어라.",
          "EPI 현상과 연결되는 공식/그래프/단위 개념을 지정해라.",
          "논문 읽기 전 필요한 개념을 단계화해라."
        ])
      }
    };
  }

  function stats() {
    const logs = loadLogs();
    const today = localDateString();
    const todayLogs = logs.filter(log => String(log.date || "").slice(0, 10) === today);
    const highRisk = logs.filter(log => ["high", "security-boundary-review"].includes(getAnalysis(log).risk)).length;
    const openNext = logs.filter(log => isWeakNextStep(getAnalysis(log).nextAction)).length;
    const synced = logs.filter(log => log.remoteSavedAt || log.syncStatus === "D1 saved").length;
    const pending = loadPending();
    const pattern = buildPatternIntelligence(logs);
    return { logs, todayLogs, highRisk, openNext, synced, pending: pending.length, pendingRows: pending, pattern };
  }

  function findDuplicateLog(analysis) {
    const duplicateKey = duplicateKeyFor(analysis);
    return loadLogs().find(log => log.duplicateKey === duplicateKey || `${getAnalysis(log).date}::${normalizeKey(getAnalysis(log).title)}` === duplicateKey);
  }

  function renderList(items, emptyText, className = "field-list") {
    return items?.length
      ? `<div class="${className}">${items.map(item => `<span>${escapeHtml(Array.isArray(item) ? `${item[0]} ${item[1]}회` : item)}</span>`).join("")}</div>`
      : `<p class="empty-note">${escapeHtml(emptyText)}</p>`;
  }

  function renderAnalysis(analysis) {
    if (!analysis) {
      latestPackets = buildHandoffPackets(null, buildPatternIntelligence());
      return `
        <article class="field-analysis-empty">
          <strong>아직 분석 전</strong>
          <p>오늘 기록을 입력하고 “자동 구조화”를 누르면 symptom, fact, assumption, risk, evidence, owner, stop condition, customer report, 학습 gap까지 분리됩니다.</p>
        </article>
        ${renderHandoffCenter(null)}
      `;
    }
    latestPackets = buildHandoffPackets(analysis, buildPatternIntelligence());
    return `
      ${duplicateNotice ? `
        <article class="field-duplicate-alert">
          <strong>중복 후보</strong>
          <p>${escapeHtml(duplicateNotice)}</p>
        </article>
      ` : ""}
      <div class="field-analysis-grid">
        <article class="field-analysis-card ${analysis.risk}">
          <span>Risk</span>
          <strong>${escapeHtml(analysis.risk)}</strong>
          <p>${escapeHtml(analysis.stopCondition)}</p>
        </article>
        <article class="field-analysis-card">
          <span>Module / Subsystem</span>
          <strong>${escapeHtml(analysis.module)}</strong>
          <p>${escapeHtml(analysis.subsystem.join(", "))}</p>
        </article>
        <article class="field-analysis-card">
          <span>Report Quality</span>
          <strong>${analysis.customerReportQuality.score}</strong>
          <p>${escapeHtml(analysis.customerReportQuality.gaps.join(" / ") || "보고 구조 양호")}</p>
        </article>
      </div>
      ${analysis.sensitiveHits.length ? `
        <article class="field-boundary-alert">
          <strong>민감 정보 경계 검토 필요</strong>
          <p>${escapeHtml(analysis.sensitiveHits.join(", "))} 표현이 감지되었습니다. 저장 전에 값, 절차, 고객자료 원문, serial 전체를 제거하세요.</p>
        </article>
      ` : ""}
      <div class="field-structured-output">
        <section><h3>Symptom</h3><p>${escapeHtml(analysis.symptom)}</p></section>
        <section><h3>Confirmed Fact</h3><p>${escapeHtml(analysis.confirmedFact)}</p></section>
        <section><h3>Assumption</h3><p>${escapeHtml(analysis.assumption)}</p></section>
        <section><h3>Evidence Collected</h3><p>${escapeHtml(analysis.evidence)}</p></section>
        <section><h3>Evidence Missing</h3><p>${escapeHtml(analysis.evidenceMissing.join("\n") || "현재 기준 큰 누락 없음")}</p></section>
        <section><h3>Action / Result</h3><p>${escapeHtml(`${analysis.action}\n\nResult:\n${analysis.result}`)}</p></section>
        <section><h3>Next Action / Owner</h3><p>${escapeHtml(`${analysis.nextAction}\n\nOwner:\n${analysis.owner}`)}</p></section>
        <section><h3>Related FEP/EPI Chapter</h3><p>${escapeHtml(analysis.relatedChapters.map(chapter => `${chapter.title}: ${chapter.reason}`).join("\n"))}</p></section>
      </div>
      <article class="field-customer-report">
        <div class="panel-title-row">
          <div>
            <p class="eyebrow">Customer Report Draft</p>
            <h3>고객 보고 초안</h3>
          </div>
          <button class="secondary" type="button" data-field-copy-report>복사</button>
        </div>
        <pre>${escapeHtml(analysis.customerReportDraft)}</pre>
        <p class="copy-status" id="field-report-copy-status"></p>
      </article>
      <article class="field-learning-loop">
        <p class="eyebrow">CE Growth Loop</p>
        <h3>오늘 루틴에 반영할 학습 gap</h3>
        ${renderList(analysis.learningGaps, "learning gap이 아직 분리되지 않았습니다.")}
        <div class="field-chapter-links">
          ${analysis.relatedChapters.map(chapter => `<button class="secondary" type="button" data-field-open-view="${escapeHtml(chapter.view)}">${escapeHtml(chapter.title)}</button>`).join("")}
        </div>
      </article>
      ${renderHandoffCenter(analysis)}
    `;
  }

  function renderHandoffCenter(analysis) {
    const packets = latestPackets && Object.keys(latestPackets).length ? latestPackets : buildHandoffPackets(analysis, buildPatternIntelligence());
    return `
      <article class="field-codex-packet">
        <div class="panel-title-row">
          <div>
            <p class="eyebrow">Codex Handoff Center</p>
            <h3>Codex에게 넘길 비식별 패킷</h3>
          </div>
          <span class="sync-pill">${Object.keys(packets).length} packets</span>
        </div>
        <div class="field-packet-grid">
          ${Object.entries(packets).map(([key, packet]) => `
            <section class="field-packet-card">
              <strong>${escapeHtml(packet.label)}</strong>
              <p>민감정보 제외 규칙 포함. 현재 기록과 누적 패턴을 같이 전달합니다.</p>
              <button class="secondary" type="button" data-field-copy-packet="${escapeHtml(key)}">복사</button>
            </section>
          `).join("")}
        </div>
        <textarea readonly>${escapeHtml(packets.today?.text || Object.values(packets)[0]?.text || "")}</textarea>
        <p class="copy-status" id="field-copy-status"></p>
      </article>
    `;
  }

  function renderRecentLogs(logs) {
    return logs.slice(0, 8).map(log => {
      const analysis = getAnalysis(log);
      return `
        <article class="field-log-row">
          <header>
            <div>
              <strong>${escapeHtml(log.title)}</strong>
              <small>${escapeHtml(analysis.date)} · ${escapeHtml(analysis.tool)} · ${escapeHtml(analysis.phase)}</small>
            </div>
            <span class="${log.remoteSavedAt ? "synced" : "pending"}">${escapeHtml(log.remoteSavedAt ? "D1" : log.syncStatus || "local")}</span>
          </header>
          <p>${escapeHtml(analysis.summary || "")}</p>
          <div class="entry-tags">${(log.tags || []).slice(0, 8).map(tag => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
          ${analysis.nextAction && !isWeakNextStep(analysis.nextAction) ? `<b>Next: ${escapeHtml(analysis.nextAction)}</b>` : `<b class="risk-text">Next action 미지정 또는 약함</b>`}
        </article>
      `;
    }).join("") || `<p class="empty-note">아직 현장 데일리 로그가 없습니다.</p>`;
  }

  function renderPattern(pattern) {
    return `
      <div class="field-pattern-summary">
        <strong>이번 주 현장 패턴 요약</strong>
        <p>${escapeHtml(pattern.weeklySummary)}</p>
      </div>
      <div class="field-pattern-columns">
        <section><h3>Top Subsystem</h3>${renderList(pattern.topSubsystems, "subsystem 데이터 대기")}</section>
        <section><h3>Issue Type</h3>${renderList(pattern.repeatedIssueTypes, "issue type 데이터 대기")}</section>
        <section><h3>Missed Evidence</h3>${renderList(pattern.missedEvidence, "반복 누락 evidence 없음")}</section>
        <section><h3>Learning Gap</h3>${renderList(pattern.learningGaps, "학습 gap 데이터 대기")}</section>
      </div>
      <div class="field-recommendation-stack">
        ${pattern.recommendations.map(item => `<span>${escapeHtml(item)}</span>`).join("") || "<span>기록이 쌓이면 오늘 루틴 추천이 생성됩니다.</span>"}
      </div>
    `;
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

  function analyzeFromForm() {
    const form = readForm();
    draftForm = form;
    duplicateNotice = null;
    if (!cleanText(form.narrative, 12000)) {
      saveStatus = "서술형 기록을 먼저 입력하세요.";
      render();
      return;
    }
    draftAnalysis = analyzeNarrative(form);
    const duplicate = findDuplicateLog(draftAnalysis);
    if (duplicate) {
      duplicateNotice = `같은 날짜/제목 기록이 있습니다. 저장하면 새 사본이 아니라 기존 기록 ${duplicate.id}를 병합 업데이트합니다.`;
    }
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
    const cleaned = cleanText(form.narrative, 12000);
    const analysis = draftAnalysis && draftAnalysis.rawNarrative === cleaned
      ? draftAnalysis
      : analyzeNarrative(form);
    const duplicate = findDuplicateLog(analysis);
    const page = buildBookshelfPage(analysis, {
      aiExportOk: form.aiExportOk,
      id: duplicate?.id,
      createdAt: duplicate?.createdAt,
      mergedFrom: duplicate?.id
    });
    saveLogs([page]);
    mergeBookshelfPage(page);
    duplicateNotice = duplicate ? `기존 기록 ${duplicate.id}를 병합 업데이트했습니다.` : null;
    saveStatus = duplicate ? "로컬 병합 저장 완료 / D1 저장 시도 중" : "로컬 저장 완료 / D1 저장 시도 중";
    render();
    await pushLog(page);
    draftAnalysis = analysis;
    draftForm = { ...form, title: "", narrative: "" };
    render();
  }

  function exportLogs() {
    const payload = {
      schemaVersion: "field-daily-log-export-v2",
      exportedAt: new Date().toISOString(),
      logs: loadLogs(),
      pending: loadPending(),
      patternIntelligence: buildPatternIntelligence()
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
            <p class="eyebrow">CE Intelligence Engine</p>
            <h2>현장 서술을 CE 사고 데이터로 변환</h2>
            <p>매일 쓴 자유서술을 symptom, fact, assumption, evidence, owner, stop condition, customer report, 학습 gap으로 구조화합니다.</p>
          </div>
          <div class="field-log-metrics">
            <span><b>${s.todayLogs.length}</b>오늘</span>
            <span><b>${s.logs.length}</b>누적</span>
            <span><b>${s.synced}</b>D1</span>
            <span><b>${s.pending}</b>대기</span>
            <span><b>${s.openNext}</b>open</span>
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
                <label>Install phase<select id="field-log-phase">${phaseOptions.map(item => `<option ${item === form.phase ? "selected" : ""}>${escapeHtml(item)}</option>`).join("")}</select></label>
                <label>라인/위치 요약<input id="field-log-location" value="${escapeHtml(form.location || "")}" placeholder="예: Pyeongtaek area 요약. 세부 보안정보 제외" /></label>
                <label>제목<input id="field-log-title" maxlength="120" value="${escapeHtml(form.title || "")}" placeholder="예: LL pumpdown 지연 / gas readiness hold" /></label>
              </div>
              <label>
                오늘 기록
                <textarea id="field-log-narrative" required placeholder="예: 오늘 Centura EPI install 단계에서 load lock pumpdown 시간이 예상보다 길었다. pressure trend와 pump ready signal을 확인했고, facility exhaust ready owner와 상태를 대조했다. 원인은 아직 단정하지 않았다. 고객에게는 확인된 사실과 다음 evidence를 분리해 공유했다. 내일은 pumpdown curve와 leak check boundary를 선임에게 질문한다.">${escapeHtml(form.narrative || "")}</textarea>
              </label>
              <div class="field-log-boundary">
                <span><b>저장 가능</b>비식별 현장 요약, module 수준 설명, 증상, evidence, action, result, next action</span>
                <span><b>저장 금지</b>recipe, valve sequence, detector setpoint, interlock bypass, customer confidential, site-specific acceptance limit, serial 전체, 계정/보안정보</span>
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

          <article class="field-log-panel field-output-panel">
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
          <article class="field-log-panel field-pattern-panel">
            <div class="panel-title-row">
              <div>
                <p class="eyebrow">Pattern Intelligence</p>
                <h2>누적 패턴 분석</h2>
              </div>
              <span class="sync-pill">${s.highRisk} high-risk</span>
            </div>
            ${renderPattern(s.pattern)}
          </article>
          <article class="field-log-panel">
            <div class="panel-title-row">
              <div>
                <p class="eyebrow">Recent Logs</p>
                <h2>최근 현장 기록</h2>
              </div>
              <button class="secondary" type="button" id="field-log-open-book">책장에서 보기</button>
            </div>
            <div class="field-sync-board">
              <span><b>local saved</b>${s.logs.length}</span>
              <span><b>D1 saved</b>${s.synced}</span>
              <span><b>pending sync</b>${s.pending}</span>
              <span><b>sync failed</b>${s.pendingRows.filter(row => row.syncError).length}</span>
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
    document.querySelectorAll("[data-field-copy-packet]").forEach(button => {
      button.addEventListener("click", () => {
        const key = button.getAttribute("data-field-copy-packet");
        copyText(latestPackets[key]?.text || "", "#field-copy-status");
      });
    });
    document.querySelector("[data-field-copy-report]")?.addEventListener("click", () => {
      copyText(draftAnalysis?.customerReportDraft || "", "#field-report-copy-status");
    });
    document.querySelectorAll("[data-field-open-view]").forEach(button => {
      button.addEventListener("click", () => {
        const view = button.getAttribute("data-field-open-view");
        if (window.showView && view) window.showView(view);
      });
    });
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
    analyzeNarrative,
    buildPatternIntelligence,
    buildCodexPacket: () => latestPackets.today?.text || ""
  };

  document.addEventListener("DOMContentLoaded", () => {
    render();
    retryPending().catch(() => {});
  });
  document.addEventListener("project-universe-unlocked", () => {
    retryPending().catch(() => {});
  });
})();
