import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { htmlToText } from "html-to-text";

const BlogCard = ({ id, image, title, text, date }) => {
  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length <= wordLimit) {
      return text;
    }
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  const plainText = htmlToText(text);
  const truncatedText = truncateText(plainText, 25);
  console.log("image", image);
  return (
    <Box
      sx={{
        gap: 2,
        borderRadius: 0,
        my: 5,
        p: 2,
        py: 5,
        display: "flex",
        boxShadow: 3,
      }}
    >
      <img
        src={image}
        style={{
          width: "50%",
          borderRadius: 0,
          height: "100%",
        }}
        alt={title}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Link style={{ textDecoration: "none" }} to={`/Blog/${id}`}>
            <Typography variant="h5" color="initial" sx={{ fontWeight: "600" }}>
              {title}
            </Typography>
          </Link>
          <Typography variant="body1" color="text.secondary">
            {truncatedText}
          </Typography>
        </div>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: "auto" }}
        >
          {date}
        </Typography>
      </Box>
    </Box>
  );
};

export default BlogCard;
