const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const { createPostController ,deletePostController } = require('../controllers/createPostController.js');

//Create Post

router.post('/createpost', auth , createPostController);

router.post('/deletepost', auth , deletePostController);

module.exports = router;
