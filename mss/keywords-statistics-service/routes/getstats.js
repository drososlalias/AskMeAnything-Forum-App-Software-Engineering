const express = require("express");
const router = express.Router();
const { getStats, events } = require("../controllers/getStatsController");

//Show Single Post route

router.get("/getstats", getStats);

//Events route

router.post("/events", events);

module.exports = router;
