const axios = require("axios");

///////////////// Create Post //////////////////
const createCommentController =  (req, res) => {
  const newComment ={
    user: req.user.id,
    name: req.user.name,
    text: req.body.text
  };

    const config = {
      method: "post",
      url: "http://localhost:4005/events",
      headers: { "x-auth-token": req.header("x-auth-token") },
      data: {type: "COMMENT_CREATED" , postId: req.params.postId , newComment}
    };

    
      axios(config)
      .then((result) => res.status(201).json(result.data.msg))
      .catch(err => res.status(500).json({}))
    
};
const deleteCommentController = (req,res) =>{
  const config = {
    method: "post",
    url: "http://localhost:4005/events",
    headers: { "x-auth-token": req.header("x-auth-token") },
    data: {type: "COMMENT_DELETED" , postid : req.params.postid , commentid:req.params.commentid}
  };
    axios(config)
    .then((result) => res.status(201).json({}))
    .catch(err => res.status(500).json({}))
}

module.exports = { createCommentController ,deleteCommentController };
