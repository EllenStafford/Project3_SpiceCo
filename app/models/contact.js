var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//
var ContactSchema = new Schema ({
    companyName: {type: String, lowercase: true, required: true},
    contactName: {type: String,lowercase: true, required: true},
    streetAddress: {type: String, lowercase: true, required: true},
    city: {type: String, lowercase: true, required: true},
    state: {type: String, lowercase: true, required: true},
    zip: {type: String, lowercase: true, required: true},
    phone: {type: String, lowercase: true, required: true},
    email: {type: String, lowercase: true, required: true},
    message: {type: String, lowercase: true, required: true}
});
//exports to server
module.exports = mongoose.model('Contact', ContactSchema);