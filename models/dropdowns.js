const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dropdownSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    values:{
        type:[String],
        required: true
    }
},{timestamps: true})


module.exports = mongoose.model('Dropdown', dropdownSchema);
