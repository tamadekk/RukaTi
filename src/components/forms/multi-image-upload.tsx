import { useRef, useState } from "react";
import { UploadCloud, X } from "lucide-react";
import { cn } from "@/lib/utils";

const MAX_SERVICE_IMAGES = 4;

export type ImageItem =
  | { type: "existing"; url: string }
  | { type: "new"; file: File; preview: string };

interface MultiImageUploadProps {
  items: ImageItem[];
  onAdd: (files: File[]) => void;
  onRemove: (index: number) => void;
  onReorder: (fromIndex: number, toIndex: number) => void;
  maxImages?: number;
  className?: string;
}

export const MultiImageUpload = ({
  items,
  onAdd,
  onRemove,
  onReorder,
  maxImages = MAX_SERVICE_IMAGES,
  className,
}: MultiImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dragIndexRef = useRef<number | null>(null);
  const dragOverIndexRef = useRef<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const setDragOver = (index: number | null) => {
    dragOverIndexRef.current = index;
    setDragOverIndex(index);
  };

  const canAddMore = items.length < maxImages;
  const remaining = maxImages - items.length;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    onAdd(files.slice(0, remaining));
    e.target.value = "";
  };

  const handleDragStart = (index: number) => {
    dragIndexRef.current = index;
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragIndexRef.current !== null && dragIndexRef.current !== index) {
      setDragOver(index);
    }
  };

  const handleDrop = (e: React.DragEvent, toIndex: number) => {
    e.preventDefault();
    const fromIndex = dragIndexRef.current;
    if (fromIndex !== null && fromIndex !== toIndex) {
      onReorder(fromIndex, toIndex);
    }
    dragIndexRef.current = null;
    setDragOver(null);
  };

  const handleDragEnd = () => {
    dragIndexRef.current = null;
    setDragOver(null);
  };

  const handleTouchStart = (_e: React.TouchEvent, index: number) => {
    dragIndexRef.current = index;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (dragIndexRef.current === null) return;
    e.preventDefault();
    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    const itemEl = element?.closest("[data-drag-index]");
    if (!itemEl) return;
    const indexStr = itemEl.getAttribute("data-drag-index");
    if (indexStr === null) return;
    const toIndex = parseInt(indexStr, 10);
    if (toIndex !== dragIndexRef.current) {
      setDragOver(toIndex);
    }
  };

  const handleTouchEnd = () => {
    const fromIndex = dragIndexRef.current;
    const toIndex = dragOverIndexRef.current;
    if (fromIndex !== null && toIndex !== null && fromIndex !== toIndex) {
      onReorder(fromIndex, toIndex);
    }
    dragIndexRef.current = null;
    setDragOver(null);
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {items.map((item, index) => {
          const src = item.type === "existing" ? item.url : item.preview;
          const isOver = dragOverIndex === index;
          return (
            <div
              key={index}
              data-drag-index={index}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              onTouchStart={(e) => handleTouchStart(e, index)}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className={cn(
                "relative aspect-[4/3] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] overflow-hidden group cursor-grab active:cursor-grabbing transition-opacity",
                isOver &&
                  "outline outline-2 outline-offset-2 outline-black opacity-70",
              )}
            >
              <img
                src={src}
                alt={`Image ${index + 1}`}
                className="w-full h-full object-cover pointer-events-none select-none"
                draggable={false}
              />
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="absolute top-2 right-2 bg-white border border-black p-1 transition-opacity hover:bg-red-50 hover:border-red-500 hover:text-red-500 sm:opacity-0 sm:group-hover:opacity-100"
                aria-label="Remove image"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[9px] font-bold uppercase tracking-wider text-center py-1">
                {index + 1} / {maxImages}
              </div>
            </div>
          );
        })}

        {canAddMore && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="aspect-[4/3] border-2 border-dashed border-black bg-gray-50 hover:bg-gray-100 transition-colors flex flex-col items-center justify-center gap-2"
          >
            <UploadCloud className="w-8 h-8 text-gray-400" />
            <span className="text-xs font-bold uppercase text-gray-500 text-center leading-tight px-2">
              Add image
            </span>
            <span className="text-[10px] text-gray-400">
              {items.length} / {maxImages}
            </span>
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />

      <p className="text-[10px] text-gray-400 font-mono uppercase tracking-wide">
        Up to {maxImages} images · drag to reorder · JPG, PNG, WEBP
      </p>
    </div>
  );
};
