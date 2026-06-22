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
  checked: false,
  timer: null,
  seconds: 0,
  mode: "prep",
  set: [],
  lastSync: ""
};

const ENGLISH_ATTEMPTS_KEY = "amkEnglishAttempts";
const ENGLISH_RECORDS_KEY = "amkEnglishSessionRecords";
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

function takeEnglishTest(items, count) {
  return shuffleEnglishTest(items).slice(0, count);
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
  if (Array.isArray(item.options) && Number.isInteger(item.answer)) return { ...item };
  const correct = String(item.correct || "");
  const distractors = Array.isArray(item.distractors) ? takeEnglishTest(item.distractors, 3) : [];
  const options = shuffleEnglishTest([correct, ...distractors]).filter(Boolean).slice(0, 4);
  return {
    ...item,
    options,
    answer: Math.max(0, options.indexOf(correct))
  };
}

function makeEnglishItems(items, count, prefix, type) {
  return takeEnglishTest(items, count).map((item, index) => ({
    ...normalizeEnglishQuestion(item),
    type,
    id: `${prefix}-${index}-${Date.now()}-${Math.random().toString(16).slice(2)}`
  }));
}

function makeEnglishTestSet() {
  const grammar = makeEnglishItems(englishBank(amkGrammarBank, "grammar"), ENGLISH_SET_COUNTS.grammar, "grammar", "Grammar");
  const vocab = makeEnglishItems(englishBank(amkVocabBank, "vocabulary"), ENGLISH_SET_COUNTS.vocabulary, "vocab", "Vocabulary");
  const reading = makeEnglishItems(englishBank(amkReadingBank, "reading"), ENGLISH_SET_COUNTS.reading, "reading", "Reading");
  const listening = makeEnglishItems(englishBank(amkListeningBank, "listening"), ENGLISH_SET_COUNTS.listening, "listening", "Listening");
  const speaking = makeEnglishItems(englishBank(amkSpeakingBank, "speaking"), ENGLISH_SET_COUNTS.speaking, "speaking", "Speaking");
  return [...grammar, ...vocab, ...reading, ...listening, ...speaking];
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

function getEnglishRecords() {
  try {
    return JSON.parse(localStorage.getItem(ENGLISH_RECORDS_KEY) || "[]");
  } catch {
    return [];
  }
}

function makeEnglishRecordId() {
  if (window.crypto?.randomUUID) return `english-${crypto.randomUUID()}`;
  return `english-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function saveEnglishRecordLocally(record) {
  const records = getEnglishRecords();
  records.unshift(record);
  localStorage.setItem(ENGLISH_RECORDS_KEY, JSON.stringify(records.slice(0, 100)));
}

async function pushEnglishRecordToVault(record) {
  if (!location.protocol.startsWith("http")) return;
  try {
    const response = await fetch("/api/entries", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record)
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    englishTestState.lastSync = `DB 저장 완료 ${new Date().toLocaleTimeString()}`;
  } catch {
    englishTestState.lastSync = "DB 저장 대기: 브라우저에는 기록됨";
  }
  renderEnglishTestProfile();
}

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

function renderEnglishTestProfile() {
  const target = document.querySelector("#english-test-profile");
  if (!target) return;
  const score = getEnglishScore();
  const latestRecord = getEnglishRecords()[0];
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
    </div>
    ${latestRecord ? `<p class="english-sync-note">최근 세트: ${latestRecord.score}/${latestRecord.total} · ${escapeEnglishTest(latestRecord.createdAtLabel || "")}</p>` : ""}
    ${englishTestState.lastSync ? `<p class="english-sync-note">${escapeEnglishTest(englishTestState.lastSync)}</p>` : ""}
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

function renderObjectiveQuestion(item, index) {
  const resultClass = englishTestState.checked && englishTestState.selected[item.id] === item.answer ? "is-correct" : "";
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
          const correct = englishTestState.checked && optionIndex === item.answer;
          const wrong = englishTestState.checked && picked && optionIndex !== item.answer;
          return `
            <label class="${picked ? "picked" : ""} ${correct ? "correct" : ""} ${wrong ? "wrong" : ""}">
              <input type="radio" name="${item.id}" data-english-answer="${item.id}" value="${optionIndex}" ${picked ? "checked" : ""} />
              <span>${escapeEnglishTest(option)}</span>
            </label>
          `;
        }).join("")}
      </div>
      ${englishTestState.checked ? `<p class="english-explain">${escapeEnglishTest(item.explain)}</p>` : ""}
      ${item.audioText && englishTestState.checked ? `<details class="english-transcript"><summary>스크립트 보기</summary><p>${escapeEnglishTest(item.audioText)}</p></details>` : ""}
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
  const score = objectiveItems.reduce((acc, item) => {
    if (englishTestState.selected[item.id] === item.answer) return acc + 1;
    return acc;
  }, 0);

  target.innerHTML = `
    <section class="english-test-brief">
      <div>
        <p class="eyebrow">Test Analysis</p>
        <h2>1시간 CBT 밀도: 토익식 객관식 + 짧은 오픽/토스식 말하기</h2>
        <p>공개 정보로 보면 시험은 특정 반도체 지식을 묻기보다 실무 영어 기본 체력, 빠른 독해, 듣기 이해, 짧은 말하기 거부감을 확인하는 쪽에 가깝습니다. 이번 세트는 문법 ${ENGLISH_SET_COUNTS.grammar}, 어휘 ${ENGLISH_SET_COUNTS.vocabulary}, 독해 ${ENGLISH_SET_COUNTS.reading}, 듣기 ${ENGLISH_SET_COUNTS.listening}, 말하기 ${ENGLISH_SET_COUNTS.speaking}개로 구성되어 한 번 앉아서 끝까지 풀면 실제 CBT 피로도에 훨씬 가깝습니다.</p>
      </div>
      <div class="english-live-score">
        <span>현재 세트</span>
        <strong>${englishTestState.checked ? `${score}/${objectiveItems.length}` : "미채점"}</strong>
        <small>객관식만 자동 채점</small>
      </div>
    </section>
    <section class="english-section-band">
      <h2>객관식 CBT</h2>
      <p>문법·어휘·독해·듣기가 한 세트 안에 섞여 나옵니다. 먼저 끝까지 풀고 채점한 뒤 해설과 듣기 transcript를 확인하세요. 새 CBT 세트를 누르면 같은 형식에서 다른 현장 시나리오와 보기 조합이 다시 생성됩니다.</p>
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
      englishTestState.selected[input.dataset.englishAnswer] = Number(input.value);
      englishTestState.checked = false;
      renderEnglishTestMain();
    });
  });

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
  const correctCount = objectiveItems.reduce((acc, item) => (
    acc + (englishTestState.selected[item.id] === item.answer ? 1 : 0)
  ), 0);
  objectiveItems.forEach(item => {
    saveEnglishAttempt(englishTestState.selected[item.id] === item.answer);
  });
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
    results: objectiveItems.map(item => ({
      type: item.type,
      prompt: item.question || item.stem,
      selected: Number.isInteger(englishTestState.selected[item.id]) ? item.options[englishTestState.selected[item.id]] : "",
      answer: item.options[item.answer],
      correct: englishTestState.selected[item.id] === item.answer
    })),
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
  englishTestState.checked = false;
  englishTestState.set = makeEnglishTestSet();
  renderEnglishTestMain();
}

function resetEnglishScore() {
  localStorage.removeItem(ENGLISH_ATTEMPTS_KEY);
  localStorage.removeItem(ENGLISH_RECORDS_KEY);
  englishTestState.lastSync = "브라우저 연습 통계 초기화 완료";
  englishTestState.selected = {};
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
  document.querySelector("#english-check-all")?.addEventListener("click", checkEnglishTestSet);
  document.querySelector("#english-reset-score")?.addEventListener("click", resetEnglishScore);
}

initEnglishTest();
