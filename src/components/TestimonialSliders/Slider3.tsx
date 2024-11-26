"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card3 from "../cards/TestimonialCards/Card3";
import { Testimonial } from "@/types/testimonial";

interface Slider3Props {
  testimonials: Testimonial[];
  CardComponent?: React.ComponentType<Testimonial>;
  autoplay?: boolean;
  infinite?: boolean;
  slidesToShow?: number;
  slidesToScroll?: number;
  gap?: number;
  centerMode?: boolean;
}

const Slider3: React.FC<Slider3Props> = ({
  testimonials = [],
  CardComponent = Card3,
  autoplay = true,
  infinite = true,
  slidesToShow = 3,
  slidesToScroll = 1,
  gap = 28,
  centerMode = false,
}) => {
  const settings = {
    dots: false,
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
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <section className="py-24 bg-gradient-to-b from-violet-50 to-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-violet-600 mb-2 block">
            Testimonial
          </span>
          <h2 className="text-4xl font-bold text-gray-900">
            What The People Thinks About Us
          </h2>
        </div>
        <div className="relative">
          <Slider {...settings}>
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="px-4"
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
      </div>
    </section>
  );
};

interface ArrowProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <button
    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -ml-4 bg-white rounded-full p-3 shadow-lg hover:bg-violet-600 hover:text-white transition-all"
    onClick={onClick}
  >
    <svg className="w-6 h-6" viewBox="0 0 24 24">
      <path
        d="M20.9999 12L4.99992 12M9.99992 6L4.70703 11.2929C4.3737 11.6262 4.20703 11.7929 4.20703 12C4.20703 12.2071 4.3737 12.3738 4.70703 12.7071L9.99992 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </button>
);

const NextArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <button
    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 -mr-4 bg-white rounded-full p-3 shadow-lg hover:bg-violet-600 hover:text-white transition-all"
    onClick={onClick}
  >
    <svg className="w-6 h-6" viewBox="0 0 24 24">
      <path
        d="M3 12L19 12M14 18L19.2929 12.7071C19.6262 12.3738 19.7929 12.2071 19.7929 12C19.7929 11.7929 19.6262 11.6262 19.2929 11.2929L14 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </button>
);

export default Slider3;
