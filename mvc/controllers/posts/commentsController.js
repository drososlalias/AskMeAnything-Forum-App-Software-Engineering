const Post = require("../../models/Post");

//Create a comment function
const createComment = async (req, res) => {
  const user = req.session.user;
  try {
    const post = await Post.findById(req.params.id);
    const newComment ={
      user: user._id,
      name:user.username,
      text: req.body.text
    };
    post.comments.unshift(newComment);

    await post.save();
    return res.redirect(`/browseposts/${req.params.id}`);
  } catch (error) {
    console.log("Server error");
    return res.redirect(`/browseposts/${req.params.id}`);
  }
};

//Delete comment function
const deleteComment = async (req,res) =>{
  try {
    const post = await Post.findById(req.params.id)
    const comment = post.comments.find(comment => comment.id.toString() == req.params.commentId)
    if(!comment) return res.redirect('/browseposts')
    const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.session.user._id)
    post.comments.splice(removeIndex , 1 );
    await post.save();
    return res.redirect(`/browseposts/${req.params.id}`)
  } catch (error) {
    console.log('Delete Comment Error')
    return res.redirect(`/browseposts/${req.params.id}`)
  }
}

module.exports = { createComment , deleteComment};
