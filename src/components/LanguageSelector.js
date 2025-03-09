import React, { useState } from "react";
import { Box, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import { settingsStore } from "store/settingsStore";
import axios from "axios";
import { LanguageOutlined } from "@mui/icons-material";
import { useQueryClient } from "react-query";

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const queryClient = useQueryClient();

  const [setDirection, setLanguage] = settingsStore((state) => [
    state.setDirection,
    state.setLanguage,
  ]);

  const handleLanguageChange = async (lang) => {
    const newDirection = lang === "ar" ? "rtl" : "ltr";

    // Save language settings
    localStorage.setItem("i18nextLng", lang);
    setLanguage(lang);
    setDirection(newDirection);

    // Change language in i18next
    await i18n.changeLanguage(lang);

    // Update Axios headers
    axios.defaults.headers.common["locale"] = lang;

    // 🔄 Re-fetch API requests to get translated content
    queryClient.invalidateQueries();

    // Reload the page to apply changes
    window.location.reload();

    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Box sx={{ mx: "10px" }}>
      <Tooltip title={t("Change Language")}>
        <IconButton onClick={handleClick} sx={{ p: 0 }}>
          <LanguageOutlined />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "basic-button" }}
      >
        <MenuItem onClick={() => handleLanguageChange("fr")}>Français</MenuItem>
        <MenuItem onClick={() => handleLanguageChange("tr")}>Türkçe</MenuItem>
        <MenuItem onClick={() => handleLanguageChange("ar")}>العربية</MenuItem>
      </Menu>
    </Box>
  );
};

export default LanguageSelector;
