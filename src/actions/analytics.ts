"use server";

import { auth } from "@/auth";
import { connectDb } from "@/lib/connectDb";
import TestimonialBoard from "@/models/TestimonialBoard";
import Testimonial from "@/models/Testimonial";

export async function getAnalytics() {
  const session = await auth();

  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  await connectDb();

  try {
    // Total testimonials
    const totalTestimonials = await Testimonial.countDocuments({
      userId: session.user.id,
    });

    // Testimonials by board
    const testimonialsByBoard = await TestimonialBoard.aggregate([
      { $match: { userId: session.user.id } },
      {
        $lookup: {
          from: "testimonials",
          localField: "_id",
          foreignField: "boardId",
          as: "testimonials",
        },
      },
      {
        $project: {
          name: 1,
          count: { $size: "$testimonials" },
        },
      },
    ]);

    // Testimonials trend (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const testimonialsTrend = await Testimonial.aggregate([
      {
        $match: {
          userId: session.user.id,
          createdAt: { $gte: thirtyDaysAgo },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
      {
        $project: {
          date: "$_id",
          count: 1,
          _id: 0,
        },
      },
    ]);

    return {
      totalTestimonials,
      testimonialsByBoard,
      testimonialsTrend,
    };
  } catch (error) {
    console.error("Failed to fetch analytics:", error);
    throw new Error("Failed to fetch analytics");
  }
}
