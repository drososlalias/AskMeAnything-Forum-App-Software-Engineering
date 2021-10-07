const Post = require("../../models/Post");
const date = require("date-and-time");

//Renders the User dashboard page after calculating the user statistics data
const getProfile = (req, res) => {
  let numOfComments = 0;
  let numOfPostsToday = 0;
  let numOfCommentsToday = 0;
  let postsInfo = {};
  let commentsInfo = {};
  //Αll posts
  const now = new Date();
  const date2 = date.format(now, "YYYY-MM-DD");
  let postsInfoPromise = new Promise((resolve, reject) => {
    Post.find({ user: req.session.user._id })
      .then((results) => {
        postsInfo.info = results;
        for (let post of results) {
          let date1 = JSON.stringify(post.date).split("T")[0].split('"')[1];
          if (date1 == date2) {
            numOfPostsToday += 1;
          }
        }
        postsInfo.numOfPostsToday = numOfPostsToday;
        resolve();
      })
      .catch((err) => {
        console.log(err);
        resolve();
      });
  });
  //All comments
  let commentsInfoPromise = new Promise((resolve, reject) => {
    Post.find({ "comments.user": req.session.user._id })
      .then((results) => {
        for (let result of results) {
          for (let comment of result.comments) {
            if (comment.user.toString() == req.session.user._id) {
              numOfComments += 1;
              let date1 = JSON.stringify(comment.date)
                .split("T")[0]
                .split('"')[1];
              if (date1 == date2) {
                numOfCommentsToday += 1;
              }
            }
          }
        }
        commentsInfo.numOfComments = numOfComments;
        commentsInfo.numOfCommentsToday = numOfCommentsToday;
        resolve();
      })
      .catch((err) => {
        console.log(err);
        resolve();
      });
  });

  Promise.all([postsInfoPromise, commentsInfoPromise]).then(() => {
    return res.render("profile.ejs", {
      pageTitle: "Dashboard",
      postsInfo: postsInfo,
      commentsInfo: commentsInfo,
    });
  }).catch(err => res.redirect('/'));
};

module.exports = { getProfile };
