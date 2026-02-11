"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Loader2, ImageOff } from "lucide-react";
import { Generation } from "@/lib/supabase";

export function HistoryGrid() {
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await fetch("/api/history");
      if (response.ok) {
        const data = await response.json();
        setGenerations(data.generations || []);
      }
    } catch (error) {
      console.error("[Fetch History Error]", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (generations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
        <ImageOff className="w-16 h-16 text-muted-foreground" />
        <div>
          <h3 className="text-lg font-semibold text-foreground">No generations yet</h3>
          <p className="text-muted-foreground">
            Start creating images to see them here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {generations.map((generation) => (
        <div
          key={generation.id}
          className="group relative rounded-xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-lg transition-shadow"
        >
          <div className="aspect-square relative">
            <Image
              src={generation.image_url}
              alt={generation.prompt}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="p-4 space-y-2">
            <p className="text-sm text-foreground line-clamp-2">
              {generation.prompt}
            </p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{generation.aspect_ratio}</span>
              <span>{new Date(generation.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
