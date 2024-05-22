const express = require("express");
const router = express.Router();
const controller = require("../controllers/usuario.controllers.js");

router.get('/login', controller.get_login);
router.get('/cerrar_sesion', controller.cerrar_sesion);
router.get('/agregar_usuario', controller.get_agregar_usuario);
router.get('/:id/editar_usuario', controller.get_editar_usuario);

router.post('/login', controller.post_login);
router.get('/mostrar_usuarios', controller.get_mostrar_usuarios);
router.post('/agregar_usuario', controller.post_agregar_usuario);
router.post('/:id/editar_usuario', controller.post_editar_usuario);


module.exports = router;