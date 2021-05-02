import React from "react";

import {Message} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

export const Response = ({ success, error }) => {
  return (
    <>
      {success ? <Message positive> {success}</Message> : null}
      {error ? <Message negative>{error}</Message> : null}
    </>
  );
};

export default Response;