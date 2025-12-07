require('dotenv').config();
const mysql = require('mysql2');
const logger = require('../utils/logger');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    init_command: "SET time_zone = '+00:00'"
});


const dbConnection = pool.promise();
// Test the connection
(async()=>{
    try{
        await dbConnection.query('SELECT 1');
        logger.info('✅ Connected to the database');
    } catch(error){
        logger.error('❌ Error connecting to the database: %o', error);
        process.exit(1);
    }
})()


module.exports = dbConnection;
