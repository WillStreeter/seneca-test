var seneca = require ("seneca")();
seneca.client({host:"127.0.0.1", port:10101}).act({"role":"users","cmd":"get","id":7}, function (err,response) {
	if (err) return console.log (err.msg);
	console.log (response);
})