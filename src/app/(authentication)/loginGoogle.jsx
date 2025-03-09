import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { _AuthApi } from "api/auth";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { Google } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

function LoginButton() {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      _AuthApi
        .getUserData(tokenResponse)
        .then((res) => {
          console.log("Response received:", res);
          localStorage.setItem("userData", JSON.stringify(res?.data));
          _AuthApi.storeToken(res?.data?.token);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        })
        .finally(() => {
          navigate("/");
        });
    },
    onError: (error) => {
      console.log("Login Failed:", error);
    },
    scope:
      "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
  });

  const { t } = useTranslation("index");

  return (
    <Button
      sx={{ background: "white", color: "text.primary" }}
      startIcon={<Google />}
      onClick={() => login()}
    >
      {t("Login with Google")}
    </Button>
  );
}

export default LoginButton;
