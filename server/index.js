if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const playlist = require("./routes/playlist");
const auth = require("./routes/auth");
const song = require("./routes/song");
const helmet = require("helmet");
const MongoStore = require("connect-mongo");
const mongoSanitize = require("express-mongo-sanitize");

const port = process.env.PORT || 5000;
const secret = process.env.SECRET || "secret";
const dbUrl = process.env.DB_URL || "mongodb://127.0.0.1/music-app";


if (process.env.NODE_ENV === "production") {
  app.use(express.static("../client/build"));
}

mongoose
  .connect(dbUrl)
  .then(console.log("connected to mongodb"));

const store = MongoStore.create({
  mongoUrl: dbUrl,
  secret: "secret",
  touchAfter: 24 * 60 * 60,
});
app.use(
  session({
    store,
    name: 'music-session',
    secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365,
      httpOnly: true,
      secure: false,
    },
  })
);

app.use(mongoSanitize());

app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/default", express.static(__dirname + "/default"));

app.use(helmet());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  })
);

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
