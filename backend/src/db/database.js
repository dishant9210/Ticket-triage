const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, '../../tickets.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS tickets (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    message     TEXT    NOT NULL,
    category    TEXT,
    priority    TEXT,
    is_urgent   INTEGER,
    keywords    TEXT,
    signals     TEXT,
    confidence  REAL,
    security_flag INTEGER,
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

module.exports = db;