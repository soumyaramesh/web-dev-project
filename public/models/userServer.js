var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');



app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data
app.use(cookieParser())
app.use(session({ secret: 'this is the secret' }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public'));

var UserSchema = new mongoose.Schema({
    username: {type:String,lowercase: true, unique: true},
    password: String,
    following: [{ type: mongoose.Schema.ObjectId, ref: 'UserModel' }]
});

var UserModel = mongoose.model('UserModel', UserSchema);

//var user1 = new UserModel({ username: "soumya1", password: "soumya1", following: [] });
//user1.save();

//var user2 = new UserModel({ username: "soumya2", password: "soumya2", following: [] });
//user2.save();

//var user3 = new UserModel({ username: "soumya3", password: "soumya3", following: [] });
//user3.save();

//var user4 = new UserModel({ username: "soumya4", password: "soumya4", following: [] });
//user4.save();

exports.load = function (app, public_path) {
app.get("/rest/users", function (req, res) {
    UserModel.find(function (err, users) {
            res.json(users);
        
    });
});


app.get("/rest/user/:id", function (req, res) {
    UserModel.findById(req.params.id).populate('following').exec( function (err, user) {
        res.json(user);

    });
});

app.get('/user/unpopulated/:id', function (req, res) {
    UserModel.findById(req.params.id, function (err, data) {
        res.json(data);
    });
});

    

}













