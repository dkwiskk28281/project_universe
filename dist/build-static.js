const fs = require("fs");
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
console.log(`Static dist passthrough completed: ${out}`);
