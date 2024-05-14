const model = require("../models/proyecto.models.js");

module.exports.get_home = async(req,res) =>{
    try{
        console.log("Recuperando proyectos");
        const proyectos = await model.Proyecto.extraeProyectos();

        res.render("home/home",{
            proyecto: proyectos
        });
    }catch(error){
        console.log(error);
        res.render("home/home");
    }
    
}