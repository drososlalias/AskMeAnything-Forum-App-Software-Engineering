const { check } = require("express-validator");

const registerValidator = check(
    "email",
    "Please include a valid Email",
).isEmail();
module.exports = { registerValidator };
