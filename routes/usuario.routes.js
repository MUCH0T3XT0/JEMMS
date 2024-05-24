const express = require("express");
const router = express.Router();
const controller = require("../controllers/usuario.controllers.js");
const estatusLogeado = require("../utils/estatusLogeado.js");

router.get('/login', controller.get_login);
router.get('/cerrar_sesion', estatusLogeado, controller.cerrar_sesion);
router.get('/agregar_usuario', estatusLogeado, controller.get_agregar_usuario);
router.get('/:id/editar_usuario', estatusLogeado, controller.get_editar_usuario);

router.post('/login', controller.post_login);
router.get('/mostrar_usuarios', estatusLogeado, controller.get_mostrar_usuarios);
router.post('/agregar_usuario', estatusLogeado, controller.post_agregar_usuario);
router.post('/:id/editar_usuario', estatusLogeado, controller.post_editar_usuario);


module.exports = router;