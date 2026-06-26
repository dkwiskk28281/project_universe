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

CREATE INDEX IF NOT EXISTS idx_entries_type_created_at ON entries(type, created_at);
CREATE INDEX IF NOT EXISTS idx_entries_subsystem_created_at ON entries(subsystem, created_at);

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
