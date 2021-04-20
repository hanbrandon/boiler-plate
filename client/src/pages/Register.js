import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../_actions/user_action";
import { Container, Row, Col, Alert } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const RegisterPage = (props) => {
  // const dispatch = useDispatch();

  const [User, setUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });

  const onUserHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...User, [name]: value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (User.password !== User.confirmPassword) {
      return alert("password and confirm password do not match");
    }
    let body = {
      email: User.email,
      name: User.name,
      password: User.password,
    };

    console.log(User);
    console.log(Subscribe);
    console.log(Policy);

    // dispatch(registerUser(body)).then((response) => {
    //   if (response.payload.success) {
    //     props.history.push("/login");
    //   } else {
    //     alert("Failed to sign up");
    //   }
    // });
  };

  const [Subscribe, setSubscribe] = useState(false);
  const [Policy, setPolicy] = useState(false);
  const [Warning, setWarning] = useState({
    message: "",
    type: "",
  });

  const onPolicyHandler = (e) => {
    Policy ? setPolicy(false) : setPolicy(true);
  };

  const onSubscribeHandler = (e) => {
    Subscribe ? setSubscribe(false) : setSubscribe(true);
  };
  return (
    <div id="register">
      <Container components="main" maxWidth="xs">
        <form onSubmit={onSubmitHandler}>
          <Grid container spacing={2}>
            {Warning.message ? (
              <Grid witem xs={12}>
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
                value={User.firstName}
                onChange={onUserHandler}
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
                value={User.lastName}
                onChange={onUserHandler}
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
                value={User.email}
                onChange={onUserHandler}
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
                value={User.password}
                onChange={onUserHandler}
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
                value={User.confirmPassword}
                onChange={onUserHandler}
              />
            </Grid>
            <Grid item xs={12} className="checkbox">
              <FormControlLabel
                className="checkbox"
                control={
                  <Checkbox
                    className="checkbox"
                    value={Subscribe}
                    color="primary"
                    onChange={onSubscribeHandler}
                  />
                }
                label="Subscribe to our newsletter."
              />
            </Grid>
            <Grid item xs={12} className="mb-3">
              <FormControlLabel
                className="checkbox"
                control={
                  <Checkbox
                    className="checkbox"
                    value={Policy}
                    onChange={onPolicyHandler}
                    color="primary"
                  />
                }
                label={
                  <span>
                    I accept the{" "}
                    <Link to={"/terms-and-conditions"} target="_blank">
                      Terms and conditions
                    </Link>{" "}
                    <span href="someLink"></span>
                    and{" "}
                    <Link to={"/privacy-policy"} target="_blank">
                      Privacy Policy
                    </Link>
                  </span>
                }
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item className="mt-1">
              Already have an account?&nbsp;
              <Link to="/login" variant="body2">
                Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};

export default RegisterPage;
