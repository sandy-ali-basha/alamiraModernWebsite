import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { _axios } from "../../interceptor/http-config";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { debounce } from "lodash"; // Import debounce
import { useSearch } from "store/searchStore";
import { useNavigate } from "react-router-dom"; // Import navigation

export default function SearchInput({ sx, nav }) {
  const { t } = useTranslation("index");
  const navigate = useNavigate(); // Router navigation function
  const [searchResults, setSearchResults, searchTerm, setSearchTerm] =
    useSearch((state) => [
      state.results,
      state.setResults,
      state.searchTerm,
      state.setSearchTerm,
    ]);

  // Debounce API calls to avoid excessive requests
  const handleSearch = debounce(async (query) => {
    if (!query) {
      setSearchResults([]); // Clear results if empty
      return;
    }

    try {
      const response = await _axios.get(`/search-by-name`, {
        params: { name: query },
      });

      setSearchResults(response.data); // Set results
      // If search is triggered from the navbar, navigate to /store
      if (nav) {
        navigate("/store/search/searchval");
      }
    } catch (error) {
      console.error("Error fetching search results", error);
    }
  }, 300); // 300ms debounce delay

  return (
    <>
      <Box
        sx={{
          ...sx,
          display: "flex",
          gap: 1,
          border: 1,
          alignItems: "center",
          justifyContent: "center",
          borderColor: "#ddd",
          p: 1,
        }}
      >
        <SearchIcon sx={{ color: "text.primary" }} />
        <InputBase
          sx={{ width: "100%" }}
          placeholder={t("Search…")}
          inputProps={{ "aria-label": "search" }}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            handleSearch(e.target.value); // Trigger search instantly
          }}
          size="small"
        />
      </Box>

      {/* Optionally display search results if used in the filter */}
      {!nav && searchResults?.length > 0 && (
        <div>
          <h2>{t("Search Results:")}</h2>
          <ul>
            {searchResults.map((result, index) => (
              <li key={index}>{result.name}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
