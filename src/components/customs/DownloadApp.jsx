import React from "react";
import { Button, Box } from "@mui/material";
import AndroidIcon from "@mui/icons-material/Android";
import AppleIcon from "@mui/icons-material/Apple";
import { useTranslation } from "react-i18next";

const DownloadApp = () => {
  const { t } = useTranslation("index");
  return (
    <Box
      display="flex"
      flexDirection={"column"}
      gap={2}
      justifyContent="center"
      alignItems="center"
      mt={4}
    >
      {/* Google Play Button */}
      <Button
        variant="outlined"
        startIcon={<AndroidIcon />}
        href="https://play.google.com/store/apps"
        target="_blank"
        sx={{
          width: "100%",
          color: "white",
          textTransform: "none",
          backgroundColor: "#000000",
          ":hover": { backgroundColor: "#313131" },
          py: 2,
        }}
      >
        {t("Download on Google Play")}
      </Button>

      {/* App Store Button */}
      <Button
        variant="outlined"
        startIcon={<AppleIcon />}
        href="https://www.apple.com/app-store/"
        target="_blank"
        sx={{
          width: "100%",
          color: "white",
          textTransform: "none",
          backgroundColor: "#000000",
          ":hover": { backgroundColor: "#313131" },
          py: 2,
        }}
      >
        {t("Download on the App Store")}
      </Button>
    </Box>
  );
};

export default DownloadApp;
