import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../_actions/user_action";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { makeStyles, withStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  paper: {
    [theme.breakpoints.down("xs")]: {
      paddingTop: theme.spacing(10),
      paddingBottom: theme.spacing(20),
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#03946d",
    border: "1px solid #03946d",
    borderRadius: "0",
    "&:hover": {
      backgroundColor: "#fafafa",
      color: "#03946d",
    },
  },
  terms: {
    paddingTop: "0 !important",
    paddingBottom: "0 !important",
  },
  formControl: {
    marginTop: "0 !important",
    marginBottom: "0 !important",
  },
}));

const RegisterPage = (props) => {
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };

  const onNameHandler = (e) => {
    setName(e.currentTarget.value);
  };

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };

  const onConfirmPasswordHandler = (e) => {
    setConfirmPassword(e.currentTarget.value);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (Password !== ConfirmPassword) {
      return alert("password and confirm password do not match");
    }
    let body = {
      email: Email,
      name: Name,
      password: Password,
    };

    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        props.history.push("/login");
      } else {
        alert("Failed to sign up");
      }
    });
  };

  const classes = useStyles();
  const [Warning, setWarning] = useState({
    message: "",
    type: "",
  });
  const [Policy, setPolicy] = useState(false);
  const onPolicyHandler = (e) => {
    Policy ? setPolicy(false) : setPolicy(true);
  };
  return (
    <div id="register">
      <Container components="main" maxWidth="xs">
        <form className={classes.form} onSubmit={onSubmitHandler}>
          <Grid container spacing={2}>
            {Warning.message ? (
              <Grid item xs={12}>
                <Alert severity={Warning.type}>{Warning.message}</Alert>
              </Grid>
            ) : null}
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                //   value={User.firstName}
                // onChange={onUserHandler}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                //   value={User.lastName}
                //   onChange={onUserHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                //   value={User.email}
                onChange={onEmailHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={Password}
                onChange={onPasswordHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirm-password"
                value={ConfirmPassword}
                onChange={onConfirmPasswordHandler}
              />
            </Grid>
            <Grid item xs={12} className={classes.terms}>
              <FormControlLabel
                className={classes.formControl}
                control={
                  <Checkbox
                    //   value={Subscribe}
                    //   onChange={onSubscribeHandler}
                    color="primary"
                  />
                }
                label="Subscribe to our newsletter."
              />
            </Grid>
            <Grid item xs={12} className={classes.terms}>
              <FormControlLabel
                className={classes.formControl}
                control={
                  <Checkbox
                    value={Policy}
                    onChange={onPolicyHandler}
                    color="primary"
                  />
                }
                label={
                  <span>
                    I accept the{" "}
                    <Link to={"/terms-and-conditions"}>
                      Terms and conditions
                    </Link>{" "}
                    and <Link to={"/privacy-policy"}>Privacy Policy</Link>
                  </span>
                }
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            //   className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              Already have an account?&nbsp;
              <Link to="/login" variant="body2">
                Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </Container>
      {/* <form className="form-wrapper" onSubmit={onSubmitHandler}>
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />
        <label> Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <label> Confirm Password</label>
        <input
		type="password"
		value={ConfirmPassword}
		onChange={onConfirmPasswordHandler}
        />
        <br />
        <button>Register</button>
      </form> */}
    </div>
  );
};

export default RegisterPage;
