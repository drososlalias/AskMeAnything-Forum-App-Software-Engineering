const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const {eventsController , getEvents} = require("../controllers/eventsController")

router.post('/events'  , auth , eventsController);
router.get('/events/:counter' , getEvents);

module.exports = router ;