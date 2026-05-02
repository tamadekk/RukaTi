import { Link } from "@tanstack/react-router";
import { Clock, Star } from "lucide-react";
import { useRecentlyViewed } from "@/hooks/use-recently-viewed";
import { useRecentlyViewedServices } from "@/hooks/useMarketQuery";
import ServicePlaceholder from "@/assets/service-placeholder.svg";

export const RecentlyViewed = () => {
  const { recentlyViewedServiceIds, clearRecentlyViewed } = useRecentlyViewed();
  const { data: recentlyViewedServices = [] } = useRecentlyViewedServices(
    recentlyViewedServiceIds,
  );

  if (recentlyViewedServices.length === 0) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-neutral-400" />
          <h2 className="text-sm font-bold uppercase tracking-widest">
            Recently Viewed
          </h2>
        </div>
        <button
          onClick={clearRecentlyViewed}
          className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 hover:text-black transition-colors"
        >
          Clear
        </button>
      </div>

      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
        {recentlyViewedServices.map((service) => (
          <Link
            key={service.service_id}
            to="/services/$serviceId"
            params={{ serviceId: service.service_id }}
            className="group shrink-0 w-36 border border-black bg-white hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
          >
            <div className="aspect-[3/2] overflow-hidden border-b border-black bg-gray-50">
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
            <div className="p-2 space-y-1">
              <p className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 truncate">
                {service.category}
              </p>
              <h3 className="text-[10px] font-bold uppercase leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
                {service.title}
              </h3>
              <div className="flex items-center justify-between pt-0.5">
                {service.price_range && (
                  <span className="text-[9px] font-mono text-neutral-500 truncate">
                    {service.price_range}
                  </span>
                )}
                {service.rating ? (
                  <div className="flex items-center gap-0.5 shrink-0">
                    <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
                    <span className="text-[9px] font-bold">
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
