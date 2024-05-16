const express = require("express");
const router = express.Router();
const controller = require("../controllers/usuario.controllers.js");

router.get('/login', controller.get_login);
router.post('/login', controller.post_login);
router.get('/cerrar_sesion', controller.cerrar_sesion);
router.post('/agregar_usuario', controller.post_agregar_usuario);


module.exports = router;