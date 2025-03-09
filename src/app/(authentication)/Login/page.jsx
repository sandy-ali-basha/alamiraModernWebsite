import { Box, Button, TextField, Typography, Alert, Grid } from "@mui/material";
import React from "react";
import img from "../../../assets/images/hero-image (3).jpg";
import logo from "../../../assets/images/logo.png";
import ButtonLoader from "components/customs/ButtonLoader";
import { useLogin } from "./hooks/useLogin";
import { Link } from "react-router-dom";

export default function Login() {
  const { errors, register, t, handleSubmit, onSubmit, loading, error } =
    useLogin();

  return (
    <Grid container sx={{ overflow: "hidden" }}>
      <Grid
        item
        md="7"
        sx={{ display: ["none", "none", "block"], height: "100vh" }}
      >
        <img
          src={img}
          alt="gummie"
          quality={100}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Grid>
      <Grid item md="5">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "stretch",
            flexDirection: "column",
            px: 6,
            height: "100%",
            mt: [2, 2, 0],
          }}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <img
            style={{ width: "10%", marginBottom: "3vh" }}
            src={logo}
            alt="logo"
          />
          <Typography variant="h5" color="initial" sx={{ mb: 2 }}>
            {t("Log in to your account")}{" "}
          </Typography>
          <Box>
            <TextField
              sx={{ mt: 1, width: "100%" }}
              placeholder="Email"
              label="Email"
              variant="outlined"
              type="email"
              size="small"
              {...register("email", { validate: true })}
              error={errors?.email?.message}
              helperText={errors?.email?.message || ""}
            />
          </Box>
          <Box>
            <TextField
              variant="outlined"
              sx={{ mt: 1, width: "100%" }}
              placeholder="Password"
              type="password"
              label="Password"
              size="small"
              {...register("password")}
              error={errors?.password?.message}
              helperText={errors?.password?.message || ""}
            />
          </Box>
          {loading ? (
            <ButtonLoader
              sx={{
                display: "block",
                mt: 2,
                mb: 1,
              }}
              disableOnLoading
              loading={true}
              disabled={loading}
              fullWidth
            >
              {t("Waiting")}..
            </ButtonLoader>
          ) : (
            <Button
              sx={{
                display: "block",
                mt: 2,
                mb: 1,
              }}
              disabled={loading}
              fullWidth
              type="submit"
              variant="outlined"
            >
              {t("Log In")}
            </Button>
          )}
          {error?.errors && Object.keys(error?.errors).length > 0 && (
            <div>
              {Object.keys(error?.errors).map((key, idx) => (
                <Alert key={idx} severity="error">
                  {error?.errors[key]}
                </Alert>
              ))}
            </div>
          )}
          {error && <Alert severity="error">{error}</Alert>}
          {/* <Divider>{t("OR")}</Divider> */}

          {/* <LoginComponent /> */}
          <Box sx={{ mt: 2 }}>
            <Box>
              <Typography sx={{ mt: 2 }} variant="body2" color="text.secondary">
                {t("Having trouble logging in?")}
              </Typography>
              <Link
                sx={{
                  textDecoration: "underline",
                  color: "text.primary",
                }}
                to="/forget-Password"
              >
                {t("Forget Password")}
              </Link>
            </Box>
            <Box>
              <Typography sx={{ mt: 2 }} variant="body2" color="text.secondary">
                {t("Don't have account")} ?
              </Typography>
              <Link
                sx={{
                  textDecoration: "underline",
                  color: "text.primary",
                }}
                to="/signUp"
              >
                {t("Register")}
              </Link>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
