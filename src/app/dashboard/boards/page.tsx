import { getBoards } from "@/actions/board";
import { BoardData } from "@/types/board";
import TestimonialBoardCard from "@/components/cards/TestimonialBoardCard";

export default async function TestimonialsPage() {
  const boards = await getBoards();

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Testimonial Boards</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {boards.map((board: BoardData) => (
          <TestimonialBoardCard key={board._id} board={board} />
        ))}
      </div>
    </div>
  );
}
