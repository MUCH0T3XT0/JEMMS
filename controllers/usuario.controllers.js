const model = require("../models/usuario.models.js");
const bcrypt = require('bcryptjs');

module.exports.get_login = async(req,res) =>{
    res.render("login/login",{
        loggeado: false
    });
}

module.exports.post_login = async(req, res) =>{
    try {
        console.log("Entrando");
        const usuarios = await model.Usuario.buscaUsuario(req.body.correo)
        //console.log(usuarios);

        if(usuarios.length < 1){
            
            res.render("login/login",{
                registro: false
            });
            return;
        }

        const usuario = usuarios[0];
        
        //const doMatch = await bcrypt.compare(req.body.contrasena, usuario.contrasena);
        const doMatch = (req.body.contrasena == usuario.contrasena) ? true : false
       
        

        if(!doMatch) {
            res.render("login/login",{
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

        console.log("todo bien");
        //res.render('home/home');
        
        res.redirect("/proyecto/home");
        

    }catch (error){
        console.log(error);
        res.render("login/login",{
            registro: false
        });
    }   
}

module.exports.cerrar_sesion = async(req,res) => {
    res.redirect("/usuario/login");
}

module.exports.get_agregar = async(req,res) =>{
    res.render("usuario/agregar",{
        usuario: false
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

        
        const usuario = new model.Usuario(correo, nombre, apellido_m, apellido_p, contrasena, rol);

        console.log(usuario);

        const usuarionuevo = await usuario.guardar_usuario();

        res.status(201).redirect("/usuario/mostrar_usuarios");

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error registando usuario" }); // Idealmente se crea una plantilla de errores genérica
    }
}

module.exports.get_editar_usuario = async(req,res) =>{
    try {
        const usuario = await model.Usuario.buscaUsuario("a01268758@tec.mx");
        if(usuario.length < 1){
            res.redirect("/usuario/agregar_usuario");
            return;
        }

        console.log(usuario);

        res.render("usuario/editar",{
            usuario:usuario
        });
    }catch (error){
        res.redirect("/usuario/agregar_usuario");
    }
}

module.exports.post_editar_usuario = async(req, res) => {
    try {
        const nombre = req.body.nombre;
        const apellido_p = req.body.apellido_p;
        const apellido_m = req.body.apellido_m;
        const correo = req.body.correo;
        const contrasena = req.body.contrasena;
        const rol = req.body.acceso;
        
        const usuario = new model.Usuario(correo, nombre, apellido_m, apellido_p, contrasena, rol);
        console.log(usuario);
        const editado = await usuario.editar_usuario()
    
        res.status(201).redirect("/usuario/mostrar_usuarios");
    
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error editando usuario" }); // Idealmente se crea una plantilla de errores genérica
    }
}
