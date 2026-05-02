import { ServiceCard } from "@/components/dashboard/service-card";
import { ServiceCardSkeleton } from "@/components/skeletons/service-skeleton";
import { useMarketStore } from "@/store/marketStore";
import { useMarketServices } from "@/hooks/useMarketQuery";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { MarketPaginationItems } from "./market-pagination-items";
import { scrollToTop } from "@/lib/utils";

const MarketFeed = () => {
  const { page, pageSize, setPage, selectedCategory, searchQuery } =
    useMarketStore();
  const { data, isLoading: loading } = useMarketServices({
    selectedCategory,
    searchQuery,
    page,
    pageSize,
  });

  const services = data?.services ?? [];
  const totalCount = data?.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    scrollToTop();
  };

  const handlePreviousPage = () => page > 1 && handlePageChange(page - 1);
  const handleNextPage = () => page < totalPages && handlePageChange(page + 1);

  if (loading && services.length === 0) {
    return (
      <div className="flex flex-col h-full gap-8">
        <div className="flex flex-col flex-1">
          <div className="font-semibold mb-4 uppercase tracking-wider">
            Explore Services
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <ServiceCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full gap-8">
      <div className="flex flex-col flex-1">
        <div className="font-semibold mb-4 uppercase tracking-wider">
          Explore Services
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.length === 0 ? (
            <div className="col-span-full text-center py-8 text-gray-500 font-mono text-sm border border-dashed border-gray-300">
              No services found. Be the first to create one!
            </div>
          ) : (
            services.map((service) => (
              <ServiceCard
                service={service}
                key={service.service_id}
                readonly={true}
              />
            ))
          )}
        </div>
      </div>

      {totalPages > 1 && (
        <Pagination className="mt-auto">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={handlePreviousPage}
                className={
                  page === 1
                    ? "pointer-events-none opacity-50 font-mono uppercase text-xs"
                    : "cursor-pointer font-mono uppercase text-xs"
                }
              />
            </PaginationItem>

            <MarketPaginationItems
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />

            <PaginationItem>
              <PaginationNext
                onClick={handleNextPage}
                className={
                  page === totalPages
                    ? "pointer-events-none opacity-50 font-mono uppercase text-xs"
                    : "cursor-pointer font-mono uppercase text-xs"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default MarketFeed;
