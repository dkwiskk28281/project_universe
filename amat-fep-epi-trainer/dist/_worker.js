const COOKIE_NAME = "epi_vault_session_strict_v2";
const LEGACY_COOKIE_NAMES = ["epi_vault_session"];
const SESSION_SECONDS = 2 * 60 * 60;
const SESSION_VERSION = "strict-v2";
const PERSONAL_SERVER_PREFIX = "/personal-server";
const PUBLIC_VAULT_INDEX = "https://dkwiskk28281.github.io/project_universe/amat-fep-epi-trainer/current-vault-url.json";
const DEFAULT_PERSONAL_SERVER_URL = "https://fep-epi-vault-9175.loca.lt";

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
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
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
  return verifyToken(env, bearerToken(request) || cookieToken(request));
}

function loginPage(message = "") {
  return `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>FEP/EPI Vault Login</title>
  <style>
    body{margin:0;min-height:100vh;display:grid;place-items:center;background:#16232d;font-family:Segoe UI,Malgun Gothic,Arial,sans-serif;color:#17232d}
    form{width:min(420px,calc(100vw - 32px));display:grid;gap:14px;padding:28px;border-radius:8px;background:#fff;box-shadow:0 30px 80px rgba(0,0,0,.32)}
    .mark{display:grid;place-items:center;width:42px;height:42px;border-radius:8px;background:#007f86;color:#fff;font-weight:900}
    p{margin:0;color:#617080;line-height:1.55} h1{margin:0} label{display:grid;gap:6px;font-weight:800}
    input{min-height:44px;padding:0 12px;border:1px solid #d8e1e8;border-radius:8px} button{min-height:44px;border:0;border-radius:8px;background:#007f86;color:#fff;font-weight:850}
    small{color:#b35a16}
  </style>
</head>
<body>
  <form method="post" action="/api/login-form">
    <span class="mark">FE</span>
    <h1>FEP/EPI Vault Login</h1>
    <p>비밀번호를 입력하면 개인 학습 웹과 원격 저장소가 열립니다.</p>
    <label>Password<input name="password" type="password" inputmode="numeric" autocomplete="current-password" autofocus /></label>
    <button type="submit">열기</button>
    <small>${message}</small>
  </form>
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

  try {
    const response = await fetch(PUBLIC_VAULT_INDEX, {
      headers: { "Cache-Control": "no-store" },
      cf: { cacheTtl: 0, cacheEverything: false }
    });
    if (response.ok) {
      const data = await response.json();
      const publicUrl = validTunnelUrl(data.publicUrl || "");
      if (publicUrl) return publicUrl;
    }
  } catch {
    // Fall back to the requested localtunnel subdomain below.
  }

  return DEFAULT_PERSONAL_SERVER_URL;
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
}

function requireDb(env) {
  const db = d1Binding(env);
  if (!db) throw new Error("D1 binding is not configured. Expected binding name DB or ce_data.");
  return db;
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

function handleLogout() {
  const headers = new Headers({
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "no-store",
    "Set-Cookie": expiredCookie(COOKIE_NAME)
  });
  appendClearLegacyCookies(headers);
  return new Response(loginPage("다시 열려면 비밀번호를 입력하세요."), {
    status: 200,
    headers
  });
}

async function handleApi(request, env, url) {
  if (request.method === "OPTIONS") return jsonResponse(request, { ok: true });
  if (url.pathname === "/api/login" && request.method === "POST") return handleLogin(request, env);
  if (url.pathname === "/api/login-form" && request.method === "POST") return handleLogin(request, env, true);
  if (url.pathname === "/api/logout") return handleLogout();
  if (!(await isAuthenticated(request, env))) return jsonResponse(request, { ok: false, error: "unauthorized" }, 401);

  await ensureSchema(env);
  if (url.pathname === "/api/health" && request.method === "GET") {
    const bindingName = d1BindingName(env);
    return jsonResponse(request, {
      ok: true,
      remote: true,
      storage: bindingName ? "Cloudflare D1" : "unbound",
      binding: bindingName || null
    });
  }

  const db = requireDb(env);

  if (url.pathname === "/api/entries" && request.method === "GET") {
    const result = await db.prepare("SELECT payload FROM entries ORDER BY created_at DESC LIMIT 500").all();
    const entries = (result.results || []).map(row => JSON.parse(row.payload));
    return jsonResponse(request, { ok: true, entries });
  }

  if (url.pathname === "/api/entries" && request.method === "POST") {
    const entry = await readBody(request);
    const id = String(entry.id || crypto.randomUUID());
    const createdAt = String(entry.createdAt || new Date().toISOString());
    const updatedAt = new Date().toISOString();
    const payload = { ...entry, id, createdAt, updatedAt, remoteSavedAt: updatedAt };
    await db.prepare(`INSERT OR REPLACE INTO entries
      (id, created_at, updated_at, title, type, subsystem, severity, payload)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`)
      .bind(id, createdAt, updatedAt, entry.title || "", entry.type || "", entry.subsystem || "", entry.severity || "", JSON.stringify(payload))
      .run();
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
      if (url.pathname === "/logout") return handleLogout();
      if (url.pathname.startsWith("/api/")) return handleApi(request, env, url);
      if (!(await isAuthenticated(request, env))) return htmlResponse(loginPage());
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
