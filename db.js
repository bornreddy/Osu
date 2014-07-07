var mongoose = require('mongoose');

//create url Schema
var userSchema = mongoose.Schema({
	username: {type : String},
	userhash: {type: String},
	pending_hashes: { type : Array , "default" : [] }
});

userSchema.methods.show = function () {
	var user_info = "username: " + this.username + 
	"\nuser_hash: " + this.userhash 
	"\npending_hashes" + this.pending_hashes;
	console.log(user_info);
};

var Users = mongoose.model('Users', userSchema);

//given username, push a validation hash onto their pending hashes array
exports.add_hash= function(name,validation_hash, callback) {
	var query = {"username": name};
	var update = { $addToSet: { pending_hashes: validation_hash } }
	var options = {upsert: true};
	Users.findOneAndUpdate(query, update, options, function(err, user) {
		if (err) {
			console.log('got an error');
		} else {
			console.log(user)
			callback(user)
		}
  });
};



//get userhash from username
//get pending hashes from username
//add a pending hash to a username
//delete a pending hash after ttl