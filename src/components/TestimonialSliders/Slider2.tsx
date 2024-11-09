import React from "react";
import Slider from "react-slick";
import Card2 from "../cards/TestimonialCards/Card2";
import { Testimonial } from "@/types/testimonial";

interface Slider2Props {
  testimonials: Testimonial[];
  CardComponent?: React.ComponentType<Testimonial>;
  autoplay?: boolean;
  infinite?: boolean;
  slidesToShow?: number;
  slidesToScroll?: number;
  gap?: number;
  centerMode?: boolean;
}

const Slider2: React.FC<Slider2Props> = ({
  testimonials,
  CardComponent = Card2,
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
          slidesToShow,
          slidesToScroll,
          centerMode,
        },
      },
      {
        breakpoint: 768,
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
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8 max-w-sm sm:max-w-2xl lg:max-w-full mx-auto relative">
          <div className="w-full lg:w-2/5">
            <span className="text-sm text-gray-500 font-medium mb-4 block">
              Testimonial
            </span>
            <h2 className="text-4xl font-bold text-gray-900 leading-[3.25rem] mb-8">
              23k+ Customers gave their{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-tr from-indigo-600 to-violet-600">
                Feedback
              </span>
            </h2>
          </div>
          <div className="w-full lg:w-3/5 ">
            <Slider {...settings} style={{ gap: `${gap}px` }}>
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  style={{
                    paddingRight: `${gap / 2}px`,
                    paddingLeft: `${gap / 2}px`,
                  }}
                  className="px-4"
                >
                  <CardComponent {...testimonial} />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Slider2;

interface ArrowProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <button
    className="absolute top-1/2 z-10 transform -translate-y-1/2  ml-2 bg-white rounded-full p-2 shadow-lg hover:bg-indigo-600 hover:text-white transition-colors"
    onClick={onClick}
  >
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
);

const NextArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <button
    className="absolute top-1/2 transform -translate-y-1/2 right-0 mr-2 bg-white rounded-full p-2 shadow-lg hover:bg-indigo-600 hover:text-white transition-colors"
    onClick={onClick}
  >
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
);
