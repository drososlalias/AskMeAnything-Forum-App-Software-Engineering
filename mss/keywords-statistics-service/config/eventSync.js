const Stats = require("../models/Statistics");
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
                    let stats = new Stats({postId : missedEvent.event.newPost.uid , keywords: missedEvent.event.newPost.keywords})
                    eventsCounter[0].counter++;
                    await eventsCounter[0].save()
                    await stats.save()            
                }
                else if(missedEvent.event.type == 'POST_DELETED') {
                    await Stats.findOneAndDelete({postId: missedEvent.event.postid.id})
                    eventsCounter[0].counter++;
                    await eventsCounter[0].save()

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
