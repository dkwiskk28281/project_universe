const fs = require("fs");
const path = require("path");
const { spawn, spawnSync } = require("child_process");

const ROOT = __dirname;
const VAULT_ROOT = process.env.EPI_VAULT_ROOT || "D:\\FEP_EPI_ThinkTank_Vault";
const STATUS_PATH = path.join(VAULT_ROOT, "server-status.json");
const PUBLIC_URL_PATH = path.join(VAULT_ROOT, "public-url.txt");
const LOCK_PATH = path.join(VAULT_ROOT, "server-supervisor.pid");
const LOG_DIR = path.join(VAULT_ROOT, "server-logs");
const PUBLIC_SUBDOMAIN = process.env.EPI_PUBLIC_SUBDOMAIN || "fep-epi-vault-9175";
const PUBLIC_URL = `https://${PUBLIC_SUBDOMAIN}.loca.lt`;
const PUBLIC_URL_POINTER_ROOT = process.env.EPI_PUBLIC_URL_POINTER_ROOT || "";
const PUBLIC_POINTER_PAGE = process.env.EPI_PUBLIC_POINTER_PAGE || "";
const PUBLIC_PROXY_URL = process.env.EPI_PUBLIC_PROXY_URL || "https://projectuniverse.chang2058.workers.dev/";

const state = {
  startedAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  mode: "personal-server",
  localUrl: "http://127.0.0.1:4180/",
  requestedPublicUrl: PUBLIC_URL,
  publicUrl: "",
  publicProxyUrl: PUBLIC_PROXY_URL,
  publicPointerPage: PUBLIC_POINTER_PAGE,
  publisherStatus: PUBLIC_URL_POINTER_ROOT ? "waiting" : "disabled",
  vaultRoot: VAULT_ROOT,
  vaultStatus: "starting",
  tunnelStatus: "starting",
  vaultStarts: 0,
  tunnelStarts: 0,
  supervisorPid: process.pid,
  auth: "server-side password gate, login cookie, and API bearer token",
  notes: [
    "Keep this supervisor running to access the vault remotely.",
    "Remote access works only while this PC and tunnel process are on.",
    "All think tank data is stored under the vaultRoot path."
  ]
};

let vaultProcess = null;
let tunnelProcess = null;
let stopping = false;
let lastPublishedUrl = "";

function ensureDirs() {
  fs.mkdirSync(VAULT_ROOT, { recursive: true });
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

function isProcessAlive(pid) {
  if (!pid || pid === process.pid) return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

function acquireLock() {
  if (fs.existsSync(LOCK_PATH)) {
    const existingPid = Number(fs.readFileSync(LOCK_PATH, "utf8").trim());
    if (isProcessAlive(existingPid)) {
      const message = `Another supervisor is already running at PID ${existingPid}.`;
      fs.appendFileSync(path.join(LOG_DIR, "supervisor.log"), `${new Date().toISOString()} ${message}\n`, "utf8");
      process.exit(0);
    }
  }
  fs.writeFileSync(LOCK_PATH, `${process.pid}\n`, "utf8");
  writeStatus({ supervisorStatus: "running", supervisorPid: process.pid });
}

function writeStatus(patch = {}) {
  Object.assign(state, patch, { updatedAt: new Date().toISOString() });
  fs.writeFileSync(STATUS_PATH, JSON.stringify(state, null, 2), "utf8");
  if (state.publicUrl) {
    fs.writeFileSync(PUBLIC_URL_PATH, `${state.publicUrl}\n`, "utf8");
  }
}

function log(name, chunk) {
  const text = chunk.toString();
  fs.appendFileSync(path.join(LOG_DIR, `${name}.log`), text, "utf8");
  process.stdout.write(`[${name}] ${text}`);
}

function pointerHtml(url) {
  const destination = PUBLIC_PROXY_URL || url;
  return `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex,nofollow" />
  <meta http-equiv="refresh" content="2; url=${destination}" />
  <title>FEP/EPI Personal Server</title>
  <style>
    body { margin: 0; min-height: 100vh; display: grid; place-items: center; font-family: Arial, sans-serif; background: #101828; color: #f8fafc; }
    main { width: min(560px, calc(100vw - 32px)); }
    h1 { font-size: 24px; margin: 0 0 12px; }
    p { color: #cbd5e1; line-height: 1.6; }
    a { color: #7dd3fc; font-weight: 700; word-break: break-all; }
  </style>
</head>
<body>
  <main>
    <h1>FEP/EPI Personal Server</h1>
    <p>Cloudflare 영구 웹으로 이동합니다. 화면은 Cloudflare에서 열고, 저장 API만 개인서버로 연결됩니다.</p>
    <p><a href="${destination}">${destination}</a></p>
    <p>현재 저장 서버 터널 원본: <a href="${url}">${url}</a></p>
  </main>
</body>
</html>
`;
}

function runGit(args, cwd) {
  const result = spawnSync("git", args, {
    cwd,
    encoding: "utf8",
    windowsHide: true
  });
  const output = [
    `$ git ${args.join(" ")}`,
    result.stdout || "",
    result.stderr || ""
  ].join("\n");
  log("publisher", Buffer.from(output));
  return result.status === 0;
}

function publishPublicUrl(url) {
  if (!PUBLIC_URL_POINTER_ROOT || url === lastPublishedUrl) return;
  lastPublishedUrl = url;

  const appDir = path.join(PUBLIC_URL_POINTER_ROOT, "amat-fep-epi-trainer");
  if (!fs.existsSync(path.join(PUBLIC_URL_POINTER_ROOT, ".git")) || !fs.existsSync(appDir)) {
    writeStatus({ publisherStatus: "pointer root missing" });
    return;
  }

  const payload = {
    updatedAt: new Date().toISOString(),
    publicUrl: url,
    proxyUrl: PUBLIC_PROXY_URL,
    requestedPublicUrl: PUBLIC_URL,
    vaultRoot: VAULT_ROOT
  };

  fs.writeFileSync(path.join(appDir, "current-vault-url.json"), JSON.stringify(payload, null, 2), "utf8");
  fs.writeFileSync(path.join(appDir, "current-vault-url.html"), pointerHtml(url), "utf8");

  if (!runGit(["add", "amat-fep-epi-trainer/current-vault-url.json", "amat-fep-epi-trainer/current-vault-url.html"], PUBLIC_URL_POINTER_ROOT)) {
    writeStatus({ publisherStatus: "git add failed" });
    return;
  }

  const committed = runGit(["commit", "-m", "Update current FEP EPI vault URL"], PUBLIC_URL_POINTER_ROOT);
  if (!committed) {
    writeStatus({ publisherStatus: "no git commit created" });
    return;
  }

  if (!runGit(["push"], PUBLIC_URL_POINTER_ROOT)) {
    writeStatus({ publisherStatus: "git push failed" });
    return;
  }

  writeStatus({
    publisherStatus: "pushed",
    publicPointerPage: PUBLIC_POINTER_PAGE
  });
}

function spawnVault(delayMs = 0) {
  setTimeout(() => {
    if (stopping) return;
    state.vaultStarts += 1;
    writeStatus({ vaultStatus: "starting" });
    vaultProcess = spawn(process.execPath, ["vault-server.js"], {
      cwd: ROOT,
      env: {
        ...process.env,
        EPI_VAULT_HOST: "127.0.0.1",
        EPI_VAULT_PORT: "4180",
        EPI_VAULT_PASSWORD: "9175",
        EPI_VAULT_ROOT: VAULT_ROOT
      },
      windowsHide: true
    });
    vaultProcess.stdout.on("data", chunk => log("vault", chunk));
    vaultProcess.stderr.on("data", chunk => log("vault-error", chunk));
    vaultProcess.on("exit", code => {
      vaultProcess = null;
      writeStatus({ vaultStatus: `exited:${code}` });
      if (!stopping) spawnVault(3000);
    });
    writeStatus({ vaultStatus: "running" });
  }, delayMs);
}

function tunnelCommand() {
  if (process.platform === "win32") {
    return {
      command: "cmd.exe",
      args: ["/c", "npx", "--yes", "localtunnel", "--port", "4180", "--local-host", "127.0.0.1", "--subdomain", PUBLIC_SUBDOMAIN]
    };
  }
  return {
    command: "npx",
    args: ["--yes", "localtunnel", "--port", "4180", "--local-host", "127.0.0.1", "--subdomain", PUBLIC_SUBDOMAIN]
  };
}

function spawnTunnel(delayMs = 2500) {
  setTimeout(() => {
    if (stopping) return;
    state.tunnelStarts += 1;
    writeStatus({ tunnelStatus: "starting", publicUrl: "" });
    const { command, args } = tunnelCommand();
    tunnelProcess = spawn(command, args, {
      cwd: ROOT,
      env: process.env,
      windowsHide: true
    });
    tunnelProcess.stdout.on("data", chunk => {
      const text = chunk.toString();
      log("tunnel", chunk);
      const match = text.match(/https:\/\/[^\s]+/);
      if (match) {
        writeStatus({
          tunnelStatus: "running",
          publicUrl: match[0]
        });
        publishPublicUrl(match[0]);
      }
    });
    tunnelProcess.stderr.on("data", chunk => log("tunnel-error", chunk));
    tunnelProcess.on("exit", code => {
      tunnelProcess = null;
      writeStatus({ tunnelStatus: `exited:${code}` });
      if (!stopping) spawnTunnel(5000);
    });
  }, delayMs);
}

function stopChild(child) {
  if (!child || child.killed) return;
  try {
    child.kill();
  } catch {
    // best effort shutdown
  }
}

function shutdown() {
  stopping = true;
  writeStatus({ vaultStatus: "stopping", tunnelStatus: "stopping" });
  stopChild(tunnelProcess);
  stopChild(vaultProcess);
  if (fs.existsSync(LOCK_PATH)) {
    const lockedPid = Number(fs.readFileSync(LOCK_PATH, "utf8").trim());
    if (lockedPid === process.pid) {
      fs.rmSync(LOCK_PATH, { force: true });
    }
  }
  writeStatus({ vaultStatus: "stopped", tunnelStatus: "stopped" });
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
process.on("uncaughtException", error => {
  fs.appendFileSync(path.join(LOG_DIR, "supervisor-error.log"), `${new Date().toISOString()} ${error.stack || error.message}\n`, "utf8");
  writeStatus({ supervisorError: error.message });
});

ensureDirs();
acquireLock();
spawnVault();
spawnTunnel();

setInterval(() => {
  writeStatus({
    vaultPid: vaultProcess?.pid || null,
    tunnelPid: tunnelProcess?.pid || null
  });
}, 15000);
