const db = require('../utils/database.js');
const bcrypt = require('bcryptjs');

exports.Proyecto = class {
    constructor(id, id_manager, descripcion, empresa, nombre_proyecto, presupuesto, f_creacion, f_fin, encargado, departamento){
        this.id = id;
        this.id_manager = id_manager;
        this.descripcion = descripcion;
        this.empresa = empresa;
        this.nombre_proyecto = nombre_proyecto;
        this.presupuesto = presupuesto;
        this.f_creacion = f_creacion;
        this.f_fin = f_fin;
        this.encargado = encargado;
        this.departamento = departamento;
    }

    static async extraeProyectos(){
        try{
            const connexion = await db();
            const resultado = await connexion.execute('Select * from PROYECTO');
            console.log(resultado);

            await connexion.release();
            return resultado;
        }catch(error){
            throw error;
        }
    }
}
//Objeto que guarda los datos de los riesgos
exports.Riesgo = class {
    constructor(id, id_proyecto, categoria, impacto, probabilidad, estrategia_m, descripcion){
        this.id = id; //Esto se borra debido a que es autoincremental
        this.id_proyecto = id_proyecto;
        this.categoria = categoria;
        this.impacto = impacto;
        this.probabilidad = probabilidad;
        this.estrategia_m = estrategia_m;
        this.descripcion = descripcion;
    }
    
    //Funcion para extraer los riesgos que se encuentran registrados en la base de datos.
    static async extraerRiesgosG(){
        try{
            const connexion = await db();
            const resultado = await connexion.execute('Select * from RIESGO');
            console.log(resultado);

            await connexion.release();
            return resultado;
        }catch(error){
            throw error;
        }
    }
    //Funcion para extraer los riesgos del proyecto en el que se esta.
    static async extraerRiesgosP(id_proyec){
        try{
            const connexion = await db();
            const resultado = await connexion.execute('Select * from PROYECTO NATURAL JOIN RIESGO WHERE ? = RIESGO.id_proyecto', [id_proyec]);
            console.log(resultado);

            await connexion.release();
            return resultado;
        }catch(error){
            throw error;
        }
    }
    static async editarRiesgo(proyecto, categoria, impacto, probabilidad, estrategia, descripcion, id_riesgo, id_proyecto){
        try{
            const connexion = await db();
            const resultado = await connexion.execute('UPDATE riesgo set id_proyecto= ?, categoria= ?, impacto=?, probabilidad= ?, estrategia_m= ? , descripcion = ? where id_riesgo= ? and id_proyecto= ?', [proyecto, categoria, impacto, probabilidad, estrategia, descripcion, 1, 1]);
            console.log(resultado);

            await connexion.release();
            return resultado;
        }catch(error){
            throw error;
        }
    }
    
    static async agregarRiesgos(proyecto, categoria, impacto, probabilidad, estrategia, descripcion){
        try{
            const connexion = await db();
            const resultado = await connexion.execute("INSERT INTO riesgo (id_proyecto, categoria, impacto, probabilidad, estrategia_m, descripcion) VALUES(?, ?, ?, ?, ?, ?);", [proyecto, categoria, impacto, probabilidad, estrategia, descripcion]);
            console.log(resultado);

            await connexion.release();
            return resultado;
        }catch(error){
            throw error;
        }
    }
}