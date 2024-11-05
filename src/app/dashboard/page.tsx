import Link from "next/link";
import {
  getBoards,
  getAnalytics,
  getRecentTestimonials,
} from "@/actions/board";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { PlusCircle, FileText } from "lucide-react";
import { auth } from "@/auth";
import { BoardData } from "@/types/board";
import TestimonialBoardCard from "@/components/cards/TestimonialBoardCard";

export default async function DashboardPage() {
  const session = await auth();
  const boards = await getBoards();
  const { totalSpaces, totalTestimonials, pendingApprovals } =
    await getAnalytics();
  const recentTestimonials = await getRecentTestimonials();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          Hey {session?.user?.name}!
        </h2>
        <p className="text-muted-foreground">Welcome back to your dashboard.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spaces</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSpaces}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Testimonials
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTestimonials}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Approvals
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingApprovals}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalTestimonials > 0
                ? `${(
                    ((totalTestimonials - pendingApprovals) /
                      totalTestimonials) *
                    100
                  ).toFixed(1)}%`
                : "N/A"}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold tracking-tight">
          Your Testimonial Boards
        </h3>
        <Button asChild>
          <Link href="/create-board">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Board
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {boards.map((board: BoardData) => (
          <TestimonialBoardCard key={board._id} board={board} />
        ))}
      </div>

      <div>
        <h3 className="text-2xl font-bold tracking-tight mb-4">
          Recent Testimonials
        </h3>
        <div className="space-y-4">
          {recentTestimonials.map((testimonial: any) => (
            <Card key={testimonial._id}>
              <CardContent className="pt-6">
                <p className="text-sm italic">
                  &quot;{testimonial.content}&quot;
                </p>
                <div className="mt-2 flex justify-between items-center">
                  <p className="text-sm font-semibold">{testimonial.author}</p>
                  <Badge>{testimonial.boardName}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
