import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";
import "./app.scss";

import { LoginUI, RegisterUI } from "./auth/auth";
import Context from "./context";

const Header = () => {
  return (
    <section className="header">
      <div className="left-block logo">OrderBook</div>
      <div className="right-block">
        <Button primary content="Create Account" />
      </div>
    </section>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // 1 - Show Login Form, 0 - Show Create Account Form
  const [formStatus, setFormStatus] = useState(0);

  const value = {isLoggedIn, formStatus, setIsLoggedIn, setFormStatus};

  return (
    <Context.Provider value={value}>
      <Header />
      <Router> 
        <Switch>
          <Route path="/">
            { formStatus? <LoginUI /> : <RegisterUI /> }
          </Route>
        </Switch>
      </Router>
      </Context.Provider>
  );
};

export default App;
