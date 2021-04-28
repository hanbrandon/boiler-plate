import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';
import { setSocketUser } from '../components/utils/socketHandler';

export default function (SpecificComponent, option, adminRoute = null) {
	//option
	// null => anyone can open
	// true => logged users only
	// false => logged out users only

	const AuthenticationCheck = (props) => {
		let user = useSelector((state) => state.user);
		const dispatch = useDispatch();

		useEffect(() => {
			dispatch(auth()).then((response) => {
				//로그인 하지 않은 상태
				if (!response.payload.isAuth) {
					if (option) {
						props.history.push('/login');
					}
				} else {
					//로그인 한 상태
					setSocketUser(response.payload);
					if (adminRoute && !response.payload.isAdmin) {
						props.history.push('/');
					} else {
						if (option === false) {
							props.history.push('/');
						}
					}
				}
			});
		}, []);

		return <SpecificComponent {...props} user={user.userData} />;
	};
	return AuthenticationCheck;
}
