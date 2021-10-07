const express = require("express");
const router = express.Router();
const { landingController } = require("../../controllers/layout/landingController.js");

router.get('/' , landingController);

module.exports = router;
