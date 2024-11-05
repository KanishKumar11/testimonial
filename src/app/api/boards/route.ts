import { NextResponse } from "next/server";
import TestimonialBoard from "@/models/TestimonialBoard";
import { connectDb } from "@/lib/connectDb";
import { auth } from "@/auth";

export async function POST(req: Request) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDb();

  const { name, description, questions, customFields } = await req.json();

  try {
    const board = await TestimonialBoard.create({
      userId: session.user.id,
      name,
      description,
      questions,
      customFields,
    });

    return NextResponse.json(board, { status: 201 });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create board" },
      { status: 500 }
    );
  }
}
