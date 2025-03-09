import { _cart } from "api/cart/_cart";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";

const { Typography, Box, TextField, Button, Alert } = require("@mui/material");

const ApplyCoupon = () => {
  const { t } = useTranslation("index");
  const [couponCode, setCouponCode] = useState();
  const queryClient = useQueryClient();
  const [alert, setAlert] = useState();
  const [success, setSuccess] = useState();

  const applyCoupone = () => {
    const data = {
      cart_id: localStorage.getItem("cart_id"),
      coupon_code: couponCode,
    };
    _cart.coupon({ data }).then((res) => {
      console.log(res);
      if (res?.code === 200) {
        queryClient.invalidateQueries("cart");
        setSuccess(true);
      } else
        setAlert(res?.error?.errors?.coupon_code[0] || "something went wrong");
    });
  };
  return (
    <>
      <Typography sx={{ mb: 1 }} variant="h6">
        {t("coupon")}
      </Typography>
      <Box sx={{ mb: 1, display: "flex", alignItems: "center" }}>
        <TextField
          fullWidth
          size="small"
          sx={{ mr: 2 }}
          placeholder={t("Enter Promo Code")}
          onChange={(e) => setCouponCode(e.target.value)}
          disabled={success}
        />

        <Button
          disabled={!couponCode || success}
          onClick={() => applyCoupone()}
          variant="outlined"
        >
          {t("Apply")}
        </Button>
      </Box>
      {alert && <Alert severity="error">{alert}</Alert>}
      {success && (
        <Alert severity="success">
          {t("Coupon applied successfully! You have received a discount.")}
        </Alert>
      )}
    </>
  );
};
export default ApplyCoupon;
