// components/cards/Card6.tsx
import React from "react";
import { Testimonial } from "@/types/testimonial";

const Card6: React.FC<Testimonial> = ({
  content,
  author,
  position,
  avatar,
}) => (
  <div className="p-10 bg-gray-50 rounded-lg shadow text-center transform transition hover:scale-105">
    <img
      src={avatar}
      alt={author}
      className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-purple-600"
    />
    <p className="text-gray-700 mb-4">&quot;{content}&quot;</p>
    <h5 className="font-semibold">{author}</h5>
    <span className="text-sm text-gray-500">{position}</span>
  </div>
);

export default Card6;
