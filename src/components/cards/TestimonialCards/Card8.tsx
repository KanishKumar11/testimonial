import React from "react";
import { Star } from "lucide-react";
import { Testimonial } from "@/types/testimonial";

const Card8: React.FC<Testimonial> = ({
  author,
  position,
  content,
  avatar,
  rating = 5,
}) => {
  return (
    <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-8 text-white">
      <div className="flex items-center mb-4">
        <img
          src={avatar}
          alt={author}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h4 className="font-semibold">{author}</h4>
          <p className="text-sm opacity-80">{position}</p>
        </div>
      </div>
      <p className="mb-6 opacity-90">{content}</p>
      <div className="flex gap-1">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-white text-white" />
        ))}
      </div>
    </div>
  );
};

export default Card8;
