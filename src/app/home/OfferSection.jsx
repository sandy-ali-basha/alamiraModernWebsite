import React from "react";
import { Box, Grid, Typography, Button, Skeleton } from "@mui/material";
import { useTranslation } from "react-i18next";
import defaultImg from "assets/images/defaultImg.jpg";

const OfferSection = ({ banners, isLoading }) => {
  const { t } = useTranslation("index");
  const items = isLoading ? Array.from({ length: 2 }) : banners || [];

  return (
    <Box>
      <Grid container spacing={2} sx={{ my: 4 }}>
        {items?.map((banner, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Box
              sx={{
                position: "relative",
                overflow: "hidden",
                height: "250px",
                backgroundImage: `url(${banner?.image || defaultImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                padding: "1.5rem",
                color: "white",
                "&:hover": {
                  backgroundBlendMode: "darken",
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                  transition: "all 0.3s ease",
                },
              }}
            >
              {/* Display Skeleton Loader when loading */}
              {isLoading ? (
                <Skeleton variant="rectangular" width="100%" height="100%" />
              ) : (
                <>
                  <Box sx={{ maxWidth: "70%" }}>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: "bold", marginTop: "0.5rem" }}
                    >
                      {banner.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ marginTop: "0.5rem", marginBottom: "1rem" }}
                    >
                      {banner.description}
                    </Typography>
                    <Button
                      variant="text"
                      sx={{
                        color: "primary.main",
                        textDecoration: "underline",
                        fontWeight: "bold",
                        padding: "0",
                        fontSize: "14px",
                      }}
                    >
                      {t("Shop Now")}
                    </Button>
                  </Box>
                </>
              )}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default OfferSection;
