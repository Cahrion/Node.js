const sequelize     = require("../utiliy/database"); 
const Sequelize     = require("sequelize");

const Product       = sequelize.define("product", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    categoryid: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});
module.exports = Product;