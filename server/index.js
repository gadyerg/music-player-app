const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const port = 5000;
const Song = require("./models/Song");

mongoose
  .connect("mongodb://localhost:27017/music-app")
  .then(console.log("connected to mongodb"));

app.use(cors());

app.post("/AddSong", async (req, res) => {
  const newSong = await new Song(req.body);
  Song.save();
});

app.listen(port, () => {
  console.log("listening...");
});
