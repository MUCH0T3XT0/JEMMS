const consulta = require('../models/proyecto.models');

module.exports = async (req, res, next) => {
    const lider = await consulta.Proyecto.idLider(req.params.id_proyecto);

    if(lider.length < 1){//En caso de que se solicite un proyecto que no exista
        return res.redirect('/proyecto/home');
    }else if((lider[0].id_lider != req.session.idUsuario) && (req.session.rol == 0)){//Revisa el rol de admin o el lider del usuario
        return res.redirect('/proyecto/home');
    }

    next();
}