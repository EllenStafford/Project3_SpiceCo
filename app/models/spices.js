var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

//unique so 'it' cannot be taken twice
var SpiceSchema =new Schema({
    productName: {type: String},
    productSize: {type: String},
    weightSize: {type: String}
});


//exports to server
module.exports = mongoose.model('Spice', SpiceSchema);