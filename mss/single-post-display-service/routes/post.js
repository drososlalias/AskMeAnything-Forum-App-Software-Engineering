const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { showPostController, events } = require("../controllers/postController");

//Show Single Post route

router.get("/showPost/:postId", auth, showPostController);

//Events route

router.post("/events", auth, events);

module.exports = router;
