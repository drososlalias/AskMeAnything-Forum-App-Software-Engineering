const express = require("express");
const router = express.Router();
const { getRegister ,postRegister} = require("../../controllers/auth/registerController.js");

//Get Register route
router.get("/register", getRegister);

//Post register route
router.post("/register" , postRegister)

module.exports = router;
