import { Box, Chip, Container, Typography } from "@mui/material";

import React from "react";
import { useParams } from "react-router-dom";
import CardShimmer from "components/customs/loaders/CardShimmer";
import { useBlog } from "hooks/blog/useBlog";

export default function BlogPost() {
  const { id } = useParams();
  const { data, isLoading } = useBlog(id);

  return (
    <Container sx={{ my: 20 }}>
      <Chip sx={{ background: "rgba(194, 238, 252, 1)" }} label="Blog"></Chip>
      <Typography variant="h2" sx={{ fontWeight: "bold", mt: 3 }}>
        {isLoading ? (
          <CardShimmer style={{ width: "100%", height: "20px" }} />
        ) : (
          data?.title
        )}
      </Typography>
      <Box sx={{ mt: 6, mb: 5, width: "80%" }}>
        <Typography variant="body2" color="text.secondary">
          {isLoading ? (
            <CardShimmer style={{ width: "100%", height: "20px" }} />
          ) : (
            data?.date
          )}
        </Typography>

        {isLoading ? (
          <CardShimmer
            style={{ width: "80vw", borderRadius: "0px", height: "70vh" }}
          />
        ) : (
          <img
            style={{
              width: "80vw",
              borderRadius: "0px",
              height: "70vh",
              objectFit: "cover",
            }}
            src={data?.image}
            alt="company"
          />
        )}

        <Typography
          variant="body2"
          color="initial"
          sx={{ fontWeight: "300" }}
          dangerouslySetInnerHTML={{ __html: data?.text }}
        ></Typography>
        {isLoading && <CardShimmer style={{ width: "100%", height: "20px" }} />}
        {isLoading && <CardShimmer style={{ width: "90%", height: "20px" }} />}
      </Box>
    </Container>
  );
}
