import React from 'react';
import './styles/App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import ForgotPasswordPage from './pages/ForgotPassword';
import ResetPasswordPage from './pages/ResetPassword';

import Auth from './hoc/auth';

const App = () => {
	return (
		<Router>
			<div>
				<Switch>
					<Route exact path="/" component={Auth(HomePage, null)} />
					<Route
						exact
						path="/login"
						component={Auth(LoginPage, false)}
					/>
					<Route
						exact
						path="/register"
						component={Auth(RegisterPage, false)}
					/>
					<Route
						exact
						path="/forgotpassword"
						component={Auth(ForgotPasswordPage, false)}
					/>
					<Route
						path="/reset/:id"
						component={Auth(ResetPasswordPage, false)}
					/>
				</Switch>
			</div>
		</Router>
	);
};
export default App;
