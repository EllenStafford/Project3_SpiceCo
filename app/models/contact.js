var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//
var ContactSchema =new Schema ({
    name: {
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
        unique: true,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
    },
    phone: {
        type: String,
        required: true
    },
    message: {
        type: String,
        lowercase: true,
        required: "Message is Required",
        validate: [
            function(input) {
              return input.length >= 12;
            },
            "Message can not be less than 12 characters."
          ]
    }
})
//exports to server
module.exports = mongoose.model('Contact', ContactSchema);