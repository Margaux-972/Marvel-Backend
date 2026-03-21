const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: String,
  username: String,
  token: String,
  hash: String,
  salt: String,
  favorites: {
    comics: [Object],
    characters: [Object],
  },
});

module.exports = User;
