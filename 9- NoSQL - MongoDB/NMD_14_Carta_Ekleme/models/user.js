const getDb = require("../utiliy/database").getdb;
const mongodb = require("mongodb");

class User {
    constructor(name, email, cart, id) {
        this.name = name;
        this.email = email;
        this.cart = cart ? cart : {};
        this.cart.items = cart ? cart.items : [];
        this._id = id;
    }

    save() {
        const db = getDb();
        return db.collection("users").insertOne(this);
    }

    getCart() {
        // return this.cart.items
    }
    addToCart(product) {
        const index = this.cart.items.findIndex(cp => {
            return cp.productId.toString() === product._id.toString();
        });
        let itemQuantity = 1;
        const updatedCartItems = [...this.cart.items];
        if (index >= 0) {
            itemQuantity = this.cart.items[index].quantity + 1;
            updatedCartItems[index].quantity = itemQuantity;
        } else {
            updatedCartItems.push({
                productId: new mongodb.ObjectID(product._id),
                quantity: itemQuantity
            });
        }
        const db = getDb();
        return db.collection("users")
            .updateOne({ _id: new mongodb.ObjectID(this._id) },
                {
                    $set: {
                        cart: {
                            items: updatedCartItems
                        }
                    }
                }
            );

    }

    static findById(userid) {
        const db = getDb();
        return db.collection("users")
            .findOne({
                _id: new mongodb.ObjectID(userid)
            })
            .then(user => {
                return user;
            })
            .catch(err => {
                console.log(err);
            })
    }
    static findByUserName(username) {
        const db = getDb();
        return db.collection("users")
            .findOne({
                name: username
            })
            .then(user => {
                return user;
            })
            .catch(err => {
                console.log(err);
            })
    }
}
module.exports = User;