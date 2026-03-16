import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { OnboardingForm } from "@/components/forms/onboarding-form";
import { useUserProfileStore } from "@/store/userProfileStore";

const OnboardingRouteComponent: React.FC = () => {
  const navigate = useNavigate();
  const { userProfile } = useUserProfileStore();
  const checkIfUserCompletedOnboarding = () => {
    if (!userProfile?.full_name || !userProfile?.phone_number) {
      return false;
    }
    return true;
  };

  if (checkIfUserCompletedOnboarding()) {
    navigate({ to: "/" });
    return null;
  }
  return (
    <div className="min-h-[calc(100dvh-4rem)] flex items-center justify-center px-4 py-16">
      <OnboardingForm />
    </div>
  );
};

export const Route = createFileRoute("/_authenticated/onboarding")({
  component: OnboardingRouteComponent,
});
