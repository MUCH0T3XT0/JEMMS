const db = require('../utils/database.js');

exports.Usuario = class {
    constructor(correo, nombre, contrasena, id) {
        this.correo = correo;
        this.nombre = nombre;
        this.contraseña = contrasena;
        this.id = id; 
    }
   
    static async buscaUsuario(correo) {
        try {
            const connexion = await db();
            const resultado = await connexion.execute('Select id_usuario, correo, contrasena from USUARIO WHERE correo = ?', [correo]);
            console.log(resultado);
            
            await connexion.release();
            return resultado;
        } catch (error) {
            throw error; 
        }
    }
    
    static async getLideres() {
        try {
            const connexion = await db();
            const result = await connexion.execute('SELECT id_usuario,nombres, apellido_m, nombre_proyecto FROM USUARIO JOIN PROYECTO ON id_usuario = id_manager ORDER BY id_usuario;');
            await connexion.release();
            return result;
        } catch (error) {
            throw error; 
        }
    }
    
    static async getColaboradores() {
        try {
            const connexion = await db();
            const result = await connexion.execute('SELECT id_usuario,nombres, apellido_m, correo FROM USUARIO;');
            await connexion.release();
            return result;
        } catch (error) {
            throw error; 
        }
    } 
}