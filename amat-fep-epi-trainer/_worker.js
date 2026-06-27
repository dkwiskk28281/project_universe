const COOKIE_NAME = "epi_vault_session_strict_v2";
const LEGACY_COOKIE_NAMES = ["epi_vault_session"];
const SESSION_SECONDS = 2 * 60 * 60;
const SESSION_VERSION = "strict-v2";
const PERSONAL_SERVER_PREFIX = "/personal-server";
const DEFAULT_PERSONAL_SERVER_URL = "https://fep-epi-vault-9175.loca.lt";
const ONCHAIN_COIN_IDS = ["bitcoin", "ethereum", "solana", "chainlink", "aave", "uniswap"];

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
    remoteSavedAt: updatedAt
  };
  payload.serverIntegrityHash = hashText(stableJson({
    id: payload.id,
    type: payload.type || "",
    title: payload.title || "",
    subsystem: payload.subsystem || "",
    severity: payload.severity || "",
    createdAt: payload.createdAt,
    summary: payload.summary || payload.context || "",
    evidence: payload.evidence || "",
    nextAction: payload.nextAction || payload.nextStudy || ""
  }));
  return payload;
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
        summary: page.summary || "",
        evidence: page.evidence || "",
        nextAction: page.nextAction || "",
        tags: page.tags || [],
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
        summary: page.summary || "",
        evidence: page.evidence || "",
        nextAction: page.nextAction || "",
        tags: page.tags || [],
        createdAt: page.createdAt || ""
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
      summary: entry.summary || entry.context || "",
      evidence: entry.evidence || "",
      integrityHash: entry.integrityHash || entry.serverIntegrityHash || "",
      nextAction: entry.nextAction || entry.nextStudy || ""
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
