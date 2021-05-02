import React, { useState, useContext } from "react";
import { Button } from "semantic-ui-react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";
import "./app.scss";

import { LoginUI, RegisterUI } from "./auth/auth";
import {authenticate} from "./../libs/auth";
import Context from "./context";

const Header = () => {
  const { formStatus, setFormStatus } = useContext(Context);

  const changeFormStatus = () => {
    formStatus? setFormStatus(0) : setFormStatus(1);
  }

  return (
    <section className="header">
      <div className="left-block logo">OrderBook</div>
      <div className="right-block">
        <Button
          primary
          content={formStatus ? "Create Account" : "Login"}
          onClick={changeFormStatus}
        />
      </div>
    </section>
  );
};


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(authenticate());
  // 1 - Show Login Form, 0 - Show Create Account Form
  const [formStatus, setFormStatus] = useState(1);

  console.log(isLoggedIn);

  const value = { isLoggedIn, formStatus, setIsLoggedIn, setFormStatus };

  const MainForm = () => {
    if(formStatus) return <LoginUI />;
    return <RegisterUI />;
  }

  return (
    <Context.Provider value={value}>
      <Header />
      <Router>
        <Switch>
          <Route path="/orders">
            {isLoggedIn? <div> Hello Orders </div> : <Redirect to="/" />}
          </Route>
          <Route path="/">
            {isLoggedIn? <Redirect to="/orders" /> : MainForm() }
          </Route>
        </Switch>
      </Router>
    </Context.Provider>
  );
};

export default App;
