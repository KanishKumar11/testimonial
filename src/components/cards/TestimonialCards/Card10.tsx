import React from "react";
import { Star, Quote } from "lucide-react";
import { Testimonial } from "@/types/testimonial";

const Card10: React.FC<Testimonial> = ({
  author,
  position,
  content,
  avatar,
  rating = 5,
}) => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow relative">
      <Quote className="w-12 h-12 text-violet-200 absolute top-4 right-4" />
      <div className="flex items-center mb-6">
        <img
          src={avatar}
          alt={author}
          className="w-16 h-16 rounded-full mr-4"
        />
        <div>
          <h4 className="font-semibold text-gray-900">{author}</h4>
          <p className="text-sm text-gray-500">{position}</p>
          <div className="flex gap-1 mt-2">
            {Array.from({ length: rating }).map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 fill-violet-500 text-violet-500"
              />
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-600">{content}</p>
    </div>
  );
};

export default Card10;
