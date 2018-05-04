var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

//unique so 'it' cannot be taken twice
var SpiceSchema =new Schema({
    productName: {
        type: String, 
        required: true, 
    },

    productSize: {
        type: String, 
        lowercase: true, 
        required: true,
    },

    weightSize: {
        type: String, 
        required: true, 
        lowercase: true, 
    }
});


//exports to server
module.exports = mongoose.model('Spice', SpiceSchema);