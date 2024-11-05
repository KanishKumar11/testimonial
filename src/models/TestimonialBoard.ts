import mongoose from "mongoose";

const TestimonialBoardSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    fields: [{ type: String }],
    questions: [
      {
        id: { type: String, required: true },
        text: { type: String, required: true },
      },
    ],
    imageType: {
      type: String,
      enum: ["logo", "icon", "banner"],
      required: true,
    },
    imageUrl: { type: String },
    iconEmoji: { type: String },
    thankYouMessage: { type: String, required: true },
    isRedirectEnabled: { type: Boolean, required: true },
    redirectUrl: { type: String },
    testimonialCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.TestimonialBoard ||
  mongoose.model("TestimonialBoard", TestimonialBoardSchema);
