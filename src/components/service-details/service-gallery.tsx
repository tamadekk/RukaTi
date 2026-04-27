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
  DialogHeader,
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
  const [current, setCurrent] = useState(0);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  // TODO : refactor this component: service picture maximization;
  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    e.currentTarget.src = ServicePlaceholder;
  };

  const displayImages = images.length > 0 ? images : [ServicePlaceholder];

  const onThumbnailClick = (index: number) => {
    api?.scrollTo(index);
  };

  return (
    <div className="w-full md:w-3/5 space-y-3">
      <div className="group relative">
        <Carousel
          setApi={setApi}
          className="w-full border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white overflow-hidden cursor-zoom-in"
          onClick={() => setIsFullscreenOpen(true)}
        >
          <CarouselContent>
            {displayImages.map((img, index) => (
              <CarouselItem key={index}>
                <div className="aspect-video w-full overflow-hidden relative">
                  <img
                    src={img}
                    alt={`${title} - image ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={handleImageError}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <Maximize2 className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {displayImages.length > 1 && (
            <>
              <CarouselPrevious
                className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 border-2 border-black rounded-none h-10 w-10 hover:bg-black hover:text-white transition-all z-10"
                onClick={(e) => e.stopPropagation()}
              />
              <CarouselNext
                className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 border-2 border-black rounded-none h-10 w-10 hover:bg-black hover:text-white transition-all z-10"
                onClick={(e) => e.stopPropagation()}
              />
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
        <DialogContent className="max-w-none w-screen h-screen p-0 bg-black/95 border-none flex flex-col items-center justify-center rounded-none gap-0">
          <div className="sr-only">
            <DialogHeader>
              <DialogTitle>{title} - Fullscreen View</DialogTitle>
            </DialogHeader>
          </div>

          <button
            onClick={() => setIsFullscreenOpen(false)}
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-50 bg-black/50 p-2 border border-white/20"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="w-full h-full max-w-6xl max-h-[85vh] px-4 md:px-12 flex items-center justify-center">
            <Carousel
              opts={{
                startIndex: current,
                loop: true,
              }}
              className="w-full h-full"
            >
              <CarouselContent className="h-full">
                {displayImages.map((img, index) => (
                  <CarouselItem
                    key={index}
                    className="flex items-center justify-center"
                  >
                    <img
                      src={img}
                      alt={`${title} - full image ${index + 1}`}
                      className="max-w-full max-h-full object-contain shadow-2xl"
                      onError={handleImageError}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4 bg-white/10 text-white border-white/20 hover:bg-white/20 rounded-none h-12 w-12" />
              <CarouselNext className="right-4 bg-white/10 text-white border-white/20 hover:bg-white/20 rounded-none h-12 w-12" />
            </Carousel>
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 text-white/60 font-mono text-sm tracking-widest uppercase">
            <span>
              {current + 1} / {displayImages.length}
            </span>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
