const db = require("./database");
const bcrypt = require("bcrypt"); // For password hashing

// Function to register a new user
function registerUser(username, password) {
  // Hash the password
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Check if the username already exists in the database
  db.get("SELECT id FROM users WHERE username = ?", username, (err, row) => {
    if (err) {
      console.error("Database error:", err);
    } else if (row) {
      console.log("Username already exists");
    } else {
      // Insert the new user into the database
      db.run(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [username, hashedPassword],
        (err) => {
          if (err) {
            console.error("Error registering user:", err);
          } else {
            console.log("User registered successfully");
          }
        }
      );
    }
  });
}

// Function to login a user
function loginUser(username, password, callback) {
  db.get(
    "SELECT id, password FROM users WHERE username = ?",
    username,
    (err, row) => {
      if (err) {
        console.error("Database error:", err);
        callback(err, null);
      } else if (!row) {
        console.log("User not found");
        callback(null, null);
      } else {
        // Compare the hashed password
        bcrypt.compare(password, row.password, (err, res) => {
          if (err) {
            console.error("Password comparison error:", err);
            return err, null;
          } else if (res) {
            console.log("Login successful");
            return null, row.username; // Return the username upon successful login
          } else {
            console.log("Incorrect password");
            return null, null;
          }
        });
      }
    }
  );
}

loginUser("user1", "password1");
module.exports = { registerUser, loginUser };
