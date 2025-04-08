import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
} from "@mui/material";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import { useTranslation } from "react-i18next";

const OrderFailedPopup = ({ open, onClose }) => {
    const {t}=useTranslation("index")
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <Box textAlign="center" p={2}>
        <ErrorOutlineRoundedIcon
          color="error"
          sx={{ fontSize: 60, mb: 1 }}
        />
        <DialogTitle sx={{ fontWeight: "bold" }}>
          {t("Payment Failed")}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
          {t("Something went wrong while processing your payment. Please try again.")}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", mb: 1 }}>
          <Button onClick={onClose} variant="outlined" color="error">
            {t("Close")}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default OrderFailedPopup;
