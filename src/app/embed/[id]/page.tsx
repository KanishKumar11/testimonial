"use client";
import Card1 from "@/components/cards/TestimonialCards/Card1";
import Card10 from "@/components/cards/TestimonialCards/Card10";
import Card11 from "@/components/cards/TestimonialCards/Card11";
import { Card12 } from "@/components/cards/TestimonialCards/Card12";
import Card13 from "@/components/cards/TestimonialCards/Card13";
import Card2 from "@/components/cards/TestimonialCards/Card2";
import Card3 from "@/components/cards/TestimonialCards/Card3";
import Card4 from "@/components/cards/TestimonialCards/Card4";
import Card5 from "@/components/cards/TestimonialCards/Card5";
import Card6 from "@/components/cards/TestimonialCards/Card6";
import Card7 from "@/components/cards/TestimonialCards/Card7";
import Card8 from "@/components/cards/TestimonialCards/Card8";
import Card9 from "@/components/cards/TestimonialCards/Card9";
import Slider1 from "@/components/TestimonialSliders/Slider1";
import Slider2 from "@/components/TestimonialSliders/Slider2";
import Slider3 from "@/components/TestimonialSliders/Slider3";
import Slider4 from "@/components/TestimonialSliders/Slider4";
import Slider5 from "@/components/TestimonialSliders/Slider5";
import Slider6 from "@/components/TestimonialSliders/Slider6";
import Slider7 from "@/components/TestimonialSliders/Slider7";
import Slider8 from "@/components/TestimonialSliders/Slider8";
import { testimonials } from "@/lib/data";

const SliderPage = () => (
  <div className="max-w-7xl mx-auto">
    <Card1 {...testimonials[0]} />
    <Card2 {...testimonials[0]} />
    <Card3 {...testimonials[0]} />
    <Card4 {...testimonials[0]} />
    <Card5 {...testimonials[0]} />
    <Card6 {...testimonials[0]} />
    <Card7 {...testimonials[0]} />
    <Card8 {...testimonials[0]} />
    <Card9 {...testimonials[0]} />
    <Card10 {...testimonials[0]} />
    <Card11 {...testimonials[0]} />
    <Card12 {...testimonials[0]} />
    <Card13 {...testimonials[0]} />
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
      CardComponent={Card2}
      infinite={true}
      slidesToShow={2}
      gap={32}
    />
    <Slider2
      testimonials={testimonials}
      autoplay={true}
      CardComponent={Card3}
      infinite={true}
      slidesToShow={2}
      gap={32}
    />
    <Slider2
      testimonials={testimonials}
      autoplay={true}
      CardComponent={Card4}
      infinite={true}
      slidesToShow={2}
      gap={32}
    />
    <Slider2
      testimonials={testimonials}
      autoplay={true}
      CardComponent={Card5}
      infinite={true}
      slidesToShow={2}
      gap={32}
    />
    <Slider2
      testimonials={testimonials}
      autoplay={true}
      CardComponent={Card6}
      infinite={true}
      slidesToShow={2}
      gap={32}
    />
    <Slider3
      testimonials={testimonials}
      autoplay={true}
      CardComponent={Card7}
      infinite={true}
      slidesToShow={2}
      gap={32}
    />
    <Slider4
      testimonials={testimonials}
      autoplay={true}
      CardComponent={Card7}
      infinite={true}
      slidesToShow={2}
      gap={32}
    />
    <Slider5
      testimonials={testimonials}
      autoplay={true}
      CardComponent={Card7}
      infinite={true}
      slidesToShow={2}
      gap={32}
    />
    <Slider6
      testimonials={testimonials}
      autoplay={true}
      CardComponent={Card7}
      infinite={true}
      slidesToShow={2}
      gap={32}
    />
    {/* <Slider7
      testimonials={testimonials}
      autoplay={true}
      CardComponent={Card7}
      infinite={true}
      slidesToShow={2}
      gap={32}
    /> */}
    <Slider8
      testimonials={testimonials}
      CardComponent={Card13}
      // autoplay={true}
      // infinite={true}
      // slidesToShow={2}
      // gap={32}
    />
  </div>
);

export default SliderPage;
