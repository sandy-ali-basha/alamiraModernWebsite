import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useAttributes } from "hooks/attributes/useAttributes";
import { useProducts } from "hooks/Product/useProducts";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

export const useCategory = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [minValue, setMinValue] = useState();
  const [maxValue, setMaxValue] = useState();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sort, setSort] = useState("");
  const { t } = useTranslation("index");
  const params = useParams();
  const { data: Attr, isLoading: AttrLoading } = useAttributes();
  const [attr, setAttr] = useState(Number(params.attr_id));
  const [attValue, setAttrValue] = useState(Number(params.attr_value_id));

  const body = {
    filters: {
      [attr]: attValue,
    },
    min_price: minValue,
    max_price: maxValue,
    sort: sort,
  };


  const { data, isLoading } = useProducts(body);

  function valuetext(value) {
    return `${value}$`;
  }

  const handleMinChange = (event) => {
    setMinValue(event.target.value);
  };

  const handleMaxChange = (event) => {
    setMaxValue(event.target.value);
  };
  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleCheked = (attr, attrValue) => {
    setAttrValue(attrValue);
    setAttr(attr);
  };

  return {
    data,
    isLoading,
    isMobile,
    sort,
    valuetext,
    minValue,
    maxValue,
    handleMinChange,
    handleMaxChange,
    handleSortChange,
    handleDrawerToggle,
    params,
    t,
    mobileOpen,
    Attr,
    AttrLoading,
    handleCheked,
    attr,
  };
};
