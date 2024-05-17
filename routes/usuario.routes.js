const express = require("express");
const router = express.Router();
const controller = require("../controllers/usuario.controllers.js");

router.get('/login', controller.get_login);
router.post('/login', controller.post_login);
router.get('/mostrar_usuarios', controller.get_mostrar_usuarios);

module.exports = router;