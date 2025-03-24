import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  InputAdornment,
  IconButton,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React from "react";

import img from "../../../assets/images/image (3).jpg";
import logo from "../../../assets/images/logo.png";
import { useSignUp } from "./_hooks/useSignUp";
import ButtonLoader from "components/customs/ButtonLoader";
import GenderSelect from "components/customs/GenderSelect";
import { Link } from "react-router-dom";
function SignUp() {
  const {
    register,
    handleSubmit,
    loading,
    errors,
    details,
    showPassword,
    handleTogglePasswordVisibility,
    error,
    onSubmit,
    t,
  } = useSignUp();

  return (
    <Grid container>
      <Grid
        item
        md="6"
        sx={{
          display: { md: "flex", xs: "none" },
          alignItems: "center",
          justifyContent: "center",
        }}
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
      <Grid item md="6">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            textAlign: "center",
            minHeight: "100vh",
            py: 5,
            px: [2, 5, 10],
            background: "white",
          }}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <img
            style={{ margin: "auto", width: "25%", mb: 1 }}
            src={logo}
            alt="logo"
          />
          <Typography
            variant="h5"
            color="initial"
            sx={{ textAlign: "center", mb: 2 }}
          >
            {t("create new account")}{" "}
          </Typography>

          <Box onSubmit={handleSubmit(onSubmit)} component="form">
            <Grid container spacing={1}>
              {details.map((item, index) => (
                <Grid
                  item
                  xs={
                    (item.name === "first_name") | (item.name === "last_name")
                      ? "6"
                      : "12"
                  }
                  sx={{ mb: 1 }}
                  key={index}
                >
                  <TextField
                    sx={{ width: "99%" }}
                    size="small"
                    type={
                      item.type === "password"
                        ? showPassword
                          ? "text"
                          : "password"
                        : item.type
                    }
                    placeholder={item.placeholder}
                    label={item.placeholder}
                    name={item.name}
                    {...register(item.register)}
                    error={!!errors[item.error]?.message}
                    helperText={errors[item.helperText]?.message || ""}
                    InputProps={{
                      autoComplete: false,
                      endAdornment: (
                        <InputAdornment position="end">
                          {item.type === "password" && (
                            <IconButton
                              onClick={handleTogglePasswordVisibility}
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          )}
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              ))}

              <Grid item xs={12}>
                <GenderSelect register={register} errors={errors} />
              </Grid>
            </Grid>
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
              {t("Waiting..")}
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
              {t("Sign Up")}
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
          {/* <Divider>{t("OR")}</Divider> */}
          {/* <LoginComponent /> */}
          <Box>
            <Typography
              sx={{ textAlign: "center", mt: 2 }}
              variant="body2"
              color="text.secondary"
            >
              {t("already have an account")} ?
            </Typography>
            <Link
              sx={{
                textAlign: "center",
                textDecoration: "underline",
                color: "text.primary",
              }}
              to="/Login"
            >
              {t("Log In")}
            </Link>
          </Box>
        </Box>
        {/* <ConfirmPhoneNum open={open} setOpen={setOpen} id={2} /> */}
        {/* <Box sx={{ position: "fixed", bottom: "10px", right: "10px" }}>
        <LanguageSelector />
      </Box> */}
      </Grid>
    </Grid>
  );
}

export default SignUp;
