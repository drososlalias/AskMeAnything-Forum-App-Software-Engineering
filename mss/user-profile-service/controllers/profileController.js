const axios = require('axios')
const Post = require("../models/Post")
const date = require('date-and-time')
const EventsCounter = require('../models/EventsCounter')
const getProfileController = (req, res) => {
    let numOfComments = 0;
    let numOfPostsToday = 0;
    let numOfCommentsToday = 0;
    let postsInfo = {}
    let commentsInfo = {}
    let data = {}
    //Αll posts
    const now = new Date();
    const date2 = date.format(now, "YYYY-MM-DD");
    let postsInfoPromise = new Promise((resolve, reject) => {
      Post.find({ user: req.user.id })
      .then((results) => {
        postsInfo.info = results
        for (let post of results) {
          let date1 = JSON.stringify(post.date).split("T")[0].split('"')[1];
          if (date1 == date2) {
            numOfPostsToday += 1;
          }
        }
        postsInfo.numOfPostsToday = numOfPostsToday;
        resolve();
      })
      .catch((err) => {
        console.log(err);
        resolve();
      });
    });
    //All comments
    let commentsInfoPromise = new Promise((resolve, reject) => {
      Post.find({ "comments.user": req.user.id })
      .then((results) => {
        for (let result of results) {
          for (let comment of result.comments) {
            if (comment.user.toString() == req.user.id) {
              numOfComments += 1;
              let date1 = JSON.stringify(comment.date)
              .split("T")[0]
              .split('"')[1];
              if (date1 == date2) {
                numOfCommentsToday += 1;
              }
            }
          }
        }
        commentsInfo.numOfComments = numOfComments;
        commentsInfo.numOfCommentsToday = numOfCommentsToday;
        resolve();
      })
      .catch((err) => {
        console.log(err);
        resolve();
      });
    });
   
    
    Promise.all([postsInfoPromise, commentsInfoPromise]).then(() => {
      data.commentsInfo = commentsInfo
      data.postsInfo = postsInfo
       res.status(200).send(data)
    });
  };

const events =  async (req,res) =>{
    const eventcounter = await EventsCounter.find({})
    if(eventcounter.length == 0) {
        let counter = new EventsCounter({counter : 1})
        await counter.save();
    }
    else{
        eventcounter[0].counter++
        await eventcounter[0].save()
    }
    if(req.body.type == 'POST_CREATED') {
        const post = req.body.newPost
        
        const newPost = new Post(post)
        newPost.save()
        .then(()=>res.status(201).json({})) 
        .catch(err => res.status(500).json({msg: "UserProfilePost Error"}))}
    else if(req.body.type == "COMMENT_CREATED")  {
        Post.find({uid : req.body.postId})
        .then((result) =>{
            result[0].comments.unshift(req.body.newComment);
            result[0].save()
            .then(() => res.status(201).json({}))
            .catch(err => res.status(500).json({msg:"UserProfileComment Error"}))
        })
        .catch(err => res.status(500).json({msg: "Unable to find Post in Comment Creation"}))
    }
    else if(req.body.type == 'POST_DELETED'){
      Post.findOneAndDelete({uid : req.body.postid.id})
      .then(()=>res.status(200).json({}))
}
else if(req.body.type == 'COMMENT_DELETED'){
  Post.findOne({uid : req.body.postid})
  .then(post =>{
      const comment = post.comments.find(comment => comment.uid.toString() == req.body.commentid)
      if(!comment) return res.status(500).json({})
      const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id)
      post.comments.splice(removeIndex , 1 );
      post.save()
      .then(()=> res.status(200).json({}))
      .catch(err => res.status(500).json({}))
  })
  .catch(err => res.status(500).json({}))
}
   else{
       res.json({})
   }   
}

module.exports = {getProfileController ,events}