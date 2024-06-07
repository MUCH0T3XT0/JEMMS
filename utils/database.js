const mariadb = require("mariadb");

const pool = mariadb.createPool({
    host:"127.0.0.1",
    user:"root",
    password:"DBM4n4ger.",
    database: "appix_pruebas",
    connectionLimit:10,
    port: 3310
});

module.exports = async () => {
    try {
        const connection = await pool.getConnection();
        return connection;
    } catch (error) {
        
        throw error; // Re-throw the error for proper handling
    }
};