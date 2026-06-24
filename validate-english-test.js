const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = __dirname;
const dist = path.join(root, "dist");

function read(file) {
  return fs.readFileSync(path.join(dist, file), "utf8");
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const context = {
  window: {},
  localStorage: {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    key: () => null,
    length: 0
  },
  sessionStorage: {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {}
  },
  document: {
    querySelector: () => null,
    querySelectorAll: () => []
  },
  location: { protocol: "http:", href: "http://127.0.0.1/validate" },
  navigator: {},
  SpeechSynthesisUtterance: function SpeechSynthesisUtterance() {},
  setInterval,
  clearInterval,
  setTimeout,
  clearTimeout,
  crypto: { randomUUID: () => "validation-id" }
};

context.window = { crypto: context.crypto };
vm.createContext(context);
vm.runInContext(read("english-test-expansion.js"), context);
vm.runInContext(`${read("english-test.js")}
window.__englishAudit = (() => {
  const set = makeEnglishTestSet();
  const pool = getEnglishPoolCounts();
  const counts = set.reduce((acc, item) => {
    acc[item.type] = (acc[item.type] || 0) + 1;
    return acc;
  }, {});
  return {
    counts,
    totalSet: set.length,
    objective: set.filter(item => item.type !== "Speaking"),
    speaking: set.filter(item => item.type === "Speaking"),
    pool,
    poolTotal: Object.values(pool).reduce((sum, value) => sum + value, 0)
  };
})();`, context);

const audit = context.window.__englishAudit;
const answerCounts = [0, 1, 2, 3].map(index => audit.objective.filter(item => item.answer === index).length);
const maxAnswerCount = Math.max(...answerCounts);
const minAnswerCount = Math.min(...answerCounts);
let longestTypeRun = 0;
let currentTypeRun = 0;
let lastType = "";
audit.objective.forEach(item => {
  currentTypeRun = item.type === lastType ? currentTypeRun + 1 : 1;
  lastType = item.type;
  longestTypeRun = Math.max(longestTypeRun, currentTypeRun);
});
const uniqueObjectiveStems = new Set(audit.objective.map(item => `${item.type}:${item.question || item.stem}`)).size;

assert(audit.totalSet === 58, `Expected 58 questions per set, got ${audit.totalSet}`);
assert(audit.counts.Grammar === 18, "Expected 18 grammar questions");
assert(audit.counts.Vocabulary === 16, "Expected 16 vocabulary questions");
assert(audit.counts.Reading === 8, "Expected 8 reading questions");
assert(audit.counts.Listening === 8, "Expected 8 listening questions");
assert(audit.counts.Speaking === 8, "Expected 8 speaking prompts");
assert(audit.poolTotal >= 450, `Expected at least 450 pool items, got ${audit.poolTotal}`);
assert(audit.objective.every(item => Array.isArray(item.options) && item.options.length === 4), "Every objective item must have four options");
assert(audit.objective.every(item => Number.isInteger(item.answer) && item.answer >= 0 && item.answer < item.options.length), "Every objective item must have a valid answer index");
assert(maxAnswerCount - minAnswerCount <= 1, `Answer positions too uneven: ${answerCounts.join("/")}`);
assert(longestTypeRun <= 2, `Too many same-type questions in a row: ${longestTypeRun}`);
assert(uniqueObjectiveStems === audit.objective.length, "Duplicate objective stems found in one objective set");
assert(audit.speaking.every(item => item.prompt && item.pattern && item.sample), "Every speaking item must include prompt, pattern, and sample");

console.log(JSON.stringify({
  ok: true,
  totalSet: audit.totalSet,
  counts: audit.counts,
  pool: audit.pool,
  poolTotal: audit.poolTotal,
  answerCounts,
  longestTypeRun,
  uniqueObjectiveStems
}, null, 2));
