const db = require('../utils/database.js');

exports.Usuario = class {
    constructor(correo, nombre, apellido_m, apellido_p, contrasena, rol) {
        this.correo = correo;
        this.nombre = nombre;
        this.apellido_m = apellido_m;
        this.apellido_p = apellido_p;
        this.contrasena = contrasena;
        this.rol = rol;
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

    async guardar_usuario() {
        try {
            const connection = await db();
            const result = await connection.execute(
            `INSERT INTO usuario (nombres, apellido_m, apellido_p, correo, contrasena, rol) VALUES (?, ?, ?, ?, ?, ?)`,
            [this.nombre, this.apellido_m, this.apellido_p, this.correo, this.contrasena, this.rol]
            );
            await connection.release();
            return result;
        } catch (error) {
            throw error; // Re-throw the error for proper handling
        }
    }

    static async editar_usuario() {
        try {
            const connection = await db();
            const result = await connection.execute(
            `UPDATE usuario SET nombre = ?, apellido_m = ?, apellido_p = ?, contrasena = ?, rol = ? WHERE correo = ?`,
            [this.nombre, this.apellido_m, this.apellido_p, this.contrasena, this.rol, this.correo]
            );
            await connection.release();
            return result;
        } catch (error) {
            throw error; // Re-throw the error for proper handling
        }
    }

}