const express = require("express");
const router = express.Router();
const controller = require("../controllers/proyecto.controllers.js");

router.get('/home', controller.get_home);

router.get('/editar_riesgo', controller.get_editar_riesgo);
router.get('/mostrar_riesgos', controller.get_mostrar_riesgos);
router.get('/nuevo_riesgo', controller.get_nuevo_riesgo);

router.post('/editar_riesgo', controller.post_editar_riesgo);
router.post('/mostrar_riesgos', controller.post_mostrar_riesgos);
router.post('/nuevo_riesgo', controller.post_nuevo_riesgo);

module.exports = router;