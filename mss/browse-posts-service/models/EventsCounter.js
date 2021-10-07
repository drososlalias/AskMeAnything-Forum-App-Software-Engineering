const mongoose = require("mongoose");

const EventsCounterSchema = new mongoose.Schema({
    counter:{
        type:Number,
        default : 0
    }
});

module.exports = EventsCounter = mongoose.model("eventscounter", EventsCounterSchema);