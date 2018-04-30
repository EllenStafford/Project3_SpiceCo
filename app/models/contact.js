var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//
var ContactSchema =new Schema ({
    firstname: {
        type: String, 
        lowercase: true, 
        required: true, 

    },
    lastname: {
        type: String,
        lowercase: true,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    message: {
        type: String,
        lowercase: true,
        required: true,

    }
})
//exports to server
module.exports = mongoose.model('Contact', ContactSchema);