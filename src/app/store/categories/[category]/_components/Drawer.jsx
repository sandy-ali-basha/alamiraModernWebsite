import { Box, Grid, TextField, Typography } from "@mui/material";
import CAccordion from "components/modules/Accordion";
import SearchInput from "components/modules/SearchInput";
import { useTranslation } from "react-i18next";

const SideDrawer = ({
  valuetext,
  minValue,
  maxValue,
  handleMinChange,
  handleMaxChange,
  data,
  handleCheked,
}) => {
  const { t } = useTranslation("index");

  return (
    <Box
      sx={{
        borderColor: "divider",
        width: 250,
        px: 2,
        pb: 3,
      }}
    >
      <SearchInput />
      <Typography sx={{ mt: 2,mb:1 }} variant="body1" color="text.primary">
        {t("WIDGET PRICE FILTER")}{" "}
      </Typography>
      <Box dir="ltr">
        <Grid container spacing={2} alignItems="center">
          {/* Input for Minimum Value */}
          <Grid item xs={6}>
            <TextField
              label={t("Min Price")}
              type="number"
              value={minValue}
              onChange={handleMinChange}
              inputProps={{ min: 0, max: maxValue }} // Ensure min doesn't go beyond max
              fullWidth
              sx={{ borderRadius: "0px" }}
              size="small"
            />
          </Grid>

          {/* Input for Maximum Value */}
          <Grid item xs={6}>
            <TextField
              label={t("Max Price")}
              type="number"
              value={maxValue}
              onChange={handleMaxChange}
              inputProps={{ min: minValue }} // Ensure max doesn't go below min
              fullWidth
              sx={{ borderRadius: "0px" }}
              size="small"
            />
          </Grid>
        </Grid>
      </Box>
      <Typography sx={{ mt: 2 ,mb:1}} variant="body1" color="text.primary">
        {t("PRODUCT CATEGORIES")}:
      </Typography>
      {/* // * Accourdion */}
      <CAccordion data={data} handleCheked={handleCheked} />
    </Box>
  );
};
export default SideDrawer;
