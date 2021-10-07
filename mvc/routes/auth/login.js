const express = require("express");
const router = express.Router();
const { getLogin, postLogin } = require("../../controllers/auth/loginController.js");

// Get login route
router.get("/login", getLogin);

//Post login router
router.post('/login',postLogin)

module.exports = router;
