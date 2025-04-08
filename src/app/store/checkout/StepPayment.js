// ** MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { Chip, Container, Divider } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useCart } from "hooks/cart/useCart";
import { AddressStore } from "store/shippingStore";
import Loader from "components/modules/Loader";

const StepPayment = ({ handleNext }) => {
  const { t } = useTranslation("index");
  const cart_id = localStorage.getItem("cart_id");
  const { data: cartData, isLoading: cartIsLoading } = useCart(cart_id);

  const shippingAddress = AddressStore((state) => state.shippingAddress);

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={8}>
          <Grid container sx={{ mt: 2 }}>
            <Grid item md={8} xs={12}>
              <Typography sx={{ mb: 4 }}>
              {t("You will be redirected to PayPal to complete your purchase securely.")}
              </Typography>
              <Button variant="outlined" onClick={handleNext}>
              {t("Continue to PayPal")}
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Box>
            <CardContent>
              <Typography sx={{ mb: 4 }} variant="h6">
                {t("Price Details")}
              </Typography>
              {cartIsLoading ? (
                <Loader />
              ) : (
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  {/* bag total */}
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    {/* bag total */}
                    <Box
                      sx={{
                        my: 2,
                        gap: 2,
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography>{t("Sub Total")}</Typography>
                      <Typography sx={{ color: "text.secondary" }}>
                        {cartData?.data?.sub_total.toLocaleString()}{" "}
                        {t("currency")}
                      </Typography>
                    </Box>
                    <Divider />
                    <Box
                      sx={{
                        gap: 2,
                        my: 2,
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography>{t("Delivery Charges")}</Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {shippingAddress?.shipping_price > 0 && (
                          <div>
                            {shippingAddress?.shipping_price.toLocaleString()}
                            {t("currency")}
                          </div>
                        )}

                        {shippingAddress?.shipping_price === 0 && (
                          <Chip color="success" label={t("FREE")}></Chip>
                        )}
                      </Box>
                    </Box>
                    <Divider />
                    {/* discount_amount */}
                    {cartData?.data?.discount_amount > 0 && (
                      <Box
                        sx={{
                          my: 2,
                          gap: 2,
                          display: "flex",
                          flexWrap: "wrap",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography>{t("Discount Amount")}</Typography>
                        <Typography
                          variant="body1"
                          sx={{ color: "primary.main" }}
                        >
                          {cartData?.data?.sub_total_after_discount}
                        </Typography>
                      </Box>
                    )}
                    {/* points_used */}
                    {cartData?.data?.points_used > 0 && (
                      <Box
                        sx={{
                          my: 2,
                          gap: 2,
                          display: "flex",
                          flexWrap: "wrap",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography>
                          {t("Sub Total After Points Used")}
                        </Typography>
                        <Typography variant="body1" color="secondary">
                          {cartData?.data?.sub_total_after_points.toLocaleString()}{" "}
                          {t("currency")}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
              )}
            </CardContent>

            <CardContent>
              <Box
                sx={{
                  mb: 4,
                  rowGap: 1,
                  columnGap: 4,
                }}
              >
                <Typography sx={{ color: "primary.main" }}>
                  {t("Deliver to")}:
                </Typography>
                <Typography sx={{ fontWeight: 500 }}>
                  {shippingAddress?.first_name} {shippingAddress?.last_name}
                </Typography>
                <Box
                  sx={{
                    mt: 0.5,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="body2" sx={{ mb: "auto" }}>
                    {shippingAddress.city}, {shippingAddress.state},{" "}
                    {shippingAddress.country}
                    <br />
                    {shippingAddress.line_one}
                    <br />
                    {shippingAddress.postcode &&
                      t("Postcode")`: ${shippingAddress.postcode}.`}
                    <br />
                    {shippingAddress.contact_phone &&
                      t("Mobile")`: ${shippingAddress.contact_phone}.`}
                    <br />
                    {shippingAddress.contact_phone &&
                      t("Email")`: ${shippingAddress.contact_mail}.`}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default StepPayment;
