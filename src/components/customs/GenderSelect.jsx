import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const GenderSelect = ({ register, errors, defaultValue }) => {
  const { t } = useTranslation("index");

  return (
    <FormControl fullWidth error={!!errors.gender?.message}>
      <InputLabel id="gender-label">{t("Gender")}</InputLabel>
      <Select
        labelId="gender-label"
        id="gender-select"
        label="Gender"
        {...register("gender")}
        defaultValue={defaultValue}
        size="small"
        placeholder="Gender"
      >
        <MenuItem value={"female"}>
          <Box>{t("Female")}</Box>
        </MenuItem>
        <MenuItem value={"male"}>
          <Box>{t("male")}</Box>
        </MenuItem>
      </Select>
      <FormHelperText>{errors.gender?.message}</FormHelperText>
    </FormControl>
  );
};

export default GenderSelect;
