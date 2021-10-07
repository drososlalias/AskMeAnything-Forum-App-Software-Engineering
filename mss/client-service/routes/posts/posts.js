const express = require("express");
const router = express.Router();
const isAuth = require("../../middleware/auth");
const {
  getCreatePost,
  postCreatePost,
  getPosts,
  getPostById,
  deletePost
} = require("../../controllers/posts/postsController.js");
const { createComment , deleteComment } = require("../../controllers/posts/commentsController");
const { getStats } = require("../../controllers/posts/questionsPerKeywordController");
const { questionsPerDay } = require("../../controllers/posts/questionsperdayController");

router.get("/createpost", isAuth, getCreatePost);
router.post("/createpost",isAuth, postCreatePost);

router.post("/deletepost/:id" , isAuth , deletePost );

router.post("/browseposts/deletecomment/:id/:commentId" , isAuth , deleteComment)

router.get("/browseposts", isAuth, getPosts);
router.get("/browseposts/:id", isAuth, getPostById);

router.post("/createcomment/:id", isAuth, createComment);

router.get("/getstats" , getStats);
router.get('/questionsperday', questionsPerDay );
module.exports = router;
