import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useDispatch } from 'react-redux';
import { loginUser } from '../_actions/user_action';
import { Link } from 'react-router-dom';
import { auth } from '../_actions/user_action';

/* material UI */
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		marginBottom: theme.spacing(20),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
		backgroundColor: '#B42025',
		border: '1px solid #B42025',

		'&:hover': {
			backgroundColor: 'white',
			color: '#B42025',
		},
	},
}));

const ResetPasswordPage = (props) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const token = props.match.params.id;
	const [Email, setEmail] = useState('');
	const [Password, setPassword] = useState({
		newPass: '',
		confirmPass: '',
	});

	useEffect(() => {
		axios.get(`/api/reset/getEmail/${token}`).then((res) => {
			if (res.data && res.data.user) {
				setEmail(res.data.user.email);
			} else {
				alert('Expired Password Reset Link');
			}
		});
	}, []);

	const onPasswordHandler = (e) => {
		const { name, value } = e.target;
		setPassword({ ...Password, [name]: value });
	};

	const onSubmitHandler = (e) => {
		e.preventDefault();

		if (Password.newPass !== Password.confirmPass) {
			return alert('Password and confirm password do not match');
		}

		let body = {
			email: Email,
			password: Password.newPass,
		};

		axios.put('/api/users/resetPassword', body).then((response) => {
			if (response.data.success) {
				props.history.push(`/login/`);
			} else {
				alert('Failed to update password');
			}
		});
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Reset Password
				</Typography>
				<form className={classes.form} onSubmit={onSubmitHandler}>
					<Grid item xs={12}>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="newPass"
							label="New Password"
							type="password"
							id="password"
							value={Password.newPass}
							onChange={onPasswordHandler}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							variant="outlined"
							required
							margin="normal"
							fullWidth
							name="confirmPass"
							label="Confirm Password"
							type="password"
							id="confirmPass"
							value={Password.confirmPass}
							onChange={onPasswordHandler}
						/>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Reset
					</Button>
				</form>
			</div>
		</Container>
	);
};

export default ResetPasswordPage;
