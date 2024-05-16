const express = require("express");
const router = express.Router();
const controller = require("../controllers/proyecto.controllers.js");

router.get('/home', controller.get_home);

router.get('/nuevo_proyecto', controller.get_nuevo_proyecto);

module.exports = router;