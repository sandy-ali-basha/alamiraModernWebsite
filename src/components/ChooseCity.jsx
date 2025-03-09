import { _cities } from "api/country/country";
import { useMemo, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const ChooseCity = () => {
  const { t } = useTranslation("index");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(localStorage.getItem("city") || "");

  const getCities = async () => {
    const response = await _cities.index();
    if (response.data.state) {
      const formattedCities = response.data.state.map((city) => ({
        id: city.id,
        label: city.name,
      }));
      setCities(formattedCities);
    }
  };

  useMemo(() => {
    getCities();
  }, []);

  const handleChange = (event) => {
    const cityId = event.target.value;
    setSelectedCity(cityId);
    localStorage.setItem("city", cityId);
    window.location.reload();
  };

  return (
    <FormControl fullWidth sx={{ mt: 4 }}>
      <InputLabel id="city-select-label">{t("change city")}</InputLabel>
      <Select
        labelId="city-select-label"
        label={t("change city")}
        value={selectedCity}
        onChange={handleChange}
      >
        {cities.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ChooseCity;
