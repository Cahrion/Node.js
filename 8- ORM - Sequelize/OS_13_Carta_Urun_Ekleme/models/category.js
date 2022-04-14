const sequelize     = require("../utiliy/database"); 
const Sequelize     = require("sequelize");

const Category      = sequelize.define("category", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    description: {
        type: Sequelize.TEXT,
        allowNull: true
    }
});
module.exports = Category;