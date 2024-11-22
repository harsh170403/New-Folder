import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useEffect, useRef, useState } from "react";

import "swiper/css";
import "swiper/css/navigation";

const Carousel = () => {
  const [gradientColor, setGradientColor] = useState("rgb(0, 0, 0)"); 
  const canvasRef = useRef(null);

  const getDominantColor = (image) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = 1;
    canvas.height = 1;

    ctx.drawImage(image, 0, 0, 1, 1);
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;

    return `rgb(${r}, ${g}, ${b})`;
  };

  const updateGradient = (swiper) => {
    const activeSlide = swiper.slides[swiper.activeIndex];
    const image = activeSlide.querySelector("img");

    if (image) {
      const dominantColor = getDominantColor(image);
      setGradientColor(dominantColor);
    }
  };

  return (
    <div className="h-[600px] bg-white relative">
      <canvas ref={canvasRef} style={{ display: "none" }} /> 

      <Swiper
        loop={true}
        spaceBetween={0}
        navigation={true}
        modules={[Navigation, Autoplay]}
        autoplay={{
          delay: 4500,
        }}
        onSlideChange={(swiper) => updateGradient(swiper)}
        className="h-[50%]"
      >
        <SwiperSlide>
          <img src={"public/image/carousel_1.jpg"} alt="Carousel" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={"public/image/carousel_2.jpg"} alt="Carousel" />
        </SwiperSlide>
        <SwiperSlide className="bg-black">
          <video controls muted="muted">
            <source src={"public/image/carousel_vid.mp4"} type="video/mp4" />
          </video>
        </SwiperSlide>
        <SwiperSlide>
          <img src={"public/image/carousel_4.jpg"} alt="Carousel" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={"public/image/carousel_5.jpg"} alt="Carousel" />
        </SwiperSlide>
      </Swiper>

      <div
        className="h-[70%]"
        style={{
          background: `linear-gradient(to bottom, ${gradientColor}, rgba(255, 255, 255, 0.6))`, 
        }}
      />
    </div>
  );
};

export default Carousel;
