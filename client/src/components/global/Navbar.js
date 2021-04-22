import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { logout } from '../../_actions/auth';

const Navbar = props => {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<Link className="navbar-brand" to={'/'}>
				LOGO
			</Link>
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarSupportedContent"
				aria-controls="navbarSupportedContent"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon"></span>
			</button>

			<div className="collapse navbar-collapse" id="navbarSupportedContent">
				<ul className="navbar-nav mr-auto">
					<li className="nav-item active">
						<Link className="nav-link" to={'/'}>
							Home
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to={'/login'}>
							Login
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to={'/register'}>
							Register
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to={'/my-account'}>
							My Account
						</Link>
					</li>
				</ul>

				<button className="btn btn-outline-success my-2 my-sm-0" onClick={() => logout().then(() => props.history.push(`/login`))}>
					Logout
				</button>
			</div>
		</nav>
	);
};

export default Navbar;
