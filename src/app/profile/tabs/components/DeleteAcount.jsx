// ** React Imports
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

// ** MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import FormControl from "@mui/material/FormControl";
import CardContent from "@mui/material/CardContent";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
// ** Third Party Imports
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// ** Icon Imports
import Icon from "components/modules/icon";
import { useTranslation } from "react-i18next";
import { _AuthApi } from "api/auth";

const DeleteAccount = () => {
  // ** State
  const { t } = useTranslation("index");
  const navigate = useNavigate(); // Initialize navigate

  // ** Define validation schema
  const schema = yup.object().shape({
    checkbox: yup.boolean().oneOf([true], t("checkbox is required")),
  });

  const [open, setOpen] = useState(false);
  const [userInput, setUserInput] = useState("yes");
  const [secondDialogOpen, setSecondDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state

  const handleClose = () => setOpen(false);
  const handleSecondDialogClose = () => setSecondDialogOpen(false);

  // Submit function
  const onSubmit = async (data) => {
    if (data.checkbox) {
      setOpen(true);
    }
  };
  const userData = JSON.parse(localStorage.getItem("userData"));

  const handleConfirmation = async (value) => {
    handleClose();
    setUserInput(value);

    if (value === "yes") {
      setLoading(true); // Set loading to true
      try {
        // Call the delete account API
        const response = await _AuthApi.delete(userData?.id);
        if (response?.data?.code === 200) {
          localStorage.clear(); // Clear local storage
          navigate("/"); // Redirect to home page
        } else {
          setUserInput("cancel");
        }
      } catch (error) {
        console.error("Failed to delete account:", error);
        setUserInput("cancel"); // Change the state to show cancel dialog
      } finally {
        setLoading(false); // Set loading to false
      }
    }
    setSecondDialogOpen(true);
  };

  const formOptions = { resolver: yupResolver(schema) };
  const { handleSubmit, formState, control } = useForm(formOptions);
  const { errors } = formState;

  return (
    <Grid container spacing={4} sx={{ mt: 1 }}>
      {/* //* Delete Account Card */}
      <Grid item xs={12}>
        <Card>
          <CardHeader title={t("Delete Account")} />
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ mb: 4 }}>
                <FormControl>
                  <Controller
                    name="checkbox"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        label={t("I confirm my account deactivation")}
                        control={
                          <Checkbox
                            {...field}
                            size="small"
                            sx={
                              errors.checkbox ? { color: "error.main" } : null
                            }
                          />
                        }
                      />
                    )}
                  />
                  {errors.checkbox && (
                    <FormHelperText
                      id="validation-basic-checkbox"
                      sx={{
                        mx: 0,
                        color: "error.main",
                        fontSize: (theme) => theme.typography.body2.fontSize,
                      }}
                    >
                      {t("Please confirm you want to delete account")}
                    </FormHelperText>
                  )}
                </FormControl>
              </Box>
              <Button
                 variant="outlined"
                color="error"
                type="submit"
                disabled={errors.checkbox !== undefined}
              >
                {t("Delete Account")}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>

      {/* Deactivate Account Dialogs */}
      <Dialog fullWidth maxWidth="xs" open={open} onClose={handleClose}>
        <DialogContent sx={{ p: 4 }}>
          <Box
            sx={{
              display: "flex",
              textAlign: "center",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
              "& svg": { mb: 6, color: "warning.main" },
            }}
          >
            <Icon icon="tabler:alert-circle" fontSize="5.5rem" />
            <Typography>
              {t("Are you sure you would like to Delete your Account?")}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 4 }}>
          <Button
             variant="outlined"
            sx={{ mr: 2 }}
            onClick={() => handleConfirmation("yes")}
          >
            {t("Yes")}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => handleConfirmation("cancel")}
          >
            {t("Cancel")}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullWidth
        maxWidth="xs"
        open={secondDialogOpen}
        onClose={handleSecondDialogClose}
      >
        <DialogContent sx={{ p: 4 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
              "& svg": {
                mb: 8,
                color: userInput === "yes" ? "success.main" : "error.main",
              },
            }}
          >
            <Icon
              fontSize="5.5rem"
              icon={
                userInput === "yes" ? "tabler:circle-check" : "tabler:circle-x"
              }
            />
            <Typography variant="h4" sx={{ mb: 5 }}>
              {userInput === "yes" ? "Deleted!" : "Cancelled"}
            </Typography>
            <Typography>
              {userInput === "yes"
                ? t("Your Account Deleted successfully :(")
                : t("Unsubscription Cancelled!!")}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 4 }}>
          <Button
             variant="outlined"
            color="success"
            onClick={handleSecondDialogClose}
          >
            {t("OK")}
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default DeleteAccount;
