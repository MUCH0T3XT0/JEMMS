const express = require("express");
const router = express.Router();
const controller = require("../controllers/proyecto.controllers.js");
const estatusLogeado = require("../utils/estatusLogeado.js");
const rol = require("../utils/rol.js");
const esLider = require("../utils/esLider.js");

//GET
//Home
router.get('/home',controller.get_home);




//Proyectos
router.get('/nuevo_proyecto', estatusLogeado, rol, controller.get_nuevo_proyecto);
router.get('/:id_proyecto/menu_proyecto', estatusLogeado, controller.get_proyecto); 
router.get('/:id_proyecto/info_proyecto', estatusLogeado, controller.get_info_proyecto);
router.get('/:id_proyecto/editar_proyecto', estatusLogeado, esLider, controller.get_editar_proyecto);

//Riesgos
router.get('/:id_proyecto/:id_riesgo/editar_riesgo', estatusLogeado, esLider, controller.get_editar_riesgo);
router.get('/:id_proyecto/mostrar_riesgos', estatusLogeado, controller.get_mostrar_riesgos);
router.get('/:id_proyecto/nuevo_riesgo', estatusLogeado, esLider, controller.get_nuevo_riesgo);
router.get('/:id/mostrar_tabla_riesgos', controller.get_mostrar_tabla_riesgos); //Se crea la ruta para mostrar la tabla de riesgos
router.get('/:id_proyecto/agregar_riesgos', controller.get_agregar_riesgos);

//POST
//Riesgos
router.post('/:id/editar_proyecto', controller.post_editar_proyecto);
router.post('/:id_proyecto/nuevo_riesgo', estatusLogeado, esLider, controller.post_nuevo_riesgo);
router.post('/:id_proyecto/:id_riesgo/editar_riesgo', estatusLogeado, esLider, controller.post_editar_riesgo);
router.post('/:id_proyecto/:id_riesgo/eliminarRiesgo', estatusLogeado, esLider, controller.post_eliminarRiesgo);

//Proyecto
router.post('/:id_proyecto/nuevo_riesgo', controller.post_nuevo_riesgo);
router.post('/:id_proyecto/agregar_riesgos', controller.post_agregar_riesgos);
router.post('/:id_proyecto/editar_proyecto', controller.post_editar_proyecto);
router.post('/nuevo_proyecto', rol, estatusLogeado, controller.post_nuevo_proyecto);
router.post('/:id_proyecto/cambiarEstatus', estatusLogeado, esLider, controller.post_cambiarEstatus);
router.post('/:id_proyecto/eliminarProyecto', estatusLogeado, esLider, controller.post_eliminarProyecto);



module.exports = router;