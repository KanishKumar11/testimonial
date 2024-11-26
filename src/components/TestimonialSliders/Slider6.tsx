"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card5 from "../cards/TestimonialCards/Card5";
import { Testimonial } from "@/types/testimonial";

interface Slider5Props {
  testimonials: Testimonial[];
  CardComponent?: React.ComponentType<Testimonial>;
  autoplay?: boolean;
  infinite?: boolean;
  slidesToShow?: number;
  slidesToScroll?: number;
  gap?: number;
  centerMode?: boolean;
}

const Slider6: React.FC<Slider5Props> = ({
  testimonials = [],
  CardComponent = Card5,
  autoplay = true,
  infinite = true,
  slidesToShow = 2,
  slidesToScroll = 1,
  gap = 28,
  centerMode = false,
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
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
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

export default Slider6;
