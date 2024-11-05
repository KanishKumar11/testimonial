"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { getBoard } from "@/actions/board";
import { BoardData } from "@/types/board";

const designOptions = [
  { value: "design1", label: "Design 1 (Centered Slider)" },
  { value: "design2", label: "Design 2 (Side-by-Side)" },
  { value: "design3", label: "Design 3 (Centered Grid)" },
];

const colorSchemes = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "colorful", label: "Colorful" },
];

export default function EmbedCustomizer() {
  const { id } = useParams();
  const [board, setBoard] = useState<BoardData | null>(null);
  const [customization, setCustomization] = useState({
    design: "design1",
    colorScheme: "light",
    showRating: true,
    showAvatar: true,
    autoplay: true,
    slidesPerView: 3,
    spaceBetween: 28,
    loop: true,
    centeredSlides: true,
    showNavigation: true,
    showPagination: true,
  });

  useEffect(() => {
    const fetchBoard = async () => {
      const boardData = await getBoard(id as string);
      setBoard(boardData);
    };
    fetchBoard();
  }, [id]);

  const handleCustomizationChange = (key: string, value: any) => {
    setCustomization((prev) => ({ ...prev, [key]: value }));
  };

  const generateEmbedCode = () => {
    const embedCode = `
      <div id="testimonial-board-${id}"></div>
      <script src="${process.env.NEXT_PUBLIC_BASE_URL}/embed.js"></script>
      <script>
        TestimonialBoard.load('${id}', ${JSON.stringify(customization)});
      </script>
    `;
    navigator.clipboard.writeText(embedCode);
    toast.success("Embed code copied to clipboard!");
  };

  if (!board) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">Customize Embed for {board.name}</h1>

      <Card>
        <CardHeader>
          <CardTitle>Choose Design</CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            value={customization.design}
            onValueChange={(value) =>
              handleCustomizationChange("design", value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a design" />
            </SelectTrigger>
            <SelectContent>
              {designOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Tabs defaultValue="layout">
        <TabsList>
          <TabsTrigger value="layout">Layout</TabsTrigger>
          <TabsTrigger value="style">Style</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
        </TabsList>

        <TabsContent value="layout">
          <Card>
            <CardHeader>
              <CardTitle>Layout Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Slides Per View</Label>
                <Slider
                  min={1}
                  max={5}
                  step={1}
                  value={[customization.slidesPerView]}
                  onValueChange={([value]) =>
                    handleCustomizationChange("slidesPerView", value)
                  }
                />
              </div>
              <div>
                <Label>Space Between Slides (px)</Label>
                <Slider
                  min={0}
                  max={64}
                  step={4}
                  value={[customization.spaceBetween]}
                  onValueChange={([value]) =>
                    handleCustomizationChange("spaceBetween", value)
                  }
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={customization.autoplay}
                  onCheckedChange={(checked) =>
                    handleCustomizationChange("autoplay", checked)
                  }
                />
                <Label>Autoplay</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={customization.loop}
                  onCheckedChange={(checked) =>
                    handleCustomizationChange("loop", checked)
                  }
                />
                <Label>Loop</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={customization.centeredSlides}
                  onCheckedChange={(checked) =>
                    handleCustomizationChange("centeredSlides", checked)
                  }
                />
                <Label>Centered Slides</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={customization.showNavigation}
                  onCheckedChange={(checked) =>
                    handleCustomizationChange("showNavigation", checked)
                  }
                />
                <Label>Show Navigation Arrows</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={customization.showPagination}
                  onCheckedChange={(checked) =>
                    handleCustomizationChange("showPagination", checked)
                  }
                />
                <Label>Show Pagination</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="style">
          <Card>
            <CardHeader>
              <CardTitle>Style Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Color Scheme</Label>
                <RadioGroup
                  value={customization.colorScheme}
                  onValueChange={(value) =>
                    handleCustomizationChange("colorScheme", value)
                  }
                >
                  {colorSchemes.map((scheme) => (
                    <div
                      key={scheme.value}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem value={scheme.value} id={scheme.value} />
                      <Label htmlFor={scheme.value}>{scheme.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Content Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={customization.showRating}
                  onCheckedChange={(checked) =>
                    handleCustomizationChange("showRating", checked)
                  }
                />
                <Label>Show Rating</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={customization.showAvatar}
                  onCheckedChange={(checked) =>
                    handleCustomizationChange("showAvatar", checked)
                  }
                />
                <Label>Show Avatar</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Embed Code</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={generateEmbedCode}>
            Generate and Copy Embed Code
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Add a preview component here that renders the testimonials based on the current customization */}
        </CardContent>
      </Card>
    </div>
  );
}
