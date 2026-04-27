import { forwardRef } from "react";
import { UploadCloud, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useImagePreview, type ImageFileType } from "@/hooks/use-image-preview";

interface ImageUploadProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "accept"
> {
  imageFiles: ImageFileType;
  onImageRemove: () => void;
  label?: string;
}

export const ImageUpload = forwardRef<HTMLInputElement, ImageUploadProps>(
  ({ imageFiles, onImageRemove, label, className, ...props }, ref) => {
    const { imagePreview, fileNameDisplay } = useImagePreview(imageFiles);

    const handleRemoveClick = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onImageRemove();
    };

    return (
      <label className={cn("block cursor-pointer", className)}>
        <Input
          type="file"
          className="hidden"
          accept="image/*"
          ref={ref}
          {...props}
        />
        <div className="flex items-center gap-4 justify-center w-full h-40 border-2 border-dashed border-black bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer px-6">
          {imagePreview ? (
            <>
              <div className="shrink-0 w-[106px] aspect-video border-2 border-black overflow-hidden shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <img
                  src={imagePreview}
                  alt="Upload preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-1 min-w-0">
                <span className="text-xs font-bold uppercase text-black truncate max-w-[200px]">
                  {fileNameDisplay}
                </span>
                <span className="text-[10px] text-gray-500 uppercase tracking-wide">
                  Click to replace
                </span>
              </div>
              <button
                type="button"
                onClick={handleRemoveClick}
                className="ml-auto shrink-0 p-1.5 border-2 border-black bg-white hover:bg-red-50 hover:border-red-500 hover:text-red-500 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-px"
                aria-label="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <UploadCloud className="w-8 h-8 text-gray-400" />
              <span className="text-xs font-bold uppercase text-gray-500">
                {label || "Click to Upload Image"}
              </span>
              <span className="text-[10px] text-gray-400">
                JPG, PNG, WEBP UP TO 5MB
              </span>
            </div>
          )}
        </div>
      </label>
    );
  },
);

ImageUpload.displayName = "ImageUpload";
