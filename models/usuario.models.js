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
            const resultado = await connexion.execute('Select * from USUARIO WHERE correo = ?', [correo]);
            console.log(resultado);
            
            await connexion.release();
            return resultado;
        } catch (error) {
            throw error; 
        }
    }

    static async getPermisos(username) {
        try {
            const connexion = await db();
            const result = await connexion.execute('Select permiso FROM privilegio pr, posee po, rol r, asigna a, usuario u WHERE u.username = ? AND u.username = a.username AND a.idrol = r.id AND r.id = po.idrol AND po.idpermiso = pr.id', [username]);
            await connexion.release();
            return result;
        } catch (error) {
            throw error; 
        }
    }    
}