import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import InputAdornment from "@mui/material/InputAdornment";
import * as yup from "yup";
import Icon from "components/modules/icon";
import { Alert, TextField } from "@mui/material";
import { _AuthApi } from "api/auth";
import { useTranslation } from "react-i18next";

const defaultValues = {
  newPassword: "",
  currentPassword: "",
  confirmNewPassword: "",
};

const ChangePasswordCard = () => {
  const [values, setValues] = useState({
    showNewPassword: false,
    showCurrentPassword: false,
    showConfirmNewPassword: false,
  });
  const [Message, setMessage] = useState();
  const [Error, setError] = useState(false);
  const [Loading, setLoading] = useState(false);
  const { t } = useTranslation("index");

  const schema = yup.object().shape({
    currentPassword: yup.string().min(8).required(t("Current password is required")),
    newPassword: yup
      .string()
      .min(8, t("Password must be at least 8 characters"))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
       t("Must contain 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character")
      )
      .required(t("New password is required")),
    confirmNewPassword: yup
      .string()
      .oneOf([yup.ref("newPassword")], t("Passwords must match"))
      .required(t("Confirm new password is required")),
  });
  
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const handleClickShowCurrentPassword = () => {
    setValues((prevState) => ({
      ...prevState,
      showCurrentPassword: !prevState.showCurrentPassword,
    }));
  };

  const handleClickShowNewPassword = () => {
    setValues((prevState) => ({
      ...prevState,
      showNewPassword: !prevState.showNewPassword,
    }));
  };

  const handleClickShowConfirmNewPassword = () => {
    setValues((prevState) => ({
      ...prevState,
      showConfirmNewPassword: !prevState.showConfirmNewPassword,
    }));
  };
  const onPasswordFormSubmit = (data) => {
    console.log(data);
    setLoading(true);
    _AuthApi
      .passEdit(data)
      .then((res) => {
        console.log("res", res);
        if (res?.data?.code === 200) {
          setMessage(t("Password Changed Successfully"));
          reset(defaultValues);
        } else {
          setError(res?.error || t("An unexpected error occurred"));
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <Card>
      <CardHeader title={t("Change Password")} />
      <CardContent>
        <form onSubmit={handleSubmit(onPasswordFormSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="currentPassword"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    value={value}
                    onChange={onChange}
                    label={t("Current Password")}
                    placeholder="············"
                    id="input-current-password"
                    error={Boolean(errors.currentPassword)}
                    type={values.showCurrentPassword ? "text" : "password"}
                    helperText={errors.currentPassword?.message}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={handleClickShowCurrentPassword}
                          >
                            <Icon
                              fontSize="1.25rem"
                              icon={
                                values.showCurrentPassword
                                  ? "tabler:eye"
                                  : "tabler:eye-off"
                              }
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid container spacing={5} sx={{ mt: 0 }}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="newPassword"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    value={value}
                    onChange={onChange}
                    label={t("New Password")}
                    id="input-new-password"
                    placeholder="············"
                    error={Boolean(errors.newPassword)}
                    type={values.showNewPassword ? "text" : "password"}
                    helperText={errors.newPassword?.message}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={handleClickShowNewPassword}
                            onMouseDown={(e) => e.preventDefault()}
                          >
                            <Icon
                              fontSize="1.25rem"
                              icon={
                                values.showNewPassword
                                  ? "tabler:eye"
                                  : "tabler:eye-off"
                              }
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="confirmNewPassword"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    value={value}
                    onChange={onChange}
                    placeholder="············"
                    label={t("Confirm New Password")}
                    id="input-confirm-new-password"
                    error={Boolean(errors.confirmNewPassword)}
                    type={values.showConfirmNewPassword ? "text" : "password"}
                    helperText={errors.confirmNewPassword?.message}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={handleClickShowConfirmNewPassword}
                          >
                            <Icon
                              fontSize="1.25rem"
                              icon={
                                values.showConfirmNewPassword
                                  ? "tabler:eye"
                                  : "tabler:eye-off"
                              }
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">{t("Password Requirements:")}</Typography>
              <Box
                component="ul"
                sx={{
                  pl: 6,
                  mb: 0,
                  "& li": { mb: 1.5, color: "text.secondary" },
                }}
              >
                <li>{t("Minimum 8 characters long - the more, the better")}</li>
                <li>{t("At least one lowercase & one uppercase character")}</li>
                <li>{t("At least one number, symbol, or whitespace character")}</li>
              </Box>
            </Grid>
            <Box>
              {Message && (
                <Alert sx={{ mt: 1 }} severity="success">
                  {Message}
                </Alert>
              )}
            </Box>
            <Grid item xs={12}>
              <Button variant="outlined" type="submit" sx={{ mr: 4 }}>
                {t("Save Changes")}
              </Button>
              <Button
                type="reset"
                variant="tonal"
                color="secondary"
                onClick={() => reset(defaultValues)}
              >
                {t("Reset")}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChangePasswordCard;
