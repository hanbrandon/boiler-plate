import React from 'react';
import Navbar from './Navbar';

const Layout = (props) => {
	// const { children, currentUserData } = props;
	const { children } = props;
	const user = props.user;

	return (
		<div className="d-flex">
			<section id="layout" className="w-100">
				{/* <Navbar
					currentUserData={currentUserData}
					history={props.history}
				></Navbar> */}
				<Navbar
					// currentUserData={currentUserData}
					history={props.history}
					user={user}
				></Navbar>
				{children}
			</section>
		</div>
	);
};

export default Layout;
