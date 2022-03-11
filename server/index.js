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
const middleware = require("./middleware");

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
app.use(cors({credentials: true, origin: "http://localhost:3000", methods: ["GET", "POST", "DELETE"]}));
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
  .connect("mongodb://127.0.0.1/music-app")
  .then(console.log("connected to mongodb"));

app.post("/AddSong", upload.fields(fields), middleware.checkLogIn, async (req, res) => {
  const currentUser = await User.findById(req.session.user.id);
  const info = {
    ...req.body,
    cover: "uploads/" + req.files.cover[0].filename,
    song: "uploads/" + req.files.song[0].filename, };
  if (
    !req.files.cover[0].mimetype.includes("image")
  ) {
    res.json("not a valid image file");
  }
  if (
    !req.files.song[0].mimetype.includes("audio")
  ) {
    res.json('not a valid audio file');
  }
  const newSong = await new Song(info);
  currentUser.songs.push(newSong);

  currentUser.save();
  newSong.save();

  res.end();
});

app.post("/:id/CreatePlaylist", middleware.checkLogIn, async (req, res) => {
  const user = await User.findById(req.params.id);
  const newPlaylist = await new Playlist(req.body);
  user.playlists.push(newPlaylist);
  user.save();
  newPlaylist.save();
  res.end();
});

app.get("/:id/GetPlaylists", middleware.checkLogIn, async (req, res) => {
  const user = await User.findById(req.params.id);
  await user.populate("playlists");
  const userPlaylists = user.playlists;
  res.json(userPlaylists);
});

app.get("/:id/GetSongs", middleware.checkLogIn, async (req, res) => {
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
    res.json("ok")
  })
);

app.post(
  "/LogIn",
  catchAsync(async (req, res) => {
    const currentUser = await User.findOne({ username: req.body.username });
    const match = await bcrypt.compare(req.body.password, currentUser.password);
    if (match) {
      req.session.user = {id: currentUser.id, username: currentUser.username}
      req.session.save();
      res.json(req.session.user);
    }
  })
);

app.get(
  "/SignOut",
  (req, res) => {
    req.session.destroy();
    res.json("session ended");
});

app.get(
  "/AuthCheck",
  (req, res) => {
    if (req.session){
      res.json(req.session.user);
    }
});

app.put("/:id/editPlaylist", async (req, res) => {
  const playlist = await Playlist.findById(req.params.id);
  const user = await User.findById(req.session.user.id);
  const song = await Song.findById(req.body.song);
  if (user.playlists.includes(playlist._id)) {
    playlists.songs.push(song);
    playlist.save();
  } else {
    console.log('not authorized');
  }
});

app.use((err, req, res, next) => {
  console.log(err, "hello");
  next();
});

app.listen(port, () => {
  console.log("listening...");
});
