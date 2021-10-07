const axios = require('axios')

const getStats = (req,res) => {  
    config = {
        method : 'get',
        url: 'http://localhost:4006/getstats/'
    }
    axios(config)
    .then(result => res.render("questionsperkeyword" , {pageTitle: "Questions Per Keyword" , keywords : result.data.keywords , counts : result.data.counts}))
    .catch( (err) => {  if (err.response == undefined) {
        return res.redirect("/");
    }}) 
}
module.exports = {getStats}