const express = require("express");
const router = express.Router();
const controller = require("../controllers/proyecto.controllers.js");

router.get('/home', controller.get_home);
router.get('/nuevo_proyecto', controller.get_nuevo_proyecto);
router.get('/:id/menu_proyecto/', controller.get_proyecto); //preguntar a la miss

module.exports = router;