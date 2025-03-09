import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
//* images
import gummie1 from "assets/images/animatedText/gummy (1).png";
import gummie2 from "assets/images/animatedText/gummy (2).png";
import gummie3 from "assets/images/animatedText/gummy (3).png";
import gummie4 from "assets/images/animatedText/gummy (4).png";
import gummie5 from "assets/images/animatedText/gummy (5).png";
import gummie6 from "assets/images/animatedText/gummy (6).png";
import gummie7 from "assets/images/animatedText/gummy (7).png";
import jarWithoutLid from "assets/images/animatedText/finesImagis/Asset 3.png";
import Lid from "assets/images/animatedText/finesImagis/Asset 2.png";
import gummieImg from "assets/images/animatedText/finesImagis/Asset 4.png";
import fin from "assets/images/Asset 1.png";
import eis from "assets/images/Asset 3.png";

//*GSAP
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function AnimatedText({ text }) {
  const gsr2 = useRef(null);
  const lid = useRef(null);
  const gummie = useRef(null);
  const gummie2ref = useRef(null);
  const gummie3ref = useRef(null);
  const imageRefs = useRef([]);
  imageRefs.current = [];

  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.innerWidth > 900) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: gsr2.current,
          start: "top center",
          end: "70% center",
          scrub: 5,
        },
      });

      const t2 = gsap.timeline({
        scrollTrigger: {
          trigger: gsr2.current,
          start: "top center",
          end: "80% center",
          scrub: 10,
          pin: gsr2.current,
          pinSpacing: false,
        },
      });

      t2.fromTo(
        gsr2.current,
        { rotation: 0, x: 0 },
        {
          rotation: 10,
          x: "-32vw",
          ease: "power1.inOut",
          duration: 0.8,
        }
      ).to(
        lid.current, // Target the same element
        {
          x: "-100%",
          y: "-80%",
          rotation: -130,
          duration: 0.5, // Duration of the fade-out
          ease: "power1.inOut", // Optional: easing for the opacity change
        },
        "<" // This will start the fade-out animation right after the previous one ends
      );
      t2.to(
        gummie.current,
        {
          x: "-80%",
          y: "-170%",
          rotation: -14,
          duration: 0.2,
          delay: 0.5,
          ease: "power1.inOut",
        },
        "<" // This runs at the same time as the previous animation
      )
        .to(
          gummie2ref.current,
          {
            x: "10%",
            y: "-200%",
            rotation: 10,
            duration: 0.2,
            ease: "power1.inOut",
          },
          "<" // Adjust timing as needed
        )
        .to(
          gummie3ref.current,
          {
            x: "120%",
            y: "-170%",
            rotation: 46,
            duration: 0.2,
            ease: "power1.inOut",
          },
          "<" // Adjust timing as needed
        );
      // Images animation
      imageRefs.current.forEach((ref, index) => {
        tl.to(
          ref,
          {
            y: index % 2 === 0 ? -20 : 20,
            duration: 1,
            ease: "power1.inOut",
          },
          index * 0.1
        );
      });
    }
  }, []);

  const Gummies = [
    gummie1,
    gummie2,
    gummie3,
    gummie4,
    gummie5,
    gummie6,
    gummie7,
  ];

  const addToRefs = (el) => {
    if (el && !imageRefs.current.includes(el)) {
      imageRefs.current.push(el);
    }
  };

  return (
    <Box sx={{ overflow: "hidden", width: "98vw" }}>
      <Box sx={{ position: "relative", mt: "20vh" }}>
        <Box
          sx={{
            position: "relative",
            display: "flex",
            minHeight: { lg: "70vh", md: "60vh", xs: "40vh" },
          }}
          className="animatedText"
          dir="ltr"
        >
          {Gummies.map((item, index) => (
            <img
              ref={addToRefs}
              src={item}
              key={index}
              className="floatingGummie"
              alt={`gummie ${index + 1}`}
            />
          ))}

          <Box
            ref={gsr2}
            sx={{
              position: "absolute",
              zIndex: "4",
              width: "50vw",
              height: "50vw",
            }}
          >
            <img
              src={Lid}
              ref={lid}
              style={{
                zIndex: "2",
                position: "relative",
                top: "-24%",
                width: "17%",
                right: "-40.4%",
              }}
              alt=""
            />
            <img
              src={gummieImg}
              ref={gummie}
              style={{
                zIndex: "0",
                position: "absolute",
                top: "20%",
                width: "10%",
                right: "50%",
              }}
              alt=""
            />
            <img
              src={gummieImg}
              ref={gummie2ref}
              style={{
                zIndex: "0",
                position: "absolute",
                top: "20%",
                width: "10%",
                right: "45%",
              }}
              alt=""
            />
            <img
              src={gummieImg}
              ref={gummie3ref}
              style={{
                zIndex: "0",
                position: "absolute",
                top: "22%",
                width: "11%",
                right: "44%",
              }}
              alt=""
            />
            <img
              src={jarWithoutLid}
              style={{
                zIndex: "1",
                position: "relative",
                width: "40%",
                top: "15%",
                right: "-12%",
              }}
              alt=""
            />
          </Box>

          <Box
            sx={{
              position: "relative",
              display: "flex",
            }}
            dir="ltr"
          >
            <Box
              sx={{ width: { xs: "40vw", md: "100%", lg: "25vw", xl: "26vw" } }}
            >
              <img
                src={fin}
                style={{
                  position: "relative",
                  zIndex: "5",
                  width: "inherit",
                  marginTop: "9vh",
                }}
                className="text"
                alt=""
              />
            </Box>
            <Box
              sx={{ width: { xs: "40vw", md: "100%", lg: "25vw", xl: "26vw" } }}
            >
              <img
                src={eis}
                style={{ zIndex: "-1", position: "relative", width: "inherit" }}
                className="text"
                alt=""
              />
            </Box>
          </Box>
        </Box>
        <Container sx={{ mb: 10 }} dir="ltr">
          <Grid container sx={{ py: 2, mt: 5, height: "50vh" }}>
            <Grid md="6"></Grid>
            <Grid md="6">
              <Typography
                dangerouslySetInnerHTML={{
                  __html: text,
                }}
              ></Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
