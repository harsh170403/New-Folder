import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useRef, useState } from "react";
import HomePageCard from '../components/HomePageCard';


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
          <img src={"/image/carousel_1.jpg"} alt="Carousel" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={"/image/carousel_2.jpg"} alt="Carousel" />
        </SwiperSlide>
        <SwiperSlide className="bg-black">
          <video controls muted="muted">
            <source src={"/image/carousel_vid.mp4"} type="video/mp4" />
          </video>
        </SwiperSlide>
        <SwiperSlide>
          <img src={"/image/carousel_4.jpg"} alt="Carousel" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={"/image/carousel_5.jpg"} alt="Carousel" />
        </SwiperSlide>
      </Swiper>

      <div
        className="h-[100%]"
        style={{
          background: `linear-gradient(to bottom, ${gradientColor}, rgba(255, 255, 255, 1))`,
        }}
      />
    </div>
  );
};

const HomePage = () => {
  return (
    <div className="bg-amazonclone-background">
      <div className="min-w-[1000px] max-w-[1500px] m-auto">
        <Carousel />
        <div className="grid grid-cols-3 xl:grid-cols-4 -mt-80">
          <HomePageCard
            title={"We have a surprise for you"}
            img={"/image/home_grid_1.jpg"}
            link={"See terms and conditions"}
          />
          <HomePageCard
            title={"Watch The Rings of Power"}
            img={"/image/home_grid_2.jpg"}
            link={"Start streaming now"}
          />
          <HomePageCard
            title={"Unlimited Streaming"}
            img={"/image/home_grid_3.jpg"}
            link={"Find out more"}
          />
          <HomePageCard
            title={"More titles to explore"}
            img={"/image/home_grid_4.jpg"}
            link={"Browse Kindle Unlimited"}
          />
          <HomePageCard
            title={"Shop Pet Supplies"}
            img={"/image/home_grid_5.jpg"}
            link={"See more"}
          />
          <HomePageCard
            title={"Spring Sale"}
            img={"/image/home_grid_6.jpg"}
            link={"See the deals"}
          />
          <HomePageCard
            title={"Echo Buds"}
            img={"/image/home_grid_7.jpg"}
            link={"See more"}
          />
          <HomePageCard
            title={"Family Plan: 3 months free"}
            img={"/image/home_grid_8.jpg"}
            link={"Learn more"}
          />
          <div className="m-3 pt-8">
            <img
              className="xl:hidden"
              src={"/image/banner_image_2.jpg"}
              alt="Banner 2"
            />
          </div>
        </div>
        <div className="h-[200px]">
          <img
            className="h-[100%] m-auto"
            src={"/image/banner_image.jpg"}
            alt="Banner 1"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
