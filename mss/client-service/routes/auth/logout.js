const express = require("express");
const router = express.Router();
const { postLogout } = require("../../controllers/auth/logoutController.js");

router.post("/logout", postLogout);

module.exports = router;
