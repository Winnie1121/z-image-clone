"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Wand2, Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { cn } from "@/lib/utils";

const ASPECT_RATIOS = [
  { value: "1:1", label: "1:1", width: 1024, height: 1024 },
  { value: "16:9", label: "16:9", width: 1792, height: 1024 },
  { value: "4:3", label: "4:3", width: 1536, height: 1152 },
];

const PROMPT_EXAMPLES = [
  "A serene cyberpunk city at sunset, neon lights reflecting on wet streets",
  "Portrait of a wise old wizard with glowing eyes, detailed fantasy art",
  "Modern minimalist architecture, glass and concrete, golden hour lighting",
  "Cute robot mascot character, 3D render, pastel colors, Pixar style",
];

export function GeneratorWorkspace() {
  const [prompt, setPrompt] = useState("");
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setIsGenerating(true);
    setGeneratedImage(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, aspectRatio }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate image");
      }

      setGeneratedImage(data.imageUrl);
      toast.success("Image generated successfully!");
    } catch (error: any) {
      console.error("[Generation Error]", error);
      toast.error(error.message || "Failed to generate image");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;

    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = `z-image-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground">
          Fast & Free Image Generator
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Create stunning images with AI in seconds. Powered by open-source models.
        </p>
      </div>

      {/* Prompt Input */}
      <div className="space-y-4">
        <Textarea
          placeholder="Describe your image... (e.g., 'A serene mountain landscape at sunset')"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-[120px] text-base resize-none"
          disabled={isGenerating}
        />

        {/* Aspect Ratio Selection */}
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-sm font-medium text-muted-foreground">
            Aspect Ratio:
          </span>
          <div className="flex gap-2">
            {ASPECT_RATIOS.map((ratio) => (
              <Button
                key={ratio.value}
                variant={aspectRatio === ratio.value ? "default" : "outline"}
                size="sm"
                onClick={() => setAspectRatio(ratio.value)}
                disabled={isGenerating}
                className="min-w-[60px]"
              >
                {ratio.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <Button
          onClick={handleGenerate}
          disabled={!prompt.trim() || isGenerating}
          size="lg"
          className="w-full sm:w-auto sm:min-w-[200px] rounded-full text-base h-12"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Wand2 className="w-5 h-5" />
              Generate Image
            </>
          )}
        </Button>
      </div>

      {/* Result Display */}
      <div className="space-y-4">
        {isGenerating && (
          <div className="w-full aspect-square sm:aspect-video bg-muted rounded-xl flex items-center justify-center">
            <div className="text-center space-y-4">
              <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
              <p className="text-muted-foreground">Creating your image...</p>
            </div>
          </div>
        )}

        {generatedImage && !isGenerating && (
          <div className="space-y-4">
            <div className="relative w-full rounded-xl overflow-hidden shadow-2xl border border-border">
              <Image
                src={generatedImage}
                alt="Generated image"
                width={1024}
                height={1024}
                className="w-full h-auto"
                unoptimized
              />
            </div>
            <div className="flex justify-end">
              <Button
                onClick={handleDownload}
                variant="outline"
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </Button>
            </div>
          </div>
        )}

        {!generatedImage && !isGenerating && (
          <div className="w-full aspect-square sm:aspect-video bg-muted rounded-xl flex items-center justify-center border-2 border-dashed border-border">
            <p className="text-muted-foreground text-center px-4">
              Your generated image will appear here
            </p>
          </div>
        )}
      </div>

      {/* Prompt Examples */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">
          💡 Try these prompts:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {PROMPT_EXAMPLES.map((example, index) => (
            <button
              key={index}
              onClick={() => setPrompt(example)}
              className="text-left text-sm px-4 py-3 rounded-lg border border-border hover:bg-muted transition-colors"
              disabled={isGenerating}
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
