import React from "react";
import { Testimonial } from "@/types/testimonial";

const Card5: React.FC<Testimonial> = ({
  content,
  author,
  position,
  avatar,
  rating,
}) => (
  <div className="p-8 bg-white rounded-xl shadow-md text-center border border-gray-200">
    <img
      src={avatar}
      alt={author}
      className="w-14 h-14 rounded-full mx-auto mb-4"
    />
    <p className="text-gray-600 mb-4">&quot;{content}&quot;</p>
    <h5 className="font-semibold text-gray-900">{author}</h5>
    <span className="text-xs text-gray-400">{position}</span>
    <div className="mt-2">{Array(rating).fill("⭐").join("")}</div>
  </div>
);

export default Card5;
