(() => {
  const BOOKSHELF_PAGE_KEY = "projectUniverseBookshelfPages";
  const ACTIVE_BOOK_KEY = "projectUniverseActiveBook";
  const CLIENT_PASS_KEY = "ceTrainerPass";
  const REMOTE_TOKEN_KEY = "epiThinkTankRemoteToken";
  const LOCAL_TOKEN_KEY = "epiThinkTankLocalToken";
  const LOCAL_VAULT_API = "http://127.0.0.1:4180";
  const EPI_VAULT_CONFIG = window.EPI_VAULT_CONFIG || {};

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
      linkedViews: ["dashboard", "cluster", "install", "electrical", "english-test", "thinktank"]
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
  let latestAiPacketText = "";

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

  async function copyText(text, statusSelector) {
    const status = document.querySelector(statusSelector);
    if (!text) {
      if (status) status.textContent = "복사할 내용이 아직 없습니다.";
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      if (status) status.textContent = "클립보드에 복사했습니다.";
    } catch {
      if (status) status.textContent = "브라우저 권한 때문에 자동 복사하지 못했습니다. 텍스트를 직접 선택해 복사하세요.";
    }
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

  function viewLabel(view) {
    const labels = {
      dashboard: "EPI 홈",
      cluster: "구성게임",
      install: "설치",
      electrical: "전기/DVM",
      "english-test": "영어시험",
      thinktank: "싱크탱크",
      english: "영어풀이",
      papers: "논문노트",
      glossary: "용어집",
      bookshelf: "책장"
    };
    return labels[view] || view;
  }

  function pagesForBook(bookId) {
    return pages.filter(page => page.bookId === bookId);
  }

  function formatDateLabel(value) {
    if (!value) return "기록 없음";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "날짜 불명";
    return date.toLocaleDateString("ko-KR", { month: "short", day: "numeric" });
  }

  function getBookStats(book) {
    const bookPages = pagesForBook(book.id);
    const aiReady = bookPages.filter(page => page.aiExportOk).length;
    const nextReady = bookPages.filter(page => page.nextAction).length;
    const tagged = bookPages.filter(page => page.tags?.length).length;
    const latest = [...bookPages].sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")))[0];
    const score = Math.min(100, Math.round(
      Math.min(bookPages.length, 6) / 6 * 40 +
      (bookPages.length ? aiReady / bookPages.length : 0) * 25 +
      (bookPages.length ? nextReady / bookPages.length : 0) * 25 +
      (bookPages.length ? tagged / bookPages.length : 0) * 10
    ));
    const missingNext = bookPages.filter(page => !page.nextAction).slice(0, 3);
    const suggestion = !bookPages.length
      ? "첫 페이지를 하나 저장해서 이 책을 활성화하세요."
      : !aiReady
        ? "AI에게 보여줘도 되는 비식별 요약 1개를 체크하세요."
        : missingNext.length
          ? "다음 행동이 비어 있는 페이지를 닫아주세요."
          : score < 80
            ? "태그와 근거를 보강해서 검색 가능한 지식으로 만드세요."
            : "이번 주에는 새 사례보다 기존 페이지를 재검토해 패턴을 뽑으세요.";
    return {
      pages: bookPages,
      aiReady,
      nextReady,
      tagged,
      latest,
      score,
      missingNext,
      suggestion
    };
  }

  function libraryStats() {
    const exportReady = pages.filter(page => page.aiExportOk).length;
    const booksWithPages = new Set(pages.map(page => page.bookId).filter(Boolean)).size;
    const pagesWithNextAction = pages.filter(page => page.nextAction).length;
    const overallScore = pages.length ? Math.round((exportReady / pages.length * 45) + (pagesWithNextAction / pages.length * 45) + (booksWithPages / BOOKSHELF_BOOKS.length * 10)) : 0;
    return {
      books: BOOKSHELF_BOOKS.length,
      pages: pages.length,
      exportReady,
      booksWithPages,
      overallScore
    };
  }

  function renderLibraryOverview(activeBook) {
    const stats = libraryStats();
    return `
      <section class="library-command">
        <div class="library-command-copy">
          <p class="eyebrow">Bookshelf Home</p>
          <h2>책장은 입구, 각 책은 하나의 전문 시스템입니다</h2>
          <p>필요한 책을 먼저 고르고, 기록은 요약-근거-다음 행동-AI 공개 범위로 쌓습니다. 나중에 AI에게 보여줄 때도 원문이 아니라 구조화된 판단 재료만 넘기도록 설계했습니다.</p>
        </div>
        <div class="library-command-grid" aria-label="책장 현황">
          <span><strong>${stats.books}</strong> books</span>
          <span><strong>${stats.pages}</strong> pages</span>
          <span><strong>${stats.exportReady}</strong> AI-ready</span>
          <span><strong>${stats.overallScore}</strong> health</span>
        </div>
      </section>
      <section class="library-overview" aria-label="전체 책장">
        <div class="panel-title-row">
          <div>
            <p class="eyebrow">Choose a Book</p>
            <h2>오늘 다룰 책 선택</h2>
          </div>
          <span class="sync-pill">${escapeHtml(activeBook.shelf)} shelf</span>
        </div>
        <div class="library-book-grid">
          ${BOOKSHELF_BOOKS.map(book => {
            const count = pagesForBook(book.id).length;
            return `
              <button class="library-book-card ${book.id === activeBook.id ? "active" : ""}" type="button" data-book-card="${escapeHtml(book.id)}">
                <span class="book-card-code">${escapeHtml(book.code)}</span>
                <strong>${escapeHtml(book.title)}</strong>
                <small>${escapeHtml(book.shelf)} / ${escapeHtml(book.privacyLevel)}</small>
                <em>${count} page${count === 1 ? "" : "s"}</em>
              </button>
            `;
          }).join("")}
        </div>
      </section>
    `;
  }

  function renderBookDetail() {
    const book = currentBook();
    const stats = getBookStats(book);
    const detail = document.querySelector("#bookshelf-detail");
    if (!detail) return;
    detail.innerHTML = `
      ${renderLibraryOverview(book)}
      <article class="book-detail">
        <div class="book-detail-head">
          <span class="book-code">${escapeHtml(book.code)}</span>
          <div>
            <p class="eyebrow">${escapeHtml(book.shelf)} / ${escapeHtml(book.privacyLevel)}</p>
            <h2>${escapeHtml(book.title)}</h2>
            <p>${escapeHtml(book.subtitle)}</p>
          </div>
        </div>
        <div class="book-flow-map" aria-label="기록 흐름">
          <span><b>1</b> 책 선택</span>
          <span><b>2</b> 요약 기록</span>
          <span><b>3</b> 근거 분리</span>
          <span><b>4</b> 다음 행동</span>
          <span><b>5</b> AI 공개 판단</span>
        </div>
        <div class="book-open-actions">
          <button class="primary" type="button" data-open-book-view="${escapeHtml(book.linkedViews[0] || "thinktank")}">이 책 열기</button>
          ${book.linkedViews.slice(1, 5).map(view => `<button class="secondary" type="button" data-open-book-view="${escapeHtml(view)}">${escapeHtml(viewLabel(view))}</button>`).join("")}
        </div>
        <section class="book-health-panel" aria-label="책 데이터 건강도">
          <div class="book-health-score">
            <span>Data Health</span>
            <strong>${stats.score}</strong>
            <i><em style="width:${stats.score}%"></em></i>
          </div>
          <div class="book-health-grid">
            <span><strong>${stats.pages.length}</strong> pages</span>
            <span><strong>${stats.aiReady}</strong> AI-ready</span>
            <span><strong>${stats.nextReady}</strong> next action</span>
            <span><strong>${formatDateLabel(stats.latest?.createdAt)}</strong> latest</span>
          </div>
          <p>${escapeHtml(stats.suggestion)}</p>
        </section>
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
          ${book.starterQuestions.map(question => `<button type="button" data-starter-question="${escapeHtml(question)}">${escapeHtml(question)}</button>`).join("")}
        </div>
        ${stats.missingNext.length ? `
          <div class="book-review-queue">
            <strong>닫아야 할 열린 루프</strong>
            ${stats.missingNext.map(page => `<span>${escapeHtml(page.title || "Untitled page")} · 다음 행동 없음</span>`).join("")}
          </div>
        ` : ""}
      </article>
    `;
    detail.querySelectorAll("[data-book-card]").forEach(button => {
      button.addEventListener("click", () => {
        activeBookId = button.dataset.bookCard;
        localStorage.setItem(ACTIVE_BOOK_KEY, activeBookId);
        renderBookshelf();
      });
    });
    detail.querySelectorAll("[data-open-book-view]").forEach(button => {
      button.addEventListener("click", () => {
        const view = button.dataset.openBookView;
        if (window.showView) window.showView(view);
        else document.querySelector(`[data-view="${view}"]`)?.click();
      });
    });
    detail.querySelectorAll("[data-starter-question]").forEach(button => {
      button.addEventListener("click", () => {
        document.querySelector("#bookshelf-title")?.focus();
        const title = document.querySelector("#bookshelf-title");
        const summary = document.querySelector("#bookshelf-summary");
        if (title && !title.value) title.value = "질문에서 시작한 페이지";
        if (summary && !summary.value) summary.value = button.dataset.starterQuestion;
      });
    });
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
            <button class="secondary" id="bookshelf-copy-briefing" type="button">요약 복사</button>
          </div>
          <textarea readonly class="ai-briefing-text">${escapeHtml(briefing)}</textarea>
          <p class="copy-status" id="bookshelf-briefing-copy-status"></p>
        </article>

        <article class="capture-panel ai-briefing-panel">
          <div class="panel-title-row">
            <div>
              <p class="eyebrow">Global AI Context</p>
              <h2>책장 전체 데이터 통합 패킷</h2>
            </div>
            <div class="thinktank-actions">
              <button class="secondary" id="bookshelf-ai-context-refresh" type="button">AI 패킷 새로고침</button>
              <button class="secondary" id="bookshelf-ai-context-copy" type="button">AI 패킷 복사</button>
            </div>
          </div>
          <p>Cloudflare D1에 쌓인 책장 페이지, 싱크탱크 기록, 영어 오답 기록을 AI가 읽기 쉬운 구조로 요약합니다. 민감 원문이 아니라 요약과 메타데이터 중심으로 사용합니다.</p>
          <div class="ai-context-preview" id="bookshelf-ai-context-preview">아직 불러오지 않았습니다.</div>
          <p class="copy-status" id="bookshelf-ai-context-copy-status"></p>
        </article>
      </section>
    `;

    document.querySelector("#bookshelf-form")?.addEventListener("submit", saveBookPage);
    document.querySelector("#bookshelf-refresh")?.addEventListener("click", pullRemotePages);
    document.querySelector("#bookshelf-ai-context-refresh")?.addEventListener("click", renderAiContextPreview);
    document.querySelector("#bookshelf-copy-briefing")?.addEventListener("click", () => copyText(briefing, "#bookshelf-briefing-copy-status"));
    document.querySelector("#bookshelf-ai-context-copy")?.addEventListener("click", () => copyText(latestAiPacketText, "#bookshelf-ai-context-copy-status"));
  }

  async function renderAiContextPreview() {
    const target = document.querySelector("#bookshelf-ai-context-preview");
    if (!target) return;
    target.textContent = "D1에서 AI 통합 패킷을 불러오는 중...";
    try {
      const data = await apiFetch("/api/ai-context");
      const context = data.context || {};
      const packet = {
        schema: context.schema,
        generatedAt: context.generatedAt,
        countsByType: context.countsByType,
        english: context.english,
        bookshelf: context.bookshelf,
        recentItemsPreview: (context.recentItems || []).slice(0, 8)
      };
      latestAiPacketText = JSON.stringify(packet, null, 2);
      const counts = Object.entries(context.countsByType || {});
      const books = context.bookshelf || [];
      const english = context.english || {};
      const topWeakness = english.weaknesses?.[0];
      const recent = (context.recentItems || []).slice(0, 5);
      target.innerHTML = `
        <div class="ai-context-readout">
          <article>
            <span>Records</span>
            <strong>${counts.reduce((sum, [, count]) => sum + Number(count || 0), 0)}</strong>
            <small>${counts.map(([type, count]) => `${escapeHtml(type)} ${count}`).join(" · ") || "아직 D1 기록 없음"}</small>
          </article>
          <article>
            <span>Books</span>
            <strong>${books.length}</strong>
            <small>${books.slice(0, 3).map(book => `${escapeHtml(book.bookTitle || book.bookId)} ${book.pages || 0}p`).join(" · ") || "책장 페이지 대기"}</small>
          </article>
          <article>
            <span>English</span>
            <strong>${english.accuracy ?? 0}%</strong>
            <small>${topWeakness ? `${escapeHtml(topWeakness.skill)} 우선 보강` : "영어 오답 데이터 대기"}</small>
          </article>
        </div>
        <div class="ai-context-recent">
          <strong>최근 AI 재료</strong>
          ${recent.length ? recent.map(item => `
            <span>${escapeHtml(item.type || "Record")} · ${escapeHtml(item.title || item.subsystem || "Untitled")}</span>
          `).join("") : `<span>아직 최근 항목이 없습니다.</span>`}
        </div>
        <details class="ai-context-json">
          <summary>구조화 JSON 보기</summary>
          <pre>${escapeHtml(latestAiPacketText)}</pre>
        </details>
      `;
    } catch {
      latestAiPacketText = "";
      target.textContent = "AI 통합 패킷을 불러오지 못했습니다. 로그인 상태와 D1 연결을 확인하세요.";
    }
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
