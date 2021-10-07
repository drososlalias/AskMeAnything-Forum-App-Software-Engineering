const User = require("../../models/User");
const bcrypt = require("bcryptjs");

//Renders the login page
const getLogin =  (req, res) => {
    return res.render("login.ejs", {
        pageTitle: "Login",
        errorMessage: req.flash('error')[0],
    });
};

//Login process-checks if credentials are correct and if not , informs the client about it
const postLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email: email });
        if (!user) {
            req.flash("error", "Invalid email or password.");
            return res.redirect("/login");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            req.flash("error", "Invalid email or password.");
            return res.redirect("/login");
        }
        req.session.isLoggedIn = true;
        req.session.user = user;
        req.session.save(err => {
            if (err) console.log(err);
            req.flash('success','Session Acquired')
            return res.redirect("/");
        });
    } catch (error) {
        console.log("Server Error");
        return res.redirect("/");
    }
};

module.exports = { getLogin, postLogin };
