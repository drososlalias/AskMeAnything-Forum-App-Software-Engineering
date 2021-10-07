const User = require("../models/User");
const config = require("config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
///////////////// LOGIN //////////////////
const loginController = (req, res) => {
    const { email, password } = req.params;
    let sessionUser;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ msg: "Invalid Credentials" });
            }
            sessionUser = user;
            return bcrypt.compare(password, user.password);
        })
        .then(value => {
            if (!sessionUser) {
                return;
            }
            if (!value) {
                return res.status(401).json({ msg: "Invalid Credentials" });
            }
            const payload = {
                user: {
                    id: sessionUser.id,
                    name: sessionUser.username,
                    email: sessionUser.email,
                },
            };
            const userJwt = jwt.sign(payload, config.get("jwtSecret"), {
                expiresIn: 3600,
            });
            payload.user.jwt = userJwt;
            res.status(200).json({ payload: payload });
        })
        .catch(err => {
            return res.status(500).json({ msg: "Server Error" });
        });
};
// let user = await User.findOne({ email: email });
// if (!user) {
//     return res.status(401).json({ msg: "Invalid Credentials" });
// }

// let comparePasswords = new Promise((resolve, reject) => {
//     bcrypt
//         .compare(password, user.password)
//         .then(value => {
//             console.log(value);
//             resolve();
//         })
//         .catch(err => reject());
// });
// const isMatch = await bcrypt.compare(password, user.password);
// if (!isMatch) {
//     return res.status(401).json({ msg: "Invalid Credentials" });
// }

// return res.status(200).json({ payload: payload });

/////////////////////////////////  REGISTER /////////////////////

const registerController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ msg: "Please Enter a Valid Email!" });
    }
    const { username, password, email, confirmpassword } = req.params;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({ msg: "User Already Exists" });
        }
        if (password != confirmpassword) {
            return res.status(401).json({ msg: "Passwords must match!" });
        }
        user = new User({
            username,
            email,
            password,
        });

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();
        return res.status(201).json({ msg: "User registered successfully." });
    } catch (err) {
        res.status(500).json({ msg: "Register Error" });
    }
};

module.exports = { loginController, registerController };
