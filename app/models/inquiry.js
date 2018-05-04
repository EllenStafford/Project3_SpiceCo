var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//
var InquirySchema = new Schema ({
    inquiryName: {type: String, lowercase: true, required: true},
    inquiryEmail: {type: String,lowercase: true, required: true},
    inquirySubject: {type: String, lowercase:true, required:true},
    inquiryMessage: {type: String,lowercase: true, required: true}
});
//exports to server
module.exports = mongoose.model('Inquiry', InquirySchema);