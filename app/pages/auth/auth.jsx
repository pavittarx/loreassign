import React, { useState, useContext } from "react";
import Context from "./../context";

import { Input, Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./auth.scss";

import { login, register } from "./../../libs/auth";
import { Response } from "./../../components/index";

export const LoginUI = () => {
  const { setIsLoggedIn, setFormStatus } = useContext(Context);

  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const onLogin = async () => {
    const result = await login(usernameOrEmail, password);
    setError("");
    setMessage("");
    if (result.error) setError(result.message);
    if (result.success) {
      setMessage(result.message);
      setTimeout(() => setIsLoggedIn(true), 2000);
    }
  };

  return (
    <section className="login-form">
      <Response success={message} error={error} />
      <Input
        fluid
        icon="at"
        iconPosition="left"
        placeholder="Username / Email"
        value={usernameOrEmail}
        onChange={(e) => setUsernameOrEmail(e.target.value)}
      />

      <Input
        icon="key"
        iconPosition="left"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button primary content="Login" onClick={onLogin} />
      <div className="text">
        Don't have an account?{" "}
        <a onClick={() => setFormStatus(0)}> Create One </a>
      </div>
    </section>
  );
};

export const RegisterUI = () => {
  const { setFormStatus } = useContext(Context);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const onRegister = async () => {
    const response = await register(username, email, password);
    setError("");
    setMessage("");
    if (response.error) setError(response.message);
    if (response.success) {
      setMessage(response.message);
      setTimeout(() => setFormStatus(1), 2000);
    }
  };

  return (
    <section className="registration-form">
      <Response success={message} error={error} />
      <Input
        fluid
        icon="at"
        iconPosition="left"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        icon="mail"
        iconPosition="left"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        icon="key"
        iconPosition="left"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button primary content="Create Account" onClick={onRegister} />
      <div className="text">
        Already have an account? <a onClick={() => setFormStatus(1)}> Login </a>
      </div>
    </section>
  );
};
