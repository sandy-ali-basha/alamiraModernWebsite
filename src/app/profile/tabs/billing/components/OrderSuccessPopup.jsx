import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { useTranslation } from "react-i18next";

const OrderSuccessPopup = ({ open, onClose }) => {
  const { t } = useTranslation("index");
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ textAlign: "center", pb: 0 }}>
        <CheckCircleRoundedIcon sx={{ color: "green", fontSize: 50, mb: 1 }} />
        <Typography variant="h6">{t("Order Placed Successfully!")}</Typography>
      </DialogTitle>
      <DialogContent>
        <Typography align="center" sx={{ mt: 1 }}>
          {t(
            "Thank you for your purchase. Your order has been confirmed and is now being processed."
          )}{" "}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
        <Button onClick={onClose} variant="outlined" color="primary">
          {t("Continue Shopping")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderSuccessPopup;
