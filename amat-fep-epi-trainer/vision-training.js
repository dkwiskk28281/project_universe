(() => {
  const STORAGE_KEY = "projectUniverseVisionTrainingState";
  const SCHEMA_VERSION = "vision-function-recovery-v1";

  const modes = {
    pursuit: {
      title: "부드러운 초록점 추적",
      label: "추적",
      subtitle: "머리는 고정하고 초록점을 눈으로만 천천히 따라가며 피로·복시 반응을 기록합니다.",
      caution: "이 화면은 smooth pursuit 감각 훈련용입니다. 한쪽 눈 가림은 전문가가 지시한 경우에만 켜세요.",
      evidence: "간헐적외사시는 피로·질병·주의 저하 때 드러날 수 있어 증상 트리거 기록이 중요합니다."
    },
    "near-far": {
      title: "근거리-원거리 전환",
      label: "초점",
      subtitle: "가까운 목표와 먼 목표를 번갈아 보며 선명함, 복시, 회복 시간을 기록합니다.",
      caution: "화면은 실제 깊이를 만들지 못하므로 임상 pencil push-up이나 dot card 처방의 대체물이 아닙니다.",
      evidence: "수렴부전이 동반되면 가까운 작업에서 복시·두통·눈 피로가 생길 수 있고, 전문가가 convergence exercise를 처방할 수 있습니다."
    },
    fusion: {
      title: "융합 감각 이해",
      label: "융합",
      subtitle: "두 눈 입력이 하나로 합쳐지는 binocular vision 개념을 시각적으로 익힙니다.",
      caution: "프리즘, red/green filter, anti-suppression, occlusion protocol은 처방 없이 따라 하지 않습니다.",
      evidence: "비수술 치료의 목표는 suppression 인식, 복시 감지, fusion reserve 형성 등으로 설명되지만 대상별 근거가 다릅니다."
    },
    rest: {
      title: "이완과 리셋",
      label: "휴식",
      subtitle: "먼 곳 보기와 눈 감기로 과훈련을 피하고 증상 회복 여부를 기록합니다.",
      caution: "불편감이 올라가면 즉시 멈추세요. 오래 버티는 것이 좋은 훈련은 아닙니다.",
      evidence: "NHS orthoptic guidance는 운동 뒤 먼 곳 보기나 눈 감기 같은 relaxation을 강조합니다."
    }
  };

  const stopSignals = [
    "새로 생긴 지속 복시",
    "갑작스러운 시력저하 또는 시야 이상",
    "눈 통증, 심한 두통, 심한 어지럼",
    "눈꺼풀 처짐, 말이 어눌함, 한쪽 힘 빠짐",
    "훈련 후 복시가 오래 지속되거나 일상 조절이 악화됨"
  ];

  const publicSources = [
    ["AAPOS Exotropia", "https://www.aapos.org/glossary/exotropia", "간헐외사시는 피곤하거나 아플 때, 멍할 때, 먼 곳을 볼 때 나타날 수 있고 복시/흐림을 느낄 수 있다고 설명합니다."],
    ["AAPOS Convergence Insufficiency", "https://aapos.org/glossary/convergence-insufficiency", "수렴부전은 가까운 작업에서 두 눈을 함께 유지하기 어려운 상태이며 전문 검사를 통해 평가해야 한다고 설명합니다."],
    ["NCBI StatPearls: Intermittent Exotropia", "https://www.ncbi.nlm.nih.gov/books/NBK574514/", "진단과 분류에는 comprehensive ophthalmic/orthoptic exam, cover test, near point of convergence 등이 필요합니다."],
    ["BMC Ophthalmology 2024 systematic review", "https://link.springer.com/article/10.1186/s12886-024-03804-z", "비수술 치료 RCT들을 종합했지만 치료별 효과는 혼합적이며 개인화가 필요하다고 결론짓습니다."],
    ["BMC Ophthalmology 2022 patching vs pencil push-up", "https://link.springer.com/article/10.1186/s12886-022-02705-3", "소아 연구에서 patching과 pencil push-up이 control score에 효과를 보였지만 stereoacuity 변화는 유의하지 않았습니다."],
    ["University Hospitals Sussex NHS orthoptic exercises", "https://www.uhsussex.nhs.uk/resources/how-to-do-orthoptic-exercises/", "orthoptist 지시를 따르고 운동 뒤 relaxation을 하며 과훈련을 피하라고 안내합니다."]
  ];

  const defaultState = {
    mode: "pursuit",
    running: false,
    seconds: 60,
    fatigue: 2,
    diplopia: 1,
    control: "single",
    approvedMonocular: false,
    note: "",
    logs: [],
    remoteStatus: "로컬 저장 대기"
  };

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
    return `vision-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function loadState() {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      return { ...defaultState, ...stored, logs: Array.isArray(stored.logs) ? stored.logs : [] };
    } catch {
      return { ...defaultState };
    }
  }

  let state = loadState();

  function persist() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function controlLabel(value) {
    return {
      single: "대체로 하나로 보임",
      "brief-double": "잠깐 복시 후 회복",
      "frequent-double": "복시가 자주 나타남"
    }[value] || value;
  }

  function weeklyLoad() {
    const weekAgo = Date.now() - 7 * 86400000;
    return state.logs
      .filter(log => new Date(log.createdAt).getTime() >= weekAgo)
      .reduce((sum, log) => sum + Number(log.seconds || 0), 0);
  }

  function symptomRisk() {
    if (state.control === "frequent-double" || state.diplopia >= 4 || state.fatigue >= 5) return "high";
    if (state.control === "brief-double" || state.diplopia >= 2 || state.fatigue >= 4) return "watch";
    return "clear";
  }

  function guidance() {
    const risk = symptomRisk();
    if (risk === "high") {
      return {
        risk,
        label: "중지 우선",
        title: "오늘은 훈련보다 기록과 이완이 우선입니다.",
        body: "복시가 자주 나타나거나 강하면 억지로 점을 따라가지 말고, 증상·상황·회복시간을 기록해 진료 때 가져가세요.",
        action: "이완 모드로 전환",
        lockTraining: true
      };
    }
    if (risk === "watch") {
      return {
        risk,
        label: "관찰 모드",
        title: "짧게 시도하고, 흐려지면 바로 멈추세요.",
        body: "피로와 복시 느낌이 올라온 상태입니다. 30-60초만 사용하고 끝난 뒤 먼 곳 보기/눈 감기로 회복 여부를 기록하세요.",
        action: "짧은 세션",
        lockTraining: false
      };
    }
    return {
      risk,
      label: "안정",
      title: "짧고 선명한 상태에서 패턴을 기록하세요.",
      body: "오늘은 낮은 강도의 양안 추적 또는 초점 전환 기록에 적합합니다. 화면은 처방 훈련의 대체가 아니라 안전 기록 보조입니다.",
      action: "안전 모드 시작",
      lockTraining: false
    };
  }

  function stageMarkup() {
    const mode = state.mode;
    if (mode === "pursuit") {
      return `
        <div class="vision-gridline"></div>
        ${state.approvedMonocular ? `<div class="vision-eye-cover">전문가 지시 시 한쪽 눈 가림 표시</div>` : ""}
        <div class="vision-moving-dot" aria-hidden="true"></div>
        <span class="vision-stage-label top-left">머리는 고정</span>
        <span class="vision-stage-label bottom-right">${state.approvedMonocular ? "monocular mode: prescribed only" : "양안 추적"}</span>
      `;
    }
    if (mode === "near-far") {
      return `
        <div class="vision-near-far">
          <div class="vision-cue near">가까운 목표</div>
          <div class="vision-cue far">먼 목표</div>
          <span>선명함이 흐려지거나 둘로 보이면 멈추고 쉬기</span>
        </div>
      `;
    }
    if (mode === "fusion") {
      return `
        <div class="vision-fusion-field">
          <span class="vision-ring left">L</span>
          <span class="vision-ring center">single</span>
          <span class="vision-ring right">R</span>
        </div>
      `;
    }
    return `
      <div class="vision-rest-field">
        <strong>먼 곳 20초 보기</strong>
        <span>눈을 감고 호흡을 천천히 하며 복시가 줄어드는지 기록합니다.</span>
      </div>
    `;
  }

  function packetPreview() {
    const recent = state.logs.slice(0, 8);
    const avgFatigue = recent.length ? recent.reduce((sum, log) => sum + Number(log.fatigue || 0), 0) / recent.length : 0;
    const avgDiplopia = recent.length ? recent.reduce((sum, log) => sum + Number(log.diplopia || 0), 0) / recent.length : 0;
    const frequentDouble = recent.filter(log => log.control === "frequent-double").length;
    return {
      schemaVersion: "vision-function-ai-summary-v1",
      generatedAt: new Date().toISOString(),
      bookId: "vision-function-recovery",
      privacyBoundary: "비식별 요약만 AI에게 제공. 진단서, 처방전, 검사 원문, 병원/환자 식별자는 제외.",
      sessionCount: state.logs.length,
      recentSummary: {
        weeklyMinutes: Math.round(weeklyLoad() / 60),
        avgFatigue: Number(avgFatigue.toFixed(1)),
        avgDiplopia: Number(avgDiplopia.toFixed(1)),
        frequentDoubleSessions: frequentDouble
      },
      nextQuestionsForClinician: [
        "내 증상이 수렴부전형인지, 기본형/원거리 우세형인지 확인할 검사는 무엇인가?",
        "near point of convergence, fusional vergence amplitude, stereoacuity 결과를 어떻게 해석해야 하는가?",
        "내게 home exercise가 적합한지, 어떤 운동은 피해야 하는지?"
      ],
      recent
    };
  }

  function trendMarkup() {
    const recent = state.logs.slice(0, 7).reverse();
    if (!recent.length) return "";
    return `
      <div class="vision-trend" aria-label="최근 기록 추세">
        ${recent.map(log => {
          const fatigue = Math.max(4, Number(log.fatigue || 0) * 18);
          const double = Math.max(4, Number(log.diplopia || 0) * 18);
          return `
            <span title="${escapeHtml(modes[log.mode]?.title || log.mode)} · 피로 ${Number(log.fatigue || 0)}/5 · 복시 ${Number(log.diplopia || 0)}/5">
              <i class="fatigue" style="height:${fatigue}%"></i>
              <i class="double" style="height:${double}%"></i>
            </span>
          `;
        }).join("")}
      </div>
      <small class="vision-trend-caption">최근 7회: 민트=피로, 노랑=복시 느낌. 치료 지표가 아니라 진료 전 패턴 기록입니다.</small>
    `;
  }

  function render() {
    const root = document.querySelector("#vision-training-root");
    if (!root) return;
    const selected = modes[state.mode] || modes.pursuit;
    const load = weeklyLoad();
    const progress = Math.min(100, Math.round(load / 12));
    const currentGuidance = guidance();
    const stageLocked = currentGuidance.lockTraining && state.mode !== "rest";
    const runLabel = stageLocked
      ? currentGuidance.action
      : state.running
        ? "멈춤"
        : state.mode === "rest"
          ? "이완 타이머 시작"
          : currentGuidance.action;
    root.innerHTML = `
      <section class="vision-recovery-shell">
        <article class="vision-recovery-hero">
          <div>
            <p class="eyebrow">intermittent exotropia support</p>
            <h2>억지로 눈을 버티는 화면이 아니라, 피로·복시·회복 패턴을 안전하게 기록하는 책입니다.</h2>
            <p>간헐외사시와 복시는 유형, 나이, 굴절상태, 양안시 기능에 따라 접근이 달라집니다. 이 화면은 전문가 진료 전후에 “내 증상이 언제, 얼마나, 어떻게 변하는지”를 구조화하는 보조 도구입니다.</p>
          </div>
          <div class="vision-load-card">
            <span>7일 누적</span>
            <strong>${Math.round(load / 60)}분</strong>
            <small>${state.logs.length}개 기록 · ${escapeHtml(state.remoteStatus)}</small>
            <i><em style="width:${progress}%"></em></i>
          </div>
        </article>

        <section class="vision-guidance-row" aria-label="오늘의 안전 브리핑">
          <article class="vision-guidance-card ${escapeHtml(currentGuidance.risk)}">
            <span class="vision-risk-pill">${escapeHtml(currentGuidance.label)}</span>
            <strong>${escapeHtml(currentGuidance.title)}</strong>
            <p>${escapeHtml(currentGuidance.body)}</p>
          </article>
          <article class="vision-guidance-card">
            <span>검사에서 확인할 것</span>
            <strong>NPC · fusional vergence · stereoacuity</strong>
            <p>화면 기록은 “언제 복시가 올라오는지”를 정리하는 용도입니다. 실제 유형 판단과 운동 처방은 전문 검사로 분리하세요.</p>
          </article>
          <article class="vision-guidance-card">
            <span>오늘의 원칙</span>
            <strong>짧게, 선명하게, 끝나면 이완</strong>
            <p>불편감이 올라가면 성공적으로 멈춘 것입니다. 오래 버티는 행동은 훈련 품질을 떨어뜨릴 수 있습니다.</p>
          </article>
        </section>

        <section class="vision-grid">
          <article class="vision-stage-card">
            <div class="vision-stage-head">
              <div>
                <p class="eyebrow">training window</p>
                <h2>${escapeHtml(selected.title)}</h2>
                <p>${escapeHtml(selected.subtitle)}</p>
              </div>
              <button class="primary" type="button" data-vision-run>${escapeHtml(runLabel)}</button>
            </div>
            <div class="vision-stage ${escapeHtml(state.mode)} ${state.running ? "running" : ""}" aria-label="${escapeHtml(selected.title)}">
              ${stageMarkup()}
            </div>
            <div class="vision-caution">${escapeHtml(selected.caution)}</div>
          </article>

          <aside class="vision-control-card">
            <p class="eyebrow">control deck</p>
            <h2>오늘의 세팅</h2>
            <div class="vision-mode-grid">
              ${Object.entries(modes).map(([id, mode]) => `
                <button class="vision-mode-button ${state.mode === id ? "active" : ""}" type="button" data-vision-mode="${escapeHtml(id)}">
                  <strong>${escapeHtml(mode.title)}</strong>
                  <small>${escapeHtml(mode.label)} · ${escapeHtml(mode.evidence)}</small>
                </button>
              `).join("")}
            </div>
            <label class="vision-range">훈련 시간: <b>${state.seconds}초</b><input type="range" min="30" max="180" step="30" value="${state.seconds}" data-vision-field="seconds"></label>
            <label class="vision-range">피로도: <b>${state.fatigue}/5</b><input type="range" min="1" max="5" value="${state.fatigue}" data-vision-field="fatigue"></label>
            <label class="vision-range">복시 느낌: <b>${state.diplopia}/5</b><input type="range" min="0" max="5" value="${state.diplopia}" data-vision-field="diplopia"></label>
            <label class="vision-select">오늘의 조절 상태
              <select data-vision-control>
                <option value="single" ${state.control === "single" ? "selected" : ""}>대체로 하나로 보임</option>
                <option value="brief-double" ${state.control === "brief-double" ? "selected" : ""}>잠깐 복시 후 회복</option>
                <option value="frequent-double" ${state.control === "frequent-double" ? "selected" : ""}>복시가 자주 나타남</option>
              </select>
            </label>
            <label class="vision-check">
              <input type="checkbox" data-vision-monocular ${state.approvedMonocular ? "checked" : ""}>
              <span>전문가가 지시한 경우에만 한쪽 눈 가림 추적 표시를 켭니다.</span>
            </label>
            <label class="vision-note">짧은 메모
              <textarea data-vision-note placeholder="예: 피곤할 때만 잠깐 복시, 먼 곳 볼 때 더 자주 느낌">${escapeHtml(state.note)}</textarea>
            </label>
            <button class="primary" type="button" data-vision-save>오늘 기록 저장</button>
          </aside>
        </section>

        <section class="vision-info-grid">
          <article class="vision-danger-card">
            <p class="eyebrow">stop conditions</p>
            <h2>즉시 멈출 신호</h2>
            <ul>${stopSignals.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
          </article>
          <article>
            <p class="eyebrow">terms</p>
            <h2>용어를 바로 이해하기</h2>
            <div class="vision-term-list">
              <span><b>IXT</b> intermittent exotropia, 간헐적으로 한 눈이 바깥쪽으로 나가는 상태</span>
              <span><b>Diplopia</b> 복시, 하나의 물체가 둘로 보이는 느낌</span>
              <span><b>Fusion</b> 두 눈 입력을 뇌가 하나의 선명한 상으로 합치는 기능</span>
              <span><b>NPC</b> near point of convergence, 가까이 볼 때 두 눈이 함께 버틸 수 있는 거리</span>
            </div>
          </article>
          <article>
            <p class="eyebrow">clinician packet</p>
            <h2>진료 때 가져갈 질문</h2>
            <p>“내 타입이 수렴부전형인지?”, “NPC와 fusional vergence amplitude는 어떤지?”, “집에서 해도 되는 운동과 피해야 할 운동은 무엇인지?”를 기록으로 가져가세요.</p>
            <button class="secondary" type="button" data-vision-copy>AI/진료 요약 packet 복사</button>
            <small class="vision-copy-status"></small>
          </article>
        </section>

        <section class="vision-grid">
          <article class="vision-source-card">
            <p class="eyebrow">research boundary</p>
            <h2>공개 근거 기반으로 반영한 것</h2>
            <div class="vision-source-list">
              ${publicSources.map(([title, url, summary]) => `
                <a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">
                  <strong>${escapeHtml(title)}</strong>
                  <span>${escapeHtml(summary)}</span>
                </a>
              `).join("")}
            </div>
          </article>
          <article class="vision-log-card">
            <p class="eyebrow">session log</p>
            <h2>최근 시기능 기록</h2>
            ${trendMarkup()}
            ${state.logs.length ? `
              <div class="vision-log-list">
                ${state.logs.slice(0, 10).map(log => `
                  <article>
                    <strong>${escapeHtml(modes[log.mode]?.title || log.mode)}</strong>
                    <span>${Number(log.seconds || 0)}초 · 피로 ${Number(log.fatigue || 0)}/5 · 복시 ${Number(log.diplopia || 0)}/5</span>
                    <small>${escapeHtml(controlLabel(log.control))} · ${new Date(log.createdAt).toLocaleString("ko-KR")} · ${escapeHtml(log.syncStatus || "local")}</small>
                    ${log.note ? `<p>${escapeHtml(log.note)}</p>` : ""}
                  </article>
                `).join("")}
              </div>
            ` : `
              <div class="vision-empty">
                <strong>아직 기록이 없습니다.</strong>
                <span>30-60초 짧은 세션 뒤 저장하면 피로·복시 패턴을 나중에 설명하기 쉬워집니다.</span>
              </div>
            `}
          </article>
        </section>
      </section>
    `;
    bind();
  }

  function bind() {
    document.querySelector("[data-vision-run]")?.addEventListener("click", () => {
      const currentGuidance = guidance();
      if (currentGuidance.lockTraining && state.mode !== "rest") {
        state.mode = "rest";
        state.running = false;
        state.remoteStatus = "복시/피로 신호가 높아 이완 모드로 전환";
        persist();
        render();
        return;
      }
      state.running = !state.running;
      persist();
      render();
    });
    document.querySelectorAll("[data-vision-mode]").forEach(button => {
      button.addEventListener("click", () => {
        state.mode = button.dataset.visionMode || "pursuit";
        state.running = false;
        persist();
        render();
      });
    });
    document.querySelectorAll("[data-vision-field]").forEach(input => {
      input.addEventListener("input", () => {
        state[input.dataset.visionField] = Number(input.value);
        persist();
        render();
      });
    });
    document.querySelector("[data-vision-control]")?.addEventListener("change", event => {
      state.control = event.target.value;
      persist();
      render();
    });
    document.querySelector("[data-vision-monocular]")?.addEventListener("change", event => {
      state.approvedMonocular = event.target.checked;
      persist();
      render();
    });
    document.querySelector("[data-vision-note]")?.addEventListener("input", event => {
      state.note = event.target.value.slice(0, 500);
      persist();
    });
    document.querySelector("[data-vision-save]")?.addEventListener("click", saveSession);
    document.querySelector("[data-vision-copy]")?.addEventListener("click", copyPacket);
  }

  function saveSession() {
    const session = {
      id: `vision-${uid()}`,
      schemaVersion: SCHEMA_VERSION,
      mode: state.mode,
      seconds: Number(state.seconds),
      fatigue: Number(state.fatigue),
      diplopia: Number(state.diplopia),
      control: state.control,
      approvedMonocular: Boolean(state.approvedMonocular),
      note: state.note.trim(),
      createdAt: new Date().toISOString(),
      symptomRisk: symptomRisk(),
      syncStatus: "local saved"
    };
    state.logs = [session, ...state.logs].slice(0, 120);
    state.running = false;
    state.note = "";
    state.remoteStatus = "로컬 저장 완료 · D1 동기화 시도 중";
    persist();
    render();
    pushRemote(session);
  }

  async function pushRemote(session) {
    try {
      const payload = {
        id: session.id,
        type: "Vision Function Practice",
        subsystem: "시기능 회복훈련",
        severity: "sensitive-summary",
        title: `시기능 ${modes[session.mode]?.label || session.mode} 기록`,
        bookId: "vision-function-recovery",
        bookTitle: "시기능 회복훈련",
        chapter: "훈련 로그",
        topic: modes[session.mode]?.title || session.mode,
        privacyLevel: "sensitive-summary",
        exportPolicy: "redacted-summary-only",
        schemaVersion: SCHEMA_VERSION,
        evidence: "사용자 자가 기록. 진단/치료 처방 아님. 공개 근거 기반 안전 경계 포함.",
        action: `${session.seconds}초 ${modes[session.mode]?.title || session.mode}`,
        result: `피로 ${session.fatigue}/5, 복시 ${session.diplopia}/5, 조절 ${controlLabel(session.control)}`,
        nextStep: session.control === "frequent-double" || session.diplopia >= 4
          ? "반복되면 훈련을 중단하고 안과/사시 전문가에게 상담"
          : "짧은 세션으로 패턴을 계속 기록",
        tags: ["vision", "intermittent-exotropia", "diplopia", session.mode],
        entities: ["intermittent exotropia", "diplopia", "fusion control"],
        payload: session,
        aiExportOk: false,
        createdAt: session.createdAt
      };
      const response = await fetch("/api/v4/records", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      state.logs = state.logs.map(log => log.id === session.id ? { ...log, syncStatus: "D1 saved" } : log);
      state.remoteStatus = "D1 저장 완료";
    } catch {
      state.logs = state.logs.map(log => log.id === session.id ? { ...log, syncStatus: "local only" } : log);
      state.remoteStatus = "로컬 저장 완료 · D1은 다음 접속 때 다시 시도 필요";
    }
    persist();
    render();
  }

  async function copyPacket() {
    const status = document.querySelector(".vision-copy-status");
    const text = JSON.stringify(packetPreview(), null, 2);
    try {
      await navigator.clipboard.writeText(text);
      if (status) status.textContent = "요약 packet을 복사했습니다.";
    } catch {
      if (status) status.textContent = "클립보드 복사 실패. 브라우저 권한을 확인하세요.";
    }
  }

  document.addEventListener("DOMContentLoaded", render);
  window.ProjectUniverseVisionTraining = {
    getState: () => ({ ...state, logs: [...state.logs] }),
    render,
    packetPreview
  };
})();
