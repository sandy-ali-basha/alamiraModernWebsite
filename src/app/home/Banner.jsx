import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Skeleton,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import LazyImage from "components/modules/LazyImage";

const Banner = ({ data, isLoading }) => {
  const { t } = useTranslation("index");

  const items = isLoading ? Array.from({ length: 3 }) : data || [];

  return (
    <Box id="banner" sx={{ mb: 4 }}>
      <Grid container spacing={2}>
        {items?.map((_, index) => {
          return (
            <Grid item xs={6} md={4} key={index} sx={{ position: "relative" }}>
              <Box>
                {isLoading ? (
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={"40vh"}
                    sx={{ borderRadius: 2 }}
                  />
                ) : (
                  <LazyImage
                    src={data[index]?.image}
                    alt="img"
                    style={{
                      aspectRatio: 1,
                      width: "100%",
                      display: "block",
                      objectFit: "cover",
                    }}
                  />
                )}
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  textAlign: "center",
                  color: "white",
                  borderRadius: 5,
                }}
              >
                <Typography
                  variant="h2"
                  component="h2"
                  sx={{ fontSize: "1.5rem", fontWeight: "bold" }}
                >
                  {isLoading ? <Skeleton width="60%" /> : data[index]?.title}
                </Typography>
                <Button
                  href={!isLoading ? data[index]?.cta_link : "#"}
                  variant="outlined"
                  sx={{
                    mt: 2,
                    textTransform: "capitalize",
                    position: "relative",
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Skeleton width={100} height={30} />
                  ) : (
                    <>
                      {t("Shop Now")}
                      <svg
                        className="arrow-right"
                        width="18"
                        height="20"
                        style={{ position: "absolute", marginLeft: "8px" }}
                      >
                        <use xlinkHref="#arrow-right" />
                      </svg>
                    </>
                  )}
                </Button>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Banner;
