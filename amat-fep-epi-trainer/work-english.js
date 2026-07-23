(() => {
  const ROOT_ID = "work-english-root";
  const STATE_KEY = "projectUniverseWorkEnglishStateV1";
  const ATTEMPTS_KEY = "amkWorkEnglishAttempts";
  const MICRO_ATTEMPTS_KEY = "amkEnglishMicroAttempts";
  const REVIEW_QUEUE_KEY = "amkEnglishSpacedReviewQueue";
  const RECORDS_KEY = "amkEnglishSessionRecords";
  const PENDING_RECORDS_KEY = "amkEnglishPendingRecords";
  const REMOTE_TOKEN_KEY = "epiThinkTankRemoteToken";
  const REMOTE_API = "https://projectuniverse.chang2058.workers.dev";
  const SOURCE_DEVICE_KEY = "projectUniverseSourceDevice";

  const workWordBank = [
    ["confirmed fact", "확인된 사실", "What we confirmed is ___.", "추정과 섞지 말고 내가 직접 본 증거만 말합니다.", "reporting"],
    ["assumption", "추정", "Our current assumption is ___.", "사실처럼 단정하지 않고 assumption이라고 표시합니다.", "reporting"],
    ["evidence", "근거", "The evidence we have so far is ___.", "로그, trend, owner 확인, physical check처럼 남길 수 있는 것을 말합니다.", "reporting"],
    ["symptom", "증상", "The symptom is ___.", "원인이 아니라 보이는 현상부터 말합니다.", "troubleshooting"],
    ["impact", "영향", "The impact is ___.", "safety, schedule, wafer, qualification 중 무엇에 영향인지 말합니다.", "reporting"],
    ["next action", "다음 행동", "The next action is ___.", "보고는 항상 다음 행동과 owner로 끝납니다.", "reporting"],
    ["owner", "담당 주체", "The owner for this item is ___.", "고객, facility, EHS, senior CE, vendor를 구분합니다.", "communication"],
    ["ETA", "예상 시간", "The next update ETA is ___.", "완료 보장보다 다음 업데이트 시간을 주는 것이 안전합니다.", "communication"],
    ["hold", "진행 보류", "We should hold this step until ___ is verified.", "stop보다 부드럽지만 진행하지 않는다는 뜻은 명확합니다.", "safety"],
    ["proceed", "진행하다", "We can proceed after ___ is confirmed.", "조건 없는 proceed는 위험합니다.", "safety"],
    ["release", "해제/인계/사용 승인", "The tool is not ready for release yet.", "release는 고객 사용 가능 상태를 의미할 수 있어 조심합니다.", "handover"],
    ["escalate", "상위로 올리다", "I will escalate this to ___.", "혼자 해결 실패가 아니라 권한/위험을 맞추는 행동입니다.", "communication"],
    ["handover", "인수인계", "For handover, the open items are ___.", "완료/미완료/위험/owner를 분리합니다.", "handover"],
    ["passdown", "교대 전달", "In the passdown, please include ___.", "구두로만 넘기지 말고 open item을 남깁니다.", "handover"],
    ["punch list", "미해결 항목 목록", "There are three open punch-list items.", "작은 항목이라도 release 전 owner가 있어야 합니다.", "install"],
    ["open item", "미완료 항목", "The open item is ___.", "끝나지 않은 일을 흐리게 말하지 않습니다.", "handover"],
    ["closed item", "완료 항목", "This item is closed after ___.", "완료 근거와 시간을 같이 말합니다.", "handover"],
    ["readiness", "준비 상태", "Gas readiness is not fully confirmed.", "ready bit만이 아니라 actual state와 owner witness를 봅니다.", "install"],
    ["interlock", "안전 조건", "The interlock is not satisfied.", "우회 대상이 아니라 원인 확인 대상입니다.", "safety"],
    ["permissive", "동작 허가 조건", "The permissive is missing.", "다음 동작을 막는 조건 신호입니다.", "controls"],
    ["mismatch", "불일치", "There is a mismatch between ___ and ___.", "tool screen, local panel, drawing, actual state 차이를 말합니다.", "troubleshooting"],
    ["intermittent", "간헐적", "The sensor signal is intermittent.", "항상 재현되지 않는 문제라 trend와 timestamp가 중요합니다.", "troubleshooting"],
    ["stable", "안정적", "The pressure is stable now.", "시간 범위 없이 stable이라고 말하지 않습니다.", "troubleshooting"],
    ["unstable", "불안정", "The signal is still unstable.", "원인보다 상태와 영향부터 말합니다.", "troubleshooting"],
    ["fluctuation", "흔들림", "We see fluctuation in the pressure trace.", "단일 값보다 trace 변화로 설명합니다.", "data"],
    ["baseline", "기준 데이터", "We need a baseline before comparison.", "정상 기준 없이 좋다/나쁘다를 판단하지 않습니다.", "data"],
    ["trend", "시간 변화", "The trend shows a gradual delay.", "순간값보다 방향과 반복성을 봅니다.", "data"],
    ["trace", "시간축 데이터", "Please compare the temperature trace.", "pressure, temperature, flow처럼 시간별 변화를 말합니다.", "data"],
    ["deviation", "편차", "The deviation is larger than expected.", "편차가 무엇 기준에서 벗어났는지 말합니다.", "data"],
    ["within spec", "기준 안", "The flow is within spec.", "기준 출처와 측정 조건이 있어야 합니다.", "data"],
    ["out of spec", "기준 밖", "The return flow is out of spec.", "단정 전 측정 신뢰성과 기준을 확인합니다.", "data"],
    ["verify", "확인하다", "We need to verify the signal path.", "증거로 맞는지 확인한다는 뜻입니다.", "action"],
    ["validate", "타당성 확인", "We should validate the result with a baseline wafer.", "결과가 목적에 맞는지 확인합니다.", "action"],
    ["confirm", "확정 확인", "Please confirm the owner and ETA.", "상대에게 최종 확인을 요청할 때 씁니다.", "action"],
    ["isolate", "분리 진단", "We need to isolate the subsystem.", "원인 후보를 줄이는 행동입니다.", "troubleshooting"],
    ["reproduce", "재현하다", "Can we reproduce the alarm?", "재현성은 troubleshooting의 힘입니다.", "troubleshooting"],
    ["compare", "비교하다", "Let's compare PM1 and PM2 data.", "정상/비정상 chamber 비교에 자주 씁니다.", "data"],
    ["monitor", "관찰하다", "We will monitor the pumpdown trend.", "그냥 기다림이 아니라 무엇을 볼지 말해야 합니다.", "action"],
    ["suspect", "의심하다", "We suspect a facility-ready signal issue.", "suspect는 확정이 아니라 후보입니다.", "troubleshooting"],
    ["root cause", "근본 원인", "We do not have root cause yet.", "증거 없이 root cause를 확정하지 않습니다.", "troubleshooting"],
    ["corrective action", "수정 조치", "The corrective action is ___.", "현재 문제를 고치는 조치입니다.", "action"],
    ["preventive action", "재발 방지", "The preventive action is ___.", "다음에 반복되지 않게 하는 조치입니다.", "action"],
    ["downtime", "장비 비가동 시간", "This may extend downtime by ___.", "고객은 원인만큼 일정 영향을 궁금해합니다.", "communication"],
    ["recovery", "복구", "The recovery plan is ___.", "복구는 안전 조건과 evidence가 닫힌 뒤 말합니다.", "action"],
    ["qualification", "성능/조건 검증", "Qualification is on hold.", "고객 승인 기준과 공식 절차가 우선입니다.", "install"],
    ["dry run", "무부하/무웨이퍼 시험", "We completed a dry run without wafer.", "wafer risk 전 동작 확인 단계입니다.", "install"],
    ["first power-on", "첫 전원 투입", "Before first power-on, we need LOTO boundary confirmation.", "전기/안전 owner 확인이 먼저입니다.", "install"],
    ["first gas", "첫 공정가스 투입", "First gas remains on hold.", "gas, exhaust, abatement, detector, owner witness가 필요합니다.", "safety"],
    ["facility owner", "시설 담당자", "We need the facility owner to verify this.", "tool owner와 facility owner를 구분합니다.", "install"],
    ["EHS", "환경·보건·안전", "EHS approval is required before this step.", "안전 관련 owner입니다.", "safety"],
    ["abatement", "유해가스 처리 설비", "The abatement unit is not ready yet.", "first gas 전 downstream safety chain입니다.", "gas"],
    ["exhaust", "배기", "The exhaust actual state must be verified.", "연결되어 보이는 것과 actual flow는 다릅니다.", "gas"],
    ["pumpdown", "진공으로 빼기", "Pumpdown is slower than baseline.", "leak, valve, pump, gauge 후보를 나눕니다.", "vacuum"],
    ["vent", "대기압으로 올리기", "The load lock vent cycle is complete.", "door permissive와 pressure match가 연결됩니다.", "vacuum"],
    ["purge", "불활성가스로 치환", "The purge record is missing.", "세부 sequence는 공식 절차 영역입니다.", "gas"],
    ["leak check", "누설 확인", "We need to repeat the leak check.", "누설 의심과 누설 확정은 다릅니다.", "vacuum"],
    ["torque", "체결 토크", "Please follow the approved torque procedure.", "값은 manual/site 문서 영역입니다.", "mechanical"],
    ["reseat", "다시 꽂다/안착시키다", "The connector was reseated.", "조치 결과를 수동태로 보고할 때 자주 씁니다.", "electrical"],
    ["replace", "교체하다", "The sensor was replaced after approval.", "교체 전후 evidence를 남깁니다.", "maintenance"],
    ["inspect", "점검하다", "We inspected the seal surface.", "무엇을 봤는지까지 말해야 합니다.", "maintenance"],
    ["observe", "관찰하다", "We observed particle increase after PM.", "관찰은 원인 확정이 아닙니다.", "troubleshooting"],
    ["align", "정렬하다", "The robot alignment needs verification.", "승인된 teach/alignment 범위가 우선입니다.", "wafer"],
    ["level", "수평 맞추다", "The tool leveling record is attached.", "설치 geometry의 기초 evidence입니다.", "install"],
    ["dock", "도킹하다", "The FOUP is docked but not mapped.", "docked와 mapped는 다릅니다.", "wafer"],
    ["load port", "FOUP 장착부", "The load port state is not ready.", "carrier, door, map, host 상태가 연결됩니다.", "wafer"],
    ["FOUP", "웨이퍼 운반 캐리어", "The FOUP is seated on load port 1.", "고객 wafer는 임의로 만지지 않습니다.", "wafer"],
    ["slot map", "웨이퍼 위치 지도", "The slot map does not match the host data.", "wrong wafer risk로 이어집니다.", "wafer"],
    ["wafer transfer", "웨이퍼 이송", "Wafer transfer is on hold.", "LL/TM/PM boundary를 알아야 합니다.", "wafer"],
    ["robot", "웨이퍼 이송 로봇", "The robot stopped during handoff.", "어느 handoff에서 멈췄는지 말합니다.", "wafer"],
    ["sensor feedback", "센서 응답", "The sensor feedback is intermittent.", "input, wiring, physical state를 분리합니다.", "controls"],
    ["MFC", "질량유량제어기", "The MFC feedback does not follow command.", "gas delivery 확인의 핵심 단어입니다.", "gas"],
    ["pressure", "압력", "The chamber pressure is not stable.", "단위와 기준을 같이 말합니다.", "vacuum"],
    ["temperature", "온도", "The temperature trace is stable.", "평균값보다 trace와 uniformity가 중요할 수 있습니다.", "thermal"],
    ["flow", "유량", "The return flow is below the expected range.", "sccm, slm, PCW flow 등 context를 붙입니다.", "gas"],
    ["PCW", "공정 냉각수", "PCW return flow is low.", "thermal qualification 전 중요한 utility입니다.", "facility"],
    ["CDA", "청정 건조 공기", "CDA pressure drops during actuation.", "pneumatic valve 동작과 연결됩니다.", "facility"],
    ["N2", "질소", "N2 purge is used before the next step.", "질식 위험과 purge purpose를 같이 이해합니다.", "gas"],
    ["gas cabinet", "가스 캐비닛", "The gas cabinet is ready, but abatement is not.", "source만이 아니라 downstream도 봅니다.", "gas"],
    ["VMB", "밸브 매니폴드 박스", "The VMB status needs owner confirmation.", "구체 valve sequence는 다루지 않습니다.", "gas"],
    ["SDS", "안전보건자료", "Please check the SDS before handling the gas.", "hazard family 확인의 공개 원천입니다.", "safety"],
    ["permit", "작업 허가", "A permit is required before this work.", "site rule이 우선입니다.", "safety"],
    ["LOTO", "잠금표지", "LOTO boundary must be confirmed first.", "전기뿐 아니라 stored energy 전체를 봅니다.", "safety"],
    ["stored energy", "잔류 에너지", "Stored energy must be released before inspection.", "전원 off만으로 끝이 아닙니다.", "safety"],
    ["bypass", "우회", "We should not bypass the interlock.", "이 웹은 bypass 절차를 제공하지 않습니다.", "safety"],
    ["redacted", "민감정보 제거", "The note must be redacted before AI export.", "recipe, serial, 고객 자료는 빼고 구조만 남깁니다.", "security"]
  ].map(([term, ko, sentence, note, skill], index) => ({ id: `w${index + 1}`, term, ko, sentence, note, skill }));

  const workScenarios = [
    ["Gas readiness", "tool screen shows ready, but local abatement status is not witnessed", "unsafe gas introduction", "facility/EHS owner", "verify abatement actual state and detector health", "First gas remains on hold until abatement actual, detector health, and owner witness are confirmed."],
    ["Pumpdown delay", "load lock pumpdown is slower than baseline after seal replacement", "false vacuum readiness", "senior CE", "compare pressure trend, valve state, seal history, and gauge reading", "Pumpdown is delayed compared with baseline, so we are checking valve state, seal history, gauge reading, and pump health before drawing a conclusion."],
    ["Robot handoff", "robot stops during load lock to TM handoff", "wafer handling risk", "tool owner", "hold motion and collect handoff state, WOB, and alarm timestamp", "Wafer transfer is on hold because the robot stopped during handoff. We are collecting WOB status, handoff state, and alarm timestamp."],
    ["Cooling water", "PCW return flow is below expected range before thermal qualification", "temperature drift", "facility water owner", "verify valve position, filter restriction, and return flow", "Thermal qualification is on hold because PCW return flow is below the expected range. We will verify valve position and filter restriction first."],
    ["Electrical safety", "panel boundary is unclear before first power-on", "energized work risk", "authorized electrical owner", "confirm LOTO boundary and stored energy scope", "Before first power-on, we need the approved LOTO boundary and stored-energy scope confirmed by the authorized owner."],
    ["Slot map mismatch", "FOUP slot map does not match host data", "wrong wafer transfer", "automation owner", "compare host carrier data, mapper result, and physical carrier state", "Wafer transfer is on hold because the slot map does not match host data. We will compare mapper result, host carrier data, and physical state."],
    ["MFC response", "MFC feedback does not follow command during flow verification", "incorrect gas delivery", "gas owner", "check upstream pressure, isolation state, command, and actual feedback", "Flow verification is on hold because MFC feedback does not follow command. We are checking upstream pressure and actual feedback with the gas owner."],
    ["Passdown quality", "handover note does not separate completed and open actions", "missed owner or repeated work", "shift lead", "rewrite completed items, open risks, owner, and ETA", "For passdown, completed work and open actions must be separated. I will rewrite the note with owner, risk, and ETA."],
    ["Interlock status", "interlock is intermittent during dry run", "unsafe condition not verified", "senior CE", "identify which condition opens and collect timestamped evidence", "Dry run is on hold because the interlock status is intermittent. We are identifying which condition opens and collecting timestamped evidence."],
    ["Qualification data", "baseline wafer result shifts on one chamber only", "chamber matching risk", "process owner", "compare chamber path, metrology condition, temperature trace, and flow response", "The baseline result shifted on one chamber only, so we will compare chamber path, metrology condition, temperature trace, and flow response."]
  ].map(([area, symptom, risk, owner, action, sample], index) => ({ id: `s${index + 1}`, area, symptom, risk, owner, action, sample }));

  const sentenceFrames = [
    ["현재 상태 보고", "현재 상태는 ___입니다. 확인된 사실은 ___입니다. 다음 행동은 ___입니다.", "Current status is ___. The confirmed fact is ___. The next action is ___.", ["current status", "confirmed fact", "next action"], "reporting"],
    ["작업 보류", "___가 확인될 때까지 이 단계를 보류해야 합니다.", "We should hold this step until ___ is verified.", ["hold", "until", "verified"], "safety"],
    ["과장 없는 원인 후보", "현재 증거는 ___ 가능성을 가리키지만, 아직 root cause는 확정되지 않았습니다.", "The current evidence points to a possible ___, but root cause is not confirmed yet.", ["evidence", "possible", "not confirmed"], "troubleshooting"],
    ["고객 업데이트 시간", "___까지 다음 업데이트를 드리겠습니다.", "I will share the next update by ___.", ["next update", "by"], "communication"],
    ["owner 요청", "이 항목은 ___ 담당자 확인이 필요합니다.", "This item requires confirmation from the ___ owner.", ["requires", "confirmation", "owner"], "communication"],
    ["완료 보고", "___를 완료했고, 결과는 ___입니다.", "We completed ___, and the result is ___.", ["completed", "result"], "handover"],
    ["미완료 항목", "남은 open item은 ___이며, owner는 ___입니다.", "The remaining open item is ___, and the owner is ___.", ["open item", "owner"], "handover"],
    ["위험 설명", "지금 진행하면 ___에 영향을 줄 수 있습니다.", "Proceeding now may affect ___.", ["proceeding", "may affect"], "safety"],
    ["증거 요청", "판단 전에 ___ evidence를 확인해야 합니다.", "Before making a decision, we need to verify ___ evidence.", ["before", "verify", "evidence"], "data"],
    ["정중한 재확인", "제가 이해한 것이 맞다면, ___가 다음 조건입니다.", "If I understand correctly, ___ is the next condition.", ["if I understand correctly", "next condition"], "communication"],
    ["영어로 모를 때", "정확히 이해하기 위해 다시 확인하겠습니다.", "Let me confirm that to make sure I understand it correctly.", ["confirm", "understand", "correctly"], "communication"],
    ["일정 영향", "이 이슈는 qualification 일정에 영향을 줄 수 있습니다.", "This issue may affect the qualification schedule.", ["may affect", "qualification schedule"], "reporting"],
    ["비공개 경계", "구체적인 recipe나 setpoint는 공식 문서를 따라야 합니다.", "Specific recipes or setpoints must follow approved documents.", ["specific", "must follow", "approved documents"], "security"],
    ["재발 방지", "재발 방지는 ___를 표준 passdown에 포함하는 것입니다.", "The preventive action is to include ___ in the standard passdown.", ["preventive action", "include", "passdown"], "handover"],
    ["선임에게 질문", "이 판단에서 제가 놓친 evidence가 있습니까?", "Is there any evidence I am missing in this judgment?", ["evidence", "missing", "judgment"], "communication"]
  ].map(([title, koPrompt, sample, required, skill], index) => ({ id: `f${index + 1}`, title, koPrompt, sample, required, skill }));

  const phraseFrames = [
    ["Status", "Current status is ___.", "상태를 먼저 짧게 고정"],
    ["Fact", "The confirmed fact is ___.", "확인된 사실"],
    ["Assumption", "Our current assumption is ___.", "추정은 추정으로 표시"],
    ["Risk", "The immediate risk is ___.", "즉시 위험"],
    ["Hold", "We should hold this step until ___ is verified.", "조건부 보류"],
    ["Owner", "This needs confirmation from the ___ owner.", "담당자 확인"],
    ["ETA", "I will share the next update by ___.", "다음 업데이트 시간"],
    ["No blame", "At this point, we should focus on evidence rather than blame.", "책임공방 회피"],
    ["Escalation", "I will escalate this because ___ affects safety or schedule.", "상위 보고"],
    ["Handover", "Completed items are ___. Open items are ___.", "인수인계"]
  ];

  const state = loadState();

  function escapeHtml(value = "") {
    return String(value).replace(/[&<>"']/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#039;"
    }[char]));
  }

  function todayKey(date = new Date()) {
    return date.toISOString().slice(0, 10);
  }

  function safeJson(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key) || "") ?? fallback;
    } catch {
      return fallback;
    }
  }

  function loadState() {
    const base = {
      schemaVersion: "work-english-v1",
      activeWord: 0,
      activeSentence: 0,
      activeScenario: 0,
      revealWord: false,
      revealSentence: false,
      lastPracticedDay: "",
      streak: 0,
      savedToday: 0
    };
    try {
      return { ...base, ...(JSON.parse(localStorage.getItem(STATE_KEY) || "{}") || {}) };
    } catch {
      return base;
    }
  }

  function saveState() {
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
  }

  function stableDeviceId() {
    let id = localStorage.getItem(SOURCE_DEVICE_KEY);
    if (!id) {
      id = `device-${Math.random().toString(36).slice(2, 10)}-${Date.now().toString(36)}`;
      localStorage.setItem(SOURCE_DEVICE_KEY, id);
    }
    return id;
  }

  function getAttempts() {
    return safeJson(ATTEMPTS_KEY, []);
  }

  function saveAttempts(attempts) {
    localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(attempts.slice(-1200)));
  }

  function getDueQueue() {
    return safeJson(REVIEW_QUEUE_KEY, []).filter(item => String(item.source || "").includes("work-english") || String(item.type || "").includes("Work English"));
  }

  function getStats() {
    const attempts = getAttempts();
    const today = todayKey();
    const todayAttempts = attempts.filter(item => String(item.createdAt || "").startsWith(today));
    const correct = attempts.filter(item => item.correct).length;
    const weak = {};
    attempts.forEach(item => {
      const skill = item.skillTag || "work-English";
      if (!weak[skill]) weak[skill] = { skill, total: 0, wrong: 0 };
      weak[skill].total += 1;
      if (!item.correct) weak[skill].wrong += 1;
    });
    const issueMap = {};
    attempts.forEach(item => {
      (item.feedbackIssues || []).forEach(issue => {
        const code = issue.code || issue.title || "field-expression";
        issueMap[code] = issueMap[code] || {
          code,
          title: issue.title || code,
          count: 0,
          severity: 0,
          examples: []
        };
        issueMap[code].count += 1;
        issueMap[code].severity += Number(issue.severity || 0);
        if (item.input && issueMap[code].examples.length < 2) issueMap[code].examples.push(item.input);
      });
    });
    const issueWeaknesses = Object.values(issueMap)
      .sort((a, b) => b.count - a.count || b.severity - a.severity)
      .slice(0, 6);
    const compositionAttempts = attempts.filter(item => ["word-to-field-sentence", "sentence", "customer-report"].includes(item.kind));
    const averageCoachScore = compositionAttempts.length
      ? Math.round(compositionAttempts.reduce((sum, item) => sum + Number(item.coachScore ?? (item.correct ? 85 : 45)), 0) / compositionAttempts.length)
      : null;
    return {
      attempts,
      total: attempts.length,
      today: todayAttempts.length,
      accuracy: attempts.length ? Math.round(correct / attempts.length * 100) : 0,
      streak: state.streak || 0,
      weak: Object.values(weak).sort((a, b) => b.wrong - a.wrong || b.total - a.total).slice(0, 4),
      grammarWeaknesses: issueWeaknesses,
      compositionAttempts: compositionAttempts.length,
      averageCoachScore,
      due: getDueQueue().filter(item => new Date(item.dueAt || 0).getTime() <= Date.now()).length
    };
  }

  function advanceDayStreak() {
    const key = todayKey();
    if (state.lastPracticedDay === key) return;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    state.streak = state.lastPracticedDay === todayKey(yesterday) ? Number(state.streak || 0) + 1 : 1;
    state.lastPracticedDay = key;
  }

  function appendEnglishMicroAttempt(attempt) {
    const micro = safeJson(MICRO_ATTEMPTS_KEY, []);
    micro.push({
      id: attempt.id,
      questionId: attempt.sourceId,
      type: `Work English ${attempt.kind}`,
      prompt: attempt.prompt,
      selected: attempt.input || attempt.result || "",
      answer: attempt.sample || attempt.target || "",
      correct: Boolean(attempt.correct),
      skillTag: attempt.skillTag,
      skillNote: attempt.skillNote,
      createdAt: attempt.createdAt,
      source: "work-english"
    });
    localStorage.setItem(MICRO_ATTEMPTS_KEY, JSON.stringify(micro.slice(-800)));
  }

  function scheduleReview(attempt) {
    const queue = safeJson(REVIEW_QUEUE_KEY, []);
    const now = new Date();
    const due = new Date(now);
    due.setDate(due.getDate() + (attempt.correct ? 3 : 1));
    queue.unshift({
      id: `work-review-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
      questionKey: attempt.sourceId || attempt.prompt,
      type: `Work English ${attempt.kind}`,
      prompt: attempt.prompt,
      correctAnswer: attempt.sample || attempt.target || "",
      lastSelected: attempt.input || attempt.result || "",
      lastCorrect: Boolean(attempt.correct),
      skillTag: attempt.skillTag,
      skillNote: attempt.skillNote,
      ease: attempt.correct ? 2.3 : 1.4,
      lapses: attempt.correct ? 0 : 1,
      reviews: 1,
      lastReviewedAt: now.toISOString(),
      dueAt: due.toISOString(),
      nextAction: attempt.correct ? "3일 뒤 같은 업무 문장을 다시 말하기" : "내일 같은 업무 영어 패턴을 3문장 더 만들기",
      source: "work-english"
    });
    localStorage.setItem(REVIEW_QUEUE_KEY, JSON.stringify(queue.slice(0, 700)));
  }

  function logAttempt(attempt, options = {}) {
    advanceDayStreak();
    const full = {
      id: `work-eng-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      schemaVersion: "work-english-attempt-v1",
      source: "work-english",
      sourceDevice: stableDeviceId(),
      privacyLevel: "work-learning",
      exportPolicy: "ai-ok-redacted",
      syncStatus: "local saved",
      ...attempt
    };
    const attempts = getAttempts();
    attempts.push(full);
    saveAttempts(attempts);
    appendEnglishMicroAttempt(full);
    scheduleReview(full);
    state.savedToday = Number(state.savedToday || 0) + 1;
    saveState();
    window.dispatchEvent(new CustomEvent("project-universe-work-english-updated", { detail: full }));
    window.dispatchEvent(new CustomEvent("project-universe-english-updated", { detail: full }));
    if (!options.skipRender) render();
  }

  function scoreText(input, required = []) {
    const normalized = String(input || "").toLowerCase();
    const hits = required.filter(word => normalized.includes(String(word).toLowerCase()));
    return {
      hits,
      missing: required.filter(word => !hits.includes(word)),
      correct: required.length ? hits.length >= Math.min(2, required.length) : normalized.trim().split(/\s+/).length >= 5
    };
  }

  function sentenceCase(text = "") {
    const clean = String(text || "").trim();
    if (!clean) return clean;
    return clean.charAt(0).toUpperCase() + clean.slice(1);
  }

  function ensurePeriod(text = "") {
    const clean = String(text || "").trim();
    if (!clean) return clean;
    return /[.!?]$/.test(clean) ? clean : `${clean}.`;
  }

  function includesTerm(normalized, term = "") {
    const cleanTerm = String(term || "").toLowerCase().trim();
    if (!cleanTerm) return true;
    if (normalized.includes(cleanTerm)) return true;
    return cleanTerm.split(/\s+/).some(part => part.length > 3 && normalized.includes(part));
  }

  function improveCheckVerb(input = "") {
    return String(input || "")
      .replace(/\bcheck\b/gi, "verify")
      .replace(/\bproblem\b/gi, "issue")
      .replace(/\bmaybe\b/gi, "may indicate")
      .replace(/\basap\b/gi, "by the agreed ETA");
  }

  function buildBetterExpression(input, options = {}, issues = []) {
    const normalized = String(input || "").trim();
    const term = options.term || options.keyword || "";
    if (!normalized || normalized.split(/\s+/).filter(Boolean).length < 5) {
      if (options.sample) return options.sample;
      if (term) return `Current status: the ${term} condition is under review. The confirmed fact is not complete yet. The next action is to verify evidence and confirm the owner.`;
    }
    let text = ensurePeriod(sentenceCase(improveCheckVerb(normalized)));
    text = text
      .replace(/\bwe should to\b/gi, "We should")
      .replace(/\bi should to\b/gi, "I should")
      .replace(/\bmust to\b/gi, "must")
      .replace(/\bcan to\b/gi, "can")
      .replace(/\bneed to checked\b/gi, "need to be checked")
      .replace(/\bneed check(ed)?\b/gi, "need to be checked")
      .replace(/\bneed verify\b/gi, "need to be verified")
      .replace(/\bwill be update\b/gi, "will update")
      .replace(/\balarm is occurred\b/gi, "an alarm occurred")
      .replace(/\balarm was occurred\b/gi, "an alarm occurred")
      .replace(/\boccurred alarm\b/gi, "alarm occurred")
      .replace(/\bbecause of\s+(tool|chamber|load lock|module|robot)\s+(is|are|was|were)\b/gi, "because the $1 $2")
      .replace(/\bbecause of\s+(it|there|we|they)\s+(is|are|was|were)\b/gi, "because $1 $2")
      .replace(/\binform to the customer\b/gi, "update the customer")
      .replace(/\binform to customer\b/gi, "update the customer")
      .replace(/\breport to customer\b/gi, "update the customer")
      .replace(/\bexplain customer\b/gi, "explain the issue to the customer")
      .replace(/\bdiscuss about\b/gi, "discuss")
      .replace(/\bexplain about\b/gi, "explain")
      .replace(/\brequest for confirmation\b/gi, "request confirmation")
      .replace(/\bescalate to the issue\b/gi, "escalate the issue to the responsible owner")
      .replace(/\bescalate customer\b/gi, "escalate the issue with the customer and internal owner")
      .replace(/\bI think the root cause is\s+([^.!?]+)([.!?]|$)/gi, "The current evidence suggests $1, but root cause is not confirmed yet$2")
      .replace(/\broot cause is\s+([^.!?]+)([.!?]|$)/gi, "current evidence suggests $1, but root cause is not confirmed yet$2");
    if (issues.some(issue => issue.code === "no-eta") && /\b(update|report|share)\b/i.test(text)) {
      text = text.replace(/[.!?]$/, ". I will share the next update by the agreed ETA.");
    }
    if (issues.some(issue => issue.code === "missing-risk") && /\bhold|stop|delay|alarm|issue|unstable|mismatch\b/i.test(text)) {
      text = text.replace(/[.!?]$/, ". The immediate risk is schedule, safety, or wafer handling impact until evidence is verified.");
    }
    return text;
  }

  function analyzeOperationalEnglish(input, options = {}) {
    const raw = String(input || "").trim();
    const normalized = raw.toLowerCase();
    const words = raw.split(/\s+/).filter(Boolean);
    const required = options.required || [];
    const hits = required.filter(word => includesTerm(normalized, word));
    const missing = required.filter(word => !hits.includes(word));
    const issues = [];
    const strengths = [];
    const addIssue = (code, title, detail, fix, severity = 8) => {
      issues.push({ code, title, detail, fix, severity });
    };

    if (!raw) {
      addIssue("empty", "문장이 비어 있음", "직접 영어 문장을 써야 생산형 기억이 만들어집니다.", "한 문장이라도 status + fact + action 구조로 작성하세요.", 40);
    }
    if (raw && words.length < 8) {
      addIssue("too-short", "업무문장으로는 너무 짧음", "현장 영어는 짧아도 좋지만, 고객/선임이 판단할 근거가 들어가야 합니다.", "Current status, confirmed fact, next action 중 최소 2개를 넣으세요.", 14);
    }
    if (raw && /^[a-z]/.test(raw)) {
      addIssue("capitalization", "문장 첫 글자 대문자", "보고문은 첫 글자를 대문자로 시작하면 훨씬 공식적으로 보입니다.", "첫 단어를 대문자로 시작하세요.", 4);
    }
    if (raw && !/[.!?]$/.test(raw)) {
      addIssue("punctuation", "마침표 누락", "짧은 채팅이어도 완성 문장으로 끝내는 습관이 필요합니다.", "문장 끝에 period(.)를 붙이세요.", 4);
    }
    if (/\bwe should to\b|\bi should to\b|\bmust to\b|\bcan to\b/i.test(raw)) {
      addIssue("modal-base-verb", "조동사 뒤 동사원형 오류", "should, must, can 뒤에는 to 없이 동사원형이 옵니다.", "We should verify / We must hold / We can proceed 처럼 쓰세요.", 16);
    }
    if (/\bneed\s+(check|checked|verify|verified|replace|replaced|confirm|confirmed)\b/i.test(raw)) {
      addIssue("passive-need", "need 뒤 수동태/부정사 구조 오류", "장비 상태를 말할 때 'need checked'보다 'need to be checked'가 자연스럽습니다.", "The MFC needs to be checked / The seal needs to be replaced.", 13);
    }
    if (/\bwill be\s+(update|check|verify|confirm|replace)\b/i.test(raw)) {
      addIssue("future-passive", "will be 뒤 동사 형태 오류", "will be 다음에는 과거분사나 형용사가 와야 합니다. 직접 행동이면 will update처럼 씁니다.", "I will update the customer / The status will be updated by the owner.", 13);
    }
    if (/\b(we|i|they)\s+is\b/i.test(raw) || /\b(it|this|that|tool|chamber)\s+are\b/i.test(raw)) {
      addIssue("subject-verb", "주어-동사 수 일치 오류", "we/they는 are, it/this/tool/chamber는 is를 씁니다.", "We are checking... / The chamber is stable... 구조로 고치세요.", 14);
    }
    if (/\b(yesterday|last shift|last night|after pm|after maintenance|after replacement)\b/i.test(raw) && /\b(is|are)\b/i.test(raw) && !/\bwas|were|has been|have been\b/i.test(raw)) {
      addIssue("tense-sequence", "과거 사건과 현재 상태 시제 구분", "과거에 일어난 일과 현재 상태를 한 문장에 섞을 때는 시간이 흐른 순서가 보여야 합니다.", "After PM, the alarm occurred. Current status is under verification.", 9);
    }
    if (/\bbecause of\s+(we|it|there|tool|chamber|load lock|module|robot|the tool|the chamber)\s+(is|are|was|were)\b/i.test(raw)) {
      addIssue("because-of-clause", "because of 뒤 절 사용 오류", "because of 뒤에는 명사구가 오고, 주어+동사 절은 because를 씁니다.", "because the pressure is unstable 또는 because of pressure instability로 바꾸세요.", 13);
    }
    if (/\balarm (is|was) occurred\b|\boccurred alarm\b/i.test(raw)) {
      addIssue("occur-happen", "occur/happen 자동사 사용 오류", "occur는 수동태처럼 쓰지 않고 'an alarm occurred'처럼 씁니다.", "An MFC alarm occurred during initialization.", 8);
    }
    if (/\binform to\b/i.test(raw)) {
      addIssue("inform-to", "inform to 표현 부자연", "inform은 inform someone of/about something 구조이고, 현장에서는 update가 더 자연스럽습니다.", "I will update the customer / I will inform the owner of the status.", 10);
    }
    if (/\breport to customer\b|\bexplain customer\b|\bupdate to customer\b/i.test(raw)) {
      addIssue("customer-verb-pattern", "customer 앞 동사/전치사 패턴 오류", "update는 update the customer, explain은 explain the issue to the customer가 자연스럽습니다.", "I will update the customer on the current status.", 9);
    }
    if (/\bescalate\b/i.test(raw) && !/\bowner|senior|lead|EHS|customer|approval|support|manager|team\b/i.test(raw)) {
      addIssue("escalation-owner", "escalation 대상/이유 부족", "escalate는 그냥 올린다는 말이 아니라 누구에게, 왜 올리는지까지 필요합니다.", "We should escalate this to the senior CE because gas readiness is not confirmed.", 10);
    }
    if (/\bdiscuss about\b|\bexplain about\b/i.test(raw)) {
      addIssue("about-overuse", "discuss/explain 뒤 about 과다 사용", "discuss는 바로 목적어를 받고, explain은 explain the issue처럼 씁니다.", "discuss the issue / explain the risk로 고치세요.", 9);
    }
    if (/\basap\b/i.test(raw)) {
      addIssue("asap", "ASAP 대신 ETA 필요", "고객 커뮤니케이션에서는 ASAP보다 다음 업데이트 시간이 더 신뢰를 줍니다.", "I will update you by 11:00 또는 by the agreed ETA를 쓰세요.", 10);
    }
    if (/\broot cause is\b/i.test(raw) && !/\bnot confirmed|not yet confirmed|current evidence|suggests|possible\b/i.test(raw)) {
      addIssue("root-cause-overclaim", "Root cause 단정 위험", "증거가 충분하지 않으면 root cause를 단정하면 안 됩니다.", "Current evidence suggests a possible cause, but root cause is not confirmed yet.", 18);
    }
    if (/\bmaybe\b/i.test(raw)) {
      addIssue("maybe-casual", "maybe는 현장 보고에 약함", "maybe는 구어체 느낌이 강하고 근거 수준이 모호합니다.", "may indicate, possible, current assumption is 같은 표현을 쓰세요.", 7);
    }
    if (/\b(assumption|possible|suspect|may indicate|seems)\b/i.test(raw) && !/\bconfirmed fact|evidence|trend|log|alarm|measured|observed|verified\b/i.test(raw)) {
      addIssue("assumption-without-evidence", "가정은 evidence와 분리 필요", "추정 표현은 괜찮지만, 어떤 근거에서 나온 추정인지 분리해야 선임/고객이 판단할 수 있습니다.", "Current assumption is ___. Evidence collected: ___. Evidence still missing: ___.", 12);
    }
    if (/\b(DVM|voltage|continuity|signal|sensor|pressure|flow|temperature|MFC)\b/i.test(raw) && !/\bexpected|actual|measured|trend|within spec|out of range|baseline\b/i.test(raw)) {
      addIssue("expected-actual", "측정값 expected/actual 구분 부족", "현장 보고는 '확인했다'보다 기대값과 실제값을 분리할 때 강해집니다.", "Expected value is ___. Actual measured value is ___. The gap is ___.", 11);
    }
    if (missing.length) {
      addIssue("missing-anchor", "핵심 업무 표현 누락", `이번 카드의 핵심 표현 ${missing.join(", ")} 이/가 문장에 충분히 반영되지 않았습니다.`, "카드 단어를 그대로 한 번 쓰고, status/fact/action 중 하나와 연결하세요.", 12);
    }
    if (!/\b(status|current status|confirmed fact|evidence|risk|next action|owner|eta|hold|verified|confirmed|update)\b/i.test(raw)) {
      addIssue("no-field-structure", "현장 보고 구조 부족", "문법만 맞아도 CE 보고문으로는 약할 수 있습니다.", "status, fact/evidence, risk, next action, owner, ETA 중 최소 2개를 넣으세요.", 12);
    }
    if (/\bhold|stop|delay|alarm|unstable|mismatch|risk\b/i.test(raw) && !/\brisk|safety|wafer|schedule|impact\b/i.test(raw)) {
      addIssue("missing-risk", "위험/영향 설명 부족", "hold나 alarm을 말할 때는 무엇에 영향이 있는지 같이 말해야 합니다.", "The immediate risk is safety, schedule, wafer handling, or qualification impact.", 10);
    }
    if (/\b(update|report|share|customer)\b/i.test(raw) && !/\bby\s+\d|eta|next update|agreed time|end of day\b/i.test(raw)) {
      addIssue("no-eta", "업데이트 시간 부족", "고객에게는 진행 중이라는 말보다 다음 업데이트 시간이 중요합니다.", "I will share the next update by 11:00처럼 ETA를 붙이세요.", 9);
    }

    if (/\b(current status|confirmed fact|next action|owner|eta)\b/i.test(raw)) strengths.push("status/fact/action 구조를 쓰려는 방향이 좋습니다.");
    if (/\bnot confirmed|possible|assumption|current evidence\b/i.test(raw)) strengths.push("추정과 사실을 분리해 말하려는 점이 좋습니다.");
    if (/\bhold|until|verified|confirmed\b/i.test(raw)) strengths.push("진행 조건을 안전하게 묶는 표현이 들어갔습니다.");
    if (/\bby\s+\d|eta|next update\b/i.test(raw)) strengths.push("다음 업데이트 시간을 주려는 습관이 좋습니다.");

    const rawScore = 100 - issues.reduce((sum, issue) => sum + issue.severity, 0) + Math.min(10, hits.length * 4);
    const score = Math.max(0, Math.min(100, Math.round(rawScore)));
    const betterExpression = buildBetterExpression(raw, options, issues);
    return {
      score,
      correct: score >= 75,
      hits,
      missing,
      issues,
      strengths,
      betterExpression,
      summary: issues.length ? `${issues.length}개 개선 포인트` : "업무 보고문으로 바로 쓸 수 있는 수준"
    };
  }

  function renderCoachFeedback(analysis) {
    const level = analysis.score >= 85 ? "실전 사용 가능" : analysis.score >= 70 ? "조금 다듬으면 사용 가능" : "다시 고쳐 말하기 권장";
    return `
      <div class="work-coach-feedback">
        <div class="work-coach-head">
          <span class="work-score-pill">${analysis.score}/100</span>
          <strong>${escapeHtml(level)}</strong>
        </div>
        <div class="work-better-expression">
          <span>Better field expression</span>
          <p>${escapeHtml(analysis.betterExpression)}</p>
        </div>
        ${analysis.strengths.length ? `
          <div class="work-suggestion-list good">
            <strong>좋은 점</strong>
            ${analysis.strengths.map(item => `<p>${escapeHtml(item)}</p>`).join("")}
          </div>
        ` : ""}
        <div class="work-issue-list">
          <strong>문법/표현/현장성 피드백</strong>
          ${analysis.issues.length ? analysis.issues.slice(0, 8).map(issue => `
            <article>
              <b>${escapeHtml(issue.title)}</b>
              <p>${escapeHtml(issue.detail)}</p>
              <small>수정 방향: ${escapeHtml(issue.fix)}</small>
            </article>
          `).join("") : "<p>큰 문법 오류나 현장 보고 구조 문제는 보이지 않습니다.</p>"}
        </div>
      </div>
    `;
  }

  function nextIndex(current, list) {
    return (Number(current || 0) + 1 + Math.floor(Math.random() * Math.max(1, list.length - 1))) % list.length;
  }

  function renderStats() {
    const stats = getStats();
    return `
      <section class="work-english-brief">
        <article><span>오늘 훈련</span><strong>${stats.today}</strong><small>word/sentence/report attempts</small></article>
        <article><span>누적 정확도</span><strong>${stats.accuracy}%</strong><small>${stats.total} attempts</small></article>
        <article><span>연속 루틴</span><strong>${stats.streak}</strong><small>days</small></article>
        <article><span>업무영어 복습</span><strong>${stats.due}</strong><small>due cards</small></article>
      </section>
    `;
  }

  function renderWeaknessDashboard() {
    const stats = getStats();
    const topIssue = stats.grammarWeaknesses[0];
    const drill = topIssue
      ? `오늘은 "${topIssue.title}" 패턴을 status + fact + action 문장으로 3번 고쳐 쓰세요.`
      : "직접 업무문장 3개를 작성하면 문법/표현/현장 보고 습관 약점이 자동으로 보입니다.";
    return `
      <section class="work-english-panel work-weakness-dashboard">
        <div class="work-panel-head">
          <div>
            <p class="eyebrow">Production English Weakness Map</p>
            <h2>내가 직접 쓴 문장에서 반복되는 약점</h2>
            <p>단어 암기가 아니라 실제 CE 보고문 작성 기록을 분석합니다. 문법, 표현, fact/evidence/risk/action 구조가 오늘 루틴과 복습 큐로 연결됩니다.</p>
          </div>
          <div class="work-coach-score">
            <span>Coach score</span>
            <strong>${stats.averageCoachScore ?? "--"}</strong>
            <small>${stats.compositionAttempts} written attempts</small>
          </div>
        </div>
        <div class="work-weakness-grid">
          ${stats.grammarWeaknesses.length ? stats.grammarWeaknesses.map(issue => `
            <article>
              <span>${escapeHtml(issue.code)}</span>
              <strong>${escapeHtml(issue.title)}</strong>
              <p>${issue.count}회 반복 · severity ${Math.round(issue.severity)}</p>
              <small>${escapeHtml(issue.examples[0] || "다음 문장 작성 때 바로 점검")}</small>
            </article>
          `).join("") : `
            <article>
              <span>no-data</span>
              <strong>직접 작성 데이터가 더 필요합니다</strong>
              <p>단어를 보고 문장을 쓰고 채점하면 약점 지도가 자동으로 채워집니다.</p>
            </article>
          `}
        </div>
        <div class="work-next-drill">
          <strong>Next drill</strong>
          <p>${escapeHtml(drill)}</p>
        </div>
      </section>
    `;
  }

  function renderDailyRoutine() {
    const stats = getStats();
    const weak = stats.weak[0]?.skill || "reporting";
    const steps = [
      ["7분", "단어 즉답", `${weak} 계열 단어 12개를 한국어 뜻이 아니라 업무 문장으로 회상`],
      ["8분", "문장 암기", "hold, update, escalation, handover 문장 5개를 직접 타이핑"],
      ["7분", "고객 보고", "오늘 시나리오 1개를 status-fact-risk-action-ETA로 작성"],
      ["5분", "소리 내기", "생성된 문장을 TTS로 듣고 3번 따라 말하기"],
      ["3분", "저장", "틀린 단어와 부족한 문장을 복습 큐로 저장"]
    ];
    return `
      <section class="work-english-routine">
        <div>
          <p class="eyebrow">Daily 30-minute Operating English</p>
          <h2>업무 영어를 잘할 수밖에 없는 오늘 루틴</h2>
          <p>단어를 뜻으로 끝내지 않고, 현장 보고 문장으로 즉시 바꿉니다. 매일 이 화면만 돌면 CE가 자주 쓰는 status, risk, hold, owner, ETA 문장이 자동반사처럼 쌓입니다.</p>
        </div>
        <ol>
          ${steps.map(([time, title, detail]) => `<li><b>${time}</b><strong>${escapeHtml(title)}</strong><span>${escapeHtml(detail)}</span></li>`).join("")}
        </ol>
      </section>
    `;
  }

  function renderWordTrainer() {
    const item = workWordBank[state.activeWord % workWordBank.length];
    return `
      <section class="work-english-panel work-word-panel">
        <div class="work-panel-head">
          <div>
            <p class="eyebrow">Infinite Vocabulary Memory</p>
            <h2>단어를 보면 바로 업무 문장으로 바꾸기</h2>
          </div>
          <button class="secondary" type="button" data-work-next-word>다음 단어</button>
        </div>
        <div class="work-word-card">
          <span>${escapeHtml(item.skill)}</span>
          <strong>${escapeHtml(item.term)}</strong>
          <p>${state.revealWord ? escapeHtml(item.ko) : "먼저 뜻과 현장 사용 상황을 떠올려보세요."}</p>
          ${state.revealWord ? `
            <blockquote>${escapeHtml(item.sentence)}</blockquote>
            <small>${escapeHtml(item.note)}</small>
          ` : ""}
        </div>
        <article class="work-compose-card">
          <span>Word to field sentence</span>
          <strong>${escapeHtml(item.term)} 를 사용해서 실제 업무 보고 문장을 직접 작성하세요.</strong>
          <textarea id="work-word-sentence-input" placeholder="예: The pumpdown trend is slower than baseline, so wafer transfer should remain on hold until the evidence is verified."></textarea>
          <div class="work-compose-hints">
            <code>${escapeHtml(item.term)}</code>
            <code>current status</code>
            <code>confirmed fact</code>
            <code>next action</code>
            <code>owner / ETA</code>
          </div>
          <div id="work-word-sentence-feedback" class="work-feedback"></div>
        </article>
        <div class="work-actions">
          <button class="primary" type="button" data-work-reveal-word>${state.revealWord ? "다시 숨기기" : "정답/문장 보기"}</button>
          <button class="primary ghost" type="button" data-work-check-word-sentence>내 문장 문법/표현 채점</button>
          <button class="secondary" type="button" data-work-word-result="false">다시 봐야 함</button>
          <button class="secondary" type="button" data-work-word-result="true">바로 말할 수 있음</button>
          <button class="secondary" type="button" data-work-speak="${escapeHtml(item.sentence)}">소리 듣기</button>
        </div>
      </section>
    `;
  }

  function renderSentenceTrainer() {
    const item = sentenceFrames[state.activeSentence % sentenceFrames.length];
    return `
      <section class="work-english-panel">
        <div class="work-panel-head">
          <div>
            <p class="eyebrow">Sentence Recall Engine</p>
            <h2>한국어 업무 생각을 영어 보고 문장으로 전환</h2>
          </div>
          <button class="secondary" type="button" data-work-next-sentence>새 문장</button>
        </div>
        <article class="work-sentence-card">
          <span>${escapeHtml(item.title)} · ${escapeHtml(item.skill)}</span>
          <strong>${escapeHtml(item.koPrompt)}</strong>
          <textarea id="work-sentence-input" placeholder="영어로 직접 써보세요. 예: We should hold this step until exhaust readiness is verified."></textarea>
          <div class="work-required">
            ${item.required.map(word => `<code>${escapeHtml(word)}</code>`).join("")}
          </div>
          <div id="work-sentence-feedback" class="work-feedback"></div>
          ${state.revealSentence ? `<blockquote>${escapeHtml(item.sample)}</blockquote>` : ""}
        </article>
        <div class="work-actions">
          <button class="primary" type="button" data-work-check-sentence>즉시 채점/저장</button>
          <button class="secondary" type="button" data-work-reveal-sentence>${state.revealSentence ? "예문 숨기기" : "예문 보기"}</button>
          <button class="secondary" type="button" data-work-speak="${escapeHtml(item.sample)}">예문 듣기</button>
        </div>
      </section>
    `;
  }

  function renderReportBuilder() {
    const scenario = workScenarios[state.activeScenario % workScenarios.length];
    return `
      <section class="work-english-panel work-report-panel">
        <div class="work-panel-head">
          <div>
            <p class="eyebrow">Customer Report Builder</p>
            <h2>고객/선임에게 바로 말할 5문장 보고 만들기</h2>
          </div>
          <button class="secondary" type="button" data-work-next-scenario>새 상황</button>
        </div>
        <div class="work-scenario">
          <span>${escapeHtml(scenario.area)}</span>
          <strong>${escapeHtml(scenario.symptom)}</strong>
          <p>Risk: ${escapeHtml(scenario.risk)} · Owner: ${escapeHtml(scenario.owner)}</p>
        </div>
        <div class="work-report-grid">
          <label>Status<input id="work-report-status" value="${escapeHtml(scenario.area)} is under review." /></label>
          <label>Confirmed Fact<input id="work-report-fact" value="${escapeHtml(scenario.symptom)}." /></label>
          <label>Risk<input id="work-report-risk" value="${escapeHtml(scenario.risk)}." /></label>
          <label>Next Action<input id="work-report-action" value="${escapeHtml(scenario.action)}." /></label>
          <label>ETA<input id="work-report-eta" placeholder="예: I will update you by 11:00." /></label>
        </div>
        <div class="work-report-output" id="work-report-output">
          <strong>Model answer</strong>
          <p>${escapeHtml(scenario.sample)}</p>
        </div>
        <div id="work-report-feedback" class="work-feedback"></div>
        <div class="work-actions">
          <button class="primary" type="button" data-work-build-report>보고문 생성/저장</button>
          <button class="secondary" type="button" data-work-speak="${escapeHtml(scenario.sample)}">모범문 듣기</button>
          <button class="secondary" type="button" data-work-copy-report>보고문 복사</button>
          <span id="work-copy-status" class="copy-status"></span>
        </div>
      </section>
    `;
  }

  function topCount(rows = [], mapper = item => item) {
    const counts = {};
    rows.forEach(row => {
      const raw = mapper(row);
      (Array.isArray(raw) ? raw : [raw]).filter(Boolean).forEach(value => {
        counts[value] = (counts[value] || 0) + 1;
      });
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([label, count]) => ({ label, count }));
  }

  function renderCeEnglishBridge() {
    const trainer = safeJson("ceTrainerState", {});
    const fieldLogs = safeJson("projectUniverseFieldDailyLogsV1", []);
    const ceWeak = Object.entries({
      ...(trainer.fepBigBangWeaknesses || {}),
      ...(trainer.epiMentalWeakness || {}),
      ...(trainer.ceCampaignWeakness || {}),
      ...(trainer.ceCaseWeaknesses || {})
    }).map(([label, count]) => ({ label, count: Number(count || 0) }))
      .filter(item => item.count > 0)
      .sort((a, b) => b.count - a.count)[0];
    const fieldRows = Array.isArray(fieldLogs) ? fieldLogs.map(log => log.fieldLog || log) : [];
    const missedEvidence = topCount(fieldRows, row => row.evidenceMissing || [])[0];
    const openNext = fieldRows.filter(row => !String(row.nextAction || row.nextStep || "").trim()).length;
    const reportTarget = ceWeak?.label || missedEvidence?.label || "pumpdown / gas readiness / wafer transfer evidence";
    return `
      <section class="work-english-panel work-ce-bridge">
        <div class="work-panel-head">
          <div>
            <p class="eyebrow">CE Case → English Report Bridge</p>
            <h2>CE 판단을 고객 보고 영어로 바꾸는 연결 훈련</h2>
            <p>케이스 게임, 팹 적응, 현장 데일리 로그에서 나온 약점을 바로 영어 보고문으로 바꿉니다. 증상보다 먼저 fact/evidence/risk/owner/ETA를 분리하세요.</p>
          </div>
        </div>
        <div class="work-bridge-grid">
          <article>
            <span>CE weakness</span>
            <strong>${escapeHtml(ceWeak?.label || "새 CE case를 풀어 약점 데이터 생성")}</strong>
            <p>${ceWeak ? `${ceWeak.count} repeated signal(s)` : "아직 누적 CE 약점이 적습니다."}</p>
            <button class="secondary" type="button" data-work-open-view="diagnostics">CE case 열기</button>
          </article>
          <article>
            <span>Field log gap</span>
            <strong>${escapeHtml(missedEvidence?.label || "현장 로그 evidence gap 대기")}</strong>
            <p>${missedEvidence ? `${missedEvidence.count} repeated gap(s)` : `${openNext} open next-action item(s)`}</p>
            <button class="secondary" type="button" data-work-open-view="field-log">현장 데일리 열기</button>
          </article>
          <article>
            <span>Write this now</span>
            <strong>Status + fact + risk + action + ETA</strong>
            <p>Prompt: ${escapeHtml(reportTarget)}</p>
            <small>Example start: Current status is ___. The confirmed fact is ___. The immediate risk is ___. The next action is ___. I will update you by ___.</small>
          </article>
        </div>
      </section>
    `;
  }

  function renderPhraseWall() {
    return `
      <section class="work-english-panel">
        <div class="work-panel-head">
          <div>
            <p class="eyebrow">English-only Work Environment</p>
            <h2>현장 기록을 영어로 시작하게 만드는 필수 프레임</h2>
          </div>
        </div>
        <div class="work-phrase-grid">
          ${phraseFrames.map(([title, phrase, note]) => `
            <article>
              <span>${escapeHtml(title)}</span>
              <strong>${escapeHtml(phrase)}</strong>
              <small>${escapeHtml(note)}</small>
              <button class="secondary" type="button" data-work-copy="${escapeHtml(phrase)}">복사</button>
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }

  function renderReviewPanel() {
    const due = getDueQueue().sort((a, b) => String(a.dueAt || "").localeCompare(String(b.dueAt || ""))).slice(0, 8);
    const attempts = getAttempts().slice(-8).reverse();
    return `
      <section class="work-english-panel">
        <div class="work-panel-head">
          <div>
            <p class="eyebrow">Memory Queue</p>
            <h2>틀린 문장은 내일 다시 나오게 저장됩니다</h2>
          </div>
          <button class="secondary" type="button" data-work-save-session>오늘 세션 DB 저장 시도</button>
        </div>
        <div class="work-review-grid">
          <article>
            <strong>복습 대기</strong>
            ${due.map(item => `<p><b>${escapeHtml(item.skillTag)}</b> ${escapeHtml(item.prompt || "")}</p>`).join("") || "<p>아직 업무영어 복습 큐가 없습니다.</p>"}
          </article>
          <article>
            <strong>최근 시도</strong>
            ${attempts.map(item => `<p><b>${item.correct ? "PASS" : "AGAIN"}</b> ${escapeHtml(item.prompt || item.term || "")}</p>`).join("") || "<p>단어 또는 문장을 하나 저장하면 여기에 쌓입니다.</p>"}
          </article>
        </div>
        <p id="work-sync-status" class="work-sync-status">저장은 localStorage에 즉시 반영됩니다. 세션 저장 버튼은 가능한 경우 D1에도 요약을 보냅니다.</p>
      </section>
    `;
  }

  function renderWordSearch() {
    return `
      <section class="work-english-panel">
        <div class="work-panel-head">
          <div>
            <p class="eyebrow">Field Word Atlas</p>
            <h2>업무 단어 전체 검색</h2>
          </div>
        </div>
        <input id="work-word-search" class="work-word-search" type="search" placeholder="검색: hold, owner, pumpdown, 고객 보고..." />
        <div id="work-word-search-results" class="work-word-search-results"></div>
      </section>
    `;
  }

  function renderSearchResults() {
    const root = document.getElementById(ROOT_ID);
    const box = root?.querySelector("#work-word-search-results");
    if (!box) return;
    const query = (root.querySelector("#work-word-search")?.value || "").trim().toLowerCase();
    const rows = workWordBank.filter(item => !query || `${item.term} ${item.ko} ${item.sentence} ${item.note} ${item.skill}`.toLowerCase().includes(query)).slice(0, 24);
    box.innerHTML = rows.map(item => `
      <article>
        <span>${escapeHtml(item.skill)}</span>
        <strong>${escapeHtml(item.term)} · ${escapeHtml(item.ko)}</strong>
        <p>${escapeHtml(item.sentence)}</p>
        <small>${escapeHtml(item.note)}</small>
      </article>
    `).join("");
  }

  function speak(text) {
    if (!("speechSynthesis" in window)) return;
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(String(text || ""));
    utterance.lang = "en-US";
    utterance.rate = 0.86;
    utterance.pitch = 1;
    speechSynthesis.speak(utterance);
  }

  function buildReportText() {
    const pick = id => document.getElementById(id)?.value.trim() || "";
    const lines = [
      `Current status: ${pick("work-report-status")}`,
      `Confirmed fact: ${pick("work-report-fact")}`,
      `Immediate risk: ${pick("work-report-risk")}`,
      `Next action: ${pick("work-report-action")}`,
      pick("work-report-eta") || "I will share the next update after owner confirmation."
    ].filter(Boolean);
    return lines.join(" ");
  }

  function remoteBase() {
    if (location.hostname.endsWith(".workers.dev")) return location.origin;
    if (["127.0.0.1", "localhost", "::1"].includes(location.hostname) && location.port) return location.origin;
    return REMOTE_API;
  }

  async function apiFetch(path, options = {}) {
    const token = sessionStorage.getItem(REMOTE_TOKEN_KEY) || "";
    const response = await fetch(`${remoteBase()}${path}`, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {})
      }
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  }

  function getEnglishRecords() {
    return safeJson(RECORDS_KEY, []);
  }

  function saveEnglishRecords(records) {
    const byId = new Map(records.filter(Boolean).map(record => [record.id, record]));
    localStorage.setItem(RECORDS_KEY, JSON.stringify([...byId.values()].slice(0, 300)));
  }

  function queueRecord(record) {
    const pending = safeJson(PENDING_RECORDS_KEY, []);
    const byId = new Map(pending.map(item => [item.id, item]));
    byId.set(record.id, record);
    localStorage.setItem(PENDING_RECORDS_KEY, JSON.stringify([...byId.values()].slice(0, 100)));
  }

  async function saveSessionRecord() {
    const today = todayKey();
    const results = getAttempts().filter(item => String(item.createdAt || "").startsWith(today));
    const record = {
      id: `work-english-session-${today}-${Date.now()}`,
      type: "Work English Practice",
      source: "work-english",
      createdAt: new Date().toISOString(),
      createdAtLabel: new Date().toLocaleString("ko-KR"),
      total: results.length,
      score: results.filter(item => item.correct).length,
      results: results.slice(-80),
      summary: "업무영어 단어, 문장, 고객 보고, hold/escalation/passdown 훈련 세션",
      privacyLevel: "work-learning",
      exportPolicy: "ai-ok-redacted"
    };
    saveEnglishRecords([record, ...getEnglishRecords()]);
    const status = document.getElementById("work-sync-status");
    if (status) status.textContent = `로컬 저장 완료: ${record.total}개 업무영어 시도 요약. D1 전송을 확인 중입니다.`;
    try {
      if (location.protocol.startsWith("http")) {
        await apiFetch("/api/entries", { method: "POST", body: JSON.stringify(record) });
        if (status) status.textContent = `D1 저장 완료: ${record.total}개 업무영어 시도 요약`;
      }
    } catch {
      queueRecord(record);
      if (status) status.textContent = "D1 저장 대기: 로컬에는 저장됐고 다음 동기화 때 재시도합니다.";
    }
  }

  function bind(root) {
    root.querySelector("[data-work-next-word]")?.addEventListener("click", () => {
      state.activeWord = nextIndex(state.activeWord, workWordBank);
      state.revealWord = false;
      saveState();
      render();
    });
    root.querySelector("[data-work-reveal-word]")?.addEventListener("click", () => {
      state.revealWord = !state.revealWord;
      saveState();
      render();
    });
    root.querySelectorAll("[data-work-word-result]").forEach(button => {
      button.addEventListener("click", () => {
        const item = workWordBank[state.activeWord % workWordBank.length];
        const correct = button.dataset.workWordResult === "true";
        logAttempt({
          kind: "vocabulary",
          sourceId: item.id,
          prompt: item.term,
          target: item.ko,
          sample: item.sentence,
          correct,
          skillTag: `work-vocab-${item.skill}`,
          skillNote: item.note
        });
      });
    });
    root.querySelector("[data-work-check-word-sentence]")?.addEventListener("click", () => {
      const item = workWordBank[state.activeWord % workWordBank.length];
      const input = root.querySelector("#work-word-sentence-input")?.value || "";
      const analysis = analyzeOperationalEnglish(input, {
        required: [item.term],
        term: item.term,
        keyword: item.term,
        sample: item.sentence
      });
      const feedback = root.querySelector("#work-word-sentence-feedback");
      if (feedback) {
        feedback.className = `work-feedback ${analysis.correct ? "good" : "bad"}`;
        feedback.innerHTML = renderCoachFeedback(analysis);
      }
      logAttempt({
        kind: "word-to-field-sentence",
        sourceId: item.id,
        prompt: `Use "${item.term}" in a CE work sentence.`,
        input,
        sample: analysis.betterExpression,
        correct: analysis.correct,
        coachScore: analysis.score,
        feedbackIssues: analysis.issues.map(issue => ({
          code: issue.code,
          title: issue.title,
          severity: issue.severity
        })),
        betterExpression: analysis.betterExpression,
        skillTag: `work-compose-${item.skill}`,
        skillNote: analysis.summary
      }, { skipRender: true });
    });
    root.querySelector("[data-work-next-sentence]")?.addEventListener("click", () => {
      state.activeSentence = nextIndex(state.activeSentence, sentenceFrames);
      state.revealSentence = false;
      saveState();
      render();
    });
    root.querySelector("[data-work-reveal-sentence]")?.addEventListener("click", () => {
      state.revealSentence = !state.revealSentence;
      saveState();
      render();
    });
    root.querySelector("[data-work-check-sentence]")?.addEventListener("click", () => {
      const item = sentenceFrames[state.activeSentence % sentenceFrames.length];
      const input = root.querySelector("#work-sentence-input")?.value || "";
      const analysis = analyzeOperationalEnglish(input, {
        required: item.required,
        sample: item.sample,
        term: item.required[0] || ""
      });
      const feedback = root.querySelector("#work-sentence-feedback");
      if (feedback) {
        feedback.className = `work-feedback ${analysis.correct ? "good" : "bad"}`;
        feedback.innerHTML = renderCoachFeedback(analysis);
      }
      logAttempt({
        kind: "sentence",
        sourceId: item.id,
        prompt: item.koPrompt,
        input,
        sample: analysis.betterExpression || item.sample,
        correct: analysis.correct,
        coachScore: analysis.score,
        feedbackIssues: analysis.issues.map(issue => ({
          code: issue.code,
          title: issue.title,
          severity: issue.severity
        })),
        betterExpression: analysis.betterExpression,
        skillTag: `work-sentence-${item.skill}`,
        skillNote: analysis.summary
      }, { skipRender: true });
    });
    root.querySelector("[data-work-next-scenario]")?.addEventListener("click", () => {
      state.activeScenario = nextIndex(state.activeScenario, workScenarios);
      saveState();
      render();
    });
    root.querySelector("[data-work-build-report]")?.addEventListener("click", () => {
      const scenario = workScenarios[state.activeScenario % workScenarios.length];
      const text = buildReportText();
      const output = root.querySelector("#work-report-output");
      if (output) {
        output.innerHTML = `<strong>Your field update</strong><p>${escapeHtml(text)}</p><small>Model: ${escapeHtml(scenario.sample)}</small>`;
      }
      const analysis = analyzeOperationalEnglish(text, {
        required: ["Current status", "Confirmed fact", "risk", "Next action"],
        sample: scenario.sample,
        term: scenario.area
      });
      const feedback = root.querySelector("#work-report-feedback");
      if (feedback) {
        feedback.className = `work-feedback ${analysis.correct ? "good" : "bad"}`;
        feedback.innerHTML = renderCoachFeedback(analysis);
      }
      logAttempt({
        kind: "customer-report",
        sourceId: scenario.id,
        prompt: scenario.symptom,
        input: text,
        sample: analysis.betterExpression || scenario.sample,
        correct: analysis.correct,
        coachScore: analysis.score,
        feedbackIssues: analysis.issues.map(issue => ({
          code: issue.code,
          title: issue.title,
          severity: issue.severity
        })),
        betterExpression: analysis.betterExpression,
        skillTag: "work-report-status-risk-action",
        skillNote: analysis.summary
      }, { skipRender: true });
    });
    root.querySelector("[data-work-copy-report]")?.addEventListener("click", async () => {
      const text = root.querySelector("#work-report-output p")?.textContent || buildReportText();
      try {
        await navigator.clipboard.writeText(text);
        const status = root.querySelector("#work-copy-status");
        if (status) status.textContent = "복사 완료";
      } catch {
        const status = root.querySelector("#work-copy-status");
        if (status) status.textContent = "복사 실패";
      }
    });
    root.querySelectorAll("[data-work-speak]").forEach(button => {
      button.addEventListener("click", () => speak(button.dataset.workSpeak));
    });
    root.querySelectorAll("[data-work-open-view]").forEach(button => {
      button.addEventListener("click", () => {
        if (window.showView) window.showView(button.dataset.workOpenView);
      });
    });
    root.querySelectorAll("[data-work-copy]").forEach(button => {
      button.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(button.dataset.workCopy || "");
          button.textContent = "복사됨";
        } catch {
          button.textContent = "복사 실패";
        }
      });
    });
    root.querySelector("#work-word-search")?.addEventListener("input", renderSearchResults);
    root.querySelector("[data-work-save-session]")?.addEventListener("click", saveSessionRecord);
    renderSearchResults();
  }

  function render() {
    const root = document.getElementById(ROOT_ID);
    if (!root) return;
    root.innerHTML = `
      <section class="work-english-hero">
        <div>
          <p class="eyebrow">Operational English Immersion</p>
          <h2>업무 영어가 자동으로 나오는 무한 훈련장</h2>
          <p>CE 현장에서 실제로 필요한 영어를 우선합니다. 단어는 뜻으로 외우지 않고 고객 보고, 선임 질문, hold/escalation, passdown 문장으로 바로 바꿉니다.</p>
        </div>
        <div class="work-english-command">
          <strong>오늘의 원칙</strong>
          <span>Fact before guess</span>
          <span>Risk before speed</span>
          <span>Owner before action</span>
          <span>ETA before silence</span>
        </div>
      </section>
      ${renderStats()}
      ${renderWeaknessDashboard()}
      ${renderDailyRoutine()}
      <section class="work-english-grid">
        ${renderWordTrainer()}
        ${renderSentenceTrainer()}
      </section>
      ${renderReportBuilder()}
      ${renderCeEnglishBridge()}
      ${renderPhraseWall()}
      ${renderReviewPanel()}
      ${renderWordSearch()}
    `;
    bind(root);
  }

  window.ProjectUniverseWorkEnglish = {
    render,
    getStats,
    getAttempts
  };

  document.addEventListener("DOMContentLoaded", render);
  window.addEventListener("project-universe-unlocked", render);
})();
