const express = require("express");
const router = express.Router();
const isAuth = require("../../middleware/auth");
const {
  getCreatePost,
  postCreatePost,
  getPosts,
  getPostById,
  deletePost,
  likePost,
  unlikePost
} = require("../../controllers/posts/postsController.js");
const { createComment , deleteComment } = require("../../controllers/posts/commentsController");
const { getStats } = require("../../controllers/posts/questionsPerKeywordController");
const { questionsPerDay } = require("../../controllers/posts/questionsperdayController");

//Create Post
router.get("/createpost", isAuth, getCreatePost);
router.post("/createpost",isAuth, postCreatePost);

//Delete Post -  Delete Comment
router.post("/:id" , isAuth , deletePost );
router.post("/browseposts/deletecomment/:id/:commentId" , isAuth , deleteComment)

//Browse Posts
router.get("/browseposts", isAuth, getPosts);
router.get("/browseposts/:id", isAuth, getPostById);

//Create Comment
router.post("/createcomment/:id", isAuth, createComment);

//Show statistics
router.get("/getstats" , getStats);
router.get('/questionsperday', questionsPerDay );

//Like & unlike functionality
router.post("/browseposts/like/:id" , isAuth , likePost)
router.post("/browseposts/unlike/:id" , isAuth , unlikePost)

module.exports = router;
