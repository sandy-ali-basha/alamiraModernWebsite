import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Tooltip,
  Badge,
  Divider,
  Popover,
} from "@mui/material";
import {
  PersonOutlineOutlined,
  ShoppingCartOutlined,
  SupportAgent,
} from "@mui/icons-material";
import { useNavBar } from "./useNavBar";
import MenuButton from "components/modules/NavBar/MenuButton";
import LanguageSelector from "components/LanguageSelector";
import MenuIcon from "@mui/icons-material/Menu";
import { _AuthApi } from "api/auth";
import logo from "assets/images/logo.png";
import { useAttributes } from "hooks/attributes/useAttributes";
import SearchInput from "components/modules/SearchInput";
import { useState } from "react";
import { useQuery } from "react-query";
import { _Attributes } from "api/attributes/attributes";
import CategoryCard from "app/store/categories/_components/CategoryCard";

function NavBar() {
  const { settings, pages, navigate, t, nav } = useNavBar();
  const { data } = useAttributes();
  const [selectedCategoryId, setSelectedCategoryId] = useState();
  const { data: AttrValuesData, isLoading: AttrValuesLoading } = useQuery(
    ["_Attributes_values", selectedCategoryId],
    () =>
      _Attributes
        .getAttributeValues(selectedCategoryId)
        .then((res) => res?.data),
    { enabled: !!selectedCategoryId }
  );

  // Get the cart count from local storage
  const cartCount = parseInt(localStorage.getItem("cart_count")) || 0;
  const lang = localStorage.getItem("i18nextLng");

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event, id) => {
    setSelectedCategoryId(id);
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="relative"
      background="transparent"
      sx={{
        zIndex: "99",
        width: "100%",
        background: "transparent",
        boxShadow: "none",
        mb: 1,
      }}
    >
      <Toolbar
        sx={{
          py: ".1875rem",
          display: "flex",
          justifyContent: "space-between",
          px: 3,
        }}
        disableGutters
      >
        <Box
          sx={{
            alignItems: "center",
            display: { xs: "flex", md: "none" },
          }}
        >
          <MenuButton
            badgeNumber={0}
            icon={<MenuIcon sx={{ color: "text.main" }} />}
            menuItems={pages.map((item) => ({
              ...item,
              key: item.id,
            }))}
          />
        </Box>

        <Typography
          variant="body1"
          noWrap
          component="a"
          href="/"
          sx={{
            gap: 1,
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
          color="primary"
        >
          <Box
            sx={{
              width: {
                md: "3vw",
                sm: "6vw",
                lg: "2vw",
                xs: "5vw",
              },
            }}
          >
            <img alt="logo" src={logo} style={{ width: "inherit" }} />
          </Box>
          {t("AlAmira Modern")}
        </Typography>
        <Box sx={{ display: ["none", "flex"], width: ["80%", "60%", "50%"] }}>
          <SearchInput
            sx={{
              width: "100%",
              justifyContent: "flex-start !important",
            }}
            nav={true}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LanguageSelector />

          <Tooltip title={t("Show Cart")}>
            <IconButton
              id="basic-button"
              onClick={() => navigate("/store/checkout")}
              badgeNumber={2}
            >
              <Badge badgeContent={cartCount} color="primary" size="small">
                <ShoppingCartOutlined sx={{ color: "text.main" }} />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title={t("Contact Us")}>
            <IconButton
              id="basic-button"
              onClick={() => navigate("/contact-us")}
              badgeNumber={2}
              sx={{ display: ["none", "block"] }}
            >
              <SupportAgent sx={{ color: "text.main" }} />
            </IconButton>
          </Tooltip>

          {_AuthApi.getToken() ? (
            <MenuButton
              icon={<PersonOutlineOutlined sx={{ color: "text.main" }} />}
              menuItems={settings.map((item) => ({
                ...item,
                key: item.id,
              }))}
            />
          ) : (
            <Button
              onClick={() => navigate("/login")}
              sx={{ my: 2, color: "text.main", display: "block" }}
            >
              {t("sign in")}
            </Button>
          )}
        </Box>
      </Toolbar>

      <Toolbar sx={{ display: ["flex", "none"] }}>
        <SearchInput
          sx={{
            width: ["100%", "60%", "40%"],
            justifyContent: "flex-start !important",
          }}
          nav={true}
        />
      </Toolbar>
      <Toolbar
        disableGutters
        sx={{
          background: "transparent",
          boxShadow: "none",
          minHeight: "2.5rem !important",
          textAlighn: "center",
          alignItems: "center",
          justifyContent: "center",
          display: ["none", "flex"],
        }}
      >
        <Button variant={"a"} href="/store">
          {t("View All")}
        </Button>

        {data?.product_attributes?.slice(0, 9).map(
          (item, index) =>
            item?.section === "Categories" && (
              <>
                <Button
                  onClick={(event) => handleClick(event, item.id)}
                  key={index}
                >
                  {item?.title}
                </Button>

                <Popover
                  open={Boolean(anchorEl)}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                  transformOrigin={{ vertical: "top", horizontal: "center" }}
                  PaperProps={{
                    sx: {
                      width: "80vw",
                      height: "60vh",
                      boxShadow: "none", // Removes the shadow
                      border: 1,
                    },
                  }}
                >
                  <Box
                    sx={{ p: 2, display: "flex", gap: 2 }}
                    onClick={() => handleClose()}
                  >
                    {AttrValuesLoading ? (
                      [1, 2, 3, 4, 5, 6].map((idx) => (
                        <CategoryCard key={idx} loading="true" width="6vw" />
                      ))
                    ) : AttrValuesData?.product_attributes_values.length > 0 ? (
                      AttrValuesData?.product_attributes_values?.map(
                        (item, idx) => (
                          <CategoryCard
                            key={idx}
                            img={item?.image}
                            label={item.value}
                            link={selectedCategoryId + "/" + item.id}
                            width={"6vw"}
                          />
                        )
                      )
                    ) : (
                      <Typography
                        sx={{ textAlign: "center", width: "100%", my: 5 }}
                        variant="body1"
                        color={"text.secondary"}
                      >
                        {t("No Data")} {":("}
                      </Typography>
                    )}
                  </Box>
                </Popover>
              </>
            )
        )}
      </Toolbar>
      {nav?.data?.navbar.length > 0 && (
        <Toolbar
          sx={{
            background: "#ddd",
            color: "text.main",
            textAlign: "center",
            minHeight: "2.5rem !important",
            gap: 3,
            justifyContent: "center",
            display: "felx",
            "& .MuiToolbar-root": {
              minHeight: "1.5625rem",
              "@media (min-width:37.5rem)": {
                minHeight: "4rem",
                padding: "0rem",
              },
            },
          }}
          disableGutters
        >
          {nav?.data?.navbar?.map((item, idx) => {
            return (
              <>
                <Typography
                  variant="div"
                  component="a"
                  href={item?.link}
                  sx={{
                    color: "#ffffff",
                    fontSize: ".6875rem",
                    letterSpacing: "-0.0063rem",
                  }}
                >
                  {lang === "fr" ? item?.text : item?.text_ar}
                </Typography>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    borderColor: "#ffffff",
                    display: idx < 2 ? "flex" : "none",
                  }}
                ></Divider>
              </>
            );
          })}
        </Toolbar>
      )}
    </AppBar>
  );
}

export default NavBar;
