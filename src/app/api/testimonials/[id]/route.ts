import { NextResponse } from "next/server";
import { getTestimonialsByBoardId } from "@/actions/testimonial";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const testimonials = await getTestimonialsByBoardId(params.id);
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("Failed to fetch testimonials:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}
