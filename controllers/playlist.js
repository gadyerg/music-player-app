const User = require("../models/User");
const Playlist = require("../models/Playlist");
const Song = require("../models/Song");
const catchAsync = require("../utils/catchAsync");

module.exports.createPlaylist = async (req, res, next) => {
  const user = await User.findById(req.session.user.id);
  const newPlaylist = await new Playlist(req.body);
  user.playlists.push(newPlaylist);
  user.save();
  newPlaylist.save();
  res.json("success");
};

module.exports.getPlaylists = async (req, res, next) => {
  const user = await User.findById(req.session.user.id);
  await user.populate("playlists");
  const userPlaylists = user.playlists;
  res.json(userPlaylists);
};

module.exports.removePlaylistSong = async (req, res, next) => {
  const playlist = await Playlist.findById(req.params.id);
  const user = await User.findById(req.session.user.id);
  const song = await Song.findById(req.body.song);
  if (user.playlists.includes(playlist._id)) {
    playlist.songs.pull(song);
    playlist.save();
    res.json("song removed");
  }
};

module.exports.addPlaylistSong = async (req, res, next) => {
  const playlist = await Playlist.findById(req.params.id);
  const user = await User.findById(req.session.user.id);
  const song = await Song.findById(req.body.song);
  if (user.playlists.includes(playlist._id)) {
    playlist.songs.push(song);
    playlist.save();
    return res.json("added song");
  }
  res.json({ authorized: false });
};

module.exports.getPlaylistSongs = async (req, res) => {
  const playlist = await Playlist.findById(req.params.id);
  await playlist.populate("songs");
  res.json(playlist.songs);
};

module.exports.deletePlaylist = async (req, res) => {
  const user = await User.findById(req.session.user.id);
  if (user.playlists.includes(req.params.id)) {
    await user.playlists.pull(req.params.id);
    await Playlist.findByIdAndDelete(req.params.id);
    user.save();
    res.json("Success");
  }
};
