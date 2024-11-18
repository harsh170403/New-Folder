import React from "react";
import Slider from "react-slick";

const ImageSlider = () => {
  const settings = {
    dots: true, // Shows navigation dots
    infinite: true, // Enables infinite scrolling
    speed: 500, // Transition speed
    slidesToShow: 1, // Number of slides visible at once
    slidesToScroll: 1, // Number of slides to scroll
    autoplay: true, // Enables auto-sliding
    autoplaySpeed: 3000, // Auto-slide interval
    arrows: false, // Hides navigation arrows
  };

  const images = [
    "https://via.placeholder.com/1200x400?text=Slide+1",
    "https://via.placeholder.com/1200x400?text=Slide+2",
    "https://via.placeholder.com/1200x400?text=Slide+3",
  ];

  return (
    <div className="max-w-screen-xl mx-auto mt-6">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Slide ${index + 1}`} className="w-full" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
