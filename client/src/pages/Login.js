import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../_actions/auth';
import Layout from '../components/global/Layout';

/* import ReCAPTCHA from 'react-google-recaptcha'; */

/* Material UI */
import TextField from '@material-ui/core/TextField';
import { Container, Row, Col, Button, Image, Alert } from 'react-bootstrap';

/* const REACT_APP_RECAPTCHA_KEY = process.env.REACT_APP_RECAPTCHA_KEY; */

const LoginPage = (props) => {
	const [User, setUser] = useState({
		email: '',
		password: '',
	});
	const [Warning, setWarning] = useState({
		message: '',
		type: '',
	});

	const onUserHandler = (e) => {
		const { name, value } = e.target;
		setUser({ ...User, [name]: value });
	};

	const onSubmitHandler = async (e) => {
		e.preventDefault();

		let body = {
			email: User.email,
			password: User.password,
		};

		login(body).then(({ data }) => {
			if (data && data.error) {
				setWarning({ type: 'danger', message: data.error });
			} else {
				// save user token to cookie
				// save user info to localstorage
				// authenticate user
				if (data?.user?.isAuth) {
					console.log(data?.user);
					props.history.push('/');
				} else {
					setWarning({
						type: 'danger',
						message: 'Invalid Email or Password.',
					});
				}
			}
		});
	};

	return (
		<Layout history={props.history}>
			<Container fluid id="login-form">
				<Row className="form-paper">
					<Col>
						<Link href="/">
							<Image
								className="form-logo"
								src="/logos/cozmo_black.png"
							/>
							=
						</Link>
					</Col>
					<h1 className="form-title">Login</h1>
					<form className="form-wrapper" onSubmit={onSubmitHandler}>
						{Warning.message ? (
							<Alert variant={Warning.type}>
								{Warning.message}
							</Alert>
						) : null}
						<Col className="form-input p0">
							<TextField
								variant="outlined"
								margin="none"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								autoFocus
								value={User.email}
								onChange={onUserHandler}
							/>
						</Col>
						<Col className="form-input p0">
							<TextField
								variant="outlined"
								margin="none"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								value={User.password}
								onChange={onUserHandler}
							/>
						</Col>
						<Col className="form-input p0">
							<Button
								type="submit"
								size="lg"
								block
								className="solid"
							>
								Sign In
							</Button>
						</Col>
						<Col className="form-input p0">
							<h5>or sign in with</h5>
						</Col>
						<Col>
							<Row className="oauth-logins">
								<Col xs={12} sm={6} className="form-input p0">
									<Button
										size="lg"
										block
										className="solid facebook-button"
										href="http://localhost:5000/api/users/auth/facebook"
									>
										FACEBOOK
									</Button>
								</Col>
								<Col xs={12} sm={6} className="form-input p0">
									<Button
										size="lg"
										block
										className="solid google-button"
										href="http://localhost:5000/api/users/auth/google"
									>
										GOOGLE
									</Button>
								</Col>
							</Row>
						</Col>
						<Col>
							<Row>
								<Col xs={12} className="form-input p0">
									Don't have an account?&nbsp;&nbsp;
									<Link href="/register" variant="body2">
										Sign Up
									</Link>
								</Col>
								<Col xs={12} className="p0">
									<Link
										href="/forgot-password"
										variant="body2"
									>
										Forgot password?
									</Link>
								</Col>
							</Row>
						</Col>
					</form>
					{/* 
				<ReCAPTCHA sitekey={REACT_APP_RECAPTCHA_KEY} size="invisible" ref={reRef} /> */}
				</Row>
			</Container>
		</Layout>
	);
};

export default LoginPage;
