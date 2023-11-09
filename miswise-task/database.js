// database.js
const sqlite3 = require("sqlite3").verbose();

// Create and connect to the SQLite database
const db = new sqlite3.Database("user_data.db");

// Create a table to store user data (username and quotes)
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      username TEXT NOT NULL,
      password TEXT NOT NULL
    )
  `);
});

module.exports = db;
