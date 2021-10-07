const axios = require("axios");
const getRegister = async (req, res) => {
    return res.render("register.ejs", {
        pageTitle: "Register",
        errorMessage: req.flash('error')[0],
    });
};

const postRegister = async (req, res) => {
    const { username, email, password, confirmpassword } = req.body;
    const url = `http://localhost:4000/register/${username}/${password}/${email}/${confirmpassword}`;
    const config = {
        method: "post",
        url: url,
    };
    axios(config)
        .then(result => {
            req.session.save(err => {
                if (err) console.log(err);
                return res.redirect("/login");
            });
        })
        .catch(err => {
            if (err.response == undefined) {
                req.flash("error" , "Server is down.Please try again later");
                return res.redirect("/");
            }
            req.flash("error", `${err.response.data.msg}`);
            return res.redirect("/register");
        });
};

module.exports = { getRegister, postRegister };
