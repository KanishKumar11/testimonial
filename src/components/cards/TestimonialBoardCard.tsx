import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { BoardData } from "@/types/board";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Code, Edit, Eye, MoreVertical, Trash2 } from "lucide-react";
import Link from "next/link";
import { Badge } from "../ui/badge";

export default function TestimonialBoardCard({ board }: { board: BoardData }) {
  return (
    <Card key={board._id} className="relative">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-bold">{board.name}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {board.description}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" />
                View
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Code className="mr-2 h-4 w-4" />
                Embed
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mt-2">
          <Badge variant="secondary">
            {board.testimonialCount} testimonials
          </Badge>
          <Button size="sm" variant="outline" asChild>
            <Link href={`/dashboard/boards/${board._id}/testimonials`}>
              View Testimonials
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
