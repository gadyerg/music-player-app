const express = require("express");
const router = express.Router();
const playlist = require("../controllers/playlist");
const catchAsync = require("../utils/catchAsync");
const { checkLogIn } = require("../middleware");

router.route("/")
  .post(playlist.createPlaylist)
  .get(playlist.getPlaylists);

router.get("/:id/songs", checkLogIn, catchAsync(playlist.getPlaylistSongs));

router.patch("/:id/addsong", checkLogIn, catchAsync(playlist.addPlaylistSong));

router.patch(
  "/:id/removesong",
  checkLogIn,
  catchAsync(playlist.removePlaylistSong)
);

router.delete("/:id", checkLogIn, catchAsync(playlist.deletePlaylist));

module.exports = router;
