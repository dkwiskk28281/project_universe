(() => {
const THINK_TANK_PASSWORD = "9175";
const THINK_TANK_KEY = "epiThinkTankEntries";
const EPI_VAULT_CONFIG = window.EPI_VAULT_CONFIG || {};
const THINK_TANK_API = EPI_VAULT_CONFIG.apiUrl || (location.port === "4180" ? location.origin : "http://127.0.0.1:4180");
const THINK_TANK_REMOTE_TOKEN = "epiThinkTankRemoteToken";

const masteryDomains = [
  ["EPI Process Physics", ["surface preparation", "nucleation", "growth rate", "mass transport", "reaction kinetics", "selectivity"]],
  ["Materials / Device Link", ["Si", "SiGe", "Si:C", "dopant incorporation", "source-drain", "channel strain", "contact resistance"]],
  ["Tool Architecture", ["Centura platform", "process module", "pre-clean integration", "transfer module", "load lock", "chamber matching"]],
  ["Gas / Chemistry", ["chlorosilanes", "silane family", "H2 carrier", "dopant gases", "HCl etch/selectivity", "purge and abatement"]],
  ["Thermal / Vacuum Control", ["temperature uniformity", "pyrometry", "pressure control", "pumpdown", "leak integrity", "flow response"]],
  ["Electrical / Controls", ["24V control", "PLC I/O", "relay logic", "interlock chain", "DVM evidence", "sensor feedback"]],
  ["Metrology / Data", ["thickness", "resistivity", "defect map", "particles", "SPC", "FDC", "golden tool comparison"]],
  ["Install / Qualification", ["site readiness", "facility hook-up", "SAT/OQ/PQ", "baseline package", "punch list", "handover"]],
  ["Yield / Process Engineering", ["DOE", "root-cause analysis", "process window", "chamber matching", "excursion control", "change control"]],
  ["Papers / Patents", ["selective epi", "GAA source-drain", "SiGe", "pre-clean", "low-volume chambers", "metrology correlation"]]
];

const experienceTypes = [
  "Troubleshooting",
  "Installation",
  "Qualification",
  "Maintenance / PM",
  "Process Drift",
  "Safety / Interlock",
  "Customer Communication",
  "Paper / Patent Note",
  "Process Engineer Insight"
];

const subsystemOptions = [
  "EPI chamber",
  "Pre-clean / clean module",
  "Transfer module / robot",
  "Load lock / EFEM",
  "Gas delivery / MFC",
  "Vacuum / exhaust / abatement",
  "Thermal / temperature",
  "Electrical / controls / DVM",
  "Metrology / defect / SPC",
  "Facility hook-up",
  "Customer / procedure"
];

function vaultPassword() {
  return sessionStorage.getItem("ceTrainerPass") || "";
}

function vaultToken() {
  return sessionStorage.getItem(THINK_TANK_REMOTE_TOKEN) || "";
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function loadEntries() {
  try {
    return JSON.parse(localStorage.getItem(THINK_TANK_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveEntries(entries) {
  localStorage.setItem(THINK_TANK_KEY, JSON.stringify(entries));
}

async function apiFetch(path, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 1800);
  const token = vaultToken();
  try {
    const response = await fetch(`${THINK_TANK_API}${path}`, {
      ...options,
      signal: controller.signal,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-ThinkTank-Password": vaultPassword(),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {})
      }
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  } finally {
    clearTimeout(timeout);
  }
}

async function remoteLogin(password) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2500);
  try {
    const response = await fetch(`${THINK_TANK_API}/api/login`, {
      method: "POST",
      credentials: "include",
      signal: controller.signal,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password })
    });
    if (!response.ok) return false;
    const data = await response.json();
    if (data?.token) sessionStorage.setItem(THINK_TANK_REMOTE_TOKEN, data.token);
    return !!data?.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

function getLocalStorageSnapshot() {
  const snapshot = {};
  for (let i = 0; i < localStorage.length; i += 1) {
    const key = localStorage.key(i);
    if (!key || key === "ceTrainerPass") continue;
    snapshot[key] = localStorage.getItem(key);
  }
  return snapshot;
}

async function pullRemoteEntries() {
  try {
    const data = await apiFetch("/api/entries");
    if (!Array.isArray(data.entries)) return;
    const local = loadEntries();
    const byId = new Map(local.map(entry => [entry.id, entry]));
    data.entries.forEach(entry => byId.set(entry.id, entry));
    saveEntries([...byId.values()]);
    renderEntries();
  } catch {
    // Local-only mode stays usable when the remote vault is unavailable.
  }
}

async function syncAppState(reason = "interval") {
  if (!vaultPassword()) return;
  try {
    await apiFetch("/api/state", {
      method: "POST",
      body: JSON.stringify({
        reason,
        href: location.href,
        savedAt: new Date().toISOString(),
        localStorage: getLocalStorageSnapshot()
      })
    });
    const marker = document.querySelector("#vault-last-sync");
    if (marker) marker.textContent = `최근 백업: ${new Date().toLocaleString()}`;
  } catch {
    const marker = document.querySelector("#vault-last-sync");
    if (marker) marker.textContent = "최근 백업: 로컬 vault 서버 미연결";
  }
}

function renderVaultStatus(status = {}) {
  const statusEl = document.querySelector("#vault-status-panel");
  if (!statusEl) return;
  const online = !!status.ok;
  statusEl.innerHTML = `
    <div>
      <p class="eyebrow">Vault Status</p>
      <h2>${online ? "D 드라이브 백업 연결됨" : "브라우저 로컬 저장 모드"}</h2>
      <p id="vault-last-sync">${online ? `Vault: ${escapeHtml(status.vaultRoot)}` : "로컬 vault 서버를 켜면 D 드라이브에 자동 백업됩니다."}</p>
      <div class="vault-pill-row">
        <span class="vault-pill ${online ? "" : "offline"}">${online ? "ONLINE" : "OFFLINE"}</span>
        <span class="vault-pill">Password Gate</span>
        <span class="vault-pill">LocalStorage fallback</span>
      </div>
    </div>
    <div>
      <strong>D 드라이브 저장 구조</strong>
      <div class="vault-map">
        <span>D:\\FEP_EPI_ThinkTank_Vault\\index.json</span>
        <span>D:\\FEP_EPI_ThinkTank_Vault\\entries\\YYYY\\MM\\entry-id.json</span>
        <span>D:\\FEP_EPI_ThinkTank_Vault\\snapshots\\state-YYYYMMDD-HHMMSS.json</span>
        <span>D:\\FEP_EPI_ThinkTank_Vault\\backups\\entry-id-timestamp.json</span>
        <span>D:\\FEP_EPI_ThinkTank_Vault\\exports\\thinktank-export.json</span>
      </div>
    </div>
  `;
}

function renderTaxonomy() {
  return `
    <div class="thinktank-grid">
      ${masteryDomains.map(([title, items]) => `
        <article class="taxonomy-card">
          <h2>${escapeHtml(title)}</h2>
          <ul>${items.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </article>
      `).join("")}
    </div>
  `;
}

function entryTags(entry) {
  return [entry.type, entry.tool, entry.subsystem, ...(entry.tags || "").split(",")]
    .map(tag => tag.trim())
    .filter(Boolean)
    .slice(0, 10);
}

function renderEntries() {
  const list = document.querySelector("#thinktank-entry-list");
  if (!list) return;
  const entries = loadEntries().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  list.innerHTML = entries.length ? entries.map(entry => `
    <article class="vault-entry">
      <header>
        <div>
          <h2>${escapeHtml(entry.title || "Untitled experience")}</h2>
          <small>${escapeHtml(entry.createdAt || "")}</small>
        </div>
        <span class="vault-pill">${escapeHtml(entry.severity || "Learning")}</span>
      </header>
      <p>${escapeHtml(entry.context || "").slice(0, 260)}</p>
      <ul>
        <li><strong>증상:</strong> ${escapeHtml(entry.symptom || "")}</li>
        <li><strong>측정/증거:</strong> ${escapeHtml(entry.evidence || "")}</li>
        <li><strong>원인/가설:</strong> ${escapeHtml(entry.rootCause || "")}</li>
        <li><strong>다음 학습:</strong> ${escapeHtml(entry.nextStudy || "")}</li>
      </ul>
      <div class="entry-tags">${entryTags(entry).map(tag => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
    </article>
  `).join("") : `
    <article class="vault-entry">
      <h2>아직 저장된 경험이 없습니다</h2>
      <p>첫 install/troubleshooting 경험을 구조화해서 저장하면 이 공간이 개인 EPI 지식 엔진으로 자라기 시작합니다.</p>
    </article>
  `;
}

async function saveThinkTankEntry(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = Object.fromEntries(new FormData(form).entries());
  const entry = {
    id: `entry-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...data
  };
  const entries = loadEntries();
  entries.push(entry);
  saveEntries(entries);
  renderEntries();
  form.reset();

  try {
    await apiFetch("/api/entries", { method: "POST", body: JSON.stringify(entry) });
    await syncAppState("entry-save");
  } catch {
    const marker = document.querySelector("#vault-last-sync");
    if (marker) marker.textContent = "최근 백업: 브라우저 저장 완료, D 드라이브 vault 미연결";
  }
}

async function exportThinkTank() {
  const payload = {
    exportedAt: new Date().toISOString(),
    entries: loadEntries(),
    localStorage: getLocalStorageSnapshot(),
    masteryDomains
  };
  try {
    await apiFetch("/api/export", { method: "POST", body: JSON.stringify(payload) });
    await syncAppState("manual-export");
  } catch {
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `epi-thinktank-export-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
}

function renderThinkTank() {
  const root = document.querySelector("#thinktank-root");
  if (!root) return;
  root.innerHTML = `
    <section class="vault-status" id="vault-status-panel"></section>
    <section class="thinktank-layout">
      <article class="thinktank-panel">
        <p class="eyebrow">Structured Experience Capture</p>
        <h2>경험 입력</h2>
        <p>문제 경험을 “상황 -> 증상 -> 계측 -> 원인/가설 -> 조치 -> 배운 점”으로 저장합니다.</p>
        <form class="thinktank-form" id="thinktank-form">
          <label>제목<input name="title" required placeholder="예: PM 후 load lock pumpdown time 증가" /></label>
          <label>유형<select name="type">${experienceTypes.map(type => `<option>${type}</option>`).join("")}</select></label>
          <label>장비/플랫폼<input name="tool" placeholder="예: Centura Prime Epi, Vantage RTP, unknown" /></label>
          <label>Subsystem<select name="subsystem">${subsystemOptions.map(item => `<option>${item}</option>`).join("")}</select></label>
          <label>심각도<select name="severity"><option>Learning</option><option>Tool Down</option><option>Safety Stop</option><option>Qualification Risk</option><option>Customer Escalation</option></select></label>
          <label>상황 / 배경<textarea name="context" placeholder="언제, 어떤 작업 후, 어떤 조건에서 발생했는지"></textarea></label>
          <label>증상<textarea name="symptom" placeholder="alarm, trend, wafer result, customer observation"></textarea></label>
          <label>계측 / 증거<textarea name="evidence" placeholder="DVM 값, log, trace, pressure, MFC response, metrology"></textarea></label>
          <label>원인 / 가설<textarea name="rootCause" placeholder="확인된 root cause 또는 현재 hypothesis"></textarea></label>
          <label>조치 / 결과<textarea name="action" placeholder="무엇을 했고 어떤 결과가 나왔는지"></textarea></label>
          <label>다음 학습<textarea name="nextStudy" placeholder="더 공부할 논문, 도면, 이론, 질문"></textarea></label>
          <label>태그<input name="tags" placeholder="pumpdown, relay, MFC, GAA, defect..." /></label>
          <div class="thinktank-actions">
            <button class="primary" type="submit">경험 저장</button>
            <button class="secondary" type="button" id="thinktank-export">백업/내보내기</button>
          </div>
        </form>
      </article>
      <article class="thinktank-panel">
        <p class="eyebrow">Accumulated Memory</p>
        <h2>저장된 경험</h2>
        <div class="vault-entry-list" id="thinktank-entry-list"></div>
      </article>
    </section>
    <section class="thinktank-panel" style="margin-top:14px">
      <p class="eyebrow">Roadmap First</p>
      <h2>전세계급 EPI 전문가로 가기 위한 지식 목록</h2>
      <p>지금은 데이터를 억지로 채우지 않고, 앞으로 쌓아야 할 큰 분류부터 잡습니다. 경험을 저장할 때 이 목록과 연결해 빈 곳을 계속 메우면 됩니다.</p>
      ${renderTaxonomy()}
    </section>
  `;
  document.querySelector("#thinktank-form").addEventListener("submit", saveThinkTankEntry);
  document.querySelector("#thinktank-export").addEventListener("click", exportThinkTank);
  renderEntries();
}

async function refreshVaultStatus() {
  try {
    renderVaultStatus(await apiFetch("/api/health"));
  } catch {
    renderVaultStatus({ ok: false });
  }
}

function unlockApp() {
  document.body.classList.remove("auth-locked");
  document.body.classList.add("auth-unlocked");
  renderThinkTank();
  refreshVaultStatus().then(pullRemoteEntries);
  syncAppState("unlock");
  setInterval(() => syncAppState("interval"), 30000);
}

async function initPasswordGate() {
  const form = document.querySelector("#password-form");
  const input = document.querySelector("#password-input");
  const error = document.querySelector("#password-error");
  if (vaultToken()) {
    try {
      await apiFetch("/api/health");
      sessionStorage.setItem("ceTrainerPass", "remote");
      unlockApp();
      return;
    } catch {
      sessionStorage.removeItem(THINK_TANK_REMOTE_TOKEN);
    }
  }
  try {
    await apiFetch("/api/health");
    sessionStorage.setItem("ceTrainerPass", "server-cookie");
    unlockApp();
    return;
  } catch {
    // No server session yet. Fall through to password form.
  }
  if (sessionStorage.getItem("ceTrainerPass") === THINK_TANK_PASSWORD) {
    unlockApp();
    return;
  }
  input?.focus();
  form?.addEventListener("submit", async event => {
    event.preventDefault();
    const remoteOk = await remoteLogin(input.value);
    if (remoteOk) {
      sessionStorage.setItem("ceTrainerPass", "remote");
      unlockApp();
    } else if (input.value === THINK_TANK_PASSWORD) {
      sessionStorage.setItem("ceTrainerPass", THINK_TANK_PASSWORD);
      unlockApp();
    } else {
      error.textContent = "비밀번호가 맞지 않습니다.";
      input.value = "";
      input.focus();
    }
  });
}

initPasswordGate();
})();
