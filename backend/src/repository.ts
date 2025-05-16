import mysql from 'mysql2/promise';

export let connection: mysql.Connection;

(async () => {
    connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'travel',
        database: process.env.DB_NAME || 'travel_db'
    })
})()


