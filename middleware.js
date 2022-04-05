const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "MusicPlayerApp/",
    source_type: "auto",
    allowedFormats: ["jpeg", "jpg", "png", "mp3", "ma4", "flac"],
  }
});

module.exports.checkLogIn = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.json("Not Authorized");
  }
};

module.exports.upload = multer({ storage });
