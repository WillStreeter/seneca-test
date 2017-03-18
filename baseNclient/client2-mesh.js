var seneca = require ("seneca")();

seneca.add("role:users,cmd:check", function (msg, respond) {

	//First get the user
	seneca.act({"role":"users","cmd":"get", "id":msg.id}, function (err, response) {

		if (err) return console.log (err)

			// Do check
			// ........
			response.user.checked=true;
			respond(null,response)
		})

})
.use('mesh',{pin:"role:users,cmd:check"})
.listen({host:"localhost", port : 5000, pin:"role:users,cmd:check"})