const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const Event = require("../models/Event")
const eventsController =  (req, res) => {
  const event = req.body;
  const responses = [];

  if(event.type == "POST_CREATED"){
    const uid = uuidv4();
    event.newPost.uid = uid;
  }
  if(event.type == "COMMENT_CREATED"){
    const uid = uuidv4();
    event.newComment.uid = uid;
  }
  if(event.type == "COMMENT_DELETED"){
    event.currentUser = req.user.id;
  }

  const newEvent = new Event({event : event})
  newEvent.save()
  .then(()=>{
      
  //Configs for every endpoint
  const config_browse_posts_service =
  {method: "post",url: "http://localhost:4001/events",headers: { "x-auth-token": req.header("x-auth-token")} , data: event};
  const config_single_post_display_service =
  {method: "post",url: "http://localhost:4004/events",headers: { "x-auth-token": req.header("x-auth-token")} , data: event};
  const config_keywords_statistics_service=
  {method: "post",url: "http://localhost:4006/events", data: event};
  const config_questionsperday_statistics_service=
  {method: "post",url: "http://localhost:4007/events", data: event};
  const config_user_profile_service=
  {method: "post",url: "http://localhost:4008/events",headers: { "x-auth-token": req.header("x-auth-token")} , data: event};


  let browsePostsPromise = new Promise((resolve,reject) => {
      axios(config_browse_posts_service)
      .then((result) => { responses.push({status : 201 , msg: 'OK-Browse Posts service'}) ; resolve() } )
      .catch(err => {responses.push({status : 500 , msg: 'NOT OK-Browse Posts service'}) ;resolve()} )
  })

  let singlePostDisplayPromise = new Promise((resolve,reject) => {
    axios(config_single_post_display_service)
    .then((result) => { responses.push({status : 201 , msg: 'OK-Single Post service'}) ; resolve() } )
    .catch(err => {responses.push({status : 500 , msg: 'NOT OK-Single Post service'}) ;resolve()} )
})

  let keywordsStatisticsPromise = new Promise((resolve,reject) => {
    axios(config_keywords_statistics_service)
    .then((result) => { responses.push({status : 201 , msg: 'OK-Keywords Statistics service'}) ; resolve() } )
    .catch(err => {responses.push({status : 500 , msg: 'NOT OK-Keywords Statistics service'}) ;resolve()} )
  })

  let QuestionsPerDayStatisticsPromise = new Promise((resolve,reject) => {
    axios(config_questionsperday_statistics_service)
    .then((result) => { responses.push({status : 201 , msg: 'OK-QuestionsPerDay Statistics service'}) ; resolve() } )
    .catch(err => {responses.push({status : 500 , msg: 'NOT OK-QuestionsPerDay Statistics service'}) ;resolve()} )
  })

  let UserProfilePromise = new Promise((resolve,reject) => {
    axios(config_user_profile_service)
    .then((result) => { responses.push({status : 201 , msg: 'OK-UserProfile service'}) ; resolve() } )
    .catch(err => {responses.push({status : 500 , msg: 'NOT OK-UserProfile service'}) ;resolve()} )
  })

  Promise.all([browsePostsPromise,singlePostDisplayPromise,keywordsStatisticsPromise,QuestionsPerDayStatisticsPromise,UserProfilePromise]).then((values)=>{
    let success = true
    responses.forEach(el =>{ (el.status == 201 && success) ? true : false})
    return res.status(200).json({msg: (success ? 'OK' : 'NOT OK')})
  })

  })
  .catch(err =>{
      console.log(err)
      return res.status(500).json({msg: "Save Event in Database failed"})
  })

  };

  const getEvents = async (req,res) => {
      try {
            const counter = parseInt(req.params.counter)
            const events = await Event.find().skip(counter).select('-_id')
            if(events.length == 0) return res.status(200).json({msg: "No events were found"})
            return res.status(200).json({events})
      } catch (err) {
          console.error(err)
          return res.status(500).json({msg: "Get All Events Error"})
      }
  }


module.exports = { eventsController , getEvents};

// axios.post('http://localhost:4000/events' , event)
// axios.post('http://localhost:4002/events' , event)
// axios.post('http://localhost:4003/events' , event)
// axios.post('http://localhost:4004/events' , event)
// axios.post('http://localhost:4006/events' , event)
// axios.post('http://localhost:4007/events' , event)
// axios.post('http://localhost:4008/events' , event)