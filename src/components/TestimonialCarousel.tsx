import Slider from "react-slick";
import TestimonialCard from "./TestimonialCard"; // Assuming TestimonialCard is already created
import { Testimonial } from "@/types/testimonial";

type TestimonialCarouselProps = {
  testimonials: Testimonial[];
  layout: "Layout1" | "Layout2" | "Layout3";
  colorVariant: "Light" | "Dark" | "Colorful";
  autoplay: boolean;
};

export default function TestimonialCarousel({
  testimonials,
  layout,
  colorVariant,
  autoplay,
}: TestimonialCarouselProps) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Number of cards to show
    slidesToScroll: 1,
    autoplay: autoplay,
    autoplaySpeed: 3000,
  };

  return (
    <Slider {...settings}>
      {testimonials.map((testimonial) => (
        <div key={testimonial.id}>
          <TestimonialCard
            testimonial={testimonial}
            layout={layout}
            colorVariant={colorVariant}
          />
        </div>
      ))}
    </Slider>
  );
}
