import React, { useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/global/Layout';
import { logout } from '../_actions/auth';

const HomePage = (props) => {
	return (
		<Layout history={props.history}>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					width: '100%',
					height: '100vh',
				}}
			>
				<h2>Landing Page</h2>
				<button
					onClick={() =>
						logout().then(() => props.history.push(`/login`))
					}
				>
					Logout
				</button>
			</div>
		</Layout>
	);
};

export default HomePage;
