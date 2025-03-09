import React from "react";
import { Box, Typography, Button } from "@mui/material";

const BannerSection = ({ banner }) => {
  return (
    <>
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          minHeight: "250px",
          backgroundImage: `url(${banner?.backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          padding: "1.5rem",
          color: "white",
          "&:hover": {
            backgroundBlendMode: "darken",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            transition: "all 0.3s ease",
          },
        }}
      >
        <Box sx={{ maxWidth: "70%" }}>
          <Typography
            variant="overline"
            sx={{ fontSize: "12px", fontWeight: "bold" }}
          >
            {banner.saleText}
          </Typography>
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
            {banner.subtitle}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default BannerSection;
