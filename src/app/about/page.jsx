// Import necessary dependencies
import React from "react";
import { Box, Typography, Grid, Container } from "@mui/material";
import image1 from "assets/images/about/carpets-market-marrakech.jpg";
import image2 from "assets/images/about/medium-shot-people-looking-clothes.jpg";
import image4 from "assets/images/about/set-designer-work-indoors.jpg";
import image5 from "assets/images/about/women-shopping-ramadan-front-view.jpg";
import { useTranslation } from "react-i18next";

const Page = () => {
  const { t } = useTranslation("about");
  return (
    <>
      <img
        src={image1}
        style={{ height: "50vh", width: "100%", objectFit: "cover" }}
        alt=""
      />
      <Container sx={{ px: 4 }}>
        {/* Hero Section */}
        <Box
          sx={{
            my: { md: 6, xs: 1 },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
          }}
        >
          <Typography variant="h3" align="center">
            {t("AL AMIRA MODERNE")}
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ my: 4, alignItems: "center" }}>
          <Grid item md="6">
            <Typography variant="h4" sx={{ mb: 4 }}>
              {t("title1")}
            </Typography>
            <Typography variant="h6" sx={{ mb: 6 }}>
              {t("title2")}
            </Typography>
          </Grid>
          <Grid item md="6">
            <img
              src={image5}
              alt="2"
              style={{ width: "100%", height: "80vh", objectFit: "cover" }}
            />
          </Grid>
          <Grid item md="12">
            <Box
              sx={{
                my: 10,
              }}
            >
              <Typography variant="h4" sx={{ mb: 1 }}>
                {t("sectionTitle")}
              </Typography>
              <Typography variant="h6" sx={{ color: "text.secondary" }}>
                {t("section_sub_title")}
              </Typography>
            </Box>
          </Grid>

          <Grid item md="7">
            <img
              src={image4}
              alt="2"
              style={{ width: "100%", height: "50vh", objectFit: "cover" }}
            />
          </Grid>
          <Grid item md="5">
            <Typography variant="h4" sx={{ mb: 5 }}>
              {t("section_body")}
            </Typography>
            <Typography variant="h6" sx={{ mb: 3, color: "text.secondary" }}>
              {t("section2_title")}
            </Typography>
          </Grid>
          <Grid item md="12" sx={{ textAlign: "center" }}>
            <Typography variant="h5" sx={{ pt: 2, my: 3, textAlign: "center" }}>
              {t("review")}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                my: 3,
                pb: 3,
                color: "text.secondary",
                textAlign: "center",
              }}
            >
              {t("end")}
            </Typography>

            <Box sx={{ height: ["60vh", "50vh"] }}>
              <img
                src={image2}
                alt="2"
                style={{ width: "100%", height: "inherit", objectFit: "cover" }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Page;
