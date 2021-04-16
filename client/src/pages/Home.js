import React, { useEffect } from 'react';
import axios from 'axios';
import { logout } from '../_actions/auth';

const HomePage = (props) => {
	const onClickHandler = () => {
		axios.get(`/api/users/logout`).then((response) => {
			if (response.data.success) {
				props.history.push('/login');
			} else {
				alert('logout fail');
			}
		});
	};

	return (
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
			<button onClick={() => logout().then(() => props.history.push(`/login`))}>Logout</button>
		</div>
	);
};

export default HomePage;
