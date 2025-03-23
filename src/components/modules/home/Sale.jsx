import React from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useOffers } from "hooks/offers/useOffers";
import ProductCard from "../ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";

export default function Sale() {
  const { data, isLoading } = useOffers();
  const { t } = useTranslation("index");
  const navigate = useNavigate();

  const products = data?.data?.products?.slice(0, 15) || [];

  return (
    data?.data?.products && (
      <Box
        sx={{
          background: "linear-gradient(to bottom right, #f9f9f9, #e0e0ff)",
          py: 6,
          px: 2,
        }}
      >
        <Typography
          variant="h5"
          sx={{ textAlign: "center", mb: 4, fontWeight: "bold" }}
        >
          {t("Offers")}
        </Typography>

        <Swiper
          spaceBetween={16}
          slidesPerView={2}
          navigation
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
          modules={[Navigation, Autoplay]}
          autoplay={{
            delay: 7000,
            disableOnInteraction: false,
          }}
          lazy={true}
        >
          {products.map((item, idx) => (
            <SwiperSlide key={idx}>
              <ProductCard
                productImage={item?.images[0]?.image_path}
                productName={item?.name}
                Price={item?.price}
                link={`/store/product/${item?.id}/${item.name}`}
                purchasable={item?.purchasable === "always"}
                offer={item?.compare_price}
                id={item?.id}
                category={item?.attributes[0]?.value}
                loading={isLoading}
                quantity={item?.quantity}
              />
            </SwiperSlide>
          ))}

          {/* View More Card */}
          <SwiperSlide key="view-more">
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => navigate("/store/offers")}
            >
              <Typography
                variant="h6"
                sx={{
                  border: "2px dashed #ccc",
                  borderRadius: 2,
                  p: 2,
                  textAlign: "center",
                  backgroundColor: "#ffffff",
                  cursor: "pointer",
                  fontWeight: "medium",
                }}
              >
                {t("View More Offers")}
              </Typography>
            </Box>
          </SwiperSlide>
        </Swiper>
      </Box>
    )
  );
}
