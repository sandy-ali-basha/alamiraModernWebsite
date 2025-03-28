// ** React Imports
import { useEffect } from "react";
// ** MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// ** Custom Components Imports
import {
  Card,
  Chip,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
} from "@mui/material";
import CustomRadioBasic from "components/customs/custom-radio/basic";
import { Link, useNavigate } from "react-router-dom";
import { useAddresses } from "hooks/addresses/useAddresses";
import Loader from "components/modules/Loader";
import { useTranslation } from "react-i18next";
import { useCart } from "hooks/cart/useCart";
import { AddressStore } from "store/shippingStore";

const StepAddress = ({
  handleNext,
  selectedBasicRadio,
  setSelectedBasicRadio,
}) => {
  // const [selectedIconRadio, setSelectedIconRadio] = useState("standard");
  const { data = { addresses: [] }, isLoading } = useAddresses();
  const { t } = useTranslation("index");
  
  const addresses = data?.addresses || [];

  const addressData = addresses.map((address, index) => ({
    shipping_price: address.shipping_price,
    value: address.id,
    isSelected: address.id === selectedBasicRadio,
    title: `${address.title} ${address.first_name} ${address.last_name} ${
      address.billing_default ? "(Default)" : ""
    }`,
    meta: address.shipping_default && (
      <Chip
        rounded
        size="small"
        skin="light"
        label={"Shipping Default"}
        color={"primary"}
      />
    ),
    content: (
      <Box
        sx={{
          mt: 0.5,
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="body2" sx={{ mb: "auto" }}>
          {address.city}, {address.state}, {address.country}
          <br />
          {address.line_one}
          <br />
          {address.postcode && `Postcode: ${address.postcode}.`}
          <br />
          {address.contact_phone && `Mobile: ${address.contact_phone}.`}
          <br />
          {address.contact_phone && `Email: ${address.contact_mail}.`}
        </Typography>
      </Box>
    ),
  }));

  const [shippingAddress, setShippingAddress] = AddressStore((state) => [
    state.shippingAddress,
    state.setShippingAddress,
  ]);

  useEffect(() => {
    const defaultAddress = addresses.find(
      (address) => address.shipping_default
    );
    if (defaultAddress) {
      setSelectedBasicRadio(defaultAddress.id);
      setShippingAddress(defaultAddress);
    }
  }, [addresses, setSelectedBasicRadio, setShippingAddress]);

  const theme = useTheme();
  const navigate = useNavigate();
  const breakpointMD = useMediaQuery(theme.breakpoints.between("sm", "lg"));

  const handleBasicRadioChange = (prop) => {
    setSelectedBasicRadio(prop);
  };
  const handleAddNewAddress = () => navigate("/profile/addresses");

  const cart_id = localStorage.getItem("cart_id");
  const { data: cartData, isLoading: cartIsLoading } = useCart(cart_id);
  if (isLoading) {
    return (
      <Typography sx={{ textAlign: "center", minHeight: "50vh" }}>
        <Loader />
      </Typography>
    );
  }

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={7}>
          <Typography sx={{ mb: 4 }} variant="h6">
            {t("Select your preferable address")}
          </Typography>
          <Grid container spacing={4}>
            {addressData.map((item, index) => (
              <CustomRadioBasic
                key={index}
                data={item}
                name={`custom-radios-address ${index}`}
                selected={selectedBasicRadio}
                gridProps={{ sm: 6, xs: 12 }}
                handleChange={handleBasicRadioChange}
              />
            ))}
          </Grid>
          <Button variant="tonal" sx={{ mt: 4 }} onClick={handleAddNewAddress}>
            {t("Add new address")}
          </Button>
        </Grid>
        <Grid item xs={12} lg={5}>
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <List>
                {cartIsLoading ? (
                  <ListItem sx={{ my: 2 }}>
                    <Grid container sx={{ mx: 1 }}>
                      <Grid item xs={12} md={4}>
                        <Skeleton width="100%" height="10vh" />
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <Skeleton width="100%" height="6vh" />
                      </Grid>
                    </Grid>
                  </ListItem>
                ) : (
                  cartData?.data?.products?.length > 0 &&
                  cartData?.data?.products?.map((item, idx) => (
                    <>
                      {idx > 0 && <Divider />}
                      <ListItem key={idx} sx={{ my: 2 }}>
                        <ListItemAvatar
                          key={item?.id}
                          sx={{
                            display: "flex",
                            width: "25%",
                          }}
                        >
                          <img
                            style={{
                              width: "100%",
                              aspectRatio: 1,
                              objectFit: "cover",
                            }}
                            src={item?.images[0]?.image_path}
                            alt={item?.name}
                          />
                        </ListItemAvatar>
                        <Grid container sx={{ mx: 1 }}>
                          <Grid item xs={12}>
                            <Link
                              to={`/store/product/${item?.id}/${item.name}`}
                              style={{ textDecoration: "none" }}
                            >
                              <ListItemText
                                primary={
                                  item?.name.split(" ").slice(0, 7).join(" ") +
                                  " ..."
                                }
                              />
                            </Link>

                            <Box sx={{ display: "flex" }}>
                              <Typography sx={{ color: "text.main" }}>
                                {item?.price.toLocaleString()} {t("currency")}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </ListItem>
                    </>
                  ))
                )}
              </List>
            </CardContent>
            <Divider sx={{ m: "0 !important" }} />
            <CardContent>
              <Typography sx={{ mb: 4 }} variant="h6">
                {t("Price Details")}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                {/* bag total */}
                <Box
                  sx={{
                    mb: 2,
                    gap: 2,
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography>{t("Sub Total")}</Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    {cartData?.data?.sub_total} {t("currency")}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    gap: 2,
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
                        {shippingAddress?.shipping_price} {t("currency")}
                      </div>
                    )}
                    {shippingAddress?.shipping_price === 0 && (
                      <Chip color="success" label={t("FREE")}></Chip>
                    )}
                  </Box>
                </Box>
                {/* discount_amount */}
                {cartData?.data?.discount_amount > 0 && (
                  <Box
                    sx={{
                      mb: 2,
                      gap: 2,
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography>{t("Discount Amount")}</Typography>
                    <Typography variant="body1" sx={{ color: "primary.main" }}>
                      {cartData?.data?.sub_total_after_discount.toLocaleString()}{" "}
                      {t("currency")}
                    </Typography>
                  </Box>
                )}
                {/* points_used */}
                {/* {cartData?.data?.points_used > 0 && (
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
                    <Typography>{t("Sub Total After Points Used")}</Typography>
                    <Typography variant="body1" color="secondary">
                      {cartData?.data?.sub_total_after_points.toLocaleString()}{" "}
                      {t("currency")}
                    </Typography>
                  </Box>
                )} */}
              </Box>
            </CardContent>
          </Card>
          <Box
            sx={{
              display: "flex",
              ...(breakpointMD ? { justifyContent: "flex-end" } : {}),
            }}
          >
            <Button
              fullWidth={!breakpointMD}
              variant="outlined"
              onClick={handleNext}
              sx={{}}
              disabled={!selectedBasicRadio}
            >
              {t("Place Order")}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default StepAddress;
