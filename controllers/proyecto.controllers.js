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

module.exports.get_info_proyecto = async(req,res) => {
    try {
        console.log("Mostrar proyecto");
        const proyectos = await model.Proyecto.ver_proyecto();

        if(proyectos.length < 1){
            
            res.render("info_proyecto/info_proyecto",{
                error: true
            });
            return;
        }

        res.render("info_proyecto/info_proyecto",{
            proyecto: proyectos,
            error: false
        });

    } catch(error){
        console.log(error);
        res.render("info_proyecto/info_proyecto",{
            error: true
        });
    }
}

module.exports.get_editar_proyecto = async(req,res) => {
    try {
        console.log("Get crear proyecto");
        const proyectos = await model.Proyecto.ver_proyecto();

        if(proyectos.length < 1){
            
            res.render("editar_proyecto/editar_proyecto",{
                error: true
            });
            return;
        }

        res.render("editar_proyecto/editar_proyecto",{
            proyecto: proyectos,
            error: false
        });

    } catch(error){
        console.log(error);
        res.render("editar_proyecto/editar_proyecto",{
            error: true
        });
    }
}

module.exports.post_editar_proyecto = async(req, res)=>{
    try{
        console.log("post crear ");
        
        const nombre_proyecto = req.body.nombre_proyecto;
        const empresa = req.body.empresa;
        const f_creacion = req.body.f_creacion;
        const f_fin = req.body.f_fin;
        const encargado = req.body.encargado;
        const presupuesto = req.body.presupuesto;
        const descripcion = req.body.descripcion;

        const proyecto_editado = new model.Proyecto(null, null, descripcion, empresa, nombre_proyecto, presupuesto, f_creacion, f_fin, encargado, null, null);
        console.log(proyecto_editado);
        const editado = await proyecto_editado.editar_proyecto();

        res.redirect("editar_proyecto");
    }catch(error){
        console.log(error);
        res.render("editar_proyecto/editar_proyecto",{
            error: true
        })
    }
}

module.exports.get_info_proyecto = async(req,res) => {
    try {
        console.log("Mostrar proyecto");
        const proyectos = await model.Proyecto.ver_proyecto();

        if(proyectos.length < 1){
            
            res.render("info_proyecto/info_proyecto",{
                error: true
            });
            return;
        }

        res.render("info_proyecto/info_proyecto",{
            proyecto: proyectos,
            error: false
        });

    } catch(error){
        console.log(error);
        res.render("info_proyecto/info_proyecto",{
            error: true
        });
    }
}

module.exports.get_editar_proyecto = async(req,res) => {
    try {
        console.log("Get crear proyecto");
        const proyectos = await model.Proyecto.ver_proyecto();

        if(proyectos.length < 1){
            
            res.render("editar_proyecto/editar_proyecto",{
                error: true
            });
            return;
        }

        res.render("editar_proyecto/editar_proyecto",{
            proyecto: proyectos,
            error: false
        });

    } catch(error){
        console.log(error);
        res.render("editar_proyecto/editar_proyecto",{
            error: true
        });
    }
}
