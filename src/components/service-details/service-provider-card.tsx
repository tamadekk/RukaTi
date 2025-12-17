import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { UserProfile } from "@/types/user";

type ServiceProviderCardProps = {
  provider: UserProfile;
};

export const ServiceProviderCard = ({ provider }: ServiceProviderCardProps) => {
  return (
    <div className="lg:col-span-1 space-y-6">
      <div className="border border-black p-6 bg-white space-y-6 relative">
        <div className="absolute -top-3 left-4 bg-white px-2 text-xs font-bold uppercase tracking-widest text-gray-500">
          Service Provider
        </div>

        {provider.user_id && (
          <Link
            to="/provider/$userId"
            params={{ userId: provider.user_id }}
            className="flex flex-col items-center text-center gap-4 hover:opacity-75 transition-opacity group"
          >
            <Avatar className="w-24 h-24 border-2 border-black rounded-none group-hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
              <AvatarImage
                src={provider.avatar || undefined}
                className="object-cover"
              />
              <AvatarFallback className="rounded-none bg-gray-200 text-2xl font-bold">
                {provider.email?.substring(0, 2).toUpperCase() || "??"}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-1">
              <div className="font-bold text-xl uppercase tracking-tight group-hover:underline decoration-2 underline-offset-4">
                {provider.email?.split("@")[0] || "Provider"}
              </div>
              <div className="flex items-center justify-center gap-1 text-yellow-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
              <div className="text-xs text-gray-400 font-bold uppercase">
                Rating: {provider.rating || "N/A"}
              </div>
            </div>
          </Link>
        )}

        {provider.bio && (
          <div className="bg-gray-50 p-3 text-sm text-gray-600 italic border-l-2 border-gray-300">
            "{provider.bio}"
          </div>
        )}

        {provider.phone_number && (
          <Button
            variant="outline"
            className="w-full rounded-none border-black font-bold uppercase"
          >
            tel: {provider.phone_number}
          </Button>
        )}
      </div>

      {/* Reviews Placeholder - Smaller */}
      <div className="border border-dashed border-gray-300 p-4 text-center">
        <p className="text-xs text-gray-400 uppercase font-bold">
          Reviews coming soon
        </p>
      </div>
    </div>
  );
};
