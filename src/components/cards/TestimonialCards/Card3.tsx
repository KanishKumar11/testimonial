import React from "react";
import { Testimonial } from "@/types/testimonial";

const Card3: React.FC<Testimonial> = ({
  rating,
  content,
  author,
  position,
  avatar,
}) => {
  return (
    <div className="bg-white p-6 border rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 text-center">
      <img
        className="mx-auto rounded-full w-16 h-16 mb-4"
        src={avatar}
        alt={`${author} avatar`}
      />
      <p className="text-gray-700 italic mb-4">&quot;{content}&quot;</p>
      <h5 className="text-lg font-semibold text-gray-900">{author}</h5>
      <span className="text-sm text-gray-500">{position}</span>
    </div>
  );
};

export default Card3;
