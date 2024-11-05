"use server";

import { auth } from "@/auth";
import { connectDb } from "@/lib/connectDb";
import Testimonial from "@/models/Testimonial";
import TestimonialBoard from "@/models/TestimonialBoard";
import { BoardData, TestimonialData } from "@/types/board";
import { Testimonial as ITestimonial } from "@/types/testimonial";

export async function createBoard(
  boardData: Omit<BoardData, "_id">
): Promise<{ _id: string }> {
  const session = await auth();

  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  await connectDb();

  try {
    const board = await TestimonialBoard.create({
      userId: session.user.id,
      ...boardData,
      questions: boardData.questions.map((q) => q.toString()), // Ensure questions are strings
    });

    return { _id: board._id.toString() };
  } catch (error) {
    console.error("Failed to create board:", error);
    throw new Error("Failed to create board");
  }
}

export async function getBoard(id: string): Promise<BoardData> {
  const session = await auth();

  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  await connectDb();

  try {
    const board = await TestimonialBoard.findOne({
      _id: id,
      userId: session.user.id,
    });

    if (!board) {
      throw new Error("Board not found");
    }

    return JSON.parse(JSON.stringify(board));
  } catch (error) {
    console.error("Failed to fetch board:", error);
    throw new Error("Failed to fetch board");
  }
}

export async function submitTestimonial(
  boardId: string,
  testimonialData: TestimonialData
): Promise<ITestimonial> {
  await connectDb();

  try {
    const board = await TestimonialBoard.findById(boardId);
    if (!board) {
      throw new Error("Board not found");
    }

    const testimonial = {
      boardId,
      ...testimonialData,
      status: "pending",
    };

    const newTestimonial = await Testimonial.create(testimonial);
    return JSON.parse(JSON.stringify(newTestimonial));
  } catch (error) {
    console.error("Failed to submit testimonial:", error);
    throw new Error("Failed to submit testimonial");
  }
}
export async function getBoards() {
  const session = await auth();

  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  await connectDb();

  try {
    const boards = await TestimonialBoard.find({ userId: session.user.id });
    return JSON.parse(JSON.stringify(boards));
  } catch (error) {
    console.error("Failed to fetch boards:", error);
    throw new Error("Failed to fetch boards");
  }
}
export async function updateBoard(id: string, data: Partial<BoardData>) {
  const session = await auth();

  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  await connectDb();

  try {
    const updatedBoard = await TestimonialBoard.findOneAndUpdate(
      { _id: id, userId: session.user.id },
      data,
      { new: true }
    );
    return JSON.parse(JSON.stringify(updatedBoard));
  } catch (error) {
    console.error("Failed to update board:", error);
    throw new Error("Failed to update board");
  }
}
export async function getAnalytics() {
  const session = await auth();

  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  await connectDb();

  try {
    const totalSpaces = await TestimonialBoard.countDocuments({
      userId: session.user.id,
    });
    const totalTestimonials = await Testimonial.countDocuments({
      userId: session.user.id,
    });
    const pendingApprovals = await Testimonial.countDocuments({
      userId: session.user.id,
      status: "pending",
    });

    return { totalSpaces, totalTestimonials, pendingApprovals };
  } catch (error) {
    console.error("Failed to fetch analytics:", error);
    throw new Error("Failed to fetch analytics");
  }
}

export async function getRecentTestimonials(limit = 5) {
  const session = await auth();

  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  await connectDb();

  try {
    const recentTestimonials = await Testimonial.aggregate([
      { $match: { userId: session.user.id, status: "approved" } },
      { $sort: { createdAt: -1 } },
      { $limit: limit },
      {
        $lookup: {
          from: "testimonialboards",
          localField: "boardId",
          foreignField: "_id",
          as: "board",
        },
      },
      { $unwind: "$board" },
      {
        $project: {
          _id: 1,
          content: 1,
          author: 1,
          boardName: "$board.name",
        },
      },
    ]);

    return JSON.parse(JSON.stringify(recentTestimonials));
  } catch (error) {
    console.error("Failed to fetch recent testimonials:", error);
    throw new Error("Failed to fetch recent testimonials");
  }
}
