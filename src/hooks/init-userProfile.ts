import { useEffect } from "react";
import { useUserProfileStore } from "@/store/userProfileStore";
import { getUserServices } from "@/lib/user";
import { useUserSession } from "@/store/userSessionsStore";

export function useInitializeUser() {
  const user = useUserSession((s) => s.user);
  const fetchUserProfile = useUserProfileStore((s) => s.fetchUserProfile);

  useEffect(() => {
    const init = async () => {
      if (user) {
        getUserServices(user.id);
        fetchUserProfile(user.id);
      }
    };

    init();
  }, [fetchUserProfile, user]);
}
