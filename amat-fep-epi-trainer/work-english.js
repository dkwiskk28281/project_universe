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
    return {
      attempts,
      total: attempts.length,
      today: todayAttempts.length,
      accuracy: attempts.length ? Math.round(correct / attempts.length * 100) : 0,
      streak: state.streak || 0,
      weak: Object.values(weak).sort((a, b) => b.wrong - a.wrong || b.total - a.total).slice(0, 4),
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
      schemaVersion: "work-english-attempt-v1",
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
        <div class="work-actions">
          <button class="primary" type="button" data-work-reveal-word>${state.revealWord ? "다시 숨기기" : "정답/문장 보기"}</button>
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
        <div class="work-actions">
          <button class="primary" type="button" data-work-build-report>보고문 생성/저장</button>
          <button class="secondary" type="button" data-work-speak="${escapeHtml(scenario.sample)}">모범문 듣기</button>
          <button class="secondary" type="button" data-work-copy-report>보고문 복사</button>
          <span id="work-copy-status" class="copy-status"></span>
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
      const score = scoreText(input, item.required);
      const feedback = root.querySelector("#work-sentence-feedback");
      if (feedback) {
        feedback.className = `work-feedback ${score.correct ? "good" : "bad"}`;
        feedback.innerHTML = `
          <strong>${score.correct ? "좋습니다. 업무 문장 핵심이 들어갔습니다." : "아직 핵심 업무 단어가 부족합니다."}</strong>
          <p>들어간 핵심: ${score.hits.map(escapeHtml).join(", ") || "없음"} · 빠진 핵심: ${score.missing.map(escapeHtml).join(", ") || "없음"}</p>
          <small>모범: ${escapeHtml(item.sample)}</small>
        `;
      }
      logAttempt({
        kind: "sentence",
        sourceId: item.id,
        prompt: item.koPrompt,
        input,
        sample: item.sample,
        correct: score.correct,
        skillTag: `work-sentence-${item.skill}`,
        skillNote: `Required anchors: ${item.required.join(", ")}`
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
      const score = scoreText(text, ["Current status", "Confirmed fact", "risk", "Next action"]);
      logAttempt({
        kind: "customer-report",
        sourceId: scenario.id,
        prompt: scenario.symptom,
        input: text,
        sample: scenario.sample,
        correct: score.correct,
        skillTag: "work-report-status-risk-action",
        skillNote: "status, confirmed fact, risk, next action, ETA 구조"
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
      ${renderDailyRoutine()}
      <section class="work-english-grid">
        ${renderWordTrainer()}
        ${renderSentenceTrainer()}
      </section>
      ${renderReportBuilder()}
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
