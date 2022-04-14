const Sequelize     = require("sequelize");

const sequelize     = new Sequelize("node-app","root","MySqlŞifrem4862", {
    dialect: "mysql",
    host: "localhost"
});

module.exports = sequelize; 