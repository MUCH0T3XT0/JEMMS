const db = require('../utils/database.js');
const bcrypt = require('bcryptjs');

exports.Usuario = class {
    constructor(id, correo, nombre, apellido_m, apellido_p, contrasena, rol) {
        this.id = id;
        this.correo = correo;
        this.nombre = nombre;
        this.apellido_m = apellido_m;
        this.apellido_p = apellido_p;
        this.contrasena = contrasena;
        this.rol = rol;
    }

    static async eliminaTrabaja(id_usuario){
        try{
            const connexion = await db();
            const resultado = await connexion.execute('DELETE FROM TRABAJAN WHERE id_empleados = ?;', [id_usuario]);
            console.log(resultado);
            
            await connexion.release();
            return resultado;
        }catch(error){
            throw error;
        }
    }
    static async eliminaTrabajaProyecto(id_usuario, id_proyecto){
        try{
            const connexion = await db();
            const resultado = await connexion.execute('DELETE FROM TRABAJAN WHERE id_empleados = ? and id_proyecto= ?;', [id_usuario, id_proyecto]);
            console.log(resultado);
            
            await connexion.release();
            return resultado;
        }catch(error){
            throw error;
        }
    }
    static async cambiarLider(id_usuario, id_proyecto){
        try{
            const connexion = await db();
            const resultado = await connexion.execute('UPDATE PROYECTO SET id_lider = ? WHERE id_proyecto = ?;', [id_usuario, id_proyecto]);
            this.eliminaTrabajaProyecto(id_usuario,id_proyecto);
            console.log(resultado);
            await connexion.release();
            return resultado;
        }catch(error){
            throw error;
        }
    }
    static async agregaTrabaja(id_usuario, id_proyecto){
        try{
            const connexion = await db();
            const resultado = await connexion.execute('INSERT INTO trabajan VALUES(?, ?);', [id_usuario, id_proyecto]);
            
            await connexion.release();
            return resultado;
        }catch(error){
            throw error;
        }
    }
    static async eliminaUsuario(id_usuario){
        try{
            const connexion = await db();
            const resultado = await connexion.execute('DELETE FROM USUARIO WHERE id_usuario = ?', [id_usuario]);
            console.log(resultado);
            
            await connexion.release();
            return resultado;
        }catch(error){
            throw error;
        }
    }

    static async buscaLider(id_lider){
        try {
            const connexion = await db();
            const resultado = await connexion.execute('SELECT id_lider FROM PROYECTO WHERE id_lider = ?', [id_lider]);
            console.log(resultado);
            
            await connexion.release();
            return resultado;
        } catch (error) {
            throw error; 
        }
    }
   
    static async buscaUsuario(correo) {
        try {
            const connexion = await db();
            const resultado = await connexion.execute('Select id_usuario, correo, contrasena, rol from USUARIO WHERE correo = ?', [correo]);
            console.log(resultado);
            
            await connexion.release();
            return resultado;
        } catch (error) {
            throw error; 
        }
    }

    static async buscaUsuarioPorId(id) {
        try {
            const connexion = await db();
            const resultado = await connexion.execute('Select * from USUARIO WHERE id_usuario = ?', [id]);
            console.log(resultado);
            
            await connexion.release();
            return resultado;
        } catch (error) {
            throw error; 
        }
    }
    
    static async getLideres() {
        try {
            const connexion = await db();                               //Se modifico el dato solictado de apellido_m a apellido_p
            const result = await connexion.execute('SELECT id_usuario ,nombres, apellido_p, nombre_proyecto FROM USUARIO JOIN PROYECTO ON id_usuario = id_lider ORDER BY id_usuario;');
            await connexion.release();
            return result;
        } catch (error) {
            throw error; 
        }
    }
    
    static async getColaboradores() {
        try {
            const connexion = await db();                              //Se modifico el dato solictado de apellido_m a apellido_p         
            const result = await connexion.execute('SELECT id_usuario,nombres, rol, apellido_p, correo FROM USUARIO;');
            await connexion.release();
            return result;
        } catch (error) {
            throw error; 
        }
    } 
    static async getLideresProyecto(id_proyecto) {
        try {
            const connexion = await db();
            const result = await connexion.execute('SELECT id_usuario ,nombres, apellido_p, nombre_proyecto FROM USUARIO JOIN PROYECTO ON id_usuario = id_lider WHERE id_proyecto= ? ORDER BY id_usuario;', [id_proyecto]);
            await connexion.release();
            return result;
        } catch (error) {
            throw error; 
        }
    }
    
    static async getColaboradoresProyecto(id_proyecto) {
        try {
            const connexion = await db();   
            const result = await connexion.execute('SELECT id_usuario,nombres, rol, apellido_p, correo FROM usuario JOIN trabajan ON id_usuario = id_empleados WHERE id_proyecto= ? ORDER BY id_usuario;', [id_proyecto]);
            await connexion.release();
            return result;
        } catch (error) {
            throw error; 
        }
    } 
    static async getNoColaboradoresProyecto(id_proyecto) {
        try {
            const connexion = await db();   
            const result = await connexion.execute('SELECT id_usuario,nombres, rol, apellido_p, correo FROM usuario WHERE id_usuario NOT IN (SELECT id_empleados FROM trabajan WHERE id_proyecto = ?) AND id_usuario NOT IN (SELECT id_lider FROM proyecto WHERE id_proyecto = ?);', [id_proyecto, id_proyecto]);
            await connexion.release();
            return result;
        } catch (error) {
            throw error; 
        }
    }

    async guardar_usuario() {
        try {
            const connection = await db();
            const hashedPass = await bcrypt.hash(this.contrasena, 12)
            console.log("Aqui");
            const result = await connection.execute(
            `INSERT INTO usuario (nombres, apellido_m, apellido_p, correo, contrasena, rol) VALUES (?, ?, ?, ?, ?, ?)`,
            [this.nombre, this.apellido_m, this.apellido_p, this.correo, hashedPass, this.rol]
            );
            await connection.release();
            return result;
        } catch (error) {
            throw error; // Re-throw the error for proper handling
        }
    }

    async editar_usuario() {
        try {
            const connection = await db();
            const hashedPass = await bcrypt.hash(this.contrasena, 12)
            const result = await connection.execute(
            `UPDATE usuario SET nombres = ?, apellido_m = ?, apellido_p = ?, contrasena = ?, rol = ?, correo = ? WHERE id_usuario = ?`,
            [this.nombre, this.apellido_m, this.apellido_p, hashedPass, this.rol, this.correo, this.id]
            );
            await connection.release();
            return result;
        } catch (error) {
            throw error; // Re-throw the error for proper handling
        }
    }

    async editar_usuario_nocon() {
        try {
            const connection = await db();
            const result = await connection.execute(
            `UPDATE usuario SET nombres = ?, apellido_m = ?, apellido_p = ?, rol = ?, correo = ? WHERE id_usuario = ?`,
            [this.nombre, this.apellido_m, this.apellido_p, this.rol, this.correo, this.id]
            );
            await connection.release();
            return result;
        } catch (error) {
            throw error; // Re-throw the error for proper handling
        }
    }
}