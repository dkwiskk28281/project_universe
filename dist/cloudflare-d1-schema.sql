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

CREATE TABLE IF NOT EXISTS life_records (
  id TEXT PRIMARY KEY,
  legacy_entry_id TEXT,
  book_id TEXT,
  chapter TEXT,
  topic TEXT,
  title TEXT,
  record_type TEXT,
  privacy_level TEXT,
  export_policy TEXT,
  schema_version TEXT,
  source_device TEXT,
  created_at TEXT,
  updated_at TEXT,
  evidence TEXT,
  action TEXT,
  result TEXT,
  next_step TEXT,
  tags TEXT,
  entities TEXT,
  payload TEXT NOT NULL,
  integrity_hash TEXT
);

CREATE TABLE IF NOT EXISTS life_edges (
  id TEXT PRIMARY KEY,
  from_id TEXT,
  to_id TEXT,
  label TEXT,
  weight INTEGER,
  evidence TEXT,
  created_at TEXT
);

CREATE TABLE IF NOT EXISTS file_index (
  id TEXT PRIMARY KEY,
  record_id TEXT,
  label TEXT,
  file_type TEXT,
  content_hash TEXT,
  location_hint TEXT,
  storage_target TEXT,
  privacy_level TEXT,
  export_policy TEXT,
  ai_summary TEXT,
  tags TEXT,
  linked_book TEXT,
  created_at TEXT,
  updated_at TEXT,
  payload TEXT
);

CREATE TABLE IF NOT EXISTS weakness_events (
  id TEXT PRIMARY KEY,
  record_id TEXT,
  lane TEXT,
  skill TEXT,
  severity TEXT,
  evidence TEXT,
  next_action TEXT,
  created_at TEXT,
  payload TEXT
);

CREATE TABLE IF NOT EXISTS audit_events (
  id TEXT PRIMARY KEY,
  event_type TEXT,
  subject_id TEXT,
  severity TEXT,
  message TEXT,
  created_at TEXT,
  payload TEXT
);

CREATE TABLE IF NOT EXISTS ai_packets (
  id TEXT PRIMARY KEY,
  created_at TEXT,
  packet_type TEXT,
  privacy_scope TEXT,
  payload TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_life_records_book_updated ON life_records(book_id, updated_at);
CREATE INDEX IF NOT EXISTS idx_life_records_privacy_updated ON life_records(privacy_level, updated_at);
CREATE INDEX IF NOT EXISTS idx_life_edges_from_label ON life_edges(from_id, label);
CREATE INDEX IF NOT EXISTS idx_life_edges_to_label ON life_edges(to_id, label);
CREATE INDEX IF NOT EXISTS idx_file_index_record ON file_index(record_id, created_at);
CREATE INDEX IF NOT EXISTS idx_weakness_lane_created ON weakness_events(lane, created_at);
CREATE INDEX IF NOT EXISTS idx_audit_events_created ON audit_events(created_at);
