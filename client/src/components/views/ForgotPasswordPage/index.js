import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		marginBottom: theme.spacing(20),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1)
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
		backgroundColor: '#B42025',
		border: '1px solid #B42025',

		'&:hover': {
			backgroundColor: 'white',
			color: '#B42025'
		}
	}
}));
const ForgotPassword = () => {
	// const dispatch = useDispatch();
	const [ Email, setEmail ] = useState('');
	const [ Warning, setWarning ] = useState({
		message: '',
		type: ''
	});
	const classes = useStyles();

	const onEmailHandler = (e) => {
		setEmail(e.currentTarget.value);
	};

	const onSubmitHandler = (e) => {
		e.preventDefault();

		let body = {
			email: Email
		};

		axios.post('/api/reset/forgotpassword', body).then((response) => {
			if (response.data.success) {
				setWarning({
					message: 'We have just sent you a link to reset your password. This link is valid for 30 minues!',
					type: 'success'
				});
				/* props.history.push(`property/${response.data.id}`); */
			} else {
				setWarning({ message: 'No account found!', type: 'error' });
			}
		});
	};

	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component='h1' variant='h5'>
					Forgot Password?
				</Typography>
				<form className={classes.form} onSubmit={onSubmitHandler}>
					{/* <Grid item xs={12}> */}
					<Alert severity={Warning.type}>{Warning.message}</Alert>
					{/* </Grid> */}
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						id='email'
						label='Email Address'
						name='email'
						autoComplete='email'
						autoFocus
						value={Email}
						onChange={onEmailHandler}
					/>
					<Link to='/login'>Do you have account?</Link>
					<br />
					<Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
						Email Reset Link
					</Button>
				</form>
			</div>
		</Container>
	);
};

export default ForgotPassword;
