const axios = require("axios");

const getCreatePost = (req, res) =>  res.render("createPost.ejs", { pageTitle: "Ask a question" });

const postCreatePost = (req, res) => {
  let { title, questiontext, keywords } = req.body;
  keywords = keywords.split(",");
  const data = {
    title: title,
    questiontext: questiontext,
    keywords: keywords,
  };
  const config = {
    method: "post",
    url: "http://localhost:4003/createpost",
    headers: { "x-auth-token": req.session.user.jwt },
    data: data,
  };
  axios(config)
    .then((result) => {
      if (result.data == "OK") {
        return res.redirect("/browseposts");
      } else {
        res.redirect("/createpost");
      }
    })
    .catch((err) => {
        if (err.response == undefined) {
            return res.redirect("/");
        }
      if (err.response.status == "401") {
        req.session.isLoggedIn = false;
        req.flash("error", "Session Expired!");
        res.redirect("/login");
      }
    });
};

const deletePost =  (req, res) => {
  const config = {
    method: "post",
    url: "http://localhost:4003/deletepost",
    headers: { "x-auth-token": req.session.user.jwt },
    data: req.params,
  };
  axios(config)
  .then(()=>res.redirect('/browseposts'))
  .catch(err =>  res.redirect('/browseposts'))
};

const getPosts = (req, res) => {
  const config = {
    method: "get",
    url: "http://localhost:4001/showPosts",
    headers: { "x-auth-token": req.session.user.jwt },
  };
  axios(config)
    .then((result) => {
      res.render("showPosts.ejs", {
        pageTitle: "Questions",
        posts: result.data,
      });
    })
    .catch((err) => {
        if (err.response == undefined) {
            return res.redirect("/");
        }
      if (err.response.status == "401") {
        req.session.isLoggedIn = false;
        req.flash("error", "Session Expired!");
        res.redirect("/login");
      }
    });
};

const getPostById = async (req, res) => {
  const config = {
    method: "get",
    url: `http://localhost:4004/showPost/${req.params.id}`,
    headers: { "x-auth-token": req.session.user.jwt },
  };
  axios(config)
    .then((result) => {
      res.render("showPost.ejs", { pageTitle: "Post", post: result.data });
    })
    .catch((err) => {
      if (err.response.status == "401") {
        req.session.isLoggedIn = false;
        req.flash("error", "Session Expired!");
        res.redirect("/login");
      }
    });
};
module.exports = {
  getCreatePost,
  postCreatePost,
  getPosts,
  getPostById,
  deletePost,
};
