const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    price: {
        type: Number,
        required: function(){
            return this.isActive;
        },
        min: 0,
        max: 1000
    },
    description: {
        type: String,
        minlength: 10
    },
    imageUrl: String,
    date: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: String,
        enum: ["telefon", "Bilgisayar"]
    },
    isActive: Boolean,
    categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: false
        }
    ]
});

module.exports = mongoose.model('Product', productSchema);