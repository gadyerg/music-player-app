const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const bcrypt = require("bcrypt");
const port = 5000;
const Song = require("./models/Song");
const Playlist = require("./models/Playlist");
const User = require("./models/User");
const catchAsync = require("./utils/catchAsync");
const session = require("express-session");

const fields = [
  {
    name: "song",
    maxCount: 1,
  },
  {
    name: "cover", maxCount: 1,
  },
]; 
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    httpOnly: true,
    secure: false,
  },
}))

app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(cors({credentials: true, origin: "http://localhost:3000", methods: ["GET", "POST"]}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname.replace(/\s/g, ""));
  },
});
const upload = multer({ storage: storage });

mongoose
  .connect("mongodb://localhost:27017/music-app")
  .then(console.log("connected to mongodb"));

app.post("/AddSong", upload.fields(fields), async (req, res) => {
  const currentUser = await User.findById(req.body.id);
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
  currentUser.songs.push(newSong);

  currentUser.save();
  newSong.save();

  res.end();
});

app.post("/:id/CreatePlaylist", async (req, res) => {
  const user = await User.findById(req.params.id);
  const newPlaylist = await new Playlist(req.body);
  user.playlists.push(newPlaylist);
  user.save();
  newPlaylist.save();
  res.end();
});

app.get("/:id/GetPlaylists", async (req, res) => {
  const user = await User.findById(req.params.id);
  await user.populate("playlists");
  const userPlaylists = user.playlists;
  res.json(userPlaylists);
});

app.get("/:id/GetSongs", async (req, res) => {
  const user = await User.findById(req.params.id);
  await user.populate("songs");
  const userSongs = user.songs;
  res.json(userSongs);
});

app.post(
  "/SignUp",
  catchAsync(async (req, res) => {
    const encryptedPassword = await bcrypt.hash(req.body.password, 12);
    const newUser = await new User({
      username: req.body.username,
      password: encryptedPassword,
    });
    newUser.save();
    res.end();
  })
);

app.post(
  "/LogIn",
  catchAsync(async (req, res) => {
    const currentUser = await User.findOne({ username: req.body.username });
    const match = await bcrypt.compare(req.body.password, currentUser.password);
    if (match) {
      req.session.user = currentUser._id;
      req.session.save();
      res.send(req.session);
    }
  })
);

app.get("/AuthCheck", (req, res) => {
  if (req.session.user) {
    return res.json(req.session);
  }
  res.json(req.session);
});

app.use((err, req, res, next) => {
  console.log(err, "hello");
  next();
});

app.listen(port, () => {
  console.log("listening...");
});
