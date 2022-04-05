const multer = require("multer");
const cloudinary = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "MusicPlayerApp",
    allowedFormats: ["jpeg", "jpg", "png", "mp3", "wav", "m4a", "flac"],
  },
});

module.exports.checkLogIn = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.json("Not Authorized");
  }
};

module.exports.upload = multer({ storage: storage });
