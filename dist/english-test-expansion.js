(() => {
  const scenarios = [
    {
      area: "Gas qualification",
      component: "abatement-ready signal",
      issue: "does not match the local abatement panel",
      action: "hold gas introduction",
      owner: "facility owner",
      check: "signal mapping and local panel status",
      risk: "unsafe gas introduction",
      next: "verify the hardwired ready signal with the facility owner"
    },
    {
      area: "Load lock",
      component: "load lock door sensor",
      issue: "is intermittent during pump and vent cycling",
      action: "stop wafer transfer",
      owner: "senior CE",
      check: "door sensor feedback and pneumatic response",
      risk: "an unsafe transfer condition",
      next: "trend the sensor state through three dry cycles"
    },
    {
      area: "Transfer module",
      component: "robot home sensor",
      issue: "does not return to the expected state after homing",
      action: "run a dry robot diagnostic",
      owner: "tool owner",
      check: "home position, encoder feedback, and teach data",
      risk: "wafer handling error",
      next: "compare the robot trace with the baseline"
    },
    {
      area: "Thermal qualification",
      component: "PCW return flow",
      issue: "is below the required range",
      action: "pause temperature qualification",
      owner: "facility water owner",
      check: "valve position, filter restriction, and flow reading",
      risk: "temperature drift during process qualification",
      next: "restore cooling flow before collecting temperature traces"
    },
    {
      area: "Vacuum readiness",
      component: "pumpdown trend",
      issue: "is slower than the reference baseline",
      action: "perform a leak isolation check",
      owner: "vacuum specialist",
      check: "valve status, seal history, gauge reading, and pump health",
      risk: "a false qualification result",
      next: "separate confirmed facts from assumptions"
    },
    {
      area: "Gas box",
      component: "MFC response",
      issue: "does not reach the commanded set point",
      action: "hold flow verification",
      owner: "gas owner",
      check: "upstream pressure, valve state, and calibration record",
      risk: "incorrect process gas delivery",
      next: "compare commanded flow with actual feedback"
    },
    {
      area: "Electrical control",
      component: "24V interlock loop",
      issue: "drops when the cabinet door is touched",
      action: "lock out power before inspection",
      owner: "authorized electrical owner",
      check: "terminal tightness and DVM voltage at each node",
      risk: "unexpected energy release",
      next: "verify zero energy before opening the panel"
    },
    {
      area: "Facility hook-up",
      component: "CDA supply pressure",
      issue: "is unstable during valve actuation",
      action: "delay pneumatic qualification",
      owner: "facility gas owner",
      check: "supply regulator, pressure drop, and local gauge",
      risk: "unstable valve timing",
      next: "stabilize CDA pressure before repeating the test"
    },
    {
      area: "Purge sequence",
      component: "nitrogen purge line",
      issue: "has not completed the required purge time",
      action: "do not open the process gas line",
      owner: "senior CE",
      check: "purge timer, valve status, and exhaust availability",
      risk: "residual gas in the line",
      next: "complete the purge and document the timestamp"
    },
    {
      area: "EPI process chamber",
      component: "lamp power feedback",
      issue: "fluctuates during warm-up",
      action: "hold thermal baseline collection",
      owner: "thermal system owner",
      check: "power supply feedback, lamp zone response, and cooling status",
      risk: "poor temperature uniformity",
      next: "repeat warm-up after confirming stable feedback"
    },
    {
      area: "Qualification data",
      component: "baseline particle count",
      issue: "is above the customer limit",
      action: "stop release to production",
      owner: "customer process owner",
      check: "chamber condition, transfer path, and recent maintenance history",
      risk: "yield loss after release",
      next: "run a controlled particle recovery plan"
    },
    {
      area: "Customer communication",
      component: "punch list",
      issue: "has two open safety items",
      action: "escalate before handover",
      owner: "project lead",
      check: "open items, due owners, and acceptance criteria",
      risk: "unclear ownership after handoff",
      next: "send an update with facts, risks, and ETA"
    },
    {
      area: "Software readiness",
      component: "recipe permission",
      issue: "does not allow the test recipe to be edited",
      action: "request customer approval",
      owner: "customer account owner",
      check: "user role, recipe revision, and change-control requirement",
      risk: "unauthorized recipe change",
      next: "confirm the approved revision before running the test"
    },
    {
      area: "Safety",
      component: "exhaust flow switch",
      issue: "is bypassed for maintenance",
      action: "do not start hazardous gas work",
      owner: "EHS and facility owner",
      check: "bypass status, permit condition, and alarm response",
      risk: "loss of protective exhaust function",
      next: "remove the bypass only through the approved procedure"
    },
    {
      area: "Install schedule",
      component: "site readiness checklist",
      issue: "is missing the final PCW sign-off",
      action: "hold the dependent task",
      owner: "site coordinator",
      check: "signed checklist, timestamp, and required specification",
      risk: "starting qualification with incomplete facilities",
      next: "confirm sign-off before tool energization"
    },
    {
      area: "Troubleshooting",
      component: "pressure gauge reading",
      issue: "does not match the mechanical gauge",
      action: "verify instrumentation before drawing conclusions",
      owner: "senior CE",
      check: "gauge zero, calibration status, and reference reading",
      risk: "wrong root cause selection",
      next: "record both readings and compare with the trend"
    },
    {
      area: "Chamber matching",
      component: "PM2 thickness result",
      issue: "is shifted compared with PM1 and PM3",
      action: "review chamber matching data",
      owner: "process owner",
      check: "recipe revision, temperature trace, and gas flow response",
      risk: "process mismatch across chambers",
      next: "run a controlled comparison before adjustment"
    },
    {
      area: "Mechanical install",
      component: "tool leveling record",
      issue: "is outside the acceptance range at one corner",
      action: "adjust leveling before final sign-off",
      owner: "install lead",
      check: "leveling points, floor condition, and anchor status",
      risk: "transfer misalignment",
      next: "re-measure after mechanical adjustment"
    },
    {
      area: "Preventive maintenance",
      component: "O-ring inspection",
      issue: "shows compression marks after replacement",
      action: "replace the seal and repeat leak check",
      owner: "maintenance owner",
      check: "seal orientation, surface condition, and torque sequence",
      risk: "slow leak after pumpdown",
      next: "document the part number and leak-check result"
    },
    {
      area: "Shift handover",
      component: "handover note",
      issue: "does not separate completed and open actions",
      action: "rewrite the update clearly",
      owner: "shift lead",
      check: "completed work, open risks, next owner, and ETA",
      risk: "the next shift repeating work or missing a hold point",
      next: "send a structured handover message"
    }
  ];

  const grammarFrames = [
    s => ({
      stem: `If the ${s.component} ___ verified, we should ${s.action}.`,
      correct: "is not",
      distractors: ["was not", "will not", "has not"],
      explain: "현재 조건을 말할 때 if절에는 현재형을 씁니다. 현장 보고에서는 조건과 조치를 짧게 연결하는 패턴이 중요합니다."
    }),
    s => ({
      stem: `The ${s.component} has been under review ___ the last update.`,
      correct: "since",
      distractors: ["for", "during", "while"],
      explain: "since는 시작 시점, for는 기간입니다. 'since the last update'는 마지막 업데이트 이후라는 뜻입니다."
    }),
    s => ({
      stem: `The customer asked us ___ ${s.check} before moving to the next step.`,
      correct: "to verify",
      distractors: ["verify", "verifying", "verified"],
      explain: "ask someone to do 구조입니다. 고객이 우리에게 무엇을 하라고 요청했다는 문장입니다."
    }),
    s => ({
      stem: `The task ___ until the ${s.owner} confirms the condition.`,
      correct: "will be held",
      distractors: ["will hold", "holding", "has hold"],
      explain: "작업이 보류되는 것이므로 수동태 will be held가 맞습니다."
    }),
    s => ({
      stem: `Before we started the test, the ${s.component} ___ checked by the responsible owner.`,
      correct: "had been",
      distractors: ["has been", "is being", "will be"],
      explain: "과거의 한 시점보다 더 먼저 완료된 수동 동작은 had been으로 표현합니다."
    }),
    s => ({
      stem: `Neither the checklist nor the ${s.component} ___ ready for release.`,
      correct: "is",
      distractors: ["are", "were", "have been"],
      explain: "neither A nor B에서는 가까운 주어 B에 동사를 맞춥니다. component는 단수라 is가 맞습니다."
    }),
    s => ({
      stem: `We cannot proceed ___ the risk of ${s.risk} is controlled.`,
      correct: "unless",
      distractors: ["although", "because", "despite"],
      explain: "unless는 '~하지 않는 한'입니다. 조건이 충족되지 않으면 진행하지 않는다는 안전 문장입니다."
    }),
    s => ({
      stem: `The issue was resolved after the team ___ ${s.check}.`,
      correct: "verified",
      distractors: ["verifies", "to verify", "verifying"],
      explain: "after 뒤 절에서 과거에 수행한 조치를 말하므로 verified가 자연스럽습니다."
    }),
    s => ({
      stem: `Please let me know ___ the ${s.owner} can confirm the next action.`,
      correct: "when",
      distractors: ["what", "whose", "who"],
      explain: "확인 가능한 시간을 묻는 간접의문문입니다. when이 맞습니다."
    }),
    s => ({
      stem: `The current evidence points ___ a problem with the ${s.component}.`,
      correct: "to",
      distractors: ["for", "with", "at"],
      explain: "point to는 '증거가 ~을 가리키다'라는 뜻입니다. 문제 원인을 말할 때 자주 쓰는 표현입니다."
    }),
    s => ({
      stem: `The ${s.component} should be checked ___ the tool is released to the customer.`,
      correct: "before",
      distractors: ["during", "unless", "because"],
      explain: "고객 릴리즈 이전에 해야 하는 선행 조건이므로 before가 맞습니다."
    }),
    s => ({
      stem: `If we find new evidence, we ___ update the punch list immediately.`,
      correct: "will",
      distractors: ["would have", "had", "were"],
      explain: "실제 가능성이 있는 미래 조건문입니다. if 현재형 + will 동사원형 패턴입니다."
    })
  ];

  const grammar = scenarios.flatMap(s => grammarFrames.map(frame => frame(s)));

  const vocabTerms = [
    ["interlock", "a safety condition that prevents unsafe operation", "a decorative cover", "a customer invoice", "a normal recipe step"],
    ["baseline", "reference data used for comparison", "a random alarm", "a spare tool cart", "a customer badge"],
    ["escalate", "raise an issue to the correct higher owner", "hide an issue", "delete a log file", "skip a procedure"],
    ["ETA", "estimated time of arrival or next action", "emergency tool alarm only", "electrical training area", "equipment tax amount"],
    ["punch list", "open items that must be closed before handover", "a list of lunch orders", "a wafer map", "a gas bottle label"],
    ["as-built", "the actual installed condition after work", "the original plan only", "a spare-part catalog", "a training video"],
    ["hold point", "a required stop until a condition is verified", "a place to store gloves", "a faster recipe mode", "a power cable type"],
    ["sign-off", "formal confirmation or approval", "a tool power failure", "a pressure drop", "a robot home error"],
    ["handover", "passing status and ownership to the next person or shift", "removing a panel", "calibrating an MFC", "cleaning a wafer"],
    ["confirmed fact", "information verified by evidence", "a guess from memory", "a rumor from another shift", "a preferred conclusion"],
    ["assumption", "an unverified idea that still needs evidence", "a completed approval", "a passed leak check", "a final customer release"],
    ["root cause", "the underlying reason for a problem", "the first email in a thread", "a protective cover", "a normal gas flow"],
    ["symptom", "what is observed before the root cause is confirmed", "the final approval", "a tool serial number", "a customer meal request"],
    ["mitigation", "an action that reduces risk", "a permanent badge", "a shipment label", "an unrelated meeting"],
    ["containment", "a temporary action to prevent wider impact", "a pump lubricant", "a test wafer carrier", "a daily commute route"],
    ["waiver", "documented permission to deviate from a normal requirement", "a pressure sensor", "a robot command", "a cleanroom shoe cover"],
    ["specification", "the required measurable limit or condition", "a casual preference", "a meeting room", "a spare screw"],
    ["out of spec", "outside the required limit", "ready for release", "already approved", "not measured yet"],
    ["within range", "inside the required limit", "missing from the checklist", "physically damaged", "not connected to power"],
    ["trace", "a recorded trend of a signal or parameter", "a customer badge", "a gas cylinder rack", "an email signature"],
    ["trend", "how data changes over time", "a tool color", "a type of glove", "a training certificate"],
    ["drift", "slow movement away from the expected value", "a completed installation", "a perfect baseline", "a shipping document"],
    ["spike", "a sudden short increase in data", "a normal approval", "a cleanroom chair", "a recipe owner"],
    ["offset", "a consistent difference from a reference", "an emergency stop", "a missing wafer", "a badge scan"],
    ["calibration", "adjusting or verifying measurement accuracy", "opening a crate", "changing a shift", "sending a meeting invite"],
    ["verification", "checking that a condition is true", "guessing the cause", "hiding the issue", "changing the owner"],
    ["validation", "proving that the process meets the intended requirement", "turning off the monitor", "moving a chair", "printing a label"],
    ["qualification", "formal testing before acceptance or release", "daily lunch break", "tool decoration", "uncontrolled operation"],
    ["release", "allowing the tool or step to move forward after requirements are met", "dropping a wafer", "unplugging a cable", "losing data"],
    ["abort", "stop a sequence before completion", "approve final results", "increase flow secretly", "skip documentation"],
    ["bypass", "temporarily override a protective condition under control", "a normal production recipe", "a cleanroom wall", "a wafer cassette"],
    ["lockout", "isolating hazardous energy before work", "logging into email", "starting a recipe", "printing a report"],
    ["energize", "apply power to equipment", "remove all power", "write an email", "replace a badge"],
    ["de-energize", "remove power from equipment", "increase tool speed", "approve a punch list", "start a wafer transfer"],
    ["purge", "flow inert gas to remove residual gas", "tighten a bolt", "edit a resume", "move a toolbox"],
    ["vent", "bring a vacuum volume back toward atmospheric pressure", "start a pumpdown", "lower the temperature", "send a customer invoice"],
    ["pumpdown", "remove gas to reduce pressure", "increase pressure with CDA", "load a FOUP", "approve a recipe"],
    ["leak check", "test whether gas enters or escapes unintentionally", "count badges", "measure floor color", "send a meeting note"],
    ["set point", "the commanded target value", "a random actual value", "a customer title", "a spare cable"],
    ["feedback", "the measured response returned by a sensor or controller", "a cafeteria review", "a shipping box", "a badge holder"],
    ["MFC", "mass flow controller for gas flow control", "main facility cabinet only", "manual floor checker", "monthly finance code"],
    ["PCW", "process cooling water", "personal cleanroom wallet", "primary customer wafer", "pump control warning only"],
    ["CDA", "clean dry air", "chamber data archive only", "customer delivery approval", "critical design alarm"],
    ["N2", "nitrogen used for purge or inerting", "a power cable type", "a software license", "a floor level"],
    ["abatement", "system that treats hazardous exhaust before release", "tool leveling screw", "wafer carrier", "operator chair"],
    ["facility hook-up", "connection of required site utilities to the tool", "writing a resume", "changing a password", "ordering lunch"],
    ["acceptance criteria", "conditions that must be met for approval", "random preferences", "a personal checklist only", "unmeasured guesses"],
    ["owner", "the person or team responsible for an action", "a tool alarm sound", "a spare O-ring", "a gas pressure unit"],
    ["action item", "a specific task with an owner and due time", "a finished movie", "a color code", "a cleanroom window"],
    ["timestamp", "recorded date and time of an event", "a tool nickname", "a pressure unit", "an electrical connector"]
  ];

  const vocabulary = vocabTerms.map(([term, correct, ...distractors]) => ({
    stem: `In a field-service or CBT sentence, what does "${term}" most likely mean?`,
    correct,
    distractors,
    explain: `"${term}"는 CE 업무 영어에서 자주 나오는 현장/보고 표현입니다. 뜻만 외우지 말고 customer update 문장 안에서 바로 쓰는 연습이 필요합니다.`
  }));

  const reading = scenarios.map(s => ({
    title: `${s.area} Update`,
    passage: `Team, the current status is that we will ${s.action}. The ${s.component} ${s.issue}. The confirmed risk is ${s.risk}. Before we continue, the ${s.owner} must help us verify ${s.check}. The next update will include the verification result, the owner, and the ETA for the next step.`,
    question: "Why is the next step not allowed yet?",
    correct: `Because the ${s.component} ${s.issue} and ${s.check} must be verified.`,
    distractors: [
      "Because the customer has already released the tool to production.",
      "Because the team wants to skip the checklist.",
      "Because all acceptance criteria have already been closed."
    ],
    explain: "독해에서는 세부 단어보다 hold 이유와 next action을 먼저 잡아야 합니다. CE 현장 영어는 원인, 위험, 다음 조치가 핵심입니다."
  }));

  const listening = scenarios.map(s => ({
    title: `${s.area} Voice Note`,
    audioText: `Please hold the next step. The ${s.component} ${s.issue}. We need to check ${s.check} with the ${s.owner}. Do not continue until the risk of ${s.risk} is controlled.`,
    question: "What is the speaker asking the team to do?",
    correct: `Hold the next step and verify ${s.check}.`,
    distractors: [
      "Release the tool immediately.",
      "Ignore the issue and continue the recipe.",
      "Delete the handover note."
    ],
    explain: "듣기에서는 첫 문장 hold/continue/release 같은 동사를 잡으면 정답률이 크게 올라갑니다."
  }));

  const speakingActions = [
    {
      title: "Customer Update",
      makePrompt: s => `Give a 60-second customer update about ${s.component}. Include status, confirmed fact, risk, next action, and ETA.`,
      makePattern: s => `Current status is that we will ${s.action}. The confirmed fact is that the ${s.component} ${s.issue}. The risk is ${s.risk}. Next, we will ${s.next}. I will update you by ___.`,
      makeSample: s => `Current status is that we will ${s.action}. The confirmed fact is that the ${s.component} ${s.issue}. The risk is ${s.risk}, so continuing now is not appropriate. Next, we will ${s.next}. I will update you after the verification is complete.`
    },
    {
      title: "Troubleshooting Plan",
      makePrompt: s => `Explain how you would troubleshoot ${s.component} without blaming the customer or another team.`,
      makePattern: s => `First, I would confirm ___. Then I would check ${s.check}. I would not conclude the root cause until ___.`,
      makeSample: s => `First, I would confirm the symptom and the latest timestamp. Then I would check ${s.check}. I would not conclude the root cause until we have evidence from the data, the tool state, and the responsible owner.`
    },
    {
      title: "Safety Hold",
      makePrompt: s => `Explain why you must hold the work when ${s.component} ${s.issue}.`,
      makePattern: s => `I would hold the work because ___. The possible risk is ${s.risk}. Before restarting, we need ___.`,
      makeSample: s => `I would hold the work because the required condition is not verified. The possible risk is ${s.risk}. Before restarting, we need to verify the condition, document the result, and get the proper approval.`
    },
    {
      title: "Interview Follow-up",
      makePrompt: s => `The interviewer asks, "Can you explain your previous answer in English?" Answer using a CE example about ${s.area}.`,
      makePattern: s => `My previous answer was about ___. In a CE role, ${s.area} matters because ___. A good engineer should ___.`,
      makeSample: s => `My previous answer was about evidence-based troubleshooting. In a CE role, ${s.area} matters because a small unchecked condition can affect safety, schedule, and customer trust. A good engineer should communicate facts clearly and verify the next action before moving forward.`
    },
    {
      title: "OPIc-Style Problem Solving",
      makePrompt: s => `Describe a time when a technical task had to be delayed. Use ${s.area} as your example.`,
      makePattern: s => `The situation was ___. The problem was ___. I decided to ___. As a result, ___.`,
      makeSample: s => `The situation was an installation task with an open readiness item. The problem was that the condition was not verified. I decided to stop the task, communicate the risk, and ask the right owner to confirm the data. As a result, the team avoided an unsafe or unclear release.`
    }
  ];

  const speaking = scenarios.flatMap(s => speakingActions.map(action => ({
    title: `${action.title}: ${s.area}`,
    prompt: action.makePrompt(s),
    pattern: action.makePattern(s),
    sample: action.makeSample(s)
  })));

  const interviewSpeaking = [
    ["Self Introduction", "Introduce yourself for a Customer Engineer role. Mention your technical background, safety mindset, and learning attitude.", "I studied ___. I am interested in field service because ___. In the fab, I will focus on safety, evidence, and communication.", "I studied mechanical and electrical fundamentals, and I enjoy solving technical problems step by step. I am interested in field service because the role connects equipment knowledge with customer communication. In the fab, I will focus on safety, evidence, and clear reporting."],
    ["Strength", "Describe one strength that helps you as a CE candidate.", "One of my strengths is ___. For example, ___. This helps a CE because ___.", "One of my strengths is structured problem solving. For example, I separate confirmed facts from assumptions before taking action. This helps a CE because field issues require safety, evidence, and clear ownership."],
    ["Weakness", "Describe one weakness and how you are improving it.", "One weakness is ___. To improve it, I ___. I track progress by ___.", "One weakness is that I sometimes need more time to speak English confidently. To improve it, I practice short field updates every day. I track progress by recording my answers and checking whether I can explain the status, risk, and next action."],
    ["Failure", "Talk about a mistake or failure and what you learned.", "The mistake was ___. I corrected it by ___. I learned that ___.", "The mistake was not asking for confirmation early enough. I corrected it by checking the owner and requirement again. I learned that communication is part of engineering, especially when safety or schedule can be affected."],
    ["Why Applied Materials", "Explain why you want to work at Applied Materials.", "I want to work at Applied Materials because ___. The CE role fits me because ___.", "I want to work at Applied Materials because semiconductor equipment requires deep technical learning and customer-facing problem solving. The CE role fits me because I like hands-on troubleshooting, structured communication, and continuous learning."],
    ["Work Under Pressure", "Explain how you handle pressure during a line issue.", "When I am under pressure, I first ___. Then I ___. I avoid ___.", "When I am under pressure, I first confirm safety and the current facts. Then I communicate the next action and owner. I avoid guessing the root cause before checking evidence."],
    ["Customer Conflict", "Explain how you would respond if a customer is upset about a delay.", "I would first ___. Then I would ___. I would provide ___.", "I would first listen and acknowledge the impact. Then I would explain confirmed facts, open risks, and the next action. I would provide an ETA and update the customer even if the final answer is not ready."],
    ["Learning Plan", "Explain how you will grow from junior CE to senior CE.", "First, I will master ___. Then, I will build ___. Long term, I want to ___.", "First, I will master safety rules, tool architecture, and basic troubleshooting. Then, I will build strong evidence-based communication and process understanding. Long term, I want to become an engineer who can lead complex installs and help customers solve problems confidently."]
  ].map(([title, prompt, pattern, sample]) => ({ title, prompt, pattern, sample }));

  window.AMK_ENGLISH_EXPANSION = {
    grammar,
    vocabulary,
    reading,
    listening,
    speaking: [...speaking, ...interviewSpeaking]
  };
})();
