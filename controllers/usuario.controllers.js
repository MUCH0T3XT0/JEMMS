const model = require("../models/usuario.models.js");
const modelP = require("../models/proyecto.models.js");
const bcrypt = require('bcryptjs');

module.exports.get_login = async(req,res) =>{
    res.status(200).render("login/login",{
        registro: true
    });
}

module.exports.post_login = async(req, res) =>{
    try {
        console.log("Entrando");
        const usuarios = await model.Usuario.buscaUsuario(req.body.correo)
        
        if(usuarios.length < 1){
            res.status(400).json({code: 400, msg: "Usuario no encontrado"});
            return;
        }

        const usuario = usuarios[0];
        
        const doMatch = await bcrypt.compare(req.body.contrasena, usuario.contrasena);
        //const doMatch = (req.body.contrasena == usuario.contrasena) ? true : false
       
        

        if(!doMatch) {
            req.session.estatusLogeado = false;
            res.status(400).json({code: 400, msg: "Contraseña incorrecta"});
            return;
        }

        req.session.estatusLogeado = true;
        req.session.idUsuario = usuarios[0].id_usuario;
        req.session.rol = (usuarios[0].rol == false) ? false : true;

        
        res.status(201).json({code: 201, msg: "Ok"});
        

    }catch (error){
        console.log(error);
        req.session.estatusLogeado = false;
        res.status(400).json({code: 400, msg: "Contraseña incorrecta"});
    }        
}

//Se modificó la función para mostrar la interfaz de mostrar los usuarios
module.exports.get_mostrar_usuarios = async(req,res) =>{
    console.log("Recuperando información de los usuarios");

    const rol = req.session.rol;
    const id_usuario = req.session.idUsuario;

    res.render("mostrar_usuarios/mostrar_usuarios",
        {
            rol: rol,
            id_usuario: id_usuario
        }
    );
}

//Se agregó la función para mostrar la información de los líderes
module.exports.get_mostrar_usuarios_lideres = async(req,res) =>{
    try{
        console.log("Recuperando información de los lideres");
        const lideres = await model.Usuario.getLideres();        
        
        res.status(200).json({
            usuario1: lideres
        });
    }catch(error){
        console.log(error);
        res.status(400).json({
            usuario1: []
        });

    }
    
}

//Se agregó la función para mostrar la información de los colaboradres
module.exports.get_mostrar_usuarios_colaboradores = async(req,res) =>{
    try{
        console.log("Recuperando información de los colaboradores");
        const colaboradores = await model.Usuario.getColaboradores();

        res.status(200).json({
            usuario2: colaboradores //La variable usuario se ocupa en el html dinamico y lo de usuarios es el resultado de la consulta hecha

        });
    
    }catch(error){
        res.status(200).json({
            usuario2: [] //La variable usuario se ocupa en el html dinamico y lo de usuarios es el resultado de la consulta hecha
        });
    }
    
}

//Se agregó las funciónes para mostrar la información de los colaboradres y lideres por proyecto

module.exports.get_mostrar_usuarios_lideres_por_proyecto = async(req,res) =>{
    try{
        console.log("Recuperando información de los lideres por proyecto");
        const id_proyecto= req.params.id;
        const lideres = await model.Usuario.getLideresProyecto(id_proyecto);        
        
        res.status(200).json({
            usuario1: lideres
        });
    }catch(error){
        console.log(error);
        res.status(400).json({
            usuario1: []
        });

    }
    
}
module.exports.get_mostrar_usuarios_colaboradores_por_proyecto = async(req,res) =>{
    try{
        console.log("Recuperando información de los colaboradores por proyecto");
        const id_proyecto= req.params.id;
        const colaboradores = await model.Usuario.getColaboradoresProyecto(id_proyecto);

        res.status(200).json({
            usuario2: colaboradores //La variable usuario se ocupa en el html dinamico y lo de usuarios es el resultado de la consulta hecha

        });
    
    }catch(error){
        res.status(200).json({
            usuario2: [] //La variable usuario se ocupa en el html dinamico y lo de usuarios es el resultado de la consulta hecha
        });
    }
    
}

module.exports.get_agregar_usuarios_colaboradores = async(req,res) =>{
    try{
        console.log("Recuperando información de los colaboradores por proyecto");
        const id_proyecto= req.params.id;
        const colaboradores = await model.Usuario.getNoColaboradoresProyecto(id_proyecto);
        
        res.status(200).json({
            usuario2: colaboradores //La variable usuario se ocupa en el html dinamico y lo de usuarios es el resultado de la consulta hecha

        });
    
    }catch(error){
        res.status(200).json({
            usuario2: [] //La variable usuario se ocupa en el html dinamico y lo de usuarios es el resultado de la consulta hecha
        });
    }
    
}



module.exports.cerrar_sesion = async(req,res) => {
    req.session.estatusLogeado = false;
    req.session.idUsuario = null;
    req.session.rol = null;
    res.redirect("/usuario/login");
}

module.exports.get_agregar_usuario = async(req,res) =>{
    const valido = req.query.valido === 'false' ? false : true;
    const correov = req.query.correov === 'false' ? false : true;
    const nombre = req.query.nombre === 'false' ? false : true;
    res.status(200).render("agregar_usuario/agregar_usuario",{
        code:200,
        msg: "Ok",
        valido: valido,
        correov:correov,
        nombre:nombre
    });
}

module.exports.post_agregar_usuario = async(req, res) => {
    try {
        const nombrevalido = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/;
        const nombre = req.body.nombre;
        const apellido_p = req.body.apellido_p;
        const apellido_m = req.body.apellido_m;
        const correo = req.body.correo;
        const contrasena = req.body.contrasena;
        const rol = req.body.rol;

        const usuario = new model.Usuario(null, correo, nombre, apellido_m, apellido_p, contrasena, rol);

        const verificacion = await model.Usuario.buscaUsuario(correo);

        if(verificacion < 1){
            console.log(usuario);

            const usuarionuevo = await usuario.guardar_usuario();

            res.status(201).json({code: 201, msg: "Ok"});
        }else{
            res.status(400).json({code: 400, msg: "Usuario ya existente"});
        }

        

    } catch (error) {
        console.error(error);
        res.status(500).json({code: 400, msg: "Error en la BD"});// Idealmente se crea una plantilla de errores genérica
    }
}

module.exports.get_editar_usuario = async(req,res) =>{
    try {
        //Busca el usuario en la BD
        const usuario = await model.Usuario.buscaUsuarioPorId(req.params.id);
        const valido = req.query.valido === 'false' ? false : true;
        const nombre = req.query.nombre === 'false' ? false : true;

        //Verifica la que exista el Usuario de la BD, si es menor a 1 significa que es un array vacio
        if(usuario.length < 1){
            res.redirect("/usuario/mostrar_usuarios");
            return;
        }

        //Se lleva a la pagina para editar info del usuario seleccionado
        res.status(200).render("editar_usuario/editar_usuario",{
            code: 200,
            msg: "Ok",
            id_actual: req.params.id,
            id_usuario: req.session.idUsuario,
            usuario:usuario,
            valido:valido,
            nombre:nombre
        });
    }catch (error){
        res.redirect("/agregar_usuario/agregar_usuario");
    }
}

module.exports.post_editar_usuario = async(req, res) => {
    try {
        //Se guarda la info del body en constantes
        
        const opcion = req.body.opcion;
        const id = req.params.id;
        const nombre = req.body.nombre;
        const apellido_p = req.body.apellido_p;
        const apellido_m = req.body.apellido_m;
        const contrasena = req.body.contrasena;
        const rol = req.body.rol;
        
        
        if(opcion){
            //Se crea el constructor
            const usuario = new model.Usuario(id, null, nombre, apellido_m, apellido_p, contrasena, rol);
            //Se edita el usuario en la BD
            const editado = await usuario.editar_usuario();
        }else{
            //Se crea el constructor
            const usuario = new model.Usuario(id, null, nombre, apellido_m, apellido_p, contrasena, rol);
            //Se edita el usuario en la BD
            const editado = await usuario.editar_usuario_nocon();
        }
        
        res.status(201).json({code: 201, msg: "Ok"});
    
    } catch (error) {
        console.error(error);
        res.status(500).json({code: 500, message: "Error editando usuario" }); // Idealmente se crea una plantilla de errores genérica
    }
}
module.exports.post_agregar_usuarios_colaboradores = async(req, res) =>{
    try{
        console.log("Agregando colaborador");

        const agregaT = await model.Usuario.agregaTrabaja(req.body.id, req.body.id_proyecto);

        console.log(agregaT);
        console.log("Wenas")
        res.status(201).json({code: 201, msg: "Ok"});
        return;
    }catch(error){
        console.log(error);
    }
}
module.exports.post_eliminar_usuarios_colaboradores = async(req, res) =>{
    try{
        console.log("Borrando colaborador");

        const agregaT = await model.Usuario.eliminaTrabajaProyecto(req.body.id, req.body.id_proyecto);

        console.log(agregaT);

        res.status(201).json({code: 201, msg: "Ok"});
        return;
    }catch(error){
        console.log(error);
    }
}
module.exports.post_cambiar_liderazgo = async(req, res) =>{
    console.log("Cambiando liderazgo");
    try{
        console.log("Cambiando liderazgo");
        const liderAnterior = await modelP.Proyecto.idLider(req.body.id_proyecto);
        console.log(typeof(liderAnterior[0].id_lider))
        const cambiaL = await model.Usuario.cambiarLider(req.body.id, req.body.id_proyecto);
        const agregaT = await model.Usuario.agregaTrabaja(liderAnterior[0].id_lider, req.body.id_proyecto);
        console.log(cambiaL);
        res.redirect("/proyecto/"+req.body.id_proyecto+"/menu_proyecto");
        return;
    }catch(error){
        console.log(error);
    }
}
module.exports.post_eliminarUsuario = async(req, res) =>{
    try{
        console.log("Borrando Usuario");
        const buscaLider = await model.Usuario.buscaLider(req.body.id_usuario);
        console.log(req.body.id_usuario);

        if(!(buscaLider.length < 1)){
            res.status(400).json({code: 400});
            return;
        }

        const eliminaT = await model.Usuario.eliminaTrabaja(req.body.id_usuario);
        const eliminaU = await model.Usuario.eliminaUsuario(req.body.id_usuario);

        console.log(eliminaT);
        console.log(eliminaU);

        res.status(201).json({code: 201});
        return;
    }catch(error){
        console.log(error);
        res.status(401).redirect("/usuario/mostrar_usuarios");
    }
}