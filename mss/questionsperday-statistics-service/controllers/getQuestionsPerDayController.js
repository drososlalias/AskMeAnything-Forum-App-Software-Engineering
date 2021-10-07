const axios = require("axios");
const date = require("date-and-time");
const QuestionsPerDay = require("../models/QuestionsPerDay");
const EventsCounter = require('../models/EventsCounter')

const getQuestionsPerDay = async (req, res) => {
  const dates = new Set();
  const data = {};
  const questionsperday = await QuestionsPerDay.find().sort({ date: -1 });
  questionsperday.forEach((questionsperday) => {
    const newDate = date
      .format(questionsperday.date, "DD-MM-YYYY")
      .split("T")[0];
    if (Object.keys(data).length < 10) {
      if (dates.has(newDate)) data[newDate] += 1;
      else {
        dates.add(newDate);
        data[newDate] = 1;
      }
    }
  });
  const keys = Object.keys(data)
  const values = Object.values(data)
  keys.reverse()
  values.reverse()
  res.status(200).send({ keys, values });
};

const events = async (req, res) => {
    const eventcounter = await EventsCounter.find({})
    if(eventcounter.length == 0) {
        let counter = new EventsCounter({counter : 1})
        await counter.save();
    }
    else{
        eventcounter[0].counter++
        await eventcounter[0].save()
    }
  if (req.body.type == "POST_CREATED") {
    const postId = req.body.newPost.uid;
    const updateQuestionsPerDayStats = new QuestionsPerDay({ postId: postId });
    updateQuestionsPerDayStats
      .save()
      .then(() => res.status(201).json({}))
      .catch((err) =>
        res.status(500).json({ msg: "Update QuestionsPerDay Statistics Error" })
      );
  }
  else if(req.body.type == 'POST_DELETED'){
    QuestionsPerDay.findOneAndDelete({postId : req.body.postid.id})
    .then(()=>res.status(200).json({}))
}
  else {
    res.json({});
  }
};

module.exports = { getQuestionsPerDay, events };
