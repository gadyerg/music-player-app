const User = require("../models/User");
const ExpressError = require("../utils/ExpressError");
const catchAsync = require("../utils/catchAsync");
const bcrypt = require("bcrypt");

module.exports.signUp = async (req, res, next) => {
  const isTaken = await User.find({ username: req.body.username });
  if (isTaken.length === 1) {
    next(new ExpressError("Username is already taken", 401));
  } else {
    const encryptedPassword = await bcrypt.hash(req.body.password, 12);
    const newUser = await new User({
      username: req.body.username,
      password: encryptedPassword,
    });
    newUser.save();
    res.json("ok");
  }
};

module.exports.logIn = async (req, res, next) => {
  const currentUser = await User.findOne({ username: req.body.username });
  if (!currentUser) {
    next(new ExpressError("Username or password is incorrect", 401));
  }
  const match = await bcrypt.compare(req.body.password, currentUser.password);
  if (match) {
    req.session.user = { id: currentUser.id, username: currentUser.username };
    req.session.save();
    res.json(req.session.user);
  } else {
    next(new ExpressError("Username or password is incorrect", 401));
  }
};

module.exports.signOut = (req, res) => {
  req.session.destroy();
  res.json("session ended");
};

module.exports.authCheck = (req, res) => {
  if (req.session) {
    res.json(req.session.user);
  }
};
