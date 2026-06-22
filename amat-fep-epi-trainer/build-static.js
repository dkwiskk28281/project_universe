const fs = require("fs");
const path = require("path");

const root = __dirname;
const distRoot = path.join(root, "dist");

const webFiles = [
  "index.html",
  "styles.css",
  "app.js",
  "cluster-sim.js",
  "english-test.js",
  "mastery.js",
  "readiness.js",
  "term-helper.js",
  "think-tank.js",
  "current-vault-url.html",
  "current-vault-url.json",
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

fs.rmSync(distRoot, { recursive: true, force: true });
for (const file of webFiles) copyFile(path.join(root, file), path.join(distRoot, file));
copyDir(path.join(root, "assets"), path.join(distRoot, "assets"));
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
