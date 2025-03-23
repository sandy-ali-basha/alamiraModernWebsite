import React from "react";
import Typography from "@mui/material/Typography";
import { Box, Tabs, Tab, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { useCategories } from "./_hooks/useCategories";
import CategoryCard from "./_components/CategoryCard";
import Loader from "components/modules/Loader";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
      sx={{ width: "100%" }}
    >
      {value === index && <Box>{children}</Box>}
    </Box>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

export default function Categories() {
  const {
    value,
    handleChange,
    data,
    isMobile,
    dataBrand,
    isLoadingBrand,
    brandsTabIndex,
    isLoading,
    AttrValuesData,
    AttrValuesLoading,
    selectedCategoryId,
    t,
  } = useCategories();

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          minHeight: 500,
          my: 3,
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        <Tabs
          orientation={isMobile ? "horizontal" : "vertical"}
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Responsive tabs example"
          sx={{
            borderRight: isMobile ? 0 : 1,
            borderBottom: isMobile ? 1 : 0,
            borderColor: "divider",
            width: isMobile ? "100%" : "30%",
            marginRight: 2,
          }}
        >
          {isLoading && <Loader />}
          {data &&
            data?.product_attributes?.map(
              (category, index) =>
                category?.section === "Categories" && (
                  <Tab
                    sx={{ mx: [0, 2] }}
                    key={category.title}
                    label={category.title}
                    {...a11yProps(index)}
                  />
                )
            )}
          {isLoading || (
            <Tab label={t("Brands")} {...a11yProps(brandsTabIndex)} />
          )}
        </Tabs>

        {AttrValuesLoading ? (
          <Grid container sx={{ mt: { xs: 2, md: 0 } }} spacing={[1,2,3]}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Grid
                item
                xs={4}
                sm={4}
                md={3}
                lg={2}
                spacing={{ md: 2, xs: 0, sm: 1, xl: 3 }}
                key={index}
              >
                <CategoryCard
                  loading={true}
                  width={window.innerWidth > 768 ? "10vw" : "20vw"}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          data?.product_attributes?.map((category, index) => (
            <TabPanel value={value} index={index} key={category.title}>
              <Grid container spacing={[1,2,3]} sx={{ mt: { xs: 2, md: 0 } }}>
                {AttrValuesData?.product_attributes_values.length > 0 ? (
                  AttrValuesData?.product_attributes_values?.map(
                    (item, idx) => (
                      <Grid
                        item
                        xs={4}
                        sm={4}
                        md={3}
                        lg={2}
                        spacing={{ md: 2, xs: 0, sm: 1, xl: 3 }}
                        key={idx}
                      >
                        <CategoryCard
                          img={item?.image}
                          label={item.value}
                          link={selectedCategoryId + "/" + item.id}
                          loading={AttrValuesLoading}
                          width={window.innerWidth > 768 ? "10vw" : "20vw"}
                        />
                      </Grid>
                    )
                  )
                ) : (
                  <Typography
                    sx={{ textAlign: "center", width: "100%", my: 5 }}
                    variant="h4"
                    color={"text.secondary"}
                  >
                    {t("No Data")} {":("}
                  </Typography>
                )}
              </Grid>
            </TabPanel>
          ))
        )}

        <TabPanel value={value} index={brandsTabIndex} key={"Brands"}>
          <Grid container spacing={[1,2,3]} sx={{ mt: { xs: 2, md: 0 } }}>
            {isLoadingBrand ? (
              <Grid item  xs={4} sm={4} md={3} lg={2}
                spacing={{ md: 2, xs: 0,sm:1 ,xl: 3 }}>
                <CategoryCard
                  loading={true}
                  width={{ md: "10vw", xs: "5vw" }}
                />
              </Grid>
            ) : (
              dataBrand &&
              dataBrand.brands.map((item, idx) => (
                <Grid
                  item
                  key={idx}
                  xs={4} sm={4} md={3} lg={2}
                  spacing={{ md: 2, xs: 0,sm:1 ,xl: 3 }}
                >
                  <CategoryCard
                    img={item.images[0]}
                    label={item.name}
                    link={"brand/" + item.id}
                    width={"10vw"}
                  />
                </Grid>
              ))
            )}
          </Grid>
        </TabPanel>
      </Box>
    </>
  );
}
