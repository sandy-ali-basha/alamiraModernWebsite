import { Box, Button, Grid, Typography, Skeleton } from "@mui/material";
import { useTranslation } from "react-i18next";

const TwoSections = ({ data, isLoading }) => {
  const items = isLoading ? Array.from({ length: 2 }) : data || [];
  const { t } = useTranslation("index");
  return (
    <Grid container sx={{ p: 4 }} spacing={4}>
      {items.map((item, index) => (
        <Grid item md={6} key={item?.id || index}>
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              height: "80vh",
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "flex",
              alignItems: "flex-end",
              padding: "1.5rem",
              color: "white",
              backgroundImage: isLoading ? "none" : `url(${item?.image})`,
              backgroundColor: isLoading ? "#e0e0e0" : "transparent",
            }}
          >
            {isLoading && (
              <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                sx={{ position: "absolute", top: 0, left: 0 }}
              />
            )}
            <Box sx={{ maxWidth: "70%", position: "relative", zIndex: 1 }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", marginTop: "0.5rem" }}
              >
                {isLoading ? <Skeleton width="80%" height={30} /> : item?.title}
              </Typography>

              {isLoading ? (
                <Skeleton width={100} height={25} />
              ) : (
                <Button
                  variant="text"
                  href={item?.cta_link}
                  sx={{
                    color: "primary.main",
                    textDecoration: "underline",
                    fontWeight: "bold",
                    padding: "0",
                    fontSize: "14px",
                  }}
                >
                  {t("Discover")}
                </Button>
              )}
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default TwoSections;
