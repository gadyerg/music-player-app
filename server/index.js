const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const port = 5000;
const session = require("express-session");
const playlist = require("./routes/playlist");
const auth = require("./routes/auth");
const song = require("./routes/song");

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    httpOnly: true,
    secure: false,
  },
}));

app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/default", express.static(__dirname + "/default"));
app.use(cors({credentials: true, origin: "http://localhost:3000", methods: ["GET", "POST", "DELETE", "PUT", "PATCH"]}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/playlist", playlist);
app.use("/", auth);
app.use("/songs", song);

mongoose
  .connect("mongodb://127.0.0.1/music-app")
  .then(console.log("connected to mongodb"));

app.use((err, req, res, next) => {
  res.status(err.statusCode).send(err.message);
});

app.listen(port, () => {
  console.log("listening...");
});
