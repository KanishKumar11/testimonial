"use client";
import Card1 from "@/components/cards/TestimonialCards/Card1";
import Slider1 from "@/components/TestimonialSliders/Slider1";
import { testimonials } from "@/lib/data";

const SliderPage = () => (
  <Slider1
    testimonials={testimonials}
    CardComponent={Card1}
    autoplay={true}
    infinite={true}
    slidesToShow={3}
    gap={32}
  />
);

export default SliderPage;
