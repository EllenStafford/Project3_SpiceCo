var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//
var ContactSchema = new Schema ({
    companyName: {type: String, lowercase: true, required: true},
    contactName: {type: String,lowercase: true, required: true},
    streetAddress: {type: String, lowercase: true},
    city: {type: String,required: true},
    state: {type: String,lowercase: true},
    zip: {type: String,lowercase: true},
    phone: {type: String,lowercase: true},
    email: {type: String, lowercase: true},
    message: {type: String,lowercase: true}
});
//exports to server
module.exports = mongoose.model('Contact', ContactSchema);