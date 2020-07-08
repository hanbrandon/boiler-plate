import React, { useEffect } from 'react';
import axios from 'axios';

const LandingPage = () => {
	useEffect(() => {
		axios.get('/api/hello');
	}, []);
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				width: '100%',
				height: '100vh'
			}}
		>
			<h2>Landing Page</h2>
		</div>
	);
};

export default LandingPage;
