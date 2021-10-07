const express = require('express');
const router = express.Router();
const {registerValidator} = require('../validation/registerValidator')
const {
  loginController,
  registerController,
} = require('../controllers/auth.js');

//@Login Route
router.post('/login/:email/:password', loginController);

//@Register Route
router.post('/register/:username/:password/:email/:confirmpassword', registerValidator , registerController);

module.exports = router;
