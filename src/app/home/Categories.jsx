import React from "react";
import { Box, Typography, Skeleton } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import LazyImage from "components/modules/LazyImage";
import { useTranslation } from "react-i18next";

const Categories = ({ data, isLoading }) => {
  const items = isLoading ? Array.from({ length: 6 }) : data || [];
  const { t } = useTranslation("index");
  return (
    <Box sx={{ my: 4, px: 1, background: "#efddee", borderRadius: 2 }}>
      <Typography variant="h5" sx={{ mb: 3, p: 2, textAlign: "center" }}>
        {t("Explore Our Collection")}
      </Typography>
      <Swiper
        modules={[Pagination]}
        spaceBetween={16}
        slidesPerView={2}
        breakpoints={{
          0: { slidesPerView: 4 },
          640: { slidesPerView: 5 },
          900: { slidesPerView: 6 },
          1200: { slidesPerView: 7 },
        }}
        pagination={{ clickable: true }}
        style={{ paddingBottom: "20px" }} // Adjust for pagination dots
      >
        {items.map((category, index) => (
          <SwiperSlide key={category?.id || index}>
            <a href={!isLoading ? category?.cta_link : "/"}>
              <Box
                sx={{
                  position: "relative",
                  overflow: "hidden",
                  textAlign: "center",
                }}
              >
                {isLoading ? (
                  <Skeleton variant="circular" width="100%" />
                ) : (
                  <LazyImage
                    src={category?.image}
                    alt={category?.title}
                    style={{
                      objectFit: "cover",
                      borderRadius: "500px",
                      width: "100%",
                      aspectRatio: 1,
                    }}
                  />
                )}

                {/* Overlay Text */}
                <Box
                  sx={{
                    color: "white",
                    padding: "0.5rem",
                    textAlign: "center",
                    background: isLoading ? "rgba(0,0,0,0.1)" : "none",
                  }}
                >
                  {isLoading ? (
                    <>
                      <Skeleton width="60%" height={30} />
                      <Skeleton width="80%" height={20} />
                    </>
                  ) : (
                    <>
                      <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                        {category?.title}
                      </Typography>
                      <Typography
                        variant="caption"
                        dangerouslySetInnerHTML={{
                          __html: category.description,
                        }}
                      ></Typography>
                    </>
                  )}
                </Box>
              </Box>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default Categories;
