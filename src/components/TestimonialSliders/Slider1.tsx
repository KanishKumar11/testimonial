import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card1 from "../cards/TestimonialCards/Card1";
import { Testimonial } from "@/types/testimonial";

interface Slider1Props {
  testimonials: Testimonial[];
  CardComponent?: React.ComponentType<Testimonial>;
  autoplay?: boolean;
  infinite?: boolean;
  slidesToShow?: number;
  slidesToScroll?: number;
  gap?: number;
  centerMode?: boolean;
}

const Slider1: React.FC<Slider1Props> = ({
  testimonials = [],
  CardComponent = Card1,
  autoplay = true,
  infinite = true,
  slidesToShow = 3,
  slidesToScroll = 1,
  gap = 28,
  centerMode = true,
}) => {
  const settings = {
    dots: true,
    autoplay,
    infinite,
    speed: 500,
    slidesToShow,
    slidesToScroll,
    centerMode,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow,
          slidesToScroll,
          centerMode,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
    ],
    nextArrow: (
      <button className="slick-next custom-arrow">
        <svg className="w-6 h-6 text-indigo-600" viewBox="0 0 24 24">
          <path
            d="M3 12L19 12M14 18L19.2929 12.7071C19.6262 12.3738 19.7929 12.2071 19.7929 12C19.7929 11.7929 19.6262 11.6262 19.2929 11.2929L14 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    ),
    prevArrow: (
      <button className="slick-prev custom-arrow">
        <svg className="w-6 h-6 text-indigo-600" viewBox="0 0 24 24">
          <path
            d="M20.9999 12L4.99992 12M9.99992 6L4.70703 11.2929C4.3737 11.6262 4.20703 11.7929 4.20703 12C4.20703 12.2071 4.3737 12.3738 4.70703 12.7071L9.99992 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    ),
  };

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 flex flex-col justify-center items-center sm:flex-row sm:items-center sm:justify-between max-sm:gap-8">
          <h2 className="text-4xl text-center font-bold text-gray-900 lg:text-left">
            Testimonials
          </h2>
        </div>
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="px-4" // Apply padding here for consistent gap
              style={{
                paddingRight: `${gap / 2}px`,
                paddingLeft: `${gap / 2}px`,
              }}
            >
              <CardComponent {...testimonial} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Slider1;
