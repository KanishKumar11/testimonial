import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Testimonial } from "@/types/testimonial"; // Your testimonial type definition
import { FaStar } from "react-icons/fa6";

type TestimonialCardProps = {
  testimonial: Testimonial;
  layout: "Layout1" | "Layout2" | "Layout3";
  colorVariant: "Light" | "Dark" | "Colorful";
};

const TestimonialCard = ({
  testimonial,
  layout,
  colorVariant,
}: TestimonialCardProps) => {
  const colorClasses = {
    Light: "bg-white text-gray-900 border-gray-300",
    Dark: "bg-gray-800 text-white border-gray-700",
    Colorful:
      "bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white",
  };

  const layoutStyles = {
    Layout1: (
      <div
        className={`p-4 rounded-lg shadow-md border ${colorClasses[colorVariant]}`}
      >
        <Avatar className="mx-auto">
          <AvatarImage
            src={testimonial.avatar || ""}
            alt={testimonial.author}
          />
          <AvatarFallback>{testimonial.author[0]}</AvatarFallback>
        </Avatar>
        <h4 className="mt-4 text-center font-bold">{testimonial.author}</h4>
        <p className="mt-2 text-center">{testimonial.content}</p>
        <StarRating rating={testimonial.rating} />
      </div>
    ),
    Layout2: (
      <div
        className={`p-4 rounded-lg shadow-md border ${colorClasses[colorVariant]}`}
      >
        <div className="flex items-center">
          <Avatar>
            <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
            <AvatarFallback>{testimonial.author[0]}</AvatarFallback>
          </Avatar>
          <div className="ml-4">
            <h4 className="font-bold">{testimonial.author}</h4>
            <p className="mt-1 text-sm">{testimonial.content}</p>
          </div>
        </div>
        <StarRating rating={testimonial.rating} />
      </div>
    ),
    Layout3: (
      <div
        className={`p-4 rounded-lg shadow-md border ${colorClasses[colorVariant]}`}
      >
        <StarRating rating={testimonial.rating} />
        <p className="my-4 text-center">{testimonial.content}</p>
        <div className="flex items-center justify-center">
          <Avatar>
            <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
            <AvatarFallback>{testimonial.author[0]}</AvatarFallback>
          </Avatar>
          <h4 className="ml-2 font-bold">{testimonial.author}</h4>
        </div>
      </div>
    ),
  };

  return layoutStyles[layout];
};

export default TestimonialCard;
type StarRatingProps = {
  rating: number;
  maxRating?: number;
};

function StarRating({ rating, maxRating = 5 }: StarRatingProps) {
  return (
    <div className="flex">
      {Array.from({ length: maxRating }, (_, index) => {
        const starValue = index + 1;
        return (
          <FaStar
            key={starValue}
            size={20}
            className={`${
              starValue <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
          />
        );
      })}
    </div>
  );
}
