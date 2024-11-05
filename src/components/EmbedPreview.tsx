"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { EmbedCustomization } from "./EmbedCustomizer";

type Testimonial = {
  _id: string;
  author: string;
  content: string;
};

type EmbedPreviewProps = {
  testimonials: Testimonial[];
  customization: EmbedCustomization;
};

export function EmbedPreview({
  testimonials,
  customization,
}: EmbedPreviewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (customization.autoplay && customization.layout === "Slider") {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000); // Change slide every 5 seconds

      return () => clearInterval(interval);
    }
  }, [customization.autoplay, customization.layout, testimonials.length]);

  const containerStyle = {
    display: customization.layout === "Grid" ? "grid" : "flex",
    gridTemplateColumns:
      customization.layout === "Grid"
        ? "repeat(auto-fill, minmax(250px, 1fr))"
        : "none",
    flexDirection: customization.layout === "List" ? "column" : "row",
    gap: "1rem",
    padding: "1rem",
    background:
      customization.colorVariant === "Dark"
        ? "#333"
        : customization.colorVariant === "Colorful"
        ? "#f0f0ff"
        : "#fff",
    color: customization.colorVariant === "Dark" ? "#fff" : "#333",
  };

  const cardBaseStyle = {
    padding: "1rem",
    borderRadius: "0.5rem",
    transition: "all 0.3s ease",
  };

  const getCardStyle = (baseStyle: any) => {
    switch (customization.cardStyle) {
      case "Bordered":
        return { ...baseStyle, border: "1px solid #ccc" };
      case "Shadowed":
        return { ...baseStyle, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" };
      default:
        return baseStyle;
    }
  };

  const renderTestimonials = () => {
    switch (customization.layout) {
      case "Slider":
        return (
          <div style={{ overflow: "hidden" }}>
            <Card style={getCardStyle(cardBaseStyle)}>
              <CardContent>
                <p>{testimonials[currentIndex]?.content}</p>
                <p className="font-bold mt-2">
                  {testimonials[currentIndex]?.author}
                </p>
              </CardContent>
            </Card>
          </div>
        );
      case "List":
      case "Grid":
      default:
        return testimonials.map((testimonial) => (
          <Card key={testimonial._id} style={getCardStyle(cardBaseStyle)}>
            <CardContent>
              <p>{testimonial.content}</p>
              <p className="font-bold mt-2">{testimonial.author}</p>
            </CardContent>
          </Card>
        ));
    }
  };

  return (
    <div style={containerStyle as React.CSSProperties}>
      {renderTestimonials()}
    </div>
  );
}
