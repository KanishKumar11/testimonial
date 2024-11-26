import React from "react";
import { Star } from "lucide-react";
import { Testimonial } from "@/types/testimonial";

const Card7: React.FC<Testimonial> = ({
  author,
  position,
  content,
  avatar,
  rating = 5,
}) => {
  return (
    <div className="bg-white rounded-2xl p-8  hover:shadow-xl transition-shadow relative border mt-10 ">
      <div className="absolute -top-6 left-1/2 -translate-x-1/2">
        <div className="w-12 h-12 rounded-full overflow-hidden ring-4 ring-white">
          <img src={avatar} alt={name} className="w-full h-full object-cover" />
        </div>
      </div>
      <div className="pt-8 text-center">
        <div className="flex justify-center gap-1 mb-4">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-violet-500 text-violet-500" />
          ))}
        </div>
        <p className="text-gray-600 mb-6">{content}</p>
        <div className="border-t pt-4">
          <h4 className="font-semibold text-gray-900">{author}</h4>
          <p className="text-sm text-gray-500">{position}</p>
        </div>
      </div>
    </div>
  );
};

export default Card7;
