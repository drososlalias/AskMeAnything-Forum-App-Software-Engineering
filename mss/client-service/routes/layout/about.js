const express = require("express");
const router = express.Router();
const { aboutController } = require("../../controllers/layout/aboutController.js");

router.get("/about",  aboutController);

module.exports = router;
