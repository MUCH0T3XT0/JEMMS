const express = require("express");
const router = express.Router();
const controller = require("../controllers/proyecto.controllers.js");

router.get('/home', controller.get_home);
router.get('/nuevo_proyecto', controller.get_nuevo_proyecto);
router.get('/:id/menu_proyecto/', controller.get_proyecto); 
router.get('/info_proyecto', controller.get_info_proyecto);
router.get('/editar_proyecto', controller.get_editar_proyecto);
router.post('/editar_proyecto', controller.post_editar_proyecto);


module.exports = router;