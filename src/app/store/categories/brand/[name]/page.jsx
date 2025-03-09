import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useParams } from "react-router-dom";
import { useBrandPage } from "hooks/brands/useBrand";
import Loader from "components/modules/Loader";
import BrandProducts from "components/modules/home/BrandProducts";

export default function Brand() {
  const { id } = useParams(); // Get the brand ID from the URL params
  const { data, isLoading } = useBrandPage(id);

  if (isLoading)
    return (
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Loader />
      </Box>
    );

  return (
    <Box sx={{ mb: 4 }}>
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        {data?.slides?.map((item, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                aspectRatio: "16/9",
                color: "white",
                textAlign: "center",
              }}
            >
              <img
                src={item?.image_path}
                alt={`Slide ${index + 1}`}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                }}
              />
              {/* <Box
                sx={{
                  position: "relative",
                  zIndex: 1,
                  width: { md: "50%", xs: "100%" },
                }}
              >
                <Typography variant="h2" color="inherit">
                  {item?.translations?.find((t) => t.locale === lang)?.title}
                </Typography>
                <Typography sx={{ mt: 2 }} variant="body1" color="inherit">
                  {item?.translations?.find((t) => t.locale === lang)?.text}
                </Typography>
              </Box> */}
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
      <Container>
        <Grid container sx={{ my: 6 }}>
          <Grid
            item
            md={6} 
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={data?.image} style={{ width: "50%" }} alt="" />
          </Grid>
          <Grid item md={6}>
            <Typography variant="h5">{data?.name}</Typography>
            <Typography
              variant="body1"
              dangerouslySetInnerHTML={{ __html: data?.text }}
            ></Typography>
          </Grid>
        </Grid>

        {data?.products && <BrandProducts data={data?.products} />}
      </Container>
    </Box>
  );
}
