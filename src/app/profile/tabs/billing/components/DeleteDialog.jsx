import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTranslation } from "react-i18next";
import { useDeleteAddress } from "hooks/addresses/useDeleteAddresses";
import ButtonLoader from "components/customs/ButtonLoader";

const DeleteDialog = ({ id, open, handleClose }) => {
  const { t } = useTranslation("index");
  const deleteAddress = useDeleteAddress();
  const [loading, setLoading] = useState(false);
  const DeleteAddress = () => {
    setLoading(true);
    deleteAddress.mutate(id, {
      onSuccess: () => {
        setLoading(false);
        handleClose();
      },
    });
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{ color: "text.main" }}>{"Delete Item"}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "text.main" }}>
            {t("Are you Sure you want to Delete it ?")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t("Disagree")}</Button>

          <ButtonLoader
            onClick={() => DeleteAddress()}
            loading={loading}
            disableOnLoading
          >
            {t("Agree")}
          </ButtonLoader>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DeleteDialog;
