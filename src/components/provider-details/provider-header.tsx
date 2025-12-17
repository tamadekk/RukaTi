import { Star, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { UserProfile } from "@/types/user";

type ProviderHeaderProps = {
  profile: UserProfile;
};

export const ProviderHeader = ({ profile }: ProviderHeaderProps) => {
  return (
    <div className="border border-black bg-white p-8 flex flex-col md:flex-row gap-8 items-start md:items-center">
      <Avatar className="w-32 h-32 border-2 border-black rounded-none">
        <AvatarImage
          src={profile.avatar || undefined}
          className="object-cover"
        />
        <AvatarFallback className="rounded-none bg-gray-200 text-2xl font-bold">
          {profile.email?.substring(0, 2).toUpperCase() || "??"}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 space-y-4">
        <div>
          <h1 className="text-3xl font-bold uppercase tracking-tight">
            {profile.email?.split("@")[0]}
          </h1>
          <div className="flex items-center gap-4 text-sm mt-1">
            <div className="flex items-center gap-1 text-yellow-500">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-black font-bold">
                {profile.rating || "New"}
              </span>
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              <MapPin className="w-4 h-4" />
              <span>
                Joined{" "}
                {new Date(
                  profile.created_at || Date.now(),
                ).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        <p className="text-gray-700 italic max-w-2xl">
          "{profile.bio || "No bio available."}"
        </p>

        <Button className="uppercase font-bold tracking-widest gap-2">
          <Mail className="w-4 h-4" />
          Contact Provider
        </Button>
      </div>
    </div>
  );
};
