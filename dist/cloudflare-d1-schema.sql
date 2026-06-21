CREATE TABLE IF NOT EXISTS entries (
  id TEXT PRIMARY KEY,
  created_at TEXT,
  updated_at TEXT,
  title TEXT,
  type TEXT,
  subsystem TEXT,
  severity TEXT,
  payload TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS snapshots (
  id TEXT PRIMARY KEY,
  created_at TEXT,
  reason TEXT,
  payload TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS exports (
  id TEXT PRIMARY KEY,
  created_at TEXT,
  payload TEXT NOT NULL
);
