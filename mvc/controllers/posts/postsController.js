const Post = require("../../models/Post");

//Renders the create post form
const getCreatePost = async (req, res) => {
  res.render("createPost.ejs", { pageTitle: "Ask a question" });
};

//Handles the create post action
const postCreatePost = async (req, res) => {
  const userId = req.session.user._id;
  const { title, questiontext, keywords } = req.body;
  let newKeywords = keywords.split(",");
  newKeywords = newKeywords.map((element) => element.trim());
  try {
    const newPost = new Post({
      user: userId,
      title: title,
      text: questiontext,
      keywords: newKeywords,
    });
    await newPost.save();
    return res.redirect("/browseposts");
  } catch (error) {
    console.log("Server error");
    return res.redirect("/browseposts");
  }
};

//Deletes a post
const deletePost = async (req, res) => {
  await Post.findOneAndDelete({ _id: req.params.id });
  return res.redirect("/browseposts");
};

//Shows all posts
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 }).populate("user");
        return res.render("showPosts.ejs", { pageTitle: "Questions", posts: posts });
    } catch (error) {
        console.error(error)
        return res.render("showPosts.ejs", { pageTitle: "Questions", posts: posts });
    }
  
};

//Shows single post with a certain id
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("user");
    if (!post) return res.redirect('/browseposts')
    return res.render("showPost.ejs", { pageTitle: "Post", post: post });
  } catch (error) {
    console.log("getPostById Error");
    return res.redirect('/browseposts')
  }
};

//Like a post functionality
const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if(post.likes.length == 0){
        post.likes.unshift({ user : req.session.user._id })
    }
    else{
        for (let i = 0; i < post.likes.length; i++) {
           if(post.likes[i].user.toString() == req.session.user._id){
               return res.redirect('/browseposts')
           }
           post.likes.unshift({user : req.session.user._id})
           break;
        }
    }
    await post.save();
    return res.redirect('/browseposts')
  } catch (err) {
    console.error(err);
    return res.redirect('/browseposts')
  }
};

//unlike a post functionality
const unlikePost = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if(post.likes.length == 0){
          return res.redirect('/browseposts')
      }
      else{
          for (let i = 0; i < post.likes.length; i++) {
            if(post.likes[i].user.toString() != req.session.user._id){
               break;
            }
            else{
                const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.session.user._id)
                post.likes.splice(removeIndex,1)
                break;
            }
          }
      }
    
      await post.save();
      return res.redirect('/browseposts')
    } catch (err) {
      console.error(err);
      return res.redirect('/browseposts')
    }
  };

module.exports = {
  getCreatePost,
  postCreatePost,
  getPosts,
  getPostById,
  deletePost,
  likePost,
  unlikePost
};
