import {
  Grid,
  Typography,
  IconButton,
  Button,
  Container,
  Box,
  Divider,
  Skeleton,
} from "@mui/material";
import React from "react";
import tiktok from "assets/images/icons/tiktok.svg";
import { Facebook, Instagram, WhatsApp } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import logo from "assets/images/logo.png";
import { _terms } from "api/terms/terms";
import { useQuery } from "react-query";

function Footer() {
  const { t } = useTranslation("index");
  const MenuItems = [
    { href: "/", title: t("Home") },
    { href: "/contact-us", title: t("Contact") },
    { href: "/login", title: t("Log In") },
    { href: "/store", title: t("Products") },
    { href: "//store/offers", title: t("Offers") },
    { href: "/about", title: t("about us") },
  ];
  const { data: termsData, isLoading: isLoadingTerms } = useQuery(
    ["terms"],
    () => _terms.getTerms().then((res) => res?.data)
  );
  return (
    <footer>
      <Container sx={{ py: 4, mt: 5 }}>
        <Divider></Divider>
        <Grid container sx={{ mt: 5 }}>
          <Grid item xs={12} md={6} lg={3}>
            <Box sx={{ width: "10vw", mb: 3 }}>
              <img alt="logo" src={logo} style={{ width: "50%" }} />
            </Box>
            <Box sx={{ mb: 2 }}>
            {t("Les plus belles et dernières tendances à des prix imbattables – Une sélection élégante de robes de soirée et de vêtements de sortie.")}
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            lg={3}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography variant="body1" color="initial">
              {t("USEFUL LINKS")}
            </Typography>

            {MenuItems.map((item, index) => (
              <Button
                size="small"
                href={item.href}
                variant={"text"}
                key={index}
              >
                {item.title}
              </Button>
            ))}
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            lg={3}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography href={"/contact-us"} variant="body1" color="initial">
              {t("LET US HELP YOU")}
            </Typography>
            <Button href={"/profile/orders"} variant={"text"} size="small">
              {t("Your Orders")}
            </Button>
            <Button href={"/store/offers"} variant={"text"} size="small">
              {t("All Offers")}
            </Button>
            {isLoadingTerms ?? (
              <Button size="small" variant={"text"} href={`/`}>
                <Skeleton />{" "}
              </Button>
            )}
            {termsData?.terms?.map((item, index) => (
              <Button
                size="small"
                variant={"text"}
                key={index}
                href={`/terms/${item.id}`}
              >
                {item.name}
              </Button>
            ))}
          </Grid>
          <Grid
            xs={12}
            md={6}
            lg={3}
            item
            sx={{
              mb: 2,
            }}
          >
            {" "}
            <Typography variant="body1" color="initial">
              {t("Our Social Media")}
            </Typography>
            <Box sx={{ display: "flex" }}>
              <IconButton
                href="https://www.facebook.com/profile.php?id=61552729317851"
                aria-label="facebook"
              >
                <Facebook />
              </IconButton>
              <IconButton
                href="https://www.tiktok.com/@alamira_moderne?_t=ZN-8uLQiUZtALW&_r=1"
                aria-label="facebook"
              >
                
            <img src={tiktok} style={{width:'1.25rem'}} alt="tiktok" />
          
              </IconButton>
              <IconButton
                href="https://www.instagram.com/al_amira_modern?igsh=MXN4bmRuc3k0OGJ2dA=="
                aria-label="instagram"
              >
                <Instagram />
              </IconButton>

              <IconButton
                href="https://wa.me/"
                aria-label="whatsapp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsApp />
              </IconButton>
            </Box>
          </Grid>
          <Grid
            item
            xs="12"
            md={12}
            sx={{
              mt: 2,
              display: "flex",
              alignItems: "flex-center",
              justifyContent: "flex-center",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Divider></Divider>
            <Typography sx={{ fontWeight: "300" }} variant="body3">
              {t("© 2025 XYZ. All rights reserved.")}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
}

export default Footer;
