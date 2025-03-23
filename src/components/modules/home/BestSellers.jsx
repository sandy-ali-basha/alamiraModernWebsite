import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import ProductCard from "../ProductCard";
import { useProducts } from "hooks/Product/useProducts";
import { useTranslation } from "react-i18next";

export default function BestSellers({ all }) {
  const filter_value = all ? { 38: 152 } : {};
  const filterData = { filters: filter_value };

  const { data, isLoading } = useProducts(filterData);
  const { t } = useTranslation("index");

  return (
    data?.data?.products && (
      <Box>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", mb: 4 }}
          color="initial"
        >
          {all ? t("Veiled women's clothing") : t("Recommended")}
        </Typography>
        <Grid container spacing={1}>
          { data?.data?.products?.map((item, idx) => (
            <Grid item xs="6" lg="2" md="3" sm="6" spacing={4} key={idx}>
              <ProductCard
                productImage={item?.images[0]?.image_path}
                productName={item?.name}
                Price={item?.price}
                link={`/store/product/${item?.id}/${item.name}`}
                purchasable={item?.purchasable === "always"}
                offer={item?.compare_price}
                id={item?.id}
                category={item?.attributes[0]?.value}
                loading={isLoading}
                quantity={item?.quantity}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    )
  );
}
