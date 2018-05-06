var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

//unique so 'it' cannot be taken twice
var UserSchema =new Schema({
    business: {type: String, required: true, lowercase: true},
    username: {type: String, lowercase: true, required: true, unique:true},
    phone: {type: String, required: true, lowercase: true},
    address: {type: String, required: true, lowercase: true},
    password: {type: String, required:true},
    email: {type: String, required: true, lowercase: true, unique:true},
    permission: {type: String, required: true, default: "user"},
    usercity: {type: String,required: true, lowercase: true},
    userstate: {type: String,lowercase: true, lowercase: true},
    userzip: {type: String,lowercase: true, lowercase: true}
});



// this encrypts the passwords on the DB so no one, including the admin, has access to users passwords
UserSchema.pre('save', function(next){
    var user = this;
    bcrypt.hash(user.password, null, null, function(err, hash){
        if(err) return next (err);
        user.password = hash;
        next();
    });
});

//this method validates the password
UserSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
};
//exports to server
module.exports = mongoose.model('User', UserSchema);