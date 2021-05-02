import React from "react";

const initialState = {
  isLoggedIn: false,
  formStatus: 0,

  setIsLoggedIn: () => {},
  setFormStatus: () => {}
}

export default React.createContext(initialState);