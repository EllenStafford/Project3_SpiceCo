var User = require('../models/user');

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