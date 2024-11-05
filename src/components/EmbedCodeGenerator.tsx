"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import EmbedCustomization from "./EmbedCustomizer";

type EmbedCodeGeneratorProps = {
  boardId: string;
  customization: EmbedCustomization;
};

export function EmbedCodeGenerator({
  boardId,
  customization,
}: EmbedCodeGeneratorProps) {
  const embedCode = `<script src="${
    process.env.NEXT_PUBLIC_BASE_URL
  }/embed.js"></script>
<script>
  TestimonialWidget.load('${boardId}', ${JSON.stringify(customization)});
</script>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode);
    toast.success("Embed code copied to clipboard");
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="embed-code">Embed Code</Label>
        <Textarea id="embed-code" value={embedCode} readOnly rows={6} />
      </div>
      <Button onClick={copyToClipboard}>Copy Embed Code</Button>
    </div>
  );
}
