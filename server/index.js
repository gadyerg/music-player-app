const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const port = 5000;
const Song = require("./models/Song");

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

app.use("/uploads", express.static("uploads"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.replace(/\s/g, ""));
  },
});
const upload = multer({ storage: storage });

mongoose
  .connect("mongodb://localhost:27017/music-app")
  .then(console.log("connected to mongodb"));

app.post("/AddSong", upload.fields(fields), async (req, res) => {
  const info = {
    ...req.body,
    cover: "uploads/" + req.files.cover[0].filename,
    song: "uploads/" + req.files.song[0].filename,
  };
  if (
    !req.files.cover[0].mimetype.includes("image") ||
    !req.files.song[0].mimetype.includes("audio")
  ) {
    throw new Error("not valid file type");
  }
  const newSong = await new Song(info);
  newSong.save();

  res.json(newSong);
});

app.get("/GetSongs", async (req, res) => {
  const allSongs = await Song.find();
  res.json(allSongs);
});

app.listen(port, () => {
  console.log("listening...");
});
