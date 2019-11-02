module.exports = {
	create_salt: function create_salt(len){
		var cr = require('crypto');
		p = cr.randomBytes(len)
		return p.toString('hex');
	}
}