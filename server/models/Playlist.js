const mongoose = require("mongoose");
const User = require("./User");

const playlistSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
    },
  ],
  thumbnail: {
    type: String,
    required: true,
    default: "default/musicnote.svg",
  }
});

const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = Playlist;
