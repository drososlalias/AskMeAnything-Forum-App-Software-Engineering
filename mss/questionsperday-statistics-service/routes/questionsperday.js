const express = require("express");
const router = express.Router();
const { getQuestionsPerDay, events } = require("../controllers/getQuestionsPerDayController");

//Show Single Post route

router.get("/questionsperday", getQuestionsPerDay);

//Events route

router.post("/events", events);

module.exports = router;
