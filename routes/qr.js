var crypto = require('crypto');
var db = require('../db')

exports.show_qr = function(req,res) {
	//TODO: the strings should only be valid for two minutes -- mongod ttl
	//TODO: send the qr hash to the client-side javascript to render it there. res.send()
	var username = req.body.input_username;
    if (username == "" {
        res.render('error', {message:"Please enter a valid username.",error: {}});
        res.end();
    }) else {
     var qr_hash = crypto.randomBytes(200).toString('hex');
     db.add_hash(username, qr_hash, function(res2) {
        console.log("after adding to pending_hash to username");
        res.render('qr', { title: 'qr.jade' });
        res.send(qr_hash);
        res.end();
    }); 
 }
}

exports.new_user= function(req,res) {
    var username = req.body.new_username
    var userhash = req.body.new_userhash
    if (username == "" || userhash == "")  {
        res.render('error', {message:"Please enter a valid username and password.",error: {}});
        res.end();
    } else {
       db.add_user(username, userhash, function(res2) {
        //no face actually needed for this page, all done on the android app. 
        console.log("in callback for new_user adding function")
        res.render('qr', {title:"user added"});
        res.end();
    });  
   }
}


exports.login= function(req,res) {
	res.render('qr',{title:"login"});
}


// 	--they see hash as qr ----android---> send back the hash as qr,
// with username and userhash
// 	-- db : check if userhash and username go together, given username.
// 	-- db : given userhash, get pending images 

exports.phone_info = function(req,res) {
	//get the username
	//check the input qr string against any pending strings in the database
	//check the user's phone hash against the mongo db.
	//if this is all good, render the login.
	console.log("in second function") 
}
