const express = require("express");
const router = express.Router();
const controller = require("../controllers/proyecto.controllers.js");
const estatusLogeado = require("../utils/estatusLogeado.js");
const rol = require("../utils/rol.js");
const esLider = require("../utils/esLider.js");

router.get('/home', estatusLogeado,controller.get_home);
router.get('/nuevo_proyecto', estatusLogeado, rol, controller.get_nuevo_proyecto);
router.get('/:id_proyecto/menu_proyecto', controller.get_proyecto); 
router.get('/:id_proyecto/info_proyecto', estatusLogeado, controller.get_info_proyecto);
router.get('/:id_proyecto/editar_proyecto', controller.get_editar_proyecto);
router.get('/:id_proyecto/:id_riesgo/editar_riesgo', estatusLogeado, esLider, controller.get_editar_riesgo);
router.get('/:id_proyecto/mostrar_riesgos', estatusLogeado, controller.get_mostrar_riesgos);
router.get('/nuevo_riesgo', estatusLogeado, controller.get_nuevo_riesgo);

router.post('/:id_proyecto/editar_proyecto', controller.post_editar_proyecto);
router.post('/nuevo_proyecto', rol, estatusLogeado, controller.post_nuevo_proyecto);
router.post('/:id_proyecto/:id_riesgo/editar_riesgo', estatusLogeado, esLider, controller.post_editar_riesgo);
router.post('/nuevo_riesgo', estatusLogeado, controller.post_nuevo_riesgo);



module.exports = router;