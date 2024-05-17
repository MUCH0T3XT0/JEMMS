const model = require("../models/usuario.models.js");
const bcrypt = require('bcryptjs');

module.exports.get_login = async(req,res) =>{
    res.render("login/login",{
        registro: true
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

//Se muestra la información de los usuarios 
module.exports.get_mostrar_usuarios = async(req,res) =>{
    try{
        console.log("Recuperando información de los usuarios");
        const lideres = await model.Usuario.getLideres();
        const colaboradores = await model.Usuario.getColaboradores();

        res.render("vista_usuarios/vista_usuarios",{
            usuario1: lideres,
            usuario2: colaboradores //La variable usuario se ocupa en el html dinamico y lo de usuarios es el resultado de la consulta hecha

        });
    }catch(error){
        console.log(error);
        res.render("vista_usuarios/vista_usuarios");
    }
    
}