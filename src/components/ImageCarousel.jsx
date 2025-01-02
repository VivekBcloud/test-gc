import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "./SvgIcons";

const ImageCarousel = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    // Duration of the transition
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="max-w-md mx-auto  bg-white shadow-lg  overflow-hidden">
      <div className="relative">
        <div className="overflow-hidden">
          <div
            className={`flex transition-transform duration-300`}
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full h-64 object-cover flex-shrink-0"
              />
            ))}
          </div>
        </div>
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-1 transform -translate-y-1/2  text-white p-2 rounded-full hover:bg-white hover:text-black transition-all"
        >
          <ChevronLeftIcon />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-1 transform -translate-y-1/2  text-white p-2 rounded-full hover:bg-white hover:text-black transition-all"
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
};

export default ImageCarousel;
