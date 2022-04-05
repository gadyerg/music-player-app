const express = require("express");
const router = express.Router();
const song = require("../controllers/song");
const catchAsync = require("../utils/catchAsync");
const { checkLogIn, upload } = require("../middleware");
const fields = [
  {
    name: "song",
    maxCount: 1,
  },
  {
    name: "cover",
    maxCount: 1,
  },
];

router
  .route("/")
  .get(checkLogIn, catchAsync(song.getSongs))
  .post(checkLogIn, upload.fields(fields), catchAsync(song.uploadSong));

module.exports = router;
