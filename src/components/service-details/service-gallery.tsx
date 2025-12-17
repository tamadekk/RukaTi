type ServiceGalleryProps = {
  image?: string;
  title: string;
  category: string;
};

export const ServiceGallery = ({
  image,
  title,
  category,
}: ServiceGalleryProps) => {
  return (
    <div className="w-full md:w-3/5 aspect-video border border-black overflow-hidden relative shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      {image ? (
        <img src={image} alt={title} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
          No Image
        </div>
      )}
      <div className="absolute top-0 left-0 bg-black text-white px-4 py-2 text-sm font-bold uppercase tracking-wider">
        {category}
      </div>
    </div>
  );
};
