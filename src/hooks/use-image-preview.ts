import { useState, useEffect } from "react";

export type ImageFileType = FileList | string | null | File[];

export function useImagePreview(imageFiles: ImageFileType) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (!imageFiles || (Array.isArray(imageFiles) && imageFiles.length === 0)) {
      setImagePreview(null);
      return;
    }

    if (typeof imageFiles === "string") {
      setImagePreview(imageFiles);
      return;
    }

    // Handle both FileList and File[]
    const file = imageFiles instanceof FileList ? imageFiles[0] : imageFiles[0];

    if (file instanceof Blob) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      return () => URL.revokeObjectURL(url);
    }

    setImagePreview(null);
  }, [imageFiles]);

  const firstFile =
    imageFiles instanceof FileList
      ? imageFiles[0]
      : Array.isArray(imageFiles)
        ? imageFiles[0]
        : null;

  const fileNameDisplay =
    typeof imageFiles !== "string" && firstFile instanceof File
      ? firstFile.name
      : "Image selected";

  return { imagePreview, fileNameDisplay };
}
