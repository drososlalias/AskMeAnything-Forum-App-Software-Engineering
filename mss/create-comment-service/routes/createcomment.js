const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const { createCommentController  ,deleteCommentController} = require('../controllers/createCommentController.js');

//Create Comment

router.post('/createcomment/:postId', auth , createCommentController);

//Delete Comment
router.post('/deletecomment/:postid/:commentid', auth , deleteCommentController);

module.exports = router;
