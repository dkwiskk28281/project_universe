(() => {
const THINK_TANK_KEY = "epiThinkTankEntries";
const THINK_TANK_PENDING_KEY = "epiThinkTankPendingEntries";
const EPI_VAULT_CONFIG = window.EPI_VAULT_CONFIG || {};
const isLocalBrowserHost = ["127.0.0.1", "localhost", "::1"].includes(location.hostname);
const isGithubPagesHost = location.hostname.endsWith("github.io");
const isPersonalServerProxy = location.pathname.startsWith("/personal-server");
const isCloudflareWorkerHost = location.hostname.endsWith(".workers.dev");
const REMOTE_VAULT_API = "https://projectuniverse.chang2058.workers.dev";
const THINK_TANK_API = EPI_VAULT_CONFIG.apiUrl ||
  (isPersonalServerProxy ? `${location.origin}/personal-server` : "") ||
  (isCloudflareWorkerHost ? location.origin : "") ||
  (location.port === "4180" ? location.origin : REMOTE_VAULT_API);
const THINK_TANK_CLIENT_PASS = "ceTrainerPass";
const THINK_TANK_REMOTE_TOKEN = "epiThinkTankRemoteToken";
const LOCAL_VAULT_API = EPI_VAULT_CONFIG.localApiUrl || "http://127.0.0.1:4180";
const LOCAL_VAULT_TOKEN = "epiThinkTankLocalToken";
const PRIVATE_CACHE_PURGED = "epiPrivateCachePurgedStrictV2";

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
  return sessionStorage.getItem(THINK_TANK_CLIENT_PASS) || "";
}

function vaultToken() {
  return sessionStorage.getItem(THINK_TANK_REMOTE_TOKEN) || "";
}

function localVaultToken() {
  return sessionStorage.getItem(LOCAL_VAULT_TOKEN) || "";
}

function clearClientAuthState() {
  sessionStorage.removeItem(THINK_TANK_CLIENT_PASS);
  sessionStorage.removeItem(THINK_TANK_REMOTE_TOKEN);
  sessionStorage.removeItem(LOCAL_VAULT_TOKEN);
}

async function purgeBrowserPrivacyCaches() {
  let changed = false;
  try {
    if ("serviceWorker" in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map(registration => {
        changed = true;
        return registration.unregister();
      }));
    }
  } catch {
    // Service worker cleanup is best-effort.
  }
  try {
    if ("caches" in window) {
      const names = await caches.keys();
      await Promise.all(names.map(name => {
        changed = true;
        return caches.delete(name);
      }));
    }
  } catch {
    // Cache cleanup is best-effort.
  }
  if (changed && !sessionStorage.getItem(PRIVATE_CACHE_PURGED)) {
    sessionStorage.setItem(PRIVATE_CACHE_PURGED, "1");
    location.reload();
    return true;
  }
  return false;
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

function loadPendingEntries() {
  try {
    return JSON.parse(localStorage.getItem(THINK_TANK_PENDING_KEY) || "[]");
  } catch {
    return [];
  }
}

function savePendingEntries(entries) {
  localStorage.setItem(THINK_TANK_PENDING_KEY, JSON.stringify(entries));
}

function updateEntry(id, patch) {
  const entries = loadEntries();
  const next = entries.map(entry => entry.id === id ? { ...entry, ...patch } : entry);
  saveEntries(next);
  renderEntries();
}

function queuePendingEntry(entry) {
  const pending = loadPendingEntries();
  const byId = new Map(pending.map(item => [item.id, item]));
  byId.set(entry.id, { ...entry, syncStatus: "pending D1 sync" });
  savePendingEntries([...byId.values()]);
}

function removePendingEntry(id) {
  savePendingEntries(loadPendingEntries().filter(entry => entry.id !== id));
}

async function pushEntryToPrimary(entry) {
  const result = await apiFetch("/api/entries", { method: "POST", body: JSON.stringify(entry) });
  const savedEntry = result.entry || { ...entry, remoteSavedAt: new Date().toISOString() };
  updateEntry(entry.id, {
    ...savedEntry,
    syncStatus: "D1 saved"
  });
  removePendingEntry(entry.id);
  try {
    await mirrorToLocalVault("/api/entries", savedEntry);
  } catch {
    // D drive mirror is optional; Cloudflare D1 remains the source of truth.
  }
  return savedEntry;
}

async function retryPendingEntries() {
  const pending = loadPendingEntries();
  if (!pending.length || !vaultToken()) return;
  for (const entry of pending) {
    try {
      await pushEntryToPrimary(entry);
    } catch {
      queuePendingEntry(entry);
    }
  }
}

async function syncUnsavedLocalEntries(reason = "manual") {
  const localOnly = loadEntries().filter(entry =>
    entry.id &&
    (!entry.remoteSavedAt || entry.syncStatus === "pending D1 sync" || entry.syncStatus === "local saved")
  );
  if (!localOnly.length || !vaultToken()) return 0;
  let saved = 0;
  for (const entry of localOnly) {
    try {
      await pushEntryToPrimary({ ...entry, syncReason: reason });
      saved += 1;
    } catch {
      queuePendingEntry(entry);
    }
  }
  return saved;
}

function tokenForApi(base) {
  return base === LOCAL_VAULT_API ? localVaultToken() : vaultToken();
}

async function apiFetch(path, options = {}, base = THINK_TANK_API) {
  const controller = new AbortController();
  const { timeoutMs, ...fetchOptions } = options;
  const timeout = setTimeout(() => controller.abort(), timeoutMs || (base === LOCAL_VAULT_API ? 900 : 1800));
  const token = tokenForApi(base);
  try {
    const response = await fetch(`${base}${path}`, {
      ...fetchOptions,
      signal: controller.signal,
      credentials: base === LOCAL_VAULT_API ? "omit" : "include",
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

async function loginToApi(base, password, tokenKey, timeoutMs = 2500) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(`${base}/api/login`, {
      method: "POST",
      credentials: base === LOCAL_VAULT_API ? "omit" : "include",
      signal: controller.signal,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password })
    });
    if (!response.ok) return false;
    const data = await response.json();
    if (data?.token) sessionStorage.setItem(tokenKey, data.token);
    return !!data?.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

async function remoteLogin(password) {
  const primaryOk = await loginToApi(THINK_TANK_API, password, THINK_TANK_REMOTE_TOKEN, 2500);
  if (THINK_TANK_API !== LOCAL_VAULT_API) {
    await loginToApi(LOCAL_VAULT_API, password, LOCAL_VAULT_TOKEN, 900);
  }
  return primaryOk;
}

function getLocalStorageSnapshot() {
  const snapshot = {};
  for (let i = 0; i < localStorage.length; i += 1) {
    const key = localStorage.key(i);
    if (!key || key === THINK_TANK_CLIENT_PASS) continue;
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
    data.entries.forEach(entry => {
      byId.set(entry.id, { ...entry, syncStatus: "D1 saved" });
      removePendingEntry(entry.id);
    });
    saveEntries([...byId.values()]);
    renderEntries();
  } catch {
    // Local-only mode stays usable when the remote vault is unavailable.
  }
}

async function localVaultHealth() {
  if (THINK_TANK_API === LOCAL_VAULT_API) {
    return apiFetch("/api/health");
  }
  if (!localVaultToken()) return null;
  return apiFetch("/api/health", { timeoutMs: 900 }, LOCAL_VAULT_API);
}

async function mirrorToLocalVault(path, payload) {
  if (THINK_TANK_API === LOCAL_VAULT_API || !localVaultToken()) return null;
  return apiFetch(path, {
    method: "POST",
    timeoutMs: 1200,
    body: JSON.stringify(payload)
  }, LOCAL_VAULT_API);
}

async function syncAppStateV2(reason = "interval") {
  if (!vaultPassword() && !vaultToken()) return;
  const payload = {
    reason,
    href: location.href,
    savedAt: new Date().toISOString(),
    localStorage: getLocalStorageSnapshot()
  };
  let primarySaved = false;
  let localSaved = false;
  try {
    await apiFetch("/api/state", { method: "POST", body: JSON.stringify(payload) });
    primarySaved = true;
  } catch {
    primarySaved = false;
  }
  try {
    const localResult = await mirrorToLocalVault("/api/state", payload);
    localSaved = !!localResult?.ok;
  } catch {
    localSaved = false;
  }
  const marker = document.querySelector("#vault-last-sync");
  if (marker) {
    const dbText = primarySaved ? "DB 저장 완료" : "DB 저장 대기";
    const localText = localSaved ? "D 드라이브 백업 완료" : "D 드라이브 미연결";
    marker.textContent = `최근 동기화: ${new Date().toLocaleString()} · ${dbText} · ${localText}`;
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
    queuePendingEntry(entry);
    updateEntry(entry.id, { syncStatus: "pending D1 sync" });
    const marker = document.querySelector("#vault-last-sync");
    if (marker) marker.textContent = "최근 저장: 이 기기에는 저장됨, D1 동기화 재시도 대기";
    return;
    if (marker) marker.textContent = "최근 백업: 로컬 vault 서버 미연결";
  }
}

function renderVaultStatus(status = {}) {
  const statusEl = document.querySelector("#vault-status-panel");
  if (!statusEl) return;
  const primary = status.primary || status;
  const local = status.local || null;
  const dbOnline = !!primary.ok;
  const localOnline = !!local?.ok;
  statusEl.innerHTML = `
    <div>
      <p class="eyebrow">Storage Status</p>
      <h2>${dbOnline ? "Cloudflare D1 저장소 연결됨" : "Cloudflare D1 저장소 확인 중"}</h2>
      <p id="vault-last-sync">DB: ${escapeHtml(primary.storage || "Cloudflare D1")} ${primary.binding ? `· binding ${escapeHtml(primary.binding)}` : ""}</p>
      <div class="vault-pill-row">
        <span class="vault-pill ${dbOnline ? "" : "offline"}">Cloud DB ${dbOnline ? "ONLINE" : "OFFLINE"}</span>
        <span class="vault-pill ${localOnline ? "" : "offline"}">D Drive ${localOnline ? "MIRROR ON" : "MIRROR OFF"}</span>
        <span class="vault-pill">Password Gate</span>
      </div>
    </div>
    <div>
      <strong>${localOnline ? "D 드라이브 미러 백업 활성" : "이 PC의 D 드라이브 백업 대기"}</strong>
      <div class="vault-map">
        <span>Primary DB: Cloudflare D1 / ce_data</span>
        <span>Local mirror: ${localOnline ? escapeHtml(local.vaultRoot || "D:\\FEP_EPI_ThinkTank_Vault") : "이 PC에서 vault 서버가 켜지면 자동 감지"}</span>
        <span>D:\\FEP_EPI_ThinkTank_Vault\\entries\\YYYY\\MM\\entry-id.json</span>
        <span>D:\\FEP_EPI_ThinkTank_Vault\\snapshots\\state-YYYYMMDD-HHMMSS.json</span>
        <span>D:\\FEP_EPI_ThinkTank_Vault\\exports\\thinktank-export.json</span>
      </div>
    </div>
  `;
  return;
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
        <div class="vault-pill-stack">
          <span class="vault-pill">${escapeHtml(entry.severity || "Learning")}</span>
          <span class="vault-pill ${entry.remoteSavedAt ? "" : "offline"}">${escapeHtml(entry.syncStatus || (entry.remoteSavedAt ? "D1 saved" : "local only"))}</span>
        </div>
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
    syncStatus: "syncing to D1",
    ...data
  };
  const entries = loadEntries();
  entries.push(entry);
  saveEntries(entries);
  renderEntries();
  form.reset();

  try {
    await pushEntryToPrimary(entry);
    await syncAppStateV2("entry-save");
  } catch {
    queuePendingEntry(entry);
    updateEntry(entry.id, { syncStatus: "pending D1 sync" });
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
    try {
      await mirrorToLocalVault("/api/export", payload);
    } catch {
      // D drive mirror is optional; Cloudflare D1 remains the source of truth.
    }
    await syncAppStateV2("manual-export");
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
            <button class="secondary" type="button" id="thinktank-sync-all">로컬 기록 DB로 동기화</button>
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
  document.querySelector("#thinktank-sync-all").addEventListener("click", async () => {
    const saved = await syncUnsavedLocalEntries("manual-sync");
    await retryPendingEntries();
    const marker = document.querySelector("#vault-last-sync");
    if (marker) marker.textContent = `수동 동기화 완료: ${saved}개 기록 확인`;
  });
  document.querySelector("#thinktank-export").addEventListener("click", exportThinkTank);
  renderEntries();
}

async function refreshVaultStatus() {
  let primary = { ok: false };
  let local = null;
  try {
    primary = await apiFetch("/api/health");
  } catch {
    primary = { ok: false };
  }
  try {
    local = await localVaultHealth();
  } catch {
    local = null;
  }
  renderVaultStatus({ primary, local });
}

function unlockApp() {
  document.body.classList.remove("auth-locked");
  document.body.classList.add("auth-unlocked");
  renderThinkTank();
  refreshVaultStatus().then(async () => {
    await pullRemoteEntries();
    await retryPendingEntries();
    await syncUnsavedLocalEntries("unlock");
  });
  syncAppStateV2("unlock");
  setInterval(() => {
    syncAppStateV2("interval");
    retryPendingEntries();
  }, 30000);
}

async function initPasswordGate() {
  const form = document.querySelector("#password-form");
  const input = document.querySelector("#password-input");
  const error = document.querySelector("#password-error");
  document.querySelector("#logout-btn")?.addEventListener("click", async () => {
    clearClientAuthState();
    try {
      await fetch(`${THINK_TANK_API}/api/logout`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" }
      });
    } catch {
      // Navigating to /logout below clears the server cookie when online.
    }
    location.href = "/logout";
  });
  if (vaultToken()) {
    try {
      await apiFetch("/api/health");
      sessionStorage.setItem(THINK_TANK_CLIENT_PASS, "remote");
      unlockApp();
      return;
    } catch {
      clearClientAuthState();
    }
  }
  try {
    await apiFetch("/api/health");
    sessionStorage.setItem(THINK_TANK_CLIENT_PASS, "server-cookie");
    unlockApp();
    return;
  } catch {
    // No server session yet. Fall through to password form.
  }
  input?.focus();
  form?.addEventListener("submit", async event => {
    event.preventDefault();
    const remoteOk = await remoteLogin(input.value);
    if (remoteOk) {
      sessionStorage.setItem(THINK_TANK_CLIENT_PASS, "remote");
      unlockApp();
    } else {
      error.textContent = "비밀번호가 맞지 않습니다.";
      input.value = "";
      input.focus();
    }
  });
}

(async () => {
  if (await purgeBrowserPrivacyCaches()) return;
  initPasswordGate();
})();
})();
