var seneca = require ("seneca")();
var data = require ("./../MOCK_DATA.json");

seneca.add("role:users,cmd:get", function(msg, respond) {

	var user = data.filter(function(usr) { return usr.id == msg.id});
	var error =null;
	if (user.length === 0 ) {
		error = Error ("user not found");

	}
	else{
		user = user[0]
	}

	respond(error, {"user" : user})
})

seneca.act("role:users,cmd:get,id:4", function (err,response) {
	if (err) return console.log (err.msg);
	console.log (response);
})

seneca.listen({host:"localhost",port:"10101"});