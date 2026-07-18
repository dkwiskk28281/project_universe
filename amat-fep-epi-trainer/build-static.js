const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const root = __dirname;
const distRoot = path.join(root, "dist");

const webFiles = [
  "index.html",
  "styles.css",
  "app.js",
  "cluster-sim.js",
  "english-test-expansion.js",
  "english-test.js",
  "mastery.js",
  "readiness.js",
  "term-helper.js",
  "cognitive.js",
  "bookshelf.js",
  "vision-training.js",
  "think-tank.js",
  "_worker.js",
  "cloudflare-d1-schema.sql",
  "README.md"
];

function copyFile(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(srcPath, destPath);
    else if (entry.isFile()) copyFile(srcPath, destPath);
  }
}

function safeExec(command, fallback = "") {
  try {
    return execSync(command, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  } catch {
    return fallback;
  }
}

function writeBuildInfo(destRoot) {
  const gitSha = process.env.GITHUB_SHA || safeExec("git rev-parse HEAD", "local-unknown");
  const gitDirty = Boolean(safeExec("git status --porcelain", ""));
  fs.writeFileSync(path.join(destRoot, "build-info.json"), `${JSON.stringify({
    app: "Project Universe",
    deployment: "cloudflare-worker",
    schemaVersion: "project-universe-build-info-v1",
    gitSha,
    gitShortSha: gitSha.slice(0, 12),
    gitBranch: process.env.GITHUB_REF_NAME || safeExec("git branch --show-current", "local"),
    gitDirty,
    buildTime: new Date().toISOString(),
    workflowRunId: process.env.GITHUB_RUN_ID || null,
    workflowRunAttempt: process.env.GITHUB_RUN_ATTEMPT || null,
    source: process.env.GITHUB_ACTIONS ? "github-actions" : "local"
  }, null, 2)}\n`, "utf8");
}

fs.rmSync(distRoot, { recursive: true, force: true });
for (const file of webFiles) copyFile(path.join(root, file), path.join(distRoot, file));
copyDir(path.join(root, "assets"), path.join(distRoot, "assets"));
writeBuildInfo(distRoot);
fs.writeFileSync(path.join(distRoot, ".assetsignore"), "_worker.js\npackage.json\nbuild-static.js\n", "utf8");
fs.writeFileSync(path.join(distRoot, "package.json"), `${JSON.stringify({
  name: "amat-fep-epi-trainer-dist-static",
  version: "1.0.0",
  private: true,
  scripts: { build: "node build-static.js" }
}, null, 2)}\n`, "utf8");
fs.writeFileSync(path.join(distRoot, "build-static.js"), `const fs = require("fs");
const path = require("path");

const root = __dirname;
const out = path.join(root, "dist");
const skip = new Set(["dist", "node_modules"]);

function copy(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const name of fs.readdirSync(src)) {
      if (!skip.has(name)) copy(path.join(src, name), path.join(dest, name));
    }
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

fs.rmSync(out, { recursive: true, force: true });
for (const name of fs.readdirSync(root)) {
  if (!skip.has(name)) copy(path.join(root, name), path.join(out, name));
}
fs.writeFileSync(path.join(out, ".assetsignore"), "_worker.js\\npackage.json\\nbuild-static.js\\n", "utf8");
console.log("Trainer fallback build completed.");
`, "utf8");

console.log("Standalone FEP/EPI trainer build completed.");
console.log(`Output: ${distRoot}`);
