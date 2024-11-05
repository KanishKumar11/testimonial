"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getBoard } from "@/actions/board";
import { BoardData } from "@/types/board";
// TODO: Implement proper access control for this page
// In the future, we should ensure this page is only accessible
// after a successful testimonial submission. This might involve:
// - Using server-side sessions to track submission status
// - Implementing a token-based system for one-time access
// - Storing submission status in a database and checking it here

export default function ThankYouPage() {
  const { id } = useParams();
  const [board, setBoard] = useState<BoardData | null>(null);

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const boardData = await getBoard(id as string);
        setBoard(boardData);
      } catch (error) {
        console.error("Error fetching board:", error);
      }
    };

    fetchBoard();
  }, [id]);

  if (!board) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Thank You!</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            {board.thankYouMessage ||
              "Thank you for submitting your testimonial!"}
          </p>
          {board.isRedirectEnabled && board.redirectUrl && (
            <Button
              onClick={() => (window.location.href = board.redirectUrl!)}
              className="mt-4"
            >
              Continue to {new URL(board.redirectUrl).hostname}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
