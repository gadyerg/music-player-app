const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth");

router.post("/login", auth.logIn);

router.post("/signup", auth.signUp);

router.get("/signout", auth.signUp);

router.get("/authcheck", auth.authCheck);

module.exports = router;
