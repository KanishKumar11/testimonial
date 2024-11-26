import React from "react";
import { useSpring, animated } from "react-spring";
import { Testimonial } from "@/types/testimonial";

interface SliderOppositeProps {
  testimonials: Testimonial[];
  CardComponent: React.ComponentType<Testimonial>;
}

const Slider8: React.FC<SliderOppositeProps> = ({
  testimonials,
  CardComponent,
}) => {
  const props1 = useSpring({
    from: { transform: "translateX(100%)" },
    to: { transform: "translateX(-100%)" },
    loop: true,
    config: { duration: 10000 },
  });
  const props2 = useSpring({
    from: { transform: "translateX(-100%)" },
    to: { transform: "translateX(100%)" },
    loop: true,
    config: { duration: 10000 },
  });

  return (
    <div className="relative overflow-hidden h-48">
      <animated.div style={props1} className="absolute flex space-x-4">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="w-64">
            <CardComponent {...testimonial} />
          </div>
        ))}
      </animated.div>
      <animated.div style={props2} className="absolute flex space-x-4 top-24">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="w-64">
            <CardComponent {...testimonial} />
          </div>
        ))}
      </animated.div>
    </div>
  );
};

export default Slider8;
