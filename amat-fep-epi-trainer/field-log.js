(() => {
  const ROOT_ID = "field-log-root";
  const FIELD_LOG_KEY = "projectUniverseFieldDailyLogsV1";
  const FIELD_PENDING_KEY = "projectUniverseFieldDailyPendingV1";
  const BOOKSHELF_PAGE_KEY = "projectUniverseBookshelfPages";
  const SOURCE_DEVICE_KEY = "projectUniverseSourceDevice";
  const CLIENT_PASS_KEY = "ceTrainerPass";
  const REMOTE_TOKEN_KEY = "epiThinkTankRemoteToken";
  const LOCAL_TOKEN_KEY = "epiThinkTankLocalToken";
  const SCHEMA_VERSION = "field-daily-log-v4";
  const BOOK_ID = "field-daily-log";
  const BOOK_TITLE = "\uD604\uC7A5 \uB370\uC77C\uB9AC \uB85C\uADF8";
  const REMOTE_VAULT_API = "https://projectuniverse.chang2058.workers.dev";
  const LOCAL_VAULT_API = "http://127.0.0.1:4180";

  const config = window.EPI_VAULT_CONFIG || {};
  const isLocalBrowserHost = ["127.0.0.1", "localhost", "::1"].includes(location.hostname);
  const isPersonalServerProxy = location.pathname.startsWith("/personal-server");
  const isCloudflareWorkerHost = location.hostname.endsWith(".workers.dev");
  const isLocalWorkerPreview = isLocalBrowserHost && Boolean(location.port) && location.port !== "4180";
  const API_BASE = config.apiUrl ||
    (isPersonalServerProxy ? `${location.origin}/personal-server` : "") ||
    (isCloudflareWorkerHost || isLocalWorkerPreview ? location.origin : "") ||
    (location.port === "4180" ? location.origin : REMOTE_VAULT_API);

  const K = {
    lead: "\uD604\uC7A5 \uC11C\uC220\uC744 CE \uC0AC\uACE0 \uB370\uC774\uD130\uB85C \uBCC0\uD658",
    saved: "\uAE30\uB85D\uC744 \uC800\uC7A5\uD588\uC2B5\uB2C8\uB2E4.",
    d1Saved: "D1 \uC800\uC7A5 \uC644\uB8CC",
    d1Pending: "D1 \uC2E4\uD328: local pending sync",
    prepared: "\uAD6C\uC870\uD654 \uBA3C\uC800 \uC2E4\uD589\uD588\uC2B5\uB2C8\uB2E4.",
    noLogs: "\uC800\uC7A5\uB41C \uD604\uC7A5 \uAE30\uB85D\uC774 \uC544\uC9C1 \uC5C6\uC2B5\uB2C8\uB2E4.",
    copied: "\uBCF5\uC0AC \uC644\uB8CC",
    field: "\uD604\uC7A5",
    daily: "\uB370\uC77C\uB9AC",
    log: "\uB85C\uADF8",
    date: "\uB0A0\uC9DC",
    title: "\uC81C\uBAA9",
    risk: "\uC704\uD5D8",
    action: "\uC870\uCE58",
    result: "\uACB0\uACFC",
    next: "\uB2E4\uC74C \uD589\uB3D9",
    owner: "\uB2F4\uB2F9",
    stop: "\uBA48\uCD9C \uC870\uAC74",
    symptom: "\uC99D\uC0C1",
    fact: "\uD655\uC778\uB41C \uC0AC\uC2E4",
    assumption: "\uAC00\uC815",
    subsystem: "\uC11C\uBE0C\uC2DC\uC2A4\uD15C",
    evidence: "\uC218\uC9D1\uD55C \uC99D\uAC70",
    missing: "\uBD80\uC871\uD55C \uC99D\uAC70",
    gap: "\uD559\uC2B5 \uACB0\uC190",
    chapter: "\uAD00\uB828 \uCC55\uD130",
    warning: "\uBBFC\uAC10\uC815\uBCF4 \uACBD\uACC4"
  };

  let draftAnalysis = null;
  let draftForm = null;
  let saveStatus = "local ready";
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
    "Other / Unknown"
  ];

  const sensitivePatterns = [
    ["recipe", "recipe"],
    ["\uB808\uC2DC\uD53C", "recipe"],
    ["valve sequence", "valve sequence"],
    ["\uBC38\uBE0C", "valve sequence"],
    ["\uC2DC\uD000\uC2A4", "valve sequence"],
    ["detector setpoint", "detector setpoint"],
    ["setpoint", "setpoint"],
    ["\uC14B\uD3EC\uC778\uD2B8", "setpoint"],
    ["interlock bypass", "interlock bypass"],
    ["bypass", "interlock bypass"],
    ["\uC778\uD130\uB77D", "interlock"],
    ["\uBC14\uC774\uD328\uC2A4", "interlock bypass"],
    ["acceptance limit", "site-specific acceptance limit"],
    ["site-specific", "site-specific acceptance limit"],
    ["customer confidential", "customer confidential"],
    ["\uACE0\uAC1D\uC790\uB8CC", "customer confidential"],
    ["\uBE44\uACF5\uAC1C", "customer confidential"],
    ["serial number", "full serial number"],
    ["s/n", "full serial number"],
    ["\uC2DC\uB9AC\uC5BC", "full serial number"],
    ["password", "account/security info"],
    ["\uBE44\uBC00\uBC88\uD638", "account/security info"],
    ["\uD328\uC2A4\uC6CC\uB4DC", "account/security info"],
    ["token", "account/security info"],
    ["\uD1A0\uD070", "account/security info"],
    ["seed phrase", "account/security info"],
    ["account number", "account/security info"],
    ["\uACC4\uC88C", "account/security info"],
    ["resident registration", "personal id"],
    ["\uC8FC\uBBFC\uB4F1\uB85D", "personal id"],
    ["photo", "unapproved photo / image capture"],
    ["camera", "unapproved photo / image capture"],
    ["screenshot", "unapproved screenshot"],
    ["capture", "unapproved screenshot"],
    ["\uC0AC\uC9C4", "unapproved photo / image capture"],
    ["\uCD2C\uC601", "unapproved photo / image capture"],
    ["\uCE74\uBA54\uB77C", "unapproved photo / image capture"],
    ["\uCEA1\uCC98", "unapproved screenshot"],
    ["\uC2A4\uD06C\uB9B0\uC0F7", "unapproved screenshot"],
    ["wafer map", "customer process data"],
    ["lot id", "customer lot/wafer identifier"],
    ["wafer id", "customer lot/wafer identifier"],
    ["\uC6E8\uC774\uD37C\uB9F5", "customer process data"],
    ["\uB85C\uD2B8", "customer lot/wafer identifier"],
    ["drawing", "customer/site drawing"],
    ["p&id", "customer/site drawing"],
    ["\uB3C4\uBA74", "customer/site drawing"],
    ["manual", "equipment manual source"],
    ["\uB9E4\uB274\uC5BC", "equipment manual source"],
    ["usb", "removable media"],
    ["personal cloud", "unapproved cloud storage"],
    ["gmail", "unapproved external mail"],
    ["kakao", "unapproved messenger"],
    ["\uAC1C\uC778\uBA54\uC77C", "unapproved external mail"],
    ["\uAC1C\uC778 \uD074\uB77C\uC6B0\uB4DC", "unapproved cloud storage"],
    ["\uCE74\uCE74\uC624", "unapproved messenger"],
    ["badge", "site access credential"],
    ["\uBC30\uC9C0", "site access credential"],
    ["\uCD9C\uC785\uC99D", "site access credential"],
    ["qr", "site access credential"],
    ["download", "data export boundary"],
    ["export", "data export boundary"],
    ["\uBC18\uCD9C", "data export boundary"],
    ["\uB2E4\uC6B4\uB85C\uB4DC", "data export boundary"]
  ];

  const subsystemRules = [
    {
      id: "vacuum",
      label: "Vacuum / pumpdown",
      keywords: ["vacuum", "pumpdown", "pump", "rough", "turbo", "foreline", "leak", "pressure", "\uD38C\uD504\uB2E4\uC6B4", "\uC555\uB825", "\uC9C4\uACF5", "\uD38C\uD504", "\uB9AC\uD06C"],
      chapter: "Gas delivery / purge / pumpdown / exhaust"
    },
    {
      id: "gas",
      label: "Gas / MFC / purge / abatement",
      keywords: ["gas", "mfc", "purge", "exhaust", "abatement", "scrubber", "toxic", "hazard", "\uAC00\uC2A4", "\uB3C5\uC131", "\uD37C\uC9C0", "\uBC30\uAE30", "\uC2A4\uD06C\uB7EC\uBC84"],
      chapter: "Gas safety / facility hook-up"
    },
    {
      id: "wafer-handling",
      label: "EFEM / LL / TM / robot / wafer path",
      keywords: ["efem", "fi", "foup", "load port", "loadlock", "load lock", "robot", "tm", "transfer", "wafer", "handling", "\uB85C\uB4DC\uB77D", "\uB85C\uBD07", "\uC6E8\uC774\uD37C"],
      chapter: "EFEM/FI, Load Lock, TM, PM/CM, wafer path"
    },
    {
      id: "thermal",
      label: "Thermal / heater / lamp / RTP",
      keywords: ["temperature", "thermal", "heater", "lamp", "ramp", "soak", "pyrometry", "cool", "chiller", "\uC628\uB3C4", "\uD788\uD130"],
      chapter: "EPI/RTP process theater and thermal control"
    },
    {
      id: "electrical-controls",
      label: "Electrical / DVM / sensor / interlock",
      keywords: ["dvm", "meter", "24v", "relay", "plc", "sensor", "signal", "interlock", "continuity", "voltage", "\uC804\uAE30", "\uC13C\uC11C", "\uC54C\uB78C"],
      chapter: "Electrical/DVM field basics"
    },
    {
      id: "facility",
      label: "Facility / utility / hook-up",
      keywords: ["facility", "hook-up", "hookup", "utility", "cda", "pcw", "exhaust ready", "cooling", "power", "\uC2DC\uC124", "\uC720\uD2F8\uB9AC\uD2F0", "\uCFE8\uB9C1"],
      chapter: "Facility hook-up and install runbook"
    },
    {
      id: "metrology-data",
      label: "Metrology / qualification / data",
      keywords: ["metrology", "baseline", "qualification", "uniformity", "thickness", "particle", "defect", "wafer map", "spc", "\uACC4\uCE21", "\uB450\uAED8", "\uBD88\uADE0\uC77C", "\uC785\uC790", "\uD30C\uD2F0\uD074"],
      chapter: "Qualification / metrology / baseline wafer"
    },
    {
      id: "communication",
      label: "Customer communication / handover",
      keywords: ["customer", "handover", "report", "owner", "hold", "escalation", "shift", "\uACE0\uAC1D", "\uBCF4\uACE0", "\uBCF4\uB958", "\uC911\uC9C0"],
      chapter: "Customer communication / handover"
    },
    {
      id: "security-compliance",
      label: "Samsung fab security / data boundary",
      keywords: ["security", "confidential", "photo", "camera", "screenshot", "capture", "export", "download", "usb", "badge", "drawing", "manual", "wafer map", "lot id", "kakao", "gmail", "\uBCF4\uC548", "\uAE30\uBC00", "\uC0AC\uC9C4", "\uCD2C\uC601", "\uCEA1\uCC98", "\uCE74\uBA54\uB77C", "\uBC18\uCD9C", "\uB3C4\uBA74", "\uB9E4\uB274\uC5BC", "\uC6E8\uC774\uD37C\uB9F5", "\uCD9C\uC785\uC99D"],
      chapter: "Samsung fab security compliance"
    }
  ];

  const evidenceTemplates = {
    vacuum: ["pressure trend", "pump ready signal", "rough/turbo status", "leak-check boundary", "recent seal/O-ring work"],
    gas: ["gas panel ready state", "MFC alarm/trend", "purge/exhaust ready", "abatement status", "EHS/gas owner confirmation"],
    "wafer-handling": ["FOUP/load port state", "slot map result", "LL door state", "robot home/teach status", "wafer transfer alarm"],
    thermal: ["temperature trend", "zone status", "cooling/chiller status", "recent calibration/change", "wafer/metrology before-after"],
    "electrical-controls": ["alarm code/category", "expected signal state", "sensor/PLC I/O state", "DVM measurement plan", "LOTO/energized-work approval"],
    facility: ["facility owner confirmation", "utility spec sheet status", "CDA/PCW/exhaust/power ready", "hook-up punch list", "site approval document"],
    "metrology-data": ["baseline wafer result", "wafer map", "chamber comparison", "pre/post PM data", "metrology recipe identity"],
    communication: ["confirmed fact list", "assumption list", "owner/date", "next action", "customer report draft"],
    "security-compliance": ["security briefing scope", "approved report channel", "photo/screenshot approval", "data export approval", "redaction check", "customer/security owner confirmation"]
  };

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function localDateString(date = new Date()) {
    const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 10);
  }

  function nowIso() {
    return new Date().toISOString();
  }

  function readJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  function writeJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function stableDeviceId() {
    let id = localStorage.getItem(SOURCE_DEVICE_KEY);
    if (!id) {
      id = `device-${Math.random().toString(36).slice(2, 10)}-${Date.now().toString(36)}`;
      localStorage.setItem(SOURCE_DEVICE_KEY, id);
    }
    return id;
  }

  function hashText(input) {
    const text = String(input ?? "");
    let hash = 2166136261;
    for (let index = 0; index < text.length; index += 1) {
      hash ^= text.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return `fnv1a-${(hash >>> 0).toString(16).padStart(8, "0")}`;
  }

  function unique(values) {
    return [...new Set(values.filter(Boolean))];
  }

  function findSentences(text, keywords, fallbackPrefix) {
    const parts = String(text || "")
      .split(/(?<=[.!?])\s+|\n+/)
      .map(item => item.trim())
      .filter(Boolean);
    const lowerKeywords = keywords.map(item => String(item).toLowerCase());
    const hits = parts.filter(part => {
      const lower = part.toLowerCase();
      return lowerKeywords.some(keyword => lower.includes(keyword));
    });
    if (hits.length) return hits.slice(0, 3);
    if (!parts.length) return [`${fallbackPrefix}: not written yet`];
    return parts.slice(0, 2);
  }

  function inferSubsystems(text, tool, phase) {
    const lower = `${text} ${tool} ${phase}`.toLowerCase();
    const hits = subsystemRules
      .filter(rule => rule.keywords.some(keyword => lower.includes(String(keyword).toLowerCase())))
      .map(rule => rule.id);
    if (!hits.length) {
      if (/epi|process module|pm/i.test(`${tool} ${phase}`)) return ["metrology-data", "thermal"];
      return ["communication"];
    }
    return unique(hits);
  }

  function classifyRisk(text, subsystems) {
    const lower = String(text || "").toLowerCase();
    const high = ["toxic", "gas leak", "exposure", "interlock bypass", "electrical shock", "fire", "smoke", "injury", "\uB3C5\uC131", "\uB204\uCD9C", "\uAC10\uC804", "\uD654\uC7AC"];
    const medium = ["hold", "stop", "abort", "trip", "failed", "alarm", "leak", "pressure", "temperature", "\uC911\uC9C0", "\uBCF4\uB958", "\uC54C\uB78C"];
    if (high.some(keyword => lower.includes(keyword))) return "high";
    if (subsystems.includes("gas") || medium.some(keyword => lower.includes(keyword))) return "medium";
    return "low";
  }

  function detectSensitive(text) {
    const lower = String(text || "").toLowerCase();
    return unique(sensitivePatterns
      .filter(([pattern]) => lower.includes(String(pattern).toLowerCase()))
      .map(([, label]) => label));
  }

  function issueTypesFrom(text, subsystems) {
    const lower = String(text || "").toLowerCase();
    const types = [];
    if (/alarm|\uC54C\uB78C/.test(lower)) types.push("alarm interpretation");
    if (/delay|slow|late|\uC9C0\uC5F0/.test(lower)) types.push("delay / schedule risk");
    if (/hold|stop|abort|trip|\uBCF4\uB958|\uC911\uC9C0/.test(lower)) types.push("hold / stop");
    if (/ready|readiness/.test(lower)) types.push("readiness verification");
    if (/trend|trace|data|map|baseline/.test(lower)) types.push("data/evidence review");
    subsystems.forEach(id => types.push(`${id} issue`));
    return unique(types).slice(0, 8);
  }

  function inferEvidence(text, subsystems) {
    const lower = String(text || "").toLowerCase();
    const collected = [];
    const missing = [];
    const allExpected = unique(subsystems.flatMap(id => evidenceTemplates[id] || []));
    allExpected.forEach(item => {
      const key = item.split(/[ /-]/)[0].toLowerCase();
      if (lower.includes(key)) collected.push(item);
      else missing.push(item);
    });
    if (!collected.length) collected.push("raw field narrative");
    return { collected: collected.slice(0, 7), missing: missing.slice(0, 8) };
  }

  function learningGaps(subsystems, missingEvidence, risk) {
    const gaps = [];
    if (subsystems.includes("vacuum")) gaps.push("pumpdown curve, leak-check boundary, pressure regime");
    if (subsystems.includes("gas")) gaps.push("toxic gas boundary, purge/exhaust/abatement readiness");
    if (subsystems.includes("wafer-handling")) gaps.push("EFEM/LL/TM/PM wafer path and slot-map logic");
    if (subsystems.includes("thermal")) gaps.push("thermal trace, ramp/soak/cool, wafer damage risk");
    if (subsystems.includes("electrical-controls")) gaps.push("DVM expected value thinking and interlock signal chain");
    if (subsystems.includes("facility")) gaps.push("facility hook-up ownership and readiness evidence");
    if (subsystems.includes("metrology-data")) gaps.push("baseline wafer, uniformity, chamber matching evidence");
    if (subsystems.includes("security-compliance")) gaps.push("Samsung/customer fab security boundary, redaction, approved channel");
    if (risk === "high") gaps.push("stop condition and escalation wording");
    if (missingEvidence.length >= 4) gaps.push("evidence-first troubleshooting discipline");
    return unique(gaps).slice(0, 8);
  }

  function relatedChapters(subsystems) {
    return unique(subsystems.map(id => subsystemRules.find(rule => rule.id === id)?.chapter)).slice(0, 8);
  }

  function buildCustomerReport(analysis) {
    const firstFact = analysis.confirmedFact[0] || "Confirmed facts are still being collected.";
    const firstMissing = analysis.evidenceMissing[0] || "No major missing evidence listed.";
    const next = analysis.nextAction || "Confirm owner and next evidence before closing the item.";
    const stop = analysis.stopCondition || "Stop and escalate if safety, gas, electrical, wafer damage, or unapproved site condition appears.";
    return [
      `Status: ${firstFact}`,
      `Risk: ${analysis.risk.toUpperCase()} / subsystem: ${analysis.subsystem.join(", ")}`,
      `Evidence needed next: ${firstMissing}`,
      `Next action: ${next}`,
      `Stop condition: ${stop}`,
      "Boundary: no recipe, valve sequence, detector setpoint, interlock bypass, or customer confidential data included."
    ].join("\n");
  }

  function analyzeNarrative(input) {
    const form = {
      date: input?.date || localDateString(),
      shift: input?.shift || "",
      tool: input?.tool || "EPI platform",
      phase: input?.phase || "",
      location: input?.location || "",
      title: input?.title || "",
      narrative: input?.narrative || "",
      aiExportOk: input?.aiExportOk !== false
    };
    const text = `${form.title}\n${form.narrative}\n${form.tool}\n${form.phase}`;
    const sensitiveHits = detectSensitive(text);
    const subsystem = inferSubsystems(form.narrative, form.tool, form.phase);
    const evidence = inferEvidence(form.narrative, subsystem);
    const risk = sensitiveHits.length ? "high" : classifyRisk(form.narrative, subsystem);
    const gaps = learningGaps(subsystem, evidence.missing, risk);
    const summary = form.narrative
      ? form.narrative.replace(/\s+/g, " ").slice(0, 260)
      : "No narrative entered yet.";
    const analysis = {
      schemaVersion: SCHEMA_VERSION,
      date: form.date,
      shift: form.shift,
      tool: form.tool,
      phase: form.phase,
      installPhase: form.phase,
      location: form.location,
      title: form.title || `${form.tool} ${form.phase || "field"} note`,
      rawNarrative: form.narrative,
      summary,
      symptom: findSentences(form.narrative, ["alarm", "delay", "fail", "slow", "trip", "leak", "pressure", "\uC99D\uC0C1", "\uC9C0\uC5F0", "\uC2E4\uD328", "\uB204\uCD9C"], "Symptom"),
      confirmedFact: findSentences(form.narrative, ["confirmed", "checked", "verified", "measured", "trend", "owner", "\uD655\uC778", "\uCE21\uC815", "\uAC80\uC99D"], "Confirmed fact"),
      assumption: findSentences(form.narrative, ["assume", "suspect", "maybe", "likely", "not sure", "\uAC00\uC815", "\uCD94\uC815"], "Assumption"),
      risk,
      module: subsystemRules.find(rule => rule.id === subsystem[0])?.label || "Field note",
      subsystem,
      issueTypes: issueTypesFrom(form.narrative, subsystem),
      evidence: evidence.collected.join("; "),
      evidenceCollected: evidence.collected,
      evidenceMissing: evidence.missing,
      action: findSentences(form.narrative, ["action", "replaced", "reset", "checked", "reported", "shared", "asked", "\uC870\uCE58", "\uACF5\uC720", "\uC9C8\uBB38"], "Action taken").join(" / "),
      actionTaken: findSentences(form.narrative, ["action", "replaced", "reset", "checked", "reported", "shared", "asked", "\uC870\uCE58", "\uACF5\uC720", "\uC9C8\uBB38"], "Action taken"),
      result: findSentences(form.narrative, ["result", "resolved", "still", "improved", "pending", "\uACB0\uACFC", "\uD574\uACB0", "\uB300\uAE30"], "Result"),
      nextAction: findSentences(form.narrative, ["tomorrow", "next", "follow", "ask", "verify", "confirm", "\uB0B4\uC77C", "\uB2E4\uC74C", "\uD655\uC778"], "Next action")[0] || "",
      owner: findSentences(form.narrative, ["owner", "senior", "customer", "facility", "gas team", "ehs", "\uB2F4\uB2F9", "\uC120\uC784", "\uACE0\uAC1D"], "Owner")[0] || "owner not assigned",
      stopCondition: risk === "high"
        ? "Stop work and escalate before touching the tool when safety, toxic gas, electrical energy, wafer damage, or unapproved customer/site condition is involved."
        : "Stop and ask a senior when evidence is unclear, safety boundary appears, or the action would change approved site/tool state.",
      sensitiveHits,
      tags: unique(["field-daily", form.tool, form.phase, ...subsystem, ...gaps.map(gap => gap.split(/[ ,/]/)[0])]).slice(0, 14),
      entities: unique([form.tool, form.phase, form.location, ...subsystem.map(id => subsystemRules.find(rule => rule.id === id)?.label)]).slice(0, 10),
      relatedChapters: relatedChapters(subsystem),
      learningGaps: gaps,
      confidence: form.narrative.length > 120 ? "medium" : "low",
      duplicateKey: `${form.date}|${form.title}|${form.tool}|${form.phase}`.toLowerCase(),
      aiExportOk: form.aiExportOk && sensitiveHits.length === 0,
      customerReportQuality: evidence.missing.length > 5 ? "needs more evidence" : "usable draft",
      customerReportDraft: ""
    };
    analysis.customerReportDraft = buildCustomerReport(analysis);
    return analysis;
  }

  function buildBookshelfPage(analysis, options = {}) {
    const createdAt = options.createdAt || nowIso();
    const id = options.id || `field-log-${analysis.date}-${hashText(analysis.duplicateKey).slice(-10)}`;
    const integrityBase = JSON.stringify({
      schemaVersion: SCHEMA_VERSION,
      title: analysis.title,
      summary: analysis.summary,
      evidence: analysis.evidence,
      action: analysis.action,
      result: analysis.result,
      nextAction: analysis.nextAction
    });
    return {
      id,
      schemaVersion: SCHEMA_VERSION,
      type: "Field Daily Log",
      recordKind: "field-daily-narrative",
      pageType: "field-daily-log",
      bookId: BOOK_ID,
      bookTitle: BOOK_TITLE,
      title: analysis.title,
      content: analysis.rawNarrative,
      summary: analysis.summary,
      evidence: analysis.evidence,
      action: analysis.action,
      result: Array.isArray(analysis.result) ? analysis.result.join(" / ") : analysis.result,
      nextStep: analysis.nextAction,
      subsystem: analysis.subsystem[0] || "field-log",
      severity: analysis.risk,
      tags: analysis.tags,
      entities: analysis.entities,
      weakSpots: analysis.learningGaps,
      privacyLevel: analysis.aiExportOk ? "work-learning" : "private-redacted",
      exportPolicy: analysis.aiExportOk ? "ai-summary-ok" : "excluded-unless-user-approves",
      syncStatus: options.syncStatus || "local saved",
      sourceDevice: stableDeviceId(),
      integrityHash: hashText(integrityBase),
      createdAt,
      updatedAt: nowIso(),
      fieldLog: analysis
    };
  }

  function saveBookshelfPage(page) {
    const pages = readJSON(BOOKSHELF_PAGE_KEY, []);
    const without = pages.filter(item => item.id !== page.id);
    without.unshift(page);
    writeJSON(BOOKSHELF_PAGE_KEY, without.slice(0, 500));
  }

  function getLogs() {
    return readJSON(FIELD_LOG_KEY, []);
  }

  function setLogs(logs) {
    writeJSON(FIELD_LOG_KEY, logs.slice(0, 500));
  }

  function getPending() {
    return readJSON(FIELD_PENDING_KEY, []);
  }

  function setPending(items) {
    writeJSON(FIELD_PENDING_KEY, items.slice(0, 300));
  }

  function getAuthHeaders() {
    const headers = { "Content-Type": "application/json" };
    const remoteToken = sessionStorage.getItem(REMOTE_TOKEN_KEY);
    const localToken = sessionStorage.getItem(LOCAL_TOKEN_KEY);
    const token = remoteToken || localToken;
    if (token) headers.Authorization = `Bearer ${token}`;
    if (!token && localStorage.getItem(CLIENT_PASS_KEY)) headers["X-Vault-Client"] = "project-universe-browser";
    return headers;
  }

  async function apiFetch(path, options = {}) {
    const url = `${API_BASE}${path}`;
    return fetch(url, {
      ...options,
      headers: {
        ...getAuthHeaders(),
        ...(options.headers || {})
      }
    });
  }

  async function pushEntry(page) {
    const response = await apiFetch("/api/entries", {
      method: "POST",
      body: JSON.stringify(page)
    });
    let data = null;
    try {
      data = await response.json();
    } catch {
      data = null;
    }
    if (!response.ok || !data?.ok) {
      throw new Error(data?.error || `D1 save failed: ${response.status}`);
    }
    return data;
  }

  function queuePending(page, error) {
    const pending = getPending().filter(item => item.id !== page.id);
    pending.unshift({
      ...page,
      syncStatus: "pending sync",
      syncError: error?.message || String(error || "unknown sync error"),
      updatedAt: nowIso()
    });
    setPending(pending);
  }

  async function retryPending() {
    const pending = getPending();
    if (!pending.length) {
      saveStatus = "No pending sync items.";
      render();
      return;
    }
    const remain = [];
    for (const item of pending) {
      try {
        await pushEntry({ ...item, syncStatus: "retrying" });
        const logs = getLogs().map(log => log.id === item.id ? { ...log, syncStatus: "D1 saved", updatedAt: nowIso() } : log);
        setLogs(logs);
      } catch (error) {
        remain.push({ ...item, syncStatus: "pending sync", syncError: error.message, updatedAt: nowIso() });
      }
    }
    setPending(remain);
    saveStatus = remain.length ? `${remain.length} item(s) still pending.` : "All pending records synced.";
    render();
  }

  function duplicateWarning(analysis, existing) {
    return existing.find(item => item.fieldLog?.duplicateKey === analysis.duplicateKey);
  }

  async function persistAnalysis(analysis) {
    const logs = getLogs();
    const existing = duplicateWarning(analysis, logs);
    duplicateNotice = existing ? `Possible duplicate: ${existing.title} (${existing.fieldLog?.date || existing.createdAt})` : null;
    const page = buildBookshelfPage(analysis, existing ? { id: existing.id, createdAt: existing.createdAt } : {});
    const nextLogs = logs.filter(item => item.id !== page.id);
    nextLogs.unshift(page);
    setLogs(nextLogs);
    saveBookshelfPage(page);
    saveStatus = K.saved;
    window.dispatchEvent(new CustomEvent("project-universe-field-log-saved", { detail: page }));
    try {
      await pushEntry(page);
      const synced = { ...page, syncStatus: "D1 saved", updatedAt: nowIso() };
      setLogs(getLogs().map(item => item.id === page.id ? synced : item));
      saveBookshelfPage(synced);
      saveStatus = K.d1Saved;
    } catch (error) {
      queuePending(page, error);
      saveStatus = `${K.d1Pending} (${error.message})`;
    }
    render();
  }

  function buildPatternIntelligence(logs = getLogs()) {
    const countMap = (getter) => {
      const map = new Map();
      logs.forEach(log => {
        const values = getter(log).filter(Boolean);
        values.forEach(value => map.set(value, (map.get(value) || 0) + 1));
      });
      return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10);
    };
    const topSubsystems = countMap(log => log.fieldLog?.subsystem || []);
    const repeatedIssueTypes = countMap(log => log.fieldLog?.issueTypes || []);
    const missedEvidence = countMap(log => log.fieldLog?.evidenceMissing || []);
    const learningGaps = countMap(log => log.fieldLog?.learningGaps || []);
    const highRisk = logs.filter(log => log.fieldLog?.risk === "high" || log.severity === "high");
    const missingNext = logs.filter(log => !String(log.nextStep || log.fieldLog?.nextAction || "").trim());
    const weakReport = logs.filter(log => log.fieldLog?.customerReportQuality !== "usable draft");
    const recommendations = [];
    if (topSubsystems[0]) recommendations.push(`Review ${topSubsystems[0][0]} because it appears ${topSubsystems[0][1]} time(s).`);
    if (missedEvidence[0]) recommendations.push(`Practice evidence discipline: ${missedEvidence[0][0]} is often missing.`);
    if (learningGaps[0]) recommendations.push(`Add today's 20-min study: ${learningGaps[0][0]}.`);
    if (missingNext.length) recommendations.push(`${missingNext.length} record(s) need a next action.`);
    return {
      total: logs.length,
      pending: getPending().length,
      topSubsystems,
      repeatedIssueTypes,
      missedEvidence,
      learningGaps,
      highRiskIds: highRisk.map(item => item.id),
      missingNextIds: missingNext.map(item => item.id),
      weakReportIds: weakReport.map(item => item.id),
      recommendations,
      weeklySummary: [
        `Total field logs: ${logs.length}`,
        `Top subsystem: ${topSubsystems[0]?.[0] || "not enough data"}`,
        `Most missed evidence: ${missedEvidence[0]?.[0] || "not enough data"}`,
        `Main learning gap: ${learningGaps[0]?.[0] || "not enough data"}`,
        `Pending sync: ${getPending().length}`
      ].join("\n")
    };
  }

  function buildCodexPacket(type = "today") {
    const logs = getLogs();
    const pattern = buildPatternIntelligence(logs);
    const latest = logs[0];
    const boundary = [
      "Do not include recipe, valve sequence, detector setpoint, interlock bypass, customer confidential data, site-specific acceptance limit, full serial number, password, token, seed phrase, account or personal ID.",
      "Use only redacted personal learning notes and public engineering principles.",
      "If exact site/tool approval is needed, say official training/site document must be checked."
    ];
    const body = {
      type,
      createdAt: nowIso(),
      boundary,
      latest: latest ? {
        title: latest.title,
        date: latest.fieldLog?.date,
        tool: latest.fieldLog?.tool,
        phase: latest.fieldLog?.phase,
        summary: latest.summary,
        subsystem: latest.fieldLog?.subsystem,
        risk: latest.fieldLog?.risk,
        evidenceCollected: latest.fieldLog?.evidenceCollected,
        evidenceMissing: latest.fieldLog?.evidenceMissing,
        action: latest.action,
        result: latest.result,
        nextStep: latest.nextStep,
        learningGaps: latest.fieldLog?.learningGaps,
        customerReportDraft: latest.fieldLog?.customerReportDraft
      } : null,
      pattern
    };
    const taskMap = {
      today: "Analyze today's field learning log and tell me the safest next action, missing evidence, and study target.",
      weekly: "Summarize this week's CE field patterns and create a 7-day improvement plan.",
      improveBook: "Use these redacted field patterns to improve the FEP/EPI/RTP book without adding confidential procedures.",
      simulator: "Turn these repeated field weaknesses into safe CE simulator cases.",
      english: "Improve the customer report wording in clear technical English without overpromising.",
      msRoute: "Convert these learning gaps into a Materials MS / Fellow roadmap step."
    };
    return `${taskMap[type] || taskMap.today}\n\n${JSON.stringify(body, null, 2)}`;
  }

  function renderList(name, items, empty = "not enough data") {
    const safe = (items || []).filter(Boolean);
    if (!safe.length) return `<p class="muted">${escapeHtml(empty)}</p>`;
    return `<ul>${safe.map(item => `<li>${escapeHtml(Array.isArray(item) ? `${item[0]} (${item[1]})` : item)}</li>`).join("")}</ul>`;
  }

  function renderAnalysis(analysis) {
    if (!analysis) {
      return `<div class="field-empty"><b>Start with a narrative.</b><p>Write freely first. The system will separate facts, assumptions, evidence, risks, next actions, and a customer report draft.</p></div>`;
    }
    const sensitive = analysis.sensitiveHits?.length
      ? `<div class="field-alert"><b>${K.warning}</b><p>Detected: ${escapeHtml(analysis.sensitiveHits.join(", "))}. Redact before AI export or customer sharing.</p></div>`
      : "";
    const cards = [
      [K.symptom, analysis.symptom],
      [K.fact, analysis.confirmedFact],
      [K.assumption, analysis.assumption],
      [K.subsystem, analysis.subsystem],
      [K.evidence, analysis.evidenceCollected],
      [K.missing, analysis.evidenceMissing],
      [K.gap, analysis.learningGaps],
      [K.chapter, analysis.relatedChapters]
    ];
    return `
      ${sensitive}
      <div class="field-summary-card">
        <span class="field-risk risk-${escapeHtml(analysis.risk)}">${escapeHtml(analysis.risk.toUpperCase())}</span>
        <h3>${escapeHtml(analysis.title)}</h3>
        <p>${escapeHtml(analysis.summary)}</p>
      </div>
      <div class="field-analysis-grid">
        ${cards.map(([title, values]) => `
          <article>
            <b>${escapeHtml(title)}</b>
            ${renderList(title, Array.isArray(values) ? values : [values])}
          </article>
        `).join("")}
      </div>
      <article class="field-report-box">
        <div class="field-row-between">
          <b>Customer Report Draft</b>
          <button class="secondary mini" type="button" data-copy-report>Copy</button>
        </div>
        <pre>${escapeHtml(analysis.customerReportDraft)}</pre>
      </article>
    `;
  }

  function renderPatterns(pattern) {
    return `
      <div class="field-pattern-grid">
        <article><b>Top subsystem</b>${renderList("subsystems", pattern.topSubsystems)}</article>
        <article><b>Repeated issue type</b>${renderList("issues", pattern.repeatedIssueTypes)}</article>
        <article><b>Often missing evidence</b>${renderList("evidence", pattern.missedEvidence)}</article>
        <article><b>Learning gaps</b>${renderList("gaps", pattern.learningGaps)}</article>
      </div>
      <article class="field-report-box">
        <b>Weekly Pattern Summary</b>
        <pre>${escapeHtml(pattern.weeklySummary)}</pre>
        ${renderList("recommendations", pattern.recommendations)}
      </article>
    `;
  }

  function renderCodexPackets() {
    const types = [
      ["today", "Today analysis"],
      ["weekly", "Weekly pattern"],
      ["improveBook", "Improve FEP/EPI book"],
      ["simulator", "Build CE simulator cases"],
      ["english", "English report coach"],
      ["msRoute", "Materials MS route"]
    ];
    latestPackets = Object.fromEntries(types.map(([type]) => [type, buildCodexPacket(type)]));
    return `
      <div class="field-packet-list">
        ${types.map(([type, label]) => `
          <article class="field-packet">
            <div>
              <b>${escapeHtml(label)}</b>
              <p>Redacted packet for Codex / AI review.</p>
            </div>
            <button class="secondary mini" type="button" data-copy-packet="${escapeHtml(type)}">Copy</button>
          </article>
        `).join("")}
      </div>
    `;
  }

  function renderRecent(logs) {
    if (!logs.length) return `<p class="muted">${K.noLogs}</p>`;
    return logs.slice(0, 8).map(log => `
      <article class="field-log-row">
        <header>
          <strong>${escapeHtml(log.title)}</strong>
          <span class="${log.syncStatus === "D1 saved" ? "synced" : "pending"}">${escapeHtml(log.syncStatus || "local saved")}</span>
        </header>
        <small>${escapeHtml(log.fieldLog?.date || log.createdAt)} / ${escapeHtml(log.fieldLog?.tool || "")} / ${escapeHtml(log.fieldLog?.phase || "")}</small>
        <p>${escapeHtml(log.summary || "")}</p>
        <b>${K.next}: ${escapeHtml(log.nextStep || log.fieldLog?.nextAction || "not written")}</b>
      </article>
    `).join("");
  }

  function getFormData() {
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

  function analyzeFromForm() {
    draftForm = getFormData();
    draftAnalysis = analyzeNarrative(draftForm);
    const target = document.querySelector("#field-log-analysis");
    if (target) target.innerHTML = renderAnalysis(draftAnalysis);
    bindCopyButtons();
  }

  async function saveFromForm(event) {
    event?.preventDefault();
    draftForm = getFormData();
    if (!draftForm.narrative.trim()) {
      saveStatus = "Narrative is required.";
      render();
      return;
    }
    draftAnalysis = analyzeNarrative(draftForm);
    saveStatus = K.prepared;
    await persistAnalysis(draftAnalysis);
  }

  function exportLogs() {
    const payload = {
      schemaVersion: SCHEMA_VERSION,
      exportedAt: nowIso(),
      boundary: "Redact confidential data before sharing.",
      logs: getLogs(),
      pending: getPending(),
      pattern: buildPatternIntelligence()
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `field-daily-log-backup-${localDateString()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  async function copyText(text, button) {
    try {
      await navigator.clipboard.writeText(text);
      if (button) {
        const original = button.textContent;
        button.textContent = K.copied;
        setTimeout(() => { button.textContent = original; }, 1100);
      }
    } catch {
      const area = document.createElement("textarea");
      area.value = text;
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
  }

  function bindCopyButtons() {
    document.querySelectorAll("[data-copy-packet]").forEach(button => {
      button.addEventListener("click", () => {
        const type = button.getAttribute("data-copy-packet");
        copyText(latestPackets[type] || buildCodexPacket(type), button);
      });
    });
    document.querySelector("[data-copy-report]")?.addEventListener("click", event => {
      copyText(draftAnalysis?.customerReportDraft || "", event.currentTarget);
    });
  }

  function render() {
    const root = document.getElementById(ROOT_ID);
    if (!root) return;
    const logs = getLogs();
    const pending = getPending();
    const pattern = buildPatternIntelligence(logs);
    const form = draftForm || {
      date: localDateString(),
      shift: "",
      tool: "Centura EPI",
      phase: "learning note",
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
            <h2>${BOOK_TITLE}</h2>
            <p>${K.lead}. Write naturally; the system turns the note into evidence-first CE memory and AI-ready packets.</p>
          </div>
          <div class="field-log-metrics">
            <span><b>${logs.length}</b> total records</span>
            <span><b>${pending.length}</b> pending sync</span>
            <span><b>${pattern.highRiskIds.length}</b> high risk</span>
            <span><b>${pattern.missingNextIds.length}</b> missing next action</span>
          </div>
        </article>

        <div class="field-log-layout">
          <article class="field-log-panel">
            <div class="field-row-between">
              <h3>Daily Narrative Capture</h3>
              <span class="sync-pill">${escapeHtml(saveStatus)}</span>
            </div>
            ${duplicateNotice ? `<div class="field-alert"><b>Duplicate warning</b><p>${escapeHtml(duplicateNotice)}</p></div>` : ""}
            <form id="field-log-form" class="field-log-form">
              <div class="field-log-grid">
                <label>${K.date}<input id="field-log-date" type="date" required value="${escapeHtml(form.date || localDateString())}" /></label>
                <label>Shift / time<input id="field-log-shift" value="${escapeHtml(form.shift || "")}" placeholder="Day, Night, 09:00-18:00" /></label>
                <label>Tool / area<select id="field-log-tool">${toolOptions.map(item => `<option ${item === form.tool ? "selected" : ""}>${escapeHtml(item)}</option>`).join("")}</select></label>
                <label>Install phase<select id="field-log-phase">${phaseOptions.map(item => `<option ${item === form.phase ? "selected" : ""}>${escapeHtml(item)}</option>`).join("")}</select></label>
                <label>Line/location summary<input id="field-log-location" value="${escapeHtml(form.location || "")}" placeholder="Redacted area summary only" /></label>
                <label>${K.title}<input id="field-log-title" maxlength="120" value="${escapeHtml(form.title || "")}" placeholder="LL pumpdown delay / gas readiness hold" /></label>
              </div>
              <label class="field-wide-label">
                Narrative
                <textarea id="field-log-narrative" required placeholder="Example: Today during Centura EPI install, load lock pumpdown took longer than expected. I checked the pressure trend and pump ready signal, compared status with the facility exhaust owner, and did not assume root cause yet. Tomorrow I will ask a senior about the pumpdown curve and leak-check boundary.">${escapeHtml(form.narrative || "")}</textarea>
              </label>
              <div class="field-log-boundary">
                <span><b>${K.warning}</b> Do not store recipe, valve sequence, detector setpoint, interlock bypass, customer confidential data, site-specific acceptance limit, full serial number, password, token, seed phrase, account or personal ID.</span>
                <label class="inline-check">
                  <input id="field-log-ai-export" type="checkbox" ${form.aiExportOk !== false ? "checked" : ""} />
                  AI export allowed after redaction
                </label>
              </div>
              <div class="field-actions">
                <button class="secondary" type="button" id="field-log-analyze">Structure note</button>
                <button class="primary" type="submit">Save + sync D1</button>
                <button class="secondary" type="button" id="field-log-retry">Retry pending</button>
                <button class="secondary" type="button" id="field-log-export">JSON backup</button>
              </div>
            </form>
          </article>

          <article class="field-log-panel field-output-panel">
            <div class="field-row-between">
              <h3>Structured CE Memory</h3>
              <span>${SCHEMA_VERSION}</span>
            </div>
            <div id="field-log-analysis">${renderAnalysis(draftAnalysis)}</div>
          </article>
        </div>

        <section class="field-log-bottom-grid">
          <article class="field-log-panel field-pattern-panel">
            <h3>Pattern Intelligence</h3>
            ${renderPatterns(pattern)}
          </article>
          <article class="field-log-panel">
            <h3>Codex Handoff Center</h3>
            <p>Copy a redacted packet and paste it to Codex when you want deeper analysis or web upgrades.</p>
            ${renderCodexPackets()}
          </article>
          <article class="field-log-panel">
            <div class="field-row-between">
              <h3>Recent Records</h3>
              <button class="secondary mini" type="button" id="field-log-open-book">Open bookshelf</button>
            </div>
            ${renderRecent(logs)}
          </article>
        </section>
      </section>
    `;

    document.querySelector("#field-log-form")?.addEventListener("submit", saveFromForm);
    document.querySelector("#field-log-analyze")?.addEventListener("click", analyzeFromForm);
    document.querySelector("#field-log-retry")?.addEventListener("click", retryPending);
    document.querySelector("#field-log-export")?.addEventListener("click", exportLogs);
    document.querySelector("#field-log-open-book")?.addEventListener("click", () => {
      if (typeof window.showView === "function") window.showView("bookshelf");
      setTimeout(() => {
        const card = document.querySelector('[data-book-id="field-daily-log"]');
        card?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 150);
    });
    bindCopyButtons();
  }

  window.ProjectUniverseFieldLog = {
    render,
    getLogs,
    retryPending,
    analyzeNarrative,
    buildPatternIntelligence,
    buildCodexPacket
  };

  document.addEventListener("DOMContentLoaded", render);
  window.addEventListener("project-universe-unlocked", render);
})();
