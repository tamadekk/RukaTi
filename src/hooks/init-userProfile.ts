import { useEffect } from "react";
import supabase from "@/supabase-client";
import { useUserProfileStore } from "@/store/userProfileStore";

export function useInitializeUser() {
  const fetchUserProfile = useUserProfileStore((s) => s.fetchUserProfile);

  useEffect(() => {
    const init = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) await fetchUserProfile(user.id);
    };

    init();
  }, [fetchUserProfile]);
}
