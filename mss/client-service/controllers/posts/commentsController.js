const axios = require('axios')
const createComment = async (req, res) => {
  const {text} = req.body;
  const config = {
    method: "post",
    url: `http://localhost:4002/createcomment/${req.params.id}`,
    headers: { "x-auth-token": req.session.user.jwt },
    data : {text:text}
  };
    axios(config)
    .then(result => res.redirect(`/browsePosts/${req.params.id}`))
    .catch(err =>{
        if (err.response == undefined) {
            return res.redirect("/");
        }
      if(err.response.status == '401'){
        req.session.isLoggedIn = false;
        req.flash('error' , 'Session Expired!')
        return res.redirect('/login')
      }
    })
  };

  
const deleteComment =  (req,res) =>{
  const config = {
    method: "post",
    url: `http://localhost:4002/deletecomment/${req.params.id}/${req.params.commentId}`,
    headers: { "x-auth-token": req.session.user.jwt },
  };
  axios(config)
  .then(() => res.redirect(`/browseposts/${req.params.id}`))
  .catch(err => 
    {
        if (err.response == undefined) {
            return res.redirect("/");
        }
    return res.redirect(`/browseposts/${req.params.id}`)
})
}

module.exports = { createComment , deleteComment};
