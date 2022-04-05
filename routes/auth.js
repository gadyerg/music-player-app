const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth");
const catchAsync = require("../utils/catchAsync");

router.post("/login", catchAsync(auth.logIn));

router.post("/signup", catchAsync(auth.signUp));

router.get("/signout", auth.signOut);

router.get("/authcheck", auth.authCheck);

module.exports = router;
