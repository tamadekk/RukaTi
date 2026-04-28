import { useState, useEffect } from "react";
import { Maximize2, X } from "lucide-react";
import ServicePlaceholder from "@/assets/service-placeholder.svg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

type ServiceGalleryProps = {
  images?: string[];
  title: string;
  category: string;
};

export const ServiceGallery = ({
  images = [],
  title,
  category,
}: ServiceGalleryProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [fullscreenApi, setFullscreenApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    if (!fullscreenApi) return;

    setCurrent(fullscreenApi.selectedScrollSnap());
    fullscreenApi.on("select", () => {
      setCurrent(fullscreenApi.selectedScrollSnap());
    });
  }, [fullscreenApi]);

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    e.currentTarget.src = ServicePlaceholder;
  };

  const displayImages = images.length > 0 ? images : [ServicePlaceholder];

  const onThumbnailClick = (index: number) => {
    api?.scrollTo(index);
    fullscreenApi?.scrollTo(index);
  };

  return (
    <div className="w-full md:w-3/5 space-y-3">
      <div className="group relative">
        <Carousel
          setApi={setApi}
          className="w-full border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white overflow-hidden"
        >
          <CarouselContent>
            {displayImages.map((img, index) => (
              <CarouselItem key={index}>
                <div className="aspect-video w-full overflow-hidden relative group/item">
                  <img
                    src={img}
                    alt={`${title} - image ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={handleImageError}
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsFullscreenOpen(true);
                    }}
                    className="absolute top-4 right-4 bg-white border-2 border-black p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:shadow-none transition-all z-10 opacity-100 md:opacity-0 md:group-hover/item:opacity-100 cursor-pointer"
                    title="View Fullscreen"
                  >
                    <Maximize2 className="w-5 h-5" />
                  </button>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {displayImages.length > 1 && (
            <>
              <CarouselPrevious className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 border-2 border-black rounded-none h-10 w-10 hover:bg-black hover:text-white transition-all z-10" />
              <CarouselNext className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 border-2 border-black rounded-none h-10 w-10 hover:bg-black hover:text-white transition-all z-10" />
            </>
          )}

          <div className="absolute top-0 left-0 bg-black text-white px-4 py-2 text-sm font-bold uppercase tracking-wider z-10">
            {category}
          </div>
        </Carousel>
      </div>

      {displayImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {displayImages.map((img, index) => (
            <button
              key={index}
              onClick={() => onThumbnailClick(index)}
              className={`relative flex-shrink-0 w-20 aspect-square border-2 transition-all
                ${current === index ? "border-black scale-105 z-10 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" : "border-gray-200 opacity-60 hover:opacity-100 hover:border-gray-400"}
              `}
            >
              <img
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
            </button>
          ))}
        </div>
      )}

      <Dialog open={isFullscreenOpen} onOpenChange={setIsFullscreenOpen}>
        <DialogContent
          fullscreen
          showCloseButton={false}
          className="items-center justify-center bg-black/70 backdrop-blur-sm cursor-pointer"
          onClick={() => setIsFullscreenOpen(false)}
        >
          <DialogTitle className="sr-only">
            {title} - Fullscreen View
          </DialogTitle>
          <DialogDescription className="sr-only">
            Use arrow keys or buttons to navigate between images. Press Escape
            or click outside to close.
          </DialogDescription>

          <button
            onClick={() => setIsFullscreenOpen(false)}
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-50 bg-black/50 p-2 border border-white/20"
          >
            <X className="w-8 h-8" />
          </button>

          <div
            className="w-full max-w-6xl px-4 md:px-20 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <Carousel
              setApi={setFullscreenApi}
              opts={{ startIndex: current, loop: true }}
              className="w-full"
            >
              <CarouselContent>
                {displayImages.map((img, index) => (
                  <CarouselItem
                    key={index}
                    className="flex items-center justify-center"
                  >
                    <img
                      src={img}
                      alt={`${title} - full image ${index + 1}`}
                      className="max-h-[85vh] w-full object-contain"
                      onError={handleImageError}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4 bg-white/10 text-white border-white/20 hover:bg-white/20 rounded-none h-12 w-12" />
              <CarouselNext className="right-4 bg-white/10 text-white border-white/20 hover:bg-white/20 rounded-none h-12 w-12" />
            </Carousel>
          </div>

          <div
            className="mt-6 text-white/60 font-mono text-sm tracking-widest uppercase cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {current + 1} / {displayImages.length}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
