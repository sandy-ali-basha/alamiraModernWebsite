import { Box, Typography, Button, TextField, Alert, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { _AuthApi } from "api/auth";
import img from "../../../assets/images/changePass.png";
import { useTranslation } from "react-i18next";
import LanguageSelector from "components/LanguageSelector";

const ForgetPassword = () => {
  const { t } = useTranslation("auth");

  const schema = yup.object().shape({
    email: yup
      .string()
      .email(t("This must be a valid email"))
      .required(t("Email is required")),
  });

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [timer, setTimer] = useState(0);

  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const onSubmit = async (data) => {
    if (timer === 0) {
      _AuthApi.forgetPass({ email }).then((res) => {
        if (res?.code === 200) {
          setMessage(true);
          setError(false);
          setTimer(60); // Set the timer to 60 seconds
        } else {
          setError(res?.error?.message || t("An unexpected error occurred"));
          setMessage(false);
        }
      });
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", p: 4 }}>
      <Grid container>
        {/* Left Column - Image */}
        <Grid item xs={12} md={6} sx={{ display: { xs: "none", md: "block" } }}>
          <Box
            component="img"
            src={img}
            alt="Reset Password"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Grid>

        {/* Right Column - Form */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            p: 4,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h5" sx={{ mb: 3 }}>
            {t("Reset Your Password")}
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }} color="text.secondary">
            {t("Enter your Email to continue")}
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              type="email"
              fullWidth
              label={t("Email")}
              placeholder={t("Enter your email")}
              size="small"
              sx={{ mb: 2 }}
              {...register("email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            {message && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {t(
                  "We have sent you an email with a link to reset your password. Please check your inbox and follow the instructions to restore access to your account. If you do not see the email in your inbox, please check your spam or junk folder."
                )}
              </Alert>
            )}

            <Button
              disabled={timer > 0}
              fullWidth
              type="submit"
              variant="outlined"
            >
              {timer > 0
                ? `${t("Send Again in")} ${timer}s`
                : t("Send Reset Email")}
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ position: "fixed", bottom: ".625rem", right: ".625rem" }}>
        <LanguageSelector />
      </Box>
    </Box>
  );
};

export default ForgetPassword;
