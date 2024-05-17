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

module.exports.get_nuevo_riesgo = async(req,res) =>{
    try{
        console.log("Recuperando riesgos de la base de datos")
        const riesgosG = await model.Riesgo.extraerRiesgosG();

        console.log(riesgosG);
        res.render("nuevo_riesgo/nuevo_riesgo", {riesgo:riesgosG});
    }catch(error){
        console.log(error);
        res.render("nuevo_riesgo/nuevo_riesgo");
    }
}
module.exports.get_mostrar_riesgos = async(req,res) =>{
    try{
        console.log("Recuperando riesgos de la base de datos")
        const riesgosG = await model.Riesgo.extraerRiesgosG();

        console.log(riesgosG);
        res.render("mostrar_riesgos/mostrar_riesgos", {riesgo:riesgosG});
    }catch(error){
        console.log(error);
        res.render("mostrar_riesgos/mostrar_riesgos");
    }
}

module.exports.get_editar_riesgo = async(req,res) =>{
    try{
        console.log("Recuperando riesgos de la base de datos")
        const riesgosG = await model.Riesgo.extraerRiesgosG();

        console.log(riesgosG);
        res.render("editar_riesgo/editar_riesgo", {riesgo:riesgosG});
    }catch(error){
        console.log(error);
        res.render("editar_riesgo/editar_riesgo");
    }
}

module.exports.post_nuevo_riesgo = async(req,res) =>{
    try{
        console.log("Agregando un riesgo(Riesgo especifico)");
        
        const riesgoP = await model.Riesgo.agregarRiesgos(1, req.body.categoria, req.body.impacto, req.body.probabilidad, req.body.estrategia, req.body.descripcion); //En el primer parametro va el numero de proyecto. Esta parte debe ser modificada por el id del proyecto donde se esta actualmente
        const proyectos = await model.Proyecto.extraeProyectos();
        /*Aqui debe mandarte a la pagina de menu proyectos al agregar un proyecto exitosamente, como esta debajo
        res.render("menu_proyecto/menu_proyecto",{
            riesgo: riesgos
        });
        */
        //Como aun no tengo dicha interfaz(debido a que de eso se encarga Mari) dejo lo de abajo
        console.log(riesgoP);
        res.status(201).redirect("/proyecto/nuevo_riesgo");
    }catch(error){
        console.log(error);
        res.render("nuevo_riesgo/nuevo_riesgo", {msj: error});
    }
}

module.exports.post_mostrar_riesgos = async(req,res) =>{
    try{
        const riesgosP = await model.Riesgo.agregarRiesgos(1, req.body.categoria, req.body.impacto, req.body.probabilidad, req.body.estrategia, req.body.descripcion);
        //Aqui re redirije a la pagina de editar riesgo
        res.status(201).redirect("/proyecto/editar_riesgo", {riesgo: riesgosP});
    }catch(error){
        console.log(error);
        res.render("mostrar_riesgos/mostrar_riesgos", {msj: error});
    }
}
module.exports.post_editar_riesgo = async(req,res) =>{
    try{
        console.log("Agregando un riesgo(Riesgo especifico)");
        const riesgoP = await model.Riesgo.editarRiesgo(1, req.body.categoria, req.body.impacto, req.body.probabilidad, req.body.estrategia, req.body.descripcion); //En el primer parametro va el numero de proyecto. Esta parte debe ser modificada por el id del proyecto donde se esta actualmente
        console.log("Riesgo editado correctamente")
        res.status(201).redirect("/proyecto/mostrar_riesgos");
    }catch(error){
        console.log(error);
        res.render("mostrar_riesgos/mostrar_riesgos", {msj: error});
    }
}
