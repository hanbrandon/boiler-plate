import React from "react";
import "./styles/App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import ForgotPasswordPage from "./pages/ForgotPassword";
import ResetPasswordPage from "./pages/ResetPassword";
import Footer from "./components/global/Footer";

import Auth from "./hoc/auth";

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Auth(HomePage, null)} />
        <Route exact path="/login" component={Auth(LoginPage, false)} />
        <Route exact path="/register" component={Auth(RegisterPage, false)} />
        <Route
          exact
          path="/forgotpassword"
          component={Auth(ForgotPasswordPage, false)}
        />
        <Route path="/reset/:id" component={Auth(ResetPasswordPage, false)} />
      </Switch>
      <Footer></Footer>
    </>
  );
};
export default App;
