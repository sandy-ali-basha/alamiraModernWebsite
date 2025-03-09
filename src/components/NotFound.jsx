import { Box, Typography } from "@mui/material";
import notFoundImg from "../assets/images/notFound.svg";

const NotFound = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <img style={{ width: "40vw" }} src={notFoundImg} />
      <Typography variant="h2">Page Not Found</Typography>
    </Box>
  );
};
export default NotFound;
