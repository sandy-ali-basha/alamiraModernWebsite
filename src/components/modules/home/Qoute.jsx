import { Box, Container, Typography } from "@mui/material";
import React from "react";

export default function Qoute({ data, video }) {

  return (
      <Box
        sx={{
          my: 10,
          position: "relative",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          textAlign: "center",
        }}
      >
        <video
          style={{
            width: "100%",
            height: "80vh",
            objectFit: "cover",
            borderRadius: 10,
          }}
          autoPlay
          loop
          muted
        >
          <source src={video} type="video/mp4"></source>
          Your browser does not support the video tag.
        </video>
        {/* <Box
          sx={{
            position: "absolute",
            zIndex: 1,
            backdropFilter: "blur(20px)",
            p: 5,
            mx: 10,
            borderRadius: "10px",
            background: "#ffffff10",
          }}
        >
          <Typography variant="h4" color="initial" sx={{ fontWeight: "bold" }}>
            {data?.value?.[lang]}
          </Typography>
        </Box> */}
      </Box>
  );
}
