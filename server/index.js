const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const port = 5000;
const Song = require("./models/Song");

const fields = [
  {
    name: 'song',
    maxCount: 1
  },
  {
    name: 'cover',
    maxCount: 1
  }
]

app.use(cors());
app.use(express.urlencoded({ extended: true }))

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

mongoose
  .connect("mongodb://localhost:27017/music-app")
  .then(console.log("connected to mongodb"));

app.post("/AddSong", upload.fields(fields), async (req, res) => {
  const info = {
    ...req.body,
    cover: req.files.cover[0].path,
    song: req.files.song[0].path
  }
  const newSong = await new Song(info);
  // Song.save();
  console.log(newSong);
});

app.listen(port, () => {
  console.log("listening...");
});
