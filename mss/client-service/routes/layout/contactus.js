const express = require("express");
const router = express.Router();
const { contactusController , sendEmail} = require("../../controllers/layout/contactusController.js");

router.get("/contactus", contactusController);

router.post("/contactus", sendEmail);

module.exports = router;
