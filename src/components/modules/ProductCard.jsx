import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Skeleton,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import defaultImg from "assets/images/defaultImg.jpg";
import { useTranslation } from "react-i18next";
import { useAddToCart } from "hooks/cart/useAddToCart";

export default function ProductCard({
  productName,
  Price,
  productImage,
  offer,
  link,
  loading,
  id,
  purchasable,
  category,
  quantity,
}) {
  const { handleAddToCart, loadingCart } = useAddToCart();
  const { t } = useTranslation("index");
  const [hovered, setHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Detect touch devices
  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(hover: none)").matches);
  }, []);

  return (
    <Card
      sx={{
        boxShadow: 0,
        borderRadius: "0px",
        "&:hover .price": {
          transform: isTouchDevice ? "none" : "translateY(100%)",
        },
        "&:hover .add-to-cart": {
          transform: isTouchDevice ? "none" : "translateY(0)",
        },
      }}
      onMouseEnter={() => !isTouchDevice && setHovered(true)}
      onMouseLeave={() => !isTouchDevice && setHovered(false)}
    >
      <Link to={loading ? "#" : link} style={{ textDecoration: "none" }}>
        {loading ? (
          <Skeleton
            variant="rectangular"
            width="100%"
            sx={{ aspectRatio: 1 }}
          />
        ) : (
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              width: "100%",
              aspectRatio: 1,
            }}
          >
            <CardMedia
              sx={{
                width: "100%",
                height: "100%",
                backgroundSize: "cover",
                backgroundPosition: "center",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: isTouchDevice ? "none" : "scale(1.3)",
                },
              }}
              image={productImage || defaultImg}
              title={productName}
            />
          </Box>
        )}
      </Link>

      <CardContent>
        {/* Category */}
        <Typography
          variant="body2"
          sx={{ fontWeight: "bold", color: "text.secondary" }}
        >
          {loading ? <Skeleton width="60%" height={20} /> : category}
        </Typography>

        {/* Product Name */}
        <Typography variant="body1" color="initial" sx={{ py: 2 }}>
          {loading ? (
            <Skeleton width="80%" height={20} />
          ) : productName?.split(" ").length > 5 ? (
            productName?.split(" ").slice(0, 7).join(" ") + " ..."
          ) : (
            productName
          )}
        </Typography>

        {/* Price */}
        <Box sx={{ position: "relative", overflow: "hidden" }}>
          <Box
            className="price"
            sx={{
              transition: "transform 0.3s ease-in-out",
              transform:
                hovered || isTouchDevice ? "translateY(0%)" : "translateY(100)",
              display: "flex",
              gap: 2,
            }}
          >
            <Typography
              variant="body1"
              sx={{
                textDecoration: offer ? "line-through" : "none",
                fontSize: offer ? "small" : "inherit",
                fontWeight: "bold",
              }}
              color={offer ? "text.secondary" : "primary.red"}
            >
              {loading ? (
                <Skeleton width="50%" height={20} />
              ) : (
                <>
                  {offer > 0 ? offer.toLocaleString() : Price.toLocaleString()}{" "}
                  {t("currency")}
                </>
              )}
            </Typography>
            {offer > 0 && (
              <Typography variant="body1" color="primary.red">
                {Price.toLocaleString()} {t("currency")}
              </Typography>
            )}
          </Box>

          {/* Add to Cart - Always visible on touch devices */}
          {purchasable && !loading && (
            <Box
              className="add-to-cart"
              sx={{
                position: isTouchDevice ? "relative" : "absolute",
                bottom: isTouchDevice ? "unset" : "0",
                transform: isTouchDevice ? "none" : "translate(-50%, 100%)",
                transition: "transform 0.3s ease-in-out",
                cursor: "pointer",
                mt: isTouchDevice ? 1 : 0, // Adds space below price on touch devices
              }}
              onClick={() => handleAddToCart(id)}
            >
              {loadingCart ? (
                <CircularProgress size={20} />
              ) : (
                <Typography sx={{ color: "primary.red", fontWeight: "bold" }}>
                  {t("Add To Cart")}
                </Typography>
              )}
            </Box>
          )}
        </Box>

        {/* Stock Status */}
        <Typography
          variant="caption"
          sx={{
            fontWeight: "bold",
            py: 2,
            color: quantity > 0 ? "success.main" : "error.main",
          }}
        >
          {loading ? (
            <Skeleton width="40%" height={20} />
          ) : quantity > 0 ? (
            t("IN STOCK")
          ) : (
            t("SOLD OUT")
          )}
        </Typography>
      </CardContent>
    </Card>
  );
}
