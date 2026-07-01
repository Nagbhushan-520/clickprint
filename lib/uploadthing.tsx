/**
 * SHIM: replaces uploadthing's UploadButton with a local file-picker that
 * reads the chosen image as a data URL and hands it back in the same
 * { url } shape the ImageSidebar expects. No external upload service needed.
 */
"use client";

import { useRef } from "react";

type UploadButtonProps = {
  endpoint?: string;
  appearance?: { button?: string; allowedContent?: string };
  content?: { button?: React.ReactNode };
  onClientUploadComplete?: (res: { url: string }[]) => void;
};

export function UploadButton({
  appearance,
  content,
  onClientUploadComplete,
}: UploadButtonProps) {
  const ref = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      onClientUploadComplete?.([{ url: reader.result as string }]);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => ref.current?.click()}
        className={
          appearance?.button ||
          "w-full rounded-md bg-flame-500 px-4 py-2 text-sm font-medium text-white hover:bg-flame-600"
        }
      >
        {content?.button || "Upload Image"}
      </button>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
          e.currentTarget.value = "";
        }}
      />
    </>
  );
}

// Dropzone shim kept for import-compatibility (unused by our editor).
export const UploadDropzone = UploadButton;
