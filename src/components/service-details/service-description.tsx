type ServiceDescriptionProps = {
  description: string;
};

export const ServiceDescription = ({
  description,
}: ServiceDescriptionProps) => {
  return (
    <div className="lg:col-span-2 space-y-4">
      <h2 className="text-xl font-bold uppercase tracking-tight flex items-center gap-2">
        <span className="w-2 h-8 bg-black"></span>
        About This Service
      </h2>
      <p className="whitespace-pre-wrap text-gray-700 leading-relaxed text-lg">
        {description}
      </p>
    </div>
  );
};
