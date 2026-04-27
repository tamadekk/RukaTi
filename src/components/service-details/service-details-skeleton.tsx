import { Skeleton } from "@/components/ui/skeleton";

export const ServiceDetailsSkeleton = () => {
  return (
    <div className="space-y-8 font-mono max-w-5xl mx-auto w-full animate-pulse">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center pb-4 border-b border-black">
        <Skeleton className="h-10 w-24 bg-gray-200" />
        <Skeleton className="h-10 w-24 bg-gray-200" />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Gallery Skeleton */}
        <div className="w-full md:w-3/5 aspect-video border border-black bg-gray-50 flex flex-col gap-3 p-0 overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <Skeleton className="w-full h-full bg-gray-100" />
          <div className="flex gap-2 p-3">
            <Skeleton className="w-20 h-20 bg-gray-200" />
            <Skeleton className="w-20 h-20 bg-gray-200" />
            <Skeleton className="w-20 h-20 bg-gray-200" />
          </div>
        </div>

        {/* Info Skeleton */}
        <div className="w-full md:w-2/5 flex flex-col gap-6">
          <div className="space-y-4">
            <Skeleton className="h-12 w-3/4 bg-gray-200" />
            <div className="flex flex-col gap-2 border-l-2 border-gray-200 pl-3">
              <Skeleton className="h-4 w-1/2 bg-gray-100" />
              <Skeleton className="h-4 w-1/3 bg-gray-100" />
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-auto">
            <div className="bg-gray-50 border border-gray-200 p-4 space-y-3">
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <Skeleton className="h-4 w-20 bg-gray-200" />
                <Skeleton className="h-4 w-16 bg-gray-200" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-24 bg-gray-200" />
                <Skeleton className="h-4 w-20 bg-gray-200" />
              </div>
            </div>
            <Skeleton className="h-14 w-full bg-gray-200" />
          </div>
        </div>
      </div>

      {/* Description & Provider Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8 border-t border-black">
        <div className="lg:col-span-2 space-y-4">
          <Skeleton className="h-8 w-40 bg-gray-200" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full bg-gray-100" />
            <Skeleton className="h-4 w-full bg-gray-100" />
            <Skeleton className="h-4 w-3/4 bg-gray-100" />
          </div>
        </div>
        <div className="space-y-4">
          <Skeleton className="h-40 w-full bg-gray-50 border border-gray-200" />
        </div>
      </div>
    </div>
  );
};
