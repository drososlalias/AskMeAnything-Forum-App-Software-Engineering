const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth")
const {showPosts , events}  = require("../controllers/postsController")

//Display Posts 
router.get('/showPosts' , auth , showPosts);

//Handle create posts from event bus
router.post('/events' , auth , events);

module.exports = router;