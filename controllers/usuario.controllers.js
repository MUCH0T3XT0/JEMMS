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
        //console.log(usuarios);

        if(usuarios.length < 1){
            
            res.status(404).render("login/login",{
                registro: false
            });
            return;
        }

        const usuario = usuarios[0];
        
        const doMatch = await bcrypt.compare(req.body.contrasena, usuario.contrasena);
        //const doMatch = (req.body.contrasena == usuario.contrasena) ? true : false
       
        

        if(!doMatch) {
            res.status(400).render("login/login",{
                registro: false
            });
            return;
        }

        
/*        // Se agrega método para obtener el permiso del usuario
        const permiso = await model.Usuario.getPermisos(usuario.username);
        if (permiso.length == 0) {
            req.session.error = "Usuario y/o contraseña incorrectos";
            res.render("usuario/login", {
                registro: false
            });
            return;
        }*/


        //req.session.nombre = usuario.nombre;
        //req.session.permisos = permiso;
        //req.session.isLoggedIn = true;

        res.status(200).redirect("/proyecto/home");
        

    }catch (error){
        console.log(error);
        res.render("login/login",{
            registro: false
        });
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
    res.status(200).redirect("/usuario/login");
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
        const rol = req.body.acceso;

        if(nombre == ''||apellido_p == ''||correo == ''|| contrasena == ''){
            res.status(400).redirect("/usuario/agregar_usuario?valido=false");
            return;
        }

        const correovalido = /(\w|\.)+@appix\.mx/;
        if(!correovalido.test(correo)){
            res.status(403).redirect("/usuario/agregar_usuario?correov=false");
            return;
        }

        if(!nombrevalido.test(nombre)||!nombrevalido.test(apellido_p)){
            res.status(403).redirect("/usuario/agregar_usuario?nombre=false");
            return;
        }

        if(apellido_m && !nombrevalido.test(apellido_m)){
            res.status(403).redirect("/usuario/agregar_usuario?nombre=false");
            return;
        }

        const usuario = new model.Usuario(null, correo, nombre, apellido_m, apellido_p, contrasena, rol);

        const verificacion = await model.Usuario.buscaUsuario(correo);

        if(verificacion < 1){
            console.log(usuario);

            const usuarionuevo = await usuario.guardar_usuario();

            res.status(201).redirect("/usuario/mostrar_usuarios?code=201&msg=Ok");
        }else{
            res.redirect("/usuario/mostrar_usuarios",{
                code:403,
                msg: "Usuario ya existente"
            });
        }

        

    } catch (error) {
        console.error(error);
        res.status(500).redirect("/usuario/mostrar_usuarios?code:500&msg=Error+registando+usuario"); // Idealmente se crea una plantilla de errores genérica
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
        const nombrevalido = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/;
        const id = req.params.id;
        const nombre = req.body.nombre;
        const apellido_p = req.body.apellido_p;
        const apellido_m = req.body.apellido_m;
        const correo = req.body.correo;
        const contrasena = req.body.contrasena;
        const rol = req.body.acceso;
        
        if(nombre == ''||apellido_p == ''||correo == ''){
            res.status(400).redirect(`/usuario/${id}/editar_usuario?valido=false`);
            return;
        }

        if(!nombrevalido.test(nombre)||!nombrevalido.test(apellido_p)){
            res.status(403).redirect(`/usuario/${id}/editar_usuario?nombre=false`);
            return;
        }

        if(apellido_m && !nombrevalido.test(apellido_m)){
            res.status(403).redirect(`/usuario/${id}/editar_usuario?nombre=false`);
            return;
        }
        
        if(!contrasena == ''){
            //Se crea el constructor
            const usuario = new model.Usuario(id, correo, nombre, apellido_m, apellido_p, contrasena, rol);
            //Se edita el usuario en la BD
            const editado = await usuario.editar_usuario();
        }else{
            //Se crea el constructor
            const usuario = new model.Usuario(id, correo, nombre, apellido_m, apellido_p, contrasena, rol);
            //Se edita el usuario en la BD
            const editado = await usuario.editar_usuario_nocon();
        }
    
        res.redirect("/usuario/mostrar_usuarios");
    
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error editando usuario" }); // Idealmente se crea una plantilla de errores genérica
    }
}