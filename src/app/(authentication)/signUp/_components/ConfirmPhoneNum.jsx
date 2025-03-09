import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { IconButton, Input, TextField, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
// import { useTerms } from "hooks/terms/useTerms";
import Loader from "components/modules/Loader";
import VerificationCodeInput from "components/modules/VerificationCodeInput";
import { CloseFullscreen, CloseOutlined } from "@mui/icons-material";

const ConfirmPhoneNum = ({ open, setOpen, id }) => {

  const { t } = useTranslation("auth");
  const [loading, setLoading] = useState(false);

  const handleClickOpen = (e) => setOpen(true);
  const handleClose = () => setOpen(false);
  // const { refetch } = useTerms();
  const DeleteTerms = () => {
    setLoading(true);
    console.log("DeleteTerms");
  };
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "&.MuiDialog-container": {
            backgroundColor: "error.main",
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" sx={{ mt: 4 }}>
          {t(
            "We have sent you a message on WhatsApp. Please check the code in the message"
          )}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseOutlined />
        </IconButton>
        <DialogContent>
          <VerificationCodeInput />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default ConfirmPhoneNum;
