import { Container, Typography } from "@mui/material";

import React from "react";
import BlogCard from "./_components/BlogCard";
import { useBlogs } from "hooks/blog/useBlog";
import { useTranslation } from "react-i18next";

export default function Blog() {
  const { data } = useBlogs();
  const { t } = useTranslation("index");

  return (
    <Container sx={{ mt: 20 }}>
      <Typography
        variant="h2"
        sx={{ fontWeight: "bold", mt: 3, textAlign: "center" }}
      >
        {t("Blogs")}
      </Typography>
      {/* <Box sx={{ mt: 6, mb: 5, width: "80%" }}>
        <Typography variant="body2" color="text.secondary">
          {isLoading ? (
            <CardShimmer style={{ width: "100%", height: "20px" }} />
          ) : (
            data?.posts[0]?.date
          )}
        </Typography>

        {isLoading ? (
          <CardShimmer
            style={{ width: "80vw", borderRadius: "10px", height: "70vh" }}
          />
        ) : (
          <img
            style={{
              width: "80vw",
              borderRadius: "10px",
              height: "70vh",
              objectFit: "cover",
            }}
            src={data?.posts[0]?.image}
            alt={data?.posts[0]?.title}
          />
        )}

        <Typography
          variant="body2"
          color="initial"
          sx={{ fontWeight: "300" }}
          dangerouslySetInnerHTML={{ __html: data?.posts[0]?.text.slice(0, 2500)  }}
        ></Typography>
        {isLoading && <CardShimmer style={{ width: "100%", height: "20px" }} />}
        {isLoading && <CardShimmer style={{ width: "90%", height: "20px" }} />}
      </Box> */}

      {data?.posts?.length > 1 &&
        data?.posts?.map((item, index) => <BlogCard key={index} {...item} />)}
    </Container>
  );
}
