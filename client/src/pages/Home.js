import React, { useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/global/Layout';

const HomePage = (props) => {
	useEffect(() => {
		axios.get('/api/hello');
	}, []);

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
				<button onClick={onClickHandler}>Logout</button>
			</div>
		</Layout>
	);
};

export default HomePage;
