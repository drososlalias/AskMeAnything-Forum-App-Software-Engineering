const axios = require('axios')

const getProfile =  (req, res) => {
  const config = {
    method: "get",
    url: "http://localhost:4008/profile",
    headers: { "x-auth-token": req.session.user.jwt },
  };
  axios(config)
  .then(result=>{
    return res.render("profile.ejs", {
      pageTitle: "Dashboard",
      postsInfo: result.data.postsInfo,
      commentsInfo: result.data.commentsInfo})
    })
  .catch(err =>{
    if (err.response == undefined) {
        return res.redirect("/");
    }
    return res.redirect('/')
  })
}

module.exports = { getProfile };
