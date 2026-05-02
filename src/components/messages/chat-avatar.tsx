import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

type ChatAvatarProps = {
  src: string | null | undefined;
  initial: string;
  className?: string;
  fallbackClassName?: string;
};

export const ChatAvatar = ({
  src,
  initial,
  className,
  fallbackClassName,
}: ChatAvatarProps) => {
  const [showSkeleton, setShowSkeleton] = useState(!!src);

  return (
    <Avatar className={className}>
      {src && (
        <AvatarImage
          src={src}
          className="object-cover"
          onLoadingStatusChange={(status) => {
            if (status !== "loading") setShowSkeleton(false);
          }}
        />
      )}
      <AvatarFallback className={fallbackClassName}>
        {showSkeleton ? (
          <Skeleton className="size-full rounded-none" />
        ) : (
          initial
        )}
      </AvatarFallback>
    </Avatar>
  );
};
