"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { Project } from "@/features/projects/api/use-get-project";
import { AUTOSAVE_KEY } from "@/features/projects/api/use-update-project";

// Fabric.js is browser-only — load the editor with SSR disabled.
const Editor = dynamic(
  () => import("@/features/editor/components/editor").then((m) => m.Editor),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 grid place-items-center bg-cream">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-flame-500/20 border-t-flame-500" />
          <div className="mt-4 font-display text-sm font-semibold text-ink-700">
            Loading design studio...
          </div>
        </div>
      </div>
    ),
  },
);

const A5 = { width: 1748, height: 2480 };
const A4 = { width: 2480, height: 3508 };

export function EditorClient({
  size = "A5",
  templateJson,
}: {
  size?: "A4" | "A5";
  templateJson?: string;
}) {
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const dims = size === "A4" ? A4 : A5;
    let loaded: Project | null = null;

    // Resume last autosaved design unless a specific template was requested.
    if (!templateJson && typeof window !== "undefined") {
      try {
        const raw = window.localStorage.getItem(AUTOSAVE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed && parsed.width && parsed.height) loaded = parsed;
        }
      } catch {
        /* ignore */
      }
    }

    if (!loaded) {
      loaded = {
        id: "local",
        name: "My Flyer",
        json: templateJson ?? "",
        width: dims.width,
        height: dims.height,
      };
    }

    setProject(loaded);
  }, [size, templateJson]);

  if (!project) {
    return (
      <div className="fixed inset-0 grid place-items-center bg-cream">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-flame-500/20 border-t-flame-500" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-white">
      <Editor initialData={project} />
    </div>
  );
}
