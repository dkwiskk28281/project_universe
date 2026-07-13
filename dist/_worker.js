import { createRemoteJWKSet, jwtVerify } from "jose";
import {
  generateAuthenticationOptions,
  generateRegistrationOptions,
  verifyAuthenticationResponse,
  verifyRegistrationResponse
} from "@simplewebauthn/server";

const COOKIE_NAME = "epi_vault_session_strict_v2";
const LEGACY_COOKIE_NAMES = ["epi_vault_session"];
const SESSION_SECONDS = 2 * 60 * 60;
const SESSION_VERSION = "strict-v2";
const PERSONAL_SERVER_PREFIX = "/personal-server";
const DEFAULT_PERSONAL_SERVER_URL = "https://fep-epi-vault-9175.loca.lt";
const ONCHAIN_COIN_IDS = ["bitcoin", "ethereum", "solana", "chainlink", "aave", "uniswap"];
const TOKENIZATION_COIN_IDS = ["ondo-finance", "centrifuge", "maple", "pax-gold", "tether-gold", "ethena", "maker"];

function jsonResponse(request, data, status = 200, headers = {}) {
  const origin = request.headers.get("Origin") || "*";
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, X-ThinkTank-Password",
      "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS",
      ...headers
    }
  });
}

function htmlResponse(html, status = 200, headers = {}) {
  return new Response(html, {
    status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      ...headers
    }
  });
}

function plainResponse(message, status = 500) {
  return new Response(message, {
    status,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}

function expiredCookie(name) {
  return `${name}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

function sessionCookie(token) {
  return `${COOKIE_NAME}=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${SESSION_SECONDS}`;
}

function appendClearLegacyCookies(headers) {
  LEGACY_COOKIE_NAMES.forEach(name => headers.append("Set-Cookie", expiredCookie(name)));
}

function base64Url(bytes) {
  let binary = "";
  new Uint8Array(bytes).forEach(byte => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlText(text) {
  return btoa(text).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function decodeBase64Url(value) {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((value.length + 3) % 4);
  return atob(padded);
}

function base64UrlToBytes(value = "") {
  const binary = decodeBase64Url(value);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
  return bytes;
}

function bytesToBase64Url(bytes) {
  if (!bytes) return "";
  if (bytes instanceof ArrayBuffer) return base64Url(bytes);
  if (ArrayBuffer.isView(bytes)) return base64Url(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength));
  return base64Url(new Uint8Array(bytes));
}

async function hmac(secret, value) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  return base64Url(await crypto.subtle.sign("HMAC", key, encoder.encode(value)));
}

async function createToken(env) {
  const now = Math.floor(Date.now() / 1000);
  const payload = base64UrlText(JSON.stringify({
    v: SESSION_VERSION,
    iat: now,
    exp: now + SESSION_SECONDS,
    nonce: crypto.randomUUID()
  }));
  const signature = await hmac(sessionSecret(env), payload);
  return `${payload}.${signature}`;
}

function sessionSecret(env) {
  return env.SESSION_SECRET || env.EPI_PASSWORD || "change-me";
}

async function verifyToken(env, token) {
  if (!token || !token.includes(".")) return false;
  const [payload, signature] = token.split(".");
  const expected = await hmac(sessionSecret(env), payload);
  if (signature !== expected) return false;
  try {
    const data = JSON.parse(decodeBase64Url(payload));
    return data.v === SESSION_VERSION && Number(data.exp) > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

function accessConfig(env) {
  const teamDomain = String(env.TEAM_DOMAIN || "").replace(/\/$/, "");
  const aud = String(env.POLICY_AUD || "");
  return {
    configured: Boolean(teamDomain && aud),
    teamDomain,
    aud
  };
}

async function verifyAccessJwt(request, env) {
  const config = accessConfig(env);
  if (!config.configured) return null;
  const token = request.headers.get("cf-access-jwt-assertion");
  if (!token) return null;
  const JWKS = createRemoteJWKSet(new URL(`${config.teamDomain}/cdn-cgi/access/certs`));
  const { payload } = await jwtVerify(token, JWKS, {
    issuer: config.teamDomain,
    audience: config.aud
  });
  return {
    provider: "cloudflare-access",
    email: payload.email || "",
    sub: payload.sub || "",
    aud: payload.aud || "",
    exp: payload.exp || 0
  };
}

function cookieToken(request) {
  const cookie = request.headers.get("Cookie") || "";
  const match = cookie.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  return match?.[1] || "";
}

function bearerToken(request) {
  const auth = request.headers.get("Authorization") || "";
  return auth.startsWith("Bearer ") ? auth.slice(7) : "";
}

async function isAuthenticated(request, env) {
  if (await verifyToken(env, bearerToken(request) || cookieToken(request))) return true;
  try {
    return Boolean(await verifyAccessJwt(request, env));
  } catch {
    return false;
  }
}

function loginPage(message = "") {
  return `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Project Universe Login</title>
  <style>
    :root{color-scheme:dark}
    *{box-sizing:border-box}
    body{margin:0;min-height:100vh;display:grid;place-items:center;background:radial-gradient(circle at 20% 15%,rgba(69,255,188,.16),transparent 34%),#03100f;font-family:Segoe UI,Malgun Gothic,Arial,sans-serif;color:#ecfff8}
    main{width:min(460px,calc(100vw - 28px));display:grid;gap:14px;padding:28px;border:1px solid rgba(127,255,196,.28);border-radius:10px;background:rgba(2,18,18,.94);box-shadow:0 30px 80px rgba(0,0,0,.45)}
    .mark{display:grid;place-items:center;width:44px;height:44px;border-radius:8px;background:#32ffad;color:#021110;font-weight:950}
    p{margin:0;color:#b9dacf;line-height:1.55} h1{margin:0;color:#fff} label{display:grid;gap:6px;font-weight:850;color:#dffff2}
    input{min-height:44px;padding:0 12px;border:1px solid rgba(127,255,196,.28);border-radius:8px;background:#061f1d;color:#fff}
    button{min-height:44px;border:0;border-radius:8px;background:#32ffad;color:#03110f;font-weight:900;cursor:pointer}
    button.secondary{background:transparent;color:#ecfff8;border:1px solid rgba(127,255,196,.34)}
    small{color:#ffd38a;line-height:1.45}.split{display:grid;gap:10px}.status{min-height:20px;color:#9cffd8}
  </style>
</head>
<body>
  <main>
    <span class="mark">PU</span>
    <h1>Project Universe</h1>
    <p>개인 책장과 장기 기억 영역입니다. Cloudflare Access가 연결되어 있으면 Access JWT로, 등록된 기기에서는 Passkey로, 호환 모드에서는 비밀번호로 잠금을 해제합니다.</p>
    <form class="split" method="post" action="/api/login-form">
    <label>Password<input name="password" type="password" inputmode="numeric" autocomplete="current-password" autofocus /></label>
    <button type="submit">비밀번호로 열기</button>
    </form>
    <button class="secondary" type="button" id="passkey-login">Passkey로 열기</button>
    <small class="status" id="passkey-status">${message}</small>
    <small>${message}</small>
  </main>
  <script>
    function b64ToBuffer(value){
      const base64=String(value||"").replace(/-/g,"+").replace(/_/g,"/");
      const padded=base64+"===".slice((base64.length+3)%4);
      const binary=atob(padded);
      const bytes=new Uint8Array(binary.length);
      for(let i=0;i<binary.length;i+=1)bytes[i]=binary.charCodeAt(i);
      return bytes.buffer;
    }
    function bufferToB64(buffer){
      const bytes=new Uint8Array(buffer||new ArrayBuffer(0));
      let binary="";
      bytes.forEach(byte=>{binary+=String.fromCharCode(byte);});
      return btoa(binary).replace(/\\+/g,"-").replace(/\\//g,"_").replace(/=+$/,"");
    }
    function parseOptions(options){
      if(window.PublicKeyCredential&&PublicKeyCredential.parseRequestOptionsFromJSON){
        return PublicKeyCredential.parseRequestOptionsFromJSON(options);
      }
      const publicKey=structuredClone(options);
      publicKey.challenge=b64ToBuffer(publicKey.challenge);
      if(Array.isArray(publicKey.allowCredentials)){
        publicKey.allowCredentials=publicKey.allowCredentials.map(item=>({...item,id:b64ToBuffer(item.id)}));
      }
      return publicKey;
    }
    function credentialJson(credential){
      if(credential&&credential.toJSON)return credential.toJSON();
      const response=credential.response||{};
      const out={id:credential.id,rawId:bufferToB64(credential.rawId),type:credential.type,clientExtensionResults:credential.getClientExtensionResults?credential.getClientExtensionResults():{},response:{}};
      ["clientDataJSON","authenticatorData","signature","userHandle"].forEach(key=>{if(response[key])out.response[key]=bufferToB64(response[key]);});
      return out;
    }
    document.getElementById("passkey-login").addEventListener("click",async()=>{
      const status=document.getElementById("passkey-status");
      try{
        if(!window.PublicKeyCredential||!navigator.credentials)throw new Error("이 브라우저는 Passkey/WebAuthn을 지원하지 않습니다.");
        const optionsResponse=await fetch("/api/passkey/auth/options",{credentials:"include"});
        const optionsData=await optionsResponse.json();
        if(!optionsResponse.ok||!optionsData.ok)throw new Error(optionsData.error||"Passkey option 생성 실패");
        if(!optionsData.hasPasskeys)throw new Error("아직 등록된 Passkey가 없습니다. 비밀번호로 들어간 뒤 Security Center에서 등록하세요.");
        const credential=await navigator.credentials.get({publicKey:parseOptions(optionsData.options)});
        const verifyResponse=await fetch("/api/passkey/auth/verify",{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:"owner",response:credentialJson(credential)})});
        const verifyData=await verifyResponse.json();
        if(!verifyResponse.ok||!verifyData.ok)throw new Error(verifyData.error||"Passkey 검증 실패");
        location.href="/";
      }catch(error){
        status.textContent="Passkey 실패: "+(error.message||"unknown");
      }
    });
  </script>
</body>
</html>`;
}

function validTunnelUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname.endsWith(".loca.lt") ? url.toString().replace(/\/$/, "") : "";
  } catch {
    return "";
  }
}

async function resolvePersonalServerUrl(env) {
  const configured = validTunnelUrl(env.PERSONAL_SERVER_URL || "");
  if (configured) return configured;
  return DEFAULT_PERSONAL_SERVER_URL;
}

async function fetchJson(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeoutMs || 9000);
  try {
    const response = await fetch(url, {
      headers: {
        accept: "application/json",
        "User-Agent": "ProjectUniverseOnchainIntel/1.0",
        ...(options.headers || {})
      },
      signal: controller.signal
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
}

function rewriteProxyLocation(value, targetBase, proxyBase) {
  if (!value) return value;
  if (value === "/") return `${proxyBase}/`;
  if (value.startsWith("/")) return `${proxyBase}${value}`;
  if (value.startsWith(targetBase)) return `${proxyBase}${value.slice(targetBase.length) || "/"}`;
  return value;
}

async function rewriteProxyBody(response, proxyBase) {
  const contentType = response.headers.get("Content-Type") || "";
  if (!contentType.includes("text/html") && !contentType.includes("javascript")) return response.body;
  const text = await response.text();
  return text
    .replaceAll('action="/api/login-form"', `action="${proxyBase}/api/login-form"`)
    .replaceAll('href="/', `href="${proxyBase}/`)
    .replaceAll('src="/', `src="${proxyBase}/`);
}

async function handlePersonalServerProxy(request, env, url) {
  const targetBase = await resolvePersonalServerUrl(env);
  const target = new URL(targetBase);
  const proxyBase = `${url.origin}${PERSONAL_SERVER_PREFIX}`;
  const suffix = url.pathname.slice(PERSONAL_SERVER_PREFIX.length) || "/";
  target.pathname = suffix.startsWith("/") ? suffix : `/${suffix}`;
  target.search = url.search;

  const headers = new Headers(request.headers);
  headers.delete("Host");
  headers.set("bypass-tunnel-reminder", "1");
  headers.set("User-Agent", "FEP-EPI-Vault-Cloudflare-Proxy");
  headers.set("X-Forwarded-Host", url.host);
  headers.set("X-Forwarded-Proto", url.protocol.replace(":", ""));
  if (!target.pathname.startsWith("/api/")) {
    headers.set("X-ThinkTank-Password", String(env.EPI_PASSWORD || "9175"));
  }

  const upstreamRequest = new Request(target.toString(), {
    method: request.method,
    headers,
    body: request.method === "GET" || request.method === "HEAD" ? undefined : request.body,
    redirect: "manual"
  });

  const upstream = await fetch(upstreamRequest);
  const responseHeaders = new Headers(upstream.headers);
  responseHeaders.set("Cache-Control", "no-store");
  responseHeaders.set("X-Personal-Server-Target", targetBase);
  responseHeaders.delete("Content-Length");

  const location = responseHeaders.get("Location");
  if (location) responseHeaders.set("Location", rewriteProxyLocation(location, targetBase, PERSONAL_SERVER_PREFIX));

  const body = await rewriteProxyBody(upstream, PERSONAL_SERVER_PREFIX);
  return new Response(body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: responseHeaders
  });
}

async function readBody(request) {
  const contentType = request.headers.get("Content-Type") || "";
  if (contentType.includes("application/json")) return request.json();
  if (contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data")) {
    const form = await request.formData();
    return Object.fromEntries(form.entries());
  }
  return {};
}

function d1Binding(env) {
  return env.DB || env.ce_data || env.CE_DATA || null;
}

function d1BindingName(env) {
  if (env.DB) return "DB";
  if (env.ce_data) return "ce_data";
  if (env.CE_DATA) return "CE_DATA";
  return "";
}

async function ensureSchema(env) {
  const db = d1Binding(env);
  if (!db) return;
  await db.prepare(`CREATE TABLE IF NOT EXISTS entries (
    id TEXT PRIMARY KEY,
    created_at TEXT,
    updated_at TEXT,
    title TEXT,
    type TEXT,
    subsystem TEXT,
    severity TEXT,
    payload TEXT NOT NULL
  )`).run();
  await db.prepare(`CREATE TABLE IF NOT EXISTS snapshots (
    id TEXT PRIMARY KEY,
    created_at TEXT,
    reason TEXT,
    payload TEXT NOT NULL
  )`).run();
  await db.prepare(`CREATE TABLE IF NOT EXISTS exports (
    id TEXT PRIMARY KEY,
    created_at TEXT,
    payload TEXT NOT NULL
  )`).run();
  await db.prepare("CREATE INDEX IF NOT EXISTS idx_entries_type_created_at ON entries(type, created_at)").run();
  await db.prepare("CREATE INDEX IF NOT EXISTS idx_entries_subsystem_created_at ON entries(subsystem, created_at)").run();

  await db.prepare(`CREATE TABLE IF NOT EXISTS life_records (
    id TEXT PRIMARY KEY,
    legacy_entry_id TEXT,
    book_id TEXT,
    chapter TEXT,
    topic TEXT,
    title TEXT,
    record_type TEXT,
    privacy_level TEXT,
    export_policy TEXT,
    schema_version TEXT,
    source_device TEXT,
    created_at TEXT,
    updated_at TEXT,
    evidence TEXT,
    action TEXT,
    result TEXT,
    next_step TEXT,
    tags TEXT,
    entities TEXT,
    payload TEXT NOT NULL,
    integrity_hash TEXT
  )`).run();
  await db.prepare(`CREATE TABLE IF NOT EXISTS life_edges (
    id TEXT PRIMARY KEY,
    from_id TEXT,
    to_id TEXT,
    label TEXT,
    weight INTEGER,
    evidence TEXT,
    created_at TEXT
  )`).run();
  await db.prepare(`CREATE TABLE IF NOT EXISTS file_index (
    id TEXT PRIMARY KEY,
    record_id TEXT,
    label TEXT,
    file_type TEXT,
    content_hash TEXT,
    location_hint TEXT,
    storage_target TEXT,
    privacy_level TEXT,
    export_policy TEXT,
    ai_summary TEXT,
    tags TEXT,
    linked_book TEXT,
    created_at TEXT,
    updated_at TEXT,
    payload TEXT
  )`).run();
  await db.prepare(`CREATE TABLE IF NOT EXISTS weakness_events (
    id TEXT PRIMARY KEY,
    record_id TEXT,
    lane TEXT,
    skill TEXT,
    severity TEXT,
    evidence TEXT,
    next_action TEXT,
    created_at TEXT,
    payload TEXT
  )`).run();
  await db.prepare(`CREATE TABLE IF NOT EXISTS audit_events (
    id TEXT PRIMARY KEY,
    event_type TEXT,
    subject_id TEXT,
    severity TEXT,
    message TEXT,
    created_at TEXT,
    payload TEXT
  )`).run();
  await db.prepare(`CREATE TABLE IF NOT EXISTS ai_packets (
    id TEXT PRIMARY KEY,
    created_at TEXT,
    packet_type TEXT,
    privacy_scope TEXT,
    payload TEXT NOT NULL
  )`).run();
  await db.prepare(`CREATE TABLE IF NOT EXISTS passkey_users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE,
    display_name TEXT,
    webauthn_user_id TEXT UNIQUE,
    created_at TEXT,
    updated_at TEXT
  )`).run();
  await db.prepare(`CREATE TABLE IF NOT EXISTS passkey_credentials (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    webauthn_user_id TEXT,
    public_key TEXT NOT NULL,
    counter INTEGER,
    transports TEXT,
    device_type TEXT,
    backed_up INTEGER,
    nickname TEXT,
    created_at TEXT,
    last_used_at TEXT,
    payload TEXT
  )`).run();
  await db.prepare(`CREATE TABLE IF NOT EXISTS passkey_challenges (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    kind TEXT,
    challenge TEXT,
    created_at TEXT,
    expires_at TEXT,
    options TEXT
  )`).run();
  await db.prepare(`CREATE TABLE IF NOT EXISTS r2_objects (
    key TEXT PRIMARY KEY,
    label TEXT,
    record_id TEXT,
    file_type TEXT,
    size INTEGER,
    content_type TEXT,
    etag TEXT,
    content_hash TEXT,
    privacy_level TEXT,
    export_policy TEXT,
    ai_summary TEXT,
    tags TEXT,
    created_at TEXT,
    updated_at TEXT,
    payload TEXT
  )`).run();
  await db.prepare(`CREATE TABLE IF NOT EXISTS case_game_sessions (
    id TEXT PRIMARY KEY,
    case_id TEXT,
    subsystem TEXT,
    status TEXT,
    score INTEGER,
    current_step TEXT,
    completed INTEGER,
    created_at TEXT,
    updated_at TEXT,
    payload TEXT
  )`).run();
  await db.prepare(`CREATE TABLE IF NOT EXISTS case_game_events (
    id TEXT PRIMARY KEY,
    session_id TEXT,
    case_id TEXT,
    step TEXT,
    answer TEXT,
    correct INTEGER,
    feedback TEXT,
    created_at TEXT,
    payload TEXT
  )`).run();
  await db.prepare("CREATE INDEX IF NOT EXISTS idx_life_records_book_updated ON life_records(book_id, updated_at)").run();
  await db.prepare("CREATE INDEX IF NOT EXISTS idx_life_records_privacy_updated ON life_records(privacy_level, updated_at)").run();
  await db.prepare("CREATE INDEX IF NOT EXISTS idx_life_edges_from_label ON life_edges(from_id, label)").run();
  await db.prepare("CREATE INDEX IF NOT EXISTS idx_life_edges_to_label ON life_edges(to_id, label)").run();
  await db.prepare("CREATE INDEX IF NOT EXISTS idx_file_index_record ON file_index(record_id, created_at)").run();
  await db.prepare("CREATE INDEX IF NOT EXISTS idx_weakness_lane_created ON weakness_events(lane, created_at)").run();
  await db.prepare("CREATE INDEX IF NOT EXISTS idx_audit_events_created ON audit_events(created_at)").run();
  await db.prepare("CREATE INDEX IF NOT EXISTS idx_passkey_credentials_user ON passkey_credentials(user_id, created_at)").run();
  await db.prepare("CREATE INDEX IF NOT EXISTS idx_passkey_challenges_user_kind ON passkey_challenges(user_id, kind)").run();
  await db.prepare("CREATE INDEX IF NOT EXISTS idx_r2_objects_record ON r2_objects(record_id, updated_at)").run();
  await db.prepare("CREATE INDEX IF NOT EXISTS idx_case_game_sessions_case ON case_game_sessions(case_id, updated_at)").run();
  await db.prepare("CREATE INDEX IF NOT EXISTS idx_case_game_events_session ON case_game_events(session_id, created_at)").run();
}

function requireDb(env) {
  const db = d1Binding(env);
  if (!db) throw new Error("D1 binding is not configured. Expected binding name DB or ce_data.");
  return db;
}

function stableJson(value) {
  if (Array.isArray(value)) return `[${value.map(stableJson).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${stableJson(value[key])}`).join(",")}}`;
  }
  return JSON.stringify(value ?? null);
}

function hashText(value = "") {
  let hash = 2166136261;
  const text = String(value);
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

function exportPolicyForEntry(entry = {}) {
  if (!entry.aiExportOk) return "excluded-unless-user-approves";
  if (entry.privacyLevel === "sensitive-index") return "ai-index-only";
  if (entry.privacyLevel === "sensitive-summary") return "ai-redacted-summary-only";
  if (entry.privacyLevel === "controlled-export") return "ai-controlled-summary";
  if (entry.privacyLevel === "work-learning") return "ai-summary-ok";
  return "ai-private-summary-only";
}

function parsePayload(row) {
  try {
    return JSON.parse(row.payload);
  } catch {
    return {
      id: row.id || crypto.randomUUID(),
      type: "Corrupt Payload",
      title: row.title || "JSON parse failed",
      hidden: true,
      createdAt: row.created_at || ""
    };
  }
}

function normalizeStoredEntry(entry, id, createdAt, updatedAt) {
  const payload = {
    ...entry,
    id,
    createdAt,
    updatedAt,
    remoteSavedAt: updatedAt,
    schemaVersion: entry.schemaVersion || "server-normalized-entry-v1",
    syncStatus: "D1 saved",
    sourceDevice: entry.sourceDevice || "unknown-device",
    privacyLevel: entry.privacyLevel || entry.severity || "private-summary",
    storageTier: entry.storageTier || "d1-json",
    recordKind: entry.recordKind || "structured-summary",
    exportPolicy: entry.exportPolicy || exportPolicyForEntry(entry),
    fileIndex: Array.isArray(entry.fileIndex) ? entry.fileIndex.slice(0, 12) : []
  };
  payload.serverIntegrityHash = hashText(stableJson({
    id: payload.id,
    type: payload.type || "",
    title: payload.title || "",
    subsystem: payload.subsystem || "",
    severity: payload.severity || "",
    privacyLevel: payload.privacyLevel || "",
    sourceDevice: payload.sourceDevice || "",
    exportPolicy: payload.exportPolicy || "",
    createdAt: payload.createdAt,
    summary: payload.summary || payload.context || "",
    evidence: payload.evidence || "",
    nextAction: payload.nextAction || payload.nextStudy || "",
    fileIndex: payload.fileIndex
  }));
  return payload;
}

function safeArray(value) {
  if (Array.isArray(value)) return value.map(item => String(item || "").trim()).filter(Boolean);
  if (typeof value === "string") return value.split(",").map(item => item.trim()).filter(Boolean);
  return [];
}

function compactText(value = "", limit = 1200) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, limit);
}

function stableNodeId(prefix, value) {
  const clean = compactText(value, 160).toLowerCase();
  return `${prefix}:${hashText(clean || prefix)}`;
}

function inferRecordBook(entry = {}) {
  if (entry.bookId) return String(entry.bookId);
  const type = String(entry.type || "").toLowerCase();
  const subsystem = String(entry.subsystem || "").toLowerCase();
  if (type.includes("english")) return "learning-library";
  if (type.includes("cognitive")) return "cognitive-resilience";
  if (type.includes("dyor") || subsystem.includes("crypto") || subsystem.includes("investment")) return "investment-dyor";
  if (type.includes("health") || subsystem.includes("health")) return "family-health";
  if (type.includes("think") || type.includes("troubleshooting") || subsystem.includes("epi") || subsystem.includes("install")) return "career-fep-epi";
  return subsystem || "life-os";
}

function recordNodeId(id) {
  return `record:${id}`;
}

async function upsertLifeEdge(db, fromId, toId, label, evidence = "", weight = 1) {
  if (!fromId || !toId || !label) return;
  const id = `edge:${hashText(`${fromId}|${toId}|${label}`)}`;
  await db.prepare(`INSERT OR REPLACE INTO life_edges
    (id, from_id, to_id, label, weight, evidence, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)`)
    .bind(id, fromId, toId, label, weight, compactText(evidence, 500), new Date().toISOString())
    .run();
}

async function insertAuditEvent(db, eventType, subjectId, severity, message, payload = {}) {
  await db.prepare(`INSERT INTO audit_events
    (id, event_type, subject_id, severity, message, created_at, payload)
    VALUES (?, ?, ?, ?, ?, ?, ?)`)
    .bind(
      crypto.randomUUID(),
      eventType,
      subjectId || "",
      severity || "info",
      compactText(message, 500),
      new Date().toISOString(),
      JSON.stringify(payload)
    )
    .run();
}

function lifeRecordFromEntry(entry = {}) {
  const id = String(entry.id || crypto.randomUUID());
  const createdAt = String(entry.createdAt || entry.created_at || new Date().toISOString());
  const updatedAt = String(entry.updatedAt || entry.updated_at || entry.remoteSavedAt || new Date().toISOString());
  const bookId = inferRecordBook(entry);
  const tags = [...new Set([
    ...safeArray(entry.tags),
    entry.type,
    entry.subsystem,
    entry.pageType,
    entry.status
  ].map(item => compactText(item, 80)).filter(Boolean))].slice(0, 24);
  const entities = [...new Set([
    ...safeArray(entry.entities),
    entry.subsystem,
    entry.tool,
    entry.platform,
    entry.asset,
    entry.owner
  ].map(item => compactText(item, 120)).filter(Boolean))].slice(0, 24);
  return {
    id,
    legacyEntryId: id,
    nodeId: recordNodeId(id),
    bookId,
    chapter: compactText(entry.chapter || entry.pageType || entry.subsystem || "", 160),
    topic: compactText(entry.topic || entry.title || entry.prompt || entry.skillTag || "", 160),
    title: compactText(entry.title || entry.topic || entry.type || "Untitled record", 220),
    recordType: compactText(entry.type || entry.recordKind || "General Record", 120),
    privacyLevel: compactText(entry.privacyLevel || entry.severity || "private-summary", 100),
    exportPolicy: compactText(entry.exportPolicy || exportPolicyForEntry(entry), 120),
    schemaVersion: compactText(entry.schemaVersion || "life-record-v4", 100),
    sourceDevice: compactText(entry.sourceDevice || "unknown-device", 120),
    createdAt,
    updatedAt,
    evidence: compactText(entry.evidence || entry.source || entry.publicBasis || "", 1800),
    action: compactText(entry.action || entry.next || entry.selected || "", 1800),
    result: compactText(entry.result || entry.feedback || entry.good || "", 1800),
    nextStep: compactText(entry.nextStep || entry.nextAction || entry.nextStudy || "", 1800),
    tags,
    entities,
    payload: entry,
    integrityHash: entry.serverIntegrityHash || entry.integrityHash || hashText(stableJson(entry))
  };
}

async function upsertV4FromEntry(db, entry = {}) {
  const record = lifeRecordFromEntry(entry);
  await db.prepare(`INSERT OR REPLACE INTO life_records
    (id, legacy_entry_id, book_id, chapter, topic, title, record_type, privacy_level, export_policy, schema_version, source_device,
     created_at, updated_at, evidence, action, result, next_step, tags, entities, payload, integrity_hash)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .bind(
      record.id,
      record.legacyEntryId,
      record.bookId,
      record.chapter,
      record.topic,
      record.title,
      record.recordType,
      record.privacyLevel,
      record.exportPolicy,
      record.schemaVersion,
      record.sourceDevice,
      record.createdAt,
      record.updatedAt,
      record.evidence,
      record.action,
      record.result,
      record.nextStep,
      JSON.stringify(record.tags),
      JSON.stringify(record.entities),
      JSON.stringify(record.payload),
      record.integrityHash
    )
    .run();

  await upsertLifeEdge(db, record.nodeId, `book:${record.bookId}`, "belongs-to-book", record.bookId, 3);
  for (const tag of record.tags) await upsertLifeEdge(db, record.nodeId, stableNodeId("tag", tag), "tagged", tag, 2);
  for (const entity of record.entities) await upsertLifeEdge(db, record.nodeId, stableNodeId("entity", entity), "mentions-entity", entity, 2);
  if (record.evidence) await upsertLifeEdge(db, record.nodeId, stableNodeId("evidence", record.evidence), "has-evidence", record.evidence, 1);
  if (record.nextStep) await upsertLifeEdge(db, record.nodeId, stableNodeId("next", record.nextStep), "has-next-step", record.nextStep, 2);
  if (record.result) await upsertLifeEdge(db, record.nodeId, stableNodeId("result", record.result), "has-result", record.result, 1);

  const files = Array.isArray(entry.fileIndex) ? entry.fileIndex.slice(0, 12) : [];
  for (const [index, file] of files.entries()) {
    const fileId = String(file.id || `file-${hashText(`${record.id}:${index}:${file.label || file.locationHint || ""}`)}`);
    await db.prepare(`INSERT OR REPLACE INTO file_index
      (id, record_id, label, file_type, content_hash, location_hint, storage_target, privacy_level, export_policy, ai_summary, tags, linked_book, created_at, updated_at, payload)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
      .bind(
        fileId,
        record.id,
        compactText(file.label || "indexed file", 160),
        compactText(file.fileType || file.type || "indexed-file", 80),
        compactText(file.contentHash || file.hash || "", 180),
        compactText(file.locationHint || file.pathHint || "", 500),
        compactText(file.storageTarget || file.storageTier || "D-drive-vault-or-future-R2", 120),
        compactText(file.privacyLevel || record.privacyLevel, 120),
        compactText(file.exportPolicy || "index-only-unless-user-approves", 120),
        compactText(file.aiSummary || file.summary || "", 1600),
        JSON.stringify(safeArray(file.tags || record.tags).slice(0, 16)),
        compactText(file.linkedBook || record.bookId, 120),
        file.createdAt || record.createdAt,
        record.updatedAt,
        JSON.stringify(file)
      )
      .run();
  }

  const weaknessItems = [];
  if (Array.isArray(entry.results)) {
    entry.results.filter(result => result && result.correct === false).forEach(result => {
      weaknessItems.push({
        lane: "english",
        skill: inferEnglishSkill(result),
        severity: "review",
        evidence: result.prompt || result.selected || "",
        nextAction: `Review ${inferEnglishSkill(result)} and solve 3 variations.`
      });
    });
  }
  safeArray(entry.weakSpots || entry.weaknesses).forEach(skill => {
    weaknessItems.push({
      lane: String(entry.type || "life").toLowerCase().includes("cognitive") ? "cognitive" : "life",
      skill,
      severity: "review",
      evidence: entry.title || entry.summary || "",
      nextAction: entry.nextAction || entry.nextStep || "Schedule a focused review."
    });
  });
  if (String(entry.type || "").toLowerCase().includes("scenario") && entry.correct === false) {
    weaknessItems.push({
      lane: "ce-judgement",
      skill: entry.subsystem || entry.status || "field judgement",
      severity: "safety-review",
      evidence: entry.prompt || entry.title || "",
      nextAction: "Redo symptom -> risk -> evidence -> stop condition before choosing action."
    });
  }
  for (const weakness of weaknessItems.slice(0, 24)) {
    await db.prepare(`INSERT OR REPLACE INTO weakness_events
      (id, record_id, lane, skill, severity, evidence, next_action, created_at, payload)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`)
      .bind(
        `weak:${hashText(`${record.id}:${weakness.lane}:${weakness.skill}:${weakness.evidence}`)}`,
        record.id,
        weakness.lane,
        compactText(weakness.skill, 160),
        weakness.severity,
        compactText(weakness.evidence, 800),
        compactText(weakness.nextAction, 800),
        new Date().toISOString(),
        JSON.stringify(weakness)
      )
      .run();
  }

  await insertAuditEvent(db, "life-record-upsert", record.id, "info", `Indexed ${record.recordType} into Life OS v4`, {
    bookId: record.bookId,
    tags: record.tags.length,
    entities: record.entities.length,
    files: files.length,
    weaknesses: weaknessItems.length
  });
  return record;
}

function inferEnglishSkill(result = {}) {
  const type = String(result.type || "").toLowerCase();
  const prompt = String(result.prompt || "").toLowerCase();
  if (result.skillTag) return String(result.skillTag);
  if (type.includes("grammar")) {
    if (prompt.includes("neither") || prompt.includes("nor")) return "subject-verb agreement";
    if (prompt.includes("has been") || prompt.includes("since") || prompt.includes("for")) return "present perfect and time expressions";
    if (prompt.includes("asked us") || prompt.includes("let me know")) return "verb pattern and indirect question";
    if (prompt.includes("locked out") || prompt.includes("reseated")) return "passive voice";
    if (prompt.includes("if") || prompt.includes("unless")) return "conditionals for safety holds";
    return "core grammar accuracy";
  }
  if (type.includes("vocabulary")) return "field-service vocabulary";
  if (type.includes("reading")) return "reading for status, risk, and next action";
  if (type.includes("listening")) return "listening for hold reason and owner";
  return String(result.type || "general English");
}

function buildEnglishWeakness(entries) {
  const records = entries.filter(entry => entry.type === "English CBT Practice");
  const stats = {};
  let totalQuestions = 0;
  let correctQuestions = 0;

  records.forEach(record => {
    (record.results || []).forEach(result => {
      const skill = inferEnglishSkill(result);
      if (!stats[skill]) stats[skill] = {
        skill,
        total: 0,
        wrong: 0,
        examples: []
      };
      stats[skill].total += 1;
      totalQuestions += 1;
      if (result.correct) {
        correctQuestions += 1;
      } else {
        stats[skill].wrong += 1;
        if (stats[skill].examples.length < 4) {
          stats[skill].examples.push({
            prompt: result.prompt || "",
            selected: result.selected || "",
            answer: result.answer || ""
          });
        }
      }
    });
  });

  const weaknesses = Object.values(stats)
    .map(item => ({
      ...item,
      accuracy: item.total ? Math.round((item.total - item.wrong) / item.total * 100) : 0,
      priority: item.wrong * 2 + Math.max(0, 80 - (item.total ? Math.round((item.total - item.wrong) / item.total * 100) : 0))
    }))
    .sort((a, b) => b.priority - a.priority);

  return {
    records: records.length,
    totalQuestions,
    correctQuestions,
    accuracy: totalQuestions ? Math.round(correctQuestions / totalQuestions * 100) : 0,
    weaknesses,
    nextStudy: weaknesses.slice(0, 3).map(item => ({
      skill: item.skill,
      action: `Practice 10 focused questions and make 3 spoken field-service sentences using ${item.skill}.`
    }))
  };
}

function buildAiContext(entries) {
  const visible = entries.filter(entry => !entry.hidden);
  const bookshelfPages = visible.filter(entry => entry.type === "Personal Bookshelf Page");
  const investmentPages = bookshelfPages.filter(entry => entry.bookId === "investment-dyor");
  const cognitiveRecords = visible.filter(entry => entry.type === "Cognitive Resilience Practice");
  const byBook = {};
  bookshelfPages.forEach(page => {
    const key = page.bookId || page.subsystem || "unknown";
    if (!byBook[key]) byBook[key] = {
      bookId: key,
      bookTitle: page.bookTitle || page.subsystem || key,
      pages: 0,
      exportApproved: 0,
      latestPages: []
    };
    byBook[key].pages += 1;
    if (page.aiExportOk) byBook[key].exportApproved += 1;
    if (byBook[key].latestPages.length < 5) {
      byBook[key].latestPages.push({
        title: page.title || "",
        pageType: page.pageType || "",
        chapter: page.chapter || "",
        topic: page.topic || page.title || "",
        summary: page.summary || "",
        evidence: page.evidence || "",
        action: page.action || "",
        result: page.result || "",
        nextAction: page.nextAction || "",
        nextStep: page.nextStep || page.nextAction || "",
        tags: page.tags || [],
        entities: page.entities || [],
        date: page.date || "",
        createdAt: page.createdAt || ""
      });
    }
  });

  const countsByType = {};
  visible.forEach(entry => {
    const key = entry.type || "Unknown";
    countsByType[key] = (countsByType[key] || 0) + 1;
  });

  return {
    schema: "project-universe-ai-context-v2",
    generatedAt: new Date().toISOString(),
    privacyRule: "Use summaries and metadata only. Do not request passwords, account numbers, raw medical documents, confidential customer files, or third-party sensitive identifiers.",
    operatingPrompt: [
      "Treat this as a lifelong personal bookshelf, not a chat transcript.",
      "Find repeated patterns across work, health, learning, assets, business, relationships, and administration.",
      "Separate facts, assumptions, risks, missing data, and next actions.",
      "Never ask for raw secrets or confidential third-party documents.",
      "Return the smallest useful next step for the next 7 days."
    ],
    countsByType,
    quality: {
      totalEntries: visible.length,
      bookshelfPages: bookshelfPages.length,
      booksWithPages: Object.keys(byBook).length,
      aiExportApproved: bookshelfPages.filter(page => page.aiExportOk).length,
      pagesWithEvidence: bookshelfPages.filter(page => page.evidence).length,
      pagesWithNextAction: bookshelfPages.filter(page => page.nextAction).length
    },
    investment: {
      schema: "dyor-intelligence-v1",
      rule: "Do not produce buy/sell instructions. Separate official facts, interpretation, risk, noise, and invalidation conditions.",
      pages: investmentPages.length,
      exportApproved: investmentPages.filter(page => page.aiExportOk).length,
      latestResearch: investmentPages.slice(0, 20).map(page => ({
        title: page.title || "",
        pageType: page.pageType || "",
        chapter: page.chapter || "",
        topic: page.topic || page.title || "",
        summary: page.summary || "",
        evidence: page.evidence || "",
        action: page.action || "",
        result: page.result || "",
        nextAction: page.nextAction || "",
        nextStep: page.nextStep || page.nextAction || "",
        tags: page.tags || [],
        entities: page.entities || [],
        date: page.date || "",
        createdAt: page.createdAt || ""
      }))
    },
    cognitive: {
      schema: "cognitive-resilience-context-v1",
      rule: "Not medical diagnosis or treatment. Use as habit and training history; advise clinical consultation for functional decline, sudden change, or safety concerns.",
      records: cognitiveRecords.length,
      latestSessions: cognitiveRecords.slice(0, 20).map(record => ({
        title: record.title || "",
        sessionDate: record.sessionDate || record.createdAt || "",
        totalScore: record.totalScore || 0,
        completedTasks: record.completedTasks || 0,
        weakSpots: record.weakSpots || [],
        protectors: record.protectors || [],
        nextAction: record.nextAction || ""
      }))
    },
    bookshelf: Object.values(byBook),
    english: buildEnglishWeakness(visible),
    recentItems: visible.slice(0, 30).map(entry => ({
      id: entry.id || "",
      type: entry.type || "",
      title: entry.title || "",
      subsystem: entry.subsystem || "",
      severity: entry.severity || "",
      createdAt: entry.createdAt || "",
      bookId: entry.bookId || "",
      bookTitle: entry.bookTitle || "",
      chapter: entry.chapter || "",
      topic: entry.topic || "",
      summary: entry.summary || entry.context || "",
      evidence: entry.evidence || "",
      action: entry.action || "",
      result: entry.result || "",
      tags: entry.tags || [],
      entities: entry.entities || [],
      integrityHash: entry.integrityHash || entry.serverIntegrityHash || "",
      nextAction: entry.nextAction || entry.nextStep || entry.nextStudy || ""
    }))
  };
}

function providerStatus(env) {
  return {
    whalealert: {
      configured: Boolean(env.WHALE_ALERT_API_KEY),
      env: "WHALE_ALERT_API_KEY",
      role: "large crypto transaction alerts"
    },
    etherscan: {
      configured: Boolean(env.ETHERSCAN_API_KEY),
      env: "ETHERSCAN_API_KEY",
      role: "Ethereum address and token transfer intelligence"
    },
    glassnode: {
      configured: Boolean(env.GLASSNODE_API_KEY),
      env: "GLASSNODE_API_KEY",
      role: "exchange flow, holder behavior, advanced on-chain metrics"
    },
    coinglass: {
      configured: Boolean(env.COINGLASS_API_KEY),
      env: "COINGLASS_API_KEY",
      role: "derivatives and Hyperliquid whale position context"
    },
    defillama: {
      configured: true,
      env: "none",
      role: "TVL, stablecoins, fees, chain-level DeFi data"
    },
    coingecko: {
      configured: true,
      env: "none",
      role: "price and market cap context"
    }
  };
}

function tokenizationProviderStatus(env) {
  return {
    rwaxyz: {
      configured: Boolean(env.RWA_API_KEY),
      env: "RWA_API_KEY",
      role: "tokenized treasuries, private credit, commodities, and fund market data"
    },
    defillama: {
      configured: true,
      env: "none",
      role: "stablecoin supply by chain"
    },
    coingecko: {
      configured: true,
      env: "none",
      role: "RWA theme token and tokenized gold price context"
    },
    etherscan: {
      configured: Boolean(env.ETHERSCAN_API_KEY),
      env: "ETHERSCAN_API_KEY",
      role: "Ethereum ERC-20 holder and transfer-level verification"
    }
  };
}

function numberOrZero(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

async function buildOnchainIntel(env) {
  const generatedAt = new Date().toISOString();
  const priceUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${ONCHAIN_COIN_IDS.join(",")}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`;
  const [pricesResult, chainsResult, stablecoinsResult] = await Promise.allSettled([
    fetchJson(priceUrl),
    fetchJson("https://api.llama.fi/v2/chains"),
    fetchJson("https://stablecoins.llama.fi/stablecoins?includePrices=true")
  ]);

  const prices = pricesResult.status === "fulfilled" ? pricesResult.value : null;
  const chainsRaw = chainsResult.status === "fulfilled" && Array.isArray(chainsResult.value) ? chainsResult.value : [];
  const stableRaw = stablecoinsResult.status === "fulfilled" ? stablecoinsResult.value : null;
  const topChains = chainsRaw
    .map(chain => ({
      name: chain.name || chain.gecko_id || "unknown",
      tvl: numberOrZero(chain.tvl),
      change_1d: numberOrZero(chain.change_1d),
      change_7d: numberOrZero(chain.change_7d)
    }))
    .sort((a, b) => b.tvl - a.tvl)
    .slice(0, 8);

  const peggedAssets = Array.isArray(stableRaw?.peggedAssets) ? stableRaw.peggedAssets : [];
  const stablecoinMcap = peggedAssets.reduce((sum, asset) => sum + numberOrZero(asset.circulating?.peggedUSD || asset.circulating?.peggedUsd), 0);
  const riskSignals = [];

  topChains.forEach(chain => {
    if (Math.abs(chain.change_7d) >= 10) {
      riskSignals.push(`${chain.name} TVL 7일 변화 ${chain.change_7d.toFixed(1)}%: 원인 확인 필요`);
    }
  });

  Object.entries(prices || {}).forEach(([id, data]) => {
    const change = numberOrZero(data.usd_24h_change);
    if (Math.abs(change) >= 8) riskSignals.push(`${id} 24h 가격 변화 ${change.toFixed(1)}%: 온체인/뉴스 원인 분리 필요`);
  });

  return {
    schema: "onchain-intelligence-v1",
    generatedAt,
    note: "This is research infrastructure, not investment advice. Whale interpretation requires wallet labels, exchange context, and false-positive checks.",
    providers: providerStatus(env),
    macro: {
      prices,
      topChains,
      stablecoins: {
        totalMcapUsd: stablecoinMcap,
        trackedAssets: peggedAssets.length,
        note: stablecoinMcap ? `${peggedAssets.length}개 stablecoin supply 집계` : "stablecoin 집계 대기"
      }
    },
    whale: {
      status: env.WHALE_ALERT_API_KEY ? "provider-ready" : "provider-key-required",
      minUsdDefault: Number(env.WHALE_MIN_USD || 10000000),
      watchAddressesConfigured: Boolean(env.WHALE_WATCH_ADDRESSES),
      rules: [
        "exchange inflow is potential sell-pressure, but label confirmation is mandatory",
        "exchange outflow can indicate accumulation or custody movement",
        "stablecoin mint/burn and bridge flow are liquidity context, not direct buy signals",
        "large derivative positions are liquidation-risk context, not a standalone thesis"
      ]
    },
    riskSignals
  };
}

function chainStableValue(asset, chain, period) {
  const node = asset.chainCirculating?.[chain];
  if (!node) return 0;
  if (period === "current") return numberOrZero(node.current?.peggedUSD);
  return numberOrZero(node[period]?.peggedUSD);
}

function pctChange(current, previous) {
  if (!previous) return null;
  return (current - previous) / previous * 100;
}

async function buildTokenizationIntel(env) {
  const generatedAt = new Date().toISOString();
  const priceUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${TOKENIZATION_COIN_IDS.join(",")}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`;
  const [stablecoinsResult, rwaPricesResult] = await Promise.allSettled([
    fetchJson("https://stablecoins.llama.fi/stablecoins?includePrices=true"),
    fetchJson(priceUrl)
  ]);

  const stableRaw = stablecoinsResult.status === "fulfilled" ? stablecoinsResult.value : null;
  const assets = Array.isArray(stableRaw?.peggedAssets) ? stableRaw.peggedAssets : [];
  const ethereumRows = assets.map(asset => ({
    name: asset.name || asset.symbol || "unknown",
    symbol: asset.symbol || "",
    current: chainStableValue(asset, "Ethereum", "current"),
    prevDay: chainStableValue(asset, "Ethereum", "circulatingPrevDay"),
    prevWeek: chainStableValue(asset, "Ethereum", "circulatingPrevWeek"),
    prevMonth: chainStableValue(asset, "Ethereum", "circulatingPrevMonth")
  })).filter(asset => asset.current > 0);

  const totals = ethereumRows.reduce((acc, row) => {
    acc.current += row.current;
    acc.prevDay += row.prevDay;
    acc.prevWeek += row.prevWeek;
    acc.prevMonth += row.prevMonth;
    return acc;
  }, { current: 0, prevDay: 0, prevWeek: 0, prevMonth: 0 });

  const topEthereumAssets = ethereumRows
    .sort((a, b) => b.current - a.current)
    .slice(0, 10)
    .map(row => ({
      name: row.name,
      symbol: row.symbol,
      currentUsd: row.current,
      change1dPct: pctChange(row.current, row.prevDay),
      change7dPct: pctChange(row.current, row.prevWeek),
      change30dPct: pctChange(row.current, row.prevMonth)
    }));

  const prices = rwaPricesResult.status === "fulfilled" ? rwaPricesResult.value : {};
  const rwaTokenRows = Object.entries(prices || {}).map(([id, item]) => ({
    id,
    usd: numberOrZero(item.usd),
    marketCapUsd: numberOrZero(item.usd_market_cap),
    change24hPct: Number.isFinite(Number(item.usd_24h_change)) ? Number(item.usd_24h_change) : null
  }));
  const volatilityRows = rwaTokenRows.filter(row => row.change24hPct !== null);
  const averageAbsMove24hPct = volatilityRows.length
    ? volatilityRows.reduce((sum, row) => sum + Math.abs(row.change24hPct), 0) / volatilityRows.length
    : null;
  const maxMover = volatilityRows
    .slice()
    .sort((a, b) => Math.abs(b.change24hPct) - Math.abs(a.change24hPct))[0] || null;
  const signals = [];
  const change7d = pctChange(totals.current, totals.prevWeek);
  const change30d = pctChange(totals.current, totals.prevMonth);
  if (change7d !== null && Math.abs(change7d) >= 3) signals.push(`Ethereum stable asset supply 7일 변화 ${change7d.toFixed(2)}%: 유동성 이동 원인 확인`);
  if (change30d !== null && Math.abs(change30d) >= 7) signals.push(`Ethereum stable asset supply 30일 변화 ${change30d.toFixed(2)}%: 체인 이동 또는 수요 변화 확인`);
  rwaTokenRows.forEach(row => {
    const change = numberOrZero(row.change24hPct);
    if (Math.abs(change) >= 8) signals.push(`${row.id} 24h 가격 변화 ${change.toFixed(1)}%: RWA 테마 변동성 원인 분리 필요`);
  });

  return {
    schema: "tokenization-market-intelligence-v1",
    generatedAt,
    note: "Tokenized asset intelligence is not investment advice. Verify issuer, custodian, redemption terms, audits, liquidity, and jurisdiction before forming a thesis.",
    providers: tokenizationProviderStatus(env),
    ethereumStablecoins: {
      currentUsd: totals.current,
      change1dPct: pctChange(totals.current, totals.prevDay),
      change7dPct: change7d,
      change30dPct: change30d,
      assetCount: ethereumRows.length,
      topAssets: topEthereumAssets
    },
    rwaTokenContext: prices,
    rwaThemeVolatility: {
      averageAbsMove24hPct,
      maxMover,
      tokenCount: volatilityRows.length
    },
    rwaApi: {
      status: env.RWA_API_KEY ? "provider-ready" : "provider-key-required",
      endpointHint: "RWA.xyz API can be connected through RWA_API_KEY for tokenized treasuries/private credit/commodities/funds."
    },
    signals
  };
}

function parseJsonValue(value, fallback) {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

async function countTable(db, table) {
  try {
    const row = await db.prepare(`SELECT COUNT(*) AS total FROM ${table}`).first();
    return Number(row?.total || 0);
  } catch {
    return 0;
  }
}

function r2BindingName(env) {
  if (env.FILE_VAULT) return "FILE_VAULT";
  if (env.R2) return "R2";
  if (env.file_vault) return "file_vault";
  return "";
}

async function buildV4OpsStatus(request, env, db) {
  const counts = {};
  for (const table of [
    "entries",
    "life_records",
    "life_edges",
    "file_index",
    "weakness_events",
    "audit_events",
    "ai_packets",
    "passkey_credentials",
    "r2_objects",
    "case_game_sessions",
    "case_game_events"
  ]) {
    counts[table] = await countTable(db, table);
  }
  const latest = await db.prepare(`
    SELECT
      (SELECT MAX(updated_at) FROM life_records) AS latest_record,
      (SELECT MAX(created_at) FROM audit_events) AS latest_audit,
      (SELECT MAX(created_at) FROM weakness_events) AS latest_weakness
  `).first().catch(() => ({}));
  const accessJwtPresent = Boolean(request.headers.get("cf-access-jwt-assertion"));
  const accessConfigured = Boolean(env.POLICY_AUD && env.TEAM_DOMAIN);
  const r2Name = r2BindingName(env);
  const schemaScore = Math.round(Math.min(100, (
    (counts.life_records ? 28 : 0) +
    (counts.life_edges ? 18 : 0) +
    (counts.file_index ? 14 : 0) +
    (counts.weakness_events ? 14 : 0) +
    (counts.audit_events ? 12 : 0) +
    (r2Name ? 14 : 6)
  )));
  return {
    schema: "life-os-v4-ops-status",
    generatedAt: new Date().toISOString(),
    counts,
    latest,
    score: schemaScore,
    storage: {
      d1: "structured records, graph edges, file indexes, weakness events, audit logs",
      r2Binding: r2Name || null,
      r2State: r2Name ? "binding-detected" : "not-configured-placeholder",
      rawFileRule: "D1 stores indexes and summaries only. Raw PDFs, images, medical reports, install photos, and papers belong in R2 or the optional D-drive vault."
    },
    auth: {
      cookieSession: true,
      passkeysRegistered: counts.passkey_credentials || 0,
      sessionSeconds: SESSION_SECONDS,
      clientIdleLockMinutes: 30,
      cloudflareAccessJwtPresent: accessJwtPresent,
      cloudflareAccessConfigured: accessConfigured,
      boundary: accessConfigured
        ? "Cloudflare Access variables are present, but this Worker still keeps local HMAC session auth for compatibility."
        : "Client password/HMAC cookie is not enterprise identity. For real long-term private operation, put Cloudflare Access or another verified identity layer in front of the Worker."
    },
    privacyBoundaries: [
      "Do not store passwords, seed phrases, account numbers, resident IDs, customer confidential materials, raw manuals, recipes, valve sequences, detector setpoints, interlock bypasses, or site-specific acceptance limits.",
      "Sensitive health, asset, and family records default to redacted or index-only AI export.",
      "R2/D-drive stores raw files; D1 stores only file indexes, summaries, hashes, and location hints."
    ],
    nextHardening: [
      r2Name ? "Add signed upload/download workflow for R2." : "Bind an R2 bucket named FILE_VAULT for raw file storage.",
      accessConfigured ? "Validate Access JWT for all private routes before accepting requests." : "Configure Cloudflare Access with TEAM_DOMAIN and POLICY_AUD.",
      "Add scheduled backup snapshots and restore conflict reports."
    ]
  };
}

async function loadV4Records(db, limit = 500) {
  const result = await db.prepare(`
    SELECT id, legacy_entry_id, book_id, chapter, topic, title, record_type, privacy_level, export_policy,
      schema_version, source_device, created_at, updated_at, evidence, action, result, next_step, tags, entities,
      integrity_hash
    FROM life_records
    ORDER BY updated_at DESC
    LIMIT ?
  `).bind(limit).all();
  return (result.results || []).map(row => ({
    id: row.id,
    nodeId: recordNodeId(row.id),
    legacyEntryId: row.legacy_entry_id,
    bookId: row.book_id,
    chapter: row.chapter,
    topic: row.topic,
    title: row.title,
    recordType: row.record_type,
    privacyLevel: row.privacy_level,
    exportPolicy: row.export_policy,
    schemaVersion: row.schema_version,
    sourceDevice: row.source_device,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    evidence: row.evidence,
    action: row.action,
    result: row.result,
    nextStep: row.next_step,
    tags: parseJsonValue(row.tags, []),
    entities: parseJsonValue(row.entities, []),
    integrityHash: row.integrity_hash
  }));
}

async function loadV4Edges(db, limit = 1200) {
  const result = await db.prepare(`
    SELECT id, from_id, to_id, label, weight, evidence, created_at
    FROM life_edges
    ORDER BY created_at DESC
    LIMIT ?
  `).bind(limit).all();
  return (result.results || []).map(row => ({
    id: row.id,
    from: row.from_id,
    to: row.to_id,
    label: row.label,
    weight: Number(row.weight || 1),
    evidence: row.evidence,
    createdAt: row.created_at
  }));
}

function nodeLabelFromId(id) {
  if (!id) return "";
  if (id.startsWith("book:")) return id.slice(5);
  if (id.startsWith("tag:")) return "tag";
  if (id.startsWith("entity:")) return "entity";
  if (id.startsWith("evidence:")) return "evidence";
  if (id.startsWith("next:")) return "next action";
  if (id.startsWith("result:")) return "result";
  return id;
}

async function buildV4LifeGraph(db) {
  const records = await loadV4Records(db, 650);
  const edges = await loadV4Edges(db, 1600);
  const nodes = new Map();
  const tagCounts = {};
  const entityCounts = {};
  const bookCounts = {};
  records.forEach(record => {
    nodes.set(record.nodeId, {
      id: record.nodeId,
      type: "record",
      label: record.title || record.topic || record.recordType,
      bookId: record.bookId,
      privacyLevel: record.privacyLevel,
      exportPolicy: record.exportPolicy,
      updatedAt: record.updatedAt,
      nextStep: record.nextStep
    });
    bookCounts[record.bookId || "unknown"] = (bookCounts[record.bookId || "unknown"] || 0) + 1;
    (record.tags || []).forEach(tag => { tagCounts[tag] = (tagCounts[tag] || 0) + 1; });
    (record.entities || []).forEach(entity => { entityCounts[entity] = (entityCounts[entity] || 0) + 1; });
    nodes.set(`book:${record.bookId}`, {
      id: `book:${record.bookId}`,
      type: "book",
      label: record.bookId,
      count: bookCounts[record.bookId || "unknown"]
    });
    (record.tags || []).forEach(tag => nodes.set(stableNodeId("tag", tag), {
      id: stableNodeId("tag", tag),
      type: "tag",
      label: tag,
      count: tagCounts[tag]
    }));
    (record.entities || []).forEach(entity => nodes.set(stableNodeId("entity", entity), {
      id: stableNodeId("entity", entity),
      type: "entity",
      label: entity,
      count: entityCounts[entity]
    }));
  });
  edges.forEach(edge => {
    if (!nodes.has(edge.from)) nodes.set(edge.from, { id: edge.from, type: "derived", label: nodeLabelFromId(edge.from) });
    if (!nodes.has(edge.to)) nodes.set(edge.to, { id: edge.to, type: edge.to.split(":")[0] || "derived", label: nodeLabelFromId(edge.to) });
  });
  const weaknessResult = await db.prepare(`
    SELECT lane, skill, COUNT(*) AS count, MAX(created_at) AS latest
    FROM weakness_events
    GROUP BY lane, skill
    ORDER BY count DESC, latest DESC
    LIMIT 20
  `).all().catch(() => ({ results: [] }));
  const top = source => Object.entries(source)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([label, count]) => ({ label, count }));
  return {
    schema: "life-os-v4-knowledge-graph",
    generatedAt: new Date().toISOString(),
    counts: {
      records: records.length,
      nodes: nodes.size,
      edges: edges.length,
      books: Object.keys(bookCounts).length,
      tags: Object.keys(tagCounts).length,
      entities: Object.keys(entityCounts).length
    },
    nodes: [...nodes.values()].slice(0, 900),
    edges,
    recurringPatternsTop10: [
      ...top(tagCounts).map(item => ({ type: "tag", ...item })),
      ...top(entityCounts).map(item => ({ type: "entity", ...item }))
    ].slice(0, 10),
    recurringWeaknesses: (weaknessResult.results || []).map(row => ({
      lane: row.lane,
      skill: row.skill,
      count: Number(row.count || 0),
      latest: row.latest
    })),
    nextSevenDays: records
      .filter(record => record.nextStep)
      .slice(0, 7)
      .map(record => ({
        bookId: record.bookId,
        title: record.title,
        action: record.nextStep,
        evidence: record.evidence || record.topic || record.recordType
      })),
    exportBoundary: {
      allowed: "aiExportOk records, redacted summaries, structured evidence/action/result/nextStep, file indexes",
      blocked: "raw secrets, customer confidential data, raw medical documents, equipment manuals, recipes, valve sequences, detector setpoints, interlock bypasses, site-specific limits"
    }
  };
}

async function buildV4FileIndex(db, limit = 300) {
  const result = await db.prepare(`
    SELECT id, record_id, label, file_type, content_hash, location_hint, storage_target, privacy_level, export_policy,
      ai_summary, tags, linked_book, created_at, updated_at
    FROM file_index
    ORDER BY updated_at DESC
    LIMIT ?
  `).bind(limit).all();
  const files = (result.results || []).map(row => ({
    id: row.id,
    recordId: row.record_id,
    label: row.label,
    fileType: row.file_type,
    contentHash: row.content_hash,
    locationHint: row.location_hint,
    storageTarget: row.storage_target,
    privacyLevel: row.privacy_level,
    exportPolicy: row.export_policy,
    aiSummary: row.ai_summary,
    tags: parseJsonValue(row.tags, []),
    linkedBook: row.linked_book,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  }));
  const byTarget = {};
  files.forEach(file => { byTarget[file.storageTarget || "unknown"] = (byTarget[file.storageTarget || "unknown"] || 0) + 1; });
  return {
    schema: "life-os-v4-file-index",
    generatedAt: new Date().toISOString(),
    total: files.length,
    byTarget,
    rawFileRule: "D1 contains indexes only; raw files belong in R2 or D-drive vault.",
    files
  };
}

async function buildV4CoachBriefing(request, env, db) {
  const [status, graph, fileIndex] = await Promise.all([
    buildV4OpsStatus(request, env, db),
    buildV4LifeGraph(db),
    buildV4FileIndex(db, 80)
  ]);
  const weak = graph.recurringWeaknesses.slice(0, 5);
  const actions = [
    {
      lane: "운영 안정성",
      action: status.storage.r2Binding ? "R2 signed upload workflow를 설계합니다." : "R2 bucket binding(FILE_VAULT)을 연결해 원문 파일 저장소를 분리합니다.",
      why: status.storage.rawFileRule
    },
    {
      lane: "보안",
      action: status.auth.cloudflareAccessConfigured ? "Cloudflare Access JWT 검증을 private API 앞단에 강제합니다." : "Cloudflare Access 또는 Passkey 기반 서버 인증을 다음 hardening으로 둡니다.",
      why: status.auth.boundary
    },
    {
      lane: "AI 분석",
      action: graph.nextSevenDays[0]?.action || "각 책에서 nextStep 없는 기록을 정리합니다.",
      why: "AI가 다음 행동을 만들려면 evidence/action/result/nextStep이 반복적으로 필요합니다."
    },
    {
      lane: "약점 훈련",
      action: weak[0] ? `${weak[0].lane}/${weak[0].skill} 복습 세트를 생성합니다.` : "영어/CE/인지 오답을 1회 이상 저장해 weakness queue를 만듭니다.",
      why: weak[0] ? `${weak[0].count}회 반복 약점` : "약점 데이터가 있어야 자동 코칭이 선명해집니다."
    }
  ];
  return {
    schema: "life-os-v4-coach-briefing",
    generatedAt: new Date().toISOString(),
    operatingScore: status.score,
    actions,
    graphSummary: graph.counts,
    fileVaultSummary: {
      total: fileIndex.total,
      byTarget: fileIndex.byTarget,
      rule: fileIndex.rawFileRule
    },
    weaknesses: weak,
    aiReadablePacketHint: "Use /api/v4/ai-packet for a redacted, structured packet across records, graph, weaknesses, file indexes, and operating boundaries."
  };
}

async function buildV4AiPacket(request, env, db, packetType = "redacted-life-intelligence") {
  const [status, graph, fileIndex, context] = await Promise.all([
    buildV4OpsStatus(request, env, db),
    buildV4LifeGraph(db),
    buildV4FileIndex(db, 250),
    db.prepare("SELECT id, created_at, title, payload FROM entries ORDER BY created_at DESC LIMIT 1000").all()
      .then(result => buildAiContext((result.results || []).map(parsePayload)))
      .catch(() => ({}))
  ]);
  const packet = {
    schema: "my-life-intelligence-packet-v4",
    packetType,
    generatedAt: new Date().toISOString(),
    privacyMode: "redacted-summary-and-index-only",
    operatingStatus: status,
    knowledgeGraph: {
      counts: graph.counts,
      recurringPatternsTop10: graph.recurringPatternsTop10,
      recurringWeaknesses: graph.recurringWeaknesses,
      nextSevenDays: graph.nextSevenDays,
      exportBoundary: graph.exportBoundary
    },
    fileVault: {
      total: fileIndex.total,
      byTarget: fileIndex.byTarget,
      files: fileIndex.files.map(file => ({
        label: file.label,
        fileType: file.fileType,
        storageTarget: file.storageTarget,
        privacyLevel: file.privacyLevel,
        exportPolicy: file.exportPolicy,
        aiSummary: file.aiSummary,
        linkedBook: file.linkedBook,
        contentHash: file.contentHash
      }))
    },
    legacyContext: context,
    doNotAskFor: [
      "passwords",
      "seed phrases",
      "account numbers",
      "resident IDs",
      "customer confidential materials",
      "raw medical documents",
      "equipment manual text",
      "recipes",
      "valve sequences",
      "detector setpoints",
      "interlock bypasses",
      "site-specific acceptance limits"
    ]
  };
  return packet;
}

async function reindexV4FromEntries(db, limit = 1000) {
  const result = await db.prepare("SELECT id, created_at, title, payload FROM entries ORDER BY created_at DESC LIMIT ?").bind(limit).all();
  let indexed = 0;
  for (const row of result.results || []) {
    const entry = parsePayload(row);
    try {
      await upsertV4FromEntry(db, entry);
      indexed += 1;
    } catch {
      await insertAuditEvent(db, "life-record-reindex-failed", row.id || "", "warning", "Failed to reindex legacy entry", { title: row.title || "" });
    }
  }
  return { indexed, scanned: (result.results || []).length };
}

function r2Binding(env) {
  return env.FILE_VAULT || env.R2 || env.file_vault || null;
}

function relyingParty(request, env) {
  const url = new URL(request.url);
  const configuredId = String(env.PASSKEY_RP_ID || "").trim();
  const rpID = configuredId || url.hostname;
  const origin = String(env.PASSKEY_ORIGIN || `${url.protocol}//${url.host}`).replace(/\/$/, "");
  return {
    rpName: String(env.PASSKEY_RP_NAME || "Project Universe"),
    rpID,
    origin
  };
}

async function ensurePasskeyUser(db, username = "owner") {
  const cleanUsername = compactText(username || "owner", 120);
  const existing = await db.prepare("SELECT * FROM passkey_users WHERE username = ?").bind(cleanUsername).first();
  if (existing) return existing;
  const now = new Date().toISOString();
  const id = `user-${hashText(cleanUsername)}`;
  const webauthnUserID = base64UrlText(`${cleanUsername}:${crypto.randomUUID()}`);
  await db.prepare(`INSERT INTO passkey_users
    (id, username, display_name, webauthn_user_id, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?)`)
    .bind(id, cleanUsername, cleanUsername, webauthnUserID, now, now)
    .run();
  return { id, username: cleanUsername, display_name: cleanUsername, webauthn_user_id: webauthnUserID, created_at: now, updated_at: now };
}

async function listUserPasskeys(db, userId) {
  const result = await db.prepare("SELECT * FROM passkey_credentials WHERE user_id = ? ORDER BY created_at DESC").bind(userId).all();
  return (result.results || []).map(row => ({
    id: row.id,
    publicKey: base64UrlToBytes(row.public_key),
    counter: Number(row.counter || 0),
    transports: parseJsonValue(row.transports, []),
    deviceType: row.device_type || "",
    backedUp: Boolean(row.backed_up),
    webauthnUserID: row.webauthn_user_id,
    nickname: row.nickname || "",
    createdAt: row.created_at || "",
    lastUsedAt: row.last_used_at || ""
  }));
}

async function storePasskeyChallenge(db, userId, kind, options) {
  const now = new Date();
  const expires = new Date(now.getTime() + 5 * 60 * 1000).toISOString();
  await db.prepare(`INSERT INTO passkey_challenges
    (id, user_id, kind, challenge, created_at, expires_at, options)
    VALUES (?, ?, ?, ?, ?, ?, ?)`)
    .bind(crypto.randomUUID(), userId, kind, options.challenge, now.toISOString(), expires, JSON.stringify(options))
    .run();
}

async function latestPasskeyChallenge(db, userId, kind) {
  return db.prepare(`SELECT * FROM passkey_challenges
    WHERE user_id = ? AND kind = ?
    ORDER BY created_at DESC
    LIMIT 1`)
    .bind(userId, kind)
    .first();
}

async function sessionJson(request, env, data = {}) {
  const token = await createToken(env);
  return jsonResponse(request, { ok: true, token, ...data }, 200, { "Set-Cookie": sessionCookie(token) });
}

async function handlePasskeyRegistrationOptions(request, env, db) {
  const { rpName, rpID } = relyingParty(request, env);
  const user = await ensurePasskeyUser(db, "owner");
  const passkeys = await listUserPasskeys(db, user.id);
  const options = await generateRegistrationOptions({
    rpName,
    rpID,
    userID: base64UrlToBytes(user.webauthn_user_id),
    userName: user.username,
    userDisplayName: user.display_name || user.username,
    attestationType: "none",
    supportedAlgorithmIDs: [-7, -257],
    excludeCredentials: passkeys.map(passkey => ({
      id: passkey.id,
      transports: passkey.transports
    })),
    authenticatorSelection: {
      residentKey: "preferred",
      userVerification: "preferred"
    }
  });
  await storePasskeyChallenge(db, user.id, "registration", options);
  return jsonResponse(request, { ok: true, options, user: { id: user.id, username: user.username }, rpID });
}

async function handlePasskeyRegistrationVerify(request, env, db) {
  const body = await readBody(request);
  const { rpID, origin } = relyingParty(request, env);
  const user = await ensurePasskeyUser(db, body.username || "owner");
  const challenge = await latestPasskeyChallenge(db, user.id, "registration");
  if (!challenge || new Date(challenge.expires_at).getTime() < Date.now()) {
    return jsonResponse(request, { ok: false, error: "passkey registration challenge expired" }, 400);
  }
  let verification;
  try {
    verification = await verifyRegistrationResponse({
      response: body.response || body,
      expectedChallenge: challenge.challenge,
      expectedOrigin: origin,
      expectedRPID: rpID
    });
  } catch (error) {
    await insertAuditEvent(db, "passkey-registration-failed", user.id, "warning", error.message || "Passkey registration verification failed");
    return jsonResponse(request, { ok: false, error: error.message || "passkey verification failed" }, 400);
  }
  if (!verification.verified || !verification.registrationInfo) {
    return jsonResponse(request, { ok: false, error: "passkey registration was not verified" }, 400);
  }
  const { credential, credentialDeviceType, credentialBackedUp } = verification.registrationInfo;
  const now = new Date().toISOString();
  await db.prepare(`INSERT OR REPLACE INTO passkey_credentials
    (id, user_id, webauthn_user_id, public_key, counter, transports, device_type, backed_up, nickname, created_at, last_used_at, payload)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .bind(
      credential.id,
      user.id,
      user.webauthn_user_id,
      bytesToBase64Url(credential.publicKey),
      Number(credential.counter || 0),
      JSON.stringify(credential.transports || []),
      credentialDeviceType || "",
      credentialBackedUp ? 1 : 0,
      compactText(body.nickname || "Primary passkey", 120),
      now,
      "",
      JSON.stringify({ credentialDeviceType, credentialBackedUp })
    )
    .run();
  await insertAuditEvent(db, "passkey-registered", credential.id, "info", "Passkey registered for private bookshelf.", { userId: user.id, rpID });
  return sessionJson(request, env, { verified: true, credentialId: credential.id });
}

async function handlePasskeyAuthenticationOptions(request, env, db, url) {
  const { rpID } = relyingParty(request, env);
  const user = await ensurePasskeyUser(db, url.searchParams.get("username") || "owner");
  const passkeys = await listUserPasskeys(db, user.id);
  const options = await generateAuthenticationOptions({
    rpID,
    allowCredentials: passkeys.map(passkey => ({
      id: passkey.id,
      transports: passkey.transports
    })),
    userVerification: "preferred"
  });
  await storePasskeyChallenge(db, user.id, "authentication", options);
  return jsonResponse(request, { ok: true, options, user: { id: user.id, username: user.username }, hasPasskeys: passkeys.length > 0 });
}

async function handlePasskeyAuthenticationVerify(request, env, db) {
  const body = await readBody(request);
  const { rpID, origin } = relyingParty(request, env);
  const user = await ensurePasskeyUser(db, body.username || "owner");
  const passkey = await db.prepare("SELECT * FROM passkey_credentials WHERE id = ? AND user_id = ?")
    .bind(body.response?.id || body.id || "", user.id)
    .first();
  if (!passkey) return jsonResponse(request, { ok: false, error: "passkey not found" }, 400);
  const challenge = await latestPasskeyChallenge(db, user.id, "authentication");
  if (!challenge || new Date(challenge.expires_at).getTime() < Date.now()) {
    return jsonResponse(request, { ok: false, error: "passkey authentication challenge expired" }, 400);
  }
  let verification;
  try {
    verification = await verifyAuthenticationResponse({
      response: body.response || body,
      expectedChallenge: challenge.challenge,
      expectedOrigin: origin,
      expectedRPID: rpID,
      credential: {
        id: passkey.id,
        publicKey: base64UrlToBytes(passkey.public_key),
        counter: Number(passkey.counter || 0),
        transports: parseJsonValue(passkey.transports, [])
      }
    });
  } catch (error) {
    await insertAuditEvent(db, "passkey-authentication-failed", passkey.id, "warning", error.message || "Passkey authentication failed");
    return jsonResponse(request, { ok: false, error: error.message || "passkey authentication failed" }, 400);
  }
  if (!verification.verified) return jsonResponse(request, { ok: false, error: "passkey authentication was not verified" }, 400);
  await db.prepare("UPDATE passkey_credentials SET counter = ?, last_used_at = ? WHERE id = ?")
    .bind(Number(verification.authenticationInfo?.newCounter || passkey.counter || 0), new Date().toISOString(), passkey.id)
    .run();
  await insertAuditEvent(db, "passkey-authenticated", passkey.id, "info", "Passkey login succeeded.", { userId: user.id, rpID });
  return sessionJson(request, env, { verified: true, credentialId: passkey.id });
}

async function buildSecurityCenter(request, env, db) {
  const config = accessConfig(env);
  let accessIdentity = null;
  try {
    accessIdentity = await verifyAccessJwt(request, env);
  } catch {
    accessIdentity = null;
  }
  const passkeyCount = await countTable(db, "passkey_credentials");
  const latestPasskey = await db.prepare("SELECT MAX(created_at) AS created_at, MAX(last_used_at) AS last_used_at FROM passkey_credentials").first().catch(() => ({}));
  return {
    schema: "life-os-security-center-v1",
    generatedAt: new Date().toISOString(),
    cloudflareAccess: {
      configured: config.configured,
      jwtPresent: Boolean(request.headers.get("cf-access-jwt-assertion")),
      verified: Boolean(accessIdentity),
      identity: accessIdentity ? { email: accessIdentity.email, sub: accessIdentity.sub, exp: accessIdentity.exp } : null,
      requiredEnv: ["TEAM_DOMAIN", "POLICY_AUD"],
      boundary: config.configured
        ? "Access JWT verification is enabled for requests that include Cf-Access-Jwt-Assertion."
        : "Configure a Cloudflare Access application and set TEAM_DOMAIN/POLICY_AUD to make this the primary identity gate."
    },
    passkeys: {
      supportedByBrowserHint: "Use browser WebAuthn APIs. Registration requires an unlocked private session; authentication can create a private session.",
      registered: passkeyCount,
      latestRegisteredAt: latestPasskey?.created_at || "",
      latestUsedAt: latestPasskey?.last_used_at || ""
    },
    legacyPassword: {
      enabled: true,
      role: "Compatibility and emergency fallback. Not equivalent to enterprise identity or passkeys."
    }
  };
}

function r2KeyFromName(name = "") {
  const safe = String(name || "file").replace(/[^a-zA-Z0-9._/-]+/g, "-").replace(/-+/g, "-").slice(0, 160);
  return `vault/${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}-${safe || "file"}`;
}

async function handleR2Upload(request, env, db, url) {
  const bucket = r2Binding(env);
  if (!bucket) return jsonResponse(request, { ok: false, error: "R2 binding FILE_VAULT is not configured" }, 501);
  const contentType = request.headers.get("Content-Type") || "application/octet-stream";
  const label = url.searchParams.get("label") || request.headers.get("X-File-Label") || "vault-object";
  const key = url.searchParams.get("key") || r2KeyFromName(label);
  const recordId = url.searchParams.get("recordId") || request.headers.get("X-Record-Id") || "";
  const privacyLevel = url.searchParams.get("privacyLevel") || "sensitive-index";
  const exportPolicy = url.searchParams.get("exportPolicy") || "index-only-unless-user-approves";
  const object = await bucket.put(key, request.body, {
    httpMetadata: { contentType },
    customMetadata: {
      label: compactText(label, 120),
      recordId: compactText(recordId, 160),
      privacyLevel,
      exportPolicy
    }
  });
  const now = new Date().toISOString();
  await db.prepare(`INSERT OR REPLACE INTO r2_objects
    (key, label, record_id, file_type, size, content_type, etag, content_hash, privacy_level, export_policy, ai_summary, tags, created_at, updated_at, payload)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .bind(
      key,
      compactText(label, 160),
      recordId,
      contentType.split("/")[1] || "binary",
      Number(object?.size || request.headers.get("Content-Length") || 0),
      contentType,
      object?.etag || "",
      request.headers.get("X-Content-Hash") || "",
      privacyLevel,
      exportPolicy,
      compactText(request.headers.get("X-AI-Summary") || "", 1600),
      JSON.stringify(safeArray(request.headers.get("X-Tags") || "")),
      now,
      now,
      JSON.stringify({ uploadedVia: "worker-r2-api", key })
    )
    .run();
  await db.prepare(`INSERT OR REPLACE INTO file_index
    (id, record_id, label, file_type, content_hash, location_hint, storage_target, privacy_level, export_policy, ai_summary, tags, linked_book, created_at, updated_at, payload)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .bind(
      `r2:${key}`,
      recordId,
      compactText(label, 160),
      contentType.split("/")[1] || "binary",
      request.headers.get("X-Content-Hash") || object?.etag || "",
      key,
      "R2:FILE_VAULT",
      privacyLevel,
      exportPolicy,
      compactText(request.headers.get("X-AI-Summary") || "", 1600),
      JSON.stringify(safeArray(request.headers.get("X-Tags") || "")),
      url.searchParams.get("linkedBook") || "",
      now,
      now,
      JSON.stringify({ r2Key: key, etag: object?.etag || "" })
    )
    .run();
  await insertAuditEvent(db, "r2-upload", key, "info", "Uploaded raw object to R2 and stored index in D1.", { key, recordId, contentType });
  return jsonResponse(request, { ok: true, key, etag: object?.etag || "", size: object?.size || null });
}

async function handleR2Download(request, env, db, url) {
  const bucket = r2Binding(env);
  if (!bucket) return jsonResponse(request, { ok: false, error: "R2 binding FILE_VAULT is not configured" }, 501);
  const key = url.searchParams.get("key") || url.pathname.split("/api/v4/r2/object/")[1] || "";
  if (!key) return jsonResponse(request, { ok: false, error: "missing key" }, 400);
  const object = await bucket.get(key);
  if (!object) return jsonResponse(request, { ok: false, error: "not found" }, 404);
  await insertAuditEvent(db, "r2-download", key, "info", "Downloaded R2 object through authenticated Worker.", { key });
  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  headers.set("Cache-Control", "private, no-store");
  headers.set("X-R2-Key", key);
  return new Response(object.body, { headers });
}

async function handleR2List(request, env, db) {
  const bucket = r2Binding(env);
  const result = await db.prepare("SELECT * FROM r2_objects ORDER BY updated_at DESC LIMIT 200").all().catch(() => ({ results: [] }));
  return jsonResponse(request, {
    ok: true,
    configured: Boolean(bucket),
    binding: r2BindingName(env) || null,
    objects: (result.results || []).map(row => ({
      key: row.key,
      label: row.label,
      recordId: row.record_id,
      fileType: row.file_type,
      size: Number(row.size || 0),
      contentType: row.content_type,
      etag: row.etag,
      privacyLevel: row.privacy_level,
      exportPolicy: row.export_policy,
      aiSummary: row.ai_summary,
      tags: parseJsonValue(row.tags, []),
      updatedAt: row.updated_at
    }))
  });
}

const CASE_GAME_BANK = [
  {
    id: "epi-pumpdown-stall",
    title: "Pumpdown이 기준 시간보다 느리다",
    subsystem: "vacuum",
    status: "safety-hold",
    symptom: "Load lock 또는 process module pumpdown 시간이 평소보다 길고 baseline readiness가 흔들린다.",
    risk: ["air/moisture contamination", "particle risk", "unsafe gas readiness"],
    evidence: ["trend log", "recent maintenance/change point", "foreline/exhaust status", "door seal condition", "approved leak check result"],
    stop: "압력 회복 원인이 확인되지 않거나 gas readiness와 qualification에 영향을 주면 선임/EHS/owner 승인 전 진행하지 않는다.",
    report: "Pumpdown trend is slower than baseline. We are holding qualification, collecting vacuum trend and recent-change evidence, and will update after owner review.",
    prevention: "baseline trend를 보존하고 PM recovery 후 first wafer 전 vacuum health gate를 체크한다."
  },
  {
    id: "epi-mfc-response",
    title: "MFC response가 명령과 다르게 보인다",
    subsystem: "gas-delivery",
    status: "toxic-gas-boundary",
    symptom: "가스 flow command와 feedback trend가 맞지 않거나 readiness check에서 deviation이 보인다.",
    risk: ["toxic/flammable gas exposure", "wrong process condition", "abatement overload"],
    evidence: ["FDC trend", "gas box status", "approved gas panel state", "alarm history", "MFC calibration/PM history"],
    stop: "gas species, purge, detector, abatement readiness가 명확하지 않으면 조작하지 않고 gas/EHS owner에게 escalate한다.",
    report: "Gas flow feedback is not matching expected response. We are not changing gas state manually; we are collecting trend evidence and escalating to gas/EHS owner.",
    prevention: "gas readiness checklist와 post-maintenance response trend comparison을 표준화한다."
  },
  {
    id: "rtp-temperature-nonuniform",
    title: "RTP thermal uniformity가 흔들린다",
    subsystem: "thermal",
    status: "quality-risk",
    symptom: "RTP ramp/soak/cool profile 이후 wafer 결과가 center-edge 또는 repeatability 관점에서 흔들린다.",
    risk: ["wafer damage", "process excursion", "metrology mismatch"],
    evidence: ["pyrometry trend", "lamp zone status", "wafer history", "metrology map", "recent chamber clean/PM"],
    stop: "thermal trace와 metrology가 baseline에서 벗어나면 production-like qualification을 멈추고 baseline wafer로 확인한다.",
    report: "Thermal uniformity evidence is outside the expected comparison window. We are holding the next step until trace and metrology evidence are reviewed.",
    prevention: "thermal baseline, lamp/pyrometry health, metrology correlation을 handover packet에 포함한다."
  },
  {
    id: "robot-transfer-retry",
    title: "Transfer robot retry가 반복된다",
    subsystem: "wafer-handling",
    status: "wafer-safety",
    symptom: "EFEM/load lock/TM 사이 wafer transfer retry 또는 alignment warning이 반복된다.",
    risk: ["wafer drop/scratch", "particle generation", "module contamination"],
    evidence: ["robot alarm", "slot map", "alignment history", "door state", "recent teaching/maintenance"],
    stop: "wafer damage 위험이 있으면 반복 retry로 밀어붙이지 않고 wafer handling owner와 선임 입회가 필요하다.",
    report: "Robot transfer retries are repeating. We are stopping repeated motion attempts and collecting alignment, slot map, and alarm evidence.",
    prevention: "move-in/PM 후 teaching evidence와 dry transfer verification을 handover에 남긴다."
  },
  {
    id: "dvm-24v-drop",
    title: "24V control line voltage drop 의심",
    subsystem: "electrical-controls",
    status: "energized-work-boundary",
    symptom: "sensor/relay/PLC input 상태가 간헐적으로 떨어지고 interlock chain 판단이 불안정하다.",
    risk: ["unexpected motion", "interlock misread", "energized work injury"],
    evidence: ["expected value statement", "LOTO/work permit status", "PLC I/O status", "relay coil/contact logic", "approved DVM measurement plan"],
    stop: "승인 없는 live measurement, panel 개방, interlock bypass는 금지한다.",
    report: "The symptom suggests a control-voltage evidence gap. We will not perform unauthorized energized work; we need approved measurement scope and owner review.",
    prevention: "DVM 측정 전 expected value, reference point, allowed work boundary를 먼저 적는다."
  }
];

function gameCaseById(id) {
  return CASE_GAME_BANK.find(item => item.id === id) || CASE_GAME_BANK[0];
}

function scoreChoice(selected = "", answers = []) {
  const lower = String(selected || "").toLowerCase();
  return answers.some(item => lower.includes(String(item || "").toLowerCase()));
}

function buildCaseGameStep(gameCase, step = "risk") {
  const steps = ["risk", "evidence", "stop", "report", "prevention"];
  const current = steps.includes(step) ? step : "risk";
  const index = steps.indexOf(current);
  const next = steps[index + 1] || "complete";
  const prompts = {
    risk: { question: "가장 먼저 잡아야 할 immediate risk는?", expected: gameCase.risk, choices: [...gameCase.risk, "speed up qualification", "ignore until production"].sort() },
    evidence: { question: "원인 단정 전에 모아야 할 evidence는?", expected: gameCase.evidence, choices: [...gameCase.evidence, "interlock bypass", "recipe edit"].sort() },
    stop: { question: "멈춰야 하는 조건을 한 문장으로 말하면?", expected: [gameCase.stop], choices: [gameCase.stop, "Proceed if schedule is tight.", "Ask customer to accept without baseline." ] },
    report: { question: "고객 보고 문장의 핵심은?", expected: [gameCase.report], choices: [gameCase.report, "We know the exact root cause already.", "No issue, continue qualification." ] },
    prevention: { question: "재발 방지/인수인계에 넣을 항목은?", expected: [gameCase.prevention], choices: [gameCase.prevention, "Remove evidence to reduce paperwork.", "Skip baseline comparison next time." ] }
  };
  return {
    caseId: gameCase.id,
    step: current,
    nextStep: next,
    progress: `${index + 1}/${steps.length}`,
    ...prompts[current]
  };
}

async function handleCaseGameStart(request, db) {
  const body = request.method === "POST" ? await readBody(request) : {};
  const gameCase = gameCaseById(body.caseId);
  const now = new Date().toISOString();
  const session = {
    id: crypto.randomUUID(),
    caseId: gameCase.id,
    subsystem: gameCase.subsystem,
    status: gameCase.status,
    score: 0,
    currentStep: "risk",
    completed: false,
    createdAt: now,
    updatedAt: now
  };
  await db.prepare(`INSERT INTO case_game_sessions
    (id, case_id, subsystem, status, score, current_step, completed, created_at, updated_at, payload)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .bind(session.id, session.caseId, session.subsystem, session.status, 0, "risk", 0, now, now, JSON.stringify(session))
    .run();
  return jsonResponse(request, { ok: true, session, case: gameCase, step: buildCaseGameStep(gameCase, "risk") });
}

async function handleCaseGameAnswer(request, db) {
  const body = await readBody(request);
  const session = await db.prepare("SELECT * FROM case_game_sessions WHERE id = ?").bind(body.sessionId || "").first();
  if (!session) return jsonResponse(request, { ok: false, error: "game session not found" }, 404);
  const gameCase = gameCaseById(session.case_id);
  const step = buildCaseGameStep(gameCase, session.current_step);
  const answer = compactText(body.answer || "", 1200);
  const correct = step.step === "report"
    ? ["risk", "evidence", "update", "hold", "확인", "위험", "업데이트", "보류"].some(word => answer.toLowerCase().includes(word))
    : scoreChoice(answer, step.expected);
  const feedback = correct
    ? "좋습니다. 증상에서 바로 조작으로 뛰지 않고 risk/evidence/stop/report 흐름을 유지했습니다."
    : "위험합니다. 현장에서는 속도보다 안전 경계, evidence, owner review가 우선입니다.";
  const nextStep = correct ? step.nextStep : step.step;
  const completed = nextStep === "complete";
  const score = Number(session.score || 0) + (correct ? 20 : 0);
  const now = new Date().toISOString();
  await db.prepare(`INSERT INTO case_game_events
    (id, session_id, case_id, step, answer, correct, feedback, created_at, payload)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .bind(crypto.randomUUID(), session.id, gameCase.id, step.step, answer, correct ? 1 : 0, feedback, now, JSON.stringify({ expected: step.expected }))
    .run();
  await db.prepare("UPDATE case_game_sessions SET score = ?, current_step = ?, completed = ?, updated_at = ?, payload = ? WHERE id = ?")
    .bind(score, completed ? "complete" : nextStep, completed ? 1 : 0, now, JSON.stringify({ ...session, score, currentStep: nextStep, completed }), session.id)
    .run();
  if (!correct) {
    await db.prepare(`INSERT INTO weakness_events
      (id, record_id, lane, skill, severity, evidence, next_action, created_at, payload)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`)
      .bind(crypto.randomUUID(), session.id, "ce-game", `${gameCase.subsystem}/${step.step}`, "safety-review", answer, "Repeat the CE case step and state the stop condition before action.", now, JSON.stringify({ caseId: gameCase.id, step: step.step }))
      .run();
  }
  return jsonResponse(request, {
    ok: true,
    correct,
    feedback,
    score,
    completed,
    next: completed ? null : buildCaseGameStep(gameCase, nextStep)
  });
}

async function handleCaseGameStatus(request, db) {
  const sessions = await db.prepare("SELECT * FROM case_game_sessions ORDER BY updated_at DESC LIMIT 50").all().catch(() => ({ results: [] }));
  const events = await db.prepare("SELECT subsystem, status, COUNT(*) AS count, AVG(score) AS avg_score FROM case_game_sessions GROUP BY subsystem, status").all().catch(() => ({ results: [] }));
  return jsonResponse(request, {
    ok: true,
    cases: CASE_GAME_BANK,
    sessions: (sessions.results || []).map(row => ({
      id: row.id,
      caseId: row.case_id,
      subsystem: row.subsystem,
      status: row.status,
      score: Number(row.score || 0),
      currentStep: row.current_step,
      completed: Boolean(row.completed),
      updatedAt: row.updated_at
    })),
    summary: (events.results || []).map(row => ({
      subsystem: row.subsystem,
      status: row.status,
      count: Number(row.count || 0),
      avgScore: Math.round(Number(row.avg_score || 0))
    }))
  });
}

async function handleLogin(request, env, formMode = false) {
  const body = await readBody(request);
  const password = String(body.password || "");
  if (password !== String(env.EPI_PASSWORD || "9175")) {
    if (formMode) return htmlResponse(loginPage("비밀번호가 맞지 않습니다."), 401);
    return jsonResponse(request, { ok: false, error: "invalid password" }, 401);
  }
  const token = await createToken(env);
  const cookie = sessionCookie(token);
  if (formMode) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
        "Set-Cookie": cookie,
        "Cache-Control": "no-store"
      }
    });
  }
  return jsonResponse(request, { ok: true, token }, 200, { "Set-Cookie": cookie });
}

function logoutHeaders(contentType = "application/json; charset=utf-8") {
  const headers = new Headers({
    "Content-Type": contentType,
    "Cache-Control": "no-store",
    "Set-Cookie": expiredCookie(COOKIE_NAME)
  });
  appendClearLegacyCookies(headers);
  return headers;
}

function handleLogout(request, jsonMode = false) {
  if (jsonMode) {
    const headers = logoutHeaders();
    headers.set("Access-Control-Allow-Origin", request.headers.get("Origin") || "*");
    headers.set("Access-Control-Allow-Credentials", "true");
    return new Response(JSON.stringify({ ok: true, loggedOut: true }, null, 2), { status: 200, headers });
  }
  const headers = logoutHeaders("text/plain; charset=utf-8");
  headers.set("Location", "/");
  return new Response(null, { status: 302, headers });
}

async function handleApi(request, env, url) {
  if (request.method === "OPTIONS") return jsonResponse(request, { ok: true });
  if (url.pathname === "/api/login" && request.method === "POST") return handleLogin(request, env);
  if (url.pathname === "/api/login-form" && request.method === "POST") return handleLogin(request, env, true);
  if (url.pathname === "/api/logout") return handleLogout(request, true);

  await ensureSchema(env);
  const publicDb = d1Binding(env);
  if (publicDb && url.pathname === "/api/passkey/auth/options" && request.method === "GET") {
    return handlePasskeyAuthenticationOptions(request, env, publicDb, url);
  }
  if (publicDb && url.pathname === "/api/passkey/auth/verify" && request.method === "POST") {
    return handlePasskeyAuthenticationVerify(request, env, publicDb);
  }

  if (!(await isAuthenticated(request, env))) return jsonResponse(request, { ok: false, error: "unauthorized" }, 401);

  if (url.pathname === "/api/health" && request.method === "GET") {
    const bindingName = d1BindingName(env);
    const db = d1Binding(env);
    let stats = null;
    if (db) {
      try {
        const row = await db.prepare("SELECT COUNT(*) AS total, MAX(created_at) AS latest FROM entries").first();
        stats = {
          entries: Number(row?.total || 0),
          latestEntryAt: row?.latest || null
        };
      } catch {
        stats = { entries: 0, latestEntryAt: null };
      }
    }
    return jsonResponse(request, {
      ok: true,
      remote: true,
      storage: bindingName ? "Cloudflare D1" : "unbound",
      binding: bindingName || null,
      schema: "project-universe-d1-v2",
      stats
    });
  }

  const db = requireDb(env);

  if (url.pathname === "/api/passkey/register/options" && request.method === "GET") {
    return handlePasskeyRegistrationOptions(request, env, db);
  }

  if (url.pathname === "/api/passkey/register/verify" && request.method === "POST") {
    return handlePasskeyRegistrationVerify(request, env, db);
  }

  if (url.pathname === "/api/v4/security-center" && request.method === "GET") {
    return jsonResponse(request, { ok: true, security: await buildSecurityCenter(request, env, db) });
  }

  if (url.pathname === "/api/v4/r2/objects" && request.method === "GET") {
    return handleR2List(request, env, db);
  }

  if (url.pathname === "/api/v4/r2/upload" && (request.method === "POST" || request.method === "PUT")) {
    return handleR2Upload(request, env, db, url);
  }

  if ((url.pathname === "/api/v4/r2/download" || url.pathname.startsWith("/api/v4/r2/object/")) && request.method === "GET") {
    return handleR2Download(request, env, db, url);
  }

  if (url.pathname === "/api/v4/case-game/status" && request.method === "GET") {
    return handleCaseGameStatus(request, db);
  }

  if (url.pathname === "/api/v4/case-game/start" && request.method === "POST") {
    return handleCaseGameStart(request, db);
  }

  if (url.pathname === "/api/v4/case-game/answer" && request.method === "POST") {
    return handleCaseGameAnswer(request, db);
  }

  if (url.pathname === "/api/v4/ops-status" && request.method === "GET") {
    return jsonResponse(request, { ok: true, status: await buildV4OpsStatus(request, env, db) });
  }

  if (url.pathname === "/api/v4/life-graph" && request.method === "GET") {
    return jsonResponse(request, { ok: true, graph: await buildV4LifeGraph(db) });
  }

  if (url.pathname === "/api/v4/file-index" && request.method === "GET") {
    return jsonResponse(request, { ok: true, fileIndex: await buildV4FileIndex(db) });
  }

  if (url.pathname === "/api/v4/file-index" && request.method === "POST") {
    const payload = await readBody(request);
    const recordId = String(payload.recordId || payload.linkedRecord || "manual-file-index");
    const id = String(payload.id || `file-${hashText(`${recordId}:${payload.label || payload.locationHint || Date.now()}`)}`);
    const now = new Date().toISOString();
    await db.prepare(`INSERT OR REPLACE INTO file_index
      (id, record_id, label, file_type, content_hash, location_hint, storage_target, privacy_level, export_policy, ai_summary, tags, linked_book, created_at, updated_at, payload)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
      .bind(
        id,
        recordId,
        compactText(payload.label || "indexed file", 160),
        compactText(payload.fileType || "indexed-file", 80),
        compactText(payload.contentHash || payload.hash || "", 180),
        compactText(payload.locationHint || "", 500),
        compactText(payload.storageTarget || "D-drive-vault-or-future-R2", 120),
        compactText(payload.privacyLevel || "sensitive-index", 120),
        compactText(payload.exportPolicy || "index-only-unless-user-approves", 120),
        compactText(payload.aiSummary || payload.summary || "", 1600),
        JSON.stringify(safeArray(payload.tags).slice(0, 16)),
        compactText(payload.linkedBook || "", 120),
        payload.createdAt || now,
        now,
        JSON.stringify(payload)
      )
      .run();
    await insertAuditEvent(db, "file-index-upsert", id, "info", "Indexed file metadata only; raw file stayed outside D1.", { recordId, storageTarget: payload.storageTarget || "" });
    return jsonResponse(request, { ok: true, id, updatedAt: now });
  }

  if (url.pathname === "/api/v4/coach-briefing" && request.method === "GET") {
    return jsonResponse(request, { ok: true, briefing: await buildV4CoachBriefing(request, env, db) });
  }

  if (url.pathname === "/api/v4/ai-packet" && request.method === "GET") {
    const packetType = url.searchParams.get("type") || "redacted-life-intelligence";
    const packet = await buildV4AiPacket(request, env, db, packetType);
    return jsonResponse(request, { ok: true, packet });
  }

  if (url.pathname === "/api/v4/ai-packet" && request.method === "POST") {
    const payload = await readBody(request);
    const packet = payload.packet || await buildV4AiPacket(request, env, db, payload.packetType || "redacted-life-intelligence");
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();
    await db.prepare("INSERT INTO ai_packets (id, created_at, packet_type, privacy_scope, payload) VALUES (?, ?, ?, ?, ?)")
      .bind(id, createdAt, payload.packetType || packet.packetType || "redacted-life-intelligence", payload.privacyScope || packet.privacyMode || "redacted", JSON.stringify(packet))
      .run();
    await insertAuditEvent(db, "ai-packet-created", id, "info", "Generated redacted AI packet.", { packetType: payload.packetType || packet.packetType || "" });
    return jsonResponse(request, { ok: true, id, createdAt, packet });
  }

  if (url.pathname === "/api/v4/reindex" && request.method === "POST") {
    const payload = await readBody(request);
    const limit = Math.min(2000, Math.max(1, Number(payload.limit || 1000)));
    const result = await reindexV4FromEntries(db, limit);
    await insertAuditEvent(db, "life-os-v4-reindex", "entries", "info", `Reindexed ${result.indexed}/${result.scanned} legacy entries.`, result);
    return jsonResponse(request, { ok: true, ...result });
  }

  if (url.pathname === "/api/v4/records" && request.method === "POST") {
    const entry = await readBody(request);
    const id = String(entry.id || crypto.randomUUID());
    const createdAt = String(entry.createdAt || new Date().toISOString());
    const updatedAt = new Date().toISOString();
    const payload = normalizeStoredEntry(entry, id, createdAt, updatedAt);
    await db.prepare(`INSERT OR REPLACE INTO entries
      (id, created_at, updated_at, title, type, subsystem, severity, payload)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`)
      .bind(id, createdAt, updatedAt, payload.title || "", payload.type || "", payload.subsystem || "", payload.severity || "", JSON.stringify(payload))
      .run();
    const record = await upsertV4FromEntry(db, payload);
    return jsonResponse(request, { ok: true, entry: payload, record });
  }

  if (url.pathname === "/api/entries" && request.method === "GET") {
    const limit = Math.min(1000, Math.max(1, Number(url.searchParams.get("limit") || 500)));
    const type = url.searchParams.get("type");
    const query = type
      ? db.prepare("SELECT id, created_at, title, payload FROM entries WHERE type = ? ORDER BY created_at DESC LIMIT ?").bind(type, limit)
      : db.prepare("SELECT id, created_at, title, payload FROM entries ORDER BY created_at DESC LIMIT ?").bind(limit);
    const result = await query.all();
    const entries = (result.results || []).map(parsePayload);
    return jsonResponse(request, { ok: true, entries });
  }

  if (url.pathname === "/api/ai-context" && request.method === "GET") {
    const result = await db.prepare("SELECT id, created_at, title, payload FROM entries ORDER BY created_at DESC LIMIT 1000").all();
    const entries = (result.results || []).map(parsePayload);
    return jsonResponse(request, { ok: true, context: buildAiContext(entries) });
  }

  if (url.pathname === "/api/onchain-intel" && request.method === "GET") {
    const intel = await buildOnchainIntel(env);
    return jsonResponse(request, { ok: true, intel });
  }

  if (url.pathname === "/api/tokenization-intel" && request.method === "GET") {
    const intel = await buildTokenizationIntel(env);
    return jsonResponse(request, { ok: true, intel });
  }

  if (url.pathname === "/api/entries" && request.method === "POST") {
    const entry = await readBody(request);
    const id = String(entry.id || crypto.randomUUID());
    const createdAt = String(entry.createdAt || new Date().toISOString());
    const updatedAt = new Date().toISOString();
    const payload = normalizeStoredEntry(entry, id, createdAt, updatedAt);
    await db.prepare(`INSERT OR REPLACE INTO entries
      (id, created_at, updated_at, title, type, subsystem, severity, payload)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`)
      .bind(id, createdAt, updatedAt, entry.title || "", entry.type || "", entry.subsystem || "", entry.severity || "", JSON.stringify(payload))
      .run();
    await upsertV4FromEntry(db, payload);
    return jsonResponse(request, { ok: true, entry: payload });
  }

  if (url.pathname === "/api/state" && request.method === "POST") {
    const payload = await readBody(request);
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();
    await db.prepare("INSERT INTO snapshots (id, created_at, reason, payload) VALUES (?, ?, ?, ?)")
      .bind(id, createdAt, payload.reason || "", JSON.stringify({ ...payload, remoteSavedAt: createdAt }))
      .run();
    return jsonResponse(request, { ok: true, id, createdAt });
  }

  if (url.pathname === "/api/export" && request.method === "POST") {
    const payload = await readBody(request);
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();
    await db.prepare("INSERT INTO exports (id, created_at, payload) VALUES (?, ?, ?)")
      .bind(id, createdAt, JSON.stringify({ ...payload, remoteSavedAt: createdAt }))
      .run();
    return jsonResponse(request, { ok: true, id, createdAt });
  }

  return jsonResponse(request, { ok: false, error: "not found" }, 404);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    try {
      if (url.pathname === PERSONAL_SERVER_PREFIX) {
        return Response.redirect(`${url.origin}${PERSONAL_SERVER_PREFIX}/`, 302);
      }
      if (url.pathname.startsWith(`${PERSONAL_SERVER_PREFIX}/`)) {
        return handlePersonalServerProxy(request, env, url);
      }
      if (url.pathname === "/logout") return handleLogout(request);
      if (url.pathname.startsWith("/api/")) return handleApi(request, env, url);
      const assetResponse = await env.ASSETS.fetch(request);
      const headers = new Headers(assetResponse.headers);
      headers.set("Cache-Control", "private, no-store, max-age=0");
      headers.set("X-Robots-Tag", "noindex, nofollow");
      return new Response(assetResponse.body, {
        status: assetResponse.status,
        statusText: assetResponse.statusText,
        headers
      });
    } catch (error) {
      if (url.pathname.startsWith("/api/")) {
        return jsonResponse(request, { ok: false, error: error.message }, 500);
      }
      return htmlResponse(`<h1>Vault error</h1><pre>${error.message}</pre>`, 500);
    }
  }
};
