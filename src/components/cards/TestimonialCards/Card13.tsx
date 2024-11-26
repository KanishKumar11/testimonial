import { Testimonial } from "@/types/testimonial";
import React from "react";

const Card13: React.FC<Testimonial> = ({
  author,
  position,
  avatar,
  rating,
  content,
}) => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-md">
      <div className="flex items-center mb-2">
        <img
          className="w-10 h-10 rounded-full mr-3"
          src={avatar}
          alt="avatar"
        />
        <div>
          <h5 className="text-md font-bold">{author}</h5>
          <p className="text-xs text-gray-500">{position}</p>
        </div>
      </div>
      <div className="flex mb-2">
        {[...Array(rating)].map((_, i) => (
          <svg
            key={i}
            className="w-4 h-4 text-yellow-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.122-6.545L.244 6.91l6.564-.955L10 0l2.192 5.955 6.564.955-4.756 4.635 1.122 6.545z" />
          </svg>
        ))}
      </div>
      <p className="text-gray-600 text-sm">{content}</p>
    </div>
  );
};

export default Card13;
