const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.SQL_HOST,
    port: process.env.SQL_PORT,
    database: process.env.SQL_DB,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASS
});

const sqlQuery = (sql) => {
    return new Promise(resolve => {
        //connection.connect();
        connection.query(sql, (err, responce) => (responce !== undefined) && resolve(responce));
        //connection.end();
    })
}

module.exports = sqlQuery;