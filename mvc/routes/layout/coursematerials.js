const express = require("express");
const router = express.Router();

const {courseMaterialsController} = require('../../controllers/layout/courseMaterialsController')

router.get("/coursematerials", courseMaterialsController);

module.exports = router;
