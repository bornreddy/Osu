var crypto = require('crypto');
var db = require('../db')



exports.show_qr = function(req,res) {
	//TODO: the strings should only be valid for two minutes -- mongod ttl
	//TODO: send the qr hash to the client-side javascript to render it there. res.send()
	var username = req.body.input_username;
	var qr_hash = crypto.randomBytes(200).toString('hex');
    db.add_hash(username, qr_hash, function(res2) {
    	console.log("after adding to pending_hash to username");
    	res.render('qr', { title: 'qr.jade' });
    	res.send(qr_hash);
    	res.end();
    });
}


// --get the username and generate hash
// 	   --db : for a username, add hash to pending hashes
// 	--they see hash, send back the hash
// 	-- db : check if userhash and username go together.
// 	-- db : given userhash, get pending images 

exports.phone_info = function(req,res) {
	//get the username
	//check the input qr string against any pending strings in the database
	//check the user's phone hash against the mongo db.
	//if this is all good, render the login.
	console.log("in second function") 
}
