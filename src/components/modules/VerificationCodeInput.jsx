import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const VerificationCodeInput = () => {
  const [verificationCode, setVerificationCode] = useState(
    new Array(6).fill("")
  );
  const [counter, setCounter] = useState(30); // Set initial countdown time (in seconds)
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (counter > 0) {
      const timer = setInterval(() => {
        setCounter((prevCounter) => prevCounter - 1);
      }, 1000);
      return () => clearInterval(timer); // Clear the timer when the component is unmounted
    } else {
      setCanResend(true); // Enable resend button when counter reaches zero
    }
  }, [counter]);

  const handleVerificationCodeChange = (event, index) => {
    const newCode = [...verificationCode];
    newCode[index] = event.target.value;
    setVerificationCode(newCode);

    // Move focus to the next input field if the current field is filled
    if (event.target.value && index < 5) {
      document.getElementById(`digit-${index + 1}`).focus();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const code = verificationCode.join("");
    console.log("Verification code submitted:", code);
    // Add your code verification logic here
  };

  const handleResend = () => {
    setCounter(30); // Reset the counter
    setCanResend(false);
    console.log("Resend code requested");
    // Add your resend code logic here
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" justifyContent="center" alignItems="center">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <TextField
            key={index}
            id={`digit-${index}`}
            variant="outlined"
            value={verificationCode[index]}
            onChange={(e) => handleVerificationCodeChange(e, index)}
            inputProps={{
              maxLength: 1,
              inputMode: "numeric",
              style: { textAlign: "center" },
            }}
            size="small"
            style={{ marginLeft: "0.3rem", width: "3rem" }}
          />
        ))}
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="body2" style={{ marginTop: "1rem" }}>
          {canResend ? (
            <Button onClick={handleResend} variant="text" color="primary">
              Resend Code
            </Button>
          ) : (
            `Resend code in ${counter} seconds`
          )}
        </Typography>
        <Button
          type="submit"
           variant="outlined"
          color="primary"
          sx={{ mt: 3 }}
        >
          Verify
        </Button>
      </Box>
    </form>
  );
};

export default VerificationCodeInput;
