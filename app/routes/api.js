var User = require('../models/user');


//
module.exports = function(router){
    router.post('/users', function (req,res){
        var user = new User();
        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;
        if (req.body.username === null || req.body.username === ""){
            res.send('A username is required');
        }else if (req.body.password === null || req.body.password === ""){
            res.send('A password is required');
        }else if (user.password.length < 6){
            res.send('Password needs to be 6 characters or longer');
        }else if (req.body.email === null || req.body.email === ""){
            res.send('An email is required');
        }else{
            user.save(function(err){
                if (err){
                    res.send('An account under that username or email already exists');
                }else{
                    res.send('Account created!');
                }
            });
        }
    });
    return router;
}
var Contact = require('../models/contact.js');
 module.exports = function(router){
    router.post('/contacts', function (req,res){
        var contact = new Contact();
        contact.name = req.body.name;
        contact.lastname = req.body.lastname;
        contact.email = req.body.email;
        contact.phone = req.body.phone;
        contact.message = req.body.message;
        if (req.body.name === null || req.body.name === ""){
            res.send('A contact name is required');
        }else if (req.body.lastname === null || req.body.lastname === ""){
            res.send('A lastname is required');
        }else if (req.body.email === null || req.body.email === ""){
            res.send('An email address is required');
        }else if (req.body.phone === null || req.body.phone === ""){
            res.send('A phone number is required');
        }else if (req.body.message === null || req.body.message === ""){
            res.send('This field can not be left blank');
        }else if (req.body.message.length < 12){
            res.send('Message can not be less than 12 characters');
        }else{
            user.save(function(err){
                if (err){
                    res.send('An account under that username or email already exists');
                }else{
                    res.send('Thank you for contacting us!');
                }
            });
        }
    });

    return router;
 }