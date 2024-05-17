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
        const riesgosP = await model.Riesgo.extraerRiesgosP(1);//Aqui va el id del proyecto, pero se usara el id 1 para que quede funcional

        console.log(riesgosP);
        res.render("mostrar_riesgos/mostrar_riesgos", {riesgoP:riesgosP});
    }catch(error){
        console.log(error);
        res.render("mostrar_riesgos/mostrar_riesgos");
    }
}
module.exports.get_editar_riesgo = async(req,res) =>{
    try{
        console.log("Recuperando riesgos de la base de datos")
        const riesgoSeleccionado = await model.Riesgo.seleccionarRiesgo(1, 1);//Aqui debe ir el id del riesgo y del proyecto seleccionado
        res.render("editar_riesgo/editar_riesgo", {riesgoSelec:riesgoSeleccionado});
    }catch(error){
        console.log(error);
        res.render("editar_riesgo/editar_riesgo");
    }
}
module.exports.post_nuevo_riesgo = async(req,res) =>{
    try{
        console.log("Agregando un riesgo(Riesgo especifico)");
        const riesgo = await model.Riesgo.agregarRiesgos(1, req.body.categoria, req.body.impacto, req.body.probabilidad, req.body.estrategia, req.body.descripcion); //En el primer parametro va el numero de proyecto. Esta parte debe ser modificada por el id del proyecto donde se esta actualmente
        const proyectos = await model.Proyecto.extraeProyectos();
        /*Aqui debe mandarte a la pagina de menu proyectos al agregar un proyecto exitosamente, como esta debajo
        res.render("menu_proyecto/menu_proyecto",{
            riesgo: riesgos
        });
        */
        //Como aun no tengo dicha interfaz(debido a que de eso se encarga Mari) dejo lo de abajo
        console.log(riesgo);
        res.status(201).redirect("/proyecto/nuevo_riesgo");
    }catch(error){
        console.log(error);
        res.render("nuevo_riesgo/nuevo_riesgo", {msj: error});
    }
}
module.exports.post_mostrar_riesgos = async(req,res) =>{
    try{
        const riesgosP = await model.Riesgo.seleccionarRiesgo(1, 1);
        //Aqui re redirije a la pagina de editar riesgo
        //res.render("mostrar_riesgos/mostrar_riesgos", {riesgo: riesgosP})
        res.status(201).redirect("/proyecto/editar_riesgo");
    }catch(error){
        console.log(error);
        res.render("mostrar_riesgos/mostrar_riesgos", {msj: error});
    }
}
module.exports.post_editar_riesgo = async(req,res) =>{
    try{
        console.log("Agregando un riesgo(Riesgo especifico)");
        const riesgoModificado = await model.Riesgo.editarRiesgo(1, req.body.categoria, req.body.impacto, req.body.probabilidad, req.body.estrategia, req.body.descripcion, req.body.id); //En el primer parametro va el numero de proyecto. Esta parte debe ser modificada por el id del proyecto donde se esta actualmente
        console.log("Se añade el riesgo");
        console.log(riesgoModificado);
        
        res.status(201).redirect("/proyecto/mostrar_riesgos");
    }catch(error){
        console.log(error);
        res.render("mostrar_riesgos/mostrar_riesgos", {msj: error});
    }
}
/*
// Lo de aqui abajo es un intento de usar Ajax con el boton de crear riesgos
module.exports.post_nuevo_riesgo1 = async(req,res) => {
    console.log(req.body)
    if(!req.body.estrategia_m){
        return res.status(422).json({code:422, msg:'Estrategia faltante'});
    }
    if(!req.body.id_proyecto){
        return res.status(422).json({code:422, msg:'Proyecto faltante'});
    }
    if(!req.body.categoria){
        return res.status(422).json({code:422, msg:'Categoria faltante'});
    }
    if(!req.body.impacto){
        return res.status(422).json({code:422, msg:'Impacto faltante'});
    }
    if(!req.body.probabilidad){
        return res.status(422).json({code:422, msg:'Probabilidad faltante'});
    }
    if(!req.body.descripcion){
        return res.status(422).json({code:422, msg:'Descripcion'});
    }

    var newRiesgo = {
        proyecto: req.body.id_proyecto,
        descripcion: req.body.descripcion,
        estrategia: req.body.estrategia_m
    };

    console.log('Nuevo riesgo:', newRiesgo);
    await model.Riesgo.agregarRiesgos(1, req.body.categoria, req.body.impacto, req.body.probabilidad, req.body.estrategia, req.body.descripcion);
    return res.status(201).json({code:201, msg:'Riesgo creado exitosamente a la base de datos!'});
}
*/