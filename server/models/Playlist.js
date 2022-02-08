const mongoose = require("mongoose");

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
});

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;