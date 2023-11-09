// data.js
const db = require("./database");

// Store a user's quote
function storeQuote(username, quote) {
  db.run("INSERT INTO users (username, quote) VALUES (?, ?)", [
    username,
    quote,
  ]);
}

// Retrieve a user's quotes
function getUserQuotes(username) {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT quote FROM users WHERE username = ?",
      username,
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          const quotes = rows.map((row) => row.quote);
          resolve(quotes);
        }
      }
    );
  });
}

module.exports = { storeQuote, getUserQuotes };
