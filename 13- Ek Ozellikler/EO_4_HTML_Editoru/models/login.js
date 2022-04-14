const mongoose = require('mongoose');
const Product = require('./product');
const { isEmail } = require("validator");

const loginSchema = mongoose.Schema({
    email: {
        type: String,
        validate: [isEmail, "Hatalı E-posta adresi"]
    },
    password: {
        type: String,
        required: [true, "Parola giriniz."]
    }
});

module.exports = mongoose.model('Login', loginSchema);