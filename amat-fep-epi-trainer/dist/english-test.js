const amkEnglishSources = [
  {
    title: "Applied Korea official FAQ",
    fact: "온라인 CBT 방식, 약 1시간, 문법·말하기·독해·듣기 평가",
    url: "https://www.appliedmaterials.com/kr/ko/careers.html"
  },
  {
    title: "Applied Korea 채용설명회",
    fact: "영어 문법, 독해, 말하기, 듣기 항목이 있는 온라인 CBT로 설명",
    url: "https://www.jobkorea.co.kr/starter/jobfair/view?GI_Prtn_No=11951"
  },
  {
    title: "Comento AMK 후기",
    fact: "인터넷 링크로 listening, grammar, reading, 짧은 speaking을 본다는 후기",
    url: "https://comento.kr/job-questions/%EC%96%B4%ED%94%8C%EB%9D%BC%EC%9D%B4%EB%93%9C%EB%A8%B8%ED%8B%B0%EC%96%B4%EB%A6%AC%EC%96%BC%EC%A6%88/cs/%EC%96%B4%ED%94%8C%EB%9D%BC%EC%9D%B4%EB%93%9C_%EB%A8%B8%ED%8B%B0%EC%96%B4%EB%A6%AC%EC%96%BC%EC%A6%88_%EC%98%81%EC%96%B4%ED%85%8C%EC%8A%A4%ED%8A%B8-287270"
  },
  {
    title: "Blind AMK 영어시험 후기",
    fact: "토익처럼 풀고 오픽/토익스피킹처럼 답하는 느낌, 카메라 불필요라는 후기",
    url: "https://www.teamblind.com/kr/post/%EC%96%B4%ED%94%8C%EB%9D%BC%EC%9D%B4%EB%93%9C-%EB%A8%B8%ED%8B%B0%EC%96%B4%EB%A6%AC%EC%96%BC%EC%A6%88-%EC%98%81%EC%96%B4%EC%8B%9C%ED%97%98-%EA%B6%81%EA%B8%88%ED%95%A9%EB%8B%88%EB%8B%A4-pnGHyCZz"
  },
  {
    title: "JobKorea 면접 질문",
    fact: "인턴 때 했던 업무를 영어로 말해보라는 면접 질문 사례",
    url: "https://www.jobkorea.co.kr/starter/review/view?c_idx=3983&ctgr_code=5"
  }
];

const amkGrammarBank = [
  {
    stem: "If the facility exhaust ___ ready, we must hold the gas qualification.",
    options: ["is not", "was not", "will not", "has not"],
    answer: 0,
    explain: "현재 조건을 말하는 if절입니다. 실제 현장 보고에서는 'If A is not ready, we must hold B' 패턴이 안전합니다."
  },
  {
    stem: "The chamber has been under vacuum ___ 30 minutes.",
    options: ["since", "for", "during", "while"],
    answer: 1,
    explain: "기간에는 for를 씁니다. since는 시작 시점과 함께 씁니다."
  },
  {
    stem: "The customer asked us ___ the pumpdown trend before moving to the next step.",
    options: ["review", "reviewing", "to review", "reviewed"],
    answer: 2,
    explain: "ask someone to do 구조입니다."
  },
  {
    stem: "Neither the gas cabinet nor the abatement unit ___ ready.",
    options: ["are", "were", "is", "have been"],
    answer: 2,
    explain: "neither A nor B는 가까운 주어 B에 동사를 맞춥니다. unit은 단수라 is가 자연스럽습니다."
  },
  {
    stem: "Before we opened the panel, the power ___ locked out by the authorized owner.",
    options: ["has", "had been", "is", "will be"],
    answer: 1,
    explain: "과거의 한 시점보다 먼저 완료된 수동태라 had been이 맞습니다."
  },
  {
    stem: "The issue was resolved after the loose connector ___.",
    options: ["was reseated", "reseating", "has reseat", "will reseat"],
    answer: 0,
    explain: "connector가 다시 꽂힌 것이므로 수동태 was reseated가 맞습니다."
  },
  {
    stem: "Please let me know ___ you need the updated punch list.",
    options: ["what", "when", "who", "whose"],
    answer: 1,
    explain: "필요한 시점을 묻는 간접의문문입니다."
  },
  {
    stem: "We cannot proceed ___ the leak check is complete.",
    options: ["unless", "because", "although", "despite"],
    answer: 0,
    explain: "unless는 '~하지 않는 한'입니다. leak check 완료 전 진행 불가라는 뜻입니다."
  }
];

const amkVocabBank = [
  {
    stem: "Which word is closest to 'escalate' in a field service report?",
    options: ["hide the issue", "raise the issue to a higher owner", "finish the task", "delete the alarm"],
    answer: 1,
    explain: "escalate는 권한자/상위 지원으로 이슈를 올린다는 뜻입니다."
  },
  {
    stem: "What does 'ETA' usually mean in customer communication?",
    options: ["Estimated Time of Arrival or action", "Emergency Tool Alarm", "Electrical Test Area", "Engineering Training Audit"],
    answer: 0,
    explain: "현장 보고에서는 도착/완료 예상 시간 또는 다음 업데이트 시간을 말할 때 씁니다."
  },
  {
    stem: "In installation, 'as-built' most likely means:",
    options: ["the original design only", "the actual installed condition", "a training document", "a spare parts list"],
    answer: 1,
    explain: "as-built는 실제 설치 상태를 반영한 도면/기록입니다."
  },
  {
    stem: "Which phrase best matches 'hold the qualification'?",
    options: ["continue production", "pause the qualification until a condition is verified", "skip the safety check", "approve the final result"],
    answer: 1,
    explain: "hold는 멈추고 조건 확인 후 재개한다는 뉘앙스입니다."
  },
  {
    stem: "A 'baseline' is:",
    options: ["a normal reference data set", "a random alarm", "a customer complaint", "a hidden recipe"],
    answer: 0,
    explain: "baseline은 정상 기준 데이터입니다. troubleshooting의 기준점입니다."
  },
  {
    stem: "Which expression is most professional?",
    options: ["Maybe it is broken.", "The current evidence points to a facility-ready signal mismatch.", "I don't know anything.", "It is probably your fault."],
    answer: 1,
    explain: "현장 영어는 추측보다 evidence와 scope를 분리해 말하는 것이 좋습니다."
  }
];

const amkReadingBank = [
  {
    title: "Customer Update Email",
    passage: "Hi team, the tool move-in was completed at 09:30. The leveling record is attached. However, the exhaust ready signal does not match the local abatement panel. We will hold gas introduction until the facility owner confirms the signal mapping. The next update will be shared at 11:00.",
    question: "Why is gas introduction on hold?",
    options: ["The tool was not moved in.", "The leveling record is missing.", "The ready signal and local panel status do not match.", "The customer canceled the project."],
    answer: 2,
    explain: "문장에 ready signal과 local abatement panel이 맞지 않아 hold한다고 되어 있습니다."
  },
  {
    title: "Shift Handover Note",
    passage: "Completed: load lock pump/vent cycle test and robot dry run without wafer. Open: PM2 slit valve close sensor is intermittent. Do not run wafer transfer to PM2 until the sensor status is verified. Next action: check sensor wiring and pneumatic response with senior CE.",
    question: "What should the next shift avoid?",
    options: ["Checking wiring", "Running wafer transfer to PM2", "Calling senior CE", "Reviewing pneumatic response"],
    answer: 1,
    explain: "Do not run wafer transfer to PM2라고 명확히 적혀 있습니다."
  },
  {
    title: "Tool Readiness Notice",
    passage: "The PCW supply temperature is stable, but the return flow is below the required range. Please verify the valve position and filter restriction before starting thermal qualification. Temperature trace collection should begin only after cooling flow is within specification.",
    question: "When should temperature trace collection begin?",
    options: ["Immediately", "After cooling flow is within specification", "Before checking valve position", "Only after final customer sign-off"],
    answer: 1,
    explain: "cooling flow가 spec 안에 들어온 뒤 temperature trace를 시작하라고 합니다."
  }
];

const amkListeningBank = [
  {
    title: "Facility Call",
    audioText: "The gas cabinet is ready, but the abatement unit is still in maintenance mode. Please do not start the purge sequence until we release the abatement interlock.",
    question: "What is not ready yet?",
    options: ["The gas cabinet", "The abatement unit", "The load port", "The customer email"],
    answer: 1,
    explain: "abatement unit이 maintenance mode라고 말합니다."
  },
  {
    title: "Senior CE Instruction",
    audioText: "Before you report the issue, separate confirmed facts from assumptions. We have a pumpdown delay and a recent seal replacement. We do not yet have evidence of a leak.",
    question: "Which statement is confirmed?",
    options: ["There is definitely a leak.", "The pumpdown is delayed.", "The recipe is wrong.", "The customer approved release."],
    answer: 1,
    explain: "confirmed fact는 pumpdown delay입니다. leak은 아직 evidence가 없다고 합니다."
  },
  {
    title: "Customer Briefing",
    audioText: "The tool is powered on and the controller booted normally. We are holding wafer transfer because the load lock door sensor is unstable.",
    question: "Why is wafer transfer on hold?",
    options: ["Controller boot failed", "The load lock door sensor is unstable", "Power is not connected", "The FOUP is full"],
    answer: 1,
    explain: "load lock door sensor가 unstable이라 wafer transfer를 hold한다고 합니다."
  }
];

const amkSpeakingBank = [
  {
    title: "Self Introduction",
    prompt: "Introduce yourself as a candidate for a Customer Engineer role. Include your technical background, safety mindset, and why field service fits you.",
    pattern: "I studied or worked on ___. In the field, I think safety and evidence are more important than speed. I want to become a CE because ___.",
    sample: "I majored in mechanical engineering and worked with vacuum and electrical systems during my training. In the field, I believe safety and evidence should come before speed. I want to become a Customer Engineer because I enjoy solving technical issues with customers and learning equipment deeply."
  },
  {
    title: "Translate Your Experience",
    prompt: "Explain one project or work experience in English. Focus on problem, action, result, and what you learned.",
    pattern: "The problem was ___. My role was ___. I checked ___. As a result, ___. I learned that ___.",
    sample: "The problem was unstable sensor feedback during a test. My role was to check the wiring and compare the signal with the expected value. As a result, we found a loose connector and restored the signal. I learned that a clear sequence and evidence-based troubleshooting are important."
  },
  {
    title: "Customer Update",
    prompt: "Give a 45-second update to a customer when qualification is on hold due to an abatement-ready signal issue.",
    pattern: "Current status is ___. Confirmed facts are ___. The risk is ___. Next action is ___. I will update you by ___.",
    sample: "Current status is that qualification is on hold. The confirmed fact is that the abatement-ready signal does not match the local panel status. The risk is unsafe gas introduction, so we should not proceed. The next action is to verify signal mapping with the facility owner. I will update you by 11 a.m."
  },
  {
    title: "Troubleshooting Explanation",
    prompt: "Explain how you would approach a pumpdown delay without blaming anyone.",
    pattern: "First, I would confirm ___. Then I would compare ___. I would not conclude ___ until ___.",
    sample: "First, I would confirm the pumpdown trend and recent maintenance history. Then I would compare valve status, seal condition, gauge reading, and pump health. I would not conclude that there is a leak until we have evidence from a leak check or pressure trend."
  },
  {
    title: "Safety Hold",
    prompt: "Say why you must stop work when an interlock status is unclear.",
    pattern: "I would stop because ___. The interlock protects ___. Before restarting, we need ___.",
    sample: "I would stop because an unclear interlock status means the safety condition is not verified. The interlock protects people, equipment, and the customer line. Before restarting, we need to identify the cause, confirm the signal, and get the proper approval."
  }
];

const englishTestState = {
  selected: {},
  graded: {},
  attemptLogged: {},
  checked: false,
  timer: null,
  cbtTimer: null,
  cbtSeconds: 60 * 60,
  cbtRunning: false,
  seconds: 0,
  mode: "prep",
  set: [],
  lastSync: ""
};

const ENGLISH_ATTEMPTS_KEY = "amkEnglishAttempts";
const ENGLISH_MICRO_ATTEMPTS_KEY = "amkEnglishMicroAttempts";
const ENGLISH_RECORDS_KEY = "amkEnglishSessionRecords";
const ENGLISH_PENDING_RECORDS_KEY = "amkEnglishPendingRecords";
const ENGLISH_REVIEW_QUEUE_KEY = "amkEnglishSpacedReviewQueue";
const ENGLISH_REMOTE_API = "https://projectuniverse.chang2058.workers.dev";
const ENGLISH_REMOTE_TOKEN_KEY = "epiThinkTankRemoteToken";
const amkEnglishExpansion = window.AMK_ENGLISH_EXPANSION || {};
const ENGLISH_SET_COUNTS = {
  grammar: 18,
  vocabulary: 16,
  reading: 8,
  listening: 8,
  speaking: 8
};

function escapeEnglishTest(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;"
  }[char]));
}

function shuffleEnglishTest(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function shuffleEnglishOptions(options, answer) {
  const correct = options[answer];
  const distractors = options.filter((_, index) => index !== answer);
  return { correct, distractors };
}

function takeEnglishTest(items, count) {
  return shuffleEnglishTest(items).slice(0, count);
}

function getEnglishQuestionKey(item) {
  return String(item.question || item.stem || item.prompt || item.title || "").trim();
}

function takeDiverseEnglishTest(items, count) {
  const shuffled = shuffleEnglishTest(items);
  const selected = [];
  const usedKeys = new Set();
  shuffled.forEach(item => {
    const key = getEnglishQuestionKey(item);
    if (selected.length >= count || usedKeys.has(key)) return;
    usedKeys.add(key);
    selected.push(item);
  });
  shuffled.forEach(item => {
    if (selected.length < count && !selected.includes(item)) selected.push(item);
  });
  return selected.slice(0, count);
}

function englishBank(base, key) {
  const expansion = Array.isArray(amkEnglishExpansion[key]) ? amkEnglishExpansion[key] : [];
  return [...base, ...expansion];
}

function getEnglishPoolCounts() {
  return {
    grammar: englishBank(amkGrammarBank, "grammar").length,
    vocabulary: englishBank(amkVocabBank, "vocabulary").length,
    reading: englishBank(amkReadingBank, "reading").length,
    listening: englishBank(amkListeningBank, "listening").length,
    speaking: englishBank(amkSpeakingBank, "speaking").length
  };
}

function normalizeEnglishQuestion(item) {
  if (Array.isArray(item.options) && Number.isInteger(item.answer)) {
    const { correct, distractors } = shuffleEnglishOptions(item.options, item.answer);
    return { ...item, correct, distractors };
  }
  const correct = String(item.correct || "");
  const distractors = Array.isArray(item.distractors) ? takeEnglishTest(item.distractors, 3) : [];
  return { ...item, correct, distractors };
}

function placeEnglishAnswer(item, targetIndex) {
  const normalized = normalizeEnglishQuestion(item);
  const correct = String(normalized.correct || "");
  const distractors = shuffleEnglishTest(normalized.distractors || [])
    .filter(option => option && option !== correct)
    .slice(0, 3);
  while (distractors.length < 3) distractors.push(`Not enough information ${distractors.length + 1}`);
  const options = [];
  const remaining = [...distractors];
  for (let i = 0; i < 4; i += 1) {
    options[i] = i === targetIndex ? correct : remaining.shift();
  }
  return {
    ...normalized,
    options,
    answer: targetIndex
  };
}

function makeEnglishItems(items, count, prefix, type) {
  if (type === "Speaking") {
    return takeDiverseEnglishTest(items, count).map((item, index) => ({
      ...item,
      type,
      id: `${prefix}-${index}-${Date.now()}-${Math.random().toString(16).slice(2)}`
    }));
  }
  const answerPattern = shuffleEnglishTest([...Array(count)].map((_, index) => index % 4));
  return takeDiverseEnglishTest(items, count).map((item, index) => ({
    ...placeEnglishAnswer(item, answerPattern[index]),
    type,
    id: `${prefix}-${index}-${Date.now()}-${Math.random().toString(16).slice(2)}`
  }));
}

function interleaveEnglishItems(groups) {
  const pools = groups.map(group => shuffleEnglishTest(group)).filter(group => group.length);
  const result = [];
  while (pools.some(group => group.length)) {
    const last = result[result.length - 1]?.type;
    const beforeLast = result[result.length - 2]?.type;
    const candidates = pools
      .map((group, index) => ({ group, index, type: group[0]?.type, length: group.length }))
      .filter(item => item.length && !(item.type === last && item.type === beforeLast));
    const usable = candidates.length ? candidates : pools
      .map((group, index) => ({ group, index, type: group[0]?.type, length: group.length }))
      .filter(item => item.length);
    const maxLength = Math.max(...usable.map(item => item.length));
    const heavy = usable.filter(item => item.length >= Math.max(1, maxLength - 1));
    const picked = shuffleEnglishTest(heavy)[0];
    result.push(pools[picked.index].shift());
  }
  return result;
}

function makeEnglishTestSet() {
  const grammar = makeEnglishItems(englishBank(amkGrammarBank, "grammar"), ENGLISH_SET_COUNTS.grammar, "grammar", "Grammar");
  const vocab = makeEnglishItems(englishBank(amkVocabBank, "vocabulary"), ENGLISH_SET_COUNTS.vocabulary, "vocab", "Vocabulary");
  const reading = makeEnglishItems(englishBank(amkReadingBank, "reading"), ENGLISH_SET_COUNTS.reading, "reading", "Reading");
  const listening = makeEnglishItems(englishBank(amkListeningBank, "listening"), ENGLISH_SET_COUNTS.listening, "listening", "Listening");
  const speaking = makeEnglishItems(englishBank(amkSpeakingBank, "speaking"), ENGLISH_SET_COUNTS.speaking, "speaking", "Speaking");
  return [...interleaveEnglishItems([grammar, vocab, reading, listening]), ...speaking];
}

function makeFocusedEnglishReviewSet() {
  const queue = getEnglishReviewQueue();
  const due = queue
    .filter(item => new Date(item.dueAt || 0).getTime() <= Date.now())
    .sort((a, b) => Number(b.lapses || 0) - Number(a.lapses || 0));
  const prioritySkills = due.length
    ? [...new Set(due.map(item => item.skillTag).filter(Boolean))]
    : [...new Set(queue.sort((a, b) => Number(b.lapses || 0) - Number(a.lapses || 0)).map(item => item.skillTag).filter(Boolean))].slice(0, 3);
  const base = makeEnglishTestSet();
  const objective = base.filter(item => item.type !== "Speaking");
  const speaking = base.filter(item => item.type === "Speaking");
  const scored = objective.map(item => {
    const [skillTag] = classifyEnglishQuestion(item);
    const priority = prioritySkills.includes(skillTag) ? 0 : 1;
    const typeMatch = due.some(review => review.type === item.type) ? 0 : 1;
    return { item, priority, typeMatch, skillTag };
  }).sort((a, b) => a.priority - b.priority || a.typeMatch - b.typeMatch || Math.random() - 0.5);
  return [...scored.map(row => row.item), ...speaking];
}

function startEnglishFocusedReviewSet() {
  englishTestState.set = makeFocusedEnglishReviewSet();
  englishTestState.selected = {};
  englishTestState.graded = {};
  englishTestState.checked = false;
  englishTestState.attemptLogged = {};
  englishTestState.cbtRunning = false;
  englishTestState.cbtSeconds = 0;
  renderEnglishTestMain();
  renderEnglishTestProfile();
}

function getEnglishScore() {
  const attempts = JSON.parse(localStorage.getItem(ENGLISH_ATTEMPTS_KEY) || "[]");
  const correct = attempts.filter(Boolean).length;
  return {
    attempts,
    correct,
    total: attempts.length,
    percent: attempts.length ? Math.round(correct / attempts.length * 100) : 0
  };
}

function saveEnglishAttempt(isCorrect) {
  const attempts = JSON.parse(localStorage.getItem(ENGLISH_ATTEMPTS_KEY) || "[]");
  attempts.push(Boolean(isCorrect));
  localStorage.setItem(ENGLISH_ATTEMPTS_KEY, JSON.stringify(attempts.slice(-200)));
}

function getEnglishMicroAttempts() {
  try {
    return JSON.parse(localStorage.getItem(ENGLISH_MICRO_ATTEMPTS_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveEnglishMicroAttempt(item, selectedIndex) {
  const [skillTag, skillNote] = classifyEnglishQuestion(item);
  const attempt = {
    id: `${item.id}-${selectedIndex}`,
    questionId: item.id,
    type: item.type,
    prompt: item.question || item.stem || item.title || "",
    selected: Number.isInteger(selectedIndex) ? item.options[selectedIndex] : "",
    answer: item.options[item.answer],
    correct: selectedIndex === item.answer,
    skillTag,
    skillNote,
    createdAt: new Date().toISOString()
  };
  const byId = new Map(getEnglishMicroAttempts().map(record => [record.id, record]));
  byId.set(attempt.id, attempt);
  localStorage.setItem(ENGLISH_MICRO_ATTEMPTS_KEY, JSON.stringify([...byId.values()].slice(-500)));
}

function getEnglishReviewQueue() {
  try {
    return JSON.parse(localStorage.getItem(ENGLISH_REVIEW_QUEUE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveEnglishReviewQueue(queue) {
  localStorage.setItem(ENGLISH_REVIEW_QUEUE_KEY, JSON.stringify(queue.slice(0, 500)));
}

function scheduleEnglishReview(item, selectedIndex) {
  const [skillTag, skillNote] = classifyEnglishQuestion(item);
  const correct = selectedIndex === item.answer;
  const now = new Date();
  const due = new Date(now);
  due.setDate(due.getDate() + (correct ? 3 : 1));
  const queue = getEnglishReviewQueue();
  const previous = queue.find(record => record.questionKey === getEnglishQuestionKey(item) && record.skillTag === skillTag);
  const review = {
    id: previous?.id || `review-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    questionKey: getEnglishQuestionKey(item),
    type: item.type,
    prompt: item.question || item.stem || item.title || "",
    correctAnswer: item.options?.[item.answer] || item.answer || "",
    lastSelected: Number.isInteger(selectedIndex) ? item.options[selectedIndex] : "",
    lastCorrect: correct,
    skillTag,
    skillNote,
    ease: Math.max(1, Number(previous?.ease || 2) + (correct ? 0.2 : -0.4)),
    lapses: Number(previous?.lapses || 0) + (correct ? 0 : 1),
    reviews: Number(previous?.reviews || 0) + 1,
    lastReviewedAt: now.toISOString(),
    dueAt: due.toISOString(),
    nextAction: correct
      ? "3일 뒤 같은 문법/어휘를 다른 문장으로 재확인"
      : "내일 같은 약점 태그의 유사 문제 5문항 풀기"
  };
  const next = [review, ...queue.filter(record => record.id !== review.id)]
    .sort((a, b) => String(a.dueAt || "").localeCompare(String(b.dueAt || "")));
  saveEnglishReviewQueue(next);
}

function renderEnglishSpacedReviewPanel() {
  const queue = getEnglishReviewQueue();
  const now = Date.now();
  const due = queue.filter(item => new Date(item.dueAt || 0).getTime() <= now);
  const upcoming = queue.filter(item => new Date(item.dueAt || 0).getTime() > now).slice(0, 5);
  const weak = {};
  queue.forEach(item => {
    if (!weak[item.skillTag]) weak[item.skillTag] = { skill: item.skillTag, due: 0, lapses: 0 };
    if (new Date(item.dueAt || 0).getTime() <= now) weak[item.skillTag].due += 1;
    weak[item.skillTag].lapses += Number(item.lapses || 0);
  });
  const weakRows = Object.values(weak).sort((a, b) => b.lapses - a.lapses || b.due - a.due).slice(0, 4);
  return `
    <section class="english-review-queue">
      <div>
        <p class="eyebrow">Spaced Review Queue</p>
        <h2>틀린 문제는 자동으로 복습 대기열에 쌓입니다</h2>
        <p>간격 반복과 retrieval practice를 합친 방식입니다. 정답만 보는 대신, 같은 약점을 다른 문장으로 다시 꺼내는 루틴을 만듭니다.</p>
      </div>
      <div class="english-review-grid">
        <article><span>오늘 복습</span><strong>${due.length}</strong><small>${due[0]?.skillTag || "대기 없음"}</small></article>
        <article><span>전체 큐</span><strong>${queue.length}</strong><small>오답·정답 모두 간격 관리</small></article>
        <article><span>반복 약점</span><strong>${weakRows[0]?.skill || "데이터 대기"}</strong><small>${weakRows[0] ? `${weakRows[0].lapses}회 lapse` : "문제를 풀면 채워짐"}</small></article>
      </div>
      <div class="english-review-list">
        ${(due.length ? due : upcoming).slice(0, 6).map(item => `
          <span><b>${escapeEnglishTest(item.skillTag || item.type)}</b>${escapeEnglishTest(item.prompt || "")}<small>${escapeEnglishTest(item.nextAction || "")}</small></span>
        `).join("") || `<span><b>READY</b>아직 복습 큐가 없습니다.<small>객관식 문제를 하나 풀면 자동으로 생성됩니다.</small></span>`}
      </div>
    </section>
  `;
}

function renderEnglishSpacedReviewPanel() {
  const queue = getEnglishReviewQueue();
  const now = Date.now();
  const due = queue.filter(item => new Date(item.dueAt || 0).getTime() <= now);
  const upcoming = queue.filter(item => new Date(item.dueAt || 0).getTime() > now).slice(0, 5);
  const weak = {};
  queue.forEach(item => {
    if (!weak[item.skillTag]) weak[item.skillTag] = { skill: item.skillTag, due: 0, lapses: 0 };
    if (new Date(item.dueAt || 0).getTime() <= now) weak[item.skillTag].due += 1;
    weak[item.skillTag].lapses += Number(item.lapses || 0);
  });
  const weakRows = Object.values(weak).sort((a, b) => b.lapses - a.lapses || b.due - a.due).slice(0, 4);
  const list = (due.length ? due : upcoming).slice(0, 6);
  return `
    <section class="english-review-queue">
      <div>
        <p class="eyebrow">Spaced Review Queue</p>
        <h2>오답은 복습 큐로 들어가고, 큐는 집중 세트로 다시 나옵니다</h2>
        <p>retrieval practice와 spaced repetition 원리를 사용합니다. 문제 하나만 풀어도 정답, 해설, 약점 tag, 유사 훈련, 다음 복습 일정이 쌓입니다.</p>
      </div>
      <div class="english-review-grid">
        <article><span>오늘 복습</span><strong>${due.length}</strong><small>${due[0]?.skillTag || "대기 없음"}</small></article>
        <article><span>전체 큐</span><strong>${queue.length}</strong><small>정답과 오답 모두 간격 관리</small></article>
        <article><span>반복 약점</span><strong>${escapeEnglishTest(weakRows[0]?.skill || "데이터 대기")}</strong><small>${weakRows[0] ? `${weakRows[0].lapses} lapse` : "풀수록 자동 분석"}</small></article>
      </div>
      <div class="english-review-list">
        ${list.map(item => `
          <span><b>${escapeEnglishTest(item.skillTag || item.type)}</b>${escapeEnglishTest(item.prompt || "")}<small>${escapeEnglishTest(item.nextAction || "")}</small></span>
        `).join("") || `<span><b>READY</b>아직 복습 큐가 없습니다.<small>객관식 문제를 하나 풀면 자동으로 생성됩니다.</small></span>`}
      </div>
      <div class="english-review-actions">
        <button class="primary" type="button" data-english-review-set>오답 기반 집중 세트 시작</button>
        <small>due skill tag와 lapse가 많은 유형을 앞쪽에 배치합니다. 한 문제를 고르면 즉시 채점되고 복습 큐가 다시 갱신됩니다.</small>
      </div>
    </section>
  `;
}

function isEnglishQuestionGraded(item) {
  return Boolean(englishTestState.graded[item.id] || englishTestState.checked);
}

function getEnglishObjectiveStats(objectiveItems) {
  const answeredItems = objectiveItems.filter(item => isEnglishQuestionGraded(item));
  const correct = answeredItems.reduce((acc, item) => (
    acc + (englishTestState.selected[item.id] === item.answer ? 1 : 0)
  ), 0);
  return {
    answered: answeredItems.length,
    correct,
    total: objectiveItems.length
  };
}

function markEnglishQuestionAnswered(item, selectedIndex) {
  englishTestState.selected[item.id] = selectedIndex;
  englishTestState.graded[item.id] = {
    selected: selectedIndex,
    correct: selectedIndex === item.answer,
    answeredAt: new Date().toISOString()
  };
  if (!englishTestState.attemptLogged[item.id]) {
    saveEnglishAttempt(selectedIndex === item.answer);
    saveEnglishMicroAttempt(item, selectedIndex);
    scheduleEnglishReview(item, selectedIndex);
    englishTestState.attemptLogged[item.id] = true;
  }
}

function getEnglishRecords() {
  try {
    return JSON.parse(localStorage.getItem(ENGLISH_RECORDS_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveEnglishRecords(records) {
  const byId = new Map(records.filter(record => record?.id).map(record => [record.id, record]));
  localStorage.setItem(ENGLISH_RECORDS_KEY, JSON.stringify([...byId.values()].slice(0, 300)));
}

function getEnglishPendingRecords() {
  try {
    return JSON.parse(localStorage.getItem(ENGLISH_PENDING_RECORDS_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveEnglishPendingRecords(records) {
  localStorage.setItem(ENGLISH_PENDING_RECORDS_KEY, JSON.stringify(records.slice(0, 100)));
}

function queueEnglishRecord(record) {
  const byId = new Map(getEnglishPendingRecords().map(item => [item.id, item]));
  byId.set(record.id, record);
  saveEnglishPendingRecords([...byId.values()]);
}

function removeEnglishPendingRecord(id) {
  saveEnglishPendingRecords(getEnglishPendingRecords().filter(record => record.id !== id));
}

function mergeEnglishRecords(records) {
  saveEnglishRecords([...records, ...getEnglishRecords()]
    .sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || ""))));
}

function englishApiBase() {
  if (location.hostname.endsWith(".workers.dev")) return location.origin;
  if (["127.0.0.1", "localhost", "::1"].includes(location.hostname) && location.port) return location.origin;
  if (location.port === "4180") return location.origin;
  return ENGLISH_REMOTE_API;
}

async function englishApiFetch(path, options = {}) {
  const token = sessionStorage.getItem(ENGLISH_REMOTE_TOKEN_KEY) || "";
  const response = await fetch(`${englishApiBase()}${path}`, {
    ...options,
    credentials: englishApiBase() === location.origin ? "include" : "include",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    }
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

function classifyEnglishQuestion(item) {
  const type = String(item.type || "");
  const text = `${item.question || item.stem || ""} ${item.title || ""}`.toLowerCase();
  if (type === "Grammar") {
    if (text.includes("neither") || text.includes(" nor ")) return ["subject-verb agreement", "neither A nor B처럼 가까운 주어에 동사를 맞추는 규칙이 약합니다."];
    if (text.includes("has been") || text.includes("since") || text.includes("for")) return ["present perfect and time", "현재완료와 for/since 시간표현을 더 연습해야 합니다."];
    if (text.includes("asked us") || text.includes("let me know")) return ["verb pattern and indirect question", "ask someone to do, let me know when 같은 업무 표현 패턴이 약합니다."];
    if (text.includes("locked out") || text.includes("reseated")) return ["passive voice", "장비 조치 결과를 수동태로 말하는 문장 감각이 약합니다."];
    if (text.includes("if") || text.includes("unless")) return ["conditionals for safety holds", "조건절로 hold/stop 조건을 말하는 문법이 약합니다."];
    return ["core grammar accuracy", "기본 문법 정확도를 더 쌓아야 합니다."];
  }
  if (type === "Vocabulary") return ["field-service vocabulary", "현장 보고 어휘의 정확한 뜻과 뉘앙스를 더 익혀야 합니다."];
  if (type === "Reading") return ["reading for status-risk-action", "긴 공지에서 현재 상태, 리스크, 다음 행동을 분리하는 힘이 필요합니다."];
  if (type === "Listening") return ["listening for hold reason and owner", "듣기에서 hold 사유, 담당 owner, 금지 행동을 잡는 연습이 필요합니다."];
  return ["general English response", "전체 영어 응답 안정성을 더 쌓아야 합니다."];
}

const englishStudyGuides = {
  "subject-verb agreement": ["Neither A nor B 문장 5개 만들기", "가까운 주어가 단수인지 복수인지 먼저 표시하기", "The unit is / the units are를 소리 내어 구분하기"],
  "present perfect and time": ["for는 기간, since는 시작점으로 10문장 만들기", "has been under vacuum for 30 minutes처럼 장비 상태 문장 반복", "현재 상태와 과거 완료를 구분해서 말하기"],
  "verb pattern and indirect question": ["ask someone to do 패턴 10문장", "Please let me know when/if/whether 문장 만들기", "고객 요청 문장을 정중한 업무 영어로 바꾸기"],
  "passive voice": ["was checked, was verified, was replaced, was reseated 반복", "누가 했는지보다 조치 결과가 중요한 문장 만들기", "Before/after와 수동태 연결"],
  "conditionals for safety holds": ["If A is not ready, we must hold B 패턴 반복", "unless 조건문 10개", "gas/exhaust/interlock 조건으로 stop 문장 만들기"],
  "field-service vocabulary": ["escalate, baseline, as-built, ETA, hold를 현장 문장으로 쓰기", "단어 뜻보다 고객 보고 문장 안에서 외우기", "비슷한 단어와 헷갈리는 뜻 분리"],
  "reading for status-risk-action": ["메일에서 status/risk/next action에 밑줄", "한 문단을 3줄 보고로 줄이기", "open item과 completed item 분리"],
  "listening for hold reason and owner": ["듣고 hold reason만 적기", "owner와 forbidden action을 따로 적기", "TTS 문장을 듣고 30초 고객 업데이트로 말하기"],
  "general English response": ["3문장 답변 구조 만들기", "status-risk-next action 순서로 말하기", "녹음 후 빠진 정보 체크"]
};

function buildEnglishWeaknessReport(records = getEnglishRecords()) {
  const stats = {};
  const microResults = getEnglishMicroAttempts().map(item => ({
    ...item,
    prompt: item.prompt,
    skillTag: item.skillTag,
    correct: item.correct
  }));
  const resultRows = [
    ...records.flatMap(record => record.results || []),
    ...microResults
  ];
  resultRows.forEach(result => {
      const skill = result.skillTag || classifyEnglishQuestion(result)[0];
      if (!stats[skill]) stats[skill] = { skill, total: 0, wrong: 0, examples: [], guide: englishStudyGuides[skill] || englishStudyGuides["general English response"] };
      stats[skill].total += 1;
      if (!result.correct) {
        stats[skill].wrong += 1;
        if (stats[skill].examples.length < 3) {
          stats[skill].examples.push({
            prompt: result.prompt,
            selected: result.selected,
            answer: result.answer,
            note: result.skillNote || ""
          });
        }
      }
  });
  return Object.values(stats)
    .map(item => ({
      ...item,
      accuracy: item.total ? Math.round((item.total - item.wrong) / item.total * 100) : 0,
      priority: item.wrong * 2 + Math.max(0, 80 - (item.total ? Math.round((item.total - item.wrong) / item.total * 100) : 0))
    }))
    .sort((a, b) => b.priority - a.priority);
}

function makeEnglishRecordId() {
  if (window.crypto?.randomUUID) return `english-${crypto.randomUUID()}`;
  return `english-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function saveEnglishRecordLocally(record) {
  mergeEnglishRecords([record]);
}

async function pushEnglishRecordToVault(record) {
  if (!location.protocol.startsWith("http")) return;
  try {
    await englishApiFetch("/api/entries", {
      method: "POST",
      body: JSON.stringify(record)
    });
    removeEnglishPendingRecord(record.id);
    englishTestState.lastSync = `DB 저장 완료 ${new Date().toLocaleTimeString()}`;
    renderEnglishTestProfile();
    return;
    const response = await fetch("/api/entries", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record)
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    englishTestState.lastSync = `DB 저장 완료 ${new Date().toLocaleTimeString()}`;
  } catch {
    queueEnglishRecord(record);
    englishTestState.lastSync = "DB 저장 대기: 다음 로그인/동기화 때 재시도";
  }
  renderEnglishTestProfile();
}

async function retryPendingEnglishRecords() {
  const pending = getEnglishPendingRecords();
  if (!pending.length) return;
  for (const record of pending) {
    await pushEnglishRecordToVault(record);
  }
}

async function pullEnglishRecordsFromVault() {
  try {
    const data = await englishApiFetch("/api/entries");
    const remoteRecords = (data.entries || []).filter(entry => entry.type === "English CBT Practice");
    if (remoteRecords.length) mergeEnglishRecords(remoteRecords);
    await retryPendingEnglishRecords();
    renderEnglishTestProfile();
    renderEnglishTestMain();
  } catch {
    // Keep local practice usable when the remote vault is temporarily unreachable.
  }
}

window.refreshEnglishFromVault = pullEnglishRecordsFromVault;

function speakEnglishText(text) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.92;
  window.speechSynthesis.speak(utterance);
}

function stopSpeakingTimer() {
  if (englishTestState.timer) clearInterval(englishTestState.timer);
  englishTestState.timer = null;
}

function startSpeakingTimer(mode) {
  stopSpeakingTimer();
  englishTestState.mode = mode;
  englishTestState.seconds = mode === "prep" ? 45 : 60;
  updateSpeakingTimer();
  englishTestState.timer = setInterval(() => {
    englishTestState.seconds -= 1;
    updateSpeakingTimer();
    if (englishTestState.seconds <= 0) stopSpeakingTimer();
  }, 1000);
}

function updateSpeakingTimer() {
  document.querySelectorAll("[data-speaking-timer]").forEach(node => {
    const label = englishTestState.mode === "prep" ? "준비" : "답변";
    node.textContent = `${label} ${englishTestState.seconds}s`;
  });
}

function formatEnglishCbtTime(seconds) {
  const minutes = Math.floor(Math.max(0, seconds) / 60);
  const rest = Math.max(0, seconds) % 60;
  return `${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
}

function updateEnglishCbtTimer() {
  document.querySelectorAll("[data-english-cbt-timer]").forEach(node => {
    node.textContent = formatEnglishCbtTime(englishTestState.cbtSeconds);
  });
  document.querySelectorAll("[data-english-cbt-state]").forEach(node => {
    node.textContent = englishTestState.cbtRunning ? "실전 진행 중" : "대기";
  });
}

function stopEnglishCbtTimer(reset = false) {
  if (englishTestState.cbtTimer) clearInterval(englishTestState.cbtTimer);
  englishTestState.cbtTimer = null;
  englishTestState.cbtRunning = false;
  if (reset) englishTestState.cbtSeconds = 60 * 60;
  updateEnglishCbtTimer();
}

function startEnglishCbtTimer() {
  stopEnglishCbtTimer(false);
  if (englishTestState.cbtSeconds <= 0) englishTestState.cbtSeconds = 60 * 60;
  englishTestState.cbtRunning = true;
  updateEnglishCbtTimer();
  englishTestState.cbtTimer = setInterval(() => {
    englishTestState.cbtSeconds -= 1;
    updateEnglishCbtTimer();
    if (englishTestState.cbtSeconds <= 0) stopEnglishCbtTimer(false);
  }, 1000);
}

function getEnglishWeaknessSummary(objectiveItems) {
  const summary = objectiveItems.reduce((acc, item) => {
    if (!isEnglishQuestionGraded(item)) return acc;
    const key = item.type;
    if (!acc[key]) acc[key] = { total: 0, wrong: 0 };
    acc[key].total += 1;
    if (englishTestState.selected[item.id] !== item.answer) acc[key].wrong += 1;
    return acc;
  }, {});
  return Object.entries(summary)
    .map(([type, data]) => ({ type, ...data, accuracy: Math.round((data.total - data.wrong) / data.total * 100) }))
    .sort((a, b) => b.wrong - a.wrong);
}

function renderEnglishWeaknessPanel(objectiveItems) {
  const stats = getEnglishObjectiveStats(objectiveItems);
  if (!stats.answered) return "";
  const summary = getEnglishWeaknessSummary(objectiveItems);
  if (!summary.length) return "";
  const focus = summary.filter(item => item.wrong > 0).slice(0, 2).map(item => item.type).join(", ") || "유지";
  return `
    <section class="english-section-band english-insight-band">
      <div>
        <p class="eyebrow">${englishTestState.checked ? "After-Action Review" : "Live Review"}</p>
        <h2>${englishTestState.checked ? "오답 약점 분석" : "실시간 약점 분석"}</h2>
        <p>현재 답변 ${stats.answered}/${stats.total}개 기준입니다. 다음 문제로 넘어가기 전에 ${escapeEnglishTest(focus)} 영역 해설을 한 문장으로 다시 말해보세요.</p>
      </div>
      <div class="english-weakness-grid">
        ${summary.map(item => `
          <article>
            <strong>${escapeEnglishTest(item.type)}</strong>
            <span>정확도 ${item.accuracy}%</span>
            <small>오답 ${item.wrong}/${item.total}</small>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderEnglishCumulativeCoach() {
  const report = buildEnglishWeaknessReport();
  const records = getEnglishRecords();
  const top = report.slice(0, 4);
  if (!records.length) {
    return `
      <section class="english-coach-panel">
        <p class="eyebrow">Wrong Answer Memory</p>
        <h3>오답 데이터가 쌓이면 약점 지도가 생깁니다</h3>
        <p>CBT 세트를 채점하면 문법, 어휘, 독해, 듣기 약점이 자동으로 분류되고 다음 학습 루틴으로 이어집니다.</p>
        <div class="english-coach-next">
          <strong>처음 시작 루틴</strong>
          <ol>
            <li>새 CBT 세트를 20분 안에 풀기</li>
            <li>틀린 문제 해설을 한 문장으로 다시 말하기</li>
            <li>Speaking 카드 하나를 45초 준비 후 60초 답변하기</li>
          </ol>
        </div>
      </section>
    `;
  }
  const mainWeakness = top[0];
  return `
    <section class="english-coach-panel">
      <p class="eyebrow">Wrong Answer Memory</p>
      <h3>누적 오답 기반 영어 약점 지도</h3>
      <div class="english-coach-kpis">
        <span>저장 세트 <strong>${records.length}</strong></span>
        <span>최우선 약점 <strong>${escapeEnglishTest(top[0]?.skill || "유지")}</strong></span>
      </div>
      <div class="english-coach-bars" aria-label="약점 강도">
        ${top.map(item => {
          const errorRate = item.total ? Math.round(item.wrong / item.total * 100) : 0;
          return `
            <article>
              <div><strong>${escapeEnglishTest(item.skill)}</strong><span>${errorRate}% error pressure</span></div>
              <i><em style="width:${errorRate}%"></em></i>
            </article>
          `;
        }).join("")}
      </div>
      <div class="english-coach-list">
        ${top.map(item => `
          <article>
            <strong>${escapeEnglishTest(item.skill)}</strong>
            <span>정확도 ${item.accuracy}% · 오답 ${item.wrong}/${item.total}</span>
            <ul>${item.guide.slice(0, 3).map(step => `<li>${escapeEnglishTest(step)}</li>`).join("")}</ul>
          </article>
        `).join("")}
      </div>
      <div class="english-coach-next">
        <strong>오늘 15분 처방</strong>
        <ol>
          <li>${escapeEnglishTest(mainWeakness?.skill || "최신 오답")} 유형 해설 3개를 소리 내어 읽기</li>
          <li>틀린 선택지가 왜 틀렸는지 한국어 1문장, 영어 1문장으로 적기</li>
          <li>현장 문장으로 바꾸기: “I checked..., I found..., I will...”</li>
        </ol>
      </div>
      <div class="english-field-ladder">
        <strong>현장 답변 뼈대</strong>
        <span>Situation: The tool alarm occurred during...</span>
        <span>Evidence: I checked the log, DVM reading, and interlock status.</span>
        <span>Action: I will isolate the cause, update the customer, and verify recovery.</span>
      </div>
    </section>
  `;
}

function renderEnglishSimilarityPanel() {
  return `
    <section class="english-section-band english-similarity-band">
      <p class="eyebrow">Reality Check</p>
      <h2>실제 시험과 얼마나 비슷할까?</h2>
      <div class="english-similarity-grid">
        <article>
          <strong>구성 유사도: 높음</strong>
          <span>공식/채용 정보에서 확인되는 온라인 CBT, 약 1시간, 문법·독해·듣기·말하기 구성을 그대로 훈련합니다.</span>
        </article>
        <article>
          <strong>문항 느낌: 중상</strong>
          <span>잡코리아 설명회의 “토플식 형식, 토익 유사 내용”과 후기의 토익/오픽 혼합 느낌을 기준으로 만들었습니다.</span>
        </article>
        <article>
          <strong>기출 적중: 보장 불가</strong>
          <span>벤더와 실제 문항은 비공개입니다. 목표는 기출 암기가 아니라 1시간 동안 영어 거부감 없이 풀고 말하는 체력을 만드는 것입니다.</span>
        </article>
      </div>
    </section>
  `;
}

function getEnglishSetQuality(objectiveItems) {
  const answerCounts = [0, 1, 2, 3].map(index => objectiveItems.filter(item => item.answer === index).length);
  let longestRun = 0;
  let currentRun = 0;
  let lastType = "";
  objectiveItems.forEach(item => {
    currentRun = item.type === lastType ? currentRun + 1 : 1;
    lastType = item.type;
    longestRun = Math.max(longestRun, currentRun);
  });
  const uniqueStems = new Set(objectiveItems.map(item => `${item.type}:${item.question || item.stem}`)).size;
  return {
    answerCounts,
    longestRun,
    uniqueStems,
    total: objectiveItems.length
  };
}

function renderEnglishQualityPanel(objectiveItems) {
  const quality = getEnglishSetQuality(objectiveItems);
  return `
    <section class="english-section-band english-quality-band">
      <div>
        <p class="eyebrow">Quality Guard</p>
        <h2>패턴 암기 방지 장치</h2>
        <p>정답 위치를 균형 배치하고, 문법·어휘·독해·듣기가 길게 몰리지 않도록 섞었습니다. 실제 기출은 비공개라 복원할 수 없고, 공개된 형식과 후기의 난이도 감각을 기준으로 훈련 세트를 만듭니다.</p>
      </div>
      <div class="english-quality-grid">
        <article>
          <strong>${quality.answerCounts.join(" / ")}</strong>
          <span>A/B/C/D 정답 분포</span>
        </article>
        <article>
          <strong>${quality.longestRun}</strong>
          <span>최장 동일 유형 연속</span>
        </article>
        <article>
          <strong>${quality.uniqueStems}/${quality.total}</strong>
          <span>이번 세트 고유 문항</span>
        </article>
      </div>
    </section>
  `;
}

function renderEnglishTestProfile() {
  const target = document.querySelector("#english-test-profile");
  if (!target) return;
  const score = getEnglishScore();
  const latestRecord = getEnglishRecords()[0];
  const microAttempts = getEnglishMicroAttempts();
  const pool = getEnglishPoolCounts();
  const objectiveCount = ENGLISH_SET_COUNTS.grammar + ENGLISH_SET_COUNTS.vocabulary + ENGLISH_SET_COUNTS.reading + ENGLISH_SET_COUNTS.listening;
  target.innerHTML = `
    <p class="eyebrow">Likely Format</p>
    <h2>온라인 CBT 약 1시간</h2>
    <div class="english-format-grid">
      <span>Grammar</span>
      <span>Reading</span>
      <span>Listening</span>
      <span>Speaking</span>
    </div>
    <div class="english-score-card">
      <strong>${score.percent}%</strong>
      <small>누적 객관식 ${score.correct}/${score.total}</small>
    </div>
    <div class="english-pool-card">
      <strong>현재 세트 ${objectiveCount + ENGLISH_SET_COUNTS.speaking}문항</strong>
      <span>객관식 ${objectiveCount} + 말하기 ${ENGLISH_SET_COUNTS.speaking}</span>
      <span>문제풀 ${pool.grammar + pool.vocabulary + pool.reading + pool.listening + pool.speaking}+개</span>
      <span>즉시 태그 ${microAttempts.length}개 누적</span>
    </div>
    <div class="english-timer-card">
      <span data-english-cbt-state>${englishTestState.cbtRunning ? "실전 진행 중" : "대기"}</span>
      <strong data-english-cbt-timer>${formatEnglishCbtTime(englishTestState.cbtSeconds)}</strong>
      <small>1시간 CBT 페이스</small>
    </div>
    ${latestRecord ? `<p class="english-sync-note">최근 세트: ${latestRecord.score}/${latestRecord.total} · ${escapeEnglishTest(latestRecord.createdAtLabel || "")}</p>` : ""}
    ${englishTestState.lastSync ? `<p class="english-sync-note">${escapeEnglishTest(englishTestState.lastSync)}</p>` : ""}
    ${renderEnglishCumulativeCoach()}
    <p>목표는 만점이 아니라, 영어 거부감 없이 3문장 이상을 안정적으로 말하고 객관식에서 실수 패턴을 줄이는 것입니다.</p>
  `;
}

function renderEnglishTestSources() {
  const target = document.querySelector("#english-test-sources");
  if (!target) return;
  target.innerHTML = `
    <h3>공개 근거</h3>
    <div class="english-source-list">
      ${amkEnglishSources.map(source => `
        <a href="${source.url}" target="_blank" rel="noreferrer">
          <strong>${escapeEnglishTest(source.title)}</strong>
          <span>${escapeEnglishTest(source.fact)}</span>
        </a>
      `).join("")}
    </div>
  `;
}

function buildSimilarEnglishDrills(item, skillTag) {
  const fieldNoun = item.type === "Listening" ? "hold reason" : item.type === "Reading" ? "next action" : "tool status";
  const drills = {
    "subject-verb agreement": [
      "Neither the pump nor the abatement unit ___ ready.",
      "The load lock and the transfer module ___ under review.",
      "One of the facility signals ___ unstable."
    ],
    "present perfect and time": [
      "The chamber has been under vacuum ___ 20 minutes.",
      "The alarm has been active ___ 09:10.",
      "We have monitored the trend ___ the last shift."
    ],
    "verb pattern and indirect question": [
      "The customer asked us ___ the evidence pack.",
      "Please let me know ___ the facility owner confirms readiness.",
      "The senior CE told me ___ the assumptions separate from facts."
    ],
    "passive voice": [
      "The connector ___ reseated after LOTO approval.",
      "The checklist ___ reviewed before handover.",
      "The issue ___ escalated to the correct owner."
    ],
    "conditionals for safety holds": [
      "If the exhaust is not verified, we must ___.",
      "Unless the interlock status is clear, we should ___.",
      "If the evidence is incomplete, the safest next action is ___."
    ],
    "field-service vocabulary": [
      "Explain escalate, baseline, and as-built in one customer update.",
      "Use ETA, hold, and owner in a three-sentence status report.",
      "Write one sentence separating confirmed fact from assumption."
    ],
    "reading for status-risk-action": [
      `Read a short note and underline status, risk, and ${fieldNoun}.`,
      "Convert a five-line handover note into three bullets: completed, open, stop condition.",
      "Find the one action the next shift must avoid."
    ],
    "listening for hold reason and owner": [
      "Listen once and write only the hold reason.",
      "Listen again and write the owner and forbidden action.",
      "Give a 30-second customer update using status-risk-next action."
    ]
  };
  return drills[skillTag] || [
    "Make one sentence with confirmed fact, one with assumption, one with next action.",
    "Answer in three sentences: status, risk, next action.",
    "Explain the same idea once in Korean and once in simple English."
  ];
}

function renderObjectiveFeedback(item) {
  const isGraded = isEnglishQuestionGraded(item);
  if (!isGraded) {
    return `
      <div class="english-instant-hint">
        <strong>선택하면 즉시 채점</strong>
        <span>한 문제만 풀어도 정답, 해설, 약점 포인트가 바로 열립니다.</span>
      </div>
    `;
  }
  const selectedIndex = englishTestState.selected[item.id];
  const isCorrect = selectedIndex === item.answer;
  const selectedText = Number.isInteger(selectedIndex) ? item.options[selectedIndex] : "미선택";
  const answerText = item.options[item.answer];
  const [skillTag, skillNote] = classifyEnglishQuestion(item);
  const drills = buildSimilarEnglishDrills(item, skillTag);
  return `
    <div class="english-instant-feedback ${isCorrect ? "good" : "bad"}">
      <div>
        <strong>${isCorrect ? "정답입니다" : "오답입니다"}</strong>
        <span>${isCorrect ? "이 감각을 바로 다음 문제에 이어가세요." : "틀린 이유를 지금 한 문장으로 붙잡고 넘어가세요."}</span>
      </div>
      <dl>
        <div><dt>내 선택</dt><dd>${escapeEnglishTest(selectedText)}</dd></div>
        <div><dt>정답</dt><dd>${escapeEnglishTest(answerText)}</dd></div>
        <div><dt>학습 포인트</dt><dd>${escapeEnglishTest(skillTag)} · ${escapeEnglishTest(skillNote)}</dd></div>
      </dl>
      <p>${escapeEnglishTest(item.explain || "정답 근거를 문제 문장 안에서 다시 확인하세요.")}</p>
      <div class="english-remediation-panel">
        <strong>바로 이어서 할 유사훈련</strong>
        ${drills.map(drill => `<span>${escapeEnglishTest(drill)}</span>`).join("")}
        <small>이 태그는 즉시 오답 메모리에 저장됩니다: ${escapeEnglishTest(skillTag)}</small>
      </div>
    </div>
  `;
}

function renderObjectiveQuestion(item, index) {
  const isGraded = isEnglishQuestionGraded(item);
  const isCorrect = isGraded && englishTestState.selected[item.id] === item.answer;
  const resultClass = isGraded ? (isCorrect ? "is-correct" : "is-wrong") : "";
  return `
    <article class="english-question ${resultClass}">
      <div class="english-question-head">
        <span>${index + 1}</span>
        <strong>${item.type}</strong>
      </div>
      ${item.title ? `<h3>${escapeEnglishTest(item.title)}</h3>` : ""}
      ${item.passage ? `<p class="english-passage">${escapeEnglishTest(item.passage)}</p>` : ""}
      ${item.audioText ? `
        <div class="english-audio-box">
          <button class="secondary" type="button" data-speak-audio="${item.id}">듣기 재생</button>
          <small>실제 시험 음원이 아니라 유사 듣기 훈련용 TTS입니다.</small>
        </div>
      ` : ""}
      <p class="english-stem">${escapeEnglishTest(item.question || item.stem)}</p>
      <div class="english-options">
        ${item.options.map((option, optionIndex) => {
          const picked = englishTestState.selected[item.id] === optionIndex;
          const correct = isGraded && optionIndex === item.answer;
          const wrong = isGraded && picked && optionIndex !== item.answer;
          return `
            <label class="${picked ? "picked" : ""} ${correct ? "correct" : ""} ${wrong ? "wrong" : ""}">
              <input type="radio" name="${item.id}" data-english-answer="${item.id}" value="${optionIndex}" ${picked ? "checked" : ""} />
              <b>${String.fromCharCode(65 + optionIndex)}</b>
              <span>${escapeEnglishTest(option)}</span>
            </label>
          `;
        }).join("")}
      </div>
      ${renderObjectiveFeedback(item)}
      ${item.audioText && isGraded ? `<details class="english-transcript"><summary>스크립트 보기</summary><p>${escapeEnglishTest(item.audioText)}</p></details>` : ""}
    </article>
  `;
}

function renderSpeakingPrompt(item, index) {
  return `
    <article class="english-speaking-card">
      <div class="english-question-head">
        <span>${index + 1}</span>
        <strong>Speaking</strong>
      </div>
      <h3>${escapeEnglishTest(item.title)}</h3>
      <p class="english-stem">${escapeEnglishTest(item.prompt)}</p>
      <div class="speaking-timer-row">
        <strong data-speaking-timer>준비 45s</strong>
        <button class="secondary" type="button" data-speaking-prep>45초 준비</button>
        <button class="secondary" type="button" data-speaking-answer>60초 답변</button>
      </div>
      <div class="speaking-pattern">
        <strong>답변 뼈대</strong>
        <p>${escapeEnglishTest(item.pattern)}</p>
      </div>
      <details class="speaking-sample">
        <summary>샘플 답변 보기</summary>
        <p>${escapeEnglishTest(item.sample)}</p>
      </details>
    </article>
  `;
}

function renderEnglishTestMain() {
  const target = document.querySelector("#english-test-main");
  if (!target) return;
  if (!englishTestState.set.length) englishTestState.set = makeEnglishTestSet();
  const objectiveItems = englishTestState.set.filter(item => item.type !== "Speaking");
  const speakingItems = englishTestState.set.filter(item => item.type === "Speaking");
  const stats = getEnglishObjectiveStats(objectiveItems);

  target.innerHTML = `
    <section class="english-test-brief">
      <div>
        <p class="eyebrow">Test Analysis</p>
        <h2>1시간 CBT 밀도: 토익식 객관식 + 짧은 오픽/토스식 말하기</h2>
        <p>공개 정보로 보면 시험은 특정 반도체 지식을 묻기보다 실무 영어 기본 체력, 빠른 독해, 듣기 이해, 짧은 말하기 거부감을 확인하는 쪽에 가깝습니다. 객관식은 보기 하나를 선택하는 즉시 정오답, 정답, 해설, 약점 포인트가 열립니다. 전체 저장 버튼은 세트 결과를 DB와 오답 지도에 남길 때 씁니다.</p>
      </div>
      <div class="english-live-score">
        <span>${englishTestState.checked ? "전체 리뷰" : "즉시 채점"}</span>
        <strong>${stats.correct}/${stats.answered || 0}</strong>
        <small>답변 ${stats.answered}/${objectiveItems.length} · 객관식 자동 채점</small>
      </div>
    </section>
    ${renderEnglishSimilarityPanel()}
    ${renderEnglishQualityPanel(objectiveItems)}
    ${renderEnglishWeaknessPanel(objectiveItems)}
    ${renderEnglishSpacedReviewPanel()}
    <section class="english-section-band">
      <h2>객관식 CBT</h2>
      <p>문법·어휘·독해·듣기가 한 세트 안에 섞여 나옵니다. 이제 끝까지 기다릴 필요 없이 한 문제를 선택하는 순간 공부가 시작됩니다. 틀리면 바로 해설을 읽고, 정답 문장을 소리 내어 한 번 말한 뒤 다음 문제로 넘어가세요.</p>
      <div class="english-question-grid">
        ${objectiveItems.map(renderObjectiveQuestion).join("")}
      </div>
    </section>
    <section class="english-section-band">
      <h2>말하기 CBT</h2>
      <p>카메라보다 마이크/녹음형에 가깝다고 보고 훈련합니다. 45초 준비 후 60초 안에 status, fact, risk, next action을 포함해 3문장 이상 말하는 것을 목표로 하세요.</p>
      <div class="english-speaking-grid">
        ${speakingItems.map((item, index) => renderSpeakingPrompt(item, objectiveItems.length + index)).join("")}
      </div>
    </section>
    <section class="english-section-band">
      <h2>면접 전환 훈련</h2>
      <div class="english-transfer-grid">
        <article><strong>방금 한 답을 영어로 바꾸기</strong><span>My previous answer was about ___. The main point is ___. I believe this matters because ___.</span></article>
        <article><strong>모르면 안전하게 말하기</strong><span>I am not fully sure yet, so I would verify the data first and escalate to the right owner.</span></article>
        <article><strong>CE식 고객 보고</strong><span>The confirmed fact is ___. The current risk is ___. The next action is ___. I will update you by ___.</span></article>
      </div>
    </section>
  `;

  target.querySelectorAll("[data-english-answer]").forEach(input => {
    input.addEventListener("change", () => {
      const item = englishTestState.set.find(question => question.id === input.dataset.englishAnswer);
      if (item) markEnglishQuestionAnswered(item, Number(input.value));
      renderEnglishTestMain();
      renderEnglishTestProfile();
    });
  });

  target.querySelector("[data-english-review-set]")?.addEventListener("click", startEnglishFocusedReviewSet);

  target.querySelectorAll("[data-speak-audio]").forEach(button => {
    button.addEventListener("click", () => {
      const item = englishTestState.set.find(question => question.id === button.dataset.speakAudio);
      if (item) speakEnglishText(item.audioText);
    });
  });

  target.querySelectorAll("[data-speaking-prep]").forEach(button => {
    button.addEventListener("click", () => startSpeakingTimer("prep"));
  });

  target.querySelectorAll("[data-speaking-answer]").forEach(button => {
    button.addEventListener("click", () => startSpeakingTimer("answer"));
  });
}

function checkEnglishTestSet() {
  const objectiveItems = englishTestState.set.filter(item => item.type !== "Speaking");
  objectiveItems.forEach(item => {
    if (!englishTestState.graded[item.id]) {
      englishTestState.graded[item.id] = {
        selected: englishTestState.selected[item.id],
        correct: englishTestState.selected[item.id] === item.answer,
        answeredAt: new Date().toISOString()
      };
    }
    if (!englishTestState.attemptLogged[item.id]) {
      saveEnglishAttempt(englishTestState.selected[item.id] === item.answer);
      englishTestState.attemptLogged[item.id] = true;
    }
  });
  const correctCount = objectiveItems.reduce((acc, item) => (
    acc + (englishTestState.selected[item.id] === item.answer ? 1 : 0)
  ), 0);
  const createdAt = new Date();
  const record = {
    id: makeEnglishRecordId(),
    type: "English CBT Practice",
    subsystem: "English test / interview",
    severity: correctCount >= Math.ceil(objectiveItems.length * 0.8) ? "Strong" : "Practice",
    title: `English CBT practice ${correctCount}/${objectiveItems.length}`,
    createdAt: createdAt.toISOString(),
    createdAtLabel: createdAt.toLocaleString(),
    score: correctCount,
    total: objectiveItems.length,
    scorePercent: Math.round((correctCount / objectiveItems.length) * 100),
    source: "AMK public English-test practice simulator",
    results: objectiveItems.map(item => {
      const [skillTag, skillNote] = classifyEnglishQuestion(item);
      return {
        type: item.type,
        prompt: item.question || item.stem,
        selected: Number.isInteger(englishTestState.selected[item.id]) ? item.options[englishTestState.selected[item.id]] : "",
        answer: item.options[item.answer],
        correct: englishTestState.selected[item.id] === item.answer,
        skillTag,
        skillNote,
        explain: item.explain || ""
      };
    }),
    speakingPrompts: englishTestState.set
      .filter(item => item.type === "Speaking")
      .map(item => ({ title: item.title, prompt: item.prompt, pattern: item.pattern }))
  };
  saveEnglishRecordLocally(record);
  englishTestState.lastSync = "DB 저장 중...";
  englishTestState.checked = true;
  renderEnglishTestProfile();
  renderEnglishTestMain();
  pushEnglishRecordToVault(record);
}

function newEnglishTestSet() {
  stopSpeakingTimer();
  englishTestState.selected = {};
  englishTestState.graded = {};
  englishTestState.attemptLogged = {};
  englishTestState.checked = false;
  englishTestState.set = makeEnglishTestSet();
  renderEnglishTestProfile();
  renderEnglishTestMain();
}

function resetEnglishScore() {
  localStorage.removeItem(ENGLISH_ATTEMPTS_KEY);
  localStorage.removeItem(ENGLISH_MICRO_ATTEMPTS_KEY);
  localStorage.removeItem(ENGLISH_RECORDS_KEY);
  localStorage.removeItem(ENGLISH_REVIEW_QUEUE_KEY);
  englishTestState.lastSync = "브라우저 연습 통계 초기화 완료";
  englishTestState.selected = {};
  englishTestState.graded = {};
  englishTestState.attemptLogged = {};
  englishTestState.checked = false;
  renderEnglishTestProfile();
  renderEnglishTestMain();
}

function initEnglishTest() {
  if (!document.querySelector("#english-test-main")) return;
  englishTestState.set = makeEnglishTestSet();
  renderEnglishTestProfile();
  renderEnglishTestSources();
  renderEnglishTestMain();
  document.querySelector("#english-new-mock")?.addEventListener("click", newEnglishTestSet);
  document.querySelector("#english-start-timer")?.addEventListener("click", startEnglishCbtTimer);
  document.querySelector("#english-stop-timer")?.addEventListener("click", () => stopEnglishCbtTimer(true));
  document.querySelector("#english-check-all")?.addEventListener("click", checkEnglishTestSet);
  document.querySelector("#english-reset-score")?.addEventListener("click", resetEnglishScore);
  updateEnglishCbtTimer();
}

initEnglishTest();
