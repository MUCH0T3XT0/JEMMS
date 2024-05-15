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