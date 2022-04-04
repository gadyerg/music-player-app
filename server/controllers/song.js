const Song = require("../models/Song");
const User = require("../models/User");
const ExpressError = "../utils/ExpressError";

module.exports.uploadSong = async (req, res, next) => {
  const currentUser = await User.findById(req.session.user.id);
  const info = {
    ...req.body,
    cover: "uploads/" + req.files.cover[0].filename,
    song: "uploads/" + req.files.song[0].filename,
  };
  if (!req.files.cover[0].mimetype.includes("image")) {
    next(new ExpressError("Not a valid image file", 401));
  }
  if (!req.files.song[0].mimetype.includes("audio")) {
    next(new ExpressError("Not a valid audio file", 401));
  }
  const newSong = await new Song(info);
  currentUser.songs.push(newSong);

  currentUser.save();
  newSong.save();

  res.end();
};

module.exports.getSongs = async (req, res, next) => {
  const user = await User.findById(req.session.user.id);
  await user.populate("songs");
  const userSongs = user.songs;
  res.json(userSongs);
};
