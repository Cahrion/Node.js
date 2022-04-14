const mongoose = require('mongoose');

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

module.exports = mongoose.model('User', userSchema);