const mariadb = require("mariadb");

const pool = mariadb.createPool({
    host:"127.0.0.1",
    user:"root",
    password:"sofiKITTY",
    database: "APPIX",
    connectionLimit:10
});

module.exports = async () => {
    try {
        const connection = await pool.getConnection();
        return connection;
    } catch (error) {
        
        throw error; // Re-throw the error for proper handling
    }
};