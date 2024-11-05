export type TestimonialStatus = "pending" | "approved" | "rejected";

export type Testimonial = {
  _id: string | number;
  boardId: string | number;
  status?: TestimonialStatus;
  rating?: number;
  content: string;
  author?: string;
  avatar?: string;
  position?: string;
  [key: string]: unknown;
};
