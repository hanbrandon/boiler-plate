import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { logout } from '../../_actions/auth';

const Navbar = (props) => {
	return (
		<nav class="navbar navbar-expand-lg navbar-light bg-light">
			<Link class="navbar-brand" to={'/'}>
				LOGO
			</Link>
			<button
				class="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarSupportedContent"
				aria-controls="navbarSupportedContent"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav mr-auto">
					<li class="nav-item active">
						<Link class="nav-link" to={'/'}>
							Home
						</Link>
					</li>
					<li class="nav-item">
						<Link class="nav-link" to={'/login'}>
							Login
						</Link>
					</li>
					<li class="nav-item">
						<Link class="nav-link" to={'/register'}>
							Register
						</Link>
					</li>
				</ul>

				<button
					class="btn btn-outline-success my-2 my-sm-0"
					onClick={() =>
						logout().then(() => props.history.push(`/login`))
					}
				>
					Logout
				</button>
			</div>
		</nav>
	);
};

export default Navbar;
