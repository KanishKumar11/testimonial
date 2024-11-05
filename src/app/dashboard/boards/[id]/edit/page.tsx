"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { toast } from "sonner";
import { getBoard, updateBoard } from "@/actions/board";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Board name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  // Add more fields as needed
});

export default function EditBoardPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const board = await getBoard(params.id);
        form.reset({
          name: board.name,
          description: board.description,
          // Set other fields as needed
        });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error: unknown) {
        toast.error("Failed to load board details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBoard();
  }, [params.id, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await updateBoard(params.id, values);
      toast.success("Board updated successfully");
      router.push("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: unknown) {
      toast.error("Failed to update board");
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Edit Board</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Board Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter board name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter board description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Update Board</Button>
        </form>
      </Form>
    </div>
  );
}
