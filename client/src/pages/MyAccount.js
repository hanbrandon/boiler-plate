import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Modal, Form, Alert } from 'react-bootstrap';
import Layout from '../components/global/Layout';
import PhoneInput from 'react-phone-input-2';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const MyAccountPage = props => {
	const user = props.user;
	const [open, setOpen] = useState(false);
	const [curUser, setCurUser] = useState({
		email: '',
		password: '',
		firstName: '',
		lastName: '',
		phoneNumber: '',
		streetAddress: '',
		streetAddress2nd: '',
		city: '',
		state: '',
		zip: '',
		country: '',
		role: '',
		subscribe: true,
	});

	const handleChangeSubscription = event => {
		setCurUser({ ...curUser, ['subscribe']: !curUser.subscribe });
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const [password, setPassword] = useState({
		newPass: '',
		confirmPass: '',
	});
	const [AlertText, setAlertText] = useState({
		message: '',
		type: '',
	});

	const fetch = async () => {
		return await axios.get(`/api/users/my-account/`).then(res => {
			if (res.data && res.data.success) {
				console.log(res.data.user);
				setCurUser({ ...curUser, ...res.data.user });
			} else {
				setAlertText({
					message: 'Failed to fetch user data.',
					type: 'danger',
				});
			}
		});
	};

	useEffect(() => {
		console.log(user);
		if (user && user.isAuth === true && user._id) {
			console.log(user);

			fetch();
		}
	}, [user]);

	const onPasswordHandler = e => {
		const { name, value } = e.target;
		setPassword({ ...password, [name]: value });
	};

	const onFieldsHandler = e => {
		const { name, value } = e.target;
		setCurUser({ ...curUser, [name]: value });
	};

	const phoneNumberHandler = e => {
		setCurUser({ ...curUser, phoneNumber: e });
	};

	const onSubmitHandler = e => {
		e.preventDefault();

		let body = {};
		if (password.newPass || password.confirmPass) {
			if (password.newPass !== password.confirmPass) {
				return setAlertText({
					message: 'Password and confirm password do not match.',
					type: 'danger',
				});
			} else {
				body = { ...curUser, password: password.newPass };
			}
		} else {
			body = { ...curUser };
		}

		axios.put('/api/users/update', body).then(response => {
			if (response.data.success) {
				setAlertText({
					message: 'Account updated successfully.',
					type: 'success',
				});
			} else {
				setAlertText({
					message: 'Failed to update user information.',
					type: 'danger',
				});
			}
		});
	};

	const handleDelete = e => {
		axios.delete(`/api/users/delete/`).then(res => {
			if (res.data && res.data.success) {
				props.history.push('/');
			} else {
				setAlertText({
					message: 'Failed to delete account.',
					type: 'danger',
				});
			}
		});
	};

	return (
		<Layout history={props.history} user={user}>
			<Container fluid className="m-26px p-0" id="dashboard-board">
				<Row className="p-0 m-0">
					<Col xs={12} className="p-0">
						<div id="dashboard-form">
							<Form onSubmit={onSubmitHandler}>
								<Row className="">
									<Col>
										<span className="d-block font-weight-500 w-100">My Account Information</span>
										{AlertText.message ? (
											<Col xs={12} className="py-1 p-0">
												<Alert className="form-input" variant={AlertText.type}>
													{AlertText.message}
												</Alert>
											</Col>
										) : null}
									</Col>
								</Row>
								<Row>
									<Col md={6} className="pr-md-0">
										<Form.Control type="text" value={curUser.lastName} placeholder="Last Name" name="lastName" onChange={onFieldsHandler} />
									</Col>
									<Col md={6}>
										<Form.Control type="text" value={curUser.firstName} placeholder="First Name" name="firstName" onChange={onFieldsHandler} />
									</Col>
								</Row>
								<Form.Control id="email" placeholder="Email Address" name="email" value={curUser.email} onChange={onFieldsHandler} />
								<PhoneInput
									specialLabel={false}
									country="us"
									onlyCountries={['us']}
									disableDropdown
									disableCountryCode
									value={curUser?.phoneNumber ? curUser.phoneNumber.toString() : ''}
									placeholder={'Phone Number'}
									name="phoneNumber"
									id="phonenumber"
									onChange={phoneNumberHandler}
								/>
								<Row>
									<Col md={6} className="pr-md-0">
										<Form.Control type="text" value={curUser.streetAddress} onChange={onFieldsHandler} name="streetAddress" placeholder="Street Address" />
									</Col>
									<Col md={6}>
										<Form.Control
											type="text"
											value={curUser.streetAddress2nd}
											onChange={onFieldsHandler}
											name="streetAddress2nd"
											placeholder="Street Address Line 2"
										/>
									</Col>
								</Row>
								<Row>
									<Col md={4}>
										<Form.Control type="text" value={curUser.city ? curUser.city : ''} onChange={onFieldsHandler} name="city" placeholder="City" />
									</Col>
									<Col md={4} className="px-md-0">
										<Form.Control type="text" value={curUser.state ? curUser.state : ''} onChange={onFieldsHandler} name="state" placeholder="State" />
									</Col>
									<Col md={4}>
										<Form.Control type="text" value={curUser.zip ? curUser.zip : ''} onChange={onFieldsHandler} name="zip" placeholder="Zip Code" />
									</Col>
								</Row>

								<span className="d-block font-weight-500 w-100 mt-10px">Account Password</span>
								<Form.Control
									name="newPass"
									placeholder="New Password"
									type="password"
									id="newPassword"
									autoComplete="new-password"
									value={password.newPass}
									onChange={onPasswordHandler}
								/>
								<Form.Control
									name="confirmPass"
									placeholder="Confirm Password"
									type="password"
									id="confirmPassword"
									value={password.confirmPass}
									onChange={onPasswordHandler}
								/>

								<span className="d-block font-weight-500 w-100 mt-10px">Email Subscription Status</span>

								{/* email subscription button */}
								<FormControlLabel
									control={<Switch checked={curUser.subscribe} onChange={handleChangeSubscription} />}
									label={curUser.subscribe ? 'Subscription On' : 'Subscription Off'}
								/>
								<br />
								<Button type="submit" className="primary-button mt-20px mr-20px w-sm-100">
									Update Account
								</Button>

								<Button className="primary-button mt-20px " onClick={handleClickOpen}>
									Delete Account
								</Button>

								<Modal show={open} onHide={handleClose} centered>
									<Modal.Header closeButton>
										<Modal.Title>Are you sure you want to DELETE?</Modal.Title>
									</Modal.Header>
									<Modal.Body>
										<Container className="bg-white px-0">
											<p>If you confirm, you CANNOT restore your account again.</p>
											<div className="button-wrapper mt-2">
												<Button onClick={handleDelete} className="primary-button  mr-3">
													Delete
												</Button>
												<Button onClick={handleClose} className="primary-button  mr-3">
													Cancel
												</Button>
											</div>
										</Container>
									</Modal.Body>
								</Modal>
							</Form>
						</div>
					</Col>
				</Row>
			</Container>
		</Layout>
	);
};

export default MyAccountPage;
