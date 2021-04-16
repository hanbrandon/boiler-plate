const { User } = require('../models/User');

const fetch = require('node-fetch');
const config = require('config');
const ReCaptchaKey = config.get('ReCaptchaKey');

let auth = (req, res, next) => {
	//인증처리를 하는곳

	//클라이언트 쿠키에서 토큰을 가져온다.

	let token = req.cookies.x_auth;
	//토큰을 디코드 한후 유저를 찾는다

	User.findByToken(token, (err, user) => {
		if (err) throw err;
		if (!user) return res.json({ isAuth: false, error: true });

		req.token = token;
		req.user = user;
		next();
	});
	//유저가 있으면 인증 ok

	//유저가 없으면 인증 no
};

const validateHuman = async token => {
	const secret = ReCaptchaKey.apikey;

	const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`, {
		method: 'POST',
	});

	const data = await response.json();

	return data.success;
};

const REcaptcha = async (req, res, next) => {
	//요청된 이메일을 데이터베이스에서 찾음.
	const token = req.body.token;
	const human = await validateHuman(token);
	if (!human) {
		return res.json({
			loginSuccess: false,
			message: 'Something went wrong, please try again later!',
		});
	}
	next();
};


module.exports = { auth, REcaptcha };
