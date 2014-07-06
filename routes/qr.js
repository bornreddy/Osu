var crypto = require('crypto')

exports.show_qr = function(req,res) {
	//get the username and generate a hash 
	//add the qr hash to mongo under a list of "pending hash for approval"
	//the strings should only be valid for two minutes -- mongod ttl
	//send the qr hash to the client-side javascript to render it there. res.send()
	username = req.body.input_username;
	console.log(username);
	res.render('qr', { title: 'qr.jade' });
	var qr_hash = crypto.randomBytes(200).toString('hex');
	console.log(qr_hash)
	res.send(qr_hash)
	res.end();
}


exports.phone_info = function(req,res) {
	//get the username
	//check the input qr string against any pending strings in the database
	//check the user's phone hash against the mongo db.
	//if this is all good, render the login. 
}
