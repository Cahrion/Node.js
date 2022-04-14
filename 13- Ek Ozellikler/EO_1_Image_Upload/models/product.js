const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Ürün ismi girilmesi gereklidir."],
        minlength: [5, "Ürün ismi için minimum 5 karakter girilmelidir."],
        maxlength: [255, "Ürün ismi için maximum 5 karakter girilmelidir."],
        lowercase: true,
        // uppercase: true
        trim: true
    },
    price: {
        type: Number,
        required: function(){
            return this.isActive;
        },
        min: 0,
        max: 100000,
        get: value => Math.round(value),
        set: value => Math.round(value)
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
    tags: {
        type: Array,
        validate: {
            validator: function(value){
                return value && value.length > 0;
            },
            message: "Ürün için en az bir etiket giriniz."
        }
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