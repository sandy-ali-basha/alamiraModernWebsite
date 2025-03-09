import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useOffers } from "hooks/offers/useOffers";
import { useTranslation } from "react-i18next";

export const useOffersPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { data, isLoading } = useOffers();
  const { t } = useTranslation("index");

  return { data, isMobile, t ,isLoading};
};
