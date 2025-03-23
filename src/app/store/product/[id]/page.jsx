"use client";
import React from "react";
// import { Container, Grid, Box } from "@mui/material";
import {
  Box,
  Chip,
  Container,
  Grid,
  Typography,
  Button,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import defualt from "assets/images/defaultImg.jpg";
import { useTheme } from "@emotion/react";
import Simillar from "./_components/Simllar";
import AccordionUsage from "./_components/AccordionUsage";

import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useTranslation } from "react-i18next";
import { useProduct } from "./hooks/useProduct";
import { useAccourdion } from "./hooks/useAccourdion";
import { useSlider } from "./hooks/useSlider";
import { useAddToCart } from "hooks/cart/useAddToCart";
import { useFeatures } from "./hooks/useFeatures";

function Product() {
  const theme = useTheme();

  const { t } = useTranslation("index");
  const { data, isLoading } = useProduct();
  const { data: Acc, isLoading: AccLoading } = useAccourdion();
  const { data: Slider, isLoading: SliderLoading } = useSlider();
  const { data: features, isLoading: featuresLoading } = useFeatures();
  const { handleAddToCart, loadingCart } = useAddToCart();

  // const navigate = useNavigate();
  return (
    <Container sx={{ mt: 5 }}>
      <Grid container>
        <Grid item xs={12} md={6}>
          {isLoading ? (
            <Skeleton width={"100%"} height={"100%"} />
          ) : (
            <Swiper navigation={true} modules={[Navigation]} spaceBetween={10}>
              {data?.data?.images ? (
                data?.data?.images?.map((item, idx) => (
                  <SwiperSlide key={idx}>
                    <Box sx={{ width: "100%", height: "80vh" }}>
                      <img
                        src={item?.image_path}
                        alt={`Slide`}
                        style={{
                          objectFit: "contain",
                          width: "100%",
                          height: "100%",
                        }}
                        quality={100}
                      />
                    </Box>
                  </SwiperSlide>
                ))
              ) : (
                <SwiperSlide>
                  <Box sx={{ width: "100%", height: "100%" }}>
                    <img
                      src={defualt}
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                      }}
                      quality={100}
                      alt=""
                    />
                  </Box>
                </SwiperSlide>
              )}
            </Swiper>
          )}
        </Grid>
        <Grid xs={12} md={6}>
          <Typography
            sx={{ px: 2 }}
            color="initial"
            variant="h5"
            fontWeight={"bold"}
          >
            {isLoading ? <Skeleton /> : data?.data?.name}
          </Typography>

          <Box
            sx={{
              display: "flex",
              my: 1,
              px: 2,
              flexWrap: "wrap",
              gap: 1,
              alignItems: "center",
            }}
          >
            <Typography variant="h5" color="text.primary">
              {isLoading ? <Skeleton width="20%" /> : t("Price")}:
            </Typography>
            {isLoading ? (
              <Skeleton width="50%" />
            ) : (
              data?.data?.compare_price > 0 && (
                <Typography
                  sx={{
                    textDecoration: "line-through",
                    fontWeight: "bold",
                  }}
                  variant="h5"
                  color="text.secondary"
                >
                  {data?.data?.compare_price.toLocaleString()} {t("currency")}
                </Typography>
              )
            )}
            {isLoading ? (
              <Skeleton width="60%" height={30} />
            ) : (
              data?.data?.price && (
                <Typography
                  color="initial"
                  variant="h4"
                  sx={{ fontWeight: "bold" }}
                >
                  {data?.data?.price.toLocaleString()} {t("currency")}
                </Typography>
              )
            )}
            {data?.data?.compare_price > 0 && (
              <Chip
                color="success"
                size="small"
                variant="outlined"
                sx={{ px: "1", borderRadius: "0px" }}
                label={` - ${data?.data?.compare_price - data?.data?.price}`}
              />
            )}{" "}
          </Box>
          <hr />
          <Box sx={{ display: "flex", my: 1, px: 2, flexWrap: "wrap" }}>
            <Box>
              {/* {isLoading ? (
                <CardShimmer />
              ) : (
                data?.data?.brand && (
                  <Chip
                    onClick={() =>
                      navigate(
                        `/store/categories/brand/${data?.data?.brand?.id}`
                      )
                    }
                    label={data?.data?.brand?.name}
                    sx={{
                      m: "5px",
                      bgColor: `primary.lighter`,
                    }}
                  />
                )
              )} */}

              {/* {isLoading ? (
                <CardShimmer
                  style={{
                    width: "100px",
                    height: "15px",
                  }}
                />
              ) : (
                data?.data?.product_type && (
                  <Chip
                    label={data?.data?.product_type?.name}
                    sx={{
                      m: "5px",
                    }}
                    variant="outlined"
                  />
                )
              )} */}

              {isLoading ? (
                <Skeleton width="80%" height={20} />
              ) : (
                data?.data?.attributes &&
                data?.data?.attributes?.map((item, idx) => (
                  <Chip
                    label={item.value}
                    sx={{
                      m: 1,
                      borderRadius: "0px",
                    }}
                    color="primary"
                    variant="outlined"
                  />
                ))
              )}
            </Box>
          </Box>
          {/* {data?.data?.points > 0 && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "inline-flex", gap: 1, my: 2 }}
            >
              <PaidRounded color="warning" /> {t("you earn")}{" "}
              {data?.data?.points} {t("points by purchasing this product")}
            </Typography>
          )} */}

          <Box sx={{ mx: 2 }}>
            {isLoading ? (
              <>
                <Skeleton width="100%" height={20} />
                <Skeleton width="100%" height={20} />
                <Skeleton width="100%" height={20} />
              </>
            ) : (
              <>
                <Typography
                  sx={{ px: 2 }}
                  variant="initial"
                  fontWeight={"bold"}
                >
                  {t("Description")}
                </Typography>
                <Typography
                  variant="initial"
                  sx={{ wordBreak: "break-all" }}
                  dangerouslySetInnerHTML={{ __html: data?.data?.description }}
                ></Typography>
              </>
            )}
          </Box>

          <Box sx={{ px: 2 }}>
            {data?.data?.properties && isLoading ? (
              <Skeleton width="20%" height={30} />
            ) : (
              data?.data?.properties?.map((item, idx) => (
                <Chip
                  key={idx}
                  label={item?.title}
                  icon={item?.icon}
                  sx={{
                    m: 1,
                    color: `alpha(${theme.palette.common.white}, 0.15)`,
                  }}
                />
              ))
            )}
          </Box>

          <Box sx={{ my: 5, px: 3 }}>
            {featuresLoading && <Skeleton width="100%" height="100%" />}
            <Swiper spaceBetween={10} slidesPerView={5}>
              {features &&
                features?.data?.map((item, idx) => (
                  <SwiperSlide key={idx}>
                    <Box
                      sx={{
                        width: "100%",
                      }}
                    >
                      <img
                        src={item?.image_path}
                        alt={`Slide `}
                        style={{
                          objectFit: "cover",
                          width: "100%",
                        }}
                        quality={100}
                      />
                    </Box>
                  </SwiperSlide>
                ))}
            </Swiper>
          </Box>
          {data?.data?.purchasable === "always" && (
            <Box display="flex" alignItems="center" justifyContent="center">
              <Button
                size="large"
                sx={{ width: "90%", p: 1, mt: 2 }}
                variant="outlined"
                color="secondary"
                onClick={() => handleAddToCart(data?.data?.id)}
                disabled={isLoading}
              >
                {loadingCart ? (
                  <CircularProgress
                    style={{ height: "auto", width: "1.5rem", color: "secondary.main" }}
                  />
                ) : (
                  <Typography> {t("Add To Cart")}</Typography>
                )}
              </Button>
            </Box>
          )}
        </Grid>
      </Grid>

      <Box sx={{ m: 3 }}>
        <AccordionUsage data={Acc} isLoading={AccLoading} />
      </Box>

      <Box sx={{ my: 5, px: 3 }}>
        {SliderLoading && (
          <Skeleton
            sx={{
              width: "100%",
              height: { md: "80vh" },
            }}
          />
        )}
        <Swiper>
          {Slider &&
            Slider?.data?.images?.map((item, idx) => (
              <SwiperSlide key={idx}>
                <Box
                  sx={{
                    width: "100%",
                    height: { md: "80vh" },
                  }}
                >
                  <img
                    src={item?.image_path}
                    alt={`Slide `}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                    }}
                    quality={100}
                  />
                </Box>
              </SwiperSlide>
            ))}
        </Swiper>
      </Box>
      <Simillar id={data?.data?.id} />
    </Container>
  );
}

export default Product;
