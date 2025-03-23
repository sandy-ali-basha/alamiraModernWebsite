import { Box, Grid, Skeleton, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Banner from "./home/Banner";
import Categories from "./home/Categories";
import OfferSection from "./home/OfferSection";
import BestSellers from "components/modules/home/BestSellers";
import { useHome } from "hooks/home/useHome";
import LazyImage from "components/modules/LazyImage";
import Reels from "components/modules/home/Reels";
import Sale from "components/modules/home/Sale";

export default function Home() {

  const { data, isLoading } = useHome();

  const categories = isLoading
    ? Array.from({ length: 1 })
    : data?.home_sections?.filter((section) => section.type === "categories") ||
      [];

  const banner = isLoading
    ? Array.from({ length: 1 })
    : data?.home_sections?.filter((section) => section.type === "banner") || [];

  return (
    <Box sx={{ px: 2, pt: 2 }}>
        {categories?.map((section) => (
          <Categories data={section?.items} isLoading={isLoading} />
        ))}
      <Grid container spacing={2} sx={{my:2}}>
        <Grid item md="6" sm="12" xs="12">
          {isLoading || !data?.home_sections?.length ? (
            <Skeleton variant="rectangular" width={"100vw"} height={"100vh"} />
          ) : (
            <Swiper
              autoplay={{
                delay: 5500,
                disableOnInteraction: false,
              }}
              lazy={true}
              modules={[Autoplay]}
            >
              {data?.home_sections
                ?.filter((section) => section.type === "slider") // Filter sections of type "banner"
                .map((section, idx) => (
                  <Box key={section.id}>
                    {section.items.map((item) => (
                      <SwiperSlide key={item.id}>
                        <Link to={item.cta_link}>
                          <Box
                            sx={{
                              position: "relative",
                              aspectRatio: "4/3" ,
                            }}
                          >
                            <LazyImage
                              src={item?.image}
                              alt={`Slide`}
                              style={{
                                objectFit: "cover",
                                width: "100%",
                                height: "100%",
                                position: "absolute",
                              }}
                            />
                            <Box
                              sx={{
                                position: "relative",
                                zIndex: 1,
                                px: { md: 4, xs: 0 },
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                color: "black",
                                textAlign: "center",
                                width: "100%",
                                height: "100%",
                              }}
                            >
                              <Typography
                                variant="body1"
                                color="white"
                                sx={{ width: { xs: "90%", md: "70%" } }}
                              >
                                {item.description}
                              </Typography>
                            </Box>
                          </Box>
                        </Link>
                      </SwiperSlide>
                    ))}
                  </Box>
                ))}
            </Swiper>
          )}
        </Grid>
        <Grid item md="6" sm="12" xs="12">
          {isLoading || !data?.home_sections?.length ? (
            <Skeleton variant="rectangular" width={"100vw"} height={"100vh"} />
          ) : (
            <Swiper
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              lazy={true}
              modules={[Autoplay]}
            >
              {data?.home_sections
                ?.filter((section) => section.type === "slider2") // Filter sections of type "banner"
                .map((section, idx) => (
                  <Box key={section.id}>
                    {section.items.map((item) => (
                      <SwiperSlide key={item.id}>
                        <Link to={item.cta_link}>
                          <Box
                            sx={{
                              position: "relative",
                              aspectRatio:  "4/3",
                            }}
                          >
                            <LazyImage
                              src={item?.image}
                              alt={`Slide`}
                              style={{
                                objectFit: "cover",
                                width: "100%",
                                height: "100%",
                                position: "absolute",
                              }}
                            />
                            <Box
                              sx={{
                                position: "relative",
                                zIndex: 1,
                                px: { md: 4, xs: 0 },
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                color: "black",
                                textAlign: "center",
                                width: "100%",
                                height: "100%",
                              }}
                            >
                              <Typography
                                variant="body1"
                                color="white"
                                sx={{ width: { xs: "90%", md: "70%" } }}
                              >
                                {item.description}
                              </Typography>
                            </Box>
                          </Box>
                        </Link>
                      </SwiperSlide>
                    ))}
                  </Box>
                ))}
            </Swiper>
          )}
        </Grid>
      </Grid>
      <Box sx={{ p: 2, my: 3 }}>
        <BestSellers all={true}/>
      </Box>
      {isLoading || !data?.home_sections?.length ? (
        <Banner data={false} isLoading={isLoading} />
      ) : (
        data?.home_sections
          ?.filter((section) => section.type === "collections")
          .map((section) => <Banner data={section?.items} />)
      )}
      <Sale/>
      <Reels />
      {banner.map((section, idx) => (
        <OfferSection
          key={idx}
          banners={section?.items}
          isLoading={isLoading}
        />
      ))}
      
      <Box sx={{ p: [0,2], my: 3 }}>
        <BestSellers all={false}/>
      </Box>
    </Box>
  );
}
