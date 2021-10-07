const Post = require("../models/Post");
const EventsCounter = require('../models/EventsCounter')
const axios = require("axios");

const eventSync = async () => {
    try {
        let eventsCounter  = await EventsCounter.find({})
        let helperCounter = -1;
        if(eventsCounter.length == 0){
            let counter = new EventsCounter({counter : 0})  
            helperCounter = counter.counter;
            await counter.save();
        }
        let counter = (helperCounter == -1 ) ? eventsCounter[0].counter : helperCounter 
        const config = {
            method: "get",  
            url: `http://localhost:4005/events/${counter}`
        };         
        const results = await axios(config)
        if (results.data.msg == "No events were found") {
            console.log("Everything up to date");
        } 
        else {
            let events = results.data.events
            for(let missedEvent of events){
                if(missedEvent.event.type == 'POST_CREATED'){
                    let post = new Post(missedEvent.event.newPost)
                    eventsCounter[0].counter++;
                    await eventsCounter[0].save()
                    await post.save()            
                }
                else if (missedEvent.event.type == "COMMENT_CREATED"){
                    let post = await Post.find({uid : missedEvent.event.postId})
                    post[0].comments.unshift(missedEvent.event.newComment)
                    eventsCounter[0].counter++;
                    await eventsCounter[0].save()
                    await post[0].save()
                }
                else if(missedEvent.event.type == 'POST_DELETED') {
                    await Post.findOneAndDelete({uid: missedEvent.event.postid.id})
                    eventsCounter[0].counter++;
                    await eventsCounter[0].save()
                }
                else if (missedEvent.event.type == "COMMENT_DELETED"){
                    let post = await Post.findOne({uid : missedEvent.event.postid})
                    let comment = post.comments.find(comment=>comment.uid.toString() == missedEvent.event.commentid )
                    const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(missedEvent.event.currentUser)
                    post.comments.splice(removeIndex,1)
                    eventsCounter[0].counter++;
                    await eventsCounter[0].save()
                    await post.save()
                }
                else{
                    eventsCounter[0].counter++;
                    await eventsCounter[0].save()
                }       
                }
                console.log('Successful events sync!')
            }
        }
     catch (err) {
        if(err.response == undefined) console.log("Event Bus Service is down.")
        else console.log(err.response.data.msg)
         
    }
};

module.exports =  eventSync 
