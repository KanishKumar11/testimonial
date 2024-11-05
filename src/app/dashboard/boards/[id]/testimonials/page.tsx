"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  getTestimonialsByBoardId,
  updateTestimonialStatus,
} from "@/actions/testimonial";

type Testimonial = {
  _id: string;
  author: string;
  content: string;
  status: "approved" | "pending" | "rejected";
  createdAt: string;
};

export default function TestimonialsPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      setIsLoading(true);
      try {
        const data = await getTestimonialsByBoardId(params.id);
        setTestimonials(data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("Failed to load testimonials");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTestimonials();
  }, [params.id]);

  const handleStatusUpdate = async (
    testimonialId: string,
    newStatus: "approved" | "rejected"
  ) => {
    try {
      await updateTestimonialStatus(testimonialId, newStatus);
      setTestimonials(
        testimonials.map((t) =>
          t._id === testimonialId ? { ...t, status: newStatus } : t
        )
      );
      toast.success(`Testimonial ${newStatus}`);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error(`Failed to ${newStatus} testimonial`);
    }
  };

  const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
    <Card key={testimonial._id}>
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span>{testimonial.author}</span>
          <Badge>{new Date(testimonial.createdAt).toLocaleDateString()}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{testimonial.content}</p>
        {testimonial.status === "pending" && (
          <div className="flex justify-end space-x-2">
            <Button
              onClick={() => handleStatusUpdate(testimonial._id, "approved")}
              size="sm"
            >
              Approve
            </Button>
            <Button
              onClick={() => handleStatusUpdate(testimonial._id, "rejected")}
              size="sm"
              variant="destructive"
            >
              Reject
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Manage Testimonials</h2>
      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">Awaiting Approval</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
        <TabsContent value="pending" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {testimonials
              .filter((t) => t.status === "pending")
              .map((testimonial) => (
                <TestimonialCard
                  key={testimonial._id}
                  testimonial={testimonial}
                />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="approved" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {testimonials
              .filter((t) => t.status === "approved")
              .map((testimonial) => (
                <TestimonialCard
                  key={testimonial._id}
                  testimonial={testimonial}
                />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="rejected" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {testimonials
              .filter((t) => t.status === "rejected")
              .map((testimonial) => (
                <TestimonialCard
                  key={testimonial._id}
                  testimonial={testimonial}
                />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
