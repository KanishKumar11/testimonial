// components/cards/Card4.tsx
import React from "react";
import { Testimonial } from "@/types/testimonial";

const Card4: React.FC<Testimonial> = ({
  content,
  author,
  position,
  avatar,
}) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg text-center hover:bg-purple-100 transition">
      <img
        src={avatar}
        alt={author}
        className="w-16 h-16 rounded-full mx-auto mb-3"
      />
      <p className="text-gray-800 italic mb-3">&quot;{content}&quot;</p>
      <h5 className="font-semibold text-gray-900">{author}</h5>
      <span className="text-sm text-gray-500">{position}</span>
    </div>
  );
};

export default Card4;
