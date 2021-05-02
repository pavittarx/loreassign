import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import "semantic-ui-css/semantic.min.css";
import "./app.scss";

import { LoginUI, RegisterUI } from "./auth/auth";
import { OrdersUI } from "./orders/orders";
import { authenticate } from "./../libs/auth";
import Context from "./context";
import { UnloggedHeaderUI, LoggedInHeaderUI } from "./header";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // 1 - Show Login Form, 0 - Show Create Account Form
  const [formStatus, setFormStatus] = useState(1);

  const value = { isLoggedIn, formStatus, setIsLoggedIn, setFormStatus };

  useEffect(async () => {
    const result = await authenticate();
    console.log(result);
    setIsLoggedIn(result);
  }, [setIsLoggedIn]);

  const MainForm = () => {
    if (formStatus) return <LoginUI />;
    return <RegisterUI />;
  };

  return (
    <Context.Provider value={value}>
      <Router>
        <Switch>
          <Route path="/orders">
            <LoggedInHeaderUI />
            {isLoggedIn ? <OrdersUI /> : <Redirect to="/" />}
          </Route>
          <Route path="/">
            <UnloggedHeaderUI />
            {isLoggedIn ? <Redirect to="/orders" /> : MainForm()}
          </Route>
        </Switch>
      </Router>
    </Context.Provider>
  );
};

export default App;
