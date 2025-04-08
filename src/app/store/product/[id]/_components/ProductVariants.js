import { useState } from "react";
import {
  Button,
  Chip,
  Stack,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useAddToCart } from "hooks/cart/useAddToCart";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

const ProductVariants = ({ variants }) => {
  const params = useParams();
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const { handleAddToCart, loadingCart } = useAddToCart();
  const [shake, setShake] = useState(false);
  const { t } = useTranslation("index");

  // Extract unique colors
  const colors = [
    ...new Set(
      variants.map((v) => (v.options.length > 0 ? v.options[0].name.ar : ""))
    ),
  ];

  // Get available sizes for the selected color
  const sizes = selectedColor
    ? [
        ...new Set(
          variants
            .filter((v) => v.options[0].name.ar === selectedColor)
            .map((v) => v.options[1].name.ar)
        ),
      ]
    : [];

  // Get the matching variant object
  const selectedVariant = variants.find(
    (v) =>
      v.options[0].name.ar === selectedColor &&
      v.options[1].name.ar === selectedSize
  );

  const handleCartClick = () => {
    if (!selectedColor || !selectedSize || !selectedVariant) {
      setShake(true);
      Swal.fire({
        icon: "warning",
        title: t("Please select a color and size"),
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
      });
      setTimeout(() => setShake(false), 500);
      return;
    }
    // const cartData = {
    //   product_id: params.id,
    //   options: [selectedVariant.options[0].id, selectedVariant.options[1].id],
    // };
    const cartData = {
      products: {
        [params.id]: {
          qty: 1,
          options: [
            selectedVariant.options[0].id,
            selectedVariant.options[1].id,
          ],
        },
      },
    };

    handleAddToCart(cartData);
  };

  console.log("selectedVariant", selectedVariant);
  return (
    <>
      <motion.div
        animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.6 }}
      >
        <Typography sx={{ py: 2 }} fontWeight="bold">
          {t("Select Color")}:
        </Typography>
        <Stack direction="row" spacing={1}>
          {colors.map((color) => (
            <Chip
              key={color}
              label={color}
              onClick={() => {
                setSelectedColor(color);
                setSelectedSize(null);
              }}
              sx={{ px: "1", borderRadius: "0px" }}
              color={selectedColor === color ? "primary" : "default"}
            />
          ))}
        </Stack>

        <Typography sx={{ py: 2 }} fontWeight="bold">
          {t("Select Size")}:
        </Typography>
        {sizes.length > 0 ? (
          <Stack direction="row" spacing={1}>
            {sizes.map((size) => (
              <Chip
                key={size}
                label={size}
                onClick={() => setSelectedSize(size)}
                color={selectedSize === size ? "primary" : "default"}
                sx={{ px: "1", borderRadius: "0px" }}
              />
            ))}
          </Stack>
        ) : (
          <Typography color="text.secondary">
            {t("select color first")}
          </Typography>
        )}
      </motion.div>
      <Button
        size="large"
        sx={{ width: "90%", p: 1, mt: 4 }}
        variant="outlined"
        color="secondary"
        onClick={handleCartClick}
        disabled={loadingCart}
      >
        {loadingCart ? (
          <CircularProgress
            style={{ height: "auto", width: "1.5rem", color: "secondary.main" }}
          />
        ) : (
          <Typography>{t("Add To Cart")}</Typography>
        )}
      </Button>
    </>
  );
};

export default ProductVariants;
