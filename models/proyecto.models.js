const db = require('../utils/database.js');
const bcrypt = require('bcryptjs');

exports.Proyecto = class {
    constructor(id, descripcion, nombre_proyecto, estatus){
        this.id = id;
        this.descripcion = descripcion;
        this.nombre_proyecto = nombre_proyecto;
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
}