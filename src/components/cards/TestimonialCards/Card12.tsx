"use client";

import { Quote, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";
import { Testimonial } from "@/types/testimonial";

export const Card12 = ({ content, author, avatar }: Testimonial) => {
  return (
    <div className={cn("w-full max-w-2xl mx-auto")}>
      <div className="bg-white rounded-xl shadow-sm p-6 relative">
        <div className="absolute -top-4 -left-4 bg-emerald-500 rounded-full p-2">
          <Quote className="w-6 h-6 text-white" />
        </div>
        <div className="pt-4">
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            {content}
          </p>
          <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={avatar}
                alt=""
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="font-medium text-gray-700">{author}</span>
            </div>
            <Twitter className="w-5 h-5 text-sky-500" />
          </div>
        </div>
      </div>
    </div>
  );
};
