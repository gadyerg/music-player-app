const express = require("express");
const router = express.Router();
const playlist = require("../controllers/playlist");

router.route("/")
  .post(playlist.createPlaylist)
  .get(playlist.getPlaylists);

router.get("/:id/songs", playlist.getPlaylistSongs);

router.patch("/:id/addsong", playlist.addPlaylistSong);

router.patch("/:id/removesong", playlist.removePlaylistSong);

router.delete("/:id", playlist.deletePlaylist);

module.exports = router;
