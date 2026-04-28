import { Link, useNavigate } from "@tanstack/react-router";
import { Star, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { UserProfile } from "@/types/user";
import { useChatStore } from "@/store/chatStore";

type ServiceProviderCardProps = {
  provider: UserProfile;
};

export const ServiceProviderCard = ({ provider }: ServiceProviderCardProps) => {
  const {
    user_id: userId,
    avatar,
    full_name,
    rating,
    bio,
    phone_number: phone,
  } = provider;

  const initial = full_name?.substring(0, 2).toUpperCase() || "??";
  const displayRating = rating || "N/A";
  const avatarUrl = avatar || undefined;

  const navigate = useNavigate();
  const startConversation = useChatStore((s) => s.startConversation);

  const handleContactProvider = () => {
    const roomId = startConversation({
      provider_id: userId,
      provider_name: full_name || "Provider",
      provider_avatar: avatarUrl ?? null,
    });
    navigate({ to: "/messages", search: { roomId } });
  };

  return (
    <div className="lg:col-span-1 space-y-6">
      <div className="border border-black p-6 bg-white space-y-6 relative">
        <div className="absolute -top-3 left-4 bg-white px-2 text-xs font-bold uppercase tracking-widest text-gray-500">
          Service Provider
        </div>

        {userId && (
          <Link
            to="/provider/$userId"
            params={{ userId }}
            className="flex flex-col items-center text-center gap-4 hover:opacity-75 transition-opacity group"
          >
            <Avatar className="w-24 h-24 border-2 border-black rounded-none group-hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
              <AvatarImage src={avatarUrl} className="object-cover" />
              <AvatarFallback className="rounded-none bg-gray-200 text-2xl font-bold">
                {initial}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-1">
              <div className="font-bold text-xl uppercase tracking-tight group-hover:underline decoration-2 underline-offset-4">
                {full_name}
              </div>
              <div className="flex items-center justify-center gap-1 text-yellow-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
              <div className="text-xs text-gray-400 font-bold uppercase">
                Rating: {displayRating}
              </div>
            </div>
          </Link>
        )}

        {bio && (
          <div className="bg-gray-50 p-3 text-sm text-gray-600 italic border-l-2 border-gray-300">
            "{bio}"
          </div>
        )}

        {phone && (
          <Button
            variant="outline"
            className="w-full rounded-none border-black font-bold uppercase"
          >
            tel: {phone}
          </Button>
        )}

        <Button
          onClick={handleContactProvider}
          className="w-full rounded-none bg-black text-white hover:bg-neutral-800 font-bold uppercase tracking-widest flex items-center gap-2"
        >
          <MessageCircle className="w-4 h-4" />
          Contact Provider
        </Button>
      </div>
    </div>
  );
};
