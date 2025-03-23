import { useEffect, useState } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useAttributes } from "hooks/attributes/useAttributes";
import { useQuery } from "react-query";
import { _Attributes } from "api/attributes/attributes";
import { _Brands } from "api/brand/brands";
import { useTranslation } from "react-i18next";

export const useCategories = () => {
  const [value, setValue] = useState(0);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [fetchBrands, setFetchBrands] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { data, isLoading } = useAttributes();
  const brandsTabIndex = data?.product_attributes?.length;
  const { t } = useTranslation("index");

  const { data: AttrValuesData, isLoading: AttrValuesLoading } = useQuery(
    ["_Attributes_values", selectedCategoryId],
    () =>
      _Attributes
        .getAttributeValues(selectedCategoryId)
        .then((res) => res?.data),
    { enabled: !!selectedCategoryId } // Only fetch if a category is selected
  );

  const { data: dataBrand, isLoading: isLoadingBrand } = useQuery(
    ["brands", fetchBrands],
    () => _Brands.getBrands().then((res) => res?.data),
    { enabled: fetchBrands } // Only fetch if fetching brands is true
  );

  useEffect(() => {
    if (data && data.product_attributes && data.product_attributes.length > 0) {
      setSelectedCategoryId(data.product_attributes[0].id);
    }
    if ( parseInt(localStorage.getItem("categoriesTabIndex"))) {
      if (value) setSelectedCategoryId(data.product_attributes[ parseInt(localStorage.getItem("categoriesTabIndex"))].id);
    }
  }, [data]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === brandsTabIndex) {
      setFetchBrands(true);
      setSelectedCategoryId(null);
    } else {
      setFetchBrands(false);
      setSelectedCategoryId(data.product_attributes[newValue].id);
    }
  };


  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 2 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }

  return {
    value,
    TabPanel,
    a11yProps,
    handleChange,
    data,
    theme,
    isMobile,
    dataBrand,
    isLoadingBrand,
    brandsTabIndex,
    isLoading,
    AttrValuesData,
    AttrValuesLoading,
    selectedCategoryId,
    t,
  };
};
