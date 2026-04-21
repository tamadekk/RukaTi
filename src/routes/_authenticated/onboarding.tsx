import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { OnboardingForm } from "@/components/forms/onboarding-form";
import { useUserProfileStore } from "@/store/userProfileStore";
import { isUserOnboarded } from "@/lib/user";

const OnboardingRouteComponent: React.FC = () => {
  const navigate = useNavigate();
  const { userProfile } = useUserProfileStore();
  const isOnboarded = isUserOnboarded(userProfile);

  useEffect(() => {
    if (isOnboarded) {
      navigate({ to: "/" });
    }
  }, [isOnboarded, navigate]);

  if (isOnboarded) return null;

  return (
    <div className="min-h-[calc(100dvh-4rem)] flex items-center justify-center px-4 py-16">
      <OnboardingForm />
    </div>
  );
};

export const Route = createFileRoute("/_authenticated/onboarding")({
  component: OnboardingRouteComponent,
});
