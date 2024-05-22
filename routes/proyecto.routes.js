const express = require("express");
const router = express.Router();
const controller = require("../controllers/proyecto.controllers.js");

router.get('/home', controller.get_home);
router.get('/nuevo_proyecto', controller.get_nuevo_proyecto);
router.get('/:id/menu_proyecto', controller.get_proyecto); 
router.get('/:id/info_proyecto', controller.get_info_proyecto);
router.get('/:id/editar_proyecto', controller.get_editar_proyecto);
router.get('/:id_proyecto/:id_riesgo/editar_riesgo', controller.get_editar_riesgo);
router.get('/:id/mostrar_riesgos', controller.get_mostrar_riesgos);
router.get('/nuevo_riesgo', controller.get_nuevo_riesgo);

router.post('/:id/editar_proyecto', controller.post_editar_proyecto);
router.post('/nuevo_proyecto', controller.post_nuevo_proyecto);
router.post('/:id_proyecto/:id_riesgo/editar_riesgo', controller.post_editar_riesgo);
router.post('/mostrar_riesgos', controller.post_mostrar_riesgos);
router.post('/nuevo_riesgo', controller.post_nuevo_riesgo);



module.exports = router;