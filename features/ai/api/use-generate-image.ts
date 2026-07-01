/**
 * SHIM: AI image generation. Posts to our own /api/generate-image route.
 * If no provider key is configured, the route returns 501 and we surface a
 * friendly "coming soon" toast. Wire Gemini/OpenAI in the route to enable.
 */
"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

type RequestType = { prompt: string };
type ResponseType = { data: string };

export const useGenerateImage = () => {
  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(json),
      });
      if (!res.ok) {
        throw new Error("AI generation not enabled yet");
      }
      return res.json();
    },
    onError: () => {
      toast.error("AI image generation is coming soon.");
    },
  });
};
