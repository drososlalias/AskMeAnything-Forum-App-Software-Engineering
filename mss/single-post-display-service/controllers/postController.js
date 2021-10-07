const Post = require("../models/Post")
const EventsCounter = require('../models/EventsCounter')

const showPostController = async (req,res) =>{
    try {
        const post = await Post.find({uid : req.params.postId})
        return res.status(200).send(post[0])
    } catch (err) {
        console.error(err.message);
        console.log("Show Post Error")
    }
}

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
        .catch(err => res.status(500).json({msg: "Create Single Post Error"}))}
    else if(req.body.type == "COMMENT_CREATED")  {
        Post.find({uid : req.body.postId})
        .then((result) =>{
            result[0].comments.unshift(req.body.newComment);
            result[0].save()
            .then(() => res.status(201).json({}))
            .catch(err => res.status(500).json({msg:"Create Comment Error"}))
        })
        .catch(err => res.status(500).json({msg: "Unable to find Post in Comment Creation"}))
    }
    else if(req.body.type == 'POST_DELETED'){
           Post.findOneAndDelete({uid : req.body.postid.id})
           .then((result)=>  res.status(200).json({}))
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

module.exports = {showPostController ,events}