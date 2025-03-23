import React from "react";
import { useCategory } from "./_hooks/useCategory";
import Typography from "@mui/material/Typography";
import {
  Box,
  Grid,
  Drawer,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import ProductCard from "components/modules/ProductCard";
import SideDrawer from "./_components/Drawer";
import { CloseRounded, FilterAlt } from "@mui/icons-material";

import { useSearch } from "store/searchStore";

export default function Category() {
  const {
    data,
    isLoading,
    valuetext,
    minValue,
    maxValue,
    handleMinChange,
    handleMaxChange,
    handleDrawerToggle,
    t,
    mobileOpen,
    Attr,
    handleCheked,
    handleSortChange,
    sort,
  } = useCategory();

  const SortFilter = () => {
    return (
      <FormControl
        variant="outlined"
        size="small"
        sx={{ minWidth: 120, ml: { xs: 2, md: 0 } }}
      >
        <InputLabel>{t("Sort By")}</InputLabel>
        <Select value={sort} onChange={handleSortChange} label={t("Sort By")}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"1"}>{t("Price: High to Low")}</MenuItem>
          <MenuItem value={"2"}>{t("Price: Low to High")}</MenuItem>
          <MenuItem value={"3"}>{t("Name: A-Z")}</MenuItem>
          <MenuItem value={"4"}>{t("Name: Z-A")}</MenuItem>
        </Select>
      </FormControl>
    );
  };

  const [searchResults, setSearchResults] =
    useSearch((state) => [
      state.results,
      state.setResults,
    ]);

  return (
    <Box sx={{ px: { md: 4, xs: 1 } }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          my: 5,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box
          sx={{
            alignItems: "flex-start",
            width: "100%",
            justifyContent: { xs: "space-between", md: "flex-start" },
            mb: { xs: 2, md: 0 },
            display: { md: "none", xs: "flex" },
          }}
        >
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle}>
            <FilterAlt />
          </IconButton>

          <SortFilter data={Attr} />
        </Box>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box" },
          }}
        >
          <SideDrawer
            data={Attr}
            minValue={minValue}
            maxValue={maxValue}
            handleMinChange={handleMinChange}
            handleMaxChange={handleMaxChange}
            valuetext={valuetext}
            handleCheked={handleCheked}
          />
        </Drawer>
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            mx: 1,
          }}
        >
          <SideDrawer
            valuetext={valuetext}
            data={Attr}
            minValue={minValue}
            maxValue={maxValue}
            handleMinChange={handleMinChange}
            handleMaxChange={handleMaxChange}
            handleCheked={handleCheked}
          />
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: { xs: "100%", md: `calc(100% - 30%)` },
          }}
        >
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
              width: "100%",
              mb: 4,
            }}
          >
            <SortFilter data={Attr} />{" "}
          </Box>

          <Grid container spacing={{ md: 2, xs: 1 }}>
            {isLoading &&
              Array.from({ length: 5 }).map((_, index) => (
                <Grid item xs={6} sm={6} md={4} lg={3} key={index}>
                  <ProductCard loading={true} />
                </Grid>
              ))}

            {searchResults?.data?.products.length > 0 &&
              searchResults?.data?.products?.map((item, idx) => {
                return (
                  <Grid item key={idx} xs={6} sm={6} md={4} lg={3}>
                    <ProductCard
                      id={item?.id}
                      productName={item.name}
                      Price={item?.price}
                      productImage={item?.images[0]?.image_path}
                      link={`/store/product/${item.id}/${item.name}`}
                      loading={false}
                      purchasable={item?.purchasable === "always"}
                      offer={item?.compare_price}
                      category={item?.attributes[0]?.value}
                      quantity={item?.quantity}
                    />
                  </Grid>
                );
              })}

            {searchResults?.data?.products.length === 0 && (
              <Typography
                variant="body1"
                sx={{
                  my: 10,
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                  mx: "auto",
                }}
              >
                {t("No Product Found")} <CloseRounded />
              </Typography>
            )}

            {data?.data?.products &&
              !searchResults?.data?.products &&
              data?.data?.products?.map((item, idx) => {
                return (
                  <Grid item key={idx} xs={6} sm={6} md={4} lg={3}>
                    <ProductCard
                      id={item?.id}
                      productName={item.name}
                      Price={item?.price}
                      productImage={item?.images[0]?.image_path}
                      link={`/store/product/${item.id}/${item.name}`}
                      loading={false}
                      purchasable={item?.purchasable === "always"}
                      offer={item?.compare_price}
                      category={item?.attributes[0]?.value}
                      quantity={item?.quantity}
                    />
                  </Grid>
                );
              })}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
