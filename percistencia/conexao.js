import mysql from 'mysql2/promise'

export default async function conectar() {
    if (globalThis.poolConexoes)
        return await globalThis.poolConexoes.getConnection();
    else {
        const pool = mysql.createPool({
            connectionLimit: 10,
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'sistema',
            waitForConnection: true,
            connectionLimit: 10,
            maxIdle: 10,
            idleTimeout: 60000,
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0
        });

        global.poolConexoes = pool;
        return await pool.getConnection();
    }
}