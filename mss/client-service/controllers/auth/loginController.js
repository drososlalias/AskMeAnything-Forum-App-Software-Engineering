const axios = require("axios");

const getLogin = (req, res) => {
    return res.render("login.ejs", {
        pageTitle: "Login",
        errorMessage: req.flash('error')[0],
    });
};
const postLogin = (req, res) => {
    const { email, password } = req.body;
    const url = `http://localhost:4000/login/${email}/${password}`;
    const config = {
        method: "post",
        url: url,
    };
    axios(config)
        .then(result => {
            req.session.isLoggedIn = true;
            req.session.user = result.data.payload.user;
            req.session.save(err => {
                if (err) console.log(err);
                return res.redirect("/");
            });
        })
        .catch(err => {
            if (err.response == undefined) {
                req.flash("error", "An Error Occured.Please Try again later!");
                return res.redirect("/login");
            }
            req.flash("error", "Invalid Credentials");
            return res.redirect("/login");
        });
};

module.exports = { getLogin, postLogin };
