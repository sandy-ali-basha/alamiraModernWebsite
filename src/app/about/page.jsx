// Import necessary dependencies
import React from "react";
import { Box, Typography, Grid, Divider } from "@mui/material";
import image1 from "assets/images/image (1).jpg";
import image2 from "assets/images/image (2).jpg";
import image3 from "assets/images/image (3).jpg";
import image4 from "assets/images/image (4).jpg";
import image5 from "assets/images/image (5).jpg";
import { useTranslation } from "react-i18next";

const Page = () => {
  const { t } = useTranslation("about");
  return (
    <Box sx={{ px: 4 }}>
      <img
        src={image1}
        style={{ height: "50vh", width: "100%", objectFit: "cover" }}
        alt=""
      />
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: "url('/path-to-your-image.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          my: { md: 6, xs: 1 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        <Typography variant="h3" align="center">
          {t("Discover Timeless Elegance and Unmatched Craftsmanship")}
        </Typography>
      </Box>

      {/* Content Section */}
      <Box sx={{ my: 4 }}>
        <Typography variant="subtitle1" gutterBottom>
          {t("ABOUT US")}
        </Typography>
        <Typography variant="h4" gutterBottom>
          {t("Exquisite Quality, Timeless Craftsmanship")}
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4} sm={6}>
            <Typography variant="body1">
              {
                t("At ALAMIRA Jewelry, our name stands for unmatched quality and masterful craftsmanship. Since 1989, we’ve been crafting luxury jewelry that elevates elegance and transcends boundaries.")
              }
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sm={6}>
            <Typography variant="body1">
              {t(
                "From the heart of Dubai to the charm of Moscow, the heritage of Istanbul, the sophistication of London, and the legacy of Beirut, ALAMIRA Jewelry connects you to the world’s finest luxury hubs"
              )}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sm={6}>
            <Typography variant="body1">
              {t(
                "Each ALAMIRA creation is a celebration of artistry and enduring beauty. Discover the essence of luxury with us, where tradition meets innovation in every piece."
              )}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Divider />
      <Box
        sx={{
          display: "flex",
          flexDirection: { md: "row", xs: "column" },
          my: 4,
        }}
      >
        <Typography variant="h4" sx={{ px: 4, mb: 1 }}>
          01
        </Typography>
        <Typography variant="h4" sx={{ mb: 1 }}>
          {t("ALAMIRA JEWELRY: WHERE LUXURY MEETS ELEGANCE")}
        </Typography>
        <Typography variant="caption" sx={{ mb: 1 }}>
          {t(
            "At ALAMIRA Jewelry, every creation is a testament to unparalleled craftsmanship and timeless beauty. We blend tradition and innovation to craft pieces that resonate with sophistication and grace."
          )}
        </Typography>
      </Box>
      <Typography variant="h6">
        {t("Distinctive Craftsmanship, Timeless Artistry")}
      </Typography>
      <Typography variant="body1">
        {t(
          "Each design at ALAMIRA Jewelry tells a unique story. From the gleam of gold to the sparkle of precious stones, our collections are meticulously curated to celebrate life’s most cherished moments."
        )}
      </Typography>
      <Typography variant="body1">
        {t(
          "In every detail, we strive for perfection—offering you not just jewelry, but a legacy of elegance. Let ALAMIRA Jewelry be your partner in capturing memories that last a lifetime."
        )}
      </Typography>
      <Grid container spacing={4} sx={{ my: 4 }}>
        <Grid item md="3">
          <Typography variant="caption" sx={{ mb: 3 }}>
            {t("Our Promise to You")}
          </Typography>
          <Typography variant="h6" sx={{ mb: 3 }}>
            {t("Exceptional Quality")}
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            {t(
              "Every piece is crafted with precision and care, ensuring unmatched durability and brilliance."
            )}
          </Typography>

          <Typography variant="h6" sx={{ mb: 3 }}>
            {t("Global Expertise")}
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            {t(
              "Drawing inspiration from luxury hubs like Dubai, Istanbul, London, and Beirut, our designs embody universal charm and sophistication."
            )}
          </Typography>
          <Typography variant="h6" sx={{ mb: 3 }}>
            {t("Customer-Centric Service")}
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            {t(
              "Your satisfaction is our priority. We’re committed to providing a seamless experience, from selection to delivery."
            )}
          </Typography>
        </Grid>
        <Grid item md="6">
          <Box sx={{ width: "100%", height: "80vh" }}>
            <img
              src={image2}
              alt="2"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
        </Grid>
        <Grid item md="3">
          <Typography variant="body2" sx={{ mb: 3 }}>
            {t("ALAMIRA Jewelry: A Legacy of Luxury")}
          </Typography>
          <Typography variant="caption" sx={{ mb: 3, color: "text.secondary" }}>
            {t(
              "Craftsmanship refined by decades of expertise. Every piece designed to tell your story. Where tradition meets modern elegance. ALAMIRA Jewelry: Your timeless companion."
            )}
          </Typography>
          <img
            src={image3}
            alt="2"
            style={{ width: "100%", height: "50vh", objectFit: "cover" }}
          />
        </Grid>
      </Grid>
      <Divider />

      <Box
        sx={{
          display: "flex",
          my: 4,
          flexDirection: { md: "row", xs: "column" },
        }}
      >
        <Typography variant="h4" sx={{ px: 4, mb: 1 }}>
          02
        </Typography>
        <Typography variant="h4" sx={{ mb: 1 }}>
          {t("ALAMIRA JEWELRY: GOLD THAT INSPIRES, ELEGANCE THAT LASTS")}
        </Typography>
        <Typography variant="caption" sx={{ mb: 1 }}>
          {t(
            "Refined artistry shaped by timeless precision. A symbol of beauty, strength, and legacy. Crafted to shine in every moment of life. Gold at its finest, for those who seek perfection."
          )}
        </Typography>
      </Box>
      <Typography variant="body1">
        {t(
          "Every piece reflects the mastery of ALAMIRA. A journey of passion, created to inspire. Unite tradition with contemporary brilliance. Let every detail speak of luxury and heritage. With ALAMIRA, elegance meets enduring beauty. Celebrate life’s milestones with timeless gold. Discover the art of excellence in every design. Gold that lasts forever, crafted just for you."
        )}
      </Typography>
      <Grid container spacing={4} sx={{ my: 4 }}>
        <Grid item md="6">
          <Box sx={{ width: "100%", height: "80vh" }}>
            <img
              src={image5}
              alt="2"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
        </Grid>
        <Grid item md="3">
          <Typography variant="caption" sx={{ mb: 3 }}>
            {t("Timeless Luxury, Unparalleled Craftsmanship")}
          </Typography>
          <Typography variant="h6" sx={{ mb: 3 }}>
            {t("ALAMIRA Jewelry")}
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            {t(
              "Where craftsmanship meets timeless elegance. Our designs reflect luxury across the globe. From the heart of Turkey to Dubai’s opulence. We transform gold into lasting masterpieces."
            )}
          </Typography>
          <Typography variant="h6" sx={{ mb: 3 }}>
            {t("ALAMIRA Jewelry")}
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            {t(
              "Your destination for beauty and refinement. We bring you exceptional designs of prestige. Cherish your memories with our golden creations."
            )}
          </Typography>
        </Grid>
        <Grid item md="3">
          <img
            src={image4}
            alt="2"
            style={{ width: "100%", height: "50vh", objectFit: "cover" }}
          />

          <Typography variant="body1" sx={{ mt: 3, color: "text.secondary" }}>
            {t("Gold and Beauty")}
          </Typography>
          <Typography variant="caption" sx={{ mt: 3, color: "text.secondary" }}>
            {t(
              "Gold, the eternal symbol of elegance. It enhances the grace of every woman. From Turkey to Dubai, its glow inspires. A timeless reflection of strength and charm."
            )}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Page;
