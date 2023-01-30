require('dotenv').config();
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

function withAuth(req, res, next) {
	const token = req.headers['authorization'];
	if (token === null) {
		res.json({ status: 404, msg: 'wrong token' });
	}
	jwt.verify(token, secretKey, function (err, decoded) {
		if (err) {
			res.json({ status: 401, msg: 'wrong token' });
		}
		req.body.id = decoded.id;
		next();
	});
}

module.exports = withAuth;
