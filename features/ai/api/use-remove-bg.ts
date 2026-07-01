/**
 * SHIM: background removal. Posts to /api/remove-bg (returns 501 until a
 * provider is wired). Surfaces a friendly toast when unavailable.
 */
"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

type RequestType = { image: string };
type ResponseType = { data: string };

export const useRemoveBg = () => {
  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const res = await fetch("/api/remove-bg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(json),
      });
      if (!res.ok) {
        throw new Error("Background removal not enabled yet");
      }
      return res.json();
    },
    onError: () => {
      toast.error("Background removal is coming soon.");
    },
  });
};
