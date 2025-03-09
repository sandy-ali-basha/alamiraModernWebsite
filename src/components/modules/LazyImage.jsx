import React, { useState, useEffect } from "react";
import { Skeleton } from "@mui/material";
import defaultImg from "assets/images/defaultImg.jpg";

const LazyImage = ({ src, alt, style = {}, ...props }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(src || defaultImg);

  useEffect(() => {
    const img = new Image();
    img.src = imgSrc;
    img.onload = () => setImgLoaded(true);
  }, [imgSrc]); // Ensure effect runs when imgSrc changes

  return (
    <div style={{ position: "relative", ...style }}>
      {!imgLoaded && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          animation="wave"
          sx={{ position: "absolute", top: 0, left: 0 }}
        />
      )}
      <img
        src={imgSrc}
        alt={alt}
        loading="lazy"
        style={{
          ...style,
          display: imgLoaded ? "block" : "none",
          width: "100%", // Ensure width consistency
          height: "100%", // Ensure height consistency
        }}
        onLoad={() => setImgLoaded(true)}
        onError={() => {
          if (imgSrc !== defaultImg) {
            setImgSrc(defaultImg);
          } else {
            setImgLoaded(true); // Hide Skeleton even if fallback fails
          }
        }}
        {...props}
      />
    </div>
  );
};

export default LazyImage;
