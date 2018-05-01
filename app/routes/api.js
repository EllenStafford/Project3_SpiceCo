var User = require('../models/user');
var Spice = require('../models/spices')
var jwt = require("jsonwebtoken");
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

//user login 
    router.post('/authenticate', function (req,res){
        User.findOne({ username: req.body.username}).select("address business phone email username password ")
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
                var token = jwt.sign({ username: user.username, email: user.email, business: user.business, address: user.address, phone: user.phone}, secret, { expiresIn: "24h" });
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
    }
})
router.post("/me", function(req,res){
    res.send(req.decoded);
});





    return router;
}
// var Contact = require('../models/contact.js');
//  module.exports = function(router){
//     router.post('/contacts', function (req,res){
//         var contact = new Contact();
//         contact.name = req.body.name;
//         contact.lastname = req.body.lastname;
//         contact.email = req.body.email;
//         contact.phone = req.body.phone;
//         contact.message = req.body.message;
//         if (req.body.name === null || req.body.name === ""){
//             res.send('A contact name is required');
//         }else if (req.body.lastname === null || req.body.lastname === ""){
//             res.send('A lastname is required');
//         }else if (req.body.email === null || req.body.email === ""){
//             res.send('An email address is required');
//         }else if (req.body.phone === null || req.body.phone === ""){
//             res.send('A phone number is required');
//         }else if (req.body.message === null || req.body.message === ""){
//             res.send('This field can not be left blank');
//         }else if (req.body.message.length < 12){
//             res.send('Message can not be less than 12 characters');
//         }else{
//             user.save(function(err){
//                 if (err){
//                     res.send('An account under that username or email already exists');
//                 }else{
//                     res.send('Thank you for contacting us!');
//                 }
//             });
//         }
//     });

//     return router;
//  }