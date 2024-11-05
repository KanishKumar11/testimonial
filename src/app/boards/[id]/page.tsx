"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { getBoard, submitTestimonial } from "@/actions/board";
import { BoardData, TestimonialData } from "@/types/board";
import { StarRating } from "@/components/StarRating";

export default function BoardPage() {
  const { id } = useParams();
  const router = useRouter();
  const [board, setBoard] = useState<BoardData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  const formSchema = z.object({
    ...board?.fields.reduce(
      (acc, field) => ({
        ...acc,
        [field]: z.string().min(1, `${field} is required`),
      }),
      {}
    ),
    rating: z.number().min(1).max(5),
    content: z
      .string()
      .min(10, "Testimonial must be at least 10 characters long"),
  });
  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...board?.fields.reduce((acc, field) => ({ ...acc, [field]: "" }), {}),
      rating: 0,
      content: "",
    } as FormData,
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await submitTestimonial(id as string, values as TestimonialData);
      setIsDialogOpen(false);
      router.push(`/boards/${id}/thank-you`);
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      toast.error("Failed to submit testimonial. Please try again.");
    }
  };

  if (!board) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <Card>
        <CardContent className="flex items-center justify-center flex-col">
          {(board.imageType === "logo" || board.imageType === "banner") &&
            board.imageUrl && (
              <img
                src={board.imageUrl}
                alt="Board Logo"
                className="mt-4 max-h-32"
              />
            )}
          {board.imageType === "icon" && board.iconEmoji && (
            <div className="flex items-center justify-center">
              <span className="text-8xl mt-4 block">{board.iconEmoji}</span>
            </div>
          )}
          <CardHeader>
            <CardTitle>{board.name}</CardTitle>
          </CardHeader>
          <p>{board.description}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Questions to Consider</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            {board.questions.map((question, index) => (
              <li key={index}>{question.text}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Submit Your Testimonial</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Submit Your Testimonial</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <p className="font-semibold">
                    Consider these questions when writing your testimonial:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    {board.questions.map((question, index) => (
                      <li key={index}>{question.text}</li>
                    ))}
                  </ul>
                </div>
                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rating</FormLabel>
                      <FormControl>
                        <StarRating
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Testimonial</FormLabel>
                      <FormControl>
                        <Textarea {...field} className="min-h-[100px]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {board.fields.map((field) => (
                  <FormField
                    key={field}
                    control={form.control}
                    name={field as keyof FormData}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{field.name}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}

                <Button type="submit" className="w-full">
                  Submit Testimonial
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
