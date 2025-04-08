import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import StepCart from "./StepCart";
import StepAddress from "./StepAddress";
import StepPayment from "./StepPayment";
import StepConfirmation from "./StepConfirmation";
import MuiStepper from "@mui/material/Stepper";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import CreditScoreRoundedIcon from "@mui/icons-material/CreditScoreRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import Swal from "sweetalert2";
import { _addresses } from "api/addresses/addresses";

import { ValueStore } from "store/categoryStore";
import { useTranslation } from "react-i18next";
import { useTheme } from "@emotion/react";
import StepperWrapper from "./_components/StepperWrapper";
import {
  KeyboardArrowLeftRounded,
  KeyboardArrowRightRounded,
} from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";

// ** Styled Stepper Component
const Stepper = styled(MuiStepper)(({ theme }) => ({
  margin: "auto",
  maxWidth: 800,
  justifyContent: "space-around",
  flexDirection: "row !important",
}));

const Checkout = () => {
  // ** States
  const [activeStep, setActiveStep] = useState(0);
  const [selectedBasicRadio, setSelectedBasicRadio] = useState();
  const [orderId, setOrderId] = useState();
  const [orderResponse, setOrderResponse] = useState(null); // New state for storing order response
  const { t } = useTranslation("index");
  const theme = useTheme();
  const [value] = ValueStore((state) => [state.value]);

  const steps = [
    {
      title: t("Cart"),
      icon: <ShoppingCartRoundedIcon />,
    },
    {
      title: t("Address"),
      icon: <BusinessRoundedIcon />,
    },
    {
      title: t("Payment"),
      icon: <CreditScoreRoundedIcon />,
    },
    {
      title: t("Confirmation"),
      icon: <ReceiptLongRoundedIcon />,
    },
  ];


  // Main function to handle the order and initiate polling
  const handleNext = async () => {
    if (activeStep === 2) {
      // StepAddress is active
      const addressId = selectedBasicRadio;
      const userData = JSON.parse(localStorage.getItem("userData"));
      const cart_id = JSON.parse(localStorage.getItem("cart_id"));

      if (!orderId) {
        const orderData = {
          address_id: addressId,
          first_name: userData?.first_name,
          last_name: userData?.last_name,
          email: userData?.email,
          message: "message",
          cart_id: cart_id,
          payment_method: value,
        };
        await _addresses.order(orderData).then((res) => {
          setOrderId(res?.data?.id);
          if (res?.code === 200) {
            setOrderResponse(res.data); // Store the order response
            localStorage.removeItem("cart_id");
            localStorage.removeItem("cart_count");
            if (value === "paypal") {
              const paymentUrl = res.data.payment_details;
              if (paymentUrl) {
                window.open(paymentUrl, "_blank"); // open in new tab
              }
            }

            // setActiveStep((prevStep) => prevStep + 1);
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: res?.error?.message,
              toast: true,
              position: "bottom-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
            });
          }
        });
      } else {
        const orderData = {
          payment_method: value,
        };
        await _addresses.UpdateOrder({ orderId, orderData }).then((res) => {
          setOrderId(res?.data?.id);
          if (res?.code === 200) {
            setOrderResponse(res.data); // Store the order response
            localStorage.removeItem("cart_id");
            localStorage.removeItem("cart_count");
            // setActiveStep((prevStep) => prevStep + 1); 
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: res?.error?.message,
              toast: true,
              position: "bottom-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
            });
          }
        });
      }
    } else {
      setActiveStep((prevStep) => prevStep + 1); // Move to the next step for other steps
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <StepCart handleNext={handleNext} />;
      case 1:
        return (
          <StepAddress
            handleNext={handleNext}
            selectedBasicRadio={selectedBasicRadio}
            setSelectedBasicRadio={setSelectedBasicRadio}
          />
        );
      case 2:
        return <StepPayment handleNext={handleNext} />;
      case 3:
        return <StepConfirmation orderResponse={orderResponse} />; // Pass the order response to the last step
      default:
        return null;
    }
  };
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Card>
      <CardContent sx={{ p: 2 }}>
        <StepperWrapper
          style={{
            overflowX: "auto",
            whiteSpace: "nowrap",
            width: "100%",
            paddingBottom: "10px", // Prevents stepper from being cut off
          }}
        >
          <Stepper
            activeStep={activeStep}
            connector={
              theme.direction === "ltr" ? (
                <KeyboardArrowRightRounded />
              ) : (
                <KeyboardArrowLeftRounded />
              )
            }
            sx={{
              display: "flex",
              flexDirection: isMobile ? "row" : "column",
              width: "max-content", // Prevents steps from shrinking
            }}
          >
            {steps.map((step, index) => (
              <Step key={index}>
                <StepLabel icon={<></>}>
                  <Typography>{step.title}</Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </StepperWrapper>
      </CardContent>
      <CardContent>{getStepContent(activeStep)}</CardContent>
    </Card>
  );
};

export default Checkout;
