var mongoose = require('mongoose');

//create url Schema
var userSchema = mongoose.Schema({
	username: {type : String},
	userhash: {type: String, "default" : "123" },
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
			console.log(user);
			callback(user);
		}
	});
};

exports.add_user = function(username, userhash, callback) {
	var user= new Users({ username: username, userhash: userhash });
	user.save(function(err,res) {
		if (err) {
			console.log(err);
		} else {
			console.log("added user");
			callback(user);
		}
	});
}


//GIVEN USERNAME, GET HASH
//TODO: test this out
// exports.get_hash = function(username, userhash, callback) {
// 	var query = {"username":name};
// 	var fields = 'userhash'
// 	Users.findOne(query,fields,function(err,user) {
// 		if (err) {
// 			console.log('got an error');
// 		} else {
// 			console.log('userhash: ' + user.userhash);
// 			callback(user);
//          return user.userhash
// 		}
// 	});
// }


//add a pending hash to a username
//delete a pending hash after ttl