import { useState, useEffect } from "react";
import ServicePlaceholder from "@/assets/service-placeholder.svg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

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
          className="w-full border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white overflow-hidden"
        >
          <CarouselContent>
            {displayImages.map((img, index) => (
              <CarouselItem key={index}>
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={img}
                    alt={`${title} - image ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={handleImageError}
                  />
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
    </div>
  );
};
