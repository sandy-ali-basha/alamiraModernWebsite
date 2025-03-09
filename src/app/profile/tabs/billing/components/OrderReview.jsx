import { Cancel, CheckCircle, Done, LocalShipping, Pending, Sync } from "@mui/icons-material";
import {
  Box,
  Chip,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import theme from "theme/theme";

const OrderReview = ({ item }) => {

  const { t } = useTranslation("index");

  const columns = useMemo(() => {
    return [t("Product"), t("Price"), t("Quantity"), t("Total")];
  }, [t]);

  const rows = useMemo(() => {
    return item?.lines?.map((order) => (
      <TableRow key={order.id}>
        <TableCell>{order.description}</TableCell> {/* Product */}
        <TableCell>{order.unit_price.value}</TableCell> {/* Price */}
        <TableCell>{order.unit_quantity}</TableCell> {/* Quantity */}
        <TableCell>{order.total.value}</TableCell> {/* Total */}
      </TableRow>
    ));
  }, [item]);
  
  const getStatusDetails = (status) => {
    switch (status) {
      case "order_requested":
        return { label: t("Requested"), color: "info", icon: <Pending /> };
      case "order_processing":
        return { label: t("Processing"), color: "primary", icon: <Sync /> };
      case "order_processed":
        return {
          label: t("Processed"),
          color: "warning",
          icon: <CheckCircle />,
        };
      case "order_under_delivery":
        return {
          label: t("Under Delivery"),
          color: "secondary",
          icon: <LocalShipping />,
        };
      case "order_delivered":
        return { label: t("Delivered"), color: "success", icon: <Done /> };
      case "order_canceled":
        return { label: t("Canceled"), color: "error", icon: <Cancel /> };
      case "cancel_requested":
        return { label: t("Cancel Requested"), color: "error", icon: <Sync /> };
      default:
        return { label: t("Unknown"), color: "default", icon: null };
    }
  };

  const { label, color, icon } = getStatusDetails(item?.status);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box p={isMobile ? 1 : 3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography variant={isMobile ? "h6" : "h4"} sx={{ color: "text.main" }}>
          {t("Order")} #{item?.reference ?? "N/A"}
        </Typography>

        <Box display="flex" gap={2}>
          <Tooltip title={label}>
            <Chip
              label={label}
              icon={icon}
              color={color}
              variant="outlined"
              sx={{
                minWidth: isMobile ? 90 : 120,
                fontWeight: "bold",
                fontSize: "0.875rem",
                justifyContent: "start",
              }}
            />
          </Tooltip>
        </Box>
      </Box>

      <Typography color="textSecondary" variant="body2">
        {t("Order Date")}: {item?.order_date ?? "N/A"}
      </Typography>

      <Grid container spacing={isMobile ? 1 : 2} mt={2}>
        <Grid item xs={12} md={8}>
          <Box sx={{ px: 2, overflowX: isMobile ? "auto" : "visible" }}>
            <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ color: "text.main" }} gutterBottom>
              {t("Products")}
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((col) => (
                    <TableCell key={col}>{col}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>{rows}</TableBody>
            </Table>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box sx={{ p: isMobile ? 1 : 2, color: "text.main" }}>
            <Typography variant="h6" gutterBottom>
              {t("Summary")}
            </Typography>
            <Typography>{t("Subtotal")}: {item?.sub_total ?? "N/A"}</Typography>
            {item?.points_used > 0 && (
              <Typography>{t("sub total after points")}: {item?.sub_total_after_points ?? "N/A"}</Typography>
            )}
            {item?.tax_total && <Typography>{t("Tax")}: {item?.tax_total ?? "N/A"}</Typography>}
            {item?.total && <Typography>{t("Total")}: {item?.total ?? "N/A"}</Typography>}
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box sx={{ p: isMobile ? 1 : 2, color: "text.main" }}>
            <Typography variant="body1">{t("Shipping Address")}</Typography>
            <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
              {item?.address?.find((addr) => addr.type === "shipping")?.line_one}, {item?.address?.find((addr) => addr.type === "shipping")?.city}, {item?.address?.find((addr) => addr.type === "shipping")?.state}, {item?.address?.find((addr) => addr.type === "shipping")?.postcode}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
              {t("Contact Email")}: {item?.address?.find((addr) => addr.type === "shipping")?.contact_email ?? "N/A"}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
              {t("Contact Phone")}: {item?.address?.find((addr) => addr.type === "shipping")?.contact_phone ?? "N/A"}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box sx={{ p: isMobile ? 1 : 2, color: "text.main" }}>
            <Typography variant="body1">{t("Billing Address")}</Typography>
            <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
              {item?.address?.find((addr) => addr.type === "billing")?.line_one ?? "N/A"}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
              {t("Contact Email")}: {item?.address?.find((addr) => addr.type === "billing")?.contact_email ?? "N/A"}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
              {t("Contact Phone")}: {item?.address?.find((addr) => addr.type === "billing")?.contact_phone ?? "N/A"}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default OrderReview;
