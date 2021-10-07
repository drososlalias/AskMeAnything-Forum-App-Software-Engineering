const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    event: {
        type: Object,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = Event = mongoose.model("event", EventSchema);
