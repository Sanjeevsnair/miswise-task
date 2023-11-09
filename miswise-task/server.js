const http = require("http");
const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();

// Open SQLite database
const db = new sqlite3.Database("mewise.db");

const server = http.createServer((req, res) => {
  if (req.url === "/" && req.method === "GET") {
    fs.readFile("./index.html", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error retrieving file");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  } else if (req.url === "/addquote" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const { quote, username } = JSON.parse(body);
      db.run(
        "INSERT INTO quotes (username, quote) VALUES (?, ?)",
        [username, quote],
        (err) => {
          if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Error adding quote");
          } else {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Quote added successfully" }));
          }
        }
      );
    });
  } else if (req.url === "/getquotes" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const { username } = JSON.parse(body);
      db.all(
        "SELECT quote FROM quotes WHERE username = ?",
        [username],
        (err, rows) => {
          if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Error retrieving quotes");
          } else {
            const quotes = rows.map((row) => row.quote);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ quotes }));
          }
        }
      );
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Page not found");
  }
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
