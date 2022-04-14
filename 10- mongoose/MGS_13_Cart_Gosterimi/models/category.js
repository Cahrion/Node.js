const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String
});

module.exports = mongoose.model('Category', categorySchema);