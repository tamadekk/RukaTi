import { Link } from "@tanstack/react-router";
import { ArrowRight, Star } from "lucide-react";
import { useSimilarServices } from "@/hooks/useMarketQuery";
import { ServiceCardSkeleton } from "@/components/skeletons/service-skeleton";
import ServicePlaceholder from "@/assets/service-placeholder.svg";

type SimilarServicesProps = {
  category: string;
  excludeId: string;
};

export const SimilarServices = ({
  category,
  excludeId,
}: SimilarServicesProps) => {
  const { data: similarServices = [] } = useSimilarServices(
    category,
    excludeId,
  );

  if (similarServices.length === 0) return null;

  return (
    <section className="space-y-6 pt-8 border-t border-black">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black uppercase tracking-tighter">
          Similar Services
        </h2>
        <Link
          to="/services"
          search={{ category }}
          className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-black transition-colors group"
        >
          See all
          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {similarServices.map((service) => (
          <Link
            key={service.service_id}
            to="/services/$serviceId"
            params={{ serviceId: service.service_id }}
            className="group border border-black bg-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-200 flex flex-col"
          >
            <div className="aspect-[4/3] overflow-hidden border-b border-black bg-gray-50">
              <img
                src={
                  typeof service.service_image === "string" &&
                  service.service_image
                    ? service.service_image
                    : ServicePlaceholder
                }
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3 flex flex-col gap-1 flex-1">
              <p className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">
                {service.category}
              </p>
              <h3 className="text-xs font-bold uppercase tracking-tight leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
                {service.title}
              </h3>
              <div className="mt-auto pt-2 flex items-center justify-between">
                {service.price_range && (
                  <span className="text-[10px] font-mono text-neutral-600">
                    {service.price_range}
                  </span>
                )}
                {service.rating ? (
                  <div className="flex items-center gap-0.5">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-[10px] font-bold">
                      {Number(service.rating).toFixed(1)}
                    </span>
                  </div>
                ) : null}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export const SimilarServicesSkeleton = () => (
  <section className="space-y-6 pt-8 border-t border-black">
    <div className="h-6 w-40 bg-neutral-100 animate-pulse" />
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <ServiceCardSkeleton key={i} />
      ))}
    </div>
  </section>
);
