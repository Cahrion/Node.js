const getDb     = require("../utiliy/database").getdb;
const mongodb   = require("mongodb");

class Product{
    constructor(name, price, description, imageUrl, id){
        this.name           = name;
        this.price          = price;
        this.description    = description;
        this.imageUrl       = imageUrl;
        this._id            = id ? mongodb.ObjectID(id):null;
    }

    save(){
        let db    = getDb();
        if(this._id){
            db = db.collection("products").updateOne({_id: this._id}, {$set: this});
        }else{
            db = db.collection("products").insertOne(this);
        }
        return db
            .then(result=>{
                console.log(result);
            })
            .catch(err=>{
                console.log(err);
            });    
    }

    static findAll(){
        const db    = getDb();
        return db.collection("products")
            .find({})
            .project({ description: 0})
            .toArray()
            .then(products => {
                return products;
            })
            .catch(err=>{
                console.log(err);
            })
    }

    static findById(productid){
        const db    = getDb();
        // return db.collection("products")
        //     .find({
        //         _id: new mongodb.ObjectID(productid)
        //     })
        //     .toArray()
        //     .then(products => {
        //         return products;
        //     })
        //     .catch(err=>{
        //         console.log(err);
        //     })
        return db.collection("products")
            .findOne({
                _id: new mongodb.ObjectID(productid)
            })
            .then(products => {
                return products;
            })
            .catch(err=>{
                console.log(err);
            })
    }
    static deleteById(productid){
        const db = getDb();
        const id = mongodb.ObjectID(productid);
        return db.collection("products")
            .deleteOne({_id: id})
            .then(() => {
                console.log("deleted");
            })
            .catch(err=>{
                console.log(err);
            })
    }
}
module.exports = Product;