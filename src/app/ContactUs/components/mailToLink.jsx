 

import React from "react";
import Button from "@mui/material/Button";

const MailToLink = ({ text, email }) => {
  const handleMailTo = () => {
    window.location.href = "mailto:" + email;
  };

  return (
    <Button color="secondary" onClick={() => handleMailTo()}>
      {text}
    </Button>
  );
};

export default MailToLink;
