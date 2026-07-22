(() => {
  const ROOT_ID = "fab-security-root";
  const CHECKLIST_KEY = "projectUniverseLineSecurityChecklistV1";
  const DRILL_KEY = "projectUniverseLineSecurityDrillV1";

  const securitySources = [
    {
      grade: "공개자료로 확인됨",
      title: "Samsung Semiconductor technology security",
      summary: "삼성 반도체 공개 지속가능경영 자료는 반도체 핵심기술을 국가핵심·전략기술로 보고, 관리책임자와 최종승인 체계를 둔다고 설명합니다. 고객사 정보는 NDA 기반 제한 접근과 메일 필터링으로 관리한다고 공개합니다.",
      url: "https://www.samsung.com/sec/sustainability/popup/popup_doc/AYS8Nu9qWTkAIyC3/"
    },
    {
      grade: "공개자료로 확인됨",
      title: "Samsung Global Code of Conduct",
      summary: "개인정보와 협력사·고객 정보를 보호하고, 정상 업무 목적 외 제3자에게 공개하지 않는 원칙을 제시합니다. 지식재산과 기밀정보도 사전 허가 없이 외부 공개하지 않는 방향입니다.",
      url: "https://semiconductor.samsung.com/sustainability/highlights/downloads/global-code-of-conduct/"
    },
    {
      grade: "공개자료로 확인됨",
      title: "Samsung Electronics Supplier Code of Conduct Guide",
      summary: "협력회사와 하위 협력회사는 법규·고객 요구사항을 파악하고 교육·리스크관리·문서기록·시정조치 체계를 유지해야 한다고 설명합니다. 문서와 기록은 기밀 관리와 접근 제한이 필요합니다.",
      url: "https://www.samsung.com/sec/sustainability/policy-file/AYXKIJO6DhEAIx9L/Samsung_Electronics_Supplier_Code_of_Conduct_Guide_kr.pdf"
    },
    {
      grade: "공개자료로 확인됨",
      title: "Samsung Austin Semiconductor EHS / Security certifications",
      summary: "Samsung Austin Semiconductor 공개 페이지는 ISO 14001, ISO 45001, ISO 50001과 함께 정보보안 관련 ISO/IEC 27001 체계를 표시합니다. 평택 라인 규정 자체를 의미하지는 않지만 삼성 반도체 Fab 운영에서 EHS와 Security가 관리 축임을 보여줍니다.",
      url: "https://semiconductor.samsung.com/sas/environmental-health-and-safety/"
    },
    {
      grade: "공개자료로 확인됨",
      title: "NIS national core technology / semiconductor list",
      summary: "국정원과 산업보안 정보도서관은 국가핵심기술을 해외 유출 시 국가안보와 국민경제에 중대한 악영향을 줄 수 있는 산업기술로 설명하며, 반도체 공정·소자·웨이퍼 관련 항목을 포함합니다.",
      url: "https://www.nis.go.kr/AF/1_5_2.do"
    }
  ];

  const unknownBoundaries = [
    "평택 사업장별 출입증 발급 절차, escort 방식, 휴대폰/카메라 봉인 방식",
    "클린룸 반입 가능 물품, 노트북·USB·저장매체·계측기 반입 승인 기준",
    "사진·동영상·스크린샷·로그 반출 승인 절차와 승인자",
    "라인별 네트워크 접속, 계정 권한, 장비 로그 export 절차",
    "라인별 emergency route, shelter, gas alarm response detail",
    "tool serial, lot ID, wafer map, recipe, manual, setpoint의 마스킹 기준",
    "고객/Applied/Samsung 사이의 NDA와 보고 채널"
  ];

  const beforeEntry = [
    ["Badge / escort", "출입증, escort 필요 여부, 작업 가능 구역, 이동 동선을 먼저 확인합니다."],
    ["Training proof", "보안·EHS·클린룸 교육 이수 상태를 확인하고, 모르면 입장 전 질문합니다."],
    ["Device rule", "휴대폰, 카메라, 노트북, USB, 저장매체, 개인 이어폰·스마트워치 규정을 site briefing으로 확인합니다."],
    ["Data rule", "사진, screenshot, wafer map, log file, alarm export, service report 첨부 가능 범위를 고객 owner에게 확인합니다."],
    ["Need-to-know", "내 업무에 필요한 정보만 요청하고, 알 필요가 없는 recipe·고객 공정 정보는 받지 않습니다."],
    ["Approved channel", "메일, 고객 시스템, ticket, service report 등 승인된 채널만 사용합니다. 개인 메신저·개인 메일·개인 클라우드는 금지로 취급합니다."]
  ];

  const inLine = [
    ["No silent capture", "사진·동영상·스크린샷은 '기술적으로 가능'해도 승인 없이는 하지 않습니다."],
    ["No shadow copy", "manual, drawing, P&ID, wafer map, log를 개인 저장소로 복사하지 않습니다."],
    ["Mask identifiers", "개인 학습 기록에는 전체 serial, lot ID, wafer ID, 정확한 라인/위치, 고객명 조합을 남기지 않습니다."],
    ["Control paper", "출력물, 메모, label 사진, punch list는 반납·폐기·보관 경계를 명확히 합니다."],
    ["Speak carefully", "식당, 셔틀, 흡연장, 외부 통화에서 고객 라인·공정·이슈·일정 정보를 말하지 않습니다."],
    ["Stop on doubt", "촬영/반출/공유/접속/반입이 애매하면 진행하지 말고 고객 보안 owner와 senior CE에게 확인합니다."]
  ];

  const afterWork = [
    ["Clean closeout", "작업 종료 후 반출 승인 없는 파일, 사진, 출력물, 임시 메모를 정리합니다."],
    ["Report minimal", "보고서는 fact, evidence, impact, next action 중심으로 쓰고 confidential detail은 승인 채널 안에만 둡니다."],
    ["Incident honesty", "실수로 촬영·저장·반출·전송했다면 숨기거나 임의 삭제하지 말고 즉시 manager/security owner에게 사실만 보고합니다."],
    ["Daily log redaction", "개인 Think Tank에는 site-specific detail 대신 'Load Lock pumpdown evidence missing'처럼 학습 가능한 추상화로 남깁니다."]
  ];

  const forbiddenExamples = [
    ["Recipe / parameter", "공정 recipe, gas flow setpoint, detector setpoint, valve sequence, interlock bypass"],
    ["Site secret", "라인명+장비번호+정확 위치+작업시간 조합, 출입 동선, 보안 절차 detail"],
    ["Customer data", "wafer map 원본, lot/wafer ID 전체, 고객 process result 원본, customer confidential 문서"],
    ["Access data", "badge 정보, 계정, password, token, VPN, network setting, QR/pass image"],
    ["Media", "승인 없는 사진, 동영상, screenshot, 음성녹음, 개인 클라우드 업로드"],
    ["Documents", "manual 원문, drawing/P&ID 원본, checklist 원본, SDS binder 내부 원문 무단 복사"]
  ];

  const allowedExamples = [
    ["구조화된 학습 기록", "LL pumpdown issue에서 pressure trend와 owner 확인이 필요했다."],
    ["비식별 subsystem 패턴", "gas readiness, exhaust/abatement owner, interlock evidence가 자주 막힌다."],
    ["공개자료 기반 요약", "Samsung 공개자료는 NDA, 제한 접근, 정보보호 교육, 문서 접근 제한을 강조한다."],
    ["질문 목록", "사진 첨부 가능 범위, log export 승인자, service report 첨부 기준을 입장 전 확인한다."],
    ["고객 보고 초안", "확인된 사실, 영향 범위, 다음 evidence, owner, ETA만 포함하고 기밀 수치는 제외한다."]
  ];

  const quizzes = [
    {
      q: "고객 tool alarm 화면을 개인 휴대폰으로 찍어 senior에게 보내면 빠를 것 같다. 좋은 행동은?",
      options: ["사진을 찍고 개인 메신저로 보낸다", "촬영/반출 승인과 공식 채널을 먼저 확인한다", "화면 전체를 찍되 고객명만 가린다"],
      correct: 1,
      why: "공개자료상 고객 정보와 기밀정보 보호가 핵심 원칙입니다. 사진·스크린샷은 site rule과 승인 채널이 우선입니다."
    },
    {
      q: "개인 Think Tank에 오늘 이슈를 남기고 싶다. 가장 안전한 기록은?",
      options: ["정확한 라인명, serial, lot ID, wafer map 수치를 모두 쓴다", "recipe와 setpoint를 복사해 둔다", "비식별 subsystem, 증상, evidence missing, next action만 남긴다"],
      correct: 2,
      why: "학습에는 구조와 사고 패턴이면 충분합니다. serial, lot, recipe, customer result 원본은 승인 없는 개인 저장 대상이 아닙니다."
    },
    {
      q: "작업 중 보안 규칙이 애매하다. 일정이 급하다. 우선순위는?",
      options: ["나중에 확인하고 먼저 진행", "고객 보안 owner 또는 senior CE에게 확인하고 hold", "다른 사람이 했던 방식대로 따라 함"],
      correct: 1,
      why: "불명확한 보안·EHS 경계는 일정이 아니라 승인된 owner 확인이 우선입니다."
    },
    {
      q: "협력사/고객 기술자료를 요청해야 하는 상황이다. 공개자료 기반 원칙은?",
      options: ["필요하면 구두로 받아도 된다", "목적, 동의, NDA, 승인 채널, 사용 후 처리 경계를 확인한다", "사진으로 찍어두면 추후 보고가 쉽다"],
      correct: 1,
      why: "삼성 기술자료 가이드와 행동규범은 정당한 목적, 동의/NDA, 접근 제한, 목적 외 사용 금지를 강조합니다."
    }
  ];

  const redactionPatterns = [
    [/recipe|레시피/i, "recipe / process parameter"],
    [/setpoint|셋포인트|detector/i, "detector or process setpoint"],
    [/valve sequence|밸브|시퀀스/i, "valve sequence"],
    [/interlock.*bypass|bypass|바이패스/i, "interlock bypass"],
    [/serial|s\/n|시리얼/i, "full tool serial"],
    [/lot\s*id|wafer\s*id|wafer map|로트|웨이퍼맵/i, "lot/wafer/map identifier"],
    [/photo|camera|screenshot|capture|사진|촬영|캡처|스크린샷|카메라/i, "photo/screenshot/capture"],
    [/drawing|p&id|도면/i, "drawing or P&ID"],
    [/manual|매뉴얼/i, "equipment manual text"],
    [/usb|cloud|gmail|kakao|카카오|개인메일|개인 클라우드/i, "unapproved storage or messenger"],
    [/badge|pass|출입증|배지|qr/i, "site access credential"],
    [/password|token|비밀번호|토큰|계정/i, "account/security secret"]
  ];

  function readJson(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
    } catch {
      return fallback;
    }
  }

  function writeJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function renderList(items) {
    return `<ul>${items.map(item => Array.isArray(item)
      ? `<li><b>${escapeHtml(item[0])}</b><span>${escapeHtml(item[1])}</span></li>`
      : `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
  }

  function renderSources() {
    return securitySources.map(source => `
      <article class="fab-security-source">
        <span>${escapeHtml(source.grade)}</span>
        <b>${escapeHtml(source.title)}</b>
        <p>${escapeHtml(source.summary)}</p>
        <a href="${escapeHtml(source.url)}" target="_blank" rel="noreferrer">public source</a>
      </article>
    `).join("");
  }

  function checklistState() {
    return readJson(CHECKLIST_KEY, {});
  }

  function checklistItems() {
    return [
      "입장 전 보안/EHS 교육과 작업 허가 범위 확인",
      "badge, escort, 이동 가능 구역, emergency route 확인",
      "휴대폰/카메라/노트북/USB/저장매체 반입 규칙 확인",
      "사진, screenshot, log export, wafer map 첨부 가능 여부 확인",
      "개인 메신저/개인 메일/개인 클라우드 사용 금지 확인",
      "service report와 고객 보고 채널 확인",
      "Think Tank 기록은 비식별 학습 요약만 남기기로 확인",
      "애매하면 hold하고 고객 owner/senior CE에게 확인하기로 결정"
    ];
  }

  function renderChecklist() {
    const state = checklistState();
    const items = checklistItems();
    const done = items.filter((_, index) => state[index]).length;
    return `
      <article class="fab-security-panel">
        <div class="fab-security-head">
          <div>
            <p class="eyebrow">Pre-entry checklist</p>
            <h3>삼성 Fab 보안 습관 체크</h3>
          </div>
          <span>${done}/${items.length}</span>
        </div>
        <div class="fab-security-checklist">
          ${items.map((item, index) => `
            <label>
              <input type="checkbox" data-security-check="${index}" ${state[index] ? "checked" : ""} />
              <span>${escapeHtml(item)}</span>
            </label>
          `).join("")}
        </div>
      </article>
    `;
  }

  function analyzeRedaction(text) {
    const hits = redactionPatterns
      .filter(([pattern]) => pattern.test(text))
      .map(([, label]) => label);
    const uniqueHits = [...new Set(hits)];
    const risk = uniqueHits.length >= 4 ? "high" : uniqueHits.length ? "medium" : "low";
    const advice = uniqueHits.length
      ? [
        "원문을 저장하지 말고, subsystem/evidence/next action만 남기세요.",
        "사진·스크린샷·도면·wafer map·log export는 공식 승인 채널 안에서만 다루세요.",
        "고객/라인/장비/lot이 조합되어 식별될 수 있으면 더 강하게 마스킹하세요."
      ]
      : ["현재 텍스트에서는 강한 보안 키워드가 보이지 않습니다. 그래도 site-specific detail은 넣지 마세요."];
    return { hits: uniqueHits, risk, advice };
  }

  function renderRedactionBox(result = null) {
    return `
      <article class="fab-security-panel">
        <div class="fab-security-head">
          <div>
            <p class="eyebrow">Redaction trainer</p>
            <h3>기록 전 보안 문장 검사</h3>
          </div>
          ${result ? `<span class="sec-risk ${result.risk}">${result.risk.toUpperCase()}</span>` : ""}
        </div>
        <p>실제 고객자료를 붙여넣지 말고, 본인이 쓰려는 비식별 문장만 테스트하세요.</p>
        <textarea id="security-redaction-input" placeholder="예: 오늘 LL pumpdown evidence가 부족했다. pressure trend와 owner 확인이 필요했다."></textarea>
        <div class="field-actions">
          <button class="secondary" type="button" id="security-redaction-run">민감 키워드 검사</button>
          <button class="secondary" type="button" id="security-redaction-clear">비우기</button>
        </div>
        <div id="security-redaction-result">
          ${result ? `
            <div class="fab-security-result">
              <b>Detected: ${escapeHtml(result.hits.join(", ") || "none")}</b>
              ${renderList(result.advice)}
            </div>
          ` : ""}
        </div>
      </article>
    `;
  }

  function drillState() {
    return readJson(DRILL_KEY, { attempts: 0, correct: 0, answers: {} });
  }

  function renderQuiz() {
    const state = drillState();
    return `
      <article class="fab-security-panel fab-security-quiz">
        <div class="fab-security-head">
          <div>
            <p class="eyebrow">Decision drill</p>
            <h3>보안 판단 훈련</h3>
          </div>
          <span>${state.correct}/${state.attempts || 0}</span>
        </div>
        ${quizzes.map((quiz, quizIndex) => `
          <section class="security-quiz-card">
            <b>${quizIndex + 1}. ${escapeHtml(quiz.q)}</b>
            <div class="security-options">
              ${quiz.options.map((option, optionIndex) => {
                const selected = state.answers[quizIndex] === optionIndex;
                const cls = selected ? (optionIndex === quiz.correct ? "correct" : "wrong") : "";
                return `<button class="secondary ${cls}" type="button" data-security-quiz="${quizIndex}" data-security-answer="${optionIndex}">${escapeHtml(option)}</button>`;
              }).join("")}
            </div>
            ${state.answers[quizIndex] !== undefined ? `<p class="security-explain">${escapeHtml(quiz.why)}</p>` : ""}
          </section>
        `).join("")}
      </article>
    `;
  }

  function render() {
    const root = document.getElementById(ROOT_ID);
    if (!root) return;
    root.innerHTML = `
      <section class="fab-security-console no-term">
        <article class="fab-security-hero">
          <div>
            <p class="eyebrow">Samsung Fab Security Compliance</p>
            <h2>보안 규정은 외우는 목록이 아니라 멈출 줄 아는 습관입니다</h2>
            <p>아래 내용은 공개자료 기반 학습용입니다. 평택 라인별 실제 출입, 촬영, 반입, 로그 반출, 계정, emergency rule은 삼성/고객 site briefing과 공식 승인 문서가 항상 우선입니다.</p>
          </div>
          <div class="fab-security-signal">
            <b>CE 원칙</b>
            <span>Need-to-know</span>
            <span>Approved channel</span>
            <span>Redact before record</span>
            <span>Stop on doubt</span>
          </div>
        </article>

        <div class="fab-security-grid">
          <article class="fab-security-panel">
            <h3>공개자료 근거</h3>
            <div class="fab-security-source-grid">${renderSources()}</div>
          </article>
          <article class="fab-security-panel boundary">
            <h3>공개자료로 단정하면 안 되는 것</h3>
            <p>이 항목들은 공개 웹에 일반론으로 쓰면 안 됩니다. 실제 현장에서는 공식 교육, 보안실, 고객 owner, Applied/Samsung 승인 문서로만 확인합니다.</p>
            ${renderList(unknownBoundaries)}
          </article>
        </div>

        <div class="fab-security-grid thirds">
          <article class="fab-security-panel">
            <h3>입장 전</h3>
            ${renderList(beforeEntry)}
          </article>
          <article class="fab-security-panel">
            <h3>라인 안</h3>
            ${renderList(inLine)}
          </article>
          <article class="fab-security-panel">
            <h3>작업 후</h3>
            ${renderList(afterWork)}
          </article>
        </div>

        <div class="fab-security-grid">
          <article class="fab-security-panel forbid">
            <h3>개인 기록/AI/외부 공유 금지</h3>
            ${renderList(forbiddenExamples)}
          </article>
          <article class="fab-security-panel allow">
            <h3>Think Tank에 남겨도 되는 방식</h3>
            ${renderList(allowedExamples)}
          </article>
        </div>

        <div class="fab-security-grid">
          ${renderChecklist()}
          ${renderRedactionBox()}
        </div>

        ${renderQuiz()}
      </section>
    `;
    bind();
  }

  function bind() {
    document.querySelectorAll("[data-security-check]").forEach(input => {
      input.addEventListener("change", () => {
        const state = checklistState();
        state[input.dataset.securityCheck] = input.checked;
        writeJson(CHECKLIST_KEY, state);
        render();
      });
    });
    document.querySelector("#security-redaction-run")?.addEventListener("click", () => {
      const input = document.querySelector("#security-redaction-input");
      const result = analyzeRedaction(input?.value || "");
      const target = document.querySelector("#security-redaction-result");
      if (target) {
        target.innerHTML = `
          <div class="fab-security-result">
            <b>Risk: ${escapeHtml(result.risk.toUpperCase())} / Detected: ${escapeHtml(result.hits.join(", ") || "none")}</b>
            ${renderList(result.advice)}
          </div>
        `;
      }
    });
    document.querySelector("#security-redaction-clear")?.addEventListener("click", () => {
      const input = document.querySelector("#security-redaction-input");
      if (input) input.value = "";
      const target = document.querySelector("#security-redaction-result");
      if (target) target.innerHTML = "";
    });
    document.querySelectorAll("[data-security-quiz]").forEach(button => {
      button.addEventListener("click", () => {
        const quizIndex = Number(button.dataset.securityQuiz);
        const answerIndex = Number(button.dataset.securityAnswer);
        const state = drillState();
        const previous = state.answers[quizIndex];
        if (previous === undefined) state.attempts += 1;
        if (previous === quizzes[quizIndex].correct) state.correct -= 1;
        state.answers[quizIndex] = answerIndex;
        if (answerIndex === quizzes[quizIndex].correct) state.correct += 1;
        writeJson(DRILL_KEY, state);
        render();
      });
    });
  }

  window.ProjectUniverseLineSecurity = {
    render,
    analyzeRedaction,
    securitySources
  };

  document.addEventListener("DOMContentLoaded", render);
  window.addEventListener("project-universe-unlocked", render);
})();
