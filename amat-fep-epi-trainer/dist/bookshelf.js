(() => {
  const BOOKSHELF_PAGE_KEY = "projectUniverseBookshelfPages";
  const ACTIVE_BOOK_KEY = "projectUniverseActiveBook";
  const CLIENT_PASS_KEY = "ceTrainerPass";
  const REMOTE_TOKEN_KEY = "epiThinkTankRemoteToken";
  const LOCAL_TOKEN_KEY = "epiThinkTankLocalToken";
  const LOCAL_VAULT_API = "http://127.0.0.1:4180";

  const isLocalBrowserHost = ["127.0.0.1", "localhost", "::1"].includes(location.hostname);
  const isGithubPagesHost = location.hostname.endsWith("github.io");
  const isCloudflareWorkerHost = location.hostname.endsWith(".workers.dev");
  const isPersonalServerProxy = location.pathname.startsWith("/personal-server");
  const REMOTE_VAULT_API = "https://projectuniverse.chang2058.workers.dev";
  const BOOKSHELF_API =
    EPI_VAULT_CONFIG.apiUrl ||
    (isPersonalServerProxy ? `${location.origin}/personal-server` : "") ||
    (isCloudflareWorkerHost ? location.origin : "") ||
    (location.port === "4180" ? location.origin : REMOTE_VAULT_API);

  const BOOKSHELF_BOOKS = [
    {
      id: "career-fep-epi",
      code: "CE",
      shelf: "Career",
      title: "FEP/EPI Customer Engineer Mastery",
      subtitle: "Applied Materials CE 직무, EPI/RTP, 설치, 트러블슈팅, 영어 시험을 한 권의 전문서로 관리",
      privacyLevel: "work-learning",
      purpose: "현장 투입 전후의 학습, 설치 경험, 장비 구조, 고객 커뮤니케이션, qualification 증거를 축적한다.",
      allowed: ["공개 자료 기반 학습노트", "현장 경험의 비식별 요약", "증상-근거-조치-예방 구조", "면접/영어/직무 성장 기록"],
      neverStore: ["고객사 비공개 도면", "장비 serial 전체", "내부 절차서 원문", "계정/출입/보안 정보", "NDA 문서"],
      pageTypes: ["Install note", "Troubleshooting case", "Paper summary", "English drill", "Senior question", "Daily review"],
      aiUse: ["내가 어떤 장비 영역이 약한지 분석", "다음 학습 순서 추천", "반복되는 트러블 패턴 요약"],
      starterQuestions: ["오늘 배운 장비 구조를 한 문장으로 말하면?", "현장에서 다시 보면 위험한 가정은 무엇인가?", "다음번에는 어떤 증거를 먼저 확보해야 하는가?"],
      reviewCadence: "매일 15분, 주 1회 큰 흐름 재정리",
      linkedViews: ["cluster", "install", "electrical", "english-test", "thinktank"]
    },
    {
      id: "life-os",
      code: "OS",
      shelf: "Life",
      title: "Life OS and Decision Ledger",
      subtitle: "가치관, 목표, 습관, 의사결정을 관리하는 인생 운영 장부",
      privacyLevel: "private-summary",
      purpose: "내가 왜 그 선택을 했는지, 무엇을 반복하고 싶은지, 어떤 삶의 방향으로 움직이는지 기록한다.",
      allowed: ["가치관 요약", "목표와 우선순위", "의사결정 이유", "회고", "반복 습관 점검"],
      neverStore: ["주민등록번호", "계정 비밀번호", "개인 인증정보", "타인의 민감한 사생활 원문"],
      pageTypes: ["Decision memo", "Weekly review", "Goal map", "Habit audit", "Risk note", "AI briefing"],
      aiUse: ["내 선택 패턴 분석", "월간 목표 조정", "과부하 신호와 회복 루틴 제안"],
      starterQuestions: ["이 결정을 하게 된 핵심 이유는?", "3개월 뒤의 내가 확인해야 할 가정은?", "지금 줄여야 할 일은 무엇인가?"],
      reviewCadence: "주간 30분, 월간 1회 방향 점검",
      linkedViews: ["bookshelf", "thinktank"]
    },
    {
      id: "family-health",
      code: "FH",
      shelf: "Care",
      title: "Family Health and Care Index",
      subtitle: "가족 건강을 직접 진단하지 않고, 진료 준비와 생활 관리 요약으로 정리",
      privacyLevel: "sensitive-summary",
      purpose: "병원 상담을 더 잘 준비하고 가족 돌봄 기록을 놓치지 않기 위한 요약 책이다. 의료 판단은 반드시 의료진에게 확인한다.",
      allowed: ["증상 변화 요약", "병원 방문 전 질문", "생활 루틴", "복약 여부의 비식별 체크", "검사 결과의 큰 흐름 요약"],
      neverStore: ["진단서 원본", "처방전 사진", "주민등록번호", "보험증권/환자번호 전체", "의료 영상 원본", "정확한 주소와 연락처 묶음"],
      pageTypes: ["Care summary", "Doctor question list", "Symptom timeline", "Lifestyle log", "Medication check summary", "Appointment note"],
      aiUse: ["진료 전 질문 정리", "증상 타임라인 요약", "생활 루틴 점검"],
      starterQuestions: ["언제부터 무엇이 달라졌는가?", "의사에게 꼭 물어볼 질문은?", "위험 신호가 있으면 누구에게 바로 연락해야 하는가?"],
      reviewCadence: "필요 시, 병원 방문 전후",
      linkedViews: ["bookshelf"]
    },
    {
      id: "assets-finance",
      code: "AF",
      shelf: "Capital",
      title: "Assets and Finance Control Room",
      subtitle: "자산 전체 그림, 현금흐름, 리스크, 공부 메모를 관리",
      privacyLevel: "sensitive-summary",
      purpose: "투자 조언을 대체하지 않고, 내가 가진 자산의 구조와 리스크를 이해하기 위한 요약 책이다.",
      allowed: ["자산군별 비율", "월별 현금흐름 요약", "투자 아이디어", "리스크 메모", "세금/계약 질문 목록"],
      neverStore: ["계좌번호 전체", "카드번호", "인증서/OTP/API key", "거래소 비밀번호", "주민등록번호", "대출계약서 원문"],
      pageTypes: ["Portfolio snapshot", "Cash-flow note", "Risk review", "Investment thesis", "Tax question", "Decision memo"],
      aiUse: ["집중 리스크 확인", "현금흐름 개선 아이디어", "투자 가정 검토 질문 생성"],
      starterQuestions: ["이 자산은 어떤 위험에 노출되어 있는가?", "현금흐름을 악화시키는 반복 지출은?", "투자 가정이 틀리면 무엇이 먼저 보일까?"],
      reviewCadence: "월간 1회, 큰 의사결정 전",
      linkedViews: ["bookshelf"]
    },
    {
      id: "business-foundry",
      code: "BF",
      shelf: "Build",
      title: "Business and Startup Foundry",
      subtitle: "미래 사업, 제품, 시장, 고객 문제를 실험 가능한 형태로 보관",
      privacyLevel: "private-summary",
      purpose: "막연한 아이디어를 문제, 고객, 가설, 실험, 결과로 쪼개서 언젠가 사업으로 연결한다.",
      allowed: ["아이디어 한 줄", "고객 문제", "시장 관찰", "MVP 가설", "실험 결과", "경쟁사 공개 분석"],
      neverStore: ["타사 영업비밀", "동의 없는 고객 개인정보", "비밀계약 원문", "결제정보"],
      pageTypes: ["Idea seed", "Customer problem", "MVP experiment", "Market note", "Competitor map", "Pitch draft"],
      aiUse: ["아이디어 우선순위 정리", "MVP 실험 설계", "고객 인터뷰 질문 생성"],
      starterQuestions: ["누가 이 문제로 돈이나 시간을 잃고 있는가?", "가장 작은 실험은 무엇인가?", "실패하면 무엇을 배울 수 있는가?"],
      reviewCadence: "아이디어 발생 시, 월 1회 선별",
      linkedViews: ["bookshelf"]
    },
    {
      id: "learning-library",
      code: "LL",
      shelf: "Growth",
      title: "Learning Library",
      subtitle: "영어, 전기, 반도체, 사업, 독서, 논문을 누적하는 학습 책장",
      privacyLevel: "private-summary",
      purpose: "공부한 내용을 시험 점수보다 오래 남는 개념, 예시, 적용 과제로 바꾼다.",
      allowed: ["강의/책 요약", "문제 오답", "개념 카드", "논문 요약", "실전 적용 과제"],
      neverStore: ["유료 교재 원문 대량 복사", "저작권 자료 전체", "시험 문제 원문 유출"],
      pageTypes: ["Concept note", "Wrong answer", "Book note", "Paper note", "Practice log", "Teach-back"],
      aiUse: ["약점 진단", "복습 스케줄 생성", "쉬운 설명으로 재구성"],
      starterQuestions: ["이 개념을 현장 예시로 바꾸면?", "내가 틀린 이유는 지식 부족인가, 문제 해석인가?", "내일 다시 떠올릴 단서는?"],
      reviewCadence: "격일 10분, 주간 누적 점검",
      linkedViews: ["english-test", "english", "papers", "glossary"]
    },
    {
      id: "people-network",
      code: "PN",
      shelf: "People",
      title: "People, Family, and Network",
      subtitle: "관계의 맥락, 감사, 약속, 대화 후속 조치를 관리",
      privacyLevel: "private-summary",
      purpose: "사람을 데이터화하는 것이 아니라, 내가 더 책임감 있게 기억하고 챙기기 위한 관계 메모다.",
      allowed: ["약속한 일", "고마웠던 일", "대화 후속 조치", "가족 일정 요약", "도움 요청/제공 기록"],
      neverStore: ["타인의 비밀 원문", "동의 없는 민감 건강/금융/위치 정보", "험담 기록", "연락처 목록 원문"],
      pageTypes: ["Follow-up", "Family schedule", "Gratitude note", "Conversation summary", "Support plan", "Boundary note"],
      aiUse: ["약속 누락 방지", "관계 회복 질문", "가족 일정 요약"],
      starterQuestions: ["내가 지키기로 한 약속은?", "상대에게 다시 확인해야 할 것은?", "내가 과하게 떠안은 것은 없는가?"],
      reviewCadence: "주 1회, 중요한 일정 전",
      linkedViews: ["bookshelf"]
    },
    {
      id: "admin-vault",
      code: "AV",
      shelf: "Admin",
      title: "Home, Admin, and Document Map",
      subtitle: "집, 계약, 보험, 구독, 서류 위치를 원문이 아닌 색인으로 관리",
      privacyLevel: "sensitive-index",
      purpose: "서류 원문을 넣지 않고 어디에 무엇이 있는지, 언제 갱신해야 하는지, 어떤 질문이 남았는지 관리한다.",
      allowed: ["문서 위치 힌트", "만료일", "문의할 기관", "해야 할 행정 작업", "체크리스트"],
      neverStore: ["계약서 원문", "보험증권 번호 전체", "등본/가족관계증명서", "신분증 사진", "인감/서명 이미지"],
      pageTypes: ["Document index", "Renewal checklist", "Subscription audit", "Home maintenance", "Insurance question", "Admin task"],
      aiUse: ["만료/갱신 일정 정리", "질문 목록 생성", "서류 준비 체크리스트"],
      starterQuestions: ["원문은 어디에 안전하게 보관되어 있는가?", "언제 갱신하거나 확인해야 하는가?", "다음 행정 행동은?"],
      reviewCadence: "월 1회, 계약/갱신 전",
      linkedViews: ["bookshelf"]
    },
    {
      id: "ai-briefing-desk",
      code: "AI",
      shelf: "Synthesis",
      title: "AI Briefing and Export Desk",
      subtitle: "책장 전체를 AI에게 보여줄 때의 반출 규칙, 요약 패킷, 분석 프롬프트",
      privacyLevel: "controlled-export",
      purpose: "나중에 AI에게 데이터를 보여줄 때 무엇을 포함하고 제외할지 통제한다.",
      allowed: ["비식별 요약", "책별 목표", "최근 결정", "다음 액션", "AI 반출 허용 체크된 페이지"],
      neverStore: ["원문 민감정보 묶음", "인증정보", "타인의 동의 없는 세부 개인정보", "의료/금융 식별자"],
      pageTypes: ["AI briefing", "Export policy", "Monthly synthesis", "Risk review", "Cross-book insight", "Prompt draft"],
      aiUse: ["책장 전체 패턴 분석", "나의 다음 30일 운영 제안", "분야별 충돌과 우선순위 정리"],
      starterQuestions: ["AI에게 보여줘도 되는 범위인가?", "이 요약만으로도 판단이 가능한가?", "삭제해야 할 식별자는 없는가?"],
      reviewCadence: "AI 분석 전 매번",
      linkedViews: ["bookshelf", "thinktank"]
    }
  ];

  let activeBookId = localStorage.getItem(ACTIVE_BOOK_KEY) || BOOKSHELF_BOOKS[0].id;
  let pages = loadPages();
  let remoteState = "local-first";

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

  function currentBook() {
    return BOOKSHELF_BOOKS.find(book => book.id === activeBookId) || BOOKSHELF_BOOKS[0];
  }

  function loadPages() {
    try {
      return JSON.parse(localStorage.getItem(BOOKSHELF_PAGE_KEY) || "[]");
    } catch {
      return [];
    }
  }

  function savePages() {
    localStorage.setItem(BOOKSHELF_PAGE_KEY, JSON.stringify(pages));
  }

  function mergePages(nextPages) {
    const byId = new Map(pages.map(page => [page.id, page]));
    nextPages.forEach(page => {
      if (page?.id) byId.set(page.id, { ...byId.get(page.id), ...page });
    });
    pages = [...byId.values()].sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")));
    savePages();
  }

  function tokenForApi(base) {
    if (base === LOCAL_VAULT_API) return sessionStorage.getItem(LOCAL_TOKEN_KEY) || "";
    return sessionStorage.getItem(REMOTE_TOKEN_KEY) || "";
  }

  async function apiFetch(path, options = {}, base = BOOKSHELF_API) {
    const token = tokenForApi(base);
    const response = await fetch(`${base}${path}`, {
      ...options,
      credentials: base === LOCAL_VAULT_API ? "omit" : "include",
      headers: {
        "Content-Type": "application/json",
        "X-ThinkTank-Password": sessionStorage.getItem(CLIENT_PASS_KEY) || "",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {})
      }
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  }

  async function pullRemotePages() {
    try {
      const data = await apiFetch("/api/entries");
      const remotePages = (data.entries || []).filter(entry => entry.type === "Personal Bookshelf Page");
      if (remotePages.length) mergePages(remotePages);
      remoteState = "Cloudflare D1 sync ready";
    } catch {
      remoteState = "local cache only until vault is reachable";
    }
    renderBookshelf();
  }

  async function pushPageToVault(page) {
    try {
      await apiFetch("/api/entries", { method: "POST", body: JSON.stringify(page) });
      page.syncStatus = "D1 saved";
      remoteState = "Cloudflare D1 sync ready";
    } catch {
      page.syncStatus = "local saved";
      remoteState = "local cache only until vault is reachable";
    }
    if (BOOKSHELF_API !== LOCAL_VAULT_API && tokenForApi(LOCAL_VAULT_API)) {
      try {
        await apiFetch("/api/entries", {
          method: "POST",
          body: JSON.stringify({ ...page, localMirror: true })
        }, LOCAL_VAULT_API);
        page.syncStatus = `${page.syncStatus} / D drive mirrored`;
      } catch {
        page.syncStatus = `${page.syncStatus} / D drive pending`;
      }
    }
    savePages();
    renderBookshelf();
  }

  function renderRail() {
    const rail = document.querySelector("#bookshelf-rail");
    if (!rail) return;
    const shelves = [...new Set(BOOKSHELF_BOOKS.map(book => book.shelf))];
    rail.innerHTML = shelves.map(shelf => {
      const books = BOOKSHELF_BOOKS.filter(book => book.shelf === shelf);
      return `
        <div class="bookshelf-group">
          <p>${escapeHtml(shelf)}</p>
          ${books.map(book => `
            <button class="book-spine ${book.id === activeBookId ? "active" : ""}" type="button" data-book-id="${escapeHtml(book.id)}">
              <span>${escapeHtml(book.code)}</span>
              <strong>${escapeHtml(book.title)}</strong>
              <small>${escapeHtml(book.privacyLevel)}</small>
            </button>
          `).join("")}
        </div>
      `;
    }).join("");

    rail.querySelectorAll("[data-book-id]").forEach(button => {
      button.addEventListener("click", () => {
        activeBookId = button.dataset.bookId;
        localStorage.setItem(ACTIVE_BOOK_KEY, activeBookId);
        renderBookshelf();
      });
    });
  }

  function listItems(items) {
    return `<ul>${items.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
  }

  function renderBookDetail() {
    const book = currentBook();
    const detail = document.querySelector("#bookshelf-detail");
    if (!detail) return;
    detail.innerHTML = `
      <article class="book-detail">
        <div class="book-detail-head">
          <span class="book-code">${escapeHtml(book.code)}</span>
          <div>
            <p class="eyebrow">${escapeHtml(book.shelf)} / ${escapeHtml(book.privacyLevel)}</p>
            <h2>${escapeHtml(book.title)}</h2>
            <p>${escapeHtml(book.subtitle)}</p>
          </div>
        </div>
        <div class="bookshelf-schema">
          <span>Book</span>
          <span>Section</span>
          <span>Page</span>
          <span>Evidence</span>
          <span>Decision</span>
          <span>Next Action</span>
          <span>AI Export</span>
        </div>
        <p class="book-purpose">${escapeHtml(book.purpose)}</p>
        <div class="book-meta-grid">
          <section>
            <h3>저장해도 좋은 것</h3>
            ${listItems(book.allowed)}
          </section>
          <section class="do-not-store">
            <h3>이 책장에 넣지 말 것</h3>
            ${listItems(book.neverStore)}
          </section>
          <section>
            <h3>페이지 템플릿</h3>
            ${listItems(book.pageTypes)}
          </section>
          <section>
            <h3>AI에게 맡길 수 있는 일</h3>
            ${listItems(book.aiUse)}
          </section>
        </div>
        <div class="starter-strip">
          ${book.starterQuestions.map(question => `<span>${escapeHtml(question)}</span>`).join("")}
        </div>
      </article>
    `;
  }

  function renderCapture() {
    const book = currentBook();
    const capture = document.querySelector("#bookshelf-capture");
    if (!capture) return;
    const bookPages = pages.filter(page => page.bookId === book.id).slice(0, 8);
    const briefing = buildBriefing(book);

    capture.innerHTML = `
      <section class="bookshelf-workspace">
        <article class="capture-panel">
          <div class="panel-title-row">
            <div>
              <p class="eyebrow">Capture Page</p>
              <h2>새 페이지 저장</h2>
            </div>
            <span class="sync-pill">${escapeHtml(remoteState)}</span>
          </div>
          <form class="bookshelf-form" id="bookshelf-form">
            <div class="bookshelf-capture-grid">
              <label>
                제목
                <input id="bookshelf-title" maxlength="90" required placeholder="예: 6월 설치 준비 회고, 가족 병원 질문 목록" />
              </label>
              <label>
                페이지 종류
                <select id="bookshelf-page-type">
                  ${book.pageTypes.map(type => `<option>${escapeHtml(type)}</option>`).join("")}
                </select>
              </label>
              <label>
                민감도
                <select id="bookshelf-privacy">
                  <option value="private-summary">Private summary</option>
                  <option value="sensitive-summary">Sensitive summary</option>
                  <option value="sensitive-index">Sensitive index only</option>
                  <option value="work-learning">Work learning</option>
                  <option value="controlled-export">Controlled export</option>
                </select>
              </label>
              <label>
                태그
                <input id="bookshelf-tags" placeholder="comma, separated, tags" />
              </label>
            </div>
            <label>
              요약
              <textarea id="bookshelf-summary" required placeholder="원문 전체가 아니라 핵심 상황, 배경, 판단 근거만 적습니다."></textarea>
            </label>
            <label>
              다음 행동
              <textarea id="bookshelf-next-action" placeholder="다음 확인, 질문, 실험, 병원/전문가 상담, 재검토 날짜 등을 적습니다."></textarea>
            </label>
            <label class="bookshelf-checkline">
              <input id="bookshelf-ai-export" type="checkbox" />
              AI 분석 패킷에 포함해도 되는 비식별 요약이다
            </label>
            <div class="thinktank-actions">
              <button class="primary" type="submit">책장에 저장</button>
              <button class="secondary" id="bookshelf-refresh" type="button">DB에서 다시 불러오기</button>
            </div>
          </form>
        </article>

        <article class="capture-panel">
          <div class="panel-title-row">
            <div>
              <p class="eyebrow">Recent Pages</p>
              <h2>최근 저장된 페이지</h2>
            </div>
            <span class="sync-pill">${bookPages.length} pages</span>
          </div>
          <div class="bookshelf-page-list">
            ${bookPages.length ? bookPages.map(renderPageCard).join("") : `<p class="empty-note">아직 이 책에 저장된 페이지가 없습니다. 첫 페이지는 작게 시작하면 됩니다.</p>`}
          </div>
        </article>

        <article class="capture-panel ai-briefing-panel">
          <div class="panel-title-row">
            <div>
              <p class="eyebrow">AI Briefing Packet</p>
              <h2>나중에 AI에게 보여줄 요약 형태</h2>
            </div>
            <span class="sync-pill">export-safe</span>
          </div>
          <textarea readonly class="ai-briefing-text">${escapeHtml(briefing)}</textarea>
        </article>
      </section>
    `;

    document.querySelector("#bookshelf-form")?.addEventListener("submit", saveBookPage);
    document.querySelector("#bookshelf-refresh")?.addEventListener("click", pullRemotePages);
  }

  function renderPageCard(page) {
    return `
      <article class="bookshelf-page-card">
        <header>
          <div>
            <h3>${escapeHtml(page.title || "Untitled page")}</h3>
            <small>${escapeHtml(page.pageType || "Page")} / ${escapeHtml(page.privacyLevel || "private-summary")}</small>
          </div>
          <span>${escapeHtml(page.syncStatus || "saved")}</span>
        </header>
        <p>${escapeHtml(page.summary || "")}</p>
        ${page.nextAction ? `<strong>Next: ${escapeHtml(page.nextAction)}</strong>` : ""}
        <div class="entry-tags">${(page.tags || []).map(tag => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
      </article>
    `;
  }

  function buildBriefing(book) {
    const exportPages = pages
      .filter(page => page.bookId === book.id && page.aiExportOk)
      .slice(0, 10)
      .map((page, index) => `${index + 1}. ${page.title} | ${page.pageType} | ${page.summary}${page.nextAction ? ` | next: ${page.nextAction}` : ""}`);

    return [
      `Book: ${book.title}`,
      `Purpose: ${book.purpose}`,
      `Privacy rule: Do not infer or request raw identifiers, passwords, account numbers, medical documents, or confidential third-party data.`,
      `Allowed AI work: ${book.aiUse.join("; ")}`,
      `Current review cadence: ${book.reviewCadence}`,
      "",
      "Export-approved pages:",
      exportPages.length ? exportPages.join("\n") : "No pages approved for AI export yet.",
      "",
      "Ask the AI to return: patterns, risks, blind spots, next 7-day actions, and what data is still missing."
    ].join("\n");
  }

  async function saveBookPage(event) {
    event.preventDefault();
    const book = currentBook();
    const tags = document.querySelector("#bookshelf-tags").value
      .split(",")
      .map(tag => tag.trim())
      .filter(Boolean)
      .slice(0, 12);

    const page = {
      id: `bookshelf-${uid()}`,
      type: "Personal Bookshelf Page",
      subsystem: book.title,
      severity: document.querySelector("#bookshelf-privacy").value,
      title: document.querySelector("#bookshelf-title").value.trim(),
      pageType: document.querySelector("#bookshelf-page-type").value,
      privacyLevel: document.querySelector("#bookshelf-privacy").value,
      summary: document.querySelector("#bookshelf-summary").value.trim(),
      nextAction: document.querySelector("#bookshelf-next-action").value.trim(),
      tags,
      aiExportOk: document.querySelector("#bookshelf-ai-export").checked,
      bookId: book.id,
      bookTitle: book.title,
      source: "Project Universe Personal Think Tank Bookshelf",
      createdAt: new Date().toISOString(),
      syncStatus: "local saved"
    };

    mergePages([page]);
    event.target.reset();
    renderBookshelf();
    await pushPageToVault(page);
  }

  function renderBookshelf() {
    if (!document.querySelector("#bookshelf")) return;
    renderRail();
    renderBookDetail();
    renderCapture();
  }

  window.ProjectUniverseBookshelf = {
    books: BOOKSHELF_BOOKS,
    getPages: () => [...pages],
    render: renderBookshelf
  };

  document.addEventListener("DOMContentLoaded", () => {
    renderBookshelf();
    pullRemotePages();
  });
})();
