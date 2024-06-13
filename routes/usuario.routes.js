const express = require("express");
const router = express.Router();
const controller = require("../controllers/usuario.controllers.js");
const estatusLogeado = require("../utils/estatusLogeado.js");
const rol = require("../utils/rol.js");

router.get('/login', controller.get_login);
router.get('/cerrar_sesion', estatusLogeado, controller.cerrar_sesion);
router.get('/agregar_usuario', estatusLogeado, rol, controller.get_agregar_usuario);
router.get('/:id/editar_usuario', estatusLogeado, rol, controller.get_editar_usuario);

router.post('/login', controller.post_login);
router.get('/mostrar_usuarios', estatusLogeado, controller.get_mostrar_usuarios);
router.post('/agregar_usuario', estatusLogeado, rol, controller.post_agregar_usuario);
router.post('/:id/editar_usuario', estatusLogeado, rol, controller.post_editar_usuario);
router.get('/mostrar_usuarios', estatusLogeado, controller.get_mostrar_usuarios);
router.get('/mostrar_usuarios_lideres', estatusLogeado, controller.get_mostrar_usuarios_lideres);//Se creo la rama para mostrar la información de lideres
router.get('/mostrar_usuarios_colaboradores', estatusLogeado, controller.get_mostrar_usuarios_colaboradores);//Se creo la rama para mostrar la información de colaboradores

router.get('/:id/mostrar_usuarios_lideres_por_proyecto', estatusLogeado, controller.get_mostrar_usuarios_lideres_por_proyecto);//Se creo la rama para mostrar la información de lideres
router.get('/:id/mostrar_usuarios_colaboradores_por_proyecto', estatusLogeado, controller.get_mostrar_usuarios_colaboradores_por_proyecto);//Se creo la rama para mostrar la información de colaboradores

router.get('/:id/agregar_usuarios_colaboradores', estatusLogeado, controller.get_agregar_usuarios_colaboradores);


router.post('/agregar_usuarios_colaboradores', estatusLogeado, controller.post_agregar_usuarios_colaboradores);

router.post('/eliminar_usuarios_colaboradores', estatusLogeado, controller.post_eliminar_usuarios_colaboradores);

router.post('/agregar_usuario', estatusLogeado, rol, controller.post_agregar_usuario);
router.post('/cambiar_liderazgo', estatusLogeado, controller.post_cambiar_liderazgo);
router.post('/:id/editar_usuario', estatusLogeado, rol, controller.post_editar_usuario);
router.post('/:id_usuario/eliminarUsuario', estatusLogeado, rol, controller.post_eliminarUsuario);

module.exports = router;