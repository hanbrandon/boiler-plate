const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const { auth, REcaptcha } = require('../middleware/auth');
const passport = require('../middleware/passport');
const { mailer } = require('../middleware/mailer');
const async = require('async');
const crypto = require('crypto');

/* router.post('/api/users/register', (req, res) => {
	//회원 가입 할때 필요한 정보들을 Client에서 가져오면 그것들을 데이터 베이스에 넣어준다.
	const user = new User(req.body);
	User.findOne({ email: user.email }, (err, user) => {
		if (user) {
			return res.json({
				success: false,
				message: 'Account Already Exists',
			});
		} else {
			user.save((err, userInfo) => {
				if (err) {
					return res.json({
						success: false,
						err,
					});
				} else {
					return res.status(200).json({
						success: true,
					});
				}
			});
		}
	});
}); */

/* router.post('/api/users/login', (req, res) => {
	console.log('login router');
	//요청된 이메일을 데이터베이스에서 찾음.
	User.findOne({ email: req.body.email }, (err, user) => {
		if (!user) {
			return res.json({
				loginSuccess: false,
				message: 'No account found.',
			});
		}
		//요청된 이메일이 데이터 베이스에 있다면 비밀번호가 동일한지 확인.
		user.comparePassword(req.body.password, (err, isMatch) => {
			if (!isMatch)
				return res.json({
					loginSuccess: false,
					message: 'Wrong Password',
				});
			//비밀번호가 동일하면 토큰 생성하기
			user.generateToken((err, user) => {
				if (err) return res.status(400).send(err);

				//토큰을 저장한다. 어디에? 쿠키<, 로컬스토리지, 세션
				res.cookie('x_auth', user.token).status(200).json({
					loginSuccess: true,
					userId: user._id,
				});
			});
		});
	});
});

router.get('/api/users/auth', auth, (req, res) => {
	//여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication이 True 라는 말.
	res.status(200).json({
		_id: req.user._id,
		isAdmin: req.user.role === 0 ? false : true,
		isAuth: true,
		email: req.user.email,
		name: req.user.name,
		lastname: req.user.lastname,
		role: req.user.role,
		iamge: req.user.image,
	});
});

router.get('/api/users/logout', auth, (req, res) => {
	User.findOneAndUpdate(
		{ _id: req.user._id },
		{
			token: '',
		},
		(err, user) => {
			{
				if (err) return res.json({ success: false, err });
				return res.status(200).send({
					success: true,
				});
			}
		}
	);
}); 

router.get('/oAuthLogin/:id', (req, res) => {
	console.log(req.params);
	User.findOne({ _id: req.params.id }, (err, user) => {
		if (err) {
			console.log(err);
			return res.json({
				loginSuccess: false,
				message: 'Something went wrong, please try again later!',
			});
		}
		user.generateToken((err, user) => {
			if (err) return res.status(400).send(err);

			const userObj = {
				_id: user._id,
				isAuth: true,
				email: user.email,
				firstName: user.firstName,
				lastName: user.lastName,
				date: user.date,
				image: user.image
			}

			return res.json({
				loginSuccess: true,
				user: userObj,
			});
		});
	})
}); */

// register function

router.post('/register', REcaptcha, (req, res) => {
	let userRequest = req.body;
	userRequest.role = ['customer'];
	const user = new User(userRequest);
	user.save((err, userInfo) => {
		if (err) {
			return res.json({
				success: false,
				err,
			});
		} else {
			return res.status(200).json({
				success: true,
			});
		}
	});
});

// Login Function

router.post('/login', /* REcaptcha,  */(req, res, next) => {
	passport.authenticate('local', { session: true }, (err, user, info) => {
		if (err) {
			console.log(err);
			return res.json({
				loginSuccess: false,
				message: 'Something went wrong, please try again later!',
			});
		}
		if (!user) {
			return res.json(info);
		}
		req.logIn(user, err => {
			if (err) {
				console.log(err);
				return res.json({
					loginSuccess: false,
					message: 'Something went wrong, please try again later!',
				});
			}
			res.json({
				loginSuccess: true,
				user,
			});
		});
	})(req, res, next);
});

router.get(
	'/auth/facebook',
	passport.authenticate('facebook', {
		scope: ['email', 'user_photos'],
		enable_profile_selector: true,
	})
);

router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: 'http://localhost:3000/login', session: true }), (req, res) => {
	if (req.user) {
		req.logIn(req.user, err => {
			if (err) {
				console.log(err);
				res.redirect('http://localhost:3000/login/');
			}
			if (req.user.role.includes('new-comer')) {
				res.redirect('http://localhost:3000/register/roles');
			} else {
				res.redirect('http://localhost:3000/#');
			}
		});
	} else {
		res.redirect('http://localhost:3000/login/');
	}
});

router.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'openid', 'email', 'profile'] }));

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: 'http://localhost:3000/login', session: true }), (req, res) => {
	if (req.user) {
		req.logIn(req.user, err => {
			if (err) {
				console.log(err);
				res.redirect('http://localhost:3000/login/');
			}
			if (req.user.role.includes('new-comer')) {
				res.redirect('http://localhost:3000/register/roles/');
			} else {
				res.redirect('http://localhost:3000/');
			}
		});
	} else {
		res.redirect('http://localhost:3000/login/');
	}
});

router.get('/auth', auth, (req, res) => {
	//여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication이 True 라는 말.
	if (req.user) {
		res.status(200).json({
			_id: req.user._id,
			isAuth: true,
			firstName: req.user.firstName,
			lastName: req.user.lastName,
			email: req.user.email,
			phoneNumber: {
				textmask: req.user.phoneNumber || '(   )    -    ',
				numberformat: '1320',
			},
			streetAddress: req.user.streetAddress,
			streetAddress2nd: req.user.streetAddress2nd,
			city: req.user.city,
			state: req.user.state,
			zip: req.user.zip,
			country: req.user.country,
			role: req.user.role,
			referralLink: req.user.referralLink,
			image: req.user.image,
		});
	} else {
		res.status(400).json({
			isAuth: false,
		});
	}
});

router.get('/logout', auth, (req, res) => {
	User.findOneAndUpdate(
		{ _id: req.user._id },
		{
			token: '',
		},
		(err, user) => {
			{
				if (err) return res.status(400).json({ success: false, err });
				res.clearCookie('express:sess.sig');
				res.clearCookie('express:sess');
				req.logout();
				return res.status(200).json({
					success: true,
				});
			}
		}
	);
});

//Reset Password
router.put('/resetPassword', (req, res) => {
	User.findOne({ email: req.body.email }, (err, user) => {
		if (!user || err) {
			return res.json({
				success: false,
				message: 'No account found.',
			});
		} else {
			user.encryptPassword(req.body.password, (err, hash) => {
				if (err) {
					return res.json({
						success: false,
						err,
					});
				} else {
					user.updateOne(
						{ password: hash },
						(err, response) => {
							if (!response || err) {
								return res.json({
									success: false,
									message: err ? err : 'No account found.',
								});
							} else {
								return res.status(200).json({
									success: true,
								});
							}
						}
					);
				}
			});
		}
	});
});
module.exports = router;
