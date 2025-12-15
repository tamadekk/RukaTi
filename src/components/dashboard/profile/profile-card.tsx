import { Button } from "@/components/ui/button";
import type { UserProfile } from "@/types/user";

const ProfileCard = ({ user }: { user?: UserProfile | null }) => {
  const name = user?.email ?? "Unknown user";
  const location = user?.role ?? "";
  const description = user?.bio ?? "";
  const avatar = user?.avatar ?? "/src/assets/tutorTile.jpg";

  return (
    <div className="flex flex-col items-center text-center gap-4">
      <div className="relative group">
        <img
          src={avatar}
          alt="avatar"
          className="w-32 h-32 object-cover border border-black grayscale group-hover:grayscale-0 transition-all duration-300"
        />
      </div>

      <div className="w-full space-y-2">
        <h3 className="text-xl font-bold uppercase tracking-tight">{name}</h3>
        <p className="text-sm text-gray-500 font-mono border-b border-black pb-4 mb-4">
          {location || "No Role Set"}
        </p>
        <p className="text-sm text-gray-600 leading-relaxed">
          {description || "No bio available."}
        </p>
      </div>

      <Button variant="outline" className="w-full mt-4">
        Edit Profile
      </Button>
    </div>
  );
};

export default ProfileCard;
