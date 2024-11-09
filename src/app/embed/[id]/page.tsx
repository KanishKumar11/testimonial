"use client";
import Card1 from "@/components/cards/TestimonialCards/Card1";
import Slider1 from "@/components/TestimonialSliders/Slider1";
import Slider2 from "@/components/TestimonialSliders/Slider2";
import { testimonials } from "@/lib/data";

const SliderPage = () => (
  <>
    <Slider1
      testimonials={testimonials}
      CardComponent={Card1}
      autoplay={true}
      infinite={true}
      slidesToShow={3}
      gap={32}
    />
    <Slider2
      testimonials={testimonials}
      autoplay={true}
      infinite={true}
      slidesToShow={2}
      gap={32}
    />
  </>
);

export default SliderPage;
