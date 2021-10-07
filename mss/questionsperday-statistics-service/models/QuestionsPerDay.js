const mongoose = require("mongoose");

const QuestionsPerDayStatisticsSchema = new mongoose.Schema({
 postId : {
   type:String,
   required:true
 },
 date: {
  type: Date,
  default: Date.now,
}
});

module.exports = QuestionsPerDay = mongoose.model("questionsperday", QuestionsPerDayStatisticsSchema);
