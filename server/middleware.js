const multer = require("multer");

module.exports.checkLogIn = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
      res.json("Not Authorized");
  }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname.replace(/\s/g, ""));
  },
});

module.exports.upload = multer({ storage: storage });
