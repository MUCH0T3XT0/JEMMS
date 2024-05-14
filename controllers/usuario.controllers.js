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
        const usuarios = await model.User.buscaUsuario(req.body.correo)
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
        const permiso = await model.User.getPermisos(usuario.username);
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
        
        res.render("home/home");
        

    }catch (error){
        console.log(error);
        res.render("login/login",{
            registro: false
        });
    }        
}