const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = process.env.DB_PATH || path.join(__dirname, '../../tickets.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS tickets (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      message       TEXT    NOT NULL,
      category      TEXT,
      priority      TEXT,
      is_urgent     INTEGER,
      keywords      TEXT,
      signals       TEXT,
      confidence    REAL,
      security_flag INTEGER,
      created_at    DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

module.exports = db;