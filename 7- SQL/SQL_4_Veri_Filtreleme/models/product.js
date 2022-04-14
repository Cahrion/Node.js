const connection = require("../utiliy/database");



module.exports = class Product {

    constructor(name, price, imageUrl, description, categoryid) {
        this.id = (Math.floor(Math.random() * 99999) + 1).toString();
        this.name           = name;
        this.price          = price;
        this.imageUrl       = imageUrl;
        this.description    = description;
        this.categoryid     = categoryid;
    }

    saveProduct() {
    }

    static getAll() {
        return connection.execute("SELECT * FROM products")
    }

    static getById(id){
        return connection.execute("SELECT * FROM products WHERE products.id=?",[id]);
    }

    static getProductsByCategoryId(categoryid){
    }

    static Update(product){
    }
    static DeleteById(id){
    }
}