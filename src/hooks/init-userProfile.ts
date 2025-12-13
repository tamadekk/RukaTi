import { useEffect } from "react";
import { useUserProfileStore } from "@/store/userProfileStore";
import { useServiceStore } from "@/store/userServicesStore";
import { useUserSession } from "@/store/userSessionsStore";

export function useInitializeUser() {
  const user = useUserSession((s) => s.user);
  const fetchUserProfile = useUserProfileStore((s) => s.fetchUserProfile);
  const fetchUserServices = useServiceStore((s) => s.fetchUserServices);

  useEffect(() => {
    const init = async () => {
      if (user) {
        fetchUserServices(user.id);
        fetchUserProfile(user.id);
      }
    };

    init();
  }, [fetchUserProfile, fetchUserServices, user]);
}
