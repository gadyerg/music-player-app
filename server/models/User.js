const mongoose = require("mongoose");
const ExpressError = require("../utils/ExpressError");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: [true, "Username is already taken"],
  },
  password: {
    type: String,
    required: true,
  },
  playlists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Playlist",
    },
  ],
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
