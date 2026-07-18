const fs = require("fs");
const path = require("path");

const root = __dirname;
const appRoot = path.join(root, "amat-fep-epi-trainer");
const distRoot = path.join(root, "dist");

const webFiles = [
  "index.html",
  "styles.css",
  "app.js",
  "webgl-twin.js",
  "cluster-sim.js",
  "english-test-expansion.js",
  "english-test.js",
  "mastery.js",
  "readiness.js",
  "term-helper.js",
  "cognitive.js",
  "bookshelf.js",
  "materials-ms.js",
  "think-tank.js"
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

function copyWebApp(destRoot) {
  fs.mkdirSync(destRoot, { recursive: true });
  for (const file of webFiles) {
    copyFile(path.join(appRoot, file), path.join(destRoot, file));
  }
  copyDir(path.join(appRoot, "assets"), path.join(destRoot, "assets"));
}

function writeFallbackBuild(destRoot, packageName) {
  const fallbackBuild = `const fs = require("fs");
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
console.log("Static fallback build completed.");
`;

  const fallbackPackage = {
    name: packageName,
    version: "1.0.0",
    private: true,
    scripts: {
      build: "node build-static.js"
    }
  };

  fs.writeFileSync(path.join(destRoot, "package.json"), `${JSON.stringify(fallbackPackage, null, 2)}\n`, "utf8");
  fs.writeFileSync(path.join(destRoot, "build-static.js"), fallbackBuild, "utf8");
}

fs.rmSync(distRoot, { recursive: true, force: true });
copyWebApp(distRoot);
copyWebApp(path.join(distRoot, "amat-fep-epi-trainer"));

copyFile(path.join(appRoot, "_worker.js"), path.join(distRoot, "_worker.js"));
copyFile(path.join(appRoot, "cloudflare-d1-schema.sql"), path.join(distRoot, "cloudflare-d1-schema.sql"));
copyFile(path.join(appRoot, "README.md"), path.join(distRoot, "README.md"));
fs.writeFileSync(path.join(distRoot, ".assetsignore"), "_worker.js\npackage.json\nbuild-static.js\n", "utf8");
writeFallbackBuild(distRoot, "project-universe-dist-static");
writeFallbackBuild(path.join(distRoot, "amat-fep-epi-trainer"), "amat-fep-epi-trainer-dist-static");

console.log("FEP/EPI trainer build completed.");
console.log(`Output: ${distRoot}`);
