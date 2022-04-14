const mysql = require("mysql2"); 

const connection    = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "MySqlŞifrem4862",
    database: "node-app"
});


module.exports = connection.promise(); 