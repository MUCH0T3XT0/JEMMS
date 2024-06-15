const db = require('../utils/database.js');
const bcrypt = require('bcryptjs');

exports.Proyecto = class {
    constructor(id, id_lider, descripcion, empresa, nombre_proyecto, presupuesto, f_creacion, f_fin, encargado, departamento, estatus){
        this.id = id;
        this.id_lider = id_lider;
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

    static async eliminaProyecto(id_proyecto){
        try{
            const connexion = await db();
            const resultado = await connexion.execute('DELETE FROM PROYECTO WHERE id_proyecto = ?', [id_proyecto]);

            await connexion.release();
            return resultado;
        }catch(error){
            throw error;
        }
    }

    static async eliminaRiesgoIdProyecto(id_proyecto){
        try{
            const connexion = await db();
            const resultado = await connexion.execute('DELETE FROM RIESGO WHERE id_proyecto = ?', [id_proyecto]);

            await connexion.release();
            return resultado;
        }catch(error){
            throw error;
        }
    }

    static async eliminaColaboradoresEnProyecto(id_proyecto){
        try{
            const connexion = await db();
            const resultado = await connexion.execute('DELETE FROM TRABAJAN WHERE id_proyecto = ?', [id_proyecto]);

            await connexion.release();
            return resultado;
        }catch(error){
            throw error;
        }
    }

    static async extraeProyectos(){
        try{
            const connexion = await db();
            const resultado = await connexion.execute('Select id_proyecto, descripcion, departamento, nombre_proyecto, estatus from PROYECTO ORDER BY f_creacion DESC');
            //console.log(resultado);

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
            const resultado = await connexion.execute('SELECT nombre_proyecto, (DATEDIFF(PROYECTO.f_fin, PROYECTO.f_creacion) - DATEDIFF(CURRENT_DATE, PROYECTO.f_creacion)) AS duracion, estatus, DATEDIFF(PROYECTO.f_fin, PROYECTO.f_creacion) AS diasTotales FROM PROYECTO WHERE id_proyecto = ? ', [idProyecto]);
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
    static async obtenerCantidadDeImpacto(estatus){
        try{
            const connexion = await db();
            const resultado = await connexion.execute('SELECT p.id_proyecto AS id_proyecto, IFNULL(SUM(r.impacto), 0) AS riesgo_total FROM proyecto p LEFT JOIN riesgo r ON p.id_proyecto = r.id_proyecto WHERE estatus = ? GROUP BY p.id_proyecto ORDER BY p.f_creacion DESC;', [estatus]);
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
            
            const resultado = await connexion.execute('Select descripcion, empresa, nombre_proyecto, presupuesto, DATE_FORMAT(f_creacion, \'%d/%m/%y\') AS fecha_creacion, DATE_FORMAT(f_fin, \'%d/%m/%y\') AS fecha_fin, encargado, departamento from PROYECTO WHERE id_proyecto = ?', [id_proyecto]);

            await connexion.release();
            return resultado;
        }catch(error){
            throw error;
        }
    }

    static async cambiarEstatus(id_proyecto){
        try{
            const connexion = await db();

            const resultado = await connexion.execute('UPDATE PROYECTO SET estatus = false WHERE id_proyecto = ?', [id_proyecto]);

            await connexion.release();
            return resultado;
        }catch(error){
            throw error;
        }
    }

    async editar_proyecto(id_proyecto){
        try{
            const connexion = await db();
            const resultado = await connexion.execute(
                'Update proyecto set empresa = ?, nombre_proyecto = ?, f_creacion = ?, f_fin = ?, encargado = ?, presupuesto = ?, descripcion = ? Where id_proyecto = ?', 
                [this.empresa, this.nombre_proyecto, this.f_creacion, this.f_fin, this.encargado, this.presupuesto, this.descripcion, id_proyecto]);
            await connexion.release();
            
            return resultado;
        }catch(error){
            console.log("error");
            throw error;
            
        }
    }

    async nuevoProyecto(){
        try{
            const connexion = await db();
            const resultado = connexion.execute('Insert into proyecto (id_lider, descripcion, empresa, nombre_proyecto, presupuesto, f_creacion, f_fin, encargado, departamento, estatus) Values ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [this.id_lider,
            this.descripcion,
            this.empresa,
            this.nombre_proyecto,
            this.presupuesto,
            this.f_creacion,
            this.f_fin,
            this.encargado,
            this.departamento,
            this.estatus
            ]);


            await connexion.release();
            return;
        }catch(error){
            console.log(error);
            throw error;
        }
    }

    static async obtenerDepartamentos(){
        try{
            const connexion = await db();

            const resultado = await connexion.execute('SELECT * FROM DEPARTAMENTO');
            
            await connexion.release();
            return resultado;
        }catch(error){
            throw error;
        }
    }
    static async ultimoProyecto(){
        try{
            const connexion = await db();

            const resultado = await connexion.execute('SELECT id_proyecto FROM proyecto ORDER BY id_proyecto DESC LIMIT 1;');
            
            await connexion.release();
            return resultado;
        }catch(error){
            throw error;
        }
    }
    static async idLider(id_proyecto){
        try{
            const connexion = await db();

            const resultado = await connexion.execute('SELECT id_lider FROM PROYECTO WHERE id_proyecto = ?', [id_proyecto]);

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

    static async cuentaRiesgo(idProyecto,categoria){
        try{
            const connexion = await db();
            const resultado = await connexion.execute('SELECT COUNT(r.categoria) AS suma FROM RIESGO r natural join PROYECTO p where r.id_proyecto = ? AND r.categoria = ?', [idProyecto, categoria]);
            //console.log(resultado);

            await connexion.release();
            return resultado;
        }catch(error){
            throw error;
        }
    }
    
    //Funcion para extraer los riesgos que se encuentran registrados en la base de datos.
    static async extraerRiesgosG(){
        try{
            const connexion = await db();
            const resultado = await connexion.execute('Select * from RIESGO');
            //console.log(resultado);

            await connexion.release();
            return resultado;
        }catch(error){
            throw error;
        }
    }
    //Funcion para extraer los riesgos del proyecto en el que se esta.
    static async extraerRiesgosPorProyecto(id_proyecto){
        try{
            const connexion = await db();
            const resultado = await connexion.execute('Select * from RIESGO WHERE RIESGO.id_proyecto = ?', [id_proyecto]);
            

            await connexion.release();
            return resultado;
        }catch(error){
            throw error;
        }
    }

    static async extraerRiesgosPorId(id_riesgo){
        try{
            const connexion = await db();
            const resultado = await connexion.execute('Select * from RIESGO WHERE RIESGO.id_riesgo = ?', [id_riesgo]);
            

            await connexion.release();
            return resultado;
        }catch(error){
            throw error;
        }
    }

    static async editarRiesgo(id_riesgo, categoria, impacto, probabilidad, estrategia, descripcion){
        try{
            const connexion = await db();
            console.log(id_riesgo);
            console.log(categoria);
            console.log(impacto);
            console.log(probabilidad);
            console.log(estrategia);
            console.log(descripcion);
            
            const resultado = await connexion.execute('UPDATE riesgo set categoria= ?, impacto=?, probabilidad= ?, estrategia_m= ? , description = ? where id_riesgo= ?', [categoria, impacto, probabilidad, estrategia, descripcion, id_riesgo]);
            console.log(resultado);


            await connexion.release();
            return;
        }catch(error){
            throw error;
        }
    }
    

    static async agregarRiesgos(proyecto, categoria, impacto, probabilidad, estrategia, descripcion){
        try{
            const connexion = await db();
            const resultado = await connexion.execute("INSERT INTO riesgo (id_proyecto, categoria, impacto, probabilidad, estrategia_m, description) VALUES(?, ?, ?, ?, ?, ?);", [proyecto, categoria, impacto, probabilidad, estrategia, descripcion]);
            console.log(resultado);

            await connexion.release();
            return resultado;
        }catch(error){
            throw error;
        }
    }

    static async eliminarRiesgo(id_riesgo){
        try{
            const connexion = await db();
            const resultado = await connexion.execute('DELETE FROM RIESGO WHERE id_riesgo = ?', [id_riesgo]);
            console.log(resultado);

            await connexion.release();
            return resultado;
        }catch(error){
            throw error;
        }
    }
}