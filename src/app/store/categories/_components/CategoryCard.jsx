import React from "react";
import Card from "@mui/material/Card";
import { CardContent, Skeleton, Typography, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";

export default function CategoryCard({ label, link, loading, sx, width,img }) {
  return (
    <Link
      to={"/store/" + link}
      component="a"
      style={{ textDecoration: "none" }}
    >
      {" "}
      <Card
        sx={{
          width: "100%",
          borderRadius: 0,
          ...sx,
        }}
      >
        {loading ? (
          <Skeleton
            animation="wave"
            width={width}
            height={width}
            variant="circular"
          />
        ) : (
          <CardMedia
            title={label}
            image={img}
            sx={{
              width: width,
              aspectRatio: "1",
              borderRadius: "100px",
              mx: "auto",
            }}
          />
        )}
        <CardContent sx={{ p: "0px !important", mt: 1 }}>
          {loading ? (
            <>
              <Skeleton animation="wave" width={width} height={"3vw"} />
            </>
          ) : (
            <Typography
              gutterBottom
              variant="body2"
              color="initial"
              sx={{
                textAlign: "center",
                textDecoration: "underline !important",
                textDecorationColor: "#fff !important",
                p: 0,
              }}
            >
              {label}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
