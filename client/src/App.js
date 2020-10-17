import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from './components/views/LandingPage';
import LoginPage from './components/views/LoginPage';
import RegisterPage from './components/views/RegisterPage';
import ForgotPasswordPage from './components/views/ForgotPasswordPage';
import ResetPasswordPage from './components/views/ResetPasswordPage';

import Auth from './hoc/auth';

const App = () => {
	return (
		<Router>
			<div>
				<Switch>
					<Route exact path='/' component={Auth(LandingPage, null)} />
					<Route exact path='/login' component={Auth(LoginPage, false)} />
					<Route exact path='/register' component={Auth(RegisterPage, false)} />
					<Route exact path='/forgotpassword' component={Auth(ForgotPasswordPage, false)} />
					<Route path='/reset/:id' component={Auth(ResetPasswordPage, false)} />
				</Switch>
			</div>
		</Router>
	);
};
export default App;
