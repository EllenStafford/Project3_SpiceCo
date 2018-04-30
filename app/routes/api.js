var User = require('../models/user');
var Contact = require('../models/contact');
var jwt = require("jsonwebtoken");
//extra security for the token
var secret = "spongebob"


//
module.exports = function (router) {


    //user registration
    router.post('/users', function (req, res) {
        var user = new User();
        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;
        if (req.body.username === null || req.body.username === "") {
            res.json({ success: false, message: "A username is required'" });
        } else if (req.body.password === null || req.body.password === "") {
            res.json({ success: false, message: "A password is required" });
        }
        // else if (user.password.length < 6){
        //     res.send('Password needs to be 6 characters or longer');
        // }
        else if (req.body.email === null || req.body.email === "") {
            res.json({ success: false, message: "An email is required" });
        } else {
            user.save(function (err) {
                if (err) {
                    res.json({ success: false, message: "An account under that username or email already exists" });
                } else {
                    res.json({ success: true, message: "Account created!" });
                }
            });
        }
    });

    router.post('/contacts', function (req, res) {
        console.log(req.body);
        var contact = new Contact({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            phone: req.body.phone,
            message: req.body.message
        });
        if (req.body.firstname === null || req.body.firstname === "") {
            res.send('A contact name is required');
        } else if (req.body.lastname === null || req.body.lastname === "") {
            res.send('A lastname is required');
        } else if (req.body.email === null || req.body.email === "") {
            res.send('An email address is required');
        } else if (req.body.phone === null || req.body.phone === "") {
            res.send('A phone number is required');
        } else if (req.body.message === null || req.body.message === "") {
            res.send('This field can not be left blank');
        } else {
            contact.save(function (err) {
                if (err) {
                    console.log(err);
                    res.json({ success: false, message: "An account error exists" });
                } else {
                    res.json({ success: true, message: "Thank you for contacting us" });
                }
            });
        }

    });
    //user login 
    router.post('/authenticate', function (req, res) {
        User.findOne({ username: req.body.username }).select("email username password")
            .exec(function (err, user) {
                if (err) throw err;
                //comparing data to db to see if account exists
                if (!user) {
                    res.json({ sucess: false, message: "Information not valid" });
                } else if (user) {
                    if (req.body.password) {
                        var validPassword = user.comparePassword(req.body.password);
                    } else {
                        res.json({ success: false, message: "Password Required" });
                    }

                    if (!validPassword) {
                        res.json({ success: false, message: "Invalid Password" });
                    } else {
                        var token = jwt.sign({ username: user.username, email: user.email }, secret, { expiresIn: "24h" });
                        res.json({ success: true, message: "Loging In", token: token });
                    }
                }
            })
    })
    //loging user out
    //decoded takes the token combines it with the secret, once verified it sends it back decoded as username and email.
    router.use(function (req, res, next) {
        //request url headers
        var token = req.body.token || req.body.query || req.headers["x-access-token"];
        if (token) {
            jwt.verify(token, secret, function (err, decoded) {
                if (err) {
                    res.json({ success: false, message: "token expired" });
                } else {
                    req.decoded = decoded;
                    next();
                }
            })
        } else {
            res.json({ success: false, message: "no token taking back user info" })
        }
    })
    router.post("/me", function (req, res) {
        res.send(req.decoded);
    });



    return router;
};


