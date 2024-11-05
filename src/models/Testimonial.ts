import mongoose from "mongoose";

const TestimonialSchema = new mongoose.Schema(
  {
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TestimonialBoard",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    author: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    content: { type: String, required: true },
    // Other fields will be added dynamically
  },
  { timestamps: true, strict: false }
);

export default mongoose.models.Testimonial ||
  mongoose.model("Testimonial", TestimonialSchema);
