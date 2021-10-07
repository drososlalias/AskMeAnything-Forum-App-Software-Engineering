const Stats = require("../models/Statistics");
const EventsCounter = require('../models/EventsCounter')
function sortObjectEntries(obj, n) {
  let sortedList = [];
  sortedList = Object.entries(obj).sort((a, b) => {
    if (b[1] > a[1]) return 1;
    else if (b[1] < a[1]) return -1;
    else {
      if (a[0] > b[0]) return 1;
      else if (a[0] < b[0]) return -1;
      else return 0;
    }
  });
  return sortedList.map((el) => el[0]).slice(0, n);
}

const getStats = (req, res) => {
  const data = {};
  const mySet = new Set();
  const stats = Stats.find({}).then((results) => {
    for (let result of results) {
      result.keywords.forEach((keyword) => {
        if (mySet.has(keyword)) data[keyword] += 1;
        else {
          mySet.add(keyword);
          data[keyword] = 1;
        }
      });
    }
  const keywords = sortObjectEntries(data, 3);
  const counts = [];
  keywords.forEach((result)=>counts.push(data[result]))
  return res.send({keywords , counts})
  })
 .catch(err => res.status(500).json({msg : 'Get Statistics Error'}))
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
    const stats = req.body.newPost.keywords;
    const updateStats = new Stats({ postId : req.body.newPost.uid , keywords: stats });
    updateStats
      .save()
      .then(() => res.status(201).json({}))
      .catch((err) =>
        res.status(500).json({ msg: "Update Keywords Statistics Error" })
      );
  }
    else if(req.body.type == 'POST_DELETED'){
      Stats.findOneAndDelete({postId : req.body.postid.id})
      .then(()=>res.status(200).json({}))
  }
  else {
    res.json({});
  }
};

module.exports = { getStats, events };
