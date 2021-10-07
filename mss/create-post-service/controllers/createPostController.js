const axios = require("axios");

///////////////// Create Post //////////////////
const createPostController = (req, res) => {
    const userId = req.user.id;
    const name = req.user.name;
    const { title, questiontext, keywords } = req.body;
    let newKeywords = keywords.map(element => element.trim());
    const newPost = {
        user: userId,
        name: name,
        title: title,
        text: questiontext,
        keywords: newKeywords,
    };

    const config = {
        method: "post",
        url: "http://localhost:4005/events",
        headers: { "x-auth-token": req.header("x-auth-token") },
        data: { type: "POST_CREATED", newPost },
    };
    axios(config)
        .then(result => res.status(201).json(result.data.msg))
        .catch(err => res.status(500).json({}));
};

const deletePostController = (req, res) => {
    const config = {
        method: "post",
        url: "http://localhost:4005/events",
        headers: { "x-auth-token": req.header("x-auth-token") },
        data: { type: "POST_DELETED", postid: req.body },
    };
    axios(config)
        .then(result => res.status(200).json(result.data.msg))
        .catch(err => res.status(500).json({}));
};
module.exports = { createPostController, deletePostController };
