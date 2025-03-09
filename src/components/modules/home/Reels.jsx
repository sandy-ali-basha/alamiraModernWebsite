import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function Reels() {
  const [videoIds, setVideoIds] = useState([]);

  useEffect(() => {
    async function fetchTikTokVideos() {
      // Replace with your actual TikTok scraping logic or API method
      const latestVideos = [
        "7460201421376425238",
        "7299582107326647585",
        "7344433242524634401",
        "7478291217105603862",
        "7477231354833374486",
        "7477223099004505366",
      ];
      setVideoIds(latestVideos);
    }
    fetchTikTokVideos();
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [videoIds]);

  return (
    <Swiper
      style={{ paddingTop: "2vh", paddingBottom: "2vh" }}
      spaceBetween={0}
      // slidesPerView={2}
      modules={[Autoplay]}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      breakpoints={{
        640: { slidesPerView: 2, spaceBetween: 0 },
        768: { slidesPerView: 3, spaceBetween: 0 },
        1024: { slidesPerView: 4, spaceBetween: 0 },
      }}
    >
      {videoIds.map((id) => (
        <SwiperSlide key={id}>
          <blockquote
            className="tiktok-embed"
            cite={`https://www.tiktok.com/@alamira_moderne/video/${id}`}
            data-video-id={id}
            style={{ maxWidth: "100%", minWidth: "325px" }}
          >
            <section>
              <a
                target="_blank"
                title="@alamira_moderne"
                href="https://www.tiktok.com/@alamira_moderne?refer=embed"
              >
                @alamira_moderne
              </a>
            </section>
          </blockquote>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
