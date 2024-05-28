const model = require("../models/proyecto.models.js");

module.exports.get_home = async(req,res) =>{
    try{
        console.log("Recuperando proyectos");
        const proyectos = await model.Proyecto.extraeProyectos();

        if(proyectos.length < 1){
            
            res.status(400).render("home/home",{
                error: true
            });
            return;
        }

        res.status(201).render("home/home",{
            proyecto: proyectos,
            error: false
        });
        
    }catch(error){
        console.log(error);
        res.status(400).render("home/home",{
            error: true
        });
    }
    
}

module.exports.get_nuevo_proyecto = async(req,res) =>{
    try{
        console.log("Recuperando riesgos de la base de datos")
        const riesgosG = await model.Riesgo.extraerRiesgosG();

        console.log(riesgosG);
        res.status(201).render("nuevo_proyecto/nuevo_proyecto",{
            error:false,
            riesgo: riesgosG
        });
    }catch(error){
        console.log(error);
        res.status(400).render("nuevo_proyecto/nuevo_proyecto",{
            error: true
        });
    }
    
}

module.exports.get_proyecto = async(req,res) =>{
    try{
        var id = req.params.id;
        console.log("Recuperando proyectos");
        const numRiesgo= await model.Proyecto.cantidadRiesgo(id);
        const infoGeneral= await model.Proyecto.informacionRestante(id);
        const infoNum= await model.Proyecto.informacionNumerica(id);


        res.status(200).render("menu_proyecto/menu_proyecto",{
            code: 200,
            msg: "Ok",
            proyectoRiesgo: numRiesgo,
            proyectoGeneral: infoGeneral,
            proyectoNum: infoNum,
            id_proyecto: id
        });

    }catch(error){
        console.log(error);
        res.status(500).redirect("menu_proyecto/menu_proyecto",{
            code: 500,
            msg: "No se encontró información del proyecto",
        });
    }
}

module.exports.get_info_proyecto = async(req,res) => {
    try {
        const id = req.params.id;

        const proyectos = await model.Proyecto.ver_proyecto(id);

        if(proyectos.length < 1){
            
            res.status(400).render("info_proyecto/info_proyecto",{
                error: true
            });
            return;
        }

        res.status(201).render("info_proyecto/info_proyecto",{
            proyecto: proyectos,
            error: false,
            id_proyecto: id
        });

    } catch(error){
        console.log(error);
        res.status(400).render("info_proyecto/info_proyecto",{
            error: true
        });
    }
}

module.exports.get_editar_proyecto = async(req,res) => {
    try {
        //console.log("Get editar proyecto");
        const id = req.params.id;
        //console.log(id);

        const proyectos = await model.Proyecto.ver_proyecto(id);

        if(proyectos.length < 1){
            res.status(400).render("editar_proyecto/editar_proyecto",{
                error: true
            });
            return;
        }

        res.status(201).render("editar_proyecto/editar_proyecto",{
            proyecto: proyectos,
            error: false,
            id_proyecto: id
        });

    } catch(error){
        console.log(error);
        res.status(400).render("editar_proyecto/editar_proyecto",{
            error: true
        });
    }
}

module.exports.post_editar_proyecto = async(req, res)=>{
    try{
        //console.log("post crear ");
        const id = req.params.id;

        const nombre_proyecto = req.body.nombre_proyecto;
        const empresa = req.body.empresa;
        const f_creacion = req.body.f_creacion;
        const f_fin = req.body.f_fin;
        const encargado = req.body.encargado;
        const presupuesto = req.body.presupuesto;
        const descripcion = req.body.descripcion;

        const proyecto_editado = new model.Proyecto(null, null, descripcion, empresa, nombre_proyecto, presupuesto, f_creacion, f_fin, encargado, null, null);
        //console.log(proyecto_editado);
        
        const editado = await proyecto_editado.editar_proyecto(id);

        res.status(201).redirect("editar_proyecto");
    }catch(error){
        console.log(error);
        res.status(401).redirect("editar_proyecto",{
            error: true
        })
    }
}

module.exports.get_nuevo_riesgo = async(req,res) =>{
    try{
        console.log("Recuperando riesgos de la base de datos")

        //Extrae todos los riesgos existentes en la BD
        const riesgosG = await model.Riesgo.extraerRiesgosG();

        //console.log(riesgosG);

        //Renderiza la pagina con los riesgos obtenidos
        res.status(200).render("nuevo_riesgo/nuevo_riesgo", {
            code: 200,
            msg: "Ok",
            riesgo:riesgosG
        });
    }catch(error){
        console.log(error);
        res.status(500).render("nuevo_riesgo/nuevo_riesgo",{
            code:500,
            msg: "Error en la BD",
            riesgo: []
        });
    }
}

module.exports.post_nuevo_riesgo = async(req,res) =>{
    try{
        console.log("Agregando un riesgo(Riesgo especifico)");

        //En el primer parametro va el numero de proyecto. Esta parte debe ser modificada por el id del proyecto donde se esta actualmente
        const riesgoP = await model.Riesgo.agregarRiesgos(1, req.body.categoria, req.body.impacto, req.body.probabilidad, req.body.estrategia, req.body.descripcion);
        
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

module.exports.get_mostrar_riesgos = async(req,res) =>{
    try{
        console.log("Recuperando riesgos de la base de datos")
        const id_proyecto = req.params.id;
        const riesgosG = await model.Riesgo.extraerRiesgosPorProyecto(id_proyecto);

        const alcance = await model.Riesgo.cuentaRiesgo(id_proyecto, 1);
        const tiempo = await model.Riesgo.cuentaRiesgo(id_proyecto, 2);
        const calidad = await model.Riesgo.cuentaRiesgo(id_proyecto, 3);
        const costo = await model.Riesgo.cuentaRiesgo(id_proyecto, 4);
        const recursos = await model.Riesgo.cuentaRiesgo(id_proyecto, 5);

       
        const total = alcance[0].suma + tiempo[0].suma + calidad[0].suma + costo[0].suma + recursos[0].suma;
        
        //console.log(total);
        //console.log(riesgosG);
        res.status(200).render("mostrar_riesgos/mostrar_riesgos", {
            code:200,
            msg: "Ok",
            riesgo:riesgosG,
            alcance: alcance,
            tiempo:tiempo,
            calidad:calidad,
            costo:costo,
            recursos:recursos,
            total: Number(total),
            id_proyecto: id_proyecto
        });

    }catch(error){
        console.log(error);
        res.status(200).render("mostrar_riesgos/mostrar_riesgos",{
            code: 200,
            msg: "No se encontro ningun riesgo"
        });
    }
}

module.exports.get_mostrar_tabla_riesgos = async(req, res) => {
    try{
        console.log("Recuperando información de riesgos");
        const id_proyecto = req.params.id;
        const riesgos = await model.Riesgo.extraerRiesgosPorProyecto(id_proyecto);      
        
        res.status(200).json({
            riesgo: riesgos 
        });
    }catch(error){
        console.log(error);
        res.status(400).json({
            riesgo: []
        });

    }
}

module.exports.get_editar_riesgo = async(req,res) =>{
    try{
        console.log("get_editar_riesgo Recuperando riesgos de la base de datos")

        const id_riesgo = req.params.id_riesgo;
        
        console.log(id_riesgo);
        const riesgosG = await model.Riesgo.extraerRiesgosPorId(id_riesgo);

        console.log(riesgosG);

        res.status(200).render("editar_riesgo/editar_riesgo", {
            code: 200,
            msg: "Ok",
            id_riesgo: id_riesgo,
            id_proyecto: req.params.id_proyecto,
            riesgoSelec:riesgosG
        });
    }catch(error){
        console.log(error);
        res.status(400).redirect("home",{
            code: 400,
            msg: "Riesgo no encontrado"
        });
    }
}

module.exports.post_editar_riesgo = async(req,res) =>{
    try{
        console.log("Agregando un riesgo(Riesgo especifico)");
        console.log(req.params.id)
        const riesgoModificado = await model.Riesgo.editarRiesgo(req.body.id, req.body.categoria, req.body.impacto, req.body.probabilidad, req.body.estrategia, req.body.descripcion); 
        console.log("Se añade el riesgo");
        
        
        res.status(201).redirect("/proyecto/"+req.params.id_proyecto+"/mostrar_riesgos");
    }catch(error){
        console.log(error);
        res.status(500).render("mostrar_riesgos/mostrar_riesgos", {
            code: 500,
            msj: "Error en la BD"
        });
    }
}

module.exports.post_nuevo_proyecto = async(req,res)=>{
    try{
        console.log("Agregando un proyecto");
        const nuevoP = new  model.Proyecto(null, 1, req.body.descripcion, req.body.empresa, req.body.nombre_proyecto, req.body.presupuesto, req.body.f_creacion, req.body.f_fin, req.body.encargado, req.body.departamento, 1);
        console.log(nuevoP);

        const resultado = nuevoP.nuevoProyecto();
        res.redirect('home');
    }catch(error){
        console.log(error);
        res.render('nuevo_proyecto/nuevo_proyecto');
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

