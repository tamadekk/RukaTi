import { forwardRef } from "react";
import { X, Camera } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useImagePreview, type ImageFileType } from "@/hooks/use-image-preview";

interface AvatarUploadProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "accept"
> {
  imageFiles: ImageFileType;
  onImageRemove: () => void;
  variant?: "circular" | "square";
  label?: string;
}

export const AvatarUpload = forwardRef<HTMLInputElement, AvatarUploadProps>(
  (
    {
      imageFiles,
      onImageRemove,
      variant = "circular",
      label,
      className,
      ...props
    },
    ref,
  ) => {
    const { imagePreview } = useImagePreview(imageFiles);

    const handleRemoveClick = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onImageRemove();
    };

    const isCircular = variant === "circular";

    return (
      <label
        className={cn(
          "flex flex-col items-center gap-4 cursor-pointer",
          className,
        )}
      >
        <Input
          type="file"
          className="hidden"
          accept="image/*"
          ref={ref}
          {...props}
        />
        <div className="relative group">
          <div
            className={cn(
              "relative overflow-hidden border-4 border-black bg-neutral-100 flex items-center justify-center transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:scale-[1.02] group-active:translate-x-1 group-active:translate-y-1 group-active:shadow-none",
              isCircular
                ? "rounded-full w-32 h-32"
                : "w-48 h-48 rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
            )}
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Avatar preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <Camera
                className={cn(
                  "text-neutral-400 group-hover:text-black transition-colors",
                  isCircular ? "w-10 h-10" : "w-16 h-16",
                )}
              />
            )}

            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
              <p className="text-white text-[10px] font-bold uppercase tracking-wider">
                {imagePreview ? "Change" : "Upload"}
              </p>
            </div>
          </div>

          {imagePreview && (
            <button
              type="button"
              onClick={handleRemoveClick}
              className={cn(
                "absolute bg-white border-2 border-black rounded-full p-1.5 hover:bg-red-50 hover:border-red-500 hover:text-red-500 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all z-10",
                isCircular ? "-top-1 -right-1" : "-top-3 -right-3",
              )}
              aria-label="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        {label && (
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest text-center">
            {label}
          </p>
        )}
      </label>
    );
  },
);

AvatarUpload.displayName = "AvatarUpload";
