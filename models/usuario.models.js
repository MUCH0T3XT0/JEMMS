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
}