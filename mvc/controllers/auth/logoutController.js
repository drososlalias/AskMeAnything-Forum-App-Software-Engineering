
//Logout process-on logout, session cookie is deleted
const postLogout = async (req, res) => {
    req.session.destroy((err)=>{
        return res.redirect('/')
    })
  };
  module.exports = { postLogout };
  