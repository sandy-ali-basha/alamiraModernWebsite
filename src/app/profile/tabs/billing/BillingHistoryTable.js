import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import {
  CardHeader,
  CardContent,
  Typography,
  Chip,
  Card,
  Tooltip,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Grid,
  useMediaQuery,
} from "@mui/material";
import { useOrders } from "hooks/orders/useOrders";
import CloseIcon from "@mui/icons-material/Close";
import OrderReview from "./components/OrderReview";
import { Eye } from "react-feather";
import { useTranslation } from "react-i18next";
import {
  Cancel,
  CheckCircle,
  DeleteRounded,
  Done,
  LocalShipping,
  Pending,
  Sync,
} from "@mui/icons-material";
import { _axios } from "interceptor/http-config";
import Swal from "sweetalert2";
import theme from "theme/theme";
import { useQueryClient } from "react-query";
import OrderSuccessPopup from "./components/OrderSuccessPopup";
import { useLocation } from "react-router-dom";
import OrderFailedPopup from "./components/OrderFailedPopup";

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: `${theme.palette.primary.main} !important`,
}));

const BillingHistoryTable = () => {
  const [value, setValue] = useState("");
  const [statusValue, setStatusValue] = useState("");

  const [selectedOrder, setSelectedOrder] = useState(null); // State for selected order
  const [open, setOpen] = useState(false); // State for controlling modal visibility
  const { t } = useTranslation("index");
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showFailedPopup, setShowFailedPopup] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const isSuccess = searchParams.get("success");
    if (isSuccess === "true") {
      setShowSuccessPopup(true);
    }
    const isFailed = searchParams.get("failed");
    if (isFailed === "true") {
      setShowFailedPopup(true);
    }
  }, [location.search]);

  const queryClient = useQueryClient();

  const handleCancel = (id) => {
    Swal.fire({
      title: t("Are you sure?"),
      text: t("You won't be able to revert this!"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: t("Yes, cancel it!"),
    }).then((result) => {
      if (result.isConfirmed) {
        _axios
          .post(`/order/${id}/cancel`)
          .then((res) => {
            // orders
            queryClient.invalidateQueries(["orders"]);
            // Show a success message
            Swal.fire({
              icon: "success",
              title: t("Order Cancellation Requested"),
              text: t(
                "Your order cancellation has been requested and needs acceptance."
              ),
              confirmButtonText: t("Okay"),
            });
          })
          .catch((error) => {
            console.error(error);
            // Optionally show an error message
            Swal.fire({
              icon: t("error"),
              title: t("Oops..."),
              text: t("Something went wrong. Please try again."),
            });
          });
      }
    });
  };

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
  const { data, isLoading, error } = useOrders();

  const handleOrderClick = (order) => {
    setSelectedOrder(order); // Set the selected order
    setOpen(true); // Open the modal
  };

  const handleClose = () => {
    setOpen(false); // Close the modal
  };

  const filteredRows = (data?.data?.orders || []).filter((order) => {
    const matchesSearch = order.reference
      .toLowerCase()
      .includes(value.toLowerCase());
    const matchesStatus = statusValue
      ? order.status.toLowerCase() === statusValue.toLowerCase()
      : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <Card>
      <OrderSuccessPopup
        open={showSuccessPopup}
        onClose={() => setShowSuccessPopup(false)}
      />
      <OrderFailedPopup
        open={showFailedPopup}
        onClose={() => {
          setShowFailedPopup(false);
        }}
      />
      <CardHeader title={t("Orders History")} />
      <CardContent sx={{ pb: 4 }}></CardContent>
      {isLoading && <Typography sx={{ p: 5 }}>{t("Loading")}...</Typography>}
      {error && (
        <Typography color="error">{t("Error loading data")}.</Typography>
      )}
      <Grid container spacing={2} sx={{ p: 2 }}>
        {filteredRows.map((order) => {
          const { label, color, icon } = getStatusDetails(order.status);
          return (
            <Grid item xs={12} key={order.reference}>
              <Card variant="outlined">
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    justifyContent: "space-between",
                    alignItems: isMobile ? "flex-start" : "center",
                    gap: 2,
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <Typography variant="h6">
                      {t("Order Reference")}: #{order.reference}
                    </Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                      {t("Issued Date")}:{" "}
                      {new Date(order.lines[0].created_at).toLocaleDateString()}
                    </Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                      {t("Order Items")}:{" "}
                      {order.lines.map((line) => line.description).join(", ")}
                    </Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                      {t("Total")}: {order.total.toLocaleString()}{" "}
                      {t("currency")}
                    </Typography>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: 8,
                    }}
                  >
                    <Tooltip title={label}>
                      <Chip
                        label={label}
                        icon={icon}
                        color={color}
                        variant="outlined"
                        sx={{
                          fontWeight: "bold",
                          fontSize: "0.875rem",
                        }}
                      />
                    </Tooltip>
                    <IconButton
                      onClick={() => handleCancel(order.id)}
                      color="error"
                    >
                      <DeleteRounded />
                    </IconButton>
                    <IconButton
                      onClick={() => handleOrderClick(order)}
                      color="primary"
                    >
                      <Eye />
                    </IconButton>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Order Review Modal */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>
          {t("Order Review")}
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
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedOrder && <OrderReview item={selectedOrder} />}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default BillingHistoryTable;
