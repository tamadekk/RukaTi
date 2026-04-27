import { Skeleton } from "@/components/ui/skeleton";

export const ServiceCardSkeleton = ({
  variant = "vertical",
}: {
  variant?: "vertical" | "horizontal";
}) => {
  const isHorizontal = variant === "horizontal";

  return (
    <div
      className={`border border-gray-200 bg-white 
      ${isHorizontal ? "flex flex-row h-44" : "flex flex-col h-full p-3 space-y-3"}
      `}
    >
      <Skeleton
        className={`bg-gray-100
        ${isHorizontal ? "w-40 h-full shrink-0 rounded-none border-r border-gray-200" : "aspect-[3/2] w-full border border-gray-100 mb-1 rounded-none"}
        `}
      />

      <div
        className={`flex flex-col min-w-0 flex-1 ${isHorizontal ? "p-3 pl-4" : "space-y-2"}`}
      >
        <div className="space-y-2">
          <Skeleton className="h-4 w-3/4 bg-gray-100 rounded-none" />
          <Skeleton className="h-3 w-1/4 bg-gray-100 rounded-none" />
        </div>

        <div className="space-y-2 mt-2">
          <Skeleton className="h-3 w-full bg-gray-100 rounded-none" />
          <Skeleton className="h-3 w-full bg-gray-100 rounded-none" />
          <Skeleton className="h-3 w-2/3 bg-gray-100 rounded-none" />
        </div>

        <div className="mt-auto pt-2 space-y-1">
          <Skeleton className="h-3 w-full bg-gray-100 rounded-none" />
          <Skeleton className="h-3 w-full bg-gray-100 rounded-none" />
        </div>
      </div>
    </div>
  );
};
