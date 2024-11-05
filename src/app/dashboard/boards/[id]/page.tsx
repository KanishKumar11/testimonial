import { getBoard } from "@/actions/board";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function BoardPage({
  params,
}: {
  params: { id: string };
}) {
  const board = await getBoard(params.id);

  if (!board) {
    return <div>Board not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">{board.name}</h2>
        <Button asChild>
          <Link href={`/dashboard/boards/${params.id}/edit`}>Edit Board</Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Board Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{board.description}</p>
          <div className="mt-4">
            <p>Total Testimonials: {board.testimonialCount}</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Recent Testimonials</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Add a list or grid of recent testimonials here */}
          <Button asChild className="mt-4">
            <Link href={`/dashboard/boards/${params.id}/testimonials`}>
              View All Testimonials
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
