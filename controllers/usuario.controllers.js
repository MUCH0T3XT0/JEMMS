const model = require("../models/usuario.models.js");
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

//Se muestra la información de los usuarios 
module.exports.get_mostrar_usuarios = async(req,res) =>{
    try{
        console.log("Recuperando información de los usuarios");
        const lideres = await model.Usuario.getLideres();
        const colaboradores = await model.Usuario.getColaboradores();

        res.status(200).render("mostrar_usuarios/mostrar_usuarios",{
            code: 200,
            msg: "Ok",
            usuario1: lideres,
            usuario2: colaboradores //La variable usuario se ocupa en el html dinamico y lo de usuarios es el resultado de la consulta hecha

        });
    }catch(error){
        console.log(error);
        res.status(500).render("mostrar_usuarios/mostrar_usuarios",{
            code: 500,
            msg:"Error base de datos"
        });
    }
    
}

module.exports.cerrar_sesion = async(req,res) => {
    req.session.estatusLogeado = false;

    res.redirect("login");
}

module.exports.get_agregar_usuario = async(req,res) =>{
    res.status(200).render("agregar_usuario/agregar_usuario",{
        code:200,
        msg: "Ok"
    });
}

module.exports.post_agregar_usuario = async(req, res) => {
    try {
        const nombre = req.body.nombre;
        const apellido_p = req.body.apellido_p;
        const apellido_m = req.body.apellido_m;
        const correo = req.body.correo;
        const contrasena = req.body.contrasena;
        const rol = req.body.acceso;

        
        const usuario = new model.Usuario(null, correo, nombre, apellido_m, apellido_p, contrasena, rol);

        const verificacion = await model.Usuario.buscaUsuario(correo);

        if(verificacion < 1){
            console.log(usuario);

            const usuarionuevo = await usuario.guardar_usuario();

            res.status(201).redirect("/usuario/mostrar_usuarios");
        }else{
            res.status(400).redirect("/usuario/mostrar_usuarios");
        }

        

    } catch (error) {
        console.error(error);
        res.status(500).redirect("/usuario/mostrar_usuarios",{
            code: 500,
            message: "Error registando usuario"
        }); // Idealmente se crea una plantilla de errores genérica
    }
}

module.exports.get_editar_usuario = async(req,res) =>{
    try {
        //Busca el usuario en la BD
        const usuario = await model.Usuario.buscaUsuarioPorId(req.params.id);

        //Verifica la que exista el Usuario de la BD, si es menor a 1 significa que es un array vacio
        if(usuario.length < 1){
            res.redirect("/usuario/mostrar_usuarios");
            return;
        }

        //Se lleva a la pagina para editar info del usuario seleccionado
        res.status(200).render("editar_usuario/editar_usuario",{
            code: 200,
            msg: "Ok",
            usuario:usuario
        });
    }catch (error){
        res.redirect("/agregar_usuario/agregar_usuario");
    }
}

module.exports.post_editar_usuario = async(req, res) => {
    try {
        //Se guarda la info del body en constantes
        const id = req.params.id;
        const nombre = req.body.nombre;
        const apellido_p = req.body.apellido_p;
        const apellido_m = req.body.apellido_m;
        const correo = req.body.correo;
        const contrasena = req.body.contrasena;
        const rol = req.body.acceso;
        
        //Se crea el constructor
        const usuario = new model.Usuario(id, correo, nombre, apellido_m, apellido_p, contrasena, rol);
        //console.log(usuario);
        
        //Se edita el usuario en la BD
        const editado = await usuario.editar_usuario()
    
        res.redirect("/usuario/mostrar_usuarios");
    
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error editando usuario" }); // Idealmente se crea una plantilla de errores genérica
    }
}