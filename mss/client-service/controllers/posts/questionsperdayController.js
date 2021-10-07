const axios = require('axios')
const questionsPerDay = async(req,res) =>{
    config = {
        method : 'get',
        url: 'http://localhost:4007/questionsperday/'
    }
    axios(config)
    .then(result =>res.render("questionsperday" , {pageTitle: "Questions per Day" , dates:result.data.keys , counts : result.data.values}))
    .catch( (err) =>   { if (err.response == undefined) {
        return res.redirect("/");}
    })
}
module.exports = {questionsPerDay};