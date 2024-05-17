const db = require('../utils/database.js');
const bcrypt = require('bcryptjs');

exports.Proyecto = class {
    constructor(id, id_manager, descripcion, empresa, nombre_proyecto, presupuesto, f_creacion, f_fin, encargado, departamento, estatus){
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
        this.estatus = estatus;
    }

    static async extraeProyectos(){
        try{
            const connexion = await db();
            const resultado = await connexion.execute('Select id_proyecto, descripcion, nombre_proyecto, estatus from PROYECTO');
            console.log(resultado);

            await connexion.release();
            return resultado;
        }catch(error){
            throw error;
        }
    }

    static async cantidadRiesgo(idProyecto){
        try{
            console.log("ID: ");
            console.log(idProyecto);
            const connexion = await db();
            const resultado = await connexion.execute('SELECT COUNT(id_proyecto) AS cuenta FROM RIESGO WHERE id_proyecto= ?;', [idProyecto]);
            console.log(resultado);

            await connexion.release();
            return resultado;
        }catch(error){
            throw error;
        }
    }

    static async informacionRestante(idProyecto){
        try{
            const connexion = await db();
            const resultado = await connexion.execute('SELECT (DATEDIFF(PROYECTO.f_fin, PROYECTO.f_creacion) - DATEDIFF(CURRENT_DATE, PROYECTO.f_creacion)) AS duracion, estatus, DATEDIFF(PROYECTO.f_fin, PROYECTO.f_creacion) AS diasTotales FROM PROYECTO WHERE id_proyecto = ? ', [idProyecto]);
            console.log(resultado);

            await connexion.release();
            return resultado;
        }catch(error){
            throw error;
        }
    }

    static async informacionNumerica(idProyecto){
        try{
            const connexion = await db();
            const resultado = await connexion.execute('SELECT SUM(impacto) AS total FROM RIESGO WHERE id_proyecto= ?', [idProyecto]);
            console.log(resultado);

            await connexion.release();
            return resultado;
        }catch(error){
            throw error;
        }
    }

}