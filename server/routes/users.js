const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const { auth } = require('../middleware/auth');
const async = require('async');
const crypto = require('crypto');

router.post('/api/users/register', (req, res) => {
	//회원 가입 할때 필요한 정보들을 Client에서 가져오면 그것들을 데이터 베이스에 넣어준다.
	const user = new User(req.body);
	User.findOne({ email: user.email }, (err, user) => {
		if (user) {
			return res.json({
				success: false,
				message: 'Account Already Exists'
			});
		} else {
			user.save((err, userInfo) => {
				if (err) {
					return res.json({
						success: false,
						err
					});
				} else {
					return res.status(200).json({
						success: true
					});
				}
			});
		}
	});
});

router.post('/api/users/login', (req, res) => {
	//요청된 이메일을 데이터베이스에서 찾음.
	User.findOne({ email: req.body.email }, (err, user) => {
		if (!user) {
			return res.json({
				loginSuccess: false,
				message: 'No account found.'
			});
		}
		//요청된 이메일이 데이터 베이스에 있다면 비밀번호가 동일한지 확인.
		user.comparePassword(req.body.password, (err, isMatch) => {
			if (!isMatch)
				return res.json({
					loginSuccess: false,
					message: 'Wrong Password'
				});
			//비밀번호가 동일하면 토큰 생성하기
			user.generateToken((err, user) => {
				if (err) return res.status(400).send(err);

				//토큰을 저장한다. 어디에? 쿠키<, 로컬스토리지, 세션
				res.cookie('x_auth', user.token).status(200).json({
					loginSuccess: true,
					userId: user._id
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
		iamge: req.user.image
	});
});

router.get('/api/users/logout', auth, (req, res) => {
	User.findOneAndUpdate(
		{ _id: req.user._id },
		{
			token: ''
		},
		(err, user) => {
			{
				if (err) return res.json({ success: false, err });
				return res.status(200).send({
					success: true
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
				message: 'No account found.'
			});
		} else {
			user.encryptPassword(req.body.password, (err, hash) => {
				if (err) {
					return res.json({
						success: false,
						err
					});
				} else {
					User.updateOne(user, { password: hash }, (err, response) => {
						if (!response || err) {
							return res.json({
								success: false,
								message: err ? err : 'No account found.'
							});
						} else {
							return res.status(200).json({
								success: true
							});
						}
					});
				}
			});
		}
	});
});
module.exports = router;
