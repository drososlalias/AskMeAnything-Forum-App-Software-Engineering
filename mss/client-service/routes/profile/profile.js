const express = require("express");
const router = express.Router();
const isAuth = require("../../middleware/auth");
const {getProfile} = require("../../controllers/profile/profileController");

router.get("/profile", isAuth, getProfile);

module.exports = router;
