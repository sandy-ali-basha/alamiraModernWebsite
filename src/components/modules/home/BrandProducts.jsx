import { Container, Typography } from "@mui/material";
import React from "react";
import ProductCard from "../ProductCard";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

export default function BrandProducts({ data }) {
  const { t } = useTranslation("index");

  return (
    data && (
      <Container>
        <Typography variant="h6" color="initial" sx={{ mb: 2 }}>
          {t("Our best sellers")}
        </Typography>
        <Swiper
          style={{ paddingTop: "2vh", paddingBottom: "2vh" }}
          spaceBetween={20}
          slidesPerView={2}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          lazy={true}
          modules={[Autoplay]}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
          }}
        >
          {data?.map((item, idx) => (
            <SwiperSlide key={idx}>
              <ProductCard
                productImage={item?.image?.image_path}
                productName={item?.name}
                Price={item?.price}
                link={`/store/product/${item?.id}/${item.name}`}
                purchasable={item?.purchasable === "always"}
                quantity={item?.quantity}
                offer={item?.compare_price}
                id={item?.id}
                category={item?.attributes[0]?.value}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    )
  );
}
