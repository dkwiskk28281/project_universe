const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { URL } = require("url");

const PASSWORD = process.env.EPI_VAULT_PASSWORD || "9175";
const SESSION_SECRET = process.env.EPI_VAULT_SESSION_SECRET || `local-${PASSWORD}-fep-epi-vault`;
const COOKIE_NAME = "epi_vault_session";
const PORT = Number(process.env.EPI_VAULT_PORT || 4180);
const HOST = process.env.EPI_VAULT_HOST || "127.0.0.1";
const STATIC_ROOT = __dirname;
const VAULT_ROOT = process.env.EPI_VAULT_ROOT || "D:\\FEP_EPI_ThinkTank_Vault";

const directories = {
  entries: path.join(VAULT_ROOT, "entries"),
  snapshots: path.join(VAULT_ROOT, "snapshots"),
  backups: path.join(VAULT_ROOT, "backups"),
  exports: path.join(VAULT_ROOT, "exports"),
  researchIndex: path.join(VAULT_ROOT, "research-index")
};

function ensureVault() {
  fs.mkdirSync(VAULT_ROOT, { recursive: true });
  Object.values(directories).forEach(dir => fs.mkdirSync(dir, { recursive: true }));
  const indexPath = path.join(VAULT_ROOT, "index.json");
  if (!fs.existsSync(indexPath)) {
    writeJson(indexPath, { createdAt: new Date().toISOString(), entries: [] });
  }
}

function safeSegment(value) {
  return String(value || "item").replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120);
}

function timestamp() {
  return new Date().toISOString().replace(/[-:]/g, "").replace(/\..+/, "").replace("T", "-");
}

function writeJson(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
}

function readJson(filePath, fallback) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

function sendJson(res, status, data) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, X-ThinkTank-Password, Authorization",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
  });
  res.end(JSON.stringify(data, null, 2));
}

function sendHtml(res, status, html, headers = {}) {
  res.writeHead(status, {
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "no-store",
    ...headers
  });
  res.end(html);
}

function corsHeaders(req) {
  return {
    "Access-Control-Allow-Origin": req.headers.origin || "*",
    "Access-Control-Allow-Headers": "Content-Type, X-ThinkTank-Password, Authorization",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
  };
}

function base64Url(value) {
  return Buffer.from(value).toString("base64url");
}

function sign(value) {
  return crypto.createHmac("sha256", SESSION_SECRET).update(value).digest("base64url");
}

function createToken() {
  const payload = base64Url(JSON.stringify({
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
    nonce: crypto.randomUUID()
  }));
  return `${payload}.${sign(payload)}`;
}

function verifyToken(token) {
  if (!token || !token.includes(".")) return false;
  const [payload, signature] = token.split(".");
  if (signature !== sign(payload)) return false;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return Number(data.exp) > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

function cookieToken(req) {
  const cookie = req.headers.cookie || "";
  const match = cookie.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  return match?.[1] || "";
}

function bearerToken(req) {
  const auth = req.headers.authorization || "";
  return auth.startsWith("Bearer ") ? auth.slice(7) : "";
}

function isAuthorized(req) {
  return req.headers["x-thinktank-password"] === PASSWORD ||
    verifyToken(bearerToken(req)) ||
    verifyToken(cookieToken(req));
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
    <p>비밀번호를 입력하면 이 PC의 개인 EPI 싱크탱크 저장소가 열립니다.</p>
    <label>Password<input name="password" type="password" inputmode="numeric" autocomplete="current-password" autofocus /></label>
    <button type="submit">열기</button>
    <small>${message}</small>
  </form>
</body>
</html>`;
}

function collectBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", chunk => {
      body += chunk;
      if (body.length > 10_000_000) {
        reject(new Error("request body too large"));
        req.destroy();
      }
    });
    req.on("end", () => {
      try {
        const contentType = req.headers["content-type"] || "";
        if (contentType.includes("application/x-www-form-urlencoded")) {
          resolve(Object.fromEntries(new URLSearchParams(body)));
          return;
        }
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
  });
}

function updateIndex(entry) {
  const indexPath = path.join(VAULT_ROOT, "index.json");
  const index = readJson(indexPath, { createdAt: new Date().toISOString(), entries: [] });
  const summary = {
    id: entry.id,
    createdAt: entry.createdAt,
    updatedAt: entry.updatedAt,
    title: entry.title,
    type: entry.type,
    tool: entry.tool,
    subsystem: entry.subsystem,
    severity: entry.severity,
    tags: entry.tags
  };
  index.entries = (index.entries || []).filter(item => item.id !== entry.id);
  index.entries.push(summary);
  index.updatedAt = new Date().toISOString();
  writeJson(indexPath, index);
  return index;
}

function saveEntry(entry) {
  const id = safeSegment(entry.id || `entry-${Date.now()}`);
  const date = new Date(entry.createdAt || Date.now());
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const normalized = { ...entry, id, savedAt: new Date().toISOString() };
  const entryPath = path.join(directories.entries, year, month, `${id}.json`);
  const backupPath = path.join(directories.backups, `${id}-${timestamp()}.json`);
  writeJson(entryPath, normalized);
  writeJson(backupPath, normalized);
  updateIndex(normalized);
  return { entryPath, backupPath, entry: normalized };
}

function saveState(payload) {
  const fileName = `state-${timestamp()}.json`;
  const snapshotPath = path.join(directories.snapshots, fileName);
  const latestPath = path.join(VAULT_ROOT, "latest-state.json");
  const data = { ...payload, receivedAt: new Date().toISOString() };
  writeJson(snapshotPath, data);
  writeJson(latestPath, data);
  return { snapshotPath, latestPath };
}

function saveExport(payload) {
  const exportPath = path.join(directories.exports, `thinktank-export-${timestamp()}.json`);
  const latestPath = path.join(directories.exports, "thinktank-export.json");
  const data = { ...payload, receivedAt: new Date().toISOString() };
  writeJson(exportPath, data);
  writeJson(latestPath, data);
  return { exportPath, latestPath };
}

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

function serveStatic(req, res, pathname) {
  const cleanPath = pathname === "/" ? "/index.html" : decodeURIComponent(pathname);
  const requested = path.resolve(path.join(STATIC_ROOT, cleanPath));
  if (!requested.startsWith(path.resolve(STATIC_ROOT))) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }
  fs.readFile(requested, (error, content) => {
    if (error) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    const ext = path.extname(requested).toLowerCase();
    res.writeHead(200, { "Content-Type": mimeTypes[ext] || "application/octet-stream" });
    res.end(content);
  });
}

function clearSessionHeaders(req) {
  return {
    "Set-Cookie": `${COOKIE_NAME}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0`,
    "Cache-Control": "no-store",
    ...corsHeaders(req)
  };
}

async function handleApi(req, res, pathname) {
  if (req.method === "OPTIONS") {
    sendJson(res, 200, { ok: true });
    return;
  }
  if (pathname === "/api/login" && req.method === "POST") {
    const body = await collectBody(req);
    if (String(body.password || "") !== PASSWORD) {
      sendJson(res, 401, { ok: false, error: "invalid password" });
      return;
    }
    const token = createToken();
    res.writeHead(200, {
      "Content-Type": "application/json; charset=utf-8",
      "Set-Cookie": `${COOKIE_NAME}=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${30 * 24 * 60 * 60}`,
      "Cache-Control": "no-store",
      ...corsHeaders(req)
    });
    res.end(JSON.stringify({ ok: true, token }, null, 2));
    return;
  }
  if (pathname === "/api/login-form" && req.method === "POST") {
    const body = await collectBody(req);
    if (String(body.password || "") !== PASSWORD) {
      sendHtml(res, 401, loginPage("비밀번호가 맞지 않습니다."));
      return;
    }
    const token = createToken();
    res.writeHead(302, {
      Location: "/",
      "Set-Cookie": `${COOKIE_NAME}=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${30 * 24 * 60 * 60}`,
      "Cache-Control": "no-store"
    });
    res.end();
    return;
  }
  if (pathname === "/api/logout") {
    res.writeHead(200, {
      "Content-Type": "application/json; charset=utf-8",
      ...clearSessionHeaders(req)
    });
    res.end(JSON.stringify({ ok: true, loggedOut: true }, null, 2));
    return;
  }
  if (!isAuthorized(req)) {
    sendJson(res, 401, { ok: false, error: "unauthorized" });
    return;
  }
  if (pathname === "/api/health" && req.method === "GET") {
    sendJson(res, 200, { ok: true, vaultRoot: VAULT_ROOT, directories });
    return;
  }
  if (pathname === "/api/entries" && req.method === "GET") {
    sendJson(res, 200, readJson(path.join(VAULT_ROOT, "index.json"), { entries: [] }));
    return;
  }
  if (pathname === "/api/entries" && req.method === "POST") {
    const entry = await collectBody(req);
    sendJson(res, 200, { ok: true, ...saveEntry(entry) });
    return;
  }
  if (pathname === "/api/state" && req.method === "POST") {
    const payload = await collectBody(req);
    sendJson(res, 200, { ok: true, ...saveState(payload) });
    return;
  }
  if (pathname === "/api/export" && req.method === "POST") {
    const payload = await collectBody(req);
    sendJson(res, 200, { ok: true, ...saveExport(payload) });
    return;
  }
  sendJson(res, 404, { ok: false, error: "not found" });
}

ensureVault();

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  try {
    if (url.pathname === "/logout") {
      res.writeHead(302, { Location: "/", ...clearSessionHeaders(req) });
      res.end();
      return;
    }
    if (url.pathname.startsWith("/api/")) {
      await handleApi(req, res, url.pathname);
      return;
    }
    serveStatic(req, res, url.pathname);
  } catch (error) {
    sendJson(res, 500, { ok: false, error: error.message });
  }
});

server.listen(PORT, HOST, () => {
  console.log(`FEP/EPI Think Tank Vault running at http://${HOST}:${PORT}/`);
  console.log(`Vault root: ${VAULT_ROOT}`);
});
