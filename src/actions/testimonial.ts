"use server";
import { auth } from "@/auth";
import { connectDb } from "@/lib/connectDb";
import Testimonial from "@/models/Testimonial";
import TestimonialBoard from "@/models/TestimonialBoard";

export async function getTestimonialsByBoardId(boardId: string) {
  // const session = await auth();

  // if (!session || !session.user) {
  //   throw new Error("Unauthorized");
  // }

  await connectDb();

  try {
    const testimonials = await Testimonial.find({ boardId });
    return JSON.parse(JSON.stringify(testimonials));
  } catch (error) {
    console.error("Failed to fetch testimonials:", error);
    throw new Error("Failed to fetch testimonials");
  }
}
export async function updateTestimonialStatus(
  testimonialId: string,
  newStatus: "approved" | "rejected"
) {
  const session = await auth();

  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  await connectDb();

  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      testimonialId,
      { status: newStatus },
      { new: true }
    );

    if (!testimonial) {
      throw new Error(
        "Testimonial not found or you're not authorized to update it"
      );
    }

    // Update the testimonial count on the board
    await TestimonialBoard.findByIdAndUpdate(testimonial.boardId, {
      $inc: { testimonialCount: newStatus === "approved" ? 1 : -1 },
    });

    return JSON.parse(JSON.stringify(testimonial));
  } catch (error) {
    console.error("Failed to update testimonial status:", error);
    throw new Error("Failed to update testimonial status");
  }
}
