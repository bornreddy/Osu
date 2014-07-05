exports.show_qr = function(req,res) {
	username = req.body.input_username
	console.log(username)
	res.render('qr', { title: 'qr.jade' });
}

