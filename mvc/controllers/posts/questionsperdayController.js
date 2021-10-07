const Post = require("../../models/Post");
const date = require("date-and-time");

// Renders the questionsPerDay page after calculating the data to be used in the graphs
const questionsPerDay = async (req, res) => {
    try {
        const dates = new Set();
        const data = {};
        const post = await Post.find().sort({ date: -1 });
        post.forEach(post => {
            const newDate = date.format(post.date, "DD-MM-YYYY").split("T")[0];
            if (Object.keys(data).length < 10) {
                if (dates.has(newDate)) data[newDate] += 1;
                else {
                    dates.add(newDate);
                    data[newDate] = 1;
                }
            }
        });
        const keys = Object.keys(data).reverse();
        const values = Object.values(data).reverse();
        res.render("questionsperday.ejs", {
            pageTitle: "Questions per Day",
            dates: keys,
            counts: values,
        });
    } catch (error) {
        console.error(error);
        return res.redirect("/");
    }
};
module.exports = { questionsPerDay };
