import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import DefualtLogo from "assets/images/defualtBrand.png";
import { useTranslation } from "react-i18next";
import { useBrand } from "hooks/brands/useBrand";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import CardShimmer from "components/customs/loaders/CardShimmer";
export default function Partners() {
  const { data: dataBrand, isLoading: isLoadingBrand } = useBrand();
  const { t } = useTranslation("index");

  return (
    <Container sx={{ my: "2rem" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <hr style={{ width: "100%" }} />
        <Typography
          sx={{ textAlign: "center", width: { md: "20%", xs: "50%" } }}
          variant="body2"
          color="initial"
        >
          {t("Our Partners")}
        </Typography>
        <hr style={{ width: "100%" }} />
      </Box>
      {isLoadingBrand ? (
        <Loader />
      ) : (
        <Grid container sx={{ my: "2rem" }} spacing="2">
          {dataBrand?.brands?.map((item, index) => (
            <BrandImage key={index} item={item} />
          ))}
        </Grid>
      )}
      <hr />
    </Container>
  );
}

function BrandImage({ item }) {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <Grid xl="2" md="3" sm="4" xs="6" item mt="2">
      {item?.havePage ? (
        <Link
          to={"store/categories/brand/" + item.id}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isLoading && (
            <CardShimmer style={{ width: "100px", height: "100px" }} />
          )}

          <img
            lazyLoading
            alt="logo"
            style={{
              width: "70%",
              objectFit: "contain",
              display: isLoading ? "none" : "block",
            }}
            src={
              item?.images && item?.images.length > 0
                ? item?.images[0]
                : DefualtLogo
            }
            onLoad={handleImageLoad}
          />
        </Link>
      ) : (
        <img
          lazyLoading
          alt="logo"
          style={{
            width: "70%",
            objectFit: "contain",
            display: isLoading ? "none" : "block",
          }}
          src={
            item?.images && item?.images.length > 0
              ? item?.images[0]
              : DefualtLogo
          }
          onLoad={handleImageLoad}
        />
      )}
    </Grid>
  );
}
