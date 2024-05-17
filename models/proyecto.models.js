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

    static async ver_proyecto(id_proyecto){
        try{
            const connexion = await db();
            
            const resultado = await connexion.execute('Select descripcion, empresa, nombre_proyecto, presupuesto, DATE_FORMAT(f_creacion, \'%Y-%m-%d\') AS fecha_creacion, DATE_FORMAT(f_fin, \'%Y-%m-%d\') AS fecha_fin, encargado, departamento from PROYECTO WHERE id_proyecto = 1', [id_proyecto]);
            //console.log(resultado);

            await connexion.release();
            return resultado;
        }catch(error){
            throw error;
        }
    }

    async editar_proyecto(){
        try{
            const connexion = await db();
            const resultado = await connexion.execute(
                'Update proyecto set empresa = ?, nombre_proyecto = ?, f_creacion = ?, f_fin = ?, encargado = ?, presupuesto = ?, descripcion = ? Where id_proyecto = 1', 
                [this.empresa, this.nombre_proyecto, this.f_creacion, this.f_fin, this.encargado, this.presupuesto, this.descripcion]);
            await connexion.release();
            return;
        }catch(error){
            console.log("error");
            throw error;
            
        }
    }

}