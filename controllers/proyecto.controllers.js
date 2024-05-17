const model = require("../models/proyecto.models.js");

module.exports.get_home = async(req,res) =>{
    try{
        console.log("Recuperando proyectos");
        const proyectos = await model.Proyecto.extraeProyectos();

        if(proyectos.length < 1){
            
            res.render("home/home",{
                error: true
            });
            return;
        }

        res.render("home/home",{
            proyecto: proyectos,
            error: false
        });
        
    }catch(error){
        console.log(error);
        res.render("home/home",{
            error: true
        });
    }
    
}

module.exports.get_nuevo_proyecto = async(req,res) =>{
    res.render("nuevo_proyecto/nuevo_proyecto");
}

module.exports.get_proyecto = async(req,res) =>{
    try{
        var id = req.params.id;
        console.log("Recuperando proyectos");
        const numRiesgo= await model.Proyecto.cantidadRiesgo(id);
        const infoGeneral= await model.Proyecto.informacionRestante(id);
        const infoNum= await model.Proyecto.informacionNumerica(id);

        console.log(infoGeneral[0].duracion);
        res.render("menu_proyecto/menu_proyecto",{
            proyectoRiesgo: numRiesgo,
            proyectoGeneral: infoGeneral,
            proyectoNum: infoNum
        });
    }catch(error){
        console.log(error);
        res.render("menu_proyecto/menu_proyecto");
    }
    
}