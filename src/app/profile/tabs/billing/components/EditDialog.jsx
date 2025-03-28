import React, { useEffect, useMemo, useState } from "react";
import { Controller } from "react-hook-form";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  Button,
  Grid,
  Checkbox,
  Typography,
  FormControl,
  Box,
  FormHelperText,
} from "@mui/material";
import { _addresses } from "api/addresses/addresses";
import ButtonLoader from "components/customs/ButtonLoader";
import { useQuery } from "react-query";
import Loader from "components/modules/Loader";
import { _cities } from "api/country/country";
import { useEditAddress } from "./hooks/useEditAddress";

const EditDialog = ({ open, handleClose, id }) => {
  const {
    handleCreate, // Fixed typo here
    register,
    errors,
    handleChange,
    loading,
    handleSubmit,
    control,
    t,
    setChecked,
    setValue,
    watch,
  } = useEditAddress({ handleClose, id });

  const [cities, setCiteies] = useState();
  useMemo(() => {
    _cities.index().then((response) => {
      if (response.code === 200) {
        setCiteies(response.data);
      }
    });
  }, []);

  const { data, isLoading } = useQuery(
    ["addresses", `id-${id}`],
    () =>
      _addresses.get(id).then((res) => {
        return res?.data;
      }),
    {}
  );

  useEffect(() => {
    setChecked(data?.data?.shipping_default);
    setValue("first_name", data?.data?.first_name);
  }, [
    data?.data?.first_name,
    data?.data?.shipping_default,
    setChecked,
    setValue,
  ]);

  return (
    <Dialog
      open={open}
      onClose={() => {
        const form = document.querySelector("form");
        if (form) form.reset();
        handleClose();
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      scroll="paper"
      PaperProps={{
        component: "form",
        onSubmit: (event) => {
          event.preventDefault();
          handleSubmit(handleCreate)(); // Correct reference here
        },
      }}
    >
      <DialogTitle id="scroll-dialog-title">{t("Edit Address")}</DialogTitle>
      <DialogContent sx={{ minHeight: "50vh" }}>
        {isLoading && <Loader />}
        {data && (
          <Grid container spacing={2} sx={{ pt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="first_name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t("First Name")}
                    variant="outlined"
                    fullWidth
                    error={!!errors.first_name}
                    helperText={
                      errors?.first_name ? errors?.first_name.message : ""
                    }
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={t("Last Name")}
                placeholder={t("Last name")}
                {...register("last_name")}
                error={!!errors.last_name}
                helpertext={errors.last_name ? errors.last_name.message : ""}
                defaultValue={data?.data?.last_name}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              {cities ? (
                <FormControl fullWidth>
                  <Select
                    sx={{ borderColor: "text.main" }}
                    {...register("city")}
                    label={t("city")}
                    value={watch("city") || data?.data?.city || ""} // Watch form value or use default from data
                    onChange={(e) => setValue("city", e.target.value)} // Update form state on selection
                  >
                    {cities?.state?.map((item) => (
                      <MenuItem value={item.value} key={item.id}>
                        <Box style={{ color: "text.main" }}>{item.name}</Box>
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText error>{errors.city?.message}</FormHelperText>
                </FormControl>
              ) : (
                <Typography variant="body2" color="text.main">
                  {t("please add city")}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={t("State")}
                placeholder={t("State")}
                {...register("state")}
                error={!!errors.state}
                helpertext={errors.state ? errors.state.message : ""}
                defaultValue={data?.data?.state}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={t("postcode")}
                placeholder={t("postcode")}
                {...register("postcode")}
                error={!!errors.postcode}
                helpertext={errors.postcode ? errors.postcode.message : ""}
                defaultValue={data?.data?.postcode}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t("Address")}
                placeholder={t("e.g. building name, street #")}
                {...register("line_one")}
                error={!!errors.line_one}
                helpertext={errors.line_one ? errors.line_one.message : ""}
                defaultValue={data?.data?.line_one}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={t("Contact Email")}
                placeholder="jone@mail.com"
                {...register("contact_email")}
                error={!!errors.contact_email}
                helpertext={
                  errors.contact_email ? errors.contact_email.message : ""
                }
                defaultValue={data?.data?.contact_mail}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label={t("Phone Number")}
                placeholder="012 345 1111"
                {...register("contact_phone")}
                error={!!errors.contact_phone}
                helpertext={
                  errors.contact_phone ? errors.contact_phone.message : ""
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">TR (+90)</InputAdornment>
                  ),
                }}
                defaultValue={data?.data?.contact_phone}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t("Delivery Instructions")}
                placeholder={t("Please leave the package at the door")}
                {...register("delivery_instructions")}
                error={!!errors.delivery_instructions}
                helpertext={
                  errors.delivery_instructions
                    ? errors.delivery_instructions.message
                    : ""
                }
                defaultValue={data?.data?.delivery_instructions}
              />
            </Grid>

            <Grid item xs={12}>
              <Checkbox variant="soft" onChange={handleChange} />
              <Typography variant="text.primary">
                {t("Default address for shipping")}
              </Typography>
            </Grid>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t("Cancel")}</Button>
        <ButtonLoader
          name={t("Submit")}
          type="submit"
          loading={loading}
          disableOnLoading
        >
          {t("Save")}
        </ButtonLoader>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
