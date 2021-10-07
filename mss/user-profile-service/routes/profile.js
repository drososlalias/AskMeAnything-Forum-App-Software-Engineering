const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { getProfileController, events } = require("../controllers/profileController");

//Show Single Post route

router.get("/profile", auth, getProfileController);

//Events route

router.post("/events", auth, events);

module.exports = router;
