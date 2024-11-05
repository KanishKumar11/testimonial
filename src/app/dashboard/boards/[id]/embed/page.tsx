"use client";

import { useState, useEffect } from "react";
import TestimonialCustomizer from "@/components/EmbedCustomizer";
import { EmbedCodeGenerator } from "@/components/EmbedCodeGenerator";
import { EmbedPreview } from "@/components/EmbedPreview";
import { getTestimonialsByBoardId } from "@/actions/testimonial";

export default function EmbedCustomizationPage({
  params,
}: {
  params: { id: string };
}) {
  const [customization, setCustomization] = useState<EmbedCustomization>({
    layout: "Grid",
    cardStyle: "Basic",
    colorVariant: "Light",
    autoplay: false,
  });
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await getTestimonialsByBoardId(params.id);
        setTestimonials(data);
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      }
    };

    fetchTestimonials();
  }, [params.id]);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Customize Embed</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Options</h2>
          <TestimonialCustomizer onCustomizationChange={setCustomization} />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Embed Code</h2>
          <EmbedCodeGenerator
            boardId={params.id}
            customization={customization}
          />
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Preview</h2>
        <EmbedPreview
          testimonials={testimonials}
          customization={customization}
        />
      </div>
    </div>
  );
}
