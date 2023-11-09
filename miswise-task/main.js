// main.js
const { registerUser, loginUser } = require("./auth");
const { storeQuote, getUserQuotes } = require("./data");

// Example usage
registerUser("user1", "password1"); // Register a user
const loggedInUser = loginUser("user1", "password1"); // Login a user

if (loggedInUser) {
  storeQuote(loggedInUser, "This is a user-specific quote."); // Store a user's quote

  // Retrieve and display the user's quotes
  getUserQuotes(loggedInUser)
    .then((quotes) => {
      console.log("User Quotes:", quotes);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
