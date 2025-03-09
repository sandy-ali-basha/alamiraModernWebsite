import { Link } from "react-router-dom";
// ** MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";

// ** Icon Imports
import Icon from "components/modules/icon";
import { Container } from "@mui/material";
import { useTranslation } from "react-i18next";

const StyledList = styled(List)(({ theme }) => ({
  padding: 0,
  "& .MuiListItem-root": {
    padding: theme.spacing(3),
    border: `1px solid ${theme.palette.divider}`,

    "&:first-of-type": {
      borderTopLeftRadius: 3,
      borderTopRightRadius: 3,
    },
    "&:last-of-type": {
      borderBottomLeftRadius: 3,
      borderBottomRightRadius: 3,
    },
    "&:not(:last-of-type)": {
      borderBottom: 0,
    },
    "& .MuiListItemText-root": {
      marginTop: 0,
      marginBottom: theme.spacing(4),
      "& .MuiTypography-root": {
        color: theme.palette.text.secondary,
      },
    },
    "& .remove-item": {
      top: "0.5rem",
      right: "0.625rem",
      position: "absolute",
      color: theme.palette.text.disabled,
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
}));

const HorizontalList = styled(List)(({ theme }) => ({
  padding: 0,
  display: "flex",
  border: `1px solid ${theme.palette.divider}`,
  "& .MuiListItem-root": {
    padding: theme.spacing(6),
    "&:not(:last-of-type)": {
      borderRight: `1px solid ${theme.palette.divider}`,
    },
  },
  [theme.breakpoints.down("md")]: {
    display: "block",
    "& .MuiListItem-root": {
      "&:not(:last-of-type)": {
        borderRight: 0,
        borderBottom: `1px solid ${theme.palette.divider}`,
      },
    },
  },
}));

const StepConfirmation = ({ orderResponse }) => {
  const shippingAddress = orderResponse.address.find(
    (addr) => addr.type === "shipping"
  );
  const items = orderResponse.lines;
  const { t } = useTranslation("index");

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              textAlign: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="h4" sx={{ mb: 4 }}>
              {t("Thank You!")} 😇
            </Typography>
            <Typography sx={{ mb: 4, color: "text.secondary" }}>
              {t("Your order")}{" "}
              <Box
                href="/"
                component={Link}
                onClick={(e) => e.preventDefault()}
                sx={{ color: "primary.main", textDecoration: "none" }}
              >
                #{orderResponse.reference}
              </Box>{" "}
              {t("has been placed!")}
            </Typography>
            {/* <Typography sx={{ color: "text.secondary" }}>
             {t("We sent an email to")}{" "}
              <Box
                href="/"
                component={Link}
                onClick={(e) => e.preventDefault()}
                sx={{ color: "primary.main", textDecoration: "none" }}
              >
                {billingAddress.contact_email}
              </Box>{" "}
              with your order confirmation and receipt.
            </Typography> */}
            {/* <Typography sx={{ mb: 4, color: "text.secondary" }}>
              {` If the email hasn't arrived within two minutes, please check your spam folder to see if the email was routed there.`}
            </Typography> */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                "& svg": { color: "text.secondary" },
              }}
            ></Box>
          </Box>
        </Grid>
        {/* Order Items */}
        <Grid item xs={12} md={8} xl={9}>
          <StyledList sx={{ boxShadow: 0 }}>
            {items.slice(0, -1).map((item) => (
              <ListItem key={item.id}>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={8}>
                    <ListItemText primary={item.description} />
                  </Grid>
                  <Grid
                    item
                    sm={4}
                    xs={12}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: { xs: "flex-start", sm: "flex-end" },
                    }}
                  >
                    <Typography sx={{ color: "primary.main" }}>
                      {item.unit_price.value.toLocaleString()}{" "}
                      {t("currency")}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </StyledList>
        </Grid>
        <Grid item md={6} xs="12">
          <HorizontalList>
            <ListItem
              sx={{ flexDirection: "column", alignItems: "flex-start" }}
            >
              <Box sx={{ mb: 4, display: "flex", alignItems: "center" }}>
                <Box sx={{ mr: 1.5, display: "flex" }}>
                  <Icon icon="tabler:map-pin" fontSize={20} />
                </Box>
                <Typography variant="h6">{t("Shipping")}</Typography>
              </Box>
              <Typography>{`${shippingAddress.first_name} ${shippingAddress.last_name}`}</Typography>
              <br />
              <Typography>{shippingAddress.line_one}</Typography>
              <Typography>
                {shippingAddress.city}, {shippingAddress.state},{" "}
                {shippingAddress.postcode}
              </Typography>
              <Typography sx={{ mb: 4 }}>
                {shippingAddress.country?.name}
              </Typography>
              <Typography>{shippingAddress.contact_phone}</Typography>
            </ListItem>
            {/* Billing Address */}
            {/* <ListItem
              sx={{ flexDirection: "column", alignItems: "flex-start" }}
            >
              <Box sx={{ mb: 4, display: "flex", alignItems: "center" }}>
                <Box sx={{ mr: 1.5, display: "flex" }}>
                  <Icon icon="tabler:credit-card" fontSize={20} />
                </Box>
                <Typography variant="h6">{t("Billing Address")}</Typography>
              </Box>
              <Typography>{`${billingAddress.first_name} ${billingAddress.last_name}`}</Typography>
              <Typography>{billingAddress.line_one}</Typography>
              <Typography>
                {billingAddress.city}, {billingAddress.state},{" "}
                {billingAddress.postcode}
              </Typography>
              <Typography sx={{ mb: 4 }}>
                {billingAddress.country?.name}
              </Typography>
              <Typography>{billingAddress.contact_phone}</Typography>
            </ListItem> */}
          </HorizontalList>
        </Grid>

        {/* Price Details */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              mb: 4,
              border: (theme) => `1px solid ${theme.palette.divider}`,
            }}
          >
            <CardContent>
              <Typography sx={{ mb: 4 }} variant="h6">
                {t("Price Details")}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box
                  sx={{
                    mb: 4,
                    gap: 2,
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography>{t("Sub Total")}</Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    {orderResponse.sub_total.toLocaleString()}{" "}
                    {t("currency")}
                  </Typography>
                </Box>
                    <Box
                      sx={{
                        mb: 4,
                        gap: 2,
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography>{t("Shipping")}</Typography>
                      <Typography sx={{ color: "text.secondary" }}>
                        {orderResponse.shipping_total.toLocaleString()}{" "}
                        {t("currency")}
                      </Typography>
                    </Box>
                <Box
                  sx={{
                    mb: 4,
                    gap: 2,
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography>{t("Order Total")}</Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    {orderResponse.total.toLocaleString()} {t("currency")}
                  </Typography>
                </Box>
                {/* <Box
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
                      justifyContent: "flex-end",
                    }}
                  >
                    <Typography
                      sx={{
                        mr: 2,
                        textDecoration: "line-through",
                        color: "text.disabled",
                      }}
                    >
                      $5.00
                    </Typography>
                    <Chip
                      rounded
                      size="small"
                      skin="light"
                      color="success"
                      label="Free"
                    />
                  </Box>
                </Box> */}
              </Box>
            </CardContent>
            <Divider sx={{ m: "0 !important" }} />
            <CardContent
              sx={{ py: (theme) => `${theme.spacing(3.5)} !important` }}
            >
              <Box
                sx={{
                  gap: 2,
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontWeight: 500 }}>{t("Total")}</Typography>
                <Typography sx={{ fontWeight: 500 }}>
                {orderResponse.total.toLocaleString()} {t("currency")}
                </Typography>
              </Box>
            </CardContent>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default StepConfirmation;
