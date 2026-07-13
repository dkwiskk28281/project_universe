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

CREATE TABLE IF NOT EXISTS passkey_users (
  id TEXT PRIMARY KEY,
  username TEXT UNIQUE,
  display_name TEXT,
  webauthn_user_id TEXT UNIQUE,
  created_at TEXT,
  updated_at TEXT
);

CREATE TABLE IF NOT EXISTS passkey_credentials (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  webauthn_user_id TEXT,
  public_key TEXT NOT NULL,
  counter INTEGER,
  transports TEXT,
  device_type TEXT,
  backed_up INTEGER,
  nickname TEXT,
  created_at TEXT,
  last_used_at TEXT,
  payload TEXT
);

CREATE TABLE IF NOT EXISTS passkey_challenges (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  kind TEXT,
  challenge TEXT,
  created_at TEXT,
  expires_at TEXT,
  options TEXT
);

CREATE TABLE IF NOT EXISTS r2_objects (
  key TEXT PRIMARY KEY,
  label TEXT,
  record_id TEXT,
  file_type TEXT,
  size INTEGER,
  content_type TEXT,
  etag TEXT,
  content_hash TEXT,
  privacy_level TEXT,
  export_policy TEXT,
  ai_summary TEXT,
  tags TEXT,
  created_at TEXT,
  updated_at TEXT,
  payload TEXT
);

CREATE TABLE IF NOT EXISTS case_game_sessions (
  id TEXT PRIMARY KEY,
  case_id TEXT,
  subsystem TEXT,
  status TEXT,
  score INTEGER,
  current_step TEXT,
  completed INTEGER,
  created_at TEXT,
  updated_at TEXT,
  payload TEXT
);

CREATE TABLE IF NOT EXISTS case_game_events (
  id TEXT PRIMARY KEY,
  session_id TEXT,
  case_id TEXT,
  step TEXT,
  answer TEXT,
  correct INTEGER,
  feedback TEXT,
  created_at TEXT,
  payload TEXT
);

CREATE TABLE IF NOT EXISTS ce_campaign_sessions (
  id TEXT PRIMARY KEY,
  campaign_id TEXT,
  status TEXT,
  score INTEGER,
  current_stage TEXT,
  completed INTEGER,
  created_at TEXT,
  updated_at TEXT,
  payload TEXT
);

CREATE TABLE IF NOT EXISTS ce_campaign_events (
  id TEXT PRIMARY KEY,
  session_id TEXT,
  campaign_id TEXT,
  stage_id TEXT,
  answer TEXT,
  correct INTEGER,
  feedback TEXT,
  created_at TEXT,
  payload TEXT
);

CREATE TABLE IF NOT EXISTS evidence_boards (
  id TEXT PRIMARY KEY,
  title TEXT,
  linked_campaign_id TEXT,
  status TEXT,
  selected_cards TEXT,
  created_at TEXT,
  updated_at TEXT,
  payload TEXT
);

CREATE TABLE IF NOT EXISTS evidence_board_events (
  id TEXT PRIMARY KEY,
  board_id TEXT,
  card_id TEXT,
  card_type TEXT,
  selected INTEGER,
  created_at TEXT,
  payload TEXT
);

CREATE INDEX IF NOT EXISTS idx_life_records_book_updated ON life_records(book_id, updated_at);
CREATE INDEX IF NOT EXISTS idx_life_records_privacy_updated ON life_records(privacy_level, updated_at);
CREATE INDEX IF NOT EXISTS idx_life_edges_from_label ON life_edges(from_id, label);
CREATE INDEX IF NOT EXISTS idx_life_edges_to_label ON life_edges(to_id, label);
CREATE INDEX IF NOT EXISTS idx_file_index_record ON file_index(record_id, created_at);
CREATE INDEX IF NOT EXISTS idx_weakness_lane_created ON weakness_events(lane, created_at);
CREATE INDEX IF NOT EXISTS idx_audit_events_created ON audit_events(created_at);
CREATE INDEX IF NOT EXISTS idx_passkey_credentials_user ON passkey_credentials(user_id, created_at);
CREATE INDEX IF NOT EXISTS idx_passkey_challenges_user_kind ON passkey_challenges(user_id, kind);
CREATE INDEX IF NOT EXISTS idx_r2_objects_record ON r2_objects(record_id, updated_at);
CREATE INDEX IF NOT EXISTS idx_case_game_sessions_case ON case_game_sessions(case_id, updated_at);
CREATE INDEX IF NOT EXISTS idx_case_game_events_session ON case_game_events(session_id, created_at);
CREATE INDEX IF NOT EXISTS idx_ce_campaign_sessions_campaign ON ce_campaign_sessions(campaign_id, updated_at);
CREATE INDEX IF NOT EXISTS idx_ce_campaign_events_session ON ce_campaign_events(session_id, created_at);
CREATE INDEX IF NOT EXISTS idx_evidence_boards_updated ON evidence_boards(updated_at);
CREATE INDEX IF NOT EXISTS idx_evidence_board_events_board ON evidence_board_events(board_id, created_at);
