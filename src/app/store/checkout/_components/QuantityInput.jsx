import * as React from "react";
import { Unstable_NumberInput as BaseNumberInput } from "@mui/base/Unstable_NumberInput";
import { styled } from "@mui/system";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { _cart } from "api/cart/_cart";
import { useQueryClient } from "react-query";
const NumberInput = React.forwardRef(function CustomNumberInput(props, ref) {
  return (
    <BaseNumberInput
      slots={{
        root: StyledInputRoot,
        input: StyledInput,
        incrementButton: StyledButton,
        decrementButton: StyledButton,
      }}
      slotProps={{
        incrementButton: {
          children: <AddIcon fontSize="small" />,
          className: "increment",
        },
        decrementButton: {
          children: <RemoveIcon fontSize="small" />,
        },
      }}
      {...props}
      ref={ref}
    />
  );
});

export default function QuantityInput({ max, quantity, productID, cartID }) {
  const queryClient = useQueryClient();
  const handleQuantityChange = async (event, value) => {
    const updatedQuantity = value;
    const data = {
      products: {
        [productID]: {
          qty: updatedQuantity,
        },
      },
    };

    await _cart.UpdateCart({ data, cart_id: cartID }).then(() => {
      queryClient.invalidateQueries("cart");
    });
  };

  return (
    <NumberInput
      aria-label="Quantity Input"
      min={1}
      max={max}
      defaultValue={quantity}
      onChange={handleQuantityChange} // Add onChange handler
    />
  );
}
const gold = {
  100: "rgba(233, 43, 46, 0.20)",
  200: "rgba(233, 43, 46, 0.40)",
  300: "rgba(233, 43, 46, 0.60)",
  400: "rgba(233, 43, 46, 0.80)",
  500: "rgb(233, 43, 45)",
  600: "rgb(196, 43, 45)",
  700: "rgb(131, 43, 45)",
  800: "rgb(102, 43, 45)",
};


const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const StyledInputRoot = styled("div")(
  ({ theme }) => `
  font-family: 'Mulish', sans-serif;
  font-weight: 400;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[500]};
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`
);

const StyledInput = styled("input")(
  ({ theme }) => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.375;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  
  border-radius: 0px;
  margin: 0 8px;
  padding: 10px 12px;
  outline: 0;
  min-width: 0;
  width: 4rem;
  text-align: center;

  &:hover {
    border-color: ${gold[400]};
  }

  &:focus {
    border-color: ${gold[400]};
    
  }

  &:focus-visible {
    outline: 0;
  }
`
);

const StyledButton = styled("button")(
  ({ theme }) => `
  font-family: 'Mulish', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  line-height: 1.5;
  border: 1px solid;
  border-radius: 0px;
  border-color: ${theme.palette.mode === "dark" ? grey[800] : grey[200]};
  background: ${theme.palette.mode === "dark" ? grey[900] : grey[50]};
  color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};
  width: 32px;
  height: 32px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    cursor: pointer;
    background: ${theme.palette.mode === "dark" ? gold[700] : gold[500]};
    border-color: ${theme.palette.mode === "dark" ? gold[500] : gold[400]};
    color: ${grey[50]};
  }

  &:focus-visible {
    outline: 0;
  }

  &.increment {
    order: 1;
  }
`
);
