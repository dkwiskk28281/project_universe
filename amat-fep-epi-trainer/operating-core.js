(() => {
  const ROOT_ID = "operating-core-root";
  const DONE_KEY = "projectUniverseOperatingCoreDoneV1";
  const ROUTINE_KEY = "projectUniverseDailyRoutineLogV1";
  const INTEGRITY_LEDGER_KEY = "projectUniverseIntegrityLedgerV1";
  const LIFE_INTELLIGENCE_KEY = "projectUniverseLifeIntelligenceCheckpointsV1";
  const EXPORT_VERSION = "project-universe-operating-core-v7-data-os";
  const DATA_RELIABILITY_VERSION = "project-universe-data-reliability-v1";
  const LIFE_INTELLIGENCE_VERSION = "project-universe-life-intelligence-v1";
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
      analysis: null,
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
    const fieldLogs = safeJson("projectUniverseFieldDailyLogsV1", []);
    const fieldPending = safeJson("projectUniverseFieldDailyPendingV1", []);
    const materialsMs = safeJson("materialsMsAcademyStateV1", {});
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

    const msReviews = Array.isArray(materialsMs.reviews) ? materialsMs.reviews : [];
    const msDue = msReviews.filter(item => new Date(item.dueAt || 0).getTime() <= now);
    const msAttempts = Array.isArray(materialsMs.attempts) ? materialsMs.attempts : [];
    const msWrongByTopic = {};
    msAttempts.filter(item => item.correct === false).forEach(item => {
      const skill = item.topic || item.conceptId || "materials prerequisite";
      msWrongByTopic[skill] = msWrongByTopic[skill] || { skill, count: 0 };
      msWrongByTopic[skill].count += 1;
    });
    const msWeak = Object.values(msWrongByTopic).sort((a, b) => b.count - a.count);

    const cognitiveLogs = Array.isArray(cognitive.logs) ? cognitive.logs : Array.isArray(cognitive.sessions) ? cognitive.sessions : [];
    const visionLogs = Array.isArray(vision.logs) ? vision.logs : [];
    const latestVision = visionLogs[0] || null;
    const frequentDouble = visionLogs.filter(log => log.control === "frequent-double" || Number(log.diplopia || 0) >= 4).length;
    const fieldRows = Array.isArray(fieldLogs) ? fieldLogs : [];
    const fieldAnalyses = fieldRows.map(log => log.fieldLog || log);
    const fieldCount = (mapper) => {
      const counts = {};
      fieldAnalyses.forEach(row => {
        const raw = mapper(row);
        (Array.isArray(raw) ? raw : [raw]).filter(Boolean).forEach(value => {
          counts[value] = (counts[value] || 0) + 1;
        });
      });
      return Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([label, count]) => ({ label, count }));
    };
    const fieldWeakNext = value => {
      const text = `${value || ""}`.trim();
      return !text || /지정하세요|필요|미지정|대기/.test(text);
    };
    const fieldSubsystems = fieldCount(row => row.subsystem || row.subsystems || []).slice(0, 6);
    const fieldIssues = fieldCount(row => row.issueTypes || []).slice(0, 6);
    const fieldMissedEvidence = fieldCount(row => row.evidenceMissing || []).slice(0, 8);
    const fieldLearningGaps = fieldCount(row => row.learningGaps || []).slice(0, 8);
    const fieldHighRisk = fieldRows.filter(log => {
      const row = log.fieldLog || log;
      return ["high", "security-boundary-review"].includes(row.risk || row.riskLevel || log.severity);
    });
    const fieldOpenNext = fieldRows.filter(log => {
      const row = log.fieldLog || log;
      return fieldWeakNext(row.nextAction || row.nextStep || log.nextStep || log.nextAction);
    });
    const fieldWeakReports = fieldRows.filter(log => {
      const row = log.fieldLog || log;
      return row.customerReportQuality?.score < 80 || !(row.customerReportDraft || row.customerReport || "").trim();
    });

    const missingNextStep = pages.filter(page => {
      const text = `${page.nextStep || ""} ${page.nextAction || ""}`.trim();
      return !text && !["cognitive-resilience", "vision-function-recovery"].includes(page.bookId);
    }).length;

    const pendingSync = [
      { lane: "Think Tank", count: thinkTankPending.length },
      { lane: "English", count: safeJson("amkEnglishPendingRecords", []).length },
      { lane: "Field Daily", count: Array.isArray(fieldPending) ? fieldPending.length : 0 },
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
      materialsMs: {
        attempts: msAttempts.length,
        due: msDue.length,
        sessions: Array.isArray(materialsMs.sessionLog) ? materialsMs.sessionLog.length : 0,
        completedLessons: Object.keys(materialsMs.lessonMastery || {}).length,
        weakness: msWeak.slice(0, 6),
        latestCheckpoint: Array.isArray(materialsMs.masteryCheckpoints) ? materialsMs.masteryCheckpoints[0] || null : null
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
      fieldDaily: {
        logs: fieldRows.length,
        pending: Array.isArray(fieldPending) ? fieldPending.length : 0,
        latest: fieldRows[0] || null,
        openNext: fieldOpenNext.length,
        highRisk: fieldHighRisk.length,
        weakReports: fieldWeakReports.length,
        topSubsystems: fieldSubsystems,
        issueTypes: fieldIssues,
        missedEvidence: fieldMissedEvidence,
        learningGaps: fieldLearningGaps,
        weeklySummary: fieldRows.length
          ? `${fieldRows.length} field logs · top subsystem ${fieldSubsystems[0]?.label || "n/a"} · missed evidence ${fieldMissedEvidence[0]?.label || "n/a"}`
          : "field log 데이터 대기"
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

  function integrityLedger() {
    const ledger = safeJson(INTEGRITY_LEDGER_KEY, []);
    return Array.isArray(ledger) ? ledger : [];
  }

  function recordSetsFromSignals(signals) {
    const pages = Array.isArray(signals.pages) ? signals.pages : [];
    const thinkTank = Array.isArray(signals.thinkTank) ? signals.thinkTank : [];
    return [
      ...pages.map(record => ({ type: "bookshelf", record })),
      ...thinkTank.map(record => ({ type: "thinkTank", record }))
    ];
  }

  function countBy(rows, mapper) {
    return rows.reduce((map, row) => {
      const key = mapper(row) || "missing";
      map[key] = (map[key] || 0) + 1;
      return map;
    }, {});
  }

  function recordLabel(item) {
    const record = item.record || {};
    return record.title || record.topic || record.symptom || record.id || `${item.type} record`;
  }

  function compactRecordText(record = {}) {
    return [
      record.title,
      record.topic,
      record.summary,
      record.content,
      record.evidence,
      record.action,
      record.result,
      record.nextStep,
      record.symptom,
      record.suspectedCause,
      record.customerReport,
      record.prevention
    ].filter(Boolean).join(" ").toLowerCase();
  }

  function scanSensitive(record = {}) {
    const text = compactRecordText(record);
    if (!text) return [];
    return SENSITIVE_BLOCKLIST.filter(term => text.includes(term.toLowerCase()));
  }

  function fileVaultAudit(recordSets) {
    const indexes = [];
    recordSets.forEach(item => {
      const files = Array.isArray(item.record?.fileIndex) ? item.record.fileIndex : [];
      files.forEach(file => {
        const storageTarget = String(file.storageTarget || file.storage || file.target || "").toLowerCase();
        const hash = file.hash || file.fileHash || file.integrityHash;
        const locationHint = file.locationHint || file.pathHint || file.urlHint;
        const label = file.fileLabel || file.label || file.name || "unnamed file";
        const unsafeDatabaseTarget = /d1|database/.test(storageTarget) && !/index|metadata|summary/.test(storageTarget);
        const gaps = [
          !hash ? "missing hash" : "",
          !locationHint ? "missing location hint" : "",
          !storageTarget ? "missing storage target" : "",
          unsafeDatabaseTarget ? "raw file marked for D1/database" : ""
        ].filter(Boolean);
        indexes.push({
          ownerType: item.type,
          ownerId: item.record?.id || null,
          ownerLabel: recordLabel(item),
          label,
          storageTarget: storageTarget || "unknown",
          hasHash: Boolean(hash),
          hasLocationHint: Boolean(locationHint),
          gaps
        });
      });
    });
    return {
      total: indexes.length,
      gaps: indexes.filter(file => file.gaps.length),
      byTarget: countBy(indexes, file => file.storageTarget || "unknown"),
      samples: indexes.slice(0, 8)
    };
  }

  function schemaAudit(signals) {
    const recordSets = recordSetsFromSignals(signals);
    const missingRows = recordSets
      .map(item => ({ ...item, label: recordLabel(item), missing: fieldDebtForRecord(item.record) }))
      .filter(item => item.missing.length);
    const missingByField = REQUIRED_RECORD_FIELDS.reduce((summary, field) => {
      summary[field] = missingRows.filter(item => item.missing.includes(field)).length;
      return summary;
    }, {});
    const sensitiveHits = recordSets
      .map(item => ({ type: item.type, id: item.record?.id || null, label: recordLabel(item), hits: scanSensitive(item.record) }))
      .filter(item => item.hits.length);
    const integrityHashMissing = recordSets.filter(item => !(item.record?.integrityHash || item.record?.serverIntegrityHash || item.record?.hash)).length;
    const fileAudit = fileVaultAudit(recordSets);
    return {
      totalRecords: recordSets.length,
      missingRows: missingRows.slice(0, 12),
      missingByField,
      schemaVersions: countBy(recordSets, item => item.record?.schemaVersion),
      privacyLevels: countBy(recordSets, item => item.record?.privacyLevel),
      exportPolicies: countBy(recordSets, item => item.record?.exportPolicy),
      integrityHashMissing,
      sensitiveHits: sensitiveHits.slice(0, 12),
      sensitiveHitCount: sensitiveHits.length,
      fileAudit
    };
  }

  function recordSignature(item) {
    const record = item.record || {};
    return hashString(JSON.stringify({
      type: item.type,
      id: record.id || null,
      title: record.title || record.topic || record.symptom || null,
      updatedAt: record.updatedAt || null,
      schemaVersion: record.schemaVersion || null,
      privacyLevel: record.privacyLevel || null,
      exportPolicy: record.exportPolicy || null,
      evidence: record.evidence || record.sourceUrl || record.sourceTitle || null,
      action: record.action || null,
      result: record.result || null,
      nextStep: record.nextStep || record.nextAction || null,
      files: Array.isArray(record.fileIndex) ? record.fileIndex.map(file => ({
        label: file.fileLabel || file.label || file.name || null,
        hash: file.hash || file.fileHash || file.integrityHash || null,
        target: file.storageTarget || file.storage || file.target || null
      })) : []
    }));
  }

  function conflictAudit(signals) {
    const recordSets = recordSetsFromSignals(signals);
    const byId = new Map();
    const byTitle = new Map();
    recordSets.forEach(item => {
      const record = item.record || {};
      const id = record.id || "";
      const title = String(record.title || record.topic || record.symptom || "").trim().toLowerCase();
      if (id) byId.set(id, [...(byId.get(id) || []), item]);
      if (title) byTitle.set(title, [...(byTitle.get(title) || []), item]);
    });
    const duplicateIds = [...byId.entries()]
      .filter(([, rows]) => rows.length > 1)
      .map(([id, rows]) => ({
        id,
        count: rows.length,
        labels: rows.map(recordLabel).slice(0, 4),
        conflictingVersions: new Set(rows.map(recordSignature)).size > 1
      }));
    const duplicateTitles = [...byTitle.entries()]
      .filter(([, rows]) => rows.length > 1)
      .map(([title, rows]) => ({
        title,
        count: rows.length,
        ids: rows.map(item => item.record?.id || "no-id").slice(0, 4),
        conflictingVersions: new Set(rows.map(recordSignature)).size > 1
      }));
    const restoreEvents = safeJson("projectUniverseBookshelfRestoreEvents", []);
    return {
      duplicateIds,
      duplicateTitles: duplicateTitles.slice(0, 12),
      conflictCandidates: [...duplicateIds, ...duplicateTitles].filter(item => item.conflictingVersions).length,
      restoreEvents: Array.isArray(restoreEvents) ? restoreEvents.length : 0
    };
  }

  function backupPlan(signals, integrity, schema, conflicts) {
    const ledger = integrityLedger();
    const lastCheckpoint = ledger.slice(-1)[0] || null;
    const checkpointAgeHours = lastCheckpoint
      ? Math.round((Date.now() - new Date(lastCheckpoint.createdAt).getTime()) / 1000 / 60 / 60)
      : null;
    const actions = [];
    if (!lastCheckpoint || checkpointAgeHours > 24) actions.push({
      level: "high",
      title: "무결성 checkpoint 만들기",
      why: "오늘 상태의 hash를 남겨두면 나중에 데이터 변경/복원 기준점이 생깁니다."
    });
    if (integrity.pendingSync) actions.push({
      level: "high",
      title: "sync pending 처리",
      why: "D1 저장 실패나 대기열은 장기 기억 손실의 가장 직접적인 신호입니다."
    });
    if (schema.schemaDebt) actions.push({
      level: "medium",
      title: "schema metadata 보강",
      why: "schemaVersion/privacy/exportPolicy가 있어야 AI export와 migration이 안전합니다."
    });
    if (schema.fileAudit.gaps.length) actions.push({
      level: "medium",
      title: "File Vault index 정리",
      why: "PDF/이미지/검진표 원문은 R2 또는 D-drive vault에 두고 D1에는 index와 hash만 남겨야 합니다."
    });
    if (schema.sensitiveHitCount) actions.push({
      level: "high",
      title: "민감 키워드 기록 점검",
      why: "AI packet이나 공유 백업에 recipe, password, seed phrase 같은 금지어가 섞이면 안 됩니다."
    });
    if (conflicts.conflictCandidates) actions.push({
      level: "medium",
      title: "충돌 후보 병합",
      why: "동일 id/title인데 내용 hash가 다르면 모바일/PC 저장본이 갈라졌을 수 있습니다."
    });
    if (!actions.length) actions.push({
      level: "stable",
      title: "redacted AI packet 갱신",
      why: "현재 구조가 안정적이므로 AI에게 보여줄 민감정보 제외 요약을 최신화하면 됩니다."
    });
    return {
      status: actions.some(action => action.level === "high") ? "repair-first" : actions.some(action => action.level === "medium") ? "needs-review" : "stable",
      lastCheckpoint,
      checkpointAgeHours,
      localBackupEstimateMb: signals.storage.totalMb,
      recommendedActions: actions.slice(0, 6),
      lanes: [
        {
          name: "D1",
          role: "records, summaries, indexes, hashes",
          boundary: "large raw files are not stored here"
        },
        {
          name: "localStorage",
          role: "offline/browser fallback and temporary queue",
          boundary: "browser cache can be cleared; export regularly"
        },
        {
          name: "R2 or D-drive vault",
          role: "PDF, images, medical reports, install photos, original papers",
          boundary: "D1 stores only file index, summary, tags, location hint, hash"
        },
        {
          name: "AI packet",
          role: "redacted summary for analysis",
          boundary: "no password, seed phrase, account number, customer confidential, recipe, setpoint, bypass"
        }
      ]
    };
  }

  function buildReliabilityPacket(signals, integrity = null) {
    const currentIntegrity = integrity || dataIntegrity(signals);
    const schema = schemaAudit(signals);
    const conflicts = conflictAudit(signals);
    const plan = backupPlan(signals, currentIntegrity, schema, conflicts);
    const packet = {
      schemaVersion: DATA_RELIABILITY_VERSION,
      generatedAt: new Date().toISOString(),
      sourceDevice: "browser-local",
      privacyLevel: "private-operational-summary",
      exportPolicy: "share-redacted-only",
      integrity: {
        score: currentIntegrity.score,
        status: currentIntegrity.status,
        schemaDebt: currentIntegrity.schemaDebt,
        pendingSync: currentIntegrity.pendingSync,
        evidenceMissing: currentIntegrity.evidenceMissing,
        nextStepMissing: currentIntegrity.nextStepMissing
      },
      schemaAudit: {
        totalRecords: schema.totalRecords,
        missingByField: schema.missingByField,
        schemaVersions: schema.schemaVersions,
        privacyLevels: schema.privacyLevels,
        exportPolicies: schema.exportPolicies,
        integrityHashMissing: schema.integrityHashMissing,
        sensitiveHitCount: schema.sensitiveHitCount,
        fileIndexTotal: schema.fileAudit.total,
        fileIndexGapCount: schema.fileAudit.gaps.length
      },
      conflictAudit: {
        duplicateIdCount: schema.totalRecords ? conflicts.duplicateIds.length : 0,
        duplicateTitleCount: conflicts.duplicateTitles.length,
        conflictCandidates: conflicts.conflictCandidates,
        restoreEvents: conflicts.restoreEvents
      },
      backupPlan: plan,
      samples: {
        schemaDebt: schema.missingRows.map(row => ({
          type: row.type,
          id: row.record?.id || null,
          label: row.label,
          missing: row.missing
        })),
        sensitiveHits: schema.sensitiveHits,
        fileGaps: schema.fileAudit.gaps.slice(0, 8),
        duplicateIds: conflicts.duplicateIds.slice(0, 8),
        duplicateTitles: conflicts.duplicateTitles.slice(0, 8)
      },
      neverStoreOrExportToAI: SENSITIVE_BLOCKLIST
    };
    packet.integrityHash = hashString(JSON.stringify({
      schemaVersion: packet.schemaVersion,
      generatedAt: packet.generatedAt,
      integrity: packet.integrity,
      schemaAudit: packet.schemaAudit,
      conflictAudit: packet.conflictAudit,
      backupPlan: packet.backupPlan,
      samples: packet.samples
    }));
    return packet;
  }

  function dataIntegrity(signals) {
    const pages = Array.isArray(signals.pages) ? signals.pages : [];
    const recordSets = recordSetsFromSignals(signals);
    const schema = schemaAudit(signals);
    const conflicts = conflictAudit(signals);
    const missingFieldRows = recordSets
      .map(item => ({ ...item, missing: fieldDebtForRecord(item.record) }))
      .filter(item => item.missing.length);
    const pending = signals.pendingSync.reduce((sum, item) => sum + item.count, 0);
    const evidenceMissing = pages.filter(page => !(page.evidence || page.sourceUrl || page.sourceTitle)).length;
    const fileIndexes = pages.reduce((sum, page) => sum + (Array.isArray(page.fileIndex) ? page.fileIndex.length : 0), 0);
    const nextStepMissing = signals.thinkTankSummary.missingNextStep;
    const lastCheckpoint = integrityLedger().slice(-1)[0] || null;
    const score = Math.max(10, Math.round(
      96
      - Math.min(28, missingFieldRows.length * 2)
      - Math.min(22, pending * 4)
      - Math.min(18, evidenceMissing * 2)
      - Math.min(14, conflicts.duplicateIds.length * 5)
      - Math.min(10, schema.sensitiveHitCount * 3)
      - Math.min(8, schema.fileAudit.gaps.length * 2)
    ));
    const integrity = {
      score,
      schemaDebt: missingFieldRows.length,
      duplicateIds: conflicts.duplicateIds.length,
      conflictCandidates: conflicts.conflictCandidates,
      pendingSync: pending,
      evidenceMissing,
      fileIndexes,
      fileVaultGaps: schema.fileAudit.gaps.length,
      sensitiveHitCount: schema.sensitiveHitCount,
      integrityHashMissing: schema.integrityHashMissing,
      nextStepMissing,
      lastCheckpoint,
      status: score >= 85 ? "stable" : score >= 65 ? "needs-review" : "repair-first",
      checklist: [
        missingFieldRows.length ? `${missingFieldRows.length}개 기록에 schema metadata 보강 필요` : "schema metadata debt 없음",
        pending ? `${pending}개 sync pending 기록 확인 필요` : "sync pending 없음",
        evidenceMissing ? `${evidenceMissing}개 기록에 evidence/source 보강 권장` : "근거 없는 책장 기록 없음",
        conflicts.duplicateIds.length ? `${conflicts.duplicateIds.length}개 중복 id 후보` : "중복 id 후보 없음",
        schema.sensitiveHitCount ? `${schema.sensitiveHitCount}개 민감 키워드 후보 점검 필요` : "금지 민감 키워드 후보 없음",
        schema.fileAudit.gaps.length ? `${schema.fileAudit.gaps.length}개 file vault index 보강 필요` : "file vault index gap 없음",
        fileIndexes ? `${fileIndexes}개 file index: 원문은 R2/D-drive, D1은 summary/hash만` : "File Vault index 없음: 원문 파일은 D1에 넣지 않기",
        lastCheckpoint ? `마지막 checkpoint ${new Date(lastCheckpoint.createdAt).toLocaleString()}` : "아직 integrity checkpoint 없음"
      ]
    };
    integrity.schemaAudit = schema;
    integrity.conflictAudit = conflicts;
    integrity.backupPlan = backupPlan(signals, integrity, schema, conflicts);
    return integrity;
  }

  function makeDailyRoutine(signals, tasks, integrity) {
    const englishWeak = signals.english.weaknesses[0]?.skill || "technical English";
    const ceWeak = signals.ce.weaknesses[0]?.skill || "evidence-first 판단";
    const msWeak = signals.materialsMs?.weakness?.[0]?.skill || "비율/단위환산";
    const fieldGap = signals.fieldDaily?.learningGaps?.[0]?.label || signals.fieldDaily?.missedEvidence?.[0]?.label || "현장 evidence-first 기록";
    const needsFieldLog = !signals.fieldDaily?.latest || String(signals.fieldDaily.latest?.date || "").slice(0, 10) !== todayKey();
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
        view: signals.fieldDaily?.highRisk || signals.fieldDaily?.openNext ? "field-log" : "diagnostics",
        title: signals.fieldDaily?.openNext ? `현장 open-loop ${signals.fieldDaily.openNext}개 닫기` : `${ceWeak} 케이스 판단 1개`,
        reason: signals.fieldDaily?.openNext ? "실제 현장 기록의 next action, owner, stop condition을 닫는 것이 가장 강한 CE 훈련입니다." : "증상에서 바로 행동하지 않고 risk, subsystem, evidence, stop condition을 고르는 훈련입니다.",
        evidence: signals.fieldDaily?.openNext ? signals.fieldDaily.weeklySummary : `${signals.ce.caseAnswers} case answers · ${signals.ce.weaknesses.length} weak tags`
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
        view: "materials-ms",
        title: `Materials MS: ${msWeak} 1개`,
        reason: "수학, 물리, 화학, 재료공학, 결정성장, 박막, 통계, DOE를 adaptive curriculum으로 이어갑니다.",
        evidence: `${signals.materialsMs?.due || 0} MS reviews due · ${signals.materialsMs?.attempts || 0} attempts · ${signals.materialsMs?.completedLessons || 0} lessons`
      },
      {
        id: "record",
        minutes: 2,
        lane: "기록",
        view: needsFieldLog ? "field-log" : "bookshelf",
        title: needsFieldLog ? "오늘 현장 데일리 로그 남기기" : signals.fieldDaily?.missedEvidence?.length ? `${fieldGap} 보강` : integrity.nextStepMissing ? "nextStep 없는 기록 1개 닫기" : "AI packet checkpoint 생성",
        reason: needsFieldLog ? "현장 서술은 장기 CE 빅데이터의 원천입니다." : "공부가 기억으로 남으려면 action/result/nextStep 또는 checkpoint가 필요합니다.",
        evidence: `${signals.fieldDaily?.logs || 0} field logs · ${signals.fieldDaily?.openNext || 0} field open · ${integrity.nextStepMissing} missing nextStep · ${integrity.pendingSync} sync pending`
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
      signals.fieldDaily?.openNext ? `현장 로그 open-loop ${signals.fieldDaily.openNext}개: next action/owner/review time 보강 필요` : "현장 로그 next action 연결 양호",
      signals.fieldDaily?.missedEvidence?.[0] ? `반복 누락 evidence: ${signals.fieldDaily.missedEvidence[0].label}` : "현장 evidence 누락 패턴은 아직 낮음",
      signals.english.due ? "영어 복습 대기열이 오늘 루틴 우선순위에 들어감" : "영어 복습 대기열은 낮음",
      signals.ce.weaknesses.length ? "CE 판단 약점은 케이스 게임으로 재훈련 필요" : "CE 약점 데이터가 부족하므로 새 케이스가 필요",
      signals.materialsMs?.due ? "Materials MS 복습 큐가 Fellow 루트의 오늘 우선순위에 들어감" : "Materials MS 복습 큐는 현재 낮음"
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

  function severityRank(severity) {
    return { critical: 4, high: 3, medium: 2, low: 1, stable: 0 }[severity] ?? 1;
  }

  function clampScore(value) {
    return Math.max(0, Math.min(100, Math.round(value)));
  }

  function buildDomainReadiness(signals, integrity, reliability) {
    const ceWeaknessLoad = signals.ce.weaknesses.reduce((sum, item) => sum + Number(item.count || 0), 0);
    const englishAccuracy = signals.english.accuracy ?? (signals.english.microAttempts ? 50 : 35);
    const materialsProgress = Math.min(40, (signals.materialsMs?.completedLessons || 0) * 4) + Math.min(20, (signals.materialsMs?.attempts || 0) * 1.4);
    const cognitiveSessions = signals.cognitive.sessions || 0;
    const visionPenalty = signals.vision.frequentDouble ? 18 : 0;
    const schemaPenalty = Math.min(28, integrity.schemaDebt * 2 + reliability.schemaAudit.fileIndexGapCount * 3 + reliability.schemaAudit.sensitiveHitCount * 4);
    return [
      {
        id: "fep-epi-ce",
        label: "FEP/EPI CE 사고력",
        score: clampScore(48 + signals.ce.caseAnswers * 3 + signals.ce.curriculumDone * 1.2 - Math.min(22, ceWeaknessLoad)),
        evidence: `${signals.ce.caseAnswers} case answers · ${signals.ce.curriculumDone} curriculum checks · ${ceWeaknessLoad} weak signals`,
        nextAction: signals.ce.weaknesses[0] ? `${signals.ce.weaknesses[0].skill} 케이스를 evidence-first로 재훈련` : "새 CE campaign case를 풀어 기준 데이터를 만들기",
        view: "diagnostics"
      },
      {
        id: "technical-english",
        label: "기술 영어/고객 보고",
        score: clampScore(englishAccuracy - Math.min(18, signals.english.due * 2) + Math.min(12, signals.english.microAttempts * 0.4)),
        evidence: `${signals.english.microAttempts} attempts · ${signals.english.due} due · ${englishAccuracy}% accuracy`,
        nextAction: signals.english.weaknesses[0] ? `${signals.english.weaknesses[0].skill} 오답 변형 3문항` : "CBT 10문항으로 새 약점 태그 생성",
        view: "english-test"
      },
      {
        id: "materials-ms",
        label: "Materials MS/Fellow 기초",
        score: clampScore(34 + materialsProgress - Math.min(14, (signals.materialsMs?.due || 0) * 2)),
        evidence: `${signals.materialsMs?.completedLessons || 0} lessons · ${signals.materialsMs?.attempts || 0} attempts · ${signals.materialsMs?.due || 0} reviews due`,
        nextAction: signals.materialsMs?.weakness?.[0] ? `${signals.materialsMs.weakness[0].skill} 선수개념 복습` : "비율/로그/통계 diagnostic부터 한 세션",
        view: "materials-ms"
      },
      {
        id: "cognitive-vision",
        label: "인지/시기능 루틴 안정성",
        score: clampScore(55 + Math.min(25, cognitiveSessions * 3) + Math.min(12, signals.vision.sessions * 2) - visionPenalty),
        evidence: `${cognitiveSessions} cognitive sessions · ${signals.vision.sessions} vision sessions · ${signals.vision.frequentDouble} high diplopia signals`,
        nextAction: signals.vision.frequentDouble ? "시기능 훈련 강도보다 중지 조건/진료 질문 정리" : "짧은 인지+시기능 기록으로 baseline 유지",
        view: signals.vision.frequentDouble ? "vision-training" : "cognitive"
      },
      {
        id: "data-memory",
        label: "장기 기억/AI 분석 신뢰성",
        score: clampScore(integrity.score - schemaPenalty + Math.min(8, reliability.backupPlan.lastCheckpoint ? 8 : 0)),
        evidence: `${integrity.score} integrity · ${integrity.schemaDebt} schema debt · ${reliability.schemaAudit.fileIndexGapCount} vault gaps · ${reliability.schemaAudit.sensitiveHitCount} sensitive hits`,
        nextAction: reliability.backupPlan.recommendedActions[0]?.title || "redacted AI packet 갱신",
        view: "operating-core"
      }
    ];
  }

  function buildPatternMatrix(signals, tasks, integrity, reliability, domains) {
    const patterns = [];
    const add = (id, domain, severity, title, evidence, nextAction, view) => {
      patterns.push({ id, domain, severity, title, evidence, nextAction, view });
    };
    const englishWeak = signals.english.weaknesses[0];
    const ceWeak = signals.ce.weaknesses[0];
    const msWeak = signals.materialsMs?.weakness?.[0];
    if (ceWeak) add(
      "ce-loop",
      "CE",
      ceWeak.count >= 4 ? "high" : "medium",
      "CE 판단 약점이 반복됨",
      `${ceWeak.skill} · ${ceWeak.count} signals`,
      "증상 → risk → subsystem → evidence → stop condition 순서로 케이스 2개",
      "diagnostics"
    );
    if (englishWeak) add(
      "english-loop",
      "English",
      signals.english.due >= 5 || englishWeak.wrong >= 4 ? "high" : "medium",
      "영어 오답 패턴이 쌓임",
      `${englishWeak.skill} · ${englishWeak.wrong} wrong · ${signals.english.due} due`,
      "오답 즉시 해설 후 같은 개념 변형문제 3개",
      "english-test"
    );
    if (msWeak || signals.materialsMs?.due) add(
      "materials-loop",
      "Fellow",
      signals.materialsMs?.due >= 4 ? "high" : "medium",
      "Materials MS 선수개념 복습 필요",
      `${msWeak?.skill || "review queue"} · ${signals.materialsMs?.due || 0} due`,
      "수학/물리/재료공학 선수개념 25분 세션",
      "materials-ms"
    );
    if (integrity.nextStepMissing) add(
      "open-loop",
      "Think Tank",
      integrity.nextStepMissing >= 5 ? "high" : "medium",
      "기록이 다음 행동으로 닫히지 않음",
      `${integrity.nextStepMissing} records missing nextStep`,
      "가장 최근 기록 1개에 action/result/nextStep 추가",
      "bookshelf"
    );
    if (integrity.evidenceMissing) add(
      "evidence-gap",
      "Knowledge",
      integrity.evidenceMissing >= 5 ? "high" : "medium",
      "근거 없는 기록이 AI 분석 품질을 낮춤",
      `${integrity.evidenceMissing} records missing evidence/source`,
      "중요 기록 1개에 공개자료/측정 evidence를 연결",
      "bookshelf"
    );
    if (signals.vision.frequentDouble) add(
      "vision-risk",
      "Health boundary",
      "high",
      "복시/피로 신호가 루틴에 영향",
      `${signals.vision.frequentDouble} high diplopia signals`,
      "훈련 강도보다 증상 기록, 휴식 조건, 진료 질문 정리",
      "vision-training"
    );
    if (integrity.pendingSync || reliability.conflictAudit.conflictCandidates || reliability.schemaAudit.fileIndexGapCount) add(
      "data-risk",
      "Data OS",
      integrity.pendingSync ? "high" : "medium",
      "장기 기억 저장 신뢰성 점검 필요",
      `${integrity.pendingSync} pending · ${reliability.conflictAudit.conflictCandidates} conflicts · ${reliability.schemaAudit.fileIndexGapCount} vault gaps`,
      "무결성 checkpoint + redacted AI packet export",
      "operating-core"
    );
    domains
      .filter(domain => domain.score < 55)
      .forEach(domain => add(
        `domain-${domain.id}`,
        "Readiness",
        domain.score < 40 ? "high" : "medium",
        `${domain.label} readiness 낮음`,
        domain.evidence,
        domain.nextAction,
        domain.view
      ));
    if (!patterns.length) {
      add(
        "stable-loop",
        "Operating rhythm",
        "stable",
        "큰 병목 신호는 낮음",
        `${tasks.length} actions · ${integrity.score} integrity`,
        "오늘 30분 루틴을 완료하고 checkpoint만 남기기",
        "operating-core"
      );
    }
    return patterns.sort((a, b) => severityRank(b.severity) - severityRank(a.severity)).slice(0, 10);
  }

  function buildSevenDayPlan(tasks, patterns, domains) {
    const primaryPatterns = patterns.filter(pattern => pattern.severity !== "stable");
    const lowDomains = domains.slice().sort((a, b) => a.score - b.score);
    const plan = [
      {
        day: 1,
        theme: "운영 정렬",
        action: tasks[0]?.title || "오늘 30분 루틴",
        evidence: tasks[0]?.evidence || "operating queue",
        minutes: 30,
        view: tasks[0]?.view || "operating-core"
      },
      {
        day: 2,
        theme: "가장 큰 약점",
        action: primaryPatterns[0]?.nextAction || lowDomains[0]?.nextAction || "약점 진단 1세트",
        evidence: primaryPatterns[0]?.evidence || lowDomains[0]?.evidence || "weakness-first",
        minutes: 25,
        view: primaryPatterns[0]?.view || lowDomains[0]?.view || "diagnostics"
      },
      {
        day: 3,
        theme: "Fellow 기초",
        action: lowDomains.find(domain => domain.id === "materials-ms")?.nextAction || "Materials MS 선수개념 1개",
        evidence: lowDomains.find(domain => domain.id === "materials-ms")?.evidence || "MS readiness",
        minutes: 30,
        view: "materials-ms"
      },
      {
        day: 4,
        theme: "현장 사고",
        action: primaryPatterns.find(pattern => pattern.domain === "CE")?.nextAction || "CE campaign case 1개",
        evidence: primaryPatterns.find(pattern => pattern.domain === "CE")?.evidence || "case engine",
        minutes: 20,
        view: "diagnostics"
      },
      {
        day: 5,
        theme: "기술 영어",
        action: primaryPatterns.find(pattern => pattern.domain === "English")?.nextAction || "고객 보고 영어 10분",
        evidence: primaryPatterns.find(pattern => pattern.domain === "English")?.evidence || "English queue",
        minutes: 20,
        view: "english-test"
      },
      {
        day: 6,
        theme: "장기 기억 정리",
        action: primaryPatterns.find(pattern => /Think Tank|Knowledge|Data OS/.test(pattern.domain))?.nextAction || "기록 1개를 evidence/nextStep으로 닫기",
        evidence: primaryPatterns.find(pattern => /Think Tank|Knowledge|Data OS/.test(pattern.domain))?.evidence || "data hygiene",
        minutes: 25,
        view: "bookshelf"
      },
      {
        day: 7,
        theme: "AI 회고",
        action: "Life Intelligence checkpoint 저장 후 redacted packet으로 회고",
        evidence: "weekly synthesis",
        minutes: 30,
        view: "operating-core"
      }
    ];
    return plan;
  }

  function buildCoachQuestions(patterns, domains, reliability) {
    const lowDomain = domains.slice().sort((a, b) => a.score - b.score)[0];
    const topPattern = patterns[0];
    return [
      {
        mode: "AI mentor",
        question: `내 현재 가장 큰 병목은 ${topPattern?.title || "루틴 안정화"}입니다. 이번 주에 실패 가능성이 가장 낮은 30분 루틴으로 다시 설계해줘.`,
        useWith: "redacted AI packet"
      },
      {
        mode: "CE coach",
        question: "내 CE 케이스 오답/약점만 보고 symptom → risk → subsystem → evidence → stop condition 사고 루틴을 훈련시켜줘.",
        useWith: "FEP/EPI CE packet"
      },
      {
        mode: "Fellow advisor",
        question: `${lowDomain?.label || "Materials MS"} 점수가 낮습니다. EPI Fellow 목표 기준으로 수학/물리/화학/재료공학 선수개념 중 가장 먼저 닫을 것을 골라줘.`,
        useWith: "career growth packet"
      },
      {
        mode: "privacy reviewer",
        question: `AI에게 보여주기 전 ${reliability.schemaAudit.sensitiveHitCount} sensitive hits와 ${reliability.schemaAudit.fileIndexGapCount} file vault gaps를 어떻게 redaction해야 하는지 점검해줘.`,
        useWith: "reliability packet"
      }
    ];
  }

  function buildLifeIntelligence(signals, tasks, integrity, reliability) {
    const domains = buildDomainReadiness(signals, integrity, reliability);
    const patterns = buildPatternMatrix(signals, tasks, integrity, reliability, domains);
    const sevenDayPlan = buildSevenDayPlan(tasks, patterns, domains);
    const coachQuestions = buildCoachQuestions(patterns, domains, reliability);
    const riskLoad = patterns.reduce((sum, pattern) => sum + severityRank(pattern.severity), 0);
    const averageReadiness = domains.reduce((sum, domain) => sum + domain.score, 0) / Math.max(1, domains.length);
    const operatingFocus = patterns[0]?.nextAction || tasks[0]?.title || "오늘 30분 루틴";
    const packet = {
      schemaVersion: LIFE_INTELLIGENCE_VERSION,
      generatedAt: new Date().toISOString(),
      privacyMode: "redacted-summary-only",
      operatingFocus,
      weeklyCompass: {
        headline: riskLoad >= 9 ? "이번 주는 병목 제거 주간" : averageReadiness < 60 ? "기초 readiness를 끌어올릴 주간" : "루틴을 안정적으로 반복할 주간",
        riskLoad,
        averageReadiness: Math.round(averageReadiness),
        strongestDomain: domains.slice().sort((a, b) => b.score - a.score)[0]?.label || "데이터 대기",
        weakestDomain: domains.slice().sort((a, b) => a.score - b.score)[0]?.label || "데이터 대기"
      },
      domainReadiness: domains,
      recurringPatterns: patterns,
      nextSevenDays: sevenDayPlan,
      coachQuestions,
      packetBoundary: {
        safeToShareWithAI: [
          "domain readiness scores",
          "weakness tags",
          "recommended actions",
          "redacted evidence summaries",
          "storage health summaries"
        ],
        reviewBeforeSharing: [
          "health and vision notes",
          "asset and investment notes",
          "customer communication drafts",
          "raw troubleshooting journals"
        ],
        neverShare: SENSITIVE_BLOCKLIST
      }
    };
    packet.integrityHash = hashString(JSON.stringify({
      schemaVersion: packet.schemaVersion,
      generatedAt: packet.generatedAt,
      weeklyCompass: packet.weeklyCompass,
      domains: domains.map(domain => [domain.id, domain.score, domain.evidence]),
      patterns: patterns.map(pattern => [pattern.id, pattern.severity, pattern.evidence]),
      plan: sevenDayPlan.map(day => [day.day, day.action])
    }));
    return packet;
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

    if (signals.fieldDaily?.highRisk || signals.fieldDaily?.openNext || signals.fieldDaily?.missedEvidence?.length) {
      const fieldFocus = signals.fieldDaily.highRisk
        ? `high-risk 현장 기록 ${signals.fieldDaily.highRisk}개 재검토`
        : signals.fieldDaily.openNext
          ? `현장 open-loop ${signals.fieldDaily.openNext}개 닫기`
          : `${signals.fieldDaily.missedEvidence[0].label} evidence 보강`;
      tasks.push({
        lane: "Field CE",
        title: fieldFocus,
        minutes: 14,
        score: 94,
        view: "field-log",
        why: "실제 현장 로그의 risk, evidence, owner, stop condition을 닫는 것이 가장 직접적인 CE 성장 루프입니다.",
        evidence: signals.fieldDaily.weeklySummary
      });
    }

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

  function buildPacket(signals, tasks, score, routine = [], integrity = null, analysis = null, reliabilityOverride = null, lifeOverride = null) {
    const reliability = reliabilityOverride || buildReliabilityPacket(signals, integrity);
    const lifeIntelligence = lifeOverride || buildLifeIntelligence(signals, tasks, integrity || dataIntegrity(signals), reliability);
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
        materialsMs: signals.materialsMs?.weakness || [],
        fieldDaily: {
          highRisk: signals.fieldDaily?.highRisk || 0,
          openNext: signals.fieldDaily?.openNext || 0,
          weakReports: signals.fieldDaily?.weakReports || 0,
          topSubsystems: signals.fieldDaily?.topSubsystems || [],
          issueTypes: signals.fieldDaily?.issueTypes || [],
          missedEvidence: signals.fieldDaily?.missedEvidence || [],
          learningGaps: signals.fieldDaily?.learningGaps || []
        },
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
        fieldDaily: {
          logs: signals.fieldDaily?.logs || 0,
          pending: signals.fieldDaily?.pending || 0,
          openNext: signals.fieldDaily?.openNext || 0,
          highRisk: signals.fieldDaily?.highRisk || 0,
          weeklySummary: signals.fieldDaily?.weeklySummary || "field log 데이터 대기",
          missedEvidence: signals.fieldDaily?.missedEvidence || [],
          learningGaps: signals.fieldDaily?.learningGaps || []
        },
        reliability: {
          integrityHash: reliability.integrityHash,
          schemaAudit: reliability.schemaAudit,
          conflictAudit: reliability.conflictAudit,
          backupStatus: reliability.backupPlan.status,
          recommendedActions: reliability.backupPlan.recommendedActions
        },
        materialsMs: signals.materialsMs,
        remoteStatus: state.remote.error ? "remote-unavailable" : state.remote.ops ? "remote-connected" : "local-only"
      },
      aiAnalysis: analysis,
      lifeIntelligence,
      neverInclude: SENSITIVE_BLOCKLIST,
      storageBoundaries: reliability.backupPlan.lanes,
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
      aiAnalysis: packet.aiAnalysis,
      lifeIntelligence: {
        weeklyCompass: packet.lifeIntelligence.weeklyCompass,
        domainReadiness: packet.lifeIntelligence.domainReadiness.map(domain => [domain.id, domain.score]),
        recurringPatterns: packet.lifeIntelligence.recurringPatterns.map(pattern => [pattern.id, pattern.severity]),
        integrityHash: packet.lifeIntelligence.integrityHash
      }
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
      const [opsResponse, briefingResponse, packetResponse, analysisResponse] = await Promise.all([
        fetch("/api/v4/ops-status", { cache: "no-store" }),
        fetch("/api/v4/coach-briefing", { cache: "no-store" }),
        fetch("/api/v4/ai-packet?type=redacted-life-intelligence", { cache: "no-store" }),
        fetch("/api/v6/ai-analysis?type=redacted-life-intelligence", { cache: "no-store" }).catch(() => null)
      ]);
      if (!opsResponse.ok) throw new Error(`ops ${opsResponse.status}`);
      if (!briefingResponse.ok) throw new Error(`briefing ${briefingResponse.status}`);
      if (!packetResponse.ok) throw new Error(`packet ${packetResponse.status}`);
      state.remote.ops = (await opsResponse.json()).status || null;
      state.remote.briefing = (await briefingResponse.json()).briefing || null;
      state.remote.packet = (await packetResponse.json()).packet || null;
      if (analysisResponse?.ok) state.remote.analysis = (await analysisResponse.json()).analysis || null;
    } catch (error) {
      state.remote.error = error.message || "remote unavailable";
      state.remote.ops = null;
      state.remote.briefing = null;
      state.remote.packet = null;
      state.remote.analysis = null;
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

  function setStatus(selector, text) {
    const status = document.querySelector(selector);
    if (status) status.textContent = text;
  }

  function localStorageSnapshot() {
    const rows = [];
    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index);
      const raw = localStorage.getItem(key) || "";
      let parsed = raw;
      try {
        parsed = JSON.parse(raw);
      } catch {
        parsed = raw;
      }
      rows.push({
        key,
        bytes: byteSize(raw),
        value: parsed
      });
    }
    rows.sort((a, b) => a.key.localeCompare(b.key));
    return rows;
  }

  function createIntegrityCheckpoint() {
    const signals = collectLocalSignals();
    const integrity = dataIntegrity(signals);
    const reliability = buildReliabilityPacket(signals, integrity);
    const ledger = integrityLedger();
    const checkpoint = {
      schemaVersion: "project-universe-integrity-checkpoint-v2",
      createdAt: new Date().toISOString(),
      score: integrity.score,
      status: integrity.status,
      schemaDebt: integrity.schemaDebt,
      pendingSync: integrity.pendingSync,
      evidenceMissing: integrity.evidenceMissing,
      nextStepMissing: integrity.nextStepMissing,
      conflictCandidates: integrity.conflictCandidates,
      fileVaultGaps: integrity.fileVaultGaps,
      sensitiveHitCount: integrity.sensitiveHitCount,
      reliabilityHash: reliability.integrityHash,
      hash: hashString(JSON.stringify({
        pages: signals.pages.map(page => [page.id, page.updatedAt, page.title, page.nextStep, page.evidence, page.privacyLevel, page.exportPolicy]),
        thinkTank: signals.thinkTank.map(entry => [entry.id, entry.updatedAt, entry.symptom, entry.nextStep, entry.evidence, entry.privacyLevel, entry.exportPolicy]),
        storageMb: signals.storage.totalMb,
        reliabilityHash: reliability.integrityHash
      }))
    };
    saveJson(INTEGRITY_LEDGER_KEY, [...ledger.slice(-59), checkpoint]);
    return checkpoint;
  }

  function buildFullLocalBackup(packet, reliability) {
    const snapshot = localStorageSnapshot();
    const backup = {
      schemaVersion: "project-universe-full-local-backup-v2",
      generatedAt: new Date().toISOString(),
      privacyLevel: "private-full-backup-do-not-share",
      exportPolicy: "owner-only-restore",
      warning: "This file may include private health, asset, study, and journal data from this browser. Do not upload it to public AI tools.",
      storageBoundary: {
        d1: "structured records, summaries, indexes, hashes",
        localStorage: "browser fallback and pending queue",
        r2OrDDrive: "large raw files only; D1 stores indexes and summaries"
      },
      reliabilityPacket: reliability,
      operatingPacket: packet,
      localStorage: snapshot
    };
    backup.integrityHash = hashString(JSON.stringify({
      schemaVersion: backup.schemaVersion,
      generatedAt: backup.generatedAt,
      keys: snapshot.map(row => [row.key, row.bytes]),
      reliabilityHash: reliability.integrityHash,
      packetHash: packet.integrityHash
    }));
    return backup;
  }

  function buildRedactedAiPacket(packet, reliability) {
    const redacted = {
      schemaVersion: "project-universe-redacted-ai-packet-v2",
      generatedAt: new Date().toISOString(),
      privacyMode: "redacted-summary-only",
      purpose: "AI-readable growth, learning, work, and reliability summary without raw private records",
      operatingPacket: packet,
      reliabilityPacket: {
        schemaVersion: reliability.schemaVersion,
        generatedAt: reliability.generatedAt,
        privacyLevel: reliability.privacyLevel,
        exportPolicy: reliability.exportPolicy,
        integrity: reliability.integrity,
        schemaAudit: reliability.schemaAudit,
        conflictAudit: reliability.conflictAudit,
        backupPlan: reliability.backupPlan,
        integrityHash: reliability.integrityHash
      },
      intentionallyExcluded: [
        "raw journal text",
        "raw health records",
        "raw asset details",
        "uploaded files",
        "customer confidential data",
        "equipment recipe or manual details",
        "passwords, seed phrases, account numbers, resident IDs"
      ],
      neverInclude: SENSITIVE_BLOCKLIST
    };
    redacted.integrityHash = hashString(JSON.stringify({
      schemaVersion: redacted.schemaVersion,
      generatedAt: redacted.generatedAt,
      operatingHash: packet.integrityHash,
      reliabilityHash: reliability.integrityHash,
      excluded: redacted.intentionallyExcluded
    }));
    return redacted;
  }

  function lifeIntelligenceLedger() {
    const ledger = safeJson(LIFE_INTELLIGENCE_KEY, []);
    return Array.isArray(ledger) ? ledger : [];
  }

  function createLifeIntelligenceCheckpoint(lifeIntelligence) {
    const ledger = lifeIntelligenceLedger();
    const checkpoint = {
      schemaVersion: "project-universe-life-intelligence-checkpoint-v1",
      createdAt: new Date().toISOString(),
      weeklyCompass: lifeIntelligence.weeklyCompass,
      operatingFocus: lifeIntelligence.operatingFocus,
      weakestDomain: lifeIntelligence.weeklyCompass.weakestDomain,
      strongestDomain: lifeIntelligence.weeklyCompass.strongestDomain,
      topPatterns: lifeIntelligence.recurringPatterns.slice(0, 5).map(pattern => ({
        id: pattern.id,
        domain: pattern.domain,
        severity: pattern.severity,
        title: pattern.title,
        evidence: pattern.evidence,
        nextAction: pattern.nextAction
      })),
      nextSevenDays: lifeIntelligence.nextSevenDays,
      sourceHash: lifeIntelligence.integrityHash
    };
    checkpoint.integrityHash = hashString(JSON.stringify(checkpoint));
    saveJson(LIFE_INTELLIGENCE_KEY, [...ledger.slice(-51), checkpoint]);
    return checkpoint;
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

  function renderReliabilityPanel(reliability) {
    const schema = reliability.schemaAudit;
    const conflicts = reliability.conflictAudit;
    const plan = reliability.backupPlan;
    const cards = [
      { label: "Schema debt", value: Object.values(schema.missingByField).reduce((sum, count) => sum + count, 0), detail: "required metadata gaps" },
      { label: "Conflicts", value: conflicts.conflictCandidates, detail: "same id/title with different hash" },
      { label: "Sensitive hits", value: schema.sensitiveHitCount, detail: "review before AI export" },
      { label: "Vault gaps", value: schema.fileIndexGapCount, detail: "file hash/location missing" },
      { label: "Backup size", value: `${plan.localBackupEstimateMb}MB`, detail: "browser local estimate" }
    ];
    const fieldRows = Object.entries(schema.missingByField)
      .map(([field, count]) => `<span class="${count ? "risk" : "ok"}"><b>${escapeHtml(field)}</b>${count}</span>`)
      .join("");
    const sampleRows = [
      ...reliability.samples.schemaDebt.slice(0, 3).map(row => `${row.label}: ${row.missing.join(", ")}`),
      ...reliability.samples.fileGaps.slice(0, 3).map(row => `${row.ownerLabel}: ${row.gaps.join(", ")}`),
      ...reliability.samples.duplicateIds.slice(0, 2).map(row => `${row.id}: ${row.count} records`)
    ].slice(0, 6);
    return `
      <section class="ops-card ops-reliability-card">
        <div class="ops-card-head">
          <div>
            <p class="eyebrow">data reliability command center</p>
            <h2>장기 기억 운영판</h2>
            <p>D1, localStorage, R2/D-drive vault, AI packet의 역할을 분리하고 백업/충돌/민감정보를 매일 점검합니다.</p>
          </div>
          <span class="ops-integrity-state ${escapeHtml(plan.status)}">${escapeHtml(plan.status)}</span>
        </div>
        <div class="ops-reliability-strip">
          ${cards.map(card => `
            <article>
              <span>${escapeHtml(card.label)}</span>
              <strong>${escapeHtml(card.value)}</strong>
              <small>${escapeHtml(card.detail)}</small>
            </article>
          `).join("")}
        </div>
        <div class="ops-reliability-grid">
          <article>
            <strong>Schema migration audit</strong>
            <div class="ops-field-audit">${fieldRows}</div>
            <p>모든 기록은 schemaVersion, privacyLevel, syncStatus, sourceDevice, createdAt, updatedAt, exportPolicy를 가져야 장기 migration과 AI export가 안전합니다.</p>
          </article>
          <article>
            <strong>Storage boundary</strong>
            <div class="ops-storage-lanes">
              ${plan.lanes.map(lane => `
                <span>
                  <b>${escapeHtml(lane.name)}</b>
                  ${escapeHtml(lane.role)}
                  <small>${escapeHtml(lane.boundary)}</small>
                </span>
              `).join("")}
            </div>
          </article>
          <article>
            <strong>Recommended repair queue</strong>
            <div class="ops-repair-list">
              ${plan.recommendedActions.map(action => `
                <span class="${escapeHtml(action.level)}">
                  <b>${escapeHtml(action.title)}</b>
                  ${escapeHtml(action.why)}
                </span>
              `).join("")}
            </div>
          </article>
          <article>
            <strong>Conflict / vault samples</strong>
            <div class="ops-sample-list">
              ${sampleRows.length ? sampleRows.map(row => `<span>${escapeHtml(row)}</span>`).join("") : `<span>현재 표시할 충돌/파일 gap 샘플이 없습니다.</span>`}
            </div>
          </article>
        </div>
        <div class="ops-reliability-actions">
          <button class="primary" type="button" data-reliability-checkpoint>무결성 checkpoint</button>
          <button class="secondary" type="button" data-core-download-backup>전체 백업 JSON</button>
          <button class="secondary" type="button" data-core-download-redacted>민감 제외 AI packet</button>
          <button class="secondary" type="button" data-core-copy-reliability>Reliability packet 복사</button>
          <small class="ops-reliability-status">전체 백업은 나만 보관하세요. AI에는 민감 제외 packet만 넘기는 흐름이 안전합니다.</small>
        </div>
      </section>
    `;
  }

  function renderAiAnalysisPanel(analysis) {
    const remote = state.remote.analysis || null;
    const remoteSummary = remote?.llmAnalysis?.executiveSummary || remote?.executiveSummary || [];
    const remoteThirty = remote?.llmAnalysis?.nextThirtyMinutes || remote?.nextThirtyMinutes || [];
    const llmStatus = remote?.llmStatus || null;
    return `
      <section class="ops-card ops-analysis-card">
        <p class="eyebrow">AI think tank center</p>
        <h2>AI가 읽기 좋은 오늘의 해석</h2>
        <div class="ops-ai-status">
          <span>${remote ? "Worker v6 analysis connected" : "local analysis only"}</span>
          <strong>${escapeHtml(llmStatus?.status || (remote ? remote.mode : "browser-derived"))}</strong>
          <small>${escapeHtml(llmStatus?.configured ? `model ${llmStatus.model || "configured"}` : "OPENAI_API_KEY가 없으면 deterministic 분석으로 유지")}</small>
        </div>
        ${remote ? `
          <div class="ops-remote-analysis">
            <article>
              <strong>서버 분석 요약</strong>
              ${remoteSummary.slice(0, 3).map(item => `<p>${escapeHtml(item)}</p>`).join("")}
            </article>
            <article>
              <strong>서버 추천 30분</strong>
              ${remoteThirty.slice(0, 4).map(item => `<p><b>${escapeHtml(item.minutes || "?")}분</b> ${escapeHtml(item.action || item.title || "")}</p>`).join("")}
            </article>
          </div>
        ` : ""}
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

  function renderLifeIntelligencePanel(lifeIntelligence) {
    const compass = lifeIntelligence.weeklyCompass;
    return `
      <section class="ops-card ops-life-intel-card">
        <div class="ops-card-head">
          <div>
            <p class="eyebrow">life intelligence analysis center</p>
            <h2>${escapeHtml(compass.headline)}</h2>
            <p>오답, CE 케이스, Materials MS, 시기능/인지 루틴, 저장 신뢰성을 하나의 분석 패킷으로 합성합니다.</p>
          </div>
          <div class="ops-intel-score">
            <span>Avg readiness</span>
            <strong>${compass.averageReadiness}</strong>
            <small>risk load ${compass.riskLoad}</small>
          </div>
        </div>
        <div class="ops-intel-summary">
          <article>
            <span>오늘의 운영 초점</span>
            <strong>${escapeHtml(lifeIntelligence.operatingFocus)}</strong>
          </article>
          <article>
            <span>가장 강한 축</span>
            <strong>${escapeHtml(compass.strongestDomain)}</strong>
          </article>
          <article>
            <span>먼저 닫을 병목</span>
            <strong>${escapeHtml(compass.weakestDomain)}</strong>
          </article>
        </div>
        <div class="ops-domain-readiness">
          ${lifeIntelligence.domainReadiness.map(domain => `
            <article>
              <div>
                <span>${escapeHtml(domain.label)}</span>
                <strong>${domain.score}</strong>
              </div>
              <i><em style="width:${domain.score}%"></em></i>
              <p>${escapeHtml(domain.evidence)}</p>
              <button class="secondary" type="button" data-core-view="${escapeHtml(domain.view)}">${escapeHtml(domain.nextAction)}</button>
            </article>
          `).join("")}
        </div>
        <div class="ops-intel-grid">
          <article>
            <strong>반복 패턴 top ${lifeIntelligence.recurringPatterns.length}</strong>
            <div class="ops-pattern-list">
              ${lifeIntelligence.recurringPatterns.map(pattern => `
                <button type="button" data-core-view="${escapeHtml(pattern.view)}" class="${escapeHtml(pattern.severity)}">
                  <span>${escapeHtml(pattern.domain)} · ${escapeHtml(pattern.severity)}</span>
                  <b>${escapeHtml(pattern.title)}</b>
                  <small>${escapeHtml(pattern.evidence)}</small>
                  <em>${escapeHtml(pattern.nextAction)}</em>
                </button>
              `).join("")}
            </div>
          </article>
          <article>
            <strong>다음 7일 action map</strong>
            <div class="ops-seven-day">
              ${lifeIntelligence.nextSevenDays.map(day => `
                <button type="button" data-core-view="${escapeHtml(day.view)}">
                  <span>D${day.day} · ${escapeHtml(day.theme)} · ${day.minutes}m</span>
                  <b>${escapeHtml(day.action)}</b>
                  <small>${escapeHtml(day.evidence)}</small>
                </button>
              `).join("")}
            </div>
          </article>
        </div>
        <div class="ops-coach-grid">
          ${lifeIntelligence.coachQuestions.map(item => `
            <article>
              <span>${escapeHtml(item.mode)}</span>
              <p>${escapeHtml(item.question)}</p>
              <small>${escapeHtml(item.useWith)}</small>
            </article>
          `).join("")}
        </div>
        <div class="ops-intel-boundary">
          <article>
            <strong>AI에게 바로 공유 가능</strong>
            ${lifeIntelligence.packetBoundary.safeToShareWithAI.map(item => `<span>${escapeHtml(item)}</span>`).join("")}
          </article>
          <article>
            <strong>공유 전 검토</strong>
            ${lifeIntelligence.packetBoundary.reviewBeforeSharing.map(item => `<span>${escapeHtml(item)}</span>`).join("")}
          </article>
          <article>
            <strong>절대 제외</strong>
            ${lifeIntelligence.packetBoundary.neverShare.slice(0, 8).map(item => `<span>${escapeHtml(item)}</span>`).join("")}
          </article>
        </div>
        <div class="ops-intel-actions">
          <button class="primary" type="button" data-core-save-analysis>analysis checkpoint</button>
          <button class="secondary" type="button" data-core-copy-analysis>Life Intelligence 복사</button>
          <button class="secondary" type="button" data-core-download-analysis>Life Intelligence JSON</button>
          <small class="ops-intel-status">분석 checkpoint는 개인 장기 패턴을 추적하기 위한 요약만 저장합니다.</small>
        </div>
      </section>
    `;
  }

  function renderFellowBridge(signals, integrity) {
    const mathGap = signals.materialsMs?.attempts ? `${signals.materialsMs.attempts} attempts` : signals.pages.some(page => /math|수학|log|calculus|통계|DOE/i.test(`${page.topic || ""} ${page.title || ""}`)) ? "진행 중" : "진단 필요";
    const epiEvidence = signals.ce.weaknesses.length ? `${signals.ce.weaknesses[0].skill} 약점부터` : "새 CE case 필요";
    return `
      <section class="ops-card ops-fellow-bridge">
        <p class="eyebrow">Fellow route bridge</p>
        <h2>FEP/EPI에서 Fellow까지 이어지는 다음 산</h2>
        <div class="ops-bridge-grid">
          <article>
            <span>Materials MS Academy</span>
            <strong>${escapeHtml(mathGap)}</strong>
            <small>${signals.materialsMs?.due || 0} due reviews · ${signals.materialsMs?.completedLessons || 0} completed lessons</small>
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
    const field = signals.fieldDaily?.learningGaps?.slice(0, 4) || [];
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
            <strong>현장 로그</strong>
            <div>${field.length ? field.map(item => `<span class="ops-chip">${escapeHtml(item.label)} ${item.count}</span>`).join("") : empty}</div>
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
      lifeIntelligence: {
        weeklyCompass: packet.lifeIntelligence?.weeklyCompass,
        operatingFocus: packet.lifeIntelligence?.operatingFocus,
        recurringPatterns: packet.lifeIntelligence?.recurringPatterns?.slice(0, 4),
        nextSevenDays: packet.lifeIntelligence?.nextSevenDays,
        integrityHash: packet.lifeIntelligence?.integrityHash
      },
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
    const reliability = buildReliabilityPacket(signals, integrity);
    const lifeIntelligence = buildLifeIntelligence(signals, tasks, integrity, reliability);
    const packet = buildPacket(signals, tasks, score, routine, integrity, analysis, reliability, lifeIntelligence);
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

        ${renderLifeIntelligencePanel(lifeIntelligence)}

        ${renderReliabilityPanel(reliability)}

        ${renderFellowBridge(signals, integrity)}

        <section class="ops-main-grid compact">
          ${renderWeakness(signals)}
          ${renderPacketPanel(packet)}
        </section>
      </section>
    `;

    bind(packet, reliability, lifeIntelligence);
  }

  function bind(packet, reliability, lifeIntelligence) {
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
      const checkpoint = createIntegrityCheckpoint();
      setStatus(".ops-integrity-status", `checkpoint 저장 완료 · ${checkpoint.hash}`);
      render();
    });
    document.querySelector("[data-reliability-checkpoint]")?.addEventListener("click", () => {
      const checkpoint = createIntegrityCheckpoint();
      setStatus(".ops-reliability-status", `checkpoint 저장 완료 · ${checkpoint.reliabilityHash}`);
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
    document.querySelector("[data-core-copy-reliability]")?.addEventListener("click", () => {
      copyText(JSON.stringify(reliability, null, 2), ".ops-reliability-status");
    });
    document.querySelector("[data-core-download-backup]")?.addEventListener("click", () => {
      downloadJson(`project-universe-full-backup-${todayKey()}.json`, buildFullLocalBackup(packet, reliability));
      setStatus(".ops-reliability-status", "전체 백업 JSON 생성 완료 · 이 파일은 개인 보관용입니다.");
    });
    document.querySelector("[data-core-download-redacted]")?.addEventListener("click", () => {
      downloadJson(`project-universe-redacted-ai-packet-${todayKey()}.json`, buildRedactedAiPacket(packet, reliability));
      setStatus(".ops-reliability-status", "민감 제외 AI packet 생성 완료 · AI에게는 이 버전을 우선 사용하세요.");
    });
    document.querySelector("[data-core-save-analysis]")?.addEventListener("click", () => {
      const checkpoint = createLifeIntelligenceCheckpoint(lifeIntelligence);
      setStatus(".ops-intel-status", `analysis checkpoint 저장 완료 · ${checkpoint.integrityHash}`);
    });
    document.querySelector("[data-core-copy-analysis]")?.addEventListener("click", () => {
      copyText(JSON.stringify(lifeIntelligence, null, 2), ".ops-intel-status");
    });
    document.querySelector("[data-core-download-analysis]")?.addEventListener("click", () => {
      downloadJson(`project-universe-life-intelligence-${todayKey()}.json`, lifeIntelligence);
      setStatus(".ops-intel-status", "Life Intelligence JSON 생성 완료 · AI에게 보여줄 때 민감정보 경계를 다시 확인하세요.");
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
      const reliability = buildReliabilityPacket(signals, integrity);
      const routine = makeDailyRoutine(signals, tasks, integrity);
      const analysis = aiAnalysis(signals, tasks, integrity);
      const lifeIntelligence = buildLifeIntelligence(signals, tasks, integrity, reliability);
      return buildPacket(signals, tasks, readinessScore(signals, tasks, integrity), routine, integrity, analysis, reliability, lifeIntelligence);
    },
    buildReliabilityPacket: () => {
      const signals = collectLocalSignals();
      const integrity = dataIntegrity(signals);
      return buildReliabilityPacket(signals, integrity);
    },
    buildLifeIntelligence: () => {
      const signals = collectLocalSignals();
      const tasks = priorityTasks(signals);
      const integrity = dataIntegrity(signals);
      const reliability = buildReliabilityPacket(signals, integrity);
      return buildLifeIntelligence(signals, tasks, integrity, reliability);
    },
    refreshRemote: loadRemote
  };
})();
