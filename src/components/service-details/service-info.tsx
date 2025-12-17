import { MapPin, DollarSign, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

type ServiceInfoProps = {
  title: string;
  location: string;
  price_range: string;
  availability: string;
};

export const ServiceInfo = ({
  title,
  location,
  price_range,
  availability,
}: ServiceInfoProps) => {
  return (
    <div className="w-full md:w-2/5 flex flex-col gap-6">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-tight leading-none mb-4">
          {title}
        </h1>
        <div className="flex items-center gap-2 text-gray-500 border-l-2 border-black pl-3">
          <MapPin className="w-4 h-4" />
          <span className="uppercase tracking-wide text-sm">
            {location || "Remote / Online"}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-auto">
        <div className="bg-gray-50 border border-black p-4 space-y-3">
          <div className="flex justify-between items-center border-b border-gray-200 pb-2">
            <div className="flex items-center gap-2 font-bold text-sm uppercase">
              <DollarSign className="w-4 h-4" />
              <span>Price</span>
            </div>
            <span className="text-lg font-bold">
              {price_range || "Negotiable"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 font-bold text-sm uppercase">
              <Calendar className="w-4 h-4" />
              <span>Availability</span>
            </div>
            <span className="text-sm">{availability || "Flexible"}</span>
          </div>
        </div>

        <Button className="w-full text-lg h-14 uppercase font-bold tracking-widest bg-black text-white hover:bg-neutral-800 rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:shadow-none transition-all">
          Contact Provider
        </Button>
      </div>
    </div>
  );
};
