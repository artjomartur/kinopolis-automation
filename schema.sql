CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    author TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME
);

CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);

CREATE TABLE IF NOT EXISTS feedback (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS push_subscriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    endpoint TEXT NOT NULL UNIQUE,
    p256dh TEXT NOT NULL,
    auth TEXT NOT NULL,
    location TEXT DEFAULT 'kp',
    shift_start TEXT,
    shift_end TEXT,
    user_agent TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS notification_state (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    alert_hash TEXT NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS scanned_plans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    hall TEXT NOT NULL,
    movie TEXT NOT NULL,
    start_time TEXT,
    credits_time TEXT,
    end_time TEXT,
    date TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(hall, movie, date)
);

CREATE TABLE IF NOT EXISTS shift_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    location TEXT NOT NULL,
    author TEXT,
    message TEXT NOT NULL,
    priority TEXT DEFAULT 'normal',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_shift_logs_location ON shift_logs(location);
CREATE INDEX IF NOT EXISTS idx_shift_logs_created_at ON shift_logs(created_at);

CREATE TABLE IF NOT EXISTS email_subscriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    location TEXT DEFAULT 'kp',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    location TEXT NOT NULL,
    employee_number TEXT,
    password_hash TEXT NOT NULL,
    role TEXT DEFAULT 'user',
    xp INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS occupancy_archive (
    key TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    time TEXT NOT NULL,
    hall TEXT NOT NULL,
    date TEXT NOT NULL,
    max_sold INTEGER DEFAULT 0,
    capacity INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_occupancy_date ON occupancy_archive(date);


CREATE TABLE IF NOT EXISTS inventory_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL, -- 'ware', 'eis', 'getraenke', 'slushy'
    name TEXT NOT NULL,
    target INTEGER DEFAULT 0,
    location TEXT, -- 'Kühlschrank 1', 'Gondel A', etc.
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS mhd_records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_id INTEGER,
    item_name TEXT,
    type TEXT,
    location TEXT,
    mhd_date DATE NOT NULL,
    author TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS inventory_counts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    location TEXT NOT NULL,
    date TEXT NOT NULL,
    type TEXT NOT NULL, -- 'popcorn' or 'becher'
    data TEXT NOT NULL, -- JSON string containing the counts
    author TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_inv_counts_date ON inventory_counts(date);

CREATE TABLE IF NOT EXISTS lost_found (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    location TEXT NOT NULL,
    what TEXT NOT NULL,
    category TEXT NOT NULL,
    found_where TEXT NOT NULL,
    found_by TEXT NOT NULL,
    image_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_lost_found_location ON lost_found(location);
