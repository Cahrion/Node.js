const Product   = require("./product"); 
const mongoose  = require('mongoose');


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        items: [{
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }]
    }
});

userSchema.methods.addToCart = function(product){
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
            productId: product._id,
            quantity: itemQuantity
        });
    }
    this.cart = {
        items: updatedCartItems
    }
    return this.save();
};
userSchema.methods.getCart = function(){
    const ids = this.cart.items.map(i => {
        return i.productId;
    });

    return Product
        .find({
            _id: {
                $in: ids
            }
        })
        .select("name price imageUrl")
        .then((products) => {
            return products.map(p => {
                return {
                    name: p.name,
                    price: p.price,
                    imageUrl: p.imageUrl,
                    quantity: this.cart.items.find(i => {
                        return i.productId.toString() === p._id.toString()
                    }).quantity
                }
            });
        })
        .catch(err => {
            console.log(err);
        });
};
userSchema.methods.deleteCartItem = function(productid){
    const cartItems = this.cart.items.filter(item => {
        return item.productId.toString() !== productid.toString()
    });
    this.cart.items = cartItems;

    return this.save();
}

module.exports = mongoose.model('User', userSchema);