const db = require('../db/database');
const { classify } = require('../analyzer/classifier');

function analyzeAndSave(message) {
  return new Promise((resolve, reject) => {
    const result = classify(message);
    const sql = `
      INSERT INTO tickets (message, category, priority, is_urgent, keywords, signals, confidence, security_flag)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.run(sql, [
      message,
      result.category,
      result.priority,
      result.isUrgent ? 1 : 0,
      JSON.stringify(result.keywords),
      JSON.stringify(result.signals),
      result.confidence,
      result.securityFlag ? 1 : 0
    ], function (err) {
      if (err) return reject(err);
      resolve({ id: this.lastID, message, ...result });
    });
  });
}

function getAll() {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM tickets ORDER BY created_at DESC LIMIT 50`, [], (err, rows) => {
      if (err) return reject(err);
      resolve(rows.map(row => ({
        ...row,
        keywords: JSON.parse(row.keywords || '[]'),
        signals: JSON.parse(row.signals || '[]'),
        isUrgent: row.is_urgent === 1,
        securityFlag: row.security_flag === 1
      })));
    });
  });
}

module.exports = { analyzeAndSave, getAll };