const mongoose = require("mongoose");

const StatisticsSchema = new mongoose.Schema({
    postId: {
        type: String,
        required: true,
    },
    keywords: [
        {
            type: String,
            required: true,
        },
    ],
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = Statistics = mongoose.model("statistics", StatisticsSchema);
