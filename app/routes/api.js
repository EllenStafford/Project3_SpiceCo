var User = require('../models/user');
var jwt = require("jsonwebtoken");
var Contact = require('../models/contact');
var Inquiry = require('../models/inquiry');
var Spice = require('../models/spices');
//extra security for the token
var secret = "spongebob"


//
module.exports = function(router){


//user registration
    router.post('/users', function (req,res){
        var user = new User();
        user.business = req.body.business;
        user.username = req.body.username;
        user.phone = req.body.phone;
        user.address = req.body.address;
        user.password = req.body.password;
        user.email = req.body.email;

        if (req.body.business === null || req.body.business === ""){
            res.json({success: false, message: "A business name is required'"});
        }else if (req.body.username === null || req.body.username === ""){
            res.json({success: false, message: "A username is required'"});
        }else if (req.body.phone === null || req.body.phone === ""){
            res.json({success: false, message: "A phone is required'"});
        }else if (req.body.address === null || req.body.address === ""){
            res.json({success: false, message: "An address is required'"});
        }else if (req.body.password === null || req.body.password === ""){
            res.json({success: false, message: "A password is required"});
        }else if (req.body.email === null || req.body.email === ""){
            res.json({success: false, message: "An email is required"});
        }else{
            user.save(function(err){
                if (err){
                    res.json({success: false, message: "An account under that username or email already exists"});
                }else{
                    res.json({success: true, message: "Account created!"});
                }
            });
        }
    });

    
    router.post('/contacts', function (req, res) {
        console.log(req.body);
        var contact = new Contact({
            companyName: req.body.companyName,
            contactName: req.body.contactName,
            streetAddress: req.body.streetAddress,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            email: req.body.email,
            message: req.body.message
        });
        if (req.body.companyName === null || req.body.companyName === "") {
            res.send({success: false, message:'A company name is required'});
        } else if (req.body.contactName === null || req.body.contactName === "") {
            res.send({success: false, message:'A contact name is required'});
        } else if (req.body.streetAddress === null || req.body.streetAddress === "") {
            res.send({success: false, message:'An address is required'});
        } else if (req.body.city === null || req.body.city === "") {
            res.send({success: false, message:'A city is required'});
        } else if (req.body.state === null || req.body.state === "") {
            res.send({success: false, message:'A state is required'});
        }else if (req.body.zip === null || req.body.zip === "") {
            res.send({success: false, message:'A zip code is required'});
        }else if (req.body.phone === null || req.body.phone === "") {
            res.send({success: false, message:'A phone is required'});
        }else if (req.body.email === null || req.body.email === "") {
            res.send({success: false, message:'An email is required'});
        }
        else if (req.body.message === null || req.body.message === "") {
            res.send({success: false, message:'A message is required'});
        } else {
            contact.save(function (err) {
                if (err) {
                    console.log(err);
                    res.json({ success: false, message: "An account error exists" });
                } else {
                    res.json({ success: true, message: "Thank you for contacting us" });
                }
            });
        };

    });

    router.post('/inquiry', function (req, res) {
        console.log(req.body);
        var inquiry = new Inquiry({
            inquiryName: req.body.inquiryName,
            inquiryEmail: req.body.inquiryEmail,
            inquiryMessage: req.body.inquiryMessage
        });
        if (req.body.inquiryName === null || req.body.inquiryName === "") {
            res.json({success: false, message:'A name is required'});
        } else if (req.body.inquiryEmail === null || req.body.inquiryEmail === "") {
            res.json({success: false, message:'An email address is required'});
        } else if (req.body.inquiryMessage === null || req.body.inquiryMessage === "") {
            res.json({success: false, message:'A message is required'});
        } else {
            inquiry.save(function (err) {
                if (err) {
                    console.log(err);
                    res.json({ success: false, message: "Cannot submit form, contact Tony directly at 704 941-0012" });
                } else {
                    res.json({ success: true, message: "Thank you for contacting us" });
                }
            });
        };

    });

//user login 
    router.post('/authenticate', function (req,res){
        User.findOne({ username: req.body.username}).select("username email password")
        .exec(function(err,user){
            if (err) throw err;
//comparing data to db to see if account exists
            if (!user){
                res.json({sucess:false, message: "Information not valid"});
            } else if (user){
                if (req.body.password){
                    var validPassword = user.comparePassword(req.body.password);
                }else{
                    res.json({success: false, message: "Password Required"});
                }
               
               if(!validPassword){
                   res.json({success: false, message: "Invalid Password"});
               }else {
                var token = jwt.sign({ username: user.username, email: user.email}, secret, { expiresIn: "24h" });
                   res.json({ success: true, message: "Logged in", token: token});
               }
            }
        })
    })

    router.get('/spices', function(req, res) {
        const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G','H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
        const range = (req.query.paginate || 'A-Z').split('-')
        const left = range[0].toUpperCase()
        const right = alphabet[range[1] === 'Z' ? alphabet.indexOf('Z') : alphabet.indexOf(range[1].toUpperCase()) + 1]
        Spice.find({productName: { $gte: left, $lte: right }}, (err, document)=> {
            res.json(document)   
        })
    })



//loging user out
//decoded takes the token combines it with the secret, once verified it sends it back decoded as username and email.
router.use(function(req,res,next){
    //request url headers
    var token = req.body.token || req.body.query || req.headers["x-access-token"];
    if (token){
        jwt.verify(token, secret, function(err, decoded){
            if (err) {
                res.json({ success: false, message: "token expired"});
            }else{
                req.decoded = decoded;
                next();
            }
        })
    }else{
        res.json({success: false, message: "no token"})
    };
});
router.post("/me", function(req,res){
    res.send(req.decoded);
});

router.get("/permission", function(req,res){
    User.findOne({username: req.decoded.username}, function(err,user){
        if (err) throw err;
        if(!user){
            res.json({success:false, message: "this is not happening"});
        }else{
            res.json({success: true, permission: user.permission });
        }
    });
})

    return router;
}

