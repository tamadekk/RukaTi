import { useUserSession } from "@/store/userSessionsStore";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { isUserOnboarded } from "@/lib/user";
import { queryClient } from "@/lib/queryClient";
import { queryKeys } from "@/lib/queryKeys";
import { fetchUserProfile } from "@/hooks/useUserProfileQuery";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ location }) => {
    const user = useUserSession.getState().user;

    if (!user?.id) {
      throw redirect({
        to: "/login",
        search: { redirect: location.href },
      });
    }

    const profile = await queryClient.ensureQueryData({
      queryKey: queryKeys.userProfile(user.id),
      queryFn: () => fetchUserProfile(user.id),
    });

    const isOnboarded = isUserOnboarded(profile);
    const isOnboardingRoute = location.pathname === "/onboarding";

    if (!isOnboarded && !isOnboardingRoute) {
      throw redirect({ to: "/onboarding" });
    }
  },
});
