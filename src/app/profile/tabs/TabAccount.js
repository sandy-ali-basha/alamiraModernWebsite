// ** React Imports
import { useState } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import InputAdornment from "@mui/material/InputAdornment";
// ** Third Party Imports
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// ** Icon Imports
import { useTranslation } from "react-i18next";
import { Alert, Button, Divider, TextField } from "@mui/material";
import DeleteAcount from "./components/DeleteAcount";
import { _AuthApi } from "api/auth";
import GenderSelect from "components/customs/GenderSelect";

const phoneRegExp =
  /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;

const TabAccount = () => {
  // ** State
  const { t } = useTranslation("index");
  let schema = yup.object().shape({
    first_name: yup.string().required(t("First name is required")),
    last_name: yup.string().required(t("Last name is required")),
    email: yup
      .string()
      .email(t("Invalid email format"))
      .required(t("Email is required")),
    phone_number: yup
      .string()
      .matches(phoneRegExp, t("Enter a valid phone number"))
      .required(t("Phone number is required")),
    age: yup
      .number()
      .required(t("Age is required"))
      .min(18, t("You must be at least 18 years old"))
      .max(150, t("Age must not be more than 150 years")),

    gender: yup
      .string()
      .required(t("Gender is required"))
      .oneOf(["male", "female", "other"], t("Invalid gender selection")),
  });

  const data = JSON.parse(localStorage.getItem("userData"));
  const calculateDefaultDate = (age) => {
    if (!age) return ""; // Return an empty string or a default date if age is not provided

    const today = new Date();
    const birthDate = new Date(age);

    if (isNaN(birthDate)) return ""; // Return an empty string if birthDate is invalid

    const defaultDate = new Date(
      today.setFullYear(today.getFullYear() - birthDate.getFullYear())
    );
    return defaultDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };

  const details = [
    {
      head: t("first name"),
      type: "text",
      placeholder: t("first name"),
      register: "first_name",
      defaultValue: data?.first_name,
    },
    {
      head: t("last name"),
      type: "text",
      placeholder: t("last name"),
      register: "last_name",
      defaultValue: data?.last_name,
    },
    {
      head: t("Email"),
      type: "text",
      placeholder: t("Email"),
      register: "email",
      defaultValue: data?.email,
    },
    {
      head: t("Phone Number"),
      type: "text",
      InputProps: {
        startAdornment: (
          <InputAdornment position="start">TR (+90)</InputAdornment>
        ),
      },
      placeholder: t("Phone Number"),
      register: "phone_number",
      defaultValue: data?.phone_number,
    },
    {
      head: t("Age"),
      type: "number",
      placeholder: t("Age"),
      register: "age",
      defaultValue: calculateDefaultDate(data?.age),
    },
  ];

  const [loading, setLoading] = useState("yes");
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [Message, setMessage] = useState(false);

  const onSubmit = (input) => {
    setLoading(true);

    // // Calculate age based on birth date
    // const today = new Date();
    // const birthDate = new Date(input.age);
    // let age = today.getFullYear() - birthDate.getFullYear();
    // const m = today.getMonth() - birthDate.getMonth();
    // if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    //   age--;
    // }

    // // Add age to input object before sending to API
    // const inputData = {
    //   ...input,
    //   age: age,
    //   name: "name",
    //   user_id: data?.user_id,
    // };

    _AuthApi
      .update(data?.user_id, input)
      .then((res) => {
        console.log("res", res);
        if (res?.data?.code === 200) {
          setMessage("updated succesfully");
        } else {
          setError(res?.error || "An unexpected error occurred");
        }
        setLoading(true);
      })
      .finally(() => setLoading(false));
  };

  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  return (
    <>
      <Grid container spacing={4}>
        {/* Account Details Card */}
        <Grid item xs={12}>
          <Card>
            <CardHeader title={t("Profile Details")} />
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent>
                <Box onSubmit={handleSubmit(onSubmit)} component="form">
                  <Grid container spacing={4}>
                    {details.map((item, index) => (
                      <Grid item xs={6} key={index}>
                        <TextField
                          fullWidth
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
                          name={item.register}
                          {...register(item.register)}
                          error={!!errors[item.register]?.message}
                          helperText={errors[item.register]?.message || ""}
                          defaultValue={item.defaultValue}
                          InputProps={item.InputProps}
                        />
                      </Grid>
                    ))}
                    <Grid xs={6} item>
                      <GenderSelect
                        defaultValue={data?.gender}
                        register={register}
                        errors={errors}
                      />
                    </Grid>
                  </Grid>
                </Box>
                <Box>
                  {Message && (
                    <Alert sx={{ mt: 1 }} severity="success">
                      {Message}
                    </Alert>
                  )}
                </Box>
                <Grid item xs={12} sx={{ pt: 4 }}>
                  <Button type="submit"  variant="outlined" sx={{ mr: 4 }}>
                    {t("Save Changes")}
                  </Button>
                </Grid>
              </CardContent>
            </form>
          </Card>
        </Grid>
      </Grid>
      <Divider />
      <DeleteAcount />
    </>
  );
};

export default TabAccount;
