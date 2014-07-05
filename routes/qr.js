exports.show_qr = function(req,res) {
	//get the username and show a qr from a generated hash run through str2qr. 
	//add the qr hash to mongo under a list of "pending hash for approval"
	//the strings should only be valid for two minutes -- mongod ttl 
	//render the page with the username
	username = req.body.input_username
	console.log(username)
	res.render('qr', { title: 'qr.jade' });
	res.end()
}

var str2qr = function() {
  //given a random hash string, generate the qr code and render to the screen	

}

exports.phone_info = function(req,res) {
	//get the username
	//check the input qr string against any pending strings in the database
	//check the user's phone hash against the mongo db.
	//if this is all good, render the login. 
}
