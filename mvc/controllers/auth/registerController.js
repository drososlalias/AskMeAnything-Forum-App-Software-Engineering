const bcrypt = require("bcryptjs");
const User = require("../../models/User");

//Renders the register page
const getRegister = async (req, res) => {
    let message = req.flash("errorr");
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    return res.render("register.ejs", {
        pageTitle: "Register",
        errorMessage: message,
    });
};

//Register process
const postRegister = async (req, res) => {
    const { username, email, password, confirmpassword } = req.body;
    try {
        let user = await User.findOne({ email: email });
        if (user) {
            req.flash("errorr", "Email already exists.");
            return res.redirect("/register");
        }
        if (password != confirmpassword) {
            req.flash("errorr", "Passwords must match.");
            return res.redirect("/register");
        }
        user = new User({
            username,
            email,
            password,
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        return res.redirect("/login");
    } catch (err) {
        console.log("Server Error");
        return res.redirect("/register");
    }
};

module.exports = { getRegister, postRegister };
