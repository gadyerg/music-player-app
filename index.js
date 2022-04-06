if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const playlist = require("./routes/playlist");
const auth = require("./routes/auth");
const song = require("./routes/song");
const helmet = require("helmet");
const MongoStore = require("connect-mongo");
const mongoSanitize = require("express-mongo-sanitize");
const path = require("path");
const cors = require("cors");

const port = process.env.PORT || 5000;
const secret = process.env.SECRET || "secret";
const dbUrl = process.env.DB_URL || "mongodb://127.0.0.1/music-app";

mongoose.connect(dbUrl).then(console.log("connected to mongodb"));

const store = MongoStore.create({
  mongoUrl: dbUrl,
  secret,
  touchAfter: 24 * 60 * 60,
});

app.set("trust proxy", 1);
app.use(
  session({
    store,
    name: "music-session",
    secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365,
      httpOnly: true,
      sameSite: false,
      secure: true,
    },
  })
);

app.use(mongoSanitize());
app.use(cors({
  origin: "https://res.cloudinary.com",
  methods: ["GET"],
  credentials: true,
}))

app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/default", express.static(__dirname + "/default"));

app.use(helmet({
  crossOriginOpenerPolicy: false,
}));
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: [],
    connectSrc: ["'self'", "https://res.cloudinary.com/dxase4lua/"],
    scriptSrc: ["'unsafe-inline'", "'self'"],
    styleSrc: [
      "'unsafe-inline'",
      "'self'",
      "https://fonts.googleapis.com/",
    ],
    workerSrc: ["'self'", "blob:"],
    objectSrc: [],
    imgSrc: [
      "'self'",
      "blob:",
      "data:",
      "https://res.cloudinary.com/dxase4lua/",
    ],
    mediaSrc: [
      "'self'",
      "blob:",
      "data:",
      "https://res.cloudinary.com/dxase4lua/",
    ],
  }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/playlist", playlist);
app.use("/", auth);
app.use("/songs", song);

app.use((err, req, res, next) => {
  res.status(err.statusCode).send(err.message);
});

app.listen(port, () => {
  console.log("listening...");
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
