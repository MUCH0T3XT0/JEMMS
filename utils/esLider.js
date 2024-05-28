const consulta = require('../models/proyecto.models');

module.exports = async (req, res, next) => {
    const lider = await consulta.Proyecto.idLider(req.params.id_proyecto);

    if((lider[0].id_lider != req.session.idUsuario) && (req.session.rol == 0)){
        return res.redirect('/proyecto/home');
    }

    next();
}