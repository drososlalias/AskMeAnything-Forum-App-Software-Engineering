const Post = require("../../models/Post");


//Helper function for calculating the data needed for the chart of questionsperkeywords
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

// Renders the questionsPerKeyword page after calculating the data to be used in the graphs
const getStats =  (req, res) => {
    const data = {};
    const mySet = new Set();
    Post.find({})
    .then(results =>{
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
        keywords.forEach((result) => counts.push(data[result]));
        return res.render("questionsperkeyword", {
          pageTitle: "Questions Per Keyword",
          keywords,
          counts,
        });
    })
    .catch(err=> {
        console.error(err);
        return res.redirect('/')
    }) 
};
module.exports = { getStats };
