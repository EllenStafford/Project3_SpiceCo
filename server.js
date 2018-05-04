var express = require('express');
var app = express();
var port =process.env.PORT || 3003
var morgan = require ('morgan');
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var router = express.Router();
var appRoutes = require('./app/routes/api')(router);
var path = require('path');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public')); //gives acess to static location
app.use('/api', appRoutes);


//making sure we are connected to db
//reminder*** open a new window after mogod and typing mono
//capital to know it's mine
mongoose.connect("mongodb://localhost/users", function(err){
    if (err){
        console.log ('PROBLEM CONNECTING TO DATABASE -MS ' + err);
    }else{
        console.log ('CONNECTED TO DATABSE -MS')
    }
});
//testing out morgan
// app.get('home', function (req,res){
//     res.send("Melissa's home");
// })

//no matter what the user types, they will be directed to what index.html renders
app.get('*', function(req,res){
    res.sendFile(path.join(__dirname + "/public/app/views/index.html"));
})

app.listen(port, function(){
    console.log("running server on port " + port);
});

