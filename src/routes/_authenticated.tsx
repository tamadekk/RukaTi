import { useUserSession } from "@/store/userSessionsStore";
import { useUserProfileStore } from "@/store/userProfileStore";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { isUserOnboarded } from "@/lib/user";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ location }) => {
    const user = useUserSession.getState().user;

    if (!user?.id) {
      throw redirect({
        to: "/login",
        search: { redirect: location.href },
      });
    }

    // 2. Ensure profile is loaded
    const { userProfile, fetchUserProfile } = useUserProfileStore.getState();
    if (!userProfile) {
      await fetchUserProfile(user.id);
    }

    // 3. If onboarding is not complete, send to /onboarding (but don't loop)
    const profile = useUserProfileStore.getState().userProfile;
    const isOnboarded = isUserOnboarded(profile);
    const isOnboardingRoute = location.pathname === "/onboarding";

    if (!isOnboarded && !isOnboardingRoute) {
      throw redirect({ to: "/onboarding" });
    }
  },
});
