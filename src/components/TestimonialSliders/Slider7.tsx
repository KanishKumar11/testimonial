import { cn } from "@/lib/utils";
import { Testimonial } from "@/types/testimonial";

interface TestimonialGridProps {
  testimonials: Testimonial[];
}

export default function Slider7({ testimonials }: TestimonialGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-6 md:p-8">
      {testimonials.map((testimonial) => (
        <div
          key={testimonial._id}
          className={cn(
            "rounded-xl p-8 shadow-lg",
            testimonial.className || "bg-white"
          )}
        >
          <div className="flex items-center gap-4 mb-6">
            <img
              src={testimonial.avatar}
              alt=""
              className="w-10 h-10 rounded-full border-2 border-white/20"
            />
            <div>
              <h3 className="font-semibold text-white/90">
                {testimonial.author}
              </h3>
              {/* {testimonial.verified && (
                <p className="text-sm text-white/50">Verified Graduate</p>
              )} */}
            </div>
          </div>
          <blockquote>
            <p className="text-xl font-semibold text-white/90 mb-4">
              {testimonial.position}
            </p>
            <p className="text-white/70 leading-relaxed">
              {testimonial.content}
            </p>
          </blockquote>
        </div>
      ))}
    </div>
  );
}
