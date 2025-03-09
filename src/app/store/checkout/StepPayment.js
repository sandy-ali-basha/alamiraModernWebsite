// ** MUI Imports
import { styled } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Tabs from "@mui/material/Tabs";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import {
  Alert,
  AlertTitle,
  Chip,
  Collapse,
  Container,
  Divider,
  Fade,
  FormControlLabel,
  IconButton,
  Switch,
  TextField,
} from "@mui/material";
import { ValueStore } from "store/categoryStore";
import { useTranslation } from "react-i18next";
import { Close, CreditCard, Money } from "@mui/icons-material";
import { useCart } from "hooks/cart/useCart";
import { AddressStore } from "store/shippingStore";
import Loader from "components/modules/Loader";
import { useEffect, useState } from "react";

const CustomTabList = styled(Tabs)(({ theme }) => ({
  borderBottom: "0 !important",
  "&, & .MuiTabs-scroller": {
    boxSizing: "content-box",
    padding: theme.spacing(1.25, 1.25, 2),
    margin: `${theme.spacing(-1.25, -1.25, -2)} !important`,
  },
  "& .MuiTabs-indicator": {
    display: "none",
  },
  "& .Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.common.white} !important`,
  },
  "& .MuiTab-root": {
    minWidth: 81,
    minHeight: 38,
    lineHeight: 1,
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
}));

const StepPayment = ({ handleNext }) => {
  // ** State
  const [value, setValue] = ValueStore((state) => [
    state.value,
    state.setValue,
  ]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { t } = useTranslation("index");
  const cart_id = localStorage.getItem("cart_id");
  const { data: cartData, isLoading: cartIsLoading } = useCart(cart_id);

  const shippingAddress = AddressStore((state) => state.shippingAddress);
  const [openFade, setOpenFade] = useState(true);
  const [openCollapse, setOpenCollapse] = useState(true);
  useEffect(() => {
    if (!openFade) {
      setTimeout(() => {
        setOpenCollapse(false);
      }, 300);
    }
  }, [openFade]);
  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={8}>
          {/* <Collapse in={openCollapse}>
            <Fade in={openFade} timeout={{ exit: 300 }}>
              <Alert
                icon={<Close />}
                sx={{ my: 4, borderRadius: 0 }}
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    variant="outlined"
                    onClick={() => {
                      setOpenFade(false);
                    }}
                  >
                    <i className="tabler-x" />
                  </IconButton>
                }
              >
                <AlertTitle>Available Offers</AlertTitle>
                <Typography color="success.main">
                  - 10% Instant Discount on Bank of America Corp Bank Debit and
                  Credit cards
                </Typography>
                <Typography color="success.main">
                  - 25% Cashback Voucher of up to $60 on first ever PayPal
                  transaction. TCA
                </Typography>
              </Alert>
            </Fade>
          </Collapse> */}
          <Typography variant="h5" sx={{ ms: 5, mb: 3 }} color="text.primary">
            {t("Pleas Choose Payment method")}
          </Typography>
          <TabContext value={value} sx={{ px: 5 }}>
            <CustomTabList
              variant="scrollable"
              scrollButtons="auto"
              onChange={handleChange}
              aria-label="customized tabs example"
            >
              {/* <Tab value="fib" label={t("FIB")} /> */}
              <Tab value="credit-card" label="Card"  />
              <Tab value="cash-in-hand" label={t("Cash On Delivery")} />
              <Tab value="gc" label={t("Gift Card")} />
            </CustomTabList>
            <Grid container sx={{ mt: 2 }}>
              <Grid item md={8} xs={12}>
                <TabPanel value="fib" sx={{ px: 3 }}>
                  <Typography sx={{ mb: 4 }}>
                    {t(
                      "FIB is a type of payment method where the recipient make payment for the order at the time of delivery rather than in advance."
                    )}
                  </Typography>
                  <Button variant="outlined" onClick={handleNext}>
                    {t("Pay With FIB")}
                  </Button>
                </TabPanel>
                <TabPanel value="credit-card">
                  <form>
                    <Grid container spacing={6}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          type="number"
                          label="Card Number"
                          placeholder="0000 0000 0000 0000"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Name"
                          placeholder="John Doe"
                        />
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <TextField
                          fullWidth
                          label="Expiry Date"
                          placeholder="MM/YY"
                        />
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <TextField fullWidth label="CVV" placeholder="123" />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={<Switch defaultChecked />}
                          label="Save Card for future billing?"
                        />
                      </Grid>
                      <Grid item xs={12} className="flex gap-4">
                        <Button variant="outlined">Checkout</Button>
                        <Button type="reset" variant="tonal" color="secondary">
                          Reset
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </TabPanel>
                <TabPanel value="cash-in-hand" sx={{ px: 3 }}>
                  
                  <Typography sx={{ mb: 4 }}>
                    {t(
                      "Cash on Delivery is a type of payment method where the recipient make payment for the order at the time of delivery rather than in advance."
                    )}
                  </Typography>
                  <Button variant="outlined" onClick={handleNext}>
                    {t("Pay On Delivery")}
                  </Button>
                </TabPanel>

                {/*//* Gift Card  */}
                <TabPanel value="gc" sx={{ px: 3 }}>
                  <Typography sx={{ mb: 4, fontWeight: 500 }}>
                    Enter Gift Card Details
                  </Typography>
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        type="number"
                        label="Gift Card Number"
                        placeholder="Gift Card Number"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        type="number"
                        label="Gift Card Pin"
                        placeholder="Gift Card Pin"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button variant="outlined" onClick={handleNext}>
                        Redeem Gift Card
                      </Button>
                    </Grid>
                  </Grid>
                </TabPanel>
              </Grid>
            </Grid>
          </TabContext>
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
                  {shippingAddress?.title}
                </Typography>
                {shippingAddress?.content}
              </Box>
            </CardContent>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default StepPayment;
