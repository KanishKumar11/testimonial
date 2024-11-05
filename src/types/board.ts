export type BoardData = {
  _id: string;
  name: string;
  description: string;
  fields: string[];
  questions: { id: string; text: string }[];
  imageType: "logo" | "icon" | "banner";
  imageUrl?: string;
  iconEmoji?: string;
  thankYouMessage: string;
  isRedirectEnabled: boolean;
  redirectUrl?: string;
  testimonialCount?: number;
};

export type TestimonialData = {
  [key: string]: string | number;
  rating: number;
  content: string;
};
