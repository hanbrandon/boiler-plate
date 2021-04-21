import React, { useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/global/Layout';

const HomePage = (props) => {
	const user = props.user;
	console.log(user);
	return (
		<Layout history={props.history} user={user}>
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
			</div>
		</Layout>
	);
};

export default HomePage;
