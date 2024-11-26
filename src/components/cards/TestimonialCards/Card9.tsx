import React from "react";
import { Star } from "lucide-react";
import { Testimonial } from "@/types/testimonial";

const Card9: React.FC<Testimonial> = ({
  author,
  position,
  content,
  avatar,
  rating = 5,
}) => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center">
          <img
            src={avatar}
            alt={author}
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <h4 className="font-semibold text-gray-900">{author}</h4>
            <p className="text-sm text-gray-500">{position}</p>
          </div>
        </div>
        <div className="flex gap-1">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-violet-500 text-violet-500" />
          ))}
        </div>
      </div>
      <p className="text-gray-600">{content}</p>
    </div>
  );
};

export default Card9;
