import React, { useMemo, useState } from "react";
import { Controller } from "react-hook-form";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  Button,
  Grid,
  Checkbox,
  Typography,
  FormControl,
  Box,
  FormHelperText,
  InputLabel,
} from "@mui/material";
import ButtonLoader from "components/customs/ButtonLoader";
import { useAddressDialog } from "./hooks/useAddressDialog";
import { _cities } from "api/country/country";

const AddDialog = ({ open, handleClose }) => {
  const {
    handleCreate,
    register,
    errors,
    handleChange,
    loading,
    handleSubmit,
    control,
    t,
  } = useAddressDialog({ handleClose });

  const [cities, setCiteies] = useState();
  useMemo(() => {
    _cities.index().then((response) => {
      if (response?.code === 200) {
        setCiteies(response.data);
      }
    });
  }, []);

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
        onSubmit: handleSubmit(handleCreate),
      }}
    >
      <DialogTitle id="scroll-dialog-title">{t("Add New Address")}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ pt: 1 }}>
          <Grid item xs={12} sm={6}>
              {/* First Name Input */}
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
              placeholder="Last name"
              {...register("last_name")}
              error={!!errors.last_name}
              helperText={errors.last_name ? errors.last_name.message : ""}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={t("Contact Email")}
              placeholder="jone@mail.com"
              {...register("contact_email")}
              error={!!errors.contact_email}
              helperText={
                errors.contact_email ? errors.contact_email.message : ""
              }
            />
          </Grid>

          <Grid item xs={12} sm={6} sx={{ p: "10px" }}>
            {cities ? (
              <FormControl fullWidth>
                <InputLabel sx={{ color: "text.main" }}>{t("City")}</InputLabel>
                <Select
                  fullWidth
                  sx={{ color: "text.main", borderColor: "text.main" }}
                  {...register("city")}
                  label="city"
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
                {t("pleas add cities")}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={t("State")}
              placeholder="State"
              {...register("state")}
              error={!!errors.state}
              helperText={errors.state ? errors.state.message : ""}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={t("postcode")}
              placeholder="postcode"
              {...register("postcode")}
              error={!!errors.postcode}
              helperText={errors.postcode ? errors.postcode.message : ""}
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
              helperText={
                errors.contact_phone ? errors.contact_phone.message : ""
              }
              // InputProps={{
              //   startAdornment: (
              //     <InputAdornment position="start">TR (+90)</InputAdornment>
              //   ),
              // }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label={t("Address")}
              placeholder={t("e.g. building name, street #")}
              {...register("line_one")}
              error={!!errors.line_one}
              helperText={errors.line_one ? errors.line_one.message : ""}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label={t("Delivery Instructions")}
              placeholder={t("Please leave the package at the door")}
              {...register("delivery_instructions")}
              error={!!errors.delivery_instructions}
              helperText={
                errors.delivery_instructions
                  ? errors.delivery_instructions.message
                  : ""
              }
            />
          </Grid>

          <Grid item xs={12}>
            <Checkbox variant="soft" onChange={handleChange} />
            <Typography variant="text.primary">
              {t("Defualt address for shipping")}
            </Typography>
          </Grid>
        </Grid>
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

export default AddDialog;
