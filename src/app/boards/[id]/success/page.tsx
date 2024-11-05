"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { getBoard } from "@/actions/board";
import { BoardData } from "@/types/board";

export default function BoardSuccessPage() {
  const { id } = useParams();
  const router = useRouter();
  const [board, setBoard] = useState<BoardData | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const boardData = await getBoard(id as string);
        setBoard(boardData);
      } catch (error) {
        console.error("Error fetching board:", error);
        toast.error("Failed to load board details");
      }
    };

    fetchBoard();
  }, [id]);

  const boardLink =
    typeof window !== "undefined"
      ? `${window.location.origin}/boards/${id}`
      : "";

  const copyLink = () => {
    navigator.clipboard.writeText(boardLink);
    setIsCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setIsCopied(false), 3000);
  };

  if (!board) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        Board Created Successfully!
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>{board.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{board.description}</p>
          <div className="flex items-center space-x-2">
            <Input value={boardLink} readOnly />
            <Button onClick={copyLink}>
              {isCopied ? "Copied!" : "Copy Link"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button onClick={() => router.push("/dashboard")}>
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
}
