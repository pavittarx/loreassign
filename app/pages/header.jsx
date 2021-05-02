import React, { useContext, useState } from "react";
import { Button } from "semantic-ui-react";

import Context from "./context";
import { AddOrEditOrderModal } from "./orders/orders";

import "semantic-ui-css/semantic.min.css";
import "./app.scss";

const Logo = () => {
  return <div className="left-block logo">OrderBook</div>;
};

// Header to show when user is not logged in
export const UnloggedHeaderUI = () => {
  const { formStatus, setFormStatus } = useContext(Context);

  const changeFormStatus = () => {
    formStatus ? setFormStatus(0) : setFormStatus(1);
  };

  return (
    <section className="header">
      <Logo />
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

export const LoggedInHeaderUI = () => {
  const { setIsLoggedIn } = useContext(Context);
  const [open, setOpen] = useState(false);

  const logout = () => {
    window.localStorage.setItem("token", "");
    setIsLoggedIn(false);
  };

  return (
    <section className="header">
      <Logo />
      <div className="right-block">
        <AddOrEditOrderModal
          open={open}
          setOpen={setOpen}
          trigger={<Button primary content="New Order" />}
        />
        <Button icon="sign-out" onClick={logout} />
      </div>
    </section>
  );
};
