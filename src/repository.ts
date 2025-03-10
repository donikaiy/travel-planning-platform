import mysql from 'mysql2/promise';

export let connection: mysql.Connection;

(async () => {
    connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'travel',
        database: 'travel_db'
    })
})()


