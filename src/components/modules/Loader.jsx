import { Box, CircularProgress, LinearProgress } from "@mui/material";
import React from "react";

const Loader = () => {
  return (
    <Box
      sx={{
        height: "5vh",
        width: "100%",
        p: 2,
        textAlign: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loader;
