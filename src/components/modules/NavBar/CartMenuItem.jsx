  
import React from "react";
import ProductImg from "assets/images/jar.png";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { HearingOutlined, TramSharp } from "@mui/icons-material";

export default function CartMenuItem() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <img
          alt="cart"
          src={ProductImg}
          style={{ height: "10vh", width: "30%", objectFit: "contain" }}
        />
        <Box
          sx={{
            flexGrow: "1",
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "space-between" }}>
            <Box>
              <Typography variant="body1">
                Fines Vitamin D + Calcium 60 Gummies
              </Typography>
              <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
                Promotes Optimal Nerve And Bones Function.
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box mt="auto">8.857 $</Box>
            <Box>Num 2</Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
